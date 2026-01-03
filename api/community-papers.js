/**
 * Vercel Serverless Function: Community Papers API
 * Reads papers from Supabase (no Python API needed!)
 * 
 * Endpoints:
 * - GET /api/community-papers?page=1&limit=20&conference=NeurIPS&year=2024
 * - GET /api/community-papers?paperId=xxx
 * - GET /api/community-papers?action=filters
 * - GET /api/community-papers?shareToken=xxx
 * - POST /api/community-papers (generate share link)
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const getSupabaseClient = () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase credentials');
    }

    return createClient(supabaseUrl, supabaseKey);
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const supabase = getSupabaseClient();
        const { method, query, body } = req;

        // ========================================================================
        // GET: Fetch papers, filters, or shared papers
        // ========================================================================
        if (method === 'GET') {

            // Get filter options
            if (query.action === 'filters') {
                const { data, error } = await supabase.rpc('get_community_paper_filter_options');

                if (error) throw error;

                return res.status(200).json({
                    years: data?.years || [],
                    conferences: data?.conferences || [],
                    sources: data?.sources || [],
                    tracks: data?.tracks || [],
                    statuses: data?.statuses || [],
                    primary_areas: data?.primary_areas || []
                });
            }

            // Get shared paper by token
            if (query.shareToken) {
                const { data, error } = await supabase.rpc('get_paper_by_share_token', {
                    p_share_token: query.shareToken
                });

                if (error) throw error;
                if (!data || data.length === 0) {
                    return res.status(404).json({ error: 'Shared paper not found' });
                }

                return res.status(200).json(data[0]);
            }

            // Get single paper by ID
            if (query.paperId) {
                const { data, error } = await supabase
                    .table('community_papers_global')
                    .select('*, papers(*)')
                    .eq('paper_id', query.paperId)
                    .limit(1)
                    .single();

                if (error) throw error;
                if (!data) {
                    return res.status(404).json({ error: 'Paper not found' });
                }

                return res.status(200).json(data);
            }

            // Get paginated papers with filters
            const page = parseInt(query.page) || 1;
            const limit = Math.min(parseInt(query.limit) || 20, 100);
            const offset = (page - 1) * limit;

            const filters = {
                p_limit: limit,
                p_offset: offset,
                p_year: query.year ? parseInt(query.year) : null,
                p_conference: query.conference || null,
                p_source: query.source || null,
                p_track: query.track || null,
                p_status: query.status || null,
                p_primary_area: query.primaryArea || null,
                p_min_rating: query.minRating ? parseFloat(query.minRating) : null,
                p_keywords: query.keywords || null,
                p_sort_by: query.sortBy || 'imported_at'
            };

            // Get papers
            const { data: papers, error: papersError } = await supabase.rpc(
                'get_community_papers',
                filters
            );

            if (papersError) throw papersError;

            // Get total count
            const countFilters = { ...filters };
            delete countFilters.p_limit;
            delete countFilters.p_offset;
            delete countFilters.p_sort_by;

            const { data: countData, error: countError } = await supabase.rpc(
                'get_community_papers_count',
                countFilters
            );

            if (countError) throw countError;

            const total = countData || 0;
            const totalPages = Math.ceil(total / limit);

            return res.status(200).json({
                papers: papers || [],
                total,
                page,
                limit,
                totalPages
            });
        }

        // ========================================================================
        // POST: Generate share link or add paper to circle
        // ========================================================================
        if (method === 'POST') {
            const { action, paperId, circleId, userId } = body || {};

            // Generate share link
            if (action === 'share' && paperId) {
                const { data, error } = await supabase.rpc('generate_paper_share_token', {
                    p_paper_id: paperId
                });

                if (error) throw error;
                if (!data) {
                    return res.status(404).json({ error: 'Paper not found in community' });
                }

                return res.status(200).json({
                    shareToken: data,
                    shareUrl: `/share/${data}`
                });
            }

            // Add paper to circle
            if (action === 'addToCircle' && paperId && circleId) {
                // Check if already added
                const { data: existing, error: checkError } = await supabase
                    .table('community_papers')
                    .select('id')
                    .eq('paper_id', paperId)
                    .eq('community_id', circleId)
                    .limit(1);

                if (checkError) throw checkError;

                if (existing && existing.length > 0) {
                    return res.status(200).json({
                        message: 'Paper already in circle',
                        status: 'exists'
                    });
                }

                // Add to circle
                const { error: insertError } = await supabase
                    .table('community_papers')
                    .insert({
                        paper_id: paperId,
                        community_id: circleId,
                        added_by: userId || null
                    });

                if (insertError) throw insertError;

                return res.status(200).json({
                    message: 'Paper added to circle',
                    status: 'added'
                });
            }

            return res.status(400).json({ error: 'Invalid POST request' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Community Papers API error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

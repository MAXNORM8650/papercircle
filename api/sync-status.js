/**
 * Vercel Serverless Function: Sync Status API
 * Check status of sync runs from Supabase
 * 
 * Endpoints:
 * - GET /api/sync-status (get recent sync runs)
 * - GET /api/sync-status?runId=xxx (get specific sync run)
 */

import { createClient } from '@supabase/supabase-js';

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
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const supabase = getSupabaseClient();
        const { runId, limit } = req.query;

        // Get specific sync run
        if (runId) {
            const { data, error } = await supabase
                .table('sync_runs')
                .select('*')
                .eq('id', runId)
                .single();

            if (error) throw error;
            if (!data) {
                return res.status(404).json({ error: 'Sync run not found' });
            }

            return res.status(200).json(data);
        }

        // Get recent sync runs
        const maxLimit = Math.min(parseInt(limit) || 10, 50);
        const { data, error } = await supabase
            .table('sync_runs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(maxLimit);

        if (error) throw error;

        return res.status(200).json({
            syncRuns: data || []
        });

    } catch (error) {
        console.error('Sync Status API error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

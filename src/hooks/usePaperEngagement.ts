import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface EngagementStats {
  likes: number;
  views: number;
  saves: number;
  discussions: number;
}

interface UserEngagement {
  hasLiked: boolean;
  hasSaved: boolean;
  hasViewed: boolean;
}

export function usePaperEngagement(paperId: string, communityId?: string) {
  const { user } = useAuth();
  const [stats, setStats] = useState<EngagementStats>({
    likes: 0,
    views: 0,
    saves: 0,
    discussions: 0,
  });
  const [userEngagement, setUserEngagement] = useState<UserEngagement>({
    hasLiked: false,
    hasSaved: false,
    hasViewed: false,
  });
  const [loading, setLoading] = useState(true);
  const inFlightRequest = useRef<Set<string>>(new Set());

  useEffect(() => {
    loadEngagementData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`paper_engagement_${paperId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'paper_engagement',
          filter: `paper_id=eq.${paperId}`,
        },
        () => {
          loadEngagementData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [paperId, user]);

  const loadEngagementData = async () => {
    setLoading(true);
    try {
      // Get engagement stats
      const { data: statsData } = await (supabase.rpc as any)('get_paper_engagement_stats', {
        p_paper_id: paperId,
      });

      // Get discussion count
      const { data: discussionCount } = await (supabase.rpc as any)('get_paper_discussion_count', {
        p_paper_id: paperId,
        p_community_id: communityId || null,
      });

      if (statsData) {
        setStats({
          likes: statsData.likes || 0,
          views: statsData.views || 0,
          saves: statsData.saves || 0,
          discussions: discussionCount || 0,
        });
      }

      // Get user's engagement if logged in
      if (user) {
        const { data: userEngagementData } = await supabase
          .from('paper_engagement' as any)
          .select('engagement_type')
          .eq('paper_id', paperId)
          .eq('user_id', user.id);

        if (userEngagementData) {
          const typedData = userEngagementData as any[];
          setUserEngagement({
            hasLiked: typedData.some(e => e.engagement_type === 'like'),
            hasSaved: typedData.some(e => e.engagement_type === 'save'),
            hasViewed: typedData.some(e => e.engagement_type === 'view'),
          });
        }
      }
    } catch (error) {
      console.error('Error loading engagement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      alert('Please sign in to like papers');
      return;
    }

    try {
      const { data, error } = await (supabase.rpc as any)('toggle_paper_engagement', {
        p_paper_id: paperId,
        p_user_id: user.id,
        p_engagement_type: 'like',
      });

      if (error) throw error;

      // Update local state optimistically
      setUserEngagement(prev => ({ ...prev, hasLiked: data }));
      setStats(prev => ({
        ...prev,
        likes: data ? prev.likes + 1 : prev.likes - 1,
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      // Reload to get correct state
      loadEngagementData();
    }
  };

  const toggleSave = async () => {
    if (!user) {
      alert('Please sign in to save papers');
      return;
    }

    try {
      const { data, error } = await (supabase.rpc as any)('toggle_paper_engagement', {
        p_paper_id: paperId,
        p_user_id: user.id,
        p_engagement_type: 'save',
      });

      if (error) throw error;

      // Update local state optimistically
      setUserEngagement(prev => ({ ...prev, hasSaved: data }));
      setStats(prev => ({
        ...prev,
        saves: data ? prev.saves + 1 : prev.saves - 1,
      }));
    } catch (error) {
      console.error('Error toggling save:', error);
      loadEngagementData();
    }
  };

  const recordView = async () => {
    if (!user || userEngagement.hasViewed) return;

    const requestKey = `${paperId}-${user.id}-view`;
    if (inFlightRequest.current.has(requestKey)) return;

    inFlightRequest.current.add(requestKey);

    try {
      await (supabase.rpc as any)('toggle_paper_engagement', {
        p_paper_id: paperId,
        p_user_id: user.id,
        p_engagement_type: 'view',
      });

      setUserEngagement(prev => ({ ...prev, hasViewed: true }));
      setStats(prev => ({ ...prev, views: prev.views + 1 }));
    } catch (error: any) {
      // Ignore 409 conflict as it means view was already recorded
      // Supabase error codes: 23505 is unique violation
      if (error?.code !== '23505' && error?.status !== 409) {
        console.error('Error recording view:', error);
      }
    } finally {
      inFlightRequest.current.delete(requestKey);
    }
  };

  return {
    stats,
    userEngagement,
    loading,
    toggleLike,
    toggleSave,
    recordView,
  };
}

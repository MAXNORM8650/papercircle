import { useState, useEffect } from 'react';
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
      const { data: statsData } = await supabase.rpc('get_paper_engagement_stats', {
        p_paper_id: paperId,
      });

      // Get discussion count
      const { data: discussionCount } = await supabase.rpc('get_paper_discussion_count', {
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
          .from('paper_engagement')
          .select('engagement_type')
          .eq('paper_id', paperId)
          .eq('user_id', user.id);

        if (userEngagementData) {
          setUserEngagement({
            hasLiked: userEngagementData.some(e => e.engagement_type === 'like'),
            hasSaved: userEngagementData.some(e => e.engagement_type === 'save'),
            hasViewed: userEngagementData.some(e => e.engagement_type === 'view'),
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
      const { data, error } = await supabase.rpc('toggle_paper_engagement', {
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
      const { data, error } = await supabase.rpc('toggle_paper_engagement', {
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

    try {
      await supabase.rpc('toggle_paper_engagement', {
        p_paper_id: paperId,
        p_user_id: user.id,
        p_engagement_type: 'view',
      });

      setUserEngagement(prev => ({ ...prev, hasViewed: true }));
      setStats(prev => ({ ...prev, views: prev.views + 1 }));
    } catch (error) {
      console.error('Error recording view:', error);
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

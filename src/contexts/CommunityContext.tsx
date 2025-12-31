import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { Database } from '../lib/database.types';

type Community = Database['public']['Tables']['communities']['Row'];
type CommunityMember = Database['public']['Tables']['community_members']['Row'];

interface CommunityContextType {
  communities: Community[];
  currentCommunity: Community | null;
  setCurrentCommunity: (community: Community | null) => void;
  userCommunities: Community[];
  userRole: string | null;
  loading: boolean;
  refreshCommunities: () => Promise<void>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(null);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCommunities = async () => {
    const { data: allCommunities } = await supabase
      .from('communities')
      .select('*')
      .order('created_at', { ascending: false });

    if (allCommunities) {
      setCommunities(allCommunities);
    }

    if (user) {
      // Use RPC function to avoid RLS issues
      const { data: userCirclesData, error } = await supabase.rpc('get_user_circles');

      if (error) {
        console.error('Error loading user circles:', error);
      } else if (userCirclesData) {
        // Extract just the community data
        const userComms = userCirclesData.map((circle: any) => ({
          id: circle.id,
          name: circle.name,
          description: circle.description,
          slug: circle.slug,
          is_public: circle.is_public,
          avatar_url: circle.avatar_url,
          created_by: circle.created_by,
          created_at: circle.created_at
        }));
        setUserCommunities(userComms);

        if (currentCommunity) {
          const membership = userCirclesData.find(
            (circle: any) => circle.id === currentCommunity.id
          );
          setUserRole(membership?.user_role || null);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCommunities();
  }, [user]);

  useEffect(() => {
    if (currentCommunity && user) {
      const fetchRole = async () => {
        // Use RPC function to get user circles and find the role
        const { data: userCirclesData } = await supabase.rpc('get_user_circles');

        if (userCirclesData) {
          const membership = userCirclesData.find(
            (circle: any) => circle.id === currentCommunity.id
          );
          setUserRole(membership?.user_role || null);
        } else {
          setUserRole(null);
        }
      };
      fetchRole();
    } else {
      setUserRole(null);
    }
  }, [currentCommunity, user]);

  return (
    <CommunityContext.Provider
      value={{
        communities,
        currentCommunity,
        setCurrentCommunity,
        userCommunities,
        userRole,
        loading,
        refreshCommunities: loadCommunities,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}

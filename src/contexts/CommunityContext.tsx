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
      const { data: memberData } = await supabase
        .from('community_members')
        .select('community_id, role, communities(*)')
        .eq('user_id', user.id);

      if (memberData) {
        const userComms = memberData
          .map((m: any) => m.communities)
          .filter(Boolean);
        setUserCommunities(userComms);

        if (currentCommunity) {
          const membership = memberData.find(
            (m: any) => m.community_id === currentCommunity.id
          );
          setUserRole(membership?.role || null);
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
        const { data } = await supabase
          .from('community_members')
          .select('role')
          .eq('community_id', currentCommunity.id)
          .eq('user_id', user.id)
          .maybeSingle();

        setUserRole(data?.role || null);
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

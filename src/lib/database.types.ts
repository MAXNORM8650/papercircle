export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'member' | 'presenter' | 'admin';
export type CommunityRole = 'member' | 'presenter' | 'admin';
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';
export type VisibilityType = 'public' | 'members';
export type EdgeType = 'extends' | 'applies' | 'evaluates' | 'contradicts' | 'survey' | 'prerequisite';
export type RsvpStatus = 'attending' | 'maybe' | 'not_attending';
export type ReactionType = 'like' | 'highlight';
export type TopicLevel = 'area' | 'sub_area' | 'tag';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          affiliation: string | null;
          interests: string[];
          bio: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          affiliation?: string | null;
          interests?: string[];
          bio?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          affiliation?: string | null;
          interests?: string[];
          bio?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          updated_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          name: string;
          parent_id: string | null;
          level: TopicLevel;
          description: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          parent_id?: string | null;
          level?: TopicLevel;
          description?: string | null;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          parent_id?: string | null;
          level?: TopicLevel;
          description?: string | null;
          color?: string;
        };
      };
      papers: {
        Row: {
          id: string;
          arxiv_id: string | null;
          title: string;
          authors: Json;
          abstract: string | null;
          venue: string | null;
          year: number | null;
          pdf_url: string | null;
          code_url: string | null;
          embedding: string | null;
          metadata: Json;
          citation_count: number;
          influence_score: number;
          trending_score: number;
          view_count: number;
          save_count: number;
          like_count: number;
          dislike_count: number;
          discussion_count: number;
          last_viewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          arxiv_id?: string | null;
          title: string;
          authors?: Json;
          abstract?: string | null;
          venue?: string | null;
          year?: number | null;
          pdf_url?: string | null;
          code_url?: string | null;
          embedding?: string | null;
          metadata?: Json;
          citation_count?: number;
          influence_score?: number;
          trending_score?: number;
          view_count?: number;
          save_count?: number;
          like_count?: number;
          dislike_count?: number;
          discussion_count?: number;
          last_viewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          arxiv_id?: string | null;
          title?: string;
          authors?: Json;
          abstract?: string | null;
          venue?: string | null;
          year?: number | null;
          pdf_url?: string | null;
          code_url?: string | null;
          embedding?: string | null;
          metadata?: Json;
          citation_count?: number;
          influence_score?: number;
          trending_score?: number;
          view_count?: number;
          save_count?: number;
          like_count?: number;
          dislike_count?: number;
          discussion_count?: number;
          last_viewed_at?: string | null;
          updated_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          scheduled_at: string;
          duration_minutes: number;
          location: string | null;
          virtual_link: string | null;
          presenter_id: string | null;
          presenter_name: string | null;
          presenter_email: string | null;
          presenter_bio: string | null;
          co_presenters: Json;
          paper_id: string | null;
          status: SessionStatus;
          recording_url: string | null;
          slides_url: string | null;
          notes: string | null;
          visibility: VisibilityType;
          is_recurring: boolean;
          recurrence_rule: string | null;
          created_by: string | null;
          community_id: string | null;
          parent_session_id: string | null;
          lineage_direction: string | null;
          is_new_direction: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          scheduled_at: string;
          duration_minutes?: number;
          location?: string | null;
          virtual_link?: string | null;
          presenter_id?: string | null;
          presenter_name?: string | null;
          presenter_email?: string | null;
          presenter_bio?: string | null;
          co_presenters?: Json;
          paper_id?: string | null;
          status?: SessionStatus;
          recording_url?: string | null;
          slides_url?: string | null;
          notes?: string | null;
          visibility?: VisibilityType;
          is_recurring?: boolean;
          recurrence_rule?: string | null;
          created_by?: string | null;
          community_id?: string | null;
          parent_session_id?: string | null;
          lineage_direction?: string | null;
          is_new_direction?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          scheduled_at?: string;
          duration_minutes?: number;
          location?: string | null;
          virtual_link?: string | null;
          presenter_id?: string | null;
          presenter_name?: string | null;
          presenter_email?: string | null;
          presenter_bio?: string | null;
          co_presenters?: Json;
          paper_id?: string | null;
          status?: SessionStatus;
          recording_url?: string | null;
          slides_url?: string | null;
          notes?: string | null;
          visibility?: VisibilityType;
          is_recurring?: boolean;
          recurrence_rule?: string | null;
          community_id?: string | null;
          parent_session_id?: string | null;
          lineage_direction?: string | null;
          is_new_direction?: boolean;
          updated_at?: string;
        };
      };
      edges: {
        Row: {
          id: string;
          source_paper_id: string | null;
          target_paper_id: string | null;
          edge_type: EdgeType;
          similarity_score: number | null;
          rationale: string | null;
          is_ai_generated: boolean;
          verified_by: string | null;
          community_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          source_paper_id?: string | null;
          target_paper_id?: string | null;
          edge_type: EdgeType;
          similarity_score?: number | null;
          rationale?: string | null;
          is_ai_generated?: boolean;
          verified_by?: string | null;
          community_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          source_paper_id?: string | null;
          target_paper_id?: string | null;
          edge_type?: EdgeType;
          similarity_score?: number | null;
          rationale?: string | null;
          is_ai_generated?: boolean;
          verified_by?: string | null;
          community_id?: string | null;
        };
      };
      rsvps: {
        Row: {
          id: string;
          session_id: string | null;
          user_id: string | null;
          status: RsvpStatus;
          checked_in: boolean;
          checked_in_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id?: string | null;
          user_id?: string | null;
          status?: RsvpStatus;
          checked_in?: boolean;
          checked_in_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          status?: RsvpStatus;
          checked_in?: boolean;
          checked_in_at?: string | null;
          updated_at?: string;
        };
      };
      discussions: {
        Row: {
          id: string;
          paper_id: string | null;
          session_id: string | null;
          parent_id: string | null;
          user_id: string | null;
          content: string;
          is_question: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          paper_id?: string | null;
          session_id?: string | null;
          parent_id?: string | null;
          user_id?: string | null;
          content: string;
          is_question?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          is_question?: boolean;
          updated_at?: string;
        };
      };
      reactions: {
        Row: {
          id: string;
          discussion_id: string | null;
          user_id: string | null;
          type: ReactionType;
          created_at: string;
        };
        Insert: {
          id?: string;
          discussion_id?: string | null;
          user_id?: string | null;
          type?: ReactionType;
          created_at?: string;
        };
        Update: {
          type?: ReactionType;
        };
      };
      saved_papers: {
        Row: {
          id: string;
          user_id: string | null;
          paper_id: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          paper_id?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          notes?: string | null;
        };
      };
      paper_topics: {
        Row: {
          paper_id: string;
          topic_id: string;
          relevance_score: number;
        };
        Insert: {
          paper_id: string;
          topic_id: string;
          relevance_score?: number;
        };
        Update: {
          relevance_score?: number;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string | null;
          badge_type: string;
          earned_at: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          badge_type: string;
          earned_at?: string;
          metadata?: Json;
        };
        Update: {
          metadata?: Json;
        };
      };
      coverage_snapshots: {
        Row: {
          id: string;
          period: string;
          topic_id: string | null;
          session_count: number;
          novelty_score: number;
          diversity_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          period: string;
          topic_id?: string | null;
          session_count?: number;
          novelty_score?: number;
          diversity_score?: number;
          created_at?: string;
        };
        Update: {
          session_count?: number;
          novelty_score?: number;
          diversity_score?: number;
        };
      };
      communities: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          slug: string;
          is_public: boolean;
          avatar_url: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          slug: string;
          is_public?: boolean;
          avatar_url?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          slug?: string;
          is_public?: boolean;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      community_members: {
        Row: {
          id: string;
          community_id: string | null;
          user_id: string | null;
          role: CommunityRole;
          joined_at: string;
        };
        Insert: {
          id?: string;
          community_id?: string | null;
          user_id?: string | null;
          role?: CommunityRole;
          joined_at?: string;
        };
        Update: {
          role?: CommunityRole;
        };
      };
      community_invites: {
        Row: {
          id: string;
          community_id: string | null;
          email: string;
          invited_by: string | null;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          community_id?: string | null;
          email: string;
          invited_by?: string | null;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          expires_at?: string;
        };
      };
      paper_ratings: {
        Row: {
          id: string;
          user_id: string | null;
          paper_id: string | null;
          arxiv_id: string | null;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          paper_id?: string | null;
          arxiv_id?: string | null;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          rating?: number;
          updated_at?: string;
        };
      };
      search_metrics: {
        Row: {
          id: string;
          user_id: string | null;
          search_query: string;
          search_source: string;
          filters_used: Json;
          results_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          search_query: string;
          search_source?: string;
          filters_used?: Json;
          results_count?: number;
          created_at?: string;
        };
        Update: {
          search_query?: string;
          search_source?: string;
          filters_used?: Json;
          results_count?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      community_role: CommunityRole;
      session_status: SessionStatus;
      visibility_type: VisibilityType;
      edge_type: EdgeType;
      rsvp_status: RsvpStatus;
      reaction_type: ReactionType;
      topic_level: TopicLevel;
    };
  };
}

// ============================================================================
// Community Papers Types
// ============================================================================

export type CommunityPaperSource = 'conference_db' | 'research_run' | 'ai_discovery' | 'arxiv';

export interface CommunityPaper {
  id: string;
  paper_id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number | null;
  venue: string | null;
  conference: string | null;
  source: CommunityPaperSource;
  pdf_url: string | null;
  arxiv_id: string | null;

  // Engagement metrics
  like_count: number;
  view_count: number;
  save_count: number;
  discussion_count: number;

  // Research run scores (if from research_output runs)
  combined_score: number | null;
  similarity_score: number | null;
  novelty_score: number | null;
  recency_score: number | null;

  // Conference metadata (if from database)
  track: string | null;
  paper_status: string | null;
  primary_area: string | null;
  keywords: string[] | null;
  tldr: string | null;
  rating_avg: number | null;
  confidence_avg: number | null;
  bibtex: string | null;
  github_url: string | null;
  project_url: string | null;

  // Import metadata
  run_timestamp: string | null;
  query: string | null;
  share_token: string | null;
  imported_at: string;
}

export interface CommunityFilters {
  year: number | null;
  venue: string | null;
  source: CommunityPaperSource | null;
  track: string | null;
  status: string | null;
  primaryArea: string | null;
  minRating: number | null;
  keywords: string;
  sortBy: 'imported_at' | 'recency' | 'rating' | 'likes' | 'views' | 'combined_score';
}

export interface CommunityFilterOptions {
  years: number[];
  conferences: string[];
  sources: string[];
  tracks: string[];
  statuses: string[];
  primaryAreas: string[];
}

export interface CommunityPapersPaginatedResponse {
  papers: CommunityPaper[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface SyncRun {
  id: string;
  run_timestamp: string;
  source_type: 'research_output' | 'conference_db' | 'full';
  query: string | null;
  papers_imported: number;
  papers_skipped: number;
  papers_updated: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

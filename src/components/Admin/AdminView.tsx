import { useState, useEffect } from 'react';
import { Users, FileText, Calendar, GitBranch, BarChart3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminStats {
  totalUsers: number;
  totalPapers: number;
  totalSessions: number;
  totalEdges: number;
  recentActivity: {
    newUsers: number;
    newPapers: number;
    newSessions: number;
  };
}

export function AdminView() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPapers: 0,
    totalSessions: 0,
    totalEdges: 0,
    recentActivity: {
      newUsers: 0,
      newPapers: 0,
      newSessions: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      usersResult,
      papersResult,
      sessionsResult,
      edgesResult,
      recentUsersResult,
      recentPapersResult,
      recentSessionsResult,
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('papers').select('*', { count: 'exact', head: true }),
      supabase.from('sessions').select('*', { count: 'exact', head: true }),
      supabase.from('edges').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('papers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString()),
    ]);

    setStats({
      totalUsers: usersResult.count || 0,
      totalPapers: papersResult.count || 0,
      totalSessions: sessionsResult.count || 0,
      totalEdges: edgesResult.count || 0,
      recentActivity: {
        newUsers: recentUsersResult.count || 0,
        newPapers: recentPapersResult.count || 0,
        newSessions: recentSessionsResult.count || 0,
      },
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management tools</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers}</p>
            <p className="text-sm text-green-600">
              +{stats.recentActivity.newUsers} this month
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-8 w-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Papers</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalPapers}</p>
            <p className="text-sm text-green-600">
              +{stats.recentActivity.newPapers} this month
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalSessions}</p>
            <p className="text-sm text-green-600">
              +{stats.recentActivity.newSessions} this month
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <GitBranch className="h-8 w-8 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Lineage Links</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalEdges}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Activity Overview</span>
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">User Growth</span>
                <span className="font-medium text-gray-900">
                  {stats.totalUsers > 0
                    ? ((stats.recentActivity.newUsers / stats.totalUsers) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      stats.totalUsers > 0
                        ? Math.min(
                            (stats.recentActivity.newUsers / stats.totalUsers) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Paper Additions</span>
                <span className="font-medium text-gray-900">
                  {stats.totalPapers > 0
                    ? ((stats.recentActivity.newPapers / stats.totalPapers) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      stats.totalPapers > 0
                        ? Math.min(
                            (stats.recentActivity.newPapers / stats.totalPapers) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Session Activity</span>
                <span className="font-medium text-gray-900">
                  {stats.totalSessions > 0
                    ? ((stats.recentActivity.newSessions / stats.totalSessions) * 100).toFixed(
                        1
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${
                      stats.totalSessions > 0
                        ? Math.min(
                            (stats.recentActivity.newSessions / stats.totalSessions) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-left">
              Create New Session
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-left">
              Add Paper
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-left">
              Manage Topics
            </button>
            <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-left">
              Review Lineage Links
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

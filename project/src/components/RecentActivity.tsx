import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { activityService } from '../services/firestore';
import type { Activity } from '../types';

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const recentActivities = await activityService.getRecent(5);
        setActivities(recentActivities);
      } catch (err) {
        setError('Failed to load recent activities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Clock size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {activity.type === 'create' && 'Added new'}
                {activity.type === 'update' && 'Updated'}
                {activity.type === 'delete' && 'Deleted'}{' '}
                {activity.entityType}: {activity.entityName}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
              {activity.details && (
                <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
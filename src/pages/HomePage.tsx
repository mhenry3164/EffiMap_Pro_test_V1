import Hero from '../components/public/Hero';
import FeatureCard from '../components/public/FeatureCard';
import { MapIcon, ChartBarIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Precision Mapping',
    description: 'Create, visualize, and manage sales territories with ease, ensuring optimal coverage and resource allocation.',
    icon: <MapIcon className="w-6 h-6" />,
  },
  {
    title: 'Data Insights',
    description: 'Connect your CRM and existing tools for real-time updates and actionable insights tailored to your business.',
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Enable your team to work together across territories, ensuring every opportunity is covered without overlap.',
    icon: <UsersIcon className="w-6 h-6" />,
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features That Set Us Apart
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to manage territories effectively and drive growth.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

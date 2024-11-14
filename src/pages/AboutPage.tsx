import ValueProposition from '../components/public/ValueProposition';
import { 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    title: "Data-Driven Excellence",
    description: "We believe in making decisions backed by robust data and analytics.",
    icon: <ChartBarIcon className="w-8 h-8" />,
  },
  {
    title: "Innovation First",
    description: "Continuously pushing boundaries to deliver cutting-edge solutions.",
    icon: <CogIcon className="w-8 h-8" />,
  },
  {
    title: "Customer Success",
    description: "Your success is our success. We're committed to your growth.",
    icon: <UserGroupIcon className="w-8 h-8" />,
  },
  {
    title: "Global Reach",
    description: "Supporting businesses across borders and industries.",
    icon: <GlobeAltIcon className="w-8 h-8" />,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About EffiMapPro
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            Part of the EffiWise ecosystem, we're revolutionizing territory management
            with smart, scalable solutions that drive business growth.
          </p>
        </div>
      </div>

      {/* EffiWise Ecosystem Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The EffiWise Ecosystem
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              EffiMapPro is part of the comprehensive EffiWise suite, designed to
              streamline business operations and drive efficiency across your organization.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-md bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Integrated Solutions</h3>
                <p className="text-gray-500">
                  Seamlessly connect with other EffiWise tools to create a
                  comprehensive business management ecosystem.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-md bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Scalable Platform</h3>
                <p className="text-gray-500">
                  Growth-ready infrastructure that adapts to your business needs,
                  from startup to enterprise.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-md bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Expert Support</h3>
                <p className="text-gray-500">
                  Backed by the EffiWise team of industry experts, ensuring your
                  success every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <ValueProposition key={value.title} {...value} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Join the future of territory management.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

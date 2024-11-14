import * as React from 'react';
import { Link } from 'react-router-dom';
import Stats from '../components/public/Stats';
import Testimonials from '../components/public/Testimonials';
import CTASection from '../components/public/CTASection';

function HomePage(): React.ReactElement {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Introducing EffiMapPro
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Smart Territory</span>
                  <span className="block text-blue-600">Management Made Easy</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Transform how you manage territories with our intelligent mapping platform. 
                Optimize coverage, boost efficiency, and drive growth with data-driven insights.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="space-x-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    to="/demo"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="/api/placeholder/640/360"
                    alt="Territory management dashboard"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Intelligent Mapping',
                description: 'Create and manage territories with precision',
                icon: 'í·ºï¸'
              },
              {
                title: 'Real-time Analytics',
                description: 'Make data-driven decisions instantly',
                icon: 'í³Š'
              },
              {
                title: 'Team Collaboration',
                description: 'Work seamlessly across your organization',
                icon: 'í´'
              }
            ].map((feature) => (
              <div key={feature.title} className="relative p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default HomePage;

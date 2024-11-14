import * as React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection(): React.ReactElement {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-blue-900">
      {/* Background decoration */}
      <div className="absolute inset-0 transform -skew-y-3 bg-gradient-to-r from-blue-800 to-blue-900 -z-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Transform Your Territory Management Today
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of successful businesses using EffiMapPro to optimize their sales territories and boost performance.
          </p>
        </div>

        {/* Price cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Free Trial Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900">14-Day Free Trial</h3>
              <p className="mt-2 text-gray-500">Experience all premium features risk-free</p>
              <div className="mt-6">
                <ul className="space-y-4">
                  {['Full access to all features', 'Priority support', 'Data import assistance', 'Training sessions'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/signup"
                className="mt-8 block w-full bg-blue-600 text-center py-3 px-4 rounded-md text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Demo Card */}
          <div className="bg-blue-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">Live Demo</h3>
              <p className="mt-2 text-blue-200">See EffiMapPro in action</p>
              <div className="mt-6">
                <ul className="space-y-4">
                  {['Personalized walkthrough', 'Q&A session', 'Custom scenario testing', 'ROI calculation'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-blue-100">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/demo"
                className="mt-8 block w-full bg-white text-center py-3 px-4 rounded-md text-blue-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">Enterprise Solution</h3>
              <p className="mt-2 text-gray-300">Custom-tailored for your business</p>
              <div className="mt-6">
                <ul className="space-y-4">
                  {['Custom implementation', 'Dedicated support team', 'Enterprise integrations', 'Advanced security'].map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="mt-8 block w-full bg-blue-500 text-center py-3 px-4 rounded-md text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-blue-100">
            Have questions? Our team is here to help.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center text-blue-200 hover:text-white"
          >
            Talk to an expert
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

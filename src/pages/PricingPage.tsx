import { useState } from 'react';
import PricingCard from '../components/public/PricingCard';
import VolumeDiscountCalculator from '../components/public/VolumeDiscountCalculator';

const pricingTiers = [
  {
    name: 'Basic',
    price: 25,
    description: 'Everything you need to get started with territory management.',
    features: [
      'Territory mapping',
      'Route optimization',
      'Branch-level segmentation',
      'Basic reporting dashboards',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 40,
    description: 'Advanced features for growing teams and complex territory management.',
    features: [
      'Everything in Basic',
      'Advanced analytics',
      'Team performance tracking',
      'Multi-branch integrations',
      'Priority email support',
      'Custom reporting',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 0,
    description: 'Custom solutions for large organizations with specific needs.',
    features: [
      'Everything in Professional',
      'Dedicated success manager',
      'On-demand consulting',
      'Custom integrations',
      'SLA guarantees',
      'Training sessions',
    ],
    buttonText: 'Contact Sales',
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    // Handle contact/signup flow
    if (tierName === 'Enterprise') {
      window.location.href = '/contact';
    } else {
      // Implement signup flow
      console.log(`Selected ${tierName} tier`);
    }
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="relative">
              <PricingCard
                {...tier}
                onSelect={() => handleSelectTier(tier.name)}
              />
            </div>
          ))}
        </div>

        {/* Volume Discount Calculator */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Volume Discounts
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Save more as your team grows. Calculate your discount below.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <VolumeDiscountCalculator />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          {/* Add FAQ content here */}
        </div>
      </div>
    </div>
  );
}

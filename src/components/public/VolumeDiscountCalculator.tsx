import { useState, useMemo } from 'react';

interface DiscountTier {
  minUsers: number;
  discount: number;
}

const discountTiers: DiscountTier[] = [
  { minUsers: 5, discount: 0.05 },
  { minUsers: 11, discount: 0.10 },
  { minUsers: 21, discount: 0.15 },
];

export default function VolumeDiscountCalculator() {
  const [userCount, setUserCount] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'professional'>('professional');

  const basePrice = selectedPlan === 'basic' ? 25 : 40;

  const calculation = useMemo(() => {
    const applicableTier = [...discountTiers]
      .reverse()
      .find(tier => userCount >= tier.minUsers);

    const discount = applicableTier?.discount || 0;
    const monthlyPerUser = basePrice * (1 - discount);
    const totalMonthly = monthlyPerUser * userCount;
    const savings = basePrice * userCount - totalMonthly;

    return {
      discountPercentage: discount * 100,
      pricePerUser: monthlyPerUser,
      total: totalMonthly,
      savings,
    };
  }, [userCount, basePrice]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Calculate Your Volume Discount
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Plan
          </label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value as 'basic' | 'professional')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="basic">Basic ($25/user)</option>
            <option value="professional">Professional ($40/user)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Users
          </label>
          <input
            type="number"
            min="1"
            value={userCount}
            onChange={(e) => setUserCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Discount Applied</dt>
              <dd className="text-sm font-semibold text-gray-900">
                {calculation.discountPercentage}%
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Price Per User</dt>
              <dd className="text-sm font-semibold text-gray-900">
                ${calculation.pricePerUser.toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <dt className="text-base font-medium text-gray-900">Monthly Total</dt>
              <dd className="text-base font-semibold text-blue-600">
                ${calculation.total.toFixed(2)}
              </dd>
            </div>
            {calculation.savings > 0 && (
              <div className="flex justify-between pt-2 text-green-600">
                <dt className="text-sm">Your Savings</dt>
                <dd className="text-sm font-semibold">
                  ${calculation.savings.toFixed(2)}/month
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}

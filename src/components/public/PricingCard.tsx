interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

interface PricingCardProps extends PricingTier {
  onSelect: () => void;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Get Started",
  onSelect
}: PricingCardProps) {
  return (
    <div className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
      isPopular ? 'border-2 border-blue-500' : 'border border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 transform">
          <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
          <span className="text-base font-medium text-gray-500">/user/month</span>
        </p>
        <button
          onClick={onSelect}
          className={`mt-8 block w-full rounded-md px-4 py-2 text-sm font-semibold text-center ${
            isPopular
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          {buttonText}
        </button>
      </div>
      <div className="px-6 pt-6 pb-8">
        <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
          What's included
        </h3>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex space-x-3">
              <svg
                className="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

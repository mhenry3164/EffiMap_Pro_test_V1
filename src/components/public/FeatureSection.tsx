interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  isReversed?: boolean;
}

export default function FeatureSection({
  title,
  description,
  image,
  features,
  isReversed = false,
}: FeatureSectionProps) {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
          isReversed ? 'lg:grid-flow-row-dense' : ''
        }`}>
          <div className={`${isReversed ? 'lg:col-start-2' : ''}`}>
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {title}
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              {description}
            </p>
            <div className="mt-10">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-base text-gray-500">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`mt-10 lg:mt-0 ${isReversed ? 'lg:col-start-1' : ''}`}>
            <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 overflow-hidden">
              {/* Replace with your actual image component */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                {image}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

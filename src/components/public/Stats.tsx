import * as React from 'react';

interface StatItem {
  id: number;
  stat: string;
  emphasis: string;
  description: string;
}

export default function Stats(): React.ReactElement {
  const stats: StatItem[] = [
    {
      id: 1,
      stat: '35%',
      emphasis: 'Increase in Sales',
      description: 'Average improvement in territory performance'
    },
    {
      id: 2,
      stat: '2.5x',
      emphasis: 'Faster Planning',
      description: 'Reduction in territory planning time'
    },
    {
      id: 3,
      stat: '10k+',
      emphasis: 'Territories Managed',
      description: 'Across diverse industries globally'
    },
    {
      id: 4,
      stat: '98%',
      emphasis: 'Customer Satisfaction',
      description: 'From businesses of all sizes'
    }
  ];

  return (
    <div className="relative bg-blue-800">
      <div className="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-2">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src="/api/placeholder/2000/1000"
              alt="People working on laptops"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-blue-800 opacity-50" />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
          <div className="mt-12 grid gap-y-12 gap-x-8 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.id} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="ml-16 text-5xl font-extrabold text-white">{item.stat}</p>
                </dt>
                <dd className="mt-2 ml-16">
                  <p className="text-lg font-medium text-blue-200">{item.emphasis}</p>
                  <p className="text-base text-blue-100">{item.description}</p>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

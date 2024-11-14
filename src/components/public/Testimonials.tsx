import * as React from 'react';

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
  };
  rating: number;
  featured?: boolean;
}

export default function Testimonials(): React.ReactElement {
  const testimonials: Testimonial[] = [
    {
      content: "EffiMapPro revolutionized our territory management. The real-time analytics and intelligent mapping features helped us increase our sales coverage by 40% while reducing overlap. It's been a game-changer for our entire sales organization.",
      author: {
        name: "Sarah Chen",
        role: "Director of Sales Operations",
        company: "TechGrowth Solutions",
        image: "/api/placeholder/100/100"
      },
      rating: 5,
      featured: true
    },
    {
      content: "The ROI was immediate. Within three months, we optimized our territories so effectively that our travel costs decreased by 30% while customer satisfaction improved. The collaborative features made territory planning actually enjoyable.",
      author: {
        name: "Marcus Rodriguez",
        role: "Regional Sales Manager",
        company: "Global Industries Inc.",
        image: "/api/placeholder/100/100"
      },
      rating: 5
    },
    {
      content: "Implementation was seamless, and the support team has been exceptional. What impressed me most was how quickly our sales team adopted the platform - it's intuitive and powerful at the same time.",
      author: {
        name: "Emily Thompson",
        role: "VP of Operations",
        company: "Innovate Dynamics",
        image: "/api/placeholder/100/100"
      },
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See how businesses are transforming their territory management with EffiMapPro
          </p>
        </div>

        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative p-8 ${
                testimonial.featured
                  ? 'bg-blue-700 text-white ring-4 ring-blue-700'
                  : 'bg-white text-gray-900 ring-1 ring-gray-200'
              } rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {testimonial.featured && (
                <div className="absolute top-0 right-0 -translate-y-1/2 transform">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
                    Featured
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote>
                <p className={`text-lg font-medium ${
                  testimonial.featured ? 'text-white' : 'text-gray-900'
                }`}>
                  "{testimonial.content}"
                </p>
              </blockquote>

              <div className="mt-6 flex items-center">
                {testimonial.author.image && (
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                  />
                )}
                <div className="ml-4">
                  <p className={`text-base font-medium ${
                    testimonial.featured ? 'text-white' : 'text-gray-900'
                  }`}>
                    {testimonial.author.name}
                  </p>
                  <div className={`text-sm ${
                    testimonial.featured ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    <p>{testimonial.author.role}</p>
                    <p>{testimonial.author.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          
            href="/case-studies"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <span>Read more case studies</span>
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
          </a>
        </div>
      </div>
    </div>
  );
}

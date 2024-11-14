import FeatureSection from '../components/public/FeatureSection';
import DemoSection from '../components/public/DemoSection';

const featureSections = [
  {
    title: "Precision Territory Mapping",
    description: "Create and manage sales territories with unprecedented accuracy and flexibility.",
    image: "Map Visualization",
    features: [
      "Interactive map interface for territory creation and editing",
      "Custom boundary definition with drag-and-drop simplicity",
      "Multi-level territory hierarchy support",
      "Real-time territory overlap detection",
      "Automated territory balancing suggestions"
    ]
  },
  {
    title: "Integrated Data Insights",
    description: "Transform your territory data into actionable insights with our powerful analytics suite.",
    image: "Analytics Dashboard",
    features: [
      "Real-time performance metrics and KPIs",
      "Custom report generation and scheduling",
      "Advanced data visualization tools",
      "Territory performance comparisons",
      "Trend analysis and forecasting"
    ],
    isReversed: true
  },
  {
    title: "Dynamic Route Optimization",
    description: "Maximize efficiency with intelligent route planning and optimization.",
    image: "Route Planning",
    features: [
      "AI-powered route suggestions",
      "Traffic and travel time considerations",
      "Multi-stop journey optimization",
      "Mobile-friendly route access",
      "Real-time route adjustments"
    ]
  },
  {
    title: "Team Collaboration Tools",
    description: "Enable seamless cooperation across your entire sales organization.",
    image: "Collaboration Tools",
    features: [
      "Real-time territory sharing and updates",
      "Role-based access control",
      "Team performance tracking",
      "Communication tools and notifications",
      "Activity logging and audit trails"
    ],
    isReversed: true
  }
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Powerful Features for Modern Teams
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Everything you need to manage territories effectively and drive growth, all in one platform.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        {featureSections.map((section, index) => (
          <FeatureSection
            key={section.title}
            {...section}
          />
        ))}
      </div>

      {/* Demo Section */}
      <DemoSection />

      {/* Integration Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Seamless Integrations
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Connect EffiMapPro with your favorite tools and services.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              {/* Add integration logos/placeholders here */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="col-span-1 flex justify-center items-center h-16 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-400">Logo {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

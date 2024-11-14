export default function DemoSection() {
  return (
    <div className="bg-blue-700">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              See EffiMapPro in Action
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-blue-200">
              Watch how easily you can manage territories, optimize routes, and drive better results with our intuitive platform.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50">
                Schedule Live Demo
              </button>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-lg overflow-hidden bg-gray-100">
              {/* Replace with your demo video or interactive demo */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Demo Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

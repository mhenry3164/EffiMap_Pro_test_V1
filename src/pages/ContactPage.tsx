import ContactForm from '../components/public/ContactForm';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

const supportOptions = [
  {
    name: 'Sales',
    description: 'Speak with our sales team about EffiMapPro.',
    icon: PhoneIcon,
    contact: '+1 (555) 123-4567'
  },
  {
    name: 'Support',
    description: 'Get help with technical issues or questions.',
    icon: EnvelopeIcon,
    contact: 'support@effiwise.com'
  },
  {
    name: 'Live Chat',
    description: 'Chat with our team during business hours.',
    icon: ChatBubbleLeftIcon,
    contact: 'Available 9AM-5PM EST'
  }
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
              Have questions? We're here to help. Choose the best way to reach us below.
            </p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {supportOptions.map((option) => (
              <div
                key={option.name}
                className="bg-white rounded-lg shadow-sm p-8 text-center"
              >
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                  <option.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {option.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {option.description}
                </p>
                <p className="mt-4 text-base font-medium text-blue-600">
                  {option.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="relative overflow-hidden bg-blue-700 py-10 px-6 sm:px-10 xl:p-12">
              <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Contact Information</h3>
              <p className="mt-6 text-base text-blue-50 max-w-3xl">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                <dd className="flex text-base text-blue-50">
                 <PhoneIcon className="flex-shrink-0 w-6 h-6 text-blue-200" aria-hidden="true" />
                  <span className="ml-3">+1 (555) 123-4567</span>
                </dd>
                <dt>
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="flex text-base text-blue-50">
                  <EnvelopeIcon className="flex-shrink-0 w-6 h-6 text-blue-200" aria-hidden="true" />
                  <span className="ml-3">contact@effiwise.com</span>
                </dd>
              </dl>
              <ul role="list" className="mt-8 flex space-x-12">
                <li>
                  <a className="text-blue-200 hover:text-blue-100" href="#">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="text-blue-200 hover:text-blue-100" href="#">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-8 divide-y divide-gray-200">
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  How quickly can I get started with EffiMapPro?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                You can get started immediately after signing up. Our onboarding team will help you set up your account and import your data within 24-48 hours.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  Do you offer custom enterprise solutions?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Yes, we offer customized enterprise solutions. Contact our sales team to discuss your specific requirements.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg">
                <span className="font-medium text-gray-900">
                  What kind of support do you provide?
                </span>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                We provide email support for all plans, with priority support and dedicated account managers for Professional and Enterprise plans.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

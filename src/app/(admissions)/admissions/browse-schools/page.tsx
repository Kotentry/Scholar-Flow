import { schools } from '@/lib/data/schoolsData';
import { SchoolsGrid } from '@/components/interfaces/admissions/browse/SchoolsGrid';
import { FaGraduationCap, FaSearch, FaUserCheck, FaSchool, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { ScrollButton } from '@/components/interfaces/admissions/browse/ScrollButton';
import { SectionHeader } from '@/components/ui/SectionHeader';

const features = [
  {
    icon: <FaSearch className="text-3xl" />,
    title: "Easy School Search",
    description: "Find the perfect school with our advanced search and filtering system"
  },
  {
    icon: <FaUserCheck className="text-3xl" />,
    title: "Simple Application",
    description: "Apply to multiple schools with a streamlined application process"
  },
  {
    icon: <FaSchool className="text-3xl" />,
    title: "Top Institutions",
    description: "Access to the best educational institutions across the country"
  },
  {
    icon: <FaGraduationCap className="text-3xl" />,
    title: "Track Progress",
    description: "Monitor your application status in real-time"
  }
];

const stats = [
  { number: "500+", label: "Schools", icon: <FaSchool /> },
  { number: "50k+", label: "Students", icon: <FaUsers /> },
  { number: "95%", label: "Success Rate", icon: <FaChartLine /> },
  { number: "100%", label: "Secure", icon: <FaShieldAlt /> },
];

export default function BrowseSchoolsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-zinc-900 to-zinc-800 text-white py-20">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="mb-8">
              <AnimatedLogo size="lg" color="white" />
            </div>
            <SectionHeader title="Find Your Dream School" subtitle='Browse through our selection of top schools and find the perfect fit for your educational journey.' className="mt-4 mb-8"
            light/>
            <p className="text-xl text-zinc-300 mb-8">
              
            </p>
            <div className="flex justify-center">
              <ScrollButton />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container px-4 max-w-7xl mx-auto">
          <SectionHeader 
            title="Why Choose Scholar Flow?"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100 text-center"
              >
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="py-20 scroll-mt-8">
        <div className="container px-4 max-w-7xl mx-auto">
          <SectionHeader 
            title="Available Schools"
            subtitle="Discover and apply to schools that match your educational goals. Use our advanced filters to find the perfect fit."
            className="mb-12"
          />
          <SchoolsGrid schools={schools} />
        </div>
      </section>

      {/* Application Guide */}
      <section className="py-20 bg-zinc-50">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader 
              title="How to Apply"
              className="mb-12"
            />
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Browse and Select</h3>
                  <p className="text-zinc-600">Search through our comprehensive list of schools and find ones that match your criteria.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-zinc-600">Sign up with your email to receive your credentials and start your application journey.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">Submit and Track</h3>
                  <p className="text-zinc-600">Complete your application and track its progress through our dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <AnimatedLogo size="md" color="white" />
          <SectionHeader 
            title="Ready to Start Your Journey?"
            subtitle="Join thousands of students who have found their perfect educational fit through Scholar Flow."
            className="mt-4 mb-8"
            light
          />
          <ScrollButton />
        </div>
      </section>
    </main>
  );
}

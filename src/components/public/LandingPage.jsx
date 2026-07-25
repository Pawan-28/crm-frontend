import React, { useState, useRef } from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { createPublicLead } from '../../services/leads';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  UserIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  UsersIcon,
  ClockIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    source: 'website',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createPublicLead(formData);
      setSubmitted(true);
      toast.success('Lead submitted successfully! We will contact you soon.');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        source: 'website',
        message: '',
      });
    } catch (error) {
      console.error('Failed to submit lead:', error);
      toast.error('Failed to submit lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: UsersIcon,
      title: 'Lead Management',
      description: 'Easily capture, track, and manage all your leads in one central location.',
      color: 'blue',
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Reports',
      description: 'Gain valuable insights with detailed analytics and performance reports.',
      color: 'purple',
    },
    {
      icon: ClockIcon,
      title: 'Real-time Updates',
      description: 'Stay updated with real-time notifications and activity tracking.',
      color: 'green',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Your data is safe with enterprise-grade security and encryption.',
      color: 'red',
    },
    {
      icon: ArrowPathIcon,
      title: 'Automated Workflows',
      description: 'Automate repetitive tasks and streamline your lead management process.',
      color: 'orange',
    },
    {
      icon: CheckCircleIcon,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing tools and workflows.',
      color: 'teal',
    },
  ];

  const services = [
    {
      title: 'Lead Capture',
      description: 'Capture leads from multiple sources including website, social media, and referrals.',
      icon: '📥',
    },
    {
      title: 'Lead Distribution',
      description: 'Automatically assign leads to the right team members based on rules.',
      icon: '🔄',
    },
    {
      title: 'Follow-up Management',
      description: 'Schedule and track follow-ups to never miss an opportunity.',
      icon: '⏰',
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor team performance and lead conversion rates in real-time.',
      icon: '📊',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    red: 'bg-red-50 text-red-600 hover:bg-red-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <SparklesIcon className="h-4 w-4" />
                Trusted by 500+ businesses
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Streamline Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Lead Management</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Capture, track, and convert more leads with our powerful CRM solution.
                Everything you need to grow your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Get Started
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Try Our CRM</h3>
                  <p className="text-sm text-gray-500 mt-1">See how it works</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-700">Total Leads</span>
                    <span className="text-lg font-bold text-blue-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <span className="text-lg font-bold text-green-600">32.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-gray-700">Active Members</span>
                    <span className="text-lg font-bold text-purple-600">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">About Our CRM</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600">
              We help businesses of all sizes manage their leads effectively and grow their customer base.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Our Mission</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-700 transition-colors">
                To empower businesses with the tools they need to capture, nurture, and convert leads
                efficiently, driving growth and success.
              </p>
            </div>
            <div className="group p-6 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Our Vision</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-700 transition-colors">
                To become the leading CRM solution for businesses worldwide, making lead management
                simple, effective, and accessible for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive lead management solutions tailored to your business needs.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Lead Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 rounded-full"></div>
              <p className="mt-4 text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="mt-8 space-y-4">
                <div className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors flex items-center justify-center">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">info@crm.com</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors flex items-center justify-center">
                    <PhoneIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">123 Business Ave, Suite 100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Request a Demo</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Fill out the form and our team will reach out to you shortly.
                </p>
              </div>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircleIcon className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Thank You!</h4>
                  <p className="mt-2 text-gray-600">
                    Your request has been submitted. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2 group"
                  >
                    Submit another request
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="1234567890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Tech Corp"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
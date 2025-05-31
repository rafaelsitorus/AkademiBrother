'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Hospital, BarChart3, Users, CheckCircle, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/Logo.png"
                alt="Healthify Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-emerald-800">Healthify</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition-colors">Testimonials</a>
            </nav>
            <div className="flex space-x-4">
              <Link 
                href="/signin"
                className="px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Revolutionary
                  <span className="text-emerald-600 block">Healthcare</span>
                  Management
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Combat fraud and optimize resource distribution with our AI-powered platform. 
                  Ensuring integrity while improving healthcare access for everyone.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 text-lg font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-emerald-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">99.9%</div>
                  <div className="text-sm text-gray-600">Fraud Detection</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">50+</div>
                  <div className="text-sm text-gray-600">Healthcare Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">System Monitoring</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                    <Shield className="h-8 w-8 text-red-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Fraud Alert</div>
                      <div className="text-sm text-gray-600">Suspicious claim detected</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <Hospital className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Resource Allocation</div>
                      <div className="text-sm text-gray-600">Optimizing facility distribution</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Analytics Dashboard</div>
                      <div className="text-sm text-gray-600">Real-time insights available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform addresses the most critical challenges in healthcare management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fraud Detection */}
            <div className="group p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fraud Detection</h3>
              <p className="text-gray-600 mb-6">
                AI-powered system automatically flags suspicious insurance claims, reducing financial losses and ensuring system integrity.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Automated claim analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time fraud alerts
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Comprehensive reporting
                </li>
              </ul>
            </div>

            {/* Resource Management */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Hospital className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Resource Management</h3>
              <p className="text-gray-600 mb-6">
                Optimize healthcare facility distribution based on predictive analytics and community needs assessment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Facility needs prediction
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Geographic optimization
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Resource allocation tracking
                </li>
              </ul>
            </div>

            {/* Analytics Dashboard */}
            <div className="group p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive dashboards providing actionable insights for healthcare administrators and insurance providers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time data visualization
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Trend analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Custom reporting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, powerful, and designed for healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Connect Your Systems</h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing healthcare management and insurance systems.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our machine learning models analyze data patterns to detect fraud and predict resource needs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Actionable Insights</h3>
              <p className="text-gray-600">
                Receive real-time alerts, recommendations, and comprehensive analytics to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Trusted by healthcare professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;Healthify has revolutionized how we handle insurance claims. The fraud detection is incredibly accurate.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Insurance Director</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;The resource allocation features helped us optimize our facility distribution across the region.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">Healthcare Administrator</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;The analytics dashboard provides insights we never had before. It&apos;s a game-changer for our operations.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Lisa Rodriguez</div>
                  <div className="text-sm text-gray-600">Data Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Healthcare Management?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of healthcare professionals using Healthify to combat fraud and optimize resources.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/signin"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/Logo.png"
                  alt="Healthify Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold">Healthify</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare management through AI-powered fraud detection and resource optimization.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fraud Detection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resource Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Healthify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
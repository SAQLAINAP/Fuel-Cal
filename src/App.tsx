import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from './components/icons';
import FuelCalculator from './components/FuelCalculator';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <Navigation className="w-8 h-8 text-blue-400 mr-2" />
            <span className="font-sf-pro text-2xl font-bold">RoadCost</span>
          </div>
          <Link 
            to="/calculator"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-helvetica-neue transition-colors"
          >
            Try Calculator
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-sf-pro text-5xl md:text-6xl font-bold leading-tight">
              Plan Your Journey.<br />
              <span className="text-blue-400">Calculate Your Costs.</span>
            </h1>
            <p className="font-helvetica-neue text-xl text-gray-300">
              Make informed decisions about your road trips with our advanced fuel cost calculator. 
              Get accurate estimates based on your vehicle and route.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/calculator"
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-montserrat font-medium text-lg transition-colors"
              >
                Start Calculating
              </Link>
              <a 
                href="#features"
                className="border border-gray-500 hover:border-blue-400 px-8 py-3 rounded-full font-montserrat font-medium text-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" 
              alt="Road trip planning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div id="features" className="py-24">
          <h2 className="font-sf-pro text-3xl font-bold text-center mb-16">Why Choose RoadCost?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accurate Calculations',
                description: 'Get precise fuel cost estimates based on real vehicle data and current fuel prices.'
              },
              {
                title: 'Multiple Vehicles',
                description: 'Compare costs across different vehicles to make the best choice for your journey.'
              },
              {
                title: 'Popular Routes',
                description: 'Access pre-calculated distances for major routes across the country.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl">
                <h3 className="font-montserrat font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="font-helvetica-neue text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<FuelCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
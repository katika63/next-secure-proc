// components/sections/Methodology.js
export default function Methodology() {
    return (
      <section className="py-16 px-6 bg-gray-800 bg-opacity-60">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Our 4-Phase Approach</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="service-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Discovery</h3>
              <p className="text-gray-300">
                Asset inventory and configuration analysis across all environments (cloud, on-prem, IoT)
              </p>
            </div>
            
            <div className="service-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-bug"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">2. Assessment</h3>
              <p className="text-gray-300">
                Multi-scanner validation with <span className="font-medium">zero false positives</span> guaranteed
              </p>
            </div>
            
            <div className="service-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-chess-king"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Prioritization</h3>
              <p className="text-gray-300">
                Context-aware scoring based on exploitability and business impact
              </p>
            </div>
            
            <div className="service-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-tools"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">4. Remediation</h3>
              <p className="text-gray-300">
                Step-by-step guidance including virtual patching options
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
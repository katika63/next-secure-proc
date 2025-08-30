// components/sections/JARVISIntegration.js
export default function JARVISIntegration() {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-robot text-blue-400 text-2xl mr-3"></i>
              <h3 className="text-xl font-bold text-gray-200">JARVIS AI Vulnerability Intelligence</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 mb-4">
                  Our AI system predicts <span className="text-blue-400">which vulnerabilities will be weaponized</span> within the next 30 days by analyzing:
                </p>
                <ul className="text-gray-300 space-y-3 list-disc pl-5 mb-6">
                  <li>Dark web exploit development activity</li>
                  <li>Patch adoption rates across industries</li>
                  <li>Historical attack pattern correlations</li>
                  <li>Your specific tech stack vulnerabilities</li>
                </ul>
                <p className="text-gray-300">
                  This results in <span className="font-medium">91% more accurate prioritization</span> than traditional methods.
                </p>
              </div>
              
              {/* AI Prediction Visualization */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Predicted Exploit Timeline</span>
                  <span>Confidence</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">CVE-2023-32456</span>
                      <span className="text-sm font-bold text-red-400">87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">CVE-2023-32845</span>
                      <span className="text-sm font-bold text-yellow-400">63%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '63%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">CVE-2023-33122</span>
                      <span className="text-sm font-bold text-green-400">22%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{width: '22%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
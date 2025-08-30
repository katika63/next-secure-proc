// components/sections/ServiceOverview.js
export default function ServiceOverview() {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 gradient-text">Close Security Gaps Intelligently</h2>
            <p className="text-gray-300 mb-6 text-lg">
              BTMSecurity&apos;s Vulnerability Management combines <span className="text-blue-400">automated scanning</span> with <span className="text-blue-400">human expertise</span> to reduce your attack surface by an average of <span className="font-bold">83% within 90 days</span>. Our system prioritizes risks based on actual exploit activity, not just CVSS scores.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <i className="fas fa-check-circle text-blue-400 mt-1 mr-3"></i>
                <p className="text-gray-300"><span className="font-bold">94% faster</span> vulnerability remediation than industry average</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-blue-400 mt-1 mr-3"></i>
                <p className="text-gray-300"><span className="font-bold">Zero disruption</span> to production systems during scans</p>
              </div>
            </div>
            
            <a href="/contact/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Request Vulnerability Assessment
            </a>
          </div>
          
          {/* Vulnerability Heatmap Visualization */}
          <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-center text-gray-200">Live Risk Heatmap</h3>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <div className="h-8 bg-green-600/80 rounded"></div>
              <div className="h-12 bg-yellow-500/80 rounded"></div>
              <div className="h-6 bg-green-600/80 rounded"></div>
              <div className="h-16 bg-red-600/80 rounded"></div>
              <div className="h-8 bg-yellow-500/80 rounded"></div>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <div className="h-10 bg-yellow-500/80 rounded"></div>
              <div className="h-20 bg-red-600/80 rounded"></div>
              <div className="h-12 bg-yellow-500/80 rounded"></div>
              <div className="h-8 bg-green-600/80 rounded"></div>
              <div className="h-16 bg-red-600/80 rounded"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600/80 rounded-full mr-1"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500/80 rounded-full mr-1"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600/80 rounded-full mr-1"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
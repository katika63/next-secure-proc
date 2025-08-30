import Image from 'next/image'

export default function TrainingMethodology() {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 gradient-text">Our Hands-On Training Approach</h2>
            <p className="text-gray-300 mb-6 text-lg">
              BTMSecurity&apos;s training programs combine <span className="text-blue-400">real-world attack simulations</span>, interactive workshops, and threat intelligence briefings to create <span className="font-bold">cyber-aware employees</span> who can recognize and mitigate risks.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <i className="fas fa-flag text-blue-400 mt-1 mr-3"></i>
                <p className="text-gray-300"><span className="font-bold">Red Team vs. Blue Team exercises</span> for practical experience</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-laptop-code text-blue-400 mt-1 mr-3"></i>
                <p className="text-gray-300"><span className="font-bold">Virtual cyber ranges</span> with live-fire attack scenarios</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-certificate text-blue-400 mt-1 mr-3"></i>
                <p className="text-gray-300"><span className="font-bold">Certification paths</span> aligned with NIST and CIS benchmarks</p>
              </div>
            </div>
          </div>
          
          {/* Training Process Visualization */}
          <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Security Training Session" 
                width={1200}
                height={400}
                className="w-full rounded-lg mb-4" 
              />
            </div>
            <h3 className="text-lg font-bold mb-4 text-center text-gray-200">Our Training Methodology</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="module-pill w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                <div>
                  <h4 className="font-bold text-blue-400">Threat Awareness</h4>
                  <p className="text-gray-300 text-sm">Phishing, social engineering, malware defense</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="module-pill w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                <div>
                  <h4 className="font-bold text-blue-300">Technical Skills</h4>
                  <p className="text-gray-300 text-sm">Incident response, forensics, secure coding</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="module-pill w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                <div>
                  <h4 className="font-bold text-blue-200">Leadership Training</h4>
                  <p className="text-gray-300 text-sm">CISO workshops, risk management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
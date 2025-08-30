import Image from 'next/image'

export default function TrainingPrograms() {
    return (
      <section className="py-16 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive <span className="gradient-text">Training Programs</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Security Awareness Training"
                width={600}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 transition duration-300">
                <div className="text-blue-400 text-3xl mb-4">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Employee Cyber Awareness</h3>
                <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                  <li>Phishing simulation campaigns</li>
                  <li>Social engineering defense</li>
                  <li>Password hygiene best practices</li>
                  <li>Data handling compliance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Technical Skills Training"
                width={600}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 transition duration-300">
                <div className="text-blue-400 text-3xl mb-4">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Technical Security Training</h3>
                <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                  <li>Penetration testing labs</li>
                  <li>Incident response drills</li>
                  <li>Cloud security workshops</li>
                  <li>Secure coding bootcamps</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Leadership Training"
                width={600}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 transition duration-300">
                <div className="text-blue-400 text-3xl mb-4">
                  <i className="fas fa-chess-king"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Executive Cyber Leadership</h3>
                <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                  <li>Cyber risk management</li>
                  <li>Regulatory compliance</li>
                  <li>Security governance</li>
                  <li>Third-party risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
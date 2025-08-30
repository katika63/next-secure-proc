import Image from 'next/image'

export default function TrainingCaseStudy() {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <i className="fas fa-university text-blue-400 text-2xl mr-3"></i>
                <h3 className="text-2xl font-bold text-gray-200">University Security Training</h3>
              </div>
              <h4 className="text-xl font-bold mb-4 text-blue-400">Higher Education Case Study</h4>
              <Image 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="University security training"
                width={600}
                height={300}
                className="rounded-lg mb-4" 
              />
              <p className="text-gray-300 mb-6">
                For a major university facing increasing phishing attacks, BTMSecurity implemented:
              </p>
              <ul className="text-gray-300 space-y-3 list-disc pl-5 mb-6">
                <li>Customized security awareness program for 15,000 staff/students</li>
                <li>Quarterly simulated phishing tests with coaching</li>
                <li>Secure research computing training for faculty</li>
                <li>IT staff certification in incident response</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 p-8 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-blue-400 mb-2">87%</div>
                <div className="text-gray-300">Reduction in Phishing Susceptibility</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">42</div>
                  <div className="text-gray-400 text-sm">Staff Certified</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-gray-400 text-sm">Major Breaches</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">96%</div>
                  <div className="text-gray-400 text-sm">Training Completion</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">4.8/5</div>
                  <div className="text-gray-400 text-sm">Satisfaction Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
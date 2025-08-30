export default function TrainingPrograms() {
    return (
      <section className="py-16 px-6 bg-gray-800 bg-opacity-60">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Our Security Training Programs</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="training-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Employee Cyber Awareness</h3>
              <img src="https://images.unsplash.com/photo-1591467554401-1ec5c94dec4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYyfHxDeWJlciUyMEF3YXJlbmVzc3xlbnwwfHwwfHx8MA%3D%3D" 
                   alt="Security awareness training"
                   className="rounded-lg mb-3" />
              <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                <li>Phishing simulation campaigns</li>
                <li>Social engineering defense</li>
                <li>Password hygiene best practices</li>
                <li>Data handling compliance</li>
              </ul>
            </div>
            
            <div className="training-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Technical Security Training</h3>
              <img src="https://images.unsplash.com/photo-1532522750741-628fde798c73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlbmV0cmF0aW9uJTIwdGVzdGluZyUyMGN5YmVyJTIwc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D" 
                   alt="Technical security training"
                   className="rounded-lg mb-3" />
              <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                <li>Penetration testing labs</li>
                <li>Incident response drills</li>
                <li>Cloud security workshops</li>
                <li>Secure coding bootcamps</li>
              </ul>
            </div>
            
            <div className="training-card bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 transition duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-chess-king"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Executive Cyber Leadership</h3>
              <img src="https://media.istockphoto.com/id/1363139896/photo/mature-businessman-using-laptop-in-a-factory.webp?a=1&b=1&s=612x612&w=0&k=20&c=8jWpI5BO2LPxQsgsfH9Ef-4YORE-6KsO8-826Fq7meA=" 
                   alt="Executive security training"
                   className="rounded-lg mb-3" />
              <ul className="text-gray-300 space-y-2 text-sm list-disc pl-5">
                <li>Cyber risk management</li>
                <li>Regulatory compliance</li>
                <li>Security governance</li>
                <li>Third-party risk assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
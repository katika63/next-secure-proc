// components/sections/EducationSection.js
import Link from 'next/link'

export default function EducationSection() {
  return (
    <section className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl p-8 mb-16 mx-6 max-w-7xl mx-auto">
      <div className="md:flex items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold mb-6">Cybersecurity <span className="gradient-text">Education</span></h2>
          <p className="text-gray-300 mb-6">
            At BTMSecurity, we believe knowledge is the best defense. Our training programs are designed to:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <i className="fas fa-check text-blue-400 mt-1 mr-2"></i>
              <span>Demystify cybersecurity concepts for non-technical audiences</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-blue-400 mt-1 mr-2"></i>
              <span>Develop advanced technical skills for security professionals</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-blue-400 mt-1 mr-2"></i>
              <span>Provide hands-on experience with real-world scenarios</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-blue-400 mt-1 mr-2"></i>
              <span>Promote security awareness across all organizational levels</span>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Our Training Programs</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-400">Security Awareness</h4>
                <p className="text-sm text-gray-300">Essential training for all employees to recognize and prevent common cyber threats.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Blue Team Fundamentals</h4>
                <p className="text-sm text-gray-300">Core defensive security skills for aspiring security professionals.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Advanced Threat Detection</h4>
                <p className="text-sm text-gray-300">Deep dive into identifying and responding to sophisticated attacks.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Executive Cybersecurity</h4>
                <p className="text-sm text-gray-300">Strategic security insights for business leaders and decision-makers.</p>
              </div>
            </div>
            <Link href="/enrollment" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300">
              Explore Training
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
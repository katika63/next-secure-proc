// components/sections/BecomeTrainer.js
import Link from 'next/link'

export default function BecomeTrainer() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 bg-opacity-60 border border-blue-500 rounded-xl p-8 mt-12">
          <h3 className="text-2xl font-bold mb-4 text-center gradient-text">Become a Certified Trainer</h3>
          <p className="text-gray-300 text-center mb-6">
            Our trainer certification program is highly selective, accepting only the top cybersecurity professionals.
            Recruitment is handled by our administrative team through a rigorous vetting process.
          </p>
          <div className="text-center">
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Express Interest
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
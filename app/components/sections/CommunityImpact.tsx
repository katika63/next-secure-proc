// components/sections/CommunityImpact.js
import Link from 'next/link'

export default function CommunityImpact() {
  return (
    <section className="text-center px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Our <span className="gradient-text">Community</span> Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-400 mb-2">260+</div>
          <div className="text-gray-300 text-sm">Trained Professionals</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
          <div className="text-gray-300 text-sm">Organizations Served</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-400 mb-2">60+</div>
          <div className="text-gray-300 text-sm">Free Workshops</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-400 mb-2">250+</div>
          <div className="text-gray-300 text-sm">Security Resources Accessed</div>
        </div>
      </div>
      <p className="text-gray-300 max-w-3xl mx-auto mb-8">
        We&apos;re committed to making cybersecurity education accessible through free resources, open-source tools, and community initiatives.
      </p>
      <Link href="/contact" className="inline-block border border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 px-6 py-3 rounded-lg font-medium transition duration-300">
        Get Involved
      </Link>
    </section>
  )
}
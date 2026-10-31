import Link from 'next/link'

export default function TrainingCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Human Firewall</h2>
        <p className="text-xl text-blue-200 mb-8">
          Our security training transforms your team into vigilant defenders against social engineering and modern attacks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
            Book a 15-Minute Scoping Call
          </Link>
          <a href="tel:+2347045981315" className="border border-white text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
            Training Consultant: +234 704 598 1315
          </a>
        </div>
      </div>
    </section>
  )
}
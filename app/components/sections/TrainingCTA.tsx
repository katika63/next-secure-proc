export default function TrainingCTA() {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Human Firewall</h2>
          <p className="text-xl text-blue-200 mb-8">
            Our security training transforms your team from vulnerabilities into vigilant defenders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact/" className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
              Request Training Proposal
            </a>
            <a href="tel:+442012345678" className="border border-white text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
              TRAINING CONSULTANT: +44 7901959945
            </a>
          </div>
        </div>
      </section>
    )
  }
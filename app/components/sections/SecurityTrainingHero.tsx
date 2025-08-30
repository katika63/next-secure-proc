export default function SecurityTrainingHero() {
    return (
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Security Training</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Transforming your workforce into the first line of defense with military-grade cybersecurity training
          </p>
          <div className="mt-8">
            <a href="/enrollment" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              <i className="fas fa-user-graduate mr-2"></i> Enroll Your Team
            </a>
          </div>
        </div>
      </section>
    )
  }
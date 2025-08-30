// components/sections/RegionalTrainers.js
export default function RegionalTrainers() {
    const regions = [
      {
        name: 'Europe',
        trainers: [
          { name: 'Sophie Laurent', specialty: 'Advanced Persistent Threat Analysis', licensedSince: 2018 },
          { name: 'Markus Weber', specialty: 'Critical Infrastructure Protection', licensedSince: 2019 },
          { name: 'Elena Petrova', specialty: 'Cyber Threat Intelligence', licensedSince: 2020 },
          { name: 'David O\'Connor', specialty: 'Red Team Operations', licensedSince: 2021 }
        ]
      },
      {
        name: 'North America',
        trainers: [
          { name: 'Jennifer Carter', specialty: 'Cloud Security Posture Management', licensedSince: 2018 },
          { name: 'Michael Rodriguez', specialty: 'Zero Trust Architecture', licensedSince: 2019 },
          { name: 'Sarah Johnson', specialty: 'Security Automation & Orchestration', licensedSince: 2020 },
          { name: 'Robert Chen', specialty: 'AI in Cybersecurity', licensedSince: 2021 }
        ]
      },
      {
        name: 'Asia',
        trainers: [
          { name: 'Raj Patel', specialty: 'DevSecOps Implementation', licensedSince: 2019 },
          { name: 'Mei Ling', specialty: 'Blockchain Security', licensedSince: 2020 },
          { name: 'Hiroshi Tanaka', specialty: 'IoT Security Architecture', licensedSince: 2021 },
          { name: 'Ananya Desai', specialty: 'Security Compliance Frameworks', licensedSince: 2022 }
        ]
      },
      {
        name: 'West Africa',
        trainers: [
          { name: 'Jesse Callistus', specialty: 'Ethical Hacking & Penetration Testing', licensedSince: 2019 },
          { name: 'Olumide Adesanya', specialty: 'Cloud Security Architecture', licensedSince: 2021 },
          { name: 'Charles Adebayo', specialty: 'Network Security & Firewall Configuration', licensedSince: 2020 },
          { name: 'Rita Okafor', specialty: 'Security Operations Center (SOC) Management', licensedSince: 2022 },
          { name: 'Dominic Fashola', specialty: 'Threat Intelligence Analysis', licensedSince: 2020 },
          { name: 'Kelvin Adesanya', specialty: 'Industrial Control Systems Security', licensedSince: 2021 },
          { name: 'Danjuma Ibrahim', specialty: 'Security Awareness Training', licensedSince: 2023 },
          { name: 'Mirabel Bassey', specialty: 'Incident Response & Digital Forensics', licensedSince: 2022 }
        ]
      },
      {
        name: 'East Africa',
        trainers: [
          { name: 'James Mwangi', specialty: 'Cyber Risk Management', licensedSince: 2020 },
          { name: 'Amina Hassan', specialty: 'Secure Coding Practices', licensedSince: 2021 },
          { name: 'Joseph Kamau', specialty: 'Digital Forensics & Incident Response', licensedSince: 2019 },
          { name: 'Fatuma Abdi', specialty: 'Cloud Security & Compliance', licensedSince: 2022 }
        ]
      },
      {
        name: 'South Africa',
        trainers: [
          { name: 'Thabo Mbeki', specialty: 'Enterprise Security Architecture', licensedSince: 2018 },
          { name: 'Nomsa Dlamini', specialty: 'Security Governance & Compliance', licensedSince: 2020 },
          { name: 'Pieter van der Merwe', specialty: 'Industrial IoT Security', licensedSince: 2021 }
        ]
      }
    ]
  
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Regional Trainers</h2>
          
          {regions.map((region, index) => (
            <div key={region.name} className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-2">
                {region.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {region.trainers.map((trainer, trainerIndex) => (
                  <div key={trainerIndex} className="trainer-card rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-2">{trainer.name}</h4>
                    <p className="text-blue-400 mb-3">{trainer.specialty}</p>
                    <p className="text-gray-300 text-sm">Licensed since {trainer.licensedSince}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
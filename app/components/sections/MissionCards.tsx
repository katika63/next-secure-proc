// components/sections/MissionCards.js
import Link from 'next/link'

export default function MissionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-6">
      {/* Card 1 */}
      <div className="mission-card p-8 rounded-xl">
        <div className="text-blue-400 text-4xl mb-4">
          <i className="fas fa-shield-alt"></i>
        </div>
        <h3 className="text-2xl font-bold mb-4">Protect Digital Assets</h3>
        <p className="text-gray-300">
          We develop advanced security solutions to safeguard critical infrastructure, sensitive data, and digital identities against evolving cyber threats.
        </p>
      </div>

      {/* Card 2 */}
      <div className="mission-card p-8 rounded-xl">
        <div className="text-blue-400 text-4xl mb-4">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h3 className="text-2xl font-bold mb-4">Educate & Train</h3>
        <p className="text-gray-300">
          Through comprehensive training programs, we equip security professionals and the general public with cybersecurity awareness and technical skills.
        </p>
      </div>

      {/* Card 3 */}
      <div className="mission-card p-8 rounded-xl">
        <div className="text-blue-400 text-4xl mb-4">
          <i className="fas fa-users"></i>
        </div>
        <h3 className="text-2xl font-bold mb-4">Build Cyber Resilience</h3>
        <p className="text-gray-300">
          We help organizations develop robust security postures that can withstand and quickly recover from cyber incidents.
        </p>
      </div>
    </div>
  )
}
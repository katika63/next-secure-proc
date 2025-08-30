'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const TrustedBySection = () => {
  const companies = [
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
      fallback: 'https://img.icons8.com/color/96/microsoft.png',
      height: 'h-12',
      bgColor: 'bg-blue-500/10'
    },
    {
      name: 'IBM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      fallback: 'https://img.icons8.com/color/96/ibm.png',
      height: 'h-8',
      bgColor: 'bg-blue-900/10'
    },
    {
      name: 'AWS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      fallback: 'https://img.icons8.com/color/96/amazon-web-services.png',
      height: 'h-10',
      bgColor: 'bg-amber-500/10'
    },
    {
      name: 'HSBC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg',
      fallback: 'https://img.icons8.com/ios-filled/100/hsbc.png',
      height: 'h-10',
      bgColor: 'bg-red-500/10'
    },
    {
      name: 'Cisco',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
      fallback: 'https://www.cisco.com/c/dam/global/en_au/products/logos/cisco-logo-260x80.png',
      height: 'h-8',
      bgColor: 'bg-blue-500/10'
    }
  ]

  return (
    <section className="py-16 bg-gray-900/50 backdrop-blur-sm border-t border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-blue-400 text-sm uppercase tracking-widest mb-12 font-mono">
          TRUSTED BY GLOBAL ENTERPRISES
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 items-center justify-center">
          {companies.map((company, index) => (
            <motion.div 
              key={company.name}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className={`absolute inset-0 ${company.bgColor} rounded-lg transform group-hover:scale-110 transition duration-500`} />
                <div className={`relative ${company.height} flex items-center justify-center opacity-90 hover:opacity-100 transition duration-300 ease-in-out`}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={60}
                    className="object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = company.fallback
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBySection
'use client'

import { motion } from 'framer-motion'

interface ServiceFeaturesProps {
  features: Array<{
    title: string
    description: string
    icon: string
  }>
  color: string
}

const ServiceFeatures = ({ features, color }: ServiceFeaturesProps) => {
  return (
    <section className="py-20 px-6 bg-[#040914]/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Our comprehensive feature set ensures complete protection and visibility 
            across your entire digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group glass-card glass-card-hover rounded-xl p-8 border border-[#1e2942]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceFeatures
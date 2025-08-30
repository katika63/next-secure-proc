// components/sections/Testimonials.js
export default function Testimonials() {
    const testimonials = [
      {
        name: 'Michael R.',
        role: 'Ethical Hacking Graduate',
        content: '"The hands-on labs were incredible. I went from beginner to landing a junior pentester role in 3 months!"',
        stars: 5
      },
      {
        name: 'Sarah L.',
        role: 'CISSP Certified',
        content: '"Passed my CISSP on the first attempt thanks to the comprehensive prep course and expert instructors."',
        stars: 5
      },
      {
        name: 'David K.',
        role: 'Security Team Lead',
        content: '"We\'ve enrolled our entire SOC team in BTMSecurity training. The ROI has been phenomenal."',
        stars: 4.5
      }
    ]
  
    const renderStars = (count: number) => {
      const stars = []
      const fullStars = Math.floor(count)
      const hasHalfStar = count % 1 !== 0
  
      for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>)
      }
  
      if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
      }
  
      return stars
    }
  
    return (
      <section className="py-16 px-6 bg-gray-800 bg-opacity-60">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 bg-opacity-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 mr-4">
                    <i className="fas fa-user text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">{testimonial.content}</p>
                <div className="flex mt-4 text-yellow-400">
                  {renderStars(testimonial.stars)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
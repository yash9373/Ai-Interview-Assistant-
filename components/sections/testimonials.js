import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { staggerChildren, fadeInUp } from '@/lib/animations';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer at Google',
    content: 'The AI-generated questions were spot-on for my technical interviews. Landed my dream job!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    content: 'The feedback system helped me improve my communication skills significantly.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    content: 'Resume optimization feature helped me highlight my key achievements effectively.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
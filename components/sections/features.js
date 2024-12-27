import { Brain, MessageSquare, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerChildren, fadeInUp } from '../../lib/animations';

const features = [
  {
    icon: Brain,
    title: 'AI-Generated Questions',
    description: 'Smart algorithms generate relevant questions based on your target role and experience.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: MessageSquare,
    title: 'Comprehensive Feedback',
    description: 'Receive detailed feedback on your responses, body language, and speaking pace.',
    gradient: 'from-blue-400 to-blue-500'
  },
  {
    icon: FileText,
    title: 'Resume Optimization',
    description: 'AI-powered resume analysis with actionable improvements and industry insights.',
    gradient: 'from-blue-300 to-blue-400'
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <Sparkles className="absolute top-10 right-10 text-blue-400 animate-pulse h-8 w-8" />
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-lg inline-block mb-6`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
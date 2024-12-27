import { Brain, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <span className="ml-2 font-bold">InterviewPro</span>
            </div>
            <p className="text-gray-600">Empowering careers through AI-driven interview preparation.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-primary">Features</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-primary">Testimonials</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">hello@interviewpro.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-200">
          <p className="text-center text-gray-600">© 2024 InterviewPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
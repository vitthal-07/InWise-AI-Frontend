import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-blue-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-blue-100">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-blue-100">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-blue-100">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-500/10 text-center text-blue-200">
          <p>&copy; 2025 InWise AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

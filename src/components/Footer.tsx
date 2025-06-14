
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              PushNotify
            </h3>
            <p className="text-gray-600 text-sm">
              Reliable notification forwarding service for developers and businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-blue-600">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/pricing')} className="text-gray-600 hover:text-blue-600">
                  Pricing
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/privacy')} className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="text-gray-600 hover:text-blue-600">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund')} className="text-gray-600 hover:text-blue-600">
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 PushNotify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

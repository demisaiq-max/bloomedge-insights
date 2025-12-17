import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-icons text-primary text-3xl">eco</span>
              <span className="font-display font-bold text-xl tracking-tight">BloomEdge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              BloomEdge Enterprises connects you with the finest products globally. We are dedicated to quality, sustainability, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><span className="material-icons-outlined">facebook</span></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><span className="material-icons-outlined">camera_alt</span></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><span className="material-icons-outlined">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">My Account</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-primary transition-colors">My Profile</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Order History</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Wish List</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Newsletter</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <span className="material-icons-outlined text-primary mt-1">location_on</span>
                <span>123 Innovation Drive,<br/>Tech Valley, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons-outlined text-primary">phone</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons-outlined text-primary">email</span>
                <span>support@bloomedge.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2023 BloomEdge Enterprises. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <div className="flex items-center gap-2">
                <span className="material-icons text-gray-600">credit_card</span>
                <span className="material-icons text-gray-600">account_balance</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
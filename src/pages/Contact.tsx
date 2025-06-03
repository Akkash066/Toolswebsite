import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-gray-600 mb-6">
            Have questions or suggestions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
            <Mail className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600">support@toolifyx.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
            <Phone className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
            <MapPin className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">123 Tool Street, Web City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
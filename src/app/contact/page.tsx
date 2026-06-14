'use client';

import { useEffect, useState, FormEvent } from 'react';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { SiteSettings } from '@/types';

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await client.fetch<SiteSettings>(siteSettingsQuery);
        setSiteSettings(settingsData);
      } catch (error) {
        console.error('Error fetching contact page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic to be implemented
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Contact Card */}
      <section className="flex items-center justify-center py-32 px-4">
        <div className="bg-neutral-900 rounded-3xl p-12 max-w-md w-full text-center border border-neutral-800">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-12">
            CONTACT
          </h1>

          {siteSettings ? (
            <div className="space-y-4">
              {siteSettings.phone && (
                <p className="text-lg font-light">{siteSettings.phone}</p>
              )}
              {siteSettings.contactEmail && (
                <p className="text-lg font-light">{siteSettings.contactEmail}</p>
              )}
              {siteSettings.location && (
                <p className="text-lg font-light">{siteSettings.location}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Contact information not available</p>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-light mb-2 text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors font-light"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-light mb-2 text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors font-light"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-light mb-2 text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors font-light resize-none"
              placeholder="Your message..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-white text-black font-light rounded-lg hover:bg-gray-200 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

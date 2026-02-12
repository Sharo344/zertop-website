import React, { useState } from "react";
import { toast } from "react-toastify";
import contactService from "../services/contactService";
import { SITE_INFO } from "../utils/constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionTitle from "../components/ui/SectionTitle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactService.sendContactForm(formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle subtitle="Get In Touch" title="Contact Us" centered />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                label="Your Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />

              <Input
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
              />

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                className="bg-orange-600"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                icon
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <LocationOnIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">
                      Address
                    </h4>
                    <p className="text-neutral-600">{SITE_INFO.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">
                      Phone
                    </h4>
                    <a
                      href={`tel:${SITE_INFO.phone}`}
                      className="text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <EmailIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-neutral-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

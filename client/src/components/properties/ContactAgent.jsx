import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import contactService from "../../services/contactService";
import { generateWhatsAppLink, getInitials } from "../../utils/helpers";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StarIcon from "@mui/icons-material/Star";

const ContactAgent = ({ agent, propertyTitle, propertyId }) => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: `Hi! I'm interested in ${propertyTitle}. Can we schedule a viewing?`,
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
      await contactService.sendContactForm({
        ...formData,
        propertyTitle,
        propertyId,
      });

      toast.success(
        "Message sent successfully! The agent will contact you soon.",
      );

      setFormData((prev) => ({
        ...prev,
        message: "",
      }));
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${propertyTitle}. Can we discuss more details?`;
    const whatsappUrl = generateWhatsAppLink(agent.phone, message);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="sticky top-24">
      <div className="space-y-6">
        {/* Agent Info */}
        <div className="text-center pb-6 border-b border-neutral-200">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold overflow-hidden">
            {agent.avatar ? (
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(agent.name)
            )}
          </div>

          <h3 className="text-xl font-bold text-neutral-900 mb-1">
            {agent.name}
          </h3>

          {agent.agentDetails?.rating > 0 && (
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
              <StarIcon className="w-5 h-5" />
              <span className="font-semibold">
                {agent.agentDetails.rating.toFixed(1)}
              </span>
            </div>
          )}

          {agent.agentDetails?.propertiesSold > 0 && (
            <p className="text-sm text-neutral-600">
              {agent.agentDetails.propertiesSold} properties sold
            </p>
          )}
        </div>

        {/* Quick Contact */}
        <div className="space-y-3">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <PhoneIcon className="w-5 h-5 text-primary-500" />
            </div>
            <span className="font-semibold text-neutral-900">
              {agent.phone}
            </span>
          </a>

          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <EmailIcon className="w-5 h-5 text-primary-500" />
            </div>
            <span className="font-semibold text-neutral-900 truncate">
              {agent.email}
            </span>
          </a>

          <Button
            variant="success"
            size="md"
            fullWidth
            onClick={handleWhatsApp}
            className="bg-orange-600"
          >
            <WhatsAppIcon className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 pt-6 border-t border-neutral-200"
        >
          <h4 className="font-bold text-neutral-900">Send a Message</h4>

          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <Input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-neutral-400"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Send Message
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ContactAgent;

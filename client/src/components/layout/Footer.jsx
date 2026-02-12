import React from "react";
import { Link } from "react-router-dom";
import { SITE_INFO } from "../../utils/constants";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">{SITE_INFO.name}</span>
            </div>

            <p className="text-neutral-400 mb-6 leading-relaxed">
              {SITE_INFO.description}
            </p>

            <div className="flex gap-3">
              <a
                href={SITE_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>

              <a
                href={SITE_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>

              <a
                href={SITE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href={SITE_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <LocationOnIcon className="w-5 h-5 text-primary-500 mt-1" />
                <span className="text-neutral-400">{SITE_INFO.address}</span>
              </li>

              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-primary-500" />
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="text-neutral-400 hover:text-primary-500 transition-colors"
                >
                  {SITE_INFO.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <EmailIcon className="w-5 h-5 text-primary-500" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-neutral-400 hover:text-primary-500 transition-colors"
                >
                  {SITE_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              © {currentYear} {SITE_INFO.name}. All rights reserved.
            </p>
            <p className="text-neutral-400 text-sm text-center md:text-right">
              Built with ❤️ in Nigeria
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

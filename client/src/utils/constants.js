// Site-wide constants

export const SITE_INFO = {
  name: "Zertop",
  tagline: "Your Dream Home Awaits",
  description:
    "Find your perfect property with Nigeria's leading real estate platform",
  email: "info@primeestate.com",
  phone: "+234 800 123 4567",
  whatsapp: "+2348001234567",
  address: "Victoria Island, Lagos, Nigeria",

  social: {
    facebook: "https://facebook.com/primeestate",
    twitter: "https://twitter.com/primeestate",
    instagram: "https://instagram.com/primeestate",
    linkedin: "https://linkedin.com/company/primeestate",
  },
};

export const STATS = {
  propertiesListed: 2500,
  happyClients: 1200,
  experienceYears: 15,
  agentsActive: 85,
};

export const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Duplex",
  "Villa",
  "Penthouse",
  "Townhouse",
  "Studio",
  "Commercial",
  "Land",
  "Office Space",
];

export const PROPERTY_STATUS = ["For Sale", "For Rent", "Sold", "Rented"];

export const CITIES = [
  { value: "Lagos", label: "Lagos" },
  { value: "Abuja", label: "Abuja" },
  { value: "Port Harcourt", label: "Port Harcourt" },
  { value: "Ibadan", label: "Ibadan" },
  { value: "Kano", label: "Kano" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Enugu", label: "Enugu" },
  { value: "Benin City", label: "Benin City" },
];

export const POPULAR_AREAS = {
  Lagos: [
    "Lekki",
    "Ikoyi",
    "Victoria Island",
    "Banana Island",
    "Ajah",
    "Ikeja",
    "Surulere",
    "Yaba",
  ],
  Abuja: [
    "Maitama",
    "Asokoro",
    "Wuse 2",
    "Guzape",
    "Jabi",
    "Garki",
    "Katampe",
    "Gwarinpa",
  ],
  "Port Harcourt": ["GRA", "Trans Amadi", "Old GRA", "Rumuola"],
  Ibadan: ["Bodija", "Jericho", "Dugbe", "Ring Road"],
};

export const PRICE_RANGES = [
  { label: "Under ₦10M", min: 0, max: 10000000 },
  { label: "₦10M - ₦25M", min: 10000000, max: 25000000 },
  { label: "₦25M - ₦50M", min: 25000000, max: 50000000 },
  { label: "₦50M - ₦100M", min: 50000000, max: 100000000 },
  { label: "₦100M - ₦250M", min: 100000000, max: 250000000 },
  { label: "Above ₦250M", min: 250000000, max: Infinity },
];

export const AMENITIES = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Security",
  "24/7 Power",
  "Garden",
  "Balcony",
  "Elevator",
  "Air Conditioning",
  "Furnished",
  "Pet Friendly",
  "Playground",
  "WiFi",
  "CCTV",
];

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const USER_ROLES = {
  CLIENT: "client",
  AGENT: "agent",
  ADMIN: "admin",
};

export const APPOINTMENT_TYPES = [
  { value: "viewing", label: "Property Viewing" },
  { value: "consultation", label: "Consultation" },
  { value: "inspection", label: "Inspection" },
];

export const APPOINTMENT_STATUS = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-green-100 text-green-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  {
    value: "completed",
    label: "Completed",
    color: "bg-orange-100 text-orange-800",
  },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const BEDROOM_OPTIONS = [
  { value: 1, label: "1 Bedroom" },
  { value: 2, label: "2 Bedrooms" },
  { value: 3, label: "3 Bedrooms" },
  { value: 4, label: "4 Bedrooms" },
  { value: 5, label: "5+ Bedrooms" },
];

export const BATHROOM_OPTIONS = [
  { value: 1, label: "1 Bathroom" },
  { value: 2, label: "2 Bathrooms" },
  { value: 3, label: "3 Bathrooms" },
  { value: 4, label: "4 Bathrooms" },
  { value: 5, label: "5+ Bathrooms" },
];

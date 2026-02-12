import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import propertyService from "../services/propertyService";
import { getErrorMessage } from "../utils/helpers";
import PropertyGallery from "../components/properties/PropertyGallery";
import PropertyDetail from "../components/properties/PropertyDetail";
import ContactAgent from "../components/properties/ContactAgent";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Button from "../components/ui/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await propertyService.getProperty(id);
        if (response.success) {
          setProperty(response.data.property);
        } else {
          toast.error("Property not found");
          navigate("/properties");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
        navigate("/properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading property details..." />;
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => navigate(-1)}
          className="mb-6 bg-orange-600"
        >
          <ArrowBackIcon className="w-5 h-5 mr-2" />
          Back
        </Button>

        {/* Gallery */}
        <div className="mb-12">
          <PropertyGallery images={property.images} />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <PropertyDetail property={property} />
          </div>

          {/* Sidebar - Contact Agent */}
          <div className="lg:col-span-1">
            <ContactAgent
              agent={property.agent}
              propertyTitle={property.title}
              propertyId={property._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

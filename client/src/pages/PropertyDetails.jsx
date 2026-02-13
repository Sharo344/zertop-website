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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await propertyService.getProperty(id);
        console.log("Property response:", response); // Debug log

        if (response.data && response.data.property) {
          setProperty(response.data.property);
        } else {
          throw new Error("Property not found");
        }
      } catch (error) {
        console.error("Fetch property error:", error); // Debug log
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading property details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Error Loading Property
            </h2>
            <p className="text-neutral-600 mb-6">{error}</p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/properties")}
            >
              Back to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Property Not Found
            </h2>
            <p className="text-neutral-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/properties")}
            >
              Back to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowBackIcon className="w-5 h-5 mr-2" />
          Back
        </Button>

        {/* Gallery */}
        <div className="mb-12">
          <PropertyGallery images={property.images || []} />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <PropertyDetail property={property} />
          </div>

          {/* Sidebar - Contact Agent */}
          <div className="lg:col-span-1">
            {property.agent && (
              <ContactAgent
                agent={property.agent}
                propertyTitle={property.title}
                propertyId={property._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

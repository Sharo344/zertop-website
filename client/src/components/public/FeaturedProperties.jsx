import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePropertyContext } from "../../context/PropertyContext";
import PropertyCard from "../properties/PropertyCard";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import StaggerContainer, { StaggerItem } from "../animations/StaggerContainer";

const FeaturedProperties = () => {
  const { featuredProperties, fetchFeaturedProperties, loading } =
    usePropertyContext();

  useEffect(() => {
    fetchFeaturedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          subtitle="Featured Listings"
          title="Premium Properties for You"
          centered
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading featured properties..." />
          </div>
        ) : featuredProperties.length > 0 ? (
          <>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.slice(0, 6).map((property) => (
                <StaggerItem key={property._id}>
                  <PropertyCard property={property} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to="/properties">
                <Button variant="primary" size="lg" icon>
                  View All Properties
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg mb-6">
              No featured properties available at the moment.
            </p>
            <Link to="/properties" className="text-black">
              <Button
                variant="primary"
                size="md"
                className="bg-orange-600"
              >
                Browse All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;

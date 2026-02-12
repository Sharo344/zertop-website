import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";
import { usePropertyContext } from "../../context/PropertyContext";
import appointmentService from "../../services/appointmentService";
import { formatNumber } from "../../utils/helpers";
import Card from "../ui/Card";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Overview = () => {
  const { user, isAgent } = useAuthContext();
  const { savedProperties, fetchSavedProperties } = usePropertyContext();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      await fetchSavedProperties();

      const appointmentsResult = await appointmentService.getMyAppointments();
      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data.appointments || []);
      }

      setLoading(false);
    };

    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />;
  }

  const stats = isAgent()
    ? [
        {
          label: "Total Properties",
          value: user?.agentDetails?.propertiesSold || 0,
          icon: HomeWorkIcon,
          color: "from-primary-500 to-primary-600",
          link: "/dashboard/properties",
        },
        {
          label: "Appointments",
          value: appointments.length,
          icon: CalendarTodayIcon,
          color: "from-secondary-500 to-secondary-600",
          link: "/dashboard/appointments",
        },
        {
          label: "Rating",
          value: user?.agentDetails?.rating?.toFixed(1) || "0.0",
          icon: TrendingUpIcon,
          color: "from-green-500 to-green-600",
          link: "/dashboard/profile",
        },
      ]
    : [
        {
          label: "Saved Properties",
          value: savedProperties.length,
          icon: FavoriteIcon,
          color: "from-red-500 to-red-600",
          link: "/dashboard/saved",
        },
        {
          label: "My Appointments",
          value: appointments.length,
          icon: CalendarTodayIcon,
          color: "from-secondary-500 to-secondary-600",
          link: "/dashboard/appointments",
        },
      ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-neutral-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isAgent() ? (
            <>
              <Link to="/dashboard/add-property">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-orange-600"
                  fullWidth
                  icon
                >
                  Add New Property
                </Button>
              </Link>
              <Link to="/dashboard/properties">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-orange-600"
                  fullWidth
                >
                  View My Properties
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/properties">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-orange-600"
                  fullWidth
                  icon
                >
                  Browse Properties
                </Button>
              </Link>
              <Link to="/dashboard/saved">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-orange-600"
                  fullWidth
                >
                  View Saved Properties
                </Button>
              </Link>
            </>
          )}
        </div>
      </Card>

      {/* Recent Appointments */}
      {appointments.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">
              Recent Appointments
            </h2>
            <Link to="/dashboard/appointments">
              <Button variant="ghost" size="sm" className="bg-orange-600">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {appointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment._id}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 transition-colors"
              >
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {appointment.property?.title || "Property"}
                </h3>
                <p className="text-sm text-neutral-600">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                  at {appointment.appointmentTime}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;

  return (
    <Link to={stat.link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card hoverable className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-neutral-600 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-neutral-900">
                {formatNumber(stat.value)}
              </p>
            </div>
            <div
              className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default Overview;

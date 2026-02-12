import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { getInitials } from "../../utils/helpers";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const { user, updateUserDetails } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateUserDetails(formData);

    if (result.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(result.error || "Failed to update profile");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
        {!isEditing && (
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(user?.name)
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-neutral-600 capitalize mb-2">{user?.role}</p>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card>
        <h3 className="text-xl font-bold text-neutral-900 mb-6">
          Personal Information
        </h3>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              icon={<PersonIcon />}
              iconPosition="left"
              fullWidth
              required
            />

            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              icon={<PhoneIcon />}
              iconPosition="left"
              fullWidth
              required
            />

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                rows="4"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                disabled={loading}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <EmailIcon className="w-6 h-6 text-neutral-600" />
              <div>
                <p className="text-sm text-neutral-600">Email</p>
                <p className="font-semibold text-neutral-900">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <PhoneIcon className="w-6 h-6 text-neutral-600" />
              <div>
                <p className="text-sm text-neutral-600">Phone</p>
                <p className="font-semibold text-neutral-900">{user?.phone}</p>
              </div>
            </div>

            {user?.bio && (
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600 mb-2">Bio</p>
                <p className="text-neutral-900">{user.bio}</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;

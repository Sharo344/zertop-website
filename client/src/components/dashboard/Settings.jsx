import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Settings = () => {
  const { updatePassword } = useAuthContext();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    const result = await updatePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });

    if (result.success) {
      toast.success('Password updated successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      toast.error(result.error || 'Failed to update password');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
        <p className="text-neutral-600">Manage your account settings</p>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            name="currentPassword"
            label="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            fullWidth
          />

          <Input
            type="password"
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            fullWidth
            helperText="At least 6 characters"
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            disabled={loading}
          >
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
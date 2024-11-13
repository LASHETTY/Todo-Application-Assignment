// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();
      setProfile(data);
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profile);
    alert('Profile updated successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;

import React, { useState } from "react";
import "https://cdn.jsdelivr.net/npm/zed-css/zed.min.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const validate = () => {
    const newErrors: { username: string; email: string; bio: string } = {
      username: "",
      email: "",
      bio: "",
    };

    if (!formData.username) newErrors.username = "Username is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (formData.bio.length > 150)
      newErrors.bio = "Bio must be 150 characters or less";

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Profile updated successfully!\nUsername: ${formData.username}\nEmail: ${formData.email}\nBio: ${formData.bio}`
      );
      // Handle profile update logic here
    }
  };

  return (
    <div className="container flex-center vh-100 bg-gray-100">
      <div className="card p-4 bg-white shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="flex-column" noValidate>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <small className="text-error">{errors.username}</small>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <small className="text-error">{errors.email}</small>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="form-input"
              placeholder="Tell us about yourself (150 characters max)"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
            ></textarea>
            {errors.bio && <small className="text-error">{errors.bio}</small>}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

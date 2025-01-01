"use client";
import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors: { username: string; email: string; password: string } = {
      username: "",
      email: "",
      password: "",
    };

    if (!formData.username) newErrors.username = "Username is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Form submitted successfully!\nUsername: ${formData.username}\nEmail: ${formData.email}`
      );
      // Handle form submission logic here
    }
  };

  return (
    <div className="container flex-center vh-100 bg-gray-100">
      <div className="card p-4 bg-white shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>

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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <small className="text-error">{errors.password}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

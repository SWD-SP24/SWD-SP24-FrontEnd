import React, { useState } from "react";

export default function RememberMe({ onRememberMeChange }) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);
    onRememberMeChange(newRememberMe);
  };

  return (
    <div className="form-check mb-0">
      <input
        className="form-check-input"
        type="checkbox"
        name="rememberMe"
        checked={rememberMe}
        onChange={handleChange}
        id="remember-me"
      />
      <label className="form-check-label" htmlFor="remember-me">
        Remember Me
      </label>
    </div>
  );
}

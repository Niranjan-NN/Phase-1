import React from "react";

const Render = ({ role }) => {
  return (
    <div>
      <h3>Welcome to the Dashboard</h3>
      {role === "Admin" ? (
        <p>You have full access to manage the system.</p>
      ) : role === "User" ? (
        <p>You can view and manage your own data.</p>
      ) : (
        <p>Please log in to access the system.</p>
      )}
    </div>
  );
};

export default Render;

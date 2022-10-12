import React from "react";

export default function NoContent() {
  return (
    <div className="no-content-container">
      <img src="/images/building.png" />
      <h3>No Hotel Yet</h3>
      <p>
        Click on <span>List Your Hotel</span> button to get started now.
      </p>
    </div>
  );
}

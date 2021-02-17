import React from "react";

const DateTime = () => {
  const date = new Date();

  return (
    <div className="date-time">
      As of {`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}
    </div>
  );
};

export default DateTime;

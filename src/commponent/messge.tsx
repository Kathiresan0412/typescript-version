import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';


interface AlertMessageProps {
  passedValue: string;
}

const AlertMessge: React.FC<AlertMessageProps> = ({ passedValue }) => {
  return (
    <div
      style={{
        backgroundColor: "#e6f7e6", // Light green background color
        padding: "16px", // Add some padding
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
        display: "flex", // Use flexbox for alignment
        alignItems: "center", // Align items vertically
      }}
    >
      <FaCheckCircle color="#4caf50" size={28} /> {/* Adjust icon color and size */}
      <p
        style={{
          display: "inline-block",
          marginLeft: "12px", // Increase spacing between icon and text
          fontWeight: "bold", // Make the text bold
          color: "#333", // Text color
        }}
      >
        {passedValue}
      </p>
    </div>
  );
};

AlertMessge.propTypes = {
  passedValue: PropTypes.string.isRequired, // Specify the type of passedValue as string and it's required
};

export default AlertMessge;

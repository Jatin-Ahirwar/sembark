import React from "react";
import PropTypes from "prop-types";
import "../CommonComponents/Button.css"; 
const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <div className={`button-borders ${className}`}>
      <button className="primary-button" type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;

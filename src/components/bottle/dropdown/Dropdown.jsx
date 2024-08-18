import { useState } from "react";
import "./dropdown.css";
import { FaAngleDown } from "react-icons/fa";
// import { littleData4 } from "../../data/Data";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <div className="month">
            <p> Refile every two months</p>
          </div>
          <div className="for__dropdown">
            <p>Save20%</p>
            <div className="dropup__arrow">
              <FaAngleDown
                className={`dropdown-arrow ${isOpen ? "open" : ""}`}
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            <div className="dropdown-option" >
              <p className="month">Refile every two months</p>
              <p className="for__dropdown">Save20%</p>
            </div>
            <div className="dropdown-option" >
              <p >One time Purchase</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

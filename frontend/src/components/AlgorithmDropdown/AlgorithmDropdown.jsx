import React, { useContext, useEffect, useRef, useState } from 'react';
import './AlgorithmDropdown.scss';
import { AlgorithmContext } from '../SolverControls/AlgorithmContext';
import ArrowIconSRC from '../../assets/icons/arrow-icon.png';
import ArrowIcon from '../ArrowIcon/ArrowIcon';

const AlgorithmDropdown = ({ placeholder, className, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const algorithm = useContext(AlgorithmContext);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Gắn và gỡ bỏ sự kiện click khi dropdown mở
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={`custom-select-container ${className}`} ref={dropdownRef}>
      <div
        className="custom-select-header"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <ArrowIcon
          className={`arrow-icon ${isOpen ? 'open' : ''}`}
          src={ArrowIconSRC}
          alt='arrow-icon'
        />
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {algorithm.map((option, index) => (
            <li
              key={index}
              className={`custom-select-option ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => { handleOptionClick(option) }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlgorithmDropdown;


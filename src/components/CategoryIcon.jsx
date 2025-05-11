import React from 'react';
import { FaLaptop, FaTshirt, FaHome, FaSpa, FaUtensils, FaGamepad, FaBook, FaBaby, FaDumbbell, FaPaw } from 'react-icons/fa';

const CategoryIcon = ({ name, size = 24 }) => {
  const iconMap = {
    laptop: <FaLaptop size={size} />,
    tshirt: <FaTshirt size={size} />,
    home: <FaHome size={size} />,
    spa: <FaSpa size={size} />,
    food: <FaUtensils size={size} />,
    gaming: <FaGamepad size={size} />,
    books: <FaBook size={size} />,
    kids: <FaBaby size={size} />,
    fitness: <FaDumbbell size={size} />,
    pets: <FaPaw size={size} />
  };

  return (
    <div className="category-icon">
      {iconMap[name] || <FaHome size={size} />} {/* Default to home icon if not found */}
    </div>
  );
};

export default CategoryIcon;
// src/Filter.js
import React from 'react';

const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          style={{
            padding: '10px',
            margin: '5px',
            backgroundColor: selectedCategory === category ? '#007BFF' : '#FFF',
            color: selectedCategory === category ? '#FFF' : '#000',
            border: '1px solid #007BFF',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;

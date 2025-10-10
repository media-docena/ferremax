// components/common/SearchBar.jsx
import React, { useState } from 'react';
import SearchIcon from '../../assets/icons/search.svg?react';

function SearchBar ({ placeholder = 'Buscar...', onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className='relative'>
      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
        <SearchIcon />
      </span>
      <input
        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary'
        placeholder={placeholder}
        type='text'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
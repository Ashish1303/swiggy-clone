import { useState } from 'react';

const SearchBar = ({ label, placeholder, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="input-group mb-4">
      <span className="input-group-text bg-white border-end-0">{label}</span>
      <input
        type="search"
        className="form-control border-start-0"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;

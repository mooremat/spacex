import React from 'react';

const SearchBar = ({ onChange }) => {
  return (
    <nav className="navbar bg-primary sticky-top">
      <h3 className="text-white">Launches: 2006-2020</h3>
      <div className="mt-3 form-group col-lg-4 ml-auto">
        <h6 className="text-white text-center">Search by Year or Mission Name</h6>
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          onChange={onChange}
        />
      </div>
    </nav>
  )
}

export default SearchBar;

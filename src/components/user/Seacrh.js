import React, { useState } from "react";
import PropTypes from "prop-types";

const Seacrh = ({ showClearBtn, clearUsers, searchUsers, setAlert }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onInputChange = e => {
    setSearchQuery(e.target.value );
  };
  const search = e => {
    e.preventDefault();
    if (searchQuery === "") {
      setAlert("Please enter a search term", "light");
    } else {
      searchUsers(searchQuery);
      setSearchQuery( "" );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={search}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search Users"
          value={searchQuery}
          onChange={onInputChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClearBtn && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};
Seacrh.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default Seacrh;

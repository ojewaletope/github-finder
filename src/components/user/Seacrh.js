import React, { Component } from "react";
import PropTypes from "prop-types";
class Seacrh extends Component {
  state = {
    searchQuery: ""
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  search = e => {
      const {searchQuery} = this.state;
    e.preventDefault();
    if (searchQuery === '') {
        this.props.setAlert('Please enter a search term', 'light')
    } else {
        this.props.searchUsers(searchQuery);
        this.setState({ searchQuery: "" });
    }
  };
  render() {
    const { searchQuery } = this.state;
    const {showClearBtn, clearUsers} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.search}>
          <input
            type="text"
            name="searchQuery"
            placeholder="Search Users"
            value={searchQuery}
            onChange={this.onInputChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
          {showClearBtn && <button
              className="btn btn-light btn-block"
              onClick={clearUsers}
          >
              Clear
          </button>}

      </div>
    );
  }
}
Seacrh.propTypes = {
  searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};
export default Seacrh;

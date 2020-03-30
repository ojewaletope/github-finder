import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/user/Users";
import axios from "axios";
import Seacrh from "./components/user/Seacrh";
import Alert from "./components/user/Alert";
import About from "./components/pages/About";
import User from "./components/user/User";
import GithubState from "./context/github/GithubState";


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   setState({ users: res.data, loading: false });
  // }
  const searchUsers = async searchQuery => {
    setLoading( true );
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false)
  };

  // get a single user
 const getUser = async username => {
    setLoading(true );
    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser( res.data);
  };

  // get user repo
  const getUserRepo = async username => {
   setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(true);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  };
  const setAlerts = (message, type) => {
    setAlert( { message, type });
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  };

    return (
        <GithubState>
          <Router>
            <div className="App">
              <Navbar title="Github Finder" />
              <div className="container">
                <Alert alert={alert} />
                <Switch>
                  <Route
                      exact
                      path="/"
                      render={props => (
                          <Fragment>
                            <Seacrh
                                searchUsers={searchUsers}
                                clearUsers={clearUsers}
                                showClearBtn={users.length > 0}
                                setAlert={setAlerts}
                            />
                            <Users loading={loading} users={users} />
                          </Fragment>
                      )}
                  />
                  <Route exact path="/about" component={About} />
                  <Route
                      exact
                      path="/user/:login"
                      render={props => (
                          <User
                              {...props}
                              getUser={getUser}
                              user={user}
                              getUserRepos = {getUserRepo}
                              repos = {repos}
                              loading={loading}
                          />
                      )}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </GithubState>
    );

};

export default App;

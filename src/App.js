import React, {Component} from "react";
import Navbar from './components/layout/Navbar'
import "./App.css";
import Useritem from "./components/user/Useritem";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Navbar title="Github Finder"/>
            <Useritem/>
          </div>
  )
  }
}

export default App;

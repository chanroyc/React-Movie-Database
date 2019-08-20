import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import Home         from "./Home";
import About        from "./About";
import './App.css';

class App extends Component {
  render() {
    return  (
    <Router>
      <div>
        <header>
          <h1><a href="/movies">React Movies</a></h1>
          <ul>
            <li><Link to="/movies">Home</Link></li>
            <li><Link to="/movies/about">About</Link></li>
          </ul>
        </header>

        <br/>

        <main>
        {/* Our router goes here */}
        <Switch> 
        <Route exact path="/movies" component={Home} />
        <Route path={'/movies/about'} exact component={About} />

        </Switch>
        </main>

        <footer>

        </footer>
      </div>
    </Router>);
  }
}
export default App;

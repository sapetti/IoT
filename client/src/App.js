import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { AnimatedSwitch, spring } from "react-router-transition";
import Loadable from "react-loadable";
import { LoadingPage } from "./components/LoadingPage";

import logo from "./logo.svg";
import "./App.css";

// ---> Loadable components
const AsyncBoardsTable = Loadable({
  loader: () => import("./components/BoardTable"),
  loading: LoadingPage
});
const AsyncAnotherComponent = Loadable({
  loader: () => import("./components/AnotherComponent"),
  loading: LoadingPage
});
const AsyncBoardDetail = Loadable({
  loader: () => import("./components/BoardDetail"),
  loading: LoadingPage
});

// ---> Animated transition config
// function mapStyles(styles) {
//   return {
//     opacity: styles.opacity,
//     transform: `scale(${styles.scale})`
//   };
// }
// function bounce(val) {
//   return spring(val, {
//     stiffness: 330,
//     damping: 22
//   });
// }
// const bounceTransition = {
//   atEnter: {
//     opacity: 0,
//     scale: 1.2
//   },
//   atLeave: {
//     opacity: bounce(0),
//     scale: bounce(0.8)
//   },
//   atActive: {
//     opacity: bounce(1),
//     scale: bounce(1)
//   }
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NodeMCU Dashboard</h1>
        </header>
        <Router>
          <div>
            <header className="header container">
              <nav className="navbar">
                <div className="navbar-brand">
                  <Link to="/">
                    <span className="navbar-item">Home</span>
                  </Link>
                </div>
                <div className="navbar-end">
                  <Link to="/another">
                    <span className="navbar-item">Another route</span>
                  </Link>
                </div>
                <div className="navbar-end">
                  <Link to="/detail">
                    <span className="navbar-item">Board Detail</span>
                  </Link>
                </div>
              </nav>
            </header>
            <Switch>
              <Route exact path="/" component={AsyncBoardsTable} />
              <Route exact path="/another" component={AsyncAnotherComponent} />
              <Route exact path="/detail" component={AsyncBoardDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

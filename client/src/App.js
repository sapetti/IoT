import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { AnimatedSwitch, spring } from "react-router-transition";
import { Panel, Navbar, Nav, NavItem } from "react-bootstrap";
import Loadable from "react-loadable";
//Custom
import { LoadingPage } from "./components/LoadingPage";

// import logo from "./logo.svg";

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

//TODO: Move this Menu component to a ./components/navigation.js
const NavLink = ({ to, label }) => (
  <NavItem componentClass="span" style={{ padding: "15px 15px" }}>
    <Link to={to}>{label}</Link>
  </NavItem>
);

class App extends Component {
  render() {
    return (
      <div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Panel>
          <Router>
            <div>
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>NodeMCU Dashboard</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavLink to="/" label="Home" />
                  <NavLink to="/another" label="Another route" />
                  <NavLink to="/detail" label="Board Detail" />
                </Nav>
              </Navbar>
              <Panel>
                <Switch>
                  <Route exact path="/" component={AsyncBoardsTable} />
                  <Route
                    exact
                    path="/another"
                    component={AsyncAnotherComponent}
                  />
                  <Route exact path="/detail" component={AsyncBoardDetail} />
                </Switch>
              </Panel>
            </div>
          </Router>
        </Panel>
      </div>
    );
  }
}

export default App;

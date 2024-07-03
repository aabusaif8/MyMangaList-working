import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateReview from "./components/CreateReview";
import AllManga from "./components/AllManga";
import Search from "./components/Search";
import Layout from"./Layout"
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/createReview" component={CreateReview} />
        <Route path="/allManga" component={AllManga} />
        <Route path="/search" component={Search} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
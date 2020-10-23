import React from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import User from "./components/user";
import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SignIn} />
      <Route path="/dashboard" component={Nav} />
      <Route exact path="/dashboard" component={User} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
}

export default App;

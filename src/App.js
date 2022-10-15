import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Radium, { StyleRoot } from "radium";

function App() {
  return (
    <>
      <StyleRoot>
        <Router>
          <Navbar title="TextApp" />
          <Switch>
            <Route exact path="/">
              <TextForm heading="Enter the text below" />
            </Route>
          </Switch>
        </Router>
      </StyleRoot>
    </>
  );
}

export default Radium(App);

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Account = lazy(() => import("./Account"));
const Transaction = lazy(() => import("./Transaction"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/transaction" component={Transaction} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;

import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Post from "./Post";
import CreateCategory from "./CreateCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
    
        <Route path="/" exact>
          <PageLayout FrontProtected={Home} />
        </Route>

        <Route path="/post" exact>
          <PageLayout FrontProtected={Post} />
        </Route>
        <Route path="/create-category" exact>
          <PageLayout FrontProtected={CreateCategory} />
        </Route>
      </Switch>
    </BrowserRouter>

    // <div>
    //   <Navbar/>
    //   <Home/>
    // </div>
  );
};

export default App;

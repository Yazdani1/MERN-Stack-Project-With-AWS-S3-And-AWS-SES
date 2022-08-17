import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Post from "./Post";
import CreateCategory from "./CreateCategory";
import PostbyCategory from "./PostbyCategory";
import Detailspost from "./Detailspost";
import Pagenotfound from "./Pagenotfound";
import EditCategory from "./EditCategory";

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

        <Route path="/category/:id" exact>
          <PageLayout FrontProtected={PostbyCategory} />
        </Route>
        <Route path="/details-post/:id" exact>
          <PageLayout FrontProtected={Detailspost} />
        </Route>

        <Route path="/edit-category/:id" exact>
          <PageLayout FrontProtected={EditCategory} />
        </Route>

        <Route path="*" exact component={Pagenotfound} />
      </Switch>
    </BrowserRouter>

    // <div>
    //   <Navbar/>
    //   <Home/>
    // </div>
  );
};

export default App;

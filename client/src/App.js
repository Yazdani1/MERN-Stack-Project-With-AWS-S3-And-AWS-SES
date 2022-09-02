import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Post from "./Post";
import CreateCategory from "./CreateCategory";
import PostbyCategory from "./PostbyCategory";
import Detailspost from "./Detailspost";
import Pagenotfound from "./Pagenotfound";
import EditCategory from "./EditCategory";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { UserProvider } from "./UserContext";
import SecureLayout from "./SecureLayout";
import News from "./News/News";
import Video from "./Videos/Video";
import Audio from "./Audio/Audio";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<PostbyCategory />} />
          <Route path="/details-post/:id" element={<Detailspost />} />

          <Route
            path="/post"
            element={
              <SecureLayout>
                <Post />
              </SecureLayout>
            }
          />

          <Route
            path="/create-category"
            element={
              <SecureLayout>
                <CreateCategory />
              </SecureLayout>
            }
          />

          <Route
            path="/create-news"
            element={
              <SecureLayout>
                <News />
              </SecureLayout>
            }
          />

          <Route
            path="/edit-category/:id"
            element={
              <SecureLayout>
                <EditCategory />
              </SecureLayout>
            }
          />

          <Route
            path="/video"
            element={
              <SecureLayout>
                <Video />
              </SecureLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>

    // <UserProvider>
    //   <BrowserRouter>
    //     <Switch>
    //       <Route path="/" exact>
    //         <PageLayout FrontProtected={Home} />
    //       </Route>

    //       <Route path="/post" exact>
    //         <PageLayout FrontProtected={Post} />
    //       </Route>
    //       <Route path="/create-category" exact>
    //         <PageLayout FrontProtected={CreateCategory} />
    //       </Route>

    //       <Route path="/category/:id" exact>
    //         <PageLayout FrontProtected={PostbyCategory} />
    //       </Route>
    //       <Route path="/details-post/:id" exact>
    //         <PageLayout FrontProtected={Detailspost} />
    //       </Route>

    //       <Route path="/edit-category/:id" exact>
    //         <PageLayout FrontProtected={EditCategory} />
    //       </Route>

    //       <Route path="/signup" exact>
    //         <PageLayout FrontProtected={SignUp} />
    //       </Route>

    //       <Route path="/signin" exact>
    //         <PageLayout FrontProtected={SignIn} />
    //       </Route>

    //       <Route path="*" exact component={Pagenotfound} />
    //     </Switch>
    //   </BrowserRouter>
    // </UserProvider>
  );
};

export default App;

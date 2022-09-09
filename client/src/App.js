import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PDFFeatures from "./PDFFeatures/PDFFeatures";

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

          <Route
            path="/audio"
            element={
              <SecureLayout>
                <Audio />
              </SecureLayout>
            }
          />
          <Route
            path="/pdffile"
            element={
              <SecureLayout>
                <PDFFeatures />
              </SecureLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>


  );
};

export default App;

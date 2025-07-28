import React from "react";
import "./index.css";
import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import Signin from "./components/Signin.jsx";
import { Blog } from "./components/Blog.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="signin" element={<Signin />} />
      <Route path="blog" element={<Blog />} />
      {/* <Route path='Explore/job/:id' element={<JobDetail/>}/> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="363420591620-5oj0rj0iko34f10bh8l55v8d35dftujt.apps.googleusercontent.com">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);

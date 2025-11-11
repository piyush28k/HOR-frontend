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
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import Signin from "./components/Signin.jsx";
import Explore from "./pages/Explore.jsx";
import { Blog } from "./pages/Blog.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import JobDetail from "./pages/UserDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="signin" element={<Signin />} />
      <Route path="blog" element={<Blog />} />
      <Route path="explore" element={<Explore />} />
      <Route path='explore/:id' element={<JobDetail/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);

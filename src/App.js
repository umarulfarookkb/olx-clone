import "./App.css";
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import Createmul from "./Components/Create/Createmul";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
import Header from "./Components/Header/Header";
function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        
        <Router><Header/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
            <Route path="/createmul" element={<Createmul/>} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const { userId } = postDetails;
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  });
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {/* <img
          src={postDetails.urls}
          alt={postDetails.name}
        /> */}
        <Carousel showThumbs={false} infiniteLoop={true}>
          {postDetails.urls.map((url, i) => (
            <div style={{ height: "400px", color: "#fff" }}><img
                key={i}
                src={url || "http://via.placeholder.com/300"}
                alt={postDetails.name}
              /></div>
          ))}
        </Carousel>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name} </span>
          <p>{postDetails.catagory}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;

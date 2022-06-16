import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import {FirebaseContext,AuthContext} from '../../store/Context';
const Createmul = () => {
  const navigate = useNavigate();
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState("");
  const [categort, setCategort] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);


  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = firebase.storage().ref(`image/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await firebase.storage()
            .ref("image")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
  });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));

  };


  const date = new Date()
  const handleSubmit=()=>{ 
        firebase.firestore().collection('products').add({
          name,
          categort,
          price,
          urls,
          userId:user.uid,
          createAt:date.toDateString()
        })
        navigate('/')
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setCategort(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
            />
            <br />
      
          <br />
          {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "200px",height: "200px"}}
          src={url || "http://via.placeholder.com/300"}
          alt="Posts"
        />
      ))}
          {/* <img alt="" width="200px" height= src={image ? URL.createObjectURL(image): ""}></img> */}
          
            <br />
            <input multiple onChange={handleChange} type="file" /><button onClick={handleUpload}>upload</button>
            <br />
            <progress value={progress} max="100" />
            <br/>
            {progress==100 ? <button onClick={handleSubmit} className="uploadBtn">Submit</button>:""}
         
        </div>
      </card>
    </Fragment>
  );
};

export default Createmul;

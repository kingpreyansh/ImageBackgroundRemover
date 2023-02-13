import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [uploadImage, setUploadImage] = useState();
  const [image, setImage] = useState();
  const [maskImage, setMaskImage] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setUploadImage(URL.createObjectURL(e.target.files[0]));
    var formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios({
      method: "post",
      url: "http://localhost:3000/remove-bg",
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        setImage(response.data.image);
        setMaskImage(response.data.mask);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <h1>Please upload photo</h1>
      <label>
        Upload image
        <input
          style={{ display: "none" }}
          type="file"
          accept={"image/*"}
          onChange={handleChange}
        />
      </label>
      <div>
        <img src={uploadImage} width="30%" />
        <img src={image} width="30%" />
        <img src={maskImage} width="30%" />
      </div>
      
    </div>
  );
}

export default App;

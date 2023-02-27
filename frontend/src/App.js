import React, {useState} from "react";
import "./App.scss";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [img, setImg] = useState();
  const [file, setFile] = useState();

  const onRemoveBg = () => {
    var formData = new FormData();
    formData.append("image", file);
    axios({
      method: "post",
      url: "http://localhost:3000/remove-bg",
      data: formData,
    })
      .then((response) => {
        setImg(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDownload = () => {
    if (file) {
      var element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = file.name;
      element.click();
    }
  };

  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Navbar
          onChangeImg={(file) => {
            setImg(URL.createObjectURL(file));
            setFile(file);
          }}
          onRemoveBg={() => onRemoveBg()}
          onDownload={() => onDownload()}
        />
        <div className="page-content">
          <div className="img-box">
            <img src={img}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

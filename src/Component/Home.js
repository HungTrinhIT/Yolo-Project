import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Output from "./Output/Output";
import Input from "./Input/Input";
export default class Home extends Component {
  state = {
    selectedImage: null,
    selectedImageData: null,
    outputImage: null,
  };
  onChangeHandler = (e) => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      selectedImageData: e.target.files[0],
    });
  };
  fileUploadHandler = (e) => {
    e.preventDefault();
    if (!this.state.selectedImage) {
      alert("Please, Import image before predicting...");
    } else {
      const fd = new FormData();
      fd.append("image", this.state.selectedImageData);
      console.log(this.state);
      axios
        .post(
          `http://0.0.0.0:5000/api/predict`,
          fd,
          {responseType: 'blob'}
        )
        .then((res) => {
          console.log(res.data)
          this.setState({
            outputImage: res.data,
          });
        });
    }
  };

  refreshHandler = () => {
    this.setState({
      selectedImage: null,
      outputImage: null,
    });
  };
  render() {
    return (
      <div>
        <div className="controller mb-4">
          <h5>
            <strong>Import image you want to predict</strong>
          </h5>
          <form onSubmit={this.fileUploadHandler} className="border-bottom pb-2">
            <label className="mr-4">Select image:</label>
            <input
              type="file"
              id="img_predict"
              name="selectedImage"
              onChange={this.onChangeHandler}
            />
            <br />
            <div className="mt-3">
              <button className="btn btn-success mr-3" type="submit">
                Predict
              </button>
              <button className="btn btn-danger" onClick={this.refreshHandler}>
                Refresh
              </button>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 border-right">
            <Input selectedImage={this.state.selectedImage} />
          </div>
          <div className="col-12 col-md-6">
            <Output outputImage={this.state.outputImage} />
          </div>
        </div>
      </div>
    );
  }
}

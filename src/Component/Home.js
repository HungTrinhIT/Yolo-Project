import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Output from "./Output/Output";
import Input from "./Input/Input";
export default class Home extends Component {
  state = {
    selectedImage: null,
    outputImage: null,
  };
  onChangeHandler = (e) => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
    });
  };
  fileUploadHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("filename", this.state.selectedImage);
    axios
      .post(
        `http://0.0.0.0:5000/api/predict`,
        {
          body: { image: this.state.selectedImage },
        },
        fd
      )
      .then((res) => {
        this.setState({
          outputImage: res.data,
        });
      });
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
          <h5>Import Image you want to predict</h5>
          <form onSubmit={this.fileUploadHandler}>
            <label>Select image:</label>
            <input
              type="file"
              id="img_predict"
              name="selectedImage"
              onChange={this.onChangeHandler}
            />
            <br />
            <button className="btn btn-success mr-3" type="submit">
              Predict
            </button>
            <button className="btn btn-danger" onClick={this.refreshHandler}>
              Refresh
            </button>
          </form>
        </div>
        <div className="row">
          <div className="col-6 border-right">
            <Input selectedImage={this.state.selectedImage} />
          </div>
          <div className="col-6">
            <Output outputImage={this.state.outputImage} />
          </div>
        </div>
      </div>
    );
  }
}

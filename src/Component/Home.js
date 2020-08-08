import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Output from "./Output/Output";
import Input from "./Input/Input";
import Spinner from "./Spinner/Spinner";
export default class Home extends Component {
  state = {
    selectedImage: null,
    selectedImageData: null,
    outputImage: null,
    loaded: false,
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
      this.setState(
        {
          loaded: true,
        },
        () => {
          const fd = new FormData();
          fd.append("image", this.state.selectedImageData);
          axios
            .post(`http://0.0.0.0:5000/api/predict`, fd, {
              responseType: "blob",
            })
            .then((res) => {
              this.setState({
                outputImage: res.data,
                loaded: false,
              });
            })
            .catch((err) => {
              alert(err.message);
              this.setState({
                loaded: false,
              });
            });
        }
      );
    }
  };

  refreshHandler = () => {
    if (this.state.selectedImage === null) alert("No data to refresh!");
    else {
      this.setState({
        selectedImage: null,
        selectedImageData: null,
        outputImage: null,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="controller mb-4">
          <h4 className="mb-3">
            <strong>Import image you want to predict</strong>
          </h4>
          <form
            onSubmit={this.fileUploadHandler}
            className="border-bottom pb-2"
          >
            <label>
              <i className="fa fa-download mr-4 import "></i>
              Select image:
            </label>
            <div className="custom-file">
              <input
                type="file"
                name="selectedImage"
                onChange={this.onChangeHandler}
                className="custom-file-input input-custom"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                {this.state.selectedImageData !== null
                  ? `${this.state.selectedImageData.name}`
                  : "Choose file"}
              </label>
            </div>

            <div className="mt-3">
              <button className="btn btn-success mr-3" type="submit">
                Predict
              </button>
              <button
                className="btn btn-danger"
                onClick={this.refreshHandler}
                type="button"
              >
                Refresh
              </button>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 border-right mb-3">
            <Input selectedImage={this.state.selectedImage} />
          </div>
          <div className="col-12 col-md-6 mb-3">
            {this.state.loaded === true ? (
              <div className="image-container-overlay">
                <Spinner />
              </div>
            ) : (
              <Output outputImage={this.state.outputImage} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

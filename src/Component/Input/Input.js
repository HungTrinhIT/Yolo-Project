import React, { Component } from "react";
import "./Input.css";
import Spinner from "../Spinner/Spinner";
export default class Input extends Component {
  state = { loaded: false };
  onImageLoaded = () => {
    this.setState({
      loaded: true, // đã load xong tấm hình
    });
  };

  render() {
    let imageRender = null;
    if (this.props.selectedImage !== null)
      imageRender = this.props.selectedImage;
    else imageRender = "./images/input.png";
    return (
      <div>
        <p className="title">Input</p>
        <div className="input-img__wrapper">
          <img
            src={imageRender}
            alt="img-predict"
            onLoad={this.onImageLoaded}
          />
          {!this.state.loaded && (
            <div className="image-container-overlay">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    );
  }
}

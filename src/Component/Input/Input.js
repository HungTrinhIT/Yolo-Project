import React, { Component } from "react";
import "./Input.css";
export default class Input extends Component {
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
        </div>
      </div>
    );
  }
}

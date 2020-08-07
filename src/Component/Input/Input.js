import React, { Component } from "react";
import "./Input.css";
export default class Input extends Component {
  render() {
    let imageRender = null;
    if (this.props.selectedImage !== null)
      imageRender = this.props.selectedImage;
    else imageRender = "./images/input.png";
    return (
      <div className="input-img__wrapper">
        <p>Input</p>
        <img src={imageRender} alt="img-predict" />
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Output.css";
import Loader from "react-loader-spinner";
export default class Output extends Component {
  render() {
    let imageRender = null;
    if (this.props.outputImage !== null)
      imageRender = URL.createObjectURL(this.props.outputImage);
    else imageRender = "./images/output.jpg";
    return (
      <div>
        <p className="title">Output</p>
        <div className="input-img__wrapper ">
          <img
            src={imageRender}
            alt="img-predict"
          />
        </div>
      </div>
    );
  }
}

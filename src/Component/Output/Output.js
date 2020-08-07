import React, { Component } from "react";
import "./Output.css";
export default class Output extends Component {
  render() {
    let imageRender = null;
    if (this.props.outputImage !== null) imageRender = URL.createObjectURL(this.props.outputImage);
    else imageRender = "./images/output.jpg";
    return (
      <div className="input-img__wrapper">
        <p>Output</p>
        <img src={imageRender} alt="img-predict" />
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Home.css";
import Output from "./Output/Output";
import Input from "./Input/Input";
export default class Home extends Component {
  state = {
    selectedImage: null,
  };
  onChangeHandler = (e) => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
  };
  refreshHandler = () => {};
  render() {
    return (
      <div>
        <div className="controller mb-4">
          <h5>Import Image you want to predict</h5>
          <form onSubmit={this.submitHandler}>
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
            <Output />
          </div>
        </div>
      </div>
    );
  }
}

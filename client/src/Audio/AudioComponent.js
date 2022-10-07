import React from "react";
import AudioStyleModule from "./AudioComponent.module.css";

const AudioComponent = () => {
  return (
    <div className={AudioStyleModule.audiocontainer}>
      <h5>Title is here</h5>
      <p>Summery of the text</p>
      <p>Last part of the text</p>
    </div>
  );
};

export default AudioComponent;

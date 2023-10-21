import React from "react";
import { Quill } from "react-quill";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";

// const Size = Quill.import("formats/size");
// Size.whitelist = ["extra-small", "small", "medium", "large"];
// Quill.register(Size, true);

export const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "background",
  "list",
  "bullet",
  "indent",
  "image",
  "color",
];

// Quill Toolbar component
export const QuillToolbar = ({handleSendEmail, handleAttachment}) => {
  
  const openFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return  (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
      {/* <button className="ql-video" /> */}
    <button className="ql-clean"/>
    </span>
    <span>
    <button className="ql-attatch" onClick={openFileInput}>
      <ImAttachment/>
    </button>
    <button className="ql-send">
      <FiSend onClick={handleSendEmail}/>
    </button>
    </span>
    <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => handleAttachment(e.target.files[0])}
      />
  </div>
);
}
export default QuillToolbar;
import React from "react";
import { Quill } from "react-quill";
import { FiSend } from "react-icons/fi";

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
export const QuillToolbar = ({handleSendEmail}) => (
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
      <button className="ql-video" />
    <button className="ql-clean"/>
    </span>
    <span>
    <button className="ql-send">
      <FiSend onClick={handleSendEmail}/>
    </button>
    </span>
  </div>
);
export default QuillToolbar;
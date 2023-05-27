// Importing database utility functions
import { getDb, putDb } from "./database";

// Importing the header module
import { header } from "./header";

// Default class export
export default class {
  // Constructor method for initializing class
  constructor() {
    // Retrieve content data from local storage
    const localData = localStorage.getItem("content");

    // Checking for CodeMirror library
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded"); // Throws error if CodeMirror is not loaded
    }

    // Initialize a CodeMirror instance on an HTML element with an ID "main"
    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "", // Initial content of the editor
      mode: "javascript", // Sets the mode of the editor to JavaScript
      theme: "monokai", // Sets the theme of the editor to Monokai
      lineNumbers: true, // Shows line numbers in the editor
      lineWrapping: true, // Allows line wrapping
      autofocus: true, // Focuses the editor when the page loads
      indentUnit: 2, // Sets the number of spaces for indentation
      tabSize: 2, // Sets the width of a tab character
    });

    // Asynchronously fetches data from the database
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB, injecting into editor");
      // Sets the value of the editor to be the data from the database,
      // if not available then localData and then the header
      this.editor.setValue(data || localData || header);
    });

    // When there's a change in the editor, store the value in local storage
    this.editor.on("change", () => {
      localStorage.setItem("content", this.editor.getValue());
    });

    // When the editor loses focus, save the content to the database
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}

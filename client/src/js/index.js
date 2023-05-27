import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

// Function to load a spinner
const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Create a new editor instance
const editor = new Editor();

// If editor is undefined, load the spinner
if (typeof editor === "undefined") {
  loadSpinner();
}

// Register service worker if supported
if ("serviceWorker" in navigator) {
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("This browser does not support SWs.");
}

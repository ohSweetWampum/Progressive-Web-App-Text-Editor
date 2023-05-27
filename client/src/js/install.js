const butInstall = document.getElementById("buttonInstall");

// Event listener for before install prompt event
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// Event listener for button click
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

// Event listener for appinstalled event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});


// Automatically load transcript if ?file=URL is used
const params = new URLSearchParams(window.location.search);
const file = params.get("file");
if (file) {
  document.getElementById("transcript-frame").src = file;
}

// Download Buttons
let uploadBtn = document.getElementById("upload-file");
let resetBtn = document.querySelector(".reset");
let downloadBtn = document.querySelector(".download");

// Ranges
let saturation = document.getElementById("sat");
let contrast = document.getElementById("con");
let brightness = document.getElementById("bri");
let sepia = document.getElementById("sep");
let grayScale = document.getElementById("gray");
let blurr = document.getElementById("blur");
let hue = document.getElementById("hue");

//Image
let image = document.querySelector("img");

//Canvas
let canvas = document.querySelector("canvas");
canvas.style.display = "none";

function applyFilters() {
  image.style.filter = `
    saturate(${saturation.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayScale.value}%)
    blur(${blurr.value}px)
    hue-rotate(${hue.value}deg)
  `;
}

function resetValue() {
  image.style.filter = "none";
  saturation.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayScale.value = "0";
  blurr.value = "0";
  hue.value = "0";
}

resetBtn.onclick = resetValue;

window.onload = function () {
  resetBtn.style.display = "none";

  downloadBtn.style.display = "none";
  image.style.display = "none";
};
uploadBtn.onchange = function () {
  resetValue();
  resetBtn.style.display = "block";
  image.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(uploadBtn.files[0]);
  file.onload = function () {
    image.src = file.result;
  };
  image.onload = function () {
    downloadBtn.style.display = "block";
  };
};

saturation.oninput = applyFilters;
contrast.oninput = applyFilters;
brightness.oninput = applyFilters;
sepia.oninput = applyFilters;
grayScale.oninput = applyFilters;
blurr.oninput = applyFilters;
hue.oninput = applyFilters;

downloadBtn.onclick = function () {
  // Create Canvas

  let ctx = canvas.getContext("2d");
  // Set Canvas Size to Image
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  //  Apply Filter
  ctx.filter = image.style.filter;
  // Draw Image
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //Create Download link
  let link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();

  // Trigger Download
  link.click();
};

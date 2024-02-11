// Add an event listener for the load event of the window object
function copyCan() {
  let accanvas0 = document.getElementById('accanvas0');
  let ctx0 = accanvas0.getContext('2d');
  let canvas1 = document.getElementById('canvas1');
  let canvas2 = document.getElementById("canvas2");
  let canvas3 = document.getElementById("canvas3");
  let canvas4 = document.getElementById("canvas4");
  let canvas5 = document.getElementById("canvas5");

  // set the size of the new canvas to fit all canvases
  accanvas0.width = canvas1.width * 1;
  accanvas0.height = Math.max(canvas1.height * 1);

  // draw the content of each canvas onto the new canvas
  ctx0.drawImage(canvas1, 0, 0, accanvas0.width, accanvas0.height);
  ctx0.drawImage(canvas2, 0, 0, accanvas0.width, accanvas0.height);
  ctx0.drawImage(canvas4, 0, 0, accanvas0.width, accanvas0.height);
  ctx0.drawImage(canvas3, 0, 0, accanvas0.width, accanvas0.height);
  ctx0.drawImage(canvas5, 0, 0, accanvas0.width, accanvas0.height);
}

window.addEventListener("load", function() {
  copyCan()
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");

  var city = document.getElementById(cityName);
  if (evt.currentTarget.classList.contains("active")) {
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    evt.currentTarget.className = evt.currentTarget.className.replace(" active", "");

  } else {
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    city.style.display = "block";
    evt.currentTarget.className += " active";
  }

}

function placeAC(element, type, canvas, colorPicker) {
  let id = parseInt(element.id);
  let imageSrc = type[id];
  var togglecheck = false;
  if (element.classList.contains("active")) {
    togglecheck = true;
  }
  let groupingDiv = element.closest('div.groupings');
  let activeElements = groupingDiv.querySelectorAll('.rowAC div.active');
  activeElements.forEach(function(activeElement) {
    activeElement.classList.remove('active');
  });
  if (togglecheck == false) {
    element.classList.add('active');
  }
  puton(imageSrc, togglecheck, canvas, colorPicker);
}

//add toggle check code
function puton(imageSrc, check, canvas, colorPicker) {
  localStorage.setItem('lastImage-' + canvas, imageSrc);
  updateImage(imageSrc, colorPicker, canvas, 0.5);
}

updateImageBareBones("body.png", "colorPicker1", "canvas1", 1);
updateImageBareBones("eyes.png", "colorPicker2", "canvas2", 1);

function updateImageBareBones(imageSrc, colorPickerId, canvasId, opacity) {
  let colorPicker = document.getElementById(colorPickerId);
  let canvas = document.getElementById(canvasId);
  let ctx = canvas.getContext("2d");

  let image = new Image();
  image.src = imageSrc;
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    let savedColor = localStorage.getItem(colorPickerId);
    if (savedColor) {
      colorPicker.value = savedColor;
      updateColor(savedColor, opacity);
    }

  };
  let image2 = new Image();
  image2.src = "eyebrow.png";
  image2.onload = function() {
    ctx.drawImage(image2, 0, 0);
  };
  colorPicker.addEventListener("input", function() {
    localStorage.setItem(colorPickerId, colorPicker.value);
    updateColor(colorPicker.value, opacity);
  });

  function updateColor(color, opacity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    if (opacity < 1) {
      // Apply the color as a filter on the image
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    } else {
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = parseInt(color.substr(1, 2), 16);
        data[i + 1] = parseInt(color.substr(3, 2), 16);
        data[i + 2] = parseInt(color.substr(5, 2), 16);
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.drawImage(image2, 0, 0);
    }
  }
}

let lastImageCanvas1 = localStorage.getItem('lastImage-canvas4');
if (lastImageCanvas1) {
  updateImage(lastImageCanvas1, "colorPicker4", 'canvas4', 0.5);
}

let lastImageCanvas2 = localStorage.getItem('lastImage-canvas5');
if (lastImageCanvas2) {
  updateImage(lastImageCanvas2, "colorPicker5", 'canvas5', 0.5);
}

let lastImageCanvas3 = localStorage.getItem('lastImage-canvas3');
if (lastImageCanvas3) {
  updateImage(lastImageCanvas3, "colorPicker3", 'canvas3', 0.5);
}

function updateImage(imageSrc, colorPickerId, canvasId, opacity) {
  let colorPicker = document.getElementById(colorPickerId);
  let canvas = document.getElementById(canvasId);
  let ctx = canvas.getContext("2d");

  let image = new Image();
  image.src = imageSrc;
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    let savedColor = localStorage.getItem(colorPickerId);
    if (savedColor) {
      colorPicker.value = savedColor;
      updateColor(savedColor, opacity);
    }

  };
  colorPicker.addEventListener("input", function() {
    localStorage.setItem(colorPickerId, colorPicker.value);
    updateColor(colorPicker.value, opacity);
  });

  function updateColor(color, opacity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    if (opacity < 1) {
      // Apply the color as a filter on the image
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    } else {
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = parseInt(color.substr(1, 2), 16);
        data[i + 1] = parseInt(color.substr(3, 2), 16);
        data[i + 2] = parseInt(color.substr(5, 2), 16);
      }
      ctx.putImageData(imageData, 0, 0);

    }
  }
}
const downloadButton = document.getElementById('downloadButAC');
downloadButton.addEventListener('click', function() {
  // create a new canvas element
  let downloadCanvas = document.createElement('canvas');
  let ctx = downloadCanvas.getContext('2d');

  let canvas1 = document.getElementById('canvas1');
  let canvas2 = document.getElementById("canvas2");
  let canvas3 = document.getElementById("canvas3");
  let canvas4 = document.getElementById("canvas4");
  let canvas5 = document.getElementById("canvas5");

  // set the size of the new canvas to fit all canvases
  downloadCanvas.width = canvas1.width * 1;
  downloadCanvas.height = Math.max(canvas1.height * 1);

  // draw the content of each canvas onto the new canvas
  ctx.drawImage(canvas1, 0, 0, downloadCanvas.width, downloadCanvas.height);
  ctx.drawImage(canvas2, 0, 0, downloadCanvas.width, downloadCanvas.height);
  ctx.drawImage(canvas4, 0, 0, downloadCanvas.width, downloadCanvas.height);
  ctx.drawImage(canvas3, 0, 0, downloadCanvas.width, downloadCanvas.height);
  ctx.drawImage(canvas5, 0, 0, downloadCanvas.width, downloadCanvas.height);

  // create an a element with the download attribute
  let downloadLink = document.createElement('a');
  downloadLink.download = 'avatar.png';

  // get a data URL for the image data of the new canvas
  let dataURL = downloadCanvas.toDataURL('image/png');
  downloadLink.href = dataURL;

  // trigger the download
  downloadLink.click();
});

let shirtsX = [];
let pantsX = [];
let hairX = [];

let hair = [];
let shirts = [];
let pants = [];

fetch('https://getparts.jaerenee.repl.co/hair.php')
  .then(response => response.json())
  .then(data => {
    hairX = Object.values(data);
    let path = 'hair/';
    hair = hairX.map(name => path + name);
    makeDivs('hair', hair, 'canvas5', 'colorPicker5');
  });

fetch('https://getparts.jaerenee.repl.co/tops.php')
  .then(response => response.json())
  .then(data => {
    shirtsX = Object.values(data);
    let path = 'tops/';
    shirts = shirtsX.map(name => path + name);
    makeDivs('shirts', shirts, 'canvas3', 'colorPicker3');
  });

fetch('https://getparts.jaerenee.repl.co/pants.php')
  .then(response => response.json())
  .then(data => {
    pantsX = Object.values(data);
    let path = 'pants/';
    pants = pantsX.map(name => path + name);
    //console.log(pants);
    makeDivs('pants', pants, 'canvas4', 'colorPicker4');
  });

function makeDivs(IDname, array, canvas, colorPicker) {
  let areaDiv = document.getElementById(IDname);
  let groupingsDiv = document.createElement('div');
  groupingsDiv.className = 'groupings';
  areaDiv.appendChild(groupingsDiv);
  let rowACDiv = document.createElement('div');
  rowACDiv.className = 'rowAC';
  groupingsDiv.appendChild(rowACDiv);
  for (let i = 0; i < array.length; i++) {
    let newDiv = document.createElement('div');
    newDiv.id = i;
    // create img element and set its src attribute to the image URL
    let img = document.createElement('img');
    img.src = array[i];
    if (array == pants) {
      img.style.top = '-55px';
    }
    if (array == shirts) {
      img.style.top = '-30px';
    }
    newDiv.appendChild(img);
    newDiv.addEventListener('click', function() {
      placeAC(this, array, canvas, colorPicker);
    });
    rowACDiv.appendChild(newDiv);
  }
}

function callRandomly() {
  // Get a random interval between 3 and 5 seconds
  var interval = Math.floor(Math.random() * (8 - 3 + 1)) + 3;

  // Check if the window tab is visible and the div is not hidden
  var isVisible = document.visibilityState == "visible";
  var isNotHidden = getComputedStyle(document.getElementById("AC")).display != "none";

  // Execute myFunction only if both conditions are true
  if (isVisible && isNotHidden) {
    emotions();
  }

  // Call this function again after the random interval
  setTimeout(callRandomly, interval * 1000 + 3000);
}

// Start the timer with an initial interval of 8 seconds
//var timer = setTimeout(callRandomly, 8000);

function emotions() {
  emoP = document.getElementById("emo");
  emotes = ["😎", "😭", "😡", "😐", "🤨", "😕", "😃", "❤️", "😱", "🫣"]
  ranEmo = Math.floor(Math.random() * emotes.length);
  emoP.innerHTML = emotes[ranEmo];
  setTimeout(function() {
    emoP.innerHTML = "";
  }, 3000);
}


// Add an event listener for the close event
function closeFunction() {
  copyCan();
}
//Name for stats
// Get the input and paragraph elements by their ids
var input = document.getElementById("name");
var paragraph = document.getElementById("inputted");

// Define a function that sets the paragraph text to the input value
function showName() {
  paragraph.textContent = input.value;
  localStorage.setItem("name", input.value);
}

// Add an event listener for the input event of the input element
input.addEventListener("input", showName);

function loadName() {
  // Get the saved value by the key "name"
  var savedName = localStorage.getItem("name");
  // If there is a saved value, set it as the paragraph text
  if (savedName) {
    paragraph.textContent = savedName;
    // Set the input value to the savedName
    input.value = savedName;

  }
}

// Call the loadName function when the window loads
window.addEventListener("load", loadName);
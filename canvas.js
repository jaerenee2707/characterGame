function place(element, type, canvas, colorPicker) {
  let id = parseInt(element.id);
  let imageSrc = type[id];
  var togglecheck = false;
  if (element.classList.contains("active")) {
    togglecheck = true;
  }
  let groupingDiv = element.closest('div.groupings');
  let activeElements = groupingDiv.querySelectorAll('.row div.active');
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

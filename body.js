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
  image2.src = "eyebrows.png";
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

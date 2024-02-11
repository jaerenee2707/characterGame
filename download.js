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
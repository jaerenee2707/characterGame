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
  let rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  groupingsDiv.appendChild(rowDiv);
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
      place(this, array, canvas, colorPicker);
    });
    rowDiv.appendChild(newDiv);
  }
}

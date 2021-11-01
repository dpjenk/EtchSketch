const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

let pixel = ''; 
let gridSize = 16;

const drawGrid = (screenSize) => {
  for(i = 0; i < screenSize ** 2; i++) {
    pixel = document.createElement('div')
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = 'white';
    screen.appendChild(pixel);
  }
  screen.style.gridTemplateColumns =  `repeat(${screenSize}, auto)`;
  screen.style.gridTemplateRows =  `repeat(${screenSize}, auto)`;
}

drawGrid(gridSize);

const clear = (request) => {
  if(request === 'resize') {
    gridSize = prompt('Please enter a number not greater than 100', 16);
    
  if (isNaN(gridSize)) {
      alert("You must enter a positive number not greater than 100");
      return;
  }
  else if (gridSize <= 0) {
      alert("You must enter a positive number not greater than 100");
      return;
  }
  else if (gridSize > 100) {
      alert("You must enter a number not greater than 100");
      return;
  }
  }
  screen.innerHTML = '';
  drawGrid(gridSize);
  active();
}

let currentMode = 'black';
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'resize' || button.id === 'clear') {
      clear(button.id);
    }
    else{
      currentMode = button.id;
      clear(button.id);
    }
  });
});

const randomColor = () => {
  let color = 'rgba(';
  for(let i = 0; i < 3; i++){
    color += Math.floor(Math.random() * 255) + ',';
  }
  return color + '1)';
}

const active = () => {
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pxl => { 
    pxl.addEventListener('mouseover', (e) => {
      let crntClr = getComputedStyle(pxl, null).getPropertyValue('background-color');
      switch(currentMode){
        case 'black':
          e.target.style.backgroundColor = 'rgba(0,0,0)';
          break;
        case 'colors':
          e.target.style.backgroundColor = randomColor();  
      }
    });
  });
}
active();
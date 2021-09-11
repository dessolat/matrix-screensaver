'use strict';

const ELEM_HEIGHT = 20,
  ELEM_WIDTH = 16;
let MAX_TOP = document.documentElement.clientHeight - ELEM_HEIGHT,
  MAX_LEFT = document.documentElement.clientWidth - ELEM_WIDTH,
  NUM_ROWS = MAX_TOP / ELEM_HEIGHT,
  NUM_COLS = MAX_LEFT / ELEM_WIDTH;

const pause = ms => new Promise(res => setTimeout(res, ms));

const handleResize = () => {
  MAX_TOP = document.documentElement.clientHeight - ELEM_HEIGHT;
  MAX_LEFT = document.documentElement.clientWidth - ELEM_WIDTH;
  NUM_ROWS = MAX_TOP / ELEM_HEIGHT;
  NUM_COLS = MAX_LEFT / ELEM_WIDTH;
};

//Add new element to body
const addElement = coords => {
  const element = document.createElement('span');
  const charCode = Math.floor(Math.random() * 1040 + 19968);
  element.innerHTML = String.fromCharCode(charCode);
  element.className = 'element';
  element.style.left = coords.x + 'px';
  element.style.top = coords.y + 'px';
  document.body.appendChild(element);

  return element;
};

//Remove element from body after specified interval
const removeElement = (element, ms) => {
  setTimeout(() => {
    document.body.removeChild(element);
  }, ms);
};

//Render starting elements
const initialRendering = (flows, speed) => {
  for (let i = 0; i < flows; i++) {
    const coords = {
      x: Math.floor(Math.random() * (NUM_COLS + 1)) * ELEM_WIDTH,
      y: Math.floor(Math.random() * (NUM_ROWS + 1)) * ELEM_HEIGHT
    };
    const element = addElement(coords);
    removeElement(element, 2500 / speed);
  }
};

const main = async (flows, speed) => {
  document.body.style.setProperty('--speed', speed);
  initialRendering(flows, speed);

  while (true) {
    await pause(150 / speed);

    [...document.querySelectorAll('.element')].slice(-flows).forEach(elem => {
      const coords =
        +elem.style.top.slice(0, -2) <= MAX_TOP
          ? { x: elem.style.left.slice(0, -2), y: +elem.style.top.slice(0, -2) + ELEM_HEIGHT }
          : {
              x: Math.floor(Math.random() * (NUM_COLS + 1)) * ELEM_WIDTH,
              y: Math.floor(Math.random() * (NUM_ROWS + 1)) * ELEM_HEIGHT
            };

      const element = addElement(coords);
      removeElement(element, 2500 / speed);
    });
  }
};

window.addEventListener('resize', handleResize);

//Starting the app with specified number of flows, speed
main(35, 1.5);

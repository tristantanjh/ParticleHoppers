const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
let animationInterval;

container.addEventListener('click', () => {
  breathAnimation(); 
});

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  // Reset the pointer rotation animation
  pointerContainer.style.animation = 'none';
  pointerContainer.offsetHeight; // Trigger a reflow
  pointerContainer.style.animation = 'rotate 7.5s linear forwards infinite';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);

  animationInterval = setInterval(breathAnimation, totalTime);
} 


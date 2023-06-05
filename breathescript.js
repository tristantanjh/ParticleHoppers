const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
let animationInterval;
let redirectTimeout;
let animationStarted = false; // Flag variable to track animation state

container.addEventListener('click', () => {
  if (!animationStarted) {
    breathAnimation();
    animationStarted = true;
  }
});

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const redirectTime = 7500 * 2; // Time after which to redirect in milliseconds (2 cycles)

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  // Reset the pointer rotation animation
  pointerContainer.style.animation = 'none';
  pointerContainer.offsetHeight; 
  pointerContainer.style.animation = 'rotate 7.5s linear forwards infinite';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);

  animationInterval = setInterval(breathAnimation, totalTime); 
  redirectTimeout = setTimeout(() => {
    text.innerText = 'Finished!';
    window.location.href = 'index.html'; // Redirect to index.html
  }, redirectTime);
}

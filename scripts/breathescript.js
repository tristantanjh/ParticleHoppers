const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
const calmingSound = new Audio('/assets/calmSound.mp3'); // Create an Audio object with the sound file

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
const redirectTime = 7500 * 5; // Time after which to redirect in milliseconds (5 cycles)

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  calmingSound.play(); // Play the calming sound

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

  animationInterval = setInterval(breathAnimation, totalTime); // put before breathanimation?
  redirectTimeout = setTimeout(() => {
    text.innerText = 'Finished!';
    window.location.href = '/quote'; // Redirect to quote
  }, redirectTime);
}

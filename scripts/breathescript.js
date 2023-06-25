/*
To Implement:
Customisation of number of breaths at the start of the cycle

To consider:
Moving click handlers outside of "BreathingAnimation"
*/

// Module for managing the breathing animation
function BreathingAnimation(containerElement, textElement, pointerContainerElement, breathsTextElement, calmingSound) {
  const totalTime = 19000;
  const breatheTime = (totalTime / 19) * 4;
  const holdTime = (totalTime / 19) * 7;

  let animationInterval;
  let holdTimeout;
  let breatheTimeout;
  let threeWaitTimeout;
  let twoWaitTimeout;
  let oneWaitTimeout;
  let animationStarted = false;
  let exhaleStart = false;
  let breathsLeft = 4;

  function breathAnimation() {
    exhaleStart = false;
    breathsTextElement.innerText = breathsLeft;
    textElement.innerText = 'Breathe In!';
    containerElement.className = 'container grow';

    pointerContainerElement.offsetHeight; // Trigger a reflow
    pointerContainerElement.style.animation = 'rotate 19s linear forwards infinite';

    holdTimeout = setTimeout(() => {
      textElement.innerText = 'Hold';

      breatheTimeout = setTimeout(() => {
        textElement.innerText = 'Breathe Out!';
        containerElement.className = 'container shrink';
        exhaleStart = true;
        breathsLeft--;
      }, holdTime);
    }, breatheTime);

    if (breathsLeft <= 0) {
      redirect();
      containerElement.removeEventListener('click', clickHandler);
    }
  }

  function start() {
    calmingSound.play();
    let intialDelay = 5000;

    if (exhaleStart === false) {
      breathsLeft--;
    }

    exhaleStart = false; //prevent any addition of clicks if exhale start is true initially

    textElement.innerText = 'starting soon...';

    threeWaitTimeout = setTimeout(() => {
      textElement.innerText = '3';
    }, intialDelay - 3000);

    twoWaitTimeout = setTimeout(() => {
      textElement.innerText = '2';
    }, intialDelay - 2000);

    oneWaitTimeout = setTimeout(() => {
      textElement.innerText = '1';
    }, intialDelay - 1000);

    executeAnimation = setTimeout(() => {
      breathAnimation();
      animationInterval = setInterval(breathAnimation, totalTime);
    }, intialDelay);
    
  }

  function pause() {
    breathsLeft++;
    containerElement.className = 'container';
    pointerContainerElement.style.animation = 'none';
    textElement.innerText = 'Ready to continue?';
    clearInterval(animationInterval);
    clearTimeout(holdTimeout);
    clearTimeout(breatheTimeout);
    clearTimeout(threeWaitTimeout);
    clearTimeout(twoWaitTimeout);
    clearTimeout(oneWaitTimeout);
    clearTimeout(executeAnimation);
    animationStarted = false;
    calmingSound.pause();
    calmingSound.load();
  }

  function redirect() {
    pointerContainerElement.style.animation = 'none';
    textElement.innerText = 'finished';
    clearTimeout(holdTimeout);
    clearTimeout(breatheTimeout);
    animationStarted = false;

    setTimeout(() => {
      window.location.href = '/quote'; // Redirect to index.html
    }, 3000);
  }

  function clickHandler() {
    if (!animationStarted) {
      start();
      animationStarted = true;
    } else {
      pause();
    }
  }

  containerElement.addEventListener('click', clickHandler);

  return {
    // Expose any public methods or properties here (if needed)
  };
}

// Usage example
const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
const breathsText = document.querySelector('.breaths-text');
const calmingSound = new Audio('assets/calmSound.mp3');

const breathingAnimation = BreathingAnimation(container, text, pointerContainer, breathsText, calmingSound);

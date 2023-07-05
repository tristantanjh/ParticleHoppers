
// Module for managing the breathing animation
function BreathingAnimation(containerElement, textElement, pointerContainerElement, breathsTextElement, calmingSound) {
  //baseline
  let totalTime;
  let breatheTime;
  let secondBreatheTime;
  let holdTime;
  let rotateVar;

    totalTime = 19000;
    breatheTime = (totalTime / 19) * 4;
    holdTime = (totalTime / 19) * 7;
    secondBreatheTime = 0;
    rotateVar = 19;

  let animationInterval;
  let holdTimeout;
  let breatheTimeout;
  let threeWaitTimeout;
  let twoWaitTimeout;
  let oneWaitTimeout;
  let animationStarted = false;
  let exhaleStart = false;
  let breathsLeft = 4;

  const inputBox = document.getElementById('breathe-types');

  function breathAnimation() {
    exhaleStart = false;
    breathsTextElement.innerText = breathsLeft;
    textElement.innerText = 'Breathe In!';
    containerElement.className = 'container grow';
    
    pointerContainerElement.offsetHeight; // Trigger a reflow
    pointerContainerElement.style.animation = `rotate ${rotateVar}s linear forwards infinite`;
    
    holdTimeout = setTimeout(() => {
      textElement.innerText = 'Hold';
      
    
      breatheTimeout = setTimeout(() => {
        textElement.innerText = 'Breathe In 2!';
        containerElement.className = 'container grow';
        pointerContainerElement.style.animation = `rotate ${rotateVar}s linear forwards infinite`;
    
        holdTimeout = setTimeout(() => {
          textElement.innerText = 'Breathe Out!';
          containerElement.className = 'container shrink';
          exhaleStart = true;
          breathsLeft--;
        }, secondBreatheTime);
      }, holdTime);
    }, breatheTime);
    

    if (breathsLeft <= 0) {
      redirect();
      containerElement.removeEventListener('click', clickHandler);
    }
  }

  function start() {
  const fixedMode = mode.value;  
    //used ==, if === is used it'll check particularly for int but fixedmode is a number
    if (fixedMode == 2) {
      gradientCircle.className = 'gradient-circle2';
      totalTime = 12000;
      secondBreatheTime = 0;
      breatheTime = (totalTime / 12) * 4;
      holdTime = (totalTime / 12) * 0;
      rotateVar = 12;
    } else if (fixedMode == 3) {
      gradientCircle.className = 'gradient-circle3';
      secondBreatheTime = 3000;
      totalTime = 13000;
      breatheTime = (totalTime / 13) * 1;
      holdTime = (totalTime / 13) * 1;
      rotateVar = 13;
    } else {
      gradientCircle.className = 'gradient-circle1';
      totalTime = 19000;
      breatheTime = (totalTime / 19) * 4;
      holdTime = (totalTime / 19) * 7;
      secondBreatheTime = 0;
      rotateVar = 19;
    }

    calmingSound.play();
    let intialDelay = 5000;

    inputBox.disabled = true;

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

    inputBox.disabled = false;
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
const mode = document.querySelector('.breath-input');

const breathingAnimation = BreathingAnimation(container, text, pointerContainer, breathsText, calmingSound);

//gradient-circle change
var gradientCircle = document.getElementById('gradient');


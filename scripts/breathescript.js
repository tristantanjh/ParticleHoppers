const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
const calmingSound = new Audio('assets/calmSound.mp3'); // Create an Audio object with the sound file
const breathsText = document.querySelector(".breaths-text");
let breathsLeft = 4; //set as 4 cos we want 3 cycles, but because of  

let animationInterval;
let redirectTimeout;
let hold;
let breathe;
let threeWait;
let twoWait;
let oneWait;
let animationStarted = false; // Flag variable to track animation state
let exhaleStart = false;

container.addEventListener('click', () => {
  //breathsText.innerText = breathsLeft;
  if (!animationStarted) {
    start();
    animationStarted = true;
  } else {
    pause();
  }
});

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const redirectTime = 7500 * 5; // Time after which to redirect in milliseconds (5 cycles)

function breathAnimation() {
  exhaleStart = false;
  breathsText.innerText = breathsLeft;
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  pointerContainer.offsetHeight; // Trigger a reflow
  pointerContainer.style.animation = 'rotate 7.5s linear forwards infinite';
  //pointerContainer.style.animation = 'none'; can use to reset

   hold = setTimeout(() => {
    text.innerText = 'Hold';
    
     breathe = setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
      exhaleStart = true;
      breathsLeft--;
    }, holdTime);
  }, breatheTime);

  
  
  if (breathsLeft <= 0) {
    redirect();
  }

}

function start() {
  calmingSound.play();

  if (exhaleStart === false) {
    breathsLeft--;
  }

  text.innerText = 'starting soon...';

  threeWait = setTimeout(() => {
    text.innerText = '3';
  }, (totalTime - 3000));

  twoWait = setTimeout(() => {
    text.innerText = '2';
  }, (totalTime - 2000));

  oneWait = setTimeout(() => {
    text.innerText = '1';
  }, totalTime - 1000);

  animationInterval = setInterval(breathAnimation, totalTime);
  // Consider putting breathsLeft--
}

// Rest of the code remains the same

function pause() {
  breathsLeft++;
  container.className = 'container'; // Reset the class to its initial state
  pointerContainer.style.animation = 'none'; //can use to reset
  text.innerText = 'Ready to continue?';
  clearInterval(animationInterval);
  clearTimeout(hold);
  clearTimeout(breathe);
  clearTimeout(threeWait);
  clearTimeout(twoWait);
  clearTimeout(oneWait);
  animationStarted = false;
  calmingSound.pause();
  calmingSound.load(); //restarts audio
}

function redirect() {
  pointerContainer.style.animation = 'none'; //can use to reset
  text.innerText = 'finished';
  clearTimeout(hold); //cleartimeouts not working
  clearTimeout(breathe);
  animationStarted = false;
  //calmingSound.pause();

  setTimeout(() => {
    window.location.href = '/quote'; // Redirect to index.html
  }, 3000);
}

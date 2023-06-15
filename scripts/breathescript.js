const container = document.getElementById('container');
const text = document.getElementById('text');
const pointerContainer = document.querySelector('.pointer-container');
const calmingSound = new Audio('assets/calmSound.mp3'); // Create an Audio object with the sound file
const breathsText = document.querySelector(".breaths-text");
let breathsLeft = 3; 

let animationInterval;
let redirectTimeout;
let hold;
let breathe;
let animationStarted = false; // Flag variable to track animation state

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
    }, holdTime);
  }, breatheTime);

  breathsLeft--;
  
  if (breathsLeft <= -1) {
    redirect();
  }

}

function start() {
  calmingSound.play();

  text.innerText = 'starting soon...';

  setTimeout(() => {
    text.innerText = '3';
  }, (totalTime - 3000));

  setTimeout(() => {
    text.innerText = '2';
  }, (totalTime - 2000));

  setTimeout(() => {
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
  animationStarted = false;
  calmingSound.pause();
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

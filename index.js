
// ---------------MENU BURGER + SIDEBAR--------------

const sidebar = document.getElementById("side-bar");
const content = document.querySelector(".content");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

content.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Priorités en CSS : !important > id > classe > baliseHtml


// --------------------TITRE DYNAMIQUE---------


const target = document.getElementById('target');
const array = ["Gaming", "Retro", "Good!"];
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  letter.textContent = array[wordIndex][letterIndex];
  target.appendChild(letter);

  setTimeout(() => {
    letter.remove();
  }, 2700);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
    }
    
    if (letterIndex < array[wordIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        target.textContent = ""; // Clear the target for the next word
        loop();
      }, 2700);
    }
  }, 80);
};

loop();
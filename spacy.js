const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();

img.src = "./media/flappy-bird-set.png";

// Paramètres généraux

let gamePlaying = false;
const gravity = 0.5;
const baseSpeed = 6.2; // Vitesse de base
let currentSpeed = baseSpeed; // Vitesse actuelle qui changera
const size = [51, 36];
const jump = -9.5;
const cTenth = canvas.width / 10;

// paramètres des tuyaux
const pipeWidth = 78;
const pipeGap = 300;
const pipeLoc = () =>
  Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
  pipeWidth;

let index = 0,
  bestScore = 0,
  currentScore = 0,
  pipes = [],
  flight,
  flyheight = canvas.height / 2 - size[1] / 2;

const setup = () => {
  currentScore = 0;
  currentSpeed = baseSpeed; // Réinitialiser la vitesse actuelle à la vitesse de base
  flight = jump;
  flyheight = canvas.height / 2 - size[1] / 2;

  pipes = Array(3)
    .fill()
    .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
};

const render = () => {
  index++;

  // Background
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (currentSpeed / 2)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (currentSpeed / 2)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  // condition si click sur "jouer"
  if (gamePlaying) {
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      cTenth,
      flyheight,
      ...size
    );
    flight += gravity;
    flyheight = Math.min(flyheight + flight, canvas.height - size[1]);
  } else {
    // position Bird
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 9) / 3) * size[1],
      ...size,
      canvas.width / 2 - size[0] / 2,
      flyheight,
      ...size
    );

    // Ecrire dans le canvas
    ctx.fillText(`Meilleur score : ${bestScore}`, 80, 245);
    ctx.fillText("Espace pour jouer", 90, 535);
    ctx.font = "bold 25px courier";
  }

  // Affichage des tuyaux
  if (gamePlaying) {
    pipes.map((pipe) => {
      pipe[0] -= currentSpeed;

      // tuyaux DU HAUT
      ctx.drawImage(
        img,
        432,
        588 - pipe[1],
        pipeWidth,
        pipe[1],
        pipe[0],
        0,
        pipeWidth,
        pipe[1]
      );

      // tuyaux DU bas
      ctx.drawImage(
        img,
        432 + pipeWidth,
        108,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap,
        pipe[0],
        pipe[1] + pipeGap,
        pipeWidth,
        canvas.height - pipe[1] + pipeGap
      );

      // incrémentation des score
      if (pipe[0] <= -pipeWidth) {
        currentScore++;
        bestScore = Math.max(bestScore, currentScore);

        // Augmenter la vitesse des tuyaux chaque 15 points
        if (currentScore % 15 === 0) {
          currentSpeed += 0.5; // Augmentation de la vitesse
        }

        // faire disparaitre les tuyaux + créer des nouveaux
        pipes = [
          ...pipes.slice(1),
          [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]
        ];
      }

      // si on touche un tuyaux, FIN !
      if (
        [
          pipe[0] <= cTenth + size[0],
          pipe[0] + pipeWidth >= cTenth,
          pipe[1] > flyheight || pipe[1] + pipeGap < flyheight + size[1],
        ].every((elem) => elem)
      ) {
        gamePlaying = false;
        setup();
      }
    });
  }

  // AFFICHER LES SCORE
  document.getElementById("bestScore").innerHTML = `Meilleur : ${bestScore}`;
  document.getElementById("currentScore").innerHTML = `Actuel : ${currentScore}`;

  window.requestAnimationFrame(render);
};

setup(); 
img.onload = render;

// Écouter l'événement de pression de la touche Espace
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!gamePlaying) {
      gamePlaying = true;
    }
    flight = jump;
  }
});
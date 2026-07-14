// =========================
// EXPERIENCE STATE
// =========================

const experience = {
  currentScene: 1,
  selectedMoment: null,
  selectedDate: null,
  accepted: false,
  musicPlaying: false,
};


// =========================
// ELEMENTS
// =========================

const currentSceneText =
  document.getElementById("currentScene");

const music =
  document.getElementById("backgroundMusic");

const musicButton =
  document.getElementById("musicButton");

const yesButton =
  document.getElementById("yesButton");

const notYetButton =
  document.getElementById("notYetButton");

const momentOptions =
  document.querySelectorAll(".moment-option");

const momentDate =
  document.getElementById("momentDate");

const finishButton =
  document.getElementById("finishButton");

const finalDate =
  document.getElementById("finalDate");

const finalMoment =
  document.getElementById("finalMoment");


// =========================
// SCENE NAVIGATION
// =========================

function goToScene(sceneNumber) {

  const currentScene =
    document.querySelector(".scene.active");

  const nextScene =
    document.getElementById(
      `scene${sceneNumber}`
    );


  if (!currentScene || !nextScene) {
    return;
  }


  currentScene.classList.add("leaving");


  setTimeout(() => {

    currentScene.classList.remove(
      "active",
      "leaving"
    );


    nextScene.classList.add("active");


    experience.currentScene =
      sceneNumber;


    updateProgress();


    nextScene.scrollTop = 0;

  }, 450);

}


// =========================
// PROGRESS
// =========================

function updateProgress() {

  currentSceneText.textContent =
    String(
      experience.currentScene
    ).padStart(2, "0");

}


// =========================
// NEXT BUTTONS
// =========================

const nextButtons =
  document.querySelectorAll("[data-next]");


nextButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const nextScene =
        Number(
          button.dataset.next
        );


      // Start music after first user interaction
      if (experience.currentScene === 1) {
        startMusic();
      }


      goToScene(nextScene);

    }
  );

});


// =========================
// MUSIC
// =========================

function startMusic() {

  music.volume = 0;


  const playPromise =
    music.play();


  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        experience.musicPlaying = true;


        musicButton.classList.add(
          "playing"
        );


        fadeMusicIn();

      })
      .catch((error) => {

        console.log(
          "Music could not autoplay:",
          error
        );


        experience.musicPlaying = false;

      });

  }

}


function fadeMusicIn() {

  const fadeInterval =
    setInterval(() => {

      if (music.volume < 0.35) {

        music.volume =
          Math.min(
            music.volume + 0.02,
            0.35
          );

      } else {

        clearInterval(
          fadeInterval
        );

      }

    }, 100);

}


// Music button

musicButton.addEventListener(
  "click",
  () => {

    if (music.paused) {

      music.play();


      experience.musicPlaying =
        true;


      musicButton.classList.add(
        "playing"
      );

    } else {

      music.pause();


      experience.musicPlaying =
        false;


      musicButton.classList.remove(
        "playing"
      );

    }

  }
);


// =========================
// QUESTION
// =========================

yesButton.addEventListener(
  "click",
  () => {

    experience.accepted = true;


    goToScene(5);

  }
);


notYetButton.addEventListener(
  "click",
  () => {

    notYetButton.textContent =
      "Take your time";

  }
);


// =========================
// MOMENT SELECTION
// =========================

momentOptions.forEach(
  (option) => {

    option.addEventListener(
      "click",
      () => {

        // Remove selected state
        momentOptions.forEach(
          (item) => {

            item.classList.remove(
              "selected"
            );

          }
        );


        // Add selected state
        option.classList.add(
          "selected"
        );


        // Save selection
        experience.selectedMoment =
          option.dataset.moment;

      }
    );

  }
);


// =========================
// FINISH EXPERIENCE
// =========================

finishButton.addEventListener(
  "click",
  () => {

    // Check moment
    if (!experience.selectedMoment) {

      alert(
        "Choose our first plan first."
      );

      return;

    }


    // Check date
    if (!momentDate.value) {

      alert(
        "Pick a date first."
      );

      return;

    }


    // Save date
    experience.selectedDate =
      momentDate.value;


    // Prepare final content
    prepareFinalScene();


    // Go to final scene
    goToScene(6);

  }
);


// =========================
// FINAL SCENE
// =========================

function prepareFinalScene() {

  const selectedDate =
    new Date(
      experience.selectedDate
      + "T00:00:00"
    );


  const formattedDate =
    selectedDate.toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );


  finalDate.textContent =
    formattedDate;


  finalMoment.textContent =
    experience.selectedMoment;

}
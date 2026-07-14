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

const nextButtons =
  document.querySelectorAll("[data-next]");


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

  // Prevent opening the same scene
  if (currentScene === nextScene) {
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

nextButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      const nextScene =
        Number(
          button.dataset.next
        );

      // Browser hanya mengizinkan audio
      // dimulai setelah interaksi pengguna.
      if (
        experience.currentScene === 1 &&
        music.paused
      ) {
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
        experience.musicPlaying =
          true;

        musicButton.classList.add(
          "playing"
        );

        fadeMusicIn();
      })

      .catch((error) => {
        console.log(
          "Music could not play:",
          error
        );

        experience.musicPlaying =
          false;

        musicButton.classList.remove(
          "playing"
        );
      });
  }
}


// =========================
// MUSIC FADE IN
// =========================

function fadeMusicIn() {
  const targetVolume = 0.35;

  const fadeInterval =
    setInterval(() => {
      if (
        music.volume <
        targetVolume
      ) {
        music.volume =
          Math.min(
            music.volume + 0.02,
            targetVolume
          );
      } else {
        clearInterval(
          fadeInterval
        );
      }
    }, 100);
}


// =========================
// MUSIC BUTTON
// =========================

musicButton.addEventListener(
  "click",
  async () => {
    try {
      if (music.paused) {
        await music.play();

        // Kalau musik pertama kali
        // dinyalakan lewat tombol.
        if (music.volume === 0) {
          music.volume = 0.35;
        }

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
    } catch (error) {
      console.log(
        "Music toggle failed:",
        error
      );
    }
  }
);


// =========================
// QUESTION — YES
// =========================

yesButton.addEventListener(
  "click",
  () => {
    experience.accepted =
      true;

    goToScene(5);
  }
);


// =========================
// RUNAWAY "NOT YET" BUTTON
// =========================

function moveNotYetButton() {
  const buttonWidth =
    notYetButton.offsetWidth;

  const buttonHeight =
    notYetButton.offsetHeight;

  const padding = 20;

  const maxX =
    window.innerWidth -
    buttonWidth -
    padding;

  const maxY =
    window.innerHeight -
    buttonHeight -
    padding;

  const randomX =
    Math.floor(
      Math.random() *
      Math.max(
        maxX - padding,
        1
      )
    ) + padding;

  const randomY =
    Math.floor(
      Math.random() *
      Math.max(
        maxY - padding,
        1
      )
    ) + padding;

  notYetButton.style.position =
    "fixed";

  notYetButton.style.left =
    `${randomX}px`;

  notYetButton.style.top =
    `${randomY}px`;

  notYetButton.style.margin =
    "0";

  notYetButton.style.zIndex =
    "999";
}


// Desktop:
// Kabur ketika cursor masuk.
notYetButton.addEventListener(
  "mouseenter",
  moveNotYetButton
);


// Mobile:
// Kabur ketika disentuh.
notYetButton.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();

    moveNotYetButton();
  },
  {
    passive: false,
  }
);


// Pengaman:
// Kalau berhasil diklik,
// tetap tidak menjalankan apa pun.
notYetButton.addEventListener(
  "click",
  (event) => {
    event.preventDefault();

    moveNotYetButton();
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
        // Hapus pilihan sebelumnya
        momentOptions.forEach(
          (item) => {
            item.classList.remove(
              "selected"
            );
          }
        );

        // Tandai pilihan baru
        option.classList.add(
          "selected"
        );

        // Simpan pilihan
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
    // Harus memilih aktivitas
    if (
      !experience.selectedMoment
    ) {
      alert(
        "Choose our first plan first."
      );

      return;
    }

    // Harus memilih tanggal
    if (!momentDate.value) {
      alert(
        "Pick a date first."
      );

      return;
    }

    // Simpan tanggal
    experience.selectedDate =
      momentDate.value;

    // Siapkan ending
    prepareFinalScene();

    // Pindah ke scene terakhir
    goToScene(6);
  }
);


// =========================
// FINAL SCENE
// =========================

function prepareFinalScene() {
  const selectedDate =
    new Date(
      `${experience.selectedDate}T00:00:00`
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


// =========================
// INITIALIZE
// =========================

updateProgress();
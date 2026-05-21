const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const wishCard = document.getElementById("wishCard");
const loginCard = document.getElementById("loginCard");
const restartButton = document.getElementById("restartButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const journeyStage = document.getElementById("journeyStage");
const stepMeta = document.getElementById("stepMeta");
const stepDots = document.getElementById("stepDots");
const toast = document.getElementById("toast");
const birthdayMusic = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const canvas = document.getElementById("skyCanvas");
const context = canvas.getContext("2d");

const secretName = "bhavani";
const secretPasscode = "22/05";

const journeySteps = [
  {
    kicker: "A sky full of wishes ✨",
    title: "Happy Birthday, Bhavani Akka 💖",
    body: "Today begins with one simple truth: you are deeply loved 🤍. May this birthday bring you the kind of happiness that sits quietly in the heart and keeps glowing long after the day ends 🌙.",
    cards: [
      ["For your smile 😊", "May it return to you through calls, surprises, laughter, and all the little moments that make today feel special 🎁."],
      ["For your peace 🕊️", "May this year feel softer, lighter, kinder, and full of people who understand your heart 🤍."],
      ["For your dreams 🌟", "May every dream you have carried silently find the courage, timing, and blessing it deserves ✨."]
    ]
  },
  {
    kicker: "A note from my heart 💌",
    title: "You Are My Safe Place 🤍",
    body: "Dear Akka, some people become important because they are family 💞. You became unforgettable because of the way you care. Your words, your patience, your laughter, and even your small scoldings have a place in my heart that nobody else can take 🫶.",
    quote: "You are not just my sister 💖. You are one of the reasons life feels less heavy 🌙."
  },
  {
    kicker: "The things I may not say enough 🥹",
    title: "Thank You For Being You 🌷",
    body: "Thank you for standing strong even when life asks too much from you 🫶. Thank you for loving in your own beautiful way. Thank you for being someone I can think of and instantly feel that I am not alone 🤍.",
    cards: [
      ["Your strength 💪", "It inspires more than you know ✨."],
      ["Your kindness 🌸", "It stays with people after you leave 🤍."],
      ["Your presence 🫶", "It turns ordinary days into memories 💫."]
    ]
  },
  {
    kicker: "A wish for your coming year 🌙",
    title: "May Life Choose You Gently 🕊️",
    body: "May your next chapter bring peaceful mornings, honest love, unexpected wins, better health, louder laughter, and moments where you suddenly realize that everything you waited for was worth it 🌟.",
    quote: "May the universe be soft with you, proud of you, and generous to your dreams ✨."
  },
  {
    kicker: "The final little surprise 🎁",
    title: "Forever Cheering For You 💖",
    body: "No matter where life takes us, I will always be on your side 🤍. I hope this tiny website makes you smile today, because you deserve surprises that feel personal, thoughtful, and made only for you 🫶. Happy Birthday, Bhavani Akka 🎂.",
    quote: "With all my love, always 💌."
  }
];

let stars = [];
let petals = [];
let typingTimer;
let musicStarted = false;
let currentStep = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  createSky();
}

function createSky() {
  const starCount = Math.min(130, Math.floor(window.innerWidth / 7));
  const petalCount = Math.min(32, Math.floor(window.innerWidth / 22));

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.8 + 0.35,
    alpha: Math.random() * 0.55 + 0.25,
    speed: Math.random() * 0.18 + 0.04
  }));

  petals = Array.from({ length: petalCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 9 + 5,
    speed: Math.random() * 0.75 + 0.35,
    sway: Math.random() * 1.4 + 0.4,
    turn: Math.random() * Math.PI
  }));
}

function drawSky() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach((star) => {
    star.y += star.speed;
    star.alpha += Math.sin(Date.now() / 500 + star.x) * 0.002;

    if (star.y > window.innerHeight + 8) {
      star.y = -8;
      star.x = Math.random() * window.innerWidth;
    }

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 250, 240, ${Math.max(0.15, Math.min(0.9, star.alpha))})`;
    context.fill();
  });

  petals.forEach((petal) => {
    petal.y += petal.speed;
    petal.x += Math.sin(petal.y * 0.018) * petal.sway;
    petal.turn += 0.025;

    if (petal.y > window.innerHeight + 24) {
      petal.y = -24;
      petal.x = Math.random() * window.innerWidth;
    }

    context.save();
    context.translate(petal.x, petal.y);
    context.rotate(petal.turn);
    context.beginPath();
    context.ellipse(0, 0, petal.size * 0.45, petal.size, 0, 0, Math.PI * 2);
    context.fillStyle = "rgba(201, 143, 152, 0.32)";
    context.fill();
    context.restore();
  });

  requestAnimationFrame(drawSky);
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.remove("hidden");
  window.setTimeout(() => toast.classList.add("hidden"), 1600);
}

function playBirthdayMusic() {
  birthdayMusic.volume = 0.42;
  birthdayMusic.loop = true;

  const playRequest = birthdayMusic.play();
  if (playRequest) {
    playRequest
      .then(() => {
        musicStarted = true;
        musicToggle.classList.remove("hidden");
        musicToggle.textContent = "Music on 🎵";
        musicToggle.setAttribute("aria-label", "Pause background music");
      })
      .catch(() => {
        showToast("Tap Music to play the song 🎵");
        musicToggle.classList.remove("hidden");
        musicToggle.textContent = "Play music 🎵";
        musicToggle.setAttribute("aria-label", "Play background music");
      });
  }
}

function launchConfetti() {
  const colors = ["#d7b46a", "#c98f98", "#8fa99f", "#8d9fb8", "#f6f1e8"];

  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement("span");
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 5;

    piece.style.cssText = `
      position: fixed;
      z-index: 4;
      left: ${left}vw;
      top: -20px;
      width: ${size}px;
      height: ${size * 1.7}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 999px;
      pointer-events: none;
      transform: rotate(${Math.random() * 180}deg);
      animation: confettiFall ${Math.random() * 1.4 + 2.4}s ease-in forwards;
    `;

    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4200);
  }
}

function buildCards(cards) {
  if (!cards) {
    return "";
  }

  return `
    <div class="memory-grid" aria-label="Birthday blessings">
      ${cards.map(([title, text], index) => `
        <article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function typeStepText(text) {
  const target = document.getElementById("typedWish");
  if (!target) {
    return;
  }

  window.clearInterval(typingTimer);
  target.textContent = "";
  target.classList.remove("done");

  let index = 0;
  typingTimer = window.setInterval(() => {
    target.textContent = text.slice(0, index);
    index += 2;

    if (index > text.length) {
      target.textContent = text;
      target.classList.add("done");
      window.clearInterval(typingTimer);
    }
  }, 16);
}

function renderStep(direction = "next") {
  const step = journeySteps[currentStep];
  stepMeta.textContent = `Chapter ${currentStep + 1} of ${journeySteps.length}`;
  prevButton.disabled = currentStep === 0;
  nextButton.querySelector("span").textContent =
    currentStep === journeySteps.length - 1 ? "Replay journey ✨" : "Next surprise 💌";

  stepDots.innerHTML = journeySteps
    .map((_, index) => `<span class="${index === currentStep ? "active" : ""}"></span>`)
    .join("");

  journeyStage.className = `journey-stage moving-${direction}`;
  journeyStage.innerHTML = `
    <article class="journey-page">
      <p class="wish-meta">${step.kicker}</p>
      <h2 class="wish-title" id="wishTitle">${step.title}</h2>
      <div class="letter-panel open">
        <p class="wish-text" id="typedWish"></p>
      </div>
      ${step.quote ? `<blockquote class="wish-quote">${step.quote}</blockquote>` : ""}
      ${buildCards(step.cards)}
    </article>
  `;

  typeStepText(step.body);
}

function goToStep(nextStep) {
  const direction = nextStep > currentStep ? "next" : "prev";
  currentStep = nextStep;
  renderStep(direction);

  if (currentStep === journeySteps.length - 1) {
    launchConfetti();
  }
}

const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confettiFall {
    to {
      top: 110vh;
      transform: translateX(${Math.random() > 0.5 ? "" : "-"}70px) rotate(740deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Name and passcode are needed to open the surprise 🎁.";
    return;
  }

  if (username === secretName && password === secretPasscode) {
    message.textContent = "";
    playBirthdayMusic();
    loginCard.classList.add("hidden");
    wishCard.classList.remove("hidden");
    document.body.classList.add("celebrate");
    currentStep = 0;
    renderStep("next");
    showToast("Your journey is opening... ✨");
    launchConfetti();
  } else {
    message.textContent = "Almost there 💫 Hint: name is Bhavani and passcode is 22/05.";
  }
});

musicToggle.addEventListener("click", () => {
  if (birthdayMusic.paused) {
    playBirthdayMusic();
    return;
  }

  birthdayMusic.pause();
  musicToggle.textContent = "Music off";
  musicToggle.setAttribute("aria-label", "Play background music");
});

prevButton.addEventListener("click", () => {
  if (currentStep > 0) {
    goToStep(currentStep - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (!musicStarted) {
    playBirthdayMusic();
  }

  if (currentStep === journeySteps.length - 1) {
    goToStep(0);
    return;
  }

  goToStep(currentStep + 1);
});

restartButton.addEventListener("click", () => {
  currentStep = 0;
  renderStep("prev");
  launchConfetti();
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawSky();

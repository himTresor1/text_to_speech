const main = document.querySelector("main");
const voiceSelect = document.getElementById("voice");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./images/australia.png",
    text: "Australia",
  },
  {
    image: "./images/china.jpg",
    text: "China",
  },
  {
    image: "./images/india.jpg",
    text: "india",
  },
  {
    image: "./images/japan.png",
    text: "Japan",
  },
  {
    image: "./images/philippines.png",
    text: "philippines",
  },
  {
    image: "./images/russia.jpg",
    text: "Russia",
  },
  {
    image: "./images/southkorea.png",
    text: "South Korea",
  },
  {
    image: "./images/usa.png",
    text: "United States of America",
  },
 
];

data.forEach(createBox);

//create box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
   
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });
  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();


function setTextMessage(text) {
  message.text = text;
}


function speakText() {
  speechSynthesis.speak(message);
}


let voices = [];
function getVoice() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener("voiceschanged", getVoice);
getVoice();



toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
  }

voiceSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

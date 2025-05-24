let lösungen = [];

window.addEventListener("DOMContentLoaded", () => {
  const jsonName = location.pathname.split("/").pop().replace(".html", "") + ".json";

  fetch(`../../../data/${jsonName}`)
    .then(res => res.json())
    .then(data => {
      lösungen = data.fragen;
      baueQuizAusFragen(data.fragen);
    })
    .catch(err => console.error("Quiz-Daten konnten nicht geladen werden", err));
});

function baueQuizAusFragen(fragen) {
  const section = document.querySelector(".quiz-section");

  fragen.forEach((eintrag, index) => {
    const div = document.createElement("div");
    div.className = "quiz-item";

    const p = document.createElement("p");
    p.textContent = eintrag.frage;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `frage${index}`;
    input.setAttribute("oninput", "filterInput(this)");
    input.setAttribute("onkeydown", `handleKey(event, 'frage${index}', ${index})`);

    const button = document.createElement("button");
    button.textContent = "Prüfen";
    button.className = "primary-btn";
    button.setAttribute("onclick", `prüfeAntwort('frage${index}', ${index})`);

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(button);
    section.appendChild(div);
  });
}

function prüfeAntwort(inputId, frageIndex) {
  const input = document.getElementById(inputId);
  const eingabe = input.value.trim().toLowerCase();

  input.classList.remove("richtig", "falsch");

  if (!eingabe || eingabe.includes(" ")) {
    input.classList.add("falsch");
    return;
  }

  const richtigeAntworten = lösungen[frageIndex]?.antworten || [];

  if (richtigeAntworten.includes(eingabe)) {
    input.classList.add("richtig");
  } else {
    input.classList.add("falsch");
  }
}

function filterInput(input) {
  input.value = input.value.replace(/\s/g, "");
}

function handleKey(event, inputId, frageIndex) {
  if (event.key === "Enter") {
    event.preventDefault();
    prüfeAntwort(inputId, frageIndex);
  } else if (event.key === "Tab") {
    event.preventDefault();
    const next = document.querySelectorAll('.quiz-item input')[frageIndex + 1];
    if (next) next.focus();
  }
}

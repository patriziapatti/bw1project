const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
function pescaDomandeCasuali() {
  const domandeCasuali = [];
  const indiciUtilizzati = []; // Array per tenere traccia degli indici già utilizzati
  while (domandeCasuali.length < 10) {
    const indiceCasuale = Math.floor(Math.random() * questions.length);
    if (!indiciUtilizzati.includes(indiceCasuale)) {
      indiciUtilizzati.push(indiceCasuale);
      domandeCasuali.push(questions[indiceCasuale]);
    }
  }
  return domandeCasuali;
}
const domandeCasuali = pescaDomandeCasuali();
let indiceDomandaCorrente = 0; // Indice della domanda corrente

function stampaDomanda() {
  let titoloDomanda = document.getElementById("question")
  titoloDomanda.innerHTML = ""; // Pulisci il contenuto precedente //
  const domandaCorrente = domandeCasuali[indiceDomandaCorrente];
  let newH2 = document.createElement("h2");
  newH2.classList.add("titleAnswer")
  newH2.innerHTML = domandaCorrente.question
  titoloDomanda.appendChild(newH2);
  stampaRisposta()
  // Creiamo un nuovo timer
  let seconds = 30;
  let contenitoreTimer = document.createElement("div");
  contenitoreTimer.id = "timer";
  document.getElementById("perTimer").appendChild(contenitoreTimer)
  
  timerInterval = setInterval(function () {
    seconds--;
    contenitoreTimer.textContent = seconds ;

    if (seconds === -1) {
      clearInterval(timerInterval);
      domandaSuccessiva();
      contenitoreTimer.textContent = "";
    }
  }, 1000);
}

function stampaRisposta() {
  let domanda = domandeCasuali[indiceDomandaCorrente]
  let indiceRisposta = Math.floor(Math.random() * (domanda.incorrect_answers.length + 1)); //prendo la lunghezza dell'array di risposte sbagliate + 1 (che è quella corretta)
  let arrayRisposte = domanda.incorrect_answers//.slice() //assegno a arrayRisposte le risposte sbagliate ed uso lo slice per non andare a modificare domanda.incorrect_answer - senza lo slice mi creerebbe solo una relazione
  arrayRisposte.splice(indiceRisposta, 0, domanda.correct_answer)// uso il metodo splice per aggiungere all'arrayrisposte la risposta corretta in una posizione randomica


  document.getElementById("divRisposte").innerHTML = "" //svuoto il div riposte
  for (let ar of arrayRisposte) { //faccio un ciclo sulle risposte perchè mi serve che per ogni risposta mi crei un radio button e una label (e un div dove inserirli)
    let newDiv = document.createElement("div") 
    let newRadioB = document.createElement("input") 
    newRadioB.type = "radio"
    newRadioB.name = "radioButton"
    newRadioB.value = ar
    newRadioB.classList.add("radioButton")
    let newLabel = document.createElement("label") 
    newLabel.textContent = ar //contenuto della label è quello di ogni giro del ciclo (stringa che ho nell'arrayRisposte)
    newLabel.classList.add("textAnswer")
    newLabel.classList.add("labelButton")
    newDiv.appendChild(newRadioB)
    newDiv.appendChild(newLabel)
    document.getElementById("divRisposte").appendChild(newDiv)
  }
  contatoreDomande()
}

let punteggio = 0
let contenitoreRisposte = []

function domandaSuccessiva() {
  let opzioneSelezionata = document.querySelectorAll("input[name=radioButton]:checked") // mi prendo i valori scelti dall'utente
  for(let i = 0; i<opzioneSelezionata.length; i++){ //faccio un ciclo sulle opzioni selezionate
   let opzione = opzioneSelezionata[i]
   let valoreOpzione = opzione.value
 contenitoreRisposte.push(valoreOpzione)
  }
  clearInterval(timerInterval); // Cancella il timer corrente
  const timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.remove(); // Rimuovi l'elemento del timer dalla pagina
  }
  for (let i = 0; i<contenitoreRisposte.length; i++){
    if (contenitoreRisposte[i] === domandeCasuali[indiceDomandaCorrente].correct_answer){
      punteggio ++
    } contenitoreRisposte.shift() // Tolgo elemento dell'array
  }
  if (indiceDomandaCorrente < domandeCasuali.length - 1) {
    indiceDomandaCorrente++;
    stampaDomanda();
  } else {
    let main = document.getElementById("sezionePrincipale")
    main.innerHTML= ""
    let footer = document.getElementById ("contatoreFooter")
    footer.innerHTML = ""
    let totaleRisultati = document.createElement ('p')
    totaleRisultati.classList.add("titleScore")
    totaleRisultati.textContent = "Test completed! Your score is: " + punteggio + " /10"
    main.appendChild(totaleRisultati)
  }
}

function contatoreDomande() {
  let newPar = document.createElement("p")
  let contatore = indiceDomandaCorrente + 1
  newPar.classList.add("titleCount")
  newPar.textContent = ("Question " + contatore + "/10")
  document.getElementById("contatoreFooter").innerHTML = ""; // Pulisce il contenuto precedente nel footer
  document.getElementById("contatoreFooter").appendChild(newPar); // Aggiunge il nuovo paragrafo al footer
}

window.onload=stampaDomanda
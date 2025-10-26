let triviaBtn = document
.querySelector("#js-new-quote") 
.addEventListener("click", newSpell);

let answerBtn = document
.querySelector("#js-tweet") 
.addEventListener("click", showUse);

let current = {
    spell: "",
    use: "",
}

async function newSpell() {
   // console.log("Success");

   try {
    const response = await fetch("https://potterapi-fedeperin.vercel.app/en/spells/random");


     if (!response.ok) {
      throw Error(response.statusText);
    }
    
    const data = await response.json();

    const spellName = data.spell;
    const spellUse = data.use;

    current.spell = spellName;
    current.use = spellUse;

    displaySpell(spellName);


   } catch (err) {
    console.log(err)
    alert("Failed to fetch new trivia");
   }
}



function displaySpell(spell) {
  const questionText = document.querySelector("#js-quote-text");
    const answerText = document.querySelector("#js-answer-text");
  questionText.textContent = spell;
  answerText.textContent = "";
}

function showUse() {
   // console.log("Success = answer!");
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = current.use;
}

newSpell();
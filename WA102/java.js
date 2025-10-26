let triviaBtn = document.querySelector("#js-new-quote") .addEventListener("click", newFact);

let answerBtn = document.querySelector("#js-tweet") .addEventListener("click", newAnswer);

let current = {
    question: "",
    answer: "",
}

async function newFact() {
   // console.log("Success");

   try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const object = await response.json();
    const dogPic = object['message'];

    if (!response.ok) {
      throw Error(response.statusText);
    }



    console.log(object);
    console.log(dogPic);
    // displayTrivia(json["question"]);
    // current.question = json["question"];
    // current.answer = json["answer"];
    // console.log(current.question);
    // console.log(current.answer);



   } catch (err) {
    console.log(err)
    alert("Failed to fetch new trivia");
   }
}



function displayTrivia(question) {
  const questionText = document.querySelector("#js-quote-text");
    const answerText = document.querySelector("#js-answer-text");
  questionText.textContent = question;
  answerText.textContent = "";
}

function newAnswer() {
   // console.log("Success = answer!");
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = current.answer;
}

newFact();
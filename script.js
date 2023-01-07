// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");
var secondsLeft = 60;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

  setTime();

//questions to be asked
var questions = [
    {
        prompt: "What is the bigest country in the world?\n (A) USA\n (B) Russia\n (C) China\n (D) Africa",
        answer: "A"
    },
    {
        prompt: "What is the language used in Brazil?\n (A) English\n (B) Spanish\n (C) Portuguese\n (D) Brazilian",
        answer: "C"
    },
    {
        prompt: "Which of the following is the first high level programming language created in the 1950s?\n (A) FORTRAN\n (B) C++\n (C) COBOL\n (D) C#",
        answer: "A"
    },
    {
        prompt: "Which digital currency is the most well known cryptocurrency?\n (A) Bitcoin\n (B) ShibaInu\n (C) DogeCoin\n (D) Dolar",
        answer: "A"
    },

]

var score = 0;

for (var i=0; i <questions.length; i++){
    var response = window.prompt(questions[i].prompt);
    if(response == questions[i].answer){
        score++;
        alert("Well Done. Your answer is correct!");
    } else {
        alert("Wrong Answer!");
    }
}
alert("you got" + score + "/" + questions.length);



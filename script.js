// Selects element by class
var timeEl = document.querySelector(".time");
var questionsEl = document.querySelector(".questions");
var scoreEl = document.querySelector(".score-value");
var highScoresEl = document.querySelector(".high-scores");
var initialsEl = document.querySelector(".initials");
var resultEl = document.querySelector(".result");

// Selects element by id
var mainEl = document.getElementById("main");
var secondsLeft = 720;
var currentQuestionIndex = 0;
var score = 0;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

//questions to be asked
var questions = [
  {
    prompt: "Which digital currency is the most well known cryptocurrency?\b (A) Cardano\n (B) Bitcoin\n (C) Dogecoin\n (D) Ethereum",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    prompt: "Who is considered to be The Father of Artificial Intelligence?\n (A) John John\n (B) John Bon Jovi\n (C) John McDonald\n (D) John McCarthy",
    options: ["A", "B", "C", "D"],
    answer: "D",
  },
  {
    prompt: "What term is used for a network security system that prevents unauthorized access to or from a private network?\n (A) Firewall\n (B) Anti-Virus\n (C) VPN\n (D) VPC",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    prompt: "What is the name given to a network designed to allow communication within an organization?\n (A) Intranet\n (B) Internet\n (C) Infranet\n (D) Infonet",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    prompt: "The instructions and data are stored in the ___ so that the processor can directly fetch and execute them.\n (A) Control unit\n (B) Main memory\n (C) Permanent memory\n (D) CPU",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    prompt: "Which method can be used to find the length of a string?\n (A) getSize()\n (B) len()\n (C) length()\n (D) getLength()",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
  {
    prompt: "Which method can be used to return a string in upper case letters?\n (A) touppercase()\n (B) tuc()()\n (C) toUpperCase()()\n (D) upperCase()",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
  {
    prompt: "Which operator can be used to compare two values?\n (A) ><\n (B) == \n (C) <>\n (D) =",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
  {
    prompt: "To declare an array in Java, define the variable type with:\n (A) []\n (B) {}\n (C) ()\n (D) ''",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    prompt: "Which statement is used to stop a loop?\n (A) exit\n (B) return\n (C) stop\n (D) break",
    options: ["A", "B", "C", "D"],
    answer: "D",
  },
  {
    prompt: "Which method can be used to find the highest value of x and y?\n (A) Math.largest(x,y)\n (B) Math.maxNum(x,y)\n (C) Math.max(x,y)\n (D) Math.maximum(x,y)",
    options: ["A", "B", "C", "D"],
    answer: "C",
  },
]

// Displays next question
function nextQuestion() {
    // Clears previous question
    questionsEl.innerHTML = "";
  
    // If there are no more questions, end quiz
    if (currentQuestionIndex === questions.length) {
      endQuiz();
      return;
    }
  
    // Gets current question
    var currentQuestion = questions[currentQuestionIndex];
  
    // Creates element for prompt
    var promptEl = document.createElement("p");
    promptEl.textContent = currentQuestion.prompt;
    questionsEl.appendChild(promptEl);
  
    // Creates button for each option
    currentQuestion.options.forEach(function(option) {
      var optionBtn = document.createElement("button");
      optionBtn.textContent = option;
      optionBtn.addEventListener("click", function(event) {
        // Check if option is correct
        if (event.target.textContent === currentQuestion.answer) {
          score++;
          scoreEl.textContent = score;
        } else {
          secondsLeft -= 10;
        }
        currentQuestionIndex++;
        nextQuestion();
      });
      questionsEl.appendChild(optionBtn);
    });
  }
  
  // Ends quiz and displays score
  function endQuiz() {
    // Clears quiz content
    questionsEl.innerHTML = "";
  
    // Displays final score
    resultEl.textContent = "Your final score is " + score;
  
    // Shows form to save initials and score
    initialsEl.classList.remove("hide");
  }
  
  // Saves initials and score to local storage
  function saveHighScore() {
    var initials = initialsEl.querySelector("#initials").value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = { initials: initials, score: score };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    renderHighScores();
  }
  
  // Renders high scores from local storage
  function renderHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    highScoresEl.innerHTML = "";
    highScores.forEach(function(score) {
      var li = document.createElement("li");
      li.textContent = score.initials + " - " + score.score;
      highScoresEl.appendChild(li);
    });
  }
  
  // Event listeners
  document.querySelector(".start-btn").addEventListener("click", function(event) {
    setTime();
    nextQuestion();
    event.target.classList.add("hide");
  });
  
  initialsEl.addEventListener("submit", function(event) {
    event.preventDefault();
    saveHighScore();
  });

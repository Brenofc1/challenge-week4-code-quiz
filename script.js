// Selects element by class
var timeEl = document.querySelector(".time");
var questionsEl = document.querySelector(".questions");
var scoreEl = document.querySelector(".score-value");
var highScoresEl = document.querySelector(".high-scores");
var initialsEl = document.querySelector(".initials");
var resultEl = document.querySelector(".result");

// Selects element by id
var mainEl = document.getElementById("main");
var secondsLeft = 0;
var currentQuestionIndex = 0;
var score = 0;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

/* End Quiz Function*/
function endQuiz() {
  mainEl.innerHTML = "";
  resultEl.textContent = "Your final score is " + score;
  initialsEl.style.display = "block";
}

//questions to be asked on the quiz
var questions = [
  {
    prompt: "Which digital currency is the most well known cryptocurrency?",
    options: ["(A) Cardano", "(B) Bitcoin", "(C) Dogecoin", "(D) Ethereum"],
    answer: "(B) Bitcoin",
  },
  {
    prompt: "Who is considered to be The Father of Artificial Intelligence?",
    options: ["(A) John John", "(B) John Bon Jovi", "(C) John McDonald", "(D) John McCarthy"],
    answer: "(D) John McCarthy",
  },
  {
    prompt: "What term is used for a network security system that prevents unauthorized access to or from a private network?",
    options: ["(A) Firewall", "(B) Anti-Virus", "(C) VPN", "(D) VPC"],
    answer: "(A) Firewall",
  },
  {
    prompt: "What is the name given to a network designed to allow communication within an organization?",
    options: ["(A) Intranet", "(B) Internet", "(C) Infranet", "(D) Infonet"],
    answer: "(A) Intranet",
  },
  {
    prompt: "The instructions and data are stored in the ___ so that the processor can directly fetch and execute them.",
    options: ["(A) Control unit", "(B) Main memory", "(C) Permanent memory", "(D) CPU"],
    answer: "(B) Main memory",
  },
  {
    prompt: "Which method can be used to find the length of a string? ",
    options: ["(A) getSize()", "(B) len()", "(C) length()", "(D) getLength()"],
    answer: "(C) length()",
  },
  {
    prompt: "Which method can be used to return a string in upper case letters?",
    options: ["(A) touppercase()", "(B) tuc()()", "(C) toUpperCase()()", "(D) upperCase()"],
    answer: "(C) toUpperCase()()",
  },
  {
    prompt: "Which operator can be used to compare two values?",
    options: ["(A) ><", "(B) ==", "(C) <>", "(D) ="],
    answer: "(B) ==",
  },
  {
    prompt: "To declare an array in Java, define the variable type with:",
    options: ["(A) [ ]", "(B) { }", "(C) ( )", "(D) ' ' "],
    answer: "(A) [ ]",
  },
  {
    prompt: "Which statement is used to stop a loop?",
    options: ["(A) exit", "(B) return", "(C) stop", "(D) break"],
    answer: "(D) break",
  },
  {
    prompt: "Which method can be used to find the highest value of x and y?",
    options: ["(A) Math.largest(x,y)", "(B) Math.maxNum(x,y)", "(C) Math.max(x,y)", "(D) Math.maximum(x,y)"],
    answer: "(C) Math.max(x,y)",
  },
]


// Displays next question
function nextQuestion() {
    // Clears previous question
    questionsEl.innerHTML = "";
  
    // If there are no more questions, end quiz
    if (currentQuestionIndex == questions.length) {
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
        // Check if option is correct or incorrect
        if (event.target.textContent == currentQuestion.answer) {
          score++;
          scoreEl.textContent = score;
          secondsLeft += 15;
        } else {
          secondsLeft -= 15;
          alert("Incorrect. You lost 15 Seconds. The correct answer is: " + currentQuestion.answer);
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
    
    questionsEl.innerHTML = "Game Over";
  
    // Displays final score
    resultEl.textContent = "Your final score is " + score;
    saveHighScore();

  
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
      li.textContent = score.initials + " = " + score.score;
      highScoresEl.appendChild(li);
    });
  }
  
  // Event listeners
  document.querySelector(".start-btn").addEventListener("click", function(event) {
    setTime();
    nextQuestion();
    secondsLeft += 60;
    event.target.classList.add("hide");
    document.querySelector(".start-btn").style.display = "none";
    
  });
  
  initialsEl.addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelector(".initials").style.display = "none";
    
  });
  
let buttons = document.querySelectorAll(".btn");
let quesNum = document.getElementById("questionNumber");
let next = document.getElementById("next");
let question = document.getElementById("actual");
let Option1 = document.getElementById("option1");
let Option2 = document.getElementById("option2");
let Option3 = document.getElementById("option3");
let Option4 = document.getElementById("option4");
let dot = document.getElementById("dot");
let size = document.querySelector(".questionsAndOptions");
let questionsAnswers = [
    { question: "Which  animal is the longest?", option1: "Giraffe", option2: "Elephant", option3: "Lion", option4: "Tiger", answer: "Giraffe" },
    { question: "Which  animal is the shortest?", option1: "Giraffe", option2: "Elephant", option3: "Lion", option4: "Rat", answer: "Rat" },
    { question: "Which  animal is the longest?", option1: "Giraffe", option2: "Elephant", option3: "Lion", option4: "Tiger", answer: "Giraffe" },
    { question: "Which  animal is the longest?", option1: "Giraffe", option2: "Elephant", option3: "Lion", option4: "Tiger", answer: "Giraffe" },
];
let i = 0;
let next1 = 2;
disableAll = () => {
    buttons.forEach((btn2) => {
        btn2.disabled = true; 
    });
}

rightAnswer = (answer) => {
    buttons.forEach(btn => {
        if (btn.innerText == answer) {
            btn.classList.add("green");
        }
    });
}

let score = 0;

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // e.target.classList.add("red");
        let ans = e.target.innerText;
        console.log(e.target.innerText);
        if (ans == questionsAnswers[i].answer) {
            e.target.classList.add("green");
            score++;
        }
        else {
            e.target.classList.add("red");
            rightAnswer(questionsAnswers[i].answer);
        }
        disableAll();
        i++;
    });
});


enableAll = () => {
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("red");
        btn.classList.remove("green");
    });
};

displayNone = () => {
    buttons.forEach(btn => {
        btn.style.display = "none";
        quesNum.style.display = "none";
        dot.style.display = 'none';
    });
}

showScore = () => {
    size.style.height = "10vmin";
    question.innerHTML = `Your score is ${score} out of ${questionsAnswers.length}`;
    next.style.background = "rgb(228, 228, 224)";
    next.style.color = "#000";
    next.innerText = "Play Again";
    next1++;
}

displayNotNone = () => {
    buttons.forEach(btn => {
        btn.style.display = "block";
        quesNum.style.display = "inline";
        dot.style.display = 'inline';
        size.style.height = "53vmin";
        question.innerHTML = `Which is the largest animal among all?`;
        next.style.background = "#000";
        next.style.color = "white";
        next.innerText = "Next";
        quesNum.innerHTML = 1;
        enableAll();
    });
}

next.addEventListener("click", () => {
    if (i < questionsAnswers.length) {
        question.innerText = questionsAnswers[i].question;
        quesNum.innerHTML = i + 1;
        Option1.innerHTML = questionsAnswers[i].option1;
        Option2.innerHTML = questionsAnswers[i].option2;
        Option3.innerHTML = questionsAnswers[i].option3;
        Option4.innerHTML = questionsAnswers[i].option4;
        enableAll();
        next1++;
    }
    else if(i==questionsAnswers.length) {
        displayNone();
        showScore();
        i++;
    }
    else {
        i = 0;
        next1 = 0;
        score = 0;
        displayNotNone();
    }

});

next.addEventListener("mouseover", () => {
    next.style.color = "#000";
        next.style.background = "rgb(228, 228, 224)"; 
});
next.addEventListener("mouseout", () => {
    next.style.background = "#000";
        next.style.color = "white";
});
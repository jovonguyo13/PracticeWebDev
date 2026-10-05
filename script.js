function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');
}

function runActivity(number) {

  let displayId = (number <= 7) ? "activityMessage1" : "activityMessage2";
  const display = document.getElementById(displayId);
  
  if (display) {
    display.textContent = "You are now running Activity " + number + "!";
    display.style.color = "#1abc9c";
  }

  const functionName = "Act" + number;

  if (typeof window[functionName] === "function") {

    window[functionName](display); 
  } else {
    console.log("Error: " + functionName + " is not defined.");
  }
}

/* --- Activities 1-7 --- */

function Act1() {
  alert("Hi this is JavaScript");
  console.log("This is my JavaScript program");
}

function Act2() {
  let age = 21;
  let name = "Jovon Guyo";
  console.log("My name is " + name + " my age is " + age + " and I am a Student");
}

function Act3() {
  let num1 = 10, num2 = 5;
  console.log("Sum: " + (num1 + num2));
  console.log("Difference: " + (num1 - num2));
  console.log("Product: " + (num1 * num2));
  console.log("Quotient: " + (num1 / num2));
}

function Act4() {
  alert("This is my JavaScript code WELCOME!!!");
  let name = prompt("What is your name: ");
  let color = prompt("What is your favorite color: ");
  console.log("Hello " + name + ". Your favorite color is " + color);
}

function Act5() {
  let age = prompt("Enter your age: ");
  if (Number(age) >= 18) {
    console.log("You're eligible");
  } else {
    console.log("You're not eligible");
  }
}

function Act6() {
  console.log("--- For Loop (1-10) ---");
  for (let i = 1; i <= 10; i++) console.log(i);
  
  console.log("--- Counting Down (10-1) ---");
  let j = 10;        
  while (j >= 1) {   
    console.log(j);  
    j--;             
  }
}

function Act7(display) {
  alert("The button is clicked!");
  if (display) display.textContent = "Act 7: The alert was shown!";
}

/* --- Activities 8-15  --- */

function Act8() {
  const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = randomColor; 
  console.log("Background color changed to: " + randomColor);
}

function Act9() {
  document.body.classList.toggle("dark-mode");
  console.log("Dark mode toggled.");
}

function Act10(display) {
  if (display) {
    const newItem = document.createElement("p");
    newItem.textContent = "New List Item added!";
    display.appendChild(newItem);
  }
}

function Act11(display) {
  if (display) {
    display.textContent = ""; 
    console.log("Content cleared.");
  }
}

function Act12() {
  const input = prompt("Type something to count characters:");
  if (input !== null) {
    alert("Character count: " + input.length); 
  }
}

function Act13() {
  let n1 = prompt("Enter first number:");
  let n2 = prompt("Enter second number:");
  let sum = Number(n1) + Number(n2); 
  alert("The sum is: " + sum);
}


let isMoonImage = false;

function Act14(display) {
  if (display) {
    if (isMoonImage === false) {
      display.innerHTML = '<img src="moon-mountains-3840x2160-11462.jpeg" alt="Moon" style="border-radius:10px; width:100%; max-width:500px;">';
      isMoonImage = true; 
    } else {
      display.innerHTML = '<img src="RobloxScreenShot20260221_214312477.png" alt="Roblox" style="border-radius:10px; width:100%; max-width:500px;">';
      isMoonImage = false; 
    }
    console.log("Image toggled. Current state: " + (isMoonImage ? "Moon" : "Original"));
  }
}

function Act15(display) {
  const task = prompt("Enter a new task:"); 
  if (task && display) {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `• ${task}`;
    display.appendChild(taskDiv);
  }
}

/* --- Exercise 4  --- */


document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btnGenerateQuizzes');
    const quizContainer = document.getElementById('quizInputsContainer');
    const btnCalc = document.getElementById('btnCalculate');
    const btnRes = document.getElementById('btnReset');

    // 1. Generate Quiz Inputs dynamically
    btnGenerate.addEventListener('click', () => {
        const count = parseInt(prompt("How many quizzes?"));
        
        if (!isNaN(count) && count > 0) {
            quizContainer.innerHTML = ""; // Clear old inputs
            for (let i = 1; i <= count; i++) {
                const input = document.createElement('input');
                input.type = "number";
                input.placeholder = `Quiz ${i}`;
                input.min = "0";
                input.max = "100";
                input.className = "quiz-score"; // We use a class to find them later
                quizContainer.appendChild(input);
            }
        }
    });

    // 2. Calculate Final Grade
    btnCalc.addEventListener('click', () => {
        // Calculate Quiz Average
        const quizFields = document.querySelectorAll('.quiz-score');
        let quizSum = 0;
        quizFields.forEach(field => quizSum += (parseFloat(field.value) || 0));
        const quizAvg = quizFields.length > 0 ? quizSum / quizFields.length : 0;

        // Calculate Exam Average
        const examFields = document.querySelectorAll('.exam-score');
        let examSum = 0;
        examFields.forEach(field => examSum += (parseFloat(field.value) || 0));
        const examAvg = examSum / 2;

        // Calculate MCO Average
        const mcoFields = document.querySelectorAll('.mco-score');
        let mcoSum = 0;
        mcoFields.forEach(field => mcoSum += (parseFloat(field.value) || 0));
        const mcoAvg = mcoSum / 2;

        // Final Weighted Grade: 20% / 30% / 50%
        const finalScore = (quizAvg * 0.20) + (examAvg * 0.30) + (mcoAvg * 0.50);

        // Grade Scale
        let letter = "";
        if (finalScore >= 90) letter = "A";
        else if (finalScore >= 80) letter = "B";
        else if (finalScore >= 70) letter = "C";
        else if (finalScore >= 60) letter = "D";
        else letter = "F";

        document.getElementById('finalGrade').textContent = finalScore.toFixed(2);
        document.getElementById('gradeLetter').textContent = letter;
    });

    // 3. Reset
    btnRes.addEventListener('click', () => {
        quizContainer.innerHTML = ""; // Remove generated quiz fields
        document.querySelectorAll('input').forEach(input => input.value = "");
        document.getElementById('finalGrade').textContent = "-";
        document.getElementById('gradeLetter').textContent = "-";
    });
});
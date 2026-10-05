let itemCounter = 1;
let darkModeOn = false;
let charCounterReady = false;

// Initialization
document.addEventListener("DOMContentLoaded", function () {
    const changeBgButton = document.getElementById("changeBgBtn");
    if (changeBgButton) changeBgButton.addEventListener("click", week3Activity1);

    setupGradeCalculator();
});

// Activity Functions
function activity1() {
    alert("Welcome to JAVASCRIPT!");
    console.log("This is my first JS program.");
}

function activity2() {
    let name = prompt("Enter your name: ");
    let age = prompt("Enter your age: ");
    let isStudent = true;
    console.log(`${name}\n${age}\n${isStudent}`);
    console.log(`My name is ${name}, I am ${age} years old.`);
}

function activity3() {
    let num1 = parseInt(prompt("Enter first number: "));
    let num2 = parseInt(prompt("Enter second number: "));
    let sum = num1 + num2;
    let diff = num1 - num2;
    console.log(`Sum: ${sum}\nDifference: ${diff}`);
}

function activity4() {
    let name = prompt("Enter your name: ");
    let faveNum = prompt("Enter favorite number: ");
    alert(`Hello ${name}! Your favourite number is: ${faveNum}`);
}

function week3Activity1() {
    let colors = ["#ffe4e1", "#e0f7fa", "#fff3cd", "#e8f5e9", "#f3e5f5"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
}

function week3Activity2() {
    darkModeOn = !darkModeOn;
    document.body.classList.toggle("dark-mode", darkModeOn);
}

function week3Activity3() {
    itemCounter++;
    let newItem = document.createElement("li");
    newItem.textContent = "New item " + itemCounter;
    document.getElementById("itemList").appendChild(newItem);
}

function showWeek4Content(id) {
    document.getElementById(id).classList.toggle("show");
}

// Grade Calculator Logic
function setupGradeCalculator() {
    const setQuizBtn = document.getElementById("setQuizBtn");
    const quizArea = document.getElementById("quizArea");
    const calcBtn = document.getElementById("calcGradeBtn");
    const resetBtn = document.getElementById("resetBtn");

    // 1. DYNAMIC QUIZ GENERATION
    setQuizBtn?.addEventListener("click", () => {
        let count = parseInt(document.getElementById("quizCount").value);
        quizArea.innerHTML = "";
        for (let i = 1; i <= count; i++) {
            let div = document.createElement("div");
            div.className = "grade-pair";
            div.innerHTML = `
                <span>Quiz ${i}: </span>
                <input type="number" class="quiz-score" placeholder="Score">
                <input type="number" class="quiz-total" placeholder="Total">
            `;
            quizArea.appendChild(div);
        }
    });

    // 2. CALCULATION LOGIC
    calcBtn?.addEventListener("click", () => {
        const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;
        const calcConv = (s, t) => (t > 0) ? (s / t) * 50 + 50 : 0;

        // Calculate Quizzes 
        let qScores = document.querySelectorAll(".quiz-score");
        let qTotals = document.querySelectorAll(".quiz-total"); 
        let qSum = 0; 
        
        qScores.forEach((s, i) => { 
            let score = parseFloat(s.value) || 0; 
            let total = parseFloat(qTotals[i].value) || 0; 
            qSum += calcConv(score, total);
        });
        
        let qAvg = qScores.length > 0 ? qSum / qScores.length : 0;

        // Calculate Exams & MCOs
        let midE = calcConv(getVal("midExamScore"), getVal("midExamTotal"));
        let finE = calcConv(getVal("finExamScore"), getVal("finExamTotal"));
        let examAvg = (midE + finE) / 2;

        let midM = calcConv(getVal("midMcoScore"), getVal("midMcoTotal"));
        let finM = calcConv(getVal("finMcoScore"), getVal("finMcoTotal"));
        let mcoAvg = (midM + finM) / 2;

        // Final Weighted Calculation (20% Quizzes, 30% Exams, 50% MCO)
        let final = (qAvg * 0.2) + (examAvg * 0.3) + (mcoAvg * 0.5);

        // Letter Grade Logic
        let letter = "F";
        if (final >= 90) letter = "A (Excellent)";
        else if (final >= 80) letter = "B (Very Good)";
        else if (final >= 75) letter = "C (Satisfactory)";
        else if (final >= 60) letter = "D (Fair)";
        else letter = "F (Needs Improvement)";

        // UI UPDATES
        document.getElementById("quizAvgDisplay").textContent = `Quiz Average: ${qAvg.toFixed(2)}`;
        document.getElementById("examAvgDisplay").textContent = `Exam Average: ${examAvg.toFixed(2)}`;
        document.getElementById("mcoAvgDisplay").textContent = `MCO Average: ${mcoAvg.toFixed(2)}`;
        document.getElementById("finalGradeDisplay").textContent = `Final Grade: ${Math.round(final)}`;
        document.getElementById("gradeEquivDisplay").textContent = `Grade Equivalent: ${letter}`;
        
        const display = document.getElementById("gradeEquivDisplay");
        display.style.color = final >= 75 ? "#27ae60" : "#e74c3c";
    });

    // 3. RESET LOGIC (Correctly placed outside the Calculate listener)
    resetBtn?.addEventListener("click", () => {
        // Clear dynamic quiz rows
        quizArea.innerHTML = "";
        
        // Clear all manual inputs
        document.querySelectorAll("input").forEach(input => input.value = "");

        // Reset text displays
        const displays = ["quizAvgDisplay", "examAvgDisplay", "mcoAvgDisplay", "finalGradeDisplay", "gradeEquivDisplay"];
        displays.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = el.id === "gradeEquivDisplay" ? "Grade Equivalent: —" : 
                             el.id === "finalGradeDisplay" ? "Final Grade: —" : 
                             el.textContent.split(":")[0] + ": —";
        });

        // Reset color and quiz count
        const equivDisp = document.getElementById("gradeEquivDisplay");
        if (equivDisp) equivDisp.style.color = "";
        
        const qCount = document.getElementById("quizCount");
        if (qCount) qCount.value = 1;
        
        console.log("Calculator Reset.");
    });
}
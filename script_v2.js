
let current = 0;
let answers = Array(quizData.length).fill(null);

function renderQuestion() {
  const q = quizData[current];
  document.getElementById("questionBox").innerHTML = `<h3>${current + 1}. ${q.question}</h3>`;
  const choicesHTML = q.choices.map((c, i) => {
    const checked = answers[current] === i ? "checked" : "";
    return \`<label class="choice"><input type="radio" name="choice" value="\${i}" \${checked} onchange="selectAnswer(\${i})"> \${c}</label>\`;
  }).join("");
  document.getElementById("choicesBox").innerHTML = choicesHTML;
  renderAnswerSheet();
}

function selectAnswer(i) {
  answers[current] = i;
  renderAnswerSheet();
}

function nextQuestion() {
  if (current < quizData.length - 1) {
    current++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function renderAnswerSheet() {
  const container = document.getElementById("answerSheet");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const mark = answers[i] !== null ? (answers[i] + 1) : "-";
    const sel = i === current ? "selected" : "";
    container.innerHTML += \`<div class="\${sel}">\${i + 1} : \${mark}</div>\`;
  }
}

function submitQuiz() {
  sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
  window.location.href = "result.html";
}

if (window.location.pathname.includes("quiz.html")) renderQuestion();
if (window.location.pathname.includes("result.html")) {
  const answers = JSON.parse(sessionStorage.getItem("quizAnswers") || "[]");
  let score = 0;
  let wrongs = "";
  answers.forEach((ans, i) => {
    const q = quizData[i];
    if (ans === q.answer) {
      score++;
    } else {
      wrongs += `<p><b>${i + 1}. ${q.question}</b><br>`;
      wrongs += `당신의 답: ${q.choices[ans] || "무응답"}<br>`;
      wrongs += `정답: ${q.choices[q.answer]}<br>`;
      if (q.explanation) wrongs += `해설: ${q.explanation}</p>`;
    }
  });
  document.getElementById("score").innerHTML = `<h2>점수: ${score} / ${quizData.length}</h2>`;
  document.getElementById("wrongAnswers").innerHTML = wrongs || "<p>모든 문제를 맞췄습니다!</p>";
}

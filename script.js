
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)];
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if (document.getElementById("quizForm")) {
  shuffle(quizData);
  const form = document.getElementById("quizForm");
  quizData.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p><b>${idx + 1}. ${q.question}</b></p>`;
    const choices = q.choices.map((choice, i) => ({ text: choice, idx: i }));
    shuffle(choices);
    choices.forEach(choice => {
      qDiv.innerHTML += `
        <label class="choice">
          <input type="radio" name="q${idx}" value="${choice.idx}">
          ${choice.text}
        </label><br>
      `;
    });
    form.appendChild(qDiv);
  });
}

function submitQuiz() {
  const form = document.getElementById("quizForm");
  const answers = [];
  for (let i = 0; i < quizData.length; i++) {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    answers.push(selected ? Number(selected.value) : null);
  }
  sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
  window.location.href = "result.html";
}

if (document.getElementById("resultContainer")) {
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

'use strict';

function splashPage() {
    return `
    <header>
    <h1 class="splashTitle">Marvel Movies Quiz</h1>
    </header>
    <div class="center">
    <p>How well do you know the Marvel Movies? Take this quiz to find out!</p>
        <button class="start">Start</button>
    </div>`;
}

function questionTemplate(qNum, sNum) {
    const index = qNum - 1;
    return `
      <section class="quizContent" role="contentinfo">
      <form>
      <legend>
         <section class="question">
            <h1>Question ${qNum}</h1>
            <p class="quesText">${questions[index].Q}</p>
            <p class="questionNumber">Question ${qNum} of 10</p>
         </section>
      </legend>
      <section class="answers">
        <fieldset name="Answers">

            <label>
            <input class="answer" type="radio" id="option1" name="option" value="${questions[index].A[0]}" required>
            ${questions[index].A[0]}</label>

            <label>
            <input class="answer" type="radio" id="option2" name="option" value="${questions[index].A[1]}">
            ${questions[index].A[1]}</label>

            <label>
            <input class="answer" type="radio" id="option3" name="option" value="${questions[index].A[2]}">
            ${questions[index].A[2]}</label>
 
            <label>
            <input class="answer" type="radio" id="option4" name="option" value="${questions[index].A[3]}">
            ${questions[index].A[3]}</label>
            
            <div class="center top-margin-small">
            <input type="submit" value="Submit">
            </div>
        </fieldset>
      </form>
      </section>
      </section>
      <section class="score">
      <p>Score<br>${sNum} of 10</p>
      <button class="next">Next</div>
      </section>
    </section>
    `;
}

function correctAnswerPage(qNum, sNum) {
    const index = qNum - 1;
    return `
      <section class="quizContent" role="contentinfo">
      <section class="question">
      <h1>Question ${qNum}</h1>
      <p class="quesText">${questions[index].Q}</p>
      <p class="questionNumber">Question ${qNum} of 10</p>
      </section>
      
      <section class="correctAnswer"><p>Correct! ${questions[index].correct} is the right answer.<br>
      Your score is now ${sNum}</p></section>
      <section class="more"><p>${questions[index].more}</p></section>
      </section>
      <section class="score">
      <p>Score<br>${sNum} of 10</p>
      <button class="next">Next</div>
      </section>
    `;
}

function wrongAnswerPage(qNum, sNum) {
    const index = qNum - 1;
    return `
      <section class="quizContent" role="contentinfo">
      <section class="question">
      <h1>Question ${qNum}</h1>
      <p class="quesText">${questions[index].Q}</p>
      <p class="questionNumber">Question ${qNum} of 10</p>
      </section>
      
      <section class="correctAnswer"><p>Sorry! ${questions[index].correct} is the right answer.<br>
      Your score is now ${sNum}</p></section>
      <section class="more"><p>${questions[index].more}</p></section>
      </section>
      
      <section class="score">
      <p>Score<br>${sNum} of 10</p>
      <button class="next">Next</div>
      </section>
    `;
}


function updateScore(sNum) {
    sNum++
    console.log("updated score");
    return sNum;
};

function nextPage(qNum, sNum) {
    $('button.next').click(event => {
        qNum++;
        if (qNum === 11) {
            goToFinalPage(sNum);
        } else {
            renderQuiz(qNum, sNum);
        }
    });
}

function goToFinalPage(sNum) {
    $('main.container').html(finalPage(sNum));
    if (sNum <= 2) {
        $('section.finalScore').prepend("<p>It's okay. We all have things we're good at.</p>");
    } else if (sNum >= 3 && sNum <= 5) {
        $('section.finalScore').prepend("<p>You may want to bone up on your MCU knowledge.</p>");
    } else if (sNum >= 6 && sNum <= 7) {
        $('section.finalScore').prepend("<p>You're doing all right. Kinda like Ant-Man.</p>");
    } else {
        $('section.finalScore').prepend("<p>You're the Tony Stark of Marvel Movie Knowledge!</p>");

    }
    retakeQuiz();

}

function finalPage(sNum) {
    return `
        <section class="quizContent" role="contentinfo">
          <header>
          <h1 class="center">Final Score</h1>
          </header>
          <section class="finalScore"><p>Your final score is ${sNum} out of 10!</p></section>
      
          <section class="retake">
          <button class="again">Retake the Quiz</div>
          </section>
        </section>
        `;
};

function submitAnswer(qNum, sNum) {
    const index = qNum - 1;
    $('form').submit(event => {
        event.preventDefault();
        const userAns = $("input:checked").val();
        console.log("user answer is " + userAns);
        const correctAns = questions[index].correct;
        if (userAns === correctAns) {
            sNum = updateScore(sNum);
            $('main.container').html(correctAnswerPage(qNum, sNum));
        } else {
            $('main.container').html(wrongAnswerPage(qNum, sNum));
        };
        nextPage(qNum, sNum);
    });
};

function retakeQuiz() {
    $('.again').click(event => {
        start();
    });
};

function renderQuiz(qNum, sNum) {
    const index = qNum - 1;
    $('main.container').html(questionTemplate(qNum, sNum));
    submitAnswer(qNum, sNum)
    console.log("rendered quiz");
};

function start() {
    $('main.container').html(splashPage());
    $('.start').click(event => {
        renderQuiz(1, 0);
    })
};

start();
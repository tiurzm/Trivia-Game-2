$(document).ready(function(){
    $("#target").hide();
    // Disney movie, source https://www.buzzfeed.com/briangalindo/the-ultimate-disney-trivia-quiz
    var allQuestion =[
        {
            question: "In “The Little Mermaid”, who is NOT one of Triton’s daughter?",
            answers: ["Andrina", "Adora", "Attina", "Alana"],
            correctAnswer: "Adora",
            correctImage: "assets/images/md.gif",
            wrongImage: "assets/images/dm.gif",
        }, {
            question: "On whose shoulders does Dopey stand on in order to dance with Snow White during “The Silly Song” scene?",
            answers: ["Doc", "Grumpy", "Sneezy", "Happy"],
            correctAnswer: "Sneezy",
            correctImage: "assets/images/sn.gif",
            wrongImage: "assets/images/ns.gif",
        }, {
            question: "In the movie “Tangled”, Flynn Rider is wanted dead or alive according to his wanted poster because he's a?",
            answers: ["Bandit", "Thief", "Treasonist", "Robber"],
            correctAnswer: "Thief",
            correctImage: "assets/images/fl.gif",
            wrongImage: "assets/images/lf.gif",
        }, {
            question: "In “Sleeping Beauty”, what is the name of Maleficent’s pet raven?",
            answers: ["Diablo", "Malum", "Mauvais", "Diable"],
            correctAnswer: "Mauvais",
            correctImage: "assets/images/lm.gif",
            wrongImage: "assets/images/ml.gif",
        }, {
            question: "In “Aladdin“, what does Aladdin, and a reluctant Abu, give to the poor children to eat?",
            answers: ["Dates", "Apples", "Bread", "Cheese"],
            correctAnswer: "Bread",
            correctImage: "assets/images/sj.gif",
            wrongImage: "assets/images/js.gif",
        }, 
    ];

    var currentQuestion = 0;
    var timeRemain = 10;
    var showImage;
    var intervalId;
    var lost = 0;
    var win = 0;  

    $(".start").on("click", function(){
        $(this).remove();
        $("#target").show();
        loadQuestion();
        trueFalse();
        playAgain();
    });
    

    function countDown() {
        timeRemain--;
        $(".time").html(timeRemain);
        if(timeRemain === 0){
            timeUp();
        }
    }

    function timeUp() {
        clearInterval(intervalId);
        lost++ 
        displayImage("lost")
        setTimeout(nextQuestion, 3*1000);
    }

    // display question and answer:
    function loadQuestion(){
        timeRemain = 10;
        intervalId = setInterval(countDown, 1000);
        var question = allQuestion[currentQuestion].question;

        $(".column").html("<p>Time remaining:<span class=time> 10</span> seconds</p>");

        var newD = $("<div>")
        newD.addClass("for-question");
        $(".column").append(newD);

        var question1 = $("<div>");
        question1.addClass("question");
        $(".for-question").append(question1);

        var putQuestion = $("<p>");
        putQuestion.text(question);
        $(".question").append(putQuestion);

        loadAnswers();
    };

    function loadAnswers(){
        var choices = allQuestion[currentQuestion].answers;
        for(var i=0; i < choices.length; i++){
            var displayQuestion = $("<p>");
            displayQuestion.addClass("choice");
            displayQuestion.attr("value", choices[i]);
            displayQuestion.text(choices[i]);
            $(".question").append(displayQuestion);
        }
    };

    // next question 
    function nextQuestion(){
        var noMoreQuestion = (allQuestion.length -1) === currentQuestion;
        if (noMoreQuestion){
            allDone();
        }else{
            currentQuestion++;
            loadQuestion();
        }
    };

    function trueFalse(){
        $(document).on("click",".choice", function(){
            // var done = $("<div>");
            // done.addClass("display");
            // $(".for-question").html(done);
            clearInterval(intervalId);
            var correctAnswer = allQuestion[currentQuestion].correctAnswer;
            var answerValue = $(this).attr("value");
            if(answerValue === correctAnswer){    
                win++;
                console.log("right");
                displayImage("win")
                setTimeout(nextQuestion, 3*1000);

            }else{
                lost++;
                console.log("wrong");
                displayImage("lost")
                setTimeout(nextQuestion, 3*1000);
            }
        });
    }

    // display result 
    function allDone(){
        var result = `
            <p> Correct Answers: ${win} </p>
            <p> Incorrect Answers: ${lost} </p>
            <p> Total questions: ${allQuestion.length}</p>
            <button class=play-again>Play Again?</button>
        `;
        $(".column").html(result);
    }

    function playAgain(){
        $(document).on("click",".play-again", function(){
            currentQuestion = 0;
            timeRemain = 10;
            intervalId = null;
            lost = 0;
            win = 0; 
            loadQuestion();
        });
    }

    function displayImage(status) {
        var correctAnswer = allQuestion[currentQuestion].correctAnswer;
        if(status === "win"){
            var correctP = $("<p>");
            correctP.text("Correct!");
            $(".column").html(correctP);
            var correctImage = $("<img>");
            correctImage.addClass("correct")
            correctImage.attr("src", allQuestion[currentQuestion].correctImage);
            $(".column").append(correctImage);

        }else{
            var wrongP = $("<p>");
            wrongP.text("Nope!");
            $(".column").html(wrongP);
            var wrongC = $("<p>");
            wrongC.text("The Correct Answer was: " + allQuestion[currentQuestion].correctAnswer);
            var wrongImage = $("<img>");
            wrongImage.addClass("wrong");
            wrongImage.attr("src", allQuestion[currentQuestion].wrongImage);
            $(".column").append(wrongC, wrongImage);
        }
    }

});
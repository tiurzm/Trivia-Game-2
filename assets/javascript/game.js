$(document).ready(function(){
    // Disney movie, source https://www.buzzfeed.com/briangalindo/the-ultimate-disney-trivia-quiz
    var allQuestion =[
        {
            question: "In “The Little Mermaid”, who is NOT one of Triton’s daughter?",
            answers: ["Andrina", "Adora", "Attina", "Alana"],
            correctAnswer: "Adora",
        }, {
            question: "On whose shoulders does Dopey stand on in order to dance with Snow White during “The Silly Song” scene?",
            answers: ["Doc", "Grumpy", "Sneezy", "Happy"],
            correctAnswer: "Sneezy",
        }, {
            question: "In the movie “Tangled”, Flynn Rider is wanted dead or alive according to his wanted poster because he's a?",
            answers: ["Bandit", "Thief", "Treasonist", "Robber"],
            correctAnswer: "Thief",
        }, {
            question: "In “Sleeping Beauty”, what is the name of Maleficent’s pet raven?",
            answers: ["Diablo", "Malum", "Mauvais", "Diable"],
            correctAnswer: "Mauvais",
        }, {
            question: "In “Aladdin“, what does Aladdin, and a reluctant Abu, give to the poor children to eat?",
            answers: ["Dates", "Apples", "Bread", "Cheese"],
            correctAnswer: "Bread",
        }, 
    ];
    
    // console.log(allQuestion[0].answers);

    
    var currentQuestion = 0;
    var timeRemain = 15;
    var intervalId;

    $(".start").on("click", function(){
        $(this).remove();
        var newDiv = $("<div>");
        newDiv.addClass("timer");
        $("#target").append(newDiv);
        $(".timer").append("<p>Time remaining:<span class=time> 15</span> seconds</p>");
        var question1 = $("<form>");
        question1.addClass("question");
        $(".timer").append(question1);
        loadQueswer();
    });

  
    var correctAnswer = allQuestion[currentQuestion].correctAnswer;
    console.log(correctAnswer);

    // display question and answer:
        function loadQueswer(){
        var question = allQuestion[currentQuestion].question;
        var putQuestion = $("<p>");
        putQuestion.text(question);
        $(".question").append(putQuestion);
        var choices = allQuestion[currentQuestion].answers;
        for(var i=0; i < choices.length; i++){
            var displayQuestion = $("<p>");
            displayQuestion.addClass("choice");
            displayQuestion.attr("value", choices[i]);
            displayQuestion.text(choices[i]);
            $(".question").append(displayQuestion);
        }
        run();
        decrement();
        $(".choice").on("click", function(){
            stop();
            var done = $("<div>");
            done.addClass("display");
            $(".timer").append(done);
            var answerValue = $(this).attr("value");
            console.log(answerValue);
            if(answerValue === correctAnswer){
                var correctP = $("<p>");
                correctP.text("Correct!");
                var correctImage = $("<img>");
                correctImage.addClass("correct")
                correctImage.attr("src", "assets/images/md.gif");
                $(".display").append(correctP, correctImage);
            }else{
                var wrongP = $("<p>");
                wrongP.text("Nope!");
                var wrongC = $("<p>");
                wrongC.text("The Correct Answer was: " + correctAnswer);
                var wrongImage = $("<img>");
                wrongImage.addClass("wrong");
                wrongImage.attr("src", "assets/images/dm.gif")
                $(".display").append(wrongP, wrongC, wrongImage);
            }
            $(".question").remove();
        });
    };

    // set timer
    function run(){
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    };
    // decrement the time
    function decrement(){
        timeRemain--;
        $(".time").html(timeRemain);
        if(timeRemain === 0){
            stop();
            $(".question").remove();
            alert("Time Up!");
            var timeUp = $("<p>");
            timeUp.text("Nope!");
            var timeOut = $("<p>");
            timeOut.text("The Correct Answer was: " + correctAnswer);
            var timeImage = $("<img>");
            timeImage.addClass("time");
            timeImage.attr("src", "assets/images/dm.gif")
            $(".timer").append(timeUp, timeOut, timeImage);
        }
    };
    // stop time
    function stop(){
        clearInterval(intervalId);
        timeRemain = timeRemain;
        $(".time").html(timeRemain);
    }
});
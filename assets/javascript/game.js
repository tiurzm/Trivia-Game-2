$(document).ready(function(){
    // Disney movie, source https://ohmy.disney.com/quiz/2016/09/02/quiz-guess-the-disney-movie-pop-culture-references/
    var allQuestion =[
        {
            question: "In 'The Little Mermaid', who is NOT one of Triton’s daughter?",
            answers: ["Andrina", "Adora", "Attina", "Alana"],
            correctAnswer: "Adora",
        }, {
            question: "Which phrase does the Evil Queen in 'Snow White' actually say??",
            answers: ["“Mirror, mirror, on the wall — who is the fairest of them all?”", "“Magic mirror, on the wall — who is the fairest one of all?”", "“Magic mirror, on the wall — who is the fairest one of all?”", "“Magic mirror, on the wall — who is the fairest of them all?”"],
            correctAnswer: "“Magic mirror, on the wall — who is the fairest one of all?”",
        }, {
            question: "In the movie “Tangled”, Flynn Rider is wanted dead or alive according to his wanted poster because he's a?",
            answers: ["Bandit", "Thief", "Treasonist", "Robber"],
            correctAnswer: "Thief",
        }, {
            question: "In “Sleeping Beauty”, what is the name of Maleficent’s pet raven?",
            answers: ["Diablo", "Malum", "Mauvais", "Diable"],
            correctAnswer: "Mauvais",
        }, {
            question: "In “Pocahontas”, what did Pocahontas see in her dream that made her believe that a change was coming?",
            answers: ["A spinning arrow", "A strange cloud formation", "A hawk circling her village", "A burning blue fire"],
            correctAnswer: "A spinning arrow",
        }, 
    ];
    
    console.log(allQuestion[0].answers);

    
    var currentQuestion = 0;
    var intervalId;
    var right = "";
    var wrong = "";
    var none = ""; 

    $(".start").on("click", function(){
        $(this).remove();
        var newDiv = $("<div>");
        newDiv.addClass("timer");
        $("#target").append(newDiv);
        $(".timer").append("<p>Time remaining:<span class=time> 30</span> seconds</p>");
        var question1 = $("<form>");
        question1.addClass("question");
        $(".timer").append(question1);
        loadQueswer();
        // run the time
        
        
        
        // display question and answer:
        function loadQueswer(){
            var timeRemain = 30;
            var choices = allQuestion[currentQuestion].answers;
            $(".question").append("<p>"+ allQuestion[currentQuestion].question +"</p>");
            for(var i=0; i < choices.length; i++){
                $(".question").append("<p class=choice>" + choices[i] +"</p>");
            }
            run();
            $(".choice").on("click", function(){
                stop();
            });
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
                    alert("Time Up!");
                }
            };
            // stop time
            function stop(){
                clearInterval(intervalId);
                timeRemain = 30;
                $(".time").html(timeRemain);
            }

        };
        
    });
});
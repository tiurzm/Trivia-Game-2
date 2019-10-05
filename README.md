# Trivia-Game-2

 if(answerValue === correctAnswer){
                    var correctImage = $("<img>");
                    correctImage.addClass("correct")
                    correctImage.attr("src", "assets/images/dm.gif");
                    $(".correct").append(newImage);
                }else {
                    var wrongImage = $("<img>");
                    wrongImage.addClass("wrong");
                    wrongImage.attr("src", "assets/images/md.gif")
                    $(".wrong").append(wrongImage);
                }
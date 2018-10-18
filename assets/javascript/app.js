$(document).ready(function() {

var triviaQuestions = [{
	question: "In S2E2 'Sexual Harassment': What is on Todd Packer's vanity license plate?",
	answerArray: ["TODPKR", "BGDADY", "WLHUNG", "LUVMKR"],
	answer: 2
},{
	question: "Which of these is not a 'Black Man Phrase' that Darrell teaches Michael?",
	answerArray: ["Dinkin' Flicka", "Bippity Boppity, give me the Zoppity", "Goin' Mach Five", "Scoopity Whoop"],
	answer: 3
},{
	question: "Which actor plays Andy's friend and a cappella group-mate, Broccoli Rob?",
	answerArray: ["Stephen Colbert", "Jon Stewart", "John Oliver", "Rob Corddry"],
	answer: 0
},{
	question: "Where do Jim and Pam get married?",
	answerArray: ["Las Vegas", "The Grand Canyon", "Niagra Falls", "Hawaii"],
	answer: 2
},{
	question: "According to Michael, which of the following is NOT one of his role models?",
	answerArray: ["God", "Bill Gates", "Bono", "Abraham Lincoln"],
	answer: 1
},{
	question: "Which of these colors is considered 'whore-ish' by Angela?",
	answerArray: ["Red", "Yellow", "Blue", "Green"],
	answer: 3
},{
	question: "What is the name of Michael's film that also stars the other members of the office?",
	answerArray: ["Threat Level Midnight", "The Scranton Witch Project", "Lazy Scranton", "Somehow I Manage"],
	answer: 0
},{
	question: "Which of the following minor characters does Michael never date?",
	answerArray: ["Pam's Mom", "Carol", "Pam's Sister", "Donna"],
	answer: 2
},{
	question: "Which of these is not a character that Michael pretends to be at some point?",
	answerArray: ["Michael Klump", "Michaela", "Prison Mike", "Jesus"],
	answer: 1
},{
	question: "Which college did Andy Bernard attend?",
	answerArray: ["Yale", "Dartmouth", "Brown", "Cornell"],
	answer: 3
}];


    var correctAnswers;
    var incorrectAnswers;
    var unanswered;
    var questionCounter = 0;
    var time = 15;
    var userChoice;


    var message = {
        correct: "Nailed it.",
        incorrect: "Idiot, the correct answer was: ",
        outOfTime: "Gotta be quicker than that, the answer was: ",
    };

    $('#startBtn').on('click', function(){
        $(this).hide();
        $(".container").css("background-color", "white");
        $(".container").css("border", "solid 1px black");
        newGame();
    });

    function newGame(){
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unanswered').empty();
        questionCounter = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        newQuestion();
    }

    function newQuestion(){

        //empties answer page
        $('#message').empty();
        $('#correctAnswer').empty();
        $('#gif').empty();
        answered = true;
        
        //sets up new questions & answerList
        $('#currentQuestion').html('<p>Question #'+(questionCounter+1)+'/'+triviaQuestions.length + '</p>');
        $('.question').html('<p>' + triviaQuestions[questionCounter].question + '</p>');
        console.log(triviaQuestions[questionCounter].question);
        for(var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(triviaQuestions[questionCounter].answerArray[i]);
            choices.addClass('userChoice');
            //assigns each possible answer a value for where they are
            choices.attr({'data-index': i });
            $('.answers').append(choices);
        }

        countdown();
        //clicking answer will pause timer
        $('.userChoice').on('click',function(){
            userChoice = $(this).data('index');
            console.log(userChoice);
            clearInterval(time);
            answerShow();
        });
    }

    //initializes timer
    function countdown(){
        seconds = 15;
        $('#timeLeft').html('<p>Time Remaining: ' + seconds + '</p>');
        answered = true;
        time = setInterval(startCountdown, 1000);
    }   
    
    //starts timer
    function startCountdown(){
        seconds--;
        $('#timeLeft').html('<p>Time Remaining: ' + seconds + '</p>');
        if(seconds < 1){
            clearInterval(time);
            //variable to see if user answered before time runs out
            answered = false;
            answerShow();
        }
    }   

    function answerShow() {
        $(".answers").empty();
        $(".question").empty();
        var correctChoice = triviaQuestions[questionCounter].answerArray[triviaQuestions[questionCounter].answer]
        var correctAnswer = triviaQuestions[questionCounter].answer;

        if ((userChoice === correctAnswer) && (answered === true)){
            correctAnswers ++;
            $("#message").html("<p>" + message.correct) + "<p>";
        }

        else if ((userChoice !=correctAnswer) && (answered === true)){
            incorrectAnswers ++;
            $("#message").html("<p>" + message.incorrect + correctChoice + "<p>");
        }

        else {
            unanswered ++;
            $("#message").html("<p>" + message.outOfTime + correctChoice + "<p>");
        }

        if(questionCounter == (triviaQuestions.length-1)){
            setTimeout(finalScore, 5000)
        } else {
            questionCounter++;
            setTimeout(newQuestion, 5000);
        }	
    }

    function finalScore() {

    }



});
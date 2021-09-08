//! some globals for game control...
var correctAnswer;
var timer = "10";
var deleteArray=[];
var questionsAnswered=0;
var score = 0;
var scoreIndex = 1;

var questionSelect = [
    {
       question: "2+2=?",
       answers:[
           "A: 300",
           "B: 4",
           "C: 916",
           "D: 25"
       ],
       correctAnsInd: "B: 4"
    },
    {        
       question: "4*6=?",
       answers:[
           "A: 32",
           "B: 14",
           "C: 24",
           "D: 2,567,899"
       ],
       correctAnsInd: "C: 24"
    },
    {        
        question: "24/12=?",
        answers:[
            "A: 600",
            "B: 12",
            "C: 678,333,258",
            "D: 2"
        ],
        correctAnsInd: "D: 2"
     },
     {        
        question: "16/4=?",
        answers:[
            "A: 60",
            "B: 4",
            "C: 67",
            "D: 11"
        ],
        correctAnsInd: "B: 4"
     },
     {        
        question: "9*3=?",
        answers:[
            "A: 8",
            "B: 116",
            "C: 27",
            "D: 12"
        ],
        correctAnsInd: "C: 27"
     },
     {        
        question: "27/9=?",
        answers:[
            "A: 3",
            "B: 12",
            "C: 111",
            "D: 2,236,899"
        ],
        correctAnsInd: "A: 3"
     },
     {        
        question: "12*3=?",
        answers:[
            "A: 18",
            "B: 36",
            "C: 6",
            "D: 4"
        ],
        correctAnsInd: "B: 36"
     },
     {        
        question: "18+9=?",
        answers:[
            "A: 27",
            "B: 45",
            "C: 38",
            "D: 999"
        ],
        correctAnsInd: "A: 27"
     },
     {        
        question: "26/2=?",
        answers:[
            "A: 60",
            "B: 23",
            "C: 13",
            "D: 29"
        ],
        correctAnsInd: "C: 13"
     },
     {        
        question: "16/8=?",
        answers:[
            "A: 16",
            "B: 25",
            "C: 333,258",
            "D: 2"
        ],
        correctAnsInd: "D: 2"
     }
]

function landingScreen(){
    //! loads the elements for the landing screen...
    var landingPage = $('#contentarea');

    var landingh1Tag = $('<h1>');
    landingh1Tag.text('Challenge:');
    landingPage.append(landingh1Tag);

    var landingh2Tag = $('<h2>');
    landingh2Tag.text('Math Quiz');
    landingPage.append(landingh2Tag);

    var landingInstructions = document.createElement("p");
    var landingInstructions = $('<p>');
    landingInstructions.text("How many of the following questions can you answer? Correctly, I mean? Did you even pay attention in school anyway? Maybe you're a big ol' dummy; let's find out.");
    landingPage.append(landingInstructions);

    var button = $('<input>');
    button.attr("type", "button");
    button.attr("value","Start Quiz");
    landingPage.append(button);

    button.on("click", function(){
        startQuiz();
        quizTimer();
    })
}

landingScreen();

function quizTimer(){
    var timeLeft = 10;
    var scoreCard = $('#scorecard');
    var timerDisplayTag = $('<h1>');
    scoreCard.append(timerDisplayTag);

    var timeInterval = setInterval(function(){
        if (timeLeft>1){
            timerDisplayTag.text(timeLeft + " seconds remain!");
            timeLeft--;
        }
        else if(timeLeft ===1){
            timerDisplayTag.text(timeLeft + " second remains!");
            timeLeft--;
        }else{
            timerDisplayTag.text("");
            clearInterval(timeInterval);
            winScreen();
        }
    },1000);
}

function startQuiz(){
    //! loads all page elements for the quiz screen...
    var questionPage = $('#contentarea');
        questionPage.empty();

    var questHeadTag = $('<h3>');
        questHeadTag.text("Question:");
        questionPage.append(questHeadTag);
    
    var questDiv = $('<div>');
        questDiv.attr('id','questionText');
        questionPage.append(questDiv);
    
    var questTag = $('<h3>');
        questTag.text('');
        questionPage.append(questTag);
    
    var ansDiv = $('<div>');
        ansDiv.attr('id','answersList')
        questionPage.append(ansDiv);

    var buttonDiv = $('<div>');
        buttonDiv.attr('id','buttonDisplay');
        ansDiv.append(buttonDiv);

    var choiceA = $('<input>');
        choiceA.attr('type','button');
        choiceA.attr('id','choiceA');
    var choiceB = $('<input>');
        choiceB.attr('type','button');
        choiceB.attr('id','choiceB');
    var choiceC = $('<input>');
        choiceC.attr('type','button');
        choiceC.attr('id','choiceC');
    var choiceD = $('<input>');
        choiceD.attr('type','button');
        choiceD.attr('id','choiceD');
    
    buttonDiv.append(choiceA);
    buttonDiv.append(choiceB);
    buttonDiv.append(choiceC);
    buttonDiv.append(choiceD);
    
    pageQuizContent();
}

function pageQuizContent(){
    //! loads questions and accompanying answers for each quiz question...
    var question = $('#questionText');
    var ansA = $("#choiceA");
    var ansB = $("#choiceB");
    var ansC = $("#choiceC");
    var ansD = $("#choiceD");

    if (questionsAnswered !== 9) {
        //!generates a random number to select a question     
        for(i=0; i<questionSelect.length-1; i++){
            var index=Math.floor(Math.random() * questionSelect.length);
        }
        
        correctAnswer=questionSelect[index].correctAnsInd;

        //! sets question and answer-button values
        question.text(questionSelect[index].question);
        ansA.attr('value',questionSelect[index].answers[0]);
        ansB.attr('value',questionSelect[index].answers[1]);
        ansC.attr('value',questionSelect[index].answers[2]);
        ansD.attr('value',questionSelect[index].answers[3]);
    }else{
        correctAnswer=questionSelect[0].correctAnsInd;

        //! sets question and answer-button values
        question.text(questionSelect[0].question);
        ansA.attr('value',questionSelect[0].answers[0]);
        ansB.attr('value',questionSelect[0].answers[1]);
        ansC.attr('value',questionSelect[0].answers[2]);
        ansD.attr('value',questionSelect[0].answers[3]);
    }

    ansA.on("click",function(){
        if (this.value === correctAnswer){
            deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
    })
    ansB.on("click",function(){
        if (this.value === correctAnswer){
            var deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
    })
    ansC.on("click",function(){
        if (this.value === correctAnswer){
            var deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
    })
    ansD.on("click",function(){
        if (this.value === correctAnswer){
            var deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
    })
}

function wrongAnswer(){
    correctAnswer = ""
    if (questionsAnswered===9){
        lastQuest();
    }
    startQuiz();
}

function rightAnswer(){
    correctAnswer = ""
    questionsAnswered++;
    score++;
    if (questionsAnswered===10){
        winScreen();
        }else{
        startQuiz();
        }
}

function winScreen(){
    var landingPage = $('#contentarea');
        landingPage.empty();
    
    var landingh1Tag = $('<h1>');
        landingh1Tag.text("All done!");
        landingPage.append(landingh1Tag);

    var landingh2Tag = $('<h2>');
        landingh2Tag.text("Your score is: " + score);
        landingPage.append(landingh2Tag);

    var landingh3Tag = $('<h3>');

    if (score<5){
        landingh3Tag.text("Not too great. Try again.");
    }else if (score<8){
        landingh3Tag.text("Not bad.");
    }else{
        landingh3Tag.text("Nice!");
    }
    landingPage.append(landingh3Tag);

    var formContainerDiv = $('<form>');
        formContainerDiv.attr('id','initialFormContainer');
        landingPage.append(formContainerDiv);
    
    var inputTag = $('<h3>');
        inputTag.attr('id','inputTag');
        inputTag.text("Enter your initials:");
        formContainerDiv.append(inputTag);

    var typeText = $('<input>');
        typeText.attr('type','text');
        typeText.attr('id','typeTextBox');
        typeText.attr('maxlength','3');
        formContainerDiv.append(typeText);
    
    var submitScore = $('<input>');
        submitScore.attr("type","submit");
        submitScore.attr("id","submitChoice");
        submitScore.attr("value","Submit");
        formContainerDiv.append(submitScore);
    
    submitScore.on("click", function(){
        event.preventDefault();
        console.log(typeText[0].value);
        var highScoreTrack = localStorage.getItem("highScoreTrack");

        if(highScoreTrack===null){
            highScoreTrack = [
                {
                   initials: typeText[0].value,
                   hScore: score
                }
            ]
            window.localStorage.setItem('highScoreTrack',JSON.stringify(highScoreTrack));
        }else{
            var newScore = [
                {
                   initials: typeText[0].value,
                   hScore: score
                }
            ]

            var scoreBoard = JSON.parse(localStorage.getItem("highScoreTrack"));
            highScoreTrack = scoreBoard.concat(newScore);
            localStorage.setItem('highScoreTrack', JSON.stringify(highScoreTrack));
        }
        
        window.localStorage.setItem('highScoreTrack',JSON.stringify(highScoreTrack));
        // var highScoresPage = document.getElementById ("contentarea");
        var highScoresPage = $('#contentarea');
        // highScoresPage.innerHTML = "";
        highScoresPage.empty();
        submitHighScore();
    })
}

function submitHighScore(){
    var highScores = document.getElementById("contentarea");
    var scoresHeaderTag = document.createElement("h1");
    var scoresHeaderText = document.createTextNode("High Scores:");
    scoresHeaderTag.appendChild(scoresHeaderText);  
    highScores.appendChild(scoresHeaderTag);

    highScoreTrack = JSON.parse(window.localStorage.getItem('highScoreTrack'));

    for (var i=0; i<highScoreTrack.length;i++){
        var tagScore = document.createElement('h2');
        tagScore.setAttribute('class',"topscores");
        var temp = localStorage.getItem
        var scoreText = document.createTextNode((i+1)+". "+highScoreTrack[i].initials+": "+highScoreTrack[i].hScore);
        tagScore.appendChild(scoreText);
        highScores.appendChild(tagScore);
    }

    var button = document.createElement('input');
    button.setAttribute("type", "button");
    button.setAttribute("value","Retake Quiz");
    highScores.appendChild(button);
    button.addEventListener("click",retakeQuiz);
}

function retakeQuiz(){
    var landingPage = document.getElementById("contentarea");
    landingPage.innerHTML = "";
    questionSelect = [
        {
           question: "2+2=?",
           answers:[
               "A: 300",
               "B: 4",
               "C: 916",
               "D: 25"
           ],
           correctAnsInd: "B: 4"
        },
        {        
           question: "4*6=?",
           answers:[
               "A: 32",
               "B: 14",
               "C: 24",
               "D: 2,567,899"
           ],
           correctAnsInd: "C: 24"
        },
        {        
            question: "24/12=?",
            answers:[
                "A: 600",
                "B: 12",
                "C: 678,333,258",
                "D: 2"
            ],
            correctAnsInd: "D: 2"
         },
         {        
            question: "16/4=?",
            answers:[
                "A: 60",
                "B: 4",
                "C: 67",
                "D: 11"
            ],
            correctAnsInd: "B: 4"
         },
         {        
            question: "9*3=?",
            answers:[
                "A: 8",
                "B: 116",
                "C: 27",
                "D: 12"
            ],
            correctAnsInd: "C: 27"
         },
         {        
            question: "27/9=?",
            answers:[
                "A: 3",
                "B: 12",
                "C: 111",
                "D: 2,236,899"
            ],
            correctAnsInd: "A: 3"
         },
         {        
            question: "12*3=?",
            answers:[
                "A: 18",
                "B: 36",
                "C: 6",
                "D: 4"
            ],
            correctAnsInd: "B: 36"
         },
         {        
            question: "18+9=?",
            answers:[
                "A: 27",
                "B: 45",
                "C: 38",
                "D: 999"
            ],
            correctAnsInd: "A: 27"
         },
         {        
            question: "26/2=?",
            answers:[
                "A: 60",
                "B: 23",
                "C: 13",
                "D: 29"
            ],
            correctAnsInd: "C: 13"
         },
         {        
            question: "16/8=?",
            answers:[
                "A: 16",
                "B: 25",
                "C: 333,258",
                "D: 2"
            ],
            correctAnsInd: "D: 2"
         }
    ]
   timer = "10";
   deleteArray=[];
   questionsAnswered=0;
   score = 0;
   scoreIndex = 1;
   landingScreen();
}
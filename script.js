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
    if (questionsAnswered===9){
        lastQuest();
    }

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
    var question = document.getElementById("questionText");
    var ansA = document.getElementById("choiceA");
    var ansB = document.getElementById("choiceB");
    var ansC = document.getElementById("choiceC");
    var ansD = document.getElementById("choiceD");
    
    //generates a random number to select a question     
    
    for(i=0; i<questionSelect.length-1; i++){
        var index=Math.floor(Math.random() * questionSelect.length);
    }
    
    correctAnswer=questionSelect[index].correctAnsInd;

    //sets question and answer-button values
    question.textContent = questionSelect[index].question;
    ansA.setAttribute("value",questionSelect[index].answers[0]);
    ansB.setAttribute("value",questionSelect[index].answers[1]);
    ansC.setAttribute("value",questionSelect[index].answers[2]);
    ansD.setAttribute("value",questionSelect[index].answers[3]);
    

    ansA.addEventListener('click',function(){
        if (this.value === correctAnswer){
            deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
        
    })
    ansB.addEventListener('click',function(){
        if (this.value === correctAnswer){
            var deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
        
    })
    ansC.addEventListener('click',function(){
        if (this.value === correctAnswer){
            var deleteArray = questionSelect.splice([index],1);
            rightAnswer();
        }else{
            wrongAnswer();
        }
       
    })
    ansD.addEventListener('click',function(){
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
    if (questionsAnswered===9){
        lastQuest();
        }else{
        startQuiz();
        }
    }


function lastQuest(){
    var scoresDisplay = document.getElementById("highscores").style.display = "none";
    var questionPage = document.getElementById("contentarea");
    questionPage.innerHTML = "";
    var questHeadTag = document.createElement("h3");
    var questHeadText = document.createTextNode("Question:");
    questHeadTag.appendChild(questHeadText);
    questionPage.appendChild(questHeadTag);
    
    var questDiv = document.createElement("div");
    questDiv.setAttribute("id","questionText");
    questionPage.appendChild(questDiv);
    var questTag = document.createElement("h3");
    questionPage.appendChild(questTag);
    var questionText = document.createTextNode("");
    questionPage.appendChild(questionText);
    
    var ansDiv = document.createElement("div");
    ansDiv.setAttribute("id","answersList")
    questionPage.appendChild(ansDiv);

    var choiceA = document.createElement('input');
    var choiceB = document.createElement('input');
    var choiceC = document.createElement('input');
    var choiceD = document.createElement('input');
    choiceA.setAttribute("type","button");
    choiceA.setAttribute("id","choiceA");
    choiceB.setAttribute("type","button");
    choiceB.setAttribute("id","choiceB");
    choiceC.setAttribute("type","button");
    choiceC.setAttribute("id","choiceC");
    choiceD.setAttribute("type","button");
    choiceD.setAttribute("id","choiceD");
    answersList.appendChild(choiceA);
    answersList.appendChild(choiceB);
    answersList.appendChild(choiceC);
    answersList.appendChild(choiceD);

    var question = document.getElementById("questionText");
    var ansA = document.getElementById("choiceA");
    var ansB = document.getElementById("choiceB");
    var ansC = document.getElementById("choiceC");
    var ansD = document.getElementById("choiceD");
    
    var index = 0;
    
    correctAnswer=questionSelect[index].correctAnsInd;

    //sets question and answer-button values
    question.textContent = questionSelect[index].question;
    ansA.setAttribute("value",questionSelect[index].answers[0]);
    ansB.setAttribute("value",questionSelect[index].answers[1]);
    ansC.setAttribute("value",questionSelect[index].answers[2]);
    ansD.setAttribute("value",questionSelect[index].answers[3]);
    

    ansA.addEventListener('click',function(){
        if (this.value === correctAnswer){
            score ++;
            winScreen();
        }else{
            wrongAnswer();
        }
        
    })
    ansB.addEventListener('click',function(){
        if (this.value === correctAnswer){
            score ++;
            winScreen();
        }else{
            wrongAnswer();
        }
        
    })
    ansC.addEventListener('click',function(){
        if (this.value === correctAnswer){
            score ++;
            winScreen();
        }else{
            wrongAnswer();
        }
       
    })
    ansD.addEventListener('click',function(){
        if (this.value === correctAnswer){
            score ++;
            winScreen();
        }else{
            wrongAnswer();
        }
    })

}

function winScreen(){
    var scoresDisplay = document.getElementById("highscores").style.removeProperty("display");
    var landingPage = document.getElementById("contentarea");
    landingPage.innerHTML = "";
    var landingh1Tag = document.createElement("h1");
    var landingh1text = document.createTextNode("All done!");
    landingh1Tag.appendChild(landingh1text);  
    landingPage.appendChild(landingh1Tag);

    var landingh2Tag = document.createElement("h2");
    var landingh2text = document.createTextNode("Your score is: "+score);
    landingh2Tag.appendChild(landingh2text);  
    landingPage.appendChild(landingh2Tag);

    var landingh3Tag = document.createElement("h3");
    if (score<5){
        var landingh3text = document.createTextNode("Not too great. Try again.");
    }else if (score<8){
        var landingh3text = document.createTextNode("Not bad.");
    }else{
        var landingh3text = document.createTextNode("Nice!");
    }
    landingh3Tag.appendChild(landingh3text);  
    landingPage.appendChild(landingh3Tag);

    var formContainerDiv = document.createElement('form');
    formContainerDiv.setAttribute('id','initialFormContainer');
    landingPage.appendChild(formContainerDiv);
    
    var inputTag = document.createElement("h3");
    inputTag.setAttribute('id','inputTag');
    var inputText = document.createTextNode("Enter your initials:");
    inputTag.appendChild(inputText);  
    formContainerDiv.appendChild(inputTag);

    var typeText = document.createElement('input');
    typeText.setAttribute('type','text');
    typeText.setAttribute('id','typeTextBox');
    typeText.setAttribute('maxlength','3');
    formContainerDiv.appendChild(typeText);
    
    var submitScore = document.createElement('input');
    submitScore.setAttribute("type","submit");
    submitScore.setAttribute("id","submitChoice");
    submitScore.setAttribute("value","Submit");
    formContainerDiv.appendChild(submitScore);
    
    submitScore.addEventListener('click',function(){
        event.preventDefault();

        var highScoreTrack = localStorage.getItem("highScoreTrack");

        if(highScoreTrack===null){
            highScoreTrack = [
                {
                   initials: typeText.value,
                   hScore: score
                }
            ]
            window.localStorage.setItem('highScoreTrack',JSON.stringify(highScoreTrack));
        }else{
            var newScore = [
                {
                   initials: typeText.value,
                   hScore: score
                }
            ]

            var scoreBoard = JSON.parse(localStorage.getItem("highScoreTrack"));
            highScoreTrack = scoreBoard.concat(newScore);
            // scoreBoard += newScore;
            localStorage.setItem('highScoreTrack', JSON.stringify(highScoreTrack));
        }
        
        window.localStorage.setItem('highScoreTrack',JSON.stringify(highScoreTrack));
        var highScoresPage = document.getElementById ("contentarea");
        highScoresPage.innerHTML = "";
        var scoresDisplay = document.getElementById("highscores").style.display = "none";
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
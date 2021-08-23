var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on start/reset
document.getElementById("startreset").onclick = function(){
  if(playing == true){
    //if we are playing
    location.reload(); //reload page
  }else{
    //if we are not playing
    playing = true; //change mode to playing
    score = 0; //set score to zero
    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining"); //show countdown box
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameOver");
    document.getElementById("startreset").innerHTML = "Reset Game"; //change button to restart
    //start countdown
    startCountdown();
    generateQA();
  }
}

//clicking on answerbox
for(i = 1 ; i <= 4 ; i++){
  document.getElementById("box"+i).onclick = function(){
    //if we are playing
    if(playing == true){//yes
      if(this.innerHTML == correctAnswer){//correctAnswer
        score++;//increase score by 1;
        document.getElementById("scorevalue").innerHTML = score;
        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function(){
          hide("correct");
        },1000);
        generateQA();
      }else{
        hide("correct");
        show("wrong");
        setTimeout(function(){
          hide("wrong");
        },1000);
    }
    }
  }
}

//functions

//starts countdown
function startCountdown(){
  action = setInterval(function(){
    timeremaining-=1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if(timeremaining == 0){//gameover
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is "+score+".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  },1000);
}

//stops countdown
function stopCountdown(){
  clearInterval(action);
}

//hides an element
function hide(Id){
  document.getElementById(Id).style.display = "none";
}

//shows an element
function show(Id){
  document.getElementById(Id).style.display = "block";
}

//generate questions and multiple answers
function generateQA(){
  var x = 1+Math.round(9*Math.random());
  var y = 1+Math.round(9*Math.random());
  correctAnswer = x*y;
  document.getElementById("question").innerHTML = x+" x "+y;
  var correctPosition = 1+Math.round(3*Math.random());
  document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
  var answers = [correctAnswer];
  for(i = 1 ; i <= 4 ; i++){
    if(i != correctPosition){
      var wrongAnswer;
      do{
        wrongAnswer = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
      }while(answers.indexOf(wrongAnswer) >= 0)
      document.getElementById("box"+i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

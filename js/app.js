
// Declare card symbols
const icon = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", 
"fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt",
 "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", 
 "fa-bicycle", "fa-bomb", "fa-bomb"];

// Create array to hold opened cards
let openmyCards = [];
let matchFound = [];
let starRating = 3;
let moves = 0; 

//game timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;

// First Click Indicator
let isFirstClick = true;


  function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML ="Timer: "+ minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
    
    }

  function findWinner (){
  // Get the modal
  let modal = document.getElementById('win-popup');
  // Get the button that opens the modal
  let btn = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  $("#total-moves").text(moves);
  $("#total-stars").text(starRating);
  // When the user clicks on the button, open the modal 
   modal.style.display = "block";
   $("#play-again-btn").on("click", function() {
     // location.reload()
     
    });
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    location.reload()
    modal.style.display = "none";
   }
    // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
      if (event.target == modal) {
      modal.style.display = "none";
      }
    }
    setTimeout(function(){
          second = 0;
          minute = 0; 
    }, 980); 
         
    }
   
  // Shuffle cards (function from http://stackoverflow.com/a/2450976)
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
    }

  function isItOver()  {
       if (matchFound.length === icon.length){    
        findWinner ();             
        //showing time on modal
        finalTime = timer.innerHTML; 
        document.getElementById("finalTime").innerHTML = finalTime;
      }
    
    }

  //add moves   
  const movesContainer = document.queryCommandEnabled(".moves"); 
  function addMoves() {
  $("#moves").text(moves.toString());  
   movesContainer.innerHTML = moves;
    if (moves > 0 && moves < 16) {
      starRating = starRating;
    } else if (moves >= 16 && moves <= 20) {
      $("#starOne").removeClass("fa-star");
      starRating = "2";
       } else if (moves > 20) {
          $("#starTwo").removeClass("fa-star");
          starRating = "1";
        }

    }

  function init(card) {
    const cardsContainer = document.querySelector(".deck");
    // shuffle the array
    let cardList = shuffle(icon);
    
    // with the shuffle list find lenght and create a dynamic HTML
    for (let i = 0; i < cardList.length; i++ ) {
      // deck --> card --> icon show in that order
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `<i class= "fa ${cardList[i]}"></i>`;
      cardsContainer.appendChild(card);
      //card click event
      card.addEventListener("click", function() {
        // setup a read-only reference so it easier to maniuplates values    
        console.log(moves);        
        if(isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            isFirstClick = false;        
          }
      
      const currentCard = this;
      const previousCard = openmyCards[0]; 
      console.log("this is my preious card",previousCard);
      // if the an element is open
      
      if (openmyCards.length === 1) {
           card.classList.add("open", "show","flipInY","disable");
          // from css open and show the icon > 0px
          openmyCards.push(this);
        // this is to compare the most clicked item vs the item stored 
        if (currentCard.innerHTML === previousCard.innerHTML) {
              // my matches
              
              currentCard.classList.add("flipInY","match","disable");
              previousCard.classList.add("flipInY","match","disable");
              matchFound.push(currentCard,previousCard);
              openmyCards = []; //clears the counter 
              
              console.log(matchFound);
              // Check if the game is over
              if (matchFound.length == 16) {
                  console.log(matchFound,"this is match found"); 
                  isItOver();
                  
              }
                  push(this);              
                                  
          } else { 
            setTimeout(function(){
            setTimeout(function() {
            previousCard.classList.remove("open","show","disable","flipInY");
            currentCard.classList.remove("open","show","disable","flipInY");          
          },500);
          openmyCards = [];          
        },100);
        moves++;    
        
        }
          
      } 

      // from css open and show the icon > 0px
      card.classList.add("open", "show","flipInY","disable");
      openmyCards.push(this); /*** problem is here, it storing the value, but it needs to delete it */
      console.log("this is my preious card #1",previousCard);
      
      
      
    });
  }
 




  /*   ** restart **  */
  const restartGame = document.querySelector(".restart");
  restartGame.addEventListener("click",function() {
      // Delete all cards
      cardsContainer.innerHTML = "";
      location.reload();
      // call Init to create new cards
      openmyCards = []; 
      // clear cards
      matchFound = [];
      moves = 0;
      // stopTimer(); 
      movesContainer.innerHTML = moves;
      starRating = 3;
      });
    }

  
 
// Start the game here //

 init();
 
$(document).ready(function(){

// Initialising global variables ----------------------------------
//starts turn order
var redTurn = true;
var blueTurn = false;
var socket = io.connect();
var chat = $('#chat');
var opponent;
var username;
var team;
var UsersInGame = [];
var UserChallenges = [];
var waiting = false;

var move = new Audio("move.wav");
var enter = new Audio("enter.mp3");  // buffers automatically when created

var takeDirection;

//creates variables for moving pieces 
var start;
var rightMove;
var leftMove;
var takeLeft;
var takeRight;
var leftBackmove;
var	rightBackmove;
var	leftBacktake;
var	rightBacktake;

var doubletakeRight;
var doubletakeLeft;
var doubletakeRightLeft;
var doubletakeLeftRight;

var leftBackDoubletake;
var rightBackDoubletake;
var leftRightBackDoubletake;
var righLefttBackDoubletake;

var doubletakeRightStart;
var doubletakeLeftStart;
var doubletakeRightLeftStart;
var doubletakeLeftRightStart;


var leftBackDoubletakeStart;
var rightBackDoubletakeStart;
var leftRightBackDoubletakeStart;
var rightLeftBackDoubletakeStart;



var movesAvailable;
//-----------------------------------------------------------------

function hideLobbyText(){
	if($('#ruleBtn').val() == "Hide"){
		$('#tutorial').css("display", "none");
		$('#rules').css("display", "none");	
		$('#ruleBtn').val("Show instructions")
	}
	else if($('#ruleBtn').val() == "Show instructions"){
		$('#tutorial').css("display", "inherit");
		$('#rules').css("display", "inherit");	
		$('#ruleBtn').val("Hide")
	}
}
function hideGameInstructions(){
	if($('#gameInstructionBtn').val() == "Hide"){
		$('#gameInstructions').css("display", "none");
		$('#gameInstructionBtn').val("Show instructions")
	}
	else if($('#gameInstructionBtn').val() == "Show instructions"){
		$('#gameInstructions').css("display", "inherit");
		$('#gameInstructionBtn').val("Hide")
	}
}

function removeLeftAndRight(id){ //This checks to see if the piece is near the edges, and changes the move/take values to na if they are off the board
	if(team == 'blue'){
		if(id == '#1' || id == '#9' || id == '#17' || id == '#25'){
			leftMove = "na";
			takeLeft = "na";
			leftBackmove = "na";
			leftBacktake = "na";	
			doubletakeLeft = "na";
			leftBackdoubletake = "na";	
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";


		}
		if(id == '#8' || id == '#16' || id == '#24' || id == '#32'){
			rightMove = "na";
			takeRight = "na";
			rightBackmove = "na";
			rightBacktake = "na";
			doubletakeRight = "na";
			rightBackdoubletake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";


		}	
		if(id == '#5' || id == '#13' || id == '#21' || id == '#29'){
			takeLeft = "na";
			leftBacktake = "na";
			doubletakeLeft = "na";
			leftBackdoubletake = "na";	
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";		
		}
		if(id == '#4' || id == '#12' || id == '#20' || id == '#28'){
			takeRight = "na";
			rightBacktake = "na";	
			doubletakeRight = "na";
			rightBackdoubletake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";					
		}	
		if(id == '#2' || id == '#10' || id == '#18' || id == '#26' || id == '#6' || id == '#14' || id == '#22' || id == '#30' || id == '#11' || id == '#12' || id == '#15' || id == '#16' || id == '#7' || id == '#8'){
			doubletakeLeft = "na";
			leftBackdoubletake = "na";		
		}	


		if(id == '#7' || id == '#15' || id == '#23' || id == '#31' || id == '#3' || id == '#11' || id == '#19' || id == '#27' || id == '#6' || id == '#14' || id == '#10' || id == '#13' || id == '#5' || id == '#9'){
			doubletakeRight = "na";
			rightBackdoubletake = "na";		
		}	


		if(id == "#10" || id == "#11" || id == "#6" || id == "#7" || id == "#5" || id == "#14" || id == "#15" || id == "#16" || id == "#8"){
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";	
		}


	}
	else if(team == 'red'){
		if(id == '#1' || id == '#9' || id == '#17' || id == '#25'){
			rightMove = "na";
			takeRight = "na";
			rightBackmove = "na";
			rightBacktake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";	
			doubletakeRight = "na";
			rightBackDoubletake = "na";

		}
		if(id == '#8' || id == '#16' || id == '#24' || id == '#32'){
			leftMove = "na";
			takeLeft = "na";
			leftBackmove = "na";
			leftBacktake = "na";
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";	
			doubletakeLeft = "na";
			leftBackdoubletake = "na";	
		}	
		if(id == '#5' || id == '#13' || id == '#21' || id == '#29'){
			takeRight = "na";
			rightBacktake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";	
			doubletakeRight = "na";
			rightBackDoubletake = "na";		
		}
		if(id == '#4' || id == '#12' || id == '#20' || id == '#28'){
			takeLeft = "na";
			leftBacktake = "na";	
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";	
			doubletakeLeft = "na";
			leftBackDoubletake = "na";			
		}	

		if(id == '#7' || id == '#15' || id == '#23' || id == '#31' || id == '#3' || id == '#11' || id == '#19' || id == '#27' || id == '#18' || id == '#21' || id == '#26' || id == '#25' || id == '#17'){
			doubletakeLeft = "na";
			leftBackDoubletake = "na";			
		}	

		if(id == '#2' || id == '#10' || id == '#18' || id == '#26' || id == '#6' || id == '#14' || id == '#22' || id == '#30' || id == '#19' || id == '#20' || id == '#24' || id == '#23'){
			doubletakeRight = "na";
			rightBackDoubletake = "na";			
		}	

		if(id == "#23" || id == "#22" || id == "#27" || id == "#26" || id == "#19" || id == "#18"){
			doubletakeLeftRight = "na";
			leftRightBackDoubletake = "na";	
			doubletakeRightLeft = "na";
			rightLeftBackDoubletake = "na";	
		}


	}
}

function calculateCoords(colour, id, team){ //This takes the team, id, and starting colour of the board row. It then calculates what the possible moves are. 
	var $id = '#' + id;	
	var rightMoveAdd = 0;
	var leftMoveAdd = 0;
	var takeRightAdd = 0;
	var takeLeftAdd = 0;
	var leftBackmoveAdd = 0;
	var rightBackmoveAdd = 0;
	var leftBacktakeAdd = 0;
	var rightBacktakeAdd = 0;

	var rightBackDoubletakeStartAdd = 0;
	var leftBackDoubletakeStartAdd = 0;
	var doubletakeRightStartAdd = 0;
	var doubletakeLeftStartAdd = 0;

	var rightBackDoubletakeAdd = 0;
	var leftBackDoubletakeAdd = 0;
	var doubletakeRightAdd = 0;
	var doubletakeLeftAdd = 0;


	var doubletakeRightLeftStartAdd = 0;
	var doubletakeLeftRightStartAdd = 0;
	var leftRightBackDoubletakeStartAdd = 0;
	var rightLeftBackDoubletakeStartAdd = 0;

	var doubletakeRightLeftAdd = 0;
	var doubletakeLeftRightAdd = 0;
	var leftRightBackDoubletakeAdd = 0;
	var rightLeftBackDoubletakeAdd = 0;



	if(team == "red"){
		takeRightAdd = 7;
		takeLeftAdd = 9;
		leftBacktakeAdd = -7;
		rightBacktakeAdd = -9;

		rightBackDoubletakeAdd = -18;
		leftBackDoubletakeAdd = -14;
		doubletakeRightAdd = 14;
		doubletakeLeftAdd = 18;

		if(colour == "black"){
			rightMoveAdd = 3;
			leftMoveAdd = 4;
			leftBackmoveAdd = -4;
			rightBackmoveAdd = -5;

			rightBackDoubletakeStartAdd = -14;
			leftBackDoubletakeStartAdd = -11;
			doubletakeRightStartAdd = 10;
			doubletakeLeftStartAdd = 13;

			doubletakeRightLeftStartAdd = 11;
			doubletakeLeftRightStartAdd = 12;
			leftRightBackDoubletakeStartAdd = -12;
			rightLeftBackDoubletakeStartAdd = -13;

			doubletakeRightLeftAdd = 16;
			doubletakeLeftRightAdd = 16;
			leftRightBackDoubletakeAdd = -16;
			rightLeftBackDoubletakeAdd = -16;



		}
		if(colour == "white"){
			rightMoveAdd = 4;
			leftMoveAdd = 5;
			leftBackmoveAdd = -3;
			rightBackmoveAdd = -4;

			rightBackDoubletakeStartAdd = -13;
			leftBackDoubletakeStartAdd = -10;
			doubletakeLeftStartAdd = 14;
			doubletakeRightStartAdd = 11;

			doubletakeRightLeftStartAdd = 12;
			doubletakeLeftRightStartAdd = 13;
			leftRightBackDoubletakeStartAdd = -11;
			rightLeftBackDoubletakeStartAdd = -12;

			doubletakeRightLeftAdd = 16;
			doubletakeLeftRightAdd = 16;
			leftRightBackDoubletakeAdd = -16;
			rightLeftBackDoubletakeAdd = -16;			

		}
	}


	if(team == "blue"){
		takeRightAdd = -7;
		takeLeftAdd = -9;
		leftBacktakeAdd = 7;
		rightBacktakeAdd = 9;

		rightBackDoubletakeAdd = 18;
		leftBackDoubletakeAdd = 14;
		doubletakeRightAdd = -14;
		doubletakeLeftAdd = -18;		

		if(colour == "black"){
			rightMoveAdd = -3;
			leftMoveAdd = -4;
			leftBackmoveAdd = 4;
			rightBackmoveAdd = 5;

			rightBackDoubletakeStartAdd = 14;
			leftBackDoubletakeStartAdd = 11;
			doubletakeLeftStartAdd = -13;
			doubletakeRightStartAdd = -10;

			doubletakeRightLeftStartAdd = -11;
			doubletakeLeftRightStartAdd = -12;
			leftRightBackDoubletakeStartAdd = 12;
			rightLeftBackDoubletakeStartAdd = 13;

			doubletakeRightLeftAdd = -16;
			doubletakeLeftRightAdd = -16;
			leftRightBackDoubletakeAdd = 16;
			rightLeftBackDoubletakeAdd = 16;


		}
		if(colour == "white"){
			rightMoveAdd = -4;
			leftMoveAdd = -5;
			leftBackmoveAdd = 3;
			rightBackmoveAdd = 4;

			rightBackDoubletakeStartAdd = 13;
			leftBackDoubletakeStartAdd = 10;
			doubletakeLeftStartAdd = -14;
			doubletakeRightStartAdd = -11;

			doubletakeRightLeftStartAdd = -12;
			doubletakeLeftRightStartAdd = -13;
			leftRightBackDoubletakeStartAdd = 11;
			rightLeftBackDoubletakeStartAdd = 12;

			doubletakeRightLeftAdd = -16;
			doubletakeLeftRightAdd = -16;
			leftRightBackDoubletakeAdd = 16;
			rightLeftBackDoubletakeAdd = 16;

		}
	}// Now that the adders are set the the appropriate numbers for the team colour and row starting colour, it works out what the possible positions are.
			start = $id;
			rightMove = parseInt(id) + rightMoveAdd;
			rightMove = '#' + rightMove; 
			leftMove = parseInt(id) + leftMoveAdd;
			leftMove = '#' + leftMove; 
			takeRight = parseInt(id) + takeRightAdd;
			takeRight = '#' + takeRight; 
			takeLeft = parseInt(id) + takeLeftAdd;
			takeLeft = '#' + takeLeft; 
			leftBackmove = parseInt(id) + leftBackmoveAdd;
			leftBackmove = '#' + leftBackmove; 			
			rightBackmove = parseInt(id) + rightBackmoveAdd;
			rightBackmove = '#' + rightBackmove; 	
			leftBacktake = parseInt(id) + leftBacktakeAdd;
			leftBacktake = '#' + leftBacktake; 			
			rightBacktake = parseInt(id) + rightBacktakeAdd;
			rightBacktake = '#' + rightBacktake; 	

			rightBackDoubletake = parseInt(id) + rightBackDoubletakeAdd;
			rightBackDoubletake = '#' + rightBackDoubletake; 	
			leftBackDoubletake = parseInt(id) + leftBackDoubletakeAdd;
			leftBackDoubletake = '#' + leftBackDoubletake; 	

			doubletakeRight = parseInt(id) + doubletakeRightAdd;
			doubletakeRight = '#' + doubletakeRight; 
			doubletakeLeft = parseInt(id) + doubletakeLeftAdd;
			doubletakeLeft = '#' + doubletakeLeft; 

			rightBackDoubletakeStart = parseInt(id) + rightBackDoubletakeStartAdd;
			rightBackDoubletakeStart = '#' + rightBackDoubletakeStart; 	
			leftBackDoubletakeStart = parseInt(id) + leftBackDoubletakeStartAdd;
			leftBackDoubletakeStart = '#' + leftBackDoubletakeStart; 	

			doubletakeRightStart = parseInt(id) + doubletakeRightStartAdd;
			doubletakeRightStart = '#' + doubletakeRightStart; 
			doubletakeLeftStart = parseInt(id) + doubletakeLeftStartAdd;
			doubletakeLeftStart = '#' + doubletakeLeftStart; 

			
			rightLeftBackDoubletake = parseInt(id) + rightLeftBackDoubletakeAdd;
			rightLeftBackDoubletake = '#' + rightLeftBackDoubletake; 	
			leftRightBackDoubletake = parseInt(id) + leftRightBackDoubletakeAdd;
			leftRightBackDoubletake = '#' + leftRightBackDoubletake; 	

			doubletakeRightLeft = parseInt(id) + doubletakeRightLeftAdd;
			doubletakeRightLeft = '#' + doubletakeRightLeft; 
			doubletakeLeftRight = parseInt(id) + doubletakeLeftRightAdd;
			doubletakeLeftRight = '#' + doubletakeLeftRight; 

			rightLeftBackDoubletakeStart = parseInt(id) + rightLeftBackDoubletakeStartAdd;
			rightLeftBackDoubletakeStart = '#' + rightLeftBackDoubletakeStart; 	
			leftRightBackDoubletakeStart = parseInt(id) + leftRightBackDoubletakeStartAdd;
			leftRightBackDoubletakeStart = '#' + leftRightBackDoubletakeStart; 	

			doubletakeRightLeftStart = parseInt(id) + doubletakeRightLeftStartAdd;
			doubletakeRightLeftStart = '#' + doubletakeRightLeftStart; 
			doubletakeLeftRightStart = parseInt(id) + doubletakeLeftRightStartAdd;
			doubletakeLeftRightStart = '#' + doubletakeLeftRightStart; 		

			removeLeftAndRight($id);
			availableMoves(start, leftMove, rightMove, takeLeft, takeRight, leftBackmove, rightBackmove, leftBacktake, rightBacktake, doubletakeLeft, doubletakeRight, leftBackDoubletake, rightBackDoubletake, doubletakeLeftStart, doubletakeRightStart, leftBackDoubletakeStart, rightBackDoubletakeStart, doubletakeLeftRight, doubletakeRightLeft, leftRightBackDoubletake, rightLeftBackDoubletake, doubletakeLeftRightStart, doubletakeRightLeftStart, leftRightBackDoubletakeStart, rightLeftBackDoubletakeStart);
}

function allRedMoves(ID, Class){// Calls the calculate coordinates function. Takes the ID of the piece then passing that along with the team to the function.
	var id = ID;
	var theClass = Class;
	var $id = '#' + id;
		if($($id).hasClass('startWhite') == true){
			calculateCoords("white", id, "red");
		}

		else if($($id).hasClass('startBlack') == true){
			calculateCoords("black", id, "red");
		}			
}

function allBlueMoves(ID, Class){// Calls the calculate coordinates function. Takes the ID of the piece then passing that along with the team to the function.
	var id = ID;
	var theClass = Class;
	var $id = '#' + id;
		if($($id).hasClass('startWhite') == true){
			calculateCoords("white", id, "blue");
		}

		else if($($id).hasClass('startBlack') == true){
			calculateCoords("black", id, "blue");
		}		
}

function checkMovesLeft(color){// loops through all possible moves on the board by running the allblue/redmoves functions for each piece on the board.
	var squares = $(".white_square");
	var movesLeft = 0;	
	movesAvailable = 0;
	if(color == 'red'){
		for(var i=1; i<=squares.length; i++){
			var squareID = '#' + i;
			if($(squareID).hasClass('has_red') || $(squareID).hasClass('has_redking')){
				var id = i
				allRedMoves(id);
			}			
		}
	}
	else if(color == 'blue'){
		for(var i=1; i<=squares.length; i++){
			var squareID = '#' + i;
			if($(squareID).hasClass('has_blue') || $(squareID).hasClass('has_blueking')){
				var id = i
				allBlueMoves(id);
			}			
		}
	}

	var newTempAvailable = movesAvailable;

	clearAvailable();
	return newTempAvailable;
}

function checkPiecesLeft(color){// loops through all white squares and checks how many pieces are left.
	var squares = $(".white_square");
	var piecesLeft = 0;	
	if(color == 'red'){
		for(var i=1; i<=squares.length; i++){
			var thing = i;
			var id = "#" + thing;
			if($(id).hasClass('has_red') || $(id).hasClass('has_redking')){
				piecesLeft++;

			}
		}
	}
	if(color == 'blue'){
		for(var i=1; i<=squares.length; i++){
			var thing = i;
			var id = "#" + thing;
			if($(id).hasClass('has_blue') || $(id).hasClass('has_blueking')){
				piecesLeft++;

			}
		}		
	}
	return piecesLeft;
}

function clearAvailable(){ //clears all highlighted squares when any non-highlighted squares are clicked.
	var squares = $(".white_square");
		for(var i=1; i<=squares.length; i++){
			var thing = i;
			var id = "#" + thing;
			$(id).removeClass('available');
		}
}

function movePiece(old, theNew){ //Moves red pieces by adding/removing classes
	if($(old).hasClass('has_red')){
		$(old).removeClass('has_red');
		if(theNew == '#29' || theNew == '#30' || theNew == '#31' || theNew == '#32'){
				$(theNew).addClass('has_redking');
				changeTurn('blue');
		}else{
				$(theNew).addClass('has_red');
				changeTurn('blue');
		}
	
	}
	if($(old).hasClass('has_redking')){
		$(old).removeClass('has_redking');
		$(theNew).addClass('has_redking')
		changeTurn('blue');;
	}
	if($(old).hasClass('has_blue')){
		$(old).removeClass('has_blue');
		if(theNew == '#1' || theNew == '#2' || theNew == '#3' || theNew == '#4'){
				$(theNew).addClass('has_blueking');
				changeTurn('red');
		}else{
				$(theNew).addClass('has_blue');
				changeTurn('red');
		}
	}	
	if($(old).hasClass('has_blueking')){
		$(old).removeClass('has_blueking');
		$(theNew).addClass('has_blueking');
		changeTurn('red');
	}
	move.play();
}

function removePiece(anID){ //Removes a piece when it is taken
	$(anID).removeClass('has_red');
	$(anID).removeClass('has_blue');
	$(anID).removeClass('has_redking');
	$(anID).removeClass('has_blueking');	
}

function availableMoves(starter, moveL, moveR, takeL, takeR, backL, backR, backtakeL, backtakeR, doubletakeL, doubletakeR, backdoubletakeL, backdoubletakeR, doubletakeLStart, doubletakeRStart, backdoubletakeLStart, backdoubletakeRStart, doubletakeLeftRight, doubletakeRightLeft, leftRightBackDoubletake, rightLeftBackDoubletake, doubletakeLeftRightStart, doubletakeRightLeftStart, leftRightBackDoubletakeStart, rightLeftBackDoubletakeStart){ //Highlights all available moves for red once a piece is clicked
	//Returns postions for the piece and potential moves
	rightMove = moveR; //takes all possible parameters from the calcCoordinates function 
	leftMove = moveL;
	takeLeft = takeL;
	takeRight = takeR;
	leftBackmove = backL;
	rightBackmove = backR;
	leftBacktake = backtakeL;
	rightBacktake = backtakeR;

	doubletakeRight = doubletakeR;
	doubletakeLeft = doubletakeL;
	leftBackDoubletake = backdoubletakeL;
	rightBackDoubletake = backdoubletakeR;	

	doubletakeRightStart = doubletakeRStart;
	doubletakeLeftStart = doubletakeLStart;
	leftBackDoubletakeStart = backdoubletakeLStart;
	rightBackDoubletakeStart = backdoubletakeRStart;	

	start = starter;




	//--------------------------------------------------
	// Takes each coordinate and checks what classes are present. Uses these to decide which squares are available. 
	if(rightMove != 'na'){
		if($(rightMove).attr('class') == "white_square startWhite" || $(rightMove).attr('class') == "white_square startBlack"){
			$(rightMove).addClass("available");
			movesAvailable++;
		}
	}
	if(leftMove != 'na'){
		if($(leftMove).attr('class') == "white_square startWhite" || $(leftMove).attr('class') == "white_square startBlack"){
			$(leftMove).addClass("available");
			movesAvailable++;
		}
	}
	if(rightMove != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(rightMove).hasClass("has_blue") || $(rightMove).hasClass("has_blueking")){
				if($(takeR).attr('class') == "white_square startWhite" || $(takeR).attr('class') == "white_square startBlack"){
					$(takeRight).addClass("available");
					movesAvailable++;
				}
			}				
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(rightMove).hasClass("has_red") || $(rightMove).hasClass("has_redking")){
				if($(takeR).attr('class') == "white_square startWhite" || $(takeR).attr('class') == "white_square startBlack"){
					$(takeRight).addClass("available");
					movesAvailable++;
				}
			}							
		}

	}

	if(leftMove != 'na'){ //left take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(leftMove).hasClass("has_blue") || $(leftMove).hasClass("has_blueking")){
				if($(takeL).attr('class') == "white_square startWhite" || $(takeL).attr('class') == "white_square startBlack"){
					$(takeL).addClass("available");
					movesAvailable++;
				}
			}				
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(leftMove).hasClass("has_red") || $(leftMove).hasClass("has_redking")){
				if($(takeL).attr('class') == "white_square startWhite" || $(takeL).attr('class') == "white_square startBlack"){
					$(takeL).addClass("available");
					movesAvailable++;
				}
			}							
		}

	}	


	if(leftBackmove != 'na'){
		if($(start).hasClass("has_redking") || $(start).hasClass("has_blueking")){
			if($(leftBackmove).attr('class') == "white_square startWhite" || $(leftBackmove).attr('class') == "white_square startBlack"){
				$(leftBackmove).addClass("available");
				movesAvailable++;
			}
		}
	}
	if(rightBackmove != 'na'){
		if($(start).hasClass("has_redking") || $(start).hasClass("has_blueking")){
			if($(rightBackmove).attr('class') == "white_square startWhite" || $(rightBackmove).attr('class') == "white_square startBlack"){
				$(rightBackmove).addClass("available");
				movesAvailable++;
			}
		}
	}



	if(leftBacktake != 'na'){
		if($(start).hasClass("has_redking")){		
			if($(leftBackmove).hasClass("has_blue") || $(leftBackmove).hasClass("has_blueking")){
				if($(backtakeL).attr('class') == "white_square startWhite" || $(leftBacktake).attr('class') == "white_square startBlack"){
					$(leftBacktake).addClass("available");
					movesAvailable++;
				}
			}	
		}
		else if($(start).hasClass("has_blueking")){
			if($(leftBackmove).hasClass("has_red") || $(leftBackmove).hasClass("has_redking")){
				if($(backtakeL).attr('class') == "white_square startWhite" || $(leftBacktake).attr('class') == "white_square startBlack"){
					$(leftBacktake).addClass("available");
					movesAvailable++;
				}
			}
		}

	}	
	if(rightBacktake != 'na'){
		if($(start).hasClass("has_redking")){		
			if($(rightBackmove).hasClass("has_blue") || $(rightBackmove).hasClass("has_blueking")){
				if($(backtakeR).attr('class') == "white_square startWhite" || $(rightBacktake).attr('class') == "white_square startBlack"){
					$(rightBacktake).addClass("available");
					movesAvailable++;
				}
			}	
		}
		if($(start).hasClass("has_blueking")){		
			if($(rightBackmove).hasClass("has_red") || $(rightBackmove).hasClass("has_redking")){
				if($(backtakeR).attr('class') == "white_square startWhite" || $(rightBacktake).attr('class') == "white_square startBlack"){
					$(rightBacktake).addClass("available");
					movesAvailable++;
				}
			}	
		}		
	}	








// double stuff goes here--------------


	if(rightMove != 'na' && doubletakeRight != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){

			if($(rightMove).hasClass("has_blue") || $(rightMove).hasClass("has_blueking")){
				if($(takeRight).attr('class') == "white_square startWhite available" || $(takeRight).attr('class') == "white_square startBlack available"){
					if($(doubletakeRightStart).hasClass("has_blue") || $(doubletakeRightStart).hasClass("has_blueking")){
						if($(doubletakeRight).attr('class') == "white_square startWhite" || $(doubletakeRight).attr('class') == "white_square startBlack"){
							$(doubletakeRight).addClass("available");
							movesAvailable++;
						}
					}
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){


			if($(rightMove).hasClass("has_red") || $(rightMove).hasClass("has_redking")){
				if($(takeRight).attr('class') == "white_square startWhite available" || $(takeRight).attr('class') == "white_square startBlack available"){
					if($(doubletakeRightStart).hasClass("has_red") || $(doubletakeRightStart).hasClass("has_redking")){
						if($(doubletakeRight).attr('class') == "white_square startWhite" || $(doubletakeRight).attr('class') == "white_square startBlack"){
							$(doubletakeRight).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}						
		}

	}

	if(leftMove != 'na' && doubletakeLeft != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){

			if($(leftMove).hasClass("has_blue") || $(leftMove).hasClass("has_blueking")){
				if($(takeLeft).attr('class') == "white_square startWhite available" || $(takeLeft).attr('class') == "white_square startBlack available"){
					if($(doubletakeLeftStart).hasClass("has_blue") || $(doubletakeLeftStart).hasClass("has_blueking")){
						if($(doubletakeLeft).attr('class') == "white_square startWhite" || $(doubletakeLeft).attr('class') == "white_square startBlack"){
							$(doubletakeLeft).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
				if($(leftMove).hasClass("has_red") || $(leftMove).hasClass("has_redking")){
					if($(takeLeft).attr('class') == "white_square startWhite available" || $(takeLeft).attr('class') == "white_square startBlack available"){
						if($(doubletakeLeftStart).hasClass("has_red") || $(doubletakeLeftStart).hasClass("has_redking")){
							if($(doubletakeLeft).attr('class') == "white_square startWhite" || $(doubletakeLeft).attr('class') == "white_square startBlack"){
								$(doubletakeLeft).addClass("available");
								movesAvailable++;
							}
						}	
					}
				}						
		}

	}

	if(leftBacktake != 'na' && leftBackDoubletake != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(leftBackmove).hasClass("has_blue") || $(leftBackmove).hasClass("has_blueking")){
				if($(leftBacktake).attr('class') == "white_square startWhite available" || $(leftBacktake).attr('class') == "white_square startBlack available"){
					if($(leftBackDoubletakeStart).hasClass("has_blue") || $(leftBackDoubletakeStart).hasClass("has_blueking")){
						if($(leftBackDoubletake).attr('class') == "white_square startWhite" || $(leftBackDoubletake).attr('class') == "white_square startBlack"){
							$(leftBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}
				}
			}				
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(leftBackmove).hasClass("has_red") || $(leftBackmove).hasClass("has_redking")){
				if($(leftBacktake).attr('class') == "white_square startWhite available" || $(leftBacktake).attr('class') == "white_square startBlack available"){	
					if($(leftBackDoubletakeStart).hasClass("has_red") || $(leftBackDoubletakeStart).hasClass("has_redking")){
						if($(leftBackDoubletake).attr('class') == "white_square startWhite" || $(leftBackDoubletake).attr('class') == "white_square startBlack"){
							$(leftBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}						
		}

	}

	if(rightBacktake != 'na' && rightBackDoubletake != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(rightBackmove).hasClass("has_blue") || $(rightBackmove).hasClass("has_blueking")){
				if($(rightBacktake).attr('class') == "white_square startWhite available" || $(rightBacktake).attr('class') == "white_square startBlack available"){
					if($(rightBackDoubletakeStart).hasClass("has_blue") || $(rightBackDoubletakeStart).hasClass("has_blueking")){
						if($(rightBackDoubletake).attr('class') == "white_square startWhite" || $(rightBackDoubletake).attr('class') == "white_square startBlack"){
							$(rightBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}
				}
			}				
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(rightBackmove).hasClass("has_red") || $(rightBackmove).hasClass("has_redking")){
				if($(rightBacktake).attr('class') == "white_square startWhite available" || $(rightBacktake).attr('class') == "white_square startBlack available"){
					if($(rightBackDoubletakeStart).hasClass("has_red") || $(rightBackDoubletakeStart).hasClass("has_redking")){
						if($(rightBackDoubletake).attr('class') == "white_square startWhite" || $(rightBackDoubletake).attr('class') == "white_square startBlack"){
							$(rightBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}
				}
			}					
		}

	}

	if(rightMove != 'na' && doubletakeRightLeft != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){

			if($(rightMove).hasClass("has_blue") || $(rightMove).hasClass("has_blueking")){
				if($(takeRight).attr('class') == "white_square startWhite available" || $(takeRight).attr('class') == "white_square startBlack available"){
					if($(doubletakeRightLeftStart).hasClass("has_blue") || $(doubletakeRightLeftStart).hasClass("has_blueking")){
						if($(doubletakeRightLeft).attr('class') == "white_square startWhite" || $(doubletakeRightLeft).attr('class') == "white_square startBlack"){
							$(doubletakeRightLeft).addClass("available");
							movesAvailable++;
							
						}
					}	
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(rightMove).hasClass("has_red") || $(rightMove).hasClass("has_redking")){
				if($(takeRight).attr('class') == "white_square startWhite available" || $(takeRight).attr('class') == "white_square startBlack available"){
					if($(doubletakeRightLeftStart).hasClass("has_red") || $(doubletakeRightLeftStart).hasClass("has_redking")){
						if($(doubletakeRightLeft).attr('class') == "white_square startWhite" || $(doubletakeRightLeft).attr('class') == "white_square startBlack"){
							$(doubletakeRightLeft).addClass("available");
							movesAvailable++;

						}
					}	
				}
			}						
		}

	}

	if(leftMove != 'na' && doubletakeLeftRight != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(leftMove).hasClass("has_blue") || $(leftMove).hasClass("has_blueking")){
				if($(takeLeft).attr('class') == "white_square startWhite available" || $(takeLeft).attr('class') == "white_square startBlack available"){
					if($(doubletakeLeftRightStart).hasClass("has_blue") || $(doubletakeLeftRightStart).hasClass("has_blueking")){
						if($(doubletakeLeftRight).attr('class') == "white_square startWhite" || $(doubletakeLeftRight).attr('class') == "white_square startBlack"){
							$(doubletakeLeftRight).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(leftMove).hasClass("has_red") || $(leftMove).hasClass("has_redking")){
				if($(takeLeft).attr('class') == "white_square startWhite available" || $(takeLeft).attr('class') == "white_square startBlack available"){
					if($(doubletakeLeftRightStart).hasClass("has_red") || $(doubletakeLeftRightStart).hasClass("has_redking")){
						if($(doubletakeLeftRight).attr('class') == "white_square startWhite" || $(doubletakeLeftRight).attr('class') == "white_square startBlack"){
							$(doubletakeLeftRight).addClass("available");
							movesAvailable++;
						}
					}
				}
			}							
		}

	}
//-----------------------------

	if(leftBacktake != 'na' && leftRightBackDoubletake != 'na'){ 
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(leftBackmove).hasClass("has_blue") || $(leftBackmove).hasClass("has_blue")){
				if($(leftBacktake).attr('class') == "white_square startWhite available" || $(leftBacktake).attr('class') == "white_square startBlack available"){
					if($(leftRightBackDoubletakeStart).hasClass("has_blue") || $(leftRightBackDoubletakeStart).hasClass("has_blueking")){
						if($(leftRightBackDoubletake).attr('class') == "white_square startWhite" || $(leftRightBackDoubletake).attr('class') == "white_square startBlack"){
							$(leftRightBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(leftBackmove).hasClass("has_red") || $(leftBackmove).hasClass("has_redking")){
				if($(leftBacktake).attr('class') == "white_square startWhite available" || $(leftBacktake).attr('class') == "white_square startBlack available"){
					if($(leftRightBackDoubletakeStart).hasClass("has_red") || $(leftRightBackDoubletakeStart).hasClass("has_redking")){
						if($(leftRightBackDoubletake).attr('class') == "white_square startWhite" || $(leftRightBackDoubletake).attr('class') == "white_square startBlack"){
							$(leftRightBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}		
				}
			}					
		}

	}

	if(rightBacktake != 'na' && rightLeftBackDoubletake != 'na'){ //right take
		if($(start).hasClass("has_red") || $(start).hasClass("has_redking")){
			if($(rightBackmove).hasClass("has_blue") || $(rightBackmove).hasClass("has_blue")){
				if($(rightBacktake).attr('class') == "white_square startWhite available" || $(rightBacktake).attr('class') == "white_square startBlack available"){

					if($(rightBackDoubletakeStart).hasClass("has_blue") || $(rightBackDoubletakeStart).hasClass("has_blueking")){
						if($(rightBackDoubletake).attr('class') == "white_square startWhite" || $(rightBackDoubletake).attr('class') == "white_square startBlack"){
							$(rightBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}			
		}
		else if($(start).hasClass("has_blue") || $(start).hasClass("has_blueking")){
			if($(rightBackmove).hasClass("has_red") || $(rightBackmove).hasClass("has_redking")){
				if($(rightBacktake).attr('class') == "white_square startWhite available" || $(rightBacktake).attr('class') == "white_square startBlack available"){

					if($(rightLeftBackDoubletakeStart).hasClass("has_red") || $(rightLeftBackDoubletakeStart).hasClass("has_redking")){
						if($(rightLeftBackDoubletake).attr('class') == "white_square startWhite" || $(rightLeftBackDoubletake).attr('class') == "white_square startBlack"){
							$(rightLeftBackDoubletake).addClass("available");
							movesAvailable++;
						}
					}	
				}
			}						
		}

	}

	//	doubletakeLeftRight, doubletakeRightLeft, leftRightBackDoubletake, rightLeftBackDoubletake, doubletakeLeftRightStart, doubletakeRightLeftStart, leftRightBackDoubletakeStart, rightLeftBackDoubletakeStart);


}

function startRed(){ //Puts red pieces onto the top 8 white squares
	var squares = $(".white_square");
		for(var i=1; i<=squares.length; i++){
			if(i < 13)
				var id = '#' + i;
				$(id).addClass('has_red');
			}
}

function startBlue(){ //Puts blue pieces onto the bottom 8 white squares
	var squares = $(".white_square");
		for(var i=21; i<=squares.length; i++){
			if(i < 33)
				var id = '#' + i;
				$(id).addClass('has_blue');
			}
}

function changeTurn(color){
	if(color == 'red'){
		redTurn = true;
		blueTurn = false;
		$('#currentTurn').html("Red to move");
	}
	if(color == 'blue'){
		redTurn = false;
		blueTurn = true;
		$('#currentTurn').html("Black to move");
	}	
}

function checkAvailable(turn, ID, Class, direction){// this is used to check if a square clicked on is highlighted. If it is highlighted, it will move the piece and send the coordinates to the opponent.
	var theClass = Class;
	var newID = "#" + ID; //gets the class of the div clicked
	var secondTakeTrueFalse = false;
	if(turn == 'red'){
		var color = 'send redmove';
		var colorTake = 'send redtake';
	}
	else if(turn == 'blue'){
		var color = 'send bluemove';
		var colorTake = 'send bluetake';
	}
			if($(newID).hasClass("available")){ //if you click on a highlighted square, the start piece will be moved to the new position
			//checks the ID of the DIV clicked against the ID's of the various possible moves. If they match, the pieces are moved to that poisiton.
				if(newID == rightMove){
					if($(rightMove).hasClass('available')){
						movePiece(start, rightMove);
						socket.emit(color, {start: start, end: rightMove, user: opponent});
					}
				};
				if(newID == leftMove){
						if($(leftMove).hasClass('available')){
						movePiece(start, leftMove);
							socket.emit(color, {start: start, end: leftMove, user: opponent});			
					}					
				};
				if(newID == takeRight){
					if($(takeRight).hasClass('available')){
						movePiece(start, takeRight);
						socket.emit(colorTake, {start: start, end: takeRight, take:rightMove, secondtake: 'na', user: opponent});
						removePiece(rightMove);
					}					
				};
				if(newID == takeLeft){
					if($(takeLeft).hasClass('available')){
						movePiece(start, takeLeft);
						socket.emit(colorTake, {start: start, end: takeLeft, take:leftMove, secondtake: 'na', user: opponent});
						removePiece(leftMove);
					}					
				};	

				if(newID == rightBackmove){
					if($(rightBackmove).hasClass('available')){
						movePiece(start, rightBackmove);
						socket.emit(color, {start: start, end: rightBackmove, user: opponent});
					}
				};
				if(newID == leftBackmove){
						if($(leftBackmove).hasClass('available')){
						movePiece(start, leftBackmove);
						socket.emit(color, {start: start, end: leftBackmove, user: opponent});
					}					
				};
				if(newID == rightBacktake){
					if($(rightBacktake).hasClass('available')){
						movePiece(start, rightBacktake);
						socket.emit(colorTake, {start: start, end: rightBacktake, take: rightBackmove, secondtake: 'na', user: opponent});
						removePiece(rightBackmove);
					}					
				};
				if(newID == leftBacktake){
					if($(leftBacktake).hasClass('available')){
						movePiece(start, leftBacktake);
						socket.emit(colorTake, {start: start, end: leftBacktake, take: leftBackmove, secondtake: 'na', user: opponent});
						removePiece(leftBackmove);

					}					
				};



				if(newID == doubletakeRight){
					if($(doubletakeRight).hasClass('available')){
						movePiece(start, doubletakeRight);
						socket.emit(colorTake, {start: start, end: doubletakeRight, take: rightMove, secondtake: doubletakeRightStart, user: opponent});
						removePiece(rightMove);
						removePiece(doubletakeRightStart);
					}					
				};

				if(newID == doubletakeLeft){
					if($(doubletakeLeft).hasClass('available')){
						movePiece(start, doubletakeLeft);
						socket.emit(colorTake, {start: start, end: doubletakeLeft, take: leftMove, secondtake: doubletakeLeftStart, user: opponent});
						removePiece(leftMove);
						removePiece(doubletakeLeftStart);
					}					
				};	


				if(newID == leftBackDoubletake){
					if($(leftBackDoubletake).hasClass('available')){
						movePiece(start, leftBackDoubletake);
						socket.emit(colorTake, {start: start, end: leftBackDoubletake, take: leftBackmove, secondtake: leftBackDoubletakeStart, user: opponent});
						removePiece(leftBackmove);
						removePiece(leftBackDoubletakeStart);
					}					
				};

				if(newID == rightBackDoubletake){
					if($(rightBackDoubletake).hasClass('available')){
						movePiece(start, rightBackDoubletake);
						socket.emit(colorTake, {start: start, end: rightBackDoubletake, take: rightBackmove, secondtake: rightBackDoubletakeStart, user: opponent});
						removePiece(rightBackmove);
						removePiece(rightBackDoubletakeStart);
					}					
				};	


//------------------------------------
				if(newID == doubletakeRightLeft){

					if($(doubletakeRightLeft).hasClass('available') && $(takeRight).hasClass('available') && $(takeLeft).hasClass('available')){
						
							movePiece(start, doubletakeRightLeft);
							socket.emit(colorTake, {start: start, end: doubletakeRightLeft, take: rightMove, secondtake: doubletakeRightLeftStart, user: opponent});
							removePiece(rightMove);
							removePiece(doubletakeRightLeftStart);

					}

					else if($(doubletakeRightLeft).hasClass('available') && $(takeRight).hasClass('available')){
						movePiece(start, doubletakeRightLeft);
						socket.emit(colorTake, {start: start, end: doubletakeRightLeft, take: rightMove, secondtake: doubletakeRightLeftStart, user: opponent});
						removePiece(rightMove);
						removePiece(doubletakeRightLeftStart);
					}	
					else if($(doubletakeLeftRight).hasClass('available') && $(takeLeft).hasClass('available')){
						movePiece(start, doubletakeLeftRight);
						socket.emit(colorTake, {start: start, end: doubletakeLeftRight, take: leftMove, secondtake: doubletakeLeftRightStart, user: opponent});
						removePiece(leftMove);
						removePiece(doubletakeLeftRightStart);
					}				
				};


		
				if(newID == leftRightBackDoubletake){

					if($(leftRightBackDoubletake).hasClass('available') && $(leftBacktake).hasClass('available') && $(rightBacktake).hasClass('available')){
						movePiece(start, leftRightBackDoubletake);
						socket.emit(colorTake, {start: start, end: leftRightBackDoubletake, take: leftBackmove, secondtake: leftRightBackDoubletakeStart, user: opponent});
						removePiece(leftBackmove);
						removePiece(leftRightBackDoubletakeStart);
					}

					if($(leftRightBackDoubletake).hasClass('available')){
						movePiece(start, leftRightBackDoubletake);
						socket.emit(colorTake, {start: start, end: leftRightBackDoubletake, take: leftBackmove, secondtake: leftRightBackDoubletakeStart, user: opponent});
						removePiece(leftBackmove);
						removePiece(leftRightBackDoubletakeStart);
					}					
				

					if($(rightLeftBackDoubletake).hasClass('available')){
						movePiece(start, rightLeftBackDoubletake);
						socket.emit(colorTake, {start: start, end: rightLeftBackDoubletake, take: rightBackmove, secondtake: rightLeftBackDoubletakeStart, user: opponent});
						removePiece(rightBackmove);
						removePiece(rightLeftBackDoubletakeStart);
					}	
				};


					clearAvailable();
					updateWinningConditions();
				

			}
}

function goToLobby(){
	$('#checkerboard').css("visibility", "hidden");
	$('#lobby').css("display", "inherit");
	$('#lobbyText').css("display", "inherit");
	//$('#autoJoin').css("display", "inherit");
	$('#teamColour').html('');		
	socket.emit('toLobby', {user1: username, user2: opponent});
	waiting = false;
	$('#playInstructions').css("display", "inherit");
};

function showWinner(data){
	if(data == "red"){
		$('#winner').html("Red is the winner!");
		setTimeout(
			  function() 
			  {
			  	goToLobby();
			  	removeBoard();
			  	clearWinningConditions();
			  	$('#winner').html("");	
			  }, 4000);
	}
	else if(data == "blue"){
		$('#winner').html("Black is the winner!");
		setTimeout(
			  function() 
			  {
			  	goToLobby();
			  	removeBoard();
			  	clearWinningConditions();
			  	$('#winner').html("");			  	
			  }, 4000);		

	}
}

function updateWinningConditions(){
	var redMleft = checkMovesLeft('red'); // this section checks for winning conditions by creating variables that store the return values of the checkmoves and checkpieces functions.
	var blueMLeft = checkMovesLeft('blue');
	var redLeft = checkPiecesLeft('red');					
	var blueLeft = checkPiecesLeft('blue');
		if(redLeft == 0 || blueLeft == 0){
			redTurn == false;
			blueTurn == false;
			if(redLeft == 0){
				showWinner('blue');
			}
			else if(blueLeft == 0){
				showWinner('red');			
			}
		}
		else if(redMleft == 0 || blueMLeft == 0){
			redTurn == false;
			blueTurn == false;
			if(redMleft == 0){
				showWinner('blue');
			}
			else if(blueMLeft == 0){
				showWinner('red');
			}
		}
};	

function createBoard(){ //This loops through 1-32 (number of white squares needed) and creates the rows of the board.
	//$('#autoJoin').hide();
	$('#playInstructions').hide();
	$('#currentTurn').html("Red to move");
	$('#checkersInstructions').css("display", "inherit");
	$('#turnColour').css("display", "inherit");
	if(team == "blue"){
		for (var i = 1; i < 33; i++) {
			if(i <= 4 || i >= 9 && i <=12 || i >= 17 && i <= 20 || i >= 25 && i <= 28){ // each row has 8 squares (4 of each colour). 
				$('#checkerboard').append('<div class="white_square startWhite" id="' + i + '"></div><div class="black_square"></div>');
			} 
			else if(i >= 5 && i <= 8 || i >= 12 && i <= 16 || i >= 21 && i <= 24 || i >= 29 && i <= 32){ //Rows below each other need to start with different colours to create the checkerboard appearance.
				$('#checkerboard').append('<div class="black_square"></div><div class="white_square startBlack" id="' + i +'"></div>');
			}
		}	
	}
	else if(team == 'red'){
		for (var i = 32; i > 0; i--) {
			if(i <= 4 || i >= 9 && i <=12 || i >= 17 && i <= 20 || i >= 25 && i <= 28){ // each row has 8 squares (4 of each colour). 
				
				$('#checkerboard').append('<div class="black_square"></div><div class="white_square startBlack" id="' + i +'"></div>');
			} 
			else if(i >= 5 && i <= 8 || i >= 12 && i <= 16 || i >= 21 && i <= 24 || i >= 29 && i <= 32){ //Rows below each other need to start with different colours to create the checkerboard appearance.
				$('#checkerboard').append('<div class="white_square startWhite" id="' + i + '"></div><div class="black_square"></div>');
			}
		}	
	}
}

function removeBoard(){
	var el = document.getElementById('checkerboard');

	while ( el.firstChild ) el.removeChild( el.firstChild );

	$('#checkersInstructions').css("display", "none");
	$('#turnColour').css("display", "none");
}

function clearWinningConditions(){
	$('#redMovesLeft').html('');
	$('#blueMovesLeft').html('');
	$('#redPiecesLeft').html('');
	$('#bluePiecesLeft').html('');
}



// AUTO JOIN STUFF -------------------------------------------------------------------------------------



$('#autoJoin').click(function(){

	console.log("clicked it...");

	if(waiting == false){
		
		console.log("and something happened");
		socket.emit("userWaiting", {user: username});


	}
	waiting = true;
	


});








// recieve moves from the server and sets up connections with other players --------------------------------------------------------------------------------------------------------------------------------------------
function LoopAndCancelRequests(data){
	for (var i = 0; i < UserChallenges.length; i++) {
		var tempArrray = UserChallenges[i].split(" ");
		if(username == tempArrray[0] && data == tempArrray[1] || username == tempArrray[1] && data == tempArrray[0]){
			socket.emit("challenge cancel", {USER: tempArrray[0], OPPONENT: tempArrray[1]});
		}
	}	
}
//Updates client array with the players who are in games
socket.on('users playing', function(data){
	UsersInGame = [];
	for (var i = 0; i < data.length; i++) {
		UsersInGame.push(data[i]);
	}
});
//Updates the lobby with the list of users connected
socket.on('usernames', function(data){ 
	$('#playInstructions').show();
	$("#lobby").html("<p class='lobbyTitle'><i class='fa fa-users' id='userIcon'></i>Name</p><p class='lobbyTitle'><i class='fa fa-toggle-down' id='statusIcon'></i>Status</p></br>");
	

	$("#lobby").css("height", '318');// sets this css value
	for (var i = 0; i < data.length; i++) { //loops through and adds each user's nickname to the lobby.
		var rowClass;
		if(i == 0){
			rowClass = 'evenRow';
		}
		else if(i % 2 === 0){

			rowClass = 'evenRow';
		}
		else{
			rowClass = 'oddRow';
		}


		tempID = '#' + data[i] + 'name';
		$("#lobby").append("<p class='marked " + rowClass + "' id='"+ data[i]+ "name'>" + data[i] + "</p>");
		if($.inArray(data[i], UsersInGame) == -1){
			$("#lobby").append("<p class='lobbyStatus " + rowClass + "' id='" + data[i] + "status'>Ready to play</p></br>");
		}
		else{
			$("#lobby").append("<p class='lobbyStatus " + rowClass + "' id='" + data[i] + "status'>In a game</p></br>");
			$(tempID).addClass("inAGame");
			LoopAndCancelRequests(data[i]);
		}

	}
	if(UserChallenges.length > 0){
		for (var j = 0; j < UserChallenges.length; j++) {
			var tempChallenges = UserChallenges[j].split(" ");
			if(username == tempChallenges[0]){
				tempID = "#" + tempChallenges[1] + "id";
				tempStatusID = "#" + tempChallenges[1] + "status";
				$(tempID).addClass("challengeSent");
				$(tempStatusID).html("Challenge sent");

			}
			else if(username == tempChallenges[1]){
				tempID = "#" + tempChallenges[0] + "name";
				tempStatusID = "#" + tempChallenges[0] + "status";
				$(tempID).addClass("wantsToPlay");
				$(tempStatusID).html("Wants to play");
			}
		}
	}

	var name = '#' + username + 'name';
	$(name).addClass("thisUser")
	$(name).prepend('<i class="fa fa-star" id="thisUserIcon"></i>');
});
//Updates users lobby when challenged by another user
socket.on('challenge request', function(data){ 
	var messageBoxData = "#" + data + "status";
	$(messageBoxData).html('Wants to play');
	$("#lobby p").each(function(){
		var temp = $(this).html();
		if(temp == data){
			$(this).addClass("wantsToPlay");
		}
	});
});
//Updates the list of all challenges currently stored on the server
socket.on('all challenges', function(data){
	UserChallenges = [];
	for (var i = 0; i < data.length; i++) {
		UserChallenges.push(data[i]);
	}
});
//Creates the checkers board and starts the game
socket.on("initiate game", function(data){
	opponent = data;
	$('#checkerboard').css("visibility", "visible");
	$('#lobby').css("display", "none");
	$('#lobbyText').css("display", "none");
	$('#autoJoin').css("display", "none");
	team = "blue";
	changeTurn('red');
	createBoard();
	startBlue();
	startRed();
	enter.play();
	waiting == false;

});

socket.on("initiate game red", function(data){
	opponent = data;
	$('#checkerboard').css("visibility", "visible");
	$('#lobby').css("display", "none");
	$('#lobbyText').css("display", "none");
	$('#autoJoin').css("display", "none");
	team = "red";
	changeTurn('red');
	createBoard();
	startBlue();
	startRed();
	enter.play();
	waiting = false;
});

//Updates the positions of a red piece after it has been moved
socket.on('new redmove', function(data){
	movePiece(data.start, data.end);
	//changeTurn('blue');

	updateWinningConditions();
});
//Updates the positions of a blue piece after it has been moved
socket.on('new bluemove', function(data){
	movePiece(data.start, data.end);
	//changeTurn('red');
	updateWinningConditions();
});
//Updates the positions of a blue piece after it has taken a piece
socket.on('new bluetake', function(data){
	movePiece(data.start, data.end);
	removePiece(data.take);

	if(data.secondtake != "na"){
		removePiece(data.secondtake);
	}

	redTurn = true;
	changeTurn('red');
	updateWinningConditions();
});
//Updates the positions of a red piece after it has taken a piece
socket.on('new redtake', function(data){
	movePiece(data.start, data.end);
	removePiece(data.take);
	if(data.secondtake != "na"){
		removePiece(data.secondtake);
	}
	changeTurn('blue');
	updateWinningConditions();
});
//Updates the userChallenges list and checks if it is relevant to the local client, then requests a username update
socket.on('cancelled', function(data){
	var tempChallenge = data.user1 + " " + data.user2;
	var tempChallenge2 = data.user2 + " " + data.user1;
	var index = UserChallenges.indexOf(tempChallenge);
	var index2 = UserChallenges.indexOf(tempChallenge2);
		if (index > -1) {
		    UserChallenges.splice(index, 1);
		}	
		if (index2 > -1) {
		    UserChallenges.splice(index2, 1);
		}	
	socket.emit('update usernames');
});
//Checks if a disconnected user was the opponent. If it is, it takes them back to the lobby.
socket.on('user left', function(data){
	if(typeof opponent !== 'undefined' && opponent == data){
		removeBoard();
		goToLobby();
		clearWinningConditions();
	}
	LoopAndCancelRequests(data);

});





$('#submitName').click(function(){
	username = $('#nickname').val();
	socket.emit('new user', $('#nickname').val(), function(data){
		if(data){
			if(username.length > 0 && username.length < 11){
				$('#nickError').html("");
				$('#nickWrap').css("display", "none");
				$('#lobby').css("visibility", "visible");
				$('#lobbyText').css("display", "inherit");	
				$('#autoJoin').css("display", "inherit");				
			}			
		} else{
			$('#nickError').html("Please enter a different username.");
		}

	});
	$('#nickname').val('');
});

$("#lobby").on("click", ".marked", function(){
	
	opponent = $(this).html();
	var alreadySent;
	if($(this).hasClass("wantsToPlay") == true){
		alreadySent = true;
	}
	else{
		alreadySent = false;
	}

	if($(this).hasClass('thisUser') == false){

		if($(this).hasClass('wantsToPlay')){ //checking if it's green
			$('#checkerboard').css("visibility", "visible");
			$('#lobby').css("display", "none");
			$('#lobbyText').css("display", "none");
			socket.emit("challenge accepted", {challenger: username, user: opponent});
			team = "red";
			createBoard();
			redTurn = true;
			blueTurn = false;
			startRed();
			startBlue();
			enter.play();
		}
		else if($(this).hasClass("inAGame") == false){ //if it isn't red
			$(this).addClass('challengeSent')
			var tempStatusID = $(this).attr("id");
			tempStatusID = tempStatusID.split("n")[0];
			tempStatusID = "#" + tempStatusID + "status";
			$(tempStatusID).html("Challenge sent");

			if(alreadySent == false){ //if it wasnt already orange
				socket.emit("game request", {challenger: username, user: opponent});
			}
		}
	}

});

$("#checkerboard").on("click", ".black_square", function(){ //if a black square is clicked it will remove any highlighted squares.
	clearAvailable();
});

$("#checkerboard").on("click", ".white_square", function(){ //Manages all clicks that a user makes on white squares of the board
	var id = $(this).attr('id'); //Gets the id of the div clicked
	var theClass = $(this).attr('class'); //gets the class of the div clicked
	//Printing these makes development easier
	console.log("The class: " + theClass); 
	console.log("The ID: " + id);

	if($(this).hasClass('available') == false){ //If a div that isn't highlighted is clicked, it will remove all highlights
			clearAvailable();
	}
	if(redTurn === true && team == "red"){
		if($(this).hasClass("available")){
			checkAvailable('red', id, theClass); //if the square is highlighted, it runs the 'checkAvailable' class which moves the essentially moves the piece.
		}
		else if($(this).hasClass("has_red") || $(this).hasClass("has_redking")){	
			allRedMoves(id, theClass); //passes the id into the allRedMoves function which calls the calcCoords function.
		}
	}
	else if(blueTurn === true && team == "blue"){
		if($(this).hasClass("available")){
			checkAvailable('blue', id, theClass); //if the square is highlighted, it runs the 'checkAvailable' class which moves the essentially moves the piece.				
		}

		else if($(this).hasClass("has_blue") || $(this).hasClass("has_blueking")){
			allBlueMoves(id, theClass); //passes the id into the allRedMoves function which calls the calcCoords function.
		}
	}
});

$("#ruleBtn").click(function(){
	hideLobbyText();
});
$("#gameInstructionBtn").click(function(){
	hideGameInstructions();
});

});




/*


--------------------------------------------------------------

youtube video for processing turns??

*/

var http = require('http');

var express = require('express'),

users = {

};

UsersInGame = [];
UserChallenges = [];
autojoin = [];


var app = express();

var server = http.createServer(app);

io = require('socket.io').listen(server)
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendfile(__dirname + '/checkers.html');
});



server.listen(3000);
console.log('Ready to work');
io.sockets.on('connection', function(socket){

	function emitBaseData(){
		io.sockets.emit('all challenges', UserChallenges);
		io.sockets.emit('users playing', UsersInGame);						
		io.sockets.emit('usernames', Object.keys(users));
	}
	function updateArrays(data){
		var index = UsersInGame.indexOf(socket.nickname);
			if (index > -1) {
			    UsersInGame.splice(index, 1);
			}	
	}
	//updates list of users in a game and emits the new data to all users.
	socket.on('toLobby', function(data){
		updateArrays(data);		
		io.sockets.emit('users playing', UsersInGame);						
		io.sockets.emit('usernames', Object.keys(users));
	});
	//Checks if the username is valid. If it is, it calls back as true and updates the lobby.
	socket.on('new user', function(data, callback){
		if(data in users || data.length < 1 || data.length > 10 || data.includes(' ')){
			callback(false);

		}
		else{
			callback(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			emitBaseData();
		}
	});
	//Sends an update for the usernames in the lobby.
	socket.on('update usernames', function(){
		
		io.sockets.emit('usernames', Object.keys(users));
	});
	//Sends a challenge request to a a user from its sender. Updates the userChallenges array.
	socket.on('game request', function(data){
		var opponent = data.user;
		var challenger = data.challenger;
		var challenge = challenger + " " + opponent;
		UserChallenges.push(challenge);
		users[opponent].emit('challenge request', challenger);
		io.sockets.emit('all challenges', UserChallenges);
	});
	//Removes users from the userChallenges array when they enter a game.
	socket.on('challenge accepted', function(data){
		console.log("challenge is accepted");
		var opponent = data.user;
		var challenger = data.challenger;
		users[opponent].emit('initiate game', challenger);
		var challengeID = opponent + " " + challenger;
		var challengeID2 = challenger + " " + opponent;
		var index = UserChallenges.indexOf(challengeID);
		var index2 = UserChallenges.indexOf(challengeID2);
			if (index > -1) {
		    	UserChallenges.splice(index, 1);
			}
			if (index2 > -1) {
		    	UserChallenges.splice(index2, 1);
			}
		
		
		UsersInGame.push(opponent);
		UsersInGame.push(challenger);
		io.sockets.emit('users playing', UsersInGame);
		io.sockets.emit('usernames', Object.keys(users));
	});
	//Removes a chellenge request from the server UserChallenges array and sends an update to the clients.
	socket.on('challenge cancel', function(data){
		var username = data.USER;
		var opponent = data.OPPONENT;
		for (var i = 0; i < UserChallenges.length; i++) {
			var str = username + " " + opponent;
			var str2 = opponent + " " + username;

			if(str == UserChallenges[i]){
				var index = UserChallenges.indexOf(UserChallenges[i]);
				UserChallenges.splice(index, 1);
			}
			else if(str2 == UserChallenges[i]){
				var index = UserChallenges.indexOf(UserChallenges[i]);
				UserChallenges.splice(index, 1);
			}

		}
		if(username in users){

			io.sockets.emit('cancelled', {user1: opponent, user2: username});

		}
		else if(opponent in users){
			io.sockets.emit('cancelled', {user1: opponent, user2: username});
		}
	});
	//Sends red piece moves to the users opponent
	socket.on('send redmove', function(data){
		var opponent = data.user;
		users[opponent].emit('new redmove', data);
	});
	//Sends blue piece moves to the users opponent
	socket.on('send bluemove', function(data){
		var opponent = data.user;
		users[opponent].emit('new bluemove', data);
	});
	//Sends blue piece take to the users opponent
	socket.on('send bluetake', function(data){
		var opponent = data.user;
		users[opponent].emit('new bluetake', data);
	});	
	//Sends red piece take to the users opponent
	socket.on('send redtake', function(data){
		var opponent = data.user;
		users[opponent].emit('new redtake', data);
	});	
	//Removes the user from the users array and sends an update to all users.
	socket.on('disconnect', function(data){
		delete users[socket.nickname];
		updateArrays(socket.nickname);
	 	emitBaseData();
		io.sockets.emit('user left', socket.nickname);	
	});




	socket.on('userWaiting', function(data){
		
		autojoin.push(data.user);

		console.log(autojoin);

		var player1 = autojoin[0];
		var player2 = autojoin[1];

		var challengesToDelete = [];

		if(autojoin.length > 1){

				length = UserChallenges.length;

				for (var i = 0; i < length; i++) {
					console.log(UserChallenges[i]);

					var pos1 = UserChallenges[i].split(" ")[0];
					var pos2 = UserChallenges[i].split(" ")[1];
					
					if(player1 == pos1 || player1 == pos2){
						challengesToDelete.push(UserChallenges[i]);
						console.log("Delete this one");						
					}

					else if(player2 == pos1 || player2 == pos2){
						challengesToDelete.push(UserChallenges[i]);
						console.log("Delete this one instead");
					}


				}

				for (var i = 0; i < challengesToDelete.length; i++) {
					UserChallenges.splice(UserChallenges[i], 1);
				}			
			
			users[player1].emit('initiate game', player2);
			users[player2].emit('initiate game red', player1);
			UsersInGame.push(player1);
			UsersInGame.push(player2);
			io.sockets.emit('users playing', UsersInGame);
			io.sockets.emit('usernames', Object.keys(users));


			autojoin.splice(0, 2);

		}
	

		//io.sockets.emit('user left', socket.nickname);	
	});

});


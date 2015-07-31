var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('login');
});

app.get('/chat', function(req, res){
    res.render('chatScreen');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *: 3000');
});

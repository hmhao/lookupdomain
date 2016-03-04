var server = require('http').createServer()
    ,sio = require('socket.io')(server)
    ,path = require('path')
    ,fs = require('fs');

var port = process.argv[2] || 3000,
    outputDir = __dirname,
    outputFile = path.join(outputDir, 'domain', port);

sio.on('connection', function (socket) {
    console.log('connection');
    socket.on('domain', function(result){
        console.log(result);
        var data = JSON.stringify({domain:result});
        fs.writeFile(outputFile, data, function (err) {
            if (err) throw err;
            console.log(outputFile + ' is saved!');
        });
    });
});

server.on('error', function onError(error) {
    console.error(error.syscall);
    console.error(error.code);
});
server.on('listening', function onListening() {
    console.log('Listening on ' + port);
});

server.listen(port);
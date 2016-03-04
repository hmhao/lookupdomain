var sioc = require('socket.io-client');

function Lookup(uri){
    if(!uri){
        return console.error('server uri is not available.');
    }
    this.uri = uri;
    this.create();
}

/*创建连接*/
Lookup.prototype.create = function () {
    this.client = sioc(this.uri,{reconnect:false});
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('error', this.onError.bind(this));
    this.client.on('disconnect', this.onDisconnect.bind(this));
};

/*连接成功*/
Lookup.prototype.onConnect = function(){
    console.log('connect:' + this.uri);
    this.client.emit('domain', this.uri);
    this.client.close();
};

/*连接错误*/
Lookup.prototype.onError = function () {
    console.error('connect error:' + this.uri);
};

/*连接断开*/
Lookup.prototype.onDisconnect = function () {
    console.log('disconnect:' + this.uri);
};

var domainLen = 8;
var index = 1;
function start(){
    new Lookup('http://ping'+index+'.ichat.com:'+(3000+ index));
    ++index;
    if(index <= domainLen){
        process.nextTick(start);
    }
}
start();
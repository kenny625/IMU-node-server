var serial = require( "serialport" );
var SerialPort = serial.SerialPort;
var io = require('socket.io').listen(8001);
var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/test.txt';
var sys = require('sys');
var exec = require('child_process').exec;
var child;


child = exec("ls", function (error, stdout, stderr){
    sys.print('stdout: ' + stdout);
    if(error !== null) {
        console.log('exec error: ' + error);
    }
});

io.sockets.on('connection', function (socket) {
//    setInterval(function(){}, 2000);
     sp.on( "data", function ( data ) {
//            console.log( data );
         socket.emit('sensorValue', data);
            
        } );
  
  
});
 
// Replace with the device name in your machine.
var portName = "/dev/tty.usbmodem1411";
 
var sp = new SerialPort( portName, {
    baudrate:57600,
    parser  :serial.parsers.readline( "\n" )
} );

function writeToFile(data) {
   fs.writeFile(filepath, data, function(err) {
        if(err) {
            console.error("Could not write file: %s", err);
        }
    }); 
}


var serial = require( "serialport" );
var SerialPort = serial.SerialPort;
var io = require('socket.io').listen(8001);
io.set('log level', 1);
var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var sys = require('sys');
var exec = require('child_process').exec;
var child;


//child = exec("ls", function (error, stdout, stderr){
//    sys.print('stdout: ' + stdout);
//    if(error !== null) {
//        console.log('exec error: ' + error);
//    }
//});

io.sockets.on('connection', function (socket) {
//    setInterval(function(){}, 2000);
     sp1.on( "data", function ( data ) {
//            console.log( data );
         socket.emit('sensorValue1411', data);
            
        } );
    sp2.on( "data", function ( data ) {
//            console.log( data );
         socket.emit('sensorValue1421', data);
            
        } );
  socket.on('filename', function (data) {
      if(data != ""){
        filepath = filepath + data.filename;
          writeToFile("");
      }else{
        console.log("no filename");
      }
    console.log(data);
  });
  socket.on('record', function (data) {
      appendToFile(data.record + "\n");
  });
    
});
 
// Replace with the device name in your machine.
var portName1 = "/dev/tty.usbmodem1411";
var portName2 = "/dev/tty.usbmodem1421";
 
var sp1 = new SerialPort( portName1, {
    baudrate:57600,
    parser  :serial.parsers.readline( "\n" )
} );
var sp2 = new SerialPort( portName2, {
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

function appendToFile(data) {
   fs.appendFile(filepath, data, function(err) {
        if(err) {
            console.error("Could not append file: %s", err);
        }
    }); 
}

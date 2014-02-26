var serial = require("serialport");
var SerialPort = serial.SerialPort;
var io = require('socket.io').listen(8001);
io.set('log level', 1);
var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var sys = require('sys');
var exec = require('child_process').exec;
var child;
var start = false;
var testData;

io.sockets.on('connection', function (socket) {
    //    setInterval(function(){}, 2000);
    sp1.on("data", function (data) {
        //            console.log( data );
        socket.emit('sensorValue1411', data);

    });
    sp2.on("data", function (data) {
        //            console.log( data );
        socket.emit('sensorValue1421', data);

    });
    socket.on('modelname', function (data) {
        if (data != "") {
            filepath = filepath + data.modelname;
            start = true;
        } else {
            console.log("no modelname");
        }
        console.log(data);
    });
    socket.on('record', function (data) {
        if (start == true) {
            writeToFile(data.record);
            console.log(fs.readFileSync("/Volumes/RamDisk/libsvm-3.17/test2").toString());
            child = exec("/Volumes/RamDisk/libsvm-3.17/svm-predict /Volumes/RamDisk/libsvm-3.17/test2 /Volumes/RamDisk/libsvm-3.17/test1.model /Volumes/RamDisk/libsvm-3.17/test1.out", function (error, stdout, stderr) {
                console.log(fs.readFileSync("/Volumes/RamDisk/libsvm-3.17/test1.out").toString().split('\n')[0]);
                socket.emit('result', { result: fs.readFileSync("/Volumes/RamDisk/libsvm-3.17/test1.out").toString().split('\n')[0] });
                //                            sys.print('stdout: ' + stdout);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });

        }
    });

});

// Replace with the device name in your machine.
var portName1 = "/dev/tty.usbmodem1411";
var portName2 = "/dev/tty.usbmodem1421";

var sp1 = new SerialPort(portName1, {
    baudrate: 57600,
    parser: serial.parsers.readline("\n")
});
var sp2 = new SerialPort(portName2, {
    baudrate: 57600,
    parser: serial.parsers.readline("\n")
});

function writeToFile(data) {
    fs.writeFileSync("/Volumes/RamDisk/libsvm-3.17/test2", data);
}

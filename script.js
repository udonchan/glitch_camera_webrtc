var _video_element;
var _canvas;
var _glitch_view;
var _jpeg_quality = 10;
var _glitch_amount = 5;

function applyGlitch(src, c) {
    var bin = atob(src).split("");
    for (var i = 0; i < c; i++) 
	bin[Math.floor(Math.random() * bin.length)] =
	    String.fromCharCode((Math.floor(Math.random()* 255) - 127) & 0xff);
    return btoa(bin.join(''));
}

function successHandler(stream) {
    this._video_element.src = window.webkitURL.createObjectURL(stream);
    setInterval(function () {
	    _canvas.width = _video_element.videoWidth;
	    _canvas.height = _video_element.videoHeight;
	    var context = _canvas.getContext('2d');
	    context.drawImage(_video_element, 0, 0);
	    //context.drawImage(_video_element, _canvas.width * Math.random() - _canvas.width / 2, _canvas.height * Math.random() - _canvas.height / 2, _canvas.width * Math.random() * 2, _canvas.height * Math.random() * 2);
	    _glitch_view.src = 'data:image/jpeg;base64,' + applyGlitch(_canvas.toDataURL('image/jpeg', _jpeg_quality).split(',')[1], _glitch_amount);
	}, 33);
}
    
function errorHandler(error) {
    console.log(error);
}

setTimeout(function() {
	if (!navigator.webkitGetUserMedia) {
	    alert("This site rquires WebRTC. Please get Chrome Canary and set MediaStream available.");
	} else {
	    _video_element = document.createElement("video");
	    _video_element.play();
	    _canvas = document.createElement("canvas");
	    _glitch_view = document.getElementById("glitch_view");
	    navigator.webkitGetUserMedia("video",
					 function(stream){successHandler(stream)},
					 function(error){errorHandler(srror)}
		);
	}
    },1);

    

    

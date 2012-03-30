var _video_element;
var _canvas;
var _glitch_view;
var _jpeg_quality = 0.03;
var _glitch_amount = 3;

setTimeout(function() {
    _video_element = document.getElementById("video");
    _canvas = document.getElementById("dest");
    _glitch_view = document.getElementById("glitch_view");
    _video_element.style.display = "none";
    _canvas.style.display = "none";
    navigator.webkitGetUserMedia("video", successHandler, errorHandler);
},1);

successHandler = function (stream) {
    this._video_element.src = window.webkitURL.createObjectURL(stream);
    setInterval(draw, 33);
    
}

errorHandler = function(error) {
    alert("This site rquires WebRTC. Please get Chrome Canary and set MediaStream available.");
}

draw = function () {
    _canvas.width = _video_element.videoWidth;
    _canvas.height = _video_element.videoHeight;
    var context = _canvas.getContext('2d');
    context.drawImage(_video_element, 0, 0);
//    context.drawImage(_video_element, _canvas.width * Math.random() - _canvas.width / 2, _canvas.height * Math.random() - _canvas.height / 2, _canvas.width * Math.random() * 2, _canvas.height * Math.random() * 2);
    _glitch_view.src = 'data:image/jpeg;base64,' + applyGlitch(_canvas.toDataURL('image/jpeg', _jpeg_quality).split(',')[1], _glitch_amount);
}

function applyGlitch(src, c) {
    var bin = atob(src).split("");
    for (var i = 0; i < c; i++) 
	bin[Math.floor(Math.random() * bin.length)] =
	String.fromCharCode(Math.floor(Math.random()* 127) & 0xff);
    return btoa(bin.join(''));
}

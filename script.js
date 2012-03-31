var _video_element;
var _canvas;
var _glitch_view;

var _draw_interval = 30; /* fps */
var _jpeg_quality = 5; /* 0 - 10 */
var _glitch_amount = 5;

setTimeout(function() {
    if (!navigator.webkitGetUserMedia) {
	alert("This site rquires WebRTC. Please get Chrome Canary and set MediaStream available.");
    } else {
	_video_element = document.createElement("video");
	_video_element.play();
	_canvas = document.createElement("canvas");
	_glitch_view = document.getElementById("glitch_view");

        initControlForm()
	navigator.webkitGetUserMedia("video",
				     function(stream){successHandler(stream)},
				     function(error){errorHandler(srror)}
				    );
    }
},1);

function initControlForm() {
    document.control_form.draw_interval.value = _draw_interval;
    document.control_form.draw_interval.type = "range";
    document.control_form.draw_interval.min = 0.5;
    document.control_form.draw_interval.max = 30;
    document.control_form.draw_interval.step = 0.1;
    document.control_form.draw_interval.onchange = function(){
	document.getElementById("draw_interval_label").innerHTML = _draw_interval = document.control_form.draw_interval.value;
    };
    document.getElementById("draw_interval_label").innerHTML = document.control_form.draw_interval.value;
    
    document.control_form.jpeg_quality.value = _jpeg_quality;
    document.control_form.jpeg_quality.type = "range";
    document.control_form.jpeg_quality.min = 0;
    document.control_form.jpeg_quality.max = 10;
    document.control_form.jpeg_quality.step = 0.01;
    document.control_form.jpeg_quality.onchange = function(){
	document.getElementById("jpeg_quality_label").innerHTML = _jpeg_quality = document.control_form.jpeg_quality.value;
    }; 
    document.getElementById("jpeg_quality_label").innerHTML = document.control_form.jpeg_quality.value;
    
    document.control_form.glitch_amount.value = _glitch_amount;
    document.control_form.glitch_amount.type = "range";
    document.control_form.glitch_amount.min = 0;
    document.control_form.glitch_amount.max = 30;
    document.control_form.glitch_amount.step = 1;
    document.control_form.glitch_amount.onchange = function(){
	document.getElementById("glitch_amount_label").innerHTML = _glitch_amount = document.control_form.glitch_amount.value;
    };
    document.getElementById("glitch_amount_label").innerHTML = document.control_form.glitch_amount.value;
}

function applyGlitch(src, c) {
    var bin = atob(src).split('');
    for (var i = 0; i < c; i++) 
	bin[Math.floor(Math.random() * bin.length)] =
	    String.fromCharCode((Math.floor(Math.random() * 255) - 128) & 0xff);
    return btoa(bin.join(''));
}

function successHandler(stream) {
    this._video_element.src = window.webkitURL.createObjectURL(stream);
    draw();
}

function draw() {
    _canvas.width = _glitch_view.width = _video_element.videoWidth;
    _canvas.height = _glitch_view.height = _video_element.videoHeight;
    var context = _canvas.getContext('2d');
    context.drawImage(_video_element, 0, 0);
    //context.drawImage(_video_element, _canvas.width * Math.random() - _canvas.width / 2, _canvas.height * Math.random() - _canvas.height / 2, _canvas.width * Math.random() * 2, _canvas.height * Math.random() * 2);
    _glitch_view.src = 'data:image/jpeg;base64,' +
	applyGlitch(_canvas.toDataURL('image/jpeg', _jpeg_quality).split(',')[1],
		    _glitch_amount);
    setTimeout(function(){draw();}, 1000.0 / _draw_interval);
}
    
function errorHandler(error) {
    console.log(error);
}

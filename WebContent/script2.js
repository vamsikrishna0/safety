
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};
		
		
	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	document.getElementById("snap").addEventListener("click", function() {
		context.drawImage(video, 0, 0, 640, 480);
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		
		link_str = image.src.split(",")[1]
		$.ajax({
		    url: "/:8080",
		    type: "post",
		    datatype:"json",
		    data: {
		        "link": link_str
		    },
		    success: function(response){
		        image_url = response.message;
                       image_url =  image_url.substr(2);	
		        recognizeFunction("ec2-52-34-235-167.us-west-2.compute.amazonaws.com"+image_url);
		    }
		});
	});
}, false);




function recognizeFunction(image_url) {
	var request = new XMLHttpRequest();
request.open('POST', 'https://api.kairos.com/recognize');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('app_id', '4985f625');
request.setRequestHeader('app_key', '4423301b832793e217d04bc44eb041d3');
request.onreadystatechange = function () {
 if (this.readyState === 4) {
 var message=this.responseText;
 var obj = JSON.parse(message);
 if((obj.images[0].transaction.status) == "success"){
location.href="enroll.html";
 }else{
document.getElementById("demo").innerHTML = "Hey there! You need permission!";
}
 }
};
var body = {
 'image': 'image_url',
 'gallery_name': 'TestSRKGallery',
};
request.send(JSON.stringify(body));
}


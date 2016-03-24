$(document).ready(function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");


    function doCanvas() {
        /* draw something */
        var background = new Image();
        background.setAttribute('crossOrigin', 'anonymous');
        background.src = "images/test2.jpg";

        background.onload = function(){
            ctx.drawImage(background,0,0);
            ctx.font = '10px sans-serif';
            ctx.fillText('Hello World', 0, 0);
        };
    }
    function downloadCanvas(link, canvasId, filename) {
        var canvas = document.getElementById("myCanvas");
        link.href = canvas.toDataURL("image/png");
        var urlData = canvas.toDataURL("image/png");
        link.download = filename;
    }


    document.getElementById('btn-download').addEventListener('click', function() {
        downloadCanvas(this, 'myCanvas', 'test.png');
    }, false);

    // doCanvas();
});
function readURL(input) {
    var dataUrl = '';
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            dataUrl = e.target.result;
            var background = new Image();
            background.setAttribute('crossOrigin', 'anonymous');
            background.src = dataUrl;
            background.onload = function(){
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.drawImage(background,10,10,250,125);
                ctx.font = '20px sans-serif';
                ctx.fillText('Hello World', 10, c.height / 2 - 15);
            };
        };
        reader.readAsDataURL(input.files[0]);
    }
}

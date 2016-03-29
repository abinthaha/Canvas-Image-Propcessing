$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    $('#image_url').change(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                dataUrl = e.target.result;
                var canvas = document.getElementById("canvas");
                var background = new Image();
                background.setAttribute('crossOrigin', 'anonymous');
                background.src = dataUrl;
                background.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    $('canvas').drawImage({
                        layer: true,
                        source: background,
                        x: 0,
                        y: 0,
                        width: 800,
                        height: 800
                    });
                };
            };
            reader.readAsDataURL(input.files[0]);
        }
    })

    function downloadCanvas(link, canvasId, filename) {
        var canvas = document.getElementById("canvas");
        var urlData = canvas.toDataURL("image/png");
        //Now the backend call should happen
    }
    document.getElementById('btn-download').addEventListener('click', function() {
        var name = $('#saveName').val();
        downloadCanvas(this, 'canvas', name);
    }, false);

    var texts = [];
    function draw() {
        var text = texts[0];
        $('canvas').addLayer({
            type: 'text',
            name: 'textBox',
            fillStyle: '#39CCCC',
            strokeStyle: '#001f3f',
            strokeWidth: 2,
            draggable: true,
            index: 1,
            fontSize: 48,
            fontFamily: 'Verdana, sans-serif',
            text: text.text,
            x: text.x,
            y: text.y,
        }).drawLayers();
    }

    $("#submit").click(function() {
        var text = {
            text: $("#theText").val(),
            x: 100,
            y: 100
        };
        ctx.font = "16px verdana";
        text.text = $('#thetext').val();
        text.width = ctx.measureText(text.text).width;
        text.height = 16;
        texts.push(text);
        draw();
    });
});

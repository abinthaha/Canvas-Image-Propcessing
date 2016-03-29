$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    $('#image_url').change(function() {
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
        $('canvas').removeLayer('textBox');
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
            x: 200,
            y: 200
        }).drawLayers();
    }

    $("#submit").click(function() {
        var text = {
            text: $("#theText").val(),
            x: 100,
            y: 100
        };
        texts = [];
        text.text = $('#thetext').val();
        texts.push(text);
        draw();
    });
});

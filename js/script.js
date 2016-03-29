$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var fileName;
    var myFirebaseRef = new Firebase("https://sample-app2.firebaseio.com/CanvasImage");

    $('#image_url').change(function() {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            fileName = input.files[0].name;
            fileName = 'cip - ' + fileName.split('.')[0];
            reader.onload = function(e) {
                dataUrl = e.target.result;
                drawImage(dataUrl);
            };
            reader.readAsDataURL(input.files[0]);
        }
    })
    var drawImage = function(dataUrl) {
        var canvas = document.getElementById("canvas");
        var background = new Image();
        background.setAttribute('crossOrigin', 'anonymous');
        background.src = dataUrl;
        var iHeight = background.height,
            iWidth = background.width;

        background.onload = function() {
            $('canvas').drawImage({
                layer: true,
                source: background,
                swidth: iWidth,
                sheight: iHeight,
                x: 200,
                y: 200,
                width: iWidth ,
                height: iHeight
            });
        };
    }
    function downloadCanvas(link, canvasId) {
        var canvas = document.getElementById("canvas");
        var urlData = canvas.toDataURL("image/png");
        var Result = Math.floor((Math.random() * 100) + 1);
        myFirebaseRef.push({
            id: Result,
            name: fileName,
            dataUrl: urlData
        }, function(error) {
            if (error) {
                alert("Data could not be saved.");
            } else {
                alert('File saved with Id ' + Result + ' Save this for future use')
            }
        });
        //Now the backend call should happen
    }
    document.getElementById('btn-download').addEventListener('click', function() {
        downloadCanvas(this, 'canvas');
    }, false);
    $('#retrieve_button').on('click', function() {
        var id = $('#receive_id').val();
        myFirebaseRef.on('value', function(snapShot){
            snapShot.forEach(function(singleData) {
                var data = singleData.val();
                if(data.id == id) {
                    drawImage(data.dataUrl);
                }
            })
        }, function(error) {
            if (error) {
                console.log('Cannot get');
            } else {
                console.log('got it');
            }
        })
    })

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

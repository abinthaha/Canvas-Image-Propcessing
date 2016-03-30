$(document).ready(function() {

    /**Variable Initializations*/
    var canvas = document.getElementById("canvas"),
        fileName,
        texts = [],
        myFirebaseRef = new Firebase("https://sample-app2.firebaseio.com/CanvasImage");

    /** Uploading an Image on clicking the input type*/

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

    /**This function is used to draw the Image on the Canvas*/

    var drawImage = function(dataUrl) {
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

    /**The saving of Canvas as an Image in Firebase is happening here*/

    $('#btn-download').on('click', function(){
        var urlData = canvas.toDataURL("image/png"),
            Result = Math.floor((Math.random() * 100) + 1);
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
    });

    /**On clicking the draw button, this function is being called*/

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

    /**This function is used to retreive an already saved Image from firebase*/

    $('#retrieve_button').on('click', function() {
        var id = $('#receive_id').val();
        myFirebaseRef.on('value', function(snapShot){
            var flag = true;
            snapShot.forEach(function(singleData) {
                var data = singleData.val();
                if(data.id == id) {
                    drawImage(data.dataUrl);
                    flag = false;
                }
            })
            if (flag) {
                alert('The Image with the ID you entered cannot be find from the Firebase, Check the ID')
            }
        }, function(error) {
            if (error) {
                console.log('Cannot get' +error);
            } else {
                console.log('got it');
            }
        })
    })
});

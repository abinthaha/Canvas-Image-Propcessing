$(document).ready(function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");


    $('#image_url').change(function(){
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                dataUrl = e.target.result;
                // var imgcanvas = document.getElementById("ImgCanvas");
                // var cntx = imgcanvas.getContext("2d");
                var background = new Image();
                background.setAttribute('crossOrigin', 'anonymous');
                background.src = dataUrl;
                background.onload = function(){
                    // cntx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
                    $('canvas').drawImage({
                        source: background,
                        x: 50, y: 50,
                        width: 160,
                        height: 200,
                        fromCenter: false
                    });
                    // $('canvas').addLayer({
                    //     type: 'image',
                    //     source: background,
                    //     x: 50, y: 50,
                    //     width: 160,
                    //     height: 200,
                    //     fromCenter: false
                    // });
                };
            };
            reader.readAsDataURL(input.files[0]);
        }
    })


    // variables used to get mouse position on the canvas
    var $canvas = $("#canvas");
    var canvasOffset = $canvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var scrollX = $canvas.scrollLeft();
    var scrollY = $canvas.scrollTop();

    // variables to save last mouse position
    // used to see how far the user dragged the mouse
    // and then move the text by that distance
    var startX;
    var startY;

    // an array to hold text objects
    var texts = [];

    // this var will hold the index of the hit-selected text
    var selectedText = -1;




    // clear the canvas & redraw all texts
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            ctx.fillText(text.text, text.x, text.y);
            // $('canvas').drawText({
            //     // type: 'text',
            //     x: text.x,
            //     y: text.y,
            //     text: text.text
            // });
        }
    }

    // test if x,y is inside the bounding box of texts[textIndex]
    function textHittest(x, y, textIndex) {
        var text = texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - 	text.height && y <= text.y);
    }

    // handle mousedown events
    // iterate through texts[] and see if the user
    // mousedown'ed on one of them
    // If yes, set the selectedText to the index of that text
    function handleMouseDown(e) {
        e.preventDefault();
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);
        // Put your mousedown stuff here
        for (var i = 0; i < texts.length; i++) {
            if (textHittest(startX, startY, i)) {
                selectedText = i;
            }
        }
    }

    // done dragging
    function handleMouseUp(e) {
        e.preventDefault();
        selectedText = -1;
    }

    // also done dragging
    function handleMouseOut(e) {
        e.preventDefault();
        selectedText = -1;
    }

    // handle mousemove events
    // calc how far the mouse has been dragged since
    // the last mousemove event and move the selected text
    // by that distance
    function handleMouseMove(e) {
        if (selectedText < 0) {
            return;
        }
        e.preventDefault();
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;

        var text = texts[selectedText];
        text.x += dx;
        text.y += dy;
        draw();
    }

    // listen for mouse events
    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });

    $("#submit").click(function () {

        // calc the y coordinate for this text on the canvas
        var y = texts.length * 20 + 20;

        // get the text from the input element
        var text = {
            text: $("#theText").val(),
            x: 20,
            y: y
        };

        // calc the size of this text for hit-testing purposes
        ctx.font = "16px verdana";
        text.text = $('#thetext').val();
        text.width = ctx.measureText(text.text).width;
        text.height = 16;

        // put this new text in the texts array
        texts.push(text);

        // redraw everything
        draw();

    });
});

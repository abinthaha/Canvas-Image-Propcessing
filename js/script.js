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
    link.href = canvas.toDataURL("image/png");
    var urlData = canvas.toDataURL("image/png");
    link.download = filename;
  }


  document.getElementById('btn-download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'test.png');
  }, false);


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



  // clear the canvas & redraw all texts
  function draw() {
      var text = texts[0];
      $('canvas')
        .addLayer({
          type: 'text',
          name: 'textBox',
          fillStyle: '#cfc',
          strokeStyle: '#000',
          strokeWidth: 2,
          draggable: true,
          index: 1,
          fontSize: 48,
          fontFamily: 'Verdana, sans-serif',
          x: text.x,
          text: text.text,
          y: text.y,
        })
        .drawLayers();
    }

  $("#submit").click(function() {

    // calc the y coordinate for this text on the canvas
    var y = texts.length * 20 + 20;

    // get the text from the input element
    var text = {
      text: $("#theText").val(),
      x: 100,
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

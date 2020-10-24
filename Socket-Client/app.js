var socket,
  canvas,
  ctx,
  brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 10,
    down: false,
  },
  strokes = [],
  currentStroke = null;

let paint = () => {
  ctx.clearRect(0, 0, canvas.width(), canvas.height());
  ctx.lineCap = 'round';
  strokes.forEach((e, i) => {
    ctx.strokeStyle = e.color;
    ctx.lineWidth = e.size;
    ctx.beginPath();
    ctx.moveTo(e.point[0].x, e.point[0].y);
    e.point.forEach((e) => {
      ctx.lineTo(e.x, e.y);
    });
    ctx.stroke();
  });
};

let init = () => {
  socket = io.connect('http://localhost:3000');
  canvas = $('#paint');
  canvas.attr({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  ctx = canvas[0].getContext('2d');

  let mouseEvent = (e) => {
    brush.x = e.pageX;
    brush.y = e.pageY;

    currentStroke.point.push({
      x: brush.x,
      y: brush.y,
    });

    socket.on('connect', () => {
      socket.emit('mouse', currentStroke);
    });
    paint();
  };

  socket.on('connect', () => {
    socket.on('painter', (data) => {
      strokes.push(data);
      paint();
    });
  });

  canvas
    .mousedown((e) => {
      brush.down = true;
      currentStroke = {
        color: brush.color,
        size: brush.size,
        point: [],
      };
      strokes.push(currentStroke);
      mouseEvent(e);
    })
    .mouseup((e) => {
      brush.down = false;
      mouseEvent(e);
      currentStroke = null;
    })
    .mousemove((e) => {
      if (brush.down) mouseEvent(e);
    });

  $('#btn-undo').on('click', () => {
    strokes.pop();
    paint();
  });

  $('#btn-clear').on('click', () => {
    strokes = [];
    paint();
  });

  $('#color-picker').change((e) => {
    brush.color = e.target.value;
  });

  $('#brush-size').change((e) => {
    brush.size = e.target.value;
  });
};

$(init);

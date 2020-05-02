window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 100;

    //variables
    let painting = false;
    let brushSize = 10;
    let brushPos = {x: 0, y: 0};

    function getBrushPos(canvasCtx, e) {
        let x = e.type.includes("touch") ?
            e.touches[0].clientX : e.clientX;
        let y = e.type.includes("touch") ?
            e.touches[0].clientY : e.clientY;
        let rect = canvasCtx.getBoundingClientRect();
        return {
            x: x - rect.left,
            y: y - rect.top
        };
    }


    //drawing
    function start(e) {
        painting = true;
        ctx.beginPath();
        brushPos = getBrushPos(canvas, e);
        ctx.moveTo(brushPos.x, brushPos.y);
        draw(e);
        e.preventDefault();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        brushPos = getBrushPos(canvas, e);
        ctx.lineTo(brushPos.x, brushPos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(brushPos.x, brushPos.y);
        e.preventDefault();
    }

    function end(e) {
        ctx.closePath();
        painting = false;
        e.preventDefault();
    }

    //painting actions
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseout', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', draw);

    document.addEventListener('click', (e) => {
        let x = e.target;
        //color buttons
        if (x.className === 'c_buttons') ctx.strokeStyle = x.id;
        //scale brush
        if (x.className === 'scale_brush') {
            if (x.id === 'plus' && brushSize < 50) brushSize++;
            else if (x.id === 'minus' && brushSize > 1) brushSize--;
            document.getElementById('brush_size').innerHTML = brushSize.toString();
        }
        //functional buttons
        if (x.id === 'clear') ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (x.id === 'load') {
            let img = new Image(canvas.width, canvas.height);
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            }
            img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/725px-Stick_Figure.svg.png";
        }
    });

    document.getElementById('brush_size').innerHTML = brushSize.toString();
});
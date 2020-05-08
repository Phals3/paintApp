window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = 0.70 * window.innerHeight;
    if (window.innerWidth >= window.innerHeight) {
        canvas.width = 0.60 * window.innerWidth;
    } else {
        canvas.width = 0.90 * window.innerWidth;
    }

    let customColors = {
        "black": "#000000",
        "yellow": "#eae22a",
        "red": "#d2250d",
        "green": "#34c352",
        "blue": "#63a9e8",
        "rubber": "#ffffff",
    }

    for (let c in customColors) {
        document.getElementById(c).style.backgroundColor = customColors[c];
    }

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

    function scaleBrush(value) {
        if (brushSize + value >= 1 && brushSize + value <= 50) brushSize += value;
        document.getElementById('brush-size').innerHTML = brushSize.toString();
    }

    function setColor(id) {
        let newColor = customColors[id];
        ctx.strokeStyle = newColor;
    }


    //painting actions
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseout', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', draw);

    let toPlay = new Audio('static/paint/audio/welcome.mp3');
    document.addEventListener('click', (e) => {
        let x = e.target;
        if (x.id === 'tap') {
            if (toPlay.paused) toPlay.play();
            else if (toPlay.currentTime > 0) toPlay.pause();
        }
        if (x.className === 'c-buttons') setColor(x.id);
        else if (x.id === 'plus') scaleBrush(1);
        else if (x.id === 'minus') scaleBrush(-1);
        else if (x.id === 'clear') ctx.clearRect(0, 0, canvas.width, canvas.height);
        else if (x.id === 'load') {
            let img = new Image(canvas.width, canvas.height);
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            }
            img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick-Figure.svg/725px-Stick-Figure.svg.png";
        }
    });

});
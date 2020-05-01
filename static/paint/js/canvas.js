window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth-100;
    canvas.height = window.innerHeight-100;

    //variables
    let painting = false;

	//drawing
    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    //mouse
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    //buttons
    document.getElementById('clear').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('black').addEventListener('click', () => {
        ctx.strokeStyle = 'black';
    });
    document.getElementById('yellow').addEventListener('click', () => {
        ctx.strokeStyle = 'yellow';
    });
    document.getElementById('red').addEventListener('click', () => {
        ctx.strokeStyle = 'red';
    });
    document.getElementById('green').addEventListener('click', () => {
        ctx.strokeStyle = 'green';
    });
    document.getElementById('blue').addEventListener('click', () => {
        ctx.strokeStyle = 'blue';
    });

});
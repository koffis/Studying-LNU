function myMove() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var position = 0;
    var y0 = 4.0;
    var y = y0;
    var v = 0;
    var dt = 0.001;
    var k = 10;
    var m = 1;
    var g = 10;
    var a = 4;
    var yScale = 0;
    var yPosScaled = 0;


    setInterval(function () {
        var temp = (m * g) / k;
        a = g * (1 - v / temp);
        y -= v * dt;
        v += a * dt;
        ctx.clearRect(0, 0, 200, 700);
        ctx.fillRect(0, position, 50, 50);
        console.log(position);
        position += v;
        if (position > 500) {
            position = 0;
        }
    }, 30);

    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");
    var position2 = 0;
    y = y0;
    v = 0;
    setInterval(function () {
        y -= v * dt;
        v += g * dt;
        ctx2.clearRect(0, 0, 200, 700);
        ctx2.fillRect(0, position2, 50, 50);
        position2+= v;
        if (position2 > 500) {
            position2 = 0;
        }
    }, 30);
}

var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;


function decaying(k, v) {

    var decayingMap1 = new Map();
    var decayingMap2 = new Map();
    var decayingMap3 = new Map();

    var num_of_iterates = 300;
    var m = 0.175;
    var dt = 0.01;
    var x0 = 0.07;
    var w0 = Math.sqrt(k / m);

    var y = 1;
    var y1 = 5;
    var y2 = 10;
    var time = 0;

    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0 - 2 * y * v * dt;
        var energy = m * v * v / 2;
        time = time + dt
        decayingMap1.set(time, x0);
    }

    time = 0;
    var x1 = 0.07;
    var v1 = v;

    for (var i = 1; i < num_of_iterates; i++) {
        x1 = x1 + dt * v1;
        v1 = v1 + (-w0 * w0) * dt * x1 - 2 * y1 * v1 * dt;
        var E1 = m * v1 * v1 / 2;
        time = time + dt;
        decayingMap2.set(time, x1);
    }

    time = 0;
    var x2 = 0.07;
    var v2 = v;

    for (var i = 1; i < num_of_iterates; i++) {
        x2 = x2 + dt * v2;
        v2 = v2 + (-w0 * w0) * dt * x2 - 2 * y2 * v2 * dt;
        var E2 = m * v2 * v2 / 2;
        time = time + dt;
        decayingMap3.set(time, x2);
    }
    return [decayingMap1, decayingMap2, decayingMap3];
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = decaying(k, v);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result[0].keys()),
            datasets: [{
                    
                    data: Array.from(result[0].values()),
                    borderColor: 'rgb(255,0,25)'
            },
                {
                    
                    data: Array.from(result[1].values()),
                    borderColor: 'rgb(255,255,25)'
            },
                {
                    
                    data: Array.from(result[2].values()),
                    borderColor: 'rgb(0,255,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

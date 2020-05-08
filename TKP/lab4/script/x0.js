var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;

function find_x_0(num_of_iterates, x0, dt, v) {

    var x0Map1 = new Map();
    var x0Map2 = new Map();

    w0 = Math.sqrt(k / m);
    var time = 0;
    for (var i = 1; i < num_of_iterates; i++) {
        v = v + (-w0 * w0) * dt * x0;
        x0 = x0 + dt * v;
        time = time + dt;
        
        x0Map1.set(time, x0);
    }

    time = 0;
    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        time = time + dt;

        x0Map2.set(time, x0);
    }


    return [x0Map1, x0Map2];
}


function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = find_x_0(num_of_iterates, x0, dt, v);
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
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

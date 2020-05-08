var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;


function potenzial_and_kinetic_energy(k, v) {

    var pkMap1 = new Map();
    var pkMap2 = new Map();
    var pkMap3 = new Map();

    num_of_iterates = 300;
    m = 0.175;
    dt = 0.01;
    x0 = 0.07;
    w0 = Math.sqrt(k / m);

    var y = 1;
    var y1 = 5;
    var y2 = 10;
    var time = 0;
    
    for(var i = 1; i < num_of_iterates; i++){
         x0 = x0 + dt * v;
    v = v + (-w0 * w0) * dt * x0 - 2 * y * v * dt;
    var energy = x0 * x0 * k / 2;
    var E1 = m * v * v / 2;
    var E2 = m * v * v / 2 + x0 * x0 * k / 2;
    time = time + dt;
        
    pkMap1.set(time, energy);
    pkMap2.set(time, E1);
    pkMap3.set(time, E2);
    }
    return [pkMap1, pkMap2, pkMap3];
}


function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = potenzial_and_kinetic_energy(k, v);
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

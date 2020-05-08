var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;

function potential_energy(num_of_iterates, x0, dt, v) {
    w0 = Math.sqrt(k / m);

    var pEnergyMap1 = new Map();
    var pEnergyMap2 = new Map();

    var time = 0;
    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var energy = x0 * x0 * k / 2;
        time = time + dt;

        pEnergyMap1.set(time, energy);
    }

    time = 0;
    x0 = 0.6;
    v = 0.05;
    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var E1 = x0 * x0 * k / 2;
        time = time + dt;

        pEnergyMap2.set(time, E1);
    }
    return [pEnergyMap1, pEnergyMap2];
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = potential_energy(num_of_iterates, x0, dt, v);
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

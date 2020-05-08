var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;

function kinetic_energy(num_of_iterates, x0, dt, v){
    w0 = Math.sqrt(k / m);
    
    var energyMap1 = new Map();
    var energyMap2 = new Map();
    
    var time = 0;
    
    for(var i = 1; i < num_of_iterates; i++){
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var E1 = m * v * v / 2;
        time = time + dt;
        
        energyMap1.set(time, E1);
    }
    
    time = 0;
    x0 = 0.6;
    v = 0.05;
    
    for(var i = 1; i < num_of_iterates; i++){
        v = v + (-w0 * w0) * dt * x0;
        x0 = x0 + dt * v;
        var energy = m * v * v / 2;
        time = time + dt;
        
        energyMap2.set(time, energy);
    }
    return [energyMap1,energyMap2]
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = kinetic_energy(num_of_iterates, x0, dt, v);
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

var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;

function kinetic_energy(num_of_iterates, x0, dt, v){
    w0 = Math.sqrt(k / m);
    var time = 0;
    
    for(var i = 1; i < num_of_iterates; i++){
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var E11 = m * v * v / 2;
        time = time + dt;
      
    }
 
    time = 0;
    x0 = 0.6;
    v = 0.05;  
    for(var i = 1; i < num_of_iterates; i++){
        v = v + (-w0 * w0) * dt * x0;
        x0 = x0 + dt * v;
        var energy1 = m * v * v / 2;
        time = time + dt;
        
    }
    return [E11, energy1]
}


function potential_energy(num_of_iterates, x0, dt, v) {
    w0 = Math.sqrt(k / m);

 

    var time = 0;
    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var energy2 = x0 * x0 * k / 2;
        time = time + dt;

        
    }

    time = 0;
    x0 = 0.6;
    v = 0.05;
    for (var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0;
        var E22 = x0 * x0 * k / 2;
        time = time + dt;

    }
    return [E22, energy2];
}

var potentional = potential_energy(num_of_iterates, x0, dt, v);
var kinetical = kinetic_energy(num_of_iterates, x0, dt, v);

function summary(num_of_iterates, x0, dt, v) {

    var sEnergyMap1 = new Map();
    var sEnergyMap2 = new Map();

    
    time = 0;
    x0 = 0.6;
    v = 0.05;
   for(var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        var yavnuy = potentional[0] + kinetical[1];
       sEnergyMap1.set(x0, yavnuy);
       time = time + dt;
   }
    
    time = 0;
    x0 = 0.6;
    v = 0.05;
    
    for(var i = 1; i < num_of_iterates; i++) {
        x0 = x0 + dt * v;
        var neyavnuy = potentional[1] + kinetical[0];
       sEnergyMap2.set(x0, neyavnuy);
        time = time + dt;
   }

    return [sEnergyMap1, sEnergyMap2];

}



function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = summary(num_of_iterates, x0, dt, v);
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

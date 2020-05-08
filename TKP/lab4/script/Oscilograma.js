var num_of_iterates = 150;
var k = 6;
var m = 175;
var x0 = 0.6;
var dt = 0.2;
var v = 0.05;
var w0 = 0;



function ostsilograf(x0,v){
    m = 0.125;
    x0 = 0.02;
    dt = 0.01;

    var oscilografMap = new Map();
    var N = 500;


    w0 = Math.sqrt(k / m);

   var  y = 0.5;

   var t = 0;
    for(var i = 1; i < N; i++){
        x0 = x0 + dt * v;
        v = v + (-w0 * w0) * dt * x0 - 2 * y * v * dt;

        t = t + dt;
        oscilografMap.set(x0, v);
        
    }
    return oscilografMap;      
}
    

  
function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = ostsilograf(x0, v);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result.keys()),
            datasets: [{
                    
                    data: Array.from(result.values()),
                    borderColor: 'rgb(255,225,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

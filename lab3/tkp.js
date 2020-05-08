function compute(dt) {
    var y0 = 4.0;
    var y = y0;
    var v = 0;
    var t = 0;
    var g = 8.81

    var myMap = new Map();
    var myMap2 = new Map();

    while (y >= 0) {
        y -= v * dt;
        v += g * dt;
        t += dt;

        
        myMap.set(t, v);
        myMap2.set(t, y);
    }
    return [myMap, myMap2];
}

function input() {
    const dt = parseFloat(document.getElementById("dtime").value);
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = compute(dt);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result[0].keys()),
            datasets: [{
                    label: 'v(t)',
                    data: Array.from(result[0].values()),
                    borderColor: 'rgb(255,0,25)'
            },
                {
                    label: 'y(t)',
                    data: Array.from(result[1].values()),
                    borderColor: 'rgb(255,255,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

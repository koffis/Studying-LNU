function fourthChart() {
    var fourthChartMap = new Map();
    

     var t = 0;
    var Uc = 0;
    var Ucn = 0;
    var vz = 0;
    var E = 10;
    var R = 4300;
    var c = 75;
    var C = c * 1e-9;
    var dt = 0.00001;

    while (t < 0.001) {
        Uc = Uc + dt * (E - Uc) / (R * C);
        Ucn = (Ucn + E * dt / (R * C)) / (1 + dt / (R * C));
        t = t + dt;
        fourthChartMap.set(t, Uc-Ucn);
        

    }
    return fourthChartMap;
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = fourthChart();
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result.keys()),
            datasets: [{
                    label: 'Fourth Chart',
                    data: Array.from(result.values()),
                    borderColor: 'rgb(255,0,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

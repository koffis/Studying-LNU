function firstCharts() {
    var firstChartMap1 = new Map();
    var firstChartMap2 = new Map();

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
        firstChartMap1.set(t, (E - Uc) / R);
        firstChartMap2.set(t, (E - Ucn) / R);

    }
    return [firstChartMap1, firstChartMap2]
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = firstCharts();
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result[0].keys()),
            datasets: [{
                    label: 'Струм',
                    data: Array.from(result[0].values()),
                    borderColor: 'rgb(255,0,25)'
            },
                {
                    label: 'I',
                    data: Array.from(result[1].values()),
                    borderColor: 'rgb(255,255,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

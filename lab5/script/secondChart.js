function secondCharts() {
    var secondChartMap1 = new Map();
    var secondChartMap2 = new Map();

    var t = 0;
    var Uc = 0;
    var Ucn = 0;
    var vz = 0;
    var E = 10;
    var R = 4300;
    var c = 75;
    var C = c * 1e-9;
    var dt = 0.001;
   

    while (t < 0.01) {
        Uc = Uc + dt * (E - Uc) / (R * C);
        Ucn = (Ucn + E * dt / (R * C)) / (1 + dt / (R * C));
        t = t + dt;
        secondChartMap1.set(t, Uc);
        secondChartMap2.set(t, Ucn);

    }
    return [secondChartMap1, secondChartMap2]
}

function input() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = secondCharts();
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result[0].keys()),
            datasets: [{
                    label: 'Вольтаж',
                    data: Array.from(result[0].values()),
                    borderColor: 'rgb(255,0,25)'
            },
                {
                    label: 'U',
                    data: Array.from(result[1].values()),
                    borderColor: 'rgb(255,255,25)'
            }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

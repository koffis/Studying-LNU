function compute(dt, k, m) {
    var y0 = 4.0;
    var y = y0;
    var v = 0;
    var g = 9.81;
    var a = 0;
    var t = 0;
    var myMap = new Map();
    var myMap2 = new Map();
    var rad = document.getElementsByName('r1');
    while (y >= 0) {

        if (rad[0].checked) {
            var temp = (m * g) / k;
            a = g * (1 - v / temp);
        } else {
            var temp = Math.pow(((m * g) / k), 0.5);
            a = g * (1 - Math.pow(v / temp, 2));
        }
        y -= v * dt;
        v += a * dt;
        t += dt;

        myMap.set(t, v);
        myMap2.set(t, y);
    }

    return [myMap, myMap2];

}

function input() {
    const dt = parseFloat(document.getElementById("dtime").value);
    const k = parseFloat(document.getElementById("resist").value);
    const m = parseFloat(document.getElementById("weight").value);
    var ctx = document.getElementById('myChart').getContext('2d');
    var result = compute(dt, k, m);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(result[0].keys()),
            datasets: [
                {
                    label: "v(t)",
                    data: Array.from(result[0].values()),
                    borderColor: 'rgb(0,255,255)'
                      }, {
                    label: "y(t)",
                    data: Array.from(result[1].values()),
                    borderColor: 'rgb(255,0,255)'
                      }]
        },


        options: {}
    });

}
document.getElementById("calculator").addEventListener("click", input);

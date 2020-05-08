function Task4(T, Tenv, coef, step) {
    var myArr = [86, 80.8, 77.2, 75.2, 73.1, 69.6, 67.9, 66.5, 64.9, 63.3, 62.3, 61.2, 60.1, 58.9, 58, 56.9];
    var myMap3 = new Map();
    var myMap4 = new Map();
    
    var sum = 0;
    
    for(var i = 0; i < myArr.length; i++){
        var d = T - coef * step * (T - Tenv);
        T = d;
        myMap3.set(step * i,d);
        myMap4.set(step * i,myArr[i]);
        sum+=Math.pow(d - myArr[i],2);
    }
    var sigma = Math.sqrt(sum)/myArr.length;
    document.getElementById('sigma').value = sigma;
    return [myMap3, myMap4];
    }






function compute(T, tSer, r, t) {
    var cord = new Map();
    for (var i = 0; i < t; i++) {
        var d = (-r * (T - tSer));
        cord.set(i, T);
        T += d;
    }
    return cord;
}

function input() {
    const t = parseInt(document.getElementById("time").value);
    const r = parseFloat(document.getElementById("coolingFactor").value);
    const tSer = parseInt(document.getElementById("averageTemperature").value);
    const T = parseInt(document.getElementById("maximumTemperature").value);
   
    var ctx = document.getElementById('myChart3').getContext('2d');
    
    var result4 = Task4(T,tSer,r,0.7);

    

    var chart = new Chart(ctx, {
        
        type: 'line',

       

        data: {
            labels: Array.from(result4[0].keys()),
            datasets: [
                {
                    label: "Теоретичний",
                    data: Array.from(result4[0].values()),
                    borderColor: 'rgb(0,255,25)'
                      },{
                    label: "Експерементальний",
                    data: Array.from(result4[1].values()),
                    borderColor: 'rgb(255,255,25)'
                      }
            ]
        },

        
        options: {}
    });
    
}
document.getElementById("calculator").addEventListener("click", input);

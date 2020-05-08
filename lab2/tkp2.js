var step = 15;
var timeOfExperiment = 30;
var rate = 0.115;

function experiment1(firstTemperature, enviromentTemperature, i) {
    return enviromentTemperature + (firstTemperature - enviromentTemperature) * Math.exp(-(rate * i));
}

function experiment2(firstTemperature, enviromentTemperature, rate) {
    return firstTemperature - rate * rate * (firstTemperature - enviromentTemperature);
}


function main_function(firstTemperature, enviromentTemperature, rate) {
    var mapEps = new Map();
    var Temperature0 = firstTemperature;
    var epsList = [];
    var i = 1;

    while (Temperature0 > enviromentTemperature + 1) {
        var first_function_res = experiment1(firstTemperature, enviromentTemperature, i * rate);
        var y = experiment2(Temperature0, enviromentTemperature, rate);
        Temperature0 = y;

        
        
    
        var eps = Math.pow(first_function_res - Temperature0,2);
        epsList.push(Math.sqrt(eps));
        mapEps.set(i*rate, eps);
        i++;
        
       
    }
    return mapEps;
}

function input() {
    const time = parseInt(document.getElementById("time").value);
    const rate = parseFloat(document.getElementById("coolingFactor").value);
    const enviromentTemperature = parseInt(document.getElementById("averageTemperature").value);
    const firstTemperature = parseInt(document.getElementById("maximumTemperature").value);
    
    var ctx = document.getElementById('myChart2').getContext('2d');
    
    var result = main_function(firstTemperature, enviromentTemperature, rate);


    var chart = new Chart(ctx, {
        
        type: 'line',

    
        data: {
            labels: Array.from(result.keys()),
            datasets: [
                {
                    label: "Похибка",
                    data: Array.from(result.values()),
                    borderColor: 'rgb(0,0,255)'
                      }]
        },

        
        options: {}
    });
   
}
document.getElementById("calculator").addEventListener("click", input);

let arr = [2,4,1,5,7,12]

let sumLoop = (arr) => {
    let result = 0;
    for(let i = 0; i < arr.length; i++){
        result += arr[i];
    }
    return result;
}

console.log("sum with using loop: " + sumLoop(arr));
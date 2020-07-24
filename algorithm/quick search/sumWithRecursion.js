let array = [2,4,1,5,6];

let sumRecursion = (array) => {
    if(array.length === 0){
        return 0;
    } else {
        return array[0] + sumRecursion(array.slice(1))
    }
}

console.log("sum with recursion: " + sumRecursion(array));
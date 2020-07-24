let arr = [5,2,4,1,6,12,9]

let findSmallest = (arr) => {
    let smallest = arr[0];
    let smallest_index = 0;
    for( let i = 1; i < arr.length; i++){
        if(arr[i] < smallest){
            smallest = arr[i];
            smallest_index = i;
        }
    }
    return smallest_index;
}

let selectionSort = (arr) => {
    let newArr = [];
    let length = arr.length;

    for (let i = 0; i < length; i++){
        let smallest = findSmallest(arr);
        newArr.push(arr.splice(smallest, 1)[0])
    }
    return newArr;
}

console.log(selectionSort(arr));





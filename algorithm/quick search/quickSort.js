let arrray = [5,2,1,7,12,32,14,54];

let quickSort = (arr) => {
    if(arr.length < 2){
        return arr;
    } 
    const pivot = arr[0];
    const keysAreLess = arr.slice(1).filter(key => key <= pivot);
    const keysAreMore = arr.slice(1).filter(key => key > pivot);
    return [...quickSort(keysAreLess), pivot, ...quickSort(keysAreMore)]
}

console.log(`Quick sort from this numbers ${arrray} are: ` + quickSort(arrray));
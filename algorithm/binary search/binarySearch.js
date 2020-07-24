const binarySearch = (list, item) => {
    let low = 0;
    let high = list.length - 1;

    while (low <= high){
        let mid = Math.floor((low + high)/2);
        let guess = list[mid];
        if(guess === item){
            return mid;
        } else if(guess > item){
            high = mid - 1;
        } else if (guess < item) {
            low = mid + 1;
        } else {
            return null;
        }
    }
}

let my_list = [1, 3, 5, 7, 9, 12, 25, 32, 39, 86];

console.log(binarySearch(my_list, 12));
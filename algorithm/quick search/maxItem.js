let list = [2,25,15,18,8];

// with loop
let maxItem = (list) => {
    let biggest = list[0];
    for(let i = 0; i < list.length; i++) {
        if(list[i] > biggest){
            biggest = list[i];
        }
    }
    return biggest;
}

// with recursion
let maxItemRec = (list) => {
    if(list.length === 2){
        return list[0] > list[1] ? list[0] : list[1];
    }
    const max = maxItemRec(list.slice(1));
    return list[0] > max ? list[0] : max;
}

console.log("Max item in array: " + maxItemRec(list));
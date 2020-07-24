let countdown = (i) => {
    console.log(i);
    if ( i <= 0){
        return console.log('Countdown has been ended');
    } else {
        countdown(i-1);
    }
}

console.log(countdown(12));




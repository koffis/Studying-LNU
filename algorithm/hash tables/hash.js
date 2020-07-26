let voted = {};

const check_voter = (name) => {
    if (voted[name]){
        console.log("kick them out!");
    } else {
        voted[name] = true;
        console.log("let them vote!");
    }
}


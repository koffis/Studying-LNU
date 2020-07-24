let greet = (name) => {
    console.log("Hello, " + name + "!");
    greet2(name);
    console.log("getting ready to say bye...") 
    bye()
}

let greet2 = (name) => {
    console.log("how are you, " + name + "?");
}

let bye = () => {
    console.log("ok, bye!");
}

console.log(greet("Yarik")); 
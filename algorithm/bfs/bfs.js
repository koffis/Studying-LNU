// this function find mango seller. Task from book 'Grokking algorithms'

const personIsSeller = name => name[name.length - 1] === 'm';

let graph = {};
graph.you = ["alice", "bob", "claire"];
graph.bob = ["anuj", "peggy"];
graph.alice = ["peggy"];
graph.claire = ["thom", "jonny"];
graph.anuj = [];
graph.peggy = [];
graph.thom = [];
graph.jonny = [];

const search = (name) => {
    let searchQueue = [];
    searchQueue = searchQueue.concat(graph[name]);
    const searched = [];
    while (searchQueue.length) {
        const person = searchQueue.shift();
        if(searched.indexOf(person) === -1) {
            if (personIsSeller(person)) {
                console.log(`${person} is a mango seller`);
                return true;
            }
            searchQueue = searchQueue.concat(graph[person]);
            searched.push(person);
        }
    }
    return false;
}
search('you');
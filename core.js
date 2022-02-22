
let store = [];

let template = ``;

function getData(){

    let fName = document.getElementById('fName').value;
    let lName = document.getElementById('lName').value;
    let address = document.getElementById('address').value;

    store.push({fName : fName, lName : lName, address : address});

    render()

    console.log(fName, lName, address);
}

function render() {

    let container = document.getElementById('text_book');

    template = ``;

    for(i = 0; i < store.length; i++){
        console.log(i)
        store[i];
        template += `${store[i].fName} - ${store[i].lName} - ${store[i].address} - <button onclick='remove(${i})'>Delete</button> <br>`;

    }

    container.innerHTML = template;
}

function remove(index){

   store = store.filter( (item, key) =>  key != index);
   render();

}


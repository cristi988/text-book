
let store = [];

let template = ``;

/**
 * This function gets the data from inputs 
 * 
 */
function getData(){

    //collect data 

    let fName = document.getElementById('fName');
    let lName = document.getElementById('lName');
    let email = document.getElementById('email');
    let address = document.getElementById('address');
    let phoneNumber = document.getElementById('phone-number');

    //validate 
    validate([fName, lName, email, address, phoneNumber]);

    store.push({fName: fName.value, lName : lName.value, address : address.value, email : email.value, phoneNumber : phoneNumber.value});

    render()
}

/**
 * This function creates the template and injects data
 * 
 */
function render() {

    let container = document.querySelector('.text-book-content');

    template = ``;

    for(i = 0; i < store.length; i++){
        console.log(i)
        store[i];
        template += `${store[i].fName} - ${store[i].lName} - ${store[i].address} - ${store[i].email} - ${store[i].phoneNumber} - 
        <i onclick="remove(${i})" class="text-danger bi bi-x-square-fill"></i> <br>`;
    }

    container.innerHTML = template;
}


/**
 * This function deletes an object from the store array
 * 
 * @param {*} index 
 */
function remove(index){

   store = store.filter( (item, key) =>  key != index);
   render();

}

/**
 * This function validates if the fields(inputs) are empty 
 * 
 * @param {*} field 
 * @returns 
 */
function isValid(field) {

    if (field == '' || field.length < 1) {
        return false;
    }

    return !!field;
}

function renderFeedback(element) {

    if (isValid(element.value)){
        element.classList.add('border-success');
        element.classList.remove('border-danger');
    } else{
        element.classList.add('border-danger');
        element.classList.remove('border-success');        
        throw new Error('You must fill all fields')
    }

}


function validate(data) {
    for (let i = 0; i < data.length; i++) {
        renderFeedback(data[i]);
    }
}




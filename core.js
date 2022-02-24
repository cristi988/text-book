
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

    template = '';

    for(i = 0; i < store.length; i++){    
        cardTemplate(i);
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

/**
 * This function checks if the fields are empty or completed
 * 
 * @param {*} element 
 */
function renderFeedback(element) {

    let errorSpan = document.querySelector(`.error-feedback[data-id = ${element.id}]`);

    if (isValid(element.value)){
        element.classList.add('border-success');
        element.classList.remove('border-danger');
        errorSpan.classList.add('invisible');
    } else{
        element.classList.add('border-danger');
        element.classList.remove('border-success'); 
       
       errorSpan.classList.remove('invisible');

        throw new Error('You must fill all fields')
    }

}

/**
 * This function validates data
 * 
 * @param {*} data 
 */
function validate(data) {
    for (let i = 0; i < data.length; i++) {
        renderFeedback(data[i]);
    }
}

/**
 * This function creates the template 
 *  
 * @param {*} i 
 */
function cardTemplate(i) {

        template += `<div class="main-template"> <div class="template">${store[i].fName}  ${store[i].lName}</div> <div class="template">${store[i].address}</div>
        <div class="template">${store[i].email}</div> <div class="template">${store[i].phoneNumber}</div> 
        
        <div class="template"> <i onclick="remove(${i})" class="text-danger bi bi-x-square-fill"></i>
        <i class="bi bi-pencil-square"></i></div>  
        
        <br> </div>`;

}




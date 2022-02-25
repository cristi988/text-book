
let store = [];

let template = ``;

let fName = document.getElementById('fName');
let lName = document.getElementById('lName');
let email = document.getElementById('email');
let address = document.getElementById('address');
let phoneNumber = document.getElementById('phone-number');

// window.alert(response)

/**
 * This function gets the data from inputs
 * "also" checks if the contact already exists 
 * 
 */
function getData(){
    //validate 
    validate([fName, lName, email, address, phoneNumber]);

    let response = store.filter((item)=>{
        return item.email == email.value || item.phoneNumber == phoneNumber.value
    });

    if(response.length > 0) {
        createAlert('danger', 'This contact already exists', 10);
        throw new Error('The contact already exists');
    }

    store.push({fName: fName.value, lName : lName.value, address : address.value, email : email.value, phoneNumber : phoneNumber.value});

    render()
    document.querySelector('form').reset();
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

    createAlert('success', 'You have saved the contact successfully!', 2);

    container.innerHTML = template;
}


/**
 * This function deletes an object from the store array
 * 
 * @param {*} index 
 */
function remove(index){
    let response = window.confirm('Are you sure?');

    if (response == true) {
        store = store.filter( (item, key) =>  key != index);
        render();
        createAlert('danger', 'You have successfully deleted a contact!', 2)
    }
    
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
   
    template +=` 
    
        <div class="card">

            <div class="title">            
                <h3>${store[i].fName}  
                ${store[i].lName}</h3>
                <div class="circle"> </div>
            </div>
            <hr>
            
            <div class="contents"> 
                ${store[i].address} <br>
                ${store[i].email} <br>
                ${store[i].phoneNumber}
            </div>
            <hr>

            <div class="footer"> 
                <button class="danger w-40 p1" onclick="remove(${i})">Delete <i class="bi bi-x-square"></i></i></button>
                <button class="success w-40 p1" onclick="edit(${i})"> Edit <i class="bi bi-pencil-square"></i></button>
            </div> 

        </div>
    `;

}

/**
 * This function creats alerts for the user
 * 
 * @param {*} type 
 * @param {*} message 
 * @param {*} live 
 */
function createAlert(type, message, live=2) {
    let alertContainer = document.querySelector('.alert-container'); 

    let template = `<p class="border-${type} bg-${type} text-light p1 mx-1 text-center rounded-5">${message}</p>`;

    alertContainer.innerHTML = template;

    setTimeout(()=>{
        alertContainer.innerHTML = ''
    }, live*1000)

}

/**
 * This function edits the data 
 * 
 * @param {*} index 
 */
function edit(index) {

    fName.value = store[index].fName
    lName.value = store[index].lName
    email.value = store[index].email
    address.value = store[index].address
    phoneNumber.value = store[index].phoneNumber

    store = store.filter( (item, key) =>  key != index);
}






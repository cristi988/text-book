
let store = [];

let people = [];

let template = ``;


fusion();

render();


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

    fusion();  

    render();

    createAlert('success', 'You have saved the contact successfully!', 2);

    document.querySelector('form').reset();
}

/**
 * This function creates the template and injects data
 * 
 */
function render() {
    
    let container = document.querySelector('.text-book-content');

    template = '';

    for(i = 0; i < people.length; i++){    
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
    let response = window.confirm('Are you sure?');

    if (response == true) {
        people = people.filter( (item, key) =>  key != index);
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
                <div>
                    <div class="circle"></div>
                </div>        
                <h3>${people[i].fName}  
                ${people[i].lName}</h3>                                 
            </div>
            <hr>
            
            <div class="contents"> 
            <i class="bi bi-envelope">  ${people[i].email}</i> <br>
            <i class="bi bi-telephone">  ${people[i].phoneNumber} </i><br>
            <i class="bi bi-house"> ${people[i].address} </i> 
            </div>
            <hr>

            <div class="footer"> 
                <button class="danger w-40 p1" onclick="remove(${i})">Delete <i class="bi bi-x-square"></i></i></button>
                <button class="success w-40 p1" onclick="edit(${i})" > Edit <i class="bi bi-pencil-square"></i></button>
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
    renderForm('edit', index)
    document.getElementById('fName').value = people[index].fName
    document.getElementById('lName').value = people[index].lName
    document.getElementById('email').value = people[index].email
    document.getElementById('address').value = people[index].address
    document.getElementById('phoneNumber').value = people[index].phoneNumber
}

/**
 * This function makes the scroll to stop
 * 
 * @param {*} e 
 * @returns 
 */
 function preventScroll(event) {
    event.preventDefault();
    // event.stopPropagation();

    return false;
}
/**
 * This function disable the scroll
 * 
 */
function disable(){
    document.querySelector('.backdrop').addEventListener('wheel', preventScroll);
  }
document.querySelector('.addContact').addEventListener('click', disable);





/**
 * This function makes the form invisible
 */
function hideForm() {
    document.querySelector('.backdrop').classList.add('invisible');
}


document.getElementById('search').addEventListener('keyup',
(event)=>{
    fusion();
    // event.keyCode==8 ? store = persons : ''
   
    people = people.filter((item)=>{
        if( item.fName.toLowerCase().includes(event.target.value.toLowerCase())){
            return item;
        }
    })    
    render();
})


/**
 * This function add the arrays data together 
 */
function fusion() {
    people = [...store, ...persons];
}


//puts the form on the screen
function renderForm(edit=null, id=null) {
    let button = ` <button class="primary w-50 submit-form" onclick="getData(), hideForm()" type="button" >
                        Submit<i class="bi bi-check-circle"></i>
                 </button>`;
    if(edit != null){
        button = ` <button class="primary w-50 submit-form" onclick="save(${id}), hideForm()" type="button" >
                        Update<i class="bi bi-check-circle"></i>
                </button>`;
    }

   let form = `            
                <form class="mainform mobile-xs mobile-s mobile-m mobile-l mobile-xl mobile-xxl w-50 mt-2 " >
                    <div class="w-100">
                        <label class="name w-100 text-left">Name:</label>
                        <div class="content w-100 ">          
                            <div class="inline-form-control test w-50">
                                <input class="rows w-100" type="text" name="fName" id="fName" maxlength="15">
                                <span data-id="fName" class="invisible error-feedback text-danger"> Please fill in the first name </span><br>
                                <label for="fName" class="w-100 light-colour">First Name </label>
                            </div>

                            <div class="inline-form-control test w-50">
                                <input class="rows w-100" type="text" name="lName" id="lName" maxlength="20">
                                <span data-id="lName" class="invisible error-feedback text-danger">Please fill in the last name </span><br>
                                <label for="lName" class="w-100 light-colour">Last Name </label>
                            </div>
                        </div>
                    </div>        

                    <div class="content w-100 ">
                        <div class="inline-form-control w-100 mt-2">
                            <label for="email">Email: </label>
                            <span data-id="email" class="invisible error-feedback text-danger">Please fill in the email </span><br>
                            <input class="rows w-100 mt-1" type="email" name="email" id="email" maxlength="30">
                        </div>
                    </div>
                    
                    <div class="content w-100">
                        <div class="inline-form-control w-100 mt-1">
                            <label for="address">Address: </label>
                            <span data-id="address" class="invisible error-feedback text-danger">Please fill in the address </span><br>
                            <input class="rows w-100 mt-1" type="text" name="addr" id="address">
                        </div>
                    </div>

                    <div class="content w-100">
                        <div class="inline-form-control w-100 mt-1">
                            <label for="phoneNumber"> Phone number: </label>
                            <span data-id="phoneNumber" class="invisible error-feedback text-danger">Please fill in the phone nubmer </span><br>
                            <input class="rows w-100 mt-1" type="text" name="phoneNumber" id="phoneNumber" maxlength="11">
                        </div>
                    </div>

                    <div class="buttons-action mt-2">
                        ${button}
                        <button class=" w-50 cancel-form" onclick="hideForm()" type="button">
                            Cancel<i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                </form>           
    `
    document.querySelector('.backdrop').innerHTML = form; 
    document.querySelector('.backdrop').classList.remove('invisible');
    
}

/**
 * Updating users
 * 
 * @param {*} id 
 */
function save(id) {
    let formData =new FormData(document.querySelector('form'));
    let person = people[id];
    formData.forEach((item, key)=>{
        person[key] = item
    })

    render()
}





axios.get('https://api.chucknorris.io/jokes/random').then(response=>{
    document.querySelector('.jokeContainer').innerHTML = `<h4>  ${response.data.value}   </h4>`
})



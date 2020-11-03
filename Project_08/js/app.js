let persons =[];
const urlAPI ='https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


// FETCH FUNCTIONS
fetch(urlAPI)
    .then((response) => response.json())
    .then(res => res.results)
    .then((data)=> generatePerson(data))
   



function generatePerson(data){
    let html='';
    
    persons = data;
    

    persons.forEach((person, index) =>{
    const personIMG = person.picture.large;
    const firstName= person.name.first;
    const lastName= person.name.last;
    const email = person.email;
    const city = person.location.city;
    html += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${personIMG}" />
            <div class="text-container">
                <h2 class="name">${firstName} ${lastName}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        
    `});
    gridContainer.innerHTML= html;
}

function displayModal(index){

    let{name, dob, phone, email, location:{city, street, state, postcode},picture} = persons[index];
    
    let date = new Date(dob.date);
    // console.log(date.getMonth());

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address"> ${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        
        displayModal(index);
        
        // change the index into a number
        let indexNumber = parseInt(index);

        // Select arrow buttons
        const leftArrow = document.querySelector('#leftarrow');
        const rightArrow = document.querySelector('#rightarrow');
        

        // Eventlistener Arrows
        rightArrow.addEventListener('click', e =>{
            if(indexNumber=== 11){
                indexNumber = 0;
                displayModal(indexNumber);
            }else if(indexNumber<11){
                indexNumber +=1;
                displayModal(indexNumber);
            }
        });
        leftArrow.addEventListener('click', e =>{
            if(indexNumber=== 0){
                indexNumber = 11;
                displayModal(indexNumber);
            }else if(indexNumber>0){
                indexNumber -=1;
                displayModal(indexNumber);
            }
        } )
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
    
    
// Search

const search =document.querySelector('#search');

// search bar event listener
search.addEventListener('keyup', () => {
    let input = search.value.toLowerCase();
    let names = [];
    names = document.querySelectorAll('.name');

    for(let i = 0; i < names.length; i++){
        let nameText = names[i].innerText;

        // if user input matches an employee name, show those employees
        if ( nameText.toLowerCase().indexOf(input) > -1 ) {
            let card = names[i].parentNode.parentNode;
            card.style.display = '';
        } else {
            // if user input does not match an employee name, hide those employees
            let card = names[i].parentNode.parentNode;
            card.style.display = 'none';
        } 
    }
});
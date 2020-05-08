const app = document.querySelector('#app');

let users = [];

let state = {searches: 0}

// const headerImage = URL('https://www.pngfind.com/pngs/m/444-4441191_logo-acme-industrial-comtech-hd-png-download.png');

fetch('https://acme-users-api-rev.herokuapp.com/api/users')
    .then(response => response.json())
    .then((data) => {
        data.users.forEach(user => {
            users.push(user);
        })
        console.log(users);
    })

fetch('https://acme-users-api-rev.herokuapp.com/api/users/1')
    .then(response => response.json())
    .then((data) => {
        data.users.forEach(user => {
            users.push(user);
        })
        console.log(users);
    })
fetch('https://acme-users-api-rev.herokuapp.com/api/users/2')
    .then(response => response.json())
    .then((data) => {
        data.users.forEach(user => {
            users.push(user);
        })
        console.log(users);
    })

// window.scroll(function(){
//     (".userCard").css("opacity", 1 - $(window).scrollTop() / 250);
// });

const createHeader = () => {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerContainer');

    // const header = document.createElement('h1');
    // header.classList.add('header');
    // header.innerHTML = 'Acme User Search';

    const headerImage = document.createElement('img');
    headerImage.src = './images/AcmeLogo2.png'
    headerImage.classList.add('headerImage');


    headerContainer.appendChild(headerImage);
    return headerContainer;
}

const createSearchContainer = () => {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('searchContainer');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputContainer');

    const input = document.createElement('input');
    input.classList.add('input');
    input.id = 'input';
    input.placeholder = 'User Search';

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');

    const searchButtonDiv = document.createElement('div');
    const searchButton = document.createElement('button');
    searchButton.classList.add('button');
    searchButton.id = 'search';
    searchButton.innerHTML = 'Search';
    searchButtonDiv.appendChild(searchButton);

    const clearButtonDiv = document.createElement('div');
    const clearButton = document.createElement('button');
    clearButton.classList.add('button');
    clearButton.innerHTML = 'Clear';

    clearButton.addEventListener('click', ev => {
        state.searches = 0;
        const table = document.querySelector('.table');
        table.innerHTML = '';
    })
    clearButtonDiv.appendChild(clearButton);

    inputContainer.appendChild(input);

    buttonDiv.appendChild(searchButtonDiv);
    buttonDiv.appendChild(clearButtonDiv);

    searchContainer.appendChild(inputContainer);
    searchContainer.appendChild(buttonDiv);
    return searchContainer;
}

const topContainer = () => {
    const top = document.createElement('div');
    top.classList.add('top');

    top.appendChild(createHeader());
    top.appendChild(createSearchContainer());
    return top;
}

const createBody = () => {
    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('bodyContainer');

    const button = document.querySelector('#search');
    const table = document.createElement('table');
    table.classList.add('table');
    button.addEventListener('click', (ev) => {
        if (state.searches < 1) {
            state.searches++;
            let input = document.querySelector('.input').value;
            document.querySelector('.input').value = '';
            users.forEach(user => {
                let valid = false;
                if (user.fullName.toLowerCase().includes(input.toLowerCase())) {
                    valid = true;
                }
                if (user.title.toLowerCase().includes(input.toLowerCase())) {
                    valid = true;
                }
                if (user.email.toLowerCase().includes(input.toLowerCase())) {
                    valid = true;
                }
                if (valid === true) {
                    
                    const userCard = document.createElement('tr');
                    userCard.classList.add('userCard');
    
                    const imgDiv = document.createElement('td');
                    imgDiv.classList.add('imgDiv');
                    const image = document.createElement('img');
                    image.src = user.avatar;
                    image.classList.add('image');
                    imgDiv.appendChild(image);
    
                    const firstNameDiv = document.createElement('td');
                    firstNameDiv.classList.add('nameDiv');
                    const firstName = document.createElement('span');
                    firstName.innerHTML = user.firstName;
                    firstNameDiv.appendChild(firstName);
    
                    const lastNameDiv = document.createElement('td');
                    lastNameDiv.classList.add('nameDiv');
                    const lastName = document.createElement('span');
                    lastName.innerHTML = user.lastName;
                    lastNameDiv.appendChild(lastName);
    
                    const emailDiv = document.createElement('td');
                    emailDiv.classList.add('nameDiv');
                    const email = document.createElement('span');
                    email.innerHTML = user.email;
                    emailDiv.appendChild(email);
    
                    const titleDiv = document.createElement('td');
                    titleDiv.classList.add('nameDiv');
                    const title = document.createElement('span');
                    title.innerHTML = user.title;
                    titleDiv.appendChild(title);
    
    
                    userCard.appendChild(imgDiv);
                    userCard.appendChild(firstNameDiv);
                    userCard.appendChild(lastNameDiv);
                    userCard.appendChild(emailDiv);
                    userCard.appendChild(titleDiv);
                    table.appendChild(userCard);
                }
            })
    
            // const labelDiv = document.createElement('tr');
            // labelDiv.classList.add('labelDiv');
    
            // const labelRow = table.insertRow(0);
            const labelHead = document.createElement('thead')
            const labelRow = document.createElement('tr');
            labelRow.classList.add('labelRow');


            // const avatar = labelRow.insertCell(0);
            const avatar = document.createElement('th');
            labelRow.appendChild(avatar);

            // const firstName = labelRow.insertCell(1);
            // firstName.outerHTML = '<th>First Name</th>';
            const firstName = document.createElement('th');
            firstName.innerHTML = 'First Name';
            labelRow.appendChild(firstName)

            // const lastName = labelRow.insertCell(2);
            // lastName.outerHTML = '<th>Last Name</th>';

            const lastName = document.createElement('th');
            lastName.innerHTML = 'Last Name';
            labelRow.appendChild(lastName)

            // const email = labelRow.insertCell(3);
            // email.outerHTML = '<th>Email</th>';

            const email = document.createElement('th');
            email.innerHTML = 'Email';
            labelRow.appendChild(email)

            // const title = labelRow.insertCell(4);
            // title.outerHTML = '<th>Title</th>';
            // table.appendChild(labelRow)

            const title = document.createElement('th');
            title.innerHTML = 'Title';
            labelRow.appendChild(title)
    
            // const firstNameLabel = document.createElement('td');
            // firstNameLabel.innerHTML = 'First Name';
            // labelDiv.appendChild(firstNameLabel);
    
            // const lastNameLabel = document.createElement('span');
            // lastNameLabel.innerHTML = 'Last Name';
            // labelDiv.appendChild(lastNameLabel);
    
            // const emailLabel = document.createElement('span');
            // emailLabel.innerHTML = 'Email';
            // labelDiv.appendChild(emailLabel);
    
            // const titleLabel = document.createElement('span');
            // titleLabel.innerHTML = 'Title';
            // labelDiv.appendChild(titleLabel);
            labelHead.appendChild(labelRow);
            table.appendChild(labelHead);
            bodyContainer.appendChild(table);
            // bodyContainer.insertBefore(labelDiv, bodyContainer.firstChild);
        }

    })
    return bodyContainer; 
}

const render = () => {
    app.innerHTML = '';
    // app.appendChild(createHeader());
    // app.appendChild(createSearchContainer());
    app.appendChild(topContainer());
    app.appendChild(createBody());
}

render();
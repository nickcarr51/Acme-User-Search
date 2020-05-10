const app = document.querySelector('#app');

let state = {
    page: 0,
    pageCount: 0
}

const createNode = (type, className) => {
    const newNode = document.createElement(type);
    if (className) {
        newNode.classList.add(className);
    }
    return newNode;
}

const append = (parent, child) => {
    parent.appendChild(child);
}

const createHeader = () => {
    const headerContainer = createNode('div', 'headerContainer');

    const headerImage = createNode('img', 'headerImage');
    headerImage.src = './images/AcmeLogo2.png';

    append(headerContainer, headerImage);
    return headerContainer;
}

const createSearchContainer = () => {
    const searchContainer = createNode('div', 'searchContainer');

    const form = createNode('form', 'inputContainer');

    const input = createNode('input');
    input.id = 'input';
    input.placeholder = 'User Search';

    form.addEventListener('submit', ev => {
        const hashValue = input.value;
        input.value = '';
        window.location.hash = hashValue;
    })

    const buttonDiv = createNode('div', 'buttonDiv');
    buttonDiv.id = 'clearButtonDiv';
    const clearButton = createNode('button', 'button');
    clearButton.innerHTML = 'Clear';

    clearButton.addEventListener('click', ev => {
        window.location.hash = '';
        state.page = 0;
        state.pageCount = 0;
        if (document.querySelector('#arrowButtonDiv')) {
            document.querySelector('#arrowButtonDiv').innerHTML = '';
        }
    })

    append(form, input);
    append(buttonDiv, clearButton)
    append(searchContainer, form);
    append(searchContainer, buttonDiv);
    return searchContainer;
}   


const topContainer = () => {
    const top = createNode('div', 'top');

    append(top, createHeader());
    append(top, createSearchContainer());
    return top;
}

const createBody = () => {
    const bodyContainer = createNode('div', 'bodyContainer');
    bodyContainer.id = 'bodyContainer';

    const table = createNode('table', 'table');
    table.id = 'table'; 
    
    append(bodyContainer, table);
    return bodyContainer;
}

window.addEventListener('hashchange', () => {
    // let bodyContainer = document.querySelector('#bodyContainer');
    let userTable = document.querySelector('#table');
    let buttonDiv = document.querySelector('#clearButtonDiv');
    buttonDiv.innerHTML = '';

    const clearButton = createNode('button', 'button');
    clearButton.innerHTML = 'Clear';

    clearButton.addEventListener('click', ev => {
        window.location.hash = '';
        state.page = 0;
        state.pageCount = 0;
        if (document.querySelector('#arrowButtonDiv')) {
            document.querySelector('#arrowButtonDiv').innerHTML = '';
        }
    })

    append(buttonDiv, clearButton);

    if (window.location.hash.slice(1) === '') {
        userTable.innerHTML = '';
        state.page = 0; 
        state.pageCount = 0;
    } else {
        state.page = 0;
        let searchTerm = window.location.hash.slice(1);
        if (document.querySelector('#arrowButtonDiv')) {
            document.querySelector('#arrowButtonDiv').innerHTML = '';
        }
        fetch(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchTerm}/${state.page}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.count > 50) {
                if (document.querySelector('#arrowButtonDiv')) {
                    document.querySelector('#arrowButtonDiv').innerHTML = '';
                }
                state.pageCount = Math.floor(data.count/50);
                let buttonDiv = document.querySelector('#clearButtonDiv');
                append(buttonDiv, createPageButtons());
            }
            userTable.innerHTML = '';
            data.users.forEach(user => {
                const newUserCard = createUserCard(user);
                append(userTable, newUserCard);
            })
            createTableHead(userTable);
        })

    }
})


const createUserCard = (user) => {
    const userCard = createNode('tr', 'userCard');

    const imgDiv = createNode('td', 'imgDiv');
    const image = createNode('img', 'image');
    image.src = user.avatar;
    append(imgDiv, image);

    const firstNameDiv = createNode('td', 'nameDiv');
    const firstName = createNode('span');
    firstName.innerHTML = user.firstName;
    append(firstNameDiv, firstName);

    const lastNameDiv = createNode('td', 'nameDiv');
    const lastName = createNode('span');
    lastName.innerHTML = user.lastName;
    append(lastNameDiv, lastName);

    const emailDiv = createNode('td', 'nameDiv');
    const email = createNode('span');
    email.innerHTML = user.email;
    append(emailDiv, email);

    const titleDiv = createNode('td', 'nameDiv');
    const title = createNode('span');
    title.innerHTML = user.title;
    append(titleDiv, title);

    append(userCard, imgDiv);
    append(userCard, firstNameDiv);
    append(userCard, lastNameDiv);
    append(userCard, emailDiv);
    append(userCard, titleDiv);
    return userCard;
}

const createTableHead = (table) => {
    const labelHead = createNode('thead');
    const labelRow = createNode('tr', 'labelRow');

    const avatar = createNode('th');
    append(labelRow, avatar);

    const firstName = createNode('th');
    firstName.innerHTML = 'First Name';
    append(labelRow, firstName);

    const lastName = createNode('th');
    lastName.innerHTML = 'Last Name';
    append(labelRow, lastName);

    const email = createNode('th');
    email.innerHTML = 'Email';
    append(labelRow, email);
    
    const title = createNode('th');
    title.innerHTML = 'Title';
    append(labelRow, title);

    append(labelHead, labelRow);
    append(table, labelHead);
}

const createPageButtons = () => {
    const arrowButtonDiv = createNode('div', 'arrowButtonDiv');
    arrowButtonDiv.id = 'arrowButtonDiv';

    const leftArrow = createNode('button', 'arrowButton');
    leftArrow.innerHTML = '<';
    leftArrow.id = 'leftArrow';
    leftArrow.addEventListener('click', ev => {
        let userTable = document.querySelector('#table');
        // document.querySelector('#arrowButtonDiv').innerHTML = '';
        if (state.page > 0) {
            state.page--;
            let searchTerm = window.location.hash.slice(1);
            fetch(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchTerm}/${state.page}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.count > 50) {
                    state.pageCount = Math.floor(data.count/50);
                    // let buttonDiv = document.querySelector('#buttonDiv');
                    // append(buttonDiv, createPageButtons());
                }
                userTable.innerHTML = '';
                data.users.forEach(user => {
                    const newUserCard = createUserCard(user);
                    append(userTable, newUserCard);
                })
                createTableHead(userTable);
            })
        }

    })


    const rightArrow = createNode('button', 'arrowButton');
    rightArrow.innerHTML = '>';
    rightArrow.id = 'rightArrow';

    rightArrow.addEventListener('click', ev => {
        let userTable = document.querySelector('#table');
        // document.querySelector('#arrowButtonDiv').innerHTML = '';
        if (state.page < state.pageCount) {
            state.page++;
            let searchTerm = window.location.hash.slice(1);
            fetch(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchTerm}/${state.page}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.count > 50) {
                    state.pageCount = Math.floor(data.count/50);
                    // let buttonDiv = document.querySelector('#buttonDiv');
                    // append(buttonDiv, createPageButtons());
                }
                userTable.innerHTML = '';
                data.users.forEach(user => {
                    const newUserCard = createUserCard(user);
                    append(userTable, newUserCard);
                })
                createTableHead(userTable);
            })
        }

    })

    append(arrowButtonDiv, leftArrow);
    append(arrowButtonDiv, rightArrow);
    return arrowButtonDiv;
}

const render = () => {
    app.innerHTML = '';
    append(app, topContainer());
    append(app, createBody());
    if (window.location.hash.length > 1) {
        let searchTerm = window.location.hash.slice(1);
        let userTable = document.querySelector('#table');
        if (document.querySelector('#arrowButtonDiv')) {
            document.querySelector('#arrowButtonDiv').innerHTML = '';
        }
        fetch(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchTerm}/${state.page}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.count > 50) {
                state.pageCount = Math.floor(data.count/50);
                let buttonDiv = document.querySelector('#clearButtonDiv');
                append(buttonDiv, createPageButtons());
            }
            userTable.innerHTML = '';
            data.users.forEach(user => {
                const newUserCard = createUserCard(user);
                append(userTable, newUserCard);
            })
            createTableHead(userTable);
        })
    }
    console.log(state);
}

render();































// const app = document.querySelector('#app');

// let users = [];

// let state = {searches: 0}

// // const headerImage = URL('https://www.pngfind.com/pngs/m/444-4441191_logo-acme-industrial-comtech-hd-png-download.png');

// fetch('https://acme-users-api-rev.herokuapp.com/api/users')
//     .then(response => response.json())
//     .then((data) => {
//         data.users.forEach(user => {
//             users.push(user);
//         })
//         console.log(users);
//     })

// fetch('https://acme-users-api-rev.herokuapp.com/api/users/1')
//     .then(response => response.json())
//     .then((data) => {
//         data.users.forEach(user => {
//             users.push(user);
//         })
//         console.log(users);
//     })
// fetch('https://acme-users-api-rev.herokuapp.com/api/users/2')
//     .then(response => response.json())
//     .then((data) => {
//         data.users.forEach(user => {
//             users.push(user);
//         })
//         console.log(users);
//     })

// // window.scroll(function(){
// //     (".userCard").css("opacity", 1 - $(window).scrollTop() / 250);
// // });

// const createHeader = () => {
//     const headerContainer = document.createElement('div');
//     headerContainer.classList.add('headerContainer');

//     // const header = document.createElement('h1');
//     // header.classList.add('header');
//     // header.innerHTML = 'Acme User Search';

//     const headerImage = document.createElement('img');
//     headerImage.src = './images/AcmeLogo2.png'
//     headerImage.classList.add('headerImage');


//     headerContainer.appendChild(headerImage);
//     return headerContainer;
// }

// const createSearchContainer = () => {
//     const searchContainer = document.createElement('div');
//     searchContainer.classList.add('searchContainer');

//     const inputContainer = document.createElement('div');
//     inputContainer.classList.add('inputContainer');

//     const input = document.createElement('input');
//     input.classList.add('input');
//     input.id = 'input';
//     input.placeholder = 'User Search';

//     const buttonDiv = document.createElement('div');
//     buttonDiv.classList.add('buttonDiv');

//     const searchButtonDiv = document.createElement('div');
//     const searchButton = document.createElement('button');
//     searchButton.classList.add('button');
//     searchButton.id = 'search';
//     searchButton.innerHTML = 'Search';
//     searchButtonDiv.appendChild(searchButton);

//     const clearButtonDiv = document.createElement('div');
//     const clearButton = document.createElement('button');
//     clearButton.classList.add('button');
//     clearButton.innerHTML = 'Clear';

//     clearButton.addEventListener('click', ev => {
//         state.searches = 0;
//         const table = document.querySelector('.table');
//         table.innerHTML = '';
//     })
//     clearButtonDiv.appendChild(clearButton);

//     inputContainer.appendChild(input);

//     buttonDiv.appendChild(searchButtonDiv);
//     buttonDiv.appendChild(clearButtonDiv);

//     searchContainer.appendChild(inputContainer);
//     searchContainer.appendChild(buttonDiv);
//     return searchContainer;
// }

// const topContainer = () => {
//     const top = document.createElement('div');
//     top.classList.add('top');

//     top.appendChild(createHeader());
//     top.appendChild(createSearchContainer());
//     return top;
// }

// const createBody = () => {
//     const bodyContainer = document.createElement('div');
//     bodyContainer.classList.add('bodyContainer');

//     const button = document.querySelector('#search');
//     const table = document.createElement('table');
//     table.classList.add('table');
//     button.addEventListener('click', (ev) => {
//         if (state.searches < 1) {
//             state.searches++;
//             let input = document.querySelector('.input').value;
//             document.querySelector('.input').value = '';
//             users.forEach(user => {
//                 let valid = false;
//                 if (user.fullName.toLowerCase().includes(input.toLowerCase())) {
//                     valid = true;
//                 }
//                 if (user.title.toLowerCase().includes(input.toLowerCase())) {
//                     valid = true;
//                 }
//                 if (user.email.toLowerCase().includes(input.toLowerCase())) {
//                     valid = true;
//                 }
//                 if (valid === true) {
                    
//                     const userCard = document.createElement('tr');
//                     userCard.classList.add('userCard');
    
//                     const imgDiv = document.createElement('td');
//                     imgDiv.classList.add('imgDiv');
//                     const image = document.createElement('img');
//                     image.src = user.avatar;
//                     image.classList.add('image');
//                     imgDiv.appendChild(image);
    
//                     const firstNameDiv = document.createElement('td');
//                     firstNameDiv.classList.add('nameDiv');
//                     const firstName = document.createElement('span');
//                     firstName.innerHTML = user.firstName;
//                     firstNameDiv.appendChild(firstName);
    
//                     const lastNameDiv = document.createElement('td');
//                     lastNameDiv.classList.add('nameDiv');
//                     const lastName = document.createElement('span');
//                     lastName.innerHTML = user.lastName;
//                     lastNameDiv.appendChild(lastName);
    
//                     const emailDiv = document.createElement('td');
//                     emailDiv.classList.add('nameDiv');
//                     const email = document.createElement('span');
//                     email.innerHTML = user.email;
//                     emailDiv.appendChild(email);
    
//                     const titleDiv = document.createElement('td');
//                     titleDiv.classList.add('nameDiv');
//                     const title = document.createElement('span');
//                     title.innerHTML = user.title;
//                     titleDiv.appendChild(title);
    
    
//                     userCard.appendChild(imgDiv);
//                     userCard.appendChild(firstNameDiv);
//                     userCard.appendChild(lastNameDiv);
//                     userCard.appendChild(emailDiv);
//                     userCard.appendChild(titleDiv);
//                     table.appendChild(userCard);
//                 }
//             })
    
//             // const labelDiv = document.createElement('tr');
//             // labelDiv.classList.add('labelDiv');
    
//             // const labelRow = table.insertRow(0);
//             const labelHead = document.createElement('thead')
//             const labelRow = document.createElement('tr');
//             labelRow.classList.add('labelRow');


//             // const avatar = labelRow.insertCell(0);
//             const avatar = document.createElement('th');
//             labelRow.appendChild(avatar);

//             // const firstName = labelRow.insertCell(1);
//             // firstName.outerHTML = '<th>First Name</th>';
//             const firstName = document.createElement('th');
//             firstName.innerHTML = 'First Name';
//             labelRow.appendChild(firstName)

//             // const lastName = labelRow.insertCell(2);
//             // lastName.outerHTML = '<th>Last Name</th>';

//             const lastName = document.createElement('th');
//             lastName.innerHTML = 'Last Name';
//             labelRow.appendChild(lastName)

//             // const email = labelRow.insertCell(3);
//             // email.outerHTML = '<th>Email</th>';

//             const email = document.createElement('th');
//             email.innerHTML = 'Email';
//             labelRow.appendChild(email)

//             // const title = labelRow.insertCell(4);
//             // title.outerHTML = '<th>Title</th>';
//             // table.appendChild(labelRow)

//             const title = document.createElement('th');
//             title.innerHTML = 'Title';
//             labelRow.appendChild(title)
    
//             // const firstNameLabel = document.createElement('td');
//             // firstNameLabel.innerHTML = 'First Name';
//             // labelDiv.appendChild(firstNameLabel);
    
//             // const lastNameLabel = document.createElement('span');
//             // lastNameLabel.innerHTML = 'Last Name';
//             // labelDiv.appendChild(lastNameLabel);
    
//             // const emailLabel = document.createElement('span');
//             // emailLabel.innerHTML = 'Email';
//             // labelDiv.appendChild(emailLabel);
    
//             // const titleLabel = document.createElement('span');
//             // titleLabel.innerHTML = 'Title';
//             // labelDiv.appendChild(titleLabel);

//             labelHead.appendChild(labelRow);
//             table.appendChild(labelHead);
//             bodyContainer.appendChild(table);
//             // bodyContainer.insertBefore(labelDiv, bodyContainer.firstChild);
//         }

//     })
//     return bodyContainer; 
// }

// const render = () => {
//     app.innerHTML = '';
//     // app.appendChild(createHeader());
//     // app.appendChild(createSearchContainer());
//     app.appendChild(topContainer());
//     app.appendChild(createBody());
// }

// render();
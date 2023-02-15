document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        console.log('document.addEventListener ~ users', users);
        const userList = document.getElementById('user-list');
        users.forEach(user => {
          const li = document.createElement('li');
          li.classList.add('user-item');
          li.innerHTML = `
            <span class="user-name">${user.name}</span>
            <span class="user-email">${user.email}</span>
            <span class="user-website">${user.website}</span>
            <div class="buttons">
            <button class="delete-btn" data-id="${user.id}">Remove</button>
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            </div>
          `;
          userList.appendChild(li);
        });
        addEventListeners();
      });
  
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', event => {
      const searchTerm = event.target.value.toLowerCase();
      const userItems = document.querySelectorAll('.user-item');
      userItems.forEach(userItem => {
        const userName = userItem.querySelector('span').textContent.toLowerCase();
        if (userName.includes(searchTerm)) {
          userItem.style.display = 'flex';
        } else {
          userItem.style.display = 'none';
        }
      });
    });
  
    const addUserForm = document.getElementById('add-user-form');
    addUserForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const website = document.getElementById('website').value;
      const newUser = {
        name,
        email,
        website
      };
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(user => {
          const userList = document.getElementById('user-list');
          const li = document.createElement('li');
          li.classList.add('user-item');
          li.innerHTML = `
            <span>${user.name}</span>
            <span>${user.email}</span>
            <span>${user.website}</span>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
            <button class="edit-btn" data-id="${user.id}">Edit</button>
          `;
          userList.appendChild(li);
          addUserForm.reset();
          addEventListeners();
        });
    });
  
    function addEventListeners() {
      const userItems = document.querySelectorAll('.user-item');
      userItems.forEach(userItem => {
        const deleteBtn = userItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', event => {
          // this part and PUT part fetch function I added just for fun and the vibe of good practice coding 
          const userId = event.target.getAttribute('data-id');
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'DELETE',
          })
            .then(() => userItem.remove());
        });
  
        const editBtn = userItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', event => {
          const userId = event.target.getAttribute('data-id');
          const newName = prompt('Enter new name:');
          if (newName) {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
              method: 'PUT',
              body: JSON.stringify({ name: newName }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then(response => response.json())
              .then(user => {
                const userName = userItem.querySelector('span');
                userName.textContent = user.name;
              });
          }
        });
      });
    }
});
      
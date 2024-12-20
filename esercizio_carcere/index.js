



document.addEventListener('DOMContentLoaded', async ()=>{

    const usersResponse = await fetch('http://dms.cyberdelia.eu/api/v1/user');
    const usersRaw = await usersResponse.json();
    // const users = usersRaw.filter((user) => {
    //     return user.firstname && user.lastname;
    // });

    //destructuring 
    // const users = usersRaw.filter(({ firstname, lastname}) => {
    //     return firstname && lastname;
    // });

    //instant return arrow function
    let usersInPrison = usersRaw.filter(({ firstname, lastname}) => (firstname && lastname) );
    let freeUsers = [];
    const prison = document.getElementById('prison');
    const freedom = document.getElementById('freedom');
    


    const judgeAction = (action, user) => {
        if(action == 'Scarcera'){
            usersInPrison = usersInPrison.filter((u) => {
                return user.id != u.id;
            });
            freeUsers.push(user);
            populate(usersInPrison, action, prison);
            action = 'Incarcera';
            populate(freeUsers, action, freedom);
            return; 
        }
        if(action == 'Incarcera'){
            freeUsers = freeUsers.filter((u) => {
                return user.id != u.id;
            });
            usersInPrison.push(user);
            populate(freeUsers, action, freedom);
            action = 'Scarcera';
            populate(usersInPrison, action, prison);
            return;  
        }
        
    }

    const populate = (users, action, root) =>{
        
        root.innerHTML = "";
        const container = document.createElement('ul');
        container.classList.add('list');
        root.appendChild(container);

        users.forEach((user) => {
            
            const item = document.createElement('li');
            container.appendChild(item);
            const card = document.createElement('div');
            card.classList.add('card');
            item.appendChild(card);

            const firstName = document.createElement('h3');
            firstName.textContent = user.firstname;
            card.appendChild(firstName);

            const lastName = document.createElement('h3');
            lastName.textContent = user.lastname;
            card.appendChild(lastName);

            const actionBtn = document.createElement('button');
            actionBtn.textContent = action;
            actionBtn.classList.add('actionBtn');
            card.appendChild(actionBtn);

            actionBtn.addEventListener('click',() => {
                judgeAction(action, user);
            });
        });
    
    }

    populate(usersInPrison, 'Scarcera', prison);
    

})

// ul -> li -> div -> h3 ->
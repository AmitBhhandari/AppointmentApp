var btn = document.querySelector('.btn');
btn.addEventListener('click', (e)=>{
    document.querySelector('.btn').style.color = "white";
    document.querySelector('.btn').style.background = "black";
});



window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        addUser(userDetailsObj)
    }
})

function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;

    let obj = {
        name,
        email,
      }
      localStorage.setItem(obj.email,JSON.stringify(obj));
      addUser(obj);
}

function addUser(user){
    if(localStorage.getItem(user.email)!== null){
        removeUser(user.email);
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name}- ${user.email}
    <button class="editbtn" onCLick=editUser('${user.name}','${user.email}')>Edit</button>
    <button class="deletebtn" onCLick=deleteUser('${user.email}')>X</button>
     
    </li>`;
    parentNode.innerHTML =  parentNode.innerHTML + childHTML;
}

function deleteUser(emailId){
    // console.log(emailId)
    localStorage.removeItem(emailId);
    removeUser(emailId);
}

function removeUser(emailId){
    const parentNode = document.getElementById('listOfUsers');
    const deletingChildNode = document.getElementById(emailId);
    if(deletingChildNode){
        parentNode.removeChild(deletingChildNode);

    }
    
}   
function editUser(name,emailId){
    document.getElementById('username').value = name;
    document.getElementById('emailId').value = emailId;
    deleteUser(emailId);

}
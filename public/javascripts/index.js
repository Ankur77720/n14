// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[ 0 ];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
var chats = document.querySelector('.chats')
var right = document.querySelector('#right')
console.log(chats)

var currentOppositeUser = ""

function addChat(username, image) {
  chats.innerHTML += `<div onclick="openChat('${username}','${image}')"  class="chat">
    <img src=${image} alt="">
    <div class="text">
      <h2>${username}</h2>
    </div>
  </div>`
}
async function openChat(username, image) {
  currentOppositeUser = username
  //   `<div class="conver incoming">
  //   <div class="msg">helloassdfdsgfghhhhhhhhhhhhhhhh</div>
  //   <div class="time">25/2/23</div>
  // </div>
  // <div class="conver outgoing">
  //   <div class="msg">hellodsffffffffffffffffffffffffffff</div>
  //   <div class="time">25/2/23</div>
  // </div>`


  right.innerHTML = `<div class="nav">
  <div class="user">
    <img src=${image} alt="">
    <h2>${username}</h2>
  </div>
  </div>
  <div class="conversation">
    
  </div>
   <input type="text" onchange="newmsg()" id="newmsg" placeholder="start new conversation" />
  `
}

var form = document.querySelector("#findUser")
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  var userDeatail = document.querySelector('#userDetail')

  var response = await axios.post('/findUser', {
    data: userDeatail.value
  })
  if (response.data.isUserThere) {
    addChat(response.data.user.username, response.data.user.pic)
  }
  else {
    alert('no user found')
  }
})







function findUser() {



}
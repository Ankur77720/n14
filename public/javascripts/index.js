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

function addChat(username, image) {
    chats.innerHTML += `  <div class="chat">
    <img src=${image} alt="">
    <div class="text">
      <h2>${username}</h2>
    </div>
  </div>`
}
async function openChat(username, image) {
    right.innerHTML = `<div class="nav">
  <div class="user">
    <img src=${image} alt="">
    <h2>${username}</h2>
  </div>
  </div>
  <div class="conversation">
  <div class="conver incoming">
    <div class="msg">helloassdfdsgfghhhhhhhhhhhhhhhh</div>
    <div class="time">25/2/23</div>
  </div>
  <div class="conver outgoing">
    <div class="msg">hellodsffffffffffffffffffffffffffff</div>
    <div class="time">25/2/23</div>
  </div>
  </div>`
}
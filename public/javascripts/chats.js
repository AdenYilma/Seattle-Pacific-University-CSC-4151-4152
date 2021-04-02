var socket = io();

var chats = document.getElementById('chatList');
var messages = document.getElementById('messages');
var username = document.getElementById('username').innerText;
// var username = sessionStorage.username;
var url = 'https://lingojiveapi.herokuapp.com/chats';
// var url2 = 'https://lingojiveapi.herokuapp.com/directmessages/';
var chatID;

var form = document.getElementById('form');
var input = document.getElementById('chatMsg');

url += "/" + username;
console.log("Username: " + username);
console.log("URL: " + url);
var xhttp = new XMLHttpRequest();


function showMessages(id){
    var xhttp2 = new XMLHttpRequest();
    var url2 = 'https://lingojiveapi.herokuapp.com/directmessages/';

    xhttp2.onreadystatechange = function() {
        console.log("Called");
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            messages.innerHTML = '';
            var response = JSON.parse(this.responseText);
            for(let i = 0; i < response.length; ++i){
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(response[i].Message);
                messages.appendChild(span).append(response[i].Sender);
            }
            window.scrollTo(0, document.body.scrollHeight);
        }
    };

    // alert("show messages for " + id);
    url2 += id;
    // alert(url2);
    chatID = id;
    xhttp2.open("GET", url2, true);
    xhttp2.send();
}

xhttp.onreadystatechange = function() {
    console.log("Called");
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        // messages.innerHTML = '';
        var response = JSON.parse(this.responseText);
        for(let i = 0; i < response.length; ++i){
            let li = document.createElement("li");
            // let link = document.createElement("a");

            // link.href = "/chats?chat=" + response[i]._id;
            // link.href = "/chats/" + response[i]._id;

            // let span = document.createElement("span");
            // link.className = "linkClass";
            // link.id = response[i]._id;
            // chats.appendChild(li);
            // let text = document.createTextNode(response[i].Name);
            // link.appendChild(text);
            // li.appendChild(link);

            li.className = "linkClass";
            li.id = response[i]._id;
            chats.appendChild(li);
            let text = document.createTextNode(response[i].Name);
            li.appendChild(text);
            li.addEventListener("click", function(){
                showMessages(li.id);
            });

            // var item = document.createElement('li');
            // item.textContent = response[i].Body;
            // // messages.appendChild(item);
            // messages.prepend(item);
            // var user = document.createElement('div');
            // user.textContent = response[i].Name;
            // item.prepend(user);
        }
        // var element = document.getElementsByClassName("linkClass");
        // for(var i = 0; i < element.length; ++i){
        //     // element[i].onclick = showMessages();
        //     element[i].addEventListener("click", showMessages(), false);
        // }
        window.scrollTo(0, document.body.scrollHeight);
    }
};

xhttp.open("GET", url, true);
xhttp.send();

form.addEventListener('submit', function(e) {
    var xhttp3 = new XMLHttpRequest();
    var url3 = 'https://lingojiveapi.herokuapp.com/directmessages/';

    e.preventDefault();
    if (input.value) {
        var message = input.value;
        var sender = document.getElementById('username').innerText;
        var params = 'Sender='+sender+'&Message='+message+'&ChatID='+chatID;
        input.value = '';

        xhttp3.open("POST", url3,
            true);
        xhttp3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp3.send(params);

        socket.emit("direct message", {Sender: sender, Message: message, ChatID: chatID});
    }
});

socket.on("direct message sent", data => {
    alert("message!");
});

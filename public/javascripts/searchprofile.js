function CreateTable(users){
    let table = "";
    table =
        '<table class="table table-bordered table-hover"> \n' +
        '   <thead>\n' +
        '       <tr>\n' +
        '           <th scope="col">Username</th> \n'+
        '           <th scope="col">First Name</th> \n'+
        '           <th scope="col">Last Name</th> \n'+
        '       </tr>\n' +
        '   </thead>\n' +
        '   <tbody>\n';

    for (let user in users){
        table +=
            '       <tr>\n' +
            '           <td>' + users[user]["username"]+  '</td>\n' +
            '           <td>' + users[user]["firstname"]+  '</td>\n' +
            '           <td>' + users[user]["lastname"]+  '</td>\n' +
            '       </tr>\n';
    }

    table +=
        '   </tbody>\n' +
        '</table>\n'
    return table;
}
// Need to figure something out for username or name CONTAINING input
document.getElementById("btnLoadUsersByName").addEventListener("click", (event) =>{
    document.getElementById("output").innerHTML = "";
    let url = "http://lingojiveapi.herokuapp.com/users/?firstname=" + document.getElementById("firstname").value;
    //figure something out for last name
    //let url2 = "http://lingojiveapi.herokuapp.com/users/?lastname=" + document.getElementById("lastname").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});
document.getElementById("btnLoadUsersByUsername").addEventListener("click", (event) =>{
    document.getElementById("output").innerHTML = "";
    let url = "http://lingojiveapi.herokuapp.com/users/" + document.getElementById("Username").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("output").innerHTML =
                CreateTable(JSON.parse(this.responseText));
        } else if (this.status == 404) {
            document.getElementById("output").innerHTML =
                "<pre>" + this.responseText + "</pre>" + "<p></p>" +"<pre>" +
                "Please enter in a valid Username" + "</pre>";
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});
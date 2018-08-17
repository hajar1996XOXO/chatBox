
//TO INSERT REAL MESSAGES IN INDEX.HTML
//recuperer les 20 derniers messages
function getMessages() {
    //create an ajax object =http request, to connect to server
    const requeteAjax=new XMLHttpRequest();
    requeteAjax.open("GET","handler.php");//sends a request to the file handler.php, and execute this file
    //in it we have getMessages function that will be executed

    //when receiving response from the server,our new request is
    requeteAjax.onload=function () {
        const resultat=JSON.parse(requeteAjax.responseText);//server's response
        //console.log(resultat);//voir ce que server a envoye

        //reverse coz if not array of db will be printed in reverse
        const html=resultat.reverse().map(function(message){  //map method calls this function on each element of the array
            return `
            <div class="msg_history">
                        <div class="incoming_msg">
                            <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                            <div class="received_msg">
                                <div class="received_withd_msg">
                                    <p><span class="author" style="color:#05728f"><strong>${message.author}</strong> </span> ${message.content}</p>
                                    <span class="time_date"> ${message.created_at.substring(11,16)}    </span></div>
                            </div>
                        </div>
                    </div>`
        }).join('');//coller tous les elements du tableau en un seul string

        const  messages=document.querySelector(".scrollingDiv");//get the element that has class messages
        messages.innerHTML=html;
        messages.scrollTop=messages.scrollHeight;
    }

    //send our new request to the server
    requeteAjax.send();


}
//when sending a message must instantly update page without reloading
function postMessage(event) {
    //stop submit of form
    event.preventDefault();

    //get data from form
    const author=document.querySelector("#author");
    const content=document.querySelector("#content");

    const data=new FormData();//transformform into this to easly send it in the xmlhttp request
    data.append('author',author.value);
    data.append('content',content.value);

    //post request to send data
    const requeteAjax=new XMLHttpRequest();
    requeteAjax.open("POST","handler.php?task=write");//postMessages in handler.php will be executed and what it returns is the server's response

    //new requset to server's response
    requeteAjax.onload=function(){
        content.value='';
        content.focus();
        getMessages();
    }
    requeteAjax.send(data);


}
//listening to the form in index.html,and when submit we call function postMessages
document.querySelector('form').addEventListener('submit',postMessage);


//call an action all time
const interval=window.setInterval(getMessages(),3000);
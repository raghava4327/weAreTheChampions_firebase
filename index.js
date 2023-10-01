//set up for the firebase database
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getDatabase, ref,push, onValue,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
const appSettings={
    databaseURL:"https://endorsements-e0b63-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app=initializeApp(appSettings)
const database=getDatabase(app)
const messagesInDb=ref(database,"endorsementMessages/message")
const fromAddInDb=ref(database,"endorsementMessages/message/from")
const toAddInDb=ref(database,"endorsementMessages/message/to")

//function renders when any change in database
//display the database elements
onValue(messagesInDb,function(snapshot){
    if(snapshot.exists()){
        clearMessages()
    let messagesArray=Object.entries(snapshot.val())
    for(let i=0;i<messagesArray.length;i++){
        appendMessages(messagesArray[i])
        console.log(messagesArray[i])
    }}
    else{
        endoreseMessages.innerHTML="<span>No Endorsements </span>"
    
    }
    
})

//declaration of DOM
let endoreseMessages=document.getElementById("list-of-messages")
let publishButton=document.getElementById("publish-button")
let input=document.getElementById("message")
let fromVal=document.getElementById("from")
let toVal=document.getElementById("to")
//adding eventListener to button 
publishButton.addEventListener("click",function(){
    let inputMessage=getInput()
    push(messagesInDb,inputMessage)
    input.value=""
    fromVal.value=""
    toVal.value=""
    
})

//appending the messages to the list from database and also adding the remove functionality
function appendMessages(message){
    console.clear()
    let messageId=message[0]
    let messageObject=message[1]
    console.log(messageObject)
    let liEl=document.createElement("li")
    liEl.innerHTML=`
                    <p class="display-from-to">To <span> ${messageObject.to}</span></p>      
                    <p id="display-messages">${messageObject.message}</p>
                    <p class="display-from-to">From <span> ${messageObject.from}</span></p>
                    `
    liEl.addEventListener("dblclick",function(){
        console.log(messageId)
        let exactLocationOfMessage=ref(database,`endorsementMessages/message/${messageId}`)
        console.log(exactLocationOfMessage)
        console.log(remove(exactLocationOfMessage))
    })
    endoreseMessages.append(liEl)
}
//clearing the messages in unordered list
function clearMessages(){
    endoreseMessages.innerHTML=""
}
function getInput(){
    const entireMessage={
        message:input.value,
        from:fromVal.value,
        to:toVal.value
    }
    return entireMessage
}
let knowledge = {
    'hello': {
        response: `hi, what's your name?`,
        onReplied: (replyMsg) => {
            
            return `Oh you welcome, ${replyMsg}`
        }
    },
    'lol':'I am happy to be able  to make you laugh'
}



let messages = [

]

/*
{
        sender: 'bot|you',
        content:''
    }
*/

let pendingKnowlegeKey = null
let onReplied = null

function sendMessage() {
    let textInput = document.getElementById('input-text');
    let inputTrimmed = textInput.value.trim().toLowerCase();

    messages.push({
        sender: 'you',
        content: textInput.value
    })

    if (pendingKnowlegeKey) {
        knowledge[pendingKnowlegeKey] = textInput.value;
        messages.push({
            sender: 'bot',
            content: "Thank you for teaching me that :)"
        })
        pendingKnowlegeKey = null;
        renderMessages();
        textInput.value = ""
        return;
    }

    let response = knowledge[inputTrimmed];

    if(onReplied != null){
        messages.push({
            sender: 'bot',
            content: onReplied(textInput.value)
        })
        onReplied = null
    }else if (typeof response == 'undefined') {
        pendingKnowlegeKey = inputTrimmed;
        messages.push({
            sender: 'bot',
            content: "Sorry I don't understand what you are saying :( can you tell me the answer to that ?"
        })
    } else if(typeof response == 'string') {
    
        messages.push({
            sender: 'bot',
            content: knowledge[inputTrimmed]
        })
        renderMessages();

    } else if(typeof response == 'object'){
        onReplied = response.onReplied
        messages.push({
            sender: 'bot',
            content: response.response
        })
    }
    textInput.value = ""
    renderMessages();

}

function renderMessages() {
    let chatContent = document.getElementById('chat-content');
    let chatWrap = document.querySelector(".chat");
    chatContent.innerHTML = "";

    for (let msg of messages) {
        if (msg.sender == 'bot') {
            chatContent.innerHTML += `<div class="jenny">
            <img src="./chatbot.png" alt="">
            <span class="jenny-msg">
                ${msg.content}
            </span>
            </div>`
        } else {
            chatContent.innerHTML += `<div class="you"><span class=" you-msg">
            ${msg.content}
        </span></div>`
        }
    }

    chatWrap.scrollTop = chatWrap.scrollHeight;//

}


let submitButton = document.getElementById('submit-button')

submitButton.addEventListener("click", sendMessage)




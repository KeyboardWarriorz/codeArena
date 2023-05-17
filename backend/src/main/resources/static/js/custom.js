let $chatHistory;
let $button;
let $textarea;
let $chatHistoryList;

function init() {
    cacheDOM();
    bindEvents();
}

function bindEvents() {
    $button.on('click', addMessage.bind(this));
    $textarea.on('keyup', addMessageEnter.bind(this));
}

function cacheDOM() {
    $chatHistory = $('.chat-history');
    $button = $('#sendBtn');
    $textarea = $('#message-to-send');
    $chatHistoryList = $chatHistory.find('ul');
}

function render(roomName) {
    $chatHistoryList.empty();
    $.get(url+"/chat/"+roomName,function(response){

        console.log(response)
        let messages = response;
        for(let i = 0;i<messages.length;i++){
            if(messages[i].fromLogin == $('#userName').val()){
                var template = Handlebars.compile($("#message-template").html());
                var context = {
                    messageOutput: messages[i].message,
                    time: 0,
                    toUserName: messages[i].fromLogin
                };
                $chatHistoryList.append(template(context));
            }
            else{
                var templateResponse = Handlebars.compile($("#message-response-template").html());
                var contextResponse = {
                    response: messages[i].message,
                    time: 0,
                    userName: messages[i].fromLogin
                };
                $chatHistoryList.append(templateResponse(contextResponse));
            }
        }
    })
    setTimeout(scrollToBottom,500);
    // responses

    //
    // setTimeout(function () {
    //     $chatHistoryList.append(templateResponse(contextResponse));
    //     scrollToBottom();
    // }.bind(this), 1500);
}

function sendMessage(message) {
    let username = $('#userName').val();
    if (message!='\n') {
        sendMsg(username, message);
    }
    $textarea.val('');
    scrollToBottom();
}

function scrollToBottom() {
    $chatHistory.scrollTop($chatHistory[0].scrollHeight);
}

function getCurrentTime() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}

function addMessage() {
    sendMessage($textarea.val());
}

function addMessageEnter(event) {
    // enter was pressed
    if (event.keyCode === 13) {
        addMessage();
    }
}

init();


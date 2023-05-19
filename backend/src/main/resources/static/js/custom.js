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

function render(message) {
    if(message.fromLogin == $('#userName').val()){
        console.log("same")
        var template = Handlebars.compile($("#message-template").html());
        var context = {
            messageOutput: message.message,
            time: 0,
            toUserName: message.fromLogin
        };
        $chatHistoryList.append(template(context));
    }
    else{
        console.log("not")
        var templateResponse = Handlebars.compile($("#message-response-template").html());
        var contextResponse = {
            response: message.message,
            time: 0,
            userName: message.fromLogin
        };
        $chatHistoryList.append(templateResponse(contextResponse));
    }
    setTimeout(scrollToBottom,10);
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


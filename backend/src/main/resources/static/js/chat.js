const url = "http://3.36.247.81:8080";
let stompUserClient;
let selectedRoom;
let subscription=null;
let timeoutId=false;
let description = "";
function connectToRoom(roomName) {
    console.log("connecting to chat...")
    const userName = document.getElementById("userName").value;
    document.getElementById("roomName").value = roomName;
    $.post(url+'/game/room/join', { "room_name": roomName, "user_id": userName,"prev_room":selectedRoom })
        .done(function(response) {
            // 성공적으로 응답을 받았을 때 실행될 콜백 함수
            console.log(response);
        })
        .fail(function(error) {
            // 요청이 실패했을 때 실행될 콜백 함수
            console.error(error);
            alert('서버 요청에 실패하였습니다.');
        });
    sendBroadcast("Room Created");
    if (subscription) subscription.unsubscribe()
    subscription = stompUserClient.subscribe("/topic/messages/" + roomName, function (response) {
        let data = JSON.parse(response.body);
        if (data.type == "message") {
            render(data);
        }
        else if (data.type == "question") {
            showQuestion(data.question,data.answer,data.answer_index);
            description = data.description;
            timeoutId=setTimeout(sendAnswer,10000,"0");
        }
        else if (data.type == "end") {
            showQuestion("winner is "+data.winner, data.userScore,"0")
            $("#startGameBtn").show();

        }
        })
    fetchAll();
}

function showQuestion(question,answer,answer_index) {
    if (answer.length == 4) {       //4지선다이면

    }
    else if (answer.length == 2) {      //OX퀴즈이면

    }
    let userTemplateHtml = "";
    $("#question").html(question);
    for(let i=0;i<answer.length;i++){
        if (i == answer_index - 1) {
            userTemplateHtml+="<button onclick='sendAnswer(\"1\")'>"+answer[i]+"</button>\n";
        }
        else userTemplateHtml+="<button onclick='sendAnswer(\"0\")'>"+answer[i]+"</button>\n";
    }
    $("#answerList").html(userTemplateHtml);
}
function sendAnswer(isCorrect) {
    const userName = document.getElementById("userName").value;
    const roomName = document.getElementById("roomName").value;
    if (isCorrect=="1") {
        $("#answerList").html("정답입니다\n\n"+description);
    } else {
        $("#answerList").html("오답입니다\n\n"+description);
    }
    clearTimeout(timeoutId);
    setTimeout(function () {
        $.post(url+'/game/answer', { "room_name": roomName, "user_name": userName,"isCorrect": isCorrect })
            .done(function(response) {
                // 성공적으로 응답을 받았을 때 실행될 콜백 함수
                console.log(response);
            })
            .fail(function(error) {
                // 요청이 실패했을 때 실행될 콜백 함수
                console.error(error);
                alert('서버 요청에 실패하였습니다.');
            });
    }, 3000);

}

function startGame() {
    const roomName = document.getElementById("roomName").value;
    $("#startGameBtn").hide();
    $.post(url+'/game/start', { "room_name": roomName })
        .done(function(response) {
            // 성공적으로 응답을 받았을 때 실행될 콜백 함수
            console.log(response);
        })
        .fail(function(error) {
            // 요청이 실패했을 때 실행될 콜백 함수
            console.error(error);
            alert('서버 요청에 실패하였습니다.');
        });
}

function connectToServer() {
    console.log("connecting to server...")
    let userName = document.getElementById("userName").value;
    let socket = new SockJS(url + '/room');
    stompUserClient = Stomp.over(socket);
    stompUserClient.connect({}, function (frame) {
        console.log("connected to: " + frame);
        sendBroadcast(userName+" logined");
        stompUserClient.subscribe("/topic/room", function (response) {
            let data = JSON.parse(response.body);
            console.log(data.message)
            fetchAll();
        });
    });
    fetchAll();
}

function sendBroadcast(message){
    let username = $('#userName').val();
    stompUserClient.send("/app/room",{},JSON.stringify({
        fromLogin: username,
        message: message,
        type: "broadcast"
    }));
}

function sendMsg(from, text) {
    stompUserClient.send("/app/chat/" + selectedRoom, {}, JSON.stringify({
        fromLogin: from,
        message: text,
        type: "message"
    }));
}

function registration() {
    let userName = document.getElementById("userName").value;
    $.get(url + "/registration/user/" + userName, function (response) {
        connectToServer();
    }).fail(function (error) {
        if (error.status === 400) {
            alert("Login is already busy!")
        }
    })
}

function addRoom() {
    let roomName = document.getElementById("roomName").value;
    let userName = document.getElementById("userName").value;
    // $.get(url + "/registration/room/" + userName, function (response) {
    //     connectToRoom(userName)
    // }).fail(function (error) {
    //     if (error.status === 400) {
    //         alert("Login is already busy!")
    //     }
    // })
    $.post(url + "/game/room", {
        "room_name": roomName,
        "user_id": userName
    }).done(function (data) {
        console.log(data)
        selectRoom(roomName)
    }).fail(function (jqXHR) {
        console.log(jqXHR);
    });
}

function selectRoom(roomName) {
    console.log("selecting room: " + roomName);
    if (selectedRoom == roomName) {
        return
    }
    selectedRoom = roomName;
    $('#selectedUserId').html('');
    $('#selectedUserId').append('Chat with ' + roomName);
    $chatHistoryList.empty();
    connectToRoom(roomName);
}

function leaveRoom() {
    const roomName = document.getElementById("roomName").value;
    const userName = document.getElementById("userName").value;
    sendBroadcast(userName + " leaved the room");
    if (subscription) subscription.unsubscribe();
    $.post(url + "/game/room/leave", {
        "room_name": roomName,
        "user_id": userName
    }).done(function (data) {
        console.log(data)
    }).fail(function (jqXHR) {
        console.log(jqXHR);
    });
}

function fetchAll() {
    $.get(url + "/game/roomList", function (response) {
        let rooms = response;
        let usersTemplateHTML = "";
        console.log(response)
        for (let i = 0; i < rooms.length; i++) {
            usersTemplateHTML = usersTemplateHTML + '<a onclick="selectRoom(\'' + rooms[i].roomName + '\')"><li class="clearfix">\n' +
                '                <div class="about">\n' +
                '                    <div id="userNameAppender_' + rooms[i].roomName + '" class="name">' + rooms[i].roomName+"["+rooms[i].users.length+"]" +" "+rooms[i].category_id+'</div>\n' +
                '                    <div class="status">\n' +
                '                        <i class="fa fa-circle offline"></i>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </li></a>';
        }
        $('#usersList').html(usersTemplateHTML);
    });
}

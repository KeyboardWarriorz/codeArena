// globals.js
let stompUserClient = null;
let subscription = null;
export function setStompUserClient(client) {
    stompUserClient = client;
}

export function getStompUserClient() {
    if (stompUserClient==null){
        console.log("client is null")
    }
  return stompUserClient;
}

export function setSubscription(sub) {
  subscription = sub;
}

export function getSubscription() {
    if (subscription==null){
        console.log("sub is null")
    }
  return subscription;
}

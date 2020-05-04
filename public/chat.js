// Make socket Connection
const socket = io.connect('http://localhost:80')

// Query DOM
const message = document.getElementById('message');
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output'),
chatWindow = document.getElementById("chat-window"),
feedback = document.getElementById('feedback');

//########## Emit events 

// send input as objects
btn.addEventListener('click', () => {
    socket.emit('chat-msg', {
        message: message.value,
        handle: handle.value
    })
    message.value = ''
})

// emit that the socket is typing (keydown detect backspace)
message.addEventListener('keydown', () => {
    socket.emit('typing', handle.value)
})

//########## listen for events

socket.on('chat-msg', (data) => {
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
    chatWindow.scrollTop = chatWindow.scrollHeight; // stick scrollbar to bottom
})

socket.on('typing', (data) => {
    //if(data.message == 0){feedback.innerHTML = ''; return} // one behind, fix (async?)
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
    //console.log(data.message)
})

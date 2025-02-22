<template>
  <div>
    <input type="number" v-model="userIDDD">
    <button @click="handleSetUserId">Set Id</button>
    <ChatPopup @sendMessage="handleSendMessage"
               @closeChat="receiver_id=null"
               :users="contacts"
               :user="receiver_id??{}"
               @openChat="openChat"
    >
    </ChatPopup>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import socketService from '@/services/socketioService'
import ChatPopup from '@/components/ChatPopup.vue'


const contacts = ref([])
const receiver_id = ref()
const sender_id = ref()
const userIDDD = ref(localStorage.getItem('userId'))
const myNumbers = ref([])
const handleSetUserId = () => {
  localStorage.setItem('userId', userIDDD.value)
}

onMounted(() => {
  const userId = localStorage.getItem('userId')
  let user = { id: userId }
  sender_id.value = user?.id ?? 88
  socketService.initialize()
  socketService.connect()
  socketService.emit('loadUserList')
  socketService.on(`messageSendSuccessfully`, handleMessageSendSuccessfully)
  socketService.on('usersList', handleLoadUsersList)
  socketService.on('messageList', handleMessagesList)
  socketService.on('myContacts', handleVirtualContacts)
  socketService.on('test', (data) => {
    console.log('test', data)
  })

})

const handleMessageReceived = (data) => {
  console.log(data)
  let item = contacts.value.find((item) => item.sender_number == data.receiver_number)

  if (item && receiver_id.value?.sender_number !== data.receiver_number) {
    item.count = (item?.count ?? 0) + 1
  }
  if (item) {
    if (item?.messages) {
      item.messages.push(data)
    } else {
      item.messages = [data]
    }
    item.last_msg = data.message
  }
  if (!item) {
    socketService.emit('loadUserList')
  }
  scrollToBottom()
}

const handleLoadUsersList = (users) => {
  contacts.value = users
}

const handleMessageSendSuccessfully = (data) => {

  if (receiver_id.value?.receiver_number === data.receiver_number) {
    receiver_id.value.messages.push(data)
    receiver_id.value.last_msg = data.message
  }
  scrollToBottom()
}
const openChat = (user) => {
  console.log(user)
  user.count = 0
  receiver_id.value = user
  socketService.emit('loadMessages', {
    to: user.sender_number,
    from: user.receiver_number,
    offset: 0,
    is_new_app: 1
  })
}

const handleMessagesList = (data) => {
  if (receiver_id.value) {
    receiver_id.value.messages = data
  }
  scrollToBottom()
}
const handleSendMessage = (message) => {
  const messageData = {
    sender_number: receiver_id.value.sender_number,
    receiver_number: receiver_id.value.receiver_number,
    virtual_number: receiver_id.value.virtual_number,
    otherNumber: receiver_id.value.otherNumber,
    userid: '88',
    receiver_img_uri: 'sgsgsgvsgd',
    receiver_name: 'testing from app with operatorer api please confirm once tou recived ',
    org_id: '14',
    message: message,
    is_sender: 'true'
  }
  socketService.emit(`sendMessage`, messageData)
}


const handleDisconnect = (data) => {
  console.log('Received data:', data)
}

function scrollToBottom() {
  setTimeout(() => {
    const chatContainer = document.getElementById('chatMessage')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, 100)
}

const handleVirtualContacts = (contacts) => {

  contacts.map((item) => {
    if (!myNumbers.value.includes(item)) {
      console.log(`Register number : ${item}`)
      socketService.on(item, handleMessageReceived)
      myNumbers.value.push(item)
    }
  })
}

onBeforeUnmount(() => {
  console.log('disconnected')
  socketService.disconnect()
  myNumbers.value.map((item) => {
    socketService.off(item, handleDisconnect)
  })
  socketService.off(`messageSendSuccessfully`)
  socketService.off('usersList')
  socketService.off('messageList')
  socketService.off('searchList')
  socketService.off('myContacts')
})

</script>



import { io } from 'socket.io-client'

const SOCKET_SERVER_URL = 'wss://smsc.tech' // Replace this with your actual server URL
// const SOCKET_SERVER_URL = 'http://localhost:4444' // Replace this with your actual server URL
class SocketClient {
  constructor() {
    this.socket = null
  }

  initialize() {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    this.socket = io(SOCKET_SERVER_URL, {
      autoConnect: false,
      withCredentials: true, // Ensure cookies are sent with the socket connection
      auth: {
        token: userId // Send the userId token (or JWT) to the server, if needed
      },
      transports: ['websocket'] // Enable WebSocket and long-polling if needed
    })

    this.socket.on('connect', () => console.log('Socket Connected'))
    this.socket.on('disconnect', (reson) => console.log('Socket Disconnected', reson))

    this.connect()
  }

  connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect()
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event, callback) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback)
      } else {
        this.socket.off(event)
      }
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

const socketService = new SocketClient()
export default socketService

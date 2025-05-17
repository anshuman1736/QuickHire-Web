import { WEBSOCKET_URL } from "@/lib/config";
import { WSClientMessage } from "@/types/ws.messages";
import { useCallback, useEffect, useState } from "react";

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>();
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId]=useState<string>('')



  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      console.log("No UserId found");
    }
    setUserId(userId ?? '')
    const ws = new WebSocket(`${WEBSOCKET_URL}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket Server");
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected the Web Socket");
      setIsConnected(false);
      setSocket(null);
    };

    ws.onmessage = (event) => {
      try {
        const message: WSClientMessage = JSON.parse(event.data);

        if (message.type === "message") {
        } else if (message.type === "error") {
          console.error("WebSocket error:", message.payload.message);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };


  },[]);

  


  const joinRoom = useCallback((roomID: string)=>{
    if(!socket){
        console.log("WebSocket Not Connected");
        return
        
    }
    if(!userId){
        console.log("UserId Not Found");
        return
    }
    const message: WSClientMessage = {
        type: "join",
        payload: {
            roomId: roomID,
            senderId: userId
        }
    }
    socket.send(JSON.stringify(message));
  },[socket, userId])



  const leaveRoom = useCallback((roomID: string)=>{
    if(!socket){
        console.log("WebSocket Not Connected");
        return
        
    }
    if(!userId){
        console.log("UserId Not Found");
        return
    }
    const message: WSClientMessage = {
        type: "leave",
        payload: {
            roomId: roomID,
            senderId: userId
        }
    }
    socket.send(JSON.stringify(message));
  },[socket, userId])

  const sendMessage = useCallback((roomID: string, message: string)=>{
    if(!socket){
        console.log("WebSocket Not Connected");
        return
        
    }
    if(!userId){
        console.log("UserId Not Found");
        return
    }
    if(!roomID){
        console.log("RoomId Not Found")
        return
    }
    const msg: WSClientMessage = {
        type: "message",
        payload: {
            roomId: roomID,
            message: message,
            senderId: userId
        }
    }
    socket.send(JSON.stringify(msg));
  },[socket, userId])



  return {
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
  };
};



export default useWebSocket;
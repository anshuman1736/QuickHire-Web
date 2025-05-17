export interface WSClientMessage {
    type: 'join' | 'leave' | 'message'| 'error';
    payload: {
      roomId: string;
      senderId?: string;
      message?: string;
    };
  }  
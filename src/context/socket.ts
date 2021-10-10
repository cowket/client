import React from 'react';
import { Socket } from 'socket.io-client';

type SocketContextType = {
  socket?: Socket;
};

const initialValue: SocketContextType = {
  socket: undefined,
};

const socketContext = React.createContext<SocketContextType>(initialValue);

export default socketContext;

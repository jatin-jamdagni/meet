import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "@/service/config";
interface WSContextType {
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: any) => void;
  off: (event: string) => void;
  removeListner: (listnerName: string) => void;
  disconnect: () => void;
}

interface WSProviderProps {
  children: React.ReactNode;
}

const WSContext = createContext<WSContextType | undefined>(undefined);

/**
 * WSProvider component provides WebSocket functionalities to its children components.
 * It initializes a WebSocket connection and provides methods to interact with the WebSocket.
 *
 * @component
 * @param {WSProviderProps} props - The properties for the WSProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the WebSocket functionalities.
 *
 * @returns {JSX.Element} The WSProvider component.
 *
 * @typedef {Object} WSProviderProps
 * @property {React.ReactNode} children - The child components that will have access to the WebSocket functionalities.
 *
 * @typedef {Object} SocketService
 * @property {() => void} initializeSocket - Initializes the WebSocket connection.
 * @property {(event: string, data?: any) => void} emit - Emits an event with optional data to the WebSocket server.
 * @property {(event: string, callback: any) => void} on - Registers a callback for a specific event from the WebSocket server.
 * @property {(event: string) => void} off - Unregisters a callback for a specific event from the WebSocket server.
 * @property {(listenerName: string) => void} removeListener - Removes a specific listener from the WebSocket server.
 * @property {() => void} disconnect - Disconnects the WebSocket connection.
 */
export const WSProvider: React.FC<WSProviderProps> = ({ children }) => {
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      transports: ["websockets"],
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const emit = (event: string, data?: any) => {
    if (socket.current) {
      socket.current.emit(event, data);
    }
  };

  const on = (event: string, callback: any) => {
    if (socket.current) {
      socket.current.on(event, callback);
    }
  };

  const off = (event: string) => {
    if (socket.current) {
      socket.current.off(event);
    }
  };

  const removeListner = (listnerName: string) => {
    if (socket.current) {
      socket.current.removeListener(listnerName);
    }
  };

  const disconnect = () => {
    if (socket.current) {
      socket.current.disconnect();

      socket.current = undefined;
    }
  };

  const socketSerivce = {
    initializeSocket: () => {},
    emit,
    on,
    off,
    removeListner,
    disconnect,
  };

  return (
    <WSContext.Provider value={socketSerivce}>{children}</WSContext.Provider>
  );
};

export const useWS = () => {
  const socketSerivce = useContext(WSContext);
  if (!socketSerivce) {
    throw new Error("useWS must be used within a WSProvider");
  }
  return socketSerivce;
};

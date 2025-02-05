import { useEffect} from 'react';
import { UseSocketContext } from '../context/SocketContext';

const useListenMessages = ({messages, setMessages}) => {
  const { socket } = UseSocketContext();
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on('newMessage', handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket]);

  return messages;
};

export default useListenMessages;

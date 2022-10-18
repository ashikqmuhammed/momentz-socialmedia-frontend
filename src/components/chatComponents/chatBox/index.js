import "./style.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { messenger } from "../../../functions/chat";
import PuffLoader from "react-spinners/PuffLoader";
import { io } from "socket.io-client";
import axios from "axios";

export default function ChatBox({ selectedChat }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BACKEND_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      selectedChat.id &&
      setMessages((prev) => {
        return [...prev, arrivalMessage];
      });
  }, [arrivalMessage, selectedChat]);

  const messageContainerRef = useRef(null);

  const sendMessage = async () => {
    //socket messaging
    console.log({
      senderId: user.id,
      receiverId: selectedChat.id,
      text: message,
    });
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: selectedChat.id,
      text: message,
    });
    try {
      setSendLoading(true);
      const newSavedMessage = await messenger(
        selectedChat.id,
        message,
        user.token
      );
      console.log(newSavedMessage);
      setMessages((prev) => {
        return [...prev, newSavedMessage];
      });
      setSendLoading(false);
    } catch (error) {
      setSendError(false);
    }
  };
  const getMessages = async () => {
    try {
      setMessagesLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/all-messages/${selectedChat.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data, selectedChat.id);
      if (data) {
        setMessages(data);
      } else {
        setMessages([]);
      }

      setMessagesLoading(false);
    } catch (error) {
      setMessagesLoading(false);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => console.log(users));
  }, [user]);

  useEffect(() => {
    if (selectedChat.id) {
      getMessages();
    }
  }, [selectedChat]);

  return (
    <div className="chatBox">
      {!selectedChat.id && (
        <div className="noSelectedChat">
          <div>Select a chat to start messaging</div>
        </div>
      )}
      {selectedChat.id && (
        <div className="chat_box_wrap">
          <div className="chat_box_header">
            <img src={selectedChat.picture} alt="" />
            <h4>{`${selectedChat.first_name} ${selectedChat.last_name}`}</h4>
            <div>online</div>
          </div>
          <div
            ref={messageContainerRef}
            className="message_container scrollbar"
          >
            {!messagesLoading &&
              messages?.map((messageObj, i) => (
                <div
                  ref={scrollRef}
                  className={`${
                    messageObj.sender === user.id ? "sending" : "receiving"
                  }`}
                  key={i}
                >
                  <div
                    className={`sending_receiving_inner ${
                      messageObj.sender === user.id
                        ? "sending_inner"
                        : "receiving_inner"
                    }`}
                  >
                    {messageObj.text}
                  </div>
                </div>
              ))}
            {messagesLoading && (
              <PuffLoader className="messages_loading" color="#fff" size={30} />
            )}
          </div>
          <div className="chat_text_box">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
            />
            {!sendLoading && (
              <svg
                viewBox="0 0 512 512"
                onClick={() => {
                  sendMessage();
                  setMessage("");
                }}
              >
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
            )}
            {sendLoading && <PuffLoader color="#fff" size={30} />}
          </div>
        </div>
      )}
    </div>
  );
}

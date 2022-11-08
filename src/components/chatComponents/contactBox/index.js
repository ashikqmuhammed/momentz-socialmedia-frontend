import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { chatContactsReducer } from "../../../functions/reducers";
import BounceLoader from "react-spinners/BounceLoader";
import "./style.css";
import { getAllConversations, chatSearch } from "../../../functions/chat";
let typingTimer;
const interval = 1000;
export default function ContactBox({ setSelectedChat }) {
  let { user } = useSelector((state) => ({ ...state }));
  const [chatSearchTerm, setChatSearchTerm] = useState("");
  const [{ loading, error, contacts }, dispatch] = useReducer(
    chatContactsReducer,
    {
      loading: false,
      error: false,
      contacts: [],
    }
  );

  const contactSearch = async () => {
    dispatch({ type: "CHAT_CONTACTS_REQUEST" });
    if (chatSearchTerm) {
      const returnObj = await chatSearch(chatSearchTerm, user.token);
      if (returnObj?.status === "ok") {
        dispatch({ type: "CHAT_CONTACTS_SUCCESS", payload: returnObj.data });
      } else {
        dispatch({ type: "CHAT_CONTACTS_ERROR" });
      }
    } else {
      conversationFetching();
    }
  };

  const conversationFetching = async () => {
    try {
      dispatch({ type: "CHAT_CONTACTS_REQUEST" });
      const { data, status } = await getAllConversations(user.token);
      if (status === "ok") {
        dispatch({ type: "CHAT_CONTACTS_SUCCESS", payload: data });
      }
    } catch (error) {
      dispatch({ type: "CHAT_CONTACTS_ERROR" });
    }
  };

  useEffect(() => {
    conversationFetching();
  }, []);
  return (
    <div className="contactBox">
      <div className="wrapper">
        <div className="header">
          <div className="chat_search">
            <input
              onChange={(e) => setChatSearchTerm(e.target.value)}
              type="text"
              value={chatSearchTerm}
              placeholder="Search buddies..."
              onKeyDown={() => {
                clearTimeout(typingTimer);
              }}
              onKeyUp={() => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                  contactSearch();
                }, interval);
              }}
            />
          </div>
          {/* <h3>MOMENTS CHAT</h3> */}
        </div>
        <div className="chat_body scrollbar">
          {loading && (
            <div className="contacts_loading">
              <BounceLoader />
            </div>
          )}
          {!loading &&
            contacts?.map((contact, i) => (
              <div
                key={i}
                className="contact"
                onClick={() => {
                  setSelectedChat({
                    id: contact._id,
                    picture: contact.picture,
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                  });
                }}
              >
                <img src={contact?.picture} alt="" />
                <span>{`${contact?.first_name} ${contact?.last_name}`}</span>
              </div>
            ))}
            {!loading &&
            contacts?.map((contact, i) => (
              <div
                key={i}
                className="contact"
                onClick={() => {
                  setSelectedChat({
                    id: contact._id,
                    picture: contact.picture,
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                  });
                }}
              >
                <img src={contact?.picture} alt="" />
                <span>{`${contact?.first_name} ${contact?.last_name}`}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

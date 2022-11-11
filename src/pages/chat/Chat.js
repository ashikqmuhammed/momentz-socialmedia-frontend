import { useLayoutEffect, useState } from "react";
import ChatContainer from "../../containers/chatContainer/ChatContainer";

export default function Chat({ setHideHeader, smallView }) {

  return (
    <div>
      <ChatContainer setHideHeader={setHideHeader} smallView={smallView} />
    </div>
  );
}

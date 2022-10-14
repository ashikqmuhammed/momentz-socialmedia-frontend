import "./style.css";
const contacts = [
  { name: "Ashik" },
  { name: "Rashid" },
  { name: "Jebin" },
  { name: "Hanna" },
];
export default function ContactBox() {
  return (
    <div className="contactBox">
      <div className="wrapper">
        {/* <div className="header">
          <div className="search">
            <input type="text" placeholder="Search buddies..." />
          </div>
          <h3>MOMENTS CHAT</h3>
        </div> */}
        <div className="chat_body scrollbar">
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
          {contacts.map(() => (
            <div className="contact"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

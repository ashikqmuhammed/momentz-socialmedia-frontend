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
        <div className="header">
          <div className="search">
            <input type="text" placeholder="Search buddies..." />
          </div>
        </div>
        <div className="body scrollbar">
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
          {contacts.map(() => (
            <div className="contact">k</div>
          ))}
        </div>
      </div>
    </div>
  );
}

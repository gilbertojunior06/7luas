import "./style/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/facebook.png" alt="Facebook" className="social-icon" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/instagram.png" alt="Instagram" className="social-icon" />
      </a>
      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/whatsapp.png" alt="WhatsApp" className="social-icon" />
      </a>
    </div>
  );
}

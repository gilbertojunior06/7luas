import "./style/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://www.facebook.com/sala7luas/" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/facebook.png" alt="Facebook" className="social-icon" />
      </a>
      <a href="https://www.instagram.com/sala7luas/" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/instagram.png" alt="Instagram" className="social-icon" />
      </a>
      <a href="https://wa.me/5511994994145" target="_blank" rel="noopener noreferrer">
        <img src="/7luas/whatsapp.png" alt="WhatsApp" className="social-icon" />
      </a>
    </div>
  );
}

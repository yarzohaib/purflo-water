import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-name">Purflo</span>
          <p>Purity in every drop.</p>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#why-us">Why Purflo</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Bottle sizes</h4>
          <ul>
            <li>19 Liter</li>
            <li>6 Liter</li>
            <li>1.5 Liter</li>
            <li>500 ml</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Call to order</h4>
          <ul>
            <li><a href="tel:+923324577183">0332 4577183</a></li>
            <li><a href="tel:+924235229393">042 35229393</a></li>
            <li>Mon–Sat, 9am–7pm</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Visit the shop</h4>
          <ul>
            <li>91-H Architect Society</li>
            <li>Basharat Chowk</li>
            <li>Lahore</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} Purflo Bottled Drinking Water. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
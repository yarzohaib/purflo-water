import heroImage from '../assets/hero-bottles-mountains.png';
import WaveDivider from './WaveDivider.jsx';
import './Hero.css';

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }} role="img" aria-label="Purflo water bottles of four sizes lined up on a stone ledge in front of snow-capped mountains at sunrise" />
      <div className="hero-scrim" />
      <div className="container hero-content">
        <h1>
          Purity in <span className="hero-highlight">every drop.</span>
        </h1>
        <p className="hero-sub">
          Purflo is bottled drinking water sourced and purified with one goal: water that tastes
          exactly like water should. For your home first — kitchen, dispenser, kids' bottles —
          and everywhere else too, in 19L, 6L, 1.5L and 500ml bottles.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-primary">
            See our bottles
          </a>
          <a href="#contact" className="btn btn-outline">
            Order for home delivery
          </a>
        </div>
      </div>
      <div className="hero-divider">
        <WaveDivider fill="#FFFFFF" />
      </div>
    </section>
  );
}

export default Hero;
import productImage from '../assets/product-6l-kitchen.png';
import './About.css';

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-copy">
          <h2>Water that stays out of the way of your day.</h2>
          <p>
            Purflo started with a simple frustration: too much bottled water tastes like the
            plastic it sits in, or worse, like nothing at all is being done about what's actually
            in it. So we built our process around one job — take water, remove everything that
            doesn't belong, and leave the part that keeps you going.
          </p>
          <p>
            Every bottle goes through multi-stage filtration and mineral balancing before it's
            sealed, so a 500ml on the sidelines tastes the same as a 19L on your home dispenser.
          </p>
          <div className="about-stats">
            <div>
              <span className="stat-number">4</span>
              <span className="stat-label">Bottle sizes, one standard</span>
            </div>
            <div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Batches tested before dispatch</span>
            </div>
          </div>
        </div>
        <div className="about-image-wrap">
          <img
            src={productImage}
            alt="A 6-liter Purflo water bottle on a kitchen counter with fresh fruit nearby"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
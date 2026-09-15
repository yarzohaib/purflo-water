import runnerImage from '../assets/lifestyle-runner.png';
import kidImage from '../assets/lifestyle-kid-sports.png';
import WaveDivider from './WaveDivider.jsx';
import './Products.css';

const PRODUCTS = [
  {
    size: '19L',
    title: 'Home Dispenser Bottle',
    description:
      'Our biggest bottle, built for home water dispensers. Reusable and sanitized between refills.',
    tag: 'Best for homes',
  },
  {
    size: '6L',
    title: 'Household Jug',
    description:
      'A handled jug that fits in the fridge door — the size most households keep restocked in the kitchen.',
    tag: 'Best for kitchens',
  },
  {
    size: '1.5L',
    title: 'Everyday Bottle',
    description:
      'Sized for a workday or a family meal. Easy to carry, easy to share.',
    tag: 'Best for on the go',
  },
  {
    size: '500ml',
    title: 'Personal Bottle',
    description:
      'Fits a cup holder, a bag side-pocket, or a kid\u2019s lunchbox. Our most portable size.',
    tag: 'Best for sports & travel',
  },
];

function Products() {
  return (
    <section id="products" className="section products">
      <div className="products-top-divider">
        <WaveDivider fill="#EAF6FC" />
      </div>
      <div className="container">
        <div className="products-heading">
          <h2>One water, sized for wherever you need it.</h2>
          <p>
            Every size goes through the same filtration and testing process. Pick the one that
            fits your day, not the other way around.
          </p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <article className="product-card" key={product.size}>
              <span className="product-tag">{product.tag}</span>
              <span className="product-size">{product.size}</span>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a href="#contact" className="product-link">
                Order this size
              </a>
            </article>
          ))}
        </div>

        <div className="products-lifestyle">
          <figure>
            <img src={runnerImage} alt="A man drinking from a 500ml Purflo bottle while out on a run" loading="lazy" />
            <figcaption>Grab a 500ml on the way out the door.</figcaption>
          </figure>
          <figure>
            <img src={kidImage} alt="A boy in a football kit drinking from a Purflo bottle on the sidelines" loading="lazy" />
            <figcaption>Restock the team's bottles before match day.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Products;
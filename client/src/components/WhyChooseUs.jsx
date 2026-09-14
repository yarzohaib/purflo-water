import './WhyChooseUs.css';

const REASONS = [
  {
    title: 'Multi-stage filtration',
    description:
      'Water passes through sediment, carbon and fine-membrane filtration stages before mineral balancing, removing impurities without stripping the water flat.',
  },
  {
    title: 'Batch testing',
    description:
      'Samples from every production batch are lab-tested for quality and consistency before bottles leave the facility.',
  },
  {
    title: 'Sanitized, reusable bottles',
    description:
      '19L and 6L bottles are inspected, washed and sanitized between refills rather than discarded after one use.',
  },
  {
    title: 'Local delivery network',
    description:
      'Scheduled delivery for homes and offices, so your cooler or kitchen never runs dry.',
  },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="section why-us">
      <div className="container why-us-grid">
        <div className="why-us-intro">
          <h2>What actually goes into the bottle.</h2>
          <p>
            "Purity" is a word a lot of water brands use loosely. Here's specifically what we do
            before a bottle reaches you.
          </p>
        </div>
        <div className="why-us-list">
          {REASONS.map((reason) => (
            <div className="why-us-item" key={reason.title}>
              <span className="why-us-mark" aria-hidden="true" />
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

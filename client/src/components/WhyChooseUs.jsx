import './WhyChooseUs.css';

const BACTERIA_STAGES = [
  {
    title: 'Ozonation',
    description: 'An ozonator ozonizes the water itself and the product water tanks it sits in.',
  },
  {
    title: 'Chlorine dosing',
    description:
      'A measured percentage of chlorine is injected during the mineral-dosing stage of the RO water.',
  },
  {
    title: 'UV treatment',
    description:
      'A UV system kills remaining bacteria with ultraviolet light before the water enters the product water tanks.',
  },
];

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
      'Scheduled delivery for your home first, and offices too, so your dispenser or kitchen never runs dry.',
  },
];

function WhyChooseUs() {
  return (
    <section id="why-us" className="section why-us">
      <div className="container">
        <div className="why-us-intro">
          <h2>What actually goes into the bottle.</h2>
          <p>
            "Purity" is a word a lot of water brands use loosely. Here's specifically what we do
            before a bottle reaches you.
          </p>
        </div>

        <div className="bacteria-block">
          <div className="bacteria-block-heading">
            <h3>3-stage bacteria removal</h3>
            <p>The step that matters most, done in a fixed order every time.</p>
          </div>
          <ol className="bacteria-steps">
            {BACTERIA_STAGES.map((stage, index) => (
              <li className="bacteria-step" key={stage.title}>
                <span className="bacteria-step-number">{index + 1}</span>
                <div>
                  <h4>{stage.title}</h4>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
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
// A shared visual motif that ties every section transition back to water —
// used deliberately as the site's one recurring structural device.
function WaveDivider({ fill = '#FFFFFF', flip = false }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <path
        d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,32 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}

export default WaveDivider;

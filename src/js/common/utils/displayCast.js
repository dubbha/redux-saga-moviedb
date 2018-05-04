
const displayCast = cast =>
  (cast && cast.length
    ? `Cast: ${cast
      .map(i => i.name)
      .slice(0, 10)
      .join(', ')}`
    : '');

export default displayCast;

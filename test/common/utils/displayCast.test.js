import displayCast from 'common/utils/displayCast';

describe('displayCast utility', () => {
  it('should format cast array to a comma separted string of names', () => {
    expect(displayCast([
      { name: 'ACTOR1' },
      { name: 'ACTOR2' },
      { name: 'ACTOR3' },
    ])).toBe('Cast: ACTOR1, ACTOR2, ACTOR3');
  });

  it('should limit the list to ten names', () => {
    expect(displayCast([
      { name: 'A1' },
      { name: 'A2' },
      { name: 'A3' },
      { name: 'A4' },
      { name: 'A5' },
      { name: 'A6' },
      { name: 'A7' },
      { name: 'A8' },
      { name: 'A9' },
      { name: 'A10' },
      { name: 'A11' },
      { name: 'A12' },
    ])).toBe('Cast: A1, A2, A3, A4, A5, A6, A7, A8, A9, A10');
  });

  it('should return empty string if cast array is empty', () => {
    expect(displayCast([])).toBe('');
  });

  it('should return empty string if cast is undefined', () => {
    expect(displayCast()).toBe('');
  });
});

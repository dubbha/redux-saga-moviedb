import parseYear from 'common/utils/parseYear';

describe('parseYear utility', () => {
  it('should parse a year out of date string', () => {
    expect(parseYear('2000/01/01')).toBe('2000');
  });

  it('should return empty string if date string is undeinfed', () => {
    expect(parseYear()).toBe('');
  });
});

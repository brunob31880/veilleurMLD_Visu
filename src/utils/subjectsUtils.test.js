const { generateData,generateTimeData } = require('./subjectsUtils');

describe('generateData', () => {
  it('should generate correct data', () => {
    const etiquettes = [
      { subject: ['Sujet 1', 'Sujet 2'], timestamp: new Date(2022, 0, 1).getTime() },
      { subject: ['Sujet 1', 'Sujet 3'], timestamp: new Date(2021, 0, 1).getTime() },
      { subject: ['Sujet 2', 'Sujet 3'], timestamp: new Date(2022, 0, 1).getTime() },
      { subject: ['Sujet 4', 'Sujet 3'], timestamp: new Date(2022, 0, 1).getTime() },
    ];
    const year = 2022;

    const result = generateData(etiquettes, year);

    expect(result).toEqual([
      { subject: 'Sujet 1', A: 33.333333333333336 },
      { subject: 'Sujet 2', A: 66.66666666666667 },
      { subject: 'Sujet 3', A: 66.66666666666667 },
      { subject: 'Sujet 4', A: 33.333333333333336 },
    ]);
  });
});

const { parseAddresses } = require('./utils');
const t = require('chai').assert;

describe('parseAddresses', () => {
  it('parse address', () => {
    t.deepEqual(parseAddresses('plop@plop.com'), [
      { email: 'plop@plop.com', name: 'plop@plop.com' },
    ]);
  });

  it('parse address', () => {
    t.deepEqual(parseAddresses('asas asas <plop@plop.com>'), [
      { email: 'plop@plop.com', name: 'asas asas' },
    ]);
  });

  it('parse address', () => {
    t.deepEqual(parseAddresses('plop@plop.com,plop2@plop.com'), [
      { email: 'plop@plop.com', name: 'plop@plop.com' },
      { email: 'plop2@plop.com', name: 'plop2@plop.com' },
    ]);
  });

  it('parse address', () => {
    t.deepEqual(
      parseAddresses('asas asas <plop@plop.com>, bbb cc <plop2@plop.com>'),
      [
        { email: 'plop@plop.com', name: 'asas asas' },
        { email: 'plop2@plop.com', name: 'bbb cc' },
      ]
    );
  });
});

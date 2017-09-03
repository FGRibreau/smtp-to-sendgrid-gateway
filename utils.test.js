const { bufferToSendGridEmail } = require('./utils');
const t = require('chai').assert;
const { outlookEmail, sendgridFormat, session } = require('./utils.fixtures');

describe('smtp-to-sendgrid-gateway', () => {
  it('parse email', () =>
    bufferToSendGridEmail(outlookEmail, session).then(e => {
      // console.log(JSON.stringify(e));
      t.deepEqual(e, sendgridFormat);
    }));
});

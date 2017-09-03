const logger = require('winston');
const config = require('common-env/withLogger')(logger)
  .on('env:fallback', function(fullKeyName, $default, $secure) {
    // see https://github.com/FGRibreau/common-env/issues/27
    if ($secure && !process.env[fullKeyName]) {
      throw new Error(`${fullKeyName} environment variable must be defined`);
    }
  })
  .getOrElseAll({
    smtp: {
      port: 25,
    },
    sendgrid: {
      api: {
        $default: 'SENDGRID_API_KEY',
        $secure: true,
      },
    },
  });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid.api);

const MIME = {
  TEXT: 'text/plain',
  HTML: 'text/html',
};

const SMTPServer = require('smtp-server').SMTPServer;
const { parseAddresses } = require('./utils');

// start-up the SMTP server (no authentication)
new SMTPServer({
  secure: false,
  disabledCommands: ['AUTH'],
  onData: function(stream, session, callback) {
    let buffer = '';

    // parse a message as it is received
    stream.setEncoding('utf8');
    stream.on('data', function(part) {
      buffer += part;
    });

    // message fully received
    stream.on('end', function() {
      // obtain commands and lines of text from the data block
      let from,
        to = [],
        cc = [],
        bcc = [],
        subject = '',
        contentType = MIME.TEXT,
        body = [];

      buffer.split('\n').forEach(function(line) {
        var isCmd = false;
        var a_line = line.split(':');
        if (a_line.length == 2) {
          switch (a_line[0].toLowerCase()) {
            case 'subject':
              subject = a_line[1].trim();
              isCmd = true;
              break;
            case 'content-type':
              if (a_line[1].toLowerCase().indexOf('html') > -1) {
                contentType = MIME.HTML;
              }
              isCmd = true;
              break;
            case 'from':
              var addresses = parseAddresses(a_line[1]);
              if (addresses.length == 1) {
                from = addresses[0];
              }
              isCmd = true;
              break;
            case 'to':
              to = parseAddresses(a_line[1]);
              isCmd = true;
              break;
            case 'cc':
              cc = parseAddresses(a_line[1]);
              isCmd = true;
              break;
            case 'bcc':
              bcc = parseAddresses(a_line[1]);
              isCmd = true;
              break;
            case 'mime-version':
            case 'content-transfer-encoding':
              // commands to ignore
              isCmd = true;
              break;
            default:
              logger.error('unrecognized command?: ' + a_line[0]);
              break;
          }
        }
        if (!isCmd) {
          body.push(line);
        }
      });

      // allow it to send based on headers even if there aren't lines for From and To
      if (!from) {
        from = session.envelope.mailFrom.address;
      }

      if (to.length < 1) {
        session.envelope.rcptTo.forEach(function(rcptTo) {
          to.push(rcptTo.address);
        });
      }

      // format the mail to SendGrid
      const mail = {
        from: from,
        replyTo: from,
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
      };

      if (contentType === MIME.TEXT) {
        mail.text = body.join('\n');
      } else {
        mail.html = body.join('\n');
      }

      sgMail
        .send(mail)
        .then(() => {
          logger.info('forwarded', JSON.stringify(mail));
          callback();
        })
        .catch(err => {
          const { message, code, response } = err;

          logger.error(
            'failed forwarding',
            JSON.stringify({
              error: { message, code, response },
              mail: mail,
            })
          );

          callback();
        });
    });
  },
}).listen(config.smtp.port);

logger.info(
  'SMTP Forward listening on port %s for SMTP traffic.',
  config.smtp.port
);

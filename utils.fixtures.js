module.exports = {
  session: {
    id: 'mghTH73DDmSf',
    secure: false,
    remoteAddress: '::1',
    remotePort: 60556,
    clientHostname: '[::1]',
    openingCommand: 'HELO',
    hostNameAppearsAs: 'client',
    xClient: {},
    xForward: {},
    transmissionType: 'SMTP',
    tlsOptions: false,
    envelope: {
      mailFrom: { address: 'hello@killbug.today', args: false },
      rcptTo: [{ address: 'fg@killbug.today', args: false }],
    },
    transaction: 1,
  },
  outlookEmail: `From: u@example.com
To: plop@example.com
Bcc: Heheh eheheh <plop2@example.com>
Content-Type: multipart/mixed;
  boundary="----=_NextPart_000_0D48_01CE140D.19527DD0"


------=_NextPart_000_0D48_01CE140D.19527DD0
Content-Type: multipart/related;
	boundary="----=_NextPart_001_0D49_01CE140D.19527DD0"


------=_NextPart_001_0D49_01CE140D.19527DD0
Content-Type: multipart/alternative;
	boundary="----=_NextPart_002_0D4A_01CE140D.19527DD0"


------=_NextPart_002_0D4A_01CE140D.19527DD0
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain;
	charset="utf-8"


Dear Sir,

Good evening.





------=_NextPart_002_0D4A_01CE140D.19527DD0
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html;
	charset="utf-8"

<p>Dear Sir</p>
<p>Good evening.</p>
<p></p>
------=_NextPart_002_0D4A_01CE140D.19527DD0--

------=_NextPart_001_0D49_01CE140D.19527DD0--

------=_NextPart_000_0D48_01CE140D.19527DD0
Content-Type: multipart/alternative; boundary="===============1276485360=="
MIME-Version: 1.0
Content-Disposition: inline

--===============1276485360==
Content-Type: text/plain; charset="utf-8"
MIME-Version: 1.0
Content-Transfer-Encoding: quoted-printable



The footer

--===============1276485360==
Content-Type: text/html; charset="utf-8"
MIME-Version: 1.0
Content-Transfer-Encoding: quoted-printable

<p>The footer</p>

--===============1276485360==--
------=_NextPart_000_0D48_01CE140D.19527DD0--`,
  sendgridFormat: {
    subject: undefined,
    text: '\nDear Sir,\n\nGood evening.\n\n\n\n\n\n\n\nThe footer\n',
    html:
      '<p>Dear Sir</p>\n<p>Good evening.</p>\n<p></p><br/>\n<p>The footer</p>\n',
    content: [],
    from: { name: 'hello@killbug.today', email: 'hello@killbug.today' },
    to: [{ name: 'fg@killbug.today', email: 'fg@killbug.today' }],
    bcc: [{ name: 'Heheh eheheh', email: 'plop2@example.com' }],
  },
};

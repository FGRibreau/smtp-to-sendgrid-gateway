# SMTP to SendGrid Gateway

Forked from FGRibreau repo that had fallen out of active maintenence.

Forward emails from SMTP requests to the Sendgrid API. Useful when the cloud provider does not allow outbound connections on ports 25, 465, 587.

### The Story

It all started with [this](https://cloud.google.com/compute/docs/tutorials/sending-mail/):

> Google Compute Engine does not allow outbound connections on ports 25, 465, and 587. By default, these outbound SMTP ports are blocked because of the large amount of abuse these ports are susceptible to. In addition, having a trusted third-party provider such as SendGrid, Mailgun, or Mailjet relieves Compute Engine and you from maintaining IP reputation with your receivers.

And since we were on a MVP startup weekend working on our next product [killbug](https://killbug.today), we [tweet](https://twitter.com/FGRibreau/status/904094492197834752) this:

> GKE does not allow outbound connections on ports 25, 465, 587. Keycloak requires SMTP. I need to build a SMTP to SendGrid API gateway.

Here we are.


## Run

Since this server should run as *a sidekick of the main application* (thus on the same machine or [the same pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#understanding-pods)) authorization was not required.

```shell
docker run -it -p 25:25 -e SENDGRID_API=XXXXXXX gardner/smtp-to-sendgrid-gateway
```

### Configuration - environment variables

- `SENDGRID_API` (required): sendgrid API token
- `SMTP_PORT` (optional) Port to listen (default: 25)


## Credits

- [SMTP server](https://nodemailer.com/extras/smtp-server/)
- [mailparser](https://nodemailer.com/extras/mailparser/)
- [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)

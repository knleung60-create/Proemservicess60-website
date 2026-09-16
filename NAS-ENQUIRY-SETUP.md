# NAS enquiry service setup

The website sends both contact messages and service bookings to one private service running on the Synology NAS. The service:

1. writes the full submission to `records/client-enquiries.xlsx`;
2. emails the same content to `sales@proemservices60.com`;
3. stores the email-delivery result in the Excel row.

## One-time NAS setup

1. Install Synology Container Manager.
2. Copy `.env.example` to `.env` in the project root.
3. Put the SMTP account password or app password in `SMTP_PASS`. Never commit `.env` to GitHub.
4. In Container Manager, create the project from `docker-compose.yml` and start it.
5. In Synology Login Portal, add a reverse proxy from `https://enquiries.proemservices60.com` to `http://127.0.0.1:8787`.
6. Point the `enquiries.proemservices60.com` DNS name to the NAS and use a valid HTTPS certificate.
7. In the Vercel project, set `VITE_ENQUIRY_API_URL` to `https://enquiries.proemservices60.com/api/enquiries`, then redeploy the website.

The Excel workbook stays in the NAS project folder under `records/`. It is excluded from Git so client information cannot be pushed to GitHub accidentally.

## Checks

- Open `https://enquiries.proemservices60.com/health` and confirm it reports `ok: true` and `emailMode: smtp`.
- Submit one test enquiry through the website.
- Confirm both mailboxes receive it.
- Open `records/client-enquiries.xlsx` on the NAS and confirm the test row and email status are present.

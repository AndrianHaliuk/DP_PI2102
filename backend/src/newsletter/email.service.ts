import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false, 
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(to: string[] | string, subject: string, html: string) {
    const options = {
      from: `"Ваша організація" <${process.env.MAIL_FROM}>`,
      to,
      subject,
      html,
    };
    try {
      const info = await this.transporter.sendMail(options);
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (err) {
      this.logger.error('Failed to send email', err as any);
    }
  }

  async sendUrgentCampaignNotification(
  recipients: string[],
  title: string,
  targetAmount: number,
  id: number,
) {
  const link = `${process.env.FRONTEND_URL}/campaigns/${id}`;
  const html = `
  <!DOCTYPE html>
  <html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #fff4f4;
        margin: 0; padding: 20px;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #fff;
        padding: 25px;
        border-radius: 8px;
        border: 2px solid #d93025;
        box-shadow: 0 2px 8px rgba(217, 48, 37, 0.2);
      }
      h1 {
        color: #d93025;
        margin-bottom: 15px;
      }
      p {
        line-height: 1.6;
        font-size: 16px;
      }
      .urgent {
        font-weight: bold;
        color: #d93025;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 22px;
        background-color: #d93025;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 25px;
      }
      .footer {
        font-size: 12px;
        color: #777;
        margin-top: 30px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Терміновий збір: ваша допомога потрібна зараз!</h1>
      <p class="urgent">Ми звертаємося з терміновим проханням підтримати кампанію "<strong>${title}</strong>".</p>
      <p>Необхідно зібрати <strong>${targetAmount.toLocaleString('uk-UA')} грн</strong>.</p>
      <p>Ваша підтримка допоможе врятувати життя і надати необхідну допомогу тим, хто цього потребує найбільше.</p>
      <a href="${link}" class="button">Підтримати зараз</a>
      <p>Дякуємо за вашу небайдужість і підтримку!</p>
      <p>З повагою,<br/>Команда Благодійної Організації</p>
      <div class="footer">
        Якщо ви більше не хочете отримувати наші листи, будь ласка, <a href="${process.env.FRONTEND_URL}/unsubscribe">відпишіться тут</a>.
      </div>
    </div>
  </body>
  </html>
  `;
  await this.sendMail(recipients, 'Терміновий збір!', html);
}
}

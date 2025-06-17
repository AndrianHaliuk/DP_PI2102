import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false, // 587—TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(to: string[] | string, subject: string, html: string) {
    const options = {
      from: `"Ваша організація" <${process.env.MAIL_USER}>`,
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
    id: number,
  ) {
    const link = `${process.env.FRONTEND_URL}/campaigns/${id}`;
    const html = `
      <h3>🔴 Терміновий збір: ${title}</h3>
      <p>Просимо вас підтримати цю ініціативу прямо зараз.</p>
      <a href="${link}">Перейти до збору</a>
    `;
    await this.sendMail(recipients, 'Терміновий збір!', html);
  }
}

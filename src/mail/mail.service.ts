import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendPasswordRestEmail(email: string, token: string) {
    const resetLink = `${process.env.forgetPasswordLink}${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Passowrd Rest Request',
      template: './reset-password.hbs',
      context: {
        email,
        resetLink,
      },
    });
  }
}

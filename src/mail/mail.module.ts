import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'localhost',
        port: Number(process.env.MAIL_PORT) || 1025,
        secure: false,
        ignoreTLS: true,
      },
      defaults: {
        from: '"No Reploy" <no-reploy@cms.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(undefined, {
          inlineCssEnabled: true,
          inlineCssOptions: {},
        }),
        options: { strict: true },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { activationTemplate } from "./emailTemplates/activation";

interface Props {
  to: string;
  subject: string;
  body: string;
}

export async function sendMail({ to, subject, body }: Props) {
  const { SMTP_USER, SMTP_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testMail = await transporter.verify();

    console.log(testMail);
  } catch (err) {
    console.log("error from arewa", err);
  }

  try {
    const sendResult = await transporter.sendMail({ to, subject, html: body });

    console.log(sendResult);
  } catch (err) {
    console.log(err);
  }
}

export function compileActivationTemplate(name: string, url: string) {
  const template = Handlebars.compile(activationTemplate);

  const htmlBody = template({
    name,
    url,
  });

  return htmlBody;
}

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import nodemailer from "nodemailer";
import { env } from "@/env.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: any = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_LOGIN,
        pass: env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const attachments = Object.values(data.files).map((file: any) => {
      return { path: file.filepath, filename: file.originalFilename };
    });

    const mailOptions = {
      from: "",
      to: env.EMAIL_TO,
      html: `<div dir="auto">
              <h2>Пол - ${data.fields.gender}</h2>
              <h2>Возраст - ${data.fields.age}</h2>
              <h2>Cлово-ассоциация - ${data.fields.loveWord}</h2>
              <h2><a href=${data.fields.geoLink}>Ссылка на геолокацию</a></h2>
              <h2>Что связано с этим местом - ${data.fields.geoDesc}</h2>
             </div>`,
      attachments: attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return res.status(500).json({ error: "Error while sending email" });
    }
    res.status(200).json({ email: "sent", data, attachments });
  }
}

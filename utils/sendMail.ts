import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    //email address
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
});

let tt: string = process.env.EMAIL_USER!;

const sendEmail = async (subject: string, text: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Portfolio APP",
        address: tt,
      },
      to: [tt],
      subject: subject,
      html: `
      <html>
      <body style="border: 2px solid black; padding:2em;">
      ${html}
      <p><b>Üzenet: </b><br>${text}</p>
      </body>
      </html>`,
    });
    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendEmail;

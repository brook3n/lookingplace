// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"
import { defaultHtml } from "../../Templates/default.js";
import { loginHtml } from "../../Templates/login.js";
// require("dotenv").config();
// const { NODEMAILER_PASS } = process.env;


// const fs = require("fs/promises");
// import * as fs from 'fs';



// export async function sendEmail(newClient, type, id)
export async function sendEmail (client, type, id) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    auth: {
      user: "lookingplace.app.henry@gmail.com",
      pass: "lrzuyphbebplwmci"
    },
  });

	const urlValidation = "https://api.gmail.com/"
  var htmlSend;
  if (type === "default") {
    htmlSend = defaultHtml
  } else if (type === "login") {
    htmlSend = loginHtml
		htmlSend = htmlSend?.replace("*url-generator-key*", urlValidation); //LLENAR CON CODIGO LA CLAVE DE JWT
  }

  htmlSend = htmlSend?.replace("*fullName*", client.fullName);
//   htmlSend = htmlSend?.replace("*lastname*", client.lastname);
//   htmlSend = htmlSend?.replace("*message*", client.message);

  const info = await transporter.sendMail(
    {
      from: "<lookingplace.app.henry@gmail.com>", // cual es el email que esta enviando el correo ( por lo general el de la empresa info@...)
      to: `${client.email}`, // lista o persona a la que le queremos enviar el correo
      subject: `Hola ${client.fullName}, Bienvenido a LookingPlace. Gracias por suscribirte!`, // Asunto
      html: htmlSend,
    },
    (error, info) => {
      if (error) {
        return "Error";
      }
      console.log("send email");
    }
  );
  return;
};


// IMPLEMENTAR EN CONTROLLER DE CLIENT
// import { sendEmail } from "../Nodemailer/nodemailer.controller.js"
// sendEmail(newClient, type);
const Person = require("../model/Person.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
require("dotenv").config();
const { cronSchedule } = require("../config/cronSchedule");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 587,
  service: "gmail",
  auth: {
      user: "vladimir.celi@unl.edu.ec",
      pass: "vapdncmehudtbbze",
  },
})
/*
const generateUniqueToken = () => {
  const sha256 = require('crypto').createHash('sha256');
  return sha256.update(Math.random().toString()).digest('hex');
}
*/
const generateUniqueToken = () => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  return code;
}

const sendConfirmationEmail = async (email, code) => {
  try {
  const mailOptions = {
      from: "vladimir.celi@unl.edu.ec",
      to: email,
      subject: "¡Bienvenido! Confirma tu cuenta",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #3498db;
              }
              h3 {
                color: #555;
              }
              p {
                color: #777;
              }
              .code {
                background-color: #3498db;
                color: #fff;
                padding: 10px;
                font-size: 18px;
                border-radius: 5px;
                margin-top: 10px;
              }
              .note {
                color: #888;
              }
              .icon {
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>¡Bienvenido!</h1>
              <p>Gracias por unirte a nosotros. Para comenzar, confirma tu cuenta ingresando el siguiente código:</p>
              <div class="code">${code}</div>
              <p class="note">
                <span class="icon">⚠️</span>
                <strong>Nota:</strong> Este código es válido por un tiempo limitado.
              </p>
            </div>
          </body>
        </html>
      `,
    };
   const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId)
} catch (error) {
  console.log("Error al enviar el correo", error)
}
}

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(12)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces()
  .is().not().oneOf(['Passw0rd', 'Password123', '12345678',]);

  const register = async (req, res, next) => {
    const { first_name, last_name, email, username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const existingEmail = await Person.findOne({ where: { email: email } });
  
      if (existingEmail) {
        return res.status(400).json({ message: "Email ya registrado" });
      }
  
      const existingUsername = await Person.findOne({ where: { username: username } });
  
      if (existingUsername) {
        return res.status(400).json({ message: "Username ya registrado" });
      }
  
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({ message: "Contraseña no válida" });
      }
  
      const confirmationToken = generateUniqueToken();
      const person = await Person.create({
        first_name,
        last_name,
        email,
        username,
        password: hashedPassword,
        confirmation_token: confirmationToken,
      });
  
      const waitTime = 5 * 60 * 1000;
      cronSchedule(person.id, waitTime);
      await sendConfirmationEmail(email, confirmationToken);
      res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error al registrar usuario" });
    }
  };
  
  const confirmEmail = async (req, res) => {
    const { confirmationToken } = req.body;
  
    try {
      const person = await Person.findOne({ where: { confirmation_token: confirmationToken } });
  
      if (!person) {
        return res.status(404).json({ message: "Su token de confirmación no es válido" });
      }
  
      if (person.confirmed) {
        return res.status(400).json({ message: "Este correo electrónico ya ha sido confirmado" });
      }
  
       person.update({ confirmed: true });
  
      return res.status(200).json({ message: "Su correo electrónico ha sido confirmado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al confirmar el correo electrónico" });
    }
  };

module.exports = {
  confirmEmail,
  register,
};

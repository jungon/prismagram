import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { adjectives, nouns } from "./words";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  return sgMail.send(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "j017.kim@gmail.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret is <strong>${secret}</strong>.</br>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

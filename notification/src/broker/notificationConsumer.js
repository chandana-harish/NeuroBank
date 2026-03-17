import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderTemplate = (templateName, data) => {
  const templatePath = path.join(
    __dirname,
    `../templates/${templateName}.html`,
  );
  let htmlContent = fs.readFileSync(templatePath, "utf8");
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    htmlContent = htmlContent.replace(regex, data[key]);
  });
  return htmlContent;
};

export const initNotificationConsumer = () => {
  console.log("Initializing Notification Consumer...");

  // Register User Notification
  subscribeToQueue("user.register", async (data) => {
    console.log("Received user.register event:", data);
    const { email, fullName } = data;
    const { firstName, lastName } = fullName || {};

    const html = renderTemplate("registration", {
      firstName: firstName || "User",
      lastName: lastName || "",
    });

    await sendEmail(
      email,
      "Welcome to Our Bank!",
      "Welcome to our bank!",
      html,
    );
  });

  // Transaction Notifications (Debit & Credit)
  subscribeToQueue("transition.completed", async (data) => {
    console.log("Received transition.completed event:", data);
    const {
      fromAccount,
      toAccount,
      amount,
      transitionId,
      senderEmail,
      receiverEmail,
    } = data;
    const dateTime = new Date().toLocaleString();

    // Debit notification for sender
    if (senderEmail) {
      const debitHtml = renderTemplate("debit", {
        amount,
        toAccount,
        dateTime,
        transitionId,
      });
      await sendEmail(
        senderEmail,
        "Transaction Alert: Account Debited",
        "Your account has been debited",
        debitHtml,
      );
    }

    // Credit notification for receiver
    if (receiverEmail) {
      const creditHtml = renderTemplate("credit", {
        amount,
        fromAccount,
        dateTime,
        transitionId,
      });
      await sendEmail(
        receiverEmail,
        "Transaction Alert: Account Credited",
        "Your account has been credited",
        creditHtml,
      );
    }
  });
};

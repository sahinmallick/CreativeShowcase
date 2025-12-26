import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Mailgen from "mailgen";

dotenv.config();

export const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Creative Showcase",
            link: "https://mailgen.js/",
        },
    });

    // generate the html
    var emailBody = mailGenerator.generate(options.mailGenContent);

    // generate the plain text
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    (async () => {
        const info = await transporter.sendMail({
            from: "sahin@dev.com",
            to: options.email,
            subject: options.subject,
            text: emailText,
            html: emailBody,
        });

        console.log("Message sent:", info.messageId);
    })();
};
export const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to the Creative Showcase. Mr. Sahin is really happy to have you on the board!",
            action: {
                instructions: "To get started, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Verify your account",
                    link: verificationUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export const forgotPasswordMailGenContent = (username, resetPasswordUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password!",
            action: {
                instructions: "To reset your password, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Reset Password",
                    link: resetPasswordUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
        user: 'perpaman44@gmail.com',
        pass: 'grfhgzkyxmvogatz'
    },
    from: 'perpaman44@gmail.com'
});




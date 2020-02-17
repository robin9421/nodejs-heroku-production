const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rkshah9586@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome ${name}!, welcome to my world`
    })
}

module.exports = {
    sendWelcomeEmail
}
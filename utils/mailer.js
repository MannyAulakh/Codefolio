const nodemailer = require('nodemailer')

const transportor = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "codefolio@hotmail.com",
        pass: "Project#2$$"
    }
})


const mailer = (SendTo) => {

    const message = {
        from: "codefolio@hotmail.com",
        to: SendTo,
        subject: "Welcome to Codefolio",
        text: "We are happy to have you part of our network!"
    }

    transportor.sendMail(message, function(err, info) {
        if(err) {
            console.log(err)
            return 
        }
        console.log(info.response)
    })
}

module.exports = mailer
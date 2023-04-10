const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js')


/** send mail from gmail account */
const postMail = (req, res) => {

    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Sumukh M S",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        
        body: {
            name : userName,
            intro: `This is a confirmation email that ${userEmail} is now registered with ScriptChain Health`,
            outro: "Hope you have a good one :)"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Confirmation Email",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "email sent successfully!"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    postMail
}
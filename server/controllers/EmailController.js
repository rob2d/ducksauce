// @flow

const ControllerClass = global.require('utils/ControllerClass');
var nodemailer = require('nodemailer');

class EmailController extends ControllerClass {
    
    constructor () {
        super();
        // set up email connection
        this.transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_ADDRESS,
                pass : process.env.EMAIL_PASSWORD
            }
        });
    }

    /**
     * Send an email
     * @param {Object} param0
     * @param {Array<String> | String} param0.recipients
     * @param {String} param0.subject
     * @param {String} param0.message
     */
    sendEmail ({ recipients, subject, message }) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from    : process.env.EMAIL_ADDRESS,  
                to      : recipients,   
                subject : subject,
                text    : message
            };
    
            this.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(info.response);
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new EmailController();
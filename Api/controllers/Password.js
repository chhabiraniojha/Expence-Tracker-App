const brevo = require('@getbrevo/brevo');







// Configure API key authorization: api-key


exports.resetPassword = (req, res, next) => {
    const {email}=req.body;
    let defaultClient = brevo.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.EMAIL_API_KEY;

    let apiInstance = new brevo.TransactionalEmailsApi();
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "sss";
    sendSmtpEmail.textContent = "ggggg";
    sendSmtpEmail.sender = { email: "chhabiraniojha@gmail.com" };
    sendSmtpEmail.to = [
        { email}
    ];
   

   
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.json(req.body)
    }, function (error) {
        console.error(error);
    });
    // res.json(req.body)
}
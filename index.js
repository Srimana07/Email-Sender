const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//create the middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/send-email.html');
});

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'srimanamaity75@gmail.com',
        pass: 'xqal ocfa yyid cany',
    }
})

//route
app.post('/send-email', (req,res)=>{
    const {to, subject, text}=req.body;

    const mailOptions = {
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error,infor)=>{
        if(error){
            console.error(error);
            res.status(500).send('error in sending mail');
        } else{
            console.log('email sent:'+infor.response);
            res.send('email sent successfully');
        };
    });

    
});


app.listen(port, ()=>{
    console.log(`Server is running on my port ${port}`);
});


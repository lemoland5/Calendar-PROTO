const express = require ('express');
const bodyParser = require ('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

const {
    Day,
    User,
    add,
    dbSetup
} = require('./modules/db.js')
const crypto = require(`./modules/crypto.js`);

const app = express();

const port = process.env.port || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

let sessionSecret = 'unreg';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
}));

main().catch(err => console.log(err));

async function main(){

    await dbSetup();

    app.get(`/`, (req, res)=>{
        res.status(200);
        res.render('./main/index.ejs', {user : req.session.email, doc : req.session.lastDay});

        console.log(`SESSION EMAIL IS: ${req.session.email}`);
    })

    app.post(`/`, (req, res)=>{
        res.status(200);

        if(req.body.type == 'day'){

            let obj = {
                type: req.body.type,
                date: req.body.date,
                tx: req.body.tx,
                ty: req.body.ty, 
                week: req.body.week,
                reaction: req.body.reaction,
                color: req.body.color,
                user: req.session.email
            }

            add(obj);

            const q = User.findOne({email: req.session.email}).exec();
            q.then((doc) => {
                doc.lastDay = Date.now();

                req.session.lastDay = doc.lastDay;
                console.log(req.session.lastDay);

                doc.save();
                res.redirect(`/..`);
            })
        }

    })

    app.get(`/login`, (req, res) => {
        res.status(200);
        res.render('./login/index.ejs', {success : true, user: req.session.email});
    })

    app.get(`/register`, (req, res) => {
        res.status(200);
        res.render('./login/register.ejs', {user: req.session.email});

    })

    app.post(`/login`, (req, res) => {
        
        // add(req.body);
        
        if(req.body.type == 'user'){
            add(req.body);
            res.render('./login/index.ejs', {success : true, user: req.session.email});
            console.log('REGISTER ATTEMPT');
        }

        if(req.body.type == 'login'){
            const q = User.find({email: req.body.email, password: crypto.hash(req.body.password) }).exec();
            q.then((doc)=>{

                    // bad request
                if(doc.length != 0){
                    //new secret
                    req.session.regenerate((err) => {
                        if (err) {
                        console.error(err);
                        }
                            //new name + email added to session
                        console.log(doc);

                        req.session.email = doc[0].email;
                        req.session.lastDay = doc[0].lastDay;

                        res.redirect(`/..`)
                    });
                }

                else{
                    res.status(401);
                    res.render('./login/index.ejs', {success : false, user : req.body.email});
                }
            })
        }
    })

    app.get(`/calendar`, (req, res) => {
        res.status(200);

        const q = Day.find({user: req.session.email }).sort({dat: 1}).exec();
        q.then((doc)=>{

            console.log(doc);

            res.render('./calendar/index.ejs', {doc : doc, user : req.session.email});

        })
    })

    app.get(`/logout`, (req, res) => {
        req.session.email = undefined;
        req.session.lastDay = undefined;

        res.redirect(`/..`);
    })

    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}..`);
        console.log(`Go to app: localhost:${port}`);
    })

}

const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const otpGenerator = require('otp-generator')

router
    .post("/", (req, res) => {




        return Users.create({
            name: req.body.name,
            phone_number: req.body.number

        }).then(async function(users) {
            if (users) {

                res.render("otpGen")
            } else {
                response.status(400).send('Error in insert new record');
            }
        });
    })

router
    .post("/generateotp", async(req, res) => {
        const number = req.body.number;
        let user_id = null;
        try {
            const User = await Users.findOne({
                where: {
                    phone_number: number
                }
            })
            if (User) {
                let otp = otpGenerator.generate(4, { specialChars: false });
                Users.update({ otp: otp, otp_expiration_date: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 5 MINUTE") }, { where: { phone_number: number } }).then(result => console.log(result)).catch(err => console.log(err))
                user_id = User.id;

                res.render("compare", { user_id: user_id })
            } else {
                console.log("no user with this number found")
            }
        } catch (err) {
            console.log(err)
        }
        res.render("otpGen")

    })

router
    .get("/:id/verify_otp", async(req, res) => {
        let otp = req.query.otp;

        let user;
        let response;
        try {
            user = await Users.findOne({ where: { id: req.params.id } });
            if (user.otp_expiration_date <= new Date()) {
                console.log("otp expired");
                response = "otp expired"
            } else {
                if (otp == user.otp) {
                    console.log("otp Verified")
                    response = "otp verified";
                } else {
                    console.log("invalid otp");
                    response = "invalid otp";
                }
            }
        } catch (err) {
            console.log(err)
        }


        res.render("compare", { user_id: req.params.id, response: response })
    })

module.exports = router;
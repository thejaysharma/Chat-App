const router = require("express").Router();
const { User } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully", name: user.fullName, avatarUrl: user.avatarUrl });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
})

const validate = (date) => {
    const Schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return Schema.validate(date);
}

module.exports = router;
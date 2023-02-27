const { connection } = require('../model/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let userRegister = async (req, res) => {
    try {
        // destructure
        let { name, email, phone, password, adhar_no,role } = req.body;
        // console.log(name, email, phone, password, adhar_no, 'before hash password')
        const Salt = await bcrypt.genSalt(8);
        let hashPassword = bcrypt.hashSync(password, Salt);
        // console.log(hashPassword, 'after hash password')
        password = hashPassword
        // structure
        let data = { name, email, phone, password, adhar_no,role }
        let SqlQuery = "INSERT INTO users SET ?";
        await connection.query(SqlQuery, data, (err, result) => {
            if (err) {
                return res.json({ Error: err.message });
            }
            res.json({ status: 200, "response": result });
        })
        // database store
    }
    catch (err) {
        res.json({ status: 400, response: err.message });
    }
}


let userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let SqlQuery = `SELECT * FROM users WHERE email ="${email}"`
        await connection.query(SqlQuery, async (err, result) => {
            if (err) {
                return res.json({ Error: err.message })
            }
            //    console.log(result)
            if (result === [] || result == undefined) {
                return res.json({ response: "Email id doesn't exists" })
            }
            // conditional statement if /else
            const userres = result[0].password
            //    // password check
            const passwordCheck = await bcrypt.compare(password, userres);
            if (!passwordCheck) {
                return res.json({ Error: "oops wrong password" });
            }
            const token = await jwt.sign({ email }, process.env.jwt_SECRET_KEY, { expiresIn: "15m" })
            res.json({ status: 200, response: "logged in successfully", token,users:result[0]})
        })
    } catch (err) {
        res.json({ status: 400, "response": err.message })
    }
}

module.exports = { userRegister, userLogin }
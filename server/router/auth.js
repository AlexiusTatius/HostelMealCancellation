const express = require('express');
const router = express.Router();
require('../db/conn')
const { User, Admin } = require('../model/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authenticate, adminAuthenticate } = require('../middleware/authenticate')

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});


router.post('/register', async (req, res) => {

    const { roomNo, name, rollNo, phone, password, cpassword, year, hostelName } = req.body;

    if (!roomNo || !name || !rollNo || !phone || !password || !cpassword || !year || !hostelName) {
        return res.status(422).json({ error: "Plz fill the fields properly" });
    }

    try {
        const userExist = await User.findOne({ rollNo: rollNo })

        if (userExist) {
            return res.status(422).json({ error: "Roll No. already Exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "passwords do not match" });
        }
        else {

            const user = new User({ roomNo, name, rollNo, phone, password, cpassword, year, hostelName });
            // here
            const userRegister = await user.save();

            // console.log(userRegister)

            if (userRegister) {
                res.status(201).json({ message: "user registered successfuly" });
            }

            else {
                res.status(500).json({ error: "Failed to registered" })
            }
        }


    } catch (err) {
        console.log(err);
    }



});

router.post('/admin/register', async (req, res) => {

    const { username, password, cpassword, year, hostelName } = req.body;

    if (!username || !password || !cpassword || !year || !hostelName) {
        return res.status(422).json({ error: "Plz fill the fields properly" });
    }

    try {
        const adminExist = await Admin.findOne({ username: username })

        if (adminExist) {
            return res.status(422).json({ error: "Username already Exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "passwords do not match" });
        }
        else {

            const admin = new Admin({ username, password, cpassword, year, hostelName });
            // here
            const adminRegister = await admin.save();

            // console.log(adminRegister)

            if (adminRegister) {
                res.status(201).json({ message: "admin registered successfuly" });
            }

            else {
                res.status(500).json({ error: "Failed to registered" })
            }
        }


    } catch (err) {
        console.log(err);
    }



});

router.post('/signin', async (req, res) => {

    try {
        let token;
        const { rollNo, password } = req.body;
        if (!rollNo || !password) {
            return res.status(400).json({ error: "Plz fill the data" })
        }
        const userLogin = await User.findOne({ rollNo: rollNo });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            token = await userLogin.generateAuthToken()
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (isMatch) {
                res.json({ message: "SignIn successful" })
            } else {
                res.status(400).json({ error: "Invalid credentials" })
            }

        }
        else {
            res.status(400).json({ error: "Invalid credentials" })
        }


    } catch (err) {
        console.log(err);
    }
})

router.post('/admin/signin', async (req, res) => {

    try {
        let token;
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Plz fill the data" })
        }
        const adminLogin = await Admin.findOne({ username: username });

        // console.log(adminLogin);

        if (adminLogin) {
            const isMatch = await bcrypt.compare(password, adminLogin.password)

            token = await adminLogin.generateAuthToken()
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (isMatch) {
                res.json({ message: "Admin SignIn successful" })
            } else {
                res.status(400).json({ error: "Invalid credentials" })
            }

        }
        else {
            res.status(400).json({ error: "Invalid credentials" })
        }


    } catch (err) {
        console.log(err);
    }
})

router.get('/about', async (req, res) => {

    const findResult = await User.find(req.query).sort({startDate: -1});
    // const rootUser = await findResult.forEach(console.log);

    res.json(findResult);

    // console.log(`Hello my About`);
    // console.log(`${req.rootUser} from router`);
});

router.get('/getdata', authenticate, async (req, res) => {

    // const findResult = await User.find();
    // const rootUser = await findResult.forEach(console.log);

    await res.send(req.rootUser);

});

router.get('/admin/getdata', adminAuthenticate, async (req, res) => {

    await res.send(req.rootAdmin);

});

router.post('/contact', authenticate, async (req, res) => {

    try {

        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            console.log("error in contact form");
            return res.json({ error: "plz fill the form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        console.log(userContact);

        if (userContact) {

            const userDate = await userContact.addDate(startDate, endDate);
            await userContact.save()
            res.status(201).json({ message: "Data stored successfully" })
        }
    }
    catch (error) {
        console.log(error)
    }


});

module.exports = router;
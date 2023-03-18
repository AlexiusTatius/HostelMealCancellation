const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    // messages: [{
    //     message: {
    //         type: String,
    //         required: true
    //     }
    // }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {

    console.log("hello from middleware");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    }
    catch (err) {
        console.log(err);
    }
}

userSchema.methods.addDate = async function (startDate, endDate) {

    try {
        const result = await this.updateOne({ $set: { startDate, endDate } });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }

}

adminSchema.pre('save', async function (next) {

    console.log("hello from middleware");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

adminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    }
    catch (err) {
        console.log(err);
    }
}

// userSchema.methods.addDate = async function (startDate, endDate) {

//     try {
//         this.startDates = this.startDates.concat({ startDate });
//         this.endDates = this.endDates.concat({ endDate });
//         await this.save();
//         // return this.messages;
//     } catch (error) {
//         console.log(error)
//     }

// }

const User = mongoose.model('USER', userSchema);
const Admin = mongoose.model('ADMIN', adminSchema);

// module.exports = User;

module.exports = {
    User,
    Admin
};
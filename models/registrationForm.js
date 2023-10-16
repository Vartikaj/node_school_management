const mongoose = require('mongoose');
const validatorPackage = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const lstTransport = new Schema({
    trnasport_type: String,
    route_no: String,
    route_follow: String,
    conductor_name: String,
    conductor_no: Number
});

const transport = new Schema({
    transport_facility: Boolean,
    lstTransport: lstTransport,
});

const inhouseSchema = new Schema({
    HouseName: String,
    IsActive: Boolean,
    created_at: Date,
    updated_at: Date
});

const lstClassSchema = new Schema({
    class: String,
    section: String,
    year: Date,
    Inhouse: [inhouseSchema],
});

const lstguardianDetailSchema = new Schema({
    relation: String,
    salutation: String,
    name: String,
    gender: {
        type: String,
        enum: {
            values : ['Female', 'Male', 'Others'],
            message : '{VALUE} is not a valid gender name',
        },
        required: true,
    },
    age: {
        type: Number,
        trim: true,
        min: [18, 'age must be grater then 18'],
        max: [60, 'age must be less then 60']
    },
    contact_no: {
        type: String,
            minLength: [10, "no should have minimum 10 digits"],
            maxLength: [10, "no should have maximum 10 digits"],
            match: [/\d{10}/, "no should only have digits"],
        trim: true,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        caseInsenstive : true,
        validate: {
            validator: validatorPackage.isEmail,
            message: 'Please provide a valid email address',
        }
    },
    blood_group: String,
    school_employee: Boolean,
    emp_id: Number,
    IsActive: Boolean,
    created_at: Date
});




const lstContactDetailSchema = new Schema({
    contactype: String,
    addressLine1: String,
    addressLine2: String,
    countryCode: Number,
    countryDisplay: String,
    districtCode: Number,
    districtDisplay: String,
    stateCode: Number,
    stateDisplay: String,
    cityCode: Number,
    cityDisplay: String,
    postalCode: Number,
    IsActive: Boolean
});

const registrationFormSchema = new Schema({
    salutation: String,
    firstName: {
        type: String,
        maxLength: [30, 'First name length not more then 30 character long'],
        trim: true
    },
    middleName: {
        type: String,
        maxLength: [30, 'Middle name length not more then 30 charcters long']
    },
    lastName: {
        type: String,
        maxLength: [30, 'Last name length not more then 30 characters long'],
        trim: true
    },
    username: {
        type: String,
        maxLength: [30, 'Username length not more then 30 characters long'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        maxLength: [30, 'Password length not more then 30 characters long'],
        trim: true,
        minLength: [8, 'Password must be at least 8 characters long'],
        maxLength: [128, 'Password must be less then 128 characters long']
    },
    loginCount:{
        type:Number,
        default: 0
    },
    genderCode: Number,
    genderDisplay: String,
    dob: Date,
    admissionNumber: Number,
    addmissionDate: Date,
    lstguardianDetail: [lstguardianDetailSchema],
    lstContactDetail: [lstContactDetailSchema],
    lstClass: [lstClassSchema],
    transport: transport,
    library_facility : Boolean,
    active : Boolean
})

//THIS IS FOR UNIQUE VALUE ACCEPTOR
registrationFormSchema.plugin(uniqueValidator, { message : '{PATH}: {VALUE} is already exists!!' });
//==================

//THIS IS FOR PASSWORD ENCRYPTION
registrationFormSchema.pre('save', async function(){
    const user = this;
    if(!user.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
})
//===============================

//COMPARE PASSWORD WITH HASHED PASSWORD IN DATABASE
registrationFormSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}
//================================

//INCREMENT LOGIN COUNT WHEN USER LOGS IN
registrationFormSchema.methods.incrementLoginCount = async function() {
    this.loginCount += 1;
    return await this.save();
}
//=======================================

//Generate a JWT token
registrationFormSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id : this._id }, process.env.JWT_SECRET, { expiresIn: 5000 });
    return token;
}
registrationFormSchema.statics.findByToken = async function(token) {
    try {
        console.log("Token : "+ token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded id : " + decoded._id);
        return await this.findOne({ _id : decoded._id});
    } catch (err) {
        throw new Error(`Error verifying token: ${err.message}`);
    }
}
//====================

const registrationForm = mongoose.model('registration', registrationFormSchema);





// registrationForm.init().
//   then(() => registrationForm.create(dup)).
//   catch(error => {
//     // `U2.create()` will error, but will *not* be a mongoose validation error, it will be
//     // a duplicate key error.
//     // See: https://masteringjs.io/tutorials/mongoose/e11000-duplicate-key
//     console.log('error');
//   });




//IF WE WANT TO CREATE MULTIPLE COLLECTION THEN WE USE THIS
// const lstguardianDetailModel = mongoose.model('lstguardianDetail', lstguardianDetailSchema);
// const lstContactDetailModel = mongoose.model('lstContactDetail', lstContactDetailSchema);
// const inhouseModel = mongoose.model('Inhouse', inhouseSchema);
// const LstClassModel = mongoose.model('LstClass', lstClassSchema);
//===========================================

module.exports = registrationForm;

module.exports.validatePassword = function(password){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
    return regex.test(password);
}


module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again later'
});


//IF WE WANT TO CREATE MULTIPLE COLLECTION THEN WE USE THIS
// lstguardianDetails : lstguardianDetailModel,
// lstContactDetail: lstContactDetailModel,
// Inhouse: inhouseModel,
// LstClass: LstClassModel;
//========================================================
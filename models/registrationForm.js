const mongoose = require('mongoose');
const validator = require('validator')
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
    gender: String,
    age: Number,
    contact_no: {
        type: Number,
        trim: true,
        required: true,
        unique: true,
        min: [10, 'Number must be 10 digit long']
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: validatorPackage.email,
            
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
    firstName: String,
    middleName: String,
    lastName: String,
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

const registrationForm = mongoose.model('registration', registrationFormSchema);

//IF WE WANT TO CREATE MULTIPLE COLLECTION THEN WE USE THIS
// const lstguardianDetailModel = mongoose.model('lstguardianDetail', lstguardianDetailSchema);
// const lstContactDetailModel = mongoose.model('lstContactDetail', lstContactDetailSchema);
// const inhouseModel = mongoose.model('Inhouse', inhouseSchema);
// const LstClassModel = mongoose.model('LstClass', lstClassSchema);
//===========================================

module.exports = registrationForm;

//IF WE WANT TO CREATE MULTIPLE COLLECTION THEN WE USE THIS
// lstguardianDetails : lstguardianDetailModel,
// lstContactDetail: lstContactDetailModel,
// Inhouse: inhouseModel,
// LstClass: LstClassModel;
//========================================================
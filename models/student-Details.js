const mongoose = require('mongoose');
const internal = require('stream');


const lstTransport = {
    trnasport_type: String,
    route_no: String,
    route_follow: String,
    conductor_name: String,
    conductor_no: Number
}

const transport = {
    transport_facility: Boolean,
    lstTransport: lstTransport,
}


const Inhouse = {
    HouseName: String,
    IsActive: Boolean,
    created_at: Date,
    updated_at: Date
}

const lstClass = {
    class: String,
    section: String,
    year: Date,
    Inhouse: Inhouse,
}

const lstguardianDetail = {
    relation: String,
    salutation: String,
    name: String,
    gender: String,
    age: Number,
    contact_no: Number,
    email: String,
    blood_group: String,
    school_employee: Boolean,
    emp_id: Number,
    IsActive: Boolean,
    created_at: Date
}

const lstContactDetail = {
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
}

const registrationForm = new mongoose.Schema({
    salutation: String,
    firstName: String,
    middleName: String,
    lastName: String,
    genderCode: Number,
    genderDisplay: String,
    dob: Date,
    admissionNumber: Number,
    addmissionDate: Date,
    lstguardianDetail: lstguardianDetail,
    lstContactDetail: lstContactDetail,
    lstClass: lstClass,
    transport: transport,
    library_facility : Boolean,
    active : Boolean
})

module.exports = mongoose.model('student-details', registrationForm);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: { 
            type: String, 
            required: 'First Name is required',
        }, 
        lastname: { 
            type: String, 
            required: 'Last Name is required'
        }, 
        email: {
            type: String,
            required: 'Email is required',
            unique: true
        },
        profile: { 
            type: String, 
        },
        age: { 
            type: Number, 
            required: 'Age is required'
        },
        salary: {
            type: Number

        }
       
    }, 
    {
        timestamps: true
    }
);

const Employee = mongoose.model('Employee', userSchema);

module.exports = Employee;
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{7,15}$/,'Phone must be 7-15 digits'],
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
    toObject: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
})

const AuthoritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    govId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        match: [/^[A-Z0-9-]{4,30}$/i, 'Invalid Government ID format'],
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
    toObject: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
})

const User = mongoose.model('PublicCred', UserSchema);
const Authority = mongoose.model('AuthorityCred', AuthoritySchema);

export default {User, Authority};
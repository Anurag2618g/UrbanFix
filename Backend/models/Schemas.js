import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
        required: true,
        unique: true,
    },
})

const AuthoritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    govId: {
        type: String,
        required: true,
        unique: true,
    },
})

const User = mongoose.model('PublicCred', UserSchema);
const Authority = mongoose.model('AuthorityCred', AuthoritySchema);

export default {User, Authority};
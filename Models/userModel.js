import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },


    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    contactNumber1: {
      type: String,
    },

    contactNumber2: {
      type: String,
    },

    shippingAddress: {
      addressLine1: { type: String},
      addressLine2: { type: String},
      district: { type: String },
      province: { type: String },
      zipCode: { type: String },
    },

  },
  {
    timestamps: true,
  }

);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});


const User = mongoose.model('User', userSchema);
export default User;
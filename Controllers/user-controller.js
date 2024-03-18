import usermodel from "../Models/usermodel.js";
import bcrypt from 'bcryptjs';

export const getAllusers = async (req, res, next) => {
    let users;
    try {
      console.log("here1")
      users = await usermodel.find();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
  
    return res.status(200).json({ users });
  };
  
  export const signup = async (req, res, next) => {
    console.log("called");
    const { name, email, password } = req.body; // Fix variable name here
    
    // Check if the password field is missing or empty
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    
    let existingUser;
    try {
        existingUser = await usermodel.findOne({ email }); // Make sure to use the correct model
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedpassword = bcrypt.hashSync(password, 10); // Hash the password with a salt round of 10
    
    const user = new usermodel({
        name,
        email,
        password: hashedpassword,
    });
    
    try {
        await user.save();
        return res.status(201).json({ user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const login =async(req,res,next)=>{
  console.log("called")
  const {  email, password } = req.body; 
    let existingUser;
    try {
        existingUser = await usermodel.findOne({ email }); // Make sure to use the correct model
    } catch (e) {
        console.error(e); // Change console.log to console.error for better visibility of errors
        return res.status(500).json({ message: "Internal Server Error" }); // Return an error response
    }
    if (existingUser) {
      console.log(existingUser);
        return res.status(400).json({ message: "User not exists" });
    }
  const ispasswordcorrect =bcrypt.compareSync(password, existingUser.password)
  if(!ispasswordcorrect){
    return res.status(404).json({message:"incorrect password"})
  }
  return res.status(404).json({message:"Login success"})

}
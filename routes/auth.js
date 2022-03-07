import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/User.js";
import { registerValidation, loginValidation } from "../validation.js";
import { auth as verify } from "./verifyToken.js";

//!!VALIDATION

const router = Router();

router.post("/register", async (req, res) => {
  console.log(req.body);

  //VALIDATING THE DATA BEFORE USER CREATED
  const { error } = registerValidation(req.body);
  // console.log(error, !!error);
  if (error) {
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });
  }

  //checking if the user is already in the database
  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist)
    return res
      .status(400)
      .json({ status: 400, message: "Email already exists." });

  //encrypting password (Hash pswds)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //!!saving a user to database
  try {
    const savedUser = await user.save();
    // res.send(savedUser);
    return res.status(201).json({
      status: 201,
      name: user.name,
      email: user.email,
      Id: user._id,
    });
  } catch (error) {
    return res.status(400);
  }
});

//!!LOGIN
router.post("/login", async (req, res) => {
  //Validating data before the user Logged In
  const { error } = loginValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });
  }

  //checking if the userEmail exist in db
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user)
    return res
      .status(400)
      .json({ status: 400, message: "Invalid credentials!" });

  //Checking if password is valid
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json({ status: 400, message: "Invalid userName or password" });

  //Create and assign a token to the legged user
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({ authToken: token, name: user.name, id: user._id }); // adding token to the header to the user'
});

//UPDATE A USER
router.put("/:id", verify, async (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (id.length != 24)
    return res.status(400).json({ status: 400, message: "Wrong user Id" });

  const result = await User.findById(id);
  if (!result)
    return res.status(404).json({ status: 404, message: "User Not found" });

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("User updated!");
    return res.status(200).json({status: "Success", name: req.body.name, email: req.body.email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error!" });
  }
});

//!!Delete a user
router.delete("/:id", verify, async (req, res) => {
  const id = req.params.id;

// if(id !== 24 ) return res.status(400).json({status:"fail", code:400, message: "Invalid Id"})
  const result = await User.findById(id);
  if (!result)
    return res.status(404).json({ status: 404, message: "User not found" });

  const userDelete = await result.delete();

  if (userDelete)
    return res
      .status(200)
      .json({ status: 200, message: "User successfully deleted" });

  return res
    .status(500)
    .json({ status: 500, message: "Internal server error" });
});

//!! Get all users
router.get("/", verify, async (req, res) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      return res
        .status(200)
        .json({ title: "All Users", status: 200, users: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: 500, message: "Internal server error" });
    });
});

export { router };

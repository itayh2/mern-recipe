import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

const router = express.Router();

// הרשמה
router.post("/register", async (req, res) => {
  const { username, email, password, securityQuestion, securityAnswer } = req.body;

  try {
    const userExists = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ 
        message: userExists.username === username ? 
          "שם המשתמש כבר קיים במערכת" : 
          "כתובת המייל כבר קיימת במערכת" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(securityAnswer.toLowerCase(), 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      securityQuestion,
      securityAnswer: hashedAnswer
    });

    await newUser.save();
    res.status(201).json({ message: "ההרשמה בוצעה בהצלחה!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "שגיאה בהרשמה" });
  }
});

// התחברות
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "משתמש לא קיים" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "סיסמא שגויה" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userID: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "שגיאה בהתחברות" });
  }
});

// בדיקת שאלת אבטחה
router.post("/check-security", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "משתמש לא קיים" });
    }

    res.json({ 
      securityQuestion: user.securityQuestion 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "שגיאה בטעינת שאלת האבטחה" });
  }
});

// איפוס סיסמא
router.post("/reset-password", async (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "משתמש לא קיים" });
    }

    const isAnswerValid = await bcrypt.compare(securityAnswer.toLowerCase(), user.securityAnswer);
    if (!isAnswerValid) {
      return res.status(400).json({ message: "תשובה שגויה לשאלת האבטחה" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "הסיסמא שונתה בהצלחה" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "שגיאה באיפוס הסיסמא" });
  }
});

// אימות טוקן
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "אין הרשאה" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "טוקן לא תקין" });
  }
};

export { router as userRouter };
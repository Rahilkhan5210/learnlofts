import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // ✅ No `res.json()` here, just return the token
    return token;
};

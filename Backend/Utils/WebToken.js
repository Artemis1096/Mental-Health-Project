import jwt from 'jsonwebtoken';

export const generate = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "3d" });
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None'
    });
};

export const verify = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(400).json({message: "You are not authorized to access this resource"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded){
            return res.status(400).json({message: "You are not authorized to access this resource"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in verify middleware", error.message);
        res.status(400).json("Internal server error");
    }
};


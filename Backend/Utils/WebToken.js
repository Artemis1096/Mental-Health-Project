import jwt from 'jsonwebtoken';

export const generate = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "3d" });
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None'
    });
};

export const verify = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/'); // Redirect if no token

    jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
        if (error) return res.redirect('/'); // Redirect if token is invalid

        req.userId = data.userId;
        next();
    });
};


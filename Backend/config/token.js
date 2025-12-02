import jwt from 'jsonwebtoken';

const genToken = (id) => {
    try {
        const token = jwt.sign(
            { userId: id },   
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;

    } catch (error) {
        console.log("Error generating token:", error);
        return null;
    }
};

export default genToken;

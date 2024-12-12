import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "You are not authenticated",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            res.status(400).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id = decode.userId
        next()

    } catch (error) {
        res.status(400).json({
            message: "Authentication failed",
            success: false
        })
    }
}

export default isAuthenticated
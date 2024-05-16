import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
        //verificar el token que esta en las cookies
        const token = req.cookies.token

        //si no estoy logeado, devolvemos un error
        if(!token) return res.status(401).json({ message: "Not Authenticated!" })
    
        //si tenemos un token, hay q verificarlo 
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
            if(err) return res.status(403).json({ message: "Token is not valid!"})

        //recordar que dentro del payload tengo la info , asi que tengo un ID
        req.userId = payload.id;
        //si esta todo ok pasamos al siguiente proceso con next()
        next() ;
        })
}
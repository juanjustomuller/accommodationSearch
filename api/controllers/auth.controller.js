import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    console.log("Solicitud de registro recibida:", req.body);
    //db opetarions
    const {username, email, password} = req.body
    console.log(req.body);

    try {
        
        //HASH THE PASSWORD (versión encriptada de la contraseña original)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        
        //CREATE A NEW USER AN SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });
        console.log("newUser", newUser);
        
        res.status(201).json({message: "User created successfuly"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to create user!"})
    }
    };
    
    export const login = async (req, res) => {
        //db opetarions

        const { username, password } = req.body

        try {
            //CHEQUEAR SI EL USUARIO EXISTE
            const user = await prisma.user.findUnique({             //busco donde el nombre del usuario es igual al nombre de usuario que viene del cliente
                where:{username}
            })

            if(!user){
                return res.status(401).json({message: "Invalid Credentials!"})
            }    //si no existe retorno usuario no encontrado
            
            //CHEQUEAR SI LA PASSWORD ES CORRECTA...
            //COMPARO LA CONTRASEñA ENCRIPTADA QUE TENGO EN LA DB CON LA PASSWORD QUE INGRESA EL CLIENTE
            const isPasswordValid =  await bcrypt.compare(password, user.password)

            if(!isPasswordValid){
                return res.status(401).json({message: "Invalid Credentials!"})  
            }  

            
            //SI TODO ES CORRECTO, VAMOS A GENERAR UN TOQUEN DE COOKIES Y ENVIARSELO AL USUARIO 
            //res.setHeader("Set-Cookie", "test=" + "myValue").json("success")   //le paso el cookieName ("test=") y un valor("myValue")
            const age = 1000 * 60 * 60 * 24 * 7 // para q dure 7 dias la cookie, sino por default dura hasta q se cierre sesion
            
            const token = jwt.sign({
                id: user.id,
                isAdmin: false,
            }, process.env.JWT_SECRET_KEY, {expiresIn: age})
            //Dentro del token encriptado, se encuentra el user.id. Esto es por si se quiere utilizar el id para verificar por ejemplo si un posteo es de un usuario o no (hay q descifrar el id del usuario dentro del token y ver si coincide)

            const {password: userPassword, ...userInfo} = user  //el user seria la DB

            res.cookie("token", token, {
                httpOnly: true,
                //secure: true
                maxAge: age
            }).status(200).json(userInfo)  //En vez de { message: "Login Successful!" }, envio la user information
        } catch (error) {
            console.log("error en el login: ",error);
            res.status(500).json({ message: "Failed to login"})
        }
        }

export const logout = (req, res) => {
    //db opetarions
    res.clearCookie("token").status(200).json({ message: "Logout successful" })  //le paso "token" que es el nombre de la cookie(linea 66)
}
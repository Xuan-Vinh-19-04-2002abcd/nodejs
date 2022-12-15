import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'

export const createUserService = ({ email, password, name }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            console.log('isEmail', isEmail)

            
            if (isEmail) {

                const isCheckEmail = await User.find({ userName: email })
                const isCheckName = await User.find({ name: name })

                if (isCheckEmail.length && isCheckName.length) {
                    resolve({
                        status: 'error',
                        message: 'Email or name is exist'
                    })
                }
                const hashPassword = bcrypt.hashSync(password, 10);
                console.log('hashPassword', hashPassword)
                const newUser = await User.create({
                    userName: email,
                    password: hashPassword,
                    name: name
                })

                resolve({
                    status: "OK",
                    data: {
                        email: newUser.userName,
                        name: newUser.name
                    }
                })
            }

            else {
                resolve({
                    status: 'error',
                    message: "Dang Xuan Vinh"
                })
            }

        } catch (error) {
            reject({
                status: 'error',
                message:'I don'
            })
        }
    })
}



export const loginUserService = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            console.log('isEmail', isEmail)
            if (isEmail) {

                const userDb = await User.find({ userName: email })
                if (userDb) { 
                    const checkPassword = bcrypt.compareSync(password, userDb[0].password)

                    console.log(userDb, checkPassword)
                    if (checkPassword) {
                        resolve({
                            status: 'ok',
                            data:{
                                username: userDb[0].name,
                                email:userDb[0].userName
                            }
                        })
                    }
                    resolve({
                            status:'error',
                            message:"invalid password"
                        })
                    

                   
                }
                resolve({
                    status: "error",
                    message:"email or password wrong" 
                })
            }

            else {
                resolve({
                    status: 'error',
                    message: "Unformat Email"
                })
            }

        } catch (error) {
            reject({
                message: error,
                status: 'error'
            })
        }
    })
}
export const getDetailUserService = (id)=> {
    return new Promise(async(resolve, reject) => {
        try {
            const findUser = await User.findById({_id:id})
            console.log(findUser.name);
            if(findUser){
                resolve({
                    status:'ok',
                    data:findUser
                })
            }
            resolve({
                status:"ok",
                message:'user is not define'
            })
        } catch (error) {
            reject({
                status:'error',
                message:error
            })
        }
    }).catch(e => e)
}
import { createUserService, loginUserService,getDetailUserService} from "../services/UserService.js"
export const studentControllerDetail = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    if(id){
        const response = await getDetailUserService(id)
        return response
        // console.log("vinhdeptrai")
    }
    return res.json({
        status:"error",
        message:'The id is require'
    })
}
export const createStudentController = async (req, res) => {
    console.log(req.body)
    const { email, password, name } = req.body
    if (email && password && name) {
        const response = await createUserService({ email, password, name })
        return res.json(response)
    }
    else {
        return res.json({
            status: "error",
            message: "The email or password is required"
        })
    }
}
export const loginUserController = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (email && password ) {
        const response = await loginUserService({email,password})
        return res.json(response)
    }
    else {
        return res.json({
            status: "error",
            message: "The email and  password is required"
        })
    }
}
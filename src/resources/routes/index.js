import router from "./user.js"
const routes = (app)=>{
    app.use('/user',router)
    app.get('/', (req, res) => {
        res.render('new')
    })
}
export default routes
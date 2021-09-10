const router = require('express').Router()
const checkProps = require('../helpers/funtions')
const {Post,postProps} = require('../models/post')
require('../database')



router.get('/',async (req,res)=>{

    try {
        const posts = await Post.find() 
        res.json({
            posts
        })
        
    } catch (error) {
        res.status(500).json({
            error
        })
        
    }

})
router.post('/', async (req,res) => {

    const {body} = req
    let faltan = checkProps(postProps,body)

    if (faltan.length !== 0) {

        return res.status(400).json({
            error:"faltan propiedades del post",
            faltan
        })
    }

    try {
        const post = new Post(body)
        const creado = await post.save()
        res.status(201).json({
            msg:"Post creado",
            post:creado
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
    


})



module.exports = router

const router=require('express').Router()

// Login/Landing Page
//route GET/
router.get('/',(req,res)=>{
    res.render('login',{
        layout:'login',
    })
})

// Dashboard
//route GET/
router.get('/dashboard',(req,res)=>{
    res.send('Dashboard')
})


module.exports=router;


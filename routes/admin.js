const express = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const router = express.Router();
const { z } = require('zod')

// const schema = z.object(z.string());
// const schema1 = z.object(z.number());
// const schema = z.object({
//     title:z.string(),
//     description:z.string(),
//     imageLink:z.string(),
//     price:z.number()
// })
router.post('/signup', async (req, res) => {
    const userSchema = z.object({
        username: z.string().min(1, "username is required"),
        password: z.string().min(1, "password is required")
    })
    const user = userSchema.safeParse(req.body)
    await Admin.create({
        username: user.username,
        password: user.password
    })
    res.json({
        message: "Admin created successfully"
    })

    // .then(function () {
    //     res.json({
    //         message: "Admin created successfully"
    //     })
    // })
    // .catch(function (){
    //     res.json({
    //         message:"Admin not created"
    //     })
    // })

})

router.post('/courses', adminMiddleware, async (req, res) => {
    const {title, description, imageLink,price} = req.body
    // const title = req.body.title;
    // const description = req.body.description;
    // const imageLink = req.body.imageLink;
    // const price = req.body.price;

    //   const title = schema.safeParse(courseTitle);   // zod validation
    //   const description  = schema.safeParse(courseDescription);
    //   const imageLink = schema.safeParse(courseImageLink);
    //   const price = schema1.safeParse(coursePrice);

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price

    })
    console.log(newCourse)
    res.json({
        message: "Course created successfully",
        courseId: newCourse._id
    })


})

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({})
    res.json({
        courses: response
    })
    console.log(response);

})


module.exports = router;
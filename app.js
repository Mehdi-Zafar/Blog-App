const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();

// connect to db
const dburl = "mongodb+srv://mehdi:cisd@nodetuts.ibsarek.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dburl)
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.render('index.ejs',{title: 'Home',blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/about',(req,res)=>{
    res.render('about.ejs',{title: 'About'});

})

app.get('/add-blog',(req,res)=>{
    res.render('add-blog.ejs',{title: 'Add Blog'});
})

app.get('/single-blog',(req,res)=>{
    res.render('single-blog.ejs',{title: 'Single Blog'});
})

app.get('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('single-blog.ejs',{title:'Blog Details',blog:result})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.post('/add-blog',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
})

// 404 page
app.use((req,res)=>{
    res.render('404.ejs',{title: '404'});
})
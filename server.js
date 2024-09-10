const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


app.get('/' ,(req, res)=>{
   return  res.render('index');
})


// ==========================trainer routes ===========================

app.get('/trainer/layout' ,(req, res)=>{
  return  res.render('trainer/layout');
})
app.get('/trainer/dashboard' ,(req, res)=>{
  return  res.render('trainer/dashboard');
})

app.get('/AllStudents' ,(req, res)=>{
   return  res.render('trainer/crudStudents');
})

//=====================================================================


// app.get('/home' ,(req, res)=>{
//   return  res.render('./home');
// })



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

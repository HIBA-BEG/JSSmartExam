const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const authRoutes = require('./routes/AuthRoutes');
const trainerRouter = require('./routes/trainerRouter');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  





app.get('/' ,(req, res)=>{
   return  res.render('index');
})


app.use('/TRAINER', trainerRouter);


app.use('/',authRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

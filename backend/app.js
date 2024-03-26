const express = require('express')
const app = express()
const connectDB = require("./database/connect");
connectDB();
const cors = require('cors');
app.use(cors())
const port = process.env.PORT || 5000;
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);

app.use(bodyparser.json())





const templatesroutes = require('./routes/templatesController')
const catogoryroutes = require('./routes/categoryController')
const documentlistroutes = require('./routes/documentListController')
const serviceroutes = require('./routes/serviceController')
const loginroutes = require('./routes/loginController')
const blogroutes = require('./routes/blogController')
const contactroutes = require('./routes/contactController')


app.use('/admin/templates', templatesroutes);
app.use('/admin/category', catogoryroutes);
app.use('/admin/documentlist', documentlistroutes);
app.use('/admin/service', serviceroutes);
app.use('/admin/', loginroutes);
app.use('/admin/blog', blogroutes);
app.use('/admin/', contactroutes);




 
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
const express = require('express');
const mongoose = require('mongoose');
// const User = require('../Backend/model/user-model');
const usersignup = require('./routes/usersignup-route');
// const userRoute = require('../Backend/routes/user-route');
const reviewRoutes = require('../Backend/routes/review-route');
const docproRoutes = require('./routes/docpro-route');
const queryRoutes = require('../Backend/routes/query-route');
const userproRoutes = require('../Backend/routes/userpro-route');
const onlineBookRoutes = require('./routes/onlinebook-route');
const docNearbyRoutes = require('./routes/docnearby-route');
const paymentRoutes = require('./routes/doc3signup-route');
const VerificationRoutes = require('./routes/doc2signup-route');
const DocregistrationRoutes = require('../Backend/routes/doc1signup-route');
const contactRoutes = require('./routes/contact-route');
const LoginRoutes = require('./routes/login-route');
const addavailRoutes = require('./routes/addavail-route');
const uspreventionRoutes = require('./routes/usprevention-route');
const rejectionRoutes = require('./routes/reject-route');
const app = express();
//const errorMiddleware = require('./utils/errorhandler');
app.use('/uploads', express.static('uploads'));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.)
//app.use(errorMiddleware);

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());



app.get('/', function (req, res) { 
  res.send('Hello from API');
});


// routes
// app.use('/api/users', userRoute);
app.use('/api/usersignup', usersignup);
app.use('/api/reviews', reviewRoutes);
app.use("/api/docpro", docproRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/userprofiles", userproRoutes);
app.use('/api/onlinebook', onlineBookRoutes);
app.use("/api/doctors", docNearbyRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/verification', VerificationRoutes);
app.use('/api/docregistration', DocregistrationRoutes);
app.use('/api/contactus', contactRoutes);
app.use('/api/login', LoginRoutes);
app.use('/api/availability', addavailRoutes);
app.use('/api/userprevent', uspreventionRoutes);
app.use('/api/reject', rejectionRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/healsmart')
  .then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
        console.log('server running in port 3000');
    });
})
  .catch(() => {
    console.log('Connection failed');
  });
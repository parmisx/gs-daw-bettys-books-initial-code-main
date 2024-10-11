// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/register', function (req, res, next) {
    res.render('register.ejs')                                                               
})    

router.post('/registered', function (req, res, next) {

    const plainPassword = req.body.password;
    const username = req.body.username;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
        if(err){
            next(err);
        } else {
        // saving data in database
        let sqlquery = "INSERT INTO users(username, first_name, last_name, email, hashedPassword) VALUES (?, ?, ?, ?, ?)";
        // execute the query
        let newUser = [username, firstName, lastName, email, hashedPassword];

        db.query(sqlquery, newUser, (err, result)=>{
            if(err){
                next(err);
            } else{                                      
                //res.send(' Hello '+ req.body.firstName + ' '+ req.body.lastName +' you are now registered!  We will send an email to you at ' + req.body.email);
                result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
                result += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
                res.send(result)
                
            }
        });
        }
    });
});

router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM users" // query database to get all the users
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("userslist.ejs", {availableBooks:result})
     })
})

// Export the router object so index.js can access it
module.exports = router
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/table', function(req, res, next) {
  res.render('table', { title: 'My Contacts' });
});


/* GET contactlist page and display on contactlist page
This is taking the db object we passed to the request and using it to fill
the 'docs' variable with contact data*/
router.get('/contactlist', function(req,res) {
  var db = req.db;
  var collection = db.get('contacts');
  collection.find({},{}, function(e,docs) {
    res.render('contactlist', {
      "contactlist" : docs
    });
  });
});

/*GET new contacts page */
router.get('/newcontact', function(req,res) {
  res.render('newcontact', {title: 'Add New Conctact'});
});

/*POST to Add Contact*/
router.post('/addcontact', function(req, res) {
  //set our internal db variable
  var db = req.db;
  
  //get our form values, which rely on name attributes
  var ContactFname = req.body.firstname;
  var ContactLname = req.body.lastname;
  var ContactTitle = req.body.title;
  var ContactComp = req.body.company;
  var ContactEmail = req.body.email;
  var ContactLocal = req.body.location;
  var ContactDate = req.body.date;
  var ContactComments = req.body.comments;
  
  //set our collections
  var collection = db.get('contacts');
  
  //submit to the db
  collection.insert({
    "first_name" : ContactFname,
    "last_name" : ContactLname,
    "title" : ContactTitle,
    "company" : ContactComp,
    "email" : ContactEmail,
    "location_met" : ContactLocal,
    "date_met" : ContactDate,
    "comments" : ContactComments
  }, function (err, doc) {
    if (err) {
      //if it fails return an error
      res.send("There was an issue adding the information to the database.");
    }
    else {
      //if it works, se tthe header so the address bar doesn't say /adduser
      res.location("contactlist");
      //add forward to success page
      res.redirect("contactlist");
    }
  });
});

module.exports = router;

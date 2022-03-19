const express =  require('express');
const route = express.Router();
const Emp = require('../model/Employee');
const multer = require('multer');


// File upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './public/uploads');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
});

const upload = multer({storage:storage});

// Add Employee 
route.post("/add/Emp",(upload.single('avatar')), (req, res) =>{
    if(!req.body){
        res.status(400).send({message: 'Content can not be empty!'});
        return;
    }

    const user = new Emp({
        	        firstname: req.body.firstname,
        	        lastname: req.body.lastname,
        	        email: req.body.email,
                    age: req.body.age,
                    salary: req.body.salary,
                    profile: req.file.filename
        	    });
        	    // save new user in db
                user.save().then((docs)=>{
                      console.log(docs);
                      return res.status(200).redirect('/add-user');
                    
                     
                  })
                  .catch((err)=>{
                      return res.status(401).json({
                          message:'Error in adding new user',
                          success:false,
                          error:err.message
                      })
                  });

});

// GET single Employee by id
route.get('update-emp/:id', (req, res) =>{
    console.log(req.params.id);
    Emp.findById(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log("single Employee get");

        res.render('update_user', {emp : data});
      }
    });
    console.log('hi')
});

// Update Employee
route.post('/update-user/:id', (req, res) => {
    Emp.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
      if(err){
       
        res.redirect('update-user/'+req.params.id);
        console.log(err);
    } else {
      console.log(data);
      res.redirect('/');
    }
    });
});

// Delete Employee
route.get('/delete/:id', function(req, res) {
  Emp.findByIdAndRemove(req.params.id, function (err, project) {
    if (err) {
    console.log(err);
    } else {
      
      console.log('delete');
      res.redirect('/');
    }
  });
});

// retrieve and return all Employee/ retrive and return a single Employee
route.get('/', (req, res) => {
    if (req.query.id) {
      const id = req.query.id;
  
      Emp.findById(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: 'Not found user with id ' + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res.status(500).send({ message: 'Erro retrieving user with id ' + id });
        });
    } else {
      Emp.find()
        .then((user) => {
        // console.log(user)
        res.render('index', {user : user});
        
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              message:
                err.message || 'Error Occurred while retriving user information',
            });
        });
    }
});

route.get('/', (req, res) =>{
    res.render('index');
});

route.get('/add-user', (req, res) =>{
    res.render('add_user');
})


module.exports = route;



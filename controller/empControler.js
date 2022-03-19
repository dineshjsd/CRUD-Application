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
exports.add =(upload.single('avatar')), (req, res) =>{
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
                      return res.status(200).redirect('/add-user');
                      console(docs);
                     
                  })
                  .catch((err)=>{
                      return res.status(401).json({
                          message:'Error in adding new user',
                          success:false,
                          error:err.message
                      })
                  });

};

// Delete Employee with a specified Employee id 
exports.delete = (req,res) =>{
    const id = req.params.id;
  
    Emp.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
          res.send({
            message: 'User was deleted successfully!',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete User with id=' + id,
        });
      });
}


// Update a new idetified Employee by Employee id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: 'Data to update can not be empty' });
    }
  
    const id = req.params.id;
    Emp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
        } else {
          res.render('update_user', {user: data});
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error Update user information' });
      });
};

// // find Employee
// exports.find = function(req,res){
//     let id=req.params.id
//    console.log(id)
//    //res.send("Hello, welcome in ekarma hisar ")
//    User.findById(id).then(result=>{
//        console.log(result);
//        console.log("Record Fetched!");
//        //res.render('viewEmployee.ejs',{userData:result});
  
//     res.status(200).json({
//        message:'Data Fetched successfully',
//       userData:result
//      })
//    }).catch(err=>{
//        console.log(err);
//        res.status(500).json({
//        error:err
//        })
      
//    })
  
//   };

  // retrieve and return all Employee/ retrive and return a single Employee
exports.find = (req, res) => {
    if (req.query.id) {
      const id = req.query.id;
  
      User.findById(id)
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
      User.find()
        .then((user) => {
          res.send(user);
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
  };
  
  
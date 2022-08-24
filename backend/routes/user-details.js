var express = require("express");
var employees = require("../model/model");
var projects=require("../model/projectModel")
var roles = require("../model/rolesModel")
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route("/SignUp").post((req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const empid = req.body.empid;
  const password = req.body.password;
  const adminrequest = req.body.adminrequest;
  const adminstatus = req.body.adminstatus;

  const newemployees = new employees({
    name,
    empid,
    password,
    adminrequest,
    adminstatus,
  });
  newemployees
    .save()
    .then((result) => {
      res.json(result);
      res.status(200);
      // console.log(result);
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.route("/AddProjects").post((req, res) => {
  const newprojects = new projects(req.body);
  newprojects
    .save()
    .then((result) => {
      res.json(result);
      res.status(200);
    })
    .catch((err) => {
    });
});

router.route("/fetchusers").get((req, res) => {
  employees 
    .find()
    .then((employeeslist,) =>{
      res.json(employeeslist)
    } )
    // .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/fetchprojects").get((req, res) => {
  projects 
    .find()
    .then((projs,) =>{
      res.json(projs)
    } )
    // .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/fetchRoles").get((req, res) => {
  roles 
    .find()
    .then((allroles,) =>{
      res.json(allroles)
    } )
    // .catch((err) => res.status(400).json("Error: " + err));
});




router.route("/fetchthisproject/:id").get((req, res) => {
  console.log(req.params)
  projects 
    .findById(req.params.id)
    .then((projectdetails,) =>{
      res.json(projectdetails)
      console.log(projectdetails)
    } )
    .catch((err) => {res.status(400).json("Error: " + err)
  console.log(err)});
});

router.route("/deletethisproject/:id").get((req, res) => {
  console.log(req.params)
  projects
  .findByIdAndDelete(req.params.id)
    .then((del,) =>{
      console.log(del)
    } )
    .catch((err) => {res.status(400).json("Error: " + err)
  console.log(err)});
});

router.route("/:id").get((req, res) => {
  console.log("req",req.params)
  employees 
    .findById(req.params.id)
    .then((emp,) =>{
      res.json(emp)
    } )
    .catch((err) => {res.status(400).json("Error: " + err)
  console.log(err)});
});

router.route("/EditProjects").post((req, res) => {
  const editproject = new projects(req.body);
  let objeditproject = editproject.toObject()
  delete objeditproject._id

  projects.findOneAndUpdate(
    {_id: editproject._id},
     objeditproject,
     { upsert: true, setDefaultsOnInsert: true },
   (err, doc) => {
      if (err) {
          console.log(`Error: ` + err)
      } else {
          
      }
  });
});

router.route("/changerequest").post((req, res) => {
  // const requested = new employees(req.body);
  console.log(req.body)
  employees.findOneAndUpdate(
    {_id: req.body._id},
    { "$set": { "adminrequest": req.body.adminrequest} },
     { upsert: true, setDefaultsOnInsert: true },
   (err, doc) => {
      if (err) {
          console.log(`Error: ` + err)
      } else {
          
      }
  });
});


router.route("/acceptrequest").post((req, res) => {
  console.log(req.body)
  employees.findOneAndUpdate(
    {_id: req.body._id},
    { "$set": { "adminstatus": true} },
     { upsert: true, setDefaultsOnInsert: true },
   (err, doc) => {
      if (err) {
          console.log(`Error: ` + err)
      } else {
          
      }
  });
});

router.route("/Addrole").post((req, res) => {
  console.log(req.body)
  const value=req.body.data;
  const label=req.body.data;

  const newrole = new roles({
    value,
    label,
  });
  newrole
    .save()
    .then((result) => {
      res.json(result);
      res.status(200);
    })
    .catch((err) => {
    });
});

module.exports = router;

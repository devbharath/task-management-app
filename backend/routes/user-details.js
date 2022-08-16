var express = require("express");
var employees = require("../model/model");
var projects=require("../model/projectModel")
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
  // console.log(req.body);
 

  const newprojects = new projects(req.body);
  newprojects
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

router.route("/fetchuser").get((req, res) => {
  employees 
    .find()
    .then((employeeslist,) =>{
      res.json(employeeslist)
      // console.log(employeeslist)
    } )
    // .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
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

router.route("/:id/fetchproject").get((req, res) => {
  projects 
    .find()
    .then((projs,) =>{
      res.json(projs)
      console.log(projs)
    } )
    // .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

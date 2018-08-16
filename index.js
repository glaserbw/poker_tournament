//Requires
var bodyParser = require("body-parser");
var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var teamsDB = require("./models/teamService.js"); //./ because we're looking for a file nad not a module

//Global vars
var app = express();

//Set and Use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static("public"));

//Routes
app.get("/", function(req, res){
  	res.render("home");
});


app.get("/teams", function(req, res){
	var allTeams = teamsDB.getAllTeams();
  	res.render("teams/index", {teams: allTeams});
});


app.get("/teams/new", function(req,res){
	res.render("teams/new");
});


app.get("/teams/:name", function(req, res){
	var team = teamsDB.getOneTeam(req.params.name);
	res.render("teams/show", {team: team});
});


app.post("/teams", function(req,res){
	console.log(req.body);
	teamsDB.addTeam(req.body); 
	res.redirect("/teams/" + req.body.name);
});

app.get("/teams/edit/:name", function(req,res){
	var team = teamsDB.getOneTeam(req.params.name);
	res.render("teams/edit", {team: team});

});
//andres look below
app.put("/teams/:name", function(req,res){
	console.log(req.body);
	teamsDB.editTeam(req.params.name, req.body); 
	res.send("Puuut");
});

app.delete("/teams/:name", function(req,res){
	teamsDB.deleteTeam(req.params.name); 
	res.send("Deleted");
});


//Listen
app.listen(3000);



























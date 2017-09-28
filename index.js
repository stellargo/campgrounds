var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");

//schema
var campgroundschema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
var Campground = mongoose.model("Campground",campgroundschema);

Campground.create(
	{
		name:"dinosaur park", 
		image:"http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf",
		description:"Huge beautiful place you must visit!"
	}, function(err,campground){
		if (err){
			console.log(err);
		}else{
			console.log(campground);
		}
	}
);

app.get("/",function(req,res){
	res.render("landing")
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if (err){
			console.log(err);
		}else{
			res.render("campgrounds",{campgrounds:allCampgrounds});
		}
	})
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	Campground.create(newCampground,function(err,newlyCreated){
		if (err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(8000,function(){
	console.log("Started");
});
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
	image:String
});
var Campground = mongoose.model("Campground",campgroundschema);

Campground.create(
	{
		name:"salmon creek", 
		image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx"
	}, function(err,campground){
		if (err){
			console.log(err);
		}else{
			console.log("added");
		}
	}
);

var campgrounds = [
		{name:"salmon creek", image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx"},
		{name:"dinosaur park", image:"http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},
		{name:"jackson creek", image:"http://www.ride2guide.com/CirclePinesKOA.jpg"},
		{name:"salmon creek", image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx"},
		{name:"dinosaur park", image:"http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},
		{name:"jackson creek", image:"http://www.ride2guide.com/CirclePinesKOA.jpg"}
	];

app.get("/",function(req,res){
	res.render("landing")
});

app.get("/campgrounds",function(req,res){
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(8000,function(){
	console.log("Started");
});
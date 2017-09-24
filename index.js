var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing")
});

app.get("/campgrounds",function(req,res){
	var campgrounds = [
		{name:"salmon creek", image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx"},
		{name:"dinosaur park", image:"http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},
		{name:"jackson creek", image:"http://www.ride2guide.com/CirclePinesKOA.jpg"}
	];
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.listen(8000,function(){
	console.log("Started");
});
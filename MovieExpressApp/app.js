var express = require('express');
var app = express();
var requestNPM = require('request');

app.get("/",function(request, response) {
    response.render("search.ejs");
});

app.get("/result",function(request,response){
    var searchedMovie = request.query.movieSearch;
    var url = "http://www.omdbapi.com/?s="+searchedMovie+"&apikey=thewdb";
    requestNPM(url, function(error, responseNPM, body){
        if(!error && responseNPM.statusCode == 200){
            var movieData = JSON.parse(body);
            response.render("results.ejs",{data: movieData});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Starting Movie App..");
});
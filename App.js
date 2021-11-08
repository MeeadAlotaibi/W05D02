const express = require("express");
const app = request();
const PORT = 5000 ;
app.use(express.json());
const fs = require("fs");

const NewMovie = [];
 fs.readFile("./movies.json" , (err,data) => {
     NewMovie = JSON.parse(data.toString());
 });



//////////////// Show All Movies /////////////////////

// app.get("/movies", (req, res) => {
//   res.status(200).json(movies);
// });

//////////////// Show The Movies are not Deleted /////////////////////

app.get("/movie/" , (req , res)=>{
    const arr = [];
    NewMovie.map((ele) =>{
      if (ele.isDeleted === false){
        arr.push({ele});
      }
    })
      res.status(200).json(arr);
});//Done

////////////////Update Moive By Id /////////////////////

app.put("/movies/:id/", (req, res) => {
  const item = req.params.id;
  for (let i =0 ;i <NewMovie.length ; i++){
    if(NewMovie[i].id ===Number(item)){
      NewMovie[i].name = "See" ;
    }
  }
  fs.writeFile("./movies.json"), JSON.stringify(NewMovie), (err)=>{};
  res.json(NewMovie);
  // fs.readFile("./read.json", (err, data) => {
  //   // ناديته يقرأ لي البيانات من الفايل
  //   let newMovie = JSON.parse(data.toString()); // من بوفر يحول البيانات الى سترنق و من سترنق حولها الى جافاسكريبت
  //   newMovie.push({
  //     id: newMovie.length + 1,
  //     name: "Dark",
  //     isFav: false,
  //     isDeleted: false,
  //   }); // هذي هي البيانات الللي بضيفها في المصفوفه الجديدة
  //   addToFile(newTask);
  //   res.status(200).json(newTask);
  // });
});   //Done

//////////////// Create an New Movie ///////////////////////

app.post("/movies", (req, res) => {
  const { name } = req.body;
  NewMovie.push({
    id: NewMovie.length + 1,
    name: name,
    isFav : false ,
    isDeleted : false 
  });
  fs.writeFile("./movies.json"),JSON.stringify(NewMovie), (err)=>{};
  res.json(NewMovie);
}); ///Done

///////////////Soft Delet ///////////////////
app.put("/movies/:id/", (req, res) => {
  const item = req.params.id;
  for (let i = 0; i < NewMovie.length; i++) {
    if (NewMovie[i].id === Number(item)) {
      NewMovie[i].isDeleted = true;
    }
  }
  fs.writeFile("./movies.json"), JSON.stringify(NewMovie), (err) => {};
  res.json(NewMovie);
}); ////Done


///////////////Get All Favorite Movie ///////////////////
app.get("/movies" ,(req , res)=>{
  const favorite = [];
  NewMovie.map((item) =>{
    if (item.isFav === true){
      favorite.push({item});
    }
  });
  res.json(favorite);
}); ///Done 

///////////////Get Movie By Id///////////////////
app.get("/movi/:id" , (req,res)=>{
  const id = req.params.id;
  const movie = NewMovie.find((item) =>item.id == id);
  res.json(movie);
})///Done

app.listen(PORT , ()=>{
    console.log(`server is running ${PORT}`);
});  
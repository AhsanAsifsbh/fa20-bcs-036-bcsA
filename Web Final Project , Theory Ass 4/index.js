console.clear() ; 
const express = require("express");
const app = express();
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require("cookie-parser");
var session = require("express-session");
// app.use((req, res, next) => {
//   // res.send("site is down for maintenance");
//   console.log(req.url);
//   next();
// });

const admin = require("./middlewares/admin")
app.use(express.json());
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("./middlewares/checksession"));
app.use(require("./routes/auth"));
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoose = require("mongoose");


app.get("/", (req,res)=>{
  res.render("home");
})

// Multer code start

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images')
  }, filename: (req, file, cb) => {
      console.log(file)
      var temp=Date.now() + path.extname(file.originalname)
      cb(null,temp )
      req.body={...req.body,carImage:temp}

  }

})


const upload = multer({ storage })  ; 


//Multer end 



// Add product starts

let Students = require("./models/students");  
let { User } = require("./models/user");
  

app.get("/mens", async (req, res, next) => {
  let students = await Students.find();
  res.render("mens", { students });
});
app.get("/checkFOrm",admin,(req,res)=>{
  res.render("checkFOrm");
});

app.post('/addproduct',admin,upload.single('image'), async (req, res) => {


  let student = new Students({
    
    
    productName: req.body.productName,

   
    productImage: req.file.filename,
    
  } 
 

  ) ; 
  

 



  await student.save();
  res.redirect('/mens') ; 
}) ;

// Add product ends 


//Dekete Product start

app.get("/delete:id",  async(req, res, next) => {
  console.log("IDD",req.params.id)
  let students = await Students.findByIdAndDelete({_id:(req.params.id).split(":")[1]});
  console.log("Students deleted",students);
  res.redirect('/mens')
});





//Dekete Product ends



//Edit Products Start 

app.get("/edit:id",  async(req, res, next) => {
  console.log("IDD",req.params.id)
  let students = await Students.find({_id:(req.params.id).split(":")[1]});
  console.log("Students find",students)
  res.render("edit",{data:students[0]});


} ) ; app.post("/update", upload.single('image'), async (req, res, next) => {
  console.log("body in update", req.body);

  // Find the product to update
  let student = await Students.findById(req.body.productId);

  if (student) {
    // Update the product details
    student.productName = req.body.productName;

    // Update the product image if a new image is uploaded
    if (req.file) {
      student.productImage = req.file.filename;
    }

    // Save the updated product
    await student.save();
    res.redirect('/mens');
  } else {
    // Handle the case where the product is not found
    console.log("Product not found");
    res.redirect('/mens');
  }
});

  





//Edit products end 



app.listen(port ,() => { 
    console.log(`Server is running on port ${port}`) 
}  ) ; 

app.get("/layout" , (req , res)=>{
res.render("layout");
})

app.get("/" , (req , res)=>{
  res.render("home");
  })
  app.get("/mens" , (req , res)=>{
    res.render("mens");
    })


      app.get("/womens" , (req , res)=>{
    res.render("womens");
    })


    app.get("/kids" , (req , res)=>{
      res.render("kids");
      })

      app.get("/nav" , (req , res)=>{
        res.render("nav");
        })
  
  


      
      // app.get("/login" , (req , res)=>{
      //   res.render("login");
      //   })
  

       


      //     app.post("/login", (req, res) => {
            
      //       res.redirect("/");
      //     });
          
 

      // //login Authentication Sir 
      //     app.post("/login", async (req, res) => {
      //       let user = await User.findOne({ email: req.body.email });
      //       if (!user) {
      //         req.setFlash("danger", "User with this email not present");
      //         return res.redirect("/login");
      //       }
      //       const validPassword = await bcrypt.compare(req.body.password, user.password);
      //       if (validPassword) {
      //         req.session.user = user;
      //         req.setFlash("success", "Logged in Successfully");
      //         return res.redirect("/");
      //       } else {
      //         req.setFlash("danger", "Invalid Password");
      //         return res.redirect("/login");
      //       }
      //     });


          
      // app.get("/register" , (req , res)=>{
      //   res.render("register");
      //   })
  
          
      //   app.get("/form" , (req , res)=>{
      //     res.render("checkFOrm");
      //     })
    

       


      //     app.post("/register", (req, res) => {
            
      //       res.redirect("/");
      //     });



          
          // app.post("/register",  async (req, res) => {
          //   let user =new User() ; 
          //   user.email=req.body.email ; 
          //   user.password =req.body.password ; 
          //   await user.save() ; 

          //   res.redirect("/");
          // });
          

          



    
//  Mongoose connection

const MONGODBURL = "mongodb://127.0.0.1:27017/webproject";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message)); 
  
  
  










  
    

 


















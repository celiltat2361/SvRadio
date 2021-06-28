const express = require("express");
const session = require("express-session");
const path = require("path") ;

const userPrefix = "/api/v1/users" ;
const channelPrefix = "/api/v1/channels" ;
const programPrefix = "/api/v1/programs" ;
const categoryPrefix = "/api/v1/categories" ;

const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
const programRoutes = require("./routes/programRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const port = 3001;

const app = express();
app.use(express.json());

app.use(
    session({  
      secret: "The Radio App Project",
      resave: false,     
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  
app.use(userPrefix, userRoutes);
app.use(channelPrefix, channelRoutes);
app.use(programPrefix, programRoutes );
app.use(categoryPrefix, categoryRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.listen(port, (err) => {
    if (err) {
        console.log("Something went wrong");
        console.log(err);
        return;
    }
    console.log(`Server works on ${port} port!`);
});
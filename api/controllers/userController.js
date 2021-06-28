const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../radioDB.db"));

const allusers = (req, res) => {
    let query = /*sql*/ `SELECT * FROM users`;
    db.all(query, [], (err, users) => {
        if(users.length > 0){
            res.json(users);
            return;
        }
    });
}

const whoami = (req, res) => {
    res.json(req.session.user || null);
  };

const register = (req, res) => {
    let newUser = req.body ;

    let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
    let params = { $email : newUser.email } ;

    db.get(query, params , (err, registeredUser) => {
        if(registeredUser) {
            res.json({ error : "This email has alreadey registered"}) ;
        }  else {
            newUser.password = Encrypt.encrypt(newUser.password);
            query = /*sql*/ `INSERT INTO users (username, email, password) VALUES ($username, $email, $password)` ;
            params = {
                $username : newUser.username,
                $email : newUser.email,
                $password : newUser.password,
                $islogin : newUser.islogin
            };

            db.run(query, params, function(err){
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                res.json({ success : `${newUser.email} registered successfully`});
            });
        }
    });    
};


const login = (req, res) => {
    let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
    let params = { $email : req.body.email};
    db.get(query, params, (err, userInDB) => {
        if(!userInDB) {
            res.status(401).json({error :"This email was not registered"});
            return;
        }
        req.body.password = Encrypt.encrypt(req.body.password);   
        if(userInDB.password === req.body.password) {
            delete userInDB.password;
            req.session.user = userInDB ;
            res.json({success : "Login successfully", loggedInUser: userInDB});
            return;
        }else {
            res.status(401).json({ error : "Bad request"});
            return;
        }
    });
};

const logout = (req, res) => {
    delete req.session.user;
    res.json({ success: "Logout Successfully" });
  };

const edit = (req, res) => {
    let userToEdit = req.body;
    userToEdit.password = Encrypt.encrypt(userToEdit.password);
    let query = /*sql*/ `
        UPDATE users
        SET username= $username, email=$email, password=$password
        WHERE userID = $userID`;
    let params = {
        $username: userToEdit.username,
        $email: userToEdit.email,
        $password: userToEdit.password,
        $userID: req.params.userID,
    };

    db.run(query,params, function(err){
        if(err) {
            res.json({error: "Bad request"})
        } else {
            query = /*sql*/ `SELECT * FROM users
                             WHERE userID = $userID`;
            params = {$userID : req.params.userID};
            db.get(query,params, (err, user)=>{
                req.session.user = user;
                res.json({succes : "User updated successfully"})
            });
        }
    });
}

const favoritesOfUser = (req, res) => {
    let query = /*sql*/ `
        SELECT favoriteList.*
        FROM users, favoriteList
        JOIN users_Fav
        ON users_Fav.userID = users.userID
        AND users_Fav.favID = favoriteList.favID
        WHERE users.userID = $userID`;
    let params = { $userID : req.params.userID};
    db.all(query, params, (err, list) => {
        if (list.length > 0){
            res.json(list);
        } else {
            res.status(404);
        }
    });
}

const putFavoriteList = (req, res) => {
    let query = /*sql*/ `
        SELECT * FROM favoriteList
        WHERE name = $name`;
    let params = {$name : req.body.name};
    db.get(query, params, (err, favResult) => {
        if (favResult) {
            res.json({error : "Already added"})
        } else {
            query = /*sql*/ `INSERT INTO favoriteList (${Object.keys(req.body).join(", ")})
                            VALUES (${Object.keys(req.body)
                                .map((k) => "$" + k)
                                .join(", ")})` ;
            let params = {};
            for ( let key in req.body) {
                params["$" + key] = req.body[key];
            }
            db.run(query, params, function(err) {
                res.json({ success: " Fav putted in DB"});
            });
        }
    });
}

const putFavoritesOfUser = (req, res) => {
   let query = /*sql*/ `SELECT favID FROM favoriteList WHERE name = $name`;
   let params = { $name : req.body.name};
   db.get(query, params, (err, favResult) =>{
       if(favResult) {
            query = /*sql*/ `INSERT INTO users_Fav
                            (userID, favID)
                            VALUES ($userID, $favID)`;
            params = {
                $userID : req.params.userID,
                $favID :favResult.favID
            };
            db.run(query, params, function(err) {
                if (err) {
                    res.json( { error: "This Favorite has already added before"})
                } else {
                    res.json( { success : "Favorite added succesfully"})
                }
            });
       }
   }); 
}

const deleteFavorite = (req, res)=> {
    let query = /*sql*/ `DELETE FROM users_Fav
                        WHERE userID = $userID
                        AND favID = $favID` ;
    let params = {
        $userID : req.params.userID,
        $favID : req.body.favID
    }
    db.run( query, params, function(err){
        res.json({ success: "Favorite deleted"});
    });
}

module.exports = {
    allusers,
    whoami,
    register,
    login,
    logout,
    edit,

    favoritesOfUser,
    putFavoriteList,
    putFavoritesOfUser,
    deleteFavorite
};
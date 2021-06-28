const express = require("express") ;
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/" , userController.allusers) ;
router.get("/whoami" , userController.whoami) ;
router.post("/register" , userController.register) ;
router.post("/login" , userController.login) ;
router.get("/logout" , userController.logout) ;
router.put("/edit/:userID", userController.edit);

router.get("/fav/:userID" , userController.favoritesOfUser);
router.post("/fav" , userController.putFavoriteList);
router.post("/fav/:userID" , userController.putFavoritesOfUser);
router.delete("/fav/:userID" , userController.deleteFavorite);

module.exports = router;
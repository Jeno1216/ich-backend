const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if(req.user){
      res.status(200).send({
        success: true,
        message: 'Welcome, ' + req.user.username + "!",
        user: req.user,
      });    
    }
  });
  
  router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});
  
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('https://iloilo-coffee-house.onrender.com/');
});

router.get("/google", passport.authenticate("google", { 
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  prompt: "select_account"  // Add this line
}));


router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'https://iloilo-coffee-house.onrender.com/',
    failureRedirect: '/login/failed'
}));

module.exports = router
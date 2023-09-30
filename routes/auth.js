const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: 'User successfully logged in',
            user: req.user,
        });    
    } else {
        res.status(401).json({
            success: false,
            message: 'No user is currently logged in',
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'User failed to log in',
    });
});
  
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('https://iloilo-coffee-house.onrender.com/');
});

router.get("/google", passport.authenticate("google", { 
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  prompt: "select_account"
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login/failed'
}), (req, res) => {
    // Authentication was successful, user is available as req.user
    // Send the necessary data back to the client
    res.status(200).json({
        success: true,
        message: 'User successfully logged in',
        user: req.user,
    });
});

module.exports = router;

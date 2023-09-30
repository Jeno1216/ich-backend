const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if (req.user) {
        const token = jwt.sign(
            { _id: req.user._id, username: req.user.username, email: req.user.email },
            'jwt-secret-key',
            { expiresIn: '1d' }
        );

        // Set a cookie with the token (similar to /logingoogle)
        res.cookie('token', token, {
            sameSite: 'None',
            secure: true,
        });

        res.status(200).json({
            success: true,
            message: 'successfully logged',
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'failure',
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
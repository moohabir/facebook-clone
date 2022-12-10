const User = require('../databaseModals/user.modal');
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/facebookLogin/failed',
  })
);

router.get('/facebookLogin/success', async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      provider_id: req.user.id,
      provider: req.user.provider,
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: 'success',
        user: user,
      });
    } else {
      const checkUserEmail = await User.findOne({ email: req.user.email });
      if (checkUserEmail) {
        res.status(401).json({
          success: false,
          message: 'User already Exist with this email id',
        });
      } else {
        const user = await User.create({
          username: req.user.name.givenName + '_' + req.user.name.familyName,
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          email: req.user.emails[0].value,
          provider: req.user.provider,
          provider_id: req.user.id,
          profilePic: req.user.photos[0].value,
        });
        res.status(200).json({
          success: true,
          message: 'success',
          user: user,
        });
      }
    }
    console.log('CURRNT USER: ', user);
  }
});

router.get('/facebookLogin/failed', (req, res) => {
  if (req.user) {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  }
});

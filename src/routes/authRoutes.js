import express from 'express';
import {
  login ,signup
} from '../controllers/authController.js'
const router = express.Router();

// Example route for user login
router.post('/login', login);


// Example route for user signup
router
.get('/check',(req,res)=>{
  res.send("Ok");
})
router.post('/signup',signup);

router.post('*', (req, res) => {
  // Your signup logic here
  res.send({ message: 'Check routing' });
});

export default router;

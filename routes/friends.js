import express from 'express';
import pool from '../config/query';

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send('you are in home');
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  // console.log('userId', userId);
  const users = await pool.suggestedFriends(userId);
  res.status(200).json(users);
});

router.post('/sendFriendRequest', async (req, res) => {
  const friendRequest = req.body;
  const user = await pool.addFriend(friendRequest);
  res.status(200).json(user);
});

router.get('/receiveFriendRequest/:id', async (req, res) => {
  const receiverId = req.params.id;
  console.log('receive friendRequest id=', receiverId);
  const users = await pool.friendRequest(receiverId);
  res.status(200).json(users);
})

router.put('/confirmFriendRequest', async (req, res) => {
  const userId = req.body;
  console.log('confirmfriendRequest', userId);
  const users = await pool.confirmFriendRequest(userId);
  res.status(200).json(users);
})

router.get('/friends/:id', async (req, res) => {
  const userId = req.params.id;
  const friends = await pool.friends(userId);
  res.status(200).json(friends);
})

router.delete('/discard', async (req, res) => {
  const friend = req.body;  
  const friends = await pool.discard(friend);
  res.status(200).json(friends);
})

router.delete('/deleteFriendRequest', async (req, res) => {
  const userId = req.body;
  const friendRequest = await pool.decline(userId);
  res.status(200).json(friendRequest)
})
module.exports = router;

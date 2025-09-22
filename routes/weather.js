const { addRequest } = require('../queueManager');
const express = require('express');
const router = express.Router();

router.get('/weather', (req, res) => {
  const location = req.query.q;
  if (!location) {
    return res.status(400).json({ error: 'Missing location query parameter ?q=' });
  }
  addRequest(location.trim(), res);
});

module.exports = router;

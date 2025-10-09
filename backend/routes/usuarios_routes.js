import express from 'express';
const router = express.Router();

/* GET listado de usuarios. */
router.get('/', (req, res) => {
  res.json({ usuarios: [] });
});

export default router;

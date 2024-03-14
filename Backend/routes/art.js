const { Router } = require("express");
const uploadArt = require("../utils/ArtUtil");
const Art = require("../model/Art");

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allPhotos = await Art.find().sort({ createdAt: 'descending' });
    res.send(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', uploadArt.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photo = req.file.filename;
    const createdPhoto = await Art.create({ photo });

    console.log('Uploaded Successfully:', createdPhoto);
    res.status(200).json(createdPhoto);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
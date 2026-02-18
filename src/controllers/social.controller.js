import Social from '../models/SocialModel.js';

// GET ROUTE - Fetch all social data

export const getSocials = async (req, res) => {
  try {
    const socials = await Social.find({ user: req.user });
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch socials" });
  }
};


// POST ROUTE - Create social data

export const addSocial = async (req, res) => {
  try {
    const { social, link } = req.body;

    const newSocial = await Social.create({
      user: req.user,
      social,
      link,
    });

    res.status(201).json(newSocial);
  } catch (error) {
    res.status(500).json({ message: "Failed to add social" });
  }
};


// PUT ROUTE - Update social data

export const updateSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);

    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    if (social.user.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    social.link = req.body.link || social.link;

    const updated = await social.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update social" });
  }
};


// DELETE ROUTE - Delete social data

export const deleteSocial = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);

    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    await social.deleteOne();
    res.json({ message: "Social deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete social" });
  }
};
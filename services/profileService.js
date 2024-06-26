const profileService = (collection) => async (req, res) => {
  try {
    let foundItems = [];
    const { id } = req.params;

    const cursor = collection.find({ userId: id });

    if (collection.countDocuments({}) === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    for await (const doc of cursor) {
      foundItems.push(doc);
    }

    res.status(201).json(foundItems);
  } catch (e) {
    res.status(500).json({ error: `Error while saving to a database ${e}` });
  }
};

module.exports = profileService;

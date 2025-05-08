const deleteJobsService = (collection) => async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: "No IDs provided for deletion." });

  try {
    const objectIds = ids.map((id) => new ObjectId(id));

    const deleteResult = await collection.deleteMany({
      _id: { $in: objectIds },
    });

    res.status(200).json({
      message: "Jobs deleted successfully",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (e) {
    res
      .status(500)
      .json({ error: `Error while deleting from database: ${e.message}` });
  }
};

module.exports = deleteJobsService;

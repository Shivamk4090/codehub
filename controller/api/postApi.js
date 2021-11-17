module.exports.index = (req, res) => {
  res.status(200).json({
    message: "post list",
    post: { a: 1 },
  });
};

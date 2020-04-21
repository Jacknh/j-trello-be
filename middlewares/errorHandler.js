module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).send('Duplicate key');
  }
  res.status(500).send('Something went wrong');
}
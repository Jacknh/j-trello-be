module.exports = (err, req, res, next) => {
  console.log(err)
  res.send('Something went wrong');
}
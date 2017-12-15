const getDate = () => {
  const now = new Date();
  const timestamp = Math.floor(now.valueOf() / 1000000);
  const date = now.toISOString().substr(0, 10);
  return({
    now, timestamp, date
  })
}

module.exports = {
  getDate,
};

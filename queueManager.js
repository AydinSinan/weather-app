const { fetchWeatherAPI, fetchWeatherStack } = require('./weatherServices');
const { insertWeatherQuery } = require('./db');

const queues = new Map(); // location -> {requests:[], timer:null}

async function queryWeather(location, requests) {
  try {
    const [t1, t2] = await Promise.all([
      fetchWeatherAPI(location),
      fetchWeatherStack(location),
    ]);
    const avg = (t1 + t2) / 2;

    for (const res of requests) {
      res.status(200).json({ location, temperature: avg });
    }

    insertWeatherQuery(location, t1, t2, requests.length);
  } catch (err) {
    for (const res of requests) {
      res.status(500).json({ error: err.message });
    }
  } finally {
    queues.delete(location);
  }
}

function addRequest(location, res) {
  if (!queues.has(location)) {
    queues.set(location, { requests: [], timer: null });
  }
  const entry = queues.get(location);
  entry.requests.push(res);

  if (!entry.timer) {
    entry.timer = setTimeout(() => {
      queryWeather(location, entry.requests);
    }, 5000);
  }

  if (entry.requests.length >= 10) {
    clearTimeout(entry.timer);
    queryWeather(location, entry.requests);
  }
}

module.exports = { addRequest };

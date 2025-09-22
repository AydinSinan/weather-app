const mysql = require('mysql2');
const mysqlConn = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'weather_app'
});

mysqlConn.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }

  mysqlConn.query(`CREATE TABLE IF NOT EXISTS weather_queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255),
    service_1_temperature FLOAT,
    service_2_temperature FLOAT,
    request_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('MySQL table creation error:', err);
  });
});

function insertWeatherQuery(location, t1, t2, requestCount) {
  mysqlConn.query(
    'INSERT INTO weather_queries (location, service_1_temperature, service_2_temperature, request_count) VALUES (?, ?, ?, ?)',
    [location, t1, t2, requestCount],
    (err) => err && console.error('MySQL weather_queries error:', err)
  );
}

module.exports = { insertWeatherQuery };

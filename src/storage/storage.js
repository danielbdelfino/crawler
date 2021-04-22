const poolDB = require('./connection');

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '192.168.239.251',
//   user     : 'admin',
//   password : 'admin',
//   database : 'contentmedia'
//   // socketPath: '/var/lib/mysql/mysql.sock'
// });

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });

// connection.query('SELECT * FROM Produto', function(err, results, fields) {
//   if (err) {
//       throw err;
//   }

//   console.log('fields: ', fields[0])
//   console.log('rows: ', results[0]);
// });

// connection.end();

const findContent = function () {

}

const findPromotion = function () {

}

const insertContent = function (contentsInsert) {
  poolDB.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      return;
    }

    try {
      var values = [];

      contentsInsert.forEach(elem => {
        values.push([elem.title, elem.link, elem.image]);
      });

      console.log(values);

      var query = ' INSERT INTO Content (title, link, link_image) \n';
      query += ' SELECT * FROM (SELECT ? AS UNIQUE_TITTLE, ?, ?) AS tmp \n';
      query += ' WHERE NOT EXISTS (SELECT 1 FROM Content c WHERE c.title = tmp.UNIQUE_TITTLE) ';

      connection.query(query, [values], function (err, results, fields) {
        if (err) throw err;

        console.log(results);
      });

    } catch (error) {
      console.log(error);
    } finally {
      connection.release();
    }
  });

  //poolDB.release();
}


// const  manipulaHtml = function(pageContent) {
//     return pageContent.subtitle;
// };

module.exports = {
  insertContent: insertContent
};
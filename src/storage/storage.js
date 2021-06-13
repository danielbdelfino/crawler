const poolDB = require('./connection');

const findContent = function (type, callback) {
  poolDB.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      return;
    }

    try {
      connection.query('SELECT * FROM Content c WHERE c.type = ? ORDER BY c.dhinsert DESC LIMIT 12', [type], function (err, results, fields) {
        if (err) throw err;

        var contents = []

        if (results && results.length > 0) {
          results.forEach(content => {
            contents.push({
              title: content.title,
              link: content.link,
              link_image: content.link_image
            });
          });
        }

        callback(contents);
      });

    } catch (error) {
      console.log(error);
    } finally {
      connection.release();
    }
  });
}

const findPromotion = function () {

}

const insertContent = function (contentsInsert) {
  console.log('contentsInsert: ' + contentsInsert)
  if (contentsInsert) {
    poolDB.getConnection(function (error, connection) {
      if (error) {
        console.log(error);
        return;
      }
  
      try {
        contentsInsert.forEach(elem => {
          var query = ' INSERT INTO Content (title, link, link_image, type, name) \n';
          query += ' SELECT * FROM (SELECT ? AS UNIQUE_TITTLE, ?, ?, ?, ?) AS tmp \n';
          query += ' WHERE NOT EXISTS (SELECT 1 FROM Content c WHERE c.title = tmp.UNIQUE_TITTLE) LIMIT 1';
  
          console.log(elem);
  
          connection.query(query, [elem.title, elem.link, elem.image, elem.type, elem.name], function (err, results, fields) {
            if (err) throw err;
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        connection.release();
      }
    });
  }
}

module.exports = {
  insertContent: insertContent,
  findContent: findContent
};
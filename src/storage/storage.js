const poolDB = require('./connection');
const { friendlyUrl } = require('../util/friendlyurl');

const findContent = function (type, nextPage, callback) {
  poolDB.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      return;
    }

    try {
      var query = 'SELECT * FROM Content c WHERE c.type = ? ORDER BY c.dhinsert DESC ';
      query +=  nextPage > -1 ? ' LIMIT ' + nextPage + ', 12 ' : ' LIMIT 12 '; 

      connection.query(query, [type], function (err, results, fields) {
        if (err) throw err;

        var contents = [];

        if (results && results.length > 0) {
          results.forEach(content => {
            contents.push({
              id: content.id,
              title: content.title,
              link: content.link,
              link_image: content.link_image,
              self_path: content.self_path,
              name: content.name
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

const findPageDetail = function (id, page, callback) {
  poolDB.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      return;
    }

    try {
      connection.query('SELECT * FROM Content c WHERE c.id = ? AND c.self_path = ? LIMIT 1', [id, page], function (err, results, fields) {
        if (err) throw err;

        var pageDetail;

        if (results && results.length > 0) {
          results.forEach(content => {
            pageDetail = {
              id: content.id,
              title: content.title,
              link: content.link,
              link_image: content.link_image,
              self_path: content.self_path,
              article: content.article,
              type: content.type,
              name: content.name
            };
          });
        }

        callback(pageDetail);
      });

    } catch (error) {
      console.log(error);
    } finally {
      connection.release();
    }
  });
}

const insertContent = function (contentsInsert) {
  console.log('contentsInsert: ' + contentsInsert)
  if (contentsInsert) {
    poolDB.getConnection(function (error, connection) {
      if (error) {
        console.log(error + ' - ' + connection);
        return;
      }
  
      try {
        contentsInsert.forEach(elem => {
          var query = ' INSERT INTO Content (title, link, link_image, type, name, self_path) \n';
          query += ' SELECT * FROM (SELECT ? AS UNIQUE_TITTLE, ?, ?, ?, ?, ?) AS tmp \n';
          query += ' WHERE NOT EXISTS (SELECT 1 FROM Content c WHERE c.title = tmp.UNIQUE_TITTLE) LIMIT 1';
  
          elem.selfPath = friendlyUrl(elem.selfPath);
          console.log(elem);
  
          connection.query(query, [elem.title, elem.link, elem.image, elem.type, elem.name, elem.selfPath], function (err, results, fields) {
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
  findContent: findContent,
  findPageDetail: findPageDetail
};
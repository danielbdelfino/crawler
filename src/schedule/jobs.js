const schedule = require('node-schedule');
const requestproc = require('../requests/requestproc');
const { targets, types } = require('../util/constants');
const storage = require('../storage/storage');

const rule = new schedule.RecurrenceRule();
//rule.second = 15;
rule.minute = 20;

schedule.scheduleJob(rule, function () {
  console.log('*** EXECUTING SCHEDULE ***');
  // storage.findContent(types.games, function(results) {
  //   console.log(results);
  // });

  Object.keys(targets).forEach(function(key) {
    console.log('Key : ' + key + ', Value : ' + targets[key])
    const pageContent = requestproc.request(targets[key]).then(function(response){
      //console.log(response);
  
      storage.insertContent(response);
    });
  })

  //console.log(pageContent);
});
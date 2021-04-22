const schedule = require('node-schedule');
const requestproc = require('../requests/requestproc');
const { targets } = require('../util/constants');
const storage = require('../storage/storage');

const rule = new schedule.RecurrenceRule();
rule.second = 5;

schedule.scheduleJob(rule, function () {
  console.log('The answer to life, the universe, and everything!');

  const pageContent = requestproc.request(targets.meups, targets.meups).then(function(response){
    console.log(response);

    storage.insertContent(response);
  });

  console.log(pageContent);
});
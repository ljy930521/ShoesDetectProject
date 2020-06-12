
const PythonShell = require('python-shell');
var options = {
  mode: 'text',
  pythonPath: '',
  pythonOptions: ['-u'],
  scriptPath: './',
  args: ['value1', 'value2','value3']
};
module.exports = {
  pythonRun: function(selectedRun, callback){
    PythonShell.PythonShell.run('./python/'+selectedRun+'.py', options, function (err, results) {
      if (err)
        console.log(err);
      else
        callback(results);

    });
  }
}
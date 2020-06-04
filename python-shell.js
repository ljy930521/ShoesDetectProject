
const PythonShell = require('python-shell');
var options = {
  mode: 'text',
  pythonPath: '',
  pythonOptions: ['-u'],
  scriptPath: './',
  args: ['value1', 'value2']
};
module.exports = {
  pythonRun: function(callback){
    PythonShell.PythonShell.run('./test.py', null, function (err, results) {
      if (err)
        console.log(err);
      else
        callback(results);

    });
  }
}
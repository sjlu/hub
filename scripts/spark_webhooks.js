var spark = require('../lib/spark');

spark.listWebhooks(function(err, hooks) {
  console.log(hooks);
})
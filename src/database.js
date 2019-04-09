const mongoose = require('mongoose');  // requiero  el driver  mongoose

mongoose.set('useFindAndModify', false);
// metodo connect     devuelve  una promesa
mongoose.connect('mongodb+srv://marcelojoc:5wPMrN63xgnWlokj@cluster0-mc3vl.mongodb.net/test?retryWrites=true', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))  // si se conecta  envio  un mensaje  por consola
  .catch(err => console.error(err));  // si no  muestra error

const express = require('express');  //  express para el servidor web
const exphbs = require('express-handlebars'); // para integrar handlebars 
const path = require('path');     // manejar rutas
const methodOverride = require('method-override');  // para extender  metodos de envio  en formularios
const session = require('express-session');     // para manejar sesiones
/**
 * connect-flash es un paquete para Express bastante util, nos permite mostrar mensajes en la pantalla bajo ciertas condiciones. 
 * Por ejemplo para avisar cuando un usuario no tiene suficientes permisos como para realizar una acción, 
 * o al realizar cualquier otra acción como entrar o salir de su cuenta.
 */
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// settings
app.set('port', process.env.PORT || 4000);    // configuro el puerto
app.set('views', path.join(__dirname, 'views')); // seteo las vistas
app.engine('.hbs', exphbs({                      // aqui seteo  el motor de plantillas
  defaultLayout: 'main', 
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

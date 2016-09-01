var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    session	 = require('express-session'),
    port     = process.env.PORT || 8000,
    app      = express();

require('./server/config/mongoose.js');


app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(express.static(path.join(root+'/client')));
app.use(express.static(path.join( root,'/bower_components')));
app.use(session({
	secret: 'grumpy cat',
	resave: false,
	saveUninitialized:true
}))

require('./server/config/routes.js')(app);

// app.route('/') //automatically generated
app.listen(8000,function(){
	// console.log('listening on port 8000');
})
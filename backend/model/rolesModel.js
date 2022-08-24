const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema({
    value:{
        type:String,

    },
    label:{
        type:String,
    },

});

//Export the model
const roles = mongoose.model('roles', roleSchema);
module.exports=roles
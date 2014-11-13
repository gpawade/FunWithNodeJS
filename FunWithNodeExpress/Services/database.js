(function (mdata) {
    
    var mongo = require('mongodb');
    var mongourl = "mongodb://localhost:27017/fundb";
    var theDb = null;
    mdata.getdb = function (next) {
        if (!theDb) {
            //connect to database
            mongo.MongoClient.connect(mongourl, function (err, db) {
                if (err)
                    next(err, null);
                else {
                    theDb = {
                        db: db,
                        notes : db.collection("notes")
                    };
                    next(null, theDb);
                }
            });

        }
        else {
            next(null, theDb);
        }

    };


})(module.exports);
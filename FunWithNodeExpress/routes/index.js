
/*
 * GET home page.
 */

//(function (controller) {
  
module.exports = function (app) {
    var database = require("../Services/database.js");
    
    
    app.get("/", function (req, res) {
        res.render('index', { title: 'Index ' });
    });
    
    app.get("/api/users", function (req, res) {
        
        //res.send([
        //   {
        //    name: 'ganesh'
        //},
        //{
        //    name: 'harsh'
        //}
        //    ]);


        database.getdb(function (err, db) {
            if (err)
                console.log("failed:" + err);
            else {
                db.notes.find().toArray(function (err, results) {
                    res.send(results);
                });
            }
        });
    });
    
    //controller.index = function (req, res) {
    //    res.render('index', { title: 'Index Controller' });
    //};
    
    function seedDatabase() {
        database.getdb(function (err, db) {
            if (err)
                console.log("failed" + err);
            else {
                db.notes.count(function (err, count) {
                    if (err)
                        console.log("failed to load database count");
                    else {
                        if (count == 0) {
                            console.log("seeding the database...");
                            var obj = {
                                name : 'my first collection',
                                notes : ["one","two","three","four"]
                            };
                            db.notes.insert(obj, function (err) {
                                if (err)
                                    console.log("failed to insert");
                            });
                        }
                        else {
                            console.log("database already seeded..");
                        }
                    }
                });
            }
        });
    }    ;
    
    seedDatabase();
};
//})(module.exports);


var orm = require("orm");

orm.connect("pg://postgres:iliveforever@localhost/postgres", function (err, db) {
  if (err) throw err;

    var User = db.define("user", {
        id               : {type: 'serial', key: true},
        name             : String,
        surname          : String,
        age              : Number, 
        male             : Boolean,
        maritalstatus    : Boolean,
        city             : String, 
        photo            : String,
        language         : ['ru'],
        online           : Boolean,
        statustxt        : String,
        background       : String,
        withbackground   : Boolean,
        recordwall       : Boolean,
        data             : Object 
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
            age: orm.enforce.ranges.number(18, undefined, "under-age")
        }
    });
    User.hasMany('friends', User, {}, {key: true});
    User.hasMany('grandparents', User, {}, {reverse: 'grandchildren', key: true});
    User.hasMany('parents', User, {}, {reverse: 'children'});
    User.hasMany('brothers', User, {}, {key: true});

    // add the table to the database
    db.sync(function(err) { 
        if (err) throw err;

        // add a row to the person table
       // User.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
            //if (err) throw err;

                // query the person table by surname
                User.find({ surname: "Doe" }, function (err, people) {
                    // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
                    if (err) throw err;

                    console.log("People found: %d", people.length);
                    //console.log("First person: %s, age %d", people, people);
                    for(var i in people)
                        console.log(people[i]);

                });
            });

        //});
    });
});
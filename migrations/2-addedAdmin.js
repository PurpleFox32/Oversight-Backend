'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "admin" to table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "addedAdmin",
    "created": "2022-06-13T21:42:36.916Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "admin",
        {
            "type": Sequelize.BOOLEAN,
            "field": "admin",
            "defaultValue": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

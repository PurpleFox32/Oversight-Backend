'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "gameId" to table "Posts"
 *
 **/

var info = {
    "revision": 2,
    "name": "GameIdColumn",
    "created": "2022-06-28T16:00:29.989Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Posts",
        "gameId",
        {
            "type": Sequelize.INTEGER,
            "field": "gameId"
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

'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "GameId" to table "Posts"
 *
 **/

var info = {
    "revision": 3,
    "name": "fixing_relationships",
    "created": "2022-06-28T20:37:51.910Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Posts",
        "GameId",
        {
            "type": Sequelize.INTEGER,
            "field": "GameId",
            "onUpdate": "CASCADE",
            "onDelete": "cascade",
            "references": {
                "model": "games",
                "key": "GameId"
            },
            "allowNull": true
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

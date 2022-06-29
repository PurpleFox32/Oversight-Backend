'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "gameId" from table "Posts"
 *
 **/

var info = {
    "revision": 4,
    "name": "fixing_relationships_pt2",
    "created": "2022-06-28T20:39:23.385Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Posts", "gameId"]
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

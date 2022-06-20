'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "GameThumbnail" to table "games"
 * addColumn "createdAt" to table "games"
 * addColumn "updatedAt" to table "games"
 * addColumn "createdAt" to table "Posts"
 * addColumn "updatedAt" to table "Posts"
 * addColumn "createdAt" to table "Reviews"
 * addColumn "updatedAt" to table "Reviews"
 * addColumn "createdAt" to table "Users"
 * addColumn "updatedAt" to table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "image_to_games",
    "created": "2022-06-20T14:29:26.471Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "games",
            "GameThumbnail",
            {
                "type": Sequelize.STRING,
                "field": "GameThumbnail"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "games",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "games",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Posts",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Posts",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Reviews",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        ]
    }
];

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

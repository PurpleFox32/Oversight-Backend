'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "games", deps: []
 * createTable "Reviews", deps: []
 * createTable "Users", deps: []
 * createTable "Posts", deps: [Users, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "created_models",
    "created": "2022-06-13T21:37:00.329Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "games",
            {
                "GameId": {
                    "type": Sequelize.INTEGER,
                    "field": "GameId",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name"
                },
                "Description": {
                    "type": Sequelize.STRING,
                    "field": "Description"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Reviews",
            {
                "review_id": {
                    "type": Sequelize.INTEGER,
                    "field": "review_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "review": {
                    "type": Sequelize.STRING,
                    "field": "review"
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Posts",
            {
                "post_id": {
                    "type": Sequelize.INTEGER,
                    "field": "post_id",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "post": {
                    "type": Sequelize.STRING,
                    "field": "post"
                },
                "UserUserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserUserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "user_id"
                    },
                    "allowNull": true
                }
            },
            {}
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

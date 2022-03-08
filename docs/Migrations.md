# How to migrate data

Create migration files in the /migrations folder with a dated filename (and some detail about schema changes involved).

Sequelize migrations docs for reference: https://sequelize.org/master/manual/migrations.html

## Create a config/config.json file

Create a config.json file with your specific database details for development and production. Be sure not to commit this file to the repo (it is listed in the .gitignore file).

The contents should look something like this:

```
{
    "development": {
        "username": "root",
        "password": null,
        "database": "elevatorpitch_db",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "example_username",
        "password": "example_password",
        "database": "example_db",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
```

## Create a migrations file in /migrations/YYYY-MM-DD-your-schema-changes.js

Use the sequelize documentation to guide your file.

## Test your migration locally with `npx sequelize-cli db:migrate`

This will use the development database by default

## Commit and push your changes for review from the team

To get a second set of eyes on the migration script.

## Once merged into main, run on the production database

Set process.env.NODE_ENV to production and run the command again `npx sequelize-cli db:migrate`

## If you need to roll back, run `npx sequelize-cli db:migrate:undo`

This will roll back the last run migration (check the documentation for rolling back further, or to specific migration scripts).
const mysql = require('mysql');

class MySQLConnector {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connection to database: ' + err.stack);
                return;
            }
            console.log('Connected to database with ID ' + this.connection.threadId);
        });
    }

    disconnect() {
        this.connection.end((err) => {
            if (err) {
                console.error('Error disconnecting from database: ' + err.stack);
                return;
            }
            console.log('Disconnected from database');
        });
    }

    query(sql, args, callback) {
        this.connection.query(sql, args, (err, rows) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }

    insert(table, data, callback) {
        const insertSQL = 'INSERT INTO ' + table + ' SET ?';
        this.query(insertSQL, data, callback);
    }

    update(table, data, condition, callback) {
        const updateSql = 'UPDATE ' + table + ' SET ? WHERE ' + condition;
        this.query(updateSql, [data], callback);
    }

    delete(table, condition, callback) {
        const deleteSql = 'DELETE FROM ' + table + ' WHERE ' + condition;
        this.query(deleteSql, [], callback);
    }

    search(table, condition, callback) {
        const searchSql = 'SELECT * FROM ' + table + ' WHERE ' + condition;
        this.query(searchSql, [], callback);
    }

    searchById(table, id, callback) {
        const condition = 'student_id = ' + id;
        this.search(table, condition, callback);
    }
}

module.exports = MySQLConnector;
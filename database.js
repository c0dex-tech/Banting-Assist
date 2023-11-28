const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

async function getWashroomData(washroomId, openOrNotBoolean) {
    const [rows] = await pool.query(`
    SELECT COUNT(*) 
    FROM studentTable
    WHERE Specified_Bathroom = ${washroomId} AND Open_Or_Not = ${openOrNotBoolean} 
    `)
    return rows
}

async function enterVote(Specified_Bathroom, openOrNotBoolean) {
    const [result] = await pool.query(`
    INSERT INTO studentTable (Specified_Bathroom, openOrNotBoolean)
    VALUES (?,?)
    `, [Specified_Bathroom, openOrNotBoolean])
    return result
}

module.exports = {
    getWashroomData,
    enterVote
};


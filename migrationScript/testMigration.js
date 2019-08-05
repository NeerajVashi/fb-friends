import pool from '../config/sqlPool';
require('dotenv').config();

async function friends() {
  console.log('create database State!!!');
  await pool.query('drop table IF EXISTS friendsTable');
  await pool.query('create table friendsTable ( senderId varchar(200), receiverId varchar(200), senderfirstName varchar(200), senderSurname varchar(200), senderProfile_pic varchar(5000), receiverFirstName varchar(100), receiverSurName varchar(100), receiverProfile_pic varchar(5000), status varchar(200) )');
  // await pool.query(`insert into friendsTable values ('1' , '2', 'neeraj', 'vashistha', 'profileNeeraj', 'vivek', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('1' , '3', 'neeraj', 'vashistha', 'profileNeeraj', 'ankit', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('2' , '4', 'vivek', 'vashistha', 'profileNeeraj', 'nikhil', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('1' , '5', 'neeraj', 'vashistha', 'profileNeeraj', 'lala', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('5' , '2', 'lala', 'vashistha', 'profileNeeraj', 'mohit', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('4' , '3', 'nikhil', 'vashistha', 'profileNeeraj', 'ankit', 'sharma', 'vivekprofile', '0' )`);
  // await pool.query(`insert into friendsTable values ('1' , '7', 'neeraj', 'vashistha', 'profileNeeraj', 'pandey', 'sharma', 'vivekprofile', '0' )`);

  // await pool.query(`insert into friendsTable values ('1' , '3', 'neeraj', 'vashistha', 'profileNeeraj', 'vivek', 'sharma', 'vivekprofile', '0' )`);
  console.log('completed!!');
}

module.exports = friends;

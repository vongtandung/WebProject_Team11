var db = require('../fn/db');

exports.login = user => {
	var sql = `select * from account where Email = '${user.username}' and Password = '${user.password}'`;
	return db.load(sql);
}
exports.add = user => {
	var sql = `INSERT INTO account VALUES('${user.email}', '${user.password}', '${user.name}', '${user.phone}', '${user.dob}','${user.address}', '${user.gender}', ${user.index})`;
	return db.save(sql);
}
exports.findemail=email=>{
	var sql = `select * from account where Email='${email}'`;
	return db.load(sql);
}
exports.loabillbyid = (email) => {
	var sql = `select * from donhang where Email='${email}' order by Ngaylap DESC`;
	return db.load(sql);
}
exports.editaccount = user => {
	var sql = `update account set Name='${user.name}',Phone='${user.phone}',DOB='${user.dob}',Address='${user.address}',Gender='${user.gender}' where Email='${user.email}'`;
	return db.save(sql);
}
var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from account';
	return db.load(sql);
}

exports.deletecategory=email=>{
	var sql = `delete from account where Email = '${email}'`;
	return db.save(sql);
}
exports.add = user => {
	var sql = `INSERT INTO account VALUES('${user.email}', '${user.password}', '${user.name}', '${user.phone}', '${user.dob}','${user.address}', '${user.gender}', ${user.index})`;
	return db.save(sql);
}
exports.findemail=email=>{
	var sql = `select * from account where Email='${email}'`;
	return db.load(sql);
}


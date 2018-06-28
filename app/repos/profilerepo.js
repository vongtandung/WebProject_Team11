var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from account';
	return db.load(sql);
}

exports.update = (user) => {
	var sql = `update account set Password='${user.password}', Name='${user.name}', Phone='${user.phone}', DOB='${user.dob}', Address='${user.address}', Gender='${user.gender}' where Email = '${email}'`;
	return db.save(sql);
}
exports.findemail=email=>{
	var sql = `select * from account where Email='${email}'`;
	return db.load(sql);
}


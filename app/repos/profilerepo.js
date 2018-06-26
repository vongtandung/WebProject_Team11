var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from account';
	return db.load(sql);
}

exports.update = (password, name, phone, dob, address, gender) => {
	var sql = `update account set Password='${password}', Name='${name}', Phone='${phone}', DOB='${dob}', Address='${address}', Gender='${gender}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.findemail=email=>{
	var sql = `select * from account where Email='${email}'`;
	return db.load(sql);
}


var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from account';
	return db.load(sql);
}

exports.deletecategory=id=>{
	var sql = `delete from account where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategoryemail = (email,id) => {
	var sql = `update account set Email='${email}' where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategoryname = (name,id) => {
	var sql = `update account set Name='${name}' where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategoryphone = (phone,id) => {
	var sql = `update account set Phone='${phone}' where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategorydob = (dob,id) => {
	var sql = `update account set DOB='${dob}' where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategoryaddress = (address,id) => {
	var sql = `update account set Address= '${address}' where Makh = '${id}'`;
	return db.save(sql);
}
exports.editcategorygender = (gender,id) => {
	var sql = `update account set Gender='${gender}' where Makh = '${id}'`;
	return db.save(sql);
}

exports.add = category => {
	var sql = `insert into account(Makh, Name, Email, Phone, DOB, Address, Gender) values('${category.id}', '${category.name}', '${category.email}', '${category.phone}',  '${category.dob}','${category.address}','${category.gender}')`;
	return db.save(sql);
}
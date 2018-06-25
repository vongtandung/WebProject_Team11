var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from sanpham';
	return db.load(sql);
}
exports.loadtotal = () => {
	var sql = 'SELECT sanpham.Loai,count(*) as Tong FROM `sanpham` GROUP BY Loai';
	return db.load(sql);
}
exports.loadalltype = () => {
	var sql = 'select * from loaisp';
	return db.load(sql);
}
exports.loadallproducer = () => {
	var sql = 'select * from nhasx';
	return db.load(sql);
}
/*exports.deletecategory=id=>{
	var sql = `delete from sanpham where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategoryimage = (image,id) => {
	var sql = `update sanpham set Anh='${image}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategoryname = (name,id) => {
	var sql = `update sanpham set Ten='${name}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategorytype = (type,id) => {
	var sql = `update sanpham set Loai='${type}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategoryproducer = (producer,id) => {
	var sql = `update sanpham set Nhasx='${producer}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategoryprice = (price,id) => {
	var sql = `update sanpham set Gia= '${price}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategorydetail = (detail,id) => {
	var sql = `update sanpham set Chitiet='${detail}' where Masp = '${id}'`;
	return db.save(sql);
}

exports.add = category => {
	var sql = `insert into sanpham(Masp, Ten, Loai, Nhasx, Gia, Xem, Mua,Chitiet, Anh) values('${category.id}', '${category.name}', '${category.type}', '${category.producer}',  '${category.price}','${category.view}','${category.by}','${category.detail}','${category.image}')`;
	return db.save(sql);
}*/
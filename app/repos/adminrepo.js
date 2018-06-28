var db = require('../fn/db');

exports.loadallcategories = () => {
	var sql = 'select * from sanpham';
	return db.load(sql);
}
exports.loadtotal = () => {
	var sql = 'SELECT sanpham.Loai,count(*) as Tong FROM `sanpham` GROUP BY Loai';
	return db.load(sql);
}
exports.loadforproducer = () => {
	var sql = 'SELECT sanpham.Nhasx,count(*) as Tong FROM `sanpham` GROUP BY Nhasx';
	return db.load(sql);
}
exports.loadalltype = () => {
	var sql = 'select DISTINCT(Loai) from sanpham';
	return db.load(sql);
}
exports.loadallproducer = () => {
	var sql = 'select DISTINCT(Nhasx) from sanpham';
	return db.load(sql);
}
exports.loadallbill = () => {
	var sql = 'select * from donhang order by Ngaylap DESC';
	return db.load(sql);
}
exports.deletecategory=id=>{
	var sql = `delete from sanpham where Masp = '${id}'`;
	return db.save(sql);
}
exports.findcategory=id=>{
	var sql = `select * from sanpham where Masp='${id}'`;
	return db.load(sql);
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
exports.editcategoryfor = (fors,id) => {
	var sql = `update sanpham set Gioi='${fors}' where Masp = '${id}'`;
	return db.save(sql);
}
exports.editcategoryorigin = (ori,id) => {
	var sql = `update sanpham set Xuatsu='${ori}' where Masp = '${id}'`;
	return db.save(sql);
}

exports.add = category => {
	var sql = `insert into sanpham(Masp, Ten, Loai, Nhasx, Gia, Xem, Mua,Chitiet, Anh,Xuatsu,Gioi) values('${category.id}', '${category.name}', '${category.type}', '${category.producer}',  '${category.price}','${category.view}','${category.by}','${category.detail}','${category.image}','${category.ori}','${category.fors}')`;
	return db.save(sql);
}
exports.countcate=() => {
	var sql = `select count(*) as total from sanpham`;
	return db.load(sql);
}
exports.loadpage = (offset) => {
	var sql = `select * from sanpham limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}
exports.delistatus=(dang,da,id)=>{
	var sql = `update donhang set Danggiao='${dang}',Dagiao='${da}' where Madh = '${id}'`;
	return db.save(sql);

}
exports.customerinfo=id=>{
	var sql=`SELECT account.Name, account.Address, account.Phone, donhang.madh FROM donhang, account WHERE donhang.Madh ='${id}'and donhang.Tenkh=account.Name`;
	return db.load(sql);
}
exports.productinfo=id=>{
	var sql=`SELECT sanpham.Masp, sanpham.Ten, ctdh.Soluong,sanpham.Gia, ctdh.Tong FROM ctdh, sanpham WHERE ctdh.Madh ='${id}'and ctdh.Masp=sanpham.Masp`;
	return db.load(sql);
	
}
exports.sumbill=id=>{
	var sql=`SELECT SUM(ctdh.Tong) as sumbill  FROM ctdh WHERE ctdh.Madh ='${id}'`;
	return db.load(sql);
}
exports.countbill=id=>{
	var sql=`SELECT SUM(Soluong) as countbill FROM ctdh WHERE ctdh.Madh ='${id}'`;
	return db.load(sql);

}

exports.single = proId => {
    var sql = `select * from sanpham where Masp = '${proId}'`;
    return db.load(sql);
}
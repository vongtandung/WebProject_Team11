var db = require('../fn/db');

exports.loadcategorynew=()=>{
    var sql=`SELECT * FROM sanpham ORDER BY STT DESC LIMIT 10`;
	return db.load(sql);
}
exports.loadcategoryby=()=>{
    var sql=`SELECT * FROM sanpham ORDER BY Mua DESC LIMIT 10`;
	return db.load(sql);
}
exports.loadcategorybyid=(id)=>{
    var sql=`SELECT * FROM sanpham where Masp='${id}'`;
	return db.load(sql);
}
exports.loadcategorytype=(loai,id)=>{
    var sql=`SELECT * FROM sanpham where Loai='${loai}' and Masp !='${id}' order by rand() LIMIT 5`;
	return db.load(sql);
}
exports.loadcategoryproducer=(producer,id)=>{
    var sql=`SELECT * FROM sanpham where Nhasx='${producer}' and Masp !='${id}' order by rand() LIMIT 5`;
	return db.load(sql);
}

exports.loadcategoryview=()=>{
    var sql=`SELECT * FROM sanpham ORDER BY Xem DESC LIMIT 10`;
	return db.load(sql);
}
exports.loadallcategoriesby=(foro,offset)=>{
    var sql=`SELECT * FROM sanpham where Gioi='${foro}' or Loai='${foro}'or Nhasx='${foro}'  limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
   
	return db.load(sql);
}
exports.loadallcategoriesbysort1=(foro,offset,sort1,sort2)=>{
    var sql=`SELECT * FROM sanpham where (Gioi='${foro}' or Loai='${foro}'or Nhasx='${foro}') and Gia >${sort1} and Gia<${sort2}  limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
   
	return db.load(sql);
}

exports.countallcategoriesby=(foro)=>{
    var sql=`SELECT count(*) as countw FROM sanpham where Gioi='${foro}' or Loai='${foro}' or Nhasx='${foro}'`;
	return db.load(sql);
}
exports.loadallproducer = () => {
	var sql = 'select DISTINCT(Nhasx) from sanpham';
	return db.load(sql);
}
exports.loadalltype = () => {
	var sql = 'select DISTINCT(Loai) from sanpham';
	return db.load(sql);
}

exports.searchpro = (name,cate) => {
	var sql = "select * from sanpham where Loai like'" + `${cate}` + "%' and Ten like '%" + `${name}` + "%' ";
	return db.load(sql);
}

exports.searchproother = (cate) => {
	var sql = `select * from sanpham where Loai='${cate}' `
	return db.load(sql);
}

exports.searchproallcate = (name) => {
	var sql = "select * from sanpham where Ten like '%" + `${name}` + "%'";
	return db.load(sql);
}
exports.updateview=(id)=>{
	var sql=`update sanpham set sanpham.Xem=sanpham.Xem+1 where Masp='${id}' `;
    return db.save(sql);
}
var db = require('../fn/db');


exports.customerinfo=id=>{
	var sql=`SELECT account.Name, account.Address, account.Phone, account.Email, donhang.ngaylap FROM donhang, account WHERE donhang.Madh ='${id}'and donhang.Email=account.Email`;
	return db.load(sql);
}
exports.productinfo=id=>{
	var sql=`SELECT sanpham.Masp, sanpham.Ten, ctdh.Ngaylap, ctdh.Soluong, sanpham.Gia, ctdh.Tong FROM ctdh, sanpham WHERE ctdh.Madh ='${id}'and ctdh.Masp=sanpham.Masp order by ctdh.Ngaylap asc`;
	return db.load(sql);
	
}
exports.sumbill=email=>{
	var sql=`SELECT SUM(ctdh.Tong) as sumbill  FROM ctdh WHERE ctdh.Email ='${email}'`;
	return db.load(sql);
}
exports.countbill=email=>{
	var sql=`SELECT SUM(Soluong) as countbill FROM ctdh WHERE ctdh.Email ='${email}'`;
	return db.load(sql);

}

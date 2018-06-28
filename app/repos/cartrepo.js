var db = require('../fn/db');
exports.addbill = bill => {
	var sql = `INSERT INTO donhang(Tenkh,Diachi,Tonghd,Ngaylap,Danggiao,Dagiao,Email,Sodt) VALUES('${bill.name}', '${bill.address}', '${bill.sum}', '${bill.mkdate}',0,0 ,'${bill.email}','${bill.phone}')`;
	return db.save(sql);
}
exports.addbilldetail = ct => {
	var sql = `INSERT INTO ctdh VALUES('${ct.madh}', '${ct.masp}', '${ct.soluong}', '${ct.gia}','${ct.tong}')`;
	return db.save(sql);
}
exports.getbillid=email=>{
    var sql=`SELECT donhang.Madh as ID FROM donhang where Email='${email}' ORDER BY Ngaylap DESC LIMIT 1`;
    return db.save(sql);

}
exports.add = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].Masp === item.Masp) {
            cart[i].Quantity += item.Quantity;
            return;
        }
        
    }
    cart.push(item);
}

exports.remove = (cart, Masp) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (Masp === cart[i].Masp) {
            cart.splice(i, 1);
            return;
        }
    }
}

/*数据的存取功能*/
export function saveToLocal(id,key,value){
	let seller=window.localStorage._seller_;
	//从来没有创建过seller
	if(!seller){
		seller={};
		//多个商家多个id
		seller[id]={};
	}else{
		seller=JSON.parse(seller);
		if(!seller[id]){
			seller[id]={};
		}
	}
	//赋值到每个商家的id
	seller[id][key]=value;
	window.localStorage._seller_=JSON.stringify(seller);
}

export function loadFromLocal(id,key,def){
	let seller=window.localStorage._seller_;
	if(!seller){
		return def;
	}
	seller=JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret=seller[key];
	return ret||def;
}
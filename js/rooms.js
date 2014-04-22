var Room = function(obj, name) {
	PIXI.DisplayObjectContainer.call(this);
	this.name = name;

	/*
	if(name === 'dressroom') {
		this.scene = new DressRoom();
	} else {
		this.scene = new PIXI.DisplayObjectContainer();
		//this.scene = Lain;
	}
	*/

	if(obj.back) this.back = this.addPic(obj.back);
	if(obj.bg) this.bg = this.addPic(obj.bg);



	var Lain = new _Lain();

	Lain.x = 300-100;
	Lain.y = 105;

	this.addChild(Lain);

	if(name === 'dressroom') {
		for(var index in lain) { 
			if (lain.hasOwnProperty(index)) {
				var attr = lain[index].dress;
				console.log(index, attr);
				if(!attr) continue;

				attr.sprite = new Clothes(index, attr.img, attr.x, attr.y);
				this.addChild(attr.sprite);
			}
		}

		this.hideOnly = function(name) {
			for(var i=0, len = this.children.length; i<len; i++) {
				var obj = this.children[i];
				obj.visible = obj.name != name;
			}
		};

		this.onUp = function(c) {
			console.log(c, c.name);
			var x = c.position.x + c.width/2;
			var y = c.position.y + c.height/2;

			if(Lain.contains(x, y)) {
				console.warn('contains', x, y);
				this.hideOnly(c.name);
				Lain.setUniform(c.name);
			}
			c.defaultPos();
		};

	}

	//this.addChild(this.scene);

	if(obj.front) this.bg = this.addPic(obj.front);
};


Room.constructor = Room;
Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Room.prototype.addPic = function(img) {
	var t = PIXI.Texture.fromFrame('img/'+ img +'.png');
	var pic = new PIXI.Sprite(t);
	this.addChild(pic);
	return pic;
};

Room.prototype.run = function() {
};

Room.data = {

	//var bg = PIXI.Texture.fromFrame('img/'+ 128 +'.png');
	dressroom: {
		bg: 128,
	},



	classroom: {
		icon: 606,
		bg: 251,
		front: 283,
	},
	exit_door: {
		icon: 607,
		bg: 284,
	},
	bedroom: {
		icon: 608,
		bg: 616,
	},
	alice_door: {
		icon: 609,
		bg: 617,
	},
	club: {
		icon: 610,
		bg: 379,
	},
	street: {
		icon: 611,
		bg: 391,
	},
	bridge: {
		icon: 612,
		bg: 437,
		front: 447,
	},
};

Room.active = '';

// Переключение комнат
Room.showRoom = function(name) {
	if(Room.active !== '') {
		// Ходьба лейн из комнаты
	}
	for(var index in Room.data) { 
		if (Room.data.hasOwnProperty(index)) {
			var obj = this.data[index].obj;
			obj.visible = name === index;
		}
	}
	Room.active = name;
};


Room.initAll = function(stage) {
	console.group('Rooms');
	for(var index in Room.data) { 
		if (Room.data.hasOwnProperty(index)) {
			var attr = this.data[index];
			var r = new Room(attr, index);
			stage.addChild(r);
			attr.room = r;
			r.visible = false;
			console.log('Room', index, attr);
			Room.data[index].obj = r;
		}
	}
	console.groupEnd();
	Room.showRoom('dressroom');
};


function CreateTank(HP,Class,y,x,up,right,left,down){
	this.HP=HP; //Здоровье танка
	newDiv=document.createElement('div');
	newDiv.className=Class;
	newDiv.id=Class;
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	newDiv.style.top=y*way+edizm;
	newDiv.style.left=x*way+edizm;
	field.appendChild(newDiv);
	this.div=newDiv;
	this.class=Class;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
	this.lastmove=1; //куда двигался 1:up 2:right 3:left 4:down
	this.canmoveup=1;
	this.canmoveright=1;
	this.canmoveleft=1;
	this.canmovedown=1;
	this.moveup=up
	this.moveright=right;
	this.moveleft=left;
	this.movedown=down;
	this.move=1;
	this.canshoot=1;
	window.addEventListener("keyup",this.tankmove(this));
	$(this.div).addClass('tank')
	//Значок танка
	newDiv=document.createElement('div');
	newDiv.className=this.class+' tank';
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	$('#info').append(newDiv);
	$('#info').append('<br><br><br>');
	//Индикатор здоровья танка
	newDiv=document.createElement('div');
	newDiv.style.height="5"+edizm;
	newDiv.style.width=this.HP+edizm;
	newDiv.style.background="Green";
	newDiv.style.border="1px solid yellow";
	newDiv.id=newDiv.id=this.class+"HP";
	this.div.appendChild(newDiv);
	$('#info').append(this.div.id+': ');
	$('#info').append(newDiv);
	if(this.moveleft == '65'){$('#info').append('A')}
	else if(this.moveleft == '37'){$('#info').append('left')}
	else {$('#info').append(this.moveleft)}
	$('#info').append(',');
	if(this.moveup == '87'){$('#info').append('W')}
	else if(this.moveup == '38'){$('#info').append('up')}
	else {$('#info').append(this.moveup)}
	$('#info').append(',');
	if(this.moveright == '68'){$('#info').append('D')}
	else if(this.moveright == '39'){$('#info').append('right')}
	else {$('#info').append(this.moveright)}
	$('#info').append(',');
	if(this.movedown == '83'){$('#info').append('S')}
	else if(this.movedown == '40'){$('#info').append('down')}
	else {$('#info').append(this.movedown)}
	$('#info').append('<hr>');
}

CreateTank.prototype.tankmove=function(self){
	console.log(self)
	console.log(self.div.id)
	return function(event){
		// console.log(event,this);

		//Определяем координаты стен
		wallcubes=mazefield.getElementsByTagName('*');
			for(var b=0; b<wallcubes.length; b++) {
				WallCube = wallcubes[b];
				//Массив координат Y2 стен
				BY0 = parseInt(window.getComputedStyle(WallCube,null).top);
				//Массив координат X2 стен
				BX0 = parseInt(window.getComputedStyle(WallCube,null).left);
				//Массив координат Y3 стен
				BY1 = parseInt(window.getComputedStyle(WallCube,null).top)+way;
				//Массив координат X3 стен
				BX1 = parseInt(window.getComputedStyle(WallCube,null).left)+way;

				//Куда танк может двигаться
				if(self.y==BY0&&self.x==BX1){self.canmoveleft=0;}
				if(self.y==BY1&&self.x==BX0){self.canmoveup=0;}
				if(self.y+way==BY0&&self.x==BX0){self.canmovedown=0;}
				if(self.y==BY0&&self.x+way==BX0){self.canmoveright=0;}
			}//for

		key =event.keyCode;

		/*W UP*/
	 	if(key==self.moveup&&self.move==1) {
	 		self.lastmove=1;
	 		canmove();
	 		if(self.canmoveup==1){
				$('#'+self.div.id).animate({ "top": "-="+way+"px" }, movespeed );
				$('#'+self.div.id).css('transform','rotateZ(0deg)');
				// $('#'+self.div.id+'HP').css('display','none');
				self.y = self.y - way;
			}
		}

		/*D RIGHT*/
		if(key==self.moveright&&self.move==1) {
			self.lastmove=2;
			canmove();
			if(self.canmoveright==1){
				$('#'+self.div.id).animate({ "left": "+="+way+"px" }, movespeed );
				$('#'+self.div.id).css('transform','rotateZ(90deg)');
				self.x = self.x + way;
			}
		}

		/*A LEFT*/
	 	if(key==self.moveleft&&self.move==1) {
	 		self.lastmove=3;
	 		canmove();
	 		if(self.canmoveleft==1){
				$('#'+self.div.id).animate({ "left": "-="+way+"px" }, movespeed );
				$('#'+self.div.id).css('transform','rotateZ(-90deg)');
				self.x = self.x - way;
			}
		}

		/*S DOWN*/
		if(key==self.movedown&&self.move==1) {
			self.lastmove=4;
			canmove();
			if(self.canmovedown==1){
				$('#'+self.div.id).animate({ "top": "+="+way+"px" }, movespeed );
				$('#'+self.div.id).css('transform','rotateZ(180deg)');
				self.y = self.y + way;
			}
		}

		/*NumPad0*/
		if(key==96) {
			if(self.class=="Tank1"&&self.canshoot==1){
			canmove();
			BulletT = new CreateBullet("Tank1",self,"BulletT");}}

		/*Space*/
		if(key==32) {
			if(self.class=="Tank2"&&self.canshoot==1){
			canmove();
			BulletN = new CreateBullet("Tank2",self,"BulletN");
			}
		}
		/*Enter restart*/
		if(key==13){window.document.location="index.html";}


		self.canmoveup=1;self.canmoveright=1;self.canmoveleft=1;self.canmovedown=1;

		console.log(self.HP)
		if (self.HP<=0){
			console.log('HP out')
			win();
			self.div.style.backgroundImage="url('./img/blast.svg')";}

		//Когда танк достиг выхода, блокировать движение и стрельбу, вывести сообщение.
		if(self.y==EscapeBlock.y&&self.x==EscapeBlock.x){win();}
		
	}
}

// CreateTank.prototype.tankdamage=function(){
// 	hptank = this.div.getElementById("TankHP");
// 	//Вычисляем координаты снаряда
// 	bullets=bulletfield.getElementsByTagName('*');
// 	for(var s=0; s<bullets.length; s++) {
// 		Shot = bullets[s];
// 		//Массив координат Y
// 		SY0 = parseInt(window.getComputedStyle(Shot,null).top);
// 		//Массив координат X
// 		SX0 = parseInt(window.getComputedStyle(Shot,null).left);

// 		if(bullets.length>10){bulletfield.removeChild(Shot)}

// 		//Когда встречаем выстрел другого танка теряем HP, убираем снаряд
// 		//if(Shot.className=="Tank1bullet1"||Shot.className=="Tank1bullet2"||Shot.className=="Tank1bullet3"||Shot.className=="Tank1bullet4"){
// 		if(this.y==Shot.y&&this.x+cannonplace*2==Shot.x){this.HP=this.HP-5;bulletfield.removeChild(Shot);hptank.style.width=this.HP+edizm;}
// 		if(this.y+cannonplace*2==Shot.y&&this.x+way-cannonplace==Shot.x){this.HP=this.HP-5;bulletfield.removeChild(Shot);hptank.style.width=this.HP+edizm;}
// 		if(this.y+cannonplace*2==Shot.y&&this.x==Shot.x){this.HP=this.HP-5;bulletfield.removeChild(Shot);hptank.style.width=this.HP+edizm;}
// 		if(this.y+way-cannonplace==Shot.y&&this.x+cannonplace*2==Shot.x){this.HP=this.HP-5;bulletfield.removeChild(Shot);hptank.style.width=this.HP+edizm;}
// 	}
// }

/*
Танк не может ездить сквозь стены и другие танки.
Может стрелять.
Если встречает выстрел, теряет часть HP.
Отображать степень повреждений полоской здоровья и текстурами.
Когда HP заканчивается, взорвать танк.
*/
function CreateBullet(Tank,SelfTank,Name){
	//console.log(Tank,SelfTank);
	this.tank=Tank; //Какой танк стреляет //TankN,TankN
	newDiv=document.createElement('div');
	newDiv.style.height=cannonplace+edizm;
	newDiv.style.width=cannonplace+edizm;
	newDiv.className=this.tank+"bullet shot";
	// newDiv.className=this.tank+"bullet shot";
	//newDiv.innerHTML=newDiv.className+";"+this.y+";"+this.x+"; move:"+this.move+";name: "+this.name;
	//if(Tank=="TankT"){newDiv.style.background="Cadetblue";newDiv.style.border="1px solid green";}
	//if(Tank=="TankN"){newDiv.style.background="Darkorange";newDiv.style.border="1px solid Burlywood";}
	if(SelfTank.lastmove==1){
		this.move=1;
		newDiv.style.top=SelfTank.y-cannonplace+edizm;
		newDiv.style.left=SelfTank.x+cannonplace*2+edizm;
	}
	if(SelfTank.lastmove==2){
		this.move=2;
		newDiv.style.top=SelfTank.y+cannonplace*2+edizm;
		newDiv.style.left=SelfTank.x+way+edizm;

	}
	if(SelfTank.lastmove==3){
		this.move=3;
		newDiv.style.top=SelfTank.y+cannonplace*2+edizm;
		newDiv.style.left=SelfTank.x-cannonplace+edizm;
	}
	if(SelfTank.lastmove==4){
		this.move=4;
		newDiv.style.top=SelfTank.y+way+edizm;
		newDiv.style.left=SelfTank.x+cannonplace*2+edizm;
	}
	bulletfield.appendChild(newDiv);
	this.name=Name;
	this.div=newDiv;
	this.class=newDiv.className;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
	ThisShot=this.name;
	/*W UP*/
	if(this.move == '1'){
		$(this.div).fadeIn(1000).delay(200).animate({ "top": "-="+shotrange+edizm}, shotspeed );
		checkShot(this)
		removeShot(this)
	}
	/*D RIGHT*/
	if(this.move == '2'){
		$(this.div).fadeIn(1000).delay(200).animate({ "left": "+="+shotrange+edizm}, shotspeed );
		removeShot(this)
	}
	/*A LEFT*/
	if(this.move == '3'){
		$(this.div).fadeIn(1000).delay(200).animate({ "left": "-="+shotrange+edizm}, shotspeed );
		removeShot(this)
	}
	/*S DOWN*/
	if(this.move == '4'){
		$(this.div).fadeIn(1000).delay(200).animate({ "top": "+="+shotrange+edizm}, shotspeed );
		removeShot(this)
	}
}

function removeShot(tank){
		setTimeout(function() {$(tank.div).remove();},1000)
	}

function checkShot(tank){
	checkShotInterval = setInterval(function(){
		console.log('Y: '+$(tank.div).css('top'))
		console.log('X: '+$(tank.div).css('left'))
		, 500});
	setTimeout(function() {clearInterval(checkShotInterval)},1000)
		// setTimeout(function() {$(tank.div).remove();},1000)
	}

CreateBullet.prototype.movebullet=function(){
	//Двигаем снаряд
	this.y=this.y-1;
	this.div.style.top=this.y+edizm;
	// if(this.className=="TankTbullet1"||this.className=="TankNbullet1") {this.y=this.y-1;this.div.style.top=this.y+edizm;}
	// if(this.className=="TankTbullet2"||this.className=="TankNbullet2") {this.x=this.x+1;this.div.style.left=this.x+edizm;}
	// if(this.className=="TankTbullet3"||this.className=="TankNbullet3") {this.x=this.x-1;this.div.style.left=this.x+edizm;}
	// if(this.className=="TankTbullet4"||this.className=="TankNbullet4") {this.y=this.y+1;this.div.style.top=this.y+edizm;}
}

//self.y = self.y - way; self.div.style.top = self.y + edizm;

//Когда снаряд достиг границы поля боя или стены нужно его убрать
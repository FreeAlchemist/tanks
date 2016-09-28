way = 50;
cannonplace = way/5;
shotdistance=50;
speed=0;
moveway=100;
movespeed=200;
shotspeed=500;
shotrange=100;
shotflighttime=200;
edizm = "px";
fieldcolor="Darkgrey";
fieldtop="50";
fieldleft="50";


CanMoveInterval = setInterval(function(){canmove(),0});
// ShotInterval = setInterval(function(){checkshot(), 1000});

/*
S-SolidBlock
B-BrickBlock(destroyable)
1-Tank1
2-Tank2
E-Escape
*/

var fieldText = ""
+ "SSSSSSSSSSSSSSSSSS\n" 
+ "S                S\n" 
+ "S            B   S\n" 
+ "S    2    1  B   S\n" 
+ "S            B   S\n" 
+ "S SSBBSSB        S\n" 
+ "S     SE         S\n" 
+ "S S    S         S\n" 
+ "S       S        S\n" 
+ "S S   S  B       S\n" 
+ "S     B          S\n" 
+ "S     S          S\n" 
+ "S     S    SSS   S\n" 
+ "S                S\n" 
+ "SSSSSSSSSSSSSSSSSS" ;

function createmaze(fieldText, way){
	var feildArr =  fieldText.split('\n');
	var fieldH = feildArr.length * way;  
	var fieldW = feildArr[0].length * way;
	fieldheight=fieldH;
	fieldwidth=fieldW;

	// for (var i in feildArr) {
	// 		// console.log(feildArr[i].length);
	// }

	//Размечаем поле
	field.style.background=fieldcolor;
	field.style.height=fieldH+edizm;
	field.style.width=fieldW+edizm;
	field.style.top=fieldtop+edizm;
	field.style.left=fieldleft+edizm;

	mazefield.style.height=fieldH+edizm;
	mazefield.style.width=fieldW+edizm;
	mazefield.style.top=fieldtop+edizm;
	mazefield.style.left=fieldleft+edizm;

	bulletfield.style.height=fieldH+edizm;
	bulletfield.style.width=fieldW+edizm;
	bulletfield.style.top=fieldtop+edizm;
	bulletfield.style.left=fieldleft+edizm;

	for (var y in feildArr) {
		var line = feildArr[y];
		for (var x in line) {
			//Размещаем стены
			if (line[x]==='S') {SolidBlock = new CreateBlock("50","SolidBlock",y,x);}
			else if (line[x]==='B') {BrickBlock = new CreateBlock("50","BrickBlock",y,x);}
			//Размещаем выход
			else if (line[x]==='E') {EscapeBlock = new CreateEscape(y,x);}
			//Размещаем танк1
			else if (line[x]==='1') {Tank1 = new CreateTank("50","Tank1",y,x,38,39,37,40);}
			//Размещаем танк2
			else if (line[x]==='2') {Tank2 = new CreateTank("50","Tank2",y,x,87,68,65,83);}
		}//for
	}//for
	canmove();
}

//Экран победы
function win(){
	clearInterval(CanMoveInterval);
	clearInterval(ShotInterval);
	field.style.background="black";
	Tank1.move=0;Tank1.canshoot=0;
	Tank2.move=0;Tank2.canshoot=0;
	newDiv=document.createElement('div');
	newDiv.className='WinMsg';
	newDiv.id='WinMsg';
	newDiv.style.height="30%";
	newDiv.style.width="60%";
	newDiv.style.top="30%";
	newDiv.style.left="20%";
	newDiv.style.border="1px groove Burlywood";
	newDiv.innerHTML="Ah! You managed to escape... Till next time then."+"<br><br>"+"Press ENTER to restart";
	field.appendChild(newDiv);	
}

function canmove(){
		//Когда встречаются кубы
		if(Tank1.y==Tank2.y&&Tank1.x==Tank2.x+way){Tank1.canmoveleft=0;Tank2.canmoveright=0;}
		if(Tank1.y==Tank2.y+way&&Tank1.x==Tank2.x){Tank1.canmoveup=0;Tank2.canmovedown=0;}
		if(Tank1.y+way==Tank2.y&&Tank1.x==Tank2.x){Tank1.canmovedown=0;Tank2.canmoveup=0;}
		if(Tank1.y==Tank2.y&&Tank1.x+way==Tank2.x){Tank1.canmoveright=0;Tank2.canmoveleft=0;}
}


function checkshot(){
//Двигаем снаряд
	if(BulletT){BulletT.movebullet();}
	if(BulletN){BulletN.movebullet();}
	//Вычисляем координаты снаряда
	bullets=bulletfield.getElementsByTagName('*');
		for(var s=0; s<bullets.length; s++) {
			Shot = bullets[s];
			//Массив координат Y
			SY0 = parseInt(window.getComputedStyle(Shot,null).top);
			//Массив координат X
			SX0 = parseInt(window.getComputedStyle(Shot,null).left);

			if(bullets.length>10){bulletfield.removeChild(Shot)}
		
			//Когда встречаем выстрел другого танка теряем HP, убираем снаряд
			hptank1 = window.document.getElementById("Tank1HP");
			if(Shot.className=="Tank2bullet1"||Shot.className=="Tank2bullet2"||Shot.className=="Tank2bullet3"||Shot.className=="Tank2bullet4"){
				if(Tank1.y==SY0&&Tank1.x+cannonplace*2==SX0){Tank1.HP=Tank1.HP-5;bulletfield.removeChild(Shot);hptank1.style.width=Tank1.HP+edizm;}
				if(Tank1.y+cannonplace*2==SY0&&Tank1.x+way-cannonplace==SX0){Tank1.HP=Tank1.HP-5;bulletfield.removeChild(Shot);hptank1.style.width=Tank1.HP+edizm;}
				if(Tank1.y+cannonplace*2==SY0&&Tank1.x==SX0){Tank1.HP=Tank1.HP-5;bulletfield.removeChild(Shot);hptank1.style.width=Tank1.HP+edizm;}
				if(Tank1.y+way-cannonplace==SY0&&Tank1.x+cannonplace*2==SX0){Tank1.HP=Tank1.HP-5;bulletfield.removeChild(Shot);hptank1.style.width=Tank1.HP+edizm;}
			}

			// Tank2.tankdamage();
			//Когда встречаем выстрел другого танка теряем HP, убираем снаряд
			hptank2 = window.document.getElementById("Tank2HP");
			if(Shot.className=="Tank1bullet1"||Shot.className=="Tank1bullet2"||Shot.className=="Tank1bullet3"||Shot.className=="Tank1bullet4"){
				if(Tank2.y==SY0&&Tank2.x+cannonplace*2==SX0){Tank2.HP=Tank2.HP-5;bulletfield.removeChild(Shot);hptank2.style.width=Tank2.HP+edizm;}
				if(Tank2.y+cannonplace*2==SY0&&Tank2.x+way-cannonplace==SX0){Tank2.HP=Tank2.HP-5;bulletfield.removeChild(Shot);hptank2.style.width=Tank2.HP+edizm;}
				if(Tank2.y+cannonplace*2==SY0&&Tank2.x==SX0){Tank2.HP=Tank2.HP-5;bulletfield.removeChild(Shot);hptank2.style.width=Tank2.HP+edizm;}
				if(Tank2.y+way-cannonplace==SY0&&Tank2.x+cannonplace*2==SX0){Tank2.HP=Tank2.HP-5;bulletfield.removeChild(Shot);hptank2.style.width=Tank2.HP+edizm;}
			}
			
			// if(Shot.className=="Tank1bullet1"||Shot.className=="Tank2bullet1") {Shot.style.top=(SY0-1)+edizm;}
			// if(Shot.className=="Tank1bullet2"||Shot.className=="Tank2bullet2") {Shot.style.left=(SX0+1)+edizm;}
			// if(Shot.className=="Tank1bullet3"||Shot.className=="Tank2bullet3") {Shot.style.left=(SX0-1)+edizm;}
			// if(Shot.className=="Tank1bullet4"||Shot.className=="Tank2bullet4") {Shot.style.top=(SY0+1)+edizm;}

			//Когда снаряд достиг границы поля боя
			if(fieldtop==SY0||fieldtop-cannonplace==SY0){bulletfield.removeChild(Shot)}
			if(fieldleft==SX0||fieldleft-cannonplace==SX0){bulletfield.removeChild(Shot)}
			if(fieldheight-way-cannonplace==SY0||fieldheight-way==SY0){bulletfield.removeChild(Shot)}
			if(fieldwidth-way-cannonplace==SX0||fieldwidth-way==SX0){bulletfield.removeChild(Shot)}
			
			//Когда снаряд достиг стены
			// if(BY0+cannonplace*2==SY0&&BX0+cannonplace*2==SX0){bulletfield.removeChild(Shot)}
			//Вычисляем координаты стен
			wallcubes=mazefield.getElementsByTagName('*');
				for(var b=0; b<wallcubes.length; b++) {
				WallCube = wallcubes[b];
				//Массив координат Y2 стен
				BY0 = parseInt(window.getComputedStyle(WallCube,null).top);
				//Массив координат X2 стен
				BX0 = parseInt(window.getComputedStyle(WallCube,null).left);
				if(WallCube.className=="SolidBlock"&&BY0+cannonplace*2==SY0&&BX0+cannonplace*2==SX0){bulletfield.removeChild(Shot)}
				if(WallCube.className=="BrickBlock"&&BY0+cannonplace*2==SY0&&BX0+cannonplace*2==SX0){BrickBlock.HP=BrickBlock.HP-10;bulletfield.removeChild(Shot);mazefield.removeChild(Wallcube);}
			}//for

		}//for	
}
function CreateBlock(HP,Class,y,x){
	this.HP=HP; //Индикатор здоровья Стены
	newDiv=document.createElement('div');
	newDiv.className=Class;
	newDiv.style.height=way+edizm;
	newDiv.style.width=way+edizm;
	newDiv.style.top=y*way+edizm;
	newDiv.style.left=x*way+edizm;
	mazefield.appendChild(newDiv);
	this.div=newDiv;
	this.class=Class;
	this.y=parseInt(window.getComputedStyle(this.div,null).top);
	this.x=parseInt(window.getComputedStyle(this.div,null).left);
}

/*
Если стена разрушаема, то при попадании снаряда нужно уменьшать ее HP.
Отображать повреждения сменой текстуры стены.
Когда закончится HP убрать стену.
*/
// CreateBlock.prototype.destruct=function(self){
// 	if(self.class=="BrickBlock"){
// 		console.log("brick!")
// 	}
// }
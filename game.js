window.addEventListener('load',init,false);
var canvas=null, ctx=null;
var lastPress=null;
var dir=0;
var pause=true;

var player= new Rectangle(40,40,10,10);
var food=new Rectangle(80,80,10,10);
var score=0;


var KEY_ENTER=13;
var KEY_LEFT=37;
var KEY_UP=38;
var KEY_RIGHT=39;
var KEY_DOWN=40;





function random(max){
    return Math.floor(Math.random()*max);
}



function init(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    run();
    repaint();
}



function run()
{
	setTimeout(run,90);
	act();
	
}


function repaint ()
{
	requestAnimationFrame(repaint);
	paint(ctx);
}

function act(){
	/*x+=2;
	if(x > canvas.width)
	{
		x=0;
	}*/


     if(player.intersects(food)){
            score++;
            food.x=random(canvas.width/10-1)*10;
            food.y=random(canvas.height/10-1)*10;
        }

 if(!pause){
	 if(lastPress==KEY_UP)
        dir=0;
    if(lastPress==KEY_RIGHT)
        dir=1;
    if(lastPress==KEY_DOWN)
        dir=2;
    if(lastPress==KEY_LEFT)
        dir=3;


     // Move Rect
    if(dir==0)
        player.y-=10;
    if(dir==1)
        player.x+=10;
    if(dir==2)
        player.y+=10;
    if(dir==3)
        player.x-=10;



     // Out Screen
    if(player.x>canvas.width)
        player.x=0;
    if(player.y>canvas.height)
        player.y=0;
    if(player.x<0)
        player.x=canvas.width;
    if(player.y<0)
        player.y=canvas.height;

    }
    
    	if(lastPress==KEY_ENTER)
    	{
    		pause=!pause;
    		lastPress=null;
    	}
    

}




function paint(ctx){
	//limpiar el canvas con un rectangulo del tamaño del lienzo completo
	ctx.fillStyle='#000';
	ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0f0';
    player.fill(ctx);
    ctx.fillStyle='#f00';
    food.fill(ctx);

    ctx.fillStyle='#fff';
    //ctx.fillText('Last Press: '+lastPress,0,20);
    if(pause){
        ctx.textAlign='center';
        ctx.fillText('PAUSE',150,75);
        ctx.textAlign='left';
    }


       ctx.fillText('Score: '+score,0,10);
}





function Rectangle(x,y,width,height){
    this.x=(x==null)?0:x;
    this.y=(y==null)?0:y;
    this.width=(width==null)?0:width;
    this.height=(height==null)?this.width:height;
    
    this.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }
    
    this.fill=function(ctx){
        if(ctx!=null){
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }
}







document.addEventListener('keydown', function(evt){
	lastPress=evt.keyCode;
},false);


window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();
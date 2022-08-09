//genel harita
//canvası çizdik
//var ve consts
//image ı yükledik
//yüklediğimiz resimdeki ilgili yerlerdeki küçük resim
// parçalarını alıp aşağıda sıralanan nesneleri oluşturduk
// nesnelerin içine kendi draw methodlarını ekledik
//
//background
//foreground
//bird
//getReady message
//gameOver message
//
//genele ait olan draw(), update() ve loop() fonksiyonlarını hazırladık
//draw() içine hazırladığımız nesnelerin her biri içindeki 
//draw() methodlarını mesela gameOver.draw() şeklinde ekledik
//YENIDEN SUNUMA DONDUK
//
//2. ANA ADIM
        //oyunu kontrol etmek için state kullanımı
        //kusun kanat çırpması başlangıç ekrannda
        //yerçekimi ve kanat çırpma


// canvası çizmek
const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');

let frames = 0;
/* canvasa kaç tane frame çizdik? skor vs. için tutatacağız*/

//canvas a çizilecek herşeyi çizecek function
function draw(){
    ctx.fillStyle = "#70c5ce";//canvasın background rengi
    ctx.fillRect(0,0,cvs.width, cvs.height);
    /*
    ctx.fillRect(x,y,cvs.width, cvs.height)
    0,0 canvasın sol üstteki başlangıç x,y koordinatları, cvs.width ve cvs.height ise canvasın eni ve boyu
    önce rengi yazdık, sonrada o rengi nereye uygulayacağını gösterdik burada background umuz tek renk değil img larda olacak
    background
    foreground
    pipes şeklinde olacak ve bunların konumları değişecek*/
}

//oyunu update edecek function
/* her saniye oyunun update edilmesi gerek */
function loop(){
    update();
    draw();
    frames++

    requestAnimationFrame(loop);
    //callback function 
    /* yani kendi içinde olduğu function u tekrar çağıran loop gibi adı da loop() :) 
    burada saniyede 50 sefer çağıracağız aynı functionu*/
}

loop();

/* bizim burada sprite.png adında tek bir image dosyamız var, flappy bird uygulamasındaki img leri bu tek .png den alacağız
bunun için image dosyasındaki farklı farklı image ların koordinatlarını kullanacağız
 */

 const sprite = new Image();
 sprite.src = "img/sprite.png";
 ctx.drawImage(sprite, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
 /* kaynak dosyanın adı, x i, y si, genişliği, yüksekliği, canvasta koyulacağı yerin xi , y si, genişliği, yüksekliği
 bu şekilde bir resmin herhangibir kısmını alıp başka bir yerde herhangibir konum ve boyutta kullanabiliriz  */

 /* canvasa bir image çizdirmek için bir nesne tanımlarız aşağıdaki gibi */

 const name = {
     sX : 276,
     sY : 112,
     w : 34,
     h : 26,
     x : 0,
     y : 0,

     draw : function(){
         ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
     }
 }

 function draw(){
     name.draw();
 }

 /* fit an image */



 /* draw the bird */


 //2. ANA ADIM
 //state ler, oyunda 3 state var yani oyunun 3 farklı durumu
 //1. getReady
 //2. game
 //3. over
 
 const state = {
    current : 0, 
    getReady : 0,
    game : 1,
    over : 2
 }
 /* burada örneğin şua ndaki state imiz 0 yani getReady deyiz, current state de 0 olacak, getReady deki state e tıkladığımızda state gema olacak burada çalışması gerekenler çalışacak, gameOver şartları olduğunda bu sefer state over olacak, currentte dolayısıyla over olacak
 bunlar eventListener ile yapacağız */

 cvs.addEventListener('click', function(event){
     switch(state.current){
        case state.getReady : state.current = state.game;
        break;
        case state.game : bird.flap();
        break;
        case state.over : state.current = state.getReady;
        break;
     }
 })

 /* burada  mesela yukarıda hazırladığımız getReady, gameOver nesneleri içerisindeki draw() methodları içine bu case durumlarını yazacağız ve eğer case true ise darw methodu çalışacal şekilde yapacağız mesela ...


const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,

    draw : function(){
        if(state.current == state.getReady)
        {ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
} 

const gameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,

    draw : function(){
        if(state.current == state.over){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    }
}

şeklinde olacak
*/

//3. ANA ADIM
//BIRD
//animate the bird
/* bird nesnesini hatırlayalım
bird içerisinde frame var bu kuşun resimlerini temsil ediyor kuşun 4 farklı resim hali var bunlar bir array içerisnde tutuluyor frame e göre hangi resmin ekrana geleceği belirleniyor
ctx.drawImage(...) ile kusun konumu belirleniyor
kusun resimleri bir animation oluşturuyor bu ise belli bir periyotta değişmeli ki animasyo olsun bunuda update() içerisinde yapıyoruz
şimdi this.frame kusun array içindeki 4 halinin indisini gösteriyor
kuş nesnesi şu anda bu halde

const bird = {
    animation : [
        {sX : 276, sY : 112},
        {sX : 276, sY : 139},
        {sX : 276, sY : 164},
        {sX : 276, sY : 139}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,

    frame : 0,

    draw : function(){
        let bird = this.animation[this.frame];
        
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    flap : function(){

    },
}

şimdi 

this.frame = 0 % 4 = 0 işlemi sonucu bize 0. indisi veriyor yani ilk resim bu durumda frame 1 artmalı belli bir periyot sonra arttı
this.frame = 1 oldu % 4 = 1 true frame yine arttı
this.frame = 2 % 4 =2. indis
this.frame = 3 % 4 = 3. indis
this.frame = 4 % 4 =0 . indis başa döndü 
tam istediğimiz şey

bunu update() adında yine bird nesnesine ekleyeceğimiz bir method ile çözeriz yerleştirmeliyiz

this.period = state.current == state.getReady ? 10 : 5;

this.frame += frames % this.period = 0 ? 1 :0;
this.frame = this.frame % this.animation.length;

daha sonra global update() içerisine bird.update() methodunu yerleştiririz
böylelikle get ready ekranında kuş yavaşça kanat çırpmaya başlar, start a tıkladığımızda state değişir ve bu sefer kuş daha hızlı (5 frame) kanat çırpmaya başlar.
*/

// yer çekimi ve kanat çıparak yükselme
/* 
kusun içine bir speed eklememiz lazım
speed
gravity
jump
eklememiz lazım ayrıca update() methodunuda güncellemeliyiz

şu andaki bird nesnesi buna speed, gravity jump ekleyeceğiz
flap() methodunu güncelleyeceğiz

const bird = {
    animation : [
        {sX : 276, sY : 112},
        {sX : 276, sY : 139},
        {sX : 276, sY : 164},
        {sX : 276, sY : 139}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,

    frame : 0,

    draw : function(){
        let bird = this.animation[this.frame];

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    flap : function(){

    },

    update : function(){
        //eğer game state = get ready state i ise kus yavaşça uçacak
        this.period = state.current == state.getReady ? 10 : 5;
        // frame i 1 tane arttırmalıyız her bir periyotta
        this.frame += frames % this.period == 0 ? 1 :0;
        //frames 0 dan 4 e geldiğinde yeniden 0 a dönmesi
        this.frame = this.frame % this.animation.length;
    }
}


buna aşağyıyı eklemleyeceğiz

speed : 0,
gravity : 0.25,
jump : 4.6,

kus her belli periyotta 0.25 adımlık hız artışı ile aşağı doğru gidecek, başlangıçta speed : 0
ekrana tıkladıkçada yukarı çıkacak, yani jump olacak
update methodu içine şöyle bir mantığı koyacağız

update : function(){
    if(state.current == state.getReady){
        this.y = 150;
        //yani başlangıç ekranı konumu
    } else {
        this.speed += this.gravity;
        this.y += this.speed
        //y koordinatı aşağı doğru yükselir
    }
}


yukarı zıplama için ise
flap : function(){
    this.speed = - this.jump;
}
ayrıca kuş aşağı yere çarptığında yani foreground a o zaman oyun bitecek, buraya da bir collision detection lazım
bird içindeki update() içine
if(this.y + this.h/2 >= cvs.height - fg.h){
    this.y = cvs.height - fg-this/2;
    if(state.current == state.game){
        state.current = state.over;
    }
}
 */
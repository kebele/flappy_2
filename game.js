// THANKS TO CODEEXPLAINED
//https://www.youtube.com/c/CodeExplained
// ++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++
//genel harita
//1. ANA ADIM
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
//2. ANA ADIM
//oyunu kontrol etmek için state kullanımı
//kusun kanat çırpması başlangıç ekrannda
//yerçekimi ve kanat çırpma
//3. ANA ADIM
//bird rotation
//move foreground
//4. ANA ADIM
// Pipes oluşturma
//pipes ları çizdirmek
//5. ANA ADIM
//collision detection
//6. ANA ADIM
//score
//7. ANA ADIM
//start butonu fonksiyonları
/* 
        mevcutta kodumuzun yapısı

        cvs.addEventListener("click", function(event){
            switch (state.current){
                case state.getReady :
                //başlangıç ekranındayız diyelim clicklediğimizde
                //state.game olacak, state.game de ne varsa onlar çalışacak 
                    state.current == state.game;
                    break;
                case state.game :
                //state.game esnasında click in görevi bird.flap()
                //kuş kanat çırpacak
                    bird.flap();
                    break;
                case state.over :
                //state.over olduğunda click in görevi ne olacak?
                //start a tıkladığımızda state in game dönmesi lazım
                //yani oyunun restart etmesi lazım
                //burada start buton sadece resim olduğu için gerçekte orada bir buton olmadığından bizim koordinata
                // ihtiyacımız var, bu koordinatında sayfanın
                // herhangibir kayması scroll u vb. durumlarda
                // canvas tan dolayı değişmamasi lazım
                //eğer scroll olursa bu sefer tıkladığımız yerlerin k x ve y koordinatları değişir
                //bu durumda canvasın scroll aşağı scrolll sağa scroll vb.durumlarudan etkilenmemesi için getBoundingClientRect kullanılır
                // rect olarak tanımladıktan sonra left ve top olarak scroll vb. clicklenen koordinattan etkisi çıkarılarak giderilir
                start button un koordinatları vs.
          


                let rect = cvs.getBoundingClientRect();
                let clickX = event.clientX - rect.left;
                let clickY = event.clientY - rect.top,
                //click lediğimiz noktaların x ve y koordinatlarını verir

        const startBtn = {
                    x : 120,
                    y : 263,
                    w : 83,
                    h : 29
                }

                if(clickX > startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                    bird.speedReset();
                    //bird nesnesi içine yeni bir method tanımlayacağız
                    //bunu property si bird.speed= 0 yapacak
                    pipes.reset();
                    //pipes nesnesi içine reset adında bir method tanımlayacağız
                    //bu da pipes.position = [] yapacak
                    pipes.reset();
                    //daha sonra score nesnesi içine de reset() methodu tanımlayacağız
                    //buda score.value = 0 yapacak;
                    score.reset();
                    state.current = state.getReady;
                }
                break;
            }
        })        
        */

//8. ANA ADIM
//ses ekleme

//1
//1 select CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

//1 game vars and consts
let frames = 0;
// 3 adımda degree tanımlama, buradan bird nesnesine gideceğiz,
// rotation ekleyeceğiz
const DEGREE = Math.PI / 180;

//1 load sprite image
const sprite = new Image();
sprite.src = "img/sprite.png";

//8 adım ses ekleme
const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";

const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";

const DIE = new Audio();
DIE.src = "audio/sfx_die.wav";

//2
//2 game state
//state ler, oyunda 3 state var yani oyunun 3 farklı durumu
//1. getReady
//2. game
//3. over
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};
/* burada örneğin şua ndaki state imiz 0 yani getReady deyiz, current state de 0 olacak, getReady deki state e tıkladığımızda state gema olacak burada çalışması gerekenler çalışacak, gameOver şartları olduğunda bu sefer state over olacak, currentte dolayısıyla over olacak
 bunlar eventListener ile yapacağız */

//7 adım
//Start Button
const startBtn = {
  x: 120,
  y: 263,
  w: 83,
  h: 29,
};

//2 control the game
//7 adım içinde burada ekleme olacak, state.over kısmına

cvs.addEventListener("click", function (event) {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      SWOOSHING.play();
      break;
    case state.game:
      bird.flap();
      FLAP.play();
      break;
    case state.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = event.clientX - rect.left;
      let clickY = event.clientY - rect.top;

      //start button a tıklandığında ne olacak?
      if (
        clickX > startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        bird.speedReset();
        //bird nesnesi içine yeni bir method tanımlayacağız
        //bunu property si bird.speed= 0 yapacak
        pipes.reset();
        //pipes nesnesi içine reset adında bir method tanımlayacağız
        //bu da pipes.position = [] yapacak
        //daha sonra score nesnesi içine de reset() methodu tanımlayacağız
        //buda score.value = 0 yapacak;
        //şimdi ilgili yerlerde bu methodları eklemeliyiz
        score.reset();
        state.current = state.getReady;
      }
      break;
  }
});

//1 background
const bg = {
  sX: 0,
  sY: 0,
  w: 275,
  h: 226,
  x: 0,
  y: cvs.height - 226,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    /* bu kod ekranın tamamını kaplamayacak bu durumda an taraf boş kalacağı için bu problemi çözmek için aşağıdaki kodu ekleriz yaptığımız şey x eksenine w kadarlık kısmı eklemek*/
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

//1 foreground

//3 adımda fg nin hareket etme hissi vermesi konusu
//fg sola doğru hareket ederse geri kalan şeyler özellikle de kuş sağa
// doğru hareket ediyormuş hissi verir
//bunun için x ekseninde bir değişikliğe ihtiyacımız var
// bunuda delta x ile yapacağız
// mesela dx : 2 tanımlayacağız
// daha sonrada update methodun içinde state.current == state.game
// olduğunda  çalışacak kodları yazacağız,
//yani oyun esnasında hareket olacak
//(this.x - this.dx) x in koordinatını 2 eksiltecek
//burada öyle bir hesap yapmalıyız ki belli bir noktadan
// sonra this.x ilk değeri olan 0 a geri dönsün bu yüzden
// % modulus kullanıyoruz.
// mesela (this.x - this.dx) % (this.w/2) = this.x şeklinde işlemimiz
//(0 - 2) % (224/2) sonuç -2 yani this.x işlem sonunda -2 noktasına gelecek
// sola kayacak sonra yeni x yani (-2 -2 ) % (224/2) işlemi yapılacak
// -4 çıkacak yeni this.x = -4 olarak yeniden işlemi yapacak
// sonra (-110 - 2) %(24/2) = 0 olacak yani this.x = 0 başa dönmüş olacak.
// update : function(){
//   if(state.current == state.game){
//        this.x = (this.x - this.dx) % (this.w/2);
//    }
//}

const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  //3 adımda fg nin hareket ediyor hissi vermesi için
  // delta x dx tanımladık
  dx: 2,
  y: cvs.height - 112,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    /* bu kod ekranın tamamını kaplamayacak bu durumda an taraf boş kalacağı için bu problemi çözmek için aşağıdaki kodu ekleriz yaptığımız şey x eksenine w kadarlık kısmı eklemek*/
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
  // 3. adımda fg nin hareket etmesi içn burada bir update methodu tanımlamalıyız
  update: function () {
    if (state.current == state.game) {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
  },
  //3 adım da buradan global update methoduna gidip
  // fg.update() ethodunu çalıştırması için ekleyeceğiz
};

//1 bird

const bird = {
  animation: [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
  ],
  x: 50,
  y: 150,
  w: 34,
  h: 26,

  frame: 0,

  //2
  //gravity ve kanat çırpma
  gravity: 0.25,
  jump: 4.6,
  speed: 0,
  //3 adım için kuşun rotation u için
  rotation: 0,
  //5. adım için kuşa radius ekleyeceğiz
  radius: 12,

  draw: function () {
    let bird = this.animation[this.frame];
    // 3. adım rotation için ctx.save() ve ctx.restore() ekleyeceğiz
    ctx.save();
    //3 adımda drawImage() içerisindeki this.x ve this.y koordinatlarını bu methodun içinden alıp translate e getireceğiz
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    //buradan update() e gideceğiz ve
    //getReady durumuna this.rotation = 0 * DEGREE ekleyeceğiz
    //state.game durumuna ise -25 derece ve düşme durumuna
    // 90 derece hareketlerini ekleyeceğiz
    //
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );

    ctx.restore();
  },
  flap: function () {
    this.speed = -this.jump;
    /* control the game açıklamasında yukarıda click lemeye bir event listener ekledik ve içerisinde switch case var buna göre currrent state = game olduğunda bird.flap() bird nesnesindeki flap methodu çalışacak yani clickledikçe çalışacak burada da bird ün 0 olan speed ine -4.6 jump atıyoruz, bu da y ekseninde hareket eden kuşu clickledikçe yükseltiyor 
        y ekseni aşağı doğru gider (0,0) koordinatı sol üstteki 0 noktası, o noktadan sağa doğru hareket x ekseninde büyüme
        aşağı doğru hareket ise y ekseninde küçülme demek*/
  },

  //3
  /* kusun kafasının hangi yöne hareket edecegi, yukarı -25 derece acı ile kanat çırparken, sabit 0 derece ve 90 derece duserken  
        rotate kullanacagız
        ctx.rotate(angle) angle radyan cinsinden 
        burada ctx.rotate(45 * Math.PI/180)bütün canvası 45 derece açı ile saat yönünde döndürür
        bizim ihtiyacımız bird ün rotate olması bunun için kuşun tam orta koordinatının (this.x, this.y) 
        ctx.translate(this.x, this.y);
        ctx.rotate(angle) veya ctx.rotate(45 * Math.PI/180) dediğimizde bu sefer başlangıç koordinatı olarak kuşu alıp saat yönünde 45 derece çevirir 
        burada sıkıntı bu işlemi yaptığımızda başlangıç kooridinatına göre yeni aldığı canvastaki geri kalan herşeyide döndürür, burada sadece başlangıcı değiştirmiş olduk bunu engellemek için
        en başa ctx.save() ile herşeyi sabitleriz, sonra kuşu çevirir sonra herşeyi restore ederiz
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        ctx.drawImage(sprite, bird.sX,....);
        ctx.restore();

        şmdi degree tanımaya geçelim
        const DEGREE = Math.PI/180;
        bundan sonra bird nesnesinde modifikasyon yapmalıyız, sonuçta bird ün rotate olmasını istiyoruz

        const Bird = {
            .
            .
            .
            rotation : 0,
            .
            .
            draw: function(){
                let bird = this.animation[this.frame];
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
                ctx.restore();
            }
        }
        şeklinde rotate ile ilgili ekleme yaparız
        burada sprite ile çizerken draw metodunda -this.w/2, -this.h/2 ifadelerine dikkat burada bizim orijinimiz artık kuş olduğu için kuşun orta noktasını alıyoruz
        daha sonrada bird deki update methodunda değişiklik yaparız
        */

  update: function () {
    //eğer game state = get ready state i ise kus yavaşça uçacak
    //yani daha oyun başlamadı bekleme ekranı
    this.period = state.current == state.getReady ? 10 : 5;
    // frame i 1 tane arttırmalıyız her bir periyotta
    //frame bird ün hareket array ideki indisi ifade ediyor
    //başlangıçta 0 olarak tanımladık
    this.frame += frames % this.period == 0 ? 1 : 0;
    //frames 0 dan 4 e geldiğinde yeniden 0 a dönmesi
    this.frame = this.frame % this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150;
      //reset pos of the bird after the game over
      //3 bird rotationiçin
      //burada this.rotation = 0 * DEGREE ekleriz, yani
      //getReady de iken başlangıç ekraında yani kuşun
      //yönü 0 derece demek
      this.rotation = 0 * DEGREE;
    } else {
      //başlangıç ekranında değilsek
      /* başlangıçta 0 olan speed 0.25 artacakve yeni speed 0.25 lik artarken kendiside y pozisyonunu sürekli artarak yenileyecek buda 0.25 lik olacak yani y aratacak yani kuş aşağı düşecek */
      this.speed += this.gravity;
      this.y += this.speed;
      /* kuşun pozisyonunun yüksekliği + kuşun kendi boyunun yarısı canvasın kendi yükskliği - fg yani yerin yükseliğinden çıarılınca yani kuş yerden büyük oldukça kuşuk yükseklğinn koordinatı olan this.y = canvasın yükseklği - fg yüksekliği - kuşun boyunun yarısı koordinatında olacak, yani kuş hala havada iken yani if true iken oyunun current state i game olacak aksi durumda kuş düşmüş olacağından oyunun statei over olacak */
      //3. adım bird rotation için oyunun state.current ı game olduğunda
      // bu durumda ekranan click lendikçe yönü değişmeli yukarı taraflı
      // açısı değişmeli,
      // tıklanmadıkçada aşağıya dögru açı değişmeli
      if (this.y + this.h / 2 >= cvs.height - fg.h) {
        this.y = cvs.height - fg.h - this.h / 2;
        if (state.current == state.game) {
          state.current = state.over;
          DIE.play();
        }
      }
      //yine else in içinde olacağız yani state.current ==
      //state.game deyiz
      //if(this.speed >= this.jump){
      //    this.rotation = 90 * DEGREE;
      //    this.frame = 1; kuş düşüyor kanat çırpmamalı
      //} else {
      //this.rotation = -25 * DEGREE;
      //}
      //bu şekilde game state i içinde kuşun açısını tamamladık
      // eğer speed >= jump ise kuş düşüyor demek
      if (this.speed >= this.jump) {
        this.rotation = 90 * DEGREE;
        this.frame = 1;
      } else {
        this.rotation = -25 * DEGREE;
      }
    }
  },
  speedReset: function () {
    this.speed = 0;
  },
};

//1 get ready message
const getReady = {
  sX: 0,
  sY: 228,
  w: 173,
  h: 152,
  x: cvs.width / 2 - 173 / 2,
  y: 80,

  draw: function () {
    if (state.current == state.getReady) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

//1 game over message
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (state.current == state.over) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// 4 ADIM PIPES
//pipes oluşturma
/*burada da geride kalanlar gibi pipes adnda bir object oluşturmalıyız. burada iki tane boru olacak biri üstte biride alt tarafta, daha sonra boruların ortak özellikleri, w h, iki boru arasındaki boşluk ve hareket için delta x dx yani dahas onra update() ve draw() methodları, sonuçta borularında çizilmesi ve update edilmesi gerekli
        şimdi pipes top ve bottom olmak üzere iki tane ve sağ taraftan ekrana girecek sonrada kuşa doğru yaklaşıyor olacak, bu demektir ki cvs.width x koordinatında olacak yani canvasın genişliğinden başlayacak yani sağ taraftan görünmeye başlayacak her pipes , ekrana girmeye 
        y koordinatı ise random oluşmalı ancak kuşun bulunduğu y ve x pozisyonu dikkate alınmalı, kuşun bulunduğu x belli y ise düşme ve kanat çırpma ile değişiyor
        buna göre maxYPos en fazla -150px olabilir şeklinde ayarladık, üst borunun olabileceği en fazla yükseklik
        Math.random() 0 ile 1 arasında bir rakam verir, iki uç sonuçtan gidersek, Math.random() 0 verirsey koordinatı işlemi -150 * (0 + 1) = -150 y koordinatı olur
        Math.random() 1 verirse -150 * (1 + 1) = -300 y koordinatı olur, yani maxYpos -150 minYPos -300 olur
        
        x : cvs.width;
        y : this.maxYPos * ( Math.random() + 1);

        top position koordinatını bildiğimizde bottom unkini hesaplayabiliriz
        
        ayrıca birde birden fazla pipes olacağı için ve bunlar farklı koordinatlarda olacağı için bunların pozisyonlarını içeren bir array de tutulmaları iyi bir fikir, her yeni pipes ile bu array e eleman eklenir geçilen pipe da silinir, push ile ekleme yapılır, burada ekleme belli bir frame aralığında yapılır



        const pipes = {
            bottom : {
                sX : 502,
                sY : 0
            },

            top : {
                sX: 553,
                sY : 0
            },

            w : 53,
            h : 400,
            gap : 85,
            dx : 2,
            position : [],
            maxYPos : -150,
            update : function(){},
            draw : function(){}
        }

        if(state.current !== state.game)return;
        if(frames % 100 == 0){
            this.position.push(
                {
                    x : cvs.width,
                    y : this.maxYPos * (Math.random() + 1)
                }
            );
        }
        bunun anlamı eğer current state game state e eşit değil ise return diyip duracak, eğer game state de isek frames de 100 tane de bir x ve y koordinatlarını position [] arrayine pushlayacak
        */
//pipes ları çizdirmek
/* 
        iki tane pipe çizdirmemiz gerekiyor biri top diğeri bottom olarak

        ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h,    ,    ,this.w, this.h);

        ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h,    ,    ,this.w, this.h);

        bunları çizdirirken oluşturduğumuz pipe lerın positionlarının tutulduğu position[] array inden faydalanmalıyız bu döngünün içine biraz önce ykarıda yazdığımız pipes larda gelecek

            draw : function(){
        for(let i = 0; i < this.position.length, i++){
            
            let p = this.position[i];
            let topYPos =  p.y;
            let bottomYPos = p.y + this.h + this.gap

            
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h,   p.x   ,  topYPos    ,this.w, this.h);

            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h,  p.x  ,   bottomYPos    ,this.w, this.h);
        }
        },

        butun bu kodu da draw methodu içine koyarız bu da pipes nesnesinin draw methodu olur
        */

//move the pipes
/* 
        boruları hareket ettirmek için pipes nesnesinin içine update methodu tanımlarız
        buna göre

        update : function(){
            if(frames % 100 == 0){
                this.position.push(
                    {
                        x : cvs.width,
                        y : this.maxYpos * (Math.random() + 1)
                    }
                );
            }
            for ( let i = 0; i < this.position.length; i++){
                let p = this.position[i];
                p.x -= this.dx;
                // pipes delta x kadar eksilecek 100 frame de bir
                //yani sola doğru gidecek
                //ekran genişliği bitince de arrayden çıkarılacak
                if(p.x + this.w <= 0){
                    this.position.shift();
                    //shift array in ilk elemanını çıkarır
                    //ve bir score kazanırız
                    score.value += 1;
                }
            }
        }

        bunlar sonrasında gobal draw ve update functionlarına dapipes.draw() ve pipes.update() methodlarını eklemeliyiz

        */
const pipes = {
  position: [],

  top: {
    sX: 553,
    sY: 0,
  },

  bottom: {
    sX: 502,
    sY: 0,
  },

  w: 53,
  h: 400,
  gap: 85,
  maxYPos: -150,
  dx: 2,

  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      //top pipe
      ctx.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );
      //bottom pipe
      ctx.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );
    }
  },

  update: function () {
    if (state.current !== state.game) return;

    if (frames % 100 == 0) {
      //her 100 frame de bir position array ine pipes ekleyecek
      console.log(frames);
      console.log(this.position);
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      // pipes delta x kadar eksilecek 100 frame de bir
      //yani sola doğru gidecek
      //ekran genişliği bitince de arrayden çıkarılacak

      //5. ADIM collision detection
      /* 
            collision detection da kuşun kendi alanını kuşun x,y koordinatından bir daire çizerek belirleme ile başlarız.
            daha sonra bu dairenin ölçülerine göre pipes ların koordinatalarını karşılaştırırız 
            eğer bir collision olursa oyunun state ini over yaparız, oyun biter
            */
      let bottomPipeYPos = p.y + this.h + this.gap;
      //top pipe collision
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > p.y &&
        bird.y - bird.radius < p.y + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }
      //bottom pipe collision
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > bottomPipeYPos &&
        bird.y - bird.radius < bottomPipeYPos + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }

      //mobe the pipes to the left
      p.x -= this.dx;
      if (p.x + this.w <= 0) {
        this.position.shift();
        //shift array in ilk elemanını çıkarır
        //ve bir score kazanırız 6. adım ie ilgili
        score.value += 1;
        SCORE_S.play();
        //6. adımdaki score konusundakibest score un hesabplanması ve tutulması ile ilgli konuda burada olacak çünkü score pipes a bağlı bir şey
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  },
  reset: function () {
    this.position = [];
  },
};

//6. Adım
//score
/* 
        score için bir score nesnesi tanımlarız, score oyun esnasında yani state.current == state.game esnasında ekranın üst tarafında tepede görünecek, oyun bittiğinde ise yani state.current == state.over olduğunda ekranda çıkan game over resminin içinde best ile birlikte görünecek, bunun için bize iki tane if lazım, biri oyun esnasında diğeri oyun bittiğinde çalışacak,
        diğer konu best score un tutulması getrilmesi burada best score u hesaplamak için 
        score.best = Math.max(score.value, score.best);
        bunu integer olarak tutmamız gerekiyor
        bunu da parseInt() ile yaparız
        kullanırız, bunu saklamak için local storage kullanırız
        localStorage.setıtem("best", score.best);
        bunu getirmek için
        localStorage.getItem("best");
        
        const score = {
            //best : 0,
            best : parseInt(localStorage.getItem("best") || 0,
            // eğer localde best verisi varsa onu getirir yoksa 0 getirir
            value : 0,
            draw : function(){
                ctx.fillStyle = "#FFF";
                ctx.strokeStyle = "#000";

                if(state.current == state.game){
                    ctx.lineWidth = 2;
                    ctx.font = "35px Teko"
                    ctx.fillText(this.value, cvs.width/2, 50);
                    //ctx.fillText(yazılacak ifade, x, y)
                    ctx.strokeText(this.value, cvs.width/2, 50);

                } else if(state.current == state.over){
                    ctx.font = "25px Teko";
                    ctx.fillText(this.value, 225, 186);
                    ctx.strokeText(this.value, 225, 186);

                }
            }
        }
        
        */

//6. adım score
const score = {
  best: parseInt(localStorage.getItem("best")) || 0,
  value: 0,

  draw: function () {
    ctx.fillStyle = "#FFF";

    if (state.current == state.game) {
      ctx.lineWidth = 2;
      ctx.font = "35px Teko";
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);
    } else if (state.current == state.over) {
      //score value
      ctx.font = "25px Teko";
      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);
      //best score
      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);
    }
  },
  reset: function () {
    this.value = 0;
  },
};

//1 draw
function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  //içinde draw() methodu içeren nesnelerin
  //draw() larını buraya eklemeliyiz
  bg.draw();
  pipes.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();
}

//1 update
function update() {
  //içinde update() methodu barındıran nesnelerin
  // update lerini buraya eklemeliyiz
  bird.update();
  fg.update();
  pipes.update();
}

//1 loop
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}

loop();

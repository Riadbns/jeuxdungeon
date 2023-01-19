//renvoie d'un élément dont id = goUp 
let Up =document.getElementById('goUp');
//renvoie d'un élément dont id = goDown 
let Down =document.getElementById('goDown');
//renvoie d'un élément dont id = goLeft
let Left = document.getElementById('goLeft');
//renvoie d'un élément dont id = goRight
let Right= document.getElementById('goRight');
//renvoie d'un élément dont id = Exitdungeon 
let ExitD= document.getElementById('Exitdungeon');
//renvoie d'un élément dont id = ElementScore
let ElementScore =document.getElementById("ElementScore");
//renvoie d'un élément dont id = sang
let ElementSang= document.getElementById("sang");
//renvoie d'un élément dont id = espace-text
let barText=document.getElementById("espace-text");
//renvoie d'un élément dont id = grille
const cvs = document.getElementById('grille');
//renvoie d'un élément dont id = exitScore
let exitScore = document.getElementById("exitScore");
//renvoie d'un élément dont id = exit
let exit = document.getElementById("exit");
//renvoie d'un élément dont id = btn
let btn = document.getElementById("btn");
//renvoie d'un élément dont id = exitRejouer
let exitRejouer = document.getElementById('exitRejouer');
//declaration et initialisation de la variable sang qui représente l'énergie du héros
let sang=40; 
//déclaratin et initialisation de la variable score qui représente le score du héros
let score=0;
//définition de la methode getContext() qui renvoie un contexte (contexte bidimensionnel) de dessin sur le canevas
const ctx = cvs.getContext('2d');
//déclaration et initialisation de la variable box 
const box = 33;
//déclaration de la grille
let Grille =[];

//attache l'événement'click' à l'élément goUp
Up.addEventListener('click',()=>{
    //appeler la fonction goUp 
    donjon.goUp();
})
//attache l'événement'click' à l'élément goDown
Down.addEventListener('click',()=>{
    //appeler la fonction goDown
    donjon.goDown();
})
//attache l'événement'click' à l'élément goLeft
Left.addEventListener('click',()=>{
    //appeler la fonction goLeft
    donjon.goLeft();
})
//attache l'événement'click' à l'élément goRight
Right.addEventListener('click',()=>{
    //appeler la fonction goRight
    donjon.goRight();
})
//attache l'événement'click' à l'élément Exitdungeon
ExitD.addEventListener('click',()=>{
    //appeler la fonction exit
    donjon.exit();
})


//définition de la fonction insérerTuile()
//cette fonction permet de remplir la grille avec les tuile
const insérerTuile=(nombreT,tuile)=>{
    //remplire la grille avec des tuile dans des cases aléatoire      
   //la variale l représente le nombre des cases qu'il faut remplir
   let l=0;
   do{
       // i,j prendent un nombre aléatoire
       let i = Math.floor(Math.random()*14);//[0;14]
       let j = Math.floor(Math.random()*24);//[0;24]
       //si la grille est tjr =1 alors on remplace le 1 avec tuile
       if(Grille[i][j]===1) {
           Grille[i][j]=tuile;
           l++;
       }
       //sinon continue     
       else {
           continue;
       }
       //on sorte de la boucle lorsque l est >= nombreT(nombretuile) cad lorsque les cases sont remplies
       }while(l<nombreT); 
}

//définition de la fonction dessinerTuile()
//cette fonction permet de dessiner la tuile avec une couleur
const dessinerTuile=(couleur,i,j)=>{
    //donnée a la case une couleur 
    ctx.fillStyle =couleur;
    //déssiner un carré dont le point de départ(j*box,i*box) et la taille(box,box)
    ctx.fillRect(j*box,i*box,box,box);
}

//définition de la fonction CreerGrille()
//cette fonction permet de creer,remplir et dessiner la grille
const CreerGrille=()=>{
    sang=40; 
    score=0;
   //Modifier le contenu HTML de l'élément ElementScore
   ElementScore.innerHTML="Score: "+score;
   
   //définition de la largeur de l'élément ElementSang selon le sang
   ElementSang.style.width=((sang*100)/40)+"%";
   
   //Modifier le contenu HTML de l'élément barText
   barText.innerHTML=sang+"/40";
   
   //déclaration et création de la grille
   //remplire la grille avec des 1 qui représente "les piéges"
           for(let i=0;i<15;i++) {
               Grille[i]=[];
               for(let j=0;j<25;j++) {
                   Grille[i][j]=1;
               }
           }
   //appéler la fonction pour remplir la grill avec des trésors
   //37 représente le nombre de case qu'on veut remplir avec des trésor
   //2 représente le trésor
    insérerTuile(37,2);
   //appéler la fonction pour remplir la grill avec des cadeau
   //3 représente le nombre de case qu'on veut remplir avec des cadeau
   //4 représente le cadeau
    insérerTuile(3,4);   
    //appéler la fonction pour remplir la grill avec des obstacles
   //15 représente le nombre de case qu'on veut remplir avec des obstacles
   //5 représente l'obstacle
    insérerTuile(15,5);

    //appéler la fonction pour remplir la grill avec des bombes
    //5 représente le nombre de case qu'on veut remplir avec des bombes
    //6 représente une bombe
    insérerTuile(5,6);

   //placer le héro au milieu      
   Grille[7][12]=3;
   
   //Définition d'une couleur de remplissage pour chaque case
   //dessine un carré plein pour chaque case selon le point de départ et la taille 
   for(let i=0;i<15;i++) {
       for(let j=0;j<25;j++) {
           //si la case est une piége 
          if(Grille[i][j]===1){
           dessinerTuile("#534B4F",i,j);
          } 
          //sinon si la case est une trésore
          else if(Grille[i][j]===2){
           dessinerTuile("green",i,j);
          }
          //sinon si la case est une héros
          else if(Grille[i][j]===3) {
           dessinerTuile("black",i,j);
          }
          //sinon si la case est une gift(cadeau)
          else if(Grille[i][j]===4) {
            dessinerTuile("#0047AB",i,j);
           }
           //sinon si la case est un obstacle
          else if(Grille[i][j]===5) {
            dessinerTuile("#FF0800",i,j);
           }
           //sinon si la case est une bombe
           else if(Grille[i][j]===6) {
            dessinerTuile("#f5e342",i,j);
           }
          //sinon (case est vide)
          else {
           dessinerTuile("white",i,j);
          }
       }
   }
}

//création de la fonction donjon
const donjon = function(){
    //appeler la fontion CreerGrille()
    CreerGrille();  

    //définition de la fonction verifierCase()
    //cette fonction prend comme parametre les position(i,j) de chaque case dans la grille
    //la fonction permet de vérifier si la case contient un piége ou vide ou trésore  
    //et elle traite l'énergie et le score pour chaque cas  
    const verifierCase = (i, j) =>{
        //si piége
        if(Grille[i][j]===1){
            //diminuer le sang par 1
            sang-=1;
            // si l'énergie est égale a 0
            if(sang===0){
             //apeller la fonction exit 
              donjon.exit();
            }
            if(score>=50){
                //si le score est superieur ou égale a 50 le score diminue par 50
                score=score-50; 
            }
            else{
                //sinon 
                 score=0;
            }
        }
        //sinon si trésor
        else if(Grille[i][j]===2){
            //augmenter le score par 1000
            score=score+1000;
        }
         //sinon si la case est une gift(cadeau)
         else if(Grille[i][j]===4){
            //augmenter le score par 1500
            score=score+1500;
            //si l'énergi est inférieur a 40 augmenter le sang par 1
            if(sang<40){
                sang+=1;
            }
        }
        //sinon si est un obstacle
        else if(Grille[i][j]===5){
            //diminuer le sang par 5
            sang-=5;
            // si l'énergie est inférieur ou égale a 0
            if(sang<=0){
                //éffectuer la valeur 0 a l'attribut sang
                sang=0;
                //appeler la fonction exit()
                donjon.exit();
            }
        }
        //sinon si est une bombe
        else if(Grille[i][j]===6){
            //diminuer le sang par 15
            sang-=15;
            //le score diminue par 500
            score=score-500;
            //si score est inférieur a 500 
            if(score<500){
                //effectuer la valeur 0 au score
                score=0;
            }
            // si l'énergie est inférieur ou égale a 0
            if(sang<=0){
                //éffectuer la valeur 0 a l'attribut sang
                sang=0;
                //appeler la fonction exit()
                donjon.exit();
            }
        }
        //sinon vide
        else{
            if(score>=10){
                //si le score est superieur ou égale a 10 le score diminue par 10
                score=score-10;
            }
            else{
                //sinon effectuer la valeur 0 au score
                score=0;
            }
        }
    }

     //définition de la fonction changercase()
    //cette fonction prend comme parametre les position(n,k) de la case héros 
    //et les positions(i,j)la prochaine case de héro
    //la fonction permet de déplacer le héro vers sa déstination 
    const deplacercase = (i,j,n,k)=>{
            //appeler la fonction verifierCase()
            verifierCase(i,j);
            //changer le contenue html de l'élément ElementScore selon le score
            ElementScore.innerHTML="Score:     "+score;
            //chager la largeur de l'élément ElementSang selon le sang
            ElementSang.style.width=((sang*100)/40)+"%";
            //changer le contenue html de l'élément barText selon le sang
            barText.innerHTML=sang+"/40";
            //la prochaine case (déstination) prend le numéro 3 du héro ainsi que la couleur black  
            Grille[i][j]=3;
            dessinerTuile("black",i,j);
            //la case actuelle prend le numéro 0 du vide ainsi que la couleur white
            Grille[n][k]=0;
            dessinerTuile("white",n,k)         
    }

 return {
        //définition de la fonction exit()
        //cette fonction est permet d'afficher la fenetre exit 
        exit:()=>{
            //Modifier le contenu HTML de l'élément exitScore
            exitScore.innerHTML="Score:"+score;
            //Définition de l'élément exit à etre afficher (la fenetre exit)
            exit.style.display='flex';
            //renvoie des éléments dont class = on  
            document.querySelectorAll(".on").forEach(element => {
                //pour chaque element on va activer le disabled 
                element.disabled=true;
            });

            //attache l'événement'click' à l'élément exitRejouer (bouton rejouer dans la fenetre exit
            exitRejouer.addEventListener('click',()=>{
                //appeler la fonction resetBoard() qui permet de relancer le jeu a nouveau
                donjon.réinitialiserJeu();
                //Définition de l'élément exit à ne pas etre afficher (la fenetre exit)
                exit.style.display='none';

                //renvoie des éléments dont class = on  
                document.querySelectorAll(".on").forEach(element => {
                    //pour chaque element on va désactiver le disabled 
                    element.disabled=false;
                });
            })
        },

        //définition de la fonction goDown()
        //cette fonction permet de traiter le remplacement de héro vers la case en bas  
        goDown: () =>{
            //cherhcer la position du héro dans la grille
            for(let i=0;i<15;i++) {
                for(let j=0;j<25;j++) {
                if(Grille[i][j]===3) {
                    //si la valeur de i+1 ne va pas dépasser la hauteur de la grille
                    if(i+1<15){
                        //appeler la fonction changercase 
                       deplacercase(i+1,j,i,j);
                       //j'ai éffectué la valeur 15 a la variable i pour qu'il puisse sortir la boucle for de i
                       i=15;
                       //sortir de la boucle for de j
                       break;
                    }
                    //sinon exit le jeu
                    else donjon.exit();
                }
                }
            }
        },

        //définition de la fonction goUp()
        //cette fonction permet de traiter le remplacement de héro vers la case en haut 
        goUp: () =>{
            //cherhcer la position du héro dans la grille
            for(let i=0;i<15;i++) {
                for(let j=0;j<25;j++) {
                    if(Grille[i][j]===3) {
                        //si la valeur de i-1 ne va pas dépasser la hauteur de la grille
                        if(i-1>=0){
                          //appeler la fonction changercase 
                          deplacercase(i-1,j,i,j);
                          break;
                        } 
                         //sinon exit le jeu
                        else donjon.exit();
                    }
                   
                
                }
            }
        },

        //définition de la fonction goRight()
        //cette fonction permet de traiter le remplacement de héro vers la case a droite
        goRight: () =>{
            //cherhcer la position du héro dans la grille
            for(let i=0;i<15;i++) {
                for(let j=0;j<25;j++) {
                if(Grille[i][j]===3) {
                    //si la valeur de j+1 ne va pas dépasser la largeur de la grille
                    if(j+1<25){
                        //appeler la fonction changercase
                        deplacercase(i,j+1,i,j);
                        break;     
                    }
                     //sinon exit le jeu
                    else donjon.exit();
                }
                }
            }
        },

        //définition de la fonction goLeft()
        //cette fonction permet de traiter le remplacement de héro vers la case a gauche
        goLeft: () =>{
            //cherhcer la position du héro dans la grille
            for(let i=0;i<15;i++) {
                for(let j=0;j<25;j++) {
                if(Grille[i][j]===3) {
                    //si la valeur de j-1 ne va pas dépasser la largeur de la grille
                    if(j-1>=0){
                        //appeler la fonction changercase
                        deplacercase(i,j-1,i,j);
                            break;
                            
                    }
                     //sinon exit le jeu
                    else donjon.exit();
                }
                }
            }
        },
       //définition de la fonction réinitialiserJeu()
        //cette fonction permet de rénitialiser le jeu a nouveau
        réinitialiserJeu: () => {
            //appeler la fonction CreerGrille()
            CreerGrille();
        }   
    }
}();

//les recources
//https://www.youtube.com/watch?v=9TcU2C1AACw&t=214s
//https://www.youtube.com/watch?v=FDBHLX5HFn0
//https://www.w3schools.com/js/
//laboratoir 12
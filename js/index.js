
const valor = document.querySelector('.valor');
const valorTiempo = document.querySelector('.valorTiempo')
const input = document.getElementById('input')
const botones = document.querySelectorAll('.boton')
const mas = document.querySelectorAll('.mas')
const botonTempo = document.getElementById('iniciarTempo')
let marcarTiempo = document.getElementById('marcarVuelta');

let contador = parseInt(valor.textContent);

let intervalo = 0;
let verificador = false;
let verificadorTemporizador = false;
let verificadorCronometro = false;
let diferencia =[]
let index = 0;
let nombreVuelta = "nombre";
let estadoColor = false;


botones.forEach(boton => {
    boton.addEventListener('click', function(event){
        const botonContador = event.currentTarget.classList;
      
        //CRONOMETRO
        function aumentarContador(){
            contador = parseInt(valor.textContent)
            contador+=(1.00);
            valor.textContent = contador.toFixed(0); 
     
        }

        function disminuirContador(){
            contador = parseInt(valor.textContent)
            contador-=(1.00);
            valor.textContent = contador.toFixed(0); 
        }
// ----------------------------------------------------------------
// ---------------------------------------------------

        function iniciarCronometro(){
            if(verificador==false){
                contador = parseInt(valor.textContent)
                intervalo = setInterval(() => {
                    contador+=0.01;
                    valor.innerHTML = contador.toFixed(2);
                },10);
                verificador=true;
                verificadorTemporizador =true;
            }
            else {
                verificador=false;
                clearInterval(intervalo)
                verificadorTemporizador=false;
            }
        }

        function iniciarTemporizador(){
            if(verificador==false ){
                contador = parseInt(valor.textContent)
                intervalo = setInterval(() => {
                    if(contador > 0.01){
                        contador-=(0.01); 
                        let a = contador.toFixed(2);
                        valor.innerHTML = contador.toFixed(2);
                     
                        if((a==0.01) && (estadoColor==false)){
                            valor.innerHTML = 0;
                            botonTempo.innerText= 'Temporizador Ok';
                            botonTempo.style.color='#D50000';
                            intervaloColor = setInterval(()=>{
                                document.body.style.backgroundColor = 'rgba(255,0,0,0.7)';
                            },1500) 

                            estadoColor= true;
                        }
                        
                    }
                },10);
                verificador=true;
                verificadorCronometro = true;
            }
            else {
                botonTempo.innerHTML= 'Inicio Temporizador';
                botonTempo.style.color='black';
                verificador=false;
                verificadorCronometro = false;
                clearInterval(intervalo)
                clearInterval(intervaloColor);
                document.body.style.backgroundColor = 'black';
                if(estadoColor==true){
                    estadoColor =false;
                }
                
            }
        }
       

        function resetearCronometro(){
            verificador = false;
            contador = 0;
            valor.innerHTML = contador;
            clearInterval(intervalo);
            index = 0;
        }

        function borrarVueltas(){
            while(marcarTiempo.firstChild){
                marcarTiempo.removeChild(marcarTiempo.firstChild)
            }
        }

        function marcarVuelta(){
            if(valor.textContent == 0){
                console.log('inicie el cronometro')
            }
            else{
                let p = document.createElement('ul');
                
                let ultimoArray = diferencia.push(contador.toFixed(2));
                index++; 
                p.innerHTML = `
                 <li> Tiempo :  Vuelta ${index} - ${contador.toFixed(2)} - 
                 ${(diferencia[diferencia.length-1] - ultimoArray ).toFixed(2)} -
                 <span contenteditable="true"> ${nombreVuelta}</>
                 </li>
                `
                ;
                marcarTiempo.appendChild(p)
            }
        }

        //CONTADOR
        if (botonContador.contains('menos')){
            disminuirContador()
        }
        else if(botonContador.contains('mas')){
            aumentarContador()
        }
        else if(botonContador.contains('resetear')){
          resetearCronometro()
        }
        else if(botonContador.contains('iniciar') && (contador >= 0 && (verificadorCronometro==false))){
            iniciarCronometro()
        }
        else if(botonContador.contains('vuelta')){
            marcarVuelta()
        }
        else if(botonContador.contains('borrarVuelta')){
            borrarVueltas()
        }
        else if(botonContador.contains('iniciarTemporizador') && verificadorTemporizador==false){
            iniciarTemporizador()
            
        }
       
       
  
    })
})




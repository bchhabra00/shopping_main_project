
stateselect=document.getElementById('stateselect');
let button=document.getElementById('btn-estimate')
let convert=document.getElementById('convert');

// convert.addEventListener('click',converter)
document.addEventListener('DOMContentLoaded',function(){
let timer=document.getElementById('time');


setInterval(timeclock,1000)
function timeclock (){
date = new Date();
let hours=date.getHours();
let pm='AM';
let minutes=date.getMinutes();
let seconds=date.getSeconds();
if(hours>12){

  hours=hours-12;
  pm='PM';
}
else if(hours===0){

  hours=12;
}
if(minutes<10){

  minutes="0" + minutes;
}
if(seconds<10){

  seconds="0" + seconds;
}

timer.innerHTML="Time:" + hours + ':' + minutes + ':'+ seconds +''+'' + pm;
console.log('Timer');
}



})





 let from="USD"
document.addEventListener('DOMContentLoaded',function(e){
document.getElementById('add-to-cart').addEventListener('submit',estimate)


button.disabled=true;
stateselect.addEventListener('change',function(){
    
	if (stateselect.value ===''){

		button.disabled=true;
	}
	else{

		button.disabled=false;
	}
})
e.preventDefault();

})


stateselect.setAttribute('required','required')
function estimate(e){
	console.log('ello');
     if(stateselect.value ===''){

     	alert('Please Choose your Shipping state');

     	stateselect.focus();
        
        

     	
     }
    let item=Number(document.getElementById('quantity').value);
        let item2=Number(document.getElementById('quantity2').value);
        let item3=Number(document.getElementById('quantity3').value);
        let totalitems=item + item2 + item3;

        let conclude=document.getElementById('estimate');
        let shippingstate=stateselect.value;
        let tax;
        let ls=localStorage;

        let itemprice=(90*item)+(40*item2)+(80*item3);
        let shippingeachitem;
        console.log(itemprice);
        let shippingmethod=document.querySelector('[name=shipmethod]:checked').value;
        console.log(item,item2,item3,shippingstate,shippingmethod);

         switch(shippingstate){
          case 'ON':
          tax=1.05;
          break;
          case 'BC':
          tax=1.032;
          break;
          case'OT':
          tax=1;
          break;
          case 'MT':
          tax=1.025;
          break;
          default:
          tax=1;
         }
        
        switch(shippingmethod){
           case 'mail':
           shippingeachitem=2;
           break;
           case 'ups':
           shippingeachitem=3;
           break;
           default:
           shippingeachitem=0;
           break;
        }

        totalshippingcost=Number(totalitems * shippingeachitem);
        console.log(totalshippingcost);
        let fromamount=Number((itemprice*tax) +  totalshippingcost).toFixed(2);
        value=from + fromamount;
       
                          total = "Total Price:" + value;
conclude.innerHTML=total
      
         console.log(conclude);
         // converter(fromamount);

let to = document.getElementById('to').value;
let url="https://api.fixer.io/latest?symbols=" + from + ',' + to;

console.log('hello')
let ourrequest= new XMLHttpRequest();
ourrequest.open("GET",url,true);
ourrequest.onreadystatechange= function(){
    if (this.readyState == 4 && this.status == 200 ){
    let data=JSON.parse(ourrequest.responseText);
    console.log(data);
     let tonum = Number(data.rates[to]) 
    let fromnum = Number(data.rates[from])


    if(to==='select'){
      output.innerHTML="";

    }
    else{
     output.innerHTML=fromamount + from + '=' + ((tonum/fromnum)*fromamount).toFixed(2) + to;
   
}

}

localStorage.setItem('total',JSON.stringify(value))
let ls = localStorage.getItem('total');


// function converter(fromamount){





}
ourrequest.send();
e.preventDefault();
}



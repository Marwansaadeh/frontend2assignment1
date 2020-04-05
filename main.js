async function MainMethod()
    {
        
    GetData()
    .then(postlist=>
    {
        current_date = new Date()
               console.log(Math.abs(current_date-Date.parse(JSON.parse(localStorage.getItem('fetchdatahour'))))/3600000);
        if(localStorage.getItem('CurrencyApi')===null)
        {
           fetch_date = new Date()
           localStorage.getItem('fetchdatahour');
           localStorage.setItem('fetchdatahour',JSON.stringify(fetch_date));
           
           localStorage.setItem('CurrencyApi',JSON.stringify(postlist))

        }

        if (localStorage.getItem('CurrencyApi')!=null&& Math.abs(current_date-Date.parse(JSON.parse(localStorage.getItem('fetchdatahour'))))/3600000>1)
        {   
        fetch_date = new Date()
        localStorage.setItem('fetchdatahour',JSON.stringify(fetch_date));
        localStorage.setItem('CurrencyApi',JSON.stringify(postlist))
        console.log('fetched');
        }

    }).catch(erro=>{
        alert(erro);       
    }
    )
    }
    
MainMethod()
function Filldatafromstorage()
{
 
    let data=(JSON.parse(localStorage.getItem('CurrencyApi')));
    
    let firstvalue=document.getElementById('firstvalue');
    var opt = document.createElement('option');
    opt.innerHTML =data.base;
    opt.value = data.base;
    firstvalue.appendChild(opt);
     
    for(let item in data.rates)
    {
       
            let secondvalue=document.getElementById('secondvalue');
            let currentRate =data.rates[item];
            var opt = document.createElement('option');
            let country= item;
           opt.innerHTML = country;
           opt.value = currentRate;

           secondvalue.appendChild(opt);
    }
}

Filldatafromstorage()



async function GetData()
{
    let url="https://api.exchangeratesapi.io/latest?base=SEK";
    return await fetch(url)
    .then(response=>
        {
            if(!response.ok)
            {
                throw new Error("some thing went wrong with calling the method");
            }
         return response.json()
        }
        
        )
    
}



function calculator()
{  
    let selectedcurrancyrate = document.getElementById("secondvalue").value;
    let amount =document.getElementById('firstvalueamount').value;
   document.getElementById("secondvalueamount").innerHTML=selectedcurrancyrate;
   
}
calculator() 

 document.getElementById("btn").addEventListener("click", function(event){
    let selectedcurrancyrate = document.getElementById("secondvalue").value;
    let amount =document.getElementById('firstvalueamount').value;
   document.getElementById("secondvalueamount").innerHTML=selectedcurrancyrate;
    document.getElementById('totalamount').innerHTML=amount*selectedcurrancyrate;
        event.preventDefault()
});
  const BASE_URL=  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
   console.log(dropdowns);
   
  const btn = document.querySelector("form button");
   console.log(btn);
   
  const formCurr = document.querySelector(".form select");
  console.log(formCurr);
  
  const toCurr = document.querySelector(".to select");
   console.log(toCurr);
   
  const msg = document.querySelector(".msg");
   console.log(msg);
   



 for (let select of dropdowns) {
    for ( let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
   if(select.name === "from" && currCode === "USD") {
       newOption.select = "selected";
   } else if (select.name === "to" && currCode === "INR") {
        newOption.select = "selected"; 
    }

    select.append(newOption);
 }


 select.addEventListener("change", (evt) => {
   updateFlag(evt.target);
  })
  }


  const updateFlag = (element) => {
   console.log(element);
   let currCode = element.value;
   console.log(currCode);
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img =  element.parentElement.querySelector("img");
   img.src = newSrc;
  }


  btn.addEventListener("click",  (evt) => {
     evt.preventDefault ();
     updateExchangeRate();
   
  })

   const updateExchangeRate = async ()  => {
     let amount = document.querySelector(".amount input");
     let amtVal = amount.value;
     if ( !amtVal  || amtVal < 1) {
         amtVal = 1;
         amount.value = "1";
     }

     let fromValueLower = formCurr.value.toLowerCase();
      console.log(fromValueLower);
      

     let toValueLower = toCurr.value.toLowerCase();
     console.log(toValueLower);
    
     const URL = `${BASE_URL}/${fromValueLower}.json`;
     let response = await fetch (URL); 
     let data = await response.json();

     
     let date = data["date"];
       console.log(data);
       
     let fromCurrObj = data[fromValueLower];
       
     let rate = fromCurrObj[toValueLower];
     console.log(rate);  

    let finalAmount = amtVal * rate;
   msg.innerText = `${amtVal} ${fromValueLower} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
   }

   window.addEventListener("load" , () => {
   updateExchangeRate();
  })



  


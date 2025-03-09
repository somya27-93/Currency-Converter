const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdown=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let tocurr=document.querySelector(".to select")
let fromcurr=document.querySelector(".from select");
let msg=document.querySelector(".msg");

for(let select of dropdown){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        if(select.name==="from" && code==="USD"){
            newoption.selected=code;
        }
        if(select.name==="to" && code==="INR"){
            newoption.selected=code;
        }
        select.append(newoption);
     
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(ele)=>{
    let currcode=ele.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = ele.closest(".from, .to").querySelector("img");
    img.src=newsrc;
}
const updateexchange=async()=>{
    let amount=document.querySelector(".amount input")
    let amtvalue=amount.value;
    if(amtvalue===""|| amtvalue<=0){
         amount.value=1;
        amtvalue = 1;
         //amount.value = "1";//change in the input field ,suppose zero case as input
    }
    // console.log(fromcurr.value.toLowerCase())
     const url=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
     let response=await fetch(url);
     let data= await response.json();
     let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
     let finalamt=amtvalue * rate;
     msg.innerText=`${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`; //1USD = 87INR

}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateexchange();
})
window.addEventListener("load", () => {
    updateexchange();
  })
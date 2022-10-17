let timer = setInterval(function updateTimer() {
   let future = Date.parse("october 30, 2022 21:49:00");
   let now = new Date();
   let diff = future - now;

   let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
   let hours = Math.floor(diff / (1000 * 60 * 60));
   let mins = Math.floor(diff / (1000 * 60));
   let secs = Math.floor(diff / 1000);

   let y = years;
   let d = days - years * 365;
   let h = hours - days * 24;
   let m = mins - hours * 60;
   let s = secs - mins * 60;

   console.log(`Осталось ${y} лет; ${d} дней; ${h} часов; ${m} минут; ${s} секунд`)
   
   if (y===0 && d===0 && h===0 && m===0 && s===0){
      clearInterval(timer);
      console.log("Стоп таймер");
   };

   if (y<0){
      clearInterval(timer);
      console.log("Мы не можем прыгать в прошлое)");
      return;
   };
  ;
}, 1000);
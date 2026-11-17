
(function(){
  var cfg=window.SW_CONFIG;
  document.querySelectorAll('.buy').forEach(function(a){
    var link=a.getAttribute('data-plan')==='yearly'?cfg.stripeYearly:cfg.stripeMonthly;
    if(link&&link.indexOf('http')===0){a.href=link;}
    else{a.addEventListener('click',function(ev){ev.preventDefault();
      document.getElementById('checkout-note').textContent='Membership enrollment opens at launch. Prices are set: $'+cfg.priceMonthly+'/month or $'+cfg.priceYearly+'/year, paid securely through Stripe.';});}
  });
})();

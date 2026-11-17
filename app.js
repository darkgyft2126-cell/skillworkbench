
(function(){
  var q=document.getElementById('q'),fc=document.getElementById('fcat'),fl=document.getElementById('flevel');
  var cards=[].slice.call(document.querySelectorAll('.card'));
  var none=document.getElementById('noresults');
  function apply(){
    var s=(q.value||'').toLowerCase(), c=fc.value, l=fl.value, shown=0;
    cards.forEach(function(card){
      var ok=(!s||card.getAttribute('data-search').indexOf(s)>-1)
        &&(!c||card.getAttribute('data-category')===c)
        &&(!l||card.getAttribute('data-level')===l);
      card.style.display=ok?'':'none'; if(ok)shown++;
    });
    if(none)none.hidden=shown>0;
  }
  [q,fc,fl].forEach(function(el){el.addEventListener('input',apply);el.addEventListener('change',apply);});
  var form=document.getElementById('suggest-form');
  if(form){form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var msg=document.getElementById('sug-msg');
    var topic=document.getElementById('sug-topic').value.trim();
    var email=document.getElementById('sug-email').value.trim();
    if(!topic){msg.textContent='Please write a topic first.';return;}
    fetch(window.SW_CONFIG.apiBase+'/suggest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,topic:topic})})
      .then(function(r){if(!r.ok)throw 0;msg.textContent='Thank you — your suggestion is recorded.';form.reset();})
      .catch(function(){msg.textContent='The suggestion box opens when the member service launches. Thank you for the idea — please check back at launch.';});
  });}
})();

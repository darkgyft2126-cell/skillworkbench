
(function(){
  var cfg=window.SW_CONFIG, KEY='sw_token';
  var note=document.getElementById('api-note');
  function token(){return localStorage.getItem(KEY);}
  function api(path,opts){opts=opts||{};opts.headers=opts.headers||{};
    if(token())opts.headers['Authorization']='Bearer '+token();
    return fetch(cfg.apiBase+path,opts).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});});}
  function showMember(u){
    document.getElementById('auth-box').hidden=true;
    var box=document.getElementById('member-box');box.hidden=false;
    document.getElementById('member-status').textContent=u.member
      ?'Membership active ('+(u.subscription&&u.subscription.plan||'member')+'). Every course on the shelf is open to you.'
      :'Signed in as '+u.email+'. You do not have an active membership yet — see Subscribe to open the shelf.';
    var ul=document.getElementById('my-courses');ul.innerHTML='';
    (window.SW_SHELF||[]).forEach(function(c){
      var li=document.createElement('li');
      li.innerHTML='<a href="courses/'+c.id+'.html"></a> — '+c.lessons+' lessons';
      li.querySelector('a').textContent=c.title;ul.appendChild(li);});
  }
  function showAuth(){document.getElementById('auth-box').hidden=false;document.getElementById('member-box').hidden=true;}
  if(token()){api('/me').then(function(r){if(r.ok)showMember(r.j.user);else{localStorage.removeItem(KEY);showAuth();}})
    .catch(function(){note.textContent='The member service could not be reached just now. Please try again in a little while.';showAuth();});}
  document.getElementById('login-form').addEventListener('submit',function(ev){ev.preventDefault();
    var msg=document.getElementById('li-msg');
    fetch(cfg.apiBase+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.getElementById('li-email').value,password:document.getElementById('li-pass').value})})
    .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||'sign in failed');localStorage.setItem(KEY,j.token);showMember(j.user);});})
    .catch(function(e){msg.textContent=e.message==='Failed to fetch'?'The member service could not be reached just now. Please try again in a little while.':e.message;});});
  document.getElementById('register-form').addEventListener('submit',function(ev){ev.preventDefault();
    var msg=document.getElementById('rg-msg');
    fetch(cfg.apiBase+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.getElementById('rg-email').value,password:document.getElementById('rg-pass').value})})
    .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||'registration failed');localStorage.setItem(KEY,j.token);showMember(j.user);});})
    .catch(function(e){msg.textContent=e.message==='Failed to fetch'?'The member service could not be reached just now. Please try again in a little while.':e.message;});});
  document.getElementById('logout-btn').addEventListener('click',function(){
    api('/auth/logout',{method:'POST'}).catch(function(){});localStorage.removeItem(KEY);showAuth();});
})();

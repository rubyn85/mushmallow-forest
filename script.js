/* OUR MUSHMALLOW FOREST — website behaviour ♡
   Your memories and settings live in data.js, NOT here.
   No backend, accounts or paid services are required.
*/
(() => {
  'use strict';
  const data = window.SITE_DATA;
  if (!data) { console.error('Missing data.js — please upload both data.js and script.js.'); return; }
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const html = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeSrc = value => { const src = String(value || '').trim(); return /^(?:images\/|assets\/|https:\/\/)[^<>"']+$/i.test(src) ? src : ''; };
  const iconSet = ['✿','♡','✦','☼','✧','♥','☆','❀'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const start = new Date(data.relationship.startDate);
  const hasValidStart = !Number.isNaN(start.getTime());
  let toastTimeout;
  let activeGallery = [...data.gallery];
  let galleryIndex = 0;

  function notify(message) {
    const el = $('#toast'); el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('show'), 3000);
  }
  function parseLocalDate(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getFullYear() === +m[1] && d.getMonth() === +m[2]-1 && d.getDate() === +m[3] ? d : null;
  }
  function dateLabel(raw) {
    const d = parseLocalDate(raw);
    if (!d) return 'A day to remember';
    return d.toLocaleDateString('en-AU', {day:'numeric',month:'long',year:'numeric'});
  }
  const withLeadingZero = n => String(n).padStart(2, '0');
  function addCalendarMonths(date, number) {
    const anchor = date.getDate();
    const result = new Date(date);
    result.setDate(1); result.setMonth(result.getMonth() + number);
    const lastDay = new Date(result.getFullYear(), result.getMonth()+1, 0).getDate();
    result.setDate(Math.min(anchor,lastDay));
    return result;
  }
  function breakdown(now) {
    if (!hasValidStart || now < start) return [0,0,0,0,0,0];
    let yrs = now.getFullYear() - start.getFullYear();
    while (addCalendarMonths(start, yrs * 12) > now) yrs--;
    let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth() - yrs * 12;
    while (addCalendarMonths(start, yrs * 12 + months) > now) months--;
    while (months >= 12) { yrs++; months -= 12; }
    let cursor = addCalendarMonths(start, yrs * 12 + months);
    let days = 0;
    while (true) {
      const next = new Date(cursor);
      next.setDate(next.getDate()+1);
      if (next > now) break;
      days++; cursor = next;
      if (days > 32) break;
    }
    const ms = Math.max(0,now-cursor);
    return [yrs,months,days,Math.floor(ms/3600000),Math.floor(ms/60000)%60,Math.floor(ms/1000)%60];
  }
  function nextAnnual(month, day, now = new Date()) {
    const thisYear = new Date(now.getFullYear(),month-1,day);
    if (thisYear.getMonth() !== month-1 || thisYear.getDate() !== day) return null;
    const isToday = thisYear.toDateString() === now.toDateString();
    return {date: thisYear < new Date(now.getFullYear(),now.getMonth(),now.getDate()) ? new Date(now.getFullYear()+1,month-1,day) : thisYear,isToday};
  }
  function updateClock() {
    const numbers = breakdown(new Date());
    $$('#loveCounter b').forEach((el, i) => { const str=withLeadingZero(numbers[i]); if(el.textContent!==str) el.textContent=str; });
    if (!hasValidStart) { $('#nextAnniversary').textContent='Set your relationship start date in data.js ♡'; return; }
    const now = new Date();
    const anniversary=nextAnnual(start.getMonth()+1,start.getDate(),now);
    if (!anniversary) return;
    const label = $('#nextAnniversary');
    if (anniversary.isToday) { label.textContent="Happy anniversary, little lovebirds! ♡"; return; }
    const delta = Math.max(0,anniversary.date - now);
    const days=Math.floor(delta/86400000),hours=Math.floor(delta%86400000/3600000),mins=Math.floor(delta%3600000/60000);
    label.textContent=`Next anniversary in ${days} days, ${hours} hours & ${mins} mins ♡`;
  }
  function placeholder(item, small = false) {
    const theme = ['peach','blue','butter','mint','lavender','rose'].includes(item.theme)?item.theme:'peach';
    const symbol = item.emoji || iconSet[Math.abs(String(item.id||'').length)%iconSet.length];
    return `<div class="placeholder theme-${theme}"><span class="placeholder-graphic" aria-hidden="true">${html(symbol)}</span><span class="placeholder-label">${small ? 'your photo ♡' : 'add your photo here ♡'}</span></div>`;
  }
  function renderPhoto(item, small=false) {
    const src=safeSrc(item.image);
    return src ? `<img src="${html(src)}" alt="${html(item.caption||item.title||item.destination||'A photo from our story')}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Photo not found — check the image path in data.js',className:'photo-error'}))">` : placeholder(item,small);
  }
  function renderTimeline() {
    $('#timeline').innerHTML=data.timeline.map((item,index)=>`<article class="timeline-row reveal"><div class="timeline-dot" aria-hidden="true"></div><div class="timeline-photo">${renderPhoto(item,true)}</div><div class="timeline-card"><span class="date-label">${html(item.date ? dateLabel(item.date) : item.category || 'add your date')}</span><h3>${html(item.title)}</h3><p>${html(item.description)}</p>${item.location ? `<span class="timeline-location">⌁ ${html(item.location)}</span>`:''}</div></article>`).join('');
  }
  const categories=['All memories','Dates','Travel adventures','Food adventures','Everyday happiness','Special occasions'];
  function renderGalleryFilters() {
    $('#galleryFilters').innerHTML=categories.map((cat,i)=>`<button type="button" class="filter-button${i===0?' active':''}" data-filter="${html(cat)}" aria-pressed="${i===0?'true':'false'}">${html(cat)}</button>`).join('');
    $('#galleryFilters').addEventListener('click',e=>{
      const btn=e.target.closest('[data-filter]'); if(!btn) return;
      $$('#galleryFilters button').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
      const cat=btn.dataset.filter;
      activeGallery=cat==='All memories'?[...data.gallery]:data.gallery.filter(item=>item.category.toLowerCase()===cat.toLowerCase());
      renderGallery();
    });
  }
  function renderGallery() {
    const rotations=['-4deg','3deg','-2deg','5deg','2deg','-4deg','4deg','-2deg'];
    $('#galleryGrid').innerHTML=activeGallery.length?activeGallery.map((item,i)=>`<button type="button" class="polaroid" style="--rotation:${rotations[i%rotations.length]}" data-photo="${i}" aria-label="Open photo: ${html(item.caption)}"><span class="tape" aria-hidden="true"></span><span class="photo-area" style="display:block">${renderPhoto(item,true)}</span><span class="polaroid-caption"><span style="display:block" class="polaroid-caption-script">${html(item.caption)}</span><small>${html(item.date ? dateLabel(item.date):item.category)}</small></span></button>`).join(''):'<p>No photos in this category yet. Add some in data.js ♡</p>';
    // Apply the same handwritten Polaroid caption treatment to the button-based cards.
    $$('.polaroid-caption-script').forEach(el=>{el.style.font='500 24px/1.1 var(--hand)';el.style.color='#7c625a';el.style.padding='15px 6px 4px';el.style.minHeight='46px';});
  }
  function showDialog(dialog) { if (typeof dialog.showModal === 'function') dialog.showModal(); }
  function openLightbox(index) {
    if (!activeGallery.length) return;
    galleryIndex=(index+activeGallery.length)%activeGallery.length;
    const item=activeGallery[galleryIndex];
    $('#lightboxArt').innerHTML=renderPhoto(item);
    $('#lightboxTitle').textContent=item.caption;
    $('#lightboxMeta').textContent=(item.date?dateLabel(item.date)+'  ·  ':'')+item.category;
    $('#lightboxCount').textContent=`${galleryIndex+1} / ${activeGallery.length}`;
    if (!$('#lightbox').open) showDialog($('#lightbox'));
  }
  function renderTravel() {
    $('#travelGrid').innerHTML=data.adventures.map(item=>`<article class="postcard"><div class="postcard-image">${renderPhoto(item)}<span class="postcard-stamp">${html(item.stamp||'✦')}</span></div><div class="postcard-details"><span class="postcard-dates">${html(item.dates)}</span><h3>${html(item.destination)}</h3><p>${html(item.description)}</p></div></article>`).join('');
  }
  function renderReasons() {
    $('#reasonsGrid').innerHTML=data.reasons.map((reason,i)=>`<button type="button" class="reason-card" data-reason="${i}" aria-label="Open little love note ${i+1}"><span class="reason-number">NOTE NO. ${withLeadingZero(i+1)}</span><span class="envelope" aria-hidden="true"></span><span class="reason-action">open me ♡</span></button>`).join('');
  }
  function openReason(index) {
    const text=data.reasons[index]; if (!text) return;
    $('#noteDialogText').textContent=text;
    showDialog($('#noteDialog'));
  }
  function renderLetters() {
    $('#letterStack').innerHTML=data.letters.map((l,i)=>`<button class="letter-item" type="button" data-letter="${i}" aria-label="Read ${html(l.title)}"><span class="letter-date">${html(l.date)}</span><h3>${html(l.title)}</h3><p>${html(l.preview)}</p><span class="letter-seal" aria-hidden="true">♥</span></button>`).join('');
  }
  function openLetter(index) {
    const l=data.letters[index];if(!l)return;
    $('#letterDialogDate').textContent=l.date;
    $('#letterDialogTitle').textContent=l.title;
    $('#letterDialogBody').textContent=l.body;
    showDialog($('#letterDialog'));
  }
  const STORE_KEY='our-mushmallow-forest-bucket-v1';
  function getBucketState() {
    try { const stored=JSON.parse(localStorage.getItem(STORE_KEY)||'{}'); return stored&&typeof stored==='object'&&!Array.isArray(stored)?stored:{}; }
    catch { return {}; }
  }
  function setBucketState(state) { try {localStorage.setItem(STORE_KEY,JSON.stringify(state));return true;}catch{return false;} }
  function renderBucket() {
    const state=getBucketState();
    $('#bucketList').innerHTML=data.bucketList.map(item=>{
      const entry=state[item.id];
      const checked=Boolean(entry&&entry.checked);
      return `<label class="bucket-item"><input type="checkbox" data-bucket="${html(item.id)}" ${checked?'checked':''}><span><span class="bucket-text">${html(item.text)}</span>${checked&&entry.completedAt?`<span class="bucket-date">Done on ${html(entry.completedAt)} ♡</span>`:''}</span></label>`;
    }).join('');
    updateProgress(state);
  }
  function updateProgress(state) {
    const total=data.bucketList.length;
    const completed=data.bucketList.filter(item=>state[item.id]?.checked).length;
    const percent=total?Math.round(completed/total*100):0;
    $('#progressBadge').textContent=`${completed} / ${total} done`;
    $('#progressFill').style.width=percent+'%';
    $('#progressTrack').setAttribute('aria-valuenow',String(percent));
  }
  function renderSpecialDates() {
    const now=new Date();
    const entries=data.specialDays.map(item=>{
      const match=/^(\d{2})-(\d{2})$/.exec(item.monthDay||'');
      if(!match)return null;
      const month=+match[1],day=+match[2];
      const event=nextAnnual(month,day,now);
      return event?{...item,month,day,when:event.date,isToday:event.isToday}:null;
    }).filter(Boolean).sort((a,b)=>a.when-b.when);
    $('#specialDaysList').innerHTML=entries.map(item=>{
      const away=Math.max(0,Math.round((Date.UTC(item.when.getFullYear(),item.month-1,item.day)-Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000));
      return `<div class="date-entry"><div class="date-square"><b>${withLeadingZero(item.day)}</b><span>${MONTHS[item.month-1]}</span></div><div><h3>${html(item.emoji)} ${html(item.name)}</h3><p>${html(item.note||'A very special day')}</p><small>${item.isToday?'It’s today! Celebrate! ♡':away+' days to go ♡'}</small></div></div>`;
    }).join('')+`<p class="date-placeholder">✎ Add birthdays & other special dates in data.js</p>`;
  }
  function confetti(origin = null, count=28) {
    const r=origin?.getBoundingClientRect();
    const x=r?r.left+r.width/2:innerWidth/2;
    const y=r?r.top+r.height/2:innerHeight/2;
    const shapes=['♥','✧','✦','•','✿'];
    for(let i=0;i<count;i++){
      const piece=document.createElement('span');piece.className='confetti-piece';piece.textContent=shapes[i%shapes.length];
      piece.style.left=x+'px';piece.style.top=y+'px';piece.style.color=['#eaa4ae','#dbbd7b','#a9cad5','#b1cbb5'][i%4];
      piece.style.fontSize=(13+Math.random()*14)+'px';piece.style.setProperty('--dx',(Math.random()-.5)*440+'px');piece.style.setProperty('--dy',(-60-Math.random()*250)+'px');
      document.body.appendChild(piece);setTimeout(()=>piece.remove(),980);
    }
  }
  function revealSetup() {
    const els=$$('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('visible'));return;}
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}
    },{threshold:.07});els.forEach(el=>observer.observe(el));
  }
  function setupNav() {
    const toggle=$('.mobile-menu-toggle'),menu=$('#mainMenu');
    toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
    $$('#mainMenu a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
    if ('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
        if(entry.isIntersecting){$$('.menu-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}
      });},{rootMargin:'-25% 0px -65% 0px'});
      ['story','memories','adventures','letters','future'].forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el);});
    }
  }
  function setupMusic() {
    const audio=$('#bgMusic'),toggle=$('#musicToggle'),volume=$('#musicVolume');
    audio.volume=.32;
    volume.addEventListener('input',()=>audio.volume=Number(volume.value)/100);
    toggle.addEventListener('click',async()=>{
      if(audio.paused){try{await audio.play();toggle.setAttribute('aria-pressed','true');$('#musicIcon').textContent='♫';$('#musicLabel').textContent='pause our song';}catch{notify('Unable to play audio on this device. ♡');}}
      else{audio.pause();toggle.setAttribute('aria-pressed','false');$('#musicIcon').textContent='♫';$('#musicLabel').textContent='play our song';}
    });
    audio.addEventListener('error',()=>notify('Check the audio/forest-lullaby.wav file.'));
  }
  function setupDialogs() {
    $$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>{const d=document.getElementById(btn.dataset.close);if(d?.open)d.close();}));
    $$('.popup-dialog').forEach(dialog=>dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));
    document.addEventListener('keydown',event=>{
      if(!$('#lightbox').open)return;
      if(event.key==='ArrowRight')openLightbox(galleryIndex+1);
      if(event.key==='ArrowLeft')openLightbox(galleryIndex-1);
    });
    $('#lightboxPrev').addEventListener('click',()=>openLightbox(galleryIndex-1));
    $('#lightboxNext').addEventListener('click',()=>openLightbox(galleryIndex+1));
    let touchX=null;
    $('#lightbox').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX;},{passive:true});
    $('#lightbox').addEventListener('touchend',e=>{
      if(touchX===null)return;
      const difference=e.changedTouches[0].screenX-touchX;
      if(Math.abs(difference)>65)openLightbox(galleryIndex+(difference<0?1:-1));
      touchX=null;
    },{passive:true});
  }
  function setupEvents() {
    $('#galleryGrid').addEventListener('click',e=>{const btn=e.target.closest('[data-photo]');if(btn)openLightbox(+btn.dataset.photo);});
    $('#reasonsGrid').addEventListener('click',e=>{const btn=e.target.closest('[data-reason]');if(btn)openReason(+btn.dataset.reason);});
    $('#randomReason').addEventListener('click',()=>openReason(Math.floor(Math.random()*data.reasons.length)));
    $('#letterStack').addEventListener('click',e=>{const btn=e.target.closest('[data-letter]');if(btn)openLetter(+btn.dataset.letter);});
    $('#bucketList').addEventListener('change',e=>{
      const input=e.target.closest('[data-bucket]');if(!input)return;
      const state=getBucketState();
      if(input.checked){state[input.dataset.bucket]={checked:true,completedAt:new Date().toLocaleDateString('en-AU')};confetti(input,18);}
      else delete state[input.dataset.bucket];
      if(!setBucketState(state))notify('Your browser is not saving changes.');
      renderBucket();
    });
    $('#counterHeart').addEventListener('click',e=>{confetti(e.currentTarget,24);notify('A little heart, just for you ♡');});
    $('#secretStar').addEventListener('click',()=>{ $('#secretDialogText').textContent=data.relationship.secretMessage;showDialog($('#secretDialog'));confetti($('#secretStar'),35);});
  }
  function init() {
    $('#heroSubtitle').textContent=data.relationship.heroLine;
    $('#closingNote').textContent=data.relationship.closingNote;
    $('#footerYear').textContent=new Date().getFullYear();
    document.title=data.relationship.websiteTitle+' ♡';
    renderTimeline();renderGalleryFilters();renderGallery();renderTravel();renderReasons();renderLetters();renderBucket();renderSpecialDates();updateClock();
    setupEvents();setupDialogs();setupNav();setupMusic();revealSetup();
    setInterval(updateClock,1000);
    // Refresh special-date labels after the date changes without needing a page reload.
    setInterval(renderSpecialDates,60*60*1000);
    if (hasValidStart&&new Date().getMonth()===start.getMonth()&&new Date().getDate()===start.getDate()) {
      setTimeout(()=>notify('Happy anniversary! Our forest is celebrating ♡'),1000);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

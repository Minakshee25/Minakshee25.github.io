
(()=>{
 const root=document.documentElement, button=document.getElementById('theme-button');
 const moon='<svg viewBox="0 0 24 24"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.6 8.6 0 1 0 20.5 14.7Z"/></svg>';
 const sun='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';
 button.addEventListener('click',()=>{const light=root.dataset.theme!=='light';root.dataset.theme=light?'light':'dark';button.innerHTML=light?sun:moon;});
 const menuButton=document.getElementById('mobile-menu'), nav=document.getElementById('site-nav');
 menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
 const links=[...nav.querySelectorAll('a')]; const sections=links.map(a=>document.querySelector(a.getAttribute('href')));
 function mark(){let selected=-1;const threshold=window.scrollY+window.innerHeight*.28;for(let i=0;i<sections.length;i++)if(sections[i].getBoundingClientRect().top+window.scrollY<=threshold)selected=i; if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-20)selected=links.length-1;links.forEach((a,i)=>a.classList.toggle('active',i===selected));}
 window.addEventListener('scroll',mark,{passive:true});mark();




 const entries=JSON.parse(document.getElementById('explorer-data').textContent);
 const shelves=[{"id":"genai","title":"Generative AI","desc":"LLMs, retrieval, adaptation and evaluation","indexes":[0,1,3,4]},{"id":"nlp","title":"Language & Multimodal","desc":"NLP, sign language and multimodal understanding","indexes":[0,3,5,6,7,8]},{"id":"vision","title":"Vision & Perception","desc":"Visual understanding and interactive ML","indexes":[5,7,8,9,10]},{"id":"systems","title":"ML Systems & Research","desc":"Production, time series, reliable inference and investigation","indexes":[1,2,4,10,11,12,13]}];
 const openGrid=document.getElementById('v17-open-grid');
 const modal=document.getElementById('v17-project-dialog');
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const make=(tag,cls,content)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(content!==undefined)x.textContent=content;return x;};
 function showProject(index){
   const p=entries[index];
   document.getElementById('v17-modal-img').src=p.cover;
   document.getElementById('v17-modal-title').textContent=p.title;
   document.getElementById('v17-modal-meta').textContent=p.domain+' · '+p.meta;
   document.getElementById('v17-modal-summary').textContent=p.summary;
   document.getElementById('v17-modal-impact').textContent=p.impact;
   const tags=document.getElementById('v17-modal-tags');tags.replaceChildren();
   [...p.topics,...p.tech].forEach(t=>tags.append(make('span','',t)));
   const a=document.getElementById('v17-modal-link'), note=document.getElementById('v17-modal-note');
   a.hidden=!p.link;note.hidden=!!p.link;
   if(p.link){a.href=p.link; a.textContent='View project on GitHub ↗';}
   else note.textContent=p.title==='Production Agentic RAG Assistant'?'Private industry case study · no public repository':'Repository or article link not available yet';
   modal.showModal();
 }
 function showCollection(key){
   const c=shelves.find(x=>x.id===key)||shelves[0];
   document.querySelectorAll('.v17-shelf-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.collection===c.id)));
   document.getElementById('v17-open-title').textContent=c.title;
   document.getElementById('v17-open-desc').textContent=c.desc;
   document.getElementById('v17-open-count').textContent=c.indexes.length+' projects';
   openGrid.replaceChildren();
   c.indexes.forEach(i=>{
     const p=entries[i], btn=make('button','v17-mini');btn.type='button';btn.setAttribute('aria-label','Read '+p.title);
     const img=make('img');img.src=p.cover;img.alt='';img.loading='lazy';
     const copy=make('span','v17-mini-text');copy.append(make('span','v17-mini-title',p.title),make('span','v17-mini-label',p.domain));
     btn.append(img,copy);btn.addEventListener('click',()=>showProject(i));openGrid.append(btn);
   });
 }
 document.querySelectorAll('.v17-feature').forEach(b=>b.addEventListener('click',()=>showProject(Number(b.dataset.project))));
 document.querySelectorAll('.v17-shelf-button').forEach(b=>b.addEventListener('click',()=>{showCollection(b.dataset.collection);requestAnimationFrame(()=>{const target=document.getElementById('v17-open-collection');const top=window.scrollY+target.getBoundingClientRect().top-108;window.scrollTo({top:Math.max(0,top),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});}));
 document.getElementById('v17-modal-close').addEventListener('click',()=>modal.close());
 modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
 showCollection('genai');

})();
;

(()=>{
  const dataEl=document.getElementById('v26-quotes');
  if(!dataEl)return;
  const originalQuotes=JSON.parse(dataEl.textContent);
  // Mix different writers throughout the reel; shuffle quotes once per page load.
  const shuffle=arr=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
  const grouped=new Map();
  originalQuotes.forEach(q=>{if(!grouped.has(q.author))grouped.set(q.author,[]);grouped.get(q.author).push(q);});
  const authors=shuffle([...grouped.keys()]);authors.forEach(a=>shuffle(grouped.get(a)));
  const quotes=[];const maxBatch=Math.max(...authors.map(a=>grouped.get(a).length));
  for(let i=0;i<maxBatch;i++)for(const author of authors){const q=grouped.get(author)[i];if(q)quotes.push(q);}

  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const studies=[...document.querySelectorAll('.v26-study')];
  const escape=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function noteHTML(q){return `<div class="v26-quote">“${escape(q.quote.replace(/[“”]/g,''))}”</div><div class="v26-meta"><span class="v26-avatar v31-photo-avatar" aria-hidden="true"><img src="${q.photo}" alt="" loading="lazy"></span><span><strong>${escape(q.author)}</strong><span>${escape(q.relation)}</span></span></div>`}
  function cardState(style,relative,width,mobile){
    const minCard=mobile?.72:.55;
    const off=(mult)=>width*mult;
    const hidden=relative===0?false:Math.abs(relative)>1;
    const sign=Math.sign(relative)||1;
    let dx=0,dy=0,scale=1,rotate=0,opacity=1,blur=0,z=6;
    if(relative!==0){
      const first=Math.abs(relative)===1;
      const outer=first?1:1.38;
      const base=mobile?.29:.295;
      dx=off(base)*sign*outer; scale=(mobile?.51:.63)*(first?1:.82);opacity=first?.58:0;blur=first?.65:2;z=first?3:1;
      switch(style){
        case 'conveyor':dy=0;rotate=sign*2;break;
        case 'deck':dx=off((mobile?.07:.095))*sign*outer;dy=first?19:36;scale=first?.85:.76;rotate=sign*(first?7:12);opacity=first?.57:0;break;
        case 'orbital':dx=off(mobile?.245:.28)*sign*outer;dy=sign===-1?22:-18;scale=first?(mobile?.54:.61):.50;rotate=sign*(mobile?8:12);break;
        case 'ticker':dx=off(mobile?.27:.295)*sign*outer;dy=0;scale=first?(mobile?.55:.62):.52;rotate=0;break;
        case 'magnetic':dx=off(mobile?.255:.295)*sign*outer;dy=2;scale=first?(mobile?.59:.67):.55;rotate=sign*1;break;
        case 'paper':dx=off(mobile?.105:.13)*sign*outer;dy=first?17:31;scale=first?.85:.75;rotate=sign*(first?9:15);opacity=first?.60:0;break;
        case 'ribbon':dx=off(mobile?.24:.27)*sign*outer;dy=sign===-1?-18:20;scale=first?(mobile?.55:.62):.50;rotate=sign*(mobile?5:8);break;
        case 'window':dx=off(mobile?.275:.29)*sign*outer;dy=0;scale=first?.62:.5;rotate=0;break;
      }
    }
    const transform=`translate(-50%,-50%) translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${scale}) rotate(${rotate}deg)`;
    return {dx,dy,scale,rotate,opacity,blur,z,transform,hidden};
  }
  function liftTransform(base,style,phase){
    const amount=(style==='deck'||style==='paper')?44:34;
    const y=base.dy-amount*(phase==='out'?1:.65);
    const s=(phase==='out'?1.07:1.04);
    const r=base.rotate+(style==='paper'?(phase==='out'?-7:6):style==='orbital'?(phase==='out'?-4:4):0);
    return `translate(-50%,-50%) translate3d(${(base.dx*.42).toFixed(2)}px,${y.toFixed(2)}px,0) scale(${s}) rotate(${r}deg)`;
  }
  const controllers=[];
  studies.forEach(root=>{
    const style=root.dataset.style;
    const viewport=root.querySelector('.v26-viewport'), dots=root.querySelector('.v26-mini-dots');
    const previous=root.querySelector('.v26-arrow.prev'),next=root.querySelector('.v26-arrow.next');
    const cards=quotes.map((q,i)=>{
      const card=document.createElement('article');card.className='v26-card';card.dataset.quoteIndex=i;
      card.innerHTML=noteHTML(q);card.setAttribute('aria-label','Recommendation from '+q.author);viewport.append(card);
      return card;
    });
    let index=0,visible=false,hover=false,focus=false,busy=false,timer=null,previousStates=null;
    const dotsList=[];
    quotes.forEach((q,i)=>{
      const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Show quotation '+(i+1)+' by '+q.author);
      dot.addEventListener('click',()=>change(i,'direct'));dots.append(dot);dotsList.push(dot);
    });
    const relative=i=>{
      let d=i-index;
      const N=quotes.length;
      while(d>N/2)d-=N;
      while(d< -N/2)d+=N;
      return d;
    };
    function states(){
      const w=viewport.clientWidth;
      const mobile=window.matchMedia('(max-width:760px)').matches;
      return cards.map((_,i)=>cardState(style,relative(i),w,mobile));
    }
    function apply(st){
      st.forEach((s,i)=>{
        const c=cards[i];c.style.transform=s.transform;c.style.opacity=s.opacity;
        c.style.filter=`blur(${s.blur}px)`;c.style.zIndex=s.z;
        c.style.pointerEvents=s.hidden||i!==index?'none':'auto';
        c.dataset.active=String(i===index);
        c.setAttribute('aria-hidden',String(s.hidden));
      });
      dotsList.forEach((d,i)=>d.setAttribute('aria-current',String(i===index)));
    }
    function finishAnimations(){cards.forEach(c=>c.getAnimations().forEach(a=>a.cancel()));busy=false;}
    // Version 28: The incoming card OWNS the foreground from the first frame.
    // The outgoing card retreats behind it; never cross-fades above it.
    function change(nextIndex,reason){
      if(busy)return;
      nextIndex=(nextIndex+quotes.length)%quotes.length;
      if(nextIndex===index)return;
      const oldIndex=index, before=previousStates||states();
      index=nextIndex;
      const after=states();previousStates=after;
      if(media.matches){apply(after);return;}
      busy=true;
      apply(after);
      const outgoing=cards[oldIndex], incoming=cards[index];
      // Order must be established BEFORE the compositor starts animating.
      // The outgoing card is ALWAYS beneath the new active card, even at t=0.
      cards.forEach((card,i)=>{card.style.zIndex=i===index?'20':i===oldIndex?'4':'2';});
      const duration=(style==='deck'||style==='paper')?820:740;
      const jobs=[];
      const makeTransform=(x,y,scale,rot)=>
        `translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale}) rotate(${rot}deg)`;
      cards.forEach((card,i)=>{
        const b=before[i],a=after[i];
        if(b.opacity===0&&a.opacity===0)return;
        let frames;
        if(i===oldIndex){
          // The old card rapidly recedes, then settles as the left/right neighbour.
          // There is no 'lift above the current card' or slow crossfade.
          const retreat=makeTransform(a.dx*.53, a.dy*.5+14,
            b.scale*.86, b.rotate+(a.rotate-b.rotate)*.5);
          frames=[
            {transform:b.transform,opacity:1,filter:'blur(0px)',offset:0},
            {transform:retreat,opacity:Math.max(.56,a.opacity),filter:'blur(0.3px)',offset:.34},
            {transform:a.transform,opacity:a.opacity,filter:`blur(${a.blur}px)`,offset:1}
          ];
        }else if(i===index){
          // The incoming card comes forward, follows a shallow lifting arc,
          // and stays opaque once it reaches the centre.
          const approach=makeTransform(b.dx*.34,b.dy*.25-12,
            Math.min(1.025,Math.max(.96,b.scale+.28)),b.rotate*.3);
          frames=[
            {transform:b.transform,opacity:Math.max(.58,b.opacity),filter:`blur(${b.blur}px)`,offset:0},
            {transform:approach,opacity:1,filter:'blur(0px)',offset:.62},
            {transform:a.transform,opacity:1,filter:'blur(0px)',offset:1}
          ];
        }else{
          frames=[
            {transform:b.transform,opacity:b.opacity,filter:`blur(${b.blur}px)`,offset:0},
            {transform:a.transform,opacity:a.opacity,filter:`blur(${a.blur}px)`,offset:1}
          ];
        }
        const anim=card.animate(frames,{duration,easing:'cubic-bezier(.25,.72,.18,1)',fill:'none'});
        jobs.push(anim.finished.catch(()=>{}));
      });
      Promise.all(jobs).then(()=>{apply(after);busy=false;});
    }
    function move(amount){change(index+amount,'manual')}
    previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
    root.addEventListener('mouseenter',()=>hover=true);
    root.addEventListener('mouseleave',()=>hover=false);
    root.addEventListener('focusin',()=>focus=true);
    root.addEventListener('focusout',()=>requestAnimationFrame(()=>focus=root.contains(document.activeElement)));
    const initial=states();previousStates=initial;apply(initial);
    if(!media.matches)timer=setInterval(()=>{if(visible&&!hover&&!focus&&!busy)move(1)},8500);
    controllers.push({root,setVisible:v=>visible=v,resize:()=>{finishAnimations();const st=states();previousStates=st;apply(st);}});
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const c=controllers.find(c=>c.root===e.target);if(c)c.setVisible(e.isIntersecting)}),{threshold:.18});
    controllers.forEach(c=>observer.observe(c.root));
  }else controllers.forEach(c=>c.setVisible(true));
  let resizeId=0;
  window.addEventListener('resize',()=>{cancelAnimationFrame(resizeId);resizeId=requestAnimationFrame(()=>controllers.forEach(c=>c.resize()));},{passive:true});
})();


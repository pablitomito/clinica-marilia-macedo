(function(){
  "use strict";
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero=document.getElementById("hero");
  requestAnimationFrame(function(){requestAnimationFrame(function(){hero.classList.add("ready");});});

  /* header */
  var hdr=document.getElementById("hdr"),sen=document.createElement("span");
  sen.style.cssText="position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none";
  document.body.appendChild(sen);
  new IntersectionObserver(function(e){hdr.classList.toggle("stuck",!e[0].isIntersecting);}).observe(sen);

  /* reveal */
  var els=document.querySelectorAll("[data-r]");
  if(reduce||!("IntersectionObserver" in window)){
    for(var i=0;i<els.length;i++)els[i].classList.add("is-in");
  }else{
    var io=new IntersectionObserver(function(en,ob){
      en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-in");ob.unobserve(x.target);}});
    },{rootMargin:"80px 0px 80px 0px",threshold:0});
    for(var j=0;j<els.length;j++)io.observe(els[j]);
  }

  /* CTA flutuante */
  var fab=document.getElementById("fab"),end=document.getElementById("contato");
  if(fab&&"IntersectionObserver" in window){
    var past=false,at=false;
    function sync(){fab.classList.toggle("on",past&&!at);}
    new IntersectionObserver(function(e){past=!e[0].isIntersecting;sync();},{threshold:0}).observe(hero);
    new IntersectionObserver(function(e){at=e[0].isIntersecting;sync();},{threshold:0}).observe(end);
  }

  /* estado ativo: tabs + nav desktop */
  var ids=["topo","clinica","tratamentos","casos"],map={};
  var marks=document.querySelectorAll(".tabs a,.nav a");
  function setActive(id){
    for(var k=0;k<marks.length;k++){
      var h=marks[k].getAttribute("href")||"";
      marks[k].classList.toggle("on",h==="#"+id);
    }
  }
  if("IntersectionObserver" in window){
    var secs=[document.getElementById("hero"),document.getElementById("clinica"),
              document.getElementById("tratamentos"),document.getElementById("casos"),
              document.getElementById("local")].filter(Boolean);
    var names=["topo","clinica","tratamentos","casos","local"],cur="topo";
    var so=new IntersectionObserver(function(en){
      en.forEach(function(x){
        if(x.isIntersecting){
          var idx=secs.indexOf(x.target);
          if(idx>-1){cur=names[idx];setActive(cur);}
        }
      });
    },{rootMargin:"-45% 0px -45% 0px"});
    secs.forEach(function(s){so.observe(s);});
  }
})();

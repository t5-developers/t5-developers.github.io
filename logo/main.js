var init = function(){
  var isMobile = navigator.userAgent &&
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
  var isSmall = window.innerWidth < 1000;
  
  var ps = new ParticleSlider({
    ptlGap: isMobile || isSmall ? 3 : 0,
    ptlSize: isMobile || isSmall ? 3 : 1,
    width: 1e9,
    height: 1e9
  });
}

var initParticleSlider = function(){
  var psScript = "<script src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js' type='text/javascript'></script>";
	console.log(psScript);
  document.getElementsByTagName("body")[0].appendChild(psScript);
}
    
(window.addEventListener
  ? window.addEventListener('load', initParticleSlider, false)
  : window.onload = initParticleSlider);

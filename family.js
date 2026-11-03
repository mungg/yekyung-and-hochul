document.querySelector('#copy-address').addEventListener('click',async()=>{const address='92-1001 Olani Street, Kapolei, Hawaii 96707';try{await navigator.clipboard.writeText(address);document.querySelector('#copy-status').textContent='주소를 복사했습니다'}catch{window.prompt('주소를 복사해주세요',address)}});

const music=document.querySelector('#wedding-music');
const musicButton=document.querySelector('#music-toggle');
const musicStatus=document.querySelector('#music-status');
music.volume=0.3;
function updateMusicButton(){musicButton.textContent=music.paused?'♫ 음악 켜기':'Ⅱ 음악 끄기';musicButton.setAttribute('aria-pressed',String(!music.paused));}
musicButton.addEventListener('click',async()=>{cancelMusicStart();musicStatus.textContent='';if(!music.paused){music.pause();return;}musicButton.disabled=true;try{await music.play();}catch{musicStatus.textContent='다시 눌러주세요';}finally{musicButton.disabled=false;updateMusicButton();}});
music.addEventListener('play',updateMusicButton);
music.addEventListener('pause',updateMusicButton);
music.addEventListener('error',()=>{musicStatus.textContent='음원을 불러오지 못했습니다';music.pause();updateMusicButton();});

function cancelMusicStart(){document.removeEventListener('click',startOnInteraction);document.removeEventListener('keydown',startOnInteraction);}
function startOnInteraction(event){
 if(musicButton.contains(event.target))return;
 if(event.type==='keydown'&&!['Enter',' '].includes(event.key))return;
 cancelMusicStart();
 music.play().catch(()=>{musicStatus.textContent='음악 켜기를 눌러주세요';updateMusicButton();});
}
music.play().catch(()=>{
 updateMusicButton();
 document.addEventListener('click',startOnInteraction);
 document.addEventListener('keydown',startOnInteraction);
});

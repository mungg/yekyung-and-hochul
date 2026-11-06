const guestForm=document.querySelector('#guest-details form');
const submitButton=guestForm.querySelector('[type="submit"]');
const notice=document.createElement('p');notice.setAttribute('role','status');notice.style.cssText='line-height:1.6;margin:16px 0';
const fallback=document.createElement('a');fallback.hidden=true;fallback.className='submit-details';fallback.style.display='none';
guestForm.append(notice,fallback);
const ko=()=>document.documentElement.lang==='ko';
guestForm.addEventListener('submit',async event=>{
 event.preventDefault();if(!guestForm.reportValidity())return;
 const data=new FormData(guestForm);if(data.get('_honey'))return;
 const body=[...data.entries()].filter(([key])=>!key.startsWith('_')).map(([key,value])=>`${key}: ${value}`).join('\n\n');
 fallback.href='mailto:sigma89kim@gmail.com?subject='+encodeURIComponent('Wedding · Menu & guest details')+'&body='+encodeURIComponent(body);
 fallback.textContent=ko()?'메일 앱으로 응답 보내기 ↗':'Send responses with my email app ↗';
 fallback.hidden=true;fallback.style.display='none';
 submitButton.disabled=true;notice.textContent=ko()?'응답을 보내고 있어요…':'Sending your responses…';
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{
  const payload=Object.fromEntries(data);delete payload._next;payload._captcha='false';
  const response=await fetch('https://formsubmit.co/ajax/sigma89kim@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Submission not confirmed');
  window.location.assign('thanks.html');
 }catch{
  notice.textContent=ko()?'전송 완료를 확인하지 못했어요. 입력 내용은 그대로 남아 있습니다. 잠시 후 다시 시도하거나 아래 버튼으로 메일을 보내주세요.':'We couldn’t confirm delivery. Your answers are still here. Please retry later or send them using the email button below.';
  fallback.hidden=false;fallback.style.display='inline-block';
 }finally{clearTimeout(timer);submitButton.disabled=false;}
});

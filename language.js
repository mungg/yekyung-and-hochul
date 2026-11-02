// Keep form field names and submitted menu values stable in both languages.
const translations = [
['.full-names','황호철 · 김예경'],
['.wedding-date','2026년 12월 16일'],['.ceremony-time','오후 4시'],
['.invitation-copy>p','소중한 분들을<br>저희 결혼식에 초대합니다'],
['.invitation-copy blockquote','“서로 사랑하라<br>내가 너희를 사랑한 것 같이 너희도 서로 사랑하라”<cite>— 요한복음 13장 34절</cite>'],
['#day .section-label span','일정'],['#day article:first-of-type h2','12월 16일<span class="pixel">결혼식</span>'],
['#day article:nth-of-type(2) h2','12월 17일<span class="pixel">친구들과 함께</span>'],
['.schedule div:nth-child(1) dt','오후 4:00–4:30'],['.schedule div:nth-child(1) dd','웰컴 칵테일 & 인사'],
['.schedule div:nth-child(2) dt','오후 4:30'],['.schedule div:nth-child(2) dd','예식'],
['.schedule div:nth-child(3) dt','오후 5:30'],['.schedule div:nth-child(3) dd','저녁 식사'],
['.ocean-day h3','보트 & 스노클링'],['.ocean-day>p','시간과 모이는 장소는 추후 안내드립니다'],
['#wear h2','옷차림'],['#wear p','하와이에서 입고 싶은 옷을 자유롭게 입어주세요'],
['#travel .section-label span','오시는 길'],['#directions','길찾기 ↗'],['#copy','주소 복사'],
['#guest-details .section-label span','하객 안내'],['label[for="guest-name"]','성함'],
['#guest-details fieldset:first-of-type legend','메인 요리를 선택해주세요'],['#guest-details fieldset:first-of-type .field-hint','한 분당 하나씩 선택해주세요'],
['.menu-option:first-child strong','슬로 로스트 소고기 안심<br>& 포치드 랍스터 테일'],
['.menu-option:nth-child(2) strong','구아바 브레이즈드 갈비<br>& 카우아이 새우'],
['.menu-option:first-child .ingredients','어린 호박과 주키니, 물냉이, 감자 퓌레, 치미추리, 타라곤 송아지고기 소스'],
['.menu-option:nth-child(2) .ingredients','포이 감자 퓌레, 구운 브로콜리니, 고기 육즙 소스'],
['label[for="allergies"]','알레르기나 식단 제한이 있나요?'],
['.arrival-fields legend','언제 도착해서 언제까지 머무르시나요?'],['label[for="arrival-date"]>span','도착 날짜'],['label[for="departure-date"]>span','출발 날짜'],['label[for="guest-stay"]','어디에 머무르시나요?'],
['#guest-details fieldset:last-of-type legend','좋아하는 색 두 가지'],['#guest-details fieldset:last-of-type label:first-child>span','첫 번째 색'],['#guest-details fieldset:last-of-type label:nth-child(2)>span','두 번째 색'],
['.submit-details','응답 보내기 ↗'],['#album .section-label span','앨범'],['.original-cover-hint','눌러서 열기']
];
const translatedNodes=translations.flatMap(([selector,ko])=>Array.from(document.querySelectorAll(selector),el=>({el,en:el.innerHTML,ko})));
const placeholders=[['#guest-name','성함을 입력해주세요'],['#allergies','알레르기나 식단 제한을 적어주세요. 없으면 없음으로 적어주세요.'],['#guest-stay','호텔 또는 지역 — 미정이면 미정'],['[name="Favorite color 1"]','예: 연한 파랑'],['[name="Favorite color 2"]','예: 연한 노랑']].map(([selector,ko])=>{const el=document.querySelector(selector);return {el,en:el.placeholder,ko}});
function setLanguage(lang){
 const ko=lang==='ko';document.documentElement.lang=ko?'ko':'en';
 translatedNodes.forEach(n=>n.el.innerHTML=ko?n.ko:n.en);
 placeholders.forEach(n=>n.el.placeholder=ko?n.ko:n.en);
 document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===lang)));
 document.querySelectorAll('.album-photo').forEach((b,i)=>b.setAttribute('aria-label',ko?`사진 ${i+1} 크게 보기`:`Open photo ${i+1}`));
 [['photo-close','사진 닫기','Close photo'],['photo-prev','이전 사진','Previous photo'],['photo-next','다음 사진','Next photo']].forEach(([id,k,e])=>document.getElementById(id).setAttribute('aria-label',ko?k:e));

 validateTravelDates();
}
document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.language)));
setLanguage('en');

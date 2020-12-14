const body=document.querySelector("body"),root=document.documentElement,style=getComputedStyle(root);let fixedItem;function bodyLock(){fixedItem=document.querySelectorAll(".fixed-item");const e=window.innerWidth-body.offsetWidth+"px";body.style.overflow="hidden",body.style.marginRight=e,fixedItem.forEach(r=>r.style.paddingRight=e)}function bodyUnlock(){body.style.overflow="",body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button");let hamburgerOpen=!1;function openHamburger(){0==hamburgerOpen&&(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"),hamburgerOpen=!0)}null!=hamburgerButton&&(hamburgerButton.onclick=openHamburger),window.onclick=function(e){hamburgerOpen&&e.target==hamburger&&(hamburgerWrapper.classList.remove("hamburger__wrapper--open"),setTimeout((function(){hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()}),200))};const scrollToTop=document.querySelector(".scroll-to-top");setInterval((function(){pageYOffset<window.innerHeight?scrollToTop.classList.add("scroll-to-top--hidden"):scrollToTop.classList.remove("scroll-to-top--hidden")}),100);let pageWidth=document.querySelector(".page-width");function getPageWidth(){root.style.setProperty("--page-width",pageWidth.offsetWidth-30+"px")}window.addEventListener("resize",getPageWidth),getPageWidth();const headerNews=document.querySelector(".header__nav-link-news"),newsPage=document.querySelector(".news-page"),postPage=document.querySelector(".post");null!=newsPage?headerNews.classList.add("header__nav-link--active"):null!=postPage&&headerNews.classList.add("header__nav-link--active");const newsColumn1=document.querySelectorAll(".news__column1"),newsColumn2=document.querySelectorAll(".news__column2"),newsPosts=document.querySelector(".news-page__posts"),newsButton=document.querySelector(".news__button");let newPostsSet=0;function showMore(){2==newPostsSet&&(newPostsSet=0);let e=newsColumn1[newPostsSet].cloneNode(!0),r=newsColumn2[newPostsSet].cloneNode(!0);newsPosts.appendChild(e),newsPosts.appendChild(r),e.classList.add("news__column--animation"),r.classList.add("news__column--animation"),setTimeout((function(){e.classList.remove("news__column--animation"),r.classList.remove("news__column--animation")}),100),newPostsSet++}null!=newsPosts&&newsButton.addEventListener("click",showMore);const anchors=document.querySelectorAll('a[href^="#"]');let hash;window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(document.querySelector(""+hash).scrollIntoView({behavior:"auto",block:"start"}),history.replaceState("",document.title,window.location.pathname+window.location.search)))),window.onload=function(){""!=hash&&null!=document.querySelector(""+hash)&&document.querySelector(""+hash).scrollIntoView({behavior:"smooth",block:"start"})};for(let e of anchors)e.addEventListener("click",(function(r){r.preventDefault();let t=e.getAttribute("href");"#"!=t&&(null==document.querySelector(t)&&(window.location.href="index"+t),hamburger.click(),document.querySelector(""+t).scrollIntoView({behavior:"smooth",block:"start"}))}));const slider=document.querySelectorAll(".slider"),sliderWrapper=document.querySelectorAll(".slider__wrapper"),sliderImg=document.querySelectorAll(".slider__img"),sliderLink=document.querySelectorAll(".slider__link"),sliderPrevBtn=document.querySelectorAll(".slider__prev"),sliderNextBtn=document.querySelectorAll(".slider__next");let sliderWrapperTranslate=[],sliderWrapperDragOffset=[];const sliderButton=[],sliderItem=[];let sliderVisibleItems=[],currentSlider=[];for(let e=0;e<slider.length;e++){sliderWrapperTranslate[e]=0,sliderWrapperDragOffset[e]=0,sliderItem[e]=slider[e].querySelectorAll(".slider__item"),sliderButton[e]=slider[e].querySelectorAll(".slider__button");for(let r=0;r<sliderButton[e].length;r++)sliderButton[e][r].addEventListener("click",sliderSwitch);null!=sliderButton[e][0]&&sliderButton[e][0].classList.add("slider__button--active"),sliderVisibleItemsCount(e),currentSlider[e]=0,null!=sliderNextBtn[e]&&sliderNextBtn[e].addEventListener("click",()=>sliderNext(e)),null!=sliderPrevBtn[e]&&sliderPrevBtn[e].addEventListener("click",()=>sliderPrev(e))}function sliderNext(e){currentSlider[e]>=sliderItem[e].length-sliderVisibleItems[e]?(currentSlider[e]=0,sliderMove(e)):(currentSlider[e]++,sliderMove(e))}function sliderPrev(e){0==currentSlider[e]?(currentSlider[e]=sliderItem[e].length-sliderVisibleItems[e],sliderMove(e)):(currentSlider[e]--,sliderMove(e))}function sliderSwitch(){for(let e=0;e<slider.length;e++)for(let r=0;r<sliderButton[e].length;r++)if(this==sliderButton[e][r])return currentSlider[e]=r,void sliderMove(e)}function sliderMove(e){sliderWrapperTranslate[e]=currentSlider[e]*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)",null!=sliderButton[e][currentSlider[e]]&&(sliderButton[e].forEach(e=>e.classList.remove("slider__button--active")),sliderButton[e][currentSlider[e]].classList.add("slider__button--active"))}function sliderVisibleItemsCount(e){const r=window.getComputedStyle(sliderItem[e][0]);sliderVisibleItems[e]=Math.round(sliderWrapper[e].offsetWidth/(sliderItem[e][0].offsetWidth+parseInt(r.marginRight)+parseInt(r.marginRight)))}function sliderResize(){for(let e=0;e<slider.length;e++)sliderVisibleItemsCount(e),sliderMove(e)}window.addEventListener("resize",sliderResize);let draggedSlider,sliderLinkDragged,sliderDragLinkOffset,scrollX,scrollY,scrollYEnabled,scrollXEnabled,sliderDragged=!1,sliderDragOffset=0;for(let e=0;e<slider.length;e++)slider[e].addEventListener("mousedown",r=>sliderDragStart(r,e)),slider[e].addEventListener("touchstart",r=>sliderDragStart(r,e));window.addEventListener("mousemove",sliderDragMove),window.addEventListener("touchmove",sliderDragMove),window.addEventListener("mouseup",sliderDragEnd),window.addEventListener("touchend",sliderDragEnd);for(let e=0;e<slider.length;e++)slider[e].addEventListener("mouseleave",sliderDragEnd);function sliderLinkClick(e){sliderLinkDragged&&e.preventDefault()}function sliderDragStart(e,r){draggedSlider=r,slider[draggedSlider].classList.add("slider--dragged"),sliderWrapper[draggedSlider].classList.add("slider__wrapper--dragged"),sliderDragged=!0,"touchstart"==e.type?sliderDragOffset=e.touches[0].clientX:(e.preventDefault(),sliderDragOffset=e.clientX,sliderLinkDragged=!1,sliderDragLinkOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]=sliderWrapperTranslate[draggedSlider]}function sliderDragMove(e){if(sliderDragged){const r=10;let t;Math.abs(sliderDragLinkOffset-e.clientX)>r&&(sliderLinkDragged=!0),"touchmove"==e.type?(t=e.touches[0].clientX-sliderDragOffset,sliderDragOffset=e.touches[0].clientX):(t=e.clientX-sliderDragOffset,sliderDragOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]+=t,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperDragOffset[draggedSlider]+"px)",sliderDragCheck()}}function sliderDragCheck(){sliderWrapperTranslate[draggedSlider]<0?sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider))}function sliderDragEnd(){sliderDragged&&(slider[draggedSlider].classList.remove("slider--dragged"),sliderWrapper[draggedSlider].classList.remove("slider__wrapper--dragged"),sliderDragged=!1,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperTranslate[draggedSlider]+"px)")}function scrollStart(e){scrollX=e.touches[0].clientX,scrollY=e.touches[0].clientY,scrollXEnabled=!0,scrollYEnabled=!0}function scrollMove(e){scrollXEnabled&&scrollYEnabled&&(Math.abs(scrollX-e.touches[0].clientX)>10?scrollYEnabled=!1:Math.abs(scrollY-e.touches[0].clientY)>10&&(scrollXEnabled=!1)),0==scrollYEnabled?e.preventDefault():0==scrollXEnabled&&sliderDragEnd()}sliderLink.forEach(e=>e.addEventListener("click",sliderLinkClick)),window.addEventListener("click",(function(){sliderLinkDragged=!1})),window.addEventListener("touchstart",scrollStart),window.addEventListener("touchmove",scrollMove,{passive:!1});let activeTeamMember,currentRow,lastRow,teamMember=Array.from(document.querySelectorAll(".about__team-member")),teamMemberDescription=Array.from(document.querySelectorAll(".about__team-member-description")),initialItem=0;teamMember.forEach(e=>{e.addEventListener("click",()=>switchDescription(e))}),window.addEventListener("resize",moveMemberItems);for(let e=0;e<teamMember.length;e++)teamMember[e].style.order=e,teamMemberDescription[e].style.order=e;function switchDescription(e){for(let r=0;r<teamMember.length;r++)if(e==teamMember[r]&&teamMember[r]!=teamMember[activeTeamMember]){activeTeamMember=r,teamMemberDescription.forEach(e=>e.classList.remove("about__team-member-description--active")),teamMemberDescription[r].classList.add("about__team-member-description--active"),moveMemberItems();break}}function moveMemberItems(){let e=getComputedStyle(root).getPropertyValue("--team-item-flexbasis"),r=Math.ceil(teamMember.length/e);null==currentRow&&(currentRow=Math.ceil((initialItem+1)/(e-1))),lastRow=currentRow,currentRow=Math.ceil((activeTeamMember+1)/e);for(let t=currentRow;t<r;t++){if(lastRow<=currentRow&&activeTeamMember+1==e*t&&(currentRow+=t),activeTeamMember+1==e*t-1&&lastRow!=currentRow&&(lastRow=lastRow+t-1),lastRow>currentRow&&activeTeamMember+1==e*t){if(activeTeamMember!=teamMember.length-1){let e=[],r=[];for(let t=0;t<teamMember.length;t++)e[t]=teamMember[t],r[t]=teamMemberDescription[t];for(let t=0;t<teamMember.length;t++)teamMember[t].style.order--,teamMemberDescription[t].style.order--,e[t]=teamMember[t+1],r[t]=teamMemberDescription[t+1];e[teamMember.length-1]=teamMember[0],r[teamMember.length-1]=teamMemberDescription[0],teamMember=e,teamMemberDescription=r,teamMember[teamMember.length-1].style.order=teamMember.length-1,teamMemberDescription[teamMember.length-1].style.order=teamMember.length-1,activeTeamMember--}break}if(currentRow>lastRow&&activeTeamMember!=teamMember.length-1){let e=[],r=[];for(let t=0;t<teamMember.length;t++)e[t]=teamMember[t],r[t]=teamMemberDescription[t];for(let t=teamMember.length-1;t>=0;t--)teamMember[t].style.order++,teamMemberDescription[t].style.order++,e[t]=teamMember[t-1],r[t]=teamMemberDescription[t-1];e[0]=teamMember[teamMember.length-1],r[0]=teamMemberDescription[teamMember.length-1],teamMember=e,teamMemberDescription=r,teamMember[0].style.order=0,teamMemberDescription[0].style.order=0,activeTeamMember++}break}}teamMember[initialItem].click();
const root=document.documentElement;let fixedItem=[];function bodyLock(){const e=window.innerWidth-document.body.offsetWidth+"px";fixedItem=document.querySelectorAll(".fixed-item"),document.body.style.overflow="hidden",document.body.style.marginRight=e,fixedItem.forEach(t=>t.style.paddingRight=e)}function bodyUnlock(){document.body.style.overflow="",document.body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const scrollToTop=document.querySelector(".scroll-to-top");setInterval(()=>{pageYOffset<window.innerHeight?scrollToTop.classList.add("scroll-to-top--hidden"):scrollToTop.classList.remove("scroll-to-top--hidden")},100);let pageWidth=document.querySelector(".page-width");function getPageWidth(){root.style.setProperty("--page-width",pageWidth.offsetWidth-30+"px")}window.addEventListener("resize",getPageWidth),getPageWidth();const headerNews=document.querySelector(".header__nav-link-news"),newsPage=document.querySelector(".news-page"),postPage=document.querySelector(".post");(null!=newsPage||null!=postPage)&&headerNews.classList.add("header__nav-link--active");const newsColumn1=document.querySelectorAll(".news__column1"),newsColumn2=document.querySelectorAll(".news__column2"),newsPosts=document.querySelector(".news-page__posts"),newsButton=document.querySelector(".news__button");let newPostsSet=0;function showMore(){2==newPostsSet&&(newPostsSet=0);let e=newsColumn1[newPostsSet].cloneNode(!0),t=newsColumn2[newPostsSet].cloneNode(!0);newsPosts.appendChild(e),newsPosts.appendChild(t),e.classList.add("news__column--animation"),t.classList.add("news__column--animation"),setTimeout(()=>{e.classList.remove("news__column--animation"),t.classList.remove("news__column--animation")},100),newPostsSet++}null!=newsPosts&&newsButton.addEventListener("click",showMore);const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button"),hamburgerWrapperTransitionProperty="transform";let hamburgerOpen=!1;function openHamburger(){hamburgerOpen||(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"))}function closeHamburger(e=null){(null==e||hamburgerOpen&&e.target==hamburger)&&hamburgerWrapper.classList.remove("hamburger__wrapper--open")}function hamburgerTransitionend(e){e.target==hamburgerWrapper&&"transform"==e.propertyName&&(hamburgerOpen?(hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()):hamburgerOpen=!0)}null!=hamburgerButton&&hamburgerButton.addEventListener("click",openHamburger),window.addEventListener("click",e=>closeHamburger(e)),hamburgerWrapper.addEventListener("transitionend",e=>hamburgerTransitionend(e)),window.addEventListener("keydown",e=>{"Escape"==e.key&&hamburgerOpen&&closeHamburger()});class Slider{constructor(e){if("string"==typeof e.sliderClass){this.sliderClass=e.sliderClass,this.slider=document.querySelectorAll("."+this.sliderClass),this.sliderWrapper=document.querySelectorAll(`.${this.sliderClass}__wrapper`),this.sliderImg=document.querySelectorAll(`.${this.sliderClass}__img`),this.sliderLink=document.querySelectorAll(`.${this.sliderClass}__link`),this.sliderPrevBtn=document.querySelectorAll(`.${this.sliderClass}__prev`),this.sliderNextBtn=document.querySelectorAll(`.${this.sliderClass}__next`),this.sliderWrapperPos=[],this.sliderWrapperDragOffset=[],this.sliderButton=[],this.sliderItem=[],this.visibleItems=[],this.currentSlide=[],this.expectedSlide=[],this.sliderDisabled=[],this.autoplayTimer=[],this.transitioning=[],this.tabFocused=!0,this.adaptiveHeight=!0,this.autoplay=!1,this.autoplayInterval=5e3,this.clonedItems=0,this.currentSlideCentered=!1,this.disableOnEdges=!1,this.disableUnsuitable=!0,this.draggable=!0,this.draggableWithMouse=!0,this.dragMoveCoefficient=.2,this.infinite=!1,this.initialSlide=0,this.interruptible=!0,"boolean"==typeof e.adaptiveHeight&&(this.adaptiveHeight=e.adaptiveHeight),"boolean"==typeof e.autoplay&&(this.autoplay=e.autoplay),Number.isInteger(e.autoplayInterval)&&e.autoplayInterval>=100&&(this.autoplayInterval=e.autoplayInterval),Number.isInteger(e.clonedItems)&&e.clonedItems>=0&&(this.clonedItems=e.clonedItems),"boolean"==typeof e.currentSlideCentered&&(this.currentSlideCentered=e.currentSlideCentered),"boolean"==typeof e.disableOnEdges&&(this.disableOnEdges=e.disableOnEdges),"boolean"==typeof e.disableUnsuitable&&(this.disableUnsuitable=e.disableUnsuitable),"boolean"==typeof e.draggable&&(this.draggable=e.draggable),"boolean"==typeof e.draggableWithMouse&&(this.draggableWithMouse=e.draggableWithMouse),"number"==typeof e.dragMoveCoefficient&&e.dragMoveCoefficient>0&&e.dragMoveCoefficient<1&&(this.dragMoveCoefficient=e.dragMoveCoefficient),"boolean"==typeof e.infinite&&(this.infinite=e.infinite),Number.isInteger(e.initialSlide)&&e.initialSlide>=0&&(this.initialSlide=e.initialSlide),"boolean"==typeof e.interruptible&&(this.interruptible=e.interruptible);for(let e=0;e<this.slider.length;e++){this.sliderWrapperPos[e]=0,this.sliderWrapperDragOffset[e]=0,this.sliderItem[e]=Array.from(this.slider[e].querySelectorAll(`.${this.sliderClass}__item`)),this.currentSlide[e]=this.initialSlide,null==this.sliderItem[e][this.currentSlide[e]]&&(this.currentSlide[e]=this.sliderItem[e].length-1);for(let t=1;t<=this.clonedItems;t++){const s=this.sliderItem[e][this.sliderItem[e].length-t].cloneNode(!0);s.classList.add(this.sliderClass+"__item-clone");for(let e of s.querySelectorAll("*"))e.tabIndex=-1;this.sliderWrapper[e].insertBefore(s,this.sliderItem[e][0]),this.sliderItem[e].unshift(s)}for(let t=1;t<=this.clonedItems;t++){const s=this.sliderItem[e][this.clonedItems+t-1].cloneNode(!0);s.classList.add(this.sliderClass+"__item-clone");for(let e of s.querySelectorAll("*"))e.tabIndex=-1;this.sliderWrapper[e].appendChild(s),this.sliderItem[e].push(s)}this.sliderButton[e]=this.slider[e].querySelectorAll(`.${this.sliderClass}__button`);for(let t=0;t<this.sliderButton[e].length;t++)this.sliderButton[e][t].addEventListener("click",e=>this.sliderSwitch(e));null!=this.sliderButton[e][0]&&this.sliderButton[e][0].classList.add(this.sliderClass+"__button--active"),this.visibleItemsCount(e),this.sliderToggle(e),this.autoplay&&(this.autoplayTimer[e]=setInterval(()=>this.sliderNext(e),this.autoplayInterval),this.slider[e].addEventListener("mouseenter",()=>this.sliderAutoplayUnpause(e)),this.slider[e].addEventListener("mouseleave",()=>this.sliderAutoplayPause(e))),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].addEventListener("click",()=>this.sliderNext(e)),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].addEventListener("click",()=>this.sliderPrev(e)),this.sliderWrapper[e].addEventListener("transitionend",t=>this.sliderMoveTransitionend(t,e)),addEventListener("focus",()=>this.tabFocusIn()),addEventListener("blur",()=>this.tabFocusOut()),this.slider[e].addEventListener("focusin",t=>this.sliderFocus(t,e)),this.sliderItem[e][this.currentSlide[e]+this.clonedItems].style.transition="0s",this.sliderMoveInstantly(e),this.sliderItem[e][this.currentSlide[e]+this.clonedItems].style.transition=""}this.sliderHeight(),window.addEventListener("load",()=>this.sliderHeight()),this.sliderImg.forEach(e=>e.addEventListener("load",()=>this.sliderHeight())),window.addEventListener("resize",()=>this.sliderResize()),this.sliderDragged=!1,this.sliderDragPos=0,this.dragThresholdReached=!1,this.draggedSlider,this.dragOffsetThreshold=5;for(let e=0;e<this.slider.length;e++)this.slider[e].addEventListener("mousedown",t=>this.sliderDragStart(t,e)),this.slider[e].addEventListener("touchstart",t=>this.sliderDragStart(t,e)),this.slider[e].addEventListener("mouseleave",()=>this.sliderDragEnd());window.addEventListener("mousemove",e=>this.sliderDragMove(e)),window.addEventListener("touchmove",e=>this.sliderDragMove(e)),window.addEventListener("mouseup",()=>this.sliderDragEnd()),window.addEventListener("touchend",()=>this.sliderDragEnd()),this.sliderLinkDragged,this.dragInitialPos,this.sliderLink.forEach(e=>e.addEventListener("click",e=>this.sliderLinkClick(e))),window.addEventListener("click",()=>{this.sliderLinkDragged=!1}),this.scrollY,this.scrollXEnabled,this.scrollYEnabled,window.addEventListener("touchstart",e=>this.scrollStart(e)),window.addEventListener("touchmove",e=>this.scrollMove(e),{passive:!1})}}sliderNext(e){if(this.sliderDisabled[e])return;if(!this.interruptible&&this.transitioning[e])return;this.sliderMoveSilently(e);const t=this.sliderItem[e].length-2*this.clonedItems;if(!this.infinite&&this.currentSlide[e]>=t-this.visibleItems[e]||this.infinite&&this.currentSlide[e]>=t-1){if(this.disableOnEdges)return;this.infinite?(this.currentSlide[e]++,this.expectedSlide[e]=0):this.currentSlide[e]=0,this.transitioning[e]=!0,this.sliderMove(e)}else this.currentSlide[e]++,this.transitioning[e]=!0,this.sliderMove(e)}sliderPrev(e){if(this.sliderDisabled[e])return;if(!this.interruptible&&this.transitioning[e])return;this.sliderMoveSilently(e);const t=this.sliderItem[e].length-2*this.clonedItems;if(0==this.currentSlide[e]){if(this.disableOnEdges)return;this.infinite?(this.currentSlide[e]--,this.expectedSlide[e]=t-1):this.currentSlide[e]=t-this.visibleItems[e],this.transitioning[e]=!0,this.sliderMove(e)}else this.currentSlide[e]--,this.transitioning[e]=!0,this.sliderMove(e)}sliderSwitch(e){for(let t=0;t<this.slider.length;t++)for(let s=0;s<this.sliderButton[t].length;s++)if(e.target.closest(`.${this.sliderClass}__button`)==this.sliderButton[t][s])return this.currentSlide[t]=s,this.expectedSlide[t]=null,void this.sliderMove(t)}tabFocusIn(){setTimeout(()=>this.tabFocused=!0,0)}tabFocusOut(){setTimeout(()=>this.tabFocused=!1,0)}sliderFocus(e,t){if(this.tabFocused)for(let s=0;s<this.sliderItem[t].length;s++)this.sliderItem[t][s]==e.target.closest("."+this.sliderClass+"__item")&&(this.currentSlide[t]=s-this.clonedItems,this.slider[t].scrollLeft=0,this.sliderDragEnd(),this.sliderMove(t))}sliderMove(e){const t=this.currentSlide[e]+this.clonedItems;let s,i=0;this.currentSlideCentered&&(i=(this.sliderWrapper[e].offsetWidth-this.sliderWrapper[e].offsetWidth/this.visibleItems[e])/2),this.sliderWrapperPos[e]=t*(-1*this.sliderWrapper[e].offsetWidth/this.visibleItems[e])+i,this.sliderWrapper[e].style.transform="translateX("+this.sliderWrapperPos[e]+"px)";for(let t of this.sliderItem[e])t.classList.remove(this.sliderClass+"__item--current");null!=this.sliderItem[e][t]&&this.sliderItem[e][t].classList.add(this.sliderClass+"__item--current"),null!=this.expectedSlide[e]&&this.sliderItem[e][this.expectedSlide[e]+this.clonedItems].classList.add(this.sliderClass+"__item--current"),this.sliderButton[e].forEach(e=>e.classList.remove(this.sliderClass+"__button--active")),s=null!=this.expectedSlide[e]?this.expectedSlide[e]:this.currentSlide[e],null!=this.sliderButton[e][s]&&this.sliderButton[e][s].classList.add(this.sliderClass+"__button--active"),this.sliderHeight()}sliderMoveInstantly(e){this.sliderWrapper[e].style.transitionDuration="0s",this.sliderMove(e);document.body.scrollHeight;this.sliderWrapper[e].style.transitionDuration="",this.transitioning[e]=!1}sliderMoveToExpected(e){null!=this.expectedSlide[e]&&(this.currentSlide[e]=this.expectedSlide[e],this.expectedSlide[e]=null,this.sliderMoveInstantly(e))}sliderMoveTransitionend(e,t){e.target==this.sliderWrapper[t]&&"transform"==e.propertyName&&(this.transitioning[t]=!1,this.sliderMoveToExpected(t))}sliderMoveSilently(e){if(null!=this.expectedSlide[e]){const t=getComputedStyle(this.sliderWrapper[e]).transform.match(/matrix.*\((.+)\)/)[1].split(", "),s=parseInt(t[4]);this.sliderWrapper[e].style.transitionDuration="0s",this.sliderWrapper[e].style.transform="translateX("+s+"px)";const i=-1*this.sliderWrapper[e].offsetWidth/this.visibleItems[e];this.currentSlide[e]<0?this.sliderWrapper[e].style.transform="translateX("+(s+i*(this.sliderItem[e].length-2*this.clonedItems))+"px)":this.sliderWrapper[e].style.transform="translateX("+(s-i*this.currentSlide[e])+"px)";document.body.scrollHeight;this.sliderWrapper[e].style.transitionDuration="",this.currentSlide[e]=this.expectedSlide[e],this.expectedSlide[e]=null}}visibleItemsCount(e){const t=window.getComputedStyle(this.sliderItem[e][0]);this.visibleItems[e]=Math.round(this.sliderWrapper[e].offsetWidth/(this.sliderItem[e][0].offsetWidth+parseInt(t.marginRight)+parseInt(t.marginRight)))}sliderResize(){for(let e=0;e<this.slider.length;e++){this.visibleItemsCount(e);let t=this.sliderItem[e].length-this.visibleItems[e];if(this.currentSlide[e]>t){for(;t<0;)t++;this.currentSlide[e]=t}this.sliderMove(e),this.sliderToggle(e)}}sliderHeight(){if(this.adaptiveHeight)for(let e=0;e<this.slider.length;e++)null!=this.sliderItem[e][this.currentSlide[e]+this.clonedItems]&&(this.sliderWrapper[e].style.maxHeight=this.sliderItem[e][this.currentSlide[e]+this.clonedItems].offsetHeight+"px")}sliderToggle(e){this.disableUnsuitable&&this.sliderItem[e].length-2*this.clonedItems<=this.visibleItems[e]?(this.sliderDisabled[e]=!0,this.slider[e].classList.add(this.sliderClass+"--disabled"),this.sliderWrapper[e].classList.add(this.sliderClass+"__wrapper--disabled"),this.sliderButton[e].forEach(e=>e.classList.add(this.sliderClass+"__button--disabled")),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.add(this.sliderClass+"__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.add(this.sliderClass+"__prev--disabled")):(this.sliderDisabled[e]=!1,this.slider[e].classList.remove(this.sliderClass+"--disabled"),this.sliderWrapper[e].classList.remove(this.sliderClass+"__wrapper--disabled"),this.sliderButton[e].forEach(e=>e.classList.remove(this.sliderClass+"__button--disabled")),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.remove(this.sliderClass+"__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.remove(this.sliderClass+"__prev--disabled"))}sliderAutoplayPause(e){this.autoplayTimer[e]=setInterval(()=>this.sliderNext(e),this.autoplayInterval)}sliderAutoplayUnpause(e){clearInterval(this.autoplayTimer[e])}sliderLinkClick(e){this.sliderLinkDragged&&e.preventDefault()}sliderDragStart(e,t){if(this.sliderDisabled[t])return;if(!this.interruptible&&this.transitioning[t])return;if(!this.draggable)return;if(!this.draggableWithMouse&&"touchstart"!=e.type)return;if(null!=e.target.closest(`.${this.sliderClass}__button`)||null!=e.target.closest(`.${this.sliderClass}__next`)||null!=e.target.closest(`.${this.sliderClass}__prev`))return;let s=e.clientX;"touchstart"==e.type&&(s=e.touches[0].clientX),this.draggedSlider=t,this.dragThresholdReached=!1,this.sliderDragged=!0;const i=getComputedStyle(this.sliderWrapper[t]).transform.match(/matrix.*\((.+)\)/)[1].split(", "),r=parseInt(i[4]);this.slider[t].classList.add(this.sliderClass+"--dragged"),this.sliderWrapper[t].classList.add(this.sliderClass+"__wrapper--dragged"),this.sliderWrapper[t].style.transform="translateX("+r+"px)",this.dragInitialPos=s,s==e.clientX&&(e.preventDefault(),this.sliderLinkDragged=!1),this.sliderWrapperDragOffset[t]=r,this.sliderWrapperPos[t]=r}sliderDragMove(e){if(this.sliderDragged){let t=e.clientX;"touchmove"==e.type&&(t=e.touches[0].clientX);const s=Math.abs(this.dragInitialPos-t);if(!this.dragThresholdReached&&s>this.dragOffsetThreshold){this.dragThresholdReached=!0,this.sliderDragPos=t,this.scrollYEnabled=!1;let s=[];for(let e of this.sliderItem[this.draggedSlider])s.push(e.offsetHeight);this.sliderWrapper[this.draggedSlider].style.maxHeight=Math.max(...s)+"px",t==e.clientX&&(this.sliderLinkDragged=!0);for(let e of this.sliderItem[this.draggedSlider])e.classList.add(this.sliderClass+"__item--current")}if(!this.dragThresholdReached)return;let i;i=t-this.sliderDragPos,this.sliderDragPos=t,this.sliderWrapperDragOffset[this.draggedSlider]+=i,this.sliderWrapper[this.draggedSlider].style.transform="translateX("+this.sliderWrapperDragOffset[this.draggedSlider]+"px)",this.sliderDragCheck()}}sliderDragCheck(){const e=this.sliderWrapper[this.draggedSlider].offsetWidth/this.visibleItems[this.draggedSlider];this.sliderWrapperPos[this.draggedSlider]<0?this.sliderWrapperPos[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]<=e*-this.dragMoveCoefficient?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]>=e*this.dragMoveCoefficient&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]<=e*-this.dragMoveCoefficient?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]>=e*this.dragMoveCoefficient&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider))}sliderDragEnd(){this.sliderDragged&&(this.sliderDragged=!1,this.slider[this.draggedSlider].classList.remove(this.sliderClass+"--dragged"),this.sliderWrapper[this.draggedSlider].classList.remove(this.sliderClass+"__wrapper--dragged"),this.sliderMove(this.draggedSlider))}scrollStart(e){this.scrollY=e.touches[0].clientY,this.scrollXEnabled=!0,this.scrollYEnabled=!0}scrollMove(e){this.scrollXEnabled&&this.scrollYEnabled&&Math.abs(this.scrollY-e.touches[0].clientY)>this.dragOffsetThreshold&&(this.scrollXEnabled=!1),this.scrollYEnabled?this.scrollXEnabled||this.sliderDragEnd():e.preventDefault()}}const slider=new Slider({clonedItems:1,infinite:!0,sliderClass:"slider"});let activeTeamMember,currentRow,lastRow,teamMember=Array.from(document.querySelectorAll(".about__team-member")),teamMemberDescription=Array.from(document.querySelectorAll(".about__team-member-description")),initialItem=0;teamMember.forEach(e=>e.addEventListener("click",()=>switchDescription(e))),window.addEventListener("resize",moveMemberItems);for(let e=0;e<teamMember.length;e++)teamMember[e].style.order=e,teamMemberDescription[e].style.order=e;function switchDescription(e){for(let t=0;t<teamMember.length;t++)if(e==teamMember[t]&&teamMember[t]!=teamMember[activeTeamMember]){activeTeamMember=t,teamMemberDescription.forEach(e=>e.classList.remove("about__team-member-description--active")),teamMemberDescription[t].classList.add("about__team-member-description--active"),moveMemberItems();break}}function moveMemberItems(){let e=getComputedStyle(root).getPropertyValue("--team-item-flexbasis"),t=Math.ceil(teamMember.length/e);null==currentRow&&(currentRow=Math.ceil((initialItem+1)/(e-1))),lastRow=currentRow,currentRow=Math.ceil((activeTeamMember+1)/e);for(let s=currentRow;s<t;s++){if(lastRow<=currentRow&&activeTeamMember+1==e*s&&(currentRow+=s),activeTeamMember+1==e*s-1&&lastRow!=currentRow&&(lastRow=lastRow+s-1),lastRow>currentRow&&activeTeamMember+1==e*s){if(activeTeamMember!=teamMember.length-1){let e=[],t=[];for(let s=0;s<teamMember.length;s++)e[s]=teamMember[s],t[s]=teamMemberDescription[s];for(let s=0;s<teamMember.length;s++)teamMember[s].style.order--,teamMemberDescription[s].style.order--,e[s]=teamMember[s+1],t[s]=teamMemberDescription[s+1];e[teamMember.length-1]=teamMember[0],t[teamMember.length-1]=teamMemberDescription[0],teamMember=e,teamMemberDescription=t,teamMember[teamMember.length-1].style.order=teamMember.length-1,teamMemberDescription[teamMember.length-1].style.order=teamMember.length-1,activeTeamMember--}break}if(currentRow>lastRow&&activeTeamMember!=teamMember.length-1){let e=[],t=[];for(let s=0;s<teamMember.length;s++)e[s]=teamMember[s],t[s]=teamMemberDescription[s];for(let s=teamMember.length-1;s>=0;s--)teamMember[s].style.order++,teamMemberDescription[s].style.order++,e[s]=teamMember[s-1],t[s]=teamMemberDescription[s-1];e[0]=teamMember[teamMember.length-1],t[0]=teamMemberDescription[teamMember.length-1],teamMember=e,teamMemberDescription=t,teamMember[0].style.order=0,teamMemberDescription[0].style.order=0,activeTeamMember++}break}}null!=teamMember[initialItem]&&teamMember[initialItem].click();const anchors=document.querySelectorAll('a[href^="#"]');let hash;window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(document.querySelector(""+hash).scrollIntoView({behavior:"auto",block:"start"}),history.replaceState("",document.title,window.location.pathname+window.location.search)))),window.addEventListener("load",()=>{""!=hash&&null!=document.querySelector(""+hash)&&document.querySelector(""+hash).scrollIntoView({behavior:"smooth",block:"start"})});for(let e of anchors)e.addEventListener("click",t=>{t.preventDefault();let s=e.getAttribute("href");"#"!=s&&(null==document.querySelector(s)&&(window.location.href="index"+s),hamburger.click(),document.querySelector(""+s).scrollIntoView({behavior:"smooth",block:"start"}))});
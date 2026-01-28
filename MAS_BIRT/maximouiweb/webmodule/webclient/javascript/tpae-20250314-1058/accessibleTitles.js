/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2019,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

function addAccessibleTooltipToInput(input){
	if(!input.hasAttribute('access-title')){
		let control = input.closest('[control=true]');
		if(control){
			let role = input.getAttribute('role');
			let label = document.querySelector(`label[for="${input.id}"]`);
			if(!label) {
				label = control.querySelector(role==='checkbox'?'span':'label');
			}
			let placeholder = input.getAttribute('placeholder');
			let title = input.getAttribute('title');
			let ariaLabel = input.getAttribute('aria-label');
			if(label || ariaLabel) {
				let labelText = ariaLabel || (label.innerText).replace(':','');
				if(title && title.includes(labelText)){
					labelText = '';
				}
				else {
					labelText += ' ';
				}
				title = labelText + (title?''+title:'');
			}
			else if(placeholder){
				title = placeholder;
			}
			if(title && input){
				title = title.replace(' required ', '');
				title += ((input.getAttribute('aria-required') === 'true')?' Required':(input.hasAttribute('readonly')?accessibleLabels.readonly:''));
				if(role === 'checkbox'){
					let checked = input.getAttribute('aria-checked');
					title += (checked=='true'?accessibleLabels.checked:accessibleLabels.unchecked);
					if(role === 'checkbox'){
						input.setAttribute('aria-labelledby', label.id);	
					}
					if(input.hasAttribute('aria-disabled')){
						title += accessibleLabels.readonly; 
					}
				}
				let dateType = input.getAttribute("popuptype");
				if(dateType){
					let constraints = input.getAttribute('constraints');
					if(constraints){
						constraints = dojo.fromJson(constraints);
						switch(true){
							case dateType.includes('.Calendar'):
								title += ' ('+constraints.datePattern+') ';
								break;
							case dateType.includes('.DateTimeCalendar'):
								title += ' ('+constraints.datePattern +' '+ constraints.timePattern +') ';
								break;
						}
					}
					title = title.replace(SELECT_VALUE+' ', '');
				}
				input.setAttribute('title', title);
				input.setAttribute('access-title', true);
				addFocusTitleListeners(input);	
			}

		}
		var observer = new MutationObserver(function(e){
			let target;
			if(target = e[0].target){
				addAccessibleTooltipToInput(target);
			}
		});
		// Start observing the target node for configured mutations
		observer.observe(input, {attributes: true});
	}
}

function focusTitleElement(element){
	
	var clearTimers = function(){
		accessibleTooltipHideTimers.forEach(function(timer){
			window.clearTimeout(timer);
		});
		accessibleTooltipHideTimers = [];
	};
	
	window.setTimeout(function(){
		let cType = element.getAttribute('cType');
		let role = element.getAttribute('role');
		if(role === 'tab' || cType === 'label' && element.className.includes('qil')){
			return;
		}
		clearTimers();
		let tooltipDiv = document.getElementById('accessibleTitleDiv');
		if(!tooltipDiv.hasAttribute('data-acc-init')){
			addListener(tooltipDiv, "mousedown", function(e){
				tooltipDiv.style.display = "none";
				try {
					var clickEl = document.elementFromPoint(e.clientX, e.clientY);
					if(clickEl){
						clickEl.click();
					}
				}
				catch(error){}
				tooltipDiv.style.display = "inline-block";
			});
			tooltipDiv.setAttribute('data-acc-init','true');
		}
		tooltipDiv.className = 'accessibleTitleDiv';
		tooltipDiv.setAttribute('element-id', element.id);
		let title = element.getAttribute('title');
		if(title.trim().length > 0){
			tooltipDiv.innerText = title;
			tooltipDiv.style.display = 'inline-block';
			let position = dojo.position(element);
			let divPosition = dojo.position(tooltipDiv);
			tooltipDiv.style.left = position.x + (position.w/2) + 'px';
			tooltipDiv.style.top = position.y + position.h + 'px';
			window.setTimeout(function(){
				tooltipDiv.style.transition = 'none';
				let position = dojo.position(element);
				let divPosition = dojo.position(tooltipDiv);
				divPosition = dojo.position(tooltipDiv);
				tooltipDiv.className = 'accessibleTitleDiv';
				if(divPosition.x < 0){
					let change = Math.abs(parseInt(tooltipDiv.style.left));
					tooltipDiv.style.left = (divPosition.w/2) + 'px';
					switch (true) {
					  case (change/divPosition.w <= 30):
						  tooltipDiv.className += ' accessibleTitleDiv_25';
					    break;
					  case (change/divPosition.w <= 65): 
					    break;
					  case (change/divPosition.w <= 100): 
						  tooltipDiv.className += ' accessibleTitleDiv_75';
					    break;
					}
				}
				else {
					let xDiff = (divPosition.x + divPosition.w) - window.innerWidth;
					if(xDiff > 0){
						let change = position.x - xDiff;
						tooltipDiv.style.left = change + 'px';
						switch (true) {
						  case (change/divPosition.w <= 10):
							  tooltipDiv.className += ' accessibleTitleDiv_90';
						    break;
						  case (change/divPosition.w <= 30):
							  tooltipDiv.className += ' accessibleTitleDiv_75';
						    break;
						  case (change/divPosition.w <= 65): 
						    break;
						  case (change/divPosition.w <= 90): 
							  tooltipDiv.className += ' accessibleTitleDiv_25';
						    break;
						  case (change/divPosition.w <= 100): 
							  tooltipDiv.className += ' accessibleTitleDiv_10';
						    break;
						}
					}
				}
				tooltipDiv.style.transition = 'left .1s, top .1s, opacity 0.2s';
				var rect = tooltipDiv.getBoundingClientRect();;
				var diff = rect.bottom - window.innerHeight;
				if(diff > 0){
					tooltipDiv.style.top = (position.y - rect.height - 20) + 'px';
					tooltipDiv.className += ' no-pointer';
				}
			}, 50);
		}
	}, 10);

}

function addFocusTitleListeners(titleElement){
	if(!addFocusTitles){
		return;
	}
	if(titleElement.hasAttribute('focus-title')){
		return;
	}

	addListener(titleElement, "focus", function(e){
		focusTitleElement(e.currentTarget)
	});
	
	addListener(window, "resize", function(e){
		accessibleTooltipResizeTimer = window.setTimeout(function(){
			if(accessibleTooltipResizeTimer){
				window.clearTimeout(accessibleTooltipResizeTimer);
			}
			accessibleTooltipResizeTimer = setTimeout(function(){
				var tooltipDiv = document.getElementById('accessibleTitleDiv');
				if(tooltipDiv.style.display != 'none'){
					var element = document.getElementById(tooltipDiv.getAttribute('element-id'));
					if(element){
						focusTitleElement(element)
					}
				}
			}, 250);
		});
	});
	
	addListener(titleElement, "blur", function(e){
		accessibleTooltipHideTimers.push(window.setTimeout(function(){
			document.getElementById('accessibleTitleDiv').style.display = 'none';
		}, 100));
	});
	titleElement.setAttribute('focus-title', true);
}

var accessibleTooltipResizeTimer;
var accessibleTooltipHideTimers = [];
var accessibleTitleDiv;
var ANCHOR_KEY = false;
function makeChildrenMoreAccessible(parent){
	if(SCREENREADER && ACCESSIBLE_TITLES == true){ //only do this for screen reader users when accessible titles are allowed
		if(!ANCHOR_KEY){
			document.body.addEventListener('keydown', function(evt){
				if(evt.key === " " && evt.target.tagName === "A"){
					cancelEvent(evt);
					evt.target.click();
				}
			}, true);
		}
		ANCHOR_KEY = true;
		let useLabel = false;
		if(parent){
			useLabel = true;
		}
		let parentElement = parent?parent:document;
		if(!accessibleTitleDiv){
			accessibleTitleDiv = document.createElement('div'); 
			accessibleTitleDiv.className = 'accessibleTitleDiv';
			accessibleTitleDiv.id = 'accessibleTitleDiv';
			document.body.appendChild(accessibleTitleDiv);
		}
		
		// Setup all detail style buttons to have tooltip that binds it to the field to which it belongs
		Array.prototype.slice.call(parentElement.querySelectorAll('a > img.dButton, a[role=checkbox] > img')).forEach(function(dbutton){ 
			let anchor = dbutton.closest('a');
			if(anchor && !anchor.hasAttribute('accessible-title')){
				let control = dbutton.closest('[control=true]');
				if(control){
					let label = control.querySelector('label');
					if(label){
						let title = (label.innerText).replace(':','') + ' ' + anchor.getAttribute('title');
						let input = anchor.previousSibling;
						if(input && input.tagName === 'INPUT'){
							let ldimg = anchor.querySelector('img[source*=longdescription]');
							if(ldimg){
								//no message/label to use to localize this
								title += ': '+ (ldimg.getAttribute('source').includes('_on')?'On':'Off');
								input.setAttribute('title', accessibleLabels.description.replace('{0}', (label.innerText).replace(':','')));
							}
						}
						anchor.setAttribute('title', title);
						anchor.setAttribute('accessible-title', title);
					}
				}
			}
		});

		Array.prototype.slice.call(parentElement.querySelectorAll('input[type=text], a[role=checkbox]')).forEach(function(input){ 
			addAccessibleTooltipToInput(input);
		});
		
		//Fix empty table cell headers
		Array.prototype.slice.call(parentElement.querySelectorAll('tr > th[tablecell="1"] > div')).forEach(function(div){ 
			if(div.innerHTML.includes("&nbsp;") || div.style.display === 'none'){
				div.parentElement.setAttribute("aria-hidden", "true");
			}
		});

		//Fix all portlet and table filter fields to have a more verbose title
		Array.prototype.slice.call(document.querySelectorAll('tr.rstfc input[type=text], tr.tfr input[type=text]')).forEach(function(input){
		  if(!input.hasAttribute('accessible-title')){
			  let wrapper = input.closest('.pbt');
			  if(!wrapper){
				  wrapper = input.closest('.tableouter');
			  }
			  if(wrapper){
				let header = wrapper.querySelector('h1');
				if(header){
					let headerLabel = header.innerText;
					let title = input.getAttribute('title');
				    input.setAttribute('title', headerLabel + ' ' + (title?title:''));
				    input.setAttribute('accessible-title', title);
			    }
			  }
		  }
		});
		
		let scdiv = document.querySelector('.appContent > div');
		if(scdiv && !scdiv.hasAttribute('data-acc-init')){
			addListener(scdiv, "scroll", function(e){
				document.getElementById('accessibleTitleDiv').style.display = 'none';
			});
			scdiv.setAttribute('data-acc-init','true');
		}
		
		//Fix all elements with titles to show the title when element is focused. text inputs handled elsewhere
		Array.prototype.slice.call(parentElement.querySelectorAll('*[title], input[type=image]')).forEach(function(titleElement){
			if(!titleElement.hasAttribute('focus-title')){
				let tr = titleElement.closest('tr');
				let tableFilterField = (titleElement.className.includes('tablefilterfield') ||(tr && tr.className.includes('rstfc')));
				if(titleElement.tagName != 'INPUT' || tableFilterField || titleElement.getAttribute('type') === 'image' || titleElement.hasAttribute('access-title')){
					let title = titleElement.getAttribute('title');
					if(tableFilterField){
						let filter = (title.toLowerCase().includes('filter'))?'':accessibleLabel.filter;
						if(filter){
							title = filter.replace('{0}', title);
						}
						titleElement.setAttribute('title', title);
					}
					let tableHeaderButton = titleElement.tagName === 'A' && titleElement.parentNode.className.includes('thb');
					if(tableHeaderButton){
						let wrapper = titleElement.closest('.tableouter');
						if(wrapper){
							let tableTitle = wrapper.querySelector('h1');
							if(tableTitle){
								let titleText = tableTitle.innerText;
								if(titleText && !titleElement.getAttribute('title').includes(titleText)){
									titleElement.setAttribute('title', titleText + ' ' + title);
								}
							}
						}
					}
					addFocusTitleListeners(titleElement);
				}
			}
		});
		
		//fix all portlet links to include the title of the portlet
		Array.prototype.slice.call(parentElement.querySelectorAll('.ps.hbsh > a, .bbps.hbsh > a')).forEach(function(anchor){
			if(!anchor.hasAttribute('portlet-title')){
				let tr = anchor.closest('tr');
				if(tr){
					let h1 = tr.querySelector('h1');
					if(!h1 && useLabel){
						h1 = tr.querySelector('label');
					}
					if(h1){
						let img = anchor.querySelector('img');
						if(img){
							img.setAttribute('title', anchor.getAttribute('title') + ' ' + h1.innerText);
						}
						anchor.setAttribute('title', anchor.getAttribute('title') + ' ' + h1.innerText);
						anchor.setAttribute('portlet-title', true);	
					}
				}
			}
		});
		
		//merge toolbars to be one toolbar
		let toolbars = Array.prototype.slice.call(document.querySelectorAll('td.tbs ul[role=toolbar]'));
		let newTB = null;
		if(toolbars.length>1){
			//take all child LI's from toolbars 2 thru n and move under toolbar 1.  Remove the empty toolbars.
			newTB = toolbars[0];
		}
		let idx = 0;
		toolbars.forEach(function(tb){
			if(idx==0){
				//First Toolbar, skip it
			}
			else{
				Array.prototype.slice.call(tb.querySelectorAll('li[ctype=toolbarbutton]')).forEach(function(button){
					if(newTB != null){
						newTB.appendChild(button);
					}
				});
				// .closest() is not supported on IE, but we don't support IE for accessibility.  So using it here.
				let td = tb.closest('td.tbs');
				td.parentElement.removeChild(td);
			}
			idx++;
		});
	}
}

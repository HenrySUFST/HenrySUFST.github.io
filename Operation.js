(function () {
	//import "Charts.js";
    'use strict';
    const setInnerHtml = function (selector, html) {
        const elements = document.querySelectorAll(selector);
        if (elements.length !== 1) {
            throw new Error(`Expected to find one element with selector ${selector}, instead found ${elements.length}`);
        }
		
        const element = elements[0];
        element.innerHTML = html;

    };
	
	const programControls = function(){
		createNewPageButtons();
		createNewGraph()
		createDropDown();
		//This also sets the tab control to default
	}
	
	let pages=["operationBtn", "damageBtn", "graphsBtn", "settingsBtn"];
	let PageButtons=[];
	
	
	function createNewPageButtons() {

		PageButtons=document.getElementsByClassName("tab-button");
		for (let i = 0; i < PageButtons.length; i++) {
			PageButtons[i].addEventListener("mousedown", changePage, false);
		}
		
		//Set page to green
		changeButtonColours(PageButtons[0]);
		
		document.getElementById("topSettingsBtn").addEventListener("mousedown", changePage, false);
	}
	
	function createNewGraph(){
		const graphs=document.getElementsByClassName("graph");
		for (let i = 0; i < graphs.length; i++) {
			graphs[i].addEventListener("mousedown", clickGraph, false);;
		}
	}
	
	function changeButtonColours(SelectedButton){
		//This works, but not well. Refactor when find the time
		
		let tabcontent = document.getElementsByClassName("tabcontent");
		console.log(PageButtons);
		console.log(SelectedButton);
		for (let i = 0; i < PageButtons.length; i++) {

			if (PageButtons[i].id !== SelectedButton.id){
				PageButtons[i].style.color = "black";
				tabcontent[i].style.display="none";
			}
			else{
				tabcontent[i].style.display="flex";
				PageButtons[i].style.color = "black";
			}
		}
		if (SelectedButton.id=="topSettingsBtn"){
			tabcontent[3].style.display="flex";
			PageButtons[3].style.color = "#00bf63";
		}
		
		
	}
	
	function changePage(event){
		changeButtonColours(event.srcElement);
	}
	
	let NoOfDamageNotifications=0;
	function setDamageNotification(){
		let Notifications = document.getElementById("damageNotification");
		Notifications.textContent=NoOfDamageNotifications;
	}	
	
	const setNumericValue = function (selector, value) {
		const NumericValueElement = document.getElementById(selector);
		NumericValueElement.textContent = value;
    }
	
	const DamageIndicators=["Recieved_Damage", "Maximum_Impact", "Vibration_Indicator", "Electronics_Indicator", "Communications_Indicator"];
	const setRadioButton = function (selector, value) { 
		const RadioButton = document.getElementById(selector);
		if (value != RadioButton.checked && DamageIndicators.includes(selector) == true){
			if (value==true){
				NoOfDamageNotifications+=1;
			}
			else {
				NoOfDamageNotifications-=1;
			}
			setDamageNotification();
		}

		RadioButton.checked = value;

	}
	
	const setGraph = function (selector, values) {

		const NoOfDataPoints=values.length;
		let data = [];
		//setRadioButton("Alignment-Error", true);
		const canvas = document.getElementById(selector);
		
		const ctx = canvas.getContext('2d');

		ctx.lineWidth=5;
		//data = Array.from({length: NoOfDataPoints}, () => Math.floor(Math.random() * canvas.height));
		
		data=normaliseArray(values, canvas.height);
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(0, canvas.height - data[0]);

		for (let i = 1; i < data.length; i++) {
			 ctx.lineTo((canvas.width / NoOfDataPoints) * i, canvas.height - data[i]);
		}

		ctx.strokeStyle = 'green';
		ctx.stroke();
		
	}
	
	
	function normaliseArray(values, canvasHeight){
		//The values of the array need to be scaled so the maximum value is just under the height of the canvas

		let maxVal=0;
		for (let i = 0; i < values.length; i++) {
			if (Math.abs(values[i]) > maxVal){
				maxVal=Math.abs(values[i]);
			}
		}
		
		//Multiply the divisor by 1.1 so there is a gap between the top of the graph and the border
		maxVal *= 1.1;


		for (let i = 0; i < values.length; i++) {
			//bring all values between 0 and 0.9, then multiply by the height of the graph
			values[i] /= maxVal;
			values[i] *= canvasHeight;
		}

		return values
	}
	
	let SelectedGraph = "Speed";
	
	function clickGraph(event){
		//This sets the name of the big graph
		
		
		changeButtonColours(PageButtons[2]);
		//PageButtons 2 is the graphs page. This ensures that the button looks activated
		
		const GraphTitle=document.getElementById("OperationsStuff");
		GraphTitle.textContent=event.srcElement.id;
		SelectedGraph=event.srcElement.id;

	}
	
	const fetchCurrentGraphName = function (){
		return SelectedGraph;
	}


	function createDropDown(){
		//https://www.w3schools.com/howto/howto_custom_select.asp
		var x, i, j, l, ll, selElmnt, a, b, c;
		/* Look for any elements with the class "custom-select": */
		x = document.getElementsByClassName("custom-select");
		const GraphOptions= ["Graph:","Speed Against Time", "Downtime"]
		
		
		const select = document.querySelector('select'); 
		
		for (let i = 0; i < GraphOptions.length; i++) {
			let newOption = new Option(GraphOptions[i],GraphOptions[i]);
			select.add(newOption,undefined);
		}

		
		l = x.length;
		for (i = 0; i < l; i++) {
		  selElmnt = x[i].getElementsByTagName("select")[0];
		  ll = selElmnt.length;
		  /* For each element, create a new DIV that will act as the selected item: */
		  a = document.createElement("DIV");
		  a.setAttribute("class", "select-selected");
		  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		  x[i].appendChild(a);
		  /* For each element, create a new DIV that will contain the option list: */
		  b = document.createElement("DIV");
		  b.setAttribute("class", "select-items select-hide");
		  for (j = 1; j < ll; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				/* When an item is clicked, update the original select box,
				and the selected item: */
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
				  if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
					  y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				  }
				}
				h.click();
			});
			b.appendChild(c);
		  }
		  x[i].appendChild(b);
		  a.addEventListener("click", function(e) {
			/* When the select box is clicked, close any other select boxes,
			and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		  });
		}
	}

	function closeAllSelect(elmnt) {
	  /* A function that will close all select boxes in the document,
	  except the current select box: */
	  var x, y, i, xl, yl, arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  xl = x.length;
	  yl = y.length;
	  for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
		  arrNo.push(i)
		} else {
		  y[i].classList.remove("select-arrow-active");
		}
	  }
	  for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
		  x[i].classList.add("select-hide");
		}
	  }
	}

	/* If the user clicks anywhere outside the select box,
	then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
	

    window.WebVISetInnerHtml = {
		setInnerHtml,
		setNumericValue,
		setRadioButton,
		setGraph,
		fetchCurrentGraphName,
		programControls
	};
	
}());
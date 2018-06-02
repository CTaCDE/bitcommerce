function autofill (){
	document.getElementById('input1').value = "My Text Input";
	document.getElementById('input2').value = "Dropdown2";
	 
	    var radioElements = document.getElementsByName("input3");

	    for (var i=0; i<radioElements.length; i++) {
	      if (radioElements[i].getAttribute('value') == 'Radio3') {
	        radioElements[i].checked = true;
	      }
	    }
  }
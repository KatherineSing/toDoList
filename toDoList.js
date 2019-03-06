let url = "https://api.weatherbit.io/v2.0/current?city=LosAngeles,CA&key=9f92d149d3a54a32b2b9fb8dcc5f8203";
APICallFunction(url);


document.querySelector('#weatherDropDown').onsubmit = function(){
	var city = document.querySelector('#cities').value;
	// console.log(city);
	url = "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=9f92d149d3a54a32b2b9fb8dcc5f8203";
	APICallFunction(url);
	return false;
}

function APICallFunction(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
	//waiting for a state change from xhr.send()
	xhr.onreadystatechange = function(){
		// console.log(this); //this refers to this event
		// check if state is done
		if(this.readyState == this.DONE){
			if(xhr.status == 200){
				//status = 200 means success
				// console.log("success!");
				//success! Call the function we want
				var parsedJson = JSON.parse(xhr.responseText);
				weatherCallBack(parsedJson);
				
				
			}
			else {
				//failed for some reason
				// console.log(xhr.status);
			}
		}
	}
}

function weatherCallBack(obj){

	// console.log(obj.data[0]);
	document.querySelector("#city").innerHTML=obj.data[0].city_name;
	tempF = Math.round((obj.data[0].temp * 9 / 5 + 32) * 100) / 100 ;
	document.querySelector("#temp").innerHTML=tempF;
	document.querySelector("#vis").innerHTML=obj.data[0].weather.description;
	app_tempF = Math.round((obj.data[0].app_temp * 9 / 5 + 32) * 100) / 100 ; 
	document.querySelector("#app_temp").innerHTML=app_tempF;
}
//when enter is pressed, add the task
window.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
    	if (document.querySelector("#enter-task-box").value.trim() != ""){
    		// Create the new element
    		//create a div
    		var div = document.createElement("div");
    		div.className = 'inline-field'; 
    		//create an input checkbox
    		var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.className = "checkbox";
			
    		//create an li
    		var li = document.createElement('li');
			li.className = 'task'; // Class name
			li.innerHTML = document.querySelector("#enter-task-box").value; // Text inside
			li.onclick = strikeThrough; // Attach the event function!
    		//append input checkbox and li to div
    		div.appendChild(checkbox);
    		div.appendChild(li); //append div to ul
			document.getElementById("tasks").appendChild(div); // Append it
			document.querySelector("#enter-task-box").value = "";
			console.log($(".checkbox"));

$( ".checkbox").each(function(index) {
	$(this).on("click",function(){
	$(this).parent().fadeToggle(1000, function(){ //this means each checkbox you iterate though
  			$(this).remove();
  		});
	});
});

			//https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/
    	}
    	// //this method below doesn't work with dynamically created js elements
        // var str = "<li>" + document.querySelector("#enter-task-box").value + "</li>"
        // document.querySelector("#new-task").innerHTML += str;
        // document.querySelector("#enter-task-box").value = "";
        // listItems = document.querySelectorAll("li");
    }
}, false);


// ************** STRIKING THROUGH AN ITEM ************************ //
let listItems = document.querySelectorAll("li");
for(let i = 0; i<listItems.length;i++)
{
	listItems[i].onclick = strikeThrough;
}

function strikeThrough() {
	//toggle
	if(this.classList.contains("crossed-out") ){
		this.classList.remove("crossed-out");
		// console.log(i + "crossed-out");
	}
	else{
		this.classList.add("crossed-out");
		// console.log(i + "UNcrossed-out");
	}
}

// ************** DELETING AN ITEM ************************ //

$( ".checkbox").each(function(index) {
	$(this).on("click",function(){
	$(this).parent().fadeToggle(1000, function(){ //this means each checkbox you iterate though
  			$(this).remove();
  		});
	});
});
// ****** EXPANSION/CONTRACTION OF TO-DO INPUT BOX ******* //
// document.querySelector(".plus").onclick = function() {
// 	console.log(this.parentElement.nextElementSibling); //the elem that comes right after
// 	//toggle
// 	if(this.parentElement.nextElementSibling.classList.contains("hide") ){
// 		this.parentElement.nextElementSibling.classList.remove("hide");
// 	}
// 	else{
// 		this.parentElement.nextElementSibling.classList.add("hide");
// 	}
// }
console.log( $("#enter-task-box"));
$(".plus").click(function(){
	$("#enter-task-box").slideToggle();
});




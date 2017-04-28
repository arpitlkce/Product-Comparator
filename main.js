//OOJS class definition
product = function(){}

product.prototype = {

		
	compArray : [],
	type:"All",
	init:function(){	
//CLICK Events for Tab Switch 
//for every tab switch will call Restful API through AJAX by passing selected cars and type of tab
	$("#all").click(function(){
		prod.type="All";
		$('#compareTable thead tr').empty();
		$('#compareTable tbody').empty();
		prod.getdata();
	}); 
	
	$("#similar").click(function(){
		prod.type="Similar";
		$('#compareTable thead tr').empty();
		$('#compareTable tbody').empty();
		prod.getdata();
	});
	
	$("#difference").click(function(){
		prod.type="Differ";
		$('#compareTable thead tr').empty();
		$('#compareTable tbody').empty();
		prod.getdata();
	});
	
	$('#compareTable').hide();
	$(".list-group").on('click','input[type="checkbox"]',function(){
	var index = prod.compArray.indexOf(this.id); 
	if(!this.checked && index !== -1 ) {
			prod.compArray.splice(index,1);
			return;
		} 
	if(prod.compArray.length != 3) {
			prod.compArray.push(this.id);	

	} else {
			this.checked = false;
			$('#myModal').modal('show');
			console.log("Max 3 selection");
	}
	console.log(prod.compArray);
	});

	$("#compare").click(function(){
		$('#compareTable').show();
		prod.getdata();
	});

	prod.homePageSetUp();
	},

getdata:function(){
	//AJAX call for getting data for comaprison table 
	//using second URL for hardcoded data.No Server
	$.ajax({
	//url:"compareData.json?sel1="+prod.compArray[0]+"sel2="+prod.compArray[1]+"sel3="+prod.compArray[2]+"type="+prod.type, // Use this URL for sending data through Request Params
	url:"compareData.json",
	method:"GET",
	success:function(data){
		prod.createTable(data.data,"ALL");
},
error:function(data){
	console.log("error");
	}
});
	
	
},

//Method for getting Cars list from Server and render on UI
homePageSetUp:function(){
	//AJAX for getting car list
	$.ajax({
	url:"carList.json",
	method:"GET",
	success:function(data){
	prod.renderCarList(data.data);
},
	error:function(data){
		console.log("error")
		}
});
	
},

//Render Car list on Home Page
renderCarList:function(data){
	$.each(data,function(index,value){
	$('.list-group').append("<li class='list-group-item'>" +
	"<h4 class='list-group-item-heading text-primary'><strong>"+value.Name+"</strong></h4>" +
	"<div class='list-group-item-text'>"+value.type+"</div>"+
	"<div class='list-group-item-text'><strong>Rs. "+value.price+" lakh</strong> Ex-showRoom Price(New Delhi)<span class='pull-right'><input id='"+value.Name+"' type='checkbox'></input></span></div>"+
	"<div class='list-group-item-text'>Check On-Road Price</div>"+
	"</li>");
	});
	
	
	 
},




// Create table as per selection 
createTable:function(dataSet,type) {
		var head = "<th>Criteria</th>";
			$.each(prod.compArray,function(index,value){
				head+="<th>"+value+"</th>";
			});
		$('#compareTable thead tr').append(head);
	var tbody ="";
	dataSet.forEach(function(index,value){
	var td = "";
		for (var key in index) {
			td+="<td>"+index[key]+"</td>";
		}
		tbody+="<tr>"+td+"</tr>";
	
		
	});
	


$('#compareTable tbody').append(tbody);
$("#compareScreen").hide();
 table = $('#compareTable').DataTable( {
    	"paging":   false,
        "ordering": false,
        "info":     false,
		"searching": false,
		"destroy": true,

    } );
}

}
// creating instance of class
var prod = new product();
prod.init();

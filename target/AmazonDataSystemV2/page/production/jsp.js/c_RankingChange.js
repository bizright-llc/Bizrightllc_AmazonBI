﻿function showData(){
	Amazon_MonitoringOverview_RankingChange(getParameter())
}

function Amazon_MonitoringOverview_RankingChange(v){
	showLoading();
	if ($('#table').hasClass('dataTable')) {
		let  dttable = $('#table').dataTable();
		 dttable.fnClearTable(); //清空一下table
		 dttable.fnDestroy(); //还原初始化了的datatable
    }
	$("#table tbody").html('<tr><td colspan="100">loading....</td></tr>');
	$.ajax({
		url:path+'/sku/Amazon_MonitoringOverview_RankingChange.htm',
		type:"POST",
		data:{
			top:v._top,
			keyword:v.input_value,
			brand:v.brand,
			SubCategory:v.category,
			tag:v.tag,
			cityCode:$("#cityCode").val(),
			date:$("#dataStr").val()
		},
		success:function(value){
			closeLoading();
			var data = JSON.parse(value);
			$("#inserttime").text($("#dataStr").val());
			if (data.status == '1') {
				$("#table tbody").html('');
				if(data.data.length>0){
					
					$.each(data.data,function(index,value){
						$("#table tbody").append(`<tr>
		                <td><img src="${value.sku_imageUrl}" alt=""></td>
		                <td>${value.SKU}</td>
		                <td style="text-align: left;color: #0066c0;"><a href="${path}/sku_buyBoxOffer.htm?asin=${value.asin}&sku=${value.SKU}" target="_blank" class="blue">${value.sku_productTitle}</a> </td>
		                <td class="asin">${value.SubCategory}</td>
		                <td style="color: #999;">${value.yestday_rank}</td>
		                <td>${value.new_rank}</td>
		                <td>
		                ${(parseInt(value.new_rank)==parseInt(value.yestday_rank)?'不变':parseInt(value.new_rank)<parseInt(value.yestday_rank)?'<span class="red"><i class="iconfont icon-shangsheng red"></i>'+(parseInt(value.yestday_rank)-parseInt(value.new_rank)):'<span class="green"><i class="iconfont icon-xiajiang green"></i>'+(parseInt(value.yestday_rank)-parseInt(value.new_rank)))} 
		                </td>
		                <td class="asin">${value.asin}</td>
		                <td>
		                  <a href="${path}/sku_buyBoxOffer.htm?asin=${value.asin}&sku=${value.SKU}"  target="_blank" class="btn amazonBtn">查看</a>
		                </td>
		              </tr>`)
		              if(index == data.data.length-1 ){
			  				if ( $.fn.dataTable.isDataTable( '#table' ) ) {
							     $('#table').DataTable();
							}else{
								$('#table').on('page.dt',function() {}).dataTable({
									bLengthChange: false,
									"destroy": true,
									searching:false, 
									"drawCallback": function( settings ) {
										let h=$("body").height();
										let h2=$(window).height()
										if(h>h2){
										  $(".nav,.navSKU,.compareBox").height(h);
										}else{
										  $(".nav,.navSKU,.compareBox").height(h2);
										}
										}
								});
							}
							}
					})
				}else{
					$("#table tbody").html('');
					$("#table tbody").append('<tr><td colspan="100">暂无数据</td></tr>');
				}
			}
		}
	})
}
$("#dataStr").change(function(){
	showData();
})
{
	loadTag();
	getBrand();
	showData()	
}
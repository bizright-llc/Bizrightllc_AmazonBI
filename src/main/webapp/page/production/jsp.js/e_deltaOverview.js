﻿/**
 * 文档加载完成
 */
$(document).ready(function(){
	
     $('.main .tabs .easyAdd').click(function () {
         $('#deltaovertable tbody').prepend(
        		 '<tr>'+
	                 '<td></td>'+
	                 '<td><input type="text" placeholder="自定义sku" onchange="saveSku(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="01" month_en="JAN" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="02" month_en="FEB" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="03" month_en="MAR" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="04" month_en="APR" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="05" month_en="MAY" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="06" month_en="JUN" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="07" month_en="JUL" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="08" month_en="AUG" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="09" month_en="SEP" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="10" month_en="OCT" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="11" month_en="NOV" onchange="saveSkuNum(this)"></td>'+
	                 '<td><input type="number" value=0 yuce_month="12" month_en="DEC" onchange="saveSkuNum(this)"></td>'+
               '</tr>'
         );
     });
     
     
     $('#tab a').each(function(){
    	 var a = this;
    	 $(a).click(function(){
    		 $('#tab a').removeClass('current');
    		 $(this).addClass('current');
    		 showData();
    	 })
     })
     
	
	showData();
	
});




function saveSku(obj){
	var sku = $(obj).val();
	if(sku==''||sku==null){
		return;
	}
	var r=confirm("确定以【"+sku+"】作为sku编码？")
	if (!r){
		 return; 
	}
	
	 var tr = $(obj).parent().parent();
	 $(tr).attr('sku',sku);
	 
	 var skusetlist = new Array();
	 $(tr).find('input').each(function(){
		 var yuce_month = $(this).attr('yuce_month');
		 var month_en = $(this).attr('month_en');
		 var yuce_num = $(this).val();
		 if(yuce_month!=undefined&&yuce_month!=null){
			 skusetlist.push({'sku':sku,'yuce_month':yuce_month,'month_en':month_en,'yuce_num':yuce_num});
		 }
	 })
	 
	 updateSku(skusetlist);
	 
	 $(obj).attr('disabled','disabled');
	
}


function saveSkuNum(obj){
	var tr = $(obj).parent().parent();
	var skusetlist = new Array();
	var sku = $(tr).attr('sku');
	if(sku==null||sku==''){
		alert('请先填入sku编码!');
		return;
	}
	var yuce_month=$(obj).attr('yuce_month');
	var yuce_num=$(obj).val();
	skusetlist.push({'sku':sku,'yuce_month':yuce_month,'yuce_num':yuce_num});

	updateSku(skusetlist);
}

/**
 * 数组里面包含 数据库中的各个字段
 * @param arr
 */
function updateSku(arr){
	$.each(arr,function(){
		var myjson={};
		myjson.sku=this.sku;
		myjson.yuce_month=this.yuce_month;
		myjson.month_en=this.month_en;
		myjson.yuce_num=this.yuce_num;
		
		if($('#tab .current').text()=='Sales other channel'){
			myjson.type='其他';
		}else{
			myjson.type='单品';
		}
		
		//循环提交到后台进行更新写入操作
		$.ajax({
			type : 'get',
			url : path + '/sku/saveSkuDelta.htm',
			timeout : 100000,
			async:false,
			data : myjson,
			dataType : 'json',
			success : function(data) {
				if (data.status == 1) {
					console.log(myjson+'保存成功');
				}
			},
			error : function() {
				console.log('数据请求失败')
			}
		});
		
	})
}

//var dttable;
function showData(){
	
	var myjson = {};
	$('#deltaovertable tbody').html('');
	if($('#tab .current').text()=='Sales other channel'){
		myjson.type='其他';
	}else{
		myjson.type='单品';
	}
	
//	if ($('#deltaovertable').hasClass('dataTable')) {
//        dttable = $('#deltaovertable').dataTable();
//        dttable.fnClearTable(); //清空一下table
//        dttable.fnDestroy(); //还原初始化了的datatable
//    }
	
	showLoading();
	$.ajax({
		type : 'get',
		url : path + '/sku/getskusetInfo.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {
			closeLoading();
			if (data.status == 1) {
				$.each(data.data,function(index){
					$('#deltaovertable tbody').append(
							'<tr sku="'+this.sku+'">'+
	                        '<td>'+(index+1)+'</td>'+
	                        '<td>'+this.sku+'</td>'+
	                        '<td><input type="number" value='+this.yuce_num_01+' yuce_month="01" month_en="JAN" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_02+' yuce_month="02" month_en="FEB" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_03+' yuce_month="03" month_en="MAR" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_04+' yuce_month="04" month_en="APR" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_05+' yuce_month="05" month_en="MAY" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_06+' yuce_month="06" month_en="JUN" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_07+' yuce_month="07" month_en="JUL" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_08+' yuce_month="08" month_en="AUG" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_09+' yuce_month="09" month_en="SEP" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_10+' yuce_month="10" month_en="OCT" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_11+' yuce_month="11" month_en="NOV" onchange="saveSkuNum(this)"></td>'+
	                        '<td><input type="number" value='+this.yuce_num_12+' yuce_month="12" month_en="DEC" onchange="saveSkuNum(this)"></td>'+
	                    '</tr>'
					);
					
					
				});
				
				
				 //4、设置排序字段
//			    $('#deltaovertable').dataTable();
			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});
	
}




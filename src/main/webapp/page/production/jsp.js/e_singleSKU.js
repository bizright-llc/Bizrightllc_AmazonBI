﻿//$(function () {

var today=moment().subtract(1, 'days').format('YYYY-MM-DD');

function addEvent(){
	//声明需要用到的变量
	var mx = 0,
		my = 0; //鼠标x、y轴坐标（相对于left，top）
	var dx = 0,
		dy = 0; //对话框坐标（同上）
	var isDraging = false; //不可拖动
	let flag = false;

	//鼠标按下
	$(".draggable").mousedown(function (e) {
		e = e || window.event;
		mx = e.clientX; //点击时鼠标X坐标
		my = e.clientY; //点击时鼠标Y坐标
		// dx = $('.draggable').offset().left;
		// dy = $('.draggable').offset().top;
		dx = parseInt($('.draggable').css('left'));
		dy = parseInt($('.draggable').css('top'));
		isDraging = true; //标记对话框可拖动
	});

	//鼠标移动更新窗口位置
	$(document).mousemove(function (e) {
		var e = e || window.event;
		var x = e.clientX; //移动时鼠标X坐标
		var y = e.clientY; //移动时鼠标Y坐标
		if (isDraging) { //判断对话框能否拖动
			var moveX = dx + x - mx; //移动后对话框新的left值
			var moveY = dy + y - my; //移动后对话框新的top值
			//设置拖动范围
			var pageW = $(window).width();
			var pageH = $(window).height();
			var dialogW = $('.draggable').width();
			var dialogH = $('.draggable').height();
			var maxX = pageW - dialogW; //X轴可拖动最大值
			var maxY = pageH - dialogH; //Y轴可拖动最大值
			// moveX = Math.min(Math.max(0, moveX), maxX); //X轴可拖动范围
			// moveY = Math.min(Math.max(0, moveY), maxY); //Y轴可拖动范围
			//重新设置对话框的left、top
			$('.draggable').css({
				"left": moveX + 'px',
				"top": moveY + 'px'
			});
		};
	});

	//鼠标离开
	$(".draggable").mouseup(function () {
		isDraging = false;
	});


//            弹出框的实现， 加事件是为了鼠标移动在弹出框上面的时候不会消失
	$('body').on('mouseenter', 'td[data-toggle="popover"]', function(){

		if(!$(this).data('content')){
			let mData = '';
			var myjson = {};
			var className = $(this).attr('class');
			var num = $(this).text();
			if(parseInt(num)==0){
				//就没必要请求了
				mData=initToggleData(className)
				return;
			}

			myjson.sku=$('#sku').val();
			myjson.day=$(this).parent().attr('Date');
			myjson.className=className;

			//这个是后台返还数据重新拼成的串
			$.ajax({
				type : 'get',
				url : path + '/sku/getToggleData.htm',
				timeout : 100000,
				data : myjson,
				dataType : 'json',
				async: false,
				success : data => {

					mData=getReturnData(data,myjson);
					$(this).unbind('mouseenter');
					$(this).data('content',mData);
					$(this).popover({
						container: 'body',
						html: true,
						delay: {
							hide: 100
						},
					}).on('shown.bs.popover', function (event) {
						var that = this;
						if ($(this).data('trigger') == 'hover') {
							$('body').find('div.popover').on('mouseenter', function () {
								$(that).attr('in', true);
							}).on('mouseleave', function () {
								$(that).removeAttr('in');
								$(that).popover('hide');
							});
						} else {
							setTimeout(() => {
								flag = true;
							}, 50);
							$('.dayDate').each(function () {
								var obj = $(this);
								$(obj).datetimepicker({
									language: 'zh-CN',
									format: 'yyyy-mm-dd',
									startView: 2, //这里就设置了默认视图为年视图
									minView: 2, //设置最小视图为年视图
									maxView: 2,
									pickerPosition: "bottom-right",
								});
								//日期选择器时间改变
								$('.dayDate').on('changeDate', function (ev) {
									$(".datetimepicker").hide();
								});
							})
						}
					}).on('hide.bs.popover', function (event) {
						if ($(this).data('trigger') != 'hover') {
							flag = false;
						}
						if ($(this).attr('in')) {
							event.preventDefault();
						}
					});
				},
				error : function() {
					console.log('数据请求失败')
				}
			});

		}


	})


	//拖拽框缩放
	$('.draggable .item .item_title').click(function (e) {
		if (mx != e.clientX || my != e.clientY) {
			return;
		}
		if ($(this).siblings('ul').css('display') == 'none') {
			$(this).find('i').removeClass('icon-icon-test2').addClass('icon-icon-test3');
			$(this).siblings('ul').slideDown();
		} else {
			$(this).find('i').removeClass('icon-icon-test3').addClass('icon-icon-test2');
			$(this).siblings('ul').slideUp();
		}
	})

	//点击浮动框中的input阻止事件冒泡
	$('.draggable .item ul input').mousedown(function (e) {
		e.stopPropagation();
	})

	//表格头部的条目中input  change事件
	$('.table_header input').change(function () {
//                $(this).css('color', 'red');
	})

	//显示浮动可拖拽框并展开对应列
	$('.table_header .item i').click(function () {
		let index = $(this).parent().index();
		$('.draggable').show();
		$('.draggable .item:eq(' + index + ') ul').show();
		$('.draggable .item:eq(' + index + ') i').removeClass('icon-icon-test2').addClass(
			'icon-icon-test3');
	})

	$('body').on('click', '.popover', function (e) {
		e.stopPropagation();
	});

	$(document).click(function () {
		if (flag && $('.popover').length > 0) {
			$('.popover')[0].remove();
			flag = false;
		}

	})


	//关闭弹层按钮点击
	$('.amaTankuang .close').click(function () {
		$(this).parent().parent().parent().hide();
	})

	$('.table_header .item:eq(2) .title').click(function(){
		$('.amaTankuang.taozhuang').show();
	})

	$('.icon-icon-test1:eq(0)').click(function(){
		showUsRules();
		$('.amaTankuang.irwindale').show()
	})
	$('.icon-icon-test1:eq(1)').click(function(){
		showFbaRules();
		$('.amaTankuang.fba').show()
	})

//        });

}


/**
 * 获取后台返回的订单数据
 * @param data
 * @param myjson
 * @returns {String}
 */
function getReturnData(data,myjson){

	var mData='';
	if(myjson.className=='US_Combo'){
		var html='';
		$.each(data.data,function(){
			html=html+"<tr><td align='left'>"+this.sku+"</td><td align='left'>"+this.Qty+"</td></tr>";
		})
		mData=
			"<table class='table' border='0'>"+
			"<tr><td align='left'>SKU</td><td align='left'>Qty</td></tr>"+
			html+
			"</table>";

	}else if(myjson.className=='US_IN'){


		var html='';
		$.each(data.data,function(){
			html=html+"<tr>" +
				"<td>"+this.PO+"</td><td>"+this.BI_PO_Ref+"</td><td>"+this.PODate+"</td><td>"+this.ETA+"</td><td>"+this.Qty+"</td>" +
				"</tr>" ;
		})

		mData=
			"<table class='table'>"+
			"<thead><tr><th>PO#</th><th>BI PO Ref#</th><th>PODate</th><th>ETA</th><th>Qty</th></tr></thead>"+
			"<tbody id='La_tbody'>" +
			html+
			"</tbody>"+
			"</table>"+
			"<div class='inputDiv'>"+
			"<div class='item'><span class='add_item' onclick='addOrder_LA(this)'><i class='iconfont icon-jia'></i> </span> <input type='text' class='inputQty'></div>"+
			"<div class='item'>PO Date　<input type='text' class='dayDate' value='"+today+"' id='dataStr1' readonly=''></div>"+
			"<div class='item'>ETA　<input type='text' class='dayDate' value='"+today+"' id='dataStr2' readonly=''></div>"+
			"</div>";


	}else if(myjson.className=='FBA_IN'){

		var html='';
		$.each(data.data,function(){
			html=html+"<tr>" +
				"<td>"+this.AmzPO+"</td><td>"+this.BI_PO_Ref+"</td><td>"+this.PODate+"</td><td>"+this.ETA+"</td><td>"+this.Qty+"</td>" +
				"</tr>" ;
		})

		mData=
			"<table class='table'>"+
			"<thead><tr><th>FBA work order</th><th>BI FBA Ref#</th><th>FBA origin pickup date</th><th>Qty</th></tr></thead>"+
			"<tbody>" +
			html+
			"</tbody>"+
			"</table>"+

			"<div class='inputDiv'>"+
			"<div class='item'><span class='add_item' onclick='addOrder_FBA(this)'><i class='iconfont icon-jia'></i> </span> <input type='text' class='inputQty'></div> "+
			"<div class='item'>PO Date　<input type='text' class='dayDate' value='"+today+"' id='dataStr' readonly=''></div>"+
			" </div>"

	}else if(myjson.className=='Vendor_IPOCF'){


		var html='';
		$.each(data.data,function(){
			html=html+"<tr><td align='left'>"+this.AmzPO+"</td><td align='left'>"+this.Qty+"</td></tr>";
		})

		mData=
			"<table class='table' border='0'>" +
			"<tr><td align='left'>Amz PO#</td><td align='left'>Qty</td></tr>" +
			html+
			"</table>"


	}else if(myjson.className=='Vendor_IPOWT'){
		var html='';
		$.each(data.data,function(){
			html=html+"<tr><td align='left'>"+this.AmzPO+"</td><td align='left'>"+this.Qty+"</td></tr>";
		});

		mData=
			"<table class='table' border='0'>" +
			"<tr><td align='left'>Amz PO#</td><td align='left'>Qty</td></tr>" +
			html+
			"</table>"
	}
	return mData;
}


function initToggleData(className){
	var mData='';
	if(className=='US_Combo'){

	}else if(className=='US_IN'){

		mData=
			"<div class='inputDiv'>"+
			"<div class='item'><span class='add_item' onclick='addOrder_LA(this)'><i class='iconfont icon-jia'></i> </span> <input type='text' class='inputQty'></div>"+
			"<div class='item'>PO Date　<input type='text' class='dayDate' value='"+today+"' id='dataStr1' readonly=''></div>"+
			"<div class='item'>ETA　<input type='text' class='dayDate' value='"+today+"' id='dataStr2' readonly=''></div>"+
			"</div>";


	}else if(className=='FBA_IN'){

		mData=

			"<div class='inputDiv'>"+
			"<div class='item'><span class='add_item' onclick='addOrder_FBA(this)'><i class='iconfont icon-jia'></i> </span> <input type='text' class='inputQty'></div> "+
			"<div class='item'>PO Date　<input type='text' class='dayDate' value='"+today+"' id='dataStr' readonly=''></div>"+
			" </div>"

	}else if(className=='Vendor_IPOCF'){


	}else if(className=='Vendor_IPOWT'){

	}
	return mData;
}


/**
 * 新增La订单
 */
function addOrder_LA(obj){
	var parent = $(obj).parent();
	var inputQty = $(parent).find('.inputQty').val();
	var PODate = $(parent).next().find('.dayDate').val();
	var EstimateReceiveDate = $(parent).next().next().find('.dayDate').val();

	var myjson={};
	myjson.ItemNum=$('#sku').val();
	myjson.BI_PO_Ref=inputQty;
	myjson.PODate=PODate;
	myjson.EstimateReceiveDate=EstimateReceiveDate;

	console.log(myjson);
	//开始提交后台
	$.ajax({
		type : 'post',
		url : path + '/sku/insert_LA_PO_Info.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {
			if (data.status == 1) {
				alert('新增成功!');
			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});



}

/**
 * 新增FBA订单
 */
function addOrder_FBA(obj){
	var parent = $(obj).parent();
	var inputQty = $(parent).find('.inputQty').val();
	var PODate = $(parent).next().find('.dayDate').val();

	var myjson={};
	myjson.ItemNum=$('#sku').val();
	myjson.BI_PO_Ref=inputQty;
	myjson.PODate=PODate;

	console.log(myjson);
	//开始提交后台
	$.ajax({
		type : 'post',
		url : path + '/sku/insert_LA_PO_Info.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {
			if (data.status == 1) {
				alert('新增成功!');
				showData();
			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});

}


//相关业务代码
$(document).ready(function(){
	sessionStorage.moduleType='/d_inventoryAnalysis.htm';

	$('#searchBtn').unbind('click').click(function(){
		showAll();
	})

	if($('#sku').val()==''){
		return;
	}


	showAll();

});


function showAll(){
	getSkuSomeInfo();
	showData();
}


var inventory_buffer=15;
var restock_frequency=30;
var lead_time=45;

function getSkuSomeInfo(){
	var currentMonth = getCurrentMonth();
	var myjson = {};
	myjson.sku=$('#sku').val();
	myjson.yuce_monthtaozhuang=currentMonth;
	$.ajax({
		type : 'get',
		url : path + '/sku/getSkuSomeInfo.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {
			if (data.status == 1) {
				var skuBaseInfo = data.skuBaseInfo;
				$('#sku_imageUrl').attr('src',skuBaseInfo.sku_imageUrl);$('#sku_productTitle').text(skuBaseInfo.sku_productTitle);$('#asin').text(skuBaseInfo.asin);


				$('#canshuSetDiv span').removeClass('current');
				var skuSetInfo = data.skuSetInfo;
				if(skuSetInfo.length>0){
					$('#inv span[val="'+skuSetInfo[0].inventory_buffer+'"]').addClass('current');
					$('#res span[val="'+skuSetInfo[0].restock_frequency+'"]').addClass('current');
					$('#lead span[val="'+skuSetInfo[0].lead_time+'"]').addClass('current');
					inventory_buffer=skuSetInfo[0].inventory_buffer;
					restock_frequency=skuSetInfo[0].restock_frequency;
					lead_time=skuSetInfo[0].lead_time;
				}

				var list1= data.list1;
				var list2= data.list2;
				var list3= data.list3;
				var list4= data.list4;
				$('.draggable .item:eq(0) ul').html('');$('.draggable .item:eq(1) ul').html('');$('.draggable .item:eq(2) ul').html('');
				$.each(list1,function(){
					if(this.yuce_month==currentMonth){
						$('.table_header .apr:eq(0)').text(this.month_en);
						$('.table_header .number:eq(0)').val(this.yuce_num);
					}


					$('.draggable .item:eq(0) ul').append(
						'<li><span>'+this.month_en+'</span><input type="number" value="'+this.yuce_num+'" onchange="setDelta1(this)" yuce_month="'+this.yuce_month+'"></li>'
					);


				});
				$.each(list2,function(){
					if(this.yuce_month==currentMonth){
						$('.table_header .apr:eq(1)').text(this.month_en);
						$('.table_header .number:eq(1)').val(this.yuce_num);
					}

					$('.draggable .item:eq(1) ul').append(
						'<li><span>'+this.month_en+'</span><input type="number" value="'+this.yuce_num+'" onchange="setDelta2(this)" yuce_month="'+this.yuce_month+'"></li>'
					);
				});

				$.each(list3,function(){
					if(this.yuce_month==currentMonth){
						$('.table_header .apr:eq(2)').text(this.month_en);
						$('.table_header .number:eq(2)').val(this.yuce_num);
					}

					$('.draggable .item:eq(2) ul').append(
						'<li><span>'+this.month_en+'</span>   '+this.yuce_num+'</li>'
					);
				});



				//套装弹层
				$('#taozhuangTable tbody').html('');
				$.each(list4,function(){
					$('#taozhuangTable tbody').append(
						'<tr>'+
						'<td>'+this.sku+'</td>'+
						' <td>'+this.yuce_num+'</td>'+
						'</tr>'
					);
				})



			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});

}


function update1(obj){

	var myjson={};
	var val = $(obj).val();
	myjson.yuce_month=getCurrentMonth();
	myjson.yuce_num=val;
	myjson.sku=$('#sku').val();
	myjson.type='其他';
	update_Delta(myjson);
}


function update2(obj){

	var myjson={};
	var val = $(obj).val();
	myjson.yuce_month=getCurrentMonth();
	myjson.yuce_num=val;
	myjson.sku=$('#sku').val();
	myjson.type='单品';
	update_Delta(myjson);
}


function setDelta1(obj){
	var yuce_month = $(obj).attr('yuce_month');
	var val = $(obj).val();
	var myjson={};
	myjson.yuce_month=yuce_month;
	myjson.yuce_num=val;
	myjson.sku=$('#sku').val();
	myjson.type='其他';
	update_Delta(myjson);
}

function setDelta2(obj){
	var yuce_month = $(obj).attr('yuce_month');
	var myjson={};
	myjson.yuce_month=yuce_month;
	myjson.yuce_num=val;
	myjson.sku=$('#sku').val();
	myjson.type='单品';
	update_Delta(myjson);
}

function update_Delta(myjson){

	$.ajax({
		type : 'get',
		url : path + '/sku/update_Delta.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {
			if (data.status == 1) {
				console.log('update_Delta更新了');
			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});
}


function showData(){
	//清空FBA的捕获计划
	rule_Fba=[];rule_Us=[];

	var myjson = {};
	myjson.sku=$('#sku').val();

	showLoading();

	$('.singleskutable tbody').html('');

	$.ajax({
		type : 'get',
		url : path + '/sku/getSkuData_Forecast.htm',
		timeout : 100000,
		data : myjson,
		dataType : 'json',
		success : function(data) {

			closeLoading();

			if (data.status == 1) {

				//开始循环处理数据
				var totalU=0;
				var totalV=0;
				var totalF=0;
				$.each(data.data,function(){
					//计算us的库存
					totalU=parseFloat(totalU)-parseFloat(this.US_POamz)-parseFloat(this.US_Combo)+parseFloat(this.US_IN);
					var US_INV = parseFloat(this.US_INV)+parseFloat(totalU);

					//计算Vendor的库存
					totalV=totalV+parseFloat(this.Vendor_IPOCF)+parseFloat(this.Vendor_IPOWT)
					var Vendor_INV=parseFloat(this.Vendor_INV)
						+parseFloat(totalV);

					//计算FBA的库存
					totalF=parseFloat(totalF)+parseFloat(this.FBA_IN);
					var FBA_INV=parseFloat(this.FBA_INV)+parseFloat(totalF)


					$('.singleskutable tbody').append(
						'<tr class="forecast" Date="'+this.Date+'">'+
						' <td>'+this.Date+'</td>'+
						' <td class="US_INV" val="'+US_INV+'">'+US_INV.toFixed(2)+'</td>'+
						' <td class="US_So">'+this.US_So+'</td>'+
						'<td class="US_POamz">'+this.US_POamz+'</td>'+
						' <td data-toggle="popover" class="US_Combo" data-toggle="popover" data-trigger="hover">'+this.US_Combo+'</td>'+
						'<td data-toggle="popover" data-placement="bottom" class="US_IN">'+this.US_IN+'</td>'+
						'<td class="FBA_INV" val="'+FBA_INV+'">'+FBA_INV+'</td>'+
						' <td class="FBA_Sfba" val="'+this.FBA_Sfba+'">'+this.FBA_Sfba+'</td>'+
						'<td data-toggle="popover" data-placement="bottom" class="FBA_IN" val="'+this.FBA_IN+'">'+this.FBA_IN+'</td>'+
						'<td class="Vendor_INV" val="'+Vendor_INV+'">'+Vendor_INV.toFixed(2)+'</td>'+
						'<td class="Vendor_EPOSamz" val="'+this.Vendor_EPOSamz+'">'+this.Vendor_EPOSamz+'</td>'+
						'<td data-toggle="popover" data-trigger="hover" class="Vendor_IPOCF" val="'+this.Vendor_IPOCF+'">'+this.Vendor_IPOCF+'</td>'+
						' <td data-toggle="popover" data-placement="left" class="Vendor_IPOWT" val="'+this.Vendor_IPOWT+'">'+parseFloat(this.Vendor_IPOWT).toFixed(2)+'</td>'+
						'<td>'+this.HZ_INV+'</td>'+
						'</tr>'
					);
				});

				addEvent();
				calculateVendor();

			}
		},
		error : function() {
			console.log('数据请求失败')
		}
	});

}


/**
 * 计算Vendor库存
 */
function calculateVendor(){


	//选择出表格的行
	var trs = $('.singleskutable tbody .forecast');
	var trs_vendor=[];
	var flag = false;
	$.each(trs,function(index){
		if(flag){
			trs_vendor.push(this);
		}else{
			var Vendor_INV = $(this).find('.Vendor_INV').attr('val');
			Vendor_INV=parseFloat(Vendor_INV);
			if(Vendor_INV<0){
				flag=true;
				trs_vendor.push(this);
			}
		}

	})

	console.log(trs_vendor);
	var fba_changenum = 0;
	//这里计算Vendor的库存
	$.each(trs_vendor,function(index){

		var date = $(this).attr('date');
		console.log('开始处理日期为：  '+date+'  的行');
		if(index==0){
			var Vendor_IPOCF = $(this).find('.Vendor_IPOCF').attr('val');
			Vendor_IPOCF=parseFloat(Vendor_IPOCF);
			var Vendor_IPOWT = $(this).find('.Vendor_IPOWT').attr('val');
			Vendor_IPOWT=parseFloat(Vendor_IPOWT);

			var Vendor_EPOSamz = $(this).find('.Vendor_EPOSamz').attr('val');
			Vendor_EPOSamz=parseFloat(Vendor_EPOSamz);//vendor销量

			var m = Vendor_IPOCF+Vendor_IPOWT-Vendor_EPOSamz;//本来这里要加上vendor的库存，但是这里库存已经为负数了，所以当做0来处理
			if(m<0){
				//说明vendor不够减，把Vender_INV的值设置为0
				$(this).find('.Vendor_INV').text(0);
				$(this).find('.Vendor_INV').attr('val',0);

				//在FBA需要加上这个 m值（-2.6）

				fba_changenum=parseFloat(-m);
				$(this).find('.FBA_INV').attr('changenum',fba_changenum);

				//给下一行的vendor库存设定一个值。这个值会影响到下一行vendor的库存
				$(this).next().find('.Vendor_INV').attr('changenum',0);

			}else{
				//说明vendor库存本行够减，不会影响fba行的库存，但是会影响下一行vendor的库存
				$(this).find('.Vendor_INV').text(m.toFixed(2));
				$(this).find('.Vendor_INV').attr('val',m);
				$(this).find('.FBA_INV').attr('changenum',0);

				//给下一行的vendor库存设定一个值。这个值会影响到下一行vendor的库存
				$(this).next().find('.Vendor_INV').attr('changenum',m);
			}


		}else{



//			var Vendor_INV = $(this).find('.Vendor_INV').attr('val');
//			Vendor_INV=parseFloat(Vendor_INV);
			var Vendor_IPOCF = $(this).find('.Vendor_IPOCF').attr('val');
			Vendor_IPOCF=parseFloat(Vendor_IPOCF);
			var Vendor_IPOWT = $(this).find('.Vendor_IPOWT').attr('val');
			Vendor_IPOWT=parseFloat(Vendor_IPOWT);

			if(date=='2019-07-07'){
				console.log(Vendor_IPOWT);
			}

			var Vendor_EPOSamz = $(this).find('.Vendor_EPOSamz').attr('val');
			Vendor_EPOSamz=parseFloat(Vendor_EPOSamz);//vendor销量

			var changenum = $(this).find('.Vendor_INV').attr('changenum');
			changenum=parseFloat(changenum);//上一样运算的，0或者正数

			var m = Vendor_IPOCF+Vendor_IPOWT-Vendor_EPOSamz+changenum;//本来这里要加上vendor的库存，但是这里库存已经为负数了，所以当做0来处理
			if(m<0){
				//说明不够减，需要从fba里减
				//把Vender_INV的值设置为0
				$(this).find('.Vendor_INV').text(0);
				$(this).find('.Vendor_INV').attr('val',0);

				fba_changenum=parseFloat(fba_changenum)+parseFloat(-m);
				$(this).find('.FBA_INV').attr('changenum',fba_changenum);

				//给下一行的vendor库存设定一个值。这个值会影响到下一行vendor的库存
				$(this).next().find('.Vendor_INV').attr('changenum',0);
			}else{
				//----------------------------------------------------------------------------
				//说明vendor库存本行够减，不会影响fba行的库存，但是会影响下一行vendor的库存
				$(this).find('.Vendor_INV').text(m.toFixed(2));
				$(this).find('.Vendor_INV').attr('val',m);
				$(this).find('.FBA_INV').attr('changenum',fba_changenum);

				//给下一行的vendor库存设定一个值。这个值会影响到下一行vendor的库存
				$(this).next().find('.Vendor_INV').attr('changenum',m);
			}
		}

	})


	//去计算FBA库存
	calculateFBA();
}



/**
 * 计算Vendor库存(第二种方案)
 */
function calculateVendor2(){

	var fba_changenum = 0;
	//这里计算Vendor的库存
	var trs = $('.singleskutable tbody .forecast');
	$.each(trs,function(index){

		var date = $(this).attr('date');
		console.log('开始处理日期为：  '+date+'  的行');

		var Vendor_INV = $(this).find('.Vendor_INV').attr('val');
		Vendor_INV=parseFloat(Vendor_INV);
		var Vendor_IPOCF = $(this).find('.Vendor_IPOCF').attr('val');
		Vendor_IPOCF=parseFloat(Vendor_IPOCF);
		var Vendor_IPOWT = $(this).find('.Vendor_IPOWT').attr('val');
		Vendor_IPOWT=parseFloat(Vendor_IPOWT);

		var Vendor_EPOSamz = $(this).find('.Vendor_EPOSamz').attr('val');
		Vendor_EPOSamz=parseFloat(Vendor_EPOSamz);//vendor销量

		var changenum = $(this).find('.Vendor_INV').attr('changenum');
		if(changenum==undefined){
			changenum=0;
		}
		changenum=parseFloat(changenum)+Vendor_IPOCF+Vendor_IPOWT;//上一样运算的，0或者正数


		var m = Vendor_INV+parseFloat(changenum);//本来这里要加上vendor的库存，但是这里库存已经为负数了，所以当做0来处理
		if(m<0){
			//说明不够减，需要从fba里减
			//把Vender_INV的值设置为0

//			if(changenum-parseFloat(Vendor_EPOSamz)>0){
//				$(this).find('.Vendor_INV').text(changenum-parseFloat(Vendor_EPOSamz));
//				$(this).find('.Vendor_INV').attr('val',changenum-parseFloat(Vendor_EPOSamz));
//			}else{
			$(this).find('.Vendor_INV').text(0);
			$(this).find('.Vendor_INV').attr('val',0);
//			}

//			fba_changenum=parseFloat(fba_changenum)+parseFloat(Vendor_EPOSamz);
			$(this).find('.FBA_INV').attr('changenum',-m);

		}else{
			//----------------------------------------------------------------------------
			//说明vendor库存本行够减，不会影响fba行的库存，但是会影响下一行vendor的库存
			$(this).find('.Vendor_INV').text(m.toFixed(2));
			$(this).find('.Vendor_INV').attr('val',m);
			$(this).find('.FBA_INV').attr('changenum',fba_changenum);

		}

		//给下一行的vendor库存设定一个值。这个值会影响到下一行vendor的库存
		$(this).next().find('.Vendor_INV').attr('changenum',changenum);

	})


	//去计算FBA库存
	calculateFBA();
}


/**
 * 计算FBA库存
 */
function calculateFBA(){

	//选择出表格的行
	var trs = $('.singleskutable tbody .forecast');
	var trs_fba=[];
	$.each(trs,function(index){
		//重新计算fba的库存=fba现在的库存-changenum
		var val = $(this).find('.FBA_INV').attr('val');
		var changenum  = $(this).find('.FBA_INV').attr('changenum');
		var FBA_IN  = $(this).find('.FBA_IN').attr('val');
		if(changenum==undefined){
			changenum=0;
		}
		var FBA_INV_new = parseFloat(val)-parseFloat(changenum);
//		+parseFloat(FBA_IN);
		$(this).find('.FBA_INV').attr('val',FBA_INV_new);
		$(this).find('.FBA_INV').text(FBA_INV_new.toFixed(2));

	});

	//创建fba的补货规则
	createFbaRule();
	//创建us的补货规则
	createUsRule();

}

/**
 *
 * @param day  2019-05-28
 * @param bef  1
 * @returns {String}
 */
function daybefore(day,bef){
	var datt = day.split('-');//这边给定一个特定时间
	var newDate = new Date(datt[0], datt[1]-1, datt[2]);
	var befminuts = newDate.getTime() + 1000 * 60 * 60 * 24 * parseInt(bef);//计算前几天用减，计算后几天用加，最后一个就是多少天的数量
	var beforeDat = new Date;
	beforeDat.setTime(befminuts);
	var befMonth = beforeDat.getMonth()+1;
	var mon = befMonth >= 10 ? befMonth : '0' + befMonth;
	var befDate = beforeDat.getDate();
	var da = befDate >= 10 ? befDate : '0' + befDate;
	var newDate = beforeDat.getFullYear() + '-' + mon + '-' + da;
	return newDate;
}

/**
 * 计算一个7天段中的quality
 */

function  createFbaRule2(trs){

	var daohuoDate='';//到货日期
	var xiadanDate='';//下单日期=到货日期往前推28天
	var quality = 0;


	var first=0;

	var list = new Array();
	$.each(trs,function(index){

		if(index==0){
			daohuoDate = $(this).attr('Date');
			xiadanDate = daybefore(daohuoDate,-28);
		}

		var FBA_INV = $(this).find('.FBA_INV').attr('val');
		//加之前先判断下最后一个元素是否为负数，如果为负数，那么先移除，再加
		if(list.length==0){
			list.push(FBA_INV);

			//一周内第一条日期
			var date = $(this).attr('Date');
			var targettr = daybefore(date,1);

			first = $('.forecast[Date="'+daybefore(date,-1)+'"]').find('.FBA_INV').attr('val');

		}else{
			//找到最后一个元素
			var a  = list[list.length-1];
			//如果a为负数，那么先移除这个元素再加入
			if(parseFloat(a)<0){
				list.splice(list.length-1,1);list.push(FBA_INV);
			}
		}
	});

	//生成全是负数的newlist
	var total = 0;
	$.each(list,function(){
		if(this<0){
			total=total+parseFloat(this);
		}
	})


	//开始计算quality
	if(parseFloat(first)>0){
		quality=total;
	}else{
		quality = total- (parseFloat(first));
	}

	var real_quality = Math.abs(quality);

	var orderNo='rule_fba_'+daohuoDate;
	if(real_quality>0){
		rule_Fba.push({'orderNo':orderNo,'xiadanDate':xiadanDate,'daohuoDate':daohuoDate,'quality':real_quality});
	}

}


/**
 * 生成Fba补货计划
 */
var rule_Fba=[];
function createFbaRule(){
	var trs_new = [];
	var trs = $('.singleskutable tbody .forecast');
	var flag=false;
	$.each(trs,function(){
		var fba_val = $(this).find('.FBA_INV').attr('val');
		if(parseFloat(fba_val)<0){
			flag=true;
			trs_new.push(this);
			return true;
		}
		if(flag){
			trs_new.push(this);
		}
	})

	var count=0;
	var mm = new Array();
	$.each(trs_new,function(index){
		count++;
		mm.push(this);
		if(count%7==0){
			//每7段生成一个数组去处理
			createFbaRule2(mm);
			mm = new Array();
		}

	})

}

/**
 * 查看fba补货规则
 */
function showFbaRules(){

	$('#rule_fba_table tbody').html('');
	$.each(rule_Fba,function(){

		$('#rule_fba_table tbody').append(
			'<tr>'+
			'<td>'+this.orderNo+'</td>'+
			'<td>'+this.xiadanDate+'</td>'+
			'<td>'+this.quality.toFixed(2)+'</td>'+
			'</tr>'
		);
	})
	setTimeout(function(){
		console.log($('#rule_fba_table tbody').height());
		if($('#rule_fba_table tbody').height() > 240){
			$('#rule_fba_table .tablebox').css('overflow','scroll');
		}
	},50)
}




//////////////////////////一下是生成us的补货规则和查看us的补货规则
/**
 * 计算一个Restock天段中的quality
 */

function  createUsRule2(trs){

	var daohuoDate='';//到货日期
	var xiadanDate='';//下单日期=到货日期往前推28天
	var quality = 0;


	var first=0;

	var list = new Array();
	$.each(trs,function(index){

		if(index==0){
			daohuoDate = $(this).attr('Date');
			xiadanDate = daybefore(daohuoDate,-lead_time-inventory_buffer);
		}

		var FBA_INV = $(this).find('.FBA_INV').attr('val');
		//加之前先判断下最后一个元素是否为负数，如果为负数，那么先移除，再加
		if(list.length==0){
			list.push(FBA_INV);

			//一周内第一条日期
			var date = $(this).attr('Date');
			var targettr = daybefore(date,1);

			first = $('.forecast[Date="'+daybefore(date,-1)+'"]').find('.FBA_INV').attr('val');

		}else{
			//找到最后一个元素
			var a  = list[list.length-1];
			//如果a为负数，那么先移除这个元素再加入
			if(parseFloat(a)<0){
				list.splice(list.length-1,1);list.push(FBA_INV);
			}
		}
	});

	//生成全是负数的newlist
	var total = 0;
	$.each(list,function(){
		if(this<0){
			total=total+parseFloat(this);
		}
	})


	//开始计算quality
	if(parseFloat(first)>0){
		quality=total;
	}else{
		quality = total- (parseFloat(first));
	}


	var real_quality = Math.abs(quality);

	var orderNo='rule_us_'+daohuoDate;
	if(real_quality>0){
		rule_Us.push({'orderNo':orderNo,'xiadanDate':xiadanDate,'daohuoDate':daohuoDate,'quality':real_quality});
	}

}


/**
 * 生成Us补货计划
 */
var rule_Us=[];
function createUsRule(){
	var trs_new = [];
	var trs = $('.singleskutable tbody .forecast');
	var flag=false;
	$.each(trs,function(){
		var us_val = $(this).find('.US_INV').attr('val');
		if(parseFloat(us_val)<0){
			flag=true;
			trs_new.push(this);
			return true;
		}
		if(flag){
			trs_new.push(this);
		}
	})
	var count=0;
	var mm = new Array();
	$.each(trs_new,function(index){
		count++;
		mm.push(this);
		if(count%parseInt(restock_frequency)==0){
			//每restock_frequency天生成一个数组去处理
			createUsRule2(mm);
			mm = new Array();
		}

	})

}


/**
 * 查看us补货规则
 */
function showUsRules(){
	$('#rule_us_table tbody').html('');
	$.each(rule_Us,function(){
		$('#rule_us_table tbody').append(
			'<tr>'+
			'<td>'+this.orderNo+'</td>'+
			'<td>'+this.xiadanDate+'</td>'+
			'<td>'+this.daohuoDate+'</td>'+
			'<td>'+this.quality.toFixed(2)+'</td>'+
			'</tr>'
		);
	});

	setTimeout(function(){
		console.log($('#rule_us_table tbody').height());
		if($('#rule_us_table tbody').height() > 240){
			$('#rule_us_table .tablebox').css('overflow','scroll');
		}
	},50)
}



///////查看us的  Combo弹框
function showCombo(){

	//去后台请求数据
	$('#popover tbody').html('');

	$('#popover tbody').append(
		'<tr>'+
		'<td align="left">PTBULPTBULPTBULPTBULPTBUL</td>'+
		'<td align="left">123</td>'+
		' </tr>'
	);

	$('#popover').show();

}







function goEndPos(){
	sessionStorage.setItem('sku',$('#sku').val());
	sessionStorage.setItem('skuName',$('#sku_productTitle').text());
	sessionStorage.setItem('skuImgUrl',$('#sku_imageUrl').attr('src'));
	window.open(path+'/e_singleSKU_endPos.htm');
}
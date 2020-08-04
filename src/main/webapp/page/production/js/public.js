﻿/*获取当前年月日*/
function currentTime(){
  var date = new Date();
  var perDate = new Date(new Date().getTime()-24*60*60*1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1<10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var date = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
  var peryear = perDate.getFullYear();
  var permonth = perDate.getMonth() + 1<10 ? "0" + (perDate.getMonth() + 1) : perDate.getMonth() + 1;
  var perDate=perDate.getDate()<10 ? "0" + perDate.getDate() : perDate.getDate();
  var currentTime = year + "-" +month + "-" +date;
  var currentMonth= year + "-" +month;
  var perDate=peryear + "-" +permonth+ "-" +perDate;;
  $("#updateTime").html(currentTime);
  $(".monthDate").val(currentMonth);
  $(".dayDate").val(perDate);
}

currentTime();


/*$("tr.downTr").hide();
function newRview(obj){
    var nextTR=$(obj).parent().parent().next(".downTr");
    var objTR=$(obj).parent().parent();
  if(nextTR.css("display")=="none"){
        nextTR.show().siblings(".dropDownTable").hide();
    }else{
        nextTR.hide();
    }
}*/
$(".nav").append('<li>\
    <a class="logo" ><img src="page/production/images/logo.png"></a>\
    </li>\
      <li style="margin-top:20px;">\
        <span>Merchandise Info</span>\
        <ul>\
		  '+(true||accountType==1||accountType==2?'<li><a href="'+path+'/a_category.htm"><i class="iconfont icon-Icon1"></i>Category</a></li>':"")+'\
          '+(true||accountType==1||accountType==2?'<li><a href="'+path+'/a_product.htm"><i class="iconfont icon-Icon9"></i>Product</a></li>':"")+'\
          '+(true||accountType==1||accountType==2?'<li><a href="'+path+'/a_tag.htm"><i class="iconfont icon-Icon6"></i>Tag</a></li>':"")+'\
          '+(true||accountType==1||accountType==2?'<li><a href="'+path+'/a_OwnBrand.htm"><i class="iconfont icon-Icon6"></i>Own Brand</a></li>':"")+'\
        </ul>\
      </li>\
      <li>\
        <span>全局概况</span>\
        <ul>\
          <li><a href="'+path+'/b_dashboard.htm"><i class="iconfont icon-Icon3"></i>Dashboard</a></li>\
          <li><a href="'+path+'/b_categorySale.htm"><i class="iconfont icon-Icon11"></i>类目品牌销售</a></li>\
          <li><a href="'+path+'/b_porductRank.htm"><i class="iconfont icon-Icon11"></i>单品排行榜</a></li>\
          <li><a href="'+path+'/b_UserAnalysis.htm"><i class="iconfont icon-Icon8"></i>用户分析</a></li>\
        </ul>\
      </li>\
      <li>\
        <span>监控总览</span>\
        <ul>\
          <li><a href="'+path+'/c_skuManage.htm"><i class="iconfont icon-Icon7"></i>SKU监控</a></li>\
          <li><a href="'+path+'/c_Promotion.htm"><i class="iconfont icon-Group1"></i>Promotion監控</a></li>\
          <li><a href="'+path+'/c_PriceChange.htm"><i class="iconfont icon-Group1"></i>Price Change</a></li>\
          <li><a href="'+path+'/c_TitleChange.htm"><i class="iconfont icon-Icon4"></i>Title Change</a></li>\
          <li><a href="'+path+'/c_RankingChange.htm"><i class="iconfont icon-Icon10"></i>Ranking Change</a></li>\
          <li><a href="'+path+'/c_NewReview.htm"><i class="iconfont icon-Icon5"></i>New Review</a></li>\
          <li><a href="'+path+'/c_PictureChange.htm"><i class="iconfont icon-Icon13"></i>Picture Change</a></li>\
          <li><a href="'+path+'/c_Category.htm"><i class="iconfont icon-Icon1"></i>Category</a></li>\
          <li><a href="'+path+'/c_PriceOverview.htm"><i class="iconfont icon-CombinedShape"></i>价格总览</a></li>\
          <li><a href="'+path+'/c_skuBestSellersTop.htm"><i class="iconfont icon-Icon10"></i>Best Sellers</a></li>\
        </ul>\
      </li><li>\
          <span>库存管理</span>\
          <ul>\
            <li><a href="'+path+'/e_deltaOverview.htm"><i class="iconfont icon-Icon7"></i>Delta Setting</a></li>\
            <li><a href="'+path+'/e_restockSetting.htm"><i class="iconfont icon-Group1"></i>Restock Setting</a></li>\
            <li><a href="'+path+'/e_singleSKU.htm"><i class="iconfont icon-Icon10"></i>单品SKU预测</a></li>\
            <li><a href="'+path+'/e_SKUEarlyWarn.htm"><i class="iconfont icon-Icon10"></i>产品线SKU预测</a></li>\
          </ul>\
        </li><li>\
          <span>BI报表</span>\
          <ul>\
            <li><a href="'+path+'/f_Report_WeeklyAndMonthlyOutbound.htm"><i class="iconfont icon-baobiao"></i>Outbound Report</a></li>\
            <li><a href="'+path+'/f_Report_HawProductInfo.htm"><i class="iconfont icon-baobiao"></i>HawProduct Report</a></li>\
            <li><a href="'+path+'/f_Report_Promotions.htm"><i class="iconfont icon-baobiao"></i>Promotion Report</a></li>\
          </ul>\
        </li>');
$(".navSKU").append('<li><a class="logo" href="'+path+'/c_skuManage.htm"><img src="page/production/images/logo.png"></a></li>\
      <li style="margin-top:20px;">\
        <span>SKU分析</span>\
        <ul>\
          <li><a href="'+path+'/sku_buyBoxOffer.htm">Buybox offer</a></li>\
          <li><a href="'+path+'/sku_offerAnalysis.htm">Offer分析</a></li>\
          <li><a href="'+path+'/sku_comprehensiveAnalysis.htm">综合分析</a></li>\
          <li><a href="'+path+'/sku_saleAnalysis.htm">销量分析</a></li>\
          <li><a href="'+path+'/sku_reviewOverview.htm">评论概览</a></li>\
          <li><a href="'+path+'/sku_reviewDetail.htm">评论详情</a></li>\
          <li><a href="'+path+'/sku_commentStatistics.htm">评论统计</a></li>\
        </ul>\
      </li>');
//当前导航
/*function addNavActive(obj){
  var navActive=$("title").html();
  var liLength=$(obj).length;
  for(var i=0;i<liLength;i++){
    if($(obj)[i].innerText==navActive){
      $(obj)[i].parentNode.classList.add("on");
    }
  }
}
addNavActive(".nav a");
addNavActive(".navSKU a");*/
{
	let url=window.location.href;
	$.each($(".nav").find("a"),function(index){
		if(this.href.match(url.split("/")[path==""?3:4].split("?")[0])){
			$(this).parent().addClass("on").siblings("li").removeClass("on");
		}
		
	})
	$.each($(".navSKU").find("a"),function(index){
		if(this.href.match(url.split("/")[path==""?3:4].split("?")[0])){
			$(this).parent().addClass("on").siblings("li").removeClass("on");
		}
		
	})
}
	

var h=$("body").height();
var h2=$(window).height()
if(h>h2){
  $(".nav,.navSKU,.compareBox").height(h);
}else{
  $(".nav,.navSKU,.compareBox").height(h2);
}

var html='<div class="cover categoryModel" style="display:block;">\
      <div class="model">\
          <div class="rootCategory">\
            <h2>RootCategory</h2>\
            <ul>\
              <li class="on"><span>Hydropnics</span></li>\
              <li><span>Lawn And Garden</span></li>\
              <li><span>Home Improvement</span></li>\
            </ul>\
          </div>\
          <div class="subCategory">\
            <h2>SubCategory</h2>\
			<div id="subc" class="subCategory" style="padding:0;">\
            <div class="subCategoryItem" id="Hydroponics">\
              <span class="on">Carbon Filter</span>\
              <span>Booster Fan</span>\
              <span>Bubble Bag</span>\
              <span>Soil Tester</span>\
              <span>Soil Tester</span>\
              <span>Soil Tester</span>\
              <span>Soil Tester</span>\
              <span>Soil Tester</span>\
            </div>\
            <div class="subCategoryItem" style="display: none;">\
              <span>Carbon Filter1</span>\
              <span>Booster Fan1</span>\
              <span>Bubble Bag1</span>\
              <span>Soil Tester1</span>\
              <span>Soil Tester1</span>\
              <span>Soil Tester1</span>\
              <span>Soil Tester1</span>\
              <span>Soil Tester1</span>\
            </div>\
            <div class="subCategoryItem" style="display: none;">\
              <span>Carbon Filter2</span>\
              <span>Booster Fan3</span>\
              <span>Bubble Bag4</span>\
              <span>Soil Tester3</span>\
              <span>Soil Tester3</span>\
              <span>Soil Tester3</span>\
              <span>Soil Tester3</span>\
              <span>Soil Tester3</span>\
            </div>\
			</div>\
            <span class="on" onClick="back()"><i class="iconfont icon-xiangyou"></i></span>\
          </div>\
      </div>\
    </div>'
 // tab切换

var back = () => {
	$(".categoryModel").hide();
	
	let category="";
	$.each($(".categoryList span"),function(){
		if($(this).attr('class')=='on'){
			category=category+(category==""?"":",")+$(this).attr('id');
		}else if($(this).attr('class')=='addCategory'){
			return false;
		}
	})
	sessionStorage._category=category;
	showData();
}
$(".addCategory").click(function(){
	if($(".categoryModel").hasClass('categoryModel')){
		$(".categoryModel").show();
	}else{
		$(this).parent().append(html);
		$(".rootCategory").on("click", "li", function() {
		    var index = $(this).index();
		    $(this).addClass("on").siblings("li").removeClass("on");
		    getCategory_son($(this).text())
		})
		$(".rootCategory ul").html("")
		$("#subc").html("")
		getCategory_parent();
	}
	let category=sessionStorage._category;
	if(category!=undefined&&category!=null&&category!=""){
		$.each(category.split(","),function(index){
			let category1=this;
			$.each($("#"+category1.split("_")[0]+" span"),function(count){
				let txt=$(this).text();
				if(txt.replace(/\s/g,"")==category1.split("_")[1]){
				// category 空格匹配异常修改
                // if(txt==category1.split("_")[1]){
					$(this).addClass("on");
				}
			})
		})
	}
})


function getCategory_parent(){
	$.ajax({
		url:path+'/sku/getCategoryInfo_parent.htm',
		type:"POST",
		data:{parentName:0},
		success:function(value){
			var data = JSON.parse(value);
			if (data.status == '1') {
				$(".rootCategory ul").html("")
				$.each(data.data,function(index){
					if(this.parent_Category==0){
						$(".rootCategory ul").append('<li class="'+(index==0?"on":"")+'"><span>'+this.Category+'</span></li>');
					}
					if(index==0){
						$(".rootCategory li:eq(0)").click();
					}
				})
			}
		}
	})
	 
}

function getCategory_son(parentName){
	if(!$("#"+parentName.replace(/\s/g,"")).hasClass("subCategoryItem")){
    // category 空格匹配异常修改
    // if(!$("#"+parentName).hasClass("subCategoryItem")){
		$("#subc").append('<div class="subCategoryItem" id="'+parentName.replace(/\s/g,"")+'"></div>');
        // category 空格匹配异常修改
        // $("#subc").append('<div class="subCategoryItem" id="'+parentName+'"></div>');
		$.ajax({
			url:path+'/sku/getCategoryInfo_parent.htm',
			type:"POST",
			data:{parentName:parentName},
			success:function(value){
				var data = JSON.parse(value);
				if (data.status == '1') {
					$.each(data.data,function(index){
						$("#"+parentName.replace(/\s/g,"")).append('<span class="'+(index==0?"":"")+'">'+this.Category+'</span>');
                        // category 空格匹配异常修改
                        // $("#"+parentName).append('<span class="'+(index==0?"":"")+'">'+this.Category+'</span>');
						if(index+1==data.data.length){
							$("#"+parentName.replace(/\s/g,"")+" span").click(function() {
                            // category 空格匹配异常修改
                            // $("#"+parentName+" span").click(function() {
								let index=$(this).index();
								if($(this).attr("class")=="on"){
									$(this).removeClass("on");
									$("#"+$(this).parent().attr("id")+"_"+$(this).text().replace(/\s/g,"")).remove();
                                    // category 空格匹配异常修改
                                    // $("#"+$(this).parent().attr("id")+"_"+$(this).text()).remove();
								}else{
									$(this).addClass("on");
									$("#"+$(this).parent().attr("id")+"_"+$(this).text().replace(/\s/g,"")).remove();
                                    // category 空格匹配异常修改
                                    // $("#"+$(this).parent().attr("id")+"_"+$(this).text()).remove();
									$(".categoryList .addCategory").before('<span class="on" id="'+$(this).parent().attr("id")+"_"+$(this).text().replace(/\s/g,"")+'">'+$(this).text()+'</span>');
                                    // category 空格匹配异常修改
                                    // $(".categoryList .addCategory").before('<span class="on" id="'+$(this).parent().attr("id")+"_"+$(this).text()+'">'+$(this).text()+'</span>');
								}
							});  
						}
					})
					let category=sessionStorage._category;
					if(category!=undefined&&category!=null&&category!=""){
						$.each(category.split(","),function(index){
							let category1=this;
							$.each($("#"+category1.split("_")[0]+" span"),function(count){
								let txt=$(this).text();
								if(txt.replace(/\s/g,"")==category1.split("_")[1]){
                                // category 空格匹配异常修改
                                // if(txt==category1.split("_")[1]){
									$(this).addClass("on");
								}
							})
						})
					}
				}
			}
		})
	}
	$("#"+parentName.replace(/\s/g,"")).show().siblings(".subCategoryItem").hide();
    // category 空格匹配异常修改
    // $("#"+parentName).show().siblings(".subCategoryItem").hide();
}

function getBrand(){
	$.ajax({
		url:path+'/sku/Amazon_MonitoringOverview_SKU_Brand.htm',
		type:"POST",
		data:{
			mysku:$(".typeList span:eq(0)").attr("class")=="on"?2:1,
		},
		success:function(value){
			var data = JSON.parse(value);
			if (data.status == '1') {
				$(".typeList").html($(".typeList span:eq(0)").attr("class")=="on"?'<span style="margin-right: 20px;" class="on">My Sku</span>':'<span style="margin-right: 20px;">My Sku</span>');
				$.each(data.data,function(index){
					$(".typeList").append('<span>'+this.brand+'</span>');
				})
				_init_sj();
			}
		}
	})
	
	if($(".typeList span:eq(0)").attr("class")=="on"){
		$(".tagList,.categoryList").hide();
	}else{
		$(".tagList,.categoryList").show();
	}
}
$(".userManagement").click(function(){
	  $(".userManagement>div").show(500);
	})
	 $(document).click(function(event){
	    var _con = $('.userManagement');   // 设置目标区域
	    if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
	    //$('#divTop').slideUp('slow');   //滑动消失
	    $('.userManagement>div').hide(500);          //淡出消失
	    }
});
setInterval(function(){
	var date = new Date();
	var y =  date.getUTCFullYear();//获取年：
	var m = date.getUTCMonth() ;//获取月： 
	var d = date.getUTCDate();//获取日： 
	var h= date.getUTCHours();//获取小时：
	var M = date.getUTCMinutes();//获取分钟：
	var s = date.getUTCSeconds();//获取秒钟：
	var ss=date.getUTCMilliseconds();
	
	var xx=new Date(y,m,d,h,M,s,ss).getTime();
	var westTime=xx/1000-3600*7;//西海岸
	var eastTime=xx/1000-3600*4;//东海岸
	$("#eastTime").text(timestampToTime(eastTime*1000));
	$("#westTime").text(timestampToTime(westTime*1000));
}, 500);
function timestampToTime(timestamp) {
	var timestamp4 = new Date(timestamp);
	return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
}

/** 
 * 过滤JS数组中的空值，返回新的数组 
 * @param array 需要过滤的数组 
 * @returns {Array} [] 
 */  
function clear_arr_trim(array) {  
    for(var i = 0 ;i<array.length;i++)  
    {  
        if(array[i] == "" || typeof(array[i]) == "undefined")  
        {  
            array.splice(i,1);  
            i= i-1;  
        }  
    }  
    return array;  
} 

/*--------------------------------------------------------------------------------------------------------------*/
function _init_sj(){
	$(".typeList span").unbind();
	$(".typeList span").click(function(){
		let index=$(this).index();
		if($(this).attr("class")=="on"){
			$(this).removeClass("on");
			if($(this).text()=="My Sku"){
				getBrand()
			}
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).text()=="My Sku"){
				getBrand()
			}
		}
		showData();
	})
	$(".tagList span").unbind();
	$(".tagList span").click(function(){
	let index=$(this).index();
	if($(this).attr("class")=="on"){
		$(this).removeClass("on");
	}else{
		$(this).addClass("on");
	}
	tag_str();
	showData();
})
}

function tag_str(){
	let str="";
	$.each($(".tagList span"),function(index){
		if($(this).attr("class")=="on"){
			str=str==""?$(this).text():(str+","+$(this).text());
		}
	})
	sessionStorage._tag=str;
}
function addtags(){
	let tag=sessionStorage._tag;
	if(tag!=undefined&&tag!=null&&tag!=""){
		$.each(tag.split(","),function(index){
			let tag1=this;
			$.each($(".tagList span"),function(count){
				if($(this).text()==tag1){
					$(this).addClass("on");
				}
			})
		})
	}
	// 去除catogory标签空格值重新替换标签值
	// let category=sessionStorage._category;
	// if(category!=undefined&&category!=null&&category!=""){
	// 	$.each(category.split(","),function(index){
	// 		let category1=this;
	// 		$("#"+category1).remove();
	// 		$(".categoryList .addCategory").before('<span class="on" id="'+category1+'">'+category1.split("_")[1]+'</span>');
	// 	})
	// }
}

$(".icon-Icon12").click(function(){
	showData();
})

function getParameter(){
	addtags();
	var o=new Object;
	let _top=1;
	let input_value="";
	let tag="";
	let category="";
	let brand="";
	if($("#condition").next().val()!=null&&$("#condition").next().val()!=undefined&&$("#condition").next().val()!=""){
		_top=$("#condition").val();
		if(_top==3){
			input_value=$("#condition").next().val().split("\n")[0];
		}else{
			$("#condition").next().val().split("\n").forEach(function(value, index, array){
				input_value=input_value+(index==0?"":",")+value;
			})
		}
	}else{
		if(accountType ==1 || accountType ==2){
			_top=1;
		}else{
			$(".typeList").hide()
			_top=2;
		}
		input_value="";
	}
	
	$.each($(".typeList span"),function(){
		if(this.innerHTML=='My Sku'&&$(this).attr('class')=='on'){
			_top=2;
			input_value="";//选择了my sku 输入框条件就是失效
			brand="";
		}else if($(this).attr('class')=='on'){
			brand=this.innerHTML;
			_top=3;
		}
	})
	$.each($(".tagList span"),function(){
		if($(this).attr('class')=='on'){
			tag=tag+(tag==""?"":",")+this.innerHTML;
			_top=3;
		}
	})
	let idc="";
	$.each($(".categoryList span"),function(){
		if($(this).attr('class')=='on'){
			category=category+(category==""?"":",")+this.innerHTML;
			idc=idc+(idc==""?"":",")+$(this).attr('id');
			_top=3;
		}else if($(this).attr('class')=='addCategory'){
			return false;
		}
	})
	
	o._top=_top;
	o.input_value=input_value;
	o.tag=tag;
	o.category=category;
	o.brand=brand;
	sessionStorage._category=idc;
	
	return o;
}
function getURLParameter(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return decodeURI(r[2]); 
    return null; 
}

function loadTag(){
	$.ajax({
		url:path+'/sku/new_getLable.htm',
		type:"POST",
		success:function(value){
			var data = JSON.parse(value);
			if (data.status == '1') {
				$(".tagList").find("span").remove();
				$.each(data.data,function(index){
					$(".tagList").append('<span>'+this.labelName+'</span>');
					$(".tagModelList").append('<span>'+this.labelName+'</span>');
				});
				addtags();
				_init_sj();
			}
		}
	})
}
function checkStar(val){
	var x=parseFloat(val);
	if(Math.round(x*2)%2>0){
		return ' <i class="a-icon a-icon-star a-star-'+parseInt(Math.round(x*2)/2)+'-'+5+'"></i>'
	}else{
		return ' <i class="a-icon a-icon-star a-star-'+parseInt(Math.round(x*2)/2)+'"></i>'
	}
	
}
function checkprime(val){
	if(val==1 || val=='prime' || val=='buybox'){
		return '<i class="a-icon a-icon-prime"></i>'
	}else{
		return ''
	}
}
function Amazon_SKUAnalysis_SkuSearch_Details(asin){
	$.ajax({
		url:path+'/sku/Amazon_SKUAnalysis_SkuSearch_Details.htm?asin='+asin,
		type:"GET",
		success:function(value){
			var data = JSON.parse(value);
			$(".productDetail").html("")
			if (data.status == '1') {
				data.data.forEach(function(value,index){
					$(".productDetail").prev().attr("src",value.sku_imageUrl);
					$(".productDetail").append('<div class="productN" ><a href="https://www.amazon.com/dp/'+value.asin+'" target="_blank">\
				             '+value.sku_productTitle+'\
				            </a></div>\
				            <div>Category: <span style="color:#0066c0;">'+value.Categoy+'</span></div>\
				            <div>Buy box seller: <span style="color:#7f7f7f;">'+value.buybox+'</span></div>\
				            <p>\
				              <span class="price">$'+value.sku_price+'</span>\
				              '+checkprime(value.sku_isPrime)+'\
				              '+checkStar(value.main_avaStar)+'\
				              <span class="num">'+value.main_rwNum+'</span>\
				            </p>');
					$("#categorylm").html(value.Categoy);
				})
				
			}
		}
	})
}

$(".compareBox .tabCt").css({"width":"190px","overflow-y":"auto"});
function SKU_Jingpin(asin){
	$.ajax({
		url:path+'/sku/Amazon_MonitoringOverview_SKU_Jingpin.htm',
		type:"POST",
		data:{asin:asin},
		success:function(value){
			var data = JSON.parse(value);
			$("#ul1").html("")
			if (data.status == '1') {
				if(data.data.length>0){
					$.each(data.data,function(index){
						if(this.asin!=sessionStorage.asin){
						$("#ul1").append('<li ><i onclick="showJINPINData(\''+this.asin+'\',this)" name="'+this.asin+'" class="iconfont icon-tucenggouxuan" ></i>\
					            <div class="img">\
					              <img src="'+this.sku_imageUrl+'" alt="">\
					            </div>\
					            <div class="productName">\
					              '+this.sku_productTitle+'\
					            </div>\
					            <p>'+this.sku_soldBy+'</p>\
					            <p>\
					              <span class="price">$'+this.sku_price+'</span>\
					              '+checkprime(this.sku_isPrime)+'\
					            </p>\
					            <p class="review">\
					              Rating: <span>'+this.main_avaStar+'</span>\
					              Review: <span>'+this.main_rwNum+'</span>\
					            </p>\
					          </li>')
						}
					})
				}else{
					$("#ul1").append('<li onclick="showData()">暂无竞品</li>')
				}
			}
		}
	})
}

function Amazon_MonitoringOverview_SKU_SimilarProducts(asin){
	$.ajax({
		url:path+'/sku/Amazon_MonitoringOverview_SKU_SimilarProducts.htm',
		type:"POST",
		data:{asin:asin},
		success:function(value){
			var data = JSON.parse(value);
			$("#ul2").html("")
			if (data.status == '1') {
				if(data.data.length>0){
					$.each(data.data,function(index){
						if(this.asin!=sessionStorage.asin){
							$("#ul2").append('<li ><i onclick="showJINPINData(\''+this.asin+'\',this)" name="'+this.asin+'" class="iconfont icon-tucenggouxuan" ></i>\
						            <div class="img">\
						              <img src="'+this.sku_imageUrl+'" alt="">\
						            </div>\
						            <div class="productName">\
						              '+this.sku_productTitle+'\
						            </div>\
						            <p>'+this.brand+'</p>\
						            <p>\
						              <span class="price">$'+this.price+'</span>\
						              '+checkprime(this.Prime)+'\
						            </p>\
						            <p class="review">\
						              Rating: <span>'+this.Rating+'</span>\
						              Review: <span>'+this.Review+'</span>\
						            </p>\
						          </li>')
						}
						
					          
					})
					
				}else{
					$("#ul2").append('<li onclick="showData()">暂无同类</li>')
				}
			}
		}
	})
}

/**
 * 显示等待提示框
 */
function showLoading(){
	$("#loading").remove();
	$("body").append('<div class="cover" id="loading" style="display:block;"><div class="loading"><img src="'+path+'/page/production/images/loading.gif"> <p>加载中...</p></div></div>');
}

/**
 * 隐藏等待提示框
 */
function closeLoading(){
	$('#loading').hide();
}

function hasClass(obj, cls) {
    if (obj.className) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    return false;
}


function getCurrentMonth(){
	 var date = new Date();
	 var month = date.getMonth() + 1<10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	 return month;
}
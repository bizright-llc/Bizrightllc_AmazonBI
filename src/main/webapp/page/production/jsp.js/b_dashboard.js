﻿/*-----------------------------------------------------------------------------------------------------------------------*/

{
	getSalesAnalysis();
	getTotalSalesAnalysis();
}
$('#reportrange').change(function(){
	getSalesAnalysis()
})
function getSalesAnalysis() {
	var echart1 = echarts.init(document.getElementById('echart1'), 'shine');

	var dataStr = $('#reportrange span').text();
	var d = dataStr.split('至');
	var startTime = d[0].trim();
	var endTime = d[1].trim();
	$
			.ajax({
				url : path + '/sku/Amazon_SalesAnalysis_SalesAnalysis.htm',
				type : 'post',
				data : {
					startTime : startTime,
					endTime : endTime
				},
				success : function(value) {
					var data = JSON.parse(value);
					if (data.status == '1') {

						var legend_data = [];
						var xAxis_data = [];
						var series = [];

						$
								.each(
										data.data,
										function(index) {
											var series_data = {
												name : '',
												type : 'line',
												//stack : '总量',
												areaStyle : {
													normal : {}
												},
												data : []
											};
											if ($.inArray(this.datatime,
													xAxis_data) == -1) {
												xAxis_data[xAxis_data.length] = this.datatime;
											}
											
											if ($.inArray(this.channel,
													legend_data) == -1) {
												legend_data[legend_data.length] = this.channel;

												series_data.name = this.channel;
												series_data.data[$.inArray(this.datatime,
														xAxis_data)] = this.xiaoliang;
												
												series[series.length] = series_data;
											} else {
												//series[$.inArray(this.channel,legend_data)].data[series[$.inArray(this.channel,legend_data)].data.length] = this.xiaoliang;
												series[$.inArray(this.channel,legend_data)].data[$.inArray(this.datatime,
														xAxis_data)] = this.xiaoliang;
											}
											
										})
								console.log(JSON.stringify(series))		
						$.each(series,function(index){
							$.each(this.data,function(count){
								if("[object Window]"==this){
									series[index].data[count]=0;
								}
							})
						})
						
						echart1.setOption({
							tooltip : {
								trigger : 'axis',
							},
							legend : {
								type:'scroll',
								data : legend_data
							},
							grid : {
								top : '40px',
								left : '10px',
								right : '40px',
								bottom : '10px',
								containLabel : true
							},
							xAxis : [ {
								type : 'category',
								boundaryGap : false,
								data : xAxis_data
							} ],
							yAxis : [ {
								type : 'value'
							} ],
							series : series
						}, true);
					} else {

					}
				}

			})
}
$('#reportrange1').change(function(){
	getTotalSalesAnalysis()
})
function getTotalSalesAnalysis() {
	var echart2 = echarts.init(document.getElementById('echart2'), 'shine');
	var echart3 = echarts.init(document.getElementById('echart3'), 'shine');
	var dataStr = $('#reportrange1 span').text();
	var d = dataStr.split('至');
	var startTime = d[0].trim();
	var endTime = d[1].trim();
	$
			.ajax({
				url : path + '/sku/Amazon_SalesAnalysis_TotalSalesAnalysis.htm',
				type : 'post',
				data : {
					startTime : startTime,
					endTime : endTime
				},
				success : function(value) {
					var data = JSON.parse(value);
					if (data.status == '1') {

						var legend_data = [];
						var xAxis_data = [];
						var series = [];
						var series1 = [];
						$
								.each(
										data.data,
										function(index) {
											var series_data = {
												name : '',
												type : 'bar',
												barMaxWidth : "15px",
												data : [ 0, 0 ]
											};

											var series_data1 = {
												name : '',
												type : 'bar',
												stack : '总量',
												barMaxWidth : "30px",
												data : [ 0, 0 ]
											};
											if ($.inArray(this.channel,
													legend_data) == -1) {
												legend_data[legend_data.length] = this.channel;

												series_data.name = this.channel;
												series_data1.name = this.channel;
												series_data.data[0] = this.allxiaoliang;
												series_data1.data[0] = this.allxiaoliang_zhanbi.replace('%', '');
												series[series.length] = series_data;
												series1[series1.length] = series_data1;
											}

										})

						echart2.setOption({
							tooltip : {
								trigger : 'axis',
								backgroundColor : 'rgba(40,54,106,.8)',
							},
							toolbox : {
								show : false
							},
							grid : {
								top : '40px',
								left : '10px',
								right : '40px',
								bottom : '10px',
								containLabel : true
							},
							calculable : false,
							xAxis : {
								type : 'value',
								axisLabel : {
									show : true,
								},
							},
							legend : {
								data : legend_data,
								left : 0,
								type:'scroll',
							},
							yAxis : [ {
								type : 'category',
								boundaryGap : [ '10px', '10px' ],
								data : [ '销售量', '销售额' ]
							} ],
							series : series
						}, true);
						echart3
								.setOption(
										{
											tooltip : {
												trigger : 'axis',
												backgroundColor : 'rgba(40,54,106,.8)',
												formatter : function(params) {
													var result = '';
													result = params[0].name
															+ "<br/>";//让series中的文字进行换行 
													params
															.forEach(function(
																	item) {
																result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'
																		+ item.color
																		+ '"></span>'
																		+ item.seriesName
																		+ ":"
																		+ item.value
																		+"%"
																		+ "<br/>"
															})
													return result;
												},
											},
											toolbox : {
												show : false
											},
											grid : {
												top : '40px',
												left : '10px',
												right : '40px',
												bottom : '10px',
												containLabel : true
											},
											calculable : false,
											legend : {
												data : legend_data,
												left : 0,
												type:'scroll',
											},
											yAxis : [ {
												type : 'category',
												boundaryGap : [ '10px', '10px' ],
												data : [ '销售量占比', '销售额占比' ],
											} ],
											xAxis : {
												type : 'value',
												axisLabel : {
													show : true,
												formatter: '{value} %'
												},
											},
											series : series1
										}, true);
					} else {

					}
				}

			})
}
﻿
/**
 * 文档加载完成
 */
$(document).ready(function(){


	showData();
});



function showData(){
	
	var arr_so = sessionStorage.getItem('arr_so');
	arr_so=arr_so.split(',');
	var arr_SAmz = sessionStorage.getItem('arr_SAmz');
	arr_SAmz=arr_SAmz.split(',');
	var arr_total = sessionStorage.getItem('arr_total');
	arr_total=arr_total.split(',');
	var arr_date = sessionStorage.getItem('arr_date');
	arr_date=arr_date.split(',');
	
	
	let myChart = echarts.init(document.getElementById('echarts'), 'shine');
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['So', 'SAmz', 'Total']
        },
        grid: {
            top: '40px',
            left: '10px',
            right: '40px',
            bottom: '10px',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: arr_date,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#DFDFDF'
                }
            },
            axisLabel:{
                color:'#333'
            },
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#DFDFDF'
                }
            }
        }],
        series: [{
                name: 'So',
                type: 'line',
                data: arr_so,
                lineStyle: {
                    color:'#4A92FF'
                },
                itemStyle:{
                    color:'#4A92FF'
                }
            },
            {
                name: 'SAmz',
                type: 'line',
                lineStyle:{
                    color:'#F5A623'
                },
                itemStyle:{
                    color:'#F5A623'
                },
                data: arr_SAmz
            },
            {
                name: 'Total',
                type: 'line',
                lineStyle:{
                    color:'#E95252'
                },
                itemStyle:{
                    color:'#E95252'
                },
                data: arr_total
            }
        ]
    };
    myChart.setOption(option);
}




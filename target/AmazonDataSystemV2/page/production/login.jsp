<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 ">

    <title>登录页</title>
	<jsp:include page="../production/common.jsp/commonCss.jsp"/>
    <style>
      h5{text-align: left;}
    </style>
  </head>
  <body style="background: #fff;">
    <!-- 头部导航 -->
    
    <!-- ***头部导航*** -->
    <div class="login" >
      <div style="text-align:center;margin-top: 140px;">
        <div class="loginBox">
<%--          <h4>登录</h4>--%>
          <h4>Login</h4>
          <form id="myform" method="post"  action = "<%=path %>/user/userLogin.htm">
            <p class="tip">${tip }</p>
            <h5>账号</h5>
            <div class="iphoneNumber">
              <input type="text" name="username">
            </div>
            <h5>密码</h5>
            <div class="password">
              <input type="password" name="password">
            </div>
            <button type="button" id="login">登录</button>
          </form>
        </div>
      </div>
    
   </div>
   <div class="footer" style="position: fixed;bottom:0;width: 100%">
         
   </div>



	<jsp:include page="../production/common.jsp/commonJs.jsp"/> 
	<script src="<%=path %>/page/production/jsp.js/login.js"></script>
  </body>
</html>

<script type= "text/javascript" >
  
/**
 * 获取浏览器类型以及版本号
 * 支持国产浏览器:猎豹浏览器、搜狗浏览器、傲游浏览器、360极速浏览器、360安全浏览器、
 * QQ浏览器、百度浏览器等.
 * 支持国外浏览器:IE,Firefox,Chrome,safari,Opera等.
 * 使用方法:
 * 获取浏览器版本:Browser.client.version
 * 获取浏览器名称(外壳):Browser.client.name
 * @author:xuzengqiang
 * @since :2015-1-27 10:26:11
**/
var Browser=Browser || (function(window){
   var document = window.document,
     navigator = window.navigator,
     agent = navigator.userAgent.toLowerCase(),
     //IE8+支持.返回浏览器渲染当前文档所用的模式
     //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
     //IE10:10(兼容模式7||8||9)
     IEMode = document.documentMode,  
     //chorme
     chrome = window.chrome || false ,
     System = {
       //user-agent
       agent : agent,
       //是否为IE
       isIE : /msie/.test(agent),
       //Gecko内核
       isGecko: agent.indexOf( "gecko" )> 0 && agent.indexOf( "like gecko" )< 0 ,
       //webkit内核
       isWebkit: agent.indexOf( "webkit" )> 0 ,
       //是否为标准模式
       isStrict: document.compatMode === "CSS1Compat" ,
       //是否支持subtitle
       supportSubTitle:function(){
         return "track" in document.createElement( "track" );
       },
       //是否支持scoped
       supportScope:function(){
         return "scoped" in document.createElement( "style" );
       },
       //获取IE的版本号
       ieVersion:function(){
         try {
          return agent.match(/msie ([\d.]+)/)[ 1 ] || 0 ;
         } catch (e) {
          console.log( "error" );
          return IEMode;
         }
       },
       //Opera版本号
       operaVersion:function(){
         try {
           if (window.opera) {
             return agent.match(/opera.([\d.]+)/)[ 1 ];
           } else if (agent.indexOf( "opr" ) > 0 ) {
             return agent.match(/opr\/([\d.]+)/)[ 1 ];
           }
         } catch (e) {
           console.log( "error" );
           return 0 ;
         }
       },
       //描述:version过滤.如31.0.252.152 只保留31.0
       versionFilter:function(){
         if (arguments.length === 1 && typeof arguments[ 0 ] === "string" ) {
           var version = arguments[ 0 ];
             start = version.indexOf( "." );
           if (start> 0 ){
             end = version.indexOf( "." ,start+ 1 );
             if (end !== - 1 ) {
               return version.substr( 0 ,end);
             }
           }
           return version;
         } else if (arguments.length === 1 ) {
           return arguments[ 0 ];
         }
         return 0 ;
       }
     };
      
   try {
     //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
     System.type = System.isIE? "IE" :
       window.opera || (agent.indexOf( "opr" ) > 0 )? "Opera" :
       (agent.indexOf( "chrome" )> 0 )? "Chrome" :
       //safari也提供了专门的判定方式
       window.openDatabase? "Safari" :
       (agent.indexOf( "firefox" )> 0 )? "Firefox" :   
       'unknow' ;
        
     //版本号 
     System.version = (System.type === "IE" )?System.ieVersion():
       (System.type === "Firefox" )?agent.match(/firefox\/([\d.]+)/)[ 1 ]:
       (System.type === "Chrome" )?agent.match(/chrome\/([\d.]+)/)[ 1 ]:
       (System.type === "Opera" )?System.operaVersion():
       (System.type === "Safari" )?agent.match(/version\/([\d.]+)/)[ 1 ]:
       "0" ;
      
     //浏览器外壳
     System.shell=function(){
       //遨游浏览器
       if (agent.indexOf( "maxthon" ) > 0 ) {
         System.version = agent.match(/maxthon\/([\d.]+)/)[ 1 ] || System.version ;
         return "傲游浏览器" ;
       }
       //QQ浏览器
       if (agent.indexOf( "qqbrowser" ) > 0 ) {
         System.version = agent.match(/qqbrowser\/([\d.]+)/)[ 1 ] || System.version ;
         return "QQ浏览器" ;
       }
        
       //搜狗浏览器
       if ( agent.indexOf( "se 2.x" )> 0 ) {
         return '搜狗浏览器' ;
       }
        
       //Chrome:也可以使用window.chrome && window.chrome.webstore判断
       if (chrome && System.type !== "Opera" ) {
         var external = window.external,
           clientInfo = window.clientInformation,
           //客户端语言:zh-cn,zh.360下面会返回undefined
           clientLanguage = clientInfo.languages;
          
         //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
         if ( external && 'LiebaoGetVersion' in external) {
           return '猎豹浏览器' ;
         }
         //百度浏览器
         if (agent.indexOf( "bidubrowser" )> 0 ) {
           System.version = agent.match(/bidubrowser\/([\d.]+)/)[ 1 ] ||
             agent.match(/chrome\/([\d.]+)/)[ 1 ];
           return "百度浏览器" ;
         }
         //360极速浏览器和360安全浏览器
         if ( System.supportSubTitle() && typeof clientLanguage === "undefined" ) {
           //object.key()返回一个数组.包含可枚举属性和方法名称
           var storeKeyLen = Object.keys(chrome.webstore).length,
             v8Locale = "v8Locale" in window;
           return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器' ; 
         }
         return "Chrome" ;
       }
       return System.type;   
     };
  
     //浏览器名称(如果是壳浏览器,则返回壳名称)
     System.name = System.shell();
     //对版本号进行过滤过处理
     System.version = System.versionFilter(System.version);
      
   } catch (e) {
     console.log( "error" );
   }
   return {
     client:System
   };
    
})(window);
 
 if(Browser.client.name=='IE'&&parseInt(Browser.client.version)<=8){
	 alert('系统检测到您的浏览器为IE版本并且在8以下，为了更好的使用体验，请您升级您的版本..谢谢');
 }
	 
</script>
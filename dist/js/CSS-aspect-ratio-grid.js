/**@license Copyright (c) 2015 Cesar Candela
* www.cssguy4hire.com 
*/
var debug=!1;if($(document).ready(function(){var t=$("#removeGrid"),e=$(t).attr("data-text"),n=$("span",t).text(),o=$("#drawArea");$(t).on({click:function(t){t.preventDefault,$("span",this).text($("span",this).text()==e?n:e),$(o).toggleClass("noGrid")}})}),debug)var console_log=void 0;else console_log=function(){};
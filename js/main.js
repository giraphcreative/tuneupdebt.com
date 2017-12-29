!function(t,e,a,n){t.extend(t.fn,{accrue:function(e){return e=t.extend({calculationMethod:l},t.fn.accrue.options,e),this.each(function(){var a=t(this);a.find(".form").length||a.append('<div class="form"></div>');o(a,e,"amount"),o(a,e,"rate"),o(a,e,"term");if("compare"==e.mode)o(a,e,"rate_compare");var n;".results"===e.response_output_div?(0===a.find(".results").length&&a.append('<div class="results"></div>'),n=a.find(".results")):n=t(e.response_output_div);var r;switch(e.mode){case"basic":r=l;break;case"compare":r=s;break;case"amortization":r=i}r(a,e,n),"button"==e.operation?(0===a.find("button").length&&0===a.find("input[type=submit]").length&&0===a.find("input[type=image]").length&&a.find(".form").append('<button class="accrue-calculate">'+e.button_label+"</button>"),a.find("button, input[type=submit], input[type=image]").each(function(){t(this).click(function(t){t.preventDefault(),r(a,e,n)})})):a.find("input, select").each(function(){t(this).bind("keyup change",function(){r(a,e,n)})}),a.find("form").each(function(){t(this).submit(function(t){t.preventDefault(),r(a,e,n)})})})}}),t.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:'<p class="total-savings">Save $%savings% in interest!</p>',error_text:'<p class="error">Please fill in all fields.</p>',callback:function(t,e){}};function r(t){return t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}var o=function(t,e,a){var n;return t.find(".accrue-"+a).length?n=t.find(".accrue-"+a):t.find("."+a).length?n=t.find("."+a):t.find("input[name~="+a+"]").length?t.find("input[name~="+a+"]"):n="","string"!=typeof n?n.val():"term_compare"!=a&&(t.find(".form").append('<div class="accrue-field-'+a+'"><p><label>'+e.field_titles[a]+':</label><input type="text" class="'+a+'" value="'+e.default_values[a]+'" />'+(e.field_comments[a].length>0?"<small>"+e.field_comments[a]+"</small>":"")+"</p></div>"),t.find("."+a).val())},l=function(e,a,n){var l=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")});if(0!==l){var s=a.response_basic.replace("%payment_amount%",r(l.payment_amount_formatted)).replace("%num_payments%",l.num_payments).replace("%total_payments%",r(l.total_payments_formatted)).replace("%total_interest%",r(l.total_interest_formatted));n.html(s)}else n.html(a.error_text);a.callback(e,l)},s=function(e,a,n){var l=o(e,a,"term_compare");"boolean"==typeof l&&(l=o(e,a,"term"));var s=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")}),i=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate_compare"),term:l}),m={loan_1:s,loan_2:i};if(0!==s&&0!==i){s.total_interest-i.total_interest>0?m.savings=s.total_interest-i.total_interest:m.savings=0;var c=a.response_compare.replace("%savings%",r(m.savings.toFixed(2))).replace("%loan_1_payment_amount%",r(i.payment_amount_formatted)).replace("%loan_1_num_payments%",i.num_payments).replace("%loan_1_total_payments%",i.total_payments_formatted).replace("%loan_1_total_interest%",r(i.total_interest_formatted)).replace("%loan_2_payment_amount%",r(s.payment_amount_formatted)).replace("%loan_2_num_payments%",s.num_payments).replace("%loan_2_total_payments%",s.total_payments_formatted).replace("%loan_2_total_interest%",r(s.total_interest_formatted));n.html(c)}else n.html(a.error_text);a.callback(e,m)},i=function(e,a,n){var l=t.loanInfo({amount:o(e,a,"amount"),rate:o(e,a,"rate"),term:o(e,a,"term")});if(0!==l){for(var s='<table class="accrue-amortization"><thead><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr></thead><tbody>',i=l.payment_amount-l.original_amount/l.num_payments,m=l.payment_amount-i,c=0,u=0,p=parseInt(l.original_amount,10),_=0;_<l.num_payments;_++){c+=i,u+=l.payment_amount,p-=m;var d="td";_==l.num_payments-1&&(d="th"),s=s+"<tr><"+d+' class="accrue-payment-number">'+(_+1)+"</"+d+"><"+d+' class="accrue-payment-amount">$'+r(l.payment_amount_formatted)+"</"+d+"><"+d+' class="accrue-total-interest">$'+r(c.toFixed(2))+"</"+d+"><"+d+' class="accrue-total-payments">$'+r(u.toFixed(2))+"</"+d+"><"+d+' class="accrue-balance">$'+r(p.toFixed(2))+"</"+d+"></tr>"}s+="</tbody></table>",n.html(s)}else n.html(a.error_text);a.callback(e,l)};t.loanInfo=function(t){var e=(void 0!==t.amount?t.amount:0).toString().replace(/[^\d.]/gi,""),a=(void 0!==t.rate?t.rate:0).toString().replace(/[^\d.]/gi,""),n=void 0!==t.term?t.term:0;n=n.match("y")?12*parseInt(n.replace(/[^\d.]/gi,""),10):parseInt(n.replace(/[^\d.]/gi,""),10);var r=a/100/12,o=Math.pow(1+r,n),l=e*o*r/(o-1);return e*a*n>0?{original_amount:e,payment_amount:l,payment_amount_formatted:l.toFixed(2),num_payments:n,total_payments:l*n,total_payments_formatted:(l*n).toFixed(2),total_interest:l*n-e,total_interest_formatted:(l*n-e).toFixed(2)}:0},t.loanAmount=function(t){var e=(void 0!==t.payment?t.payment:0).toString().replace(/[^\d.]/gi,""),a=(void 0!==t.rate?t.rate:0).toString().replace(/[^\d.]/gi,""),n=void 0!==t.term?t.term:0;n=n.match("y")?12*parseInt(n.replace(/[^\d.]/gi,""),10):parseInt(n.replace(/[^\d.]/gi,""),10);var r=a/100/12,o=a/100,l=e*(1-Math.pow(1+r,-1*n))*(12/o);return l>0?{principal_amount:l,principal_amount_formatted:(1*l).toFixed(2),payment_amount:e,payment_amount_formatted:(1*e).toFixed(2),num_payments:n,total_payments:e*n,total_payments_formatted:(e*n).toFixed(2),total_interest:e*n-l,total_interest_formatted:(e*n-l).toFixed(2)}:0}}(jQuery,window,document),function(t,e,a,n,r,o,l){t.GoogleAnalyticsObject="ga",t.ga=t.ga||function(){(t.ga.q=t.ga.q||[]).push(arguments)},t.ga.l=1*new Date,o=e.createElement("script"),l=e.getElementsByTagName("script")[0],o.async=1,o.src="https://www.google-analytics.com/analytics.js",l.parentNode.insertBefore(o,l)}(window,document),ga("create","UA-99238283-1","auto"),ga("send","pageview");function formatNumber(t){return t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}$(function(){var t=function(){var t=parseFloat($(".calculator.one .results").text().replace(",","")),e=parseFloat($(".calculator.two .results").text().replace(",","")),a=parseFloat($(".calculator.three .results").text().replace(",","")),n=parseFloat($(".calculator.one .amount").val().toString().replace(/[^\d.]/gi,"")),r=parseFloat($(".calculator.two .amount").val().toString().replace(/[^\d.]/gi,"")),o=parseFloat($(".calculator.three .amount").val().toString().replace(/[^\d.]/gi,"")),l=(isNaN(t)?0:t)+(isNaN(e)?0:e)+(isNaN(a)?0:a),s=(isNaN(n)?0:n)+(isNaN(r)?0:r)+(isNaN(o)?0:o),i=l-$.loanInfo({amount:s,rate:9.24,term:"36m"}).total_interest;(i<0||isNaN(i))&&(i=0),$(".total-savings").html("$"+formatNumber(i.toFixed(2)))};$(".calculator.one").accrue({response_basic:"%total_interest%",callback:t}),$(".calculator.two").accrue({response_basic:"%total_interest%",callback:t}),$(".calculator.three").accrue({response_basic:"%total_interest%",callback:t})});var valid_email=function(t){return-1!=String(t).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)},contact_submit=function(t){$(t).find("input[type=submit]").attr("disabled","disabled");var e={name:$(t).find("input[name=name]").val(),email:$(t).find("input[name=email]").val(),phone:$(t).find("input[name=phone]").val(),message:$(t).find("textarea").val()},a=$.param(e),n=[],r=$(t).find(".error");return r.html(""),e.name.length<2&&n.push("Please provide a name."),valid_email(e.email)||n.push("Please provide a valid email address."),0==n.length?$.post("/send.php",a,function(t){"success"===t?location.href="/thanks.html":r.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(r.html(""),$.each(n,function(t,e){0===t?r.append(e):r.append("<br>"+e)}),r.is(":hidden")&&r.slideDown(400)),!1};$(document).ready(function(){$("form#contact").submit(function(t){t.preventDefault(),contact_submit(this)})});
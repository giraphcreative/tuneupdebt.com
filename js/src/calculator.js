

function formatNumber( num ) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


$(function(){

	var get_total = function() {
		var interest_one = parseFloat( $(".calculator.one .results").text().replace(',','') ),
			interest_two = parseFloat( $(".calculator.two .results").text().replace(',','') ),
			interest_three = parseFloat( $(".calculator.three .results").text().replace(',','') );

		var amount_one = parseFloat( $(".calculator.one .amount").val().toString().replace(/[^\d.]/ig, '') ),
			amount_two = parseFloat( $(".calculator.two .amount").val().toString().replace(/[^\d.]/ig, '') ),
			amount_three = parseFloat( $(".calculator.three .amount").val().toString().replace(/[^\d.]/ig, '') );

		var total_interest = ( !isNaN( interest_one ) ? interest_one : 0 ) + ( !isNaN( interest_two ) ? interest_two : 0 ) + ( !isNaN( interest_three ) ? interest_three : 0 );

		var total_amount = ( !isNaN( amount_one ) ? amount_one : 0 ) + ( !isNaN( amount_two ) ? amount_two : 0 ) + ( !isNaN( amount_three ) ? amount_three : 0 );

		var loan_info = $.loanInfo({
			'amount': total_amount,
			'rate': 9.24,
			'term': '36m'
		});

		var interest_savings = total_interest - loan_info.total_interest;
		if ( interest_savings < 0 || isNaN( interest_savings ) ) interest_savings = 0;

		$( ".total-savings" ).html( "$" + formatNumber( interest_savings.toFixed(2) ) );
	};


	$(".calculator.one").accrue({
		response_basic: "%total_interest%",
		callback: get_total
	});
	
	$(".calculator.two").accrue({
		response_basic: "%total_interest%",
		callback: get_total
	});
	
	$(".calculator.three").accrue({
		response_basic: "%total_interest%",
		callback: get_total
	});

});


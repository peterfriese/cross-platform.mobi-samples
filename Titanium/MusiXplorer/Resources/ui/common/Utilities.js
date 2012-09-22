function Utilities() {
	function parseISODate (input) {
	    var iso = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
	
	    var parts = input.match(iso);
	
	    if (parts == null) {
	        throw new Error("Invalid Date");
	    }
	
	    var year = Number(parts[1]);
	
	    if (typeof parts[2] != "undefined") {
	        /* Convert weeks to days, months 0 */
	        var weeks = Number(parts[2]) - 1;
	        var days  = Number(parts[3]);
	
	        if (typeof days == "undefined") {
	            days = 0;
	        }
	
	        days += weeks * 7;
	
	        var months = 0;
	    }
	    else {
	        if (typeof parts[4] != "undefined") {
	            var months = Number(parts[4]) - 1;
	        }
	        else {
	            /* it's an ordinal date... */
	            var months = 0;
	        }
	
	        var days   = Number(parts[5]);
	    }
	
	    if (typeof parts[6] != "undefined" &&
	        typeof parts[7] != "undefined")
	    {
	        var hours        = Number(parts[6]);
	        var minutes      = Number(parts[7]);
	
	        if (typeof parts[8] != "undefined") {
	            var seconds      = Number(parts[8]);
	
	            if (typeof parts[9] != "undefined") {
	                var fractional   = Number(parts[9]);
	                var milliseconds = fractional / 100;
	            }
	            else {
	                var milliseconds = 0
	            }
	        }
	        else {
	            var seconds      = 0;
	            var milliseconds = 0;
	        }
	    }
	    else {
	        var hours        = 0;
	        var minutes      = 0;
	        var seconds      = 0;
	        var fractional   = 0;
	        var milliseconds = 0;
	    }
	
	    if (typeof parts[10] != "undefined") {
	        /* Timezone adjustment, offset the minutes appropriately */
	        var localzone = -(new Date().getTimezoneOffset());
	        var timezone  = parts[10] * 60;
	
	        minutes = Number(minutes) + (timezone - localzone);
	    }
	
	    return new Date(year, months, days, hours, minutes, seconds, milliseconds);
	}
};

module.exports=Utilities
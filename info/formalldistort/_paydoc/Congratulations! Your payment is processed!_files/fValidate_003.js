/** i18n strings ******************************************************************/
fvalidate.i18n =
{
	//	Validation errors
	errors:
	{
		blank:		[
			['Please enter $0']
			],
		length:		[
			['$0 must be at least $1 characters long'],
			['$0 must be no more than $1 characters long.\nThe current text is $2 characters long.']
			],                                                                                      	
		equalto:	[
			['$0 must be equal to $1']
			],
		number:		[
			['The number you entered for $0 is not valid']
			],
		numeric:	[
			['Only numeric values are valid for the $0'],
			['A minimum of $0 numeric values are required for the $1']
			],
		alnum:		[
			['The data you entered $0, does not match the requested format for $1\nMinimum Length: $2 \nCase: $3\nNumbers allowed: $4\nSpaces allowed: $5\nPunctuation characters allowed: $6\n']
			],
		decimal:	[
			['The data you entered, $0 is not valid. Please re-enter the $1']
			],
		decimalr:	[
			['$0 is not a valid. Please re-enter.']
			],
		ip:			[
			['Please enter a valid IP'],
			['The port number you specified, $0, is out of range.\nIt must be between $1 and $2']
			],
		ssn:		[
			['You need to enter a valid Social Security Number.\nYour SSN must be entered in \'XXX-XX-XXXX\' format.']
			],
		money:		[
			['$0 does not match the required format of $1']
			],
		cc:			[
			['The $0 you entered is not valid. Please check again and re-enter.']
			],
		ccDate:		[
			['You credit card has expired! Please use a different card.']
			],
		zip:		[
			['Please enter a valid 5 or 9 digit Zip code.']
			],
		phone:		[
			['Please enter a valid phone number plus Area Code.'],
			['Please enter a valid phone number - seven or ten digits.']
			],
		email:		[
			['Please enter a valid email address']
			],
		url:		[
			['$0 is not a valid domain']
			],
		datetime:
			['The date entered for $0, is not a valid\nPlease enter a date using the following format: $1'],	
		date:		[
			['The data entered for $0, is not a valid date\nPlease enter a date using the following format: $1'],
			['Date must be before $0'],
			['Date must be on or before $0'],
			['Date must be after $0'],
			['Date must be on or after $0']
			],
		select:		[
			['Please select a valid option for $0']
			],
		selectm:	[
			['Please select between $0, and $1, options for $2,\nYou currently have $3, selected']
			],
		selecti:	[
			['Please select a valid option for $0']
			],
		checkbox:	[
			['Please check $0 before continuing'],
			['Please select between $0, and $1, options for $2,\nYou currently have $3, selected']
			],
		radio:		[
			['Please check $0 before continuing'],
			['Please select an option for $0']
			],
		comparison:	[
			['$0 must be $1, $2']
			],
		eitheror:	[
			['One and only one of the following fields must be entered:\n\t-$0\n']
			],
		atleast:	[
			['At least, $0, of the following fields must be entered:\n\t-$1,\n\nYou have only $2 filled in.\n']
			],
		allornone:	[
			['All or none of the following fields must be entered and accurate:\n\t-$0\nYou have only $1 accurate field entered.\n']
			],
		file:		[
			['The file must be one of the following types:\n $0\nNote: File extension may be case-sensitive.']
			],
		custom:		[
			['$0 is invalid.']
			],
		cazip:		[
			['Please enter a valid postal code.']
			],
		ukpost:		[
			['Please enter a valid postcode.']
			],
		germanpost:	[
			['Please enter a valid postcode.']
			],
		swisspost:	[
			['Please enter a valid postcode.']
			],
		password:		[
			['Password should be not less than 6 symbols long! And cannot contain national symbols!']
			],
		loginname:	[
			['Use only alphanumerics, dashes, dots and underscore symbols in the Login name!']
		],
		_name_:			[
			['Name cannot contain special characters!']
		],
		middlename:	[
			['Please enter a valid Middle Name!']
		],
		PhoneCountryCode:	[
			['$0 should contain digits only!']
		],
		validateExpDate:	[
			['Please enter a valid date']
		],
		validateIPADDR:	[
			['Please enter 4 numbers from 0 to 255 devided by point (Example: 192.168.0.1)']
		],
		validatePositive:	[
			['Please enter a positive value for $0']
		],
		validatePositiveInt:	[
			['Use digits only for: $0'],
			['Please enter a positive value for: $0']
		],
		validateInt:	[
			['Only numeric values accepted for $0']
		],
		validateID:	[
			['$0 cannot contain special characters!'],
			['Please enter a positive value for: $0']
		],
		validateAccurateMoney:	[
			['$0 sum must be greater than or equal to zero and conform \"0.0000\" format.']
		],
		validatePositiveMoney:	[
			['$0 sum must be greater than or equal to zero and conform \"0.00\" format.']
		],
		validatePozitive:	[
			['Please enter a pozitive value for Card Security Code']
		],
		validatePositiveDouble: [
			['Please enter decimal value greater or equal to zero for $1. Valid value examples: 0, 1, 0.1, 5.22']
		],
		number_range:	[
			['Value should be from the interval [$0;$1]']
		],
		bik:	[
			['Enter correct value for $0 in the format $1']
		],
		account:	[
			['Enter correct value for $0 in the format $1']
		],
		inn: [
			['Enter correct value for $0 in the format $1']
		],
		validatePercent:	[
			['Please enter decimal value for $0 in the range from zero to 100. Valid value examples: 0, 1, 0.1, 5.22']
		],
		cvv:	[
			['Please enter a correct value for Card Security Code']
		],
		issnum: [
			['Please enter a correct value for IssueNumber']

		],
		ascii: [
			['Please use ASCII only symbols for $0']
		],
		subdomain: [
			['Subdomain should be 1 to 63 characters long and may contain ASCII letters, digits and hyphen only.']
		],
		directory: [
			['Directory may contain ASCII letters, digits, hyphen, underscore character and dot only.']
		]
	},

	comparison:
	{
		gt:		'greater than',
		lt:		'less than',
		gte:	'greater than or equal to',
		lte:	'less than or equal to',
		eq:		'equal to',
		neq:	'not! equal to'
	},

	//	Developer assist errors
	devErrors:
	{
		number:		['The lower-bound ($0) is greater than the upper-bound ($1) on this element: $2'],
		length:		['The minimum length ($0) is greater than the maxiumum legnth ($1) on this element: $2'],
		cc:			['Credit Card type ($0) not found.'],
		lines:		['! WARNING ! -- fValidate developer-assist error\n'],
		paramError: ['You must include the $0 parameter for the $1 validator type on this field: $2'],
		notFound:	['The validator $0 was not found.\nRequested by: $1'],
		noLabel:	['No element found for label: $0'],
		noBox:		['An element with the requested id \'$0\' was not found for the \'boxError\' config value.'],
		missingName:['The hidden input calling the following logical validator must have a valid name\nattribute when used in conjunction with the \'box\' error-type.\n\t$0'],
		mismatch:	['Validator/Element type mismatch.\n\nElement: $0\nElement type: $1\nType required by validator: $2'],
		noCCType:	['You must include a SELECT item with Credit Card type choices!']
	},

	//	Config values
	config :
	{
		confirmMsg :		'Your data is about to be sent.\nPlease click \'Ok\' to proceed or \'Cancel\' to abort.',
		confirmAbortMsg :	'Submission cancelled.  Data has not been sent.'
	},

	//	Reseller wizard messages
	reseller_wizard :
	{
		srcZero : 'n/a',
		srcMsg :		'@1@% (@2@)',
		srcInvalid :	'(@1@)',
		errorMsg :	'Invalid value'
	},

	//	Tooltip attached to Box-item errors
	boxToolTip:	'Click to target field',
	
	//	Caption and text of Box-item errors
	boxCaption:	'Error:',	
	boxMessageText:	'One or more required fields are empty or filled incorrectly, please try again.',		

	//	Message displayed at top of alert error in group mode
	groupAlert:	'The following errors occurred:\n\n- ',

	//	Literal translation of the English 'or', include padding spaces.
	or:			' or ',
	// Decimal delimeter
	decimal:	'.',
	// Thousand delimeter	
	thousand:	','
}
'use strict';
!function() {
  registerNamespace("$Config");
  $Config.sharedStrings = {
    "errors" : {
      "required" : "This information is required.",
      "emailRequired" : "An email address is required",
      "phoneRequired" : "A phone number is required",
      "passwordRequired" : "A password is required",
      "invalidEmailFormat" : "Enter the email address in the format someone@example.com.",
      "invalidPhoneFormat" : "The phone number you entered isn't valid. Your phone number can contain numbers, spaces, and these special characters: ( ) [ ] . - * /",
      "emailMustStartWithLetter" : "Your email address needs to start with a letter. Please try again.",
      "memberNameAvailable" : "{0} is available.",
      "memberNameAvailableEasi" : "After you sign up, we'll send you a message with a link to verify this user name.",
      "memberNameExistsPhone" : "If you own a Microsoft account with this number, go back and sign in.",
      "proofAlreadyExistsError" : "This is already part of your security info.",
      "signupBlocked" : "{0} isn't available.",
      "memberNameTakenPhone" : "The phone number you typed is already in use. Please type a different number.",
      "memberNameTakenEasi" : '<span class="ltr_override inline_block">{0}</span> is already a Microsoft account. Please try a different email address.',
      "checkAvailableFail" : "",
      "passwordInvalidChar" : "The password contains characters that aren't allowed.",
      "passwordTooSimple" : "Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols.",
      "pwdContainsMnEmail" : "Your password can't contain the part of your email address that comes before the @ sign.",
      "pwdContainsMnPhone" : "Your password can't contain the phone number you are trying to signup for.",
      "bannedPassword" : "We've seen that password too many times before. Choose something harder to guess.",
      "passwordNotMatch" : "These passwords don't match.",
      "autoVerificationFailed" : "We couldn\u2019t verify your number. Make sure the number is entered correctly.",
      "generic" : "There's a temporary problem with the service. Please try again. If you continue to get this message, try again later.",
      "verificationThrottled" : "You've requested too many codes today. Please try again tomorrow.",
      "domainNotAllowed" : "This email is part of a reserved domain. Please enter a different email address.",
      "oneTimeCodeInvalid" : "That code didn't work. Check the code and try again.",
      "forbiddenWord" : "This name contains a word that isn't allowed. Please enter a different name.",
      "passwordIncorrect" : "The password contains characters that aren't allowed.",
      "passwordConflict" : "This password cannot be used. Choose a different password.",
      "invalidBirthDate" : "The birth date entered is invalid.",
      "invalidFirstName" : "Your name contains characters that are not allowed.",
      "invalidLastName" : "Your name contains characters that are not allowed.",
      "invalidGender" : "This information is required.",
      "domainExistsInAad" : 'You can\'t sign up here with a work or school email address. Use a personal email, such as Gmail or Yahoo!, or <a href="#" id="{0}" onclick="return false;">get a new Outlook email</a>.',
      "domainExistsInAadSupportedLogin" : "It looks like there's already an account with {0}. If it's you, go back and sign in. Otherwise, choose another username.",
      "memberNameTakenNoSugg" : "Someone already has this email address. Try another name.",
      "memberNameTaken" : 'Someone already has this email address. Try another name or <a id="suggLink" href="#" onclick="return false;">claim one of these that\'s available</a>',
      "oneTimeCodeInvalidFormat" : "Please enter the 4-digit code. The code only contains numbers."
    },
    "easiSwitch" : "Use your email instead",
    "liveSwitch" : "Get a new email address",
    "phoneSwitch" : "Use a phone number instead",
    "usernamePlaceholderEASI" : "someone@example.com",
    "usernamePlaceholderPhone" : "Phone number",
    "usernamePlaceholderLive" : "New email",
    "ariaLblUsernamePhone" : "Phone number",
    "ariaLblUsernameEmail" : "New email",
    "verificationSubTitle" : "We just sent a code to {0}.",
    "verificationCall" : "Call me instead",
    "verificationSms" : "Send a text again",
    "touHeader" : "Microsoft Services Agreement",
    "privacyHeader" : "Microsoft Privacy Statement",
    "pageTitle" : "Create account",
    "pageDescription" : "Microsoft account opens a world of benefits.",
    "lblEmail" : "Email",
    "ariaLblCountryDropdown" : "Country code",
    "lblPwd" : "Password",
    "ariaLblPassword" : "Create password",
    "suggPageTitle" : "Choose an address",
    "profileAccrualPageTitle" : "Add details",
    "lblFirstName" : "First name",
    "lblLastName" : "Last name",
    "lblCountryRegion" : "Country/region",
    "lblBirthdate" : "Birthdate",
    "autoVerifyPageTitle" : "We're verifying your phone number.",
    "autoVerifyPageDescription" : "This might take a minute or two.",
    "sendingOTT" : "Please wait",
    "lblVerificationCode" : "Enter code",
    "hipHeading" : "Add security info",
    "hipPageTitle" : "Create account",
    "hipPageDescription" : "When you need to prove you're you or a change is made to your account, we'll use your security info to contact you.",
    "hipPageDescription1" : "We'll text you the code you'll use to verify your phone number.",
    "hipVisualDescription" : "Before proceeding, we need to make sure a real person is creating this account.",
    "accountProduct" : "Microsoft account",
    "throttled" : "You have tried to sign up for a Microsoft account too many times in one day. Please try again later.",
    "backButton" : "Back",
    "nextButton" : "Next",
    "skypeDisclaimer" : "Skype cannot be used for emergency calling.",
    "touPrivacyText" : 'Choosing <strong>Next</strong> means that you agree to the <a href="#" id="privacy"class="privacy">Privacy Statement</a> and <a href="#" id="tou" class="tou">Microsoft Services Agreement</a>.',
    "resendCodeText" : 'Didn\'t receive it? Please wait for a few minutes and <a id="resendCodeLink" href="#">resend the code</a>.',
    "profileAccrualPageDescription" : "We need just a little more info to set up your account.",
    "impressumDesc" : "For details, please visit this site: https://www.microsoft.com/de-de/corporate/rechtliche-hinweise/impressum.aspx",
    "impressumText" : "Impressum"
  };
  $Config.sharedPageConfig = {
    "imgs" : {
      "skypeCallBlocked" : "Skype-call-blocked.svg",
      "progressIndicator" : "progressindicator.gif"
    },
    "logoTypeHtml" : "<img role='presentation' src='{0}Microsoft_Logotype_{1}.{2}' alt='Microsoft' />",
    "dataCollectionHtml" : "For details, please visit this site: https://go.microsoft.com/fwlink/?LinkId=624165",
    "dataUseHtml" : "For details, please visit this site: https://go.microsoft.com/fwlink/?LinkId=624166",
    "RetentionHtml" : "For details, please visit this site: https://go.microsoft.com/fwlink/?LinkId=624167"
  };
  registerNamespace("$Config.WLXAccount.signup");
  /** @type {string} */
  $Config.WLXAccount.signup.defaultCountry = "US";
  /** @type {string} */
  $Config.WLXAccount.signup.showParens = "True";
  /** @type {!Array} */
  $Config.WLXAccount.signup.countryList = [{
    "code" : "93",
    "name" : "Afghanistan",
    "iso" : "AF"
  }, {
    "name" : "\u00c5land Islands",
    "iso" : "AX"
  }, {
    "code" : "355",
    "name" : "Albania",
    "iso" : "AL"
  }, {
    "code" : "213",
    "name" : "Algeria",
    "iso" : "DZ"
  }, {
    "name" : "American Samoa",
    "iso" : "AS"
  }, {
    "code" : "376",
    "name" : "Andorra",
    "iso" : "AD"
  }, {
    "code" : "244",
    "name" : "Angola",
    "iso" : "AO"
  }, {
    "name" : "Anguilla",
    "iso" : "AI"
  }, {
    "code" : "672",
    "name" : "Antarctica",
    "iso" : "AQ"
  }, {
    "code" : "1",
    "name" : "Antigua and Barbuda",
    "iso" : "AG"
  }, {
    "code" : "54",
    "name" : "Argentina",
    "iso" : "AR"
  }, {
    "code" : "374",
    "name" : "Armenia",
    "iso" : "AM"
  }, {
    "code" : "297",
    "name" : "Aruba",
    "iso" : "AW"
  }, {
    "code" : "247",
    "name" : "Ascension Island",
    "iso" : "AC"
  }, {
    "code" : "61",
    "name" : "Australia",
    "iso" : "AU"
  }, {
    "code" : "43",
    "name" : "Austria",
    "iso" : "AT",
    "inEU" : true
  }, {
    "code" : "994",
    "name" : "Azerbaijan",
    "iso" : "AZ"
  }, {
    "code" : "1",
    "name" : "Bahamas",
    "iso" : "BS"
  }, {
    "code" : "973",
    "name" : "Bahrain",
    "iso" : "BH"
  }, {
    "code" : "880",
    "name" : "Bangladesh",
    "iso" : "BD"
  }, {
    "code" : "1",
    "name" : "Barbados",
    "iso" : "BB"
  }, {
    "code" : "375",
    "name" : "Belarus",
    "iso" : "BY"
  }, {
    "code" : "32",
    "name" : "Belgium",
    "iso" : "BE",
    "inEU" : true
  }, {
    "code" : "501",
    "name" : "Belize",
    "iso" : "BZ"
  }, {
    "code" : "229",
    "name" : "Benin",
    "iso" : "BJ"
  }, {
    "code" : "1",
    "name" : "Bermuda",
    "iso" : "BM"
  }, {
    "code" : "975",
    "name" : "Bhutan",
    "iso" : "BT"
  }, {
    "code" : "591",
    "name" : "Bolivia",
    "iso" : "BO"
  }, {
    "code" : "599",
    "name" : "Bonaire",
    "iso" : "BQ"
  }, {
    "code" : "387",
    "name" : "Bosnia and Herzegovina",
    "iso" : "BA"
  }, {
    "code" : "267",
    "name" : "Botswana",
    "iso" : "BW"
  }, {
    "code" : "47",
    "name" : "Bouvet Island",
    "iso" : "BV"
  }, {
    "code" : "55",
    "name" : "Brazil",
    "iso" : "BR"
  }, {
    "code" : "44",
    "name" : "British Indian Ocean Territory",
    "iso" : "IO"
  }, {
    "code" : "1",
    "name" : "British Virgin Islands",
    "iso" : "VG"
  }, {
    "code" : "673",
    "name" : "Brunei",
    "iso" : "BN"
  }, {
    "code" : "359",
    "name" : "Bulgaria",
    "iso" : "BG",
    "inEU" : true
  }, {
    "code" : "226",
    "name" : "Burkina Faso",
    "iso" : "BF"
  }, {
    "code" : "257",
    "name" : "Burundi",
    "iso" : "BI"
  }, {
    "code" : "238",
    "name" : "Cabo Verde",
    "iso" : "CV"
  }, {
    "code" : "855",
    "name" : "Cambodia",
    "iso" : "KH"
  }, {
    "code" : "237",
    "name" : "Cameroon",
    "iso" : "CM"
  }, {
    "code" : "1",
    "name" : "Canada",
    "iso" : "CA"
  }, {
    "code" : "1",
    "name" : "Cayman Islands",
    "iso" : "KY"
  }, {
    "code" : "236",
    "name" : "Central African Republic",
    "iso" : "CF"
  }, {
    "code" : "235",
    "name" : "Chad",
    "iso" : "TD"
  }, {
    "code" : "56",
    "name" : "Chile",
    "iso" : "CL"
  }, {
    "code" : "86",
    "name" : "China",
    "iso" : "CN"
  }, {
    "code" : "61",
    "name" : "Christmas Island",
    "iso" : "CX"
  }, {
    "code" : "61",
    "name" : "Cocos (Keeling) Islands",
    "iso" : "CC"
  }, {
    "code" : "57",
    "name" : "Colombia",
    "iso" : "CO"
  }, {
    "code" : "269",
    "name" : "Comoros",
    "iso" : "KM"
  }, {
    "code" : "242",
    "name" : "Congo",
    "iso" : "CG"
  }, {
    "code" : "243",
    "name" : "Congo (DRC)",
    "iso" : "CD"
  }, {
    "code" : "682",
    "name" : "Cook Islands",
    "iso" : "CK"
  }, {
    "code" : "506",
    "name" : "Costa Rica",
    "iso" : "CR"
  }, {
    "code" : "225",
    "name" : "C\u00f4te d'Ivoire",
    "iso" : "CI"
  }, {
    "code" : "385",
    "name" : "Croatia",
    "iso" : "HR"
  }, {
    "code" : "53",
    "name" : "Cuba",
    "iso" : "CU"
  }, {
    "code" : "599",
    "name" : "Cura\u00e7ao",
    "iso" : "CW"
  }, {
    "code" : "357",
    "name" : "Cyprus",
    "iso" : "CY",
    "inEU" : true
  }, {
    "code" : "420",
    "name" : "Czechia",
    "iso" : "CZ",
    "inEU" : true
  }, {
    "code" : "45",
    "name" : "Denmark",
    "iso" : "DK",
    "inEU" : true
  }, {
    "code" : "253",
    "name" : "Djibouti",
    "iso" : "DJ"
  }, {
    "code" : "1",
    "name" : "Dominica",
    "iso" : "DM"
  }, {
    "code" : "1",
    "name" : "Dominican Republic",
    "iso" : "DO"
  }, {
    "code" : "593",
    "name" : "Ecuador",
    "iso" : "EC"
  }, {
    "code" : "20",
    "name" : "Egypt",
    "iso" : "EG"
  }, {
    "code" : "503",
    "name" : "El Salvador",
    "iso" : "SV"
  }, {
    "code" : "240",
    "name" : "Equatorial Guinea",
    "iso" : "GQ"
  }, {
    "code" : "291",
    "name" : "Eritrea",
    "iso" : "ER"
  }, {
    "code" : "372",
    "name" : "Estonia",
    "iso" : "EE",
    "inEU" : true
  }, {
    "code" : "251",
    "name" : "Ethiopia",
    "iso" : "ET"
  }, {
    "code" : "500",
    "name" : "Falkland Islands",
    "iso" : "FK"
  }, {
    "code" : "298",
    "name" : "Faroe Islands",
    "iso" : "FO"
  }, {
    "code" : "679",
    "name" : "Fiji",
    "iso" : "FJ"
  }, {
    "code" : "358",
    "name" : "Finland",
    "iso" : "FI",
    "inEU" : true
  }, {
    "code" : "33",
    "name" : "France",
    "iso" : "FR",
    "inEU" : true
  }, {
    "code" : "594",
    "name" : "French Guiana",
    "iso" : "GF"
  }, {
    "code" : "689",
    "name" : "French Polynesia",
    "iso" : "PF"
  }, {
    "name" : "French Southern Territories",
    "iso" : "TF"
  }, {
    "code" : "241",
    "name" : "Gabon",
    "iso" : "GA"
  }, {
    "code" : "220",
    "name" : "Gambia",
    "iso" : "GM"
  }, {
    "code" : "995",
    "name" : "Georgia",
    "iso" : "GE"
  }, {
    "code" : "49",
    "name" : "Germany",
    "iso" : "DE",
    "inEU" : true
  }, {
    "code" : "233",
    "name" : "Ghana",
    "iso" : "GH"
  }, {
    "code" : "350",
    "name" : "Gibraltar",
    "iso" : "GI"
  }, {
    "code" : "30",
    "name" : "Greece",
    "iso" : "GR",
    "inEU" : true
  }, {
    "code" : "299",
    "name" : "Greenland",
    "iso" : "GL"
  }, {
    "code" : "1",
    "name" : "Grenada",
    "iso" : "GD"
  }, {
    "code" : "590",
    "name" : "Guadeloupe",
    "iso" : "GP"
  }, {
    "code" : "1",
    "name" : "Guam",
    "iso" : "GU"
  }, {
    "code" : "502",
    "name" : "Guatemala",
    "iso" : "GT"
  }, {
    "code" : "44",
    "name" : "Guernsey",
    "iso" : "GG"
  }, {
    "code" : "224",
    "name" : "Guinea",
    "iso" : "GN"
  }, {
    "code" : "245",
    "name" : "Guinea-Bissau",
    "iso" : "GW"
  }, {
    "code" : "592",
    "name" : "Guyana",
    "iso" : "GY"
  }, {
    "code" : "509",
    "name" : "Haiti",
    "iso" : "HT"
  }, {
    "name" : "Heard Island and McDonald Islands",
    "iso" : "HM"
  }, {
    "code" : "504",
    "name" : "Honduras",
    "iso" : "HN"
  }, {
    "code" : "852",
    "name" : "Hong Kong SAR",
    "iso" : "HK"
  }, {
    "code" : "36",
    "name" : "Hungary",
    "iso" : "HU",
    "inEU" : true
  }, {
    "code" : "354",
    "name" : "Iceland",
    "iso" : "IS"
  }, {
    "code" : "91",
    "name" : "India",
    "iso" : "IN"
  }, {
    "code" : "62",
    "name" : "Indonesia",
    "iso" : "ID"
  }, {
    "code" : "98",
    "name" : "Iran",
    "iso" : "IR"
  }, {
    "code" : "964",
    "name" : "Iraq",
    "iso" : "IQ"
  }, {
    "code" : "353",
    "name" : "Ireland",
    "iso" : "IE",
    "inEU" : true
  }, {
    "code" : "44",
    "name" : "Isle of Man",
    "iso" : "IM"
  }, {
    "code" : "972",
    "name" : "Israel",
    "iso" : "IL"
  }, {
    "code" : "39",
    "name" : "Italy",
    "iso" : "IT",
    "inEU" : true
  }, {
    "code" : "1",
    "name" : "Jamaica",
    "iso" : "JM"
  }, {
    "code" : "47",
    "name" : "Jan Mayen",
    "iso" : "XJ"
  }, {
    "code" : "81",
    "name" : "Japan",
    "iso" : "JP"
  }, {
    "code" : "44",
    "name" : "Jersey",
    "iso" : "JE"
  }, {
    "code" : "962",
    "name" : "Jordan",
    "iso" : "JO"
  }, {
    "code" : "7",
    "name" : "Kazakhstan",
    "iso" : "KZ"
  }, {
    "code" : "254",
    "name" : "Kenya",
    "iso" : "KE"
  }, {
    "code" : "686",
    "name" : "Kiribati",
    "iso" : "KI"
  }, {
    "code" : "82",
    "name" : "Korea",
    "iso" : "KR"
  }, {
    "code" : "383",
    "name" : "Kosovo",
    "iso" : "XK"
  }, {
    "code" : "965",
    "name" : "Kuwait",
    "iso" : "KW"
  }, {
    "code" : "996",
    "name" : "Kyrgyzstan",
    "iso" : "KG"
  }, {
    "code" : "856",
    "name" : "Laos",
    "iso" : "LA"
  }, {
    "code" : "371",
    "name" : "Latvia",
    "iso" : "LV",
    "inEU" : true
  }, {
    "code" : "961",
    "name" : "Lebanon",
    "iso" : "LB"
  }, {
    "code" : "266",
    "name" : "Lesotho",
    "iso" : "LS"
  }, {
    "code" : "231",
    "name" : "Liberia",
    "iso" : "LR"
  }, {
    "code" : "218",
    "name" : "Libya",
    "iso" : "LY"
  }, {
    "code" : "423",
    "name" : "Liechtenstein",
    "iso" : "LI"
  }, {
    "code" : "370",
    "name" : "Lithuania",
    "iso" : "LT",
    "inEU" : true
  }, {
    "code" : "352",
    "name" : "Luxembourg",
    "iso" : "LU",
    "inEU" : true
  }, {
    "code" : "853",
    "name" : "Macao SAR",
    "iso" : "MO"
  }, {
    "code" : "261",
    "name" : "Madagascar",
    "iso" : "MG"
  }, {
    "code" : "265",
    "name" : "Malawi",
    "iso" : "MW"
  }, {
    "code" : "60",
    "name" : "Malaysia",
    "iso" : "MY"
  }, {
    "code" : "960",
    "name" : "Maldives",
    "iso" : "MV"
  }, {
    "code" : "223",
    "name" : "Mali",
    "iso" : "ML"
  }, {
    "code" : "356",
    "name" : "Malta",
    "iso" : "MT",
    "inEU" : true
  }, {
    "code" : "692",
    "name" : "Marshall Islands",
    "iso" : "MH"
  }, {
    "code" : "596",
    "name" : "Martinique",
    "iso" : "MQ"
  }, {
    "code" : "222",
    "name" : "Mauritania",
    "iso" : "MR"
  }, {
    "code" : "230",
    "name" : "Mauritius",
    "iso" : "MU"
  }, {
    "code" : "262",
    "name" : "Mayotte",
    "iso" : "YT"
  }, {
    "code" : "52",
    "name" : "Mexico",
    "iso" : "MX"
  }, {
    "code" : "691",
    "name" : "Micronesia",
    "iso" : "FM"
  }, {
    "code" : "373",
    "name" : "Moldova",
    "iso" : "MD"
  }, {
    "code" : "377",
    "name" : "Monaco",
    "iso" : "MC"
  }, {
    "code" : "976",
    "name" : "Mongolia",
    "iso" : "MN"
  }, {
    "code" : "382",
    "name" : "Montenegro",
    "iso" : "ME"
  }, {
    "code" : "1",
    "name" : "Montserrat",
    "iso" : "MS"
  }, {
    "code" : "212",
    "name" : "Morocco",
    "iso" : "MA"
  }, {
    "code" : "258",
    "name" : "Mozambique",
    "iso" : "MZ"
  }, {
    "code" : "95",
    "name" : "Myanmar",
    "iso" : "MM"
  }, {
    "code" : "264",
    "name" : "Namibia",
    "iso" : "NA"
  }, {
    "code" : "674",
    "name" : "Nauru",
    "iso" : "NR"
  }, {
    "code" : "977",
    "name" : "Nepal",
    "iso" : "NP"
  }, {
    "code" : "31",
    "name" : "Netherlands",
    "iso" : "NL",
    "inEU" : true
  }, {
    "code" : "599",
    "name" : "Netherlands Antilles (Former)",
    "iso" : "AN"
  }, {
    "code" : "687",
    "name" : "New Caledonia",
    "iso" : "NC"
  }, {
    "code" : "64",
    "name" : "New Zealand",
    "iso" : "NZ"
  }, {
    "code" : "505",
    "name" : "Nicaragua",
    "iso" : "NI"
  }, {
    "code" : "227",
    "name" : "Niger",
    "iso" : "NE"
  }, {
    "code" : "234",
    "name" : "Nigeria",
    "iso" : "NG"
  }, {
    "code" : "683",
    "name" : "Niue",
    "iso" : "NU"
  }, {
    "name" : "Norfolk Island",
    "iso" : "NF"
  }, {
    "code" : "389",
    "name" : "North Macedonia",
    "iso" : "MK"
  }, {
    "code" : "1",
    "name" : "Northern Mariana Islands",
    "iso" : "MP"
  }, {
    "code" : "47",
    "name" : "Norway",
    "iso" : "NO"
  }, {
    "code" : "968",
    "name" : "Oman",
    "iso" : "OM"
  }, {
    "code" : "92",
    "name" : "Pakistan",
    "iso" : "PK"
  }, {
    "code" : "680",
    "name" : "Palau",
    "iso" : "PW"
  }, {
    "code" : "970",
    "name" : "Palestinian Authority",
    "iso" : "PS"
  }, {
    "code" : "507",
    "name" : "Panama",
    "iso" : "PA"
  }, {
    "code" : "675",
    "name" : "Papua New Guinea",
    "iso" : "PG"
  }, {
    "code" : "595",
    "name" : "Paraguay",
    "iso" : "PY"
  }, {
    "code" : "51",
    "name" : "Peru",
    "iso" : "PE"
  }, {
    "code" : "63",
    "name" : "Philippines",
    "iso" : "PH"
  }, {
    "name" : "Pitcairn Islands",
    "iso" : "PN"
  }, {
    "code" : "48",
    "name" : "Poland",
    "iso" : "PL",
    "inEU" : true
  }, {
    "code" : "351",
    "name" : "Portugal",
    "iso" : "PT",
    "inEU" : true
  }, {
    "name" : "Puerto Rico",
    "iso" : "PR"
  }, {
    "code" : "974",
    "name" : "Qatar",
    "iso" : "QA"
  }, {
    "code" : "262",
    "name" : "R\u00e9union",
    "iso" : "RE"
  }, {
    "code" : "40",
    "name" : "Romania",
    "iso" : "RO",
    "inEU" : true
  }, {
    "code" : "7",
    "name" : "Russia",
    "iso" : "RU"
  }, {
    "code" : "250",
    "name" : "Rwanda",
    "iso" : "RW"
  }, {
    "code" : "599",
    "name" : "Saba",
    "iso" : "XS"
  }, {
    "name" : "Saint Barth\u00e9lemy",
    "iso" : "BL"
  }, {
    "code" : "1",
    "name" : "Saint Kitts and Nevis",
    "iso" : "KN"
  }, {
    "code" : "1",
    "name" : "Saint Lucia",
    "iso" : "LC"
  }, {
    "name" : "Saint Martin",
    "iso" : "MF"
  }, {
    "code" : "508",
    "name" : "Saint Pierre and Miquelon",
    "iso" : "PM"
  }, {
    "code" : "1",
    "name" : "Saint Vincent and the Grenadines",
    "iso" : "VC"
  }, {
    "code" : "685",
    "name" : "Samoa",
    "iso" : "WS"
  }, {
    "code" : "378",
    "name" : "San Marino",
    "iso" : "SM"
  }, {
    "code" : "239",
    "name" : "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    "iso" : "ST"
  }, {
    "code" : "966",
    "name" : "Saudi Arabia",
    "iso" : "SA"
  }, {
    "code" : "221",
    "name" : "Senegal",
    "iso" : "SN"
  }, {
    "code" : "381",
    "name" : "Serbia",
    "iso" : "RS"
  }, {
    "code" : "248",
    "name" : "Seychelles",
    "iso" : "SC"
  }, {
    "code" : "232",
    "name" : "Sierra Leone",
    "iso" : "SL"
  }, {
    "code" : "65",
    "name" : "Singapore",
    "iso" : "SG"
  }, {
    "code" : "599",
    "name" : "Sint Eustatius",
    "iso" : "XE"
  }, {
    "name" : "Sint Maarten",
    "iso" : "SX"
  }, {
    "code" : "421",
    "name" : "Slovakia",
    "iso" : "SK",
    "inEU" : true
  }, {
    "code" : "386",
    "name" : "Slovenia",
    "iso" : "SI",
    "inEU" : true
  }, {
    "code" : "677",
    "name" : "Solomon Islands",
    "iso" : "SB"
  }, {
    "code" : "252",
    "name" : "Somalia",
    "iso" : "SO"
  }, {
    "code" : "27",
    "name" : "South Africa",
    "iso" : "ZA"
  }, {
    "name" : "South Georgia and the South Sandwich Islands",
    "iso" : "GS"
  }, {
    "code" : "211",
    "name" : "South Sudan",
    "iso" : "SS"
  }, {
    "code" : "34",
    "name" : "Spain",
    "iso" : "ES",
    "inEU" : true
  }, {
    "code" : "94",
    "name" : "Sri Lanka",
    "iso" : "LK"
  }, {
    "code" : "290",
    "name" : "St Helena, Ascension, and Tristan da Cunha",
    "iso" : "SH"
  }, {
    "code" : "249",
    "name" : "Sudan",
    "iso" : "SD"
  }, {
    "code" : "597",
    "name" : "Suriname",
    "iso" : "SR"
  }, {
    "code" : "47",
    "name" : "Svalbard",
    "iso" : "SJ"
  }, {
    "code" : "268",
    "name" : "Swaziland",
    "iso" : "SZ"
  }, {
    "code" : "46",
    "name" : "Sweden",
    "iso" : "SE",
    "inEU" : true
  }, {
    "code" : "41",
    "name" : "Switzerland",
    "iso" : "CH"
  }, {
    "code" : "963",
    "name" : "Syria",
    "iso" : "SY"
  }, {
    "code" : "886",
    "name" : "Taiwan",
    "iso" : "TW"
  }, {
    "code" : "992",
    "name" : "Tajikistan",
    "iso" : "TJ"
  }, {
    "code" : "255",
    "name" : "Tanzania",
    "iso" : "TZ"
  }, {
    "code" : "66",
    "name" : "Thailand",
    "iso" : "TH"
  }, {
    "code" : "670",
    "name" : "Timor-Leste",
    "iso" : "TL"
  }, {
    "code" : "228",
    "name" : "Togo",
    "iso" : "TG"
  }, {
    "code" : "690",
    "name" : "Tokelau",
    "iso" : "TK"
  }, {
    "code" : "676",
    "name" : "Tonga",
    "iso" : "TO"
  }, {
    "code" : "1",
    "name" : "Trinidad and Tobago",
    "iso" : "TT"
  }, {
    "code" : "290",
    "name" : "Tristan da Cunha",
    "iso" : "TA"
  }, {
    "code" : "216",
    "name" : "Tunisia",
    "iso" : "TN"
  }, {
    "code" : "90",
    "name" : "Turkey",
    "iso" : "TR"
  }, {
    "code" : "993",
    "name" : "Turkmenistan",
    "iso" : "TM"
  }, {
    "code" : "1",
    "name" : "Turks and Caicos Islands",
    "iso" : "TC"
  }, {
    "code" : "688",
    "name" : "Tuvalu",
    "iso" : "TV"
  }, {
    "code" : "1",
    "name" : "U.S. Outlying Islands",
    "iso" : "UM"
  }, {
    "code" : "1",
    "name" : "U.S. Virgin Islands",
    "iso" : "VI"
  }, {
    "code" : "256",
    "name" : "Uganda",
    "iso" : "UG"
  }, {
    "code" : "380",
    "name" : "Ukraine",
    "iso" : "UA"
  }, {
    "code" : "971",
    "name" : "United Arab Emirates",
    "iso" : "AE"
  }, {
    "code" : "44",
    "name" : "United Kingdom",
    "iso" : "UK",
    "inEU" : true
  }, {
    "code" : "1",
    "name" : "United States",
    "iso" : "US"
  }, {
    "code" : "598",
    "name" : "Uruguay",
    "iso" : "UY"
  }, {
    "code" : "998",
    "name" : "Uzbekistan",
    "iso" : "UZ"
  }, {
    "code" : "678",
    "name" : "Vanuatu",
    "iso" : "VU"
  }, {
    "code" : "379",
    "name" : "Vatican City",
    "iso" : "VA"
  }, {
    "code" : "58",
    "name" : "Venezuela",
    "iso" : "VE"
  }, {
    "code" : "84",
    "name" : "Vietnam",
    "iso" : "VN"
  }, {
    "code" : "681",
    "name" : "Wallis and Futuna",
    "iso" : "WF"
  }, {
    "code" : "967",
    "name" : "Yemen",
    "iso" : "YE"
  }, {
    "code" : "260",
    "name" : "Zambia",
    "iso" : "ZM"
  }, {
    "code" : "263",
    "name" : "Zimbabwe",
    "iso" : "ZW"
  }];
  registerNamespace("$Config.WLXAccount.signup");
  /** @type {string} */
  $Config.WLXAccount.signup.dateOrder = "MDY";
  $Config.WLXAccount.signup.countryDetailMap = {
    "AS" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "AT" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "BE" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "BG" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "HR" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "CY" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "CZ" : {
      "childAge" : 15,
      "parentAge" : 0,
      "regulation" : ""
    },
    "DK" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "EE" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "FI" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "FR" : {
      "childAge" : 15,
      "parentAge" : 0,
      "regulation" : ""
    },
    "DE" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "GR" : {
      "childAge" : 15,
      "parentAge" : 0,
      "regulation" : ""
    },
    "GU" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "HU" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "IE" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "IT" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "KR" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "LV" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "LT" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "LU" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "MT" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "NL" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "MP" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "PL" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "PT" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "PR" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "RO" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "SK" : {
      "childAge" : 16,
      "parentAge" : 0,
      "regulation" : ""
    },
    "SI" : {
      "childAge" : 15,
      "parentAge" : 0,
      "regulation" : ""
    },
    "ES" : {
      "childAge" : 14,
      "parentAge" : 0,
      "regulation" : ""
    },
    "SE" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "UM" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "VI" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "UK" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    },
    "US" : {
      "childAge" : 13,
      "parentAge" : 0,
      "regulation" : ""
    }
  };
  registerNamespace("$Config.WLXAccount.signup.page");
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartString0 = "BirthMonth";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartString1 = "BirthDay";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartString2 = "BirthYear";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartLabel0 = "Birth month";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartLabel1 = "Birth day";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartLabel2 = "Birth year";
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartDropDown0 = '<option selected="selected" value="">Month</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option>';
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartDropDown1 = '<option selected="selected" value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>';
  /** @type {string} */
  $Config.WLXAccount.signup.page.datePartDropDown2 = '<option selected="selected" value="">Year</option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option>';
}();

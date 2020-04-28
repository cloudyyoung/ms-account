
# Sign Up

There is a `Required fields` section for each part. To make a successful request, fields have to be provided properly. Fields not listed within are optional/not occuring errors.

## Step 0. Initialize

### Request 1: Page
`GET` [https://signup.live.com](https://signup.live.com)

### Response 1
`302`
```
set-cookie: amsc=XAXV4GCwzzGyJvTyqfWpdS8/Vd3LD7q/PLZIMp0gFxL7LvbCd37mA80X9TyN8HqBHYFJZxhyRjITwzURLEgNhRnjfZyfwuWJYh8oLLGijbFp74lr3+G3+VVkR7lw69PglBJL5D7uHVD9PbPHLseYjD1Dkdeo4Jw/fjtTLJ0aS/fCV4UJ5bHBCQLVT91OvvoD9xT8FECKaWR/qxk91EJB7ELv5E7nIplj7b6/ZyxE/wN8lO85sQTF5LKPz0jrU0HS:2:3c; domain=.live.com; path=/; secure; HttpOnly; SameSite=None
```

### Request 2: SRF
`GET` [https://login.live.com/login.srf](https://login.live.com/login.srf)

### Response 2
`302`
```
set-cookie: uaid=1bfceb8feaba489d910d560ee7d5efa7; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
set-cookie: MSPRequ=id=68692&lt=1588049277&co=1; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
```

## Step 1. Username Availability

![JhxmsU.png](https://s1.ax1x.com/2020/04/28/JhxmsU.png)

### Request

`POST` [https://signup.live.com/API/CheckAvailableSigninNames](https://signup.live.com/API/CheckAvailableSigninNames)

```
canary: vWZvbb3OK86BIkFlOR7jnW5mfuKVen3mJ6FcCLCFWEXyhGMJFJr52uOF1MLSOwD3Y1q/z5+6xVFGBWVTse5Ii3lexj1fKRUeMFPxTiIdGMxfOaWSJm9QxZ76CRVqV6Lp9Am2N9J6WGv/wVoUFPEoZn8rK9upRNi/QgoizLA42hN7w8aKf1x6YvVY0wBpmdEdFEo3Yw2uxHKL7V0dIB4tkRxVRyCC7qMNt/jGSvPVU6IXGQedeTG5DKrGo4iJRPVi:2:3c
cookie: amsc=bfTyYLP5D3y2zz6CknjKCqbFDdb6w6M/Yy7HtPQiT+5SGQ5MCePML0BEHdxkz1euR5RaMsDlVCv+UCt1tU1T3UVLpvLRe6mzlPAthdFHXb2arstQ0UzVXQz39Ve0D3jcLx79Ww8gppsI+Kps7majqE3iUVz0BoWaX8QHPMtK2S0FxXo0NYKatXslS5RgzpYCGSZXcIsGl2l2d9CWkp4X7awvlA+XuCUwqXpQ9/r9WcFG6IIw3aH+/PWvGJYazmsMIdkJex03/zdYI3N8O0+KUWgOwH2k4y4RoLzq8DLLi6ewcJCQMGpac8GLpRz/Arpr:2:3c;
```
```
{
  "signInName": "kid.irfan@outlook.com",
  "uaid": "9b68be6acc1341f39c881b327b2ba228",
  "includeSuggestions": true,
  "uiflvr": 1001,
  "scid": 100118,
  "hpgid": "Signup_MemberNamePage_Client"
}
```

#### Required fields
- `canary` in header
- `amsc` in `cookie` in header
- `signInName` in content

### Response

`200` Successful: Username available
```
{
  "apiCanary": "TdMFHHdnvxZ5H5+Tf2PQFkTARv9SXapV2fxvzCAHUiUS4peb2QQOgGgUUOY/+KIBv+/pjPOUWdac5DxmSJQjlvb2C1Z4ziFniHN9fFL2YGBBqH1j/PoQmDSVYmwbqHd5Z1RoYIJVlIzeEAWsqwF0NU+6/+wsRB0Tk/sgmnHkQ2WGeauQICmJLgy5ySAYN3gDLc6czLalrj7y/MeGZAYsZo3fVdO8MXzDDQ8wr5lNYTh6dto5bQ04S4BYs0TsC2NU:2:3c",
  "telemetryContext": "5NPwR1QXEiFUguQDEyimrrmBgEYhYbvjAVwdlhYb/i/u+XikSLvSQpfUDL4CzK2CQjTwiDZFzvzsB2xiu/AGk4FH2WYcHVUMpAGnQS5Ny45wiZ7vNXaNDrP91pTfMU68om8ukIu0nQ+PUUNrMjyAuzp1bi1c+kSGJQAJ1R7LhmP8xzt+xnmeTY87XSMA39Ax:2:3",
  "isAvailable": true,
  "nopaAllowed": false,
  "type": "Live"
}
```

`200` Fail: Username existing
```
{
  "apiCanary": "TJdA5VHuWJbowGlE/wGUqWFAU6J5pajQCpFJQuCLEtpw+2HCeVjWERBVnOl+XFdEL+zV897wIzy1FFhFobdcKkv2BrvplJ7Btw6biyju9it7OHNtDfRy821PoMarWnrlQK0zyg1bjLNR9U9wFBfE95DXII5B1Fsw9uRyLJbEvyvxjcIzrukFEAL7if0zW2kiJ+oXG+IAOEXwR96NekeA5ZALRuqAo4P8dIuRL9tyqrioMG5eu3JDJ4NhivWQ700Y:2:3c",
  "telemetryContext": "hjjXzFZIGH6/lvF20lf6XrHsW0hYhygjadatNptwKx2Zhmo1t5mjpQU9V/EHqBf7pNk4zdCnKdKDxoGAio9KQWhviEPuUPs4yLVIYV38imzdqV0TBcYLn1/h72qTdHCaFsxiyKu+r0qDJ3hCr/7nRf2qxXSW2I/BQ0kmxrlHZKWjh6JMOQCsfHQpu3RtAVed:2:3",
  "isAvailable": false,
  "nopaAllowed": false,
  "suggestions": [
    "cloudyyoung1@outlook.com",
    "cloudyyoung2020@outlook.com",
    "cloudyyoung1949@outlook.com"
  ],
  "type": "Live"
}
```






## Step 2. Set Password
![Jhx3J1.png](https://s1.ax1x.com/2020/04/28/Jhx3J1.png)
No web request is made.

## Step 3. First & Last Name
![Jhx1iR.png](https://s1.ax1x.com/2020/04/28/Jhx1iR.png)
No web request is made.

## Step 4. Country & Birth Date
![JhxnLF.png](https://s1.ax1x.com/2020/04/28/JhxnLF.png)
No web request is made.







## Step 5. Create Account

### Request

`POST` [https://signup.live.com/API/CreateAccount](https://signup.live.com/API/CreateAccount)

```
{
  "MemberName": "kid.irfan@outlook.com",
  "CheckAvailStateMap": [
    "kid.irfan@outlook.com:undefined"
  ],
  "EvictionWarningShown": [],
  "UpgradeFlowToken": {},
  "FirstName": "Shawn",
  "LastName": "Mendersh",
  "MemberNameChangeCount": 1,
  "MemberNameAvailableCount": 1,
  "MemberNameUnavailableCount": 0,
  "CipherValue": "/J80OLF7qh4dngswv75Ox6B78q/0v0nqXwkQjob3 9bnGBhE35IiCqAuGkpzkXX8FpBEl7nptFtidq1meZ71ySOsV6rBPBR8LbhjllaA/TugM9fjCAx2vFNWF5UuMTKr1Vjwi/MW DGUwotl2Tjd8Vic N3ZL D52IaakqBpKe9FhIdNknRks75UO3Vr2PBhW02TPsnrQu1wQgQhf7hBD26hRVONxksJ2prsyEKQR/i/GB6pTps nT0/oeCplStLYWoxsjrN8m3DjGk/wT/WwCz4a0TZlJTX1g8qgBzf90DYV7Bd/0 ow kdkQgNzSA09TUNncpZ2aaP0Lm8Xw3NMQ: =",
  "SKI": "4B8F32B06B3633468A617C4D5781E6B301099447",
  "BirthDate": "12:09:2007",
  "Country": "CA",
  "IsOptOutEmailDefault": false,
  "IsOptOutEmailShown": true,
  "IsOptOutEmail": false,
  "LW": true,
  "SiteId": "68692",
  "IsRDM": 0,
  "WReply": null,
  "ReturnUrl": null,
  "SignupReturnUrl": null,
  "uiflvr": 1001,
  "uaid": "9b68be6acc1341f39c881b327b2ba228",
  "SuggestedAccountType": "EASI",
  "SuggestionType": "Prefer",
  "HFId": "c6ffdcb91e764c5c997e1b3a2b94216f",
  "scid": 100118,
  "hpgid": "Signup_BirthdatePage_Client"
}
```

#### Required fields
- Request body

### Response 

![Jhx8Rx.png](https://s1.ax1x.com/2020/04/28/Jhx8Rx.png)

`200` Fail: Simple Password
```
{
  "error": {
    "code": "1217",
    "data": "",
    "field": "password",
    "stackTrace": "",
    "telemetryContext": "a/9D6eWijs/McVi4BIGGLXYDaPKXeDEANcpE7vLStonUw8cJG3lQnhUfoGZdJwVHeYmr1rqum0QZxD8OlxQCsivsVBga3+UhxAdIBskUzRWrn2c9c+D7ifFg0sEiIk+YUkXnOZ/7oT/Md5FiGoxn3a6UEhtZDpVDQvry82thE+1KuwCAil5skS138v/PtR+AjXMam3+Q66L5uPaJxdS+r9Dtn2z/JnVq65nUEY7jVAUbObYeb7VbLbJgFn+HIO8/ylqEP7ZPcLinsuhbEd2MvfE8G1og8kSf0AkmwiUw1IEFjQfj93VkNFRHJxmrYV5XLb8FZkMZXL9wpgAsGq2KVK57Pz6yiIp0qH8yUDYICQRjPcCtSjAL5SqT5ZPyH4ja/KaQ9ikvAd0ytsaVl7vXK6eL1UnrEgkE2vO+FBpVTcE/YeTOiJloCzceVxbGZJz5hdrzj1b8STNwBom+CsWWcqsKaBubh8gCbz29WgRG59NcRYL6NNlNWlrmudsh1DpWwmx/cOvL0I2uH8RHxajxII/wwT97I7AP5TSJFW1l9yM=:2:3"
  }
}
```

`200` Fail: Need Captcha
```
{
  "error": {
    "code": "1040",
    "data": "",
    "field": "hip",
    "stackTrace": "",
    "telemetryContext": "FL1mtRcEgJgheBZmyOAJwedFztF0OQkyoQlIi91HhDWmsn0q3YQmKgn+CzfSizOwjBlMeIwuFrRDvblcuLfvo2CC+JRcq78bV4P2CXceJR4U/sAPKJG/xtVXIfqrxDX8GKVazkX2u0Gwz3UGC10+fMg/S3QZE0pygcG4O9HysZqTbpDXcyYkgvD7X0EKiEwPmlPfKhAJws2OBDIY774rLLjlRg8IATAkqhlIQ6i1GIv9S+ULnkuSVN1D9sUNKlQcMlXFf9i0YiJdb7tTx0H/uj9lLejmrWEDgSPsy1mNYDXg6l31g/UjLuBb6epWDrHsg9Qxhk/NAlxYKrWSXlrkBZyIDoj9pi09qqAfcH9WNl8AXvXFaAeyct0ItfvCiDITaBC6pStV3gYRb4vVK1E5ab4ujCZtqAxfoAvOxdQvEbFHrPYXkkdNHxkg4rX8+s6RAZxx7RZys2viJOj8oBq1AM+jnov8vAMce2M5c05W4Sm2XXC38dhXbNt9/Ffmp9A2shpYEe3JGcse/U00FpB5hb9iul5/jNQSFilumyqV0BEuj1DiORocoJr9aB9Ql509:2:3"
  }
}
```


### Note 
1. Sign up data is encrypted using RAS
2. The RSA encryption key is in the html, var Key
3. The random number too, var randomNum
4. Encryption algorithm file [lightweightsignuppackage.js]( lightweightsignuppackage.js)
5. Encrypted field is called `CipherValue` in content








## Step 6. Hip(Captcha)

![JhxtsO.png](https://s1.ax1x.com/2020/04/28/JhxtsO.png)

### Request 1: Fetch captcha url


`GET` [https://scu.client.hip.live.com/GetHIP/GetHIPAMFE/HIPAMFE?dc=SCU&mkt=en-US&id=15041&fid=c6ffdcb91e764c5c997e1b3a2b94216f&type=visual&c=3&rnd=0.38727699140529603](https://scu.client.hip.live.com/GetHIP/GetHIPAMFE/HIPAMFE?dc=SCU&mkt=en-US&id=15041&fid=c6ffdcb91e764c5c997e1b3a2b94216f&type=visual&c=3&rnd=0.38727699140529603)


#### Required fields
- `fid`: FlowId
- `id`: ScenarioId
- `type`: Hip challenge type, could be `visual` or `audio`

### Response 1
`200` Returns [HIPAMFE.js](HIPAMFE.js). Find `hipChallengeUrl` in it.



### Request 2: Fetch captcha image

`GET` [https://scu.client.hip.live.com/GetHIPData?hid=SCU.b2750a93a7054e1ba9d79d00df56a6bf&fid=c6ffdcb91e764c5c997e1b3a2b94216f&id=15041&type=visual&cs=HIPAMFE](https://scu.client.hip.live.com/GetHIPData?hid=SCU.b2750a93a7054e1ba9d79d00df56a6bf&fid=c6ffdcb91e764c5c997e1b3a2b94216f&id=15041&type=visual&cs=HIPAMFE)

#### Required fields
- `hid`
- `fid`
- `type`

### Response 2
`200` Returns captcha image   
![Jhv02V.png](https://s1.ax1x.com/2020/04/28/Jhv02V.png)

`400` Bad Request

### Note
1. Captcha url is from the returned content in Request 1.





## Step 7. Create Account

### Request
`POST` [https://signup.live.com/API/CreateAccount?lic=1&uaid=9b68be6acc1341f39c881b327b2ba228](https://signup.live.com/API/CreateAccount?lic=1&uaid=9b68be6acc1341f39c881b327b2ba228)

``` 
{
  "MemberName": "kid.irfan@outlook.com",
  "CheckAvailStateMap": [
    "kid.irfan@outlook.com:undefined"
  ],
  "EvictionWarningShown": [],
  "UpgradeFlowToken": {},
  "FirstName": "Shawn",
  "LastName": "Mendersh",
  "MemberNameChangeCount": 1,
  "MemberNameAvailableCount": 1,
  "MemberNameUnavailableCount": 0,
  "CipherValue": "gfISD7Tn60Xwms2ahhskvzknR+0xZJg+qDvdDgIYIAlH2iQ0ZvonJr8eahjx8+0gs3t6IvOlD9cpQ3mZo5w1mhmPaQWtWueaZh8h9QY7S2OPEWCaVtN+UKhnqedu97dTgkATz0izXDC9imR14uxDRIWaTJQuUTX39nmBN/fe5p7h/9OfogSxueQuLUp8YMYZPDhTdqzY1LVYG2Dya27xLRcGUvnMiOZhITGHpRyEIPgAua9KefhV9vUtk2Ul7itS5sKbagIed9vE8h1g/VMgvk8nLji6Ti4X8xoMh+5VNuR0eNconaevloWs/ivuV1P05A6yahdb+t7To4IWPvUsmQ==",
  "SKI": "4B8F32B06B3633468A617C4D5781E6B301099447",
  "BirthDate": "12:12:2004",
  "Country": "US",
  "IsOptOutEmailDefault": false,
  "IsOptOutEmailShown": true,
  "IsOptOutEmail": true,
  "LW": true,
  "SiteId": "68692",
  "IsRDM": 0,
  "WReply": null,
  "ReturnUrl": null,
  "SignupReturnUrl": null,
  "uiflvr": 1001,
  "uaid": "9b68be6acc1341f39c881b327b2ba228",
  "SuggestedAccountType": "EASI",
  "SuggestionType": "Prefer",
  "HFId": "c6ffdcb91e764c5c997e1b3a2b94216f",
  "HType": "visual",
  "HSId": "15041",
  "HId": "SCU.b2750a93a7054e1ba9d79d00df56a6bf",
  "HSol": "WKSXGJS",
  "scid": 100118,
  "hpgid": "Signup_HipPage_Client"
}
```

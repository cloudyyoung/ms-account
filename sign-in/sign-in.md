
# Sign In

## Step 0. Initialize

### Request

`GET` [https://login.live.com](https://login.live.com)

### Response

`200` OK
```
set-cookie: uaid=fdc668bea6c04e49b70c18cff1f759dc; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
set-cookie: MSPRequ=id=N&lt=1588128406&co=1; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
set-cookie: MSCC=98.142.213.3-US; expires=Mon, 24-May-2021 02:46:46 GMT; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
set-cookie: OParams=11DebjzB!eEgnbx1izu6PC3U2K!zLExyt8YGXTAdeK4OhP6MC1OMEjkrTyV4FFm6*J5YuIfaAxSKBdiQ4mda!faSH5ElZCD1IuLMEV5Uu7vZRoO*JnE4GhZzRDWo74eC1uUyUZws5p0S7urBjCtNiZ0Ae!UwpkexbLbJtR4ztf!aJY!0FS*Ib6haILGxx6oJVhwMKkc*4SbZzpy6Vn89XFixk$; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
set-cookie: MSPOK=$uuid-1c8af815-c2ca-4f4b-96c2-3ea5594885a4; domain=login.live.com; Secure; path=/; SameSite=None; HttpOnly
```


## Step 1. Get Credential Type

### Request
`200` [https://login.live.com/GetCredentialType.srf?opid=F6DA213370058B98&vv=1600&mkt=EN-US&lc=1033&uaid=fdc668bea6c04e49b70c18cff1f759dc](https://login.live.com/GetCredentialType.srf?opid=F6DA213370058B98&vv=1600&mkt=EN-US&lc=1033&uaid=fdc668bea6c04e49b70c18cff1f759dc)

```
{
  "username": "kid.irfan222@outlook.com",
  "uaid": "fdc668bea6c04e49b70c18cff1f759dc",
  "isOtherIdpSupported": false,
  "checkPhones": false,
  "isRemoteNGCSupported": true,
  "isCookieBannerShown": false,
  "isFidoSupported": true,
  "forceotclogin": false,
  "otclogindisallowed": false,
  "isExternalFederationDisallowed": false,
  "isRemoteConnectSupported": false,
  "federationFlags": 3,
  "isSignup": false,
  "flowToken": "Ddime1oY4lYdHIqNnhkD2!sRjaKwq8*M8epN4d2GsDjX3X2jjztp0SvGKw4WeerDKeuUb6JMss7gHxIWc4B6PzRztIC0KFyiYQDpLib1B!*1W0pEUEnypPsM!1D6UwwURo1JqYMbz7!ew6uv4FFlgHfyL9nzmdnsHViDU3ZpEPbMroxOapEGAeCkmRdioAdk0j*GBwXnBWN7EQHScNsfT*5wI7EWQnFO*Jb5u9aZEhxKcKVubKLqMT0ASYUivJ*ssg$$"
}
```

### Response

`200` Successful
```
{
  "Username": "shawn.mendersh@outlook.com",
  "Display": "shawn.mendersh@outlook.com",
  "Location": "",
  "IfExistsResult": 0,
  "Credentials": {
    "PrefCredential": 1,
    "HasPassword": 1,
    "HasRemoteNGC": 0,
    "HasFido": 0,
    "HasPhone": 0,
    "HasGitHubFed": 0,
    "HasGoogleFed": 0,
    "HasLinkedInFed": 0
  }
}
```

`200` Fail: Username Not Existing
```
{
  "Username": "kid.irfan222@outlook.com",
  "Display": "kid.irfan222@outlook.com",
  "Location": "",
  "IfExistsResult": 1
}
```

## Step 2. Authentication

### Request

`POST` [https://login.live.com/ppsecure/post.srf?contextid=229A79FAF92886AA&bk=1588129781&uaid=32242727b82d4389b5d193a4b523e343&pid=0](https://login.live.com/ppsecure/post.srf?contextid=229A79FAF92886AA&bk=1588129781&uaid=32242727b82d4389b5d193a4b523e343&pid=0)

```
i13=0&login=shawn.mendersh%40outlook.com&loginfmt=shawn.mendersh%40outlook.com&type=11&LoginOptions=3&lrt=&lrtPartition=&hisRegion=&hisScaleUnit=&passwd=yyf002&ps=2&psRNGCDefaultType=&psRNGCEntropy=&psRNGCSLK=&canary=&ctx=&hpgrequestid=&PPFT=DYfFIYNM6LLpvJtHCdXwne5kdAylSLTRCKJLcfCAyc9f4CGhmtWjBUxwa6T5cVcGeAwNc3c9EvmKM78V8v8l1p46Zc%21smwIAcJ3fBTGFuZjQ*MoJb5dxz8F4nQBTLOsTej3UCYhC0BSCT*uCkFVSa8qewbrDa*oElhcfAtN2%21Q9pnOFkQ2q2hcL5RdfTW9NrwBRXpvBKASF*CcmdmWoapikv9nrp4ffR67SqqKl8TAP*hZtAFHWZpa2n96iFzo10mQ%24%24&PPSX=Passp&NewUser=1&FoundMSAs=&fspost=0&i21=0&CookieDisclosure=0&IsFidoSupported=1&isSignupPost=0&i2=1&i17=0&i18=&i19=645534
```

### Response

`200` Fail: Incorrect password
[pwd-incorrect.html](pwd-incorrect.html)
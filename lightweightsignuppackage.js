'use strict';
/**
 * @param {string} array
 * @param {string} obj
 * @param {string} n
 * @param {string} fn
 * @return {?}
 */
function Encrypt(array, obj, n, fn) {
  /** @type {!Array} */
  var index = [];
  switch(n.toLowerCase()) {
    case "chgsqsa":
      if (null == array || null == obj) {
        return null;
      }
      index = PackageSAData(array, obj);
      break;
    case "chgpwd":
      if (null == array || null == fn) {
        return null;
      }
      index = PackageNewAndOldPwd(array, fn);
      break;
    case "pwd":
      if (null == array) {
        return null;
      }
      index = PackagePwdOnly(array);
      break;
    case "pin":
      if (null == array) {
        return null;
      }
      index = PackagePinOnly(array);
      break;
    case "proof":
      if (null == array && null == obj) {
        return null;
      }
      index = PackageLoginIntData(null != array ? array : obj);
      break;
    case "saproof":
      if (null == obj) {
        return null;
      }
      index = PackageSADataForProof(obj);
      break;
    case "newpwd":
      if (null == fn) {
        return null;
      }
      index = PackageNewPwdOnly(fn);
  }
  if (null == index || "undefined" == typeof index) {
    return index;
  }
  if ("undefined" != typeof Key && void 0 !== parseRSAKeyFromString) {
    var key = parseRSAKeyFromString(Key);
  }
  var previousDottieValue = RSAEncrypt(index, key, randomNum);
  return previousDottieValue;
}
/**
 * @param {string} e
 * @param {string} t
 * @return {?}
 */
function PackageSAData(e, t) {
  /** @type {!Array} */
  var ret = [];
  /** @type {number} */
  var r = 0;
  /** @type {number} */
  ret[r++] = 1;
  /** @type {number} */
  ret[r++] = 1;
  /** @type {number} */
  ret[r++] = 0;
  var b;
  var c = t.length;
  /** @type {number} */
  ret[r++] = 2 * c;
  /** @type {number} */
  b = 0;
  for (; c > b; b++) {
    /** @type {number} */
    ret[r++] = 255 & t.charCodeAt(b);
    /** @type {number} */
    ret[r++] = (65280 & t.charCodeAt(b)) >> 8;
  }
  var a = e.length;
  ret[r++] = a;
  /** @type {number} */
  b = 0;
  for (; a > b; b++) {
    /** @type {number} */
    ret[r++] = 127 & e.charCodeAt(b);
  }
  return ret;
}
/**
 * @param {string} input
 * @return {?}
 */
function PackagePwdOnly(input) {
  /** @type {!Array} */
  var bBag = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  /** @type {number} */
  bBag[callbackCount++] = 0;
  /** @type {number} */
  bBag[callbackCount++] = 0;
  var n;
  var i = input.length;
  bBag[callbackCount++] = i;
  /** @type {number} */
  n = 0;
  for (; i > n; n++) {
    /** @type {number} */
    bBag[callbackCount++] = 127 & input.charCodeAt(n);
  }
  return bBag;
}
/**
 * @param {string} input
 * @return {?}
 */
function PackagePinOnly(input) {
  /** @type {!Array} */
  var bBag = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  /** @type {number} */
  bBag[callbackCount++] = 2;
  /** @type {number} */
  bBag[callbackCount++] = 0;
  /** @type {number} */
  bBag[callbackCount++] = 0;
  /** @type {number} */
  bBag[callbackCount++] = 0;
  var n;
  var i = input.length;
  bBag[callbackCount++] = i;
  /** @type {number} */
  n = 0;
  for (; i > n; n++) {
    /** @type {number} */
    bBag[callbackCount++] = 127 & input.charCodeAt(n);
  }
  return bBag;
}
/**
 * @param {string} param_hash
 * @return {?}
 */
function PackageLoginIntData(param_hash) {
  var i;
  /** @type {!Array} */
  var callbackVals = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  i = 0;
  for (; i < param_hash.length; i++) {
    /** @type {number} */
    callbackVals[callbackCount++] = 255 & param_hash.charCodeAt(i);
    /** @type {number} */
    callbackVals[callbackCount++] = (65280 & param_hash.charCodeAt(i)) >> 8;
  }
  return callbackVals;
}
/**
 * @param {string} tsid
 * @return {?}
 */
function PackageSADataForProof(tsid) {
  var i;
  /** @type {!Array} */
  var callbackVals = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  i = 0;
  for (; i < tsid.length; i++) {
    /** @type {number} */
    callbackVals[callbackCount++] = 127 & tsid.charCodeAt(i);
    /** @type {number} */
    callbackVals[callbackCount++] = (65280 & tsid.charCodeAt(i)) >> 8;
  }
  return callbackVals;
}
/**
 * @param {string} data
 * @return {?}
 */
function PackageNewPwdOnly(data) {
  /** @type {!Array} */
  var bBag = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  var first;
  var i = data.length;
  bBag[callbackCount++] = i;
  /** @type {number} */
  first = 0;
  for (; i > first; first++) {
    /** @type {number} */
    bBag[callbackCount++] = 127 & data.charCodeAt(first);
  }
  return bBag[callbackCount++] = 0, bBag[callbackCount++] = 0, bBag;
}
/**
 * @param {string} name
 * @param {string} data
 * @return {?}
 */
function PackageNewAndOldPwd(name, data) {
  /** @type {!Array} */
  var bBag = [];
  /** @type {number} */
  var callbackCount = 0;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  /** @type {number} */
  bBag[callbackCount++] = 1;
  var first;
  var i = data.length;
  bBag[callbackCount++] = i;
  /** @type {number} */
  first = 0;
  for (; i > first; first++) {
    /** @type {number} */
    bBag[callbackCount++] = 127 & data.charCodeAt(first);
  }
  /** @type {number} */
  bBag[callbackCount++] = 0;
  i = name.length;
  bBag[callbackCount++] = i;
  /** @type {number} */
  first = 0;
  for (; i > first; first++) {
    /** @type {number} */
    bBag[callbackCount++] = 127 & name.charCodeAt(first);
  }
  return bBag;
}
/**
 * @param {number} n
 * @return {?}
 */
function mapByteToBase64(n) {
  return n >= 0 && 26 > n ? String.fromCharCode(65 + n) : n >= 26 && 52 > n ? String.fromCharCode(97 + n - 26) : n >= 52 && 62 > n ? String.fromCharCode(48 + n - 52) : 62 == n ? "+" : "/";
}
/**
 * @param {number} data
 * @param {number} obj
 * @return {?}
 */
function base64Encode(data, obj) {
  var upperValue;
  /** @type {string} */
  var output = "";
  /** @type {number} */
  upperValue = obj;
  for (; 4 > upperValue; upperValue++) {
    /** @type {number} */
    data = data >> 6;
  }
  /** @type {number} */
  upperValue = 0;
  for (; obj > upperValue; upperValue++) {
    /** @type {string} */
    output = mapByteToBase64(63 & data) + output;
    /** @type {number} */
    data = data >> 6;
  }
  return output;
}
/**
 * @param {!Array} data
 * @return {?}
 */
function byteArrayToBase64(data) {
  var i;
  var value;
  var newLen = data.length;
  /** @type {string} */
  var totalStackCode = "";
  /** @type {number} */
  i = newLen - 3;
  for (; i >= 0; i = i - 3) {
    /** @type {number} */
    value = data[i] | data[i + 1] << 8 | data[i + 2] << 16;
    /** @type {string} */
    totalStackCode = totalStackCode + base64Encode(value, 4);
  }
  /** @type {number} */
  var rgb = newLen % 3;
  /** @type {number} */
  value = 0;
  /** @type {number} */
  i = i + 2;
  for (; i >= 0; i--) {
    /** @type {number} */
    value = value << 8 | data[i];
  }
  return 1 == rgb ? totalStackCode = totalStackCode + base64Encode(value << 16, 2) + "==" : 2 == rgb && (totalStackCode = totalStackCode + base64Encode(value << 8, 3) + "="), totalStackCode;
}
/**
 * @param {string} v
 * @return {?}
 */
function parseRSAKeyFromString(v) {
  var t = v.indexOf(";");
  if (0 > t) {
    return null;
  }
  var m = v.substr(0, t);
  var cmdargs = v.substr(t + 1);
  var idx = m.indexOf("=");
  if (0 > idx) {
    return null;
  }
  var matrix = m.substr(idx + 1);
  if (idx = cmdargs.indexOf("="), 0 > idx) {
    return null;
  }
  var name = cmdargs.substr(idx + 1);
  /** @type {!Object} */
  var result = new Object;
  return result.n = hexStringToMP(name), result.e = parseInt(matrix, 16), result;
}
/**
 * @param {!Array} data
 * @param {!Object} f
 * @return {?}
 */
function RSAEncrypt(data, f) {
  /** @type {!Array} */
  var itemData = [];
  /** @type {number} */
  var location = 42;
  /** @type {number} */
  var size = 2 * f.n.size - location;
  /** @type {number} */
  var i = 0;
  for (; i < data.length; i = i + size) {
    if (i + size >= data.length) {
      var m = RSAEncryptBlock(data.slice(i), f, randomNum);
      if (m) {
        itemData = m.concat(itemData);
      }
    } else {
      m = RSAEncryptBlock(data.slice(i, i + size), f, randomNum);
      if (m) {
        itemData = m.concat(itemData);
      }
    }
  }
  var reverseItemData = byteArrayToBase64(itemData);
  return reverseItemData;
}
/**
 * @param {!Array} data
 * @param {!Object} options
 * @param {?} x
 * @return {?}
 */
function RSAEncryptBlock(data, options, x) {
  var n = options.n;
  var format = options.e;
  var y = data.length;
  /** @type {number} */
  var max_y = 2 * n.size;
  /** @type {number} */
  var h = 42;
  if (y + h > max_y) {
    return null;
  }
  applyPKCSv2Padding(data, max_y, x);
  data = data.reverse();
  var j = byteArrayToMP(data);
  var d = modularExp(j, format, n);
  d.size = n.size;
  var bottoms = mpToByteArray(d);
  return bottoms = bottoms.reverse();
}
/**
 * @return {undefined}
 */
function JSMPnumber() {
  /** @type {number} */
  this.size = 1;
  /** @type {!Array} */
  this.data = [];
  /** @type {number} */
  this.data[0] = 0;
}
/**
 * @param {!Object} props
 * @return {?}
 */
function duplicateMP(props) {
  var s = new JSMPnumber;
  return s.size = props.size, s.data = props.data.slice(0), s;
}
/**
 * @param {!Object} rows
 * @return {?}
 */
function byteArrayToMP(rows) {
  var div = new JSMPnumber;
  /** @type {number} */
  var i = 0;
  var length = rows.length;
  /** @type {number} */
  var size = length >> 1;
  /** @type {number} */
  i = 0;
  for (; size > i; i++) {
    div.data[i] = rows[2 * i] + (rows[1 + 2 * i] << 8);
  }
  return length % 2 && (div.data[i++] = rows[length - 1]), div.size = i, div;
}
/**
 * @param {!Object} unit
 * @return {?}
 */
function mpToByteArray(unit) {
  /** @type {!Array} */
  var t = [];
  /** @type {number} */
  var i = 0;
  var n = unit.size;
  /** @type {number} */
  i = 0;
  for (; n > i; i++) {
    /** @type {number} */
    t[2 * i] = 255 & unit.data[i];
    /** @type {number} */
    var testvalue = unit.data[i] >>> 8;
    /** @type {number} */
    t[2 * i + 1] = testvalue;
  }
  return t;
}
/**
 * @param {!Object} e
 * @param {number} mask
 * @param {!Object} length
 * @return {?}
 */
function modularExp(e, mask, length) {
  /** @type {!Array} */
  var buffer = [];
  /** @type {number} */
  var i = 0;
  for (; mask > 0;) {
    /** @type {number} */
    buffer[i] = 1 & mask;
    /** @type {number} */
    mask = mask >>> 1;
    i++;
  }
  var result = duplicateMP(e);
  /** @type {number} */
  var j = i - 2;
  for (; j >= 0; j--) {
    result = modularMultiply(result, result, length);
    if (1 == buffer[j]) {
      result = modularMultiply(result, e, length);
    }
  }
  return result;
}
/**
 * @param {!Object} json
 * @param {!Object} e
 * @param {!Object} n
 * @return {?}
 */
function modularMultiply(json, e, n) {
  var t = multiplyMP(json, e);
  var s = divideMP(t, n);
  return s.r;
}
/**
 * @param {!Object} e
 * @param {!Object} r
 * @return {?}
 */
function multiplyMP(e, r) {
  var node = new JSMPnumber;
  node.size = e.size + r.size;
  var i;
  var j;
  /** @type {number} */
  i = 0;
  for (; i < node.size; i++) {
    /** @type {number} */
    node.data[i] = 0;
  }
  var a = e.data;
  var b = r.data;
  var bounds = node.data;
  if (e == r) {
    /** @type {number} */
    i = 0;
    for (; i < e.size; i++) {
      bounds[2 * i] += a[i] * a[i];
    }
    /** @type {number} */
    i = 1;
    for (; i < e.size; i++) {
      /** @type {number} */
      j = 0;
      for (; i > j; j++) {
        bounds[i + j] += 2 * a[i] * a[j];
      }
    }
  } else {
    /** @type {number} */
    i = 0;
    for (; i < e.size; i++) {
      /** @type {number} */
      j = 0;
      for (; j < r.size; j++) {
        bounds[i + j] += a[i] * b[j];
      }
    }
  }
  return normalizeJSMP(node), node;
}
/**
 * @param {!Object} att
 * @return {undefined}
 */
function normalizeJSMP(att) {
  var j;
  var headerRowHtml;
  var value;
  var o;
  var o_old;
  value = att.size;
  /** @type {number} */
  headerRowHtml = 0;
  /** @type {number} */
  j = 0;
  for (; value > j; j++) {
    o = att.data[j];
    o = o + headerRowHtml;
    o_old = o;
    /** @type {number} */
    headerRowHtml = Math.floor(o / 65536);
    /** @type {number} */
    o = o - 65536 * headerRowHtml;
    att.data[j] = o;
  }
}
/**
 * @param {!Object} s
 * @return {undefined}
 */
function removeLeadingZeroes(s) {
  /** @type {number} */
  var p = s.size - 1;
  for (; p > 0 && 0 == s.data[p--];) {
    s.size--;
  }
}
/**
 * @param {!Object} r
 * @param {!Object} t
 * @return {?}
 */
function divideMP(r, t) {
  var j = r.size;
  var len = t.size;
  var A = t.data[len - 1];
  var DyMilli = t.data[len - 1] + t.data[len - 2] / 65536;
  var content = new JSMPnumber;
  /** @type {number} */
  content.size = j - len + 1;
  /** @type {number} */
  r.data[j] = 0;
  /** @type {number} */
  var i = j - 1;
  for (; i >= len - 1; i--) {
    /** @type {number} */
    var name = i - len + 1;
    /** @type {number} */
    var fn = Math.floor((65536 * r.data[i + 1] + r.data[i]) / DyMilli);
    if (fn > 0) {
      var result = multiplyAndSubtract(r, fn, t, name);
      if (0 > result) {
        fn--;
        multiplyAndSubtract(r, fn, t, name);
      }
      for (; result > 0 && r.data[i] >= A;) {
        result = multiplyAndSubtract(r, 1, t, name);
        if (result > 0) {
          fn++;
        }
      }
    }
    /** @type {number} */
    content.data[name] = fn;
  }
  removeLeadingZeroes(r);
  var params = {
    "q" : content,
    "r" : r
  };
  return params;
}
/**
 * @param {!Object} result
 * @param {number} r
 * @param {!Object} source
 * @param {number} k
 * @return {?}
 */
function multiplyAndSubtract(result, r, source, k) {
  var i;
  var a = result.data.slice(0);
  /** @type {number} */
  var x = 0;
  var pos = result.data;
  /** @type {number} */
  i = 0;
  for (; i < source.size; i++) {
    /** @type {number} */
    var y = x + source.data[i] * r;
    /** @type {number} */
    x = y >>> 16;
    /** @type {number} */
    y = y - 65536 * x;
    if (y > pos[i + k]) {
      pos[i + k] += 65536 - y;
      x++;
    } else {
      pos[i + k] -= y;
    }
  }
  return x > 0 && (pos[i + k] -= x), pos[i + k] < 0 ? (result.data = a.slice(0), -1) : 1;
}
/**
 * @param {!Array} value
 * @param {number} i
 * @param {?} object
 * @return {undefined}
 */
function applyPKCSv2Padding(value, i, object) {
  var v;
  var bytes = value.length;
  /** @type {!Array} */
  var a = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9];
  /** @type {number} */
  var l = i - bytes - 40 - 2;
  /** @type {!Array} */
  var s = [];
  /** @type {number} */
  v = 0;
  for (; l > v; v++) {
    /** @type {number} */
    s[v] = 0;
  }
  /** @type {number} */
  s[l] = 1;
  /** @type {!Array<?>} */
  var r = a.concat(s, value);
  /** @type {!Array} */
  var values = [];
  /** @type {number} */
  v = 0;
  for (; 20 > v; v++) {
    /** @type {number} */
    values[v] = Math.floor(256 * Math.random());
  }
  values = SHA1(values.concat(object));
  var y = MGF(values, i - 21);
  var b = XORarrays(r, y);
  var n = MGF(b, 20);
  var m = XORarrays(values, n);
  /** @type {!Array} */
  var d = [];
  /** @type {number} */
  d[0] = 0;
  /** @type {!Array<?>} */
  d = d.concat(m, b);
  /** @type {number} */
  v = 0;
  for (; v < d.length; v++) {
    value[v] = d[v];
  }
}
/**
 * @param {!Array} array
 * @param {number} n
 * @return {?}
 */
function MGF(array, n) {
  if (n > 4096) {
    return null;
  }
  var s = array.slice(0);
  var i = s.length;
  /** @type {number} */
  s[i++] = 0;
  /** @type {number} */
  s[i++] = 0;
  /** @type {number} */
  s[i++] = 0;
  /** @type {number} */
  s[i] = 0;
  /** @type {number} */
  var capturedGroupIndex = 0;
  /** @type {!Array} */
  var a = [];
  for (; a.length < n;) {
    /** @type {number} */
    s[i] = capturedGroupIndex++;
    /** @type {!Array<?>} */
    a = a.concat(SHA1(s));
  }
  return a.slice(0, n);
}
/**
 * @param {!Array} a
 * @param {!NodeList} b
 * @return {?}
 */
function XORarrays(a, b) {
  if (a.length != b.length) {
    return null;
  }
  /** @type {!Array} */
  var premultRGBA = [];
  var l = a.length;
  /** @type {number} */
  var i = 0;
  for (; l > i; i++) {
    /** @type {number} */
    premultRGBA[i] = a[i] ^ b[i];
  }
  return premultRGBA;
}
/**
 * @param {string} s
 * @return {?}
 */
function SHA1(s) {
  var i;
  var n = s.slice(0);
  PadSHA1Input(n);
  var times = {
    "A" : 1732584193,
    "B" : 4023233417,
    "C" : 2562383102,
    "D" : 271733878,
    "E" : 3285377520
  };
  /** @type {number} */
  i = 0;
  for (; i < n.length; i = i + 64) {
    SHA1RoundFunction(times, n, i);
  }
  /** @type {!Array} */
  var nameArgs = [];
  return wordToBytes(times.A, nameArgs, 0), wordToBytes(times.B, nameArgs, 4), wordToBytes(times.C, nameArgs, 8), wordToBytes(times.D, nameArgs, 12), wordToBytes(times.E, nameArgs, 16), nameArgs;
}
/**
 * @param {number} c
 * @param {!Array} t
 * @param {number} i
 * @return {undefined}
 */
function wordToBytes(c, t, i) {
  var left_count;
  /** @type {number} */
  left_count = 3;
  for (; left_count >= 0; left_count--) {
    /** @type {number} */
    t[i + left_count] = 255 & c;
    /** @type {number} */
    c = c >>> 8;
  }
}
/**
 * @param {!Object} b
 * @return {undefined}
 */
function PadSHA1Input(b) {
  var s;
  var length = b.length;
  var i = length;
  /** @type {number} */
  var n = length % 64;
  /** @type {number} */
  var ms = 55 > n ? 56 : 120;
  /** @type {number} */
  b[i++] = 128;
  /** @type {number} */
  s = n + 1;
  for (; ms > s; s++) {
    /** @type {number} */
    b[i++] = 0;
  }
  /** @type {number} */
  var wideValue = 8 * length;
  /** @type {number} */
  s = 1;
  for (; 8 > s; s++) {
    /** @type {number} */
    b[i + 8 - s] = 255 & wideValue;
    /** @type {number} */
    wideValue = wideValue >>> 8;
  }
}
/**
 * @param {!Object} self
 * @param {!Array} window
 * @param {number} id
 * @return {undefined}
 */
function SHA1RoundFunction(self, window, id) {
  var i;
  var p;
  var name;
  /** @type {number} */
  var r = 1518500249;
  /** @type {number} */
  var s = 1859775393;
  /** @type {number} */
  var c = 2400959708;
  /** @type {number} */
  var d = 3395469782;
  /** @type {!Array} */
  var l = [];
  var a = self.A;
  var B = self.B;
  var C = self.C;
  var D = self.D;
  var E = self.E;
  /** @type {number} */
  p = 0;
  /** @type {number} */
  name = id;
  for (; 16 > p; p++, name = name + 4) {
    /** @type {number} */
    l[p] = window[name] << 24 | window[name + 1] << 16 | window[name + 2] << 8 | window[name + 3] << 0;
  }
  /** @type {number} */
  p = 16;
  for (; 80 > p; p++) {
    l[p] = rotateLeft(l[p - 3] ^ l[p - 8] ^ l[p - 14] ^ l[p - 16], 1);
  }
  var nativeObjectObject;
  /** @type {number} */
  i = 0;
  for (; 20 > i; i++) {
    /** @type {number} */
    nativeObjectObject = rotateLeft(a, 5) + (B & C | ~B & D) + E + l[i] + r & 4294967295;
    E = D;
    D = C;
    C = rotateLeft(B, 30);
    B = a;
    /** @type {number} */
    a = nativeObjectObject;
  }
  /** @type {number} */
  i = 20;
  for (; 40 > i; i++) {
    /** @type {number} */
    nativeObjectObject = rotateLeft(a, 5) + (B ^ C ^ D) + E + l[i] + s & 4294967295;
    E = D;
    D = C;
    C = rotateLeft(B, 30);
    B = a;
    /** @type {number} */
    a = nativeObjectObject;
  }
  /** @type {number} */
  i = 40;
  for (; 60 > i; i++) {
    /** @type {number} */
    nativeObjectObject = rotateLeft(a, 5) + (B & C | B & D | C & D) + E + l[i] + c & 4294967295;
    E = D;
    D = C;
    C = rotateLeft(B, 30);
    B = a;
    /** @type {number} */
    a = nativeObjectObject;
  }
  /** @type {number} */
  i = 60;
  for (; 80 > i; i++) {
    /** @type {number} */
    nativeObjectObject = rotateLeft(a, 5) + (B ^ C ^ D) + E + l[i] + d & 4294967295;
    E = D;
    D = C;
    C = rotateLeft(B, 30);
    B = a;
    /** @type {number} */
    a = nativeObjectObject;
  }
  /** @type {number} */
  self.A = self.A + a & 4294967295;
  /** @type {number} */
  self.B = self.B + B & 4294967295;
  /** @type {number} */
  self.C = self.C + C & 4294967295;
  /** @type {number} */
  self.D = self.D + D & 4294967295;
  /** @type {number} */
  self.E = self.E + E & 4294967295;
}
/**
 * @param {number} x
 * @param {number} n
 * @return {?}
 */
function rotateLeft(x, n) {
  /** @type {number} */
  var tt = x >>> 32 - n;
  /** @type {number} */
  var MASK = (1 << 32 - n) - 1;
  /** @type {number} */
  var sizeIndex = x & MASK;
  return sizeIndex << n | tt;
}
/**
 * @param {string} input
 * @return {?}
 */
function hexStringToMP(input) {
  var i;
  var total_pageviews_raw;
  /** @type {number} */
  var length = Math.ceil(input.length / 4);
  var info = new JSMPnumber;
  /** @type {number} */
  info.size = length;
  /** @type {number} */
  i = 0;
  for (; length > i; i++) {
    total_pageviews_raw = input.substr(4 * i, 4);
    /** @type {number} */
    info.data[length - 1 - i] = parseInt(total_pageviews_raw, 16);
  }
  return info;
}
!function(data) {
  var t;
  !function(VIE) {
    var t;
    !function(canCreateDiscussions) {
      var t;
      !function(result) {
        /**
         * @param {string} name
         * @param {string} filename
         * @return {?}
         */
        function extension(name, filename) {
          return name ? filename && filename.length > 6 && ("data:" === filename.substr(0, 5).toLowerCase() || "http:" === filename.substr(0, 5).toLowerCase() || "https:" === filename.substr(0, 6).toLowerCase()) ? filename : name + filename : filename;
        }
        /** @type {function(string, string): ?} */
        result.getImagePath = extension;
      }(t = canCreateDiscussions.ImageHelper || (canCreateDiscussions.ImageHelper = {}));
    }(t = VIE.Util || (VIE.Util = {}));
  }(t = data.Account || (data.Account = {}));
}(wLive || (wLive = {})), function() {
  /** @type {!Window} */
  var context = window;
  var t = (context.jQuery, context.$Debug);
  t.assert(context.$Config, "ConfigBurner should output: $Config");
  var node = context.$Config;
  if (node.handlerBaseUrl = node.handlerBaseUrl || "", !node.sd) {
    /** @type {string} */
    var domain = document.domain;
    /** @type {!Array<string>} */
    var expRecords = domain.split(".");
    /** @type {string} */
    node.sd = 1 === expRecords.length ? "" : "." + expRecords[expRecords.length - 2] + ".com";
  }
  t.assert(node.mkt, "ConfigBurner should output: $.$Config.mkt");
  node.mkt = node.mkt || "na";
  node.prop = node.prop || "Account";
  if ("undefined" != typeof window.SymRealWinOpen) {
    window.open = window.SymRealWinOpen;
  }
}(), function() {
  /**
   * @return {undefined}
   */
  function reRouteUser() {
    /** @type {string} */
    var s = document.title;
    /** @type {string} */
    var suffix = document.location.hash;
    if (s != value && suffix && s.indexOf(suffix) == s.length - suffix.length) {
      document.title = value;
    }
    /** @type {string} */
    value = document.title;
  }
  /** @type {!Window} */
  var self = window;
  var options = self.wLive;
  if (!self.$Debug) {
    self.$Debug = {
      "enabled" : false,
      "trace" : function() {
      }
    };
  }
  var d = self.document;
  self._d = d;
  /**
   * @param {?} tagName
   * @return {?}
   */
  self._ce = function(tagName) {
    return d.createElement(tagName);
  };
  /**
   * @param {?} n
   * @return {?}
   */
  self._ge = function(n) {
    return d.getElementById(n);
  };
  /**
   * @param {string} key
   * @return {?}
   */
  self._get = function(key) {
    return d.getElementsByTagName(key);
  };
  self._dh = d.head = d.head || self._get("head")[0];
  options.dh = jQuery("#head")[0] || self._dh;
  var value;
  jQuery(document).bind("propertychange", reRouteUser);
}(), function() {
  /**
   * @param {!Function} b
   * @param {!Function} sorter
   * @return {undefined}
   */
  function _objectMap$jscomp$0(b, sorter) {
    var i;
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        sorter(i, b[i]);
      }
    }
  }
  /**
   * @param {!Object} data
   * @param {!Object} obj
   * @return {undefined}
   */
  function updateObject$jscomp$0(data, obj) {
    var prop;
    for (prop in obj) {
      var value = data[prop];
      var val = obj[prop];
      if (val.constructor == Array) {
        if (!(value && value.constructor == Array)) {
          /** @type {!Array} */
          value = data[prop] = [];
        }
        updateObject$jscomp$0(value, val);
      } else {
        if ("object" == typeof val) {
          if ("object" != typeof value) {
            value = data[prop] = {};
          }
          updateObject$jscomp$0(value, val);
        } else {
          data[prop] = val;
        }
      }
    }
  }
  /**
   * @param {!Array} arr
   * @param {!Array} url
   * @return {undefined}
   */
  function evalStringsAndAddScripts$jscomp$0(arr, url) {
    /** @type {number} */
    var i = 0;
    for (; i < arr.length; i++) {
      $Utility$jscomp$0.eval(arr[i]);
    }
    /** @type {number} */
    i = 0;
    for (; i < url.length; i++) {
      if (url[i] && "" != url[i]) {
        /** @type {!Element} */
        var script = document.createElement("SCRIPT");
        script.src = url[i];
        document.body.appendChild(script);
      }
    }
  }
  /**
   * @param {string} e
   * @return {?}
   */
  function _getQsValues$jscomp$0(e) {
    var bandwidthData = {};
    return e && e.length > 1 && ("?" == e[0] && (e = e.substr(1)), e.split("&").forEach(function(clusterShardData) {
      var params = clusterShardData.split("=");
      var index = params[0];
      var pfn = params[1];
      if (!bandwidthData[index]) {
        /** @type {!Array} */
        bandwidthData[index] = [];
      }
      bandwidthData[index].push(pfn);
    })), bandwidthData;
  }
  /**
   * @param {number} n
   * @param {!Function} t
   * @return {?}
   */
  function _updateQsValues$jscomp$0(n, t) {
    return n = n || {}, t && _objectMap$jscomp$0(t, function(index, name) {
      n[index] = name;
    }), n;
  }
  /**
   * @param {!Function} t
   * @return {?}
   */
  function _formatQsValues$jscomp$0(t) {
    /** @type {string} */
    var id = "";
    return t && _objectMap$jscomp$0(t, function(fid, h) {
      /** @type {null} */
      var i = null;
      /** @type {number} */
      var j = 0;
      for (; j < h.length; j++) {
        if (null !== h[j] && void 0 !== h[j]) {
          if (i) {
            /** @type {string} */
            i = i + ",";
          } else {
            /** @type {string} */
            i = "";
          }
          i = i + h[j];
        }
      }
      if (id) {
        /** @type {string} */
        id = id + "&";
      }
      id = id + fid;
      if (null !== i) {
        /** @type {string} */
        id = id + ("=" + i);
      }
    }), id && (id = "?" + id), id;
  }
  /** @type {!Window} */
  var w$jscomp$7 = window;
  var $config$jscomp$0 = w$jscomp$7.$Config;
  var jQuery$jscomp$0 = w$jscomp$7.jQuery;
  var wl$jscomp$0 = w$jscomp$7.wLive;
  var Debug$jscomp$0 = w$jscomp$7.$Debug;
  /** @type {string} */
  var _ConstDefaultDeliminator$jscomp$0 = "&";
  /** @type {string} */
  var _ConstKeyValueDeliminator$jscomp$0 = "=";
  /**
   * @param {string} value
   * @param {number} length
   * @return {?}
   */
  wl$jscomp$0.truncateEllipsis = function(value, length) {
    return length = Math.max(parseInt(length, 10) || 1e5, 4), value ? value.length > length ? value.substring(0, length - 3) + "..." : value : "";
  };
  var $Utility$jscomp$0 = w$jscomp$7.$Utility = {};
  /**
   * @param {?} s$jscomp$10
   * @return {undefined}
   */
  $Utility$jscomp$0.eval = function(s$jscomp$10) {
    eval(s$jscomp$10);
  };
  /**
   * @param {string} url
   * @param {?} title
   * @return {undefined}
   */
  $Utility$jscomp$0.navigateTo = function(url, title) {
    try {
      if (title) {
        window.open(url, title);
      } else {
        /** @type {string} */
        window.location.href = url;
      }
    } catch (n) {
      setTimeout(function() {
        if (title) {
          window.open(url, title);
        } else {
          /** @type {string} */
          window.location.href = url;
        }
      }, 0);
    }
  };
  /**
   * @param {string} name
   * @param {?} params
   * @return {undefined}
   */
  $Utility$jscomp$0.postTo = function(name, params) {
    if (name && "object" == typeof params) {
      var a;
      /** @type {!Element} */
      var form = document.createElement("form");
      /** @type {string} */
      form.action = name;
      /** @type {string} */
      form.method = "post";
      jQuery$jscomp$0.each(params, function(e, t) {
        /** @type {!Element} */
        a = document.createElement("input");
        /** @type {string} */
        a.type = "hidden";
        /** @type {string} */
        a.id = e;
        /** @type {string} */
        a.name = e;
        /** @type {!Object} */
        a.value = t;
        form.appendChild(a);
      });
      document.body.appendChild(form);
      form.submit();
    }
  };
  /**
   * @param {string} data
   * @param {string} type
   * @param {string} array
   * @param {string} callback
   * @return {?}
   */
  $Utility$jscomp$0.deserialize = function(data, type, array, callback) {
    var result = {};
    if (type = type || _ConstDefaultDeliminator$jscomp$0, data) {
      var parts = data.split(type);
      var length = parts.length;
      /** @type {number} */
      var i = 0;
      for (; length > i; i++) {
        var host = parts[i];
        var d = host.split(_ConstKeyValueDeliminator$jscomp$0);
        if (d.length > 0) {
          var name = d[0].trim();
          d.splice(0, 1);
          var value = d.join(_ConstKeyValueDeliminator$jscomp$0).trim();
          try {
            Debug$jscomp$0.assert(array || void 0 === result[name], "Duplicate key detected: " + name + " value: " + result[name] + " new value: " + (callback ? value : value.decodeUrl()));
            result[name] = callback ? value : value.decodeUrl();
          } catch (p) {
            Debug$jscomp$0.assert(false, "Deserialize Failed on value: " + value);
            /** @type {string} */
            result[name] = "";
          }
        }
      }
    }
    return result;
  };
  /**
   * @param {!Object} result
   * @param {string} type
   * @param {number} html
   * @return {?}
   */
  $Utility$jscomp$0.serialize = function(result, type, html) {
    Debug$jscomp$0.assert(result, "hashtable must be provided");
    type = type || _ConstDefaultDeliminator$jscomp$0;
    /** @type {!Array} */
    var path = [];
    var index;
    for (index in result) {
      var text = result[index];
      text = null == text ? "" : text.toString();
      path.push(index, _ConstKeyValueDeliminator$jscomp$0, html ? text : text.encodeUrl(), type);
    }
    return path.length > 0 && path.pop(), path.join("");
  };
  /** @type {function(!Object, !Object): undefined} */
  $Utility$jscomp$0.updateObject = updateObject$jscomp$0;
  /** @type {string} */
  var scrTag$jscomp$0 = "scr";
  /** @type {string} */
  scrTag$jscomp$0 = scrTag$jscomp$0 + "ipt";
  /** @type {string} */
  var endScrTag$jscomp$0 = "/scr";
  /** @type {string} */
  endScrTag$jscomp$0 = endScrTag$jscomp$0 + "ipt";
  /** @type {!RegExp} */
  var ajaxInnerHtmlRegex$jscomp$0 = new RegExp("<" + scrTag$jscomp$0 + ' type="text/javascript"( src="([^"]*?)"){0,1}(( loadfirst="true")|( defer="defer")){0,1}( id="[^"]*?"){0,1}>([\\w\\W]*?)<' + endScrTag$jscomp$0 + ">", "gim");
  /** @type {!RegExp} */
  var debuggerAjaxInnerHtmlRegex$jscomp$0 = new RegExp("<" + scrTag$jscomp$0, "gim");
  /**
   * @param {!Object} table
   * @param {string} css
   * @return {undefined}
   */
  $Utility$jscomp$0.ajaxInnerHtml = function(table, css) {
    /** @type {number} */
    ajaxInnerHtmlRegex$jscomp$0.lastIndex = 0;
    var m;
    /** @type {!Array} */
    var UNICODE_SPACES = [];
    /** @type {!Array} */
    var ret = [];
    /** @type {!Array} */
    var a = [];
    /** @type {!Array} */
    var servers = [];
    /** @type {!Array} */
    var dep = [];
    /** @type {number} */
    var i = 0;
    for (; m = ajaxInnerHtmlRegex$jscomp$0.exec(css);) {
      UNICODE_SPACES.push(css.substring(i, m.index));
      if (m[4] && "" != m[4]) {
        servers.push(m[7]);
        dep.push(m[2]);
      } else {
        ret.push(m[7]);
        a.push(m[2]);
      }
      /** @type {number} */
      i = ajaxInnerHtmlRegex$jscomp$0.lastIndex;
    }
    UNICODE_SPACES.push(css.substring(i));
    Debug$jscomp$0.assert(0 == (debuggerAjaxInnerHtmlRegex$jscomp$0.lastIndex = 0) && !debuggerAjaxInnerHtmlRegex$jscomp$0.exec(UNICODE_SPACES.join("")), "Invalid ajax script reference");
    evalStringsAndAddScripts$jscomp$0(servers, dep);
    /** @type {string} */
    table.innerHTML = UNICODE_SPACES.join("");
    evalStringsAndAddScripts$jscomp$0(ret, a);
  };
  /**
   * @return {?}
   */
  $Utility$jscomp$0.generateGuid = function() {
    /** @type {string} */
    var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(name) {
      /** @type {number} */
      var M = Math.floor(16 * Math.random());
      /** @type {number} */
      var pid = "x" == name ? M : 3 & M | 8;
      return pid.toString(16);
    });
    return guid;
  };
  /**
   * @param {string} canCreateDiscussions
   * @return {undefined}
   */
  $Utility$jscomp$0.firePageLoadEvent = function(canCreateDiscussions) {
    if (!$config$jscomp$0.isCustomPerf) {
      $Do.when("doc.load", function() {
        w$jscomp$7.$ReportEvent.PageLoadCompleted();
        w$jscomp$7.$ReportEvent.Fire(canCreateDiscussions + "_Client");
      });
    }
  };
  /**
   * @param {string} data
   * @param {string} method
   * @param {boolean} id
   * @return {?}
   */
  $Utility$jscomp$0.generateUrl = function(data, method, id) {
    /** @type {string} */
    var url = "";
    if (data && method) {
      if (url = data + method, id) {
        var hashNdx = url.indexOf("?");
        if (-1 !== hashNdx) {
          var data = _updateQsValues$jscomp$0(_getQsValues$jscomp$0(w$jscomp$7.location.search), _getQsValues$jscomp$0(url.substr(hashNdx)));
          url = url.substr(0, hashNdx);
          url = url + _formatQsValues$jscomp$0(data);
        } else {
          /** @type {string} */
          url = url + w$jscomp$7.location.search;
        }
      }
      return url;
    }
    return url;
  };
  /**
   * @param {string} url
   * @param {string} name
   * @param {!Object} value
   * @return {?}
   */
  $Utility$jscomp$0.addQueryString = function(url, name, value) {
    if (url && name && "undefined" != typeof value && null !== value) {
      /** @type {!RegExp} */
      var entUrlRe = new RegExp("([?&])" + name + "=.*?(&|#|$)(.*)", "gi");
      if (entUrlRe.test(url)) {
        url = url.replace(entUrlRe, "$1" + name + "=" + encodeURI(value) + "$2$3");
      } else {
        /** @type {string} */
        var $appsVectorMap = -1 !== url.indexOf("?") ? "&" : "?";
        /** @type {string} */
        url = url + ($appsVectorMap + name + "=" + encodeURI(value));
      }
    }
    return url;
  };
  /** @type {function(string): ?} */
  $Utility$jscomp$0.getQsValues = _getQsValues$jscomp$0;
  /** @type {function(!Function): ?} */
  $Utility$jscomp$0.formatQsValues = _formatQsValues$jscomp$0;
  /** @type {function(number, !Function): ?} */
  $Utility$jscomp$0.updateQsValues = _updateQsValues$jscomp$0;
}(), function() {
  var $ = window.jQuery;
  $(function() {
    var t = $("body");
    var elem = $("<span/>").css({
      "borderLeftColor" : "red",
      "borderRightColor" : "blue",
      "position" : "absolute",
      "top" : "-999px"
    }).appendTo(t);
    /** @type {boolean} */
    $Utility._isHighContrast = elem.css("borderLeftColor") === elem.css("borderRightColor");
    elem.remove();
    if ($Utility._isHighContrast) {
      t.addClass("highContrast");
    }
  });
  /**
   * @return {?}
   */
  $Utility.isHighContrast = function() {
    return $Utility._isHighContrast;
  };
}(), function() {
  /**
   * @param {string} name
   * @param {!Object} m
   * @param {?} t
   * @param {?} data
   * @param {?} url
   * @param {string} key
   * @return {undefined}
   */
  function f(name, m, t, data, url, key) {
    errors.assert(name, "$Beacon.fire: target required. Caller:" + arguments.callee.caller);
    var result = find();
    name = format(name, m);
    errors.assert(key || name.length <= 2e3, "Url is too long and will be truncated: " + name);
    name = name.substr(0, Math.min(name.length, 2e3));
    if (!url) {
      name = format(name, {
        "r" : Math.random()
      });
    }
    callback(result, get(t, result), get(data, result));
    /** @type {string} */
    result.src = name;
  }
  /**
   * @return {?}
   */
  function find() {
    var icon;
    /** @type {number} */
    var len = that.length;
    /** @type {number} */
    var i = 0;
    for (; len > i; i++) {
      var fn = that[i];
      if (!fn.inUse) {
        icon = fn;
        break;
      }
    }
    return icon || (icon = new Image, that.push(icon)), icon.inUse = true, icon;
  }
  /**
   * @param {?} cb
   * @param {(Image|string)} s
   * @return {?}
   */
  function get(cb, s) {
    return function() {
      callback(s, null, null);
      /** @type {boolean} */
      s.inUse = false;
      if (cb) {
        cb();
      }
    };
  }
  /**
   * @param {!Image} el
   * @param {!Function} callback
   * @param {!Function} cb
   * @return {undefined}
   */
  function callback(el, callback, cb) {
    /** @type {!Function} */
    el.onload = callback;
    el.onabort = el.onerror = cb;
  }
  /**
   * @param {string} str
   * @param {!Object} key
   * @return {?}
   */
  function format(str, key) {
    if (str = str || "", key) {
      var uid = message.serialize(key);
      /** @type {string} */
      var prefix = "?";
      if (str.indexOf("?") >= 0) {
        var o = str.charAt(str.length - 1);
        /** @type {string} */
        prefix = "?" == o || "&" == o ? "" : "&";
      }
      /** @type {string} */
      str = str + (prefix + uid);
    }
    return str;
  }
  /** @type {!Window} */
  var res = window;
  var errors = (res.jQuery, res.$Debug);
  var message = res.$Utility;
  var module = (res.wLive, res.$Beacon = {});
  /** @type {!Array} */
  var that = [];
  /** @type {number} */
  var c = 150;
  /** @type {!Array} */
  module.Pool = that;
  /**
   * @param {string} record
   * @param {!Object} data
   * @param {?} i
   * @param {?} e
   * @param {?} path
   * @param {string} start
   * @return {undefined}
   */
  module.fire = function(record, data, i, e, path, start) {
    setTimeout(function() {
      f(record, data, i, e, path, start);
    }, 0);
  };
  /**
   * @param {string} s
   * @param {!Object} index
   * @return {undefined}
   */
  module.fireAndHold = function(s, index) {
    if (f(s, index), !$B.IE) {
      /** @type {number} */
      var latLimit = (new Date).getTime() + c;
      for (; (new Date).getTime() < latLimit;) {
      }
    }
  };
  /** @type {function(string, !Object, ?, ?, ?, string): undefined} */
  module.fireNow = f;
}(), function() {
  /**
   * @param {string} method
   * @return {?}
   */
  function getDomain(method) {
    return method ? ";SameSite=None" : "";
  }
  var prev_c;
  var match;
  var last;
  /** @type {!Window} */
  var global = window;
  var self = (global.jQuery, global.$Utility);
  var root = global.$Debug;
  var util = global.$Cookie = {};
  /**
   * @param {?} name
   * @param {string} next
   * @return {?}
   */
  util.getCookie = function(name, next) {
    root.assert(name, "name must be provided");
    /** @type {string} */
    var c = document.cookie;
    if (c == prev_c) {
      if (next && last) {
        return last[name];
      }
      if (!next && match) {
        return match[name];
      }
    } else {
      /** @type {number} */
      match = 0;
      /** @type {number} */
      last = 0;
      /** @type {string} */
      prev_c = c;
    }
    var child = self.deserialize(document.cookie, ";", true, next);
    return next ? last = child : match = child, child[name];
  };
  /**
   * @param {?} key
   * @param {string} host
   * @param {string} path
   * @param {string} name
   * @return {undefined}
   */
  util.deleteCookie = function(key, host, path, name) {
    root.assert(key, "name must be provided");
    util.setCookie(key, "", host, path, new Date(2e3, 1, 1), false, name);
  };
  /**
   * @param {?} path
   * @param {string} value
   * @param {string} host
   * @param {string} context
   * @param {!Object} name
   * @param {number} object
   * @param {string} uri
   * @param {string} c
   * @return {undefined}
   */
  util.setCookie = function(path, value, host, context, name, object, uri, c) {
    root.assert(path, "name must be provided");
    var item = {};
    /** @type {string} */
    item[path] = value;
    var pivotObjectKey;
    pivotObjectKey = c && "none" !== c.toLowerCase() ? ";SameSite=" + c : getDomain(uri);
    document.cookie = "{0};path={1};{2}{3}secure{4}".format(self.serialize(item, null, object), context ? context : "/", host ? "domain=" + host + ";" : "", name ? "expires=" + name.toUTCString() + ";" : "", pivotObjectKey);
  };
  $Do.register("$Cookie");
  $Do.register("$Cookie.setCookie");
}(), function() {
  /** @type {!Window} */
  var inheritedObject = window;
  inheritedObject.wLive.PageStats = {
    "d" : [],
    "add" : function(data, offset) {
      var i = inheritedObject.wLive.PageStats;
      offset = offset || (new Date).getTime();
      data = data || {
        "url" : "Missing page stats.",
        "tasks" : [],
        "executionTimeMs" : 0,
        "schedulerTimeMs" : 0
      };
      /** @type {!Date} */
      var semiannualPing = new Date;
      /** @type {number} */
      data.clientStart = offset;
      /** @type {number} */
      data.clientLength = semiannualPing.getTime() - offset;
      /** @type {!Date} */
      data.clientTime = semiannualPing;
      i.d.push(data);
      jQuery(i).trigger("go");
    }
  };
}(), function() {
  /** @type {!Window} */
  var win = window;
  win.$f = {
    "getSelectedText" : function() {
      if (document.selection) {
        return document.selection.createRange();
      }
      var text;
      try {
        /** @type {(Range|null)} */
        text = win.getSelection().getRangeAt(0);
      } catch (n) {
        text = win.document.createRange();
      }
      return text;
    },
    "replaceQs" : function(name, value, type) {
      /** @type {string} */
      var f = "([?|&])" + value + "=([^&]+)";
      /** @type {!RegExp} */
      var c = new RegExp(f, "i");
      /** @type {string} */
      var o = name;
      /** @type {string} */
      var s = "";
      var n = name.indexOf("#");
      return n > -1 && (o = name.substr(0, n), s = name.substr(n)), o.replace(c, "$1" + value + "=" + type) + s;
    },
    "doc" : document,
    "getDocType" : function() {
      var publicId;
      var doc = $f.doc;
      var doctype = doc.doctype;
      var items = doc.all;
      return doctype ? publicId = doctype.publicId : items && items.length && (publicId = items[0].nodeValue), publicId || "";
    },
    "createLoading" : function(opts, name, s, val, size, value, html, doc) {
      var title;
      /** @type {!Object} */
      var fn = opts;
      if ("object" == typeof opts) {
        fn = opts.returnMarkup;
        name = opts.type;
        s = opts.width;
        val = opts.height;
        size = opts.size;
        value = opts.color;
        html = opts.text;
        doc = opts.altText;
        title = opts.useTransparentFallback;
      }
      if (!doc && win.GetString) {
        doc = win.GetString("live.accounts.strings.general_module_loading");
      }
      name = name || $f.loadingType.spinning;
      s = s || "20px";
      val = val || s;
      size = size || "3px";
      value = value && value.toLowerCase() || "#666";
      doc = doc || "";
      var h;
      /** @type {string} */
      var icon = "c_spinningDots";
      /** @type {string} */
      var g = ($Config.imgsBase || "/images") + "/common/";
      if (name == $f.loadingType.flying) {
        /** @type {string} */
        icon = "c_flyingDots";
        /** @type {string} */
        h = "flyingdots.gif";
      } else {
        /** @type {string} */
        h = "spinner_";
        /** @type {string} */
        h = h + ("#fff" == value ? "white_" : "grey_");
        if ("60px" == s) {
          /** @type {string} */
          h = h + "120";
        } else {
          if ("30px" == s) {
            /** @type {string} */
            h = h + "60";
          } else {
            /** @type {string} */
            h = h + "40";
            if (title && "#fff" != value) {
              /** @type {string} */
              h = h + "_transparent";
            }
          }
        }
        /** @type {string} */
        h = h + ".gif";
      }
      /** @type {string} */
      var f = g + h;
      /** @type {!Element} */
      var search = document.createElement("div");
      jQuery(search).css({
        "width" : s,
        "height" : val,
        "font-size" : size
      });
      /** @type {string} */
      search.className = icon + " c_loadingDots c_dotsPlaying";
      var form;
      if ($B.IE && $B.V <= 9) {
        /** @type {string} */
        form = '<div class="c_loadingFallback"><img role="presentation" src="' + f + '" alt="' + doc.encodeHtml() + '" width="' + s + '" height="' + val + '" /></div>';
      } else {
        /** @type {string} */
        form = '<div class="c_loadingFallback" role="presentation" style="background-image:url(' + f + ");background-size:" + s + " " + val + '" alt="' + doc.encodeHtml() + '"></div>';
        /** @type {string} */
        form = form + '<div class="c_loadingTracks">';
        /** @type {number} */
        var b = 5;
        for (; b > 0; b--) {
          /** @type {string} */
          form = form + ('<div class="c_loadingTrack c_loadingTrack' + b + '"><div class="c_loadingDot" style="background-color:' + value + '"></div></div>');
        }
        /** @type {string} */
        form = form + "</div>";
      }
      /** @type {string} */
      search.innerHTML = form;
      var result = jQuery("<div></div>").append(search);
      if (name == $f.loadingType.flying && result.css({
        "width" : s
      }), html && result.append('<span class="c_loadingText">' + html.encodeHtml() + "</span>"), fn) {
        var query = jQuery("<span></span>").append(result);
        var C = query.html();
        return query.remove(), C;
      }
      return result[0];
    },
    "loadingType" : {
      "spinning" : 0,
      "flying" : 1
    },
    "hideLoading" : function(options) {
      options.hide();
      options.removeClass("c_dotsPlaying");
    },
    "showLoading" : function(options) {
      options.show();
      options.addClass("c_dotsPlaying");
    }
  };
  $Do.register("$f");
}(), function() {
  /**
   * @return {undefined}
   */
  function that() {
  }
  /**
   * @param {boolean} name
   * @return {?}
   */
  function push(name) {
    var listeners = self.Animations;
    return !listeners || that.$forcejQuery || name ? false : listeners.Enabled || false;
  }
  /**
   * @param {!Object} c
   * @param {boolean} n
   * @param {!Function} a
   * @return {undefined}
   */
  function callback(c, n, a) {
    if ($B.IE) {
      try {
        c[0].style.removeAttribute("filter");
      } catch (o) {
      }
    }
    cb(c, n, a);
  }
  /**
   * @param {!Object} obj
   * @param {boolean} v
   * @param {!Function} a
   * @return {undefined}
   */
  function cb(obj, v, a) {
    if (obj) {
      if (v) {
        obj.show();
        obj.css("opacity", "1");
      } else {
        obj.css("opacity", "0");
        obj.hide();
      }
    }
    if (a) {
      a();
    }
  }
  /**
   * @param {!Object} obj
   * @param {boolean} array
   * @param {!Function} a
   * @return {undefined}
   */
  function parse(obj, array, a) {
    setTimeout(function() {
      cb(obj, array, a);
    }, 0);
  }
  /**
   * @return {?}
   */
  function $() {
    var elementsOfClass = jQuery("#identityBanner");
    return elementsOfClass && elementsOfClass.length > 0 ? elementsOfClass : null;
  }
  /**
   * @return {?}
   */
  function whichAnimationEvent() {
    var currentAnimation;
    /** @type {!Element} */
    var content = document.createElement("div");
    var animations = {
      "animation" : "animationend",
      "OAnimation" : "oAnimationEnd",
      "MozAnimation" : "animationend",
      "WebkitAnimation" : "webkitAnimationEnd"
    };
    var name;
    for (name in animations) {
      if (void 0 !== content.style[name]) {
        return currentAnimation = animations[name], animations[name];
      }
    }
    return "";
  }
  /**
   * @param {boolean} table
   * @param {!Function} callback
   * @return {?}
   */
  function render(table, callback) {
    var wrapper = jQuery("#inner");
    if (wrapper.length > 0) {
      if (!table) {
        return void wrapper.removeClass("zero-opacity");
      }
      if (wrapper.hasClass("zero-opacity")) {
        wrapper.one(that.animationEndEventName, function() {
          wrapper.removeClass("zero-opacity");
          if (callback) {
            callback();
          }
        });
        wrapper.addClass("fade-in-lightbox");
      } else {
        if (callback) {
          callback();
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function gimmePrefix() {
    /** @type {boolean} */
    var prop = false;
    /** @type {!Array} */
    var domPrefixes = ["Webkit", "Moz", "O"];
    /** @type {!Element} */
    var elm = document.createElement("div");
    if (prop = void 0 !== elm.style.animationName, !prop) {
      /** @type {number} */
      var len = domPrefixes.length;
      /** @type {number} */
      var i = 0;
      for (; len > i; i++) {
        if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
          /** @type {boolean} */
          prop = true;
          break;
        }
      }
    }
    return prop;
  }
  /** @type {!Window} */
  var ns = window;
  var self = ns.wLive;
  var gmap = ns.$Config.WLXAccount;
  registerNamespace("wLive.Account");
  /** @type {function(): undefined} */
  self.Account.AnimationHelper = that;
  /** @type {boolean} */
  that.$forcejQuery = false;
  /** @type {boolean} */
  that.enabled = !(gmap.isXbox || gmap.isWin10 || gmap.isHolo || gmap.disableAnimations);
  that.isCSSAnimationSupported = gimmePrefix();
  that.convergedAnimationEnabled = gmap.Animation.showConvergedAnimation && that.isCSSAnimationSupported;
  that.animationEndEventName = whichAnimationEvent();
  /**
   * @param {?} view
   * @param {!Function} element
   * @param {boolean} to
   * @return {undefined}
   */
  that.fadeIn = function(view, element, to) {
    if (that.enabled) {
      if (push(to)) {
        self.Animations.fadeIn(view).then(function() {
          cb(view, true, element);
        });
      } else {
        view.fadeIn(100, function() {
          callback(view, true, element);
        });
      }
    } else {
      parse(view, true, element);
    }
  };
  /**
   * @param {!Object} view
   * @param {!Function} element
   * @param {boolean} d
   * @return {undefined}
   */
  that.fadeOut = function(view, element, d) {
    if (that.enabled) {
      if (push(d)) {
        self.Animations.fadeOut(view).then(function() {
          cb(view, false, element);
        });
      } else {
        view.fadeOut(100, function() {
          callback(view, false, element);
        });
      }
    } else {
      parse(view, false, element);
    }
  };
  /**
   * @param {!Object} el
   * @param {!Function} v
   * @param {!Object} c
   * @return {?}
   */
  that.enterContentOnNext = function(el, v, c) {
    if (!that.convergedAnimationEnabled) {
      return gmap.Animation.showConvergedAnimation && !that.isCSSAnimationSupported && render(false), void that.enterContent(el, v);
    }
    /** @type {null} */
    var div = null;
    var a = c.animate;
    var b = c.show;
    el.css("opacity", 0);
    if (a && b) {
      div = $();
      if (div) {
        div.css("opacity", 0);
      }
    }
    el.addClass(b ? "pagination-view has-identity-banner" : "pagination-view");
    /**
     * @return {undefined}
     */
    var view = function() {
      el.one(that.animationEndEventName, function() {
        if (a && b && div) {
          div.css("opacity", 1);
          div.removeClass("animate slide-in-next");
        }
        cb(el, true, v);
        el.removeClass("animate slide-in-next");
      });
      setTimeout(function() {
        if (a && b && div) {
          div.addClass("animate slide-in-next");
        }
        el.addClass("animate slide-in-next");
      }, 0);
    };
    render(true, view);
  };
  /**
   * @param {!Object} el
   * @param {!Function} v
   * @param {!Object} c
   * @return {?}
   */
  that.enterContentOnBack = function(el, v, c) {
    if (!that.convergedAnimationEnabled) {
      return void that.enterContent(el, v);
    }
    /** @type {null} */
    var div = null;
    var a = c.animate;
    var b = c.show;
    el.css("opacity", 0);
    if (a && b) {
      div = $();
      if (div) {
        div.css("opacity", 0);
      }
    }
    el.addClass(b ? "pagination-view has-identity-banner" : "pagination-view");
    el.one(that.animationEndEventName, function() {
      if (a && b && div) {
        div.css("opacity", 1);
        div.removeClass("animate slide-in-back");
      }
      cb(el, true, v);
      el.removeClass("animate slide-in-back");
    });
    setTimeout(function() {
      if (a && b && div) {
        div.addClass("animate slide-in-back");
      }
      el.addClass("animate slide-in-back");
    }, 0);
  };
  /**
   * @param {!Object} p
   * @param {!Function} r
   * @param {boolean} g
   * @return {undefined}
   */
  that.enterContent = function(p, r, g) {
    if (that.enabled) {
      if (push(g)) {
        self.Animations.enterContent(p).then(function() {
          cb(p, true, r);
        });
      } else {
        /** @type {string} */
        var dir = "left";
        /** @type {number} */
        var sdkPanelHeight = 40;
        if ($B && $B.rtl) {
          /** @type {string} */
          dir = "right";
          /** @type {number} */
          sdkPanelHeight = -40;
        }
        /** @type {string} */
        var n = (p.position(), "");
        var result = p.prop("style");
        if (result) {
          n = result[dir];
        }
        p.css(dir, "+=" + sdkPanelHeight + "px");
        p.css("opacity", "0.0");
        var css = {
          "opacity" : "1.0"
        };
        /** @type {string} */
        css[dir] = "-=" + sdkPanelHeight + "px";
        p.animate(css, 170, function() {
          p.css(dir, n);
          callback(p, true, r);
        });
      }
    } else {
      parse(p, true, r);
    }
  };
  /**
   * @param {!Object} el
   * @param {!Function} n
   * @param {!Object} o
   * @return {?}
   */
  that.exitContentOnBack = function(el, n, o) {
    if (!that.convergedAnimationEnabled) {
      return void that.exitContent(el, n);
    }
    var animate = o.animate;
    var vertical = o.show;
    if (el.addClass(vertical ? "pagination-view has-identity-banner" : "pagination-view"), el.one(that.animationEndEventName, function() {
      if (animate && vertical) {
        var $allPanels = $();
        if ($allPanels) {
          $allPanels.removeClass("animate slide-out-back");
        }
      }
      cb(el, false, n);
      el.removeClass("animate slide-out-back");
    }), animate && vertical) {
      var detailViewItem = $();
      if (detailViewItem) {
        detailViewItem.addClass("animate slide-out-back");
      }
    }
    el.addClass("animate slide-out-back");
  };
  /**
   * @param {!Object} el
   * @param {!Function} n
   * @param {!Object} o
   * @return {?}
   */
  that.exitContentOnNext = function(el, n, o) {
    if (!that.convergedAnimationEnabled) {
      return void that.exitContent(el, n);
    }
    var animate = o.animate;
    var vertical = o.show;
    if (el.addClass(vertical ? "pagination-view has-identity-banner" : "pagination-view"), el.one(that.animationEndEventName, function() {
      if (animate && vertical) {
        var $allPanels = $();
        if ($allPanels) {
          $allPanels.removeClass("animate slide-out-next");
        }
      }
      cb(el, false, n);
      el.removeClass("animate slide-out-next");
    }), animate && vertical) {
      var detailViewItem = $();
      if (detailViewItem) {
        detailViewItem.addClass("animate slide-out-next");
      }
    }
    el.addClass("animate slide-out-next");
  };
  /**
   * @param {!Object} p
   * @param {!Function} r
   * @param {boolean} g
   * @return {undefined}
   */
  that.exitContent = function(p, r, g) {
    if ($B.IE && 11 == $B.V && (g = true), that.enabled) {
      if (push(g)) {
        self.Animations.exitContent(p).then(function() {
          cb(p, false, r);
        });
      } else {
        /** @type {string} */
        var i = "left";
        /** @type {string} */
        var argData = "-=10px";
        if ($B && $B.rtl) {
          /** @type {string} */
          i = "right";
          /** @type {string} */
          argData = "+=10px";
        }
        /** @type {string} */
        var color = (p.position(), "");
        var box = p.prop("style");
        if (box) {
          color = box[i];
        }
        var args = {
          "opacity" : "0.0"
        };
        /** @type {string} */
        args[i] = argData;
        p.animate(args, 80, function() {
          p.css(i, color);
          callback(p, false, r);
        });
      }
    } else {
      parse(p, false, r);
    }
  };
  /**
   * @param {!Object} c
   * @param {!Function} type
   * @param {boolean} map
   * @return {undefined}
   */
  that.addToList = function(c, type, map) {
    if (that.enabled) {
      if (push(map)) {
        c.show();
        self.Animations.addToList(c).then(function() {
          cb(c, true, type);
        });
      } else {
        c.slideDown(100, function() {
          callback(c, true, type);
        });
      }
    } else {
      parse(c, true, type);
    }
  };
  /**
   * @param {!Object} a
   * @param {!Function} r
   * @param {boolean} g
   * @return {undefined}
   */
  that.deleteFromList = function(a, r, g) {
    if (that.enabled) {
      if (push(g)) {
        self.Animations.deleteFromList(a).then(function() {
          cb(a, false, r);
        });
      } else {
        a.slideUp(100, function() {
          callback(a, false, r);
        });
      }
    } else {
      parse(a, false, r);
    }
  };
  /**
   * @param {!Object} a
   * @param {!Function} r
   * @param {boolean} g
   * @return {undefined}
   */
  that.deleteFromListFast = function(a, r, g) {
    if (that.enabled) {
      if (push(g)) {
        self.Animations.deleteFromListFast(a).then(function() {
          cb(a, false, r);
        });
      } else {
        a.slideUp(50, function() {
          callback(a, false, r);
        });
      }
    } else {
      parse(a, false, r);
    }
  };
  /**
   * @param {!Object} a
   * @param {!Function} r
   * @param {boolean} p
   * @return {undefined}
   */
  that.expand = function(a, r, p) {
    if (that.enabled) {
      if (push(p)) {
        a.show();
        self.Animations.expand(a).then(function() {
          cb(a, true, r);
        });
      } else {
        a.slideDown(100, function() {
          callback(a, true, r);
        });
      }
    } else {
      parse(a, true, r);
    }
  };
  /**
   * @param {!Object} e
   * @param {!Function} context
   * @param {boolean} s
   * @return {undefined}
   */
  that.collapse = function(e, context, s) {
    if (that.enabled) {
      if (push(s)) {
        self.Animations.collapse(e).then(function() {
          cb(e, true, context);
        });
      } else {
        e.slideUp(100, function() {
          callback(e, true, context);
        });
      }
    } else {
      parse(e, true, context);
    }
  };
}(), function() {
  /**
   * @param {string} val
   * @return {?}
   */
  function validate(val) {
    if (!val) {
      return undefined;
    }
    if ("string" != typeof val || val.length < 5 || ":" != val.charAt(1)) {
      return invalid;
    }
    /** @type {string} */
    var index = val.charAt(0);
    return params[index] ? params[index] : undefined;
  }
  /** @type {!Window} */
  var o = window;
  var node = o.wLive;
  /** @type {number} */
  var undefined = 0;
  /** @type {number} */
  var entity = 1;
  /** @type {number} */
  var r = 2;
  /** @type {number} */
  var authz = 3;
  /** @type {number} */
  var value = 4;
  /** @type {number} */
  var iHour12 = 5;
  /** @type {number} */
  var fun_stack = 6;
  /** @type {number} */
  var gen_counter = 7;
  /** @type {number} */
  var mehcount = 8;
  /** @type {number} */
  var invalid = -1;
  var params = {
    "-" : undefined,
    "e" : entity,
    "a" : authz,
    "h" : iHour12,
    "r" : r,
    "v" : value,
    "s" : fun_stack,
    "i" : gen_counter,
    "c" : mehcount
  };
  registerNamespace("wLive.Account.TokenHelper");
  /** @type {function(string): ?} */
  node.Account.TokenHelper.getTokenType = validate;
  node.Account.TokenHelper.Types = {
    "none" : undefined,
    "hip" : iHour12,
    "email" : entity,
    "reset" : r,
    "authz" : authz,
    "recover" : value,
    "acsrInit" : gen_counter,
    "acsrSubmit" : mehcount,
    "invalid" : invalid
  };
}(), function() {
  /**
   * @param {string} text
   * @param {string} val
   * @return {?}
   */
  function scoreNextPageLinkCandidate(text, val) {
    /** @type {string} */
    var s = "&" + val.toLowerCase() + "=";
    var i = text.toLowerCase().indexOf(s);
    if (-1 == i && (s = "?" + val.toLowerCase() + "=", i = text.toLowerCase().indexOf(s), -1 == i)) {
      return null;
    }
    var pt = text.indexOf("&", i + 1);
    return -1 == pt && (pt = text.length), text.substring(i + s.length, pt);
  }
  /**
   * @param {string} s
   * @param {string} t
   * @param {string} value
   * @return {?}
   */
  function _getLargestImgObject(s, t, value) {
    if (!s) {
      return "";
    }
    /** @type {string} */
    var _ = "&" + t.toLowerCase() + "=";
    var i = s.toLowerCase().indexOf(_);
    if (-1 == i && (_ = "?" + t.toLowerCase() + "=", i = s.toLowerCase().indexOf(_), -1 == i)) {
      /** @type {string} */
      var x = "&";
      return -1 == s.indexOf("?") && (x = "?"), s + x + t + "=" + value;
    }
    var q = s.indexOf("&", i + 1);
    return -1 == q && (q = s.length), s.substring(0, i) + _ + value + s.substring(q);
  }
  /**
   * @param {?} url
   * @return {?}
   */
  function url_encode_rfc3986(url) {
    return encodeURIComponent(url).replace(/[!'()*]/g, function(strUtf8) {
      return "%" + strUtf8.charCodeAt(0).toString(16);
    });
  }
  /** @type {!Window} */
  var o = window;
  var node = o.wLive;
  registerNamespace("wLive.Account.UrlHelper");
  /** @type {function(string, string, string): ?} */
  node.Account.UrlHelper.SetQSValue = _getLargestImgObject;
  /** @type {function(string, string): ?} */
  node.Account.UrlHelper.GetQSValue = scoreNextPageLinkCandidate;
  /** @type {function(?): ?} */
  node.Account.UrlHelper.FixedEncodeURIComponent = url_encode_rfc3986;
}(), function() {
  /**
   * @return {undefined}
   */
  function characterWalker() {
    /**
     * @return {undefined}
     */
    function initMarginsPane() {
      item.on("unload" + len, function() {
        val();
      });
    }
    /**
     * @return {undefined}
     */
    function val() {
      window.$.triggerHandler(name);
      item.off(len);
      /** @type {null} */
      item = null;
      /** @type {null} */
      window = null;
    }
    var window = this;
    var item = jQuery(currentObject);
    window.$ = jQuery(window);
    initMarginsPane();
  }
  /** @type {!Window} */
  var currentObject = window;
  /** @type {string} */
  var name = "dispose";
  /** @type {string} */
  var len = ".pageEvents";
  characterWalker.prototype = {
    "next" : "onNext",
    "back" : "onBack",
    "dispose" : name,
    "setFocus" : "setFocus"
  };
  registerNamespace("wLive.Account");
  wLive.Account.PageEvents = new characterWalker;
}(), function() {
  /**
   * @param {!Object} main
   * @return {undefined}
   */
  function Painter(main) {
    /**
     * @return {undefined}
     */
    function _init() {
      file++;
    }
    /**
     * @param {?} id
     * @param {number} delay
     * @param {!Function} callback
     * @param {string} tags
     * @return {?}
     */
    function remove(id, delay, callback, tags) {
      /**
       * @return {undefined}
       */
      function end() {
        /** @type {number} */
        ids[id] = setTimeout(function() {
          callback();
          delete ids[id];
          if (tags && callbacks[id]) {
            callback = callbacks[id];
            delete callbacks[id];
            end();
          }
        }, delay);
      }
      return tags && ids[id] ? void(callbacks[id] = callback) : (ids[id] && (clearTimeout(ids[id]), delete ids[id]), void end());
    }
    /**
     * @param {?} i
     * @return {undefined}
     */
    function next(i) {
      if (ids[i]) {
        clearTimeout(ids[i]);
        delete ids[i];
      }
    }
    var dialog = this;
    /** @type {null} */
    var slide = null;
    /** @type {!Object} */
    var container = main;
    var _g1 = i.isXbox;
    /** @type {boolean} */
    var p = false;
    var options = _this.WIZARDUI;
    var ids = {};
    var callbacks = {};
    /**
     * @return {undefined}
     */
    dialog.dispose = function() {
      if (!p) {
        if (slide) {
          slide.empty();
          /** @type {null} */
          slide = null;
        }
        /** @type {boolean} */
        p = true;
      }
    };
    /**
     * @return {undefined}
     */
    dialog.showLoading = function() {
      remove("LoadingIndicatorControl$loading#" + file, 500, function() {
        if (!p) {
          if (_g1) {
            if (options && options.notReady) {
              options.notReady();
            }
          } else {
            if (container) {
              container.show();
              if (utils) {
                if (!slide) {
                  slide = jQuery(utils.createLoading(0, utils.loadingType.spinning, "25px", "25px"));
                  jQuery(".loadingSpinner", container).append(slide);
                }
                utils.showLoading(slide);
              }
            }
          }
        }
      });
    };
    /**
     * @param {!Object} callback
     * @return {undefined}
     */
    dialog.hideLoading = function(callback) {
      next("LoadingIndicatorControl$loading#" + file);
      if (!p) {
        if (_g1) {
          if (options && options.ready) {
            options.ready({
              "fKeyboardEnabled" : callback
            });
          }
        } else {
          if (container) {
            container.hide();
            if (utils && slide) {
              utils.hideLoading(slide);
            }
          }
        }
      }
    };
    _init();
  }
  /** @type {!Window} */
  var _this = window;
  var c = _this.wLive;
  var i = _this.$Config.WLXAccount;
  var utils = _this.$f;
  /** @type {number} */
  var file = 0;
  /** @type {boolean} */
  Painter.__class = true;
  registerNamespace("wLive.Account.Controls");
  /** @type {function(!Object): undefined} */
  c.Account.Controls.LoadingIndicatorControl = Painter;
}(), function() {
  /**
   * @param {?} $this
   * @param {!Array} option
   * @param {!Object} item
   * @return {undefined}
   */
  function init($this, option, item) {
    /**
     * @return {undefined}
     */
    function accountHandler() {
    }
    /**
     * @return {undefined}
     */
    function setData() {
      var orig_doc_title = options && options.pageTitle;
      if (orig_doc_title) {
        document.title = orig_doc_title;
        if (partialExtract && extract_what && extract_what.setHeaderText) {
          extract_what.setHeaderText(orig_doc_title);
        }
      }
    }
    /**
     * @return {undefined}
     */
    function updateContextButton() {
      var e = jQuery("#bannerBackButton");
      if (e.length > 0) {
        var scrollerOptions = options && options.showBannerBackButton;
        if (scrollerOptions) {
          e.show();
          hide(true);
        } else {
          e.hide();
          hide(false);
        }
      }
    }
    /**
     * @param {string} dynamic
     * @return {undefined}
     */
    function hide(dynamic) {
      var t = jQuery("#bannerBackButton");
      if (t.length > 0) {
        if (dynamic) {
          t.removeAttr("disabled");
        } else {
          t.attr("disabled", "disabled");
        }
      }
    }
    /**
     * @return {undefined}
     */
    function onCloseToastr() {
      var scrollerOptions = options && options.removeLeftNav;
      if (scrollerOptions) {
        jQuery(".LeftNav").hide();
        jQuery("body").removeClass("am_fxlnav");
      }
    }
    /**
     * @return {undefined}
     */
    function checkElement() {
      var name = options.sectionId;
      var data = options.annotations;
      if (name && data) {
        var $option = jQuery("#" + name, target);
        /** @type {number} */
        var l = 0;
        var llen = data.length;
        for (; llen > l; l++) {
          var a = data[l][0];
          var itemValue = data[l][1];
          if (a && itemValue) {
            $option.attr("data-" + a, itemValue);
          }
        }
      }
    }
    /**
     * @param {string} key
     * @return {?}
     */
    function $(key) {
      return obj && obj[key] ? errors[key] ? errors[key] : ("string" == typeof obj[key] ? (errors[key] = jQuery("#" + obj[key], el), Debug.trace("PageDialogControl.getButton [" + key + "(#" + obj[key] + ")] = " + errors[key].length)) : errors[key] = obj[key] instanceof jQuery ? obj[key] : jQuery(), errors[key]) : jQuery();
    }
    /**
     * @param {string} e
     * @return {undefined}
     */
    function set(e) {
      hide(e);
      if (e) {
        $("action").removeAttr("disabled");
        $("alternate").removeAttr("disabled");
        $("cancel").removeAttr("disabled");
      } else {
        $("action").attr("disabled", "disabled");
        $("alternate").attr("disabled", "disabled");
        $("cancel").attr("disabled", "disabled");
      }
      /** @type {string} */
      eventMark = e;
    }
    /**
     * @param {!Object} event
     * @return {?}
     */
    function run(event) {
      /** @type {string} */
      var eventType = "action";
      var key = jQuery(event.currentTarget).attr("id");
      if (key == prefix + id || key == prefix + id + value) {
        var el = jQuery(".default:visible", self);
        var l = el.length;
        /** @type {number} */
        var i = 0;
        for (; l > i; i++) {
          var id = jQuery(el[i]).attr("id");
          if (id == obj.action) {
            /** @type {string} */
            eventType = "action";
            break;
          }
          if (id == obj.alternate) {
            /** @type {string} */
            eventType = "alternate";
            break;
          }
          if (id == obj.cancel) {
            /** @type {string} */
            eventType = "cancel";
            break;
          }
          if (id == obj.skip) {
            /** @type {string} */
            eventType = "skip";
            break;
          }
        }
        return callback(event, eventType);
      }
    }
    /**
     * @param {!Object} evt
     * @param {(Object|string)} name
     * @return {?}
     */
    function callback(evt, name) {
      if (Debug.trace("PageDialogControl.buttonClick [" + name + "] enabled:[" + eventMark + "]"), eventMark) {
        var n = $(name);
        if (n.length > 0 && "disabled" == n.attr("disabled")) {
          return false;
        }
        /** @type {boolean} */
        var i = false;
        if ("action" == name && model && model.onExternalConfirm) {
          i = model.onExternalConfirm();
        } else {
          if ("cancel" == name && model && model.onExternalClose) {
            i = model.onExternalClose();
          }
        }
        if (!i) {
          editor.triggerHandler(type, {
            "actionName" : name,
            "control" : view,
            "viewModel" : model
          });
        }
      }
      return evt && (evt.preventDefault(), evt.stopPropagation()), false;
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function get(name) {
      if (obj && obj[name]) {
        var t = $(name);
        if (t.length > 0) {
          Debug.trace("PageDialogControl.on(Click) [" + name + "]");
          t.on("click" + _ + id, function(key) {
            return callback(key, name);
          });
        }
      }
      if (self && $Config.WLXAccount.isWin10InclusiveOOBE && "cancel" === name) {
        if (item.hasCancel) {
          self.showBackButton(true);
          self.handleBackButton(function() {
            return callback(null, name);
          });
        } else {
          self.showBackButton(false);
        }
      }
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function cb(name) {
      if (errors[name]) {
        Debug.trace("PageDialogControl.clearButton [" + name + "(#" + obj[name] + ")]");
        errors[name].off("click" + _ + id);
        delete errors[name];
      }
    }
    /**
     * @param {string} name
     * @return {undefined}
     */
    function next(name) {
      if (errors[name] && errors[name].length > 0 && "string" == typeof obj[name]) {
        var card = jQuery("#" + obj[name], el);
        Debug.assert(0 != card.length, "Html has been modified and removed the linked [" + name + "] button -- hook the onCreateContent event to alter the HTML");
        Debug.assert(card[0] === errors[name][0], "Html has been modified and has replaced the linked [" + name + "] button -- hook the onCreateContent event to alter the HTML");
      }
    }
    /**
     * @return {undefined}
     */
    function init() {
      if (get("action"), get("alternate"), get("revert"), get("cancel"), get("skip"), data && data.$ && (data.$.on(data.next + _ + id, function() {
        /** @type {string} */
        var mode = "action";
        if (options && options.pageNextAction && (mode = options.pageNextAction), model && model.wizardUIOnNext) {
          return void model.wizardUIOnNext();
        }
        var t = $(mode);
        if (t.length > 0) {
          if ("disabled" == t.attr("disabled")) {
            return;
          }
          callback(null, mode);
        } else {
          if (options && options.pageNextAction) {
            callback(null, mode);
          }
        }
      }), data.$.on(data.back + _ + id, function() {
        /** @type {string} */
        var tmp = "cancel";
        if (options && options.pageBackAction && (tmp = options.pageBackAction), model && model.wizardUIOnBack) {
          return void model.wizardUIOnBack();
        }
        var t = $(tmp);
        if (t.length > 0) {
          if ("disabled" == t.attr("disabled")) {
            return;
          }
          callback(null, tmp);
        } else {
          if (options && options.pageBackAction) {
            callback(null, tmp);
          }
        }
      })), db.Account.DialogManager) {
        var JSO = db.Account.DialogManager;
        JSO.$.on("action" + _ + id, function() {
          var type = options.pageNextAction || "action";
          callback(null, type);
        });
        JSO.$.on("cancel" + _ + id, function() {
          /** @type {boolean} */
          var e = false;
          if (model && model.onExternalClose) {
            e = model.onExternalClose();
          }
          if (!e) {
            view.dispose();
          }
        });
      }
      if (self) {
        self.on("submit" + _ + id, run);
      }
      if (dom) {
        dom.on("click" + _ + id, run);
      }
      var fn = options.viewModel;
      var ease = db.Account.ViewModels;
      if (ease && fn && sectionId) {
        var Signal;
        var callback = {
          "trigger" : function(a) {
            editor.triggerHandler(type, {
              "actionName" : a,
              "control" : view,
              "viewModel" : model
            });
          }
        };
        Signal = "function" == typeof fn ? fn : ease[fn];
        model = new Signal(value, options.viewModelOptions, callback);
        db.Account.viewModelHandle = model;
        ko.applyBindingsWithValidation(model, jQuery("#" + sectionId, target)[0], {
          "insertMessages" : false,
          "messagesOnModified" : true
        });
      }
      editor.triggerHandler(eventName, {
        "content" : el,
        "control" : view,
        "viewModel" : model
      });
    }
    /**
     * @return {undefined}
     */
    function close() {
      if (data && data.$) {
        data.$.off(_ + id);
      }
      if (db.Account.DialogManager) {
        db.Account.DialogManager.$.off(_ + id);
      }
      editor.triggerHandler(event, {
        "content" : el,
        "control" : view
      });
      cb("action");
      cb("alternate");
      cb("revert");
      cb("cancel");
      cb("skip");
      if (self) {
        self.off("submit" + _ + id);
      }
      if (dom) {
        dom.off("click" + _ + id);
      }
    }
    /**
     * @return {undefined}
     */
    function update() {
      if (next("action"), next("alternate"), next("revert"), next("cancel"), next("skip"), self && self.length > 0) {
        var parent = el;
        if (el !== self) {
          parent = jQuery("#" + prefix + id, el);
        }
        Debug.assert(0 != parent.length, "AutoForm has been removed -- hook the onCreateContent event to alter the HTML");
        Debug.assert(self[0] === parent[0], "AutoForm has been modified and has replaced -- hook the onCreateContent event to alter the HTML");
      }
      if (dom && dom.length > 0) {
        var card = jQuery("input[type=submit]", el);
        Debug.assert(0 != card.length, "AutoFormSubmit button has been removed -- hook the onCreateContent event to alter the HTML");
        Debug.assert(dom[0] === card[0], "AutoFormSubmit button has been modified and has replaced -- hook the onCreateContent event to alter the HTML");
      }
    }
    /**
     * @param {number} object
     * @param {string} fn
     * @return {?}
     */
    function extend(object, fn) {
      var vals = fn.split(".");
      var i = vals.length;
      /** @type {number} */
      var index = 0;
      for (; i > index && null !== object && void 0 !== object;) {
        object = object[vals[index++]];
      }
      return object;
    }
    /**
     * @param {string} data
     * @param {string} val
     * @param {?} ctx
     * @return {?}
     */
    function transform(data, val, ctx) {
      return data.indexOf(val) > -1 && (data = data.replace(val, ctx)), data;
    }
    /**
     * @param {string} data
     * @return {?}
     */
    function resolve(data) {
      return options.getViewContextTokenValue ? options.getViewContextTokenValue(value, data) : extend(value, data);
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    function listener(selector) {
      if (!it) {
        return false;
      }
      var elms = jQuery("form", selector);
      if (elms.length > 0) {
        return false;
      }
      var currentTarget = jQuery(":input", selector);
      return 0 == currentTarget.length ? false : true;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    function notify(options) {
      if (listener(options)) {
        if (self = jQuery("<form id='" + prefix + id + "' action='#' onsubmit='return false;' novalidate='novalidate' " + preview_tutorial() + "></form>"), self.append(options), 0 == jQuery("input[type=submit]", options).length) {
          var t = jQuery("<input aria-hidden='true' id='" + prefix + id + value + "' type='submit' tabindex='-1' style='position: absolute; height: 0px; width: 0px; border: none; padding: 0px; min-width: 0px; min-height: 0px;' />");
          self.append(t);
        }
        return dom = jQuery("input[type=submit]", options), self;
      }
      return options;
    }
    /**
     * @return {?}
     */
    function preview_tutorial() {
      /** @type {string} */
      var m = "";
      return r.supportsUnifiedHeader && (m = options && options.pageTitle ? "aria-label='" + options.pageTitle + "'" : "aria-labelledby='iPageTitle DialogUserTitle'"), m;
    }
    /**
     * @return {?}
     */
    function success() {
      var element = jQuery(options.viewTemplate).clone();
      var args = options.viewContextTokens;
      if (args && args.length > 0) {
        var value = element.html();
        /** @type {number} */
        var i = 0;
        for (; i < args.length; i++) {
          var data = args[i];
          var filename = resolve(data);
          if (void 0 !== filename && null !== filename) {
            value = transform(value, "{" + data + "}", jQuery("<span />").text(filename).html());
          }
        }
        element.html(value);
      }
      return self && ($Config.WLXAccount.isWin10 || $Config.WLXAccount.isHolo) && self.getContext(function(t) {
        var d = t.host ? t.host.toUpperCase() : "";
        /** @type {boolean} */
        var currentFileOpen = d === self.Hosts.OOBE || d === self.Hosts.NthUserFirstLogon || d === self.Hosts.SSCRPINReset;
        jQuery(".icon-win-easeOfAccess", element).toggle(currentFileOpen);
      }), editor.triggerHandler(property, {
        "content" : element,
        "control" : view
      }), notify(element);
    }
    /**
     * @return {undefined}
     */
    function create() {
      if (options.focusErrorElemId) {
        setTimeout(function() {
          jQuery("#" + options.focusErrorElemId, el).first().focus();
          /** @type {null} */
          options.focusErrorElemId = null;
        }, 10);
      } else {
        if (options.focusFirstButton) {
          setTimeout(function() {
            el.find(":button").first().focus();
          }, 10);
        } else {
          if (options.focusFirstInput) {
            setTimeout(function() {
              var e = jQuery("input,select", el).not(":hidden").first();
              if (0 == e.length) {
                e = jQuery("a,button,input[type=button]", el).not(":hidden").first();
              }
              e.focus();
            }, oldDepends ? 255 : 10);
          } else {
            if (options.focusSubmit) {
              setTimeout(function() {
                el.find("input[type=submit]").not(":hidden").first().focus();
              }, 10);
            } else {
              if (options.focusFirstElemId) {
                setTimeout(function() {
                  jQuery("#" + options.focusElemId, el).first().focus();
                }, 10);
              } else {
                if (!options.disableAutoFocus) {
                  setTimeout(function() {
                    /** @type {number} */
                    var i = 0;
                    /** @type {number} */
                    var length = items.length;
                    for (; length > i; i++) {
                      var tokQue = jQuery(items[i], el).not(":hidden");
                      if (tokQue.length > 0) {
                        tokQue.first().focus();
                        break;
                      }
                    }
                  }, oldDepends ? 255 : 10);
                }
              }
            }
          }
        }
      }
    }
    var view = this;
    var editor = view.$ = jQuery(view);
    /** @type {boolean} */
    var X = false;
    /** @type {boolean} */
    var J = false;
    var target = $this;
    var options = item;
    /** @type {null} */
    var el = null;
    var value = option;
    var obj = item.buttons;
    /** @type {boolean} */
    var eventMark = true;
    /** @type {boolean} */
    var it = item.autoForm !== false && 0 !== item.autoForm && "False" !== item.autoForm;
    var errors = {};
    var successProbability = r.isWinWab;
    var partialExtract = r.isWinWiz;
    /** @type {number} */
    var id = (r.isXbox, r.isWPBlue, v++);
    /** @type {null} */
    var self = null;
    /** @type {null} */
    var dom = null;
    /** @type {null} */
    var model = null;
    var sectionId = item.sectionId;
    var oldDepends = oldPackageJson.convergedAnimationEnabled;
    var extract_what = global.WIZARDUI;
    /**
     * @return {undefined}
     */
    view.notifyVisible = function() {
      if (model && model.onNotifyVisible) {
        model.onNotifyVisible();
      }
    };
    /**
     * @return {?}
     */
    view.content = function() {
      return el;
    };
    /**
     * @return {undefined}
     */
    view.show = function() {
      Debug.trace("PageDialogControl.show()");
      if (!el) {
        el = success();
      }
      if (!J) {
        target.append(el);
        /** @type {boolean} */
        J = true;
      }
      checkElement();
      setData();
      updateContextButton();
      init();
      el.show();
      if (successProbability) {
        jQuery("form").parents("div").css("height", "100%");
        if ("undefined" != typeof setContentWidth) {
          setContentWidth();
        }
      }
      editor.triggerHandler(shown, {
        "content" : el,
        "control" : view
      });
      create();
      onCloseToastr();
      update();
      Debug.trace("PageDialogControl.~show()");
    };
    /**
     * @return {undefined}
     */
    view.hide = function() {
      Debug.trace("PageDialogControl.hide()");
      el.hide();
      editor.triggerHandler(zoomOut, {
        "content" : el,
        "control" : view
      });
      close();
      el.detach();
      /** @type {boolean} */
      J = false;
    };
    /**
     * @param {string} value
     * @return {undefined}
     */
    view.setEnabled = function(value) {
      Debug.trace("PageDialogControl.setEnabled(" + value + ")");
      set(value);
    };
    /** @type {function(string): ?} */
    view.getButton = $;
    /**
     * @return {undefined}
     */
    view.dispose = function() {
      Debug.trace("PageDialogControl.dispose()");
      if (!X) {
        editor.triggerHandler(name, {
          "control" : view
        });
        close();
        el.empty();
        if (J) {
          el.remove();
        }
        /** @type {null} */
        el = null;
        /** @type {boolean} */
        X = true;
        /** @type {null} */
        view.$ = null;
      }
      /** @type {null} */
      view = null;
      /** @type {null} */
      editor = null;
      /** @type {null} */
      obj = null;
      /** @type {null} */
      errors = null;
      /** @type {null} */
      target = null;
      /** @type {null} */
      options = null;
      /** @type {null} */
      option = null;
      /** @type {null} */
      item = null;
    };
    accountHandler();
  }
  /** @type {!Window} */
  var global = window;
  var db = global.wLive;
  var ko = global.ko;
  var data = db.Account.PageEvents;
  var self = global.MSA && global.MSA.CXH;
  var r = global.$Config.WLXAccount;
  var oldPackageJson = db.Account.AnimationHelper;
  var Debug = global.$Debug;
  /** @type {string} */
  var type = "onAction";
  /** @type {string} */
  var shown = "onShow";
  /** @type {string} */
  var zoomOut = "onHide";
  /** @type {string} */
  var eventName = "onSetupEvents";
  /** @type {string} */
  var event = "onRemoveEvents";
  /** @type {string} */
  var property = "onCreateContent";
  /** @type {string} */
  var name = "onDispose";
  /** @type {number} */
  var v = 0;
  /** @type {string} */
  var _ = ".pagedialog";
  /** @type {string} */
  var prefix = "pageDialogForm_";
  /** @type {string} */
  var value = "_submit";
  /** @type {!Array} */
  var items = ["[autofocus]", "[autofocus=autofocus]", "[autofocus=true]", "input", "button", "a", "select", "textarea"];
  init.prototype.events = {
    "action" : type,
    "createContent" : property,
    "show" : shown,
    "hide" : zoomOut,
    "setupEvents" : eventName,
    "removeEvents" : event,
    "dispose" : name
  };
  /** @type {boolean} */
  init.__class = true;
  registerNamespace("wLive.Account.Controls");
  /** @type {function(?, !Array, !Object): undefined} */
  db.Account.Controls.PageDialogControl = init;
}(), function() {
  /**
   * @param {?} e
   * @param {?} argv
   * @param {!Object} context
   * @return {undefined}
   */
  function init(e, argv, context) {
    /**
     * @return {undefined}
     */
    function accountHandler() {
    }
    /**
     * @param {string} index
     * @return {?}
     */
    function success(index) {
      var $taskBar;
      var options = args[index];
      return $taskBar = $(options.template ? options.template : context.defaultTemplate ? context.defaultTemplate : "<div></div>"), $taskBar.hide(), $taskBar;
    }
    /**
     * @param {string} event
     * @param {string} a
     * @return {?}
     */
    function wrapper(event, a) {
      var n;
      var arg = args[a];
      return new (n = "function" == typeof arg.control ? arg.control : state[arg.control])(event, options, arg.options);
    }
    /**
     * @param {!Object} n
     * @param {string} name
     * @return {undefined}
     */
    function load(n, name) {
      console.trace("FlowController.notifyVisible [" + name + "]");
      if (!err && n && n[N_]) {
        n[N_]();
      }
      P(n, true);
      assert.triggerHandler(event, {
        "controller" : control,
        "control" : n,
        "state" : name,
        "viewContext" : options
      });
    }
    /**
     * @param {?} value
     * @param {?} type
     * @param {!NodeList} n
     * @param {!Object} context
     * @return {?}
     */
    function get(value, type, n, context) {
      if (context[name] && !context[name](value)) {
        return null;
      }
      if ($.isFunction(n)) {
        return n();
      }
      if (element[method]) {
        var o = element[method](type, n, options, value);
        if (o) {
          if ($.isArray(n)) {
            /** @type {number} */
            var i = 0;
            for (; i < n.length; i++) {
              if (n[i] === o) {
                return o;
              }
            }
          } else {
            if (o === n) {
              return o;
            }
          }
        }
        return null;
      }
      return n;
    }
    /**
     * @param {!Object} e
     * @param {boolean} a
     * @return {undefined}
     */
    function P(e, a) {
      if (e && e[stack]) {
        e[stack](a);
      }
    }
    /**
     * @param {string} object
     * @param {!Object} result
     * @param {string} i
     * @param {!Object} data
     * @param {boolean} err
     * @param {boolean} callback
     * @param {string} event
     * @return {undefined}
     */
    function fn(object, result, i, data, err, callback, event) {
      if (!err && result === object) {
        $mnu.append(object);
        self = $(result);
        console.trace("Hooking control events for [" + i + "]");
        var data = result.events;
        var prop;
        for (prop in data) {
          var eventName = data[prop];
          self.on(eventName, {
            "eventName" : eventName,
            "state" : i,
            "control" : result
          }, callback);
        }
        self.on(result.events.action, {
          "state" : i,
          "control" : result
        }, init);
        /** @type {string} */
        top = object;
        object.show();
        result.show();
        /**
         * @return {undefined}
         */
        var callback = function() {
          if (object.show(), value === result && load(result, i), data.pageId) {
            var App = {
              "pageId" : data.pageId,
              "userAction" : data.userAction
            };
            if ($ReportEvent.SetCustomPageLoadCompletedTime((new Date).getTime()), $ReportEvent.PageLoadCompleted(), $ReportEvent.Fire(App), "undefined" != typeof UserTracker && "function" == typeof UserTracker.notifyDOMUpdate) {
              try {
                UserTracker.notifyDOMUpdate();
              } catch (o) {
              }
            }
            global.$Config.hpgid = data.pageId;
          }
        };
        if (err) {
          var showlist = data.options && 1 === data.options.showIdentityBanner;
          var defaults = {
            "animate" : event,
            "show" : showlist
          };
          if (callback) {
            _.enterContentOnBack(object, callback, defaults);
          } else {
            _.enterContentOnNext(object, callback, defaults);
          }
        } else {
          callback();
        }
        assert.triggerHandler(eventName, {
          "controller" : control,
          "activeState" : i,
          "control" : result,
          "container" : object,
          "viewContext" : options
        });
      }
    }
    /**
     * @return {undefined}
     */
    function filter_banlist() {
      /** @type {!Array} */
      data = [];
    }
    /**
     * @param {?} acc
     * @param {?} _
     * @return {undefined}
     */
    function update(acc, _) {
      if (!acc.skipBackStack) {
        if (data.length > 0 && data[0] != _) {
          /** @type {number} */
          var index = 0;
          for (; index < data.length; index++) {
            if (data[index] == _) {
              data = data.slice(0, index);
              break;
            }
          }
        }
        data.push(_);
      }
    }
    /**
     * @param {?} value
     * @return {undefined}
     */
    function attr(value) {
      if (data.length > 0) {
        /** @type {number} */
        var index = data.length - 1;
        for (; index >= 0; index--) {
          if (data[index] == value) {
            data = data.slice(0, index);
            break;
          }
        }
      }
    }
    /**
     * @param {string} type
     * @param {number} fields
     * @return {?}
     */
    function format(type, fields) {
      if (data.length > 0) {
        console.trace("FlowController.getBackState(" + type + ", " + fields + ") -- " + data);
        /** @type {number} */
        var fifth = data.length - 1;
        for (; fifth >= 0; fifth--) {
          var name = data[fifth];
          if (name != type && name) {
            if ($.isArray(fields)) {
              /** @type {number} */
              var i = 0;
              for (; i < fields.length; i++) {
                if (fields[i] == name) {
                  return name;
                }
              }
            } else {
              if (name == fields) {
                return name;
              }
            }
          }
        }
      }
      return null;
    }
    /**
     * @param {string} name
     * @param {boolean} mode
     * @param {boolean} callback
     * @return {?}
     */
    function done(name, mode, callback) {
      if (!err) {
        if (console.trace("FlowController.showControl(" + name + ")"), i != name && args[name]) {
          console.trace("New State [" + name + "] from [" + i + "]");
          assert.triggerHandler(data, {
            "control" : control,
            "activeState" : i,
            "newState" : name,
            "viewContext" : options
          });
          var item = args[name];
          var url = item.url;
          var param = item.target;
          var title = item.cancelUrl;
          var entity = item.triggerAction;
          if (url) {
            return console.trace("Navigate to [" + url + "]"), assert.triggerHandler(e2, {
              "control" : control,
              "url" : url,
              "viewContext" : options
            }), void(title ? ((keysChanged || connectionChanged) && keys ? keys.openExternalWebBrowser(url) : param && $Utility.navigateTo(url, param), $Utility.navigateTo(title)) : $Utility.navigateTo(url));
          }
          if (entity) {
            return console.trace("Trigger action [" + entity + "]"), void assert.triggerHandler(type, {
              "actionName" : entity,
              "control" : control
            });
          }
          var target = result;
          var image = value;
          var el = self;
          var c = i;
          var e = success(name);
          var n = wrapper(e, name);
          if (result = e, value = n, self = null, el && (console.trace("Clearing action event for [" + c + "]"), el.off(image.events.action, init)), image && image.prepareDispose && image.prepareDispose(), i = name, item.clearBackStack && filter_banlist(), update(item, i), target && top === target) {
            /** @type {boolean} */
            var type = args[c].options.showIdentityBanner !== item.options.showIdentityBanner;
            /**
             * @return {undefined}
             */
            var stop = function() {
              if (target.hide(), image) {
                if (image.hide) {
                  image.hide();
                }
                console.trace("Clearing control hooked events [" + c + "]");
                var data = $(image);
                var key;
                for (key in n.events) {
                  data.off(key, callback);
                }
                /** @type {null} */
                data = null;
                image.dispose();
                delete image;
              }
              target.empty();
              target.remove();
              /** @type {null} */
              target = null;
              delete target;
              fn(e, n, name, item, true, callback, type);
            };
            var showlist = args[c].options && 1 === args[c].options.showIdentityBanner;
            var defaults = {
              "animate" : type,
              "show" : showlist
            };
            if (callback) {
              _.exitContentOnBack(target, stop, defaults);
            } else {
              _.exitContentOnNext(target, stop, defaults);
            }
          } else {
            /** @type {boolean} */
            var y = true;
            if (mode && accContext.animateInitial === false) {
              /** @type {boolean} */
              y = false;
            }
            fn(e, n, name, item, y, callback, mode);
          }
        } else {
          console.assert(args[name], "Undefined state [" + name + "] -- re-enabling existing control");
          if (i == name) {
            console.trace("Same state re-enabling the control [" + name + "]");
          }
          P(value, true);
        }
      }
    }
    /**
     * @param {!Object} e
     * @param {?} type
     * @return {?}
     */
    function add(e, type) {
      return {
        "controller" : control,
        "state" : e.state,
        "control" : e.control,
        "controlData" : type,
        "viewContext" : options
      };
    }
    /**
     * @param {!Object} s
     * @param {?} h
     * @return {?}
     */
    function callback(s, h) {
      var p = s.data;
      console.trace("FlowController.handleControlEvent [" + p.eventName + "] for [" + p.state + "]");
      var d = add(p, h);
      return assert.triggerHandler(p.eventName + "$Control", d), true;
    }
    /**
     * @param {!Object} polygon
     * @param {!Object} options
     * @return {?}
     */
    function init(polygon, options) {
      var type = options.actionName;
      var context = options.control;
      var m = polygon.data;
      var value = m.state;
      var config = args[value].actions;
      var data = config[type];
      /** @type {boolean} */
      var uid = false;
      if (("cancel" == type || "backStack" == type) && (uid = true), console.trace("FlowController.processActionEvent[" + type + "] for [" + value + "]"), console.assert(value == i, "processAction state mismatch ev:[" + value + "] act:[" + i + "]"), value == i) {
        /** @type {boolean} */
        var config = false;
        if ("backStack" == type) {
          var msg = format(value, data);
          if (msg) {
            data = msg;
            /** @type {boolean} */
            config = true;
          }
        }
        data = get(type, value, data, context);
        var x = data;
        if (data && $.isArray(data) && (x = data[0]), console.trace("FlowController.processActionEvent newState [" + x + "]"), x) {
          if (args[x]) {
            return config && attr(x), P(context, false), done(x, false, uid), true;
          }
          console.fail("Invalid State [" + x + "] from [" + value + "] action [" + type + "]");
        }
      }
      return done(i, false, uid), false;
    }
    var control = this;
    var assert = control.$ = $(control);
    /** @type {boolean} */
    var err = false;
    var $mnu = $(e);
    /** @type {string} */
    var i = n;
    /** @type {null} */
    var result = null;
    /** @type {null} */
    var value = null;
    /** @type {null} */
    var self = null;
    /** @type {null} */
    var top = null;
    var options = argv;
    var args = context.viewDefs;
    /** @type {!Object} */
    var accContext = context;
    var element = context.callbacks || {};
    /** @type {!Array} */
    var data = [];
    var keysChanged = global.$Config.WLXAccount.isWin10;
    var connectionChanged = global.$Config.WLXAccount.isHolo;
    /**
     * @param {string} input
     * @return {undefined}
     */
    control.show = function(input) {
      done(input, true);
      assert.triggerHandler(status, {
        "control" : control,
        "viewContext" : options
      });
    };
    /**
     * @param {!Function} value
     * @return {undefined}
     */
    control.setStateChangeFunc = function(value) {
      /** @type {!Function} */
      element[method] = value;
    };
    /**
     * @return {undefined}
     */
    control.dispose = function() {
      if (!err) {
        if (i = n, value) {
          if (null != self) {
            console.trace("Clearing control events [" + i + "]");
            self.off(value.events.action, init);
            var type;
            for (type in value.events) {
              self.off(type, callback);
            }
            /** @type {null} */
            self = null;
          }
          value.dispose();
        }
        /** @type {null} */
        value = null;
        if (result) {
          result.empty();
        }
        /** @type {null} */
        result = null;
        assert.triggerHandler(eventType, {
          "control" : control,
          "viewContext" : options
        });
        /** @type {boolean} */
        err = true;
        /** @type {null} */
        control.$ = null;
      }
      /** @type {null} */
      assert = null;
      /** @type {null} */
      control = null;
      /** @type {boolean} */
      err = true;
      if ($mnu) {
        $mnu.empty();
      }
      /** @type {null} */
      $mnu = null;
      /** @type {null} */
      options = null;
      /** @type {null} */
      args = null;
      /** @type {null} */
      accContext = null;
    };
    accountHandler();
  }
  /** @type {!Window} */
  var global = window;
  var db = global.wLive;
  var $ = global.jQuery;
  var _ = db.Account.AnimationHelper;
  var state = db.Account.Controls;
  var keys = global.MSA && global.MSA.CXH;
  var console = global.$Debug;
  /** @type {string} */
  var n = "none";
  /** @type {string} */
  var event = "onControlVisible";
  /** @type {string} */
  var type = "onAction";
  /** @type {string} */
  var status = "onShow";
  /** @type {string} */
  var e2 = "onNavigate";
  /** @type {string} */
  var data = "onStateChanging";
  /** @type {string} */
  var eventName = "onStateChanged";
  /** @type {string} */
  var eventType = "onDispose";
  /** @type {string} */
  var stack = "setEnabled";
  /** @type {string} */
  var name = "validate";
  /** @type {string} */
  var N_ = "notifyVisible";
  /** @type {string} */
  var method = "validateStateChange";
  init.prototype.events = {
    "action" : type,
    "show" : status,
    "stateChanged" : eventName,
    "stateChanging" : data,
    "controlVisible" : event,
    "dispose" : eventType
  };
  /** @type {boolean} */
  init.__class = true;
  registerNamespace("wLive.Account.Controls");
  /** @type {function(?, ?, !Object): undefined} */
  db.Account.Controls.FlowController = init;
}(), function() {
  /**
   * @param {?} scene
   * @param {string} dataSource
   * @param {?} dataExpressions
   * @return {undefined}
   */
  function ctor(scene, dataSource, dataExpressions) {
    /**
     * @return {undefined}
     */
    function getCtorName() {
    }
    var window = this;
    var options = (window.$ = jQuery(window), dataExpressions);
    /** @type {string} */
    var mu = dataSource;
    var dims = mu.data;
    var data = options.params;
    /**
     * @return {undefined}
     */
    window.show = function() {
      var table = jQuery(options.viewTemplate).clone();
      var i = options.formId;
      var doc = jQuery("#" + i, table);
      /** @type {number} */
      var _i = 0;
      var _len = data.length;
      for (; _len > _i; _i++) {
        var i = data[_i];
        jQuery("#" + i, doc).val(dims[i]);
      }
      scene.append(table);
      document.forms[i].submit();
    };
    getCtorName();
  }
  /** @type {!Window} */
  var result = window;
  var r2 = result.wLive;
  /** @type {string} */
  var showlist = "onShow";
  ctor.prototype.events = {
    "show" : showlist
  };
  /** @type {boolean} */
  ctor.__class = true;
  registerNamespace("wLive.Account.Controls");
  /** @type {function(?, string, ?): undefined} */
  r2.Account.Controls.RedirectionControl = ctor;
}(), function() {
  /**
   * @param {?} line
   * @param {string} type
   * @param {string} name
   * @return {undefined}
   */
  function init(line, type, name) {
    /**
     * @return {undefined}
     */
    function accountHandler() {
    }
    /**
     * @param {string} e
     * @return {?}
     */
    function exit(e) {
      if (e && a[e]) {
        return GetString("live.accounts.strings." + a[e]);
      }
      var windowTitle = GetString(headIndent + e);
      return windowTitle || (windowTitle = GetString("live.accounts.strings." + e)), windowTitle || (windowTitle = GetString("live.accounts.strings." + w)), windowTitle;
    }
    /**
     * @return {?}
     */
    function log() {
      return {
        "control" : obj,
        "viewContext" : t,
        "pollAttempts" : G,
        "numErrors" : q
      };
    }
    /**
     * @param {boolean} isRefresh
     * @return {undefined}
     */
    function callback(isRefresh) {
      if (!B) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          /** @type {null} */
          timeoutId = null;
        }
        /** @type {number} */
        var minz = (new Date).getTime();
        if (q >= segmentCount || minz > z) {
          if (dialog) {
            dialog.hideLoading();
          }
          $this.triggerHandler(value, log());
        } else {
          if (isRefresh) {
            var mousepos = log();
            /** @type {boolean} */
            mousepos.sendPollingRequest = true;
            $this.triggerHandler(eventType, mousepos);
            if (mousepos.sendPollingRequest) {
              /** @type {number} */
              timeoutId = setTimeout(f, msPerFrame);
            }
          } else {
            if (U) {
              /** @type {number} */
              timeoutId = setTimeout(f, msPerFrame);
            } else {
              if (dialog) {
                dialog.hideLoading();
              }
              $this.triggerHandler(BLURRED, log());
            }
          }
        }
      }
    }
    /**
     * @return {undefined}
     */
    function render() {
      if (!B) {
        /** @type {number} */
        var e = 0;
        /** @type {number} */
        var t = 0;
        if (null != parent) {
          e = parent.height();
          t = parent.width();
        }
        if (2 == e) {
          if (dialog) {
            dialog.hideLoading();
          }
          if (1 == t) {
            $this.triggerHandler(data, log());
          } else {
            $this.triggerHandler(CHANGE, log());
          }
        } else {
          if (1 != t) {
            q++;
          }
          callback(false);
        }
        if (null != parent) {
          parent.empty();
          parent.remove();
          /** @type {null} */
          parent = null;
        }
      }
    }
    /**
     * @return {undefined}
     */
    function P() {
      if (!B) {
        q++;
        callback(false);
        if (null != parent) {
          parent.empty();
          parent.remove();
          /** @type {null} */
          parent = null;
        }
      }
    }
    /**
     * @return {undefined}
     */
    function f() {
      if (!B) {
        /** @type {null} */
        timeoutId = null;
        /** @type {number} */
        var otpUrl = (new Date).getTime();
        if (null != parent) {
          parent.empty();
          /** @type {null} */
          parent = null;
        }
        parent = $("<img />").attr({
          "id" : "iSessionPollingImg",
          "style" : "display: none"
        });
        parent.load(render);
        parent.error(P);
        /** @type {string} */
        var _ = "?slk";
        if (k.indexOf("?") > -1) {
          /** @type {string} */
          _ = "&slk=";
        }
        parent.attr("src", k + _ + encodeURIComponent(n) + "&pa=" + encodeURIComponent(otpUrl));
        $("body").append(parent);
        G++;
        $this.triggerHandler(eventName, log());
      }
    }
    /**
     * @param {?} e
     * @return {undefined}
     */
    function keydownListener(e) {
      if (!B) {
        n = e.sessionLookupKey;
        if (t) {
          t.sessionLookupKey = n;
        }
        $this.triggerHandler(FOCUSED, log());
        callback(true);
      }
    }
    /**
     * @param {!Object} $
     * @return {?}
     */
    function sendcheck($) {
      if (!B) {
        if (n = null, t && delete t.sessionLookupKey, $.error && $.error.code == name) {
          return void $this.triggerHandler(data, log());
        }
        t.pollingError = errorMessage = exit(String($.error.code));
        $this.triggerHandler(event, log());
        if (R) {
          callback(true);
        }
      }
    }
    /**
     * @return {undefined}
     */
    function next() {
      if (!B) {
        /** @type {number} */
        var x = (new Date).getTime();
        if (z = x + PIO2_1, q = 0, G = 0, j) {
          var link = $(".loadingArea", line);
          if (0 == link.length) {
            link = $(".waitingArea", line);
          }
          dialog = new Comm.LoadingIndicatorControl(link);
          dialog.showLoading();
        }
        if (W) {
          var requiredArgs = {
            "channel" : "PushNotifications",
            "purpose" : purpose
          };
          context.$DataRequest.Json(null, r.sendOtt, requiredArgs, keydownListener, sendcheck, 1e4);
        } else {
          callback(true);
        }
      }
    }
    var obj = this;
    var $this = obj.$ = $(obj);
    /** @type {boolean} */
    var B = false;
    /** @type {string} */
    var options = name;
    var t = type || {};
    var segmentCount = options.maxErrors || scope.polling.maxErrors;
    var PIO2_1 = options.timeout || scope.polling.timeout;
    var U = void 0 !== scope.polling.enabled ? scope.polling.enabled : true;
    var msPerFrame = U ? options.pollInterval || scope.polling.interval : 0;
    var k = options.approvalUrl || scope.url;
    var purpose = options.ottPurpose || scope.ottPurpose;
    var R = void 0 !== options.pollOnSendError ? options.pollOnSendError : true;
    var j = void 0 !== options.showLoading ? options.showLoading : true;
    var W = void 0 !== options.sendNotification ? options.sendNotification : true;
    /** @type {null} */
    var dialog = null;
    /** @type {number} */
    var q = 0;
    /** @type {number} */
    var G = 0;
    /** @type {null} */
    var z = null;
    /** @type {null} */
    var timeoutId = null;
    var n = scope.lookupKey;
    /** @type {null} */
    var parent = null;
    /**
     * @return {undefined}
     */
    obj.forcePollRequest = function() {
      callback(true);
    };
    /**
     * @return {undefined}
     */
    obj.show = function() {
      next();
    };
    /**
     * @return {undefined}
     */
    obj.dispose = function() {
      if (!B) {
        if ($this.triggerHandler(EVENT_CLICK, log()), timeoutId && (clearTimeout(timeoutId), timeoutId = null), dialog && dialog.dispose(), dialog = null, null != parent && (parent.empty(), parent.remove(), parent = null), obj && obj.$) {
          var prop;
          for (prop in obj.events) {
            obj.$.off(prop);
          }
          /** @type {null} */
          $this = obj.$ = null;
        }
        /** @type {null} */
        obj = null;
        /** @type {null} */
        options = null;
        /** @type {null} */
        t = null;
        /** @type {null} */
        segmentCount = null;
        /** @type {null} */
        PIO2_1 = null;
        /** @type {null} */
        U = null;
        /** @type {null} */
        msPerFrame = null;
        /** @type {null} */
        k = null;
        /** @type {null} */
        purpose = null;
        /** @type {boolean} */
        R = false;
        /** @type {boolean} */
        j = false;
        /** @type {null} */
        z = null;
        /** @type {null} */
        n = null;
        /** @type {boolean} */
        B = true;
      }
    };
    accountHandler();
  }
  /** @type {!Window} */
  var context = window;
  var App = context.wLive;
  var $ = (App.Core, context.jQuery);
  var o = context.$Config.WLXAccount;
  var scope = o.sessionApproval;
  var r = o.urls.dataRequest;
  var Comm = App.Account.Controls;
  /** @type {string} */
  var showlist = "onShow";
  /** @type {string} */
  var eventType = "onStartPolling";
  /** @type {string} */
  var eventName = "onPolling";
  /** @type {string} */
  var BLURRED = "onPending";
  /** @type {string} */
  var value = "onTimeout";
  /** @type {string} */
  var data = "onApproved";
  /** @type {string} */
  var CHANGE = "onDenied";
  /** @type {string} */
  var FOCUSED = "onSendSuccess";
  /** @type {string} */
  var event = "onSendError";
  /** @type {string} */
  var EVENT_CLICK = "onDisposing";
  /** @type {string} */
  var headIndent = "live.accounts.strings.error_";
  /** @type {string} */
  var w = "pollingdefaulterror";
  /** @type {string} */
  var name = "1306";
  var a = {
    "errorFieldRequired" : "error_1018",
    "errorEmailInvalidFormat" : "error_1035",
    "errorEmailExists" : "error_1287"
  };
  init.prototype.events = {
    "show" : showlist,
    "startPolling" : eventType,
    "polling" : eventName,
    "pending" : BLURRED,
    "timeout" : value,
    "approved" : data,
    "denied" : CHANGE,
    "sendSuccess" : FOCUSED,
    "sendError" : event,
    "disposing" : EVENT_CLICK
  };
  /** @type {boolean} */
  init.__class = true;
  registerNamespace("wLive.Account.Controls");
  /** @type {function(?, string, string): undefined} */
  App.Account.Controls.SessionPolling = init;
}(), function(data) {
  var t;
  !function(VIE) {
    var t;
    !function(canCreateDiscussions) {
      var t;
      !function(me) {
        /**
         * @param {string} tag
         * @param {?} stat
         * @return {?}
         */
        function init(tag, stat) {
          var $textInput = jQuery(document.body);
          var i = $textInput.css("backgroundColor").toLowerCase().replace(new RegExp(" ", "g"), "");
          return !stat.forBlackBackground || "rgb(0,0,0)" !== i && "#000000" !== i && "#000" !== i ? !stat.forWhiteBackground || "rgb(255,255,255)" !== i && "#ffffff" !== i && "#fff" !== i ? tag : stat.forWhiteBackground : stat.forBlackBackground;
        }
        /**
         * @param {string} q
         * @param {string} s
         * @return {?}
         */
        function callback(q, s) {
          return q ? s && s.length > 6 && ("data:" === s.substr(0, 5).toLowerCase() || "http:" === s.substr(0, 5).toLowerCase() || "https:" === s.substr(0, 6).toLowerCase()) ? s : q + s : s;
        }
        /**
         * @param {string} type
         * @param {string} a
         * @param {?} id
         * @return {?}
         */
        function i(type, a, id) {
          return callback(type, init(a, id));
        }
        /** @type {function(string, ?): ?} */
        me.getHighContrastImage = init;
        /** @type {function(string, string): ?} */
        me.getImagePath = callback;
        /** @type {function(string, string, ?): ?} */
        me.getHighContrastImageUrl = i;
      }(t = canCreateDiscussions.HighContrast || (canCreateDiscussions.HighContrast = {}));
    }(t = VIE.Util || (VIE.Util = {}));
  }(t = data.Account || (data.Account = {}));
}(wLive || (wLive = {})), function(data) {
  var t;
  !function(VIE) {
    var t;
    !function(canCreateDiscussions) {
      var n;
      !function(scale) {
        /**
         * @return {?}
         */
        function decimals() {
          return path && data ? path.getHighContrastImageUrl(data.baseUrl, data.dropdownCaret, {
            "forBlackBackground" : data.dropdownCaretWhite
          }) : "";
        }
        /**
         * @return {?}
         */
        function point() {
          return path && data ? path.getHighContrastImageUrl(data.baseUrl, data.arrow, {
            "forBlackBackground" : data.arrowWhite
          }) : "";
        }
        /**
         * @param {boolean} isIron
         * @return {undefined}
         */
        function render(isIron) {
          if (isIron) {
            jQuery("#lightbox-cover").addClass("disable-lightbox");
          } else {
            jQuery("#lightbox-cover").removeClass("disable-lightbox");
          }
        }
        var path = VIE.Util.HighContrast;
        var success = $Config.WLXAccount;
        var options = success.convergedFrameConfig || success.signup;
        var map = options && options.page;
        var data = map && map.imgs;
        /** @type {function(): ?} */
        scale.getDropDownCaretImage = decimals;
        /** @type {function(): ?} */
        scale.getArrowImage = point;
        /** @type {function(boolean): undefined} */
        scale.disableLightbox = render;
      }(n = canCreateDiscussions.ConvergedUxUtil || (canCreateDiscussions.ConvergedUxUtil = {}));
    }(t = VIE.Util || (VIE.Util = {}));
  }(t = data.Account || (data.Account = {}));
}(wLive || (wLive = {})), function(data) {
  var t;
  !function(fx) {
    var t;
    !function(canCreateDiscussions) {
      var n;
      !function(module) {
        /**
         * @return {?}
         */
        function setTimeout() {
          return path && value ? path.getHighContrastImageUrl(value.baseUrl, value.marchingAnts, {
            "forBlackBackground" : value.marchingAntsWhite
          }) : "";
        }
        /**
         * @param {!Object} f
         * @param {?} t
         * @return {undefined}
         */
        function error(f, t) {
          if (f.length > 0) {
            if (f.show(), jQuery("#marchingAnts", f).length > 0) {
              return;
            }
            var value;
            switch(u = u.replace("{0}", setTimeout()), t) {
              case data.Lightbox:
                value = config ? On : u;
                break;
              case data.Content:
                /** @type {string} */
                value = '<div class="row progress-container">' + (config ? On : u) + "</div>";
            }
            f.append(value);
          }
        }
        /**
         * @return {undefined}
         */
        function findVisibleExample() {
          var f = jQuery("#progressBarLightbox");
          error(f, data.Lightbox);
        }
        /**
         * @return {undefined}
         */
        function render() {
          jQuery("#progressBarLightbox").hide();
        }
        /**
         * @return {undefined}
         */
        function x() {
          var f = jQuery("#progressBarContent");
          error(f, data.Content);
        }
        /**
         * @return {undefined}
         */
        function self() {
          jQuery("#progressBarContent").hide();
        }
        var data;
        /** @type {!Window} */
        var context = window;
        var Animation = fx.AnimationHelper;
        var path = fx.Util.HighContrast;
        var result = $Config.WLXAccount;
        var options = result.convergedFrameConfig || result.signup;
        var arg = options && options.page;
        var value = arg && arg.imgs;
        var config = Animation && Animation.isCSSAnimationSupported;
        var courseSections = result.useProgressLineIndicator;
        /** @type {string} */
        var Show2Template = '<div class="row progress-container">' + (courseSections ? '<div role="progressbar" class="progress-indicator">            \x3c!-- ko if: isCSSAnimationSupported --\x3e            <div></div>            \x3c!-- /ko --\x3e            \x3c!-- ko ifnot: isCSSAnimationSupported --\x3e            <img role="presentation" data-bind="attr: { src: marchingAntsImage }" />            \x3c!-- /ko --\x3e        </div>' : '<div role="progressbar" class="progress">            \x3c!-- ko if: isCSSAnimationSupported --\x3e            <div></div><div></div><div></div><div></div><div></div><div></div>            \x3c!-- /ko --\x3e            \x3c!-- ko ifnot: isCSSAnimationSupported --\x3e            <img role="presentation" data-bind="attr: { src: marchingAntsImage }" />            \x3c!-- /ko --\x3e        </div>') + 
        "</div>";
        /** @type {string} */
        var On = courseSections ? '<div id="marchingAnts" role="progressbar" class="progress-indicator" >            <div></div>        </div>' : '<div id="marchingAnts" role="progressbar" class="progress" >            <div></div><div></div><div></div><div></div><div></div>        </div>';
        /** @type {string} */
        var u = '<div id="marchingAnts" role="progressbar" class="progress">            <img role= "presentation" src="{0}"/>        </div>';
        !function(States) {
          /** @type {string} */
          States[States.Lightbox = 0] = "Lightbox";
          /** @type {string} */
          States[States.Content = 1] = "Content";
        }(data || (data = {}));
        var MessagesViewModel = function() {
          /**
           * @return {undefined}
           */
          function innerTimer() {
            var self = this;
            self.isCSSAnimationSupported = config || false;
            /** @type {string} */
            self.marchingAntsImage = "";
            if (!self.isCSSAnimationSupported) {
              self.marchingAntsImage = setTimeout();
            }
          }
          return innerTimer;
        }();
        if (ko && ko.components) {
          ko.components.register("marchingAnts", {
            "viewModel" : MessagesViewModel,
            "template" : Show2Template
          });
        }
        /** @type {function(): ?} */
        module.getMarchingAntsImage = setTimeout;
        /** @type {function(): undefined} */
        module.showLightboxProgress = findVisibleExample;
        /** @type {function(): undefined} */
        module.hideLightboxProgress = render;
        /** @type {function(): undefined} */
        module.showContentProgress = x;
        /** @type {function(): undefined} */
        module.hideContentProgress = self;
        if (context.$Do) {
          context.$Do.register("wLive.Account.Util.MarchingAnts", 0, true);
        }
      }(n = canCreateDiscussions.MarchingAnts || (canCreateDiscussions.MarchingAnts = {}));
    }(t = fx.Util || (fx.Util = {}));
  }(t = data.Account || (data.Account = {}));
}(wLive || (wLive = {})), function() {
  /**
   * @param {string} name
   * @param {!Object} options
   * @return {?}
   */
  function GetString(name, options) {
    if (name) {
      if ("undefined" != typeof options && options[name]) {
        return GetString("live.accounts.strings." + options[name]);
      }
      if (processedOptions[name]) {
        return GetString("live.accounts.strings." + processedOptions[name]);
      }
    }
    var windowTitle = GetString("live.accounts.strings.error_" + name);
    return windowTitle || (windowTitle = GetString("live.accounts.strings." + name)), windowTitle || (windowTitle = GetString("live.accounts.strings." + P)), windowTitle;
  }
  /**
   * @param {string} b
   * @return {?}
   */
  function empty(b) {
    return "string" == typeof b;
  }
  /**
   * @param {string} e
   * @param {string} t
   * @param {boolean} n
   * @return {?}
   */
  function n(e, t, n) {
    return empty(e) && empty(t) ? n ? e.toLowerCase() === t.toLowerCase() : e === t : false;
  }
  /**
   * @param {string} url
   * @param {boolean} value
   * @return {?}
   */
  function addStyle(url, value) {
    if (url = (url || "").trim(), value && "" === url) {
      return expando;
    }
    if (url.length > 113) {
      return style;
    }
    /** @type {!RegExp} */
    var filePath = new RegExp(options.AltEmailRegEx);
    return url.match(filePath) ? null : style;
  }
  /**
   * @param {number} object
   * @param {string} property
   * @return {?}
   */
  function o(object, property) {
    /** @type {boolean} */
    var ontologyProperties = object >= 97 && 122 >= object;
    /** @type {boolean} */
    var vertex = object >= 65 && 90 >= object;
    return ontologyProperties && property || vertex && !property;
  }
  /**
   * @param {string} input
   * @param {string} value
   * @param {number} options
   * @return {?}
   */
  function parseStyles(input, value, options) {
    return input = (input || "").trim(), value && "" === input ? expando : input.length > (options ? options : 10) ? undefined : null;
  }
  /**
   * @param {string} expression
   * @param {string} value
   * @return {?}
   */
  function queryInPage(expression, value) {
    return expression = (expression || "").trim(), value && "" === expression ? expando : expression.length > 30 || expression.length < 1 ? undefined : null;
  }
  /**
   * @param {?} t
   * @param {!Object} r
   * @return {undefined}
   */
  function s(t, r) {
    if (r) {
      if (t) {
        r.css("opacity", 1);
      } else {
        r.css("opacity", 0);
      }
    }
  }
  /**
   * @param {string} method
   * @param {!NodeList} data
   * @return {?}
   */
  function addErrorTrigger(method, data) {
    if (method) {
      if (method.indexOf("@") >= 0) {
        var sepByDots = method.split("@");
        if (2 === sepByDots.length) {
          var i = sepByDots[1].toLowerCase();
          /** @type {number} */
          var o = 0;
          var x = data.length;
          for (; x > o; o++) {
            if (data[o].toLowerCase() === i) {
              return node.Live;
            }
          }
          return node.EASI;
        }
        return node.Unknown;
      }
      return node.Phone;
    }
    return node.Unknown;
  }
  /**
   * @param {string} b
   * @param {string} s
   * @return {?}
   */
  function d(b, s) {
    /** @type {boolean} */
    var val = false;
    if (b && s && b.indexOf("@") >= 0) {
      var sepByDots = b.split("@");
      if (2 === sepByDots.length) {
        var o = sepByDots[1].toLowerCase();
        if (s.toLowerCase() === o) {
          /** @type {boolean} */
          val = true;
        }
      }
    }
    return val;
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function update(value) {
    if (value) {
      /** @type {!Element} */
      var url = document.createElement("a");
      /** @type {string} */
      url.href = value;
      var path = url.origin;
      return path || (path = url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : "")), path;
    }
    return "";
  }
  /**
   * @param {string} position
   * @param {string} from
   * @return {?}
   */
  function callback(position, from) {
    var axis = update(position);
    var a = update(from);
    return a === axis;
  }
  /**
   * @param {string} src
   * @param {?} loadCall
   * @return {?}
   */
  function locusOfChapter(src, loadCall) {
    if (src) {
      /** @type {!RegExp} */
      var n = new RegExp(options.PhoneNumberFormat);
      if (!src.match(n)) {
        return undefined;
      }
    } else {
      if (loadCall) {
        return expando;
      }
    }
    return null;
  }
  /**
   * @param {!Object} result
   * @return {undefined}
   */
  function handler(result) {
    if (result && callback(message.url, result.origin)) {
      try {
        /** @type {*} */
        var action = JSON.parse(result.data);
        switch(action.eventId) {
          case "challenge-loaded":
            if (A) {
              A.hideContentProgress();
            }
            $(".forVisualHip").removeClass("hide");
            cb(action.payload);
            $ReportEvent.Action({
              "pageId" : id,
              "userAction" : ["Action_LoadEnforcement", "Action_ClientSideTelemetry"],
              "enforcementSessionToken" : action.payload.sessionToken
            });
            break;
          case "challenge-complete":
            message.sessionToken = action.payload.sessionToken;
            that.removeEventListener("message", handler);
            $ReportEvent.Action({
              "pageId" : id,
              "userAction" : ["Action_CompleteEnforcement", "Action_ClientSideTelemetry"],
              "enforcementSessionToken" : action.payload.sessionToken
            });
            OnNext();
            break;
          case "challenge-iframeSize":
            cb(action.payload);
        }
      } catch (n) {
      }
    }
  }
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  function cb(data) {
    var ifr = $("#enforcementFrame");
    if (data && ifr.length > 0) {
      ifr.css("height", data.frameHeight);
      ifr.css("width", data.frameWidth);
    }
  }
  /**
   * @param {string} options
   * @return {undefined}
   */
  function setup(options) {
    if (message && message.url) {
      var t = $("#hipEnforcementContainer");
      /** @type {string} */
      id = options;
      if (A) {
        A.showContentProgress();
      }
      /** @type {!Element} */
      var frame = document.createElement("iframe");
      /** @type {string} */
      frame.id = "enforcementFrame";
      frame.src = message.url;
      /** @type {string} */
      frame.sandbox = "allow-scripts allow-forms allow-same-origin allow-popups";
      /** @type {string} */
      frame.className = "enforcementFrame";
      that.addEventListener("message", handler);
      t.empty();
      t.append(frame);
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    if (data && data.url && ("undefined" == typeof that.HIPAMFE ? HIPAMFE = {
      "holder" : "hipContent",
      "scriptHolder" : "hipScript",
      "done" : false,
      "showMenu" : true,
      "showAddAccountOption" : false,
      "inputWidth" : $B.IE && $B.major < 9 ? 200 : "100%",
      "cssSet" : {
        "cssCdHIPInput" : "form-control input-max-width",
        "cssCdHIPList" : "form-control",
        "cssCdHIPError" : "alert alert-error",
        "cssCdHIPErrorImg" : "hide",
        "cssCdHIPButton" : "btn btn-default",
        "cssCdHIPLabel" : "text-base"
      },
      "createObservable" : function() {
        var o = that.HIPAMFE;
        return o.observable = {}, $.extend(o.observable, config.viewModelHandle), o.observable.hip.suppressMessages(true), o.observable.hip(""), o.observable;
      },
      "updateTitle" : function() {
        var e = that.HIPAMFE;
        var whapp_list_html = $("#HipPane");
        if (e.type) {
          if ("sms" === e.type) {
            $(".forVisualHip", whapp_list_html).addClass("hide");
            $(".forSmsHip", whapp_list_html).removeClass("hide");
          } else {
            $(".forVisualHip", whapp_list_html).removeClass("hide");
            $(".forSmsHip", whapp_list_html).addClass("hide");
          }
        }
      },
      "postLoad" : function() {
        /**
         * @param {(Object|string)} buttons_html
         * @return {?}
         */
        function setup(buttons_html) {
          return $("label", buttons_html).addClass("text-base text-body"), options.isWin10 ? ($("select", buttons_html).addClass("win-dropdown").parent().addClass("template-input inputType_large"), $("input[type=text]", buttons_html).addClass("win-textbox").parent().addClass("template-input inputType_large")) : options.isWin10InclusiveOOBE ? ($("select", buttons_html).removeClass().addClass("win-dropdown").parent().addClass("template-input"), $("input[type=text]", buttons_html).removeClass().addClass("win-textbox").parent().addClass("template-input")) : 
          ($("select", buttons_html).addClass("input-max-width").parent().addClass(form).removeAttr("style"), $("input[type=text]", buttons_html).removeClass("hiddenHipInputText").addClass("input-max-width").parent().addClass(form).removeAttr("style")), "#hipContent #wlspispHipControlButtonsContainer" === buttons_html.selector && ($("body").hasClass("cb") ? $("a", buttons_html).addClass("btn btn-block").parent().addClass(form).removeAttr("style") : $("a", buttons_html).addClass("btn btn-primary btn-block").parent().addClass(form).removeAttr("style")), 
          buttons_html;
        }
        /** @type {string} */
        var form = "form-group col-xs-24 template-input";
        /** @type {string} */
        var node = "col-xs-12";
        /** @type {boolean} */
        var i = false;
        if ($(".col-md-24").length > 0) {
          /** @type {string} */
          form = "form-group col-md-24 template-input";
          /** @type {string} */
          node = "col-md-12";
          /** @type {boolean} */
          i = false;
        } else {
          if ($(".col-xs-18").length > 0) {
            /** @type {string} */
            form = "form-group col-xs-18 template-input";
            /** @type {string} */
            node = "col-xs-9";
            /** @type {boolean} */
            i = true;
          }
        }
        var self = that.HIPAMFE;
        var currentPageLink = $("#hipDesc");
        var div = $("#hipTemplateContainer");
        var parent = ($("#HipPane"), $("#" + self.holder));
        if (currentPageLink.length > 0 && currentPageLink.addClass("text-body"), ("undefined" === render || 0 === render) && div.addClass("text-body"), A && A.hideContentProgress(), self.updateTitle(), ko.cleanNode(div[0]), "sms" === self.type) {
          var likeBtn = $("#pageControlHost input[type=submit]:visible");
          if (config.ftrViewModelHandle) {
            config.ftrViewModelHandle.buttons.nextButton.disabled(true);
          } else {
            if (likeBtn.length > 0) {
              likeBtn.attr("disabled", "disabled");
            }
          }
          if (i) {
            $("#hipSection div.col-xs-18").addClass("alert alert-error");
          }
          var $component = setup($("#wlspispHIPErrorContainer", parent).removeAttr("style").addClass(form)).detach().attr("data-bind", "visible: !hip.suppressMessages() && !hip.isValid()");
          var element = setup($("#wlspispHipChallengeContainer", parent).removeAttr("style")).detach();
          var $el = setup($("#wlspispHipControlButtonsContainer", parent).removeAttr("style")).detach().on("click", function() {
            if (self && self.observable) {
              self.observable.hip.suppressMessages(true);
            }
          });
          var container = setup($("#wlspispHipSolutionContainer", parent)).hide().detach();
          $(".form-control", container).attr("data-bind", "value: hip, setFocus: hip.focused, css: { 'has-error': !hip.suppressMessages() && !hip.isValid() }");
          div.html("").append(element).append($el).append(container).append($component);
          self.createObservable();
          self.observable.hip.suppressMessages(true);
          ko.applyBindings(self.observable, div[0]);
          try {
            var channel = config.viewModelHandle;
            if (channel.phoneNumber && channel.phoneCountry) {
              self.setPhoneNumber(channel.phoneCountry(), channel.phoneNumber());
            }
          } catch (f) {
          }
          var g = self.getHipDataResponse;
          /**
           * @param {?} e
           * @return {undefined}
           */
          self.getHipDataResponse = function(e) {
            g(e);
            if (!e) {
              if (config.ftrViewModelHandle) {
                config.ftrViewModelHandle.buttons.nextButton.disabled(false);
              } else {
                if (likeBtn.length > 0) {
                  likeBtn.removeAttr("disabled");
                }
              }
            }
          };
          $('[id^="wlspispHIPPhoneInput"]', element).first().focus();
        } else {
          if (options.isXbox) {
            $("#iHipRefresh").off("click").on("click", function() {
              self.reloadHIP();
            });
            $("#iHipAudioLink").off("click").on("click", function() {
              $("#hipimageholder").hide();
              $("#hipaudioholder").show();
              /** @type {string} */
              self.type = "audio";
              self.reloadHIP();
            });
            $("#iHipImageLink").off("click").on("click", function() {
              $("#hipaudioholder").hide();
              $("#hipimageholder").show();
              /** @type {string} */
              self.type = "visual";
              self.reloadHIP();
            });
            element = $("<div></div>");
            if (self.type === type) {
              element.append($(".cssWLSPHIPAudio", $("a", parent)).parent().detach());
            } else {
              var $nxt = $("img", parent).filter(function() {
                return this.src.indexOf("GetHIPData") > -1;
              }).css("height", "96px").css("width", "216px").css("padding-right", "10px");
              element.append($nxt.detach());
            }
            var input = $(".form-control", parent).removeAttr("class");
            input.attr("name", input.attr("id"));
            if (self.type === type || 0 === $Config.isPlaceholderSupported) {
              input.removeAttr("style").attr("data-bind", "value: hip, setFocus: hip.focused, css: { 'has-error': !hip.suppressMessages() && !hip.isValid() }").addClass("spHipNoClear hipInputText primaryTextInput");
            } else {
              input.removeAttr("style").attr("placeholder", HIPAMFE.getInstruction()).attr("data-bind", "value: hip, setFocus: hip.focused, css: { 'has-error': !hip.suppressMessages() && !hip.isValid() }");
            }
            setTimeout(function() {
              input.focus();
            }, 0);
            div.html("").append(element).append(input.detach());
          } else {
            $el = $("<div></div>").addClass("text-body btn-group").addClass(node).append($("a", parent).addClass("btn btn-block captchaHIPLinks").attr("role", "button").removeAttr("style").detach());
            element = $("<div></div>").addClass(node);
            if (self.type === type) {
              element.append($(".cssWLSPHIPAudio", $el).parent().detach().removeClass("btn btn-block"));
            } else {
              $nxt = $("img", parent).filter(function() {
                return this.src.indexOf("GetHIPData") > -1;
              }).css("height", "auto").css("width", "100%").css("max-width", "200px");
              if (!i) {
                $nxt.addClass("text-body");
              }
              element.append($nxt.detach());
            }
            container = $("<div></div>").addClass("form-group template-input").addClass(form);
            input = $(".form-control", parent);
            input.attr("name", input.attr("id"));
            if (self.type !== type && 0 !== $Config.isPlaceholderSupported && $("body").hasClass("cb")) {
              container.append(input.removeAttr("style").attr("placeholder", HIPAMFE.getInstruction()).attr("data-bind", "value: hip, setFocus: hip.focused, css: { 'has-error': !hip.suppressMessages() && !hip.isValid() }").detach());
            } else {
              container.append($("label[for='" + input.attr("id") + "']", parent).detach().addClass("text-base"));
              container.append(input.removeAttr("style").attr("data-bind", "value: hip, setFocus: hip.focused, css: { 'has-error': !hip.suppressMessages() && !hip.isValid() }").detach());
              if (self.type === type) {
                setTimeout(function() {
                  input.focus();
                }, 0);
              }
            }
            $component = $("<div></div>").addClass(form).append($(".alert-error", parent).detach().addClass("floatLeft"));
            div.html("").append(element).append($el).append(container).append($component);
          }
          self.createObservable();
          ko.applyBindingsWithValidation(self.observable, div[0]);
          if (options.signup && options.signup.options.viewDefs.hip && options.signup.options.viewDefs.hip.options.focusHipPostLoad) {
            setTimeout(function() {
              input.focus();
            }, 0);
          }
        }
        if (self.observable.hip.serverError) {
          /** @type {number} */
          self.error = 1;
          self.setError();
          /** @type {null} */
          self.observable.hip.serverError = null;
          $.each($(".alert-error", div), function(canCreateDiscussions, w) {
            var btn = $(w);
            return "inline" === btn.css("display") ? (btn.css("display", "block"), false) : void 0;
          });
        }
      }
    } : options.isXbox && that.HIPAMFE && that.HIPAMFE.postLoad(), that.HIPAMFE && !that.HIPAMFE.done)) {
      if (A) {
        A.showContentProgress();
      }
      var parentEL = $("#hipScript")[0];
      var el = $("#hipScript script")[0];
      if (el) {
        el.src = data.url;
      } else {
        /** @type {!Element} */
        var el = document.createElement("script");
        /** @type {string} */
        el.type = "text/javascript";
        el.src = data.url;
        parentEL.appendChild(el);
      }
    }
  }
  /** @type {!Window} */
  var that = window;
  var $ = that.jQuery;
  var response = that.wLive;
  var config = response.Account;
  var options = that.$Config.WLXAccount;
  var data = options.hip;
  var message = data && data.enforcement;
  var render = options.isConvergedUX;
  var A = config.Util && config.Util.MarchingAnts;
  /** @type {string} */
  var P = "error_500";
  /** @type {string} */
  var expando = "errorFieldRequired";
  /** @type {string} */
  var undefined = "errorInvalidFormat";
  /** @type {string} */
  var style = "errorEmailInvalidFormat";
  var node = {
    "EASI" : "EASI",
    "Live" : "Live",
    "Phone" : "Phone",
    "Unknown" : "Unknown"
  };
  var processedOptions = {
    "errorFieldRequired" : "error_1018",
    "errorEmailInvalidFormat" : "error_1035",
    "errorEmailExists" : "error_1287"
  };
  /** @type {string} */
  var type = "audio";
  /** @type {null} */
  var id = null;
  registerNamespace("wLive.Account.FieldHelper");
  /** @type {function(string, boolean): ?} */
  response.Account.FieldHelper.verifyEmailAddress = addStyle;
  /** @type {function(string, string, number): ?} */
  response.Account.FieldHelper.verifyOttCode = parseStyles;
  /** @type {function(string, string): ?} */
  response.Account.FieldHelper.verifyRecoveryCode = queryInPage;
  /** @type {function(string, string, boolean): ?} */
  response.Account.FieldHelper.strEquals = n;
  /** @type {function(number, string): ?} */
  response.Account.FieldHelper.isCapsLockOn = o;
  /** @type {function(?, !Object): undefined} */
  response.Account.FieldHelper.toggleInlineLabel = s;
  /** @type {function(string, !NodeList): ?} */
  response.Account.FieldHelper.getMemberNameType = addErrorTrigger;
  /** @type {function(string, string): ?} */
  response.Account.FieldHelper.doesDomainMatch = d;
  /** @type {function(string, ?): ?} */
  response.Account.FieldHelper.verifyPhoneNumber = locusOfChapter;
  /** @type {function(string, !Object): ?} */
  response.Account.FieldHelper.getErrorString = GetString;
  /** @type {function(): undefined} */
  response.Account.FieldHelper.loadHip = init;
  /** @type {function(string): undefined} */
  response.Account.FieldHelper.loadEnforcementHip = setup;
  response.Account.FieldHelper.memberNameTypes = node;
  response.Account.FieldHelper.errors = {
    "required" : expando,
    "invalidFormat" : undefined,
    "emailInvalidFormat" : style
  };
  if (that.$Do) {
    that.$Do.register("wLive.Account.FieldHelper", 0, true);
  }
}(), function() {
  /**
   * @param {?} parent
   * @param {boolean} table
   * @return {undefined}
   */
  function init(parent, table) {
    if (parent) {
      if (table) {
        var s = node.Account.viewModelHandle;
        if (s && s.validationOrder) {
          var pIndex = jQuery.inArray(parent, s.validationOrder);
          var i = pIndex + 1;
          /** @type {boolean} */
          var active = s.validationOrder.length === i;
          if (active) {
            if (parent.focused) {
              parent.focused(true);
            }
          } else {
            if (s.validationOrder.length > i) {
              var section = s.validationOrder[i];
              if (section && section.focused) {
                if (parent.focused) {
                  parent.focused(false);
                }
                section.focused(true);
              }
            }
          }
        }
      } else {
        if (parent.focused) {
          parent.focused(true);
        }
      }
    }
  }
  /** @type {!Window} */
  var o = window;
  var node = o.wLive;
  registerNamespace("wLive.Account.Extensions.Utils");
  /** @type {function(?, boolean): undefined} */
  node.Account.Extensions.Utils.setFocusOnObservable = init;
}(), $Do.when("jQuery", function() {
  /** @type {!Window} */
  var root = window;
  var $ = root.jQuery;
  /** @type {string} */
  var params = ".placeholder";
  /** @type {string} */
  var key = "placement";
  var node = {
    "top" : "top",
    "left" : $B.ltr ? "left" : "right",
    "right" : $B.ltr ? "right" : "left",
    "bottom" : "bottom"
  };
  var retake = {
    "GamePadA" : 195
  };
  $Do.when("knockout", function() {
    ko.bindingHandlers.autoSubmit = {
      "update" : function(obj, n) {
        var i = n();
        var $sendIcon = ko.unwrap(i);
        if ($sendIcon) {
          if (ko.isObservable(i)) {
            i(false);
          }
          $(obj).submit();
        }
      }
    };
    ko.bindingHandlers.errorMessage = {
      "init" : function() {
        return {
          "controlsDescendantBindings" : true
        };
      },
      "update" : function(element, x, n, elem, bindingContext) {
        {
          /** @type {null} */
          var html = null;
          var item = x();
          ko.utils.unwrapObservable(item);
        }
        if (item.isValid() || item.suppressClientErrors && item.suppressClientErrors() ? item.isModified() || (html = item.serverError || null) : html = item.error, ko.utils.setHtml(element, html), n.has("childBindings")) {
          var attribs = n.get("childBindings") || {};
          var i;
          for (i in attribs) {
            /** @type {(Element|null)} */
            var node = document.getElementById(i);
            if (node) {
              node.setAttribute("data-bind", attribs[i]);
            }
          }
          ko.applyBindingsToDescendants(bindingContext, element);
        }
      }
    };
    ko.bindingHandlers.validatorError = {
      "init" : function() {
        return {
          "controlsDescendantBindings" : true
        };
      },
      "update" : function(element, x, n, elem, bindingContext) {
        {
          /** @type {null} */
          var html = null;
          var item = x();
          ko.utils.unwrapObservable(item);
        }
        if (item.isModified() && !item.isValid() && (html = item.error), !item.isModified() && item.serverError && (html = item.serverError), ko.utils.setHtml(element, html), n.has("childBindings")) {
          var attribs = n.get("childBindings") || {};
          var i;
          for (i in attribs) {
            /** @type {(Element|null)} */
            var node = document.getElementById(i);
            if (node) {
              node.setAttribute("data-bind", attribs[i]);
            }
          }
          ko.applyBindingsToDescendants(bindingContext, element);
        }
      }
    };
    ko.bindingHandlers.hasFocusSelect = {
      "init" : function(p, start, rate) {
        ko.bindingHandlers.hasfocus.init(p, start, rate);
      },
      "update" : function(el, x) {
        ko.bindingHandlers.hasfocus.update(el, x);
        var label = x();
        var sidelabel = ko.utils.unwrapObservable(label);
        if (sidelabel) {
          $(el).select();
        }
      }
    };
    ko.bindingHandlers.setFocus = {
      "update" : function(obj, n) {
        var end = n();
        var endNormalized = ko.utils.unwrapObservable(end);
        if (endNormalized) {
          $(obj).focus();
        }
      }
    };
    ko.bindingHandlers.tooltip = {
      "init" : function(el, button) {
        if (!($B && $B.IE && $B.V && $B.V <= 8)) {
          var b = button();
          var data = ko.utils.unwrapObservable(b);
          var $input = $(el);
          var windowRef = $(window);
          /** @type {string} */
          var eventNamespace = ".tooltip";
          if (data && data.target) {
            var $check = $(data.target);
            if ($check && $check.length > 0) {
              $input.on("blur" + eventNamespace, function() {
                if (!$check.is(":focus")) {
                  $check.tooltip("hide");
                }
              });
              $input.on("focus" + eventNamespace, function() {
                $check.tooltip("show");
              });
            }
            windowRef.on("resize", function() {
              if ($input.is(":focus")) {
                $check.tooltip("hide");
                $check.tooltip("show");
              }
            });
          } else {
            $input.on("show.bs.tooltip", function() {
              $(".tooltip").not(this).hide();
            });
            var options = {};
            /** @type {boolean} */
            options.animation = false;
            var ref = data && data[key] && node[data[key]];
            options[key] = ref || node.right;
            /** @type {string} */
            options.container = "#maincontent";
            /** @type {string} */
            options.viewport = "#maincontent";
            if (data && data.html) {
              /** @type {boolean} */
              options.html = true;
              options.delay = {
                "show" : 150,
                "hide" : 100
              };
            }
            if (data && data.setup) {
              /** @type {string} */
              options.trigger = "manual";
              data.setup();
            } else {
              /** @type {string} */
              options.trigger = "focus";
            }
            if (data && data.dynamic) {
              $input.on("change" + eventNamespace, function() {
                $input.tooltip("hide");
                $input.tooltip("show");
              });
            }
            if (data && data.hover) {
              $input.on("mouseover" + eventNamespace, function() {
                $input.tooltip("show");
              });
              $input.on("mouseout" + eventNamespace, function() {
                $input.tooltip("hide");
              });
            }
            if (data && data.click) {
              $input.on("click" + eventNamespace, function() {
                $input.tooltip("show");
              });
              $input.on("focus" + eventNamespace, function() {
                $input.tooltip("show");
              });
              $input.on("blur" + eventNamespace, function() {
                $input.tooltip("hide");
              });
            }
            $input.tooltip(options);
            windowRef.on("resize", function() {
              if ($input.is(":focus")) {
                $input.tooltip("hide");
                $input.tooltip("show");
              }
            });
          }
          ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
            windowRef.off("resize");
            $input.off(eventNamespace);
            /** @type {null} */
            windowRef = null;
            /** @type {null} */
            $input = null;
          });
        }
      }
    };
    ko.bindingHandlers.inputWithPlaceholder = {
      "init" : function(el, i, x) {
        ko.bindingHandlers.textInput.init(el, i, x);
        /** @type {string} */
        var type = ".placeholder";
        var self = $(el);
        var link = self.next(params);
        link.on("click" + type, function() {
          setTimeout(function() {
            self.focus();
          }, 0);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
          /** @type {null} */
          self = null;
          link.off(type);
          /** @type {null} */
          link = null;
        });
      },
      "update" : function(e, f, a) {
        var cup = ko.bindingHandlers.textInput.update;
        if (cup) {
          cup();
        }
        var b = f();
        var originalB = ko.utils.unwrapObservable(b);
        var rawParams = $(e).next(params);
        if (rawParams.length > 0) {
          ko.bindingHandlers.visible.update(rawParams[0], function() {
            var conid = a.get("inlineLabelId");
            if (conid) {
              var $continueButton = $("#" + conid);
              if (originalB) {
                $continueButton.css("opacity", 1);
              } else {
                $continueButton.css("opacity", 0);
              }
            }
            return !originalB;
          });
        }
      }
    };
    ko.bindingHandlers.htmlWithBindings = {
      "init" : function() {
        return {
          "controlsDescendantBindings" : true
        };
      },
      "update" : function(element, t, i, elem, bindingContext) {
        ko.utils.setHtml(element, t());
        var div = i.get("childBindings");
        if (div) {
          var i;
          for (i in div) {
            /** @type {(Element|null)} */
            var option = document.getElementById(i);
            if (option) {
              ko.applyBindingsToNode(option, div[i], bindingContext);
            }
          }
        }
        ko.applyBindingsToDescendants(bindingContext, element);
      }
    };
    ko.bindingHandlers.moveOffScreen = {
      "update" : function(e, fn) {
        var TRUE = ko.unwrap(fn());
        ko.bindingHandlers.css.update(e, function() {
          return {
            "moveOffScreen" : TRUE
          };
        });
        ko.bindingHandlers.attr.update(e, function() {
          return {
            "tabindex" : TRUE ? -1 : 0,
            "aria-hidden" : TRUE
          };
        });
      }
    };
    ko.bindingHandlers.ariaDescribedBy = {
      "update" : function(el, t) {
        ko.bindingHandlers.attr.update(el, function() {
          return {
            "aria-describedby" : t()
          };
        });
      }
    };
    ko.bindingHandlers.checkedEx = {
      "init" : function(el, b, rate) {
        ko.bindingHandlers.checked.init(el, b, rate);
        var a = b();
        ko.utils.registerEventHandler(el, "keydown", function(event) {
          var retakeNumber = event && (event.which || event.keyCode);
          if (retakeNumber == retake.GamePadA) {
            a(!el.checked);
          }
        });
      }
    };
  });
}), function(global) {
  $Do.when("jQuery", function() {
    /**
     * @param {string} data
     * @param {?} key
     * @return {?}
     */
    function next(data, key) {
      return !data || !Boolean(data.match(key));
    }
    /**
     * @param {string} type
     * @param {?} value
     * @param {boolean} raw
     * @return {?}
     */
    function callback(type, value, raw) {
      /** @type {boolean} */
      var result = true;
      return $.each(value, function(canCreateDiscussions, version) {
        return result = Boolean(type.match(version)), raw ? result : !result;
      }), result;
    }
    /**
     * @param {string} i
     * @param {string} t
     * @param {boolean} foo
     * @return {?}
     */
    function debug(i, t, foo) {
      return foo && (i = i.toLowerCase(), t = t.toLowerCase()), 0 === i.indexOf(t);
    }
    /**
     * @param {string} d
     * @param {string} e
     * @param {boolean} add
     * @return {?}
     */
    function getType(d, e, add) {
      return add && (d = d.toLowerCase(), e = e.toLowerCase()), d.lastIndexOf(e) + e.length === d.length;
    }
    var $ = global.jQuery;
    var base = global.wLive;
    var deps = (base.Core, base.Account);
    var spColor = deps.Util || {};
    var registration = global.$Config.WLXAccount;
    var options = registration.signup;
    var self = deps.FieldHelper;
    var utils = deps.Extensions.Utils;
    /** @type {string} */
    var bitsPerSample = "newpwd";
    $Do.when("knockout", function() {
      var ko = global.ko;
      $.extend(ko.validation.rules, {
        "birthYearPartRequired" : {
          "validator" : function(existingPathFragment) {
            /** @type {string} */
            var i = "";
            var sortedLanes = existingPathFragment.split(":");
            return 3 === sortedLanes.length && (i = sortedLanes[2]), Boolean(i);
          },
          "message" : ""
        },
        "birthdatePartRequired" : {
          "validator" : function(existingPathFragment) {
            /** @type {string} */
            var vim = "";
            /** @type {string} */
            var vip = "";
            /** @type {string} */
            var flag = "";
            var triggerPos = existingPathFragment.split(":");
            return 3 === triggerPos.length && (vim = triggerPos[0], vip = triggerPos[1], flag = triggerPos[2]), Boolean(vim && vip && flag);
          },
          "message" : ""
        },
        "birthdateValid" : {
          "validator" : function(existingPathFragment) {
            /** @type {!Date} */
            var max = new Date;
            /** @type {string} */
            var s = "";
            /** @type {string} */
            var value = "";
            /** @type {string} */
            var b = "";
            var _ref1 = existingPathFragment.split(":");
            if (3 === _ref1.length) {
              s = _ref1[0];
              value = _ref1[1];
              b = _ref1[2];
            }
            /** @type {number} */
            var year = parseInt(b, 10);
            /** @type {number} */
            var FEB = parseInt(value, 10) - 1;
            /** @type {number} */
            var d = parseInt(s, 10);
            /** @type {!Date} */
            var date = new Date(year, FEB, d);
            return !(date > max || 0 / 0 === year || 0 / 0 === FEB || 0 / 0 === d || d !== date.getDate() || FEB !== date.getMonth() || year !== date.getFullYear());
          },
          "message" : ""
        },
        "pwdContainsMemberName" : {
          "validator" : function(val) {
            var ctrl = options.viewContext && options.viewContext.data && options.viewContext.data.input ? options.viewContext.data.input.memberNameInput : "";
            return val && ctrl && 0 !== ctrl.length ? -1 === val.toLowerCase().indexOf(ctrl.toLowerCase().split("@")[0]) : true;
          },
          "message" : ""
        },
        "pwdComplexity" : {
          "validator" : function(value) {
            /** @type {!Array} */
            var array = [/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]+/, /[\x30-\x39]+/, /[\x41-\x5A]+/, /[\x61-\x7A]+/];
            /** @type {number} */
            var n = 2;
            /** @type {number} */
            var obj = 0;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var l = array.length;
            for (; l > i; i++) {
              if (value.match(array[i]) && obj++, obj >= n) {
                return true;
              }
            }
            return false;
          },
          "message" : ""
        },
        "strongPwdComplexity" : {
          "validator" : function(value) {
            /** @type {!Array} */
            var array = [/[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]+/, /[\x30-\x39]+/, /[\x41-\x5A]+/, /[\x61-\x7A]+/];
            /** @type {number} */
            var n = 3;
            /** @type {number} */
            var obj = 0;
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var l = array.length;
            for (; l > i; i++) {
              if (value.match(array[i]) && obj++, obj >= n) {
                return true;
              }
            }
            return false;
          },
          "message" : ""
        },
        "notMatchingPattern" : {
          "validator" : function(fn, ctx) {
            return next(fn, ctx);
          },
          "message" : ""
        },
        "allPatterns" : {
          "validator" : function(min, value) {
            return callback(min, value, true);
          },
          "message" : ""
        },
        "onePattern" : {
          "validator" : function(min, value) {
            return callback(min, value, false);
          },
          "message" : ""
        },
        "userNamePattern" : {
          "validator" : function(_, value) {
            if (!_ || 0 === _.length || -1 === _.indexOf("@")) {
              return false;
            }
            var returnedData = _.split("@");
            return 2 !== returnedData.length ? false : callback(returnedData[0], value, false);
          }
        },
        "userNameRequired" : {
          "validator" : function(value) {
            if (!value || 0 === value.length || -1 === value.indexOf("@")) {
              return false;
            }
            var termFragments = value.split("@");
            return 2 !== termFragments.length ? false : termFragments[0].trim().length > 0;
          }
        },
        "liveMemberNameValid" : {
          "validator" : function(value, options) {
            var domains = options.domains;
            var patterns = options.patterns;
            return domains && 0 !== domains.length && self.getMemberNameType(value, domains) === self.memberNameTypes.Live ? callback(value.split("@")[0], patterns, true) : true;
          }
        },
        "proofClearPortionMatchEmail" : {
          "validator" : function(data, settings) {
            if (data) {
              var result = debug(data, settings.clearPortion(), true);
              var type = settings.domainPortion();
              var value = settings.patterns;
              var left_grip_selector = settings.allowZero;
              return left_grip_selector && "0" === String(data) ? true : data.indexOf("@") >= 0 ? result && getType(data, type, true) && callback(data, value, true) : result && callback(data + type, value, true);
            }
            return false;
          }
        },
        "proofClearPortionMatchPhone" : {
          "validator" : function(obj, item) {
            return item.allowZero && "0" === String(obj) ? true : Boolean(obj && obj.length === item.matchDigits && obj.match(/^\d+$/) && getType(obj, item.clearPortion(), true));
          }
        },
        "memberNameValidForFl" : {
          "validator" : function(_, o) {
            var M = o.fl;
            var current = self.getMemberNameType(_, o.domains);
            return "EASI" === M && current !== self.memberNameTypes.EASI ? false : "Live" === M && current !== self.memberNameTypes.Live ? false : "Phone" === M && current !== self.memberNameTypes.Phone ? false : true;
          }
        },
        "hipValidation" : {
          "validator" : function(value) {
            var context = global.HIPAMFE;
            return context && context.done ? ($("#hipContent .hiddenHipInputText").val(value), base.Account && base.Account.viewModelHandle && base.Account.viewModelHandle.hip && base.Account.viewModelHandle.hip.serverError && "" === base.Account.viewModelHandle.hip() ? (this.message = base.Account.viewModelHandle.hip.serverError, false) : (context.clientValidation(), context.setError(), this.message = context.getError(), "" === context.getError())) : true;
          }
        },
        "bannedPwd" : {
          "async" : true,
          "validator" : function(e, data, fn) {
            var b = spColor.FullScreenSpinner;
            var ctx = {
              "uaid" : global.$Config.uaid
            };
            ctx.cipherValue = Encrypt("", "", bitsPerSample, e);
            ctx.ski = data.ski;
            if (b) {
              b.show();
            }
            global.$DataRequest.Json(null, data.url, ctx, function(tab) {
              if (b) {
                b.hide(tab.isBanned);
              }
              fn(!tab.isBanned);
              utils.setFocusOnObservable(data.observable, !tab.isBanned);
            }, function() {
              if (b) {
                b.hide(false);
              }
              fn(true);
              utils.setFocusOnObservable(data.observable, true);
            });
          },
          "message" : ""
        },
        "checkAvailable" : {
          "async" : true,
          "validator" : function(parent, self, callback) {
            var msg = {
              "signInName" : parent,
              "uaid" : global.$Config.uaid
            };
            if (self.dft) {
              msg.dft = self.dft;
            }
            if (self.includeSuggestions) {
              msg.includeSuggestions = self.includeSuggestions;
            }
            /** @type {string} */
            var id = "Account_CheckAvailPage";
            var r = spColor.MarchingAnts;
            var b = spColor.FullScreenSpinner;
            var il = deps.SignupHelper;
            if (b) {
              b.show();
            }
            if (r) {
              r.showLightboxProgress();
            }
            global.$DataRequest.Json(null, self.url, msg, function(file) {
              try {
                var data = {};
                /** @type {number} */
                var bbcx = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
                /** @type {string} */
                data.pageId = id;
                /** @type {number} */
                data.duration = Math.round(bbcx - checkAvailableNamesApiStartTime);
                /** @type {boolean} */
                data.skipClientCall = true;
                $ReportEvent.Action(data);
              } catch (m) {
              }
              var data = !file || file.isAvailable;
              var h = file && file.type;
              var v = file && file.suggestions || [];
              /** @type {boolean} */
              var i = v.length > 0;
              var path = file && file.isProof;
              var mouseOver = file && file.possibleEviction;
              var X = file && file.nopaAllowed;
              var result = self.getResult && self.getResult(0, parent, data, h, i, path, mouseOver, X);
              if (r) {
                r.hideLightboxProgress();
              }
              if (b) {
                b.hide(result && !result.isValid || !data);
              }
              if (self.getSuggestedMemberNames) {
                self.getSuggestedMemberNames(v);
              }
              if (self.setSuccessMessage && data) {
                self.setSuccessMessage(h, parent);
              }
              if (options.viewContext && options.viewContext.data && options.viewContext.data.reporting) {
                options.viewContext.data.reporting.memberNameChangeCount++;
                if (data) {
                  options.viewContext.data.reporting.memberNameAvailableCount++;
                } else {
                  options.viewContext.data.reporting.memberNameUnavailableCount++;
                }
              }
              callback(result ? result : data);
              if (!il.isMembernamePasswordProfilePage()) {
                utils.setFocusOnObservable(self.observable, data && 1 === $B.IE);
              }
            }, function(data) {
              var currency = data && data.error;
              try {
                var opts = {};
                /** @type {number} */
                var bbcx = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
                /** @type {string} */
                opts.pageId = id;
                /** @type {number} */
                opts.duration = Math.round(bbcx - checkAvailableNamesApiStartTime);
                opts.errorCode = currency ? data.error.code : "";
                /** @type {boolean} */
                opts.skipClientCall = true;
                $ReportEvent.Action(opts);
              } catch (m) {
              }
              var f = data && data.suggestions || [];
              /** @type {boolean} */
              var chunkSum = f.length > 0;
              var err = self.getResult && self.getResult(currency && data.error.code, parent, void 0, void 0, chunkSum);
              if (r) {
                r.hideLightboxProgress();
              }
              if (b) {
                b.hide(true);
              }
              if (self.getSuggestedMemberNames) {
                self.getSuggestedMemberNames(f);
              }
              if (options.viewContext && options.viewContext.data && options.viewContext.data.reporting) {
                options.viewContext.data.reporting.memberNameChangeCount++;
                options.viewContext.data.reporting.memberNameUnavailableCount++;
              }
              callback(err ? err : false);
              utils.setFocusOnObservable(self.observable, true);
            });
            /** @type {number} */
            checkAvailableNamesApiStartTime = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
          },
          "message" : ""
        },
        "getPhoneDetails" : {
          "async" : true,
          "validator" : function(obj, options, next) {
            /**
             * @param {?} to
             * @return {undefined}
             */
            function transform(to) {
              if (!to.phoneDetails || to.phoneDetails.length <= 0) {
                next(false);
              } else {
                var fd = to.phoneDetails[0];
                if (options.phoneDetails) {
                  options.phoneDetails(fd);
                }
                next(fd.IsValid === true);
              }
            }
            /**
             * @param {?} exception
             * @return {undefined}
             */
            function error(exception) {
              next(!!options.onError);
              if (options.onError) {
                options.onError(exception);
              }
            }
            var data = {
              "phone" : [].concat(obj),
              "uaid" : global.$Config.uaid
            };
            if (options.country) {
              /** @type {!Array<?>} */
              data.country = [].concat(options.country());
            }
            global.$DataRequest.Json(null, options.url, data, transform, error);
          }
        }
      });
      ko.validation.registerExtenders();
    });
  });
}(window), JSMPnumber.prototype = {
  "size" : 1,
  "data" : [0]
}, !function() {
  registerNamespace("$Config.WLXAccount.signup");
  $Config.WLXAccount.signup.errorCodes = {
    "hipValidationError" : "1043",
    "hipNeeded" : "1040",
    "hipEnforcementNeeded" : "1041",
    "hipSMSNeeded" : "1042",
    "dailyLimitIDsReached" : "450",
    "oneTimeCodeInvalid" : "1304",
    "verificationSltInvalid" : "1324",
    "membernameTaken" : "1058",
    "domainNotAllowed" : "1117",
    "domainIsReserved" : "1181",
    "forbiddenWord" : "403",
    "passwordIncorrect" : "1002",
    "passwordConflict" : "1009",
    "invalidEmailFormat" : "1062",
    "invalidPhoneFormat" : "1063",
    "invalidBirthDate" : "1039",
    "invalidGender" : "1243",
    "invalidFirstName" : "1240",
    "invalidLastName" : "1241",
    "maximumOTTDailyError" : "1204",
    "bannedPassword" : "1217",
    "proofAlreadyExistsError" : "1246",
    "domainExistsInAad" : "1184",
    "domainExistsInAadSupportedLogin" : "1185",
    "membernameTakenEasi" : "1242",
    "membernameTakenPhone" : "1052",
    "signupBlocked" : "1220",
    "invalidMemberNameFormat" : "1064",
    "passwordRequired" : "1330",
    "emailMustStartWithLetter" : "1256",
    "evictionWarningRequired" : "1334"
  };
}(), !function() {
  registerNamespace("$Config.WLXAccount.signup");
  $Config.WLXAccount.signup.regularexpressions = {
    "LiveMembernameRegex" : "^(?:(?:[a-zA-Z])|(?:[\\w\\-](?:(?![\\.]{2,})[\\w\\.\\-]){0,62}[\\w\\-]))$",
    "MembernameRegex" : "^[a-zA-Z0-9_-]+(?:\\.[a-zA-Z0-9_-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$",
    "PwdValidInput" : "^[\\x20-\\x7e]{8,127}$",
    "AltEmailRegEx" : "^[a-zA-Z0-9!#$%\\x26'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%\\x26'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$",
    "PhoneNumberFormat" : "^[\\+]{0,1}([\\(\\)\\- \\*\\.#/\\[\\]]*\\d[\\(\\)\\- \\*\\.#/\\[\\]]*){4,20}$",
    "ProfileRegex" : "([\\x00-\\x1f]|[\\x21-\\x26]|[\\x28-\\x2c]|\\x2f|[\\x3a-\\x40]|[\\x5b-\\x5e]|\\x60|[\\x7b-\\x7f]|\\x81|\\xa0|\\xad)"
  };
}(), function() {
  registerNamespace("$Config.WLXAccount.signup");
  $Config.WLXAccount.signup.urls = {
    "error" : "error.aspx?errcode=",
    "queryUrl" : "query.aspx",
    "dataRequest" : {
      "createAccount" : "API/CreateAccount",
      "bannedPwd" : "API/CheckIfBannedPassword",
      "checkAvailable" : "API/CheckAvailableSigninNames",
      "getPhoneNumberDetails" : "API/GetPhoneNumberDetails",
      "sendOtt" : "API/Proofs/SendOtt",
      "createAndUpdateFamily" : "API/CreateAndUpdateFamily",
      "addPendingMember" : "API/AddPendingMemberToFamily"
    }
  };
  $Config.WLXAccount.signup.regex = {
    "verificationCode" : "^\\d{4}$",
    "verificationCodeInt" : "^0$|^\\d{4}$"
  };
  $Config.WLXAccount.signup.signupObservableSets = {
    "firstName" : {
      "name" : "firstName"
    },
    "lastName" : {
      "name" : "lastName"
    },
    "memberName" : {
      "name" : "memberName",
      "clientPrefillKey" : "PfUsernames"
    },
    "usernameRecoverySpeedbump" : {
      "name" : "usernameRecoverySpeedbump"
    },
    "password" : {
      "name" : "password"
    },
    "retypePassword" : {
      "name" : "retypePassword"
    },
    "country" : {
      "name" : "country"
    },
    "birthdate" : {
      "name" : "birthdate"
    },
    "birthdateHTML5" : {
      "name" : "birthdateHTML5"
    },
    "phoneCountry" : {
      "name" : "phoneCountry"
    },
    "phoneNumber" : {
      "name" : "phoneNumber"
    },
    "alternateEmail" : {
      "name" : "alternateEmail"
    },
    "hip" : {
      "name" : "hip"
    },
    "hipEnforcement" : {
      "name" : "hipEnforcement"
    },
    "verification" : {
      "name" : "verification"
    },
    "fedConfirm" : {
      "name" : "fedConfirm"
    },
    "fedPicker" : {
      "name" : "fedPicker"
    },
    "additionalLegalText" : {
      "name" : "additionalLegalText"
    },
    "optinEmailCheckbox" : {
      "name" : "optinEmailCheckbox"
    },
    "evictionSpeedbump" : {
      "name" : "evictionSpeedbump"
    },
    "evictionSpeedbumpErrorView" : {
      "name" : "evictionSpeedbumpErrorView"
    }
  };
}(), !function() {
  /** @type {string} */
  var noop = "credentials";
  /** @type {string} */
  var search = "cancel";
  /** @type {string} */
  var categoryId = "action";
  /** @type {string} */
  var action = "create";
  /** @type {string} */
  var block = "finalBack";
  /** @type {string} */
  var password = "password";
  /** @type {string} */
  var r = "usernameRecoverySpeedbump";
  /** @type {string} */
  var verification = "verification";
  /** @type {string} */
  var none = "fedConfirm";
  /** @type {string} */
  var tool = "fedPicker";
  /** @type {string} */
  var c = "fedSignInSpeedbump";
  /** @type {string} */
  var toggle = "profileAccrual";
  /** @type {string} */
  var screen = "birthDateCountryAccrual";
  /** @type {string} */
  var m = "birthDateAccrual";
  /** @type {string} */
  var newBlock = "childBlock";
  /** @type {string} */
  var privacy = "privacy";
  /** @type {string} */
  var v = "tou";
  /** @type {string} */
  var dataCollection = "dataCollection";
  /** @type {string} */
  var h = "dataUse";
  /** @type {string} */
  var retention = "retention";
  /** @type {string} */
  var opacity = "hip";
  /** @type {string} */
  var y = "hipEnforcement";
  /** @type {string} */
  var blocked = "blocked";
  /** @type {string} */
  var k = "impressum";
  /** @type {string} */
  var verbose = "deviceTicket";
  /** @type {string} */
  var activate = "cxhCancel";
  /** @type {string} */
  var toCenter = "cxhLocalAccount";
  /** @type {string} */
  var pushFooter = "evictionSpeedbump";
  /** @type {string} */
  var queryAll = "mojangSpeedbump";
  /** @type {string} */
  var name = "mojangCancel";
  /** @type {string} */
  var M = "upgradeChildSpeedbump";
  /** @type {string} */
  var twoStarDot = "membernamePasswordProfilePage";
  /** @type {string} */
  var H = "passwordProfilePage";
  /** @type {string} */
  var B = "evictionError";
  registerNamespace("$Config.WLXAccount.signup");
  var users = $Config.WLXAccount;
  var options = users && users.signup;
  var centeredNav = users && users.hasWin10NonOOBEBehavior;
  var me = options.page;
  var parent = options.viewContext;
  /** @type {boolean} */
  var error = 0 !== me.collectDob;
  /** @type {boolean} */
  var data = 0 !== me.collectFLName;
  var lookup = me.useKoreaPrivacy;
  var forceCenteredNav = options.fss.isFamilyAddMemberFlow;
  /** @type {boolean} */
  var val = !!me.fedStateToken;
  var value = val && me.fedNamesPrefill && 1 === me.fedNamesPrefill.length;
  var useToolingApi = val && me.fedNamesPrefill && me.fedNamesPrefill.length > 1;
  var notrigger = (me.isPasswordProfilePageExp, me.isMembernamePasswordProfilePageExp);
  var box = me.isFLOrder;
  /** @type {string} */
  var disableHeightInput = box ? "firstName" : "lastName";
  /** @type {string} */
  var disableWidthInput = box ? "lastName" : "firstName";
  /** @type {string} */
  options.startState = options.collectDeviceTicket ? verbose : value ? error && parent && parent.data && parent.data.prefill && parent.data.prefill.birthdate ? screen : none : useToolingApi ? tool : me.isMojangUpgrade && me.showMojangUpgradeSpeedbump ? queryAll : !me.isMojangUpgrade || me.showMojangUpgradeExp || options.prefillMembernameIsProof ? options.prefillMembernameIsProof && !me.showMojangUpgradeExp ? r : options.prefillMembernameIsPossiblyEvicted ? pushFooter : notrigger ? twoStarDot : noop : 
  password;
  options.options = {
    "states" : [verbose, noop, r, password, privacy, v, pushFooter, c, B, dataCollection, h, retention, opacity, y, blocked, verification, none, tool, toggle, screen, k, newBlock, queryAll, M, twoStarDot, H, m],
    "viewDefs" : {
      "deviceTicket" : {
        "pageId" : "Signup_GetDeviceTicketPage_Client",
        "sectionId" : "DeviceTicket",
        "control" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "pageNextAction" : categoryId
        },
        "actions" : {
          "privacy" : privacy,
          "tou" : v,
          "retention" : retention,
          "impressum" : k,
          "dataCollection" : dataCollection,
          "dataUse" : h
        }
      },
      "membernamePasswordProfilePage" : {
        "pageId" : "Signup_MembernamePasswordProfilePage_Client",
        "sectionId" : "MembernamePasswordProfilePage",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["memberName", "password", disableHeightInput, disableWidthInput, "country", "birthdate", "additionalLegalText", "optinEmailCheckbox"]
          },
          "focusFirstInput" : 1,
          "optInEmailId" : "iOptinEmail",
          "pageBackAction" : search,
          "pageNextAction" : categoryId,
          "pageTitle" : $Config.sharedStrings.pageTitle,
          "autoForm" : false
        },
        "actions" : {
          "cancel" : block,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "impressum" : k,
          "verification" : verification,
          "hip" : opacity,
          "blocked" : blocked,
          "evictionError" : B,
          "action" : action,
          "usernameRecoverySpeedbump" : r,
          "evictionSpeedbump" : pushFooter
        }
      },
      "credentials" : {
        "pageId" : "Signup_MemberNamePage_Client",
        "sectionId" : "Credentials",
        "control" : data || error ? "SignupControl" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : me.isPaginated ? me.showMojangUpgradeExp ? ["memberName", "password"] : ["memberName"] : ["memberName", "password", "additionalLegalText", "optinEmailCheckbox"],
            "stepCounter" : me.credentialsStep,
            "totalSteps" : me.totalStep
          },
          "focusFirstInput" : 1,
          "optInEmailId" : "iOptinEmail",
          "pageBackAction" : useToolingApi || me.showMojangUpgradeSpeedbump ? "backStack" : search,
          "pageNextAction" : categoryId,
          "pageTitle" : $Config.sharedStrings.pageTitle,
          "autoForm" : false
        },
        "actions" : {
          "cancel" : block,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "localAccount" : toCenter,
          "dataUse" : h,
          "retention" : retention,
          "impressum" : k,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "action" : data ? toggle : error ? screen : action,
          "verification" : verification,
          "password" : password,
          "usernameRecoverySpeedbump" : r,
          "evictionSpeedbump" : pushFooter,
          "fedSignInSpeedbump" : c,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "passwordProfilePage" : H,
          "backStack" : [tool, queryAll]
        }
      },
      "usernameRecoverySpeedbump" : {
        "pageId" : "Signup_UsernameRecoverySpeedbumpPage_Client",
        "sectionId" : "UsernameRecoverySpeedbump",
        "control" : !data && !error || notrigger ? "SignupCreateControl" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["usernameRecoverySpeedbump"]
          },
          "pageBackAction" : me.showMojangUpgradeSpeedbump || notrigger ? "backStack" : search,
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.usernameRecoverySpeedbumpPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : data ? toggle : error ? screen : action,
          "cancel" : noop,
          "password" : password,
          "verification" : verification,
          "finalBack" : block,
          "privacy" : privacy,
          "tou" : v,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "passwordProfilePage" : H,
          "fedSignInSpeedbump" : c,
          "backStack" : [queryAll, twoStarDot]
        }
      },
      "evictionSpeedbump" : {
        "pageId" : "Signup_EvictionSpeedbumpPage_Client",
        "sectionId" : "EvictionSpeedbump",
        "control" : !data && !error || notrigger ? "SignupCreateControl" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["evictionSpeedbump"]
          },
          "pageBackAction" : notrigger ? "backStack" : search,
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.evictionSpeedbumpPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : data ? toggle : error ? screen : action,
          "cancel" : noop,
          "password" : password,
          "verification" : verification,
          "finalBack" : block,
          "privacy" : privacy,
          "tou" : v,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "passwordProfilePage" : H,
          "backStack" : [twoStarDot]
        }
      },
      "evictionError" : {
        "pageId" : "Signup_EvictionErrorView_Client",
        "sectionId" : "EvictionError",
        "control" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["evictionSpeedbumpErrorView"]
          },
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.evictionSpeedbumpPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : password,
          "backStack" : [password, opacity, y, verification, M, twoStarDot, H, none, screen, toggle]
        }
      },
      "fedSignInSpeedbump" : {
        "pageId" : "Signup_FedSignInSpeedbumpPage_Client",
        "sectionId" : "FedSignInSpeedbump",
        "control" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.fedSignInSpeedbumpPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : password,
          "cancel" : block,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "password" : password,
          "impressum" : k,
          "credentials" : noop,
          "profileAccrual" : toggle,
          "birthDateCountryAccrual" : screen,
          "birthDateAccrual" : m,
          "evictionSpeedbump" : pushFooter,
          "usernameRecoverySpeedbump" : r,
          "verification" : verification,
          "fedPicker" : tool,
          "finalBack" : block,
          "backStack" : [m, screen, toggle, noop, r, pushFooter, verification, tool]
        }
      },
      "mojangSpeedbump" : {
        "pageId" : "Signup_MojangSpeedbumpPage_Client",
        "sectionId" : "MojangSpeedbump",
        "control" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "focusSubmit" : 1,
          "pageBackAction" : search,
          "pageNextAction" : categoryId,
          "pageTitle" : options.strings.mojangSpeedbumpTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : me.showMojangUpgradeExp || options.prefillMembernameIsProof ? options.prefillMembernameIsProof && !me.showMojangUpgradeExp ? r : noop : password,
          "cancel" : name,
          "password" : password,
          "usernameRecoverySpeedbump" : r,
          "credentials" : noop,
          "finalBack" : block,
          "privacy" : privacy,
          "tou" : v,
          "retention" : retention,
          "impressum" : k
        }
      },
      "passwordProfilePage" : {
        "pageId" : "Signup_PasswordProfilePage_Client",
        "sectionId" : "PasswordProfilePage",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["password", disableHeightInput, disableWidthInput, "country", "birthdate", "additionalLegalText", "optinEmailCheckbox"]
          },
          "optInEmailId" : "iOptinEmail",
          "focusFirstInput" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : $Config.sharedStrings.pageTitle,
          "autoForm" : false
        },
        "actions" : {
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "action" : action,
          "verification" : verification,
          "finalBack" : block,
          "usernameRecoverySpeedbump" : r,
          "evictionSpeedbump" : pushFooter,
          "backStack" : [noop, r, pushFooter]
        }
      },
      "password" : {
        "pageId" : "Signup_PasswordPage_Client",
        "sectionId" : "Password",
        "control" : data || error ? "SignupControl" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["password", "additionalLegalText", "optinEmailCheckbox"],
            "stepCounter" : me.passwordStep
          },
          "optInEmailId" : "iOptinEmail",
          "focusFirstInput" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.passwordPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "action" : data ? toggle : error ? screen : action,
          "verification" : verification,
          "finalBack" : block,
          "usernameRecoverySpeedbump" : r,
          "evictionSpeedbump" : pushFooter,
          "fedSignInSpeedbump" : c,
          "fedConfirm" : none,
          "backStack" : [noop, r, pushFooter, c, queryAll]
        }
      },
      "privacy" : {
        "pageId" : "Signup_PrivacyPage_Client",
        "sectionId" : "TOUPrivacy",
        "control" : "TouPrivacyControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "isPrivacy" : 1,
          "command" : lookup ? "koreaprivacy" : "privacy",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "tou" : {
        "pageId" : "Signup_TouPage_Client",
        "sectionId" : "TOUPrivacy",
        "control" : "TouPrivacyControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "isPrivacy" : 0,
          "command" : "tou",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "privacy" : privacy,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "impressum" : {
        "pageId" : "Signup_ImpressumPage_Client",
        "sectionId" : "Impressum",
        "control" : "SignupControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "dataCollection" : {
        "pageId" : "Signup_DataCollectionPage_Client",
        "sectionId" : "TOUPrivacy",
        "control" : "TouPrivacyControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "command" : "koreaprivacyextract",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataUse" : h,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "dataUse" : {
        "pageId" : "Signup_DataUsePage_Client",
        "sectionId" : "TOUPrivacy",
        "control" : "TouPrivacyControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "command" : "koreaprivacyextract",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "retention" : retention,
          "impressum" : k,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "retention" : {
        "pageId" : "Signup_DataRetentionPage_Client",
        "sectionId" : "TOUPrivacy",
        "control" : "TouPrivacyControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "command" : "koreaprivacyextract",
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : noop,
          "cancel" : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "impressum" : k,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "fedSignInSpeedbump" : c,
          "backStack" : [verbose, noop, password, verification, opacity, y, blocked, toggle, screen, none, tool, c, twoStarDot, H]
        }
      },
      "hip" : {
        "pageId" : "Signup_HipPage_Client",
        "sectionId" : "HipPane",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["hip"]
          },
          "focusFirstInput" : 1,
          "focusHipPostLoad" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : $Config.sharedStrings.hipHeading,
          "autoForm" : false
        },
        "actions" : {
          "action" : action,
          "cancel" : value ? none : useToolingApi ? tool : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "impressum" : k,
          "evictionError" : B,
          "credentials" : noop,
          "password" : password,
          "verification" : verification,
          "fedConfirm" : none,
          "birthDateAccrual" : m,
          "fedPicker" : tool,
          "membernamePasswordProfilePage" : twoStarDot,
          "passwordProfilePage" : H,
          "backStack" : [verbose, noop, password, verification, blocked, toggle, m, screen, none, tool, c, twoStarDot, H]
        }
      },
      "hipEnforcement" : {
        "pageId" : "Signup_HipEnforcementPage_Client",
        "sectionId" : "HipEnforcement",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["hipEnforcement"]
          },
          "focusFirstInput" : 1,
          "focusHipPostLoad" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : $Config.sharedStrings.hipHeading,
          "autoForm" : false
        },
        "actions" : {
          "action" : action,
          "cancel" : value ? none : useToolingApi ? tool : noop,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "credentials" : noop,
          "password" : password,
          "verification" : verification,
          "fedConfirm" : none,
          "birthDateAccrual" : m,
          "fedPicker" : tool,
          "membernamePasswordProfilePage" : twoStarDot,
          "passwordProfilePage" : H,
          "backStack" : [verbose, noop, password, verification, blocked, toggle, screen, m, none, tool, c, twoStarDot, H]
        }
      },
      "blocked" : {
        "pageId" : "Signup_BlockedPage_Client",
        "sectionId" : "Blocked",
        "control" : "PageDialogControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "pageBackAction" : search,
          "pageNextAction" : categoryId,
          "autoForm" : false
        },
        "actions" : {
          "action" : centeredNav ? toCenter : block,
          "cancel" : centeredNav ? forceCenteredNav ? activate : toCenter : block,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "impressum" : k
        }
      },
      "verification" : {
        "pageId" : "Signup_VerificationPage_Client",
        "sectionId" : "Verification",
        "control" : val ? "SignupControl" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : me.isPaginated && !val ? ["verification", "additionalLegalText", "optinEmailCheckbox"] : ["verification"],
            "stepCounter" : me.verificationStep
          },
          "optInEmailId" : "iOptinEmail",
          "focusFirstInput" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : $Config.sharedStrings.lblVerificationCode,
          "autoForm" : false
        },
        "actions" : {
          "action" : val ? none : action,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "credentials" : noop,
          "password" : password,
          "profileAccrual" : toggle,
          "birthDateCountryAccrual" : screen,
          "birthDateAccrual" : m,
          "evictionSpeedbump" : pushFooter,
          "usernameRecoverySpeedbump" : r,
          "fedSignInSpeedbump" : c,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "membernamePasswordProfilePage" : twoStarDot,
          "passwordProfilePage" : H,
          "backStack" : [m, screen, toggle, password, noop, pushFooter, r, c, tool, twoStarDot, H]
        }
      },
      "fedConfirm" : {
        "pageId" : "Signup_FedConfirmPage_Client",
        "sectionId" : "FedConfirm",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["fedConfirm", "additionalLegalText"]
          },
          "focusFirstInput" : 1,
          "pageBackAction" : value && options.startState === none ? search : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.fedConfirmPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : action,
          "cancel" : block,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "credentials" : noop,
          "profileAccrual" : toggle,
          "birthDateCountryAccrual" : screen,
          "birthDateAccrual" : m,
          "evictionSpeedbump" : pushFooter,
          "usernameRecoverySpeedbump" : r,
          "verification" : verification,
          "fedPicker" : tool,
          "backStack" : [m, screen, toggle, noop, r, pushFooter, verification, tool]
        }
      },
      "fedPicker" : {
        "pageId" : "Signup_FedPickerPage_Client",
        "sectionId" : "FedPicker",
        "control" : data || error ? "SignupControl" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["fedPicker"]
          },
          "pageBackAction" : search,
          "pageNextAction" : categoryId,
          "pageTitle" : options.strings.fedPickerPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : data ? toggle : error ? screen : action,
          "cancel" : block,
          "privacy" : privacy,
          "tou" : v,
          "impressum" : k,
          "fedConfirm" : none,
          "credentials" : noop,
          "password" : password,
          "verification" : verification
        }
      },
      "profileAccrual" : {
        "pageId" : "Signup_ProfileAccrualPage_Client",
        "userAction" : "Action_ClientSideTelemetry",
        "sectionId" : "ProfileAccrual",
        "control" : error ? "SignupControl" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : [disableHeightInput, disableWidthInput],
            "stepCounter" : me.profileAccrualStep
          },
          "focusFirstInput" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.overrideStrings && options.overrideStrings.profileAccrualPageTitle ? options.overrideStrings.profileAccrualPageTitle : $Config.sharedStrings.profileAccrualPageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : error ? "birthDateCountryAccrual" : action,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "credentials" : noop,
          "verification" : verification,
          "hip" : "hip",
          "password" : password,
          "evictionSpeedbump" : pushFooter,
          "usernameRecoverySpeedbump" : r,
          "fedSignInSpeedbump" : c,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "backStack" : [password, noop, pushFooter, r, c, tool]
        }
      },
      "birthDateCountryAccrual" : {
        "pageId" : "Signup_BirthdatePage_Client",
        "userAction" : "Action_ClientSideTelemetry",
        "sectionId" : "BirthDateCountryAccrual",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : me.isMojangUpgrade ? ["country", "birthdate", "additionalLegalText"] : error ? ["country", "birthdate"] : [],
            "stepCounter" : me.birthDateCountryAccrualStep
          },
          "focusFirstInput" : 1,
          "pageBackAction" : options.startState === screen ? search : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.birthdatePageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : action,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k,
          "credentials" : noop,
          "verification" : verification,
          "password" : password,
          "profileAccrual" : toggle,
          "evictionSpeedbump" : pushFooter,
          "usernameRecoverySpeedbump" : r,
          "fedSignInSpeedbump" : c,
          "fedConfirm" : none,
          "fedPicker" : tool,
          "childBlock" : newBlock,
          "birthDateAccrual" : m,
          "upgradeChildSpeedbump" : M,
          "cancel" : me.isMojangUpgrade ? name : block,
          "backStack" : [toggle, password, noop, pushFooter, r, c, tool]
        }
      },
      "birthDateAccrual" : {
        "pageId" : "Signup_BirthdateNoCountryPage_Client",
        "userAction" : "Action_ClientSideTelemetry",
        "sectionId" : "BirthDateAccrual",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "viewModelOptions" : {
            "observables" : ["birthdate"],
            "stepCounter" : me.birthDateCountryAccrualStep
          },
          "focusFirstInput" : 1,
          "pageBackAction" : "backStack",
          "pageNextAction" : categoryId,
          "showIdentityBanner" : 1,
          "pageTitle" : options.strings.birthdatePageTitle,
          "autoForm" : false
        },
        "actions" : {
          "action" : action,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "hip" : opacity,
          "hipEnforcement" : y,
          "blocked" : blocked,
          "impressum" : k,
          "verification" : verification,
          "childBlock" : newBlock,
          "upgradeChildSpeedbump" : M,
          "birthDateCountryAccrual" : screen,
          "cancel" : block,
          "backStack" : [screen]
        }
      },
      "childBlock" : {
        "pageId" : "Signup_ChildBlockedPage_Client",
        "sectionId" : "ChildBlocked",
        "control" : "PageDialogControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "pageBackAction" : search,
          "pageNextAction" : categoryId
        },
        "actions" : {
          "action" : name,
          "cancel" : screen,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "blocked" : blocked,
          "impressum" : k
        }
      },
      "upgradeChildSpeedbump" : {
        "pageId" : "Signup_UpgradeChildSpeedbumpPage_Client",
        "sectionId" : "UpgradeChildSpeedbump",
        "control" : "SignupCreateControl",
        "options" : {
          "viewModel" : "SignupViewModel",
          "focusSubmit" : 1,
          "pageBackAction" : search,
          "pageNextAction" : categoryId
        },
        "actions" : {
          "action" : action,
          "cancel" : name,
          "privacy" : privacy,
          "tou" : v,
          "dataCollection" : dataCollection,
          "dataUse" : h,
          "retention" : retention,
          "blocked" : blocked,
          "evictionError" : B,
          "impressum" : k
        }
      },
      "mojangCancel" : {
        "url" : options.mojangCancelUrl
      },
      "finalBack" : {}
    }
  };
  if (!me.isPaginated) {
    delete options.options.viewDefs.password;
  }
}(), function() {
  /** @type {!Window} */
  var o = window;
  var node = o.wLive;
  var account = node.Account;
  jQuery(function() {
    ko.components.register("convergedTouPrivacy", {
      "viewModel" : function(el) {
        return el;
      },
      "synchronous" : true,
      "template" : $Config.WLXAccount.signup.strings.convergedTouPrivacyText
    });
    ko.components.register("signupButtons", {
      "viewModel" : function(e) {
        return e = e || {
          "isBottomMostElement" : false,
          "showBackButtonOnV2" : false,
          "showCancelButton" : false
        }, ko.utils.extend(account.ftrViewModelHandle, e);
      },
      "synchronous" : true,
      "template" : '<div class="row">    <div class="button-container" data-bind="css: {\'no-margin-bottom\': isBottomMostElement }">        <div class="col-xs-24" data-bind="visible: buttons.consentCreateButton.visible()">            <input type="submit" id="iConsentAction" onclick="OnNext(); return false;" class="btn btn-block btn-primary" data-bind="attr: { disabled: buttons.nextButton.disabled() }, visible: buttons.nextButton.visible(), value: strings.createBtnText" />        </div>        \x3c!-- ko if: showBackButtonOnV2 --\x3e        <div class="inline-block" data-bind="css: { \'col-xs-24\': !buttons.nextButton.visible() || buttons.consentCreateButton.visible() }, visible: buttons.backButton.visible()">            <input type="button" id="iSignupCancel" onclick="OnBack(); return false;" class="btn btn-block" data-bind="attr: { disabled: buttons.backButton.disabled() }, value: strings.backButton" />        </div>        \x3c!-- /ko --\x3e        \x3c!-- ko if: showCancelButton --\x3e        <div class="inline-block" data-bind="css: { \'col-xs-24\': !buttons.nextButton.visible() || buttons.consentCreateButton.visible() }, visible: buttons.cancelButton.visible()">            <input type="button" id="SignupCancel" class="btn btn-block" data-bind="attr: { disabled: buttons.cancelButton.disabled() }, value: strings.cancelButton" />        </div>        \x3c!-- /ko --\x3e        <div class="inline-block" data-bind="visible: buttons.nextButton.visible() && !buttons.consentCreateButton.visible()">            <input type="submit" id="iSignupAction" onclick="OnNext(); return false;" class="btn btn-block btn-primary" data-bind="attr: { disabled: buttons.nextButton.disabled() }, visible: buttons.nextButton.visible(), value: strings.nextButton" />        </div>    </div></div>'
    });
    ko.components.register("convergedBanner", {
      "viewModel" : function(el) {
        return el;
      },
      "template" : '<div class="identityBanner" data-bind="if: memberName && showIdentityBanner, visible: memberName && showIdentityBanner">                <button type="button" id="iSignupCancel" class="backButton" data-bind="visible: isBackButtonVisible, attr: { \'aria-label\': strings.backButton }" onclick="OnBack(); return false;">                    <img role="presentation" data-bind="attr: { src: arrowImg }" />                </button>                <div class="identity" data-bind="text: memberName"></div>            </div>'
    });
  });
}(), function() {
  /**
   * @param {string} firmId
   * @param {boolean} mTouchForces
   * @return {?}
   */
  function render(firmId, mTouchForces) {
    var self = {
      "buttons" : {},
      "text" : {}
    };
    var serviceButton = {};
    serviceButton.disabled = ko.observable(false);
    serviceButton.visible = ko.observable(true);
    var cContent = {};
    cContent.visible = ko.observable(mTouchForces && 0 === p.noConsentText);
    var btn = {};
    btn.disabled = ko.observable(false);
    btn.visible = ko.observable(true);
    var cancelButton = {};
    return cancelButton.disabled = ko.observable(false), cancelButton.visible = ko.observable(true), self.buttons.nextButton = serviceButton, self.buttons.consentCreateButton = cContent, self.buttons.backButton = btn, self.buttons.cancelButton = cancelButton, self.text.visible = ko.computed(function() {
      return mTouchForces && self.buttons.nextButton.visible();
    }), self.buttons.visible = ko.computed(function() {
      return self.buttons.nextButton.visible() || self.buttons.backButton.visible();
    }), self.additionalLegalText = firmId, options && (self.strings = options.strings, self.config = options.page), self;
  }
  /**
   * @param {?} val
   * @return {?}
   */
  function isFunction(val) {
    /** @type {boolean} */
    var point = !!p.fedStateToken;
    /** @type {boolean} */
    var n = 0 !== p.pwdless && val === options.memberNameType.Phone;
    /** @type {boolean} */
    var i = 0 !== p.pwdlessemail && val === options.memberNameType.EASI;
    return !(point || p.showMojangUpgradeExp || n || i);
  }
  /**
   * @param {?} args
   * @return {?}
   */
  function buildDaoOnEventParamMap(args) {
    return p.isPaginated && isFunction(args);
  }
  /**
   * @return {?}
   */
  function i() {
    return p.isMembernamePasswordProfilePageExp;
  }
  /**
   * @return {?}
   */
  function root() {
    return p.isPasswordProfilePageExp;
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function walk(value) {
    /** @type {boolean} */
    var usageData = false;
    if (0 !== options.autoVerify) {
      var ret = options.viewContext.data;
      if (ret.reporting && ret.reporting.autoVerifyShown) {
        return false;
      }
      if (value && (value = value.replace(/[^0-9]/g, "")), ret.devicePhone) {
        var datas = ret.devicePhone;
        jQuery.each(datas, function(n, options) {
          return options && options.phoneNumber && value && value.indexOf(options.phoneNumber) >= 0 ? (usageData = true, false) : void 0;
        });
      }
    }
    return usageData;
  }
  /**
   * @param {?} value
   * @param {boolean} options
   * @return {?}
   */
  function numberUS(value, options) {
    return !isArray || value.isSwitchingToNext ? true : options || !value.hasValidatedError ? false : true;
  }
  /**
   * @param {string} key
   * @param {string} parent
   * @param {boolean} v
   * @return {?}
   */
  function isChild(key, parent, v) {
    /** @type {boolean} */
    var can_update = false;
    var map = options.countryDetailMap;
    /** @type {number} */
    var x = 18;
    var y = v ? x : map && map[parent] ? map[parent].childAge : 0;
    if (parent && key && 0 !== y) {
      /** @type {string} */
      var day = "";
      /** @type {string} */
      var month = "";
      /** @type {string} */
      var from = "";
      var enmlHash = key.split(":");
      if (3 === enmlHash.length) {
        /** @type {number} */
        day = parseInt(enmlHash[0] || "31");
        /** @type {number} */
        month = parseInt(enmlHash[1] || "12") - 1;
        /** @type {number} */
        from = parseInt(enmlHash[2]);
      }
      /** @type {!Date} */
      var max = new Date;
      /** @type {!Date} */
      var date = new Date(from + y, month, day);
      /** @type {boolean} */
      can_update = date > max;
    }
    return can_update;
  }
  /** @type {!Window} */
  var o = window;
  var node = o.wLive;
  var registration = o.$Config.WLXAccount;
  var options = registration.signup;
  var p = options.page;
  /** @type {boolean} */
  var isArray = !!p.useNewValidationBehavior;
  registerNamespace("wLive.Account.SignupHelper");
  /** @type {function(string, boolean): ?} */
  node.Account.SignupHelper.createFooterObservable = render;
  /** @type {function(?): ?} */
  node.Account.SignupHelper.passwordIsRequired = isFunction;
  /** @type {function(?): ?} */
  node.Account.SignupHelper.paginatedPasswordIsRequired = buildDaoOnEventParamMap;
  /** @type {function(string): ?} */
  node.Account.SignupHelper.isAutoVerificationSupported = walk;
  /** @type {function(?, boolean): ?} */
  node.Account.SignupHelper.shouldValidate = numberUS;
  /** @type {function(): ?} */
  node.Account.SignupHelper.isMembernamePasswordProfilePage = i;
  /** @type {function(): ?} */
  node.Account.SignupHelper.isPasswordProfilePage = root;
  /** @type {function(string, string, boolean): ?} */
  node.Account.SignupHelper.isChild = isChild;
}(), function() {
  /** @type {!Window} */
  var root = window;
  var node = root.wLive;
  var exports = root.$DataRequest;
  var $ = root.jQuery;
  var scope = node.Account;
  var utils = scope.Extensions.Utils;
  var h = scope.FieldHelper;
  var assert = scope.SignupHelper;
  var URI = scope.Util && scope.Util.HighContrast;
  /** @type {null} */
  var syntax = null;
  var logger = root.MSA && root.MSA.CXH;
  var that = root.$Config.WLXAccount;
  var self = (that.hip, that.signup);
  var m = self.memberNameType;
  var options = self.page;
  var obj = {};
  var test = {};
  var data = {};
  var config = {};
  var item = {};
  var result = self.signupObservableSets;
  var malakh = that.hasWin10Behavior;
  var CircularList = that.isWin10;
  var error = that.isWin10InclusiveOOBE;
  var response = that.isXbox;
  /** @type {boolean} */
  var isArr = !!options.useNewValidationBehavior;
  /** @type {number} */
  var _ENTER_KEYCODE = 13;
  /** @type {string} */
  var EVENT_UNDO = "onAction";
  /** @type {string} */
  var actionName = "credentials";
  $Do.when("ExternalHelper", 0, function() {
    syntax = root.ExternalHelper;
  });
  defineNamespace("wLive.Account.SignupObservableFactory", {
    "createObservableSetByPrefillName" : function(startIndex, count, i) {
      var ep = node.Account.SignupObservableFactory;
      switch(data = self.strings, config = data.errors, test = self.urls.dataRequest, item = self.errorCodes, obj = self.regex, startIndex) {
        case result.firstName.name:
          return ep.createFirstNameObservableSet(count, i);
        case result.lastName.name:
          return ep.createLastNameObservableSet(count, i);
        case result.memberName.name:
          return ep.createMemberNameObservableSet(count, i);
        case result.usernameRecoverySpeedbump.name:
          return ep.createUsernameRecoverySpeedbumpObservableSet(count, i);
        case result.password.name:
          return ep.createPasswordObservableSet(count, i);
        case result.retypePassword.name:
          return ep.createRetypePasswordObservableSet(count, i);
        case result.country.name:
          return ep.createCountryObservableSet(count, i);
        case result.birthdate.name:
          return ep.createBirthdateObservableSet(count, i);
        case result.birthdateHTML5.name:
          return ep.createBirthdateHTML5ObservableSet(count, i);
        case result.phoneCountry.name:
          return ep.createPhoneCountryObservableSet(count, i);
        case result.phoneNumber.name:
          return ep.createPhoneNumberObservableSet(count, i);
        case result.alternateEmail.name:
          return ep.createAlternateEmailObservableSet(count, i);
        case result.hip.name:
          return ep.createHipObservableSet(count, i);
        case result.hipEnforcement.name:
          return ep.createHipEnforcementObservableSet(count, i);
        case result.verification.name:
          return ep.createVerificationObservableSet(count, i);
        case result.fedConfirm.name:
          return ep.createFedConfirmObservableSet(count, i);
        case result.fedPicker.name:
          return ep.createFedPickerObservableSet(count, i);
        case result.additionalLegalText.name:
          return ep.createAdditionalLegalTextObservableSet(count, i);
        case result.optinEmailCheckbox.name:
          return ep.createOptinEmailCheckboxObservableSet(count, i);
        case result.evictionSpeedbump.name:
          return ep.createEvictionSpeedbumpObservableSet(count, i);
        case result.evictionSpeedbumpErrorView.name:
          return ep.createEvictionSpeedbumpErrorObservableSet(count, i);
        default:
          return null;
      }
    },
    "createFirstNameObservableSet" : function(name, t) {
      var $scope = {};
      if ((assert.isPasswordProfilePage() || assert.isMembernamePasswordProfilePage()) && 0 === options.collectFLName) {
        return $scope;
      }
      if (!name && syntax) {
        name = syntax.getProperty("PfFirstName");
      }
      var $ = $scope.firstName = ko.observable(name || "");
      $.extend({
        "required" : {
          "onlyIf" : function() {
            return assert.shouldValidate($);
          },
          "params" : true,
          "message" : config.required
        }
      }).extend({
        "notMatchingPattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate($);
          },
          "params" : obj.ProfileRegex,
          "message" : config.invalidFirstName
        }
      });
      /**
       * @return {undefined}
       */
      var validate = function() {
        $scope.firstName.suppressMessages(false);
        self.viewContext.data.input[result.firstName.name] = $scope.firstName();
      };
      return $scope.firstName.suppressMessages = ko.observable(true), $scope.firstName.subscribe(validate), $scope.firstName.serverError = t, $scope.firstName.focused = ko.observable(false), name && validate(), $scope;
    },
    "createLastNameObservableSet" : function(name, t) {
      var $scope = {};
      if ((assert.isPasswordProfilePage() || assert.isMembernamePasswordProfilePage()) && 0 === options.collectFLName) {
        return $scope;
      }
      if (!name && syntax) {
        name = syntax.getProperty("PfLastName");
      }
      var $ = $scope.lastName = ko.observable(name || "");
      $.extend({
        "required" : {
          "onlyIf" : function() {
            return assert.shouldValidate($);
          },
          "params" : true,
          "message" : config.required
        }
      }).extend({
        "notMatchingPattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate($);
          },
          "params" : obj.ProfileRegex,
          "message" : config.invalidLastName
        }
      });
      /**
       * @return {undefined}
       */
      var validate = function() {
        $scope.lastName.suppressMessages(false);
        self.viewContext.data.input[result.lastName.name] = $scope.lastName();
      };
      return $scope.lastName.suppressMessages = ko.observable(true), $scope.lastName.subscribe(validate), $scope.lastName.serverError = t, $scope.lastName.focused = ko.observable(false), name && validate(), $scope;
    },
    "createMemberNameObservableSet" : function(to, _) {
      /**
       * @param {string} s
       * @return {?}
       */
      function select(s) {
        if (s && options.isPaginated && self.googleFederationDomains && self.googleFederationDomains.length) {
          var previousSelector = (s.split("@")[1] || "").toLowerCase();
          /** @type {boolean} */
          var n = $.inArray(previousSelector, self.googleFederationDomains) >= 0;
          if (n) {
            return true;
          }
        }
        return false;
      }
      var $scope = {};
      /** @type {boolean} */
      var isValid = 0 !== options.supportsPhone;
      var i = $scope.domains = self.domains;
      var content = self.defaultDomain;
      /** @type {string} */
      var country = "";
      /** @type {string} */
      var title = "";
      var cache = self.viewContext.data.prefill[result.memberName.name];
      var $2 = self.viewContext.data.prefill[result.country.name];
      /** @type {boolean} */
      var H = false;
      /** @type {boolean} */
      $scope.showCredentialsView = true;
      /** @type {boolean} */
      $scope.showLegalText = !options.isPaginated;
      if ($2) {
        country = $2;
      }
      var value = isValid ? self.memberNameType.Phone : self.memberNameType.EASI;
      if (self.isWin10Desktop) {
        value = self.memberNameType.EASI;
      }
      var newBanIsRemoved = cache && cache[m.Live] && cache[m.Live].length > 0;
      var enabled = cache && cache[m.EASI] && cache[m.EASI].length > 0;
      var usersDetailsRecord = isValid && cache && cache[m.Phone] && cache[m.Phone].length > 0;
      /** @type {boolean} */
      var nativeOverflow = !newBanIsRemoved && !enabled && !usersDetailsRecord;
      /** @type {boolean} */
      var fullCalendar = "Default_Live" === self.fl && !newBanIsRemoved;
      /** @type {boolean} */
      var oldBanIsTemp = "Default_EASI" === self.fl && !enabled;
      /** @type {boolean} */
      var oldBanIsPerm = "Default_Phone" === self.fl && !usersDetailsRecord;
      if (to) {
        if (title = self.viewContext.data.input.memberNameInput, value = h.getMemberNameType(to, i), value === m.Live) {
          var matches = to.split("@");
          if (matches && matches.length > 1) {
            content = matches[1];
          }
        } else {
          if (isValid && value === m.Phone) {
            country = self.viewContext.data.input.memberNamePhoneCountry;
          }
        }
      } else {
        if (isValid && ("Phone" === self.fl || "Always_Default_Phone" === self.fl || "Default_Phone" === self.fl && (usersDetailsRecord || nativeOverflow) || usersDetailsRecord && (fullCalendar || oldBanIsTemp))) {
          value = m.Phone;
          if (usersDetailsRecord) {
            title = cache[m.Phone][0].phoneNumber;
            country = cache[m.Phone][0].country;
          }
        } else {
          if ("EASI" === self.fl || "Default_EASI" === self.fl && (enabled || nativeOverflow) || enabled && (fullCalendar || oldBanIsPerm)) {
            value = m.EASI;
            if (enabled) {
              title = cache[m.EASI][0].email;
            }
          } else {
            if ("Live" === self.fl || "Default_Live" === self.fl && (newBanIsRemoved || nativeOverflow) || newBanIsRemoved && (oldBanIsTemp || oldBanIsPerm)) {
              if (value = m.Live, newBanIsRemoved) {
                var B = cache[m.Live][0].email.split("@");
                title = B[0];
                content = B[1];
              }
            } else {
              if ("Email" === self.fl) {
                if (value = m.EASI, enabled) {
                  title = cache[m.EASI][0].email;
                } else {
                  if (newBanIsRemoved) {
                    value = m.Live;
                    B = cache[m.Live][0].email.split("@");
                    title = B[0];
                    content = B[1];
                  }
                }
              }
            }
          }
        }
      }
      var join = $scope.memberNameType = ko.observable(encodeURI(value));
      self.viewContext.memberNameType = join;
      join.subscribe(function() {
        resolve("");
        expectHello("");
      });
      var stringifyValue = $scope.domain = ko.observable(content || i[0]);
      /** @type {function(string): ?} */
      var $ = ($scope.placeholder = ko.computed(function() {
        switch(join()) {
          case m.EASI:
            return data.usernamePlaceholderEASI;
          case m.Phone:
            return data.usernamePlaceholderPhone;
          case m.Live:
            return data.usernamePlaceholderLive;
          default:
            return "";
        }
      }), $scope.memberNameAriaLabel = ko.computed(function() {
        switch(join()) {
          case m.Phone:
            return data.ariaLblUsernamePhone;
          case m.Live:
          case m.EASI:
            return data.ariaLblUsernameEmail;
          default:
            return "";
        }
      }), $scope.xboxMemberNameAriaLabel = ko.computed(function() {
        switch(join()) {
          case m.Live:
            return data.xboxLiveLabel;
          case m.EASI:
            return data.xboxEasiLabel;
          default:
            return "";
        }
      }), $scope.emailDomainOptionsMenuAriaLabel = ko.observable(data.emailDomainOptionsMenuAriaLabel), $scope.cssWin10InclusiveOOBE = ko.computed(function() {
        return join() === m.Live ? "win-textbox win-textarea md padding" : join() === m.Phone ? "win-textbox md" : "win-textbox win-textarea";
      }), function(data) {
        var opts = self.phoneCountryListJson;
        var pages = data || opts["default"];
        /** @type {null} */
        var regtoken = null;
        $scope.memberNamePhoneCountries = opts.list;
        /** @type {number} */
        var key = 0;
        var x = $scope.memberNamePhoneCountries.length;
        for (; x > key; key++) {
          if ($scope.memberNamePhoneCountries[key].iso === pages) {
            return $scope.memberNamePhoneCountries[key];
          }
          if ($scope.memberNamePhoneCountries[key].iso === opts["default"]) {
            regtoken = $scope.memberNamePhoneCountries[key];
          }
        }
        return regtoken;
      });
      var encode = $scope.memberNameInput = ko.observable(title || "");
      if ("EASI" !== self.fl && "Live" !== self.fl && "Phone" !== self.fl) {
        encode.subscribe(function(x) {
          var self = this;
          if (self.memberNameType() !== m.Phone) {
            var fx = h.getMemberNameType(x, self.domains);
            if (fx === m.EASI) {
              if (isArr) {
                self.switchMemberNameType(m.EASI);
                encode(x);
              } else {
                self.memberNameType(m.EASI);
              }
            } else {
              if (fx === m.Live) {
                var domains = x.split("@");
                if (isArr) {
                  self.switchMemberNameType(m.Live);
                  self.memberNameInput(domains[0]);
                } else {
                  self.domain(domains[1]);
                  self.memberNameInput(domains[0]);
                  self.memberNameType(m.Live);
                }
              }
            }
          } else {
            /** @type {string} */
            self.viewContext.data.input[result.verification.name] = "";
          }
          self.memberNameSuccessMessage("");
          self.memberNameExistsMessage("");
        }, $scope);
      }
      if (isValid) {
        $scope.memberNamePhoneCountryObj = ko.observable($(country));
      }
      var resolve = $scope.memberNameSuccessMessage = ko.observable("");
      var expectHello = $scope.memberNameExistsMessage = ko.observable("");
      var messageChildren = $scope.memberNameSuggestions = ko.observableArray([]);
      var gotoNewOfflinePage = $scope.showSuggestions = ko.observable(false);
      /**
       * @return {undefined}
       */
      $scope.onClickSuggestionsLink = function() {
        /** @type {boolean} */
        var e = messageChildren().length > 0;
        if (e) {
          $ReportEvent.Fire("Signup_SuggestionClick_UserAction");
          if ($("#CredentialsSuggestionsModal").length > 0) {
            $("#CredentialsSuggestionsModal").modal("show");
          }
          if (CircularList) {
            $("#MemberNameSuggestions").show();
          }
          gotoNewOfflinePage(true);
          var inlineEditor2 = $("a,button,input[type=button]").not(":hidden").first();
          inlineEditor2.focus();
          if (scope.ftrViewModelHandle) {
            scope.ftrViewModelHandle.buttons.backButton.visible(false);
            scope.ftrViewModelHandle.buttons.nextButton.visible(false);
          }
        }
      };
      /**
       * @param {?} option
       * @param {?} item
       * @return {undefined}
       */
      $scope.setOptionData = function(option, item) {
        ko.applyBindingsToNode(option, {
          "attr" : {
            "data-value" : item.iso
          }
        }, item);
      };
      /**
       * @param {string} clusterShardData
       * @return {undefined}
       */
      $scope.onPickSuggestion = function(clusterShardData) {
        if (clusterShardData) {
          var value = clusterShardData.split("@");
          if (value && value.length > 1) {
            encode(value[0]);
            stringifyValue(value[1]);
          }
          $scope.onSuggestionsClose();
        }
      };
      /**
       * @return {undefined}
       */
      $scope.onSuggestionsClose = function() {
        if ($("#CredentialsSuggestionsModal").length > 0 && $("#CredentialsSuggestionsModal").modal("hide"), gotoNewOfflinePage(false), "iSuggCancel" === event.target.id) {
          var zipinput = $("#suggLink");
        } else {
          zipinput = $("#MemberName");
        }
        zipinput.focus();
        if (scope.ftrViewModelHandle) {
          scope.ftrViewModelHandle.buttons.backButton.visible(0 === options.noAuthCancel);
          scope.ftrViewModelHandle.buttons.nextButton.visible(true);
        }
      };
      var c = self.viewContext.data.previouslyCheckedMemberName || "";
      /** @type {boolean} */
      var _objectTemplate = false;
      /**
       * @param {number} type
       * @param {string} selector
       * @return {undefined}
       */
      var compile = function(type, selector) {
        if (type === m.Live) {
          resolve(config.memberNameAvailable.format(selector));
        } else {
          if (type === m.EASI) {
            resolve(config.memberNameAvailableEasi);
          }
        }
      };
      /**
       * @param {number} value
       * @param {string} key
       * @param {!Object} matrix
       * @param {!Object} type
       * @param {boolean} id
       * @param {?} el
       * @param {string} name
       * @param {number} data
       * @return {?}
       */
      var init = function(value, key, matrix, type, id, el, name, data) {
        var name = config.memberNameTaken;
        var index = config.memberNameTakenNoSugg;
        /** @type {string} */
        var msg = "";
        /** @type {string} */
        var v = "";
        var message = error || response || value === item.membernameTakenEasi;
        if (self.displaySignInLinkInMnError && 0 !== self.displaySignInLinkInMnError || self.autoRedirToSignInOnMnTakenError) {
          self.signinUrl = $Utility.addQueryString(self.signinUrl, "username", key || "");
          name = config.memberNameTaken.format(key, self.signinUrl);
          msg = config.memberNameTakenEasi.format(key, self.signinUrl);
          v = config.memberNameTakenPhone.format(key, self.signinUrl);
        } else {
          msg = config.memberNameTakenEasi.format(key);
          v = config.memberNameTakenPhone.format(key);
        }
        /** @type {null} */
        var result = null;
        switch(value) {
          case item.domainExistsInAad:
            result = {
              "isValid" : false,
              "message" : config.domainExistsInAad.format("domainExistsInAadSwitchToOutlook")
            };
            break;
          case item.domainExistsInAadSupportedLogin:
            result = {
              "isValid" : false,
              "message" : config.domainExistsInAadSupportedLogin.format(key)
            };
            break;
          case item.domainIsReserved:
          case item.domainNotAllowed:
            result = {
              "isValid" : false,
              "message" : config.domainNotAllowed
            };
            break;
          case item.signupBlocked:
            result = {
              "isValid" : false,
              "message" : config.signupBlocked.format(key)
            };
            break;
          case item.invalidEmailFormat:
            result = {
              "isValid" : false,
              "message" : config.invalidEmailFormat
            };
            break;
          case item.invalidPhoneFormat:
            result = {
              "isValid" : false,
              "message" : config.invalidPhoneFormat
            };
            break;
          case item.invalidMemberNameFormat:
            result = {
              "isValid" : false,
              "message" : isValid && join() === m.Phone ? config.invalidPhoneFormat : config.invalidEmailFormat
            };
            break;
          case item.membernameTaken:
          case item.membernameTakenEasi:
            if (self.autoRedirToSignInOnMnTakenError) {
              return $Utility.navigateTo(self.signinUrl), true;
            }
            result = {
              "isValid" : false,
              "message" : message ? msg : id ? name : index
            };
            break;
          case item.membernameTakenPhone:
            /** @type {({isValid: boolean, message: ?}|{isValid: boolean, message: string})} */
            result = isValid ? {
              "isValid" : false,
              "message" : v
            } : {
              "isValid" : false,
              "message" : name
            };
        }
        if (result) {
          return isArr && (self.viewContext.data.previousCheckAvailResult = result), result;
        }
        if (0 === value) {
          if (matrix === false) {
            return result = type === m.Live ? {
              "isValid" : false,
              "message" : message ? msg : id ? name : index
            } : {
              "isValid" : false,
              "message" : msg
            }, isArr && (self.viewContext.data.previousCheckAvailResult = result), result;
          }
          if (self.showUsernameRecoverySpeedbump && el) {
            /** @type {boolean} */
            self.viewContext.data.shouldGoToUsernameRecoverySpeedbump = true;
            /** @type {boolean} */
            self.viewContext.data.shouldGoToUsernameRecoverySpeedbumpForPreviouslyCheckedMemberName = true;
          }
          if (self.isEvictionSpeedbumpEnabled && name) {
            /** @type {boolean} */
            self.viewContext.data.shouldGoToEvictionSpeedbump = true;
            /** @type {boolean} */
            self.viewContext.data.shouldGoToEvictionSpeedbumpForPreviouslyCheckedMemberName = true;
            /** @type {number} */
            self.viewContext.data.isNoPaAllowedOnEvictedMemberName = data;
            if (!data) {
              /** @type {number} */
              options.pwdless = options.pwdlessemail = 0;
            }
          }
          if (!(!select(key) || assert.isMembernamePasswordProfilePage() || assert.isPasswordProfilePage())) {
            /** @type {boolean} */
            self.viewContext.data.shouldGoToFedSignInSpeedbump = true;
            /** @type {boolean} */
            self.viewContext.data.shouldGoToFedSignInSpeedbumpForPreviouslyCheckedMemberName = true;
          }
          if (!self.viewContext.data.checkAvailStateMap) {
            /** @type {!Array} */
            self.viewContext.data.checkAvailStateMap = [];
          }
          self.viewContext.data.checkAvailStateMap.push(key + ":" + name);
        }
        return result = {
          "isValid" : true,
          "message" : ""
        }, isArr && (self.viewContext.data.previousCheckAvailResult = result), result;
      };
      var p = ko.computed(function() {
        var stackedScaleY = this;
        var isMethod = stackedScaleY.memberNameInput();
        return stackedScaleY.memberNameType() === m.Live ? isMethod + "@" + stackedScaleY.domain() : isValid && stackedScaleY.memberNameType() === m.Phone ? "+" + $scope.memberNamePhoneCountryObj().code + isMethod : isMethod;
      }, $scope);
      p.extend({
        "required" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p);
          },
          "params" : true,
          "message" : config.emailRequired
        }
      }).extend({
        "validation" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p) && join() === m.Live;
          },
          "validator" : function() {
            return encode();
          },
          "message" : config.emailRequired
        }
      }).extend({
        "liveMemberNameValid" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p);
          },
          "params" : {
            "domains" : i,
            "patterns" : [obj.LiveMembernameRegex]
          },
          "message" : config.invalidEmailFormat
        }
      }).extend({
        "memberNameValidForFl" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p);
          },
          "params" : {
            "fl" : self.fl,
            "domains" : i
          },
          "message" : config.domainNotAllowed
        }
      }).extend({
        "validation" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p) && join() === m.EASI;
          },
          "validator" : function(value) {
            return value.match(obj.MembernameRegex);
          },
          "message" : config.invalidEmailFormat
        }
      }).extend({
        "validation" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p) && isValid && join() === m.Phone && encode();
          },
          "validator" : function(value) {
            return value.match(obj.PhoneNumberFormat);
          },
          "message" : config.invalidPhoneFormat
        }
      }).extend({
        "validation" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p) && isValid && join() === m.Phone && !encode();
          },
          "validator" : function(name) {
            return name.match(/ /);
          },
          "message" : config.phoneRequired
        }
      }).extend({
        "pattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate(p) && join() === m.Live;
          },
          "params" : "^[a-zA-Z]",
          "message" : config.emailMustStartWithLetter
        }
      }).extend({
        "validation" : {
          "onlyIf" : function() {
            var _objectTypeIsMetaData = (assert.shouldValidate(p) || self.isCombinedSISUV2) && self.viewContext.data.prefill.checkServerSideCache && (join() === m.EASI && enabled || join() === m.Phone && usersDetailsRecord);
            return _objectTypeIsMetaData || (_objectTemplate = false), _objectTypeIsMetaData;
          },
          "validator" : function(node) {
            var entries = self.viewContext.data.prefill[result.memberName.name];
            /** @type {number} */
            index = 0;
            for (; index < entries[join()].length; ++index) {
              if (prefill = entries[join()][index], prefill.phoneNumber && prefill.countryCode && "+" + prefill.countryCode + prefill.phoneNumber == node || prefill.email && prefill.email == node || prefill === node) {
                if (c != node && (self.viewContext.data.reporting.memberNameChangeCount++, prefill.isAvailable ? self.viewContext.data.reporting.memberNameAvailableCount++ : self.viewContext.data.reporting.memberNameUnavailableCount++, !self.noCheckavail)) {
                  var done = {
                    "signInName" : node,
                    "uaid" : root.$Config.uaid,
                    "skipBECall" : true,
                    "isAvailableOnServerCache" : prefill.isAvailable,
                    "isEasiCheck" : true
                  };
                  exports.Json(null, $Utility.generateUrl(that.urls.baseDomain, test.checkAvailable, true), done, null, null);
                }
                if (self.viewContext.data.previouslyCheckedMemberName = c = node, prefill.isAvailable) {
                  return compile(join(), node), utils.setFocusOnObservable(p, true), _objectTemplate = true, self.prefillMembernameIsPossiblyEvicted && (self.viewContext.data.shouldGoToEvictionSpeedbumpForPreviouslyCheckedMemberName = true, self.viewContext.data.isNoPaAllowedOnEvictedMemberName = self.prefillMembernameIsNopaAllowed, self.prefillMembernameIsNopaAllowed || (options.pwdless = options.pwdlessemail = 0)), self.prefillMembernameIsProof && (self.viewContext.data.shouldGoToUsernameRecoverySpeedbumpForPreviouslyCheckedMemberName = 
                  true), self.viewContext.data.shouldGoToFedSignInSpeedbumpForPreviouslyCheckedMemberName = select(c), self.viewContext.data.checkAvailStateMap || (self.viewContext.data.checkAvailStateMap = []), self.viewContext.data.checkAvailStateMap.push(node + ":" + self.prefillMembernameIsPossiblyEvicted), true;
                }
                if (prefill.errorCode) {
                  var ret = init(prefill.errorCode, node);
                  if (ret) {
                    return this.message = ret.message, utils.setFocusOnObservable(p, false), _objectTemplate = true, ret.isValid;
                  }
                }
                break;
              }
            }
            return _objectTemplate = false, true;
          },
          "message" : ""
        }
      });
      if (options.isPaginated && title && p.isValid() && !self.page.isMojangUpgrade && !_ && (usersDetailsRecord && !cache[m.Phone][0].errorCode && title == cache[m.Phone][0].phoneNumber || enabled && !cache[m.EASI][0].errorCode && title == cache[m.EASI][0].email || newBanIsRemoved && !cache[m.Live][0].errorCode && title == cache[m.Live][0].email.split("@")[0])) {
        if (self.isCombinedSISUV2) {
          /** @type {boolean} */
          $scope.showCredentialsView = false;
        }
        /** @type {boolean} */
        $scope.showPaginatedUsernamePrefill = true;
        $scope.paginatedUsernamePrefill = p();
      } else {
        /** @type {boolean} */
        $scope.showPaginatedUsernamePrefill = false;
      }
      if (isArr) {
        p.extend({
          "validation" : {
            "onlyIf" : function() {
              return self.viewContext.data.previouslyCheckedMemberName === p() && self.viewContext.data.previousCheckAvailResult && !self.viewContext.data.previousCheckAvailResult.isValid;
            },
            "validator" : function() {
              return this.message = self.viewContext.data.previousCheckAvailResult.message, false;
            },
            "message" : ""
          }
        });
      }
      p.extend({
        "checkAvailable" : {
          "onlyIf" : function() {
            /** @type {boolean} */
            var xm = !nativeOverflow && !self.viewContext.data.hasCheckAvailableCalled;
            var t = (xm || assert.shouldValidate(p, true)) && !!encode() && c !== p() && !_objectTemplate && !self.noCheckavail;
            return !p || isArr && !p.isSwitchingToNext || (self.viewContext.data.previouslyCheckedMemberName = c = p()), !t && c ? (self.viewContext.data.shouldGoToEvictionSpeedbump = self.viewContext.data.shouldGoToEvictionSpeedbumpForPreviouslyCheckedMemberName, self.viewContext.data.shouldGoToUsernameRecoverySpeedbump = self.viewContext.data.shouldGoToUsernameRecoverySpeedbumpForPreviouslyCheckedMemberName, self.viewContext.data.shouldGoToFedSignInSpeedbump = self.viewContext.data.shouldGoToFedSignInSpeedbumpForPreviouslyCheckedMemberName) : 
            (self.viewContext.data.shouldGoToUsernameRecoverySpeedbumpForPreviouslyCheckedMemberName = false, self.viewContext.data.shouldGoToEvictionSpeedbumpForPreviouslyCheckedMemberName = false, self.viewContext.data.shouldGoToFedSignInSpeedbumpForPreviouslyCheckedMemberName = false, isArr && (self.viewContext.data.shouldGoToUsernameRecoverySpeedbump = false, self.viewContext.data.shouldGoToEvictionSpeedbump = false, self.viewContext.data.shouldGoToFedSignInSpeedbump = false)), t && (self.viewContext.data.hasCheckAvailableCalled = 
            true), t;
          },
          "params" : {
            "url" : $Utility.generateUrl(that.urls.baseDomain, test.checkAvailable, true),
            "observable" : p,
            "getSuggestedMemberNames" : function(element) {
              messageChildren(element);
            },
            "setSuccessMessage" : compile,
            "getResult" : init,
            "includeSuggestions" : true,
            "message" : config.checkAvailableFail
          }
        }
      });
      /**
       * @return {undefined}
       */
      var fn = function() {
        self.viewContext.data.input[result.memberName.name] = p();
        self.viewContext.data.input.memberNameInput = encode();
        self.viewContext.data.input.memberNameType = join();
        /** @type {boolean} */
        self.viewContext.data.input.isMemberNameVerified = H;
        if (isValid) {
          expectHello("");
          self.viewContext.data.input.memberNamePhoneCountry = $scope.memberNamePhoneCountryObj().iso;
          self.viewContext.data.input.memberNamePhoneCountryCode = $scope.memberNamePhoneCountryObj().code;
        }
      };
      return fn(), p.subscribe(function(e) {
        $scope.memberName.suppressMessages(false);
        fn();
        $scope.memberName.previousValue(e);
      }), p.previousValue = ko.observable(""), p.suppressMessages = ko.observable(!$scope.memberNameInput()), p.serverError = _, p.focused = ko.observable(false), $scope.memberName = p, $scope.isCountryCodeDropDownFocused = ko.observable(false), $scope.isLiveDomainDropDownFocused = ko.observable(false), $scope.domainDropdownClick = function(key) {
        if (!p.isValidating()) {
          stringifyValue(key);
        }
      }, $scope.phoneSwitchFocused = ko.observable(false), $scope.easiSwitchFocused = ko.observable(false), $scope.liveSwitchFocused = ko.observable(false), $scope.switchMemberNameType = function(status) {
        var data = m;
        var lock_path = join();
        if (!p.isValidating() && status !== lock_path) {
          if (self.viewContext.data.previouslyCheckedMemberName = c = null, status === data.Live) {
            if (self.showProgressStepIndicator && $scope.updateStepIndicatorOnMemberNameChange(data.Live, data), encode(""), join(status), stringifyValue(i[0]), newBanIsRemoved) {
              var item = cache[m.Live][0].email.split("@");
              encode(item[0]);
              stringifyValue(item[1]);
            }
          } else {
            if (status === data.EASI) {
              if (self.showProgressStepIndicator && $scope.updateStepIndicatorOnMemberNameChange(data.EASI, data), 0 !== options.pwdlessemail) {
                var doc = window.wLive.Account.viewModelHandle;
                if (doc && doc.password) {
                  doc.password("");
                }
              }
              encode(enabled ? cache[data.EASI][0].email : "");
              join(status);
              stringifyValue(i[0]);
            } else {
              if (isValid && status === data.Phone) {
                if (self.showProgressStepIndicator && $scope.updateStepIndicatorOnMemberNameChange(data.Phone, data), 0 !== options.pwdless) {
                  doc = window.wLive.Account.viewModelHandle;
                  if (doc && doc.password) {
                    doc.password("");
                  }
                }
                encode(usersDetailsRecord ? cache[data.Phone][0].phoneNumber : "");
                join(status);
                stringifyValue(i[0]);
              } else {
                if (!status) {
                  if (join() === data.Phone) {
                    $scope.switchMemberNameType(data.EASI);
                  } else {
                    if (join() === data.EASI) {
                      $scope.switchMemberNameType(data.Live);
                    } else {
                      if (join() === data.Live) {
                        $scope.switchMemberNameType(isValid ? data.Phone : data.EASI);
                      }
                    }
                  }
                }
              }
            }
          }
          p.suppressMessages(!encode());
          if (isValid && status === data.Phone) {
            $scope.isCountryCodeDropDownFocused(true);
          } else {
            p.focused(true);
          }
        }
      }, $scope.updateStepIndicatorOnMemberNameChange = function(value, node) {
        var firstAlphaTemplateNode = $("#maincontent")[0];
        /** @type {number} */
        var step = options.pwdless && value == node.Phone ? 1 : 2;
        if (2 == step && (options.passwordStep = 2), options.collectFLName && (options.profileAccrualStep = ++step), options.collectDob && (options.birthDateCountryAccrualStep = ++step), value != node.Live && (options.verificationStep = ++step), options.totalStep = step, firstAlphaTemplateNode && (mainContentViewModel = ko.dataFor(firstAlphaTemplateNode), mainContentViewModel)) {
          mainContentViewModel.totalSteps(step);
          mainContentViewModel.progressText(self.progressTextTemplate.format(mainContentViewModel.stepCounter(), mainContentViewModel.totalSteps()));
          mainContentViewModel.progressDots.removeAll();
          /** @type {number} */
          var day = 1;
          for (; step >= day; day++) {
            mainContentViewModel.progressDots.push(1 == day ? {
              "isCurrentStep" : true
            } : {
              "isCurrentStep" : false
            });
          }
        }
      }, $scope.memberNameInputType = ko.computed(function() {
        return $B && $B.IE && $B.V && $B.V <= 8 ? "text" : isValid && join() === m.Phone ? "tel" : join() === m.EASI ? "email" : "text";
      }), $scope.liveEasiSwitchText = ko.computed(function() {
        return join() === m.Live ? data.easiSwitch : data.liveSwitch;
      }), $scope.memberNamePrefill = ko.computed(function() {
        return cache ? cache[join()] : null;
      }), $scope.prefillSelected = function(data) {
        if (isValid && data && data.phoneNumber) {
          $scope.memberNameInput(data.phoneNumber);
          $scope.memberNamePhoneCountryObj($(data.country));
        } else {
          if (data && data.email) {
            $scope.memberNameInput(data.email);
          }
        }
      }, $scope.domainSelected = function(interval) {
        $scope.domain(interval);
        p.suppressMessages(!encode());
        p.focused(true);
      }, $scope.shouldGoToPasswordPage = ko.computed(function() {
        return assert.paginatedPasswordIsRequired(join());
      }), $scope.shouldCollectPassword = ko.pureComputed(function() {
        return assert.passwordIsRequired(join());
      }), $scope;
    },
    "createUsernameRecoverySpeedbumpObservableSet" : function() {
      var reqOpts = {};
      var m = self.viewContext.data.input;
      var val = m.memberName || self.prefillProofMembername;
      var i = m.memberNameType || h.getMemberNameType(self.prefillProofMembername, self.domains, self.fedProvider);
      if (self.prefillMembernameIsProof) {
        m.memberName = m.memberNameInput = val;
        m.memberNameType = i;
      }
      reqOpts.usernameRecoverySpeedbumpDesc = data.usernameRecoverySpeedbumpDesc.format(val);
      val = val.replace("+", "");
      var path = $Utility.addQueryString(data.usernameRecoverySpeedbumpRecoveryLinkUrl, "mn", val);
      return path = path.replace("prefillUserName", encodeURI(val)), reqOpts.recoverUsernameUrl = path, reqOpts.usernameRecoverySpeedbumpRecoveryLink = self.usernameRecoverySpeedbumpRecoveryLink = self.usernameRecoverySpeedbumpRecoveryLink.replace("#", path), reqOpts.shouldGoToFedSignInSpeedbump = self.viewContext.data.shouldGoToFedSignInSpeedbump, reqOpts.shouldGoToPasswordPage = !reqOpts.shouldGoToFedSignInSpeedbump && assert.paginatedPasswordIsRequired(i), reqOpts;
    },
    "createPasswordObservableSet" : function(name, itemid) {
      var $scope = {};
      if (options.isMojangUpgrade && !options.showMojangUpgradeExp) {
        var info = self.viewContext.data.input;
        if (self.viewContext.data.prefill.memberName.EASI) {
          info.memberName = info.memberNameInput = self.viewContext.data.prefill.memberName.EASI[0].email;
        } else {
          if (self.viewContext.data.prefill.memberName.Live) {
            info.memberName = info.memberNameInput = self.viewContext.data.prefill.memberName.Live[0].email;
          }
        }
      }
      var expression = scope.viewModelHandle || {};
      var t = ko.computed(function() {
        return expression.memberName && expression.memberName() || self.viewContext.data.input.memberName;
      });
      $scope.hiddenMemberName = t;
      {
        var el = ko.computed(function() {
          return self.viewContext.memberNameType && self.viewContext.memberNameType() || h.getMemberNameType(t(), self.domains);
        });
        var gotoNewOfflinePage = ko.observable(false);
        $scope.showPassword = ko.observable(false);
      }
      $scope.showCapsWarning = ko.computed(function() {
        return !$scope.showPassword() && gotoNewOfflinePage() && !options.shouldSuppressCapsLockWarning;
      });
      $scope.showPasswordPeek = self.showPasswordPeek;
      $scope.showPasswordLabel = ko.observable(data.showPasswordLabel);
      /**
       * @param {?} contentReader
       * @param {!KeyboardEvent} reader
       * @return {?}
       */
      $scope.onPasswordKeyUp = function(contentReader, reader) {
        return gotoNewOfflinePage(reader.originalEvent.getModifierState("CapsLock")), true;
      };
      $scope.skipPasswordValidation = ko.computed(function() {
        return itemid ? true : options.fedStateToken ? true : 0 !== options.pwdless ? el() === m.Phone || 0 !== options.pwdlessemail && el() === m.EASI : false;
      });
      $scope.oobePasswordDescText = ko.computed(function() {
        return error && (el() === m.Phone || options.useMemberNameDescString) ? data.memberNamePasswordDesc.format(t()) : data.passwordDesc;
      });
      var result = ko.observable(name || "");
      return result.extend({
        "required" : {
          "onlyIf" : function() {
            return assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "params" : true,
          "message" : config.passwordRequired
        },
        "minLength" : {
          "onlyIf" : function() {
            return assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "params" : 8,
          "message" : config.passwordTooSimple
        },
        "pattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "params" : obj.PwdValidInput,
          "message" : config.passwordInvalidChar
        },
        "pwdComplexity" : {
          "onlyIf" : function() {
            return assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "params" : true,
          "message" : config.passwordTooSimple
        },
        "pwdContainsMemberName" : {
          "onlyIf" : function() {
            return assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "params" : true,
          "message" : function() {
            return el() === m.Phone ? config.pwdContainsMnPhone : config.pwdContainsMnEmail;
          }
        },
        "validation" : {
          "onlyIf" : function() {
            return response && assert.shouldValidate(result) && !$scope.skipPasswordValidation();
          },
          "validator" : function(value) {
            var t = self.viewContext && self.viewContext.data && self.viewContext.data.input ? self.viewContext.data.input[result.firstName.name] : "";
            var n = self.viewContext && self.viewContext.data && self.viewContext.data.input ? self.viewContext.data.input[result.lastName.name] : "";
            return -1 === value.toLowerCase().indexOf(t.toLowerCase()) && -1 === value.toLowerCase().indexOf(n.toLowerCase());
          },
          "message" : config.pwdContainsMnEmail
        }
      }), 0 !== self.noBPCheck || $scope.skipPasswordValidation() ? result.isValidating = ko.observable(false) : result.extend({
        "bannedPwd" : {
          "onlyIf" : function() {
            var e = assert.shouldValidate(result, true) && result() && self.viewContext.data.previouslyCheckedPassword != result();
            return e && (self.viewContext.data.previouslyCheckedPassword = result()), e;
          },
          "params" : {
            "url" : $Utility.generateUrl(that.urls.baseDomain, test.bannedPwd, true),
            "ski" : SKI || "",
            "observable" : result
          },
          "message" : config.bannedPassword
        }
      }), result.subscribe(function(mmCoreSplitViewBlock) {
        if ($scope.password.suppressMessages(false), self.viewContext.data.input[result.password.name] = mmCoreSplitViewBlock, malakh) {
          var $rootScope = root.MSA && root.MSA.CXH;
          if ($rootScope) {
            $rootScope.encryptUserDataAsync(mmCoreSplitViewBlock, function(playlistUri) {
              $rootScope.propertyBagSetAsync("encPwd", playlistUri);
            });
          }
        }
      }), result.suppressMessages = ko.observable(true), result.serverError = itemid, itemid = null, result.focused = ko.observable(false), $scope.password = result, $scope.showMarketingOptIn = options.isPaginated && 0 !== self.showOptinEmail && el() === m.Live, $scope.showLegalText = options.isPaginated && el() === m.Live, $scope.shouldShowSmsDisclaimer = el() === m.Phone, $scope;
    },
    "createRetypePasswordObservableSet" : function(name) {
      var room = {};
      var target = ko.observable(name || "");
      return target.extend({
        "required" : {
          "params" : assert.shouldValidate(target),
          "message" : config.required
        },
        "equal" : {
          "onlyIf" : function() {
            return assert.shouldValidate(target) && self.viewContext.data.input[result.password.name];
          },
          "params" : self.viewContext.data.input[result.password.name],
          "message" : config.passwordNotMatch
        }
      }), target.focused = ko.observable(false), target.suppressMessages = ko.observable(true), target.subscribe(function() {
        room.retypePassword.suppressMessages(false);
      }), room.retypePassword = target, target.subscribe(function(canCreateDiscussions) {
        room.retypePassword.suppressMessages(false);
        self.viewContext.data.input[result.retypePassword.name] = canCreateDiscussions;
      }), room;
    },
    "createCountryObservableSet" : function(name) {
      var item = {};
      if ((assert.isPasswordProfilePage() || assert.isMembernamePasswordProfilePage()) && 0 === options.collectDob) {
        return item;
      }
      var parent = ko.observable(name || "");
      parent.subscribe(function(canCreateDiscussions) {
        item.country.suppressMessages(false);
        self.viewContext.data.input[result.country.name] = canCreateDiscussions;
      });
      parent.suppressMessages = ko.observable(true);
      parent.focused = ko.observable(false);
      item.country = parent;
      item.countries = self.countryList;
      item.showBirthDate = ko.computed(function() {
        var aux = this.country();
        var m = self.countryDetailMap;
        var array = m && m[aux] ? m[aux].childAge : 0;
        var check = m && 0 !== array || 0 !== self.dobReq;
        return isArr && (self.viewContext.data.shouldCollectBirthDate = check), check;
      }, item);
      return item;
    },
    "createBirthdateObservableSet" : function(header) {
      header = header || "";
      var common = this;
      var e = {};
      if ((assert.isPasswordProfilePage() || assert.isMembernamePasswordProfilePage()) && 0 === options.collectDob) {
        return e;
      }
      var rows = options.fedNamesPrefill;
      if (rows && 1 === rows.length) {
        common.setMemberNameInputFromFedNameIfNeeded(rows[0]);
      }
      /** @type {string} */
      var b = "";
      /** @type {string} */
      var result = "";
      /** @type {string} */
      var v = "";
      var l = header.split(":");
      if (3 === l.length) {
        b = l[0];
        result = l[1];
        v = l[2];
      }
      var readOnlyFn = options.useSameViewForYobAccrual;
      e.birthYear = ko.observable(v);
      e.birthMonth = ko.observable(result.replace(/^0/, ""));
      e.birthDay = ko.observable(b.replace(/^0/, ""));
      e.needFullDOB = ko.observable(readOnlyFn && !!header);
      /** @type {boolean} */
      e.isCollectDobNewView = !!options.isCollectDobNewView;
      e.birthdate = ko.computed(function() {
        var user = this;
        var j = user.birthDay();
        var l = user.birthMonth();
        var i = user.birthYear();
        return j = 1 === j.length ? "0" + j : j, l = 1 === l.length ? "0" + l : l, j + ":" + l + ":" + i;
      }, e);
      e.showAllDobParts = ko.computed(function() {
        return e.needFullDOB() || 1 !== options.yobReq;
      }, e);
      e.birthdatetitle = 1 === options.collectOnlyDob ? self.strings.lblBirthyear : 1 === options.showLabelAsBirthDay ? self.strings.lblBirthday : self.strings.lblBirthdate;
      e.birthYear.suppressMessages = ko.observable(true);
      e.birthMonth.suppressMessages = ko.observable(true);
      e.birthDay.suppressMessages = ko.observable(true);
      e.birthdate.subscribe(function(canCreateDiscussions) {
        if (!isArr || self.viewContext.data.shouldCollectBirthDate) {
          self.viewContext.data.input[result.birthdate.name] = canCreateDiscussions;
        }
      });
      e.birthYear.subscribe(function(gName) {
        if (readOnlyFn) {
          /** @type {string} */
          var id = "31:12:" + gName;
          var child = self.viewContext.data.input.country;
          var nestedElem = assert.isChild(id, child, true);
          if (nestedElem) {
            e.needFullDOB(true);
          }
        }
        e.birthYear.suppressMessages(false);
      });
      e.birthMonth.subscribe(function() {
        e.birthMonth.suppressMessages(false);
      });
      e.birthDay.subscribe(function() {
        e.birthDay.suppressMessages(false);
      });
      e.birthdate.suppressMessages = ko.computed({
        "read" : function() {
          var user = this;
          return user.birthYear.suppressMessages() || user.birthMonth.suppressMessages() || user.birthDay.suppressMessages();
        },
        "write" : function(characteristicUUID) {
          var user = this;
          user.birthYear.suppressMessages(characteristicUUID);
          user.birthMonth.suppressMessages(characteristicUUID);
          user.birthDay.suppressMessages(characteristicUUID);
        },
        "owner" : e
      });
      e.birthdate.focused = ko.observable(false);
      var preferredOrder = self.dateOrder.toUpperCase();
      return e.birthdateParts = new Array(3), e.birthdateParts[preferredOrder.indexOf("D")] = e.birthDay, e.birthdateParts[preferredOrder.indexOf("M")] = e.birthMonth, e.birthdateParts[preferredOrder.indexOf("Y")] = e.birthYear, e.isDOBYearPart = new Array(3), e.isDOBYearPart[0] = false, e.isDOBYearPart[1] = false, e.isDOBYearPart[2] = false, e.isDOBYearPart[preferredOrder.indexOf("Y")] = true, assert.isPasswordProfilePage() || (e.showLegalText = options.isMojangUpgrade), e;
    },
    "createBirthdateHTML5ObservableSet" : function(value) {
      value = value || "";
      var newEventDiv = {};
      var parent = ko.observable(value).extend({
        "required" : {
          "params" : true,
          "message" : config.required
        }
      });
      return parent.extend({
        "validation" : {
          "validator" : function(name) {
            var dateArray = name.split("-");
            if (3 === dateArray.length) {
              /** @type {!Date} */
              var n = new Date(dateArray[0], dateArray[1], dateArray[2]);
              /** @type {!Date} */
              var obj = new Date;
              return !isNaN(n) && obj > n;
            }
            return false;
          },
          "message" : config.invalidBirthDate
        }
      }), parent.subscribe(function(lanName) {
        if (newEventDiv.birthdateHTML5.suppressMessages(false), lanName) {
          var classNameParts = lanName.split("-");
          if (3 === classNameParts.length) {
            var i = classNameParts[2] + ":" + classNameParts[1] + ":" + classNameParts[0];
            self.viewContext.data.input[result.birthdate.name] = i;
            /** @type {string} */
            self.viewContext.data.input[result.birthdateHTML5.name] = lanName;
          }
        }
      }), parent.suppressMessages = ko.observable(true), parent.focused = ko.observable(false), newEventDiv.birthdateHTML5 = parent, newEventDiv;
    },
    "createPhoneCountryObservableSet" : function(name) {
      var t = self.phoneCountryListJson;
      var value = t["default"] || "";
      if (CircularList) {
        value = self.viewContext.data.input[result.country.name] || "";
      }
      var updatebit = ko.observable(name || value);
      return self.viewContext.data.input[result.phoneCountry.name] = updatebit(), updatebit.subscribe(function(canCreateDiscussions) {
        self.viewContext.data.input[result.phoneCountry.name] = canCreateDiscussions;
      }), {
        "phoneCountries" : t.list,
        "phoneCountry" : updatebit
      };
    },
    "createPhoneNumberObservableSet" : function(name) {
      var options = {};
      var opts = ko.observable(name || "");
      return opts.extend({
        "onePattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate(opts) && opts && opts();
          },
          "params" : [obj.PhoneNumberFormat],
          "message" : config.invalidPhoneFormat
        },
        "required" : {
          "onlyIf" : function() {
            if (response) {
              return true;
            }
            var command = window.wLive.Account.viewModelHandle;
            var container = command && command.memberName && command.memberName() ? command.memberName() : self.viewContext.data.input.memberName;
            var inner = h.getMemberNameType(container, self.domains);
            var o = command && command.alternateEmail && Boolean(command.alternateEmail().match(obj.AltEmailRegEx));
            return assert.shouldValidate(opts) && command && inner === m.Live && !o;
          },
          "message" : config.phoneRequired
        }
      }), opts.subscribe(function(canCreateDiscussions) {
        options.phoneNumber.suppressMessages(false);
        self.viewContext.data.input[result.phoneNumber.name] = canCreateDiscussions;
      }), opts.suppressMessages = ko.observable(true), opts.focused = ko.observable(false), options.phoneNumber = opts, options;
    },
    "createAlternateEmailObservableSet" : function(content, t) {
      var room = {};
      var opts = ko.observable(content || "");
      return opts.extend({
        "allPatterns" : {
          "onlyIf" : function() {
            return assert.shouldValidate(opts) && opts && opts() && (opts.isVisble() || response);
          },
          "params" : [obj.AltEmailRegEx],
          "message" : config.invalidEmailFormat
        },
        "required" : {
          "onlyIf" : function() {
            if (response) {
              return true;
            }
            var user = window.wLive.Account.viewModelHandle;
            var container = user && user.memberName && user.memberName() ? user.memberName() : self.viewContext.data.input.memberName;
            var inner = h.getMemberNameType(container, self.domains);
            return assert.shouldValidate(opts) && user && inner === m.Live && (!user.phoneNumber || !user.phoneNumber());
          },
          "message" : config.emailRequired
        },
        "validation" : {
          "onlyIf" : function() {
            return response;
          },
          "validator" : function(value) {
            var t = self.viewContext && self.viewContext.data && self.viewContext.data.input ? self.viewContext.data.input[result.memberName.name] : "";
            return value.toLowerCase() !== t.toLowerCase();
          },
          "message" : config.altEmailContainsMn
        }
      }), opts.subscribe(function(canCreateDiscussions) {
        room.alternateEmail.suppressMessages(false);
        self.viewContext.data.input[result.alternateEmail.name] = canCreateDiscussions;
      }), opts.suppressMessages = ko.observable(true), opts.serverError = t, opts.focused = ko.observable(false), opts.isVisble = ko.observable(!!t || self.viewContext.data.input[result.alternateEmail.name] && !self.viewContext.data.input[result.phoneNumber.name]), room.alternateEmail = opts, room;
    },
    "createHipObservableSet" : function() {
      var room = {};
      var Symbol = root.HIPAMFE;
      if (Symbol && Symbol.observable) {
        return Symbol.observable;
      }
      var self = ko.observable("").extend({
        "hipValidation" : {}
      });
      return self.subscribe(function() {
        root.HIPAMFE;
        room.hip.suppressMessages(false);
        room.hip.isModified(true);
      }), self.suppressMessages = ko.observable(true), self.focused = ko.observable(false), self.focused.extend({
        "notify" : "always"
      }), room.hip = self, room;
    },
    "createHipEnforcementObservableSet" : function() {
      var e = {};
      return e.hipEnforcement = ko.observable(true), e;
    },
    "createVerificationObservableSet" : function(content, ith) {
      var me = {};
      var prop = me.verification = ko.observable(content || "");
      prop.extend({
        "required" : {
          "onlyIf" : function() {
            return assert.shouldValidate(prop);
          },
          "params" : true,
          "message" : config.required
        },
        "pattern" : {
          "onlyIf" : function() {
            return assert.shouldValidate(prop);
          },
          "params" : $Config.isINT ? obj.verificationCodeInt : obj.verificationCode,
          "message" : config.oneTimeCodeInvalidFormat
        }
      });
      var r = self.viewContext.data.input.memberName;
      var type = self.viewContext.data.input.memberNameType;
      return me.verification.terminalState = ko.observable(true), me.verification.serverError = ith, me.verification.focused = ko.observable(false), me.verification.suppressMessages = ko.observable(true), me.verifyTimeout = null, me.startTimestamp = (new Date).getTime(), me.verificationSubTitle = options.isPaginated && type == m.EASI ? data.verifyPageDescEASI.format(r) : data.verificationSubTitle.format(r), me.showAutoVerificationUI = ko.observable(false), me.showSmsResendCodeText = type == m.Phone, 
      me.showMarketingOptIn = options.isPaginated && 0 !== self.showOptinEmail && type == m.EASI, me.showLegalText = options.isPaginated && !options.fedStateToken, ko.isObservable(me.memberName) ? me.memberName(r) : me.memberName = ko.observable(r), me.showAutoVerificationUI.subscribe(function(decl) {
        if (syntax && syntax.setWizardButtons) {
          syntax.setWizardButtons(!decl, !decl, false);
        }
        if (scope.ftrViewModelHandle) {
          scope.ftrViewModelHandle.buttons.backButton.disabled(decl);
          scope.ftrViewModelHandle.buttons.nextButton.disabled(decl);
        }
        /** @type {number} */
        self.viewContext.data.input.autoVerify = decl;
      }), me.showAutoVerificationUI(assert.isAutoVerificationSupported(self.viewContext.data.input.memberNameInput)), prop.subscribe(function(actionStr) {
        var PROPERTY_NAME_NUMBER = $.trim(actionStr);
        prop(PROPERTY_NAME_NUMBER);
        prop.suppressMessages(false);
        self.viewContext.data.input[result.verification.name] = PROPERTY_NAME_NUMBER;
      }), me.doAutoVerify = function() {
        var markedParent = this;
        if (me.showAutoVerificationUI()) {
          /** @type {boolean} */
          self.viewContext.data.reporting.autoVerifyShown = true;
          if (scope.ftrViewModelHandle) {
            scope.ftrViewModelHandle.buttons.backButton.disabled(true);
            scope.ftrViewModelHandle.buttons.nextButton.disabled(true);
          }
          var t = syntax.getProperty("SmsCode");
          if (CircularList && logger) {
            try {
              logger.getVerificationCode(function(t) {
                me.onCodeSuccess(t, markedParent);
              }, function(e) {
                logger.logError(e);
                me.onVerifyFailed();
              });
            } catch (error) {
              logger.logError(error);
              me.onVerifyFailed();
            }
          } else {
            me.onCodeSuccess(t, markedParent);
          }
        }
      }, me.stopAutoVerify = function() {
        if (null != me.verifyTimeout) {
          clearTimeout(me.verifyTimeout);
          /** @type {null} */
          me.verifyTimeout = null;
        }
        syntax.setWizardButtons(true, true, false);
        if (scope.ftrViewModelHandle) {
          scope.ftrViewModelHandle.buttons.backButton.disabled(false);
          scope.ftrViewModelHandle.buttons.nextButton.disabled(false);
        }
      }, me.onVerifyFailed = function(data) {
        var idkey = data && data.error;
        var self = this;
        if (!self._viewContext.data.serverErrors) {
          self._viewContext.data.serverErrors = {};
        }
        if (idkey && data.error.code === item.maximumOTTDailyError) {
          self._viewContext.data.serverErrors[result.memberName.name] = config.verificationThrottled;
        } else {
          if (0 !== self.autoVerify) {
            me.stopAutoVerify();
            self._viewContext.data.serverErrors[result.memberName.name] = config.autoVerificationFailed;
          } else {
            self._viewContext.data.serverErrors[result.memberName.name] = config.generic;
          }
        }
        self.$.triggerHandler(EVENT_UNDO, {
          "actionName" : actionName,
          "control" : self
        });
      }, me.onCodeSuccess = function(c, node) {
        if ("string" === $.type(c)) {
          if ("-1" == c) {
            me.onVerifyFailed();
          } else {
            me.verification(c);
            node.handleActionButton();
          }
        } else {
          /** @type {number} */
          var msSinceEnd = (new Date).getTime() - me.startTimestamp;
          if (msSinceEnd > self.sendOttTimeout) {
            me.stopAutoVerify();
            me.showAutoVerificationUI(false);
          } else {
            /** @type {number} */
            me.verifyTimeout = setTimeout($.proxy(me.doAutoVerify, node), 100);
          }
        }
      }, me.verifyPageTitle = ko.computed(function() {
        return options.isPaginated ? type === m.Phone ? data.verifyPageTitlePhone : data.verifyPageTitleEASI : data.lblVerificationCode;
      }), me;
    },
    "createFedConfirmObservableSet" : function() {
      var e = this;
      var t = {};
      var content = options.fedNamesPrefill;
      var expression = self.viewContext.data.input;
      if (content && 1 === content.length) {
        e.setMemberNameInputFromFedNameIfNeeded(content[0]);
      }
      var propName = expression.memberName;
      return t.fedConfirmPageDesc = data.fedConfirmPageDesc.format(propName.encodeHtml()), t.fedConfirmPageDesc2 = (data.fedConfirmPageDesc2 || "").format(propName.encodeHtml()), t.showLegalText = true, t;
    },
    "createFedPickerObservableSet" : function() {
      /**
       * @param {!Object} node
       * @return {undefined}
       */
      function fn(node) {
        if (node) {
          n[result.memberName.name] = node.name;
          n.memberNameType = h.getMemberNameType(node.name, self.domains);
          /** @type {boolean} */
          n.isMemberNameVerified = 1 === node.isVerified;
          n.memberNameInput = n.memberNameType === m.Live ? node.name.split("@")[0] : node.name;
        } else {
          delete n[result.memberName.name];
          delete n.isMemberNameVerified;
          delete n.memberNameType;
          delete n.isMemberNameVerified;
        }
        OnNext();
      }
      var dbuttonCancel = {};
      var n = self.viewContext.data.input;
      var dbutton = URI.getHighContrastImageUrl(options.imgs.baseUrl, options.imgs.fedProviderLogo, {
        "forBlackBackground" : options.imgs.fedProviderLogoWhite
      });
      return dbuttonCancel.fedProviderLogoImg = dbutton, dbuttonCancel.fedNamesPrefill = options.fedNamesPrefill, dbuttonCancel.onPrefillClicked = function(t) {
        fn(t);
      }, dbuttonCancel.onPrefillKeyDown = function(t, event) {
        return event = event || window.event, "Enter" === event.code || event.keyCode === _ENTER_KEYCODE ? (event.preventDefault ? event.preventDefault() : event.returnValue = false, fn(t), false) : true;
      }, dbuttonCancel.onUseOtherClick = function() {
        fn(null);
      }, dbuttonCancel.shouldGoToPasswordPage = ko.computed(function() {
        return assert.paginatedPasswordIsRequired(n.memberNameType);
      }), setTimeout(function() {
        if (scope.ftrViewModelHandle) {
          scope.ftrViewModelHandle.buttons.nextButton.visible(false);
        }
      }, 0), dbuttonCancel;
    },
    "createAdditionalLegalTextObservableSet" : function() {
      var e = {};
      return e.additionalLegalText = ko.computed(function() {
        return data.frenchLegalText ? data.frenchLegalText : void 0;
      }), e;
    },
    "createOptinEmailCheckboxObservableSet" : function(name) {
      var newEventDiv = {};
      var parent = ko.observable(name || "");
      return parent.subscribe(function(canCreateDiscussions) {
        newEventDiv.optinEmailCheckbox.suppressMessages(false);
        self.viewContext.data.input[result.optinEmailCheckbox.name] = canCreateDiscussions;
      }), parent.suppressMessages = ko.observable(true), parent.focused = ko.observable(false), newEventDiv.optinEmailCheckbox = parent, newEventDiv;
    },
    "createEvictionSpeedbumpObservableSet" : function() {
      var document = {};
      var info = self.viewContext.data.input;
      var text = info.memberName || self.prefillPossibleEvictionMembername;
      var header = $Utility.addQueryString(self.evictionSigninURL, "username", encodeURI(text) || "");
      return self.prefillMembernameIsPossiblyEvicted && !error && (info.memberName = info.memberNameInput = text, self.viewContext.data.isNoPaAllowedOnEvictedMemberName = self.prefillMembernameIsNopaAllowed, self.prefillMembernameIsNopaAllowed || (options.pwdless = options.pwdlessemail = 0), self.viewContext.data.checkAvailStateMap || (self.viewContext.data.checkAvailStateMap = []), self.viewContext.data.checkAvailStateMap.push(text + ":true")), self.viewContext.data.evictionWarningShown || (self.viewContext.data.evictionWarningShown = 
      []), self.viewContext.data.evictionWarningShown.push(text), document.evictionSpeedbumpTopDesc = data.evictionSpeedbumpTopDesc.format(text), document.evictionSpeedbumpMiddleDesc = data.evictionSpeedbumpMiddleDesc, document.evictionSpeedbumpBottomDesc = data.evictionSpeedbumpBottomDesc, document.evictionSpeedbumpSignInUrl = header, document.shouldGoToPasswordPage = assert.paginatedPasswordIsRequired(self.memberNameType.Phone) || !self.viewContext.data.isNoPaAllowedOnEvictedMemberName, document;
    },
    "createEvictionSpeedbumpErrorObservableSet" : function() {
      var pageExtraInfo = {};
      return pageExtraInfo.evictionSpeedbumpErrorPageDescription = data.evictionSpeedbumpErrorPageDescription, pageExtraInfo;
    },
    "setMemberNameInputFromFedNameIfNeeded" : function(manifest) {
      var name = self.viewContext.data.input;
      if (!name.memberName) {
        name.memberName = manifest.name;
        name.memberNameType = h.getMemberNameType(manifest.name, self.domains);
        /** @type {boolean} */
        name.isMemberNameVerified = 1 === manifest.isVerified;
        name.memberNameInput = name.memberNameType === m.Live ? manifest.name.split("@")[0] : manifest.name;
      }
    }
  });
}(), function() {
  /** @type {!Window} */
  var root = window;
  var node = root.wLive;
  var $ = root.jQuery;
  var vm = node.Account;
  var b = vm.SignupObservableFactory;
  var URI = vm.Util && vm.Util.HighContrast;
  var $scope = root.$Config.WLXAccount;
  var params = $scope.signup;
  var options = params.page;
  var r = {};
  var res = {};
  /** @type {boolean} */
  var u = !$scope.isWin10 && !$scope.isWin10InclusiveOOBE && 0 === $scope.isSkype;
  defineClass("wLive.Account.ViewModels.SignupViewModel", function(results, item) {
    var self = this;
    var model = results.data;
    var result = model.input || {};
    var els = model.serverErrors || {};
    var cb = b.createObservableSetByPrefillName;
    /** @type {!Array} */
    var m = self._observables = [];
    if (item && item.observables) {
      m = self._observables = item.observables;
    }
    /** @type {!Object} */
    self._viewContext = results;
    r = params.strings;
    res = r.errors;
    var x = m.length;
    /** @type {!Array} */
    self.validationOrder = new Array(x);
    /** @type {number} */
    var k = 0;
    for (; x > k; k++) {
      var i = m[k];
      mix(self, cb(i, result[i], els[i]));
      self.validationOrder[k] = self[i];
    }
    mix(self, {
      "strings" : r,
      "config" : options
    });
    var div = $(".skypeSpinner .spinnerText p");
    if (div.length > 0) {
      var indexesDLVM = {
        "loadingString" : params.strings.sendingOTT
      };
      ko.cleanNode(div[0]);
      ko.applyBindings(indexesDLVM, div[0]);
    }
    if (u) {
      var div = $("#Spinner");
      if (div.length > 0) {
        var params = {
          "$Utility" : $Utility,
          "config" : options,
          "strings" : r
        };
        ko.cleanNode(div[0]);
        ko.applyBindings(params, div[0]);
      }
    }
    vm.ftrViewModelHandle = self.footerViewModel = vm.SignupHelper.createFooterObservable(self.additionalLegalText, self.showLegalText);
    var element = $("#maincontent")[0];
    if (element) {
      var data = ko.dataFor(element);
      if (data && ($("#identityBanner").length > 0 && data.memberName(result.memberName), params.showProgressStepIndicator && item)) {
        if (item.stepCounter) {
          switch(item.observables[0]) {
            case "memberName":
              data.stepCounter(options.credentialsStep);
              break;
            case "password":
              data.stepCounter(options.passwordStep);
              break;
            case "firstName":
              data.stepCounter(options.profileAccrualStep);
              break;
            case "country":
              data.stepCounter(options.birthDateCountryAccrualStep);
              break;
            case "verification":
              data.stepCounter(options.verificationStep);
              break;
            default:
              data.stepCounter(item.stepCounter);
          }
        }
        if (item.totalSteps) {
          data.totalSteps(options.totalStep);
        }
        data.progressText(params.progressTextTemplate.format(data.stepCounter(), data.totalSteps()));
        var searchContactPanel = $("#progressBarElement");
        if (searchContactPanel && (item.stepCounter ? searchContactPanel.show() : searchContactPanel.hide()), item.totalSteps) {
          if (data.progressDots().length > 0) {
            data.progressDots.removeAll();
          }
          /** @type {number} */
          k = 1;
          for (; k <= options.totalStep; k++) {
            data.progressDots.push({
              "isCurrentStep" : data.stepCounter() == k
            });
          }
        } else {
          var i = data.progressDots().length;
          data.progressDots.removeAll();
          /** @type {number} */
          k = 1;
          for (; i >= k; k++) {
            data.progressDots.push({
              "isCurrentStep" : data.stepCounter() == k
            });
          }
        }
      }
    }
    var target = $("#ftr");
    if (target.length > 0 && (ko.cleanNode(target[0]), ko.applyBindings(vm.ftrViewModelHandle, target[0])), self.birthdate) {
      if (1 === options.yobReq) {
        self.birthdate.extend({
          "birthYearPartRequired" : {
            "params" : true,
            "message" : res.required
          },
          "birthdatePartRequired" : {
            "onlyIf" : function() {
              return self.needFullDOB() || self.isCollectDobNewView;
            },
            "params" : true,
            "message" : res.required
          },
          "birthdateValid" : {
            "onlyIf" : function() {
              return self.needFullDOB() || self.isCollectDobNewView;
            },
            "params" : true,
            "message" : res.invalidBirthDate
          }
        });
      } else {
        if (0 !== params.dobCheck && 0 === params.dobReq) {
          var bindDomElem = params.countryDetailMap;
          self.birthdate.extend({
            "birthdatePartRequired" : {
              "onlyIf" : function() {
                return bindDomElem && bindDomElem[self.country()] && 0 !== bindDomElem[self.country()].childAge;
              },
              "params" : true,
              "message" : res.required
            },
            "birthdateValid" : {
              "onlyIf" : function() {
                return bindDomElem && bindDomElem[self.country()] && 0 !== bindDomElem[self.country()].childAge;
              },
              "params" : true,
              "message" : res.invalidBirthDate
            }
          });
        } else {
          self.birthdate.extend({
            "birthdatePartRequired" : {
              "params" : true,
              "message" : res.required
            },
            "birthdateValid" : {
              "params" : true,
              "message" : res.invalidBirthDate
            }
          });
        }
      }
      if (!self.birthdate.isValid()) {
        self.birthDay("");
        self.birthMonth("");
        if (!self.isCollectDobNewView) {
          self.birthYear("");
        }
      }
    }
    if (options && options.imgs) {
      var tickZoom = URI.getHighContrastImageUrl(options.imgs.baseUrl, options.imgs.msLogo, {
        "forBlackBackground" : options.imgs.msLogoWhite
      });
      self.msLogoImg = tickZoom;
      var updateSynchronously = URI.getHighContrastImageUrl(options.imgs.baseUrl, options.imgs.dropdownCaret, {
        "forBlackBackground" : options.imgs.dropdownCaretWhite
      });
      self.dropdownCaretImg = updateSynchronously;
    }
    self.initErrorGroup();
  }, {
    "validationOrder" : null,
    "errors" : null,
    "isValid" : null,
    "_viewContext" : null,
    "_observables" : null,
    "initErrorGroup" : function() {
      var self = this;
      self.errors = ko.validation.group(self.validationOrder);
      self.errors.showAllMessages(false);
      /**
       * @return {?}
       */
      self.isValid = function() {
        return self.errors().length > 0 ? false : self._viewContext.hasAttemptedSubmit ? !self.getFirstError() : true;
      };
    },
    "notifyAllSubscribers" : function() {
      var this_tx = this;
      $.each(this_tx.validationOrder, function(canCreateDiscussions, observable) {
        if (observable && observable.suppressMessages) {
          observable.suppressMessages(false);
        }
        if (observable && observable.notifySubscribers) {
          if (options.useNewValidationBehavior) {
            if (ko.isComputed(observable)) {
              observable.notifySubscribers(observable.peek());
            } else {
              if (ko.isObservable(observable)) {
                observable.valueHasMutated();
              }
            }
          } else {
            if (!observable()) {
              observable.notifySubscribers();
            }
          }
        }
      });
    },
    "validation" : function() {
      var TcApp = this;
      var date = $.map(TcApp.validationOrder, function(field) {
        return field && field.isValidating ? field.validation() : null;
      });
      return date;
    },
    "showError" : function(editor) {
      var self = this;
      return !editor.suppressMessages() || self._viewContext.hasAttemptedSubmit ? editor.isValid && !editor.isValid() || editor.isModified && !editor.isModified() && editor.serverError : editor.serverError;
    },
    "getFirstError" : function() {
      var this_tx = this;
      /** @type {null} */
      var json_tree_data = null;
      return $.each(this_tx.validationOrder, function(canCreateDiscussions, result) {
        return result && result.isValid && !result.isValid() || result && result.isModified && !result.isModified() && result.serverError ? (json_tree_data = result, false) : true;
      }), json_tree_data;
    },
    "placeholderVisible" : function(canCreateDiscussions) {
      return !canCreateDiscussions;
    },
    "isPlaceholderSupported" : function() {
      return "placeholder" in document.createElement("input");
    },
    "reportUserAction" : function(self) {
      $ReportEvent.Fire(self);
    },
    "isSwitchingToNext" : function(size) {
      var this_tx = this;
      $.each(this_tx.validationOrder, function(canCreateDiscussions, state) {
        if (state) {
          /** @type {string} */
          state.isSwitchingToNext = size;
        }
      });
    },
    "hasValidatedError" : function(size) {
      var this_tx = this;
      $.each(this_tx.validationOrder, function(canCreateDiscussions, state) {
        if (state) {
          state.hasValidatedError = size;
        }
      });
    }
  });
}(), function() {
  /** @type {!Window} */
  var global = window;
  var node = global.wLive;
  var $ = global.jQuery;
  var parentNode = node.Account;
  var THREE = parentNode.Controls;
  /** @type {null} */
  var player = null;
  var $scope = global.$Config.WLXAccount;
  var data = $scope.signup;
  var me = {};
  var action = global.MSA && global.MSA.CXH;
  /** @type {string} */
  var name = "onAction";
  /** @type {string} */
  var EVENT_UNDO = "onShow";
  /** @type {string} */
  var eventName = "onHide";
  /** @type {string} */
  var debouncedEventName = "onSetupEvents";
  /** @type {string} */
  var event = "onRemoveEvents";
  /** @type {string} */
  var dispose = "onDispose";
  $Do.when("ExternalHelper", 0, function() {
    player = global.ExternalHelper;
  });
  defineClass("wLive.Account.Controls.TouPrivacyControl", function(opts, scene, options) {
    var self = this;
    self.$ = $(self);
    /** @type {(Object|string)} */
    self._$container = opts;
    /** @type {!Object} */
    self._viewContext = scene;
    /** @type {!Object} */
    self._options = options;
    var r = self._pageDialogControl = new THREE.PageDialogControl(opts, scene, options);
    self._$pageDialogControl = r.$;
    if (!scene.data) {
      scene.data = {};
    }
    me = data.strings;
  }, {
    "_pageDialogControl" : null,
    "_$pageDialogControl" : null,
    "_viewContext" : null,
    "_options" : null,
    "$" : null,
    "dispose" : function() {
    },
    "show" : function() {
      var InfoMode = this;
      InfoMode._setupDialogEvents();
      if (InfoMode._pageDialogControl) {
        InfoMode._pageDialogControl.show();
      }
    },
    "hide" : function() {
      var providerDisplay = this;
      if (providerDisplay._pageDialogControl) {
        providerDisplay._pageDialogControl.hide();
      }
      providerDisplay._removeDialogEvents();
    },
    "pageReady" : function() {
      if (player) {
        var $DOMWindowLoader = $(".wpBluePage");
        player.setProperty("FrameWidth", parseInt($DOMWindowLoader.innerWidth()).toString());
        player.setProperty("FrameHeight", parseInt($DOMWindowLoader.innerHeight()).toString());
        player.ready();
      }
    },
    "notifyVisible" : function() {
      this.pageReady();
    },
    "_prepareAccessibleHtml" : function(name) {
      /** @type {string} */
      var rect_ = '<p id="agreementTitle" tabindex="-1">';
      /** @type {string} */
      var n = '<p tabindex="-1">';
      /** @type {string} */
      var i = "</p>";
      /** @type {!RegExp} */
      var t = /(?:\r\n|\r|\n)/g;
      /** @type {!RegExp} */
      var a = new RegExp(n + i, "g");
      /** @type {string} */
      var l = rect_ + name + i;
      return l = l.replace(t, i + n), l = l.replace(a, "");
    },
    "_setupDialogEvents" : function() {
      var that = this;
      var element = that._$pageDialogControl;
      if (element) {
        var self = that._pageDialogControl.events;
        element.on(self.action, $.proxy(that._processDialogActionEvent, that));
        element.on(self.setupEvents, $.proxy(that._processDialogSetupEvent, that));
        element.on(self.removeEvents, $.proxy(that._processDialogRemoveEvent, that));
        element.on(self.show, $.proxy(that._processDialogShowEvent, that));
        element.on(self.hide, $.proxy(that._processDialogHideEvent, that));
      }
    },
    "_removeDialogEvents" : function() {
      var result = this;
      var $ = result._$pageDialogControl;
      if ($) {
        var self = result._pageDialogControl.events;
        $.off(self.action);
        $.off(self.setupEvents);
        $.off(self.removeEvents);
        $.off(self.show);
        $.off(self.hide);
      }
    },
    "_processDialogActionEvent" : function(event, action) {
      this.$.triggerHandler(name, {
        "actionName" : action.actionName,
        "control" : this
      });
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    "inclusiveOOBEAlternateBack" : function() {
      this.$.triggerHandler(name, {
        "actionName" : "alternate",
        "control" : this
      });
    },
    "_processDialogSetupEvent" : function(cond, step) {
      var self = this;
      self.$.triggerHandler(debouncedEventName, {
        "content" : step.content,
        "control" : self
      });
      if (parentNode.ftrViewModelHandle) {
        parentNode.ftrViewModelHandle.buttons.backButton.visible(true);
        parentNode.ftrViewModelHandle.buttons.nextButton.visible(false);
      }
      if ($scope.isWin10InclusiveOOBE && action) {
        action.showBackButton(true);
        if (self._viewContext.data.input && "Phone" === self._viewContext.data.input.memberNameType) {
          $("#TOUPrivacyAlternate").show();
          $("#TOUPrivacyCancel").hide();
          action.handleBackButton(self.inclusiveOOBEAlternateBack.bind(self));
        } else {
          action.handleBackButton(self.inclusiveOOBECancelBack.bind(self));
        }
      }
      $(".tou").on("click", function() {
        self.$.triggerHandler(name, {
          "actionName" : "tou",
          "control" : self
        });
      });
      $(".privacy").on("click", function() {
        self.$.triggerHandler(name, {
          "actionName" : "privacy",
          "control" : self
        });
      });
      $(".pdc").on("click", function() {
        self.$.triggerHandler(name, {
          "actionName" : "dataCollection",
          "control" : self
        });
      });
      $(".upd").on("click", function() {
        self.$.triggerHandler(name, {
          "actionName" : "dataUse",
          "control" : self
        });
      });
      $(".rp").on("click", function() {
        self.$.triggerHandler(name, {
          "actionName" : "retention",
          "control" : self
        });
      });
    },
    "_processDialogRemoveEvent" : function(cond, step) {
      this.$.triggerHandler(event, {
        "content" : step.content,
        "control" : this
      });
    },
    "inclusiveOOBECancelBack" : function() {
      this.$.triggerHandler(name, {
        "actionName" : "cancel",
        "control" : this
      });
    },
    "_processDialogShowEvent" : function(warning_count, message) {
      var self = this;
      var value = message.content;
      var options = self._options;
      var requestOrUrl = options.queryUrl ? options.queryUrl : $Utility.generateUrl($scope.urls.baseDomain, data.urls.queryUrl, true);
      var visible = options.isPrivacy;
      var type = options.command || (visible ? "privacy" : "tou");
      var def = self._viewContext.data = self._viewContext.data || {};
      var template = def[type];
      var element = $("pre", value).length > 0 ? $("pre", value) : $("#TOUPrivacyDiv", value);
      var option = $("#TOUPrivacyHeader", value);
      var browser_message = $($("#touBackBtn").length > 0 ? "#touBackBtn" : "#TOUPrivacyCancel");
      var style = visible ? me.privacyHeader : me.touHeader;
      if (template) {
        browser_message.removeClass("hidden");
        element.html(template);
        option.text(style);
        browser_message.first().focus();
      } else {
        if (requestOrUrl) {
          $.ajax({
            "type" : "POST",
            "url" : requestOrUrl,
            "data" : {
              "command" : type
            },
            "context" : self,
            "success" : function(e) {
              if (e) {
                if ($scope.isXbox) {
                  element.text(e);
                  element.each(function(canCreateDiscussions, element) {
                    new WinJS.UI.ScrollViewer(element);
                  });
                } else {
                  var t = String(e).encodeHtml();
                  var target = self._prepareAccessibleHtml(t);
                  element.html(target);
                  def[type] = target;
                  browser_message.removeClass("hidden");
                }
                option.text(style);
              }
            },
            "error" : function() {
              self.$.triggerHandler(name, {
                "actionName" : "cancel",
                "control" : self
              });
            },
            "complete" : function() {
              browser_message.first().focus();
            }
          });
        }
      }
      element.attr("data-command", type);
      self.$.triggerHandler(EVENT_UNDO, {
        "content" : value,
        "control" : self
      });
    },
    "_processDialogHideEvent" : function(cond, step) {
      this.$.triggerHandler(eventName, {
        "content" : step.content,
        "control" : this
      });
    },
    "events" : {
      "action" : name,
      "show" : EVENT_UNDO,
      "hide" : eventName,
      "setupEvents" : debouncedEventName,
      "removeEvents" : event,
      "dispose" : dispose
    }
  }, {});
}(), function() {
  /** @type {!Window} */
  var global = window;
  var setImmediate = global.wLive;
  var $ = global.jQuery;
  var instance = setImmediate.Account;
  var context = instance.Controls;
  var URI = (instance.ViewModels, instance.AnimationHelper, instance.Util.HighContrast);
  /** @type {null} */
  var player = (instance.Util.ImageHelper, null);
  var $scope = instance.SignupHelper;
  var that = global.$Config.WLXAccount;
  var _curr = that.hip;
  var options = that.signup;
  var map = options.page;
  var regex = options.regex;
  var test = {};
  var target = (options.signupObservableSets, {});
  var p = global.MSA && global.MSA.CXH;
  var trashcan = that.isWin10;
  var malakh = that.isWin10InclusiveOOBE;
  var fullyPopulateUser = that.isXbox;
  /** @type {boolean} */
  var w = !!map.useNewValidationBehavior;
  /** @type {string} */
  var getStores = "action";
  /** @type {string} */
  var Stop = "alternate";
  /** @type {string} */
  var viewTriggers = "skip";
  /** @type {string} */
  var variable_name = "credentials";
  /** @type {string} */
  var hashedPassword = "password";
  /** @type {string} */
  var actionName = "usernameRecoverySpeedbump";
  /** @type {string} */
  var action = "evictionSpeedbump";
  /** @type {string} */
  var a = "fedSignInSpeedbump";
  /** @type {string} */
  var EV_LISTENER_MARKUP = "passwordProfilePage";
  /** @type {string} */
  var selector = "onAction";
  /** @type {string} */
  var type = "onShow";
  /** @type {string} */
  var data = "onHide";
  /** @type {string} */
  var EVENT_UNDO = "onSetupEvents";
  /** @type {string} */
  var eventName = "onRemoveEvents";
  /** @type {string} */
  var dispose = "onDispose";
  /** @type {number} */
  var _lastleft = 0;
  $Do.when("ExternalHelper", 0, function() {
    player = global.ExternalHelper;
  });
  defineClass("wLive.Account.Controls.SignupControl", function(props, type, data) {
    var self = this;
    self.$ = $(self);
    /** @type {(Object|string)} */
    self._$container = props;
    /** @type {!Object} */
    self._viewContext = type;
    /** @type {!Object} */
    self._options = data;
    var r = self._pageDialogControl = new context.PageDialogControl(props, type, data);
    self._$pageDialogControl = r.$;
    self._sectionId = data.sectionId;
    if (!type.data) {
      type.data = {};
    }
    target = options.strings;
    test = options.urls.dataRequest;
  }, {
    "_pageDialogControl" : null,
    "_$pageDialogControl" : null,
    "_viewContext" : null,
    "_$container" : null,
    "_verifyTimeout" : null,
    "_options" : null,
    "$" : null,
    "dispose" : function() {
    },
    "show" : function() {
      var InfoMode = this;
      InfoMode._setupDialogEvents();
      if (InfoMode._pageDialogControl) {
        InfoMode._pageDialogControl.show();
        InfoMode._setIdentityBannerVisibility(true);
      }
    },
    "hide" : function() {
      var providerDisplay = this;
      if (providerDisplay._pageDialogControl) {
        providerDisplay._pageDialogControl.hide();
        providerDisplay._setIdentityBannerVisibility(false);
      }
      providerDisplay._removeDialogEvents();
    },
    "pageReady" : function() {
      if (player) {
        var $area = $("#maincontent");
        player.setProperty("FrameWidth", parseInt($area.innerWidth()).toString());
        player.setProperty("FrameHeight", parseInt($area.innerHeight()).toString());
        player.ready();
      }
    },
    "notifyVisible" : function() {
      this.pageReady();
    },
    "handleActionButton" : function() {
      this.$.triggerHandler(selector, {
        "actionName" : getStores,
        "control" : this
      });
    },
    "setEnabled" : function(state) {
      if (player) {
        player.setWizardButtons(state, state, false);
      }
      if (instance.ftrViewModelHandle) {
        instance.ftrViewModelHandle.buttons.backButton.disabled(!state);
        instance.ftrViewModelHandle.buttons.nextButton.disabled(!state);
      }
      var view = this;
      if (view._pageDialogControl) {
        view._pageDialogControl.setEnabled(state);
      }
    },
    "_setupDialogEvents" : function() {
      var that = this;
      var element = that._$pageDialogControl;
      if (element) {
        var self = that._pageDialogControl.events;
        element.on(self.action, $.proxy(that._processDialogActionEvent, that));
        element.on(self.setupEvents, $.proxy(that._processDialogSetupEvent, that));
        element.on(self.removeEvents, $.proxy(that._processDialogRemoveEvent, that));
        element.on(self.show, $.proxy(that._processDialogShowEvent, that));
        element.on(self.hide, $.proxy(that._processDialogHideEvent, that));
      }
    },
    "_removeDialogEvents" : function() {
      var result = this;
      var $ = result._$pageDialogControl;
      if ($) {
        var self = result._pageDialogControl.events;
        $.off(self.action);
        $.off(self.setupEvents);
        $.off(self.removeEvents);
        $.off(self.show);
        $.off(self.hide);
      }
    },
    "_processDialogActionEvent" : function(event, options) {
      var self = this;
      var opts = self._options;
      var model = options.viewModel;
      var actionName = options.actionName;
      var watcherInputVM = self._viewContext.data || {};
      var data = watcherInputVM.input || {};
      var carrouselDivId = self._options && self._options.optInEmailId;
      if (self.setEnabled(false), $(document.activeElement).blur(), carrouselDivId) {
        var f = $("#" + carrouselDivId, self._$container);
        if (f && f.length > 0) {
          /** @type {boolean} */
          self._viewContext.persistedOptOutEmailSelection = !f.prop("checked");
        }
      }
      if (model && actionName === getStores && (trashcan ? (model._observables.indexOf("alternateEmail") >= 0 || model._observables.indexOf("hip") >= 0) && model.notifyAllSubscribers() : (w && model.isSwitchingToNext(true), model.notifyAllSubscribers())), event && (event.preventDefault(), event.stopPropagation()), "BirthDateAccrual" === opts.sectionId && "backStack" === actionName && (model.birthDay(""), model.birthMonth(""), map.isCollectDobNewView = !map.collectOnlyDob), actionName !== getStores && 
      actionName !== viewTriggers && actionName !== Stop) {
        return (model && model.password && ("cancel" === actionName || "backStack" === actionName) && !watcherInputVM.shouldGoToFedSignInSpeedbump || "FedSignInSpeedbump" === opts.sectionId && watcherInputVM.shouldGoToFedSignInSpeedbump) && options.isCombinedSISUV2 && (actionName = "finalBack"), void self.$.triggerHandler(selector, {
          "actionName" : actionName,
          "control" : self
        });
      }
      var ajaxArr = model && model.validation() || [];
      $.when.apply($, ajaxArr).done(function() {
        if (w && model.isSwitchingToNext(false), model && !model.isValid()) {
          return self._focusFirstError(model), void(w && model.hasValidatedError(true));
        }
        if (actionName === viewTriggers) {
          return model && model.isValid() ? void self.$.triggerHandler(selector, {
            "actionName" : viewTriggers,
            "control" : self
          }) : void self.setEnabled(true);
        }
        if (actionName === Stop) {
          return void self.$.triggerHandler(selector, {
            "actionName" : Stop,
            "control" : self
          });
        }
        if (model && model.memberName) {
          if (model.memberNameInput && options.viewContext.data.shouldGoToUsernameRecoverySpeedbump) {
            return void self.$.triggerHandler(selector, {
              "actionName" : actionName,
              "control" : self
            });
          }
          if (model.memberNameInput && options.viewContext.data.shouldGoToEvictionSpeedbump) {
            return void self.$.triggerHandler(selector, {
              "actionName" : action,
              "control" : self
            });
          }
          if (model.memberNameInput && options.viewContext.data.shouldGoToFedSignInSpeedbump) {
            return void self.$.triggerHandler(selector, {
              "actionName" : a,
              "control" : self
            });
          }
          if (model.shouldGoToPasswordPage && model.shouldGoToPasswordPage()) {
            if ($scope.isMembernamePasswordProfilePage()) {
              self.handleActionButton();
            } else {
              /** @type {string} */
              var ev_listener = $scope.isPasswordProfilePage() ? EV_LISTENER_MARKUP : hashedPassword;
              self.$.triggerHandler(selector, {
                "actionName" : ev_listener,
                "control" : self
              });
            }
            return;
          }
        }
        if (!(model && model.evictionSpeedbumpTopDesc && model.shouldGoToPasswordPage)) {
          if (model && model.usernameRecoverySpeedbumpDesc) {
            if (model.shouldGoToPasswordPage) {
              if ($scope.isMembernamePasswordProfilePage()) {
                self.handleActionButton();
              } else {
                /** @type {string} */
                ev_listener = $scope.isPasswordProfilePage() ? EV_LISTENER_MARKUP : hashedPassword;
                self.$.triggerHandler(selector, {
                  "actionName" : ev_listener,
                  "control" : self
                });
              }
              return;
            }
            if (model.shouldGoToFedSignInSpeedbump) {
              return void self.$.triggerHandler(selector, {
                "actionName" : a,
                "control" : self
              });
            }
          }
          return model && model.fedNamesPrefill && !data.memberName ? void self.$.triggerHandler(selector, {
            "actionName" : variable_name,
            "control" : self
          }) : map.collectOnlyDob && "BirthDateCountryAccrual" === opts.sectionId && actionName === getStores && model && model.birthdate && $scope.isChild(data.birthdate, data.country, true) ? (map.isCollectDobNewView = true, void self.$.triggerHandler(selector, {
            "actionName" : "birthDateAccrual",
            "control" : self
          })) : model && model.birthdate && map.isMojangUpgrade && $scope.isChild(data.birthdate, data.country) ? options.isUpgradeChildSpeedbumpEnabled ? void self.$.triggerHandler(selector, {
            "actionName" : "upgradeChildSpeedbump",
            "control" : self
          }) : void self.$.triggerHandler(selector, {
            "actionName" : "childBlock",
            "control" : self
          }) : fullyPopulateUser && model && model.optinEmailCheckbox && options.isOtsFlow ? (instance.FieldHelper.loadHip(), void self.$.triggerHandler(selector, {
            "actionName" : "hip",
            "control" : self
          })) : void self.handleActionButton();
        }
        if ($scope.isMembernamePasswordProfilePage()) {
          self.handleActionButton();
        } else {
          /** @type {string} */
          ev_listener = $scope.isPasswordProfilePage() ? EV_LISTENER_MARKUP : hashedPassword;
          self.$.triggerHandler(selector, {
            "actionName" : ev_listener,
            "control" : self
          });
        }
      });
    },
    "inclusiveOOBEAlternateBack" : function() {
      this.$.triggerHandler(selector, {
        "actionName" : "alternate",
        "control" : this
      });
    },
    "_setIdentityBannerVisibility" : function(cache) {
      var firstAlphaTemplateNode = $("#maincontent")[0];
      if (firstAlphaTemplateNode && $("#identityBanner").length > 0) {
        var alphaViewModelInstance = ko.dataFor(firstAlphaTemplateNode);
        if (alphaViewModelInstance) {
          if (this._options.showIdentityBanner && cache) {
            alphaViewModelInstance.isBackButtonVisible(instance.ftrViewModelHandle.buttons.backButton.visible());
            alphaViewModelInstance.showIdentityBanner(true);
          } else {
            alphaViewModelInstance.showIdentityBanner(false);
          }
        }
      }
    },
    "_processDialogSetupEvent" : function(fn, me) {
      var self = this;
      var element = me.content;
      var result = me.viewModel;
      var opts = self._options;
      var value = result && result.onClickSuggestionsLink;
      var $form = self._viewContext.data || {};
      var data = $form.input || {};
      /** @type {boolean} */
      var originalSource = !!map.fedStateToken;
      var A = originalSource && map.fedNamesPrefill && 1 === map.fedNamesPrefill.length;
      var result2 = originalSource && map.fedNamesPrefill && map.fedNamesPrefill.length > 1;
      if (instance.ftrViewModelHandle) {
        var canViewMyFiles = result && result.memberName && result.showSuggestions && !result.showSuggestions() && !result2 && !map.showMojangUpgradeSpeedbump;
        var canViewSiteFiles = result && result.password && options.isCombinedSISUV2 && !$form.shouldGoToFedSignInSpeedbump;
        var canUploadFiles = result && (result.fedConfirmPageDesc || result.birthdateParts) && "cancel" === opts.pageBackAction && A;
        var screenSmallerThanEditor = result && result.fedNamesPrefill && result2;
        var adjustHeight = "FedSignInSpeedbump" === opts.sectionId && options.isCombinedSISUV2 && $form.shouldGoToFedSignInSpeedbump;
        var checked = 0 !== map.noAuthCancel && (canViewMyFiles || canViewSiteFiles || canUploadFiles || screenSmallerThanEditor || adjustHeight);
        checked = checked || options.prefillMembernameIsProof && result.usernameRecoverySpeedbumpDesc && !map.showMojangUpgradeExp && !map.showMojangUpgradeSpeedbump;
        checked = checked || options.prefillMembernameIsPossiblyEvicted && result.evictionSpeedbumpTopDesc;
        checked = checked || map.isMojangUpgrade && !map.showMojangUpgradeSpeedbump && !map.showMojangUpgradeExp && !options.prefillMembernameIsProof && result.password;
        instance.ftrViewModelHandle.buttons.backButton.visible(!checked);
      }
      if ($(".tou").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "tou",
          "control" : self
        });
      }), $(".privacy").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "privacy",
          "control" : self
        });
      }), $(".pdc").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "dataCollection",
          "control" : self
        });
      }), $(".upd").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "dataUse",
          "control" : self
        });
      }), $(".rp").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "retention",
          "control" : self
        });
      }), $("#iProofSignIn").on("click", function() {
        return $Utility.navigateTo(options.usernameRecoverySpeedbumpSignInUrl), false;
      }), $("#iSignupAction").on("click", function() {
        return OnNext(), false;
      }), $("#SignupCancel").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "cancel",
          "control" : self
        });
      }), $("#iFederationSignIn").on("click", function() {
        var url = $Utility.addQueryString(options.googleFederationSignInUrl, "username", data.memberNameInput);
        return $Utility.navigateTo(url), false;
      }), $("#EvictionNext").on("click", function() {
        var url = $Utility.addQueryString(options.evictionSigninURL, "username", data.memberNameInput);
        return $Utility.navigateTo(url), false;
      }), element.on("click", "#iSignIn", function() {
        $ReportEvent.Fire("Signup_SignIn_UserAction");
      }), 1001 !== $Config.uiflvr && $("#impressumLink").attr("href", "#").on("click", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "impressum",
          "control" : self
        });
      }), $("#atlas").length > 0 && options.urls && options.urls.atlas && options.urls.atlas.signupStart && $("<img>").attr("src", options.urls.atlas && options.urls.atlas.signupStart).appendTo($("#atlas")), $("#LocalAccount").length > 0 && element.on("click", "#LocalAccount", function() {
        self.$.triggerHandler(selector, {
          "actionName" : "localAccount",
          "control" : self
        });
      }), $("#learnMore").length > 0 && element.on("click", "#learnMore", function() {
        p.getContext(function(e) {
          /** @type {boolean} */
          var t = "FRX" === (e.host ? e.host.toUpperCase() : "");
          if (t) {
            $("#LearnMoreFlyoutContent").html(options.learnMoreContent);
            $("#HelpText").show();
            $("#HelpClose").focus();
          } else {
            self.$.triggerHandler(selector, {
              "actionName" : "learnMore",
              "control" : self
            });
          }
        });
      }), $("#LearnMoreContent").length > 0 && $("#LearnMoreContent").html(options.learnMoreContent), $("#HelpClose").length > 0 && element.on("click", "#HelpClose", function() {
        $("#HelpText").hide();
      }), options.getDeviceTicket && p.postDeviceTicketToUrl(options.originalUrl, options.signupAuthPolicy), (trashcan || malakh) && (element.mouseup(function(e) {
        var t = $("#MemberNameSuggestions");
        if (t.is(":visible") && !t.is(e.target) && 0 === t.has(e.target).length) {
          t.hide();
        }
        var popoverElement = $("#HelpText");
        if (popoverElement.is(":visible") && !popoverElement.is(e.target) && 0 === popoverElement.has(e.target).length) {
          popoverElement.hide();
        }
      }), !options.learnMoreContent && options.urls.queryUrl && $.post($Utility.generateUrl(that.urls.baseDomain, options.urls.queryUrl, true), {
        "command" : "win10learnmore"
      }, function(e) {
        var internalContent = $.parseJSON(e);
        if (internalContent) {
          options.learnMoreContent = internalContent.html;
        }
      }, "html"), $("#Proofs").length > 0 && (options.fss && options.fss.memberRole === options.fss.userRole ? ($("#ProofsHeading").text(target.proofs.familychildheader), $("#ProofsDesc").text(target.proofs.familychilddesc)) : options.fss && options.fss.memberRole === options.fss.adminRole ? $("#ProofsDesc").text(target.proofs.familydesc) : $scope.isChild(data.birthdate, data.country) && ($("#ProofsHeading").text(target.proofs.childheader), $("#ProofsDesc").text(target.proofs.childdesc))), $("#PreferencesAction").is(":visible") && 
      (data.memberNameInput.indexOf("@") > -1 ? $("#PreferencesCancel").show() : data.memberNameInput.match(regex.PhoneNumberFormat) ? $("#PhoneVerification").show() : ($("#PreferencesAlternate").show(), that.isWin10InclusiveOOBE && p && p.handleBackButton(self.inclusiveOOBEAlternateBack.bind(self)))), $("#PasswordAction").is(":visible") && options.viewContext.data.shouldGoToEvictionSpeedbump && p.handleBackButton(self.inclusiveOOBEAlternateBack.bind(self))), fullyPopulateUser) {
        var detailViewItems = $("#Preferences");
        if (detailViewItems && detailViewItems.length > 0) {
          if ($scope.isChild(data.birthdate, data.country)) {
            $("#iOptinEmail").prop("checked", false);
            $("#emailPref").hide();
            /** @type {boolean} */
            self._viewContext.hideOptinCheckboxForChild = true;
          }
          if (options.showUserTile) {
            self._setupUserTile(data.memberNameInput, data.firstName, data.lastName);
          }
        }
      }
      if (options.isCombinedSISUV2 && result && result.showPaginatedUsernamePrefill && result.paginatedUsernamePrefill && (data.memberName = result.paginatedUsernamePrefill, $form.shouldGoToFedSignInSpeedbump ? self.$.triggerHandler(selector, {
        "actionName" : a,
        "control" : self
      }) : self.$.triggerHandler(selector, {
        "actionName" : hashedPassword,
        "control" : self
      })), result && result.verification) {
        var F = instance.FieldHelper.getMemberNameType(data.memberName, options.domains);
        var username = options.channel.sms;
        var time = "undefined" == typeof options.resendCodeTimeout ? 6e4 : options.resendCodeTimeout;
        var del = time || 4e3;
        var container = $("#resendCodeText");
        var addButton = $("#resendCodeLink", container);
        if (F === options.memberNameType.EASI) {
          username = options.channel.email;
          var backwardCtrl = $("#resendCodeLink");
          backwardCtrl.on("click", function() {
            self._sendOTT(username);
            $("#VerificationCode").focus();
            $ReportEvent.Fire("Signup_ResendCode_UserAction");
          });
        }
        container.delay(time).fadeIn(500);
        addButton.on("click", function() {
          self._sendOTT(username);
          $("#VerificationCode").focus();
          container.hide();
          $ReportEvent.Fire("Signup_ResendCode_UserAction");
          container.delay(del).fadeIn(500);
        });
        if (data.lastEnteredMemberName !== data.memberNameInput) {
          data.lastEnteredMemberName = data.memberNameInput;
          self._sendOTT(username);
        }
      }
      var $itemElement = $("#MemberNamePrefill");
      if ($itemElement.length > 0) {
        $itemElement.parent().on("show.bs.dropdown", function() {
          $itemElement.width($itemElement.parents("div .col-md-8").first().width());
        });
      }
      var col = $(".dropdown");
      if (col.length > 0) {
        var el = $("#domainLabel", col);
        col.on("show.bs.dropdown", function() {
          el.attr("aria-label", target.hideEmailDomainOptions);
        });
        col.on("hide.bs.dropdown", function() {
          el.attr("aria-label", target.showEmailDomainOptions);
        });
        if ($Utility.isHighContrast()) {
          el.css("border-top-width", "1px");
          el.css("border-left-width", "1px");
          el.css("border-right-width", "1px");
        }
      }
      if (_curr.required ? $("#hipTemplateContainer", me.content).length > 0 && (instance.FieldHelper.loadHip(), $("#hipSection").show()) : _curr.enforcementRequired ? $("#hipEnforcementContainer", me.content).length > 0 && instance.FieldHelper.loadEnforcementHip(options.signUpHipEnforcementPageId) : $("#hipSection").hide(), value && element.on("click", "#suggLink", value), self._viewContext.hasAttemptedSubmit && result && !result.isValid()) {
        var uiHandler = result.getFirstError();
        uiHandler.suppressMessages(false);
        uiHandler.focused(true);
      }
      $("body").on("click", "#domainExistsInAadSwitchToOutlook", function() {
        instance.viewModelHandle.switchMemberNameType("Live");
      });
      var t = $("#GoogleLogoImage");
      if (t.length > 0) {
        var X = URI.getHighContrastImageUrl(map.imgs.baseUrl, map.imgs.fedSignInWithGoogle, {
          "forBlackBackground" : map.imgs.fedSignInWithGoogleWhite
        });
        t.attr("src", X);
      }
      var $img = $("#UpgradeChildSpeedbumpImg");
      if ($img.length > 0) {
        var _gif = URI.getHighContrastImage(options.upgradeChildSpeedbumpImgUrl, {
          "forBlackBackground" : options.upgradeChildSpeedbumpImgUrlWhite
        });
        $img.attr("src", _gif);
      }
      self.$.triggerHandler(EVENT_UNDO, {
        "content" : element,
        "control" : self
      });
    },
    "_processDialogRemoveEvent" : function(enumType, s) {
      var self = this;
      var watcherInputVM = self._viewContext.data || {};
      var $specialCharNode = (watcherInputVM.input || {}, s.content);
      var data = instance.viewModelHandle;
      $specialCharNode.off("click");
      if (data.verification && data.showError(data.verification)) {
        data.verification("");
      }
      if ($("#hipTemplateContainer", s.content).length > 0) {
        $("#hipTemplate").append($("#hipTemplateContainer").children().detach());
      }
      this.$.triggerHandler(eventName, {
        "content" : s.content,
        "control" : this
      });
    },
    "_processDialogShowEvent" : function(enumType, s) {
      this.$.triggerHandler(type, {
        "content" : s.content,
        "control" : this
      });
      var r = global.HIPAMFE;
      var a = "undefined" != typeof r && r.done;
      if ($("#hipTemplateContainer", s.content).length > 0 && a) {
        if (r && r.updateTitle) {
          r.updateTitle();
        }
        $("#hipTemplateContainer").append($("#hipTemplate").children().detach());
      }
      $("#ftr").removeClass("hide");
    },
    "_processDialogHideEvent" : function(cond, step) {
      this.$.triggerHandler(data, {
        "content" : step.content,
        "control" : this
      });
    },
    "_sendOTT" : function(url) {
      var self = this;
      var watcherInputVM = self._viewContext.data || {};
      var r = watcherInputVM.input || {};
      var meta = {
        "uaid" : global.$Config.uaid
      };
      meta.action = options.sendOttAction;
      meta.proofId = r.memberNameInput;
      if (url === options.channel.sms) {
        meta.proofCountryIso = r.memberNamePhoneCountry;
        meta.autoVerification = $scope.isAutoVerificationSupported(r.memberNameInput);
      }
      /** @type {string} */
      meta.channel = url;
      /** @type {string} */
      var hashString = global.location.hash;
      if (hashString) {
        /** @type {string} */
        hashString = hashString.replace("#", "");
        if (hashString && hashString.indexOf("ottErrCode=") > -1) {
          /** @type {string} */
          meta.TestErrorCode = hashString.replace("ottErrCode=", "");
          /** @type {string} */
          global.location.hash = "#";
        }
      }
      global.$DataRequest.Json(null, $Utility.generateUrl(that.urls.baseDomain, test.sendOtt, true), meta, $.proxy(self._onSendOttSuccess, self), $.proxy(self._onSendOttFailure, self), 1e4, this);
      /** @type {number} */
      _lastleft = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
    },
    "_onSendOttSuccess" : function() {
      var self = this;
      if (self._reportApiQos(), instance.viewModelHandle.doAutoVerify) {
        $.proxy(instance.viewModelHandle.doAutoVerify, self)();
      } else {
        var t = self._viewContext.data || {};
        /** @type {boolean} */
        t.sendOttSuccessRsp = true;
        self.handleActionButton();
      }
    },
    "_onSendOttFailure" : function(data) {
      var self = this;
      var o = data && data.error ? data.error.code : "";
      if (self._reportApiQos(o), instance.viewModelHandle.onVerifyFailed) {
        $.proxy(instance.viewModelHandle.onVerifyFailed, self)(data);
      } else {
        var thisPlot = self._viewContext.data || {};
        /** @type {!Object} */
        thisPlot.sendOttErrorRsp = data;
        self.handleActionButton();
      }
    },
    "_reportApiQos" : function(code) {
      try {
        /** @type {number} */
        var bbcx = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
        var event = {};
        /** @type {string} */
        event.pageId = "Account_SendSMSOtt_API";
        /** @type {number} */
        event.duration = Math.round(bbcx - _lastleft);
        if (code) {
          /** @type {string} */
          event.errorCode = code;
        }
        /** @type {boolean} */
        event.skipClientCall = true;
        $ReportEvent.Action(event);
      } catch (o) {
      }
    },
    "_focusFirstError" : function(Constructor) {
      var uiHandler = Constructor.getFirstError();
      uiHandler.suppressMessages(false);
      uiHandler.focused(false);
      uiHandler.focused(true);
      this.setEnabled(true);
    },
    "_setupUserTile" : function(w, h, m) {
      if (w && h && m) {
        $("#fullName").text(options.page.isFLOrder ? h + " " + m : m + " " + h);
        $("#membername").text(w);
        $("#userTile").show();
      }
    },
    "events" : {
      "action" : selector,
      "show" : type,
      "hide" : data,
      "setupEvents" : EVENT_UNDO,
      "removeEvents" : eventName,
      "dispose" : dispose
    }
  }, {});
}(), function() {
  /** @type {!Window} */
  var global = window;
  var node = global.wLive;
  var $ = global.jQuery;
  var e = node.Account;
  var win = e.Util;
  var loadedApp = e.Controls;
  var t = e.UrlHelper;
  /** @type {null} */
  var a = null;
  var self = global.MSA && global.MSA.CXH;
  var hist = win && win.ConvergedUxUtil;
  var nav = win && win.MarchingAnts;
  var loc = win && win.FullScreenSpinner;
  var result = global.$Config.WLXAccount;
  var options = result.signup;
  var parent = options.page;
  var res = result.hip;
  var req = res && res.enforcement;
  var data = {};
  var form = {};
  var state = {};
  var test = {};
  var canViewMyFiles = result.isWin10;
  var canViewSiteFiles = result.isWin10InclusiveOOBE;
  var courseSections = result.isXbox;
  /** @type {boolean} */
  var canUploadFiles = 0 !== result.isSkype;
  /** @type {boolean} */
  var A = !!parent.fedStateToken;
  /** @type {string} */
  var offset = "newpwd";
  /** @type {string} */
  var string = "https://";
  /** @type {string} */
  var EVENT_UNDO = "onAction";
  /** @type {string} */
  var gfill = "enforcement";
  /** @type {string} */
  var pageId = "Account_CreatePassports_API";
  /** @type {number} */
  var _lastleft = 0;
  $Do.when("ExternalHelper", 0, function() {
    a = global.ExternalHelper;
  });
  defineSubClass("wLive.Account.Controls.SignupCreateControl", loadedApp.SignupControl, function($container) {
    this._wreply = t.GetQSValue(global.location.href, "wreply");
    this._ru = t.GetQSValue(global.location.href, "ru");
    this._signupRu = t.GetQSValue(global.location.href, "sru");
    /** @type {boolean} */
    this._isSubmitting = false;
    this._$container = $container;
    data = options.strings;
    form = data.errors;
    test = options.urls.dataRequest;
    state = options.errorCodes;
  }, {
    "dispose" : function() {
      this._base.dispose();
    },
    "_onCreateSuccess" : function(data) {
      var accountTypeInstance = e.FieldHelper.getMemberNameType(data.signinName, options.domains);
      var self = this;
      var panel = self._viewContext.data || {};
      var y = panel.input || {};
      var x = panel.prefill || {};
      var params = {};
      /** @type {string} */
      params.pageId = pageId;
      /** @type {!Array} */
      params.userAction = [];
      /** @type {boolean} */
      params.skipClientCall = true;
      var p;
      for (p in x) {
        if (x[p] === y[p]) {
          params.userAction.splice(0, 0, "Action_" + p + "_Used");
        } else {
          params.userAction.splice(0, 0, "Action_" + p + "_NotUsed");
        }
      }
      try {
        /** @type {number} */
        var bbcx = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
        params.suggestedAccountType = options.fl;
        params.accountType = accountTypeInstance;
        /** @type {number} */
        params.duration = Math.round(bbcx - _lastleft);
        $ReportEvent.Action(params);
      } catch (h) {
      }
      var $pluginHolder = $("#atlas");
      if ($pluginHolder.length > 0 && options.urls && options.urls.atlas) {
        if (accountTypeInstance === options.memberNameType.Live && options.urls.atlas.createLive) {
          $("<img>").attr("src", options.urls.atlas && options.urls.atlas.createLive).appendTo($pluginHolder);
        } else {
          if (options.urls.atlas.createEasi) {
            $("<img>").attr("src", options.urls.atlas && options.urls.atlas.createEasi).appendTo($pluginHolder);
          }
        }
      }
      setTimeout(function() {
        if (a.setProperty("IsSignUp", "1"), data) {
          var attr = e.FieldHelper.getMemberNameType(data.signinName, options.domains);
          if (options.fss && options.fss.isFamilyAddMemberFlow) {
            /** @type {null} */
            var instruction = null;
            var value = {
              "uaid" : global.$Config.uaid
            };
            /** @type {boolean} */
            var siteId = attr === options.memberNameType.EASI;
            value.memberEmailPii = data.signinName || "";
            value.memberRole = options.fss.memberRole || "";
            $Do.when("DataRequest", 0, function() {
              if (siteId) {
                instruction = new node.Core.DataRequest(null, $Utility.generateUrl(result.urls.baseDomain, test.addPendingMember, true), value, function(element) {
                  self._onAddToFamilySuccess(element, data, siteId);
                }, function(e) {
                  self._onAddToFamilyFailure(e, data.signinName, siteId);
                });
              } else {
                value.memberPuid = data.puid || "";
                instruction = new node.Core.DataRequest(null, $Utility.generateUrl(result.urls.baseDomain, test.createAndUpdateFamily, true), value, function(element) {
                  self._onAddToFamilySuccess(element, data, siteId);
                }, function(e) {
                  self._onAddToFamilyFailure(e, data.signinName, siteId);
                });
              }
              if (self && options.fss.isWinTsetFlow) {
                self.createStubAccountAsync(data.signinName, false, function() {
                  instruction.start();
                }, function(e) {
                  $ReportEvent.ReportApiCall({
                    "apiId" : options.fss.errorApiId,
                    "success" : false,
                    "errorCode" : e.number || ""
                  });
                  $Utility.navigateTo(options.fss.ruOnError);
                });
              } else {
                instruction.start();
              }
            });
          } else {
            if (parent.isAddUserFlow && self) {
              self.createStubAccountAsync(data.signinName, false, function() {
                self.finish(self.FinishStates.Success);
              }, function(e) {
                $ReportEvent.ReportApiCall({
                  "apiId" : options.addUserErrorApi,
                  "success" : false,
                  "errorCode" : e.number || ""
                });
                self.finish(self.FinishStates.Error);
              });
            } else {
              value = self._getSignInPostData(data);
              $Utility.postTo(data.redirectUrl, value);
            }
          }
        }
      }, 1e3);
    },
    "_onCreateFailure" : function(err) {
      var self = this;
      var error = err && err.error;
      try {
        /** @type {number} */
        var bbcx = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
        var msg = self._viewContext.data || {};
        var params = {};
        /** @type {string} */
        params.pageId = pageId;
        params.suggestedAccountType = options.fl;
        params.accountType = e.FieldHelper.getMemberNameType(msg.input.memberName, options.domains);
        /** @type {number} */
        params.duration = Math.round(bbcx - _lastleft);
        params.errorCode = error ? err.error.code : "";
        /** @type {boolean} */
        params.skipClientCall = true;
        $ReportEvent.Action(params);
      } catch (d) {
      }
      if (a) {
        a.setWizardButtons(true, true, false);
      }
      if (e.ftrViewModelHandle) {
        e.ftrViewModelHandle.buttons.backButton.disabled(false);
        e.ftrViewModelHandle.buttons.nextButton.disabled(false);
      }
      /** @type {boolean} */
      self._viewContext.hasAttemptedSubmit = true;
      /** @type {boolean} */
      self._isSubmitting = false;
      self._viewContext.data.serverErrors = {};
      self._handleCreateError(err.error);
      self.setEnabled(true);
    },
    "_onAddToFamilySuccess" : function(module, data, siteId) {
      var self = this;
      if (self._updateFamilyCache(data.signinName), data.childInfo) {
        $Cookie.setCookie(options.fss.childConsentCookieName, data.childInfo, options.fss.childConsentCookieDomain, 0, 0, 1, options.useSameSite);
        $Cookie.setCookie(options.fss.childConsentRUCookieName, options.fss.ruOnSuccess, options.fss.childConsentCookieDomain, 0, 0, 1, options.useSameSite);
        /** @type {string} */
        var url = "";
        var watcherInputVM = self._viewContext.data || {};
        var shipping_address = watcherInputVM.input || {};
        /** @type {boolean} */
        var base = false;
        if (options.fss.kcFCountries && "string" == typeof options.fss.kcFCountries && shipping_address.country) {
          /** @type {!Array<string>} */
          var queries_array = options.fss.kcFCountries.split(",");
          var d = shipping_address.country.replace(/^\s+|\s+$/g, "").toLowerCase();
          /** @type {number} */
          var j = 0;
          for (; j < queries_array.length; j++) {
            if (queries_array[j].replace(/^\s+|\s+$/g, "").toLowerCase() === d) {
              /** @type {boolean} */
              base = true;
              break;
            }
          }
        }
        url = base ? $Utility.addQueryString(options.fss.kcFRu, "kcft", data.kcft) : options.fss.childConsentRu;
        $Utility.navigateTo(url);
      } else {
        /** @type {string} */
        url = "";
        url = options.fss.isWinTsetFlow && siteId ? decodeURIComponent(options.fss.ruOnEasiSuccess).format(module.encryptedMemberName) : options.fss.isWinTsetFlow ? decodeURIComponent(options.fss.ruOnSuccess).format(module.encryptedMemberName) : options.fss.ruOnSuccess;
        $Utility.navigateTo(url);
      }
    },
    "_onAddToFamilyFailure" : function(data, preflightData, siteId) {
      var $mmUtil = this;
      if (data && data.error && data.error.code) {
        /** @type {string} */
        var label = "";
        if (data.error.data) {
          try {
            /** @type {*} */
            var viewConfig = JSON.parse(data.error.data);
            if (viewConfig && viewConfig.encryptedMemberName) {
              label = viewConfig.encryptedMemberName;
            }
          } catch (r) {
          }
        }
        switch(data.error.code) {
          case options.fss.errorCodes.familyInvitationAlreadyExists:
            $mmUtil._updateFamilyCache(preflightData);
            /** @type {string} */
            var url = "";
            return url = options.fss.isWinTsetFlow && siteId ? decodeURIComponent(options.fss.ruOnEasiSuccess).format(label) : options.fss.isWinTsetFlow ? decodeURIComponent(options.fss.ruOnSuccess).format(label) : options.fss.ruOnSuccess, void $Utility.navigateTo(url);
          case options.fss.errorCodes.memberAlreadyInFamily:
            return void $Utility.navigateTo(decodeURIComponent(options.fss.urls.memberAlreadyInFamily));
          case options.fss.errorCodes.cannotInviteExistingMember:
            return void $Utility.navigateTo(decodeURIComponent(options.fss.urls.cannotInviteExistingMember));
          case options.fss.errorCodes.notAllowedToAddMember:
          case options.fss.errorCodes.notAllowedToInviteMember:
            return void $Utility.navigateTo(decodeURIComponent(options.fss.urls.addToFamilyChildFailure).format(label));
          case state.familySizeExceedLimit:
            return void $Utility.navigateTo(decodeURIComponent(options.fss.urls.familySizeLimitReached).format(label));
          case options.fss.errorCodes.firstMemberAdminMissingAccountInfo:
            return void $Utility.navigateTo(decodeURIComponent(options.fss.urls.addToFamilyParentFailure));
        }
      }
      $Utility.navigateTo(options.fss.ruOnError);
    },
    "_updateFamilyCache" : function(data) {
      if (self) {
        try {
          /** @type {boolean} */
          var unexpandedFeatureDirectoryPaths = options.fss.memberRole === options.fss.userRole;
          self.createLocalMemberWithEmailAsync(data, unexpandedFeatureDirectoryPaths, false);
        } catch (n) {
        }
      }
    },
    "_getSignInPostData" : function(gistics) {
      var t = {
        "slt" : gistics.slt
      };
      return 1 === options.ignoresso && (t.ignoresso = 1), t;
    },
    "_createAccount" : function(id) {
      var fieldInstance = this;
      if (a) {
        a.setWizardButtons(false, false, false);
      }
      if (e.ftrViewModelHandle) {
        e.ftrViewModelHandle.buttons.backButton.disabled(true);
        e.ftrViewModelHandle.buttons.nextButton.disabled(true);
      }
      var body = $("#Spinner");
      if (body.show(), !(canViewMyFiles || canViewSiteFiles || canUploadFiles)) {
        var token = $("#spinnerImg", body);
        token.detach();
        body.append(token);
      }
      if (loc) {
        win.FullScreenSpinner.show();
      }
      if (nav) {
        nav.showLightboxProgress();
      }
      if (hist) {
        hist.disableLightbox(true);
      }
      /** @type {number} */
      _lastleft = global.performance && global.performance.now ? global.performance.now() : (new Date).getTime();
      global.$DataRequest.Json(null, $Utility.generateUrl(result.urls.baseDomain, test.createAccount, true), id, $.proxy(fieldInstance._onCreateSuccess, fieldInstance), $.proxy(fieldInstance._onCreateFailure, fieldInstance));
    },
    "_handleCreateError" : function(response) {
      var self = this;
      var error = response.code;
      var i = response.field;
      /** @type {string} */
      var els = "";
      var atlines = self._viewContext.keyToStateMap;
      var tree = self._viewContext.data || {};
      var visible = self._viewContext.data.serverErrors = self._viewContext.data.serverErrors || {};
      var context = global.HIPAMFE;
      /** @type {boolean} */
      var y = false;
      switch($("#Spinner").hide(), hist && hist.disableLightbox(false), nav && nav.hideLightboxProgress(), loc && win.FullScreenSpinner.hide(false), e.viewModelHandle.showAutoVerificationUI && e.viewModelHandle.showAutoVerificationUI(false), error) {
        case state.hipValidationError:
          if (res.enforcementRequired) {
            e.FieldHelper.loadEnforcementHip(options.signUpHipEnforcementPageId);
          } else {
            if (context && context.done) {
              if (context.observable.hip(""), context.error = 1, context.setError(), els = context.getError(), context.observable.hip.focused(true), "sms" === context.type) {
                if (response.data) {
                  try {
                    /** @type {*} */
                    var obj = JSON.parse(response.data);
                    if (obj && obj.fid) {
                      context.switchHIP("sms", obj.fid);
                    }
                  } catch (k) {
                  }
                }
              } else {
                context.reloadHIP();
              }
            }
          }
          break;
        case state.hipNeeded:
          /** @type {boolean} */
          self._viewContext.hasAttemptedSubmit = false;
          /** @type {boolean} */
          res.required = true;
          /** @type {boolean} */
          res.enforcementRequired = false;
          if ($.inArray("hip", options.options.states) >= 0) {
            self.$.triggerHandler(EVENT_UNDO, {
              "actionName" : "hip",
              "control" : self
            });
          } else {
            e.FieldHelper.loadHip();
            $("#hipSection").show();
          }
          break;
        case state.hipEnforcementNeeded:
          /** @type {boolean} */
          self._viewContext.hasAttemptedSubmit = false;
          /** @type {boolean} */
          res.enforcementRequired = true;
          /** @type {boolean} */
          res.required = false;
          if ($.inArray("hipEnforcement", options.options.states) >= 0) {
            self.$.triggerHandler(EVENT_UNDO, {
              "actionName" : "hipEnforcement",
              "control" : self
            });
          } else {
            e.FieldHelper.loadEnforcementHip(options.signUpHipEnforcementPageId);
          }
          break;
        case state.hipSMSNeeded:
          /** @type {boolean} */
          res.required = true;
          /** @type {boolean} */
          res.enforcementRequired = false;
          var id;
          var url;
          /** @type {null} */
          var name = null;
          if (response.data) {
            try {
              /** @type {*} */
              obj = JSON.parse(response.data);
              if (obj) {
                url = obj.sid || null;
                id = obj.fid || null;
                name = obj.dc || null;
              }
            } catch (k) {
            }
          }
          if (context && context.done) {
            if (url) {
              context.urlId = url;
            }
            if (id && name) {
              context.switchHIP("sms", id, name);
            } else {
              if (id) {
                context.switchHIP("sms", id);
              } else {
                context.switchHIP("sms");
              }
            }
          } else {
            var E;
            for (E in self._viewContext.keyToStateMap) {
              if ("hip" === E) {
                if (res.url = $f.replaceQs(res.url, "type", "sms"), url && (res.url = $f.replaceQs(res.url, "id", url)), id) {
                  if (name) {
                    res.url = res.url.replace(string, string + name + ".");
                    res.url = $f.replaceQs(res.url, "fid", id);
                  } else {
                    if (id.indexOf(".") > -1) {
                      var regularChars = id.split(".");
                      res.url = res.url.replace(string, string + regularChars[0] + ".");
                      res.url = $f.replaceQs(res.url, "fid", id);
                    } else {
                      res.url = $f.replaceQs(res.url, "fid", id);
                    }
                  }
                }
                if ($.inArray("hip", options.options.states) >= 0) {
                  self.$.triggerHandler(EVENT_UNDO, {
                    "actionName" : "hip",
                    "control" : self
                  });
                } else {
                  e.FieldHelper.loadHip();
                  $("#hipSection").show();
                }
                break;
              }
            }
            self.$.triggerHandler(EVENT_UNDO, {
              "actionName" : "blocked",
              "control" : self
            });
          }
          break;
        case state.dailyLimitIDsReached:
          /** @type {boolean} */
          y = true;
          self.$.triggerHandler(EVENT_UNDO, {
            "actionName" : "blocked",
            "control" : self
          });
          break;
        case state.oneTimeCodeInvalid:
          els = form.oneTimeCodeInvalid;
          break;
        case state.verificationSltInvalid:
          /** @type {null} */
          tree.verificationCodeSlt = null;
          break;
        case state.membernameTaken:
        case state.membernameTakenEasi:
        case state.membernameTakenPhone:
          var input = form.memberNameTakenNoSugg;
          /** @type {string} */
          var s = "";
          /** @type {string} */
          var doc = "";
          switch(0 !== options.displaySignInLinkInMnError ? (options.signinUrl = $Utility.addQueryString(options.signinUrl, "username", tree.input.memberName || ""), s = form.memberNameTakenEasi.format(tree.input.memberName, options.signinUrl), doc = form.memberNameTakenPhone.format(tree.input.memberName, options.signinUrl)) : (s = form.memberNameTakenEasi.format(tree.input.memberName), doc = form.memberNameTakenPhone.format(tree.input.memberName)), error) {
            case state.membernameTaken:
              var type = e.FieldHelper.getMemberNameType(tree.input.memberName, options.domains);
              els = type === options.memberNameType.Phone ? doc : input;
              break;
            case state.membernameTakenEasi:
              /** @type {string} */
              els = s;
              break;
            case state.membernameTakenPhone:
              /** @type {string} */
              els = doc;
          }break;
        case state.domainNotAllowed:
          els = form.domainNotAllowed;
          break;
        case state.forbiddenWord:
          els = form.forbiddenWord;
          break;
        case state.passwordIncorrect:
          els = form.passwordIncorrect;
          break;
        case state.passwordConflict:
          if (options.showEvictionErrorPage) {
            self.$.triggerHandler(EVENT_UNDO, {
              "actionName" : "evictionError",
              "control" : self
            });
          } else {
            els = form.passwordConflict;
          }
          break;
        case state.invalidEmailFormat:
          els = form.invalidEmailFormat;
          break;
        case state.emailMustStartWithLetter:
          els = form.emailMustStartWithLetter;
          break;
        case state.proofAlreadyExistsError:
          els = form.proofAlreadyExistsError;
          break;
        case state.invalidPhoneFormat:
          els = form.invalidPhoneFormat;
          break;
        case state.invalidBirthDate:
          els = form.invalidBirthDate;
          break;
        case state.invalidGender:
          els = form.invalidGender;
          break;
        case state.invalidFirstName:
          els = form.invalidFirstName;
          break;
        case state.invalidLastName:
          els = form.invalidLastName;
          break;
        case state.maximumOTTDailyError:
          els = form.verificationThrottled;
          break;
        case state.bannedPassword:
          els = form.bannedPassword;
          break;
        case state.passwordRequired:
          /** @type {number} */
          parent.pwdless = parent.pwdlessemail = 0;
          els = form.passwordRequired;
          break;
        case state.domainExistsInAad:
          els = form.domainExistsInAad.format("domainExistsInAadSwitchToOutlook");
          break;
        case state.domainExistsInAadSupportedLogin:
          els = form.domainExistsInAadSupportedLogin.format(tree.input.memberName);
          break;
        case state.evictionWarningRequired:
          /** @type {boolean} */
          y = true;
          if (!options.viewContext.data.checkAvailStateMap) {
            /** @type {!Array} */
            options.viewContext.data.checkAvailStateMap = [];
          }
          options.viewContext.data.checkAvailStateMap.push(tree.input.memberName + ":true");
          self.$.triggerHandler(EVENT_UNDO, {
            "actionName" : "evictionSpeedbump",
            "control" : self
          });
          break;
        default:
          /** @type {boolean} */
          y = true;
          self._handleFatalError(error);
      }
      if (i) {
        var a = atlines[i];
        if (visible[i] = els, e.viewModelHandle[i] && (e.viewModelHandle[i].serverError = els, e.viewModelHandle[i].notifySubscribers && !e.viewModelHandle[i].terminalState && e.viewModelHandle[i].notifySubscribers(), e.viewModelHandle[i].isModified && e.viewModelHandle[i].isModified(false), e.viewModelHandle[i].focused && e.viewModelHandle[i].focused(true)), response.data) {
          try {
            /** @type {*} */
            var page = JSON.parse(response.data);
            if (page && page.verificationCodeSlt) {
              tree.verificationCodeSlt = page.verificationCodeSlt;
            }
          } catch (k) {
          }
        }
        if (a) {
          if ("hip" !== a) {
            options.options.viewDefs[a].options.focusErrorElemId = i;
          }
          self.$.triggerHandler(EVENT_UNDO, {
            "actionName" : a,
            "control" : self
          });
        }
      } else {
        if (!y) {
          self._handleFatalError(error);
        }
      }
    },
    "_handleFatalError" : function(s) {
      if (a) {
        a.setProperty("ErrorCode", parseInt(s));
        a.setWizardButtons(false, false, true);
        a.finalNext();
      }
      if (e.ftrViewModelHandle) {
        e.ftrViewModelHandle.buttons.backButton.disabled(true);
        e.ftrViewModelHandle.buttons.nextButton.disabled(true);
      }
      if (self) {
        self.handleError(s);
      } else {
        $Utility.navigateTo(result.urls.baseDomain + options.urls.error + s);
      }
    },
    "handleActionButton" : function() {
      var self = this;
      var settings = self._viewContext.data || {};
      var command = settings.prefill || {};
      var result = settings.input || {};
      var data = {};
      var conid = self._options.optInEmailId;
      var options = (self._checkBoxBindings, global.HIPAMFE);
      if (!self._isSubmitting) {
        var items = result.memberName;
        if (items || (e.viewModelHandle.memberName && (e.viewModelHandle.memberName.notifySubscribers(), items = result.memberName), items)) {
          var filterItem = e.FieldHelper.getMemberNameType(items, options.domains);
          if ("function" == typeof e.viewModelHandle.shouldGoToPasswordPage && e.viewModelHandle.shouldGoToPasswordPage() && self.$.triggerHandler(EVENT_UNDO, {
            "actionName" : "password",
            "control" : self
          }), filterItem === options.memberNameType.Phone || filterItem === options.memberNameType.EASI && 0 !== options.easiVerifyInline && !parent.isMojangUpgrade || parent.isMojangUpgrade && options.viewContext.data.prefill && options.viewContext.data.prefill.memberName && (filterItem == options.memberNameType.EASI && items !== options.viewContext.data.prefill.memberName.EASI[0].email || filterItem == options.memberNameType.Live && items !== options.viewContext.data.prefill.memberName.Live[0].email)) {
            if (settings.reporting && settings.reporting.autoVerifyShown && (data.AutoVerify = true), !result.verification || A && !e.viewModelHandle.fedConfirmPageDesc) {
              if (!A || !settings.input.isMemberNameVerified) {
                return void self.$.triggerHandler(EVENT_UNDO, {
                  "actionName" : "verification",
                  "control" : self
                });
              }
              if (!e.viewModelHandle.fedConfirmPageDesc) {
                return void self.$.triggerHandler(EVENT_UNDO, {
                  "actionName" : "fedConfirm",
                  "control" : self
                });
              }
              data.MemberName = items;
            } else {
              if (settings.verificationCodeSlt) {
                data.VerificationCodeSlt = settings.verificationCodeSlt;
              }
              data.MemberName = items;
              data.VerificationCode = result.verification;
              if (result.autoVerify) {
                data.AutoVerifySuccess = result.autoVerify;
              }
            }
          } else {
            if (A && !e.viewModelHandle.fedConfirmPageDesc) {
              return void self.$.triggerHandler(EVENT_UNDO, {
                "actionName" : "fedConfirm",
                "control" : self
              });
            }
            data.MemberName = items;
          }
          if (A && (data.FedStateToken = parent.fedStateToken, (filterItem === options.memberNameType.EASI || filterItem === options.memberNameType.Phone) && (data.IsFedEasiEmailVerified = settings.input.isMemberNameVerified, data.IsFedNameVerified = settings.input.isMemberNameVerified)), data.CheckAvailStateMap = settings.checkAvailStateMap || [], data.EvictionWarningShown = settings.evictionWarningShown || [], data.UpgradeFlowToken = parent.upgradeFlowToken || {}, command && command.memberName) {
            var tablesongs = command.memberName.Live;
            var fields_to_add = command.memberName.Phone;
            var output_script_array = command.memberName.EASI;
            /** @type {boolean} */
            data.PrefillMemberNamePassed = true;
            data.PrefillDomain = options.prefillDomain;
            if (filterItem === options.memberNameType.Live) {
              if (tablesongs) {
                $.each(tablesongs, function(canCreateDiscussions, options) {
                  return options && options.email && items && items.indexOf(options.email) >= 0 ? (data.PrefillMemberNameUsed = true, false) : void 0;
                });
              }
            } else {
              if (filterItem === options.memberNameType.Phone) {
                if (fields_to_add) {
                  $.each(fields_to_add, function(canCreateDiscussions, options) {
                    return options && options.phoneNumber && items && items.indexOf(options.phoneNumber) >= 0 ? (data.PrefillMemberNameUsed = true, false) : void 0;
                  });
                }
              } else {
                if (filterItem === options.memberNameType.EASI && output_script_array) {
                  $.each(output_script_array, function(canCreateDiscussions, options) {
                    return options && options.email && items && items.indexOf(options.email) >= 0 ? (data.PrefillMemberNameUsed = true, false) : void 0;
                  });
                }
              }
            }
          }
          if (data.FirstName = result.firstName, data.LastName = result.lastName, settings.reporting && (data.MemberNameChangeCount = settings.reporting.memberNameChangeCount, data.MemberNameAvailableCount = settings.reporting.memberNameAvailableCount, data.MemberNameUnavailableCount = settings.reporting.memberNameUnavailableCount), 0 !== parent.pwdless && filterItem === options.memberNameType.Phone || 0 !== parent.pwdlessemail && filterItem === options.memberNameType.EASI || A || (data.CipherValue = 
          Encrypt("", "", offset, result.password), data.SKI = SKI || ""), 0 !== options.dobCheck ? (result.birthdate || 0 !== options.createWithCountry) && (data.BirthDate = result.birthdate, data.Country = result.country) : (data.BirthDate = result.birthdate, data.Country = result.country, data.PostalCode = result.postalCode, data.Gender = result.gender), filterItem === options.memberNameType.Phone && canViewMyFiles || (data.PhoneCountry = result.phoneCountry, data.PhoneNumber = result.phoneNumber, 
          data.AltEmail = filterItem === options.memberNameType.Live || courseSections ? result.alternateEmail : null), data.IsOptOutEmailDefault = 0 !== options.isOptOut, data.IsOptOutEmailShown = false, conid) {
            var $realtime = $("#" + conid, self._$container);
            if ($realtime && $realtime.length > 0) {
              /** @type {boolean} */
              self._viewContext.persistedOptOutEmailSelection = !$realtime.prop("checked") || self._viewContext.hideOptinCheckboxForChild === true;
            }
          }
          if ("undefined" !== self._viewContext.persistedOptOutEmailSelection) {
            /** @type {boolean} */
            data.IsOptOutEmailShown = self._viewContext.hideOptinCheckboxForChild !== true;
            data.IsOptOutEmail = self._viewContext.persistedOptOutEmailSelection;
          }
          /** @type {boolean} */
          data.LW = 0 !== options.lw;
          data.SiteId = settings.siteId;
          data.IsRDM = settings.isRdm;
          try {
            data.GWPC = window.external.SignString("bver=1");
          } catch (C) {
          }
          data.WReply = self._wreply;
          data.ReturnUrl = self._ru;
          data.SignupReturnUrl = self._signupRu;
          data.uiflvr = global.$Config.uiflvr;
          data.uaid = global.$Config.uaid;
          data.SuggestedAccountType = options.suggAccType;
          data.SuggestionType = options.suggType;
          if (options.DT) {
            data.DT = options.DT;
          }
          if (options.DFT) {
            data.DFT = options.DFT;
          }
          /** @type {string} */
          var hashString = global.location.hash;
          if (hashString) {
            /** @type {string} */
            hashString = hashString.replace("#", "");
            if (hashString && hashString.indexOf("errCode=") > -1) {
              /** @type {string} */
              data.TestErrorCode = hashString.replace("errCode=", "");
              /** @type {string} */
              global.location.hash = "#";
            }
          }
          if (res && res.fid) {
            data.HFId = res.fid;
          }
          if (res.enforcementRequired) {
            if (e.viewModelHandle.hipEnforcement) {
              /** @type {boolean} */
              self._isSubmitting = true;
              /** @type {string} */
              data.HType = gfill;
              data.HSol = req.sessionToken;
              data.HPId = req.pid;
              self._createAccount(data);
            } else {
              self.$.triggerHandler(EVENT_UNDO, {
                "actionName" : "hipEnforcement",
                "control" : self
              });
            }
          } else {
            if (options && options.done) {
              if (e.viewModelHandle.hip || options.fake) {
                data.HType = options.type;
                data.HFId = options.urlFid;
                data.HSId = options.urlId;
                options.verify(function(openReg, templateItems) {
                  if (options.clientValidation(), "" !== options.getError()) {
                    if ("sms" === options.type) {
                      return;
                    }
                    e.viewModelHandle.hip.valueHasMutated();
                  }
                  data.HId = templateItems;
                  /** @type {string} */
                  data.HSol = openReg;
                  self._createAccount(data);
                }, null);
              } else {
                self.$.triggerHandler(EVENT_UNDO, {
                  "actionName" : "hip",
                  "control" : self
                });
              }
            } else {
              if (res.required) {
                self.$.triggerHandler(EVENT_UNDO, {
                  "actionName" : "hip",
                  "control" : self
                });
              } else {
                /** @type {boolean} */
                self._isSubmitting = true;
                self._createAccount(data);
              }
            }
          }
        }
      }
    }
  }, {});
}(), function() {
  /**
   * @param {?} c
   * @param {?} f
   * @return {undefined}
   */
  function init(c, f) {
    var e = self.options.viewDefs[c];
    if (e) {
      var id = e.sectionId;
      var config = e.actions;
      /** @type {null} */
      var s = null;
      if (id) {
        if (steps[id]) {
          s = steps[id].clone();
        } else {
          s = $("#" + id, f);
          s.detach();
          steps[id] = s;
        }
      }
      if (!e.options.sectionId) {
        e.options.sectionId = id;
      }
      /** @type {null} */
      e.options.viewTemplate = s;
      var data = {
        "action" : id + "Action"
      };
      if (config.cancel) {
        /** @type {string} */
        data.cancel = id + "Cancel";
      }
      if (config.alternate) {
        /** @type {string} */
        data.alternate = id + "Alternate";
      }
      if (config.skip) {
        /** @type {string} */
        data.skip = "PhoneVerification";
      }
      if (config.tou) {
        /** @type {string} */
        data.tou = "tou";
      }
      if (config.privacy) {
        /** @type {string} */
        data.privacy = "privacy";
      }
      if (config.dataCollection) {
        /** @type {string} */
        data.dataCollection = "dataCollection";
      }
      if (config.dataUse) {
        /** @type {string} */
        data.dataUse = "dataUse";
      }
      if (config.retention) {
        /** @type {string} */
        data.retention = "retention";
      }
      if (config.localAccount) {
        /** @type {string} */
        data.localAccount = "LocalAccount";
      }
      if (config.hip) {
        /** @type {string} */
        data.hip = "hip";
      }
      if (config.learnMore) {
        /** @type {string} */
        data.learnMore = "learnMore";
      }
      e.options.buttons = data;
    }
  }
  /**
   * @return {undefined}
   */
  function matchProximity() {
    if (account.SignupTemplates && self.useTemplate) {
      $.each(account.SignupTemplates, function(domRootID, t) {
        $("#" + domRootID).append(t);
      });
      $("#maincontent").removeAttr("role");
    }
    var last = $("#signupTemplates");
    var props = self.options.states;
    var i;
    for (i in props) {
      init(props[i], last);
    }
  }
  /**
   * @param {?} gl
   * @param {?} e
   * @param {?} d
   * @param {string} type
   * @return {?}
   */
  function display(gl, e, d, type) {
    if (e === i) {
      if ($ReportEvent.Fire("Signup_FinalBack_UserAction"), self.finalBackUrl) {
        if (state.isWin10InclusiveOOBE && item) {
          item.handleBackButton(function() {
            $Utility.navigateTo(self.finalBackUrl);
          });
        } else {
          self.options.viewDefs[i].url = self.finalBackUrl;
        }
      } else {
        if (b) {
          return b.finalBack(), null;
        }
      }
    } else {
      if ("cxhLocalAccount" === e) {
        return item.loadIdentityProvider(self.localAccountProvider), null;
      }
      if ("cxhCancel" === e) {
        return item.finish(config.Cancel), null;
      }
    }
    return "cancel" == type ? (t(e, n), e) : (g(e, n), e);
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function next(e) {
    if (state.isXbox) {
      e = e || {};
      var LiveDetectWindowSize = e.props || {};
      var dmReady = e.control || {};
      if (WIZARDUI && WIZARDUI.ready) {
        if (dmReady.isControlReady) {
          dmReady.isReady().then(function() {
            WIZARDUI.ready(LiveDetectWindowSize);
          });
        } else {
          WIZARDUI.ready(LiveDetectWindowSize);
        }
      }
    }
    if (data) {
      data.$.triggerHandler("onControlVisible", {
        "control" : e.control
      });
    }
  }
  /**
   * @param {?} klass
   * @param {string} data
   * @return {undefined}
   */
  function update(klass, data) {
    var name = data && data.state;
    var vizCanvas = self.options.viewDefs[name].options.callbacks || {};
    var _err = vizCanvas.context || {};
    next(_err);
  }
  /**
   * @param {?} e
   * @param {string} value
   * @return {undefined}
   */
  function t(e, value) {
    if (null != e && "undefined" != typeof e && progt[e]) {
      var a = progt[e].userAction;
      if (a) {
        if (!$.isArray(a)) {
          /** @type {!Array} */
          a = new Array(a);
        }
        if (-1 === a.indexOf(value)) {
          a.push(value);
        }
      } else {
        /** @type {string} */
        a = value;
      }
      progt[e].userAction = a;
    }
  }
  /**
   * @param {?} e
   * @param {string} i
   * @return {undefined}
   */
  function g(e, i) {
    if (null != e && "undefined" != typeof e && progt[e]) {
      var t = progt[e].userAction;
      if (t) {
        if (t === i) {
          /** @type {string} */
          t = "";
        } else {
          var p = t.indexOf(i);
          if (-1 !== p) {
            t.splice(p, 1);
          }
        }
        progt[e].userAction = t;
      }
    }
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function load(value) {
    var logInDeferred = new $.Deferred;
    if (value) {
      var data = {
        "phone" : value
      };
      root.Json(null, $Utility.generateUrl(state.urls.baseDomain, self.urls.dataRequest.getPhoneNumberDetails, true), data, function(reject) {
        logInDeferred.resolve(reject);
      }, function() {
        logInDeferred.reject();
      });
    } else {
      logInDeferred.reject();
    }
    return logInDeferred.promise();
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function fn(e) {
    var panel = e.data = e.data || {};
    var d = panel.prefill = panel.prefill || {};
    var library = panel.input = panel.input || {};
    var k;
    for (k in e.keyToStateMap) {
      var a = result[k].clientPrefillKey;
      if (!d[k] && a && b) {
        var data = b.getProperty(a);
        if (data) {
          if (k === result.phoneNumber.name) {
            load([data]).done(function(feature) {
              if (feature && feature.phoneDetails && feature.phoneDetails.length > 0) {
                d[result.phoneCountry.name] = feature.phoneDetails[0].country;
                d[result.phoneNumber.name] = feature.phoneDetails[0].phoneNumber;
              }
            });
          } else {
            if (k === result.memberName.name) {
              try {
                var l = $.parseJSON(data);
                /** @type {!Array} */
                var _watchableTools = [];
                /** @type {!Array} */
                var importTranslations = [];
                /** @type {!Array} */
                var up = [];
                if (!$.isArray(l)) {
                  /** @type {!Array} */
                  l = [l];
                }
                $.each(l, function(canCreateDiscussions, t) {
                  var v = account.FieldHelper.getMemberNameType(t, self.domains, null);
                  var node = self.memberNameType;
                  if (v === node.Phone) {
                    up.push(t);
                  } else {
                    if (v === node.EASI) {
                      _watchableTools.push(t);
                    } else {
                      if (v === node.Live) {
                        importTranslations.push(t);
                      }
                    }
                  }
                });
                d[k] = {
                  "EASI" : _watchableTools,
                  "Live" : importTranslations
                };
                if (null != up && up.length > 0) {
                  load(up).done(function(context) {
                    if (context && context.phoneDetails) {
                      d[k][self.memberNameType.Phone] = context.phoneDetails;
                    }
                  });
                }
              } catch (p) {
                /** @type {string} */
                data = "";
              }
              d[k] = data;
            } else {
              d[k] = data;
            }
          }
        }
      }
    }
    var b = d[result.country.name];
    if (b) {
      d[result.country.name] = b.toUpperCase();
    }
    for (k in e.keyToStateMap) {
      if (k !== result.memberName.name) {
        library[k] = d[k];
      }
    }
  }
  /**
   * @param {?} event
   * @return {undefined}
   */
  function call(event) {
    var uploadOptions = self.options;
    var points = uploadOptions.viewDefs || {};
    event.keyToStateMap = {};
    var i;
    for (i in points) {
      if (points.hasOwnProperty(i)) {
        var point = points[i];
        if (point && point.options && point.options.viewModelOptions && point.options.viewModelOptions.observables) {
          var observables = point.options.viewModelOptions.observables;
          $.each(observables, function(canCreateDiscussions, m) {
            if (assert(i)) {
              event.keyToStateMap[m] = i;
            }
          });
        }
      }
    }
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function assert(name) {
    if (currentaddress.isMembernamePasswordProfilePage()) {
      switch(name) {
        case variable_name:
        case key:
        case WEBGL_compressed_texture_s3tc:
        case supported_report_set:
        case displayname:
        case normalPosition:
          return false;
      }
    } else {
      if (currentaddress.isPasswordProfilePage()) {
        switch(name) {
          case key:
          case WEBGL_compressed_texture_s3tc:
          case supported_report_set:
          case displayname:
          case calendar_color:
            return false;
        }
      } else {
        switch(name) {
          case calendar_color:
          case normalPosition:
            return false;
        }
      }
    }
    return true;
  }
  /**
   * @return {undefined}
   */
  function reformatSelection() {
    if (0 !== self.lw) {
      self.phoneCountryListJson = {
        "list" : []
      };
      self.phoneCountryListJson["default"] = self.defaultCountry;
      $.each(self.countryList, function(canCreateDiscussions, result) {
        if (result.code) {
          /** @type {string} */
          result.displayValue = self.showParens ? result.name + " \u00e2\u20ac\u008f(\u00e2\u20ac\u017d+" + result.code + ")" : result.name + " +" + result.code;
          self.phoneCountryListJson.list.push(result);
        }
      });
    }
  }
  /** @type {!Window} */
  var global = window;
  var node = global.wLive;
  var $ = global.jQuery;
  var account = node.Account;
  var data = account.PageEvents;
  var igv = account.Controls;
  var currentaddress = account.SignupHelper;
  var root = global.$DataRequest;
  /** @type {null} */
  var b = null;
  var y = account.Util && account.Util.HighContrast;
  var state = global.$Config.WLXAccount;
  var self = state.signup;
  var progt = self.options.viewDefs;
  var options = self.page;
  var result = self.signupObservableSets;
  var item = global.MSA && global.MSA.CXH;
  var config = item && item.FinishStates;
  var steps = {};
  /** @type {string} */
  var i = "finalBack";
  var T = account && account.Util && account.Util.ConvergedUxUtil;
  /** @type {string} */
  var normalPosition = "passwordProfilePage";
  /** @type {string} */
  var calendar_color = "memberNamePasswordProfilePage";
  /** @type {string} */
  var variable_name = "credentials";
  /** @type {string} */
  var key = "password";
  /** @type {string} */
  var WEBGL_compressed_texture_s3tc = "profileAccrual";
  /** @type {string} */
  var supported_report_set = "birthDateCountryAccrual";
  /** @type {string} */
  var displayname = "fedConfirm";
  $Do.when("ExternalHelper", 0, function() {
    b = global.ExternalHelper;
  });
  /** @type {string} */
  var n = "Action_Back";
  if (!global.OnBack) {
    /**
     * @return {undefined}
     */
    global.OnBack = function() {
      if (data) {
        data.$.triggerHandler(data.back);
      }
    };
  }
  if (!global.OnNext) {
    /**
     * @return {undefined}
     */
    global.OnNext = function() {
      if (data) {
        data.$.triggerHandler(data.next);
      }
    };
  }
  defineNamespace("wLive.Account.Page", {
    "Signup" : function() {
      /**
       * @param {!Object} section
       * @return {undefined}
       */
      function loadDisqusCounter(section) {
        /** @type {!Element} */
        var script = document.createElement("script");
        if (script.type = "text/javascript", script.src = options.behavioralTelemetryUrl, section.appendChild(script), 0 !== global.$Config.btReportingOn) {
          /** @type {number} */
          var chat_retry = setInterval(function() {
            if ("undefined" != typeof UserTracker) {
              clearInterval(chat_retry);
              $ReportEvent.Fire("Signup_BT_UserAction");
            }
          }, 500);
        }
      }
      self.strings = self.strings || {};
      self.page = self.page || {};
      self.regex = self.regex || {};
      $.extend(true, self.strings, global.$Config.sharedStrings);
      $.extend(true, self.page, global.$Config.sharedPageConfig);
      $.extend(true, self.regex, self.regularexpressions);
      $.extend(true, self.strings, self.overrideStrings || {});
      matchProximity();
      var test = self.viewContext = self.viewContext || {};
      test.data = test.data || {};
      test.data.reporting = test.data.reporting || {};
      test.data.reporting.memberNameChangeCount = test.data.reporting.memberNameChangeCount || 0;
      test.data.reporting.memberNameAvailableCount = test.data.reporting.memberNameAvailableCount || 0;
      test.data.reporting.memberNameUnavailableCount = test.data.reporting.memberNameUnavailableCount || 0;
      reformatSelection();
      call(test);
      fn(test);
      var head = $("#maincontent")[0];
      if (T) {
        var r = T.getArrowImage();
        var item = {
          "strings" : self.strings,
          "config" : options,
          "memberName" : ko.observable(),
          "isBackButtonVisible" : ko.observable(true),
          "arrowImg" : r,
          "showIdentityBanner" : ko.observable(false),
          "progressText" : ko.observable(),
          "stepCounter" : ko.observable(),
          "totalSteps" : ko.observable(),
          "progressDots" : ko.observableArray()
        };
        ko.applyBindings(item, head);
      }
      var s = new igv.FlowController($("#pageControlHost"), test, self.options);
      if (s.setStateChangeFunc(display), s.$.on(s.events.controlVisible, update), s.show(self.startState), options && head) {
        if (options.backgroundColor && $(".background").css("backgroundColor", options.backgroundColor), options.imgs && options.logoTypeHtml) {
          var subtitles_selector = $("#ftrLogo");
          subtitles_selector.html(y.getHighContrastImage(options.logoTypeHtml.format(options.imgs.baseUrl, "White", 0 !== options.useSvg ? "svg" : "png"), {
            "forWhiteBackground" : options.logoTypeHtml.format(options.imgs.baseUrl, "Gray", 0 !== options.useSvg ? "svg" : "png")
          }));
        }
        if (options.behavioralTelemetryUrl) {
          $Do.when("doc.load", function() {
            global.setTimeout(function() {
              loadDisqusCounter(head);
            }, 750);
          });
        }
      }
      if (state.isWin10InclusiveOOBE && item && !self.getDeviceTicket) {
        item.speakAsync(self.strings.cortana);
        item.showBackButton(true);
      }
    }
  });
  $Do.register("Account.Page.Signup");
}();

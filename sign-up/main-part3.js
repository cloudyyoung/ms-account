'use strict';
!function() {
  /** @type {!Window} */
  var inheritedObject = window;
  var self = inheritedObject.$Debug = inheritedObject.$Debug || {};
  if (!self.appendLog) {
    /** @type {!Array} */
    var logs = [];
    /** @type {number} */
    var mySecret = 0;
    /**
     * @param {string} msg
     * @return {undefined}
     */
    self.appendLog = function(msg) {
      var o = inheritedObject.$Config || {};
      var i = o.maxDebugLog || 25;
      /** @type {string} */
      var message = (new Date).toUTCString() + ":" + msg;
      logs.push(mySecret + ":" + message);
      if (logs.length > i) {
        logs.shift();
      }
      mySecret++;
    };
    /**
     * @return {?}
     */
    self.getLogs = function() {
      return logs;
    };
  }
}(), function() {
  /**
   * @param {string} data
   * @param {!Function} callback
   * @return {undefined}
   */
  function then(data, callback) {
    /**
     * @param {number} id
     * @return {?}
     */
    function update(id) {
      var i = data[id];
      return tldCount - 1 > id ? void(self.r[i] ? update(id + 1) : self.when(i, function() {
        update(id + 1);
      })) : void callback(i);
    }
    var tldCount = data.length;
    update(0);
  }
  /**
   * @param {string} i
   * @param {!Function} m
   * @param {!Object} a
   * @return {?}
   */
  function callback(i, m, a) {
    /**
     * @return {?}
     */
    function fn() {
      /** @type {boolean} */
      var req = !!ret.method;
      var source = req ? ret.method : a[0];
      var keys = ret.extraArgs || [];
      var executionSchema = d.$WebWatson;
      try {
        var c = n(a, !req);
        if (keys && keys.length > 0) {
          var l = keys.length;
          /** @type {number} */
          var i = 0;
          for (; l > i; i++) {
            c.push(keys[i]);
          }
        }
        source.apply(m, c);
      } catch (sandboxSchema) {
        return void(executionSchema && executionSchema.submitFromException && executionSchema.submitFromException(sandboxSchema));
      }
    }
    var ret = self.r && self.r[i];
    return m = m ? m : this, ret && (ret.skipTimeout ? fn() : d.setTimeout(fn, 0)), ret;
  }
  /**
   * @param {!Object} a
   * @param {boolean} b
   * @return {?}
   */
  function n(a, b) {
    return Array.prototype.slice.call(a, b ? 1 : 0);
  }
  /** @type {!Window} */
  var d = window;
  if (!d.$Do) {
    d.$Do = {
      "q" : [],
      "r" : [],
      "removeItems" : [],
      "lock" : 0,
      "o" : []
    };
  }
  var self = d.$Do;
  /**
   * @param {string} data
   * @param {string} t
   * @return {undefined}
   */
  self.when = function(data, t) {
    /**
     * @param {string} val
     * @return {undefined}
     */
    function callback(val) {
      if (!callback(val, i, args)) {
        self.q.push({
          "id" : val,
          "c" : i,
          "a" : args
        });
      }
    }
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var args = [];
    /** @type {number} */
    var staticCount = 1;
    /** @type {boolean} */
    var cb = "function" == typeof t;
    if (!cb) {
      /** @type {string} */
      i = t;
      /** @type {number} */
      staticCount = 2;
    }
    /** @type {number} */
    var index = staticCount;
    for (; index < arguments.length; index++) {
      args.push(arguments[index]);
    }
    if (data instanceof Array) {
      then(data, callback);
    } else {
      callback(data);
    }
  };
  /**
   * @param {string} index
   * @param {!Function} type
   * @param {boolean} a
   * @return {undefined}
   */
  self.register = function(index, type, a) {
    if (!self.r[index]) {
      self.o.push(index);
      var ret = {};
      if (type && (ret.method = type), a && (ret.skipTimeout = a), arguments && arguments.length > 3) {
        /** @type {!Array} */
        ret.extraArgs = [];
        /** @type {number} */
        var i = 3;
        for (; i < arguments.length; i++) {
          ret.extraArgs.push(arguments[i]);
        }
      }
      self.r[index] = ret;
      self.lock++;
      try {
        /** @type {number} */
        var i = 0;
        for (; i < self.q.length; i++) {
          var row = self.q[i];
          if (row.id == index && callback(index, row.c, row.a)) {
            self.removeItems.push(row);
          }
        }
      } catch (c) {
        throw c;
      } finally {
        if (self.lock--, 0 === self.lock) {
          /** @type {number} */
          var column = 0;
          for (; column < self.removeItems.length; column++) {
            var header = self.removeItems[column];
            /** @type {number} */
            var i = 0;
            for (; i < self.q.length; i++) {
              if (self.q[i] === header) {
                self.q.splice(i, 1);
                break;
              }
            }
          }
          /** @type {!Array} */
          self.removeItems = [];
        }
      }
    }
  };
  /**
   * @param {?} name
   * @return {undefined}
   */
  self.unregister = function(name) {
    if (self.r[name]) {
      delete self.r[name];
    }
  };
}(), function() {
  /**
   * @return {?}
   */
  function map() {
    return context.$Config || context.ServerData || {};
  }
  /**
   * @param {string} msg
   * @param {!Object} obj
   * @return {undefined}
   */
  function done(msg, obj) {
    var options = context.$Debug;
    if (options && options.appendLog) {
      if (obj) {
        /** @type {string} */
        msg = msg + (" '" + (obj.src || obj.href || "") + "'");
        /** @type {string} */
        msg = msg + (", id:" + (obj.id || ""));
        /** @type {string} */
        msg = msg + (", async:" + (obj.async || ""));
        /** @type {string} */
        msg = msg + (", defer:" + (obj.defer || ""));
      }
      options.appendLog(msg);
    }
  }
  /**
   * @return {?}
   */
  function detectIE() {
    var env = context.$B;
    if (void 0 === version) {
      if (env) {
        version = env.IE;
      } else {
        /** @type {string} */
        var ua = context.navigator.userAgent;
        /** @type {boolean} */
        version = -1 !== ua.indexOf("MSIE ") || -1 !== ua.indexOf("Trident/");
      }
    }
    return version;
  }
  /**
   * @param {string} string
   * @return {?}
   */
  function lookup(string) {
    var width = string.indexOf("?");
    var n = width > -1 ? width : string.length;
    return n > i && string.substr(n - i, i).toLowerCase() === number;
  }
  /**
   * @return {?}
   */
  function jQuery() {
    var t = map();
    var text = t.loader || {};
    return text.slReportFailure || t.slReportFailure || false;
  }
  /**
   * @return {?}
   */
  function callback() {
    var tree = map();
    var n = tree.loader || {};
    return n.redirectToErrorPageOnLoadFailure || false;
  }
  /**
   * @return {?}
   */
  function getMessageContainers_QW() {
    var tree = map();
    var n = tree.loader || {};
    return n.logByThrowing || false;
  }
  /**
   * @param {!Object} node
   * @return {?}
   */
  function poll(node) {
    /** @type {boolean} */
    var result = true;
    var html = node.src || node.href || "";
    if (html) {
      if (lookup(html)) {
        try {
          if (node.sheet && node.sheet.cssRules && !node.sheet.cssRules.length) {
            /** @type {boolean} */
            result = false;
          }
        } catch (o) {
        }
      }
    } else {
      /** @type {boolean} */
      result = false;
    }
    return result;
  }
  /**
   * @return {undefined}
   */
  function test() {
    /**
     * @param {?} src
     * @return {undefined}
     */
    function dpAddStylesheet(src) {
      var script_ele = document.getElementsByTagName("head")[0];
      script_ele.appendChild(src);
    }
    /**
     * @param {string} url
     * @param {string} s
     * @param {boolean} target
     * @param {string} data
     * @return {?}
     */
    function callback(url, s, target, data) {
      /** @type {null} */
      var link = null;
      return link = lookup(url) ? _loadCss(url) : "script" === data.toLowerCase() ? injectScript(url) : fcn(url, data), s && (link.id = s), "function" == typeof link.setAttribute && (link.setAttribute("crossorigin", "anonymous"), target && "string" == typeof target && link.setAttribute("integrity", target)), link;
    }
    /**
     * @param {string} url
     * @return {?}
     */
    function _loadCss(url) {
      var cssLink = document.createElement("link");
      return cssLink.rel = "stylesheet", cssLink.type = "text/css", cssLink.href = url, cssLink;
    }
    /**
     * @param {string} url
     * @return {?}
     */
    function injectScript(url) {
      var script = document.createElement("script");
      return script.type = "text/javascript", script.src = url, script.defer = false, script.async = false, script;
    }
    /**
     * @param {string} source
     * @param {string} value
     * @return {?}
     */
    function fcn(source, value) {
      var result = document.createElement(value);
      return result.src = source, result;
    }
    /**
     * @param {string} out
     * @return {?}
     */
    function normalize(out) {
      if (!(lines && lines.length > 1)) {
        return out;
      }
      /** @type {number} */
      var i = 0;
      for (; i < lines.length; i++) {
        if (0 === out.indexOf(lines[i])) {
          return lines[i + 1 < lines.length ? i + 1 : 0] + out.substring(lines[i].length);
        }
      }
      return out;
    }
    /**
     * @param {number} name
     * @param {!Object} args
     * @param {!Function} next
     * @param {!Object} callback
     * @return {?}
     */
    function resolve(name, args, next, callback) {
      return done("[$Loader]: " + (context.failMessage || "Failed"), callback), results[name].retry < h ? (results[name].retry++, fn(name, args, next), void test._ReportFailure(results[name].retry, results[name].srcPath)) : void(next && next());
    }
    /**
     * @param {number} i
     * @param {!Object} value
     * @param {!Function} name
     * @param {!Object} callback
     * @return {undefined}
     */
    function render(i, value, name, callback) {
      if (poll(callback)) {
        done("[$Loader]: " + (context.successMessage || "Loaded"), callback);
        fn(i + 1, value, name);
        var t = results[i].onSuccess;
        if ("function" == typeof t) {
          t(results[i].srcPath);
        }
      } else {
        resolve(i, value, name, callback);
      }
    }
    /**
     * @param {number} i
     * @param {!Object} value
     * @param {!Function} callback
     * @return {?}
     */
    function fn(i, value, callback) {
      if (i < results.length) {
        var res = results[i];
        if (!res || !res.srcPath) {
          return void fn(i + 1, value, callback);
        }
        if (res.retry > 0) {
          res.srcPath = normalize(res.srcPath);
          if (!res.origId) {
            res.origId = res.id;
          }
          /** @type {string} */
          res.id = res.origId + "_Retry_" + res.retry;
        }
        var script = callback(res.srcPath, res.id, res.integrity, res.tagName);
        /**
         * @return {undefined}
         */
        script.onload = function() {
          render(i, value, callback, script);
        };
        /**
         * @return {undefined}
         */
        script.onerror = function() {
          resolve(i, value, callback, script);
        };
        /**
         * @return {undefined}
         */
        script.onreadystatechange = function() {
          if ("loaded" === script.readyState) {
            setTimeout(function() {
              render(i, value, callback, script);
            }, 500);
          } else {
            if ("complete" === script.readyState) {
              render(i, value, callback, script);
            }
          }
        };
        dpAddStylesheet(script);
        done("[$Loader]: Loading '" + (res.srcPath || "") + "', id:" + (res.id || ""));
      } else {
        if (value) {
          value();
        }
      }
    }
    var tree = map();
    var h = tree.slMaxRetry || 2;
    var y = tree.loader || {};
    var lines = y.cdnRoots || [];
    var context = this;
    /** @type {!Array} */
    var results = [];
    /** @type {boolean} */
    context.retryOnError = true;
    /** @type {string} */
    context.successMessage = "Loaded";
    /** @type {string} */
    context.failMessage = "Error";
    /**
     * @param {string} src
     * @param {string} x
     * @param {?} socket
     * @param {number} object
     * @param {string} tag
     * @param {!Object} action
     * @return {undefined}
     */
    context.Add = function(src, x, socket, object, tag, action) {
      if (src) {
        results.push({
          "srcPath" : src,
          "id" : x,
          "retry" : object || 0,
          "integrity" : socket,
          "tagName" : tag || "script",
          "onSuccess" : action
        });
      }
    };
    /**
     * @param {!Element} data
     * @param {!Object} x
     * @return {undefined}
     */
    context.AddForReload = function(data, x) {
      var item = data.src || data.href || "";
      context.Add(item, "AddForReload", data.integrity, 1, data.tagName, x);
    };
    /**
     * @param {?} cond
     * @param {string} t
     * @param {string} pivot
     * @return {undefined}
     */
    context.AddIf = function(cond, t, pivot) {
      if (cond) {
        context.Add(t, pivot);
      }
    };
    /**
     * @param {!Object} e
     * @param {!Function} callback
     * @return {undefined}
     */
    context.Load = function(e, callback) {
      fn(0, e, callback);
    };
  }
  var version;
  /** @type {!Window} */
  var context = window;
  var document = context.document;
  /** @type {string} */
  var number = ".css";
  /** @type {number} */
  var i = number.length;
  /**
   * @param {undefined} err
   * @param {?} i
   * @param {!Object} doc
   * @return {undefined}
   */
  test.On = function(err, i, doc) {
    if (!err) {
      throw "The target element must be provided and cannot be null.";
    }
    if (i) {
      test.OnError(err, doc);
    } else {
      test.OnSuccess(err, doc);
    }
  };
  /**
   * @param {!Element} options
   * @param {!Object} response
   * @return {undefined}
   */
  test.OnSuccess = function(options, response) {
    var getdate = options.src || options.href || "";
    var answersContainer = jQuery();
    var composition = callback();
    if (!options) {
      throw "The target element must be provided and cannot be null.";
    }
    if (poll(options)) {
      done("[$Loader]: Loaded", options);
      var self = new test;
      /** @type {string} */
      self.failMessage = "Reload Failed";
      /** @type {string} */
      self.successMessage = "Reload Success";
      self.Load(null, function() {
        if (answersContainer) {
          throw "Unexpected state. ResourceLoader.Load() failed despite initial load success. ['" + getdate + "']";
        }
        if (composition) {
          /** @type {string} */
          document.location.href = "/error.aspx?err=504";
        }
      });
    } else {
      test.OnError(options, response);
    }
  };
  /**
   * @param {!Element} data
   * @param {!Object} response
   * @return {undefined}
   */
  test.OnError = function(data, response) {
    var doc = data.src || data.href || "";
    var answersContainer = jQuery();
    var composition = callback();
    if (!data) {
      throw "The target element must be provided and cannot be null.";
    }
    done("[$Loader]: Failed", data);
    var self = new test;
    /** @type {string} */
    self.failMessage = "Reload Failed";
    /** @type {string} */
    self.successMessage = "Reload Success";
    self.AddForReload(data, response);
    self.Load(null, function() {
      if (answersContainer) {
        throw "Failed to load external resource ['" + doc + "']";
      }
      if (composition) {
        /** @type {string} */
        document.location.href = "/error.aspx?err=504";
      }
    });
    test._ReportFailure(0, doc);
  };
  /**
   * @param {number} context
   * @param {string} xmldoc
   * @return {undefined}
   */
  test._ReportFailure = function(context, xmldoc) {
    if (getMessageContainers_QW() && !detectIE()) {
      throw "[Retry " + context + "] Failed to load external resource ['" + xmldoc + "'], reloading from fallback CDN endpoint";
    }
  };
  /** @type {function(): undefined} */
  context.$Loader = test;
}(), function(global, doc) {
  /**
   * @return {?}
   */
  function next() {
    if (!u) {
      if (!doc.body) {
        return void setTimeout(next);
      }
      /** @type {boolean} */
      u = true;
      global.$Do.register("doc.ready", 0, true);
    }
  }
  /**
   * @return {?}
   */
  function handler() {
    if (!s) {
      if (!doc.body) {
        return void setTimeout(handler);
      }
      next();
      /** @type {boolean} */
      s = true;
      global.$Do.register("doc.load", 0, true);
      detach();
    }
  }
  /**
   * @param {!Object} custom
   * @return {undefined}
   */
  function loaded(custom) {
    if (doc.addEventListener || "load" === custom.type || "complete" === doc.readyState) {
      next();
    }
  }
  /**
   * @return {undefined}
   */
  function bindReady() {
    if (doc.addEventListener) {
      doc.addEventListener("DOMContentLoaded", loaded, false);
      global.addEventListener("load", handler, false);
    } else {
      if (doc.attachEvent) {
        doc.attachEvent("onreadystatechange", loaded);
        global.attachEvent("onload", handler);
      }
    }
  }
  /**
   * @return {undefined}
   */
  function detach() {
    if (doc.addEventListener) {
      doc.removeEventListener("DOMContentLoaded", loaded, false);
      global.removeEventListener("load", handler, false);
    } else {
      if (doc.attachEvent) {
        doc.detachEvent("onreadystatechange", loaded);
        global.detachEvent("onload", handler);
      }
    }
  }
  /** @type {boolean} */
  var u = false;
  /** @type {boolean} */
  var s = false;
  return "complete" === doc.readyState ? void setTimeout(handler) : void bindReady();
}(window, document);


// function () {
//     function e() {
//         E || (b.when("$WebWatson.init", function () {
//             if (y && y.enabled) {
//                 var e = new h.$Loader;
//                 e.AddIf(!h.jQuery, y.sbundle, "WebWatson_DemandSupport"), y.sbundle = null, delete y.sbundle; var r = h.wLive && h.wLive.Core && h.wLive.Core.DataRequest; e.AddIf(!r, y.fbundle, "WebWatson_DemandFramework"), y.fbundle = null, delete y.fbundle, e.Add(y.bundle, "WebWatson_DemandLoaded"), y.bundle = null, delete y.bundle, e.Load(t, n)
//             }
//         }), E = !0)
//     } function t() { if (h.$WebWatson) { if (h.$WebWatson.isProxy) { return void n() } b.when("$WebWatson.full", function () { for (; w.length > 0;) { var e = w.shift(); e && h.$WebWatson[e.cmdName].apply(h.$WebWatson, e.args) } }) } } function n() {
//         var e = h.$WebWatson ? h.$WebWatson.isProxy : !0;
//         if (e) {
//             if (!$ && JSON) { var t = "/handlers/Watson"; y && y.url && (t = y.url); try { for (var n = -1, o = 0; o < w.length; o++) { if ("submit" === w[o].cmdName) { n = o; break } } var a = w[n] ? w[n].args || [] : [], i = { "sr": y.sr, "ec": "Failed to load external resource [Core Watson files]", "wec": 55, "idx": 1, "pn": $Config.pgid || "", "sc": $Config.scid || 0, "hpg": $Config.hpgid || 0, "msg": "Failed to load external resource [Core Watson files]", "url": a[1] || "", "ln": 0, "ad": 0, "an": !1, "cs": "", "sd": $Config.serverDetails, "ls": null, "diag": g(y) }; $Api.Json(t, i) } catch (u) { } $ = !0 } y.loadErrorUrl && window.location.assign(y.loadErrorUrl)
//         } r(), y && y.loadErrorUrl && e && window.location.assign(y.loadErrorUrl)
//     } function r() { var e = h.$WebWatson; w = [], h.$WebWatson = null, h.$Debug && h.$Debug.appendLog && h.$Debug.appendLog("[WebWatson]: unregistering"), e.errorHooked && e._orgErrorHandler && (h.onerror = e._orgErrorHandler) } function o(t) { return function () { var n = arguments; w.push({ "cmdName": t, "args": n }), e() } } function a() {
//         var e = ["foundException", "resetException", "submit", "submitFromException", "showError", "reportException"], t = this; t.isProxy = !0; for (var n = e.length, r = 0; n > r; r++) {
//             var a = e[r];
//             a && (t[a] = o(a))
//         }
//     } function i(e, t, n, r, o, a, i, u, s) { var c = h.event; a || (a = f(o || c, i ? i + 2 : 2)), h.$Debug && h.$Debug.appendLog && h.$Debug.appendLog("[WebWatson]:" + (e || "") + " in " + (t || "") + " @ " + (n || "??")), T.submit(e, t, n, r, o || c, a, i, u, s) } function u(e, t) { return { "signature": e, "args": t, "toString": function () { return this.signature } } } function s(e) { for (var t = [], n = e.split("\n"), r = 0; r < n.length; r++) { t.push(u(n[r], [])) } return t } function c(e) {
//         for (var t = [], n = e.split("\n"), r = 0; r < n.length; r++) {
//             var o = u(n[r], []); n[r + 1] && (o.signature += "@" + n[r + 1], r++), t.push(o)
//         } return t
//     } function l(e) { if (!e) { return null } try { if (e.stack) { return s(e.stack) } if (e.error) { if (e.error.stack) { return s(e.error.stack) } } else { if (window.opera && e.message) { return c(e.message) } } } catch (t) { } return null } function f(e, t) {
//         var n = []; try { for (var r = arguments.callee; t > 0;) { r = r ? r.caller : r, t-- } for (var o = 0; r && x > o;) { var a = "InvalidMethod()"; try { a = r.toString() } catch (i) { } var s = [], c = r.args || r.arguments; if (c) { for (var f = 0; f < c.length; f++) { s[f] = c[f] } } n.push(u(a, s)), r = r.caller, o++ } } catch (i) { n.push(u(i.toString(), [])) } var d = l(e);
//         return d && (n.push(u("--- Error Event Stack -----------------", [])), n = n.concat(d)), n
//     } function d(e) { if (e) { try { var t = /function (.{1,})\(/, n = t.exec(e.constructor.toString()); return n && n.length > 1 ? n[1] : "" } catch (r) { } } return "" } function p(e) { if (e) { try { if ("string" != typeof e && JSON && JSON.stringify) { var t = d(e), n = JSON.stringify(e); return n && "{}" !== n || (e.error && (e = e.error, t = d(e)), n = JSON.stringify(e), n && "{}" !== n || (n = e.toString())), t + ":" + n } } catch (r) { } } return "" + (e || "") } function g(e) {
//         var t = []; try {
//             if (jQuery ? (t.push("jQuery v:" + jQuery().jquery), t.push(jQuery.easing ? "jQuery.easing:" + JSON.stringify(jQuery.easing) : "jQuery.easing is not defined")) : t.push("jQuery is not defined"), e && e.expectedVersion && t.push("Expected jQuery v:" + e.expectedVersion), b) {
//                 var n, r = "";
//                 for (n = 0; n < b.o.length; n++) { r += b.o[n] + ";" } for (t.push("$Do.o[" + r + "]"), r = "", n = 0; n < b.q.length; n++) { r += b.q[n].id + ";" } t.push("$Do.q[" + r + "]")
//             } if (h.$Debug && h.$Debug.getLogs) { var o = h.$Debug.getLogs(); o && o.length > 0 && (t = t.concat(o)) } if (w) { for (var a = 0; a < w.length; a++) { var i = w[a]; if (i && "submit" === i.cmdName) { try { if (JSON && JSON.stringify) { var u = JSON.stringify(i); u && t.push(u) } } catch (s) { t.push(p(s)) } } } }
//         } catch (c) { t.push(p(c)) } return t
//     } function v(e) {
//         if (!m) {
//             if (m = !0, y = e || {}, !y || !y.enabled) { return void r() } h.$WebWatson._config = y, b.register("$WebWatson.init", 0, !0)
//         }
//     } var h = window, m = (h.document, !1), y = null, b = h.$Do; if (!h.$WebWatson) { var w = [], E = !1, $ = !1, x = 10, T = h.$WebWatson = new a; T.CB = {}, T._orgErrorHandler = h.onerror, h.onerror = i, T.errorHooked = !0, b.when("jQuery.version", function (e) { b.when("$WebWatson.init", function () { y.expectedVersion = e }) }), h.$Config && h.$Config.watson ? v(h.$Config.watson) : b.when("$Config", function () { v(h.$Config.watson) }), b.register("$WebWatson") }
// }(),




"object" != typeof JSON && (JSON = {}), function() {
  /**
   * @param {number} m
   * @return {?}
   */
  function f$jscomp$1(m) {
    return 10 > m ? "0" + m : m;
  }
  /**
   * @return {?}
   */
  function this_value$jscomp$0() {
    return this.valueOf();
  }
  /**
   * @param {string} string
   * @return {?}
   */
  function quote$jscomp$0(string) {
    return rx_escapable$jscomp$0.lastIndex = 0, rx_escapable$jscomp$0.test(string) ? '"' + string.replace(rx_escapable$jscomp$0, function(t) {
      var type = meta$jscomp$0[t];
      return "string" == typeof type ? type : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }
  /**
   * @param {string} key
   * @param {!Object} holder
   * @return {?}
   */
  function str$jscomp$6(key, holder) {
    var i;
    var k;
    var v;
    var length;
    var partial;
    var mind = gap$jscomp$0;
    var value = holder[key];
    switch(value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), "function" == typeof rep$jscomp$0 && (value = rep$jscomp$0.call(holder, key, value)), typeof value) {
      case "string":
        return quote$jscomp$0(value);
      case "number":
        return isFinite(value) ? String(value) : "null";
      case "boolean":
      case "null":
        return String(value);
      case "object":
        if (!value) {
          return "null";
        }
        if (gap$jscomp$0 = gap$jscomp$0 + indent$jscomp$0, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
          length = value.length;
          /** @type {number} */
          i = 0;
          for (; length > i; i = i + 1) {
            partial[i] = str$jscomp$6(i, value) || "null";
          }
          return v = 0 === partial.length ? "[]" : gap$jscomp$0 ? "[\n" + gap$jscomp$0 + partial.join(",\n" + gap$jscomp$0) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap$jscomp$0 = mind, v;
        }
        if (rep$jscomp$0 && "object" == typeof rep$jscomp$0) {
          length = rep$jscomp$0.length;
          /** @type {number} */
          i = 0;
          for (; length > i; i = i + 1) {
            if ("string" == typeof rep$jscomp$0[i]) {
              k = rep$jscomp$0[i];
              v = str$jscomp$6(k, value);
              if (v) {
                partial.push(quote$jscomp$0(k) + (gap$jscomp$0 ? ": " : ":") + v);
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str$jscomp$6(k, value);
              if (v) {
                partial.push(quote$jscomp$0(k) + (gap$jscomp$0 ? ": " : ":") + v);
              }
            }
          }
        }
        return v = 0 === partial.length ? "{}" : gap$jscomp$0 ? "{\n" + gap$jscomp$0 + partial.join(",\n" + gap$jscomp$0) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap$jscomp$0 = mind, v;
    }
  }
  /** @type {!RegExp} */
  var rx_one$jscomp$0 = /^[\],:{}\s]*$/;
  /** @type {!RegExp} */
  var rx_two$jscomp$0 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  /** @type {!RegExp} */
  var rx_three$jscomp$0 = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  /** @type {!RegExp} */
  var rx_four$jscomp$0 = /(?:^|:|,)(?:\s*\[)+/g;
  /** @type {!RegExp} */
  var rx_escapable$jscomp$0 = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  /** @type {!RegExp} */
  var rx_dangerous$jscomp$0 = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  if ("function" != typeof Date.prototype.toJSON) {
    /**
     * @param {*=} p0
     * @return {string}
     */
    Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f$jscomp$1(this.getUTCMonth() + 1) + "-" + f$jscomp$1(this.getUTCDate()) + "T" + f$jscomp$1(this.getUTCHours()) + ":" + f$jscomp$1(this.getUTCMinutes()) + ":" + f$jscomp$1(this.getUTCSeconds()) + "Z" : null;
    };
    /** @type {function(): ?} */
    Boolean.prototype.toJSON = this_value$jscomp$0;
    /** @type {function(): ?} */
    Number.prototype.toJSON = this_value$jscomp$0;
    /** @type {function(): ?} */
    String.prototype.toJSON = this_value$jscomp$0;
  }
  var gap$jscomp$0;
  var indent$jscomp$0;
  var meta$jscomp$0;
  var rep$jscomp$0;
  if ("function" != typeof JSON.stringify) {
    meta$jscomp$0 = {
      "\b" : "\\b",
      "\t" : "\\t",
      "\n" : "\\n",
      "\f" : "\\f",
      "\r" : "\\r",
      '"' : '\\"',
      "\\" : "\\\\"
    };
    /**
     * @param {*} d
     * @param {(Array<string>|function(string, *): *|null)=} a
     * @param {(number|string)=} c
     * @return {string}
     */
    JSON.stringify = function(d, a, c) {
      var value;
      if (gap$jscomp$0 = "", indent$jscomp$0 = "", "number" == typeof c) {
        /** @type {number} */
        value = 0;
        for (; c > value; value = value + 1) {
          /** @type {string} */
          indent$jscomp$0 = indent$jscomp$0 + " ";
        }
      } else {
        if ("string" == typeof c) {
          /** @type {string} */
          indent$jscomp$0 = c;
        }
      }
      if (rep$jscomp$0 = a, a && "function" != typeof a && ("object" != typeof a || "number" != typeof a.length)) {
        throw new Error("JSON.stringify");
      }
      return str$jscomp$6("", {
        "" : d
      });
    };
  }
  if ("function" != typeof JSON.parse) {
    /**
     * @param {string} text$jscomp$10
     * @param {function(string, *): *=} reviver$jscomp$0
     * @return {*}
     */
    JSON.parse = function(text$jscomp$10, reviver$jscomp$0) {
      /**
       * @param {!Object} holder
       * @param {string} key
       * @return {?}
       */
      function walk$jscomp$0(holder, key) {
        var k;
        var v;
        var value = holder[key];
        if (value && "object" == typeof value) {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk$jscomp$0(value, k);
              if (void 0 !== v) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver$jscomp$0.call(holder, key, value);
      }
      var j$jscomp$0;
      if (text$jscomp$10 = String(text$jscomp$10), rx_dangerous$jscomp$0.lastIndex = 0, rx_dangerous$jscomp$0.test(text$jscomp$10) && (text$jscomp$10 = text$jscomp$10.replace(rx_dangerous$jscomp$0, function(strUtf8) {
        return "\\u" + ("0000" + strUtf8.charCodeAt(0).toString(16)).slice(-4);
      })), rx_one$jscomp$0.test(text$jscomp$10.replace(rx_two$jscomp$0, "@").replace(rx_three$jscomp$0, "]").replace(rx_four$jscomp$0, ""))) {
        return j$jscomp$0 = eval("(" + text$jscomp$10 + ")"), "function" == typeof reviver$jscomp$0 ? walk$jscomp$0({
          "" : j$jscomp$0
        }, "") : j$jscomp$0;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
}(), function() {
  /** @type {!Window} */
  var global = window;
  var self = global.$Debug = global.$Debug || global.Debug || {};
  global.Debug = self;
  self.options = {
    "tracePagePath" : false
  };
  /**
   * @param {string} type
   * @return {undefined}
   */
  self.fail = function(type) {
    /** @type {!Error} */
    var drawid = new Error(type + " ");
    var drawpass = global.$WebWatson;
    if (drawpass && drawpass.submitFromException(drawid, void 0, 33), !global.$B || !global.$B.BlackBerry) {
      throw drawid;
    }
    alert("Error: " + type);
  };
  /**
   * @param {?} values
   * @param {string} message
   * @return {undefined}
   */
  self.assert = function(values, message) {
    if (!values) {
      /** @type {string} */
      message = "Assert failed: " + message;
      self.trace(message);
      if (confirm(message + "\r\n\r\nBreak into debugger?")) {
        self.fail(message);
      }
    }
  };
  /**
   * @param {?} onComplete
   * @param {string} onFailure
   * @return {undefined}
   */
  self.failIf = function(onComplete, onFailure) {
    if (!onComplete) {
      self.fail(onFailure);
    }
  };
  /**
   * @param {string} message
   * @param {string} key
   * @return {undefined}
   */
  self.trace = function(message, key) {
    if (message || (message = ""), self.options.tracePagePath) {
      /** @type {string} */
      var obj = global.location.pathname;
      /** @type {string} */
      key = key ? obj + ": " + key : obj;
    }
    if (key) {
      /** @type {string} */
      message = key + ": " + message;
    }
    if (self.appendLog) {
      self.appendLog(message);
    }
    if (global.console && global.console.log) {
      global.console.log((new Date).toUTCString() + ":" + message);
    }
  };
}(), function() {
  /** @type {!Window} */
  var global = window;
  var type = global.Object;
  if (!type.resolve) {
    /**
     * @param {string} a
     * @return {?}
     */
    type.resolve = function(a) {
      try {
        if ("string" == typeof a) {
          a = Function.parse(a);
        } else {
          if ("object" == typeof a) {
            a = a.constructor;
          } else {
            if ("function" != typeof a) {
              /** @type {null} */
              a = null;
            }
          }
        }
      } catch (t) {
        return null;
      }
      return a;
    };
  }
  /** @type {string} */
  type.__typeName = "Object";
}(), function() {
  /**
   * @param {string} str
   * @param {number} i
   * @param {!Object} data
   * @return {?}
   */
  function get(str, i, data) {
    /** @type {boolean} */
    var active = data.s === i;
    if (!active) {
      i = i || 0;
      var modeswitches;
      var aStatedRank;
      var value = str.charCodeAt(i);
      /** @type {number} */
      data.s = -1;
      if (55296 > value || value > 57343) {
        data.c = value;
      } else {
        if (56319 >= value) {
          modeswitches = value;
          aStatedRank = str.charCodeAt(i + 1);
          Ember.assert(!isNaN(aStatedRank), "High surrogate not followed by low surrogate in fixedCharCodeAt()");
          /** @type {number} */
          data.c = 1024 * (modeswitches - 55296) + (aStatedRank - 56320) + 65536;
          data.s = i + 1;
        } else {
          /** @type {number} */
          data.c = -1;
          /** @type {boolean} */
          active = true;
        }
      }
    }
    return !active;
  }
  /** @type {!Window} */
  var global = window;
  var Ember = global.$Debug;
  var String = global.String;
  var self = global.String.prototype;
  /**
   * @param {!Array} value
   * @return {?}
   */
  self.endsWith = function(value) {
    return Ember.assert(value, "must provide suffix"), this.substr(this.length - value.length) == value;
  };
  /**
   * @param {!Array} value
   * @return {?}
   */
  self.startsWith = function(value) {
    return Ember.assert(value, "must provide prefix"), this.substr(0, value.length) == value;
  };
  /**
   * @return {?}
   */
  self.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  };
  /** @type {!RegExp} */
  var trimRE = /\{\d+\}/g;
  /** @type {!RegExp} */
  var reg = /[\{\}]/g;
  /**
   * @return {?}
   */
  self.format = function() {
    /**
     * @param {string} html
     * @return {?}
     */
    function replace(html) {
      var options = data[html.replace(reg, "")];
      return Ember.assert("undefined" != typeof options, "String Format- Provide argument at index " + html.replace(reg, "")), null == options && (options = ""), options;
    }
    /** @type {!Arguments} */
    var data = arguments;
    return this.replace(trimRE, replace);
  };
  /** @type {!RegExp} */
  var trimRegex = /[^\w.,-]/g;
  /** @type {function(): ?} */
  self.encodeXmlAttribute = self.encodeHtmlAttribute = function() {
    return this.replace(trimRegex, function(strUtf8) {
      return ["&#", strUtf8.charCodeAt(0), ";"].join("");
    });
  };
  /** @type {!RegExp} */
  var matchTag = /[^\w .,-]/g;
  /** @type {function(): ?} */
  self.encodeXml = self.encodeHtml = function() {
    var options = {
      "c" : 0,
      "s" : -1
    };
    return this.replace(matchTag, function(n, name, column) {
      return get(column, name, options) ? ["&#", options.c, ";"].join("") : "";
    });
  };
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /[^\w.%-]/g;
  /** @type {function(): ?} */
  self.encodeURIComponent = self.encodeUrl = function() {
    return encodeURIComponent(this).replace(REGEX_ESCAPE_EXPR, function(strUtf8) {
      var c = strUtf8.charCodeAt(0).toString(16);
      return "%" + (1 == c.length ? "0" + c : c).toUpperCase();
    });
  };
  /** @type {!RegExp} */
  var reTag = /[^\w .,-]/g;
  /**
   * @return {?}
   */
  self.encodeJson = function() {
    return this.replace(reTag, function(strUtf8) {
      var mutation_details = strUtf8.charCodeAt(0).toString(16);
      /** @type {string} */
      var n = (new Array(4 - mutation_details.length + 1)).join("0");
      return "\\u" + n + mutation_details.toUpperCase();
    });
  };
  /** @type {function(): ?} */
  self.decodeURIComponent = self.decodeUrl = function() {
    return decodeURIComponent(this);
  };
  /** @type {!RegExp} */
  var regPlaceholder = /([\\\.\{\}\(\)\[\]\/\+\*\?\|\^\$])/gi;
  /**
   * @param {!Object} text
   * @return {?}
   */
  self.escapeRegex = function(text) {
    return (0 == arguments.length ? this : text).replace(regPlaceholder, "\\$1");
  };
  /** @type {string} */
  String.__typeName = "String";
}(), function() {
  /** @type {!Window} */
  var global = window;
  /** @type {function(new:!Function, ...*): ?} */
  var type = (global.Debug, Function);
  var p = type.prototype;
  if (!type.parse) {
    /**
     * @param {string} a
     * @return {?}
     */
    type.parse = function(a) {
      if ("function" == typeof a) {
        return a;
      }
      /** @type {null} */
      var o = null;
      if (a) {
        try {
          /** @type {number} */
          var i = 0;
          var chartKeys = a.split(".");
          /** @type {!Window} */
          o = window;
          var countRep = chartKeys.length;
          i;
          for (; countRep > i; i++) {
            if (o = o[chartKeys[i]], !o) {
              /** @type {null} */
              o = null;
              break;
            }
          }
          if ("function" != typeof o) {
            /** @type {null} */
            o = null;
          }
        } catch (a) {
          /** @type {null} */
          o = null;
        }
      }
      return o;
    };
  }
  if (!p.invoke) {
    /**
     * @return {undefined}
     */
    p.invoke = function() {
      this.apply(null, arguments);
    };
  }
  /** @type {string} */
  type.__typeName = "Function";
}(), function() {
  /** @type {!Window} */
  var obj = window;
  var self = obj.$Debug;
  var n = (obj.jQuery, obj.Array.prototype);
  if (!n.indexOf) {
    /**
     * @param {string} array
     * @param {number} i
     * @return {?}
     */
    n.indexOf = function(array, i) {
      var length = this.length;
      if ((i = i || 0) < 0) {
        /** @type {number} */
        i = Math.max(0, length + i);
      }
      for (; length > i;) {
        if (this[i++] === array) {
          return i - 1;
        }
      }
      return -1;
    };
  }
  if (!n.forEach) {
    /**
     * @param {?} cb
     * @param {?} context
     * @return {undefined}
     */
    n.forEach = function(cb, context) {
      self.assert(cb, "fnCb must be provided");
      var i = this.length;
      /** @type {number} */
      var n = 0;
      for (; i > n; n++) {
        cb.call(context, this[n], n, this);
      }
      self.assert(i == this.length, "Do not modify array during forEach");
    };
  }
  if (!n.remove) {
    /**
     * @param {string} array
     * @return {?}
     */
    n.remove = function(array) {
      var index = this.indexOf(array);
      return index >= 0 && this.splice(index, 1), index >= 0;
    };
  }
  /** @type {string} */
  obj.Array.__typeName = "Array";
}(), function(metaWindow) {
  /**
   * @param {!Array} name
   * @return {?}
   */
  function require(name) {
    return void 0 === name || null === name;
  }
  /**
   * @param {!Array} value
   * @return {?}
   */
  function var_export(value) {
    if (require(value)) {
      return false;
    }
    /** @type {string} */
    var undefined = (typeof value || "object").toLowerCase();
    return "object" === undefined || "array" === undefined;
  }
  /**
   * @param {undefined} s
   * @param {!Object} strings
   * @return {?}
   */
  metaWindow.$setVar = function(s, strings) {
    if (require(s)) {
      return strings;
    }
    if (strings) {
      var key;
      for (key in strings) {
        if (strings.hasOwnProperty(key)) {
          var value = (s[key], strings[key]);
          if (s === value) {
            continue;
          }
          if (var_export(value)) {
            $Debug.trace("Deep copying - " + key);
            s[key] = $setVar(s[key], value);
          } else {
            if (void 0 !== value) {
              s[key] = value;
            }
          }
        }
      }
    }
    return s;
  };
}(window), function(context) {
  /**
   * @return {undefined}
   */
  function t() {
    /** @type {number} */
    var length = arguments.length;
    /** @type {number} */
    var i = 0;
    for (; length > i; i++) {
      var functionName = arguments[i];
      /** @type {!Window} */
      var obj = context;
      var props = functionName.split(".");
      var x = props.length;
      /** @type {number} */
      var length = 0;
      for (; x > length; length++) {
        var key = props[length];
        if (!obj[key]) {
          obj[key] = {};
        }
        obj = obj[key];
      }
      if (context.$Do) {
        context.$Do.register("NS_" + functionName);
      }
    }
  }
  /** @type {function(): undefined} */
  context.registerNamespace = t;
  t("wLive");
  t("wLive.Core");
  t("wLive.Controls");
  t("wLive.Account");
}(window), function() {
  /**
   * @return {?}
   */
  function each_iter() {
    return parent.$Config || parent.ServerData || {};
  }
  /**
   * @return {?}
   */
  function each() {
    return each_iter().clientTelemetry || {};
  }
  /**
   * @param {string} bundle
   * @param {string} id
   * @param {number} callback
   * @return {undefined}
   */
  function reduce(bundle, id, callback) {
    if (id && callback) {
      /** @type {number} */
      bundle[id] = callback;
    }
  }
  /** @type {!Window} */
  var parent = window;
  /** @type {string} */
  var comments = "uaid";
  /** @type {string} */
  var curr = "tcxt";
  /** @type {string} */
  var key = "client-flight";
  /** @type {string} */
  var empty = "network-type";
  /** @type {string} */
  var path = "app-version";
  /** @type {string} */
  var c = "amtcxt";
  /** @type {string} */
  var l = "network_type";
  var opts = parent.$ClientTelemetry = parent.$ClientTelemetry || {};
  /** @type {boolean} */
  var d = false;
  /**
   * @return {?}
   */
  opts.getUnauthSessionId = function() {
    var msg = each();
    return msg.uaid || each_iter().uaid || null;
  };
  /**
   * @param {string} data
   * @return {undefined}
   */
  opts.setHeaders = function(data) {
    var cont = each();
    reduce(data, comments, opts.getUnauthSessionId());
    var moduleName = d || !cont.tcxt;
    if (cont.tcxt) {
      reduce(data, curr, cont.tcxt);
    }
    if (moduleName) {
      reduce(data, key, cont.client_flight);
      reduce(data, empty, cont.nw);
      reduce(data, path, cont.av);
    }
  };
  /**
   * @param {!Object} idx
   * @return {undefined}
   */
  opts.setNetworkType = function(idx) {
    if (idx) {
      var DATA = each();
      if (DATA.nw != idx) {
        /** @type {!Object} */
        DATA.nw = idx;
        /** @type {boolean} */
        d = true;
        $Do.when("jQuery", function() {
          jQuery("input[name=" + l + "]").val(idx);
        });
      }
    }
  };
  /**
   * @return {?}
   */
  opts.getTelemetryContext = function() {
    var allTypesSuccess = each();
    return allTypesSuccess.tcxt;
  };
  /**
   * @param {?} utteranceLine
   * @return {undefined}
   */
  opts.updateTelemetryContext = function(utteranceLine) {
    if (utteranceLine) {
      var asIGT = each();
      asIGT.tcxt = utteranceLine;
      $Do.when("jQuery", function() {
        jQuery("input[name=" + c + "]").val(utteranceLine);
      });
    }
  };
  if (parent.$Do) {
    parent.$Do.register("$ClientTelemetry");
  }
}(), function() {
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function add(e) {
    /** @type {boolean} */
    empty = true;
    if ($Debug && $Debug.appendLog) {
      $Debug.appendLog("ApiRequest._unloadEvent(" + (e.type || "") + ")");
    }
  }
  /**
   * @param {!Object} element
   * @param {string} type
   * @return {undefined}
   */
  function on(element, type) {
    if (element && element.addEventListener) {
      element.addEventListener(type, add);
    } else {
      if (element && element.attachEvent) {
        element.attachEvent("on" + type, add);
      }
    }
  }
  /**
   * @param {string} str
   * @return {?}
   */
  function f(str) {
    return "string" == typeof str;
  }
  /**
   * @param {!Object} data
   * @param {!Function} c
   * @return {undefined}
   */
  function open(data, c) {
    var i;
    for (i in data) {
      if (data.hasOwnProperty(i)) {
        c(i, data[i]);
      }
    }
  }
  /**
   * @return {?}
   */
  function $() {
    return win.$Config || win.ServerData || {};
  }
  /**
   * @param {string} text
   * @return {undefined}
   */
  function extract(text) {
    var self = win.$Debug || {};
    if (self.appendLog) {
      self.appendLog(text);
    }
  }
  /**
   * @param {!Object} item
   * @param {string} context
   * @return {undefined}
   */
  function done(item, context) {
    var twilioOptions = win.wLive || {};
    var from = twilioOptions.PageStats;
    if (from && item && item.pageStats) {
      from.add(item.pageStats, context);
    }
  }
  /**
   * @param {!Function} input
   * @param {!Object} tag
   * @param {number} place
   * @param {number} type
   * @return {undefined}
   */
  function format(input, tag, place, type) {
    var obs = win.$ReportEvent;
    if ($ReportCall) {
      /** @type {number} */
      var placeDiff = (new Date).getTime() - place;
      var data = {
        "apiId" : tag,
        "time" : placeDiff,
        "success" : input
      };
      if (!input) {
        data.errorCode = type || name;
      }
      obs.ReportApiCall(data);
    }
  }
  /**
   * @param {?} type
   * @param {string} data
   * @param {!Object} options
   * @return {?}
   */
  function request(type, data, options) {
    if (null === previous) {
      /** @type {boolean} */
      previous = false;
      if (type && (type.isINT && type.isCorpnet || type.isOneBox)) {
        /** @type {boolean} */
        previous = true;
      }
    }
    var args = {
      "url" : data,
      "apiId" : null,
      "timeout" : options.timeout || TIMEOUT,
      "startTime" : (new Date).getTime(),
      "isSync" : options.isSyncRequest || empty,
      "success" : function(res) {
        var data = this;
        var a = data.apiId;
        done(res, data.startTime);
        if (a) {
          format(true, a, data.startTime);
        }
        if (options.success) {
          options.success(res, options.context);
        }
      },
      "failure" : function(callback) {
        var data = this;
        var t = data.apiId;
        if (done(callback, data.startTime), t) {
          /** @type {number} */
          var value = name;
          if (callback && callback.error) {
            value = callback.error.code;
          }
          format(false, t, data.startTime, value);
        }
        if (options.failure) {
          options.failure(callback, options.context);
        }
      }
    };
    return f(data) || (context.url = data.url, context.apiId = data.apiId), args;
  }
  /**
   * @param {!Object} data
   * @param {!Object} response
   * @return {?}
   */
  function cb(data, response) {
    var photo = $();
    response = response || {};
    var name;
    var reply = response.error || null;
    var self = response.cm || response || {};
    if (self.api && (photo.apiCanary = self.api), $ClientTelemetry.updateTelemetryContext(self.tcxt), !reply) {
      return void data.success(response);
    }
    name = reply.stackTrace;
    name = name && name.encodeJson ? name.encodeJson() : "";
    /** @type {string} */
    var prev_arg = '{"code": "' + reply.code + '", "message": "' + reply.message + '", "debug": "' + reply.debugMessage + '", "stacktrace": "' + name + '", "url": "' + data.url + '"}';
    if (args.push(prev_arg), args.length > iConfig && args.shift(), reply.code != code) {
      var s = (data || {}).isSync || false;
      if (!s) {
        render(data, response);
      }
      data.failure(response);
    }
  }
  /**
   * @param {!Object} settings
   * @param {!Object} options
   * @param {string} result
   * @param {?} r
   * @return {?}
   */
  function callback(settings, options, result, r) {
    options = options || {};
    var res = {
      "status" : options.status || r
    };
    if (500 == options.status && options.responseText) {
      try {
        /** @type {*} */
        res = JSON.parse(options.responseText) || {};
      } catch (a) {
      }
    }
    if (!res.error) {
      /** @type {boolean} */
      var i = false;
      /** @type {number} */
      var content = name;
      /** @type {string} */
      var msg_obj = "Request Failed -- No Response from Server";
      var ret = {
        "url" : settings.url,
        "error" : result,
        "tasks" : [],
        "executionTimeMs" : (new Date).getTime() - settings.startTime,
        "schedulerTimeMs" : 0
      };
      switch(res.pageStats = ret, result) {
        case "timeout":
          /** @type {number} */
          content = iTimeout;
          /** @type {string} */
          msg_obj = "Timeout Error";
          /** @type {boolean} */
          i = true;
          break;
        case "abort":
          /** @type {number} */
          content = code;
          /** @type {string} */
          msg_obj = "Aborted";
          /** @type {string} */
          ret.info = result;
          /** @type {null} */
          ret.error = null;
          break;
        case "parsererror":
          /** @type {string} */
          msg_obj = "Unable to parse response";
          /** @type {boolean} */
          i = true;
          break;
        case "error":
        default:
          if (options.status >= 400) {
            /** @type {boolean} */
            i = true;
          }
          /** @type {string} */
          ret.info = result;
          /** @type {null} */
          ret.error = null;
      }
      res.error = {
        "code" : content,
        "message" : msg_obj,
        "debugMessage" : "(xhr status " + options.status + ") xhr.responseText: " + options.responseText,
        "stackTrace" : "",
        "isFatal" : i
      };
    }
    return cb(settings, res);
  }
  /**
   * @param {!Object} args
   * @return {undefined}
   */
  function call(args) {
    setTimeout(function() {
      var response = {
        "error" : {
          "code" : aerisCode,
          "message" : "Request Failed!",
          "isFatal" : true
        }
      };
      cb(args, response);
    }, 0);
  }
  /**
   * @param {!Object} settings
   * @return {undefined}
   */
  function fail(settings) {
    var result = {
      "status" : 408,
      "statusText" : "timeout",
      "responseText" : "Request Timeout"
    };
    callback(settings, result, result.statusText);
  }
  /**
   * @param {!Object} item
   * @param {!Error} json
   * @param {string} err
   * @param {?} statusCode
   * @return {undefined}
   */
  function test(item, json, err, statusCode) {
    /** @type {string} */
    err = err;
    var msg = json.message || json.description;
    /** @type {string} */
    var generatedUrl = "";
    try {
      /** @type {string} */
      generatedUrl = JSON.stringify(json);
      if (!(generatedUrl && "{}" !== result)) {
        generatedUrl = errorObj.toString();
      }
    } catch (i) {
    }
    var expectedError = {
      "code" : name,
      "message" : msg || err,
      "debugMessage" : "Error: " + err + " - " + msg,
      "stackTrace" : json.stack,
      "isFatal" : true
    };
    var ret = {
      "url" : item.url,
      "error" : err,
      "tasks" : [],
      "executionTimeMs" : (new Date).getTime() - item.startTime,
      "schedulerTimeMs" : 0
    };
    cb(item, {
      "status" : statusCode || 499,
      "error" : expectedError,
      "pageStats" : ret
    });
  }
  /**
   * @param {string} str
   * @return {?}
   */
  function trim(str) {
    return str ? "<span style='font-weight: bold;'>" + str.toString().encodeHtml() + ":</span> " : "";
  }
  /**
   * @param {string} name
   * @param {string} lines
   * @return {?}
   */
  function log(name, lines) {
    return lines ? "<div>" + trim(name) + lines.toString().encodeHtml() + "</div>" : "";
  }
  /**
   * @param {string} namespaces
   * @return {?}
   */
  function parse(namespaces) {
    /** @type {!Array} */
    var plist = [];
    if (namespaces) {
      var crossfilterable_layers = (namespaces || "").split("\n");
      /** @type {number} */
      var layer_i = 0;
      for (; layer_i < crossfilterable_layers.length; layer_i++) {
        var styleText = crossfilterable_layers[layer_i];
        styleText = styleText.replace(/\\u000d\\u000a/gi, "\\u000d").replace(/\\u000a\\u000d/gi, "\\u000d").replace(/\\u000a/gi, "\\u000d");
        var cooks = (styleText || "").split("\\u000d");
        /** @type {number} */
        var i = 0;
        for (; i < cooks.length; i++) {
          var data = (cooks[i] || "").replace(/\\u000a/gi, "").replace(/\\u0022/gi, '"').replace(/\\u0027/gi, "'").replace(/\\u0028/gi, "(").replace(/\\u0029/gi, ")").replace(/\\u003a/gi, ":").replace(/\\u003c/gi, "{{").replace(/\\u003d/gi, "=").replace(/\\u003e/gi, "}}").replace(/\\u005c/gi, "\\").replace(/\\u0060/gi, "`");
          plist.push(data);
        }
      }
    }
    return plist;
  }
  /**
   * @param {string} data
   * @return {?}
   */
  function m(data) {
    /** @type {string} */
    var result = "";
    if (data && data.length > 0) {
      /** @type {number} */
      var byteIndex = 0;
      for (; byteIndex < data.length; byteIndex++) {
        /** @type {string} */
        result = result + (data[byteIndex] + "\n");
      }
    }
    return result;
  }
  /**
   * @param {!Object} data
   * @param {!Object} event
   * @return {undefined}
   */
  function render(data, event) {
    var _this = win.$WebWatson;
    var MochiKit = win.$Debug || {};
    if (!empty && previous && event && event.error && (event.error.stackTrace || event.error.debugMessage)) {
      var text = data.url;
      var opts = data.transport;
      var v = parse(event.error.stackTrace);
      /** @type {null} */
      var name = null;
      if (event.error.isFatal || event.error.showError || lastTrackInfoUrl) {
        name = m(v);
        if (_this) {
          _this.showError(event.error.code, "ApiRequest Error: " + (event.error.message || ""), text || "<none>", null, null, null, name, event.error.debugMessage, event.error.data, event.error.isFatal ? "#FFC0C0" : "#C0FFFF", true);
        }
      } else {
        if (MochiKit.scriptConsole) {
          var self = MochiKit.scriptConsole;
          name = m(v);
          self.errorHtml(log("Url", text) + log("Transport", opts) + log("Error Code", event.error.code) + (event.error.message ? log("Message", event.error.message) : "") + (event.error.isFatal ? log("Is Fatal", event.error.isFatal) : "") + (event.error.debugMessage ? log("Debug", event.error.debugMessage) : ""), {
            "url" : text,
            "code" : event.error.code,
            "data" : event.error.data,
            "stackTrace" : v,
            "rsp" : event
          });
        }
      }
    }
  }
  /**
   * @param {!Object} options
   * @param {string} name
   * @param {string} data
   * @return {undefined}
   */
  function append(options, name, data) {
    if (name && data) {
      /** @type {string} */
      options[name] = data;
    }
  }
  /**
   * @param {string} data
   * @return {?}
   */
  function search(data) {
    /** @type {string} */
    var message = data;
    if (data && !f(data)) {
      var updated = {};
      open(data, function(path, k) {
        if ("unsafe_" === path.substr(0, 7)) {
          path = path.substr(7);
        }
        updated[path] = k;
      });
      /** @type {string} */
      message = JSON.stringify(updated) + "\n";
    }
    return message && (message = message.replace(/\?/g, "\\u003F")), message;
  }
  /**
   * @param {!Object} result
   * @param {string} event
   * @param {!Function} round
   * @return {undefined}
   */
  function handler(result, event, round) {
    if (event.toLowerCase().indexOf(i) >= 0) {
      try {
        round(result);
      } catch (String) {
        test(result, String, "Json parse error", 415);
      }
    } else {
      if (event.toLowerCase().indexOf(right) >= 0) {
        cb(result, null);
      }
    }
  }
  /**
   * @param {!Object} response
   * @param {?} id
   * @param {string} color
   * @return {undefined}
   */
  function send(response, id, color) {
    var url = response.url;
    /** @type {string} */
    url = url + (url.indexOf("?") >= 0 ? "&" : "?");
    /** @type {string} */
    url = url + (apidatasourcesname + "=1");
    var data = {
      "hdrs" : id,
      "data" : color
    };
    navigator.sendBeacon(url, search(data));
    cb(response, null);
  }
  /**
   * @param {!Object} data
   * @param {!Object} headers
   * @param {!Array} rows
   * @return {undefined}
   */
  function create(data, headers, rows) {
    /**
     * @param {!Object} result
     * @return {?}
     */
    function cb(result) {
      if (!result.ok) {
        return void callback(data, result, result.statusText, result.status);
      }
      if (204 == result.status) {
        return void cb(data, null);
      }
      var type = result.headers.get("content-type");
      return type ? void handler(data, type, function() {
        result.json().then(function(cachedResponse) {
          cb(data, cachedResponse);
        })["catch"](function(undefined) {
          test(data, undefined, "Fetch Json error", 415);
        });
      }) : void 0;
    }
    /** @type {boolean} */
    var prefixes = false;
    /** @type {number} */
    var autoResumeTimer = setTimeout(function() {
      /** @type {boolean} */
      prefixes = true;
      fail(data);
    }, data.timeout);
    win.fetch(data.url, {
      "method" : "POST",
      "body" : rows,
      "cache" : "no-cache",
      "headers" : headers,
      "credentials" : "include",
      "keepalive" : false
    }).then(function(e) {
      clearTimeout(autoResumeTimer);
      if (!prefixes) {
        cb(e);
      }
    })["catch"](function(undefined) {
      clearTimeout(autoResumeTimer);
      if (!(prefixes || empty)) {
        test(data, undefined, "Fetch error", 503);
      }
    });
  }
  /**
   * @param {!Object} options
   * @param {!Object} args
   * @param {boolean} params
   * @return {undefined}
   */
  function ajax(options, args, params) {
    /**
     * @param {!Object} request
     * @return {?}
     */
    function sendRequest(request) {
      if (request.status < 200 || request.status >= 300) {
        return void callback(options, request, request.statusText, request.status);
      }
      if (204 == request.status) {
        return void cb(options, null);
      }
      var type = request.getResponseHeader("content-type");
      if (type) {
        handler(options, type, function() {
          var r = "response" in request ? request.response : request.responseText;
          /** @type {*} */
          var w = JSON.parse(r);
          cb(options, w);
        });
      }
    }
    /**
     * @return {?}
     */
    function init() {
      if (win.XMLHttpRequest) {
        /** @type {!XMLHttpRequest} */
        var result = new XMLHttpRequest;
      } else {
        if (win.ActiveXObject) {
          try {
            result = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (n) {
            try {
              result = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (n) {
              if (failureCallback) {
                result = {
                  "status" : 422,
                  "statusText" : "Client: No transport",
                  "responseText" : ""
                };
                callback(options, result, result.statusText, 422);
              }
              return null;
            }
          }
        }
      }
      return result;
    }
    var req = init();
    if (null != req) {
      /**
       * @return {undefined}
       */
      req.onload = function() {
        sendRequest(req);
      };
      /**
       * @return {undefined}
       */
      req.onerror = function() {
        callback(options, req, req.statusText, 499);
      };
      /**
       * @return {undefined}
       */
      req.ontimeout = function() {
        fail(options);
      };
      /** @type {boolean} */
      var async = !options.isSync;
      req.open("POST", options.url, async);
      if (async) {
        req.timeout = options.timeout;
      }
      /** @type {boolean} */
      req.withCredentials = true;
      req.setRequestHeader(type, i + "; charset=utf-8");
      open(args, function(headerName, mime) {
        req.setRequestHeader(headerName, mime);
      });
      req.send(params);
    }
  }
  /**
   * @param {!Object} options
   * @param {string} a
   * @return {?}
   */
  function init(options, a) {
    var self = $();
    extract("$Api.Json(" + options.url + ")");
    var data = {};
    return append(data, "Accept", i), append(data, "hpgid", self.hpgid), append(data, "hpgact", self.hpgact), append(data, "canary", self.apiCanary), append(data, S, self.correlationId), append(data, year, self.correlationId), append(data, Span, self.eipt), append(data, strip, self.apiUseIpt ? "1" : null), append(data, hour, self.authz), $ClientTelemetry.setHeaders(data), append(data, close, 3), (options.isSync || options.useBeacon) && navigator.sendBeacon ? (options.transport = "beacon", append(data, 
    day, options.transport + (options.isSync ? "Sync" : "")), void send(options, data, a)) : win.fetch && alpha ? (options.transport = "fetch", append(data, day, options.transport + (options.isSync ? "Sync" : "")), append(data, type, i + "; charset=utf-8"), void create(options, data, search(a))) : (options.transport = "xhr", append(data, day, options.transport + (options.isSync ? "Sync" : "")), void ajax(options, data, search(a)));
  }
  /** @type {!Window} */
  var win = window;
  /** @type {(Navigator|null)} */
  var navigator = win.navigator;
  var exports = win.$Api = win.$Api || {};
  /** @type {!Array} */
  var args = exports.Errors = [];
  /** @type {number} */
  var TIMEOUT = 3e4;
  /** @type {number} */
  var name = 8e3;
  /** @type {number} */
  var iTimeout = 8001;
  /** @type {number} */
  var code = 8002;
  /** @type {number} */
  var I = 6e3;
  /** @type {number} */
  var aerisCode = 6001;
  /** @type {number} */
  var iConfig = 100;
  /** @type {string} */
  var apidatasourcesname = "bcn";
  /** @type {string} */
  var type = "Content-Type";
  /** @type {string} */
  var close = "x-ms-apiVersion";
  /** @type {string} */
  var day = "x-ms-apiTransport";
  /** @type {string} */
  var S = "client-request-id";
  /** @type {string} */
  var year = "x-ms-correlation-id";
  /** @type {string} */
  var i = "application/json";
  /** @type {string} */
  var right = "image/gif";
  /** @type {string} */
  var strip = "wlPreferIpt";
  /** @type {string} */
  var Span = "eipt";
  /** @type {string} */
  var hour = "authz";
  /** @type {null} */
  var previous = null;
  /** @type {boolean} */
  var lastTrackInfoUrl = false;
  /** @type {boolean} */
  var alpha = true;
  /** @type {boolean} */
  var empty = false;
  on(win.body, "beforeunload");
  on(win.body, "unload");
  on(win.body, "pagehide");
  on(win, "beforeunload");
  on(win, "unload");
  on(win, "pagehide");
  /**
   * @param {string} data
   * @param {string} config
   * @param {number} options
   * @return {?}
   */
  exports.Json = function(data, config, options) {
    var source = $();
    var callback = request(source, data, options || {});
    return source.apiCanary ? init(callback, config) : void call(callback);
  };
  exports.ErrorCodes = {
    "GeneralError" : I,
    "AuthFailure" : aerisCode,
    "InvalidArgs" : "6002",
    "Generic" : name,
    "Timeout" : iTimeout,
    "Aborted" : code
  };
  /**
   * @param {boolean} trackInfoUrl
   * @return {undefined}
   */
  exports.forceShowErrors = function(trackInfoUrl) {
    /** @type {boolean} */
    lastTrackInfoUrl = trackInfoUrl;
  };
  /**
   * @param {string} startAlpha
   * @return {undefined}
   */
  exports.useFetch = function(startAlpha) {
    /** @type {string} */
    alpha = startAlpha;
  };
  /** @type {function(!Object, !Object): undefined} */
  exports._showErrorDetail = render;
  if (win.$Do) {
    win.$Do.register("$Api");
  }
}(), function() {
  /**
   * @param {string} text
   * @return {undefined}
   */
  function info(text) {
    var self = global.$Debug || {};
    if (self.appendLog) {
      self.appendLog(text);
    }
  }
  /**
   * @return {?}
   */
  function get() {
    return global.$Config || global.ServerData || {};
  }
  /**
   * @return {?}
   */
  function parseURL() {
    return global.location.hostname || global.location.host;
  }
  /**
   * @return {?}
   */
  function init() {
    var options = get();
    var argv = {};
    argv[key] = {};
    var result = argv[key];
    if (void 0 !== options.uiflvr) {
      result[list_for_lang] = options.uiflvr;
    }
    if (void 0 !== options.scid) {
      result[id] = options.scid;
    }
    if (void 0 !== options.hpgid) {
      result[path] = options.hpgid;
    }
    var cite = $ClientTelemetry.getTelemetryContext();
    if (void 0 !== cite) {
      result[type] = cite;
    }
    var broken = $ClientTelemetry.getUnauthSessionId();
    if (void 0 !== broken) {
      result[p] = broken;
    }
    var u = options.WLXAccount && options.WLXAccount.countryCode ? options.WLXAccount.countryCode : "";
    if (u) {
      result[name] = u;
    }
    if (options.serverDetails) {
      result[keyPosition] = options.serverDetails;
    }
    var current = parseURL();
    if (current) {
      result[collectionName] = current;
    }
    /** @type {!NetworkInformation} */
    var err = (global.navigator || {}).connection || {};
    if (err.effectiveType) {
      /** @type {string} */
      result[pane] = err.effectiveType;
      $ClientTelemetry.setNetworkType(id);
    }
    try {
      if ("undefined" != typeof ExternalHelper) {
        result[indexIn] = ExternalHelper.getProperty("TelemetryAppVersion");
        var id = ExternalHelper.getProperty("TelemetryNetworkType");
        if (id) {
          result[pane] = id;
          $ClientTelemetry.setNetworkType(id);
        }
      }
    } catch (x) {
    }
    return argv;
  }
  /**
   * @param {!Object} data
   * @param {!Object} elements
   * @return {undefined}
   */
  function process(data, elements) {
    var options = get();
    var nodesSoFar = elements[key] || {};
    var v = data[key] || {};
    /** @type {boolean} */
    var i = false;
    if (void 0 !== options.scid && options.scid !== nodesSoFar[id]) {
      v[id] = options.scid;
      /** @type {boolean} */
      i = true;
    }
    if (void 0 !== options.hpgid && options.hpgid !== nodesSoFar[path]) {
      v[path] = options.hpgid;
      /** @type {boolean} */
      i = true;
    }
    if (i) {
      data[key] = v;
    }
    if (global.$ClientEvents) {
      data.time = global.$ClientEvents.getTimeOnPage();
    }
  }
  /**
   * @param {!Object} self
   * @return {?}
   */
  function _get(self) {
    var childData = {
      "evts" : []
    };
    var observers = self.evts;
    childData[key] = self[key];
    var $JSON = global.$ClientEvents;
    if ($JSON && $JSON.getTimeOnPage) {
      childData[i] = $JSON.getTimeOnPage();
    }
    /** @type {number} */
    var i = 0;
    for (; i < observers.length; i++) {
      var o = observers[i];
      var obj = {
        "data" : o.data
      };
      if (void 0 !== o.time) {
        obj[i] = o.time;
      }
      if (o[key]) {
        obj[key] = o[key];
      }
      var item = {};
      item[o.name] = obj;
      childData.evts.push(item);
    }
    return childData;
  }
  /**
   * @param {!Object} data
   * @param {!Object} response
   * @param {string} error
   * @return {undefined}
   */
  function emit(data, response, error) {
    var communityBrandingUrl = data.url;
    var responses = data.evts;
    /** @type {number} */
    var i = 0;
    for (; i < responses.length; i++) {
      var res = responses[i];
      var data = {};
      if (response.evts) {
        data = response.evts[i] || {};
      }
      var statusMock = data.status || response.status || 404;
      if (error || data.error || 200 > statusMock || statusMock >= 300) {
        if ($Api._showErrorDetail) {
          $Api._showErrorDetail({
            "url" : "#" + res.name + " @ " + communityBrandingUrl
          }, data);
        }
        res.failure({
          "name" : res.name,
          "status" : statusMock,
          "error" : data.error || response.error
        });
      } else {
        res.success(data.rsp || {});
      }
    }
  }
  /**
   * @param {?} item
   * @param {!Object} json
   * @param {!Object} options
   * @return {undefined}
   */
  function callback(item, json, options) {
    var connectorsFromArgs = global.$WebWatson;
    if (item) {
      try {
        item(json, options.context || options.data);
      } catch (connectorName) {
        if (connectorsFromArgs) {
          connectorsFromArgs.submitFromException(connectorName, "EventApiRequest[" + options.name + "]");
        }
      }
    }
  }
  /**
   * @param {string} fontName
   * @param {!Object} data
   * @param {!Object} settings
   * @return {?}
   */
  function create(fontName, data, settings) {
    settings = settings || {};
    var options = {
      "name" : fontName,
      "data" : data,
      "success" : function(res) {
        info("EventApi: success(" + fontName + ") = " + res.status);
        callback(settings.success, res, this);
      },
      "failure" : function(data) {
        info("EventApi: failure(" + fontName + ") = " + data.status);
        callback(settings.failure, data, this);
      },
      "context" : settings.context
    };
    return options;
  }
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  function update(options) {
    /**
     * @return {undefined}
     */
    function makeRequest() {
      /** @type {null} */
      obj = null;
    }
    /**
     * @return {undefined}
     */
    function apply() {
      if (!obj) {
        obj = init();
        /** @type {!Array} */
        obj.evts = [];
      }
    }
    /**
     * @return {undefined}
     */
    function extend() {
      if (sizeName && obj && obj.evts.length >= imageLength) {
        if (_takingTooLongTimeout) {
          clearTimeout(_takingTooLongTimeout);
        }
        var newTime = d;
        /** @type {boolean} */
        var aboveMinLength = obj.evts.length >= minimumLength;
        if (aboveMinLength) {
          /** @type {number} */
          newTime = 0;
        }
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          /** @type {null} */
          _takingTooLongTimeout = null;
          $scope.Post();
        }, newTime);
      }
      if (ngiScroll_timeout > 0) {
        if (paintNodesTimeout) {
          clearTimeout(paintNodesTimeout);
        }
        /** @type {number} */
        paintNodesTimeout = setTimeout(function() {
          /** @type {null} */
          paintNodesTimeout = null;
          $scope.Post();
        }, ngiScroll_timeout);
      }
    }
    var $scope = this;
    var json = options.url;
    var sizeName = options.autoPost || false;
    var d = options.autoPostDelay || 0;
    /** @type {null} */
    var _takingTooLongTimeout = null;
    var minimumLength = options.maxEvents || 10;
    var imageLength = options.minEvents || 5;
    var ngiScroll_timeout = options.flush || 0;
    /** @type {null} */
    var paintNodesTimeout = null;
    var readOnlyFn = options.prePostCallback;
    /** @type {null} */
    var obj = null;
    makeRequest();
    /**
     * @param {string} name
     * @param {!Object} type
     * @param {!Object} options
     * @return {undefined}
     */
    $scope.Add = function(name, type, options) {
      apply();
      var expanded = create(name, type, options);
      process(expanded, obj);
      obj.evts.push(expanded);
      extend();
    };
    /**
     * @return {?}
     */
    $scope.HasEvents = function() {
      return obj && obj.evts.length > 0;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    $scope.HasEvent = function(name) {
      if (obj && obj.evts.length > 0) {
        /** @type {number} */
        var i = 0;
        for (; i < theEvents.length; i++) {
          var existingExtension = theEvents[i];
          if (existingExtension.name == name) {
            return true;
          }
        }
      }
      return false;
    };
    /**
     * @return {undefined}
     */
    $scope.Clear = function() {
      makeRequest();
    };
    /**
     * @param {string} path
     * @return {undefined}
     */
    $scope.Post = function(path) {
      /**
       * @param {!Object} res
       * @return {undefined}
       */
      function action(res) {
        emit({
          "url" : json,
          "evts" : evts
        }, res, false);
      }
      /**
       * @param {!Object} event
       * @return {undefined}
       */
      function _failure(event) {
        emit({
          "url" : json,
          "evts" : evts
        }, event, true);
      }
      if (readOnlyFn && readOnlyFn(path), obj && 0 != obj.evts.length) {
        var evts = obj.evts;
        var value = _get(obj);
        makeRequest();
        var callback = {
          "success" : action,
          "failure" : _failure
        };
        if (path && (path.isSyncRequest || path.isUnloadEvent)) {
          /** @type {boolean} */
          callback.isSyncRequest = true;
        }
        $Api.Json(json, value, callback);
      }
    };
  }
  /** @type {!Window} */
  var global = window;
  /** @type {string} */
  var list_for_lang = "uiflvr";
  /** @type {string} */
  var id = "scid";
  /** @type {string} */
  var p = "uaid";
  /** @type {string} */
  var path = "hpgid";
  /** @type {string} */
  var type = "tcxt";
  /** @type {string} */
  var keyPosition = "svr";
  /** @type {string} */
  var name = "cntry";
  /** @type {string} */
  var collectionName = "hst";
  /** @type {string} */
  var i = "tm";
  /** @type {string} */
  var pane = "nt";
  /** @type {string} */
  var indexIn = "av";
  /** @type {string} */
  var key = "cm";
  /** @type {function(!Object): undefined} */
  global.$EventApi = update;
  if (global.$Do) {
    global.$Do.register("$EventApi");
  }
}(), function() {
  /**
   * @return {?}
   */
  function now() {
    return w || (w = opts.timeOrigin || payload.navigationStart || (new Date).getTime()), w;
  }
  /**
   * @return {?}
   */
  function onCycleStart() {
    /** @type {number} */
    var t = Date.now() - now();
    return 0 > t && (t = 0), t;
  }
  /**
   * @return {?}
   */
  function rgbaToHexAlpha() {
    return win.$Config || win.ServerData || {};
  }
  /**
   * @return {?}
   */
  function load() {
    if (value) {
      return value;
    }
    var color = rgbaToHexAlpha();
    var options = color.clientEvents || {};
    if (!options.enabled) {
      return null;
    }
    var srcUrl = options.url || "/api/ClientEvents";
    if (options.addQs) {
      /** @type {string} */
      srcUrl = srcUrl + (-1 !== srcUrl.indexOf("?") ? win.location.search.replace("?", "&") : win.location.search);
    }
    var ret = {
      "url" : srcUrl,
      "flush" : options.flush,
      "autoPost" : options.autoPost,
      "autoPostDelay" : options.autoPostDelay,
      "minEvents" : options.minEvents,
      "maxEvents" : options.maxEvents,
      "prePostCallback" : error
    };
    return value = new $EventApi(ret);
  }
  /**
   * @param {string} name
   * @param {string} value
   * @param {!Object} options
   * @return {undefined}
   */
  function fire(name, value, options) {
    var $ = load();
    if (null != $) {
      options = options || {};
      var t = p[name];
      if (!t) {
        var node = {
          "name" : name,
          "data" : value
        };
        check(t, false, node);
        value = node.data;
      }
      $.Add(name, value, {
        "context" : options.context,
        "success" : options.success,
        "failure" : options.failure
      });
    }
  }
  /**
   * @param {?} name
   * @return {?}
   */
  function hasEvent(name) {
    return value && value.HasEvent(name);
  }
  /**
   * @param {string} module
   * @return {undefined}
   */
  function error(module) {
    /** @type {boolean} */
    var e = false;
    if (module && (module.isSyncRequest || module.isUnloadEvent)) {
      /** @type {boolean} */
      e = true;
    }
    check(x, e);
  }
  /**
   * @param {boolean} first
   * @return {undefined}
   */
  function r(first) {
    /** @type {null} */
    var url = null;
    if (first) {
      url = {
        "isUnloadEvent" : true
      };
    }
    error(url);
    if (value && value.HasEvents()) {
      value.Post(url);
    }
  }
  /**
   * @param {!Array} r
   * @param {boolean} update
   * @param {!CustomEvent} data
   * @return {undefined}
   */
  function check(r, update, data) {
    if (r && 0 != r.length) {
      /** @type {!Array} */
      var _sizeAnimateTimeStamps = [];
      var doc = win.$WebWatson;
      var sel = doc && doc.submitFromException;
      /** @type {number} */
      var i = 0;
      for (; i < r.length; i++) {
        var options = r[i];
        if (options && options.cb && !options.processing) {
          var cb = options.cb;
          try {
            /** @type {boolean} */
            options.processing = true;
            var e = {
              "args" : cb.args,
              "isUnload" : update
            };
            if (data) {
              /** @type {!CustomEvent} */
              e.evt = data;
            }
            /** @type {!Array} */
            var buffer = [];
            buffer.push(e);
            cb.apply(this, buffer);
          } catch (falseySection) {
            if (sel) {
              _sizeAnimateTimeStamps.push(falseySection);
            }
          } finally {
            /** @type {boolean} */
            options.processing = false;
          }
        }
      }
      for (; _sizeAnimateTimeStamps.length > 0;) {
        doc.submitFromException(_sizeAnimateTimeStamps.shift());
      }
    }
  }
  /**
   * @param {!Object} child
   * @param {!Object} id
   * @param {!Object} prop
   * @return {undefined}
   */
  function callback(child, id, prop) {
    if (id && child) {
      child.push({
        "cb" : id,
        "args" : prop
      });
    }
  }
  /**
   * @param {number} num
   * @param {!Array} args
   * @return {?}
   */
  function get(num, args) {
    /** @type {!Array} */
    var list = [];
    if (args) {
      /** @type {number} */
      var i = num;
      for (; i < args.length; i++) {
        list.push(args[i]);
      }
    }
    return list;
  }
  /**
   * @param {string} pluginName
   * @return {undefined}
   */
  function write(pluginName) {
    callback(specialsResponse, pluginName, get(1, arguments));
  }
  /**
   * @param {string} width
   * @return {undefined}
   */
  function defaultResolutionsHandler(width) {
    callback(x, width, get(1, arguments));
  }
  /**
   * @param {string} name
   * @param {string} arg
   * @return {undefined}
   */
  function addEventListener(name, arg) {
    var a = p[name];
    if (!a) {
      /** @type {!Array} */
      a = [];
      /** @type {!Array} */
      p[name] = a;
    }
    callback(a, arg, get(2, arguments));
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function add(e) {
    check(specialsResponse, true);
    r(true);
    if ($Debug && $Debug.appendLog) {
      $Debug.appendLog("ClientEvents._unloadEvent(" + (e.type || "") + ")");
    }
  }
  /**
   * @param {!Object} element
   * @param {string} type
   * @return {undefined}
   */
  function on(element, type) {
    if (element && element.addEventListener) {
      element.addEventListener(type, add);
    } else {
      if (element && element.attachEvent) {
        element.attachEvent("on" + type, add);
      }
    }
  }
  /** @type {!Window} */
  var win = window;
  var b = win.$Do;
  /** @type {(Performance|{})} */
  var opts = win.performance || {};
  /** @type {(PerformanceTiming|{})} */
  var payload = opts.timing || {};
  /** @type {null} */
  var w = null;
  /** @type {null} */
  var value = null;
  /** @type {number} */
  var $ = 0;
  /** @type {!Array} */
  var specialsResponse = [];
  /** @type {!Array} */
  var x = [];
  var p = {};
  var exports = win.$ClientEvents = win.$ClientEvents || {};
  on(win.body, "beforeunload");
  on(win.body, "unload");
  on(win.body, "pagehide");
  on(win, "beforeunload");
  on(win, "unload");
  on(win, "pagehide");
  /**
   * @return {?}
   */
  exports.isEnabled = function() {
    return $ || 0;
  };
  /** @type {function(): ?} */
  exports.getTimeOnPage = onCycleStart;
  /** @type {function(string, string, !Object): undefined} */
  exports.add = fire;
  /** @type {function(boolean): undefined} */
  exports.send = r;
  /** @type {function(?): ?} */
  exports.hasEvent = hasEvent;
  /** @type {function(string, string): undefined} */
  exports.addEventListener = addEventListener;
  /** @type {function(string): undefined} */
  exports.addPreSendHandler = defaultResolutionsHandler;
  /** @type {function(string): undefined} */
  exports.addUnloadHandler = write;
  if (b) {
    b.register("$ClientEvents");
    b.when("$Config", function() {
      var color = rgbaToHexAlpha();
      var streamSize2 = color.clientEvents || {};
      $ = streamSize2.enabled || 0;
    });
  }
}(), function() {
  /**
   * @param {?} url
   * @return {?}
   */
  function abs(url) {
    return "function" == typeof url;
  }
  /**
   * @param {number} objs
   * @param {!Function} fn
   * @return {?}
   */
  function filter(objs, fn) {
    /** @type {!Array} */
    var result = [];
    objs = objs || [];
    /** @type {number} */
    var i = 0;
    var l = objs.length;
    for (; l > i; i++) {
      result.push(fn(objs[i], i));
    }
    return result;
  }
  /**
   * @return {?}
   */
  function getPixelOnImageSizeMax() {
    return w.$Config || w.ServerData || {};
  }
  /**
   * @return {?}
   */
  function remove() {
    /** @type {(Performance|null)} */
    var p = w.performance;
    var data = {};
    return p && !mustKeepRoot && env ? (p.navigation && (data.navigation = $(p.navigation)), p.timing && (data.timing = $(p.timing), temp && (data.timing.customLoadEventEnd = temp > 0 ? temp : 0)), p.getEntries && (data.entries = filter(p.getEntries(), $)), navigator.connection && (data.connection = $(navigator.connection)), data) : null;
  }
  /**
   * @param {!Object} d
   * @return {?}
   */
  function $(d) {
    var c = {};
    if (d.toJSON) {
      return d.toJSON();
    }
    var i;
    for (i in d) {
      if (!abs(d[i])) {
        c[i] = d[i];
      }
    }
    return c;
  }
  /**
   * @return {undefined}
   */
  function test() {
    var obj1 = remove();
    if (null != obj1) {
      obj.add("perf", obj1);
      /** @type {boolean} */
      mustKeepRoot = true;
    }
  }
  /**
   * @return {undefined}
   */
  function evaluate() {
    /** @type {boolean} */
    env = true;
    var pixelSizeTargetMax = getPixelOnImageSizeMax();
    if (pixelSizeTargetMax.isCustomPerf) {
      test();
    }
  }
  /**
   * @param {number} user
   * @return {undefined}
   */
  function userToGroup(user) {
    /** @type {number} */
    temp = user;
  }
  /**
   * @return {undefined}
   */
  function p() {
    if (env) {
      if (_takingTooLongTimeout) {
        clearTimeout(_takingTooLongTimeout);
      }
      test();
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    b.when("$Config", function() {
      if (obj.isEnabled()) {
        var pixelSizeTargetMax = getPixelOnImageSizeMax();
        var t = pixelSizeTargetMax.clientEvents || {};
        if (w.performance && w.performance.timing && !pixelSizeTargetMax.isCustomPerf) {
          evaluate();
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(function() {
            /** @type {null} */
            _takingTooLongTimeout = null;
            test();
          }, t.pltDelay || 500);
          obj.addUnloadHandler(p);
          obj.addPreSendHandler(p);
        }
      }
    });
  }
  /** @type {!Window} */
  var w = window;
  var b = w.$Do;
  /** @type {null} */
  var _takingTooLongTimeout = null;
  /** @type {number} */
  var temp = 0;
  /** @type {boolean} */
  var mustKeepRoot = false;
  /** @type {boolean} */
  var env = false;
  var obj = w.$ClientEvents = w.$ClientEvents || {};
  if (w.addEventListener) {
    w.addEventListener("load", init);
  } else {
    if (w.attachEvent) {
      w.attachEvent("onload", init);
    } else {
      if (b) {
        b.when("doc.load", init);
      }
    }
  }
  /** @type {function(): undefined} */
  obj.addPlt = test;
  /** @type {function(): undefined} */
  obj.SetPageLoadCompleted = evaluate;
  /** @type {function(number): undefined} */
  obj.SetCustomPageLoadCompletedTime = userToGroup;
  if (b) {
    b.register("$ClientPerf");
  }
}(), function(metaWindow) {
  /**
   * @param {number} module
   * @param {string} type
   * @param {number} data
   * @param {number} options
   * @param {number} callback
   * @param {number} opt_callback
   * @param {number} opt_maxRetries
   * @param {number} opt_responseType
   * @param {number} opt_withCredentials
   * @return {undefined}
   */
  function send(module, type, data, options, callback, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials) {
    $Do.when("DataRequest", function() {
      var request = new metaWindow.wLive.Core.DataRequest(module, type, data, options, callback, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials);
      request.start();
    });
  }
  /**
   * @param {number} username
   * @param {number} command
   * @param {number} headers
   * @param {number} opt_callback
   * @param {number} opt_maxRetries
   * @param {boolean} opt_responseType
   * @param {number} opt_withCredentials
   * @return {?}
   */
  function Request(username, command, headers, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials) {
    return new Promise(function(indexName, callback) {
      $Do.when("DataRequest", function() {
        var request = new metaWindow.wLive.Core.DataRequest(username, command, headers, indexName, callback, opt_callback, opt_maxRetries, opt_responseType, opt_withCredentials);
        request.start();
      });
    });
  }
  /** @type {number} */
  var iTimeout = 8001;
  /** @type {number} */
  var o = 8002;
  var ResponseContentType = metaWindow.$DataRequest = metaWindow.$DataRequest || {};
  ResponseContentType.Json = ResponseContentType.Json || send;
  ResponseContentType.JsonAsync = ResponseContentType.JsonAsync || Request;
  ResponseContentType.ApiErrorCodes = {
    "GeneralError" : "6000",
    "AuthFailure" : "6001",
    "InvalidArgs" : "6002",
    "Timeout" : iTimeout,
    "Aborted" : o
  };
}(window), $Do.when("$Config", function() {
  /**
   * @param {!Object} item
   * @param {string} data
   * @return {?}
   */
  function get(item, data) {
    /** @type {null} */
    var action = null;
    /** @type {null} */
    var credits = null;
    var country = app.WLXAccount && app.WLXAccount.countryCode ? app.WLXAccount.countryCode : "";
    var l = 0 !== app.btReportingOn && data === position ? setState() : null;
    var f = item.cxhFunctionRes ? item.cxhFunctionRes : null;
    if ("number" === jQuery.type(item) || "string" === jQuery.type(item)) {
      /** @type {!Object} */
      action = item;
      /** @type {string} */
      credits = "";
    } else {
      action = item.pageId;
      credits = merge(item.userAction);
    }
    var retVal = init(item, action, data);
    var defaults = {
      "pageApiId" : action,
      "clientDetails" : transactionIDList,
      "country" : country,
      "userAction" : credits,
      "source" : data,
      "clientTelemetryData" : retVal,
      "btData" : l,
      "cxhFunctionRes" : f
    };
    return tailChanged = true, defaults;
  }
  /**
   * @return {?}
   */
  function setState() {
    var state = {};
    try {
      /** @type {boolean} */
      state.present = "undefined" != typeof UserTracker;
      state.submitIndex = state.present ? UserTracker.submitIndex : 0;
      state.powEnabled = "undefined" != typeof _wutPOWEnabled && _wutPOWEnabled;
    } catch (t) {
    }
    return state;
  }
  /**
   * @param {!Object} data
   * @param {string} size
   * @param {string} name
   * @return {?}
   */
  function init(data, size, name) {
    var e = {};
    try {
      /** @type {(PerformanceTiming|null)} */
      var t = root.performance && root.performance.timing ? root.performance.timing : null;
      if (e.category = name, e.pageName = size ? String(size).replace(/_Client$/, "") : "", e.eventInfo = {}, e.eventInfo.timestamp = (new Date).getTime(), e.eventInfo.enforcementSessionToken = data.enforcementSessionToken || null, null != t && !tailChanged && p && (e.eventInfo.perceivedPlt = value > t.loadEventEnd ? value - t.navigationStart : t.loadEventEnd - t.navigationStart, e.eventInfo.networkLatency = t.responseEnd - t.navigationStart), name !== position || tailChanged || (e.category = type), 
      "undefined" != typeof ExternalHelper) {
        e.eventInfo.appVersion = ExternalHelper.getProperty("TelemetryAppVersion");
        var type = ExternalHelper.getProperty("TelemetryNetworkType");
        e.eventInfo.networkType = type;
        $ClientTelemetry.setNetworkType(type);
      }
      if ("undefined" != typeof ExternalHelper && e.category === type) {
        e.eventInfo.precaching = ExternalHelper.getProperty("TelemetryPrecaching");
        e.eventInfo.bundleVersion = ExternalHelper.getProperty("TelemetryResourceBundleVersion");
        e.eventInfo.deviceYear = ExternalHelper.getProperty("TelemetryDeviceYearClass");
        e.eventInfo.isMaster = ExternalHelper.getProperty("TelemetryIsRequestorMaster");
        e.eventInfo.bundleHits = ExternalHelper.getProperty("TelemetryResourceBundleHits");
        e.eventInfo.bundleMisses = ExternalHelper.getProperty("TelemetryResourceBundleMisses");
        ExternalHelper.setProperty("TelemetryResourceBundleHits", "0");
        ExternalHelper.setProperty("TelemetryResourceBundleMisses", "0");
      } else {
        if (e.category === data) {
          if (data.suggestedAccountType) {
            e.eventInfo.suggestedAccountType = data.suggestedAccountType;
          }
          if (data.accountType) {
            e.eventInfo.accountType = data.accountType;
          }
          if (data.duration) {
            e.eventInfo.duration = data.duration;
          }
          if (data.errorCode) {
            e.eventInfo.errorCode = data.errorCode;
          }
        }
      }
      if ("undefined" != typeof ExternalHelper) {
        ExternalHelper.reportTelemetry(JSON.stringify(e));
      }
    } catch (u) {
    }
    return e;
  }
  /**
   * @param {string} a
   * @return {?}
   */
  function merge(a) {
    /** @type {string} */
    var t = "";
    return jQuery.isArray(a) ? (jQuery.each(a, function(canCreateDiscussions, msDuration) {
      t = t + msDuration;
      /** @type {string} */
      t = t + ",";
    }), t = t.substring(0, t.length - 1)) : "string" == typeof a && (t = a), t;
  }
  /** @type {!Window} */
  var root = window;
  var self = root.$DataRequest;
  var app = root.$Config;
  var test = app && app.WLXAccount ? app.WLXAccount.urls : null;
  /** @type {string} */
  var type = "PageLoad";
  /** @type {string} */
  var position = "PageView";
  /** @type {string} */
  var data = "UserAction";
  /** @type {number} */
  var body = 1e4;
  /** @type {!Array} */
  var transactionIDList = [];
  /** @type {boolean} */
  var p = false;
  /** @type {boolean} */
  var tailChanged = false;
  /** @type {number} */
  var value = 0;
  var rule = root.$ReportEvent = {};
  var toggle = app && app.WLXAccount ? app.WLXAccount.noReportClient : false;
  /**
   * @return {?}
   */
  rule.ApiTime = function() {
    if ("undefined" != String(root.wLive.PageStats) && "undefined" != String(root.wLive.PageStats.d)) {
      var touch = root.wLive.PageStats.d[0] || {};
      var x = touch.clientStart;
      if ("undefined" != String(x)) {
        return (new Date).getTime() - x;
      }
    }
    return 0;
  };
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  rule.ReportApiCall = function(data) {
    if (data) {
      var apiId = data.apiId;
      if (!apiId) {
        throw "ApiId is missing for api call";
      }
      if (void 0 === data.time) {
        data.time = rule.ApiTime();
      }
      transactionIDList.push(data);
    }
  };
  /**
   * @param {number} obj
   * @return {undefined}
   */
  rule.SetCustomPageLoadCompletedTime = function(obj) {
    /** @type {number} */
    value = obj;
    if ($ClientEvents) {
      $ClientEvents.SetCustomPageLoadCompletedTime(obj);
    }
  };
  /**
   * @return {undefined}
   */
  rule.PageLoadCompleted = function() {
    /** @type {boolean} */
    p = true;
    if ($ClientEvents) {
      $ClientEvents.SetPageLoadCompleted(true);
    }
  };
  /**
   * @param {!Object} node
   * @return {undefined}
   */
  rule.Fire = function(node) {
    if (!toggle && test && test.reportClientData) {
      var n;
      var r;
      if ("number" === jQuery.type(node) || "string" === jQuery.type(node)) {
        /** @type {string} */
        n = "";
        /** @type {string} */
        r = "";
      } else {
        n = node.testSuccessMethod;
        r = node.testFailureMethod;
      }
      var result = get(node, position);
      self.Json(null, $Utility.generateUrl(test.baseDomain, test.reportClientData, true), result, n, r, body);
      /** @type {!Array} */
      transactionIDList = [];
    }
  };
  /**
   * @param {!Object} res
   * @return {undefined}
   */
  rule.Action = function(res) {
    if (!toggle && test && test.reportClientData) {
      var done = get(res, data);
      if (!res.skipClientCall) {
        self.Json(null, $Utility.generateUrl(test.baseDomain, test.reportClientData, true), done, res.testSuccessMethod, res.testFailureMethod, body);
      }
    }
  };
  $Do.register("$ReportEvent");
});

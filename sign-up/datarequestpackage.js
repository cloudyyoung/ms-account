'use strict';
!function() {
  /**
   * @param {number} realm
   * @return {undefined}
   */
  function exports(realm) {
    /**
     * @param {!Object} target
     * @return {?}
     */
    function set(target) {
      return target && target.state == state && (target.prev && (target.prev.next = target.next), target.next && (target.next.prev = target.prev), link == target && (link = target.next), node == target && (node = target.prev), target.state = id, target.prev = target.next = null, b--), target;
    }
    /**
     * @param {!Object} item
     * @return {undefined}
     */
    function add(item) {
      if (item && item.state == id) {
        var prev = node;
        if (prev) {
          /** @type {!Object} */
          prev.next = item;
          item.prev = prev;
        } else {
          /** @type {!Object} */
          link = item;
        }
        /** @type {!Object} */
        node = item;
        /** @type {number} */
        item.state = state;
        b++;
      }
    }
    /**
     * @return {undefined}
     */
    function call() {
      if (!hasSongChanged && !object_searchCourseContent && b && r > i) {
        object_searchCourseContent = window.setTimeout(controller, renewTokenIn);
      }
    }
    /**
     * @param {number} x
     * @return {?}
     */
    function f(x) {
      /** @type {boolean} */
      var resultToDisplay = (new Date).getTime() - x < bump;
      return resultToDisplay;
    }
    /**
     * @return {undefined}
     */
    function controller() {
      /** @type {number} */
      var dist01 = (new Date).getTime();
      /** @type {number} */
      object_searchCourseContent = 0;
      /** @type {boolean} */
      hasSongChanged = true;
      for (; b > 0 && r > i;) {
        var args = link;
        if (args && r > i ? (assert.assert(args.state === state, "Task was not in a pending state and we were just about to execute it."), args = map(set(args))) : args = null, args && !f(dist01)) {
          break;
        }
      }
      /** @type {boolean} */
      hasSongChanged = false;
      call();
    }
    /**
     * @param {!Object} item
     * @return {?}
     */
    function map(item) {
      if (item) {
        assert.assert(void 0 != item.id && !data[item.id], "Task didn't have an id or was already active!");
        i++;
        /** @type {!Object} */
        data[item.id] = item;
        /** @type {number} */
        item.startTime = (new Date).getTime();
        /** @type {number} */
        item.state = ERROR;
        var r = item.exec(function(num) {
          next(item, num);
        });
        if (!r) {
          next(item);
        }
      }
      return item;
    }
    /**
     * @param {!Object} item
     * @param {boolean} delay
     * @return {undefined}
     */
    function next(item, delay) {
      if (item.state === ERROR) {
        i--;
        assert.assert(data[item.id], "A task is being completed without being in the active task list.");
        delete data[item.id];
        if (delay && "number" == typeof delay) {
          /** @type {number} */
          item.state = GIN_STATE_STARTED;
          item.timeoutId = window.setTimeout(function() {
            output(item);
          }, delay);
        } else {
          output(item);
        }
      }
    }
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    function output(e) {
      var r = value;
      /** @type {number} */
      e.state = inState;
      delete r[e.id];
      call();
    }
    var connection = this;
    var r = realm || l;
    /** @type {number} */
    var b = 0;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var object_searchCourseContent = 0;
    /** @type {number} */
    var localidCounter = 0;
    var value = {};
    /** @type {null} */
    var link = null;
    /** @type {null} */
    var node = null;
    var data = {};
    /** @type {boolean} */
    var $ = false;
    /** @type {boolean} */
    var hasSongChanged = false;
    /**
     * @param {!Function} options
     * @param {!Function} index
     * @param {!Object} name
     * @return {?}
     */
    connection.enqueue = function(options, index, name) {
      /** @type {boolean} */
      var queue = false;
      if (!$) {
        name = name || String(localidCounter++);
        var cache = value;
        var c = cache[name];
        if (!c || c.state == state && c.next) {
          if (c) {
            set(c);
          } else {
            assert.assert(!data[name], "An active task was found during an enqueue that wasn't in the queue list.");
            /** @type {boolean} */
            queue = true;
            c = cache[name] = new Promise(options, index, name);
          }
          add(c);
          call();
        }
      }
      return queue;
    };
    /**
     * @return {undefined}
     */
    connection.abortAll = function() {
      /** @type {boolean} */
      $ = true;
      connection.abort();
      /** @type {boolean} */
      $ = false;
      assert.assert(0 == b, "After abortAll, _pendingTaskCount should be 0. (Was " + b + ")");
      assert.assert(0 == i, "After abortAll, _activeTaskCount should be 0. (Was " + i + ")");
    };
    /**
     * @return {undefined}
     */
    connection.abort = function() {
      var tasks = value;
      if (tasks) {
        for (taskId in tasks) {
          assert.assert(tasks.hasOwnProperty(taskId), "priorityQueue::abort ran across a property in queue that wasn't a task id.");
          var data = tasks[taskId];
          if (data.state == ERROR) {
            next(data);
            if (data.abort) {
              data.abort();
            }
          } else {
            if (data.state == GIN_STATE_STARTED) {
              if (data.timeoutId) {
                clearTimeout(data.timeoutId);
              }
              output(data);
            } else {
              set(data);
            }
          }
        }
        value = {};
      }
    };
    /**
     * @return {?}
     */
    connection.getActiveTaskCount = function() {
      return i;
    };
    /**
     * @return {?}
     */
    connection.getActiveTasks = function() {
      return data;
    };
  }
  /**
   * @param {string} fn
   * @param {!Function} done
   * @param {string} next
   * @return {undefined}
   */
  function Promise(fn, done, next) {
    var self = this;
    /** @type {string} */
    self.id = next;
    /** @type {string} */
    self.exec = fn;
    /** @type {!Function} */
    self.abort = done;
    /** @type {number} */
    self.timeoutId = 0;
    /** @type {null} */
    self.next = null;
    /** @type {null} */
    self.prev = null;
    /** @type {number} */
    self.state = id;
  }
  /** @type {!Window} */
  var c = window;
  var b = c.wLive;
  var assert = (b.Core, c.$Debug);
  /** @type {number} */
  var l = 1;
  /** @type {number} */
  var bump = 25;
  /** @type {number} */
  var renewTokenIn = 0;
  /** @type {number} */
  var id = 0;
  /** @type {number} */
  var state = 1;
  /** @type {number} */
  var ERROR = 2;
  /** @type {number} */
  var GIN_STATE_STARTED = 3;
  /** @type {number} */
  var inState = 4;
  /** @type {number} */
  var base = 1;
  Promise.prototype = {
    "id" : "",
    "queueId" : "",
    "exec" : function() {
    },
    "abort" : function() {
    },
    "timeoutId" : 0,
    "next" : null,
    "prev" : null,
    "state" : id
  };
  c.requests = new exports(base);
  $Do.register("wLive.Core.TaskQueue", 0, true);
}(), $Do.when("wLive.Core.TaskQueue", function() {
  /**
   * @param {!Object} record
   * @param {string} field
   * @param {string} value
   * @return {undefined}
   */
  function callback(record, field, value) {
    if (field && value) {
      /** @type {string} */
      record[field] = value;
    }
  }
  /**
   * @param {!Object} keys
   * @param {string} index
   * @param {number} word
   * @return {undefined}
   */
  function match(keys, index, word) {
    if (void 0 !== word) {
      /** @type {number} */
      keys[index] = word;
    }
  }
  /**
   * @param {!Object} callback
   * @param {string} el
   * @param {string} obj
   * @param {?} done
   * @param {!Object} next
   * @param {number} uri
   * @param {?} data
   * @param {?} id
   * @param {number} month
   * @return {undefined}
   */
  function init(callback, el, obj, done, next, uri, data, id, month) {
    /**
     * @param {!Object} error
     * @param {string} data
     * @return {?}
     */
    function get(error, data) {
      var result = {};
      if (500 == error.status) {
        try {
          /** @type {*} */
          result = JSON.parse(error.responseText) || {};
        } catch (a) {
        }
      }
      if (!result.error && !result.items) {
        /** @type {boolean} */
        var o = true;
        /** @type {boolean} */
        var n = false;
        /** @type {number} */
        var instrumented = iTimeout;
        switch(result.pageStats = {
          "url" : value,
          "error" : data,
          "tasks" : [],
          "executionTimeMs" : 0,
          "schedulerTimeMs" : 0
        }, data) {
          case "timeout":
            /** @type {number} */
            instrumented = iTimeout;
            /** @type {boolean} */
            n = true;
            break;
          case "abort":
            /** @type {number} */
            instrumented = code;
            /** @type {boolean} */
            o = false;
            /** @type {string} */
            result.pageStats.info = data;
            /** @type {null} */
            result.pageStats.error = null;
        }
        result.error = {
          "isRetriable" : o,
          "code" : instrumented,
          "message" : "",
          "debugMessage" : "(xhr status " + error.status + ") xhr.responseText: " + error.responseText,
          "stackTrace" : "",
          "isFatal" : n
        };
      }
      return result;
    }
    /**
     * @param {string} result
     * @param {!Object} r
     * @return {undefined}
     */
    function next(result, r) {
      var device;
      var code = result ? result.error : null;
      if (result = result || {}, op && op.PageStats && result.pageStats && op.PageStats.add(result.pageStats, handle_star), result.apiCanary && (event.apiCanary = result.apiCanary, delete result.apiCanary), result.telemetryContext ? ($ClientTelemetry.updateTelemetryContext(result.telemetryContext), delete result.telemetryContext) : result.tcxt && ($ClientTelemetry.updateTelemetryContext(result.tcxt), delete result.tcxt), result.error) {
        if (result.error.telemetryContext) {
          $ClientTelemetry.updateTelemetryContext(result.error.telemetryContext);
          delete result.error.telemetryContext;
        } else {
          if (result.error.tcxt) {
            $ClientTelemetry.updateTelemetryContext(result.error.tcxt);
            delete result.error.tcxt;
          }
        }
        device = result.error.stackTrace;
        device = device && device.encodeJson ? device.encodeJson() : "";
        /** @type {string} */
        var prev_arg = '{"code": "' + result.error.code + '", "message": "' + result.error.message + '", "debug": "' + result.error.debugMessage + '", "stacktrace": "' + device + '", "retriesLeft": "' + intervalType + '", "requestUrl": "' + value + '"}';
        args.push(prev_arg);
        if (args.length > iConfig) {
          args.shift();
        }
      }
      if (result.error && result.error.isRetriable && intervalType > 0) {
        if (clearTimeout) {
          clearTimeout();
        }
        if (existingWidget) {
          $ReportEvent.ReportApiCall({
            "apiId" : existingWidget,
            "errorCode" : result.error.code,
            "success" : false
          });
        }
        intervalType--;
        options.start();
      } else {
        if (result.error ? (clearTimeout && clearTimeout(options.failureReentranceDelay), result.error.code != code && (existingWidget && $ReportEvent.ReportApiCall({
          "apiId" : existingWidget,
          "errorCode" : result.error.code,
          "success" : false
        }), update(result, value), next && next(result, data), r.reject(result, data))) : (clearTimeout && clearTimeout(options.successReentranceDelay), existingWidget && $ReportEvent.ReportApiCall({
          "apiId" : existingWidget,
          "success" : true
        }), done && done(result, data), r.resolve(result, data)), options.apiId && options.propertyId) {
          var status = code ? code.code : void 0;
          if (Qos) {
            Qos.log(options.apiId, options.propertyId, handle_star, status, void 0, device);
          }
        }
      }
    }
    var options = this;
    /** @type {string} */
    var value = el;
    if (getLang(el)) {
      /** @type {null} */
      existingWidget = null;
    } else {
      value = el.url;
      existingWidget = el.apiId;
    }
    var ioRequest;
    var clearTimeout;
    var intervalType = void 0 !== month && null !== month ? month : delta;
    uri = uri || _baseURI;
    var handle_star;
    if (null === handled) {
      /** @type {boolean} */
      handled = false;
      if (event && event.isINT && event.isCorpnet) {
        /** @type {boolean} */
        handled = true;
      }
    }
    callback = callback || "key" + i++;
    /** @type {null} */
    options.originId = null;
    options.jsonpParameterName = void 0;
    /** @type {number} */
    options.successReentranceDelay = 0;
    /** @type {number} */
    options.failureReentranceDelay = 0;
    /** @type {string} */
    options.apiId = "";
    /** @type {string} */
    options.propertyId = "";
    /**
     * @return {?}
     */
    options.start = function() {
      var a = jQuery.Deferred();
      return self.requests.enqueue(function(clearFn) {
        /** @type {!AudioNode} */
        clearTimeout = clearFn;
        /** @type {number} */
        handle_star = (new Date).getTime();
        var inName;
        var fromValue = value;
        var headers = {
          "canary" : event.apiCanary,
          "Accept" : type
        };
        /** @type {number} */
        headers[realHeaderName] = 2;
        /** @type {string} */
        headers[id] = "xhr";
        callback(headers, topics, event.correlationId);
        callback(headers, warFilename, event.eipt);
        callback(headers, cellField, event.apiUseIpt ? "1" : null);
        callback(headers, identityRef, event.authz);
        match(headers, name, event.uiflvr);
        match(headers, key, event.scid);
        match(headers, index, event.hpgid);
        $ClientTelemetry.setHeaders(headers);
        /** @type {string} */
        var data = obj;
        if (obj && !getLang(obj)) {
          if (void 0 === obj[name] && void 0 !== event.uiflvr) {
            obj[name] = event.uiflvr;
          }
          var onClick = $ClientTelemetry.getUnauthSessionId();
          if (void 0 === obj[uid] && void 0 !== onClick) {
            obj[uid] = onClick;
          }
          if (void 0 === obj[key] && void 0 !== event.scid) {
            obj[key] = event.scid;
          }
          if (void 0 === obj[index] && void 0 !== event.hpgid) {
            obj[index] = event.hpgid;
          }
          /** @type {string} */
          data = JSON.stringify(obj);
        }
        return data && (data = data.replace(/\?/g, "\\u003F")), error && error.appendLog && error.appendLog("DataRequest(" + fromValue + ")"), ioRequest = jQuery.ajax({
          "url" : fromValue,
          "dataType" : "json",
          "jsonp" : options.jsonpParameterName,
          "jsonpCallback" : inName ? "wLive.Core.DataRequest." + inName : void 0,
          "data" : data,
          "processData" : false,
          "type" : data ? "POST" : "GET",
          "headers" : headers,
          "timeout" : uri
        }).done(function(e) {
          next(e, a);
        }).fail(function(ex, message, err) {
          next(get(ex, message, err), a);
        }), true;
      }, options.abort, callback), a.promise();
    };
    /**
     * @return {undefined}
     */
    options.abort = function() {
      if (ioRequest) {
        ioRequest.abort();
        /** @type {null} */
        ioRequest = null;
      }
      if (clearTimeout) {
        clearTimeout();
        /** @type {null} */
        clearTimeout = null;
      }
    };
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function humanize(value) {
    return value ? "<span style='font-weight: bold;'>" + value.toString().encodeHtml() + ":</span> " : "";
  }
  /**
   * @param {string} name
   * @param {string} value
   * @return {?}
   */
  function emit(name, value) {
    return value ? "<div>" + humanize(name) + value.toString().encodeHtml() + "</div>" : "";
  }
  /**
   * @param {string} text
   * @return {?}
   */
  function n(text) {
    /** @type {!Array} */
    var contactFields = [];
    if (text) {
      var parts = (text || "").split("\n");
      /** @type {number} */
      var i = 0;
      for (; i < parts.length; i++) {
        var anchor = parts[i];
        var scripts = (anchor || "").split("\\u000d");
        /** @type {number} */
        var s = 0;
        for (; s < scripts.length; s++) {
          var itemData = (scripts[s] || "").replace("\\u000a", "").replace("\\u0022", '"').replace("\\u0027", "'").replace("\\u0028", "(").replace("\\u0029", ")").replace("\\u003a", ":").replace("\\u003c", "&lt;").replace("\\u003d", "=").replace("\\u003e", "&gt;").replace("\\u005c", "\\");
          contactFields.push(itemData);
        }
      }
    }
    return contactFields;
  }
  /**
   * @param {!NodeList} url
   * @return {?}
   */
  function o(url) {
    /** @type {string} */
    var key = "";
    if (url) {
      /** @type {number} */
      var i = 0;
      for (; i < url.length; i++) {
        /** @type {string} */
        key = key + (url[i] + "\n");
      }
    }
    return key;
  }
  /**
   * @param {string} event
   * @param {string} p
   * @return {undefined}
   */
  function update(event, p) {
    if (handled && event && event.error && (event.error.stackTrace || event.error.debugMessage)) {
      var a = n(event.error.stackTrace);
      /** @type {null} */
      var b = null;
      if (event.error.isFatal || event.error.showError || commonIndex) {
        b = o(a);
        if (editor) {
          editor.showError(event.error.code, "ApiRequest Error: " + (event.error.message || ""), p || "<none>", null, null, null, b, event.error.debugMessage, event.error.data, event.error.isFatal ? "#FFC0C0" : "#C0FFFF", true);
        }
      } else {
        if (window.$Debug && error.scriptConsole) {
          var res = error.scriptConsole;
          b = o(a);
          res.errorHtml(emit("Url", p) + emit("Error Code", event.error.code) + (event.error.message ? emit("Message", event.error.message) : "") + (event.error.isFatal ? emit("Is Fatal", event.error.isFatal) : "") + (event.error.debugMessage ? emit("Debug", event.error.debugMessage) : ""), {
            "url" : p,
            "code" : event.error.code,
            "data" : event.error.data,
            "stackTrace" : a,
            "rsp" : event
          });
        }
      }
    }
  }
  /**
   * @param {string} node
   * @return {?}
   */
  function getLang(node) {
    return "string" === jQuery.type(node);
  }
  /** @type {!Window} */
  var self = window;
  var op = self.wLive;
  var data = op.Core;
  var event = self.$Config;
  var editor = self.$WebWatson;
  var error = self.$Debug || {};
  /** @type {string} */
  var name = "uiflvr";
  /** @type {string} */
  var key = "scid";
  /** @type {string} */
  var uid = "uaid";
  /** @type {string} */
  var index = "hpgid";
  /** @type {number} */
  var _baseURI = 3e4;
  /** @type {number} */
  var iTimeout = 8001;
  /** @type {number} */
  var code = 8002;
  /** @type {number} */
  var delta = 0;
  /** @type {string} */
  var cellField = "wlPreferIpt";
  /** @type {string} */
  var warFilename = "eipt";
  /** @type {string} */
  var identityRef = "authz";
  /** @type {string} */
  var topics = "x-ms-correlation-id";
  /** @type {string} */
  var realHeaderName = "x-ms-apiVersion";
  /** @type {string} */
  var id = "x-ms-apiTransport";
  /** @type {number} */
  var iConfig = 100;
  /** @type {string} */
  var type = "application/json";
  /** @type {number} */
  var i = 0;
  /** @type {null} */
  var existingWidget = null;
  /** @type {function(!Object, string, string, ?, !Object, number, ?, ?, number): undefined} */
  data.DataRequest = init;
  /** @type {!Array} */
  var args = data.DataRequest.Errors = [];
  data.DataRequest.ApiErrorCodes = self.$DataRequest.ApiErrorCodes = {
    "GeneralError" : "6000",
    "AuthFailure" : "6001",
    "InvalidArgs" : "6002",
    "Timeout" : iTimeout,
    "Aborted" : code
  };
  /** @type {null} */
  var handled = null;
  /** @type {boolean} */
  var commonIndex = false;
  /**
   * @param {boolean} i
   * @return {undefined}
   */
  init.forceShowErrors = function(i) {
    /** @type {boolean} */
    commonIndex = i;
  };
  if (self.$Do) {
    self.$Do.register("DataRequest", 0, true);
  }
});

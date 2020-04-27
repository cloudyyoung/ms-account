'use strict';
/**
 * @param {?} Brightness
 * @return {?}
 */
var GetHIPAMFE = function(Brightness) {
  var Y = Brightness;
  var inheritedOptions = Y.Renderer(arguments);
  return inheritedOptions;
};
var HIPAMFE = GetHIPAMFE(function() {
  /**
   * @return {?}
   */
  function render() {
    if (expect(self)) {
      alert("missing client HIP object");
      return false;
    }
    if (expect(self.holder) || expect(self.scriptHolder)) {
      alert("missing holder or scriptHolder in client HIP object");
      return false;
    }
    if (expect(self.postLoad)) {
      alert("missing postLoad in client HIP object");
      return false;
    }
    if (expect(self.left) || self.left < 0 || self.left > 1e3) {
      /** @type {number} */
      self.left = 0;
    }
    if (expect(self.done)) {
      /** @type {number} */
      self.done = 0;
    }
    if (expect(self.count)) {
      /** @type {number} */
      self.count = 0;
    }
    if (expect(self.type)) {
      /** @type {string} */
      self.type = "visual";
    }
    if (expect(self.style)) {
      /** @type {string} */
      self.style = "0";
    }
    if (expect(self.showInstruction)) {
      /** @type {boolean} */
      self.showInstruction = true;
    }
    if (expect(self.instructionsInside)) {
      /** @type {boolean} */
      self.instructionsInside = false;
    }
    if (expect(self.inputWidth) || self.inputWidth < 240) {
      /** @type {number} */
      self.inputWidth = 240;
    }
    if (expect(self.showMenu)) {
      /** @type {boolean} */
      self.showMenu = true;
    }
    if (expect(self.showHelp)) {
      /** @type {boolean} */
      self.showHelp = true;
    }
    if (expect(self.showError)) {
      /** @type {boolean} */
      self.showError = true;
    }
    if (expect(self.showAddAccountOption)) {
      /** @type {boolean} */
      self.showAddAccountOption = true;
    }
    if (expect(self.errorMessage)) {
      /** @type {string} */
      self.errorMessage = "";
    }
    if (expect(self.menuOutsideCallback)) {
      /**
       * @return {undefined}
       */
      self.menuOutsideCallback = function() {
      };
    }
    if (expect(self.instructionOutsideCallback)) {
      /**
       * @return {undefined}
       */
      self.instructionOutsideCallback = function() {
      };
    }
    if (expect(self.showErrorCallback)) {
      /**
       * @return {undefined}
       */
      self.showErrorCallback = function() {
      };
    }
    if (expect(self.removeErrorCallback)) {
      /**
       * @return {undefined}
       */
      self.removeErrorCallback = function() {
      };
    }
    if (expect(self.progressImg)) {
      /** @type {string} */
      self.progressImg = "";
    }
    if (expect(self.collectTelemetry)) {
      /** @type {boolean} */
      self.collectTelemetry = options.collectTelemetry.toUpperCase() === "TRUE";
    }
    if (expect(self.mapIPv4)) {
      /** @type {boolean} */
      self.mapIPv4 = options.mapIPv4 === "1";
    }
    if (expect(self.useQSRouting)) {
      /** @type {boolean} */
      self.useQSRouting = options.useQSRouting.toUpperCase() === "TRUE";
    }
    if (expect(self.cssSet)) {
      self.cssSet = {};
    }
    if (expect(self.cssSet.cssCdHIPLabel)) {
      /** @type {string} */
      self.cssSet.cssCdHIPLabel = "";
    }
    if (expect(self.cssSet.cssCdHIPMenu)) {
      /** @type {string} */
      self.cssSet.cssCdHIPMenu = "";
    }
    if (expect(self.cssSet.cssCdHIPLink)) {
      /** @type {string} */
      self.cssSet.cssCdHIPLink = "";
    }
    if (expect(self.cssSet.cssCdHIPError)) {
      /** @type {string} */
      self.cssSet.cssCdHIPError = "";
    }
    if (expect(self.cssSet.cssCdHIPErrorImg)) {
      /** @type {string} */
      self.cssSet.cssCdHIPErrorImg = "";
    }
    if (expect(self.cssSet.cssCdHIPInput)) {
      /** @type {string} */
      self.cssSet.cssCdHIPInput = "";
    }
    if (expect(self.cssSet.cssCdHIPLeft)) {
      /** @type {string} */
      self.cssSet.cssCdHIPLeft = "";
    }
    if (expect(self.cssSet.cssCdHIPButton)) {
      /** @type {string} */
      self.cssSet.cssCdHIPButton = "";
    }
    if (expect(self.cssSet.cssCdHIPList)) {
      /** @type {string} */
      self.cssSet.cssCdHIPList = "";
    }
    return true;
  }
  /**
   * @param {string} position
   * @return {?}
   */
  function createElement(position) {
    /** @type {!Element} */
    var b = document.createElement("a");
    /** @type {string} */
    b.href = position;
    var tmp = b.pathname;
    if (tmp.charAt(0) != "/") {
      /** @type {string} */
      tmp = "/" + tmp;
    }
    return tmp;
  }
  /**
   * @return {undefined}
   */
  function initialize() {
    /** @type {string} */
    self.comeinURL = "";
    /** @type {string} */
    var text = "";
    var head = $(self.scriptHolder);
    if (expect(head)) {
      return;
    }
    var f = head.getElementsByTagName("script");
    if (expect(f)) {
      return;
    }
    f = f[0];
    if (expect(f)) {
      return;
    }
    text = f.src;
    var indexOfParen = text.indexOf("?");
    if (indexOfParen == -1) {
      /** @type {string} */
      self.comeinURL = "";
    } else {
      self.urlAppPath = createElement(text);
      var id = text.substring(indexOfParen + 1, text.length);
      self.urlMkt = callback(id, "mkt", "&", "=");
      var node = callback(id, "type", "&", "=");
      self.type = node == null ? "visual" : node;
      self.urlFid = callback(id, "fid", "&", "=");
      self.urlId = callback(id, "id", "&", "=");
      self.urlCipt = callback(id, "cipt", "&", "=");
      self.urlRefr = callback(id, "refr", "&", "=");
      self.dataCenter = options.dataCenter;
      /**
       * @return {?}
       */
      self.constructURL = function() {
        /** @type {string} */
        var val = "https://";
        if (!self.useQSRouting && self.dataCenter) {
          /** @type {string} */
          val = val + (self.dataCenter + ".");
        }
        /** @type {string} */
        val = val + (options.baseUrl + self.urlAppPath + "?");
        if (self.dataCenter) {
          /** @type {string} */
          val = val + ("dc=" + self.dataCenter + "&");
        }
        if (self.urlMkt != null) {
          /** @type {string} */
          val = val + ("mkt=" + self.urlMkt + "&");
        }
        if (self.urlId != null) {
          /** @type {string} */
          val = val + ("id=" + self.urlId + "&");
        }
        if (self.urlCipt != null) {
          /** @type {string} */
          val = val + ("cipt=" + self.urlCipt + "&");
        }
        if (self.urlRefr != null) {
          /** @type {string} */
          val = val + ("refr=" + self.urlRefr + "&");
        }
        if (self.urlFid != null) {
          /** @type {string} */
          val = val + ("fid=" + self.urlFid);
        }
        return val;
      };
      self.comeinURL = self.constructURL();
    }
  }
  /**
   * @param {!Array} f
   * @return {?}
   */
  function init(f) {
    self = f[1];
    e = f[2];
    root = f[3](e, self);
    var ast = f[6];
    node = f[5](root, ast);
    prev = f[4](node);
    data = e.S;
    options = e.G;
    expect = root.UN;
    $ = root.E;
    callback = root.ETRT;
    render();
    initialize();
    if (typeof prev.RFS === "function") {
      /** @type {!Function} */
      self.reloadHIP = prev.RFS;
    }
    if (typeof prev.SWC === "function") {
      /** @type {!Function} */
      self.switchHIP = prev.SWC;
    }
    /**
     * @return {?}
     */
    self.getSolution = function() {
      return root.G();
    };
    /**
     * @return {?}
     */
    self.clientValidation = function() {
      return expect(node) ? "function(){}" : typeof node.CV === "function" ? node.CV() : void 0;
    };
    /**
     * @return {?}
     */
    self.setError = function() {
      return root.Ser();
    };
    /**
     * @return {?}
     */
    self.getError = function() {
      return root.Ger();
    };
    /**
     * @return {?}
     */
    self.setFocus = function() {
      return root.Fcs();
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    self.verify = function(a, b) {
      return root.VRY(a, b);
    };
    /**
     * @return {?}
     */
    self.getInstruction = function() {
      return root.Ins();
    };
    /**
     * @return {?}
     */
    self.getMenu = function() {
      return root.Men();
    };
    /**
     * @param {?} a
     * @return {undefined}
     */
    self.getHipDataResponse = function(a) {
      node.RES(a);
    };
    var x = prev.ACS;
    var s = prev.US;
    var dataset = prev.USL;
    /** @type {boolean} */
    self.done = false;
    /** @type {string} */
    $(self.holder).innerHTML = "";
    x();
    /** @type {!Element} */
    var i = document.createElement("div");
    i.innerHTML = s(node);
    $(self.holder).appendChild(i);
    dataset();
    /** @type {boolean} */
    self.done = true;
    var $allPanels = root.Men();
    if (!expect(self.menuOutsideCallback) && typeof self.menuOutsideCallback === "function") {
      self.menuOutsideCallback($allPanels);
    }
    var rc_epoch = node.INS();
    if (!expect(self.instructionOutsideCallback) && typeof self.instructionOutsideCallback === "function") {
      self.instructionOutsideCallback(rc_epoch);
    }
    if (self.collectTelemetry) {
      /** @type {!Element} */
      var e = document.createElement("script");
      /** @type {string} */
      e.type = "text/javascript";
      e.src = options.telemetryServerURL;
      var q = $(self.scriptHolder);
      q.appendChild(e);
    }
    self.postLoad();
    return self;
  }
  /** @type {string} */
  var r = "Renderer";
  var e = {};
  var self = {};
  var root = {};
  var prev = {};
  var node = {};
  var q = {};
  var expect = {};
  var $ = {};
  var callback = {};
  var data = {};
  var options = {};
  return {
    Renderer : init
  };
}(), HIPAMFE, {
  "G" : {
    "clientSetting" : "HIPAMFE",
    "hipToken" : "SCU.a06e8c20642941a383cd13bd1a47a654",
    "callback" : "GetHIPAMFE",
    "dataCenter" : "SCU",
    "baseUrl" : "client.hip.live.com",
    "useQSRouting" : "False",
    "hipChallengeUrl" : "https://SCU.client.hip.live.com:443/GetHIPData?hid=SCU.a06e8c20642941a383cd13bd1a47a654&fid=c6ffdcb91e764c5c997e1b3a2b94216f&id=15041&type=visual&cs=HIPAMFE",
    "imagePath" : "https://SCU.client.hip.live.com:443/Images/",
    "telemetryServerURL" : "https://client.hip.live.com:443/?SessionId=c6ffdcb91e764c5c997e1b3a2b94216f&SiteId=15041&PartnerId=15041&rand=SCU.a06e8c20642941a383cd13bd1a47a654",
    "collectTelemetry" : "False",
    "enableTest" : "0",
    "forTest" : "",
    "ispHipSolutionContainer" : "wlspispHipSolutionContainer",
    "ispHipControlButtonsContainer" : "wlspispHipControlButtonsContainer",
    "ispHipChallengeContainer" : "wlspispHipChallengeContainer",
    "ispHipInstructionContainer" : "wlspispHipInstructionContainer",
    "ispHIPErrorContainer" : "wlspispHIPErrorContainer",
    "ispSolutionElement" : "wlspispSolutionElement06b2c4c204ac45f2a730e76535997098",
    "ispHIPErrorWrong" : "wlspispHIPErrorWrongfd5c2fc3addc44889b3abab3f3cfca08",
    "ispHIPErrorEmpty" : "wlspispHIPErrorEmpty4c19e6d237814185bb3fa6f3ee6f731f",
    "ispHIPErrorTooLong" : "wlspispHIPErrorTooLong92da7d38717b4b0c8934aeea46828c35",
    "ispHIPErrorThrottle" : "wlspispHIPErrorThrottleff370da775b94285b27b52c79e7c9960",
    "ispHIPServiceUnavailable" : "wlspispHIPServiceUnavailablecb5f351eae064f64b76f6435fddcd8c2",
    "ispHIPCannotSendMessage" : "wlspispHIPCannotSendMessagefd4e710e0b2b4ee7a0c27b49037df60a",
    "ispHIPNeedAdditionalVerification" : "wlspispHIPNeedAdditionalVerification3daece96494e4f6595deb8c2ab1cbd0c",
    "ispHIPNew" : "wlspispHIPNew12f3ec71ec044c60a92ac94b6b4f5433",
    "ispHIPToV" : "wlspispHIPToV6dba33f60bb94402b70b194538692d92",
    "ispHIPToA" : "wlspispHIPToA8084f71a2a2c458ba0295289a1049637",
    "ispHipHtml5Audio" : "wlspispHipHtml5Audioaebac61cd1544dcd8b6d6a6ce4173ebd",
    "direction" : "ltr",
    "alignLeft" : "left",
    "alignRight" : "right",
    "f" : "HIPTF",
    "sf" : "HIPB",
    "imagenumber" : "1",
    "imagewidth" : "216",
    "imageheight" : "96",
    "ispContentId1" : "wlspispContentId191a28baf33a54235950026390d3db8f5",
    "ispContentId2" : "wlspispContentId2d258f4c47f1f4e71b8b2454cd8d175b7",
    "ispContentId3" : "wlspispContentId3228847afae364fb3bd2283a68b30ed47",
    "visualHipPattern" : "0",
    "scriptHipRunnerData" : "",
    "ispHIPBimg0" : "wlspispHIPBimg068de9d90464d4bb694623bf86b7fabcd",
    "ispHIPBimg1" : "wlspispHIPBimg112b0893eeab940db80730343a88f3381",
    "end" : ""
  },
  "S" : {
    "newLink" : "New",
    "toVisualLink" : "Picture",
    "toVisualTip" : "Switch to the visual challenge",
    "toAudioLink" : "Audio",
    "toAudioTip" : "Switch to the audio challenge",
    "eHIPThrottle" : "You've reached the limit for number of attempts. These limits help us protect against spam from automated programs. You can try again later.",
    "eTooLong" : "That is too many characters. Please try again.",
    "eNeedAdditionalVerification" : "We need an additional verification from you",
    "newTip" : "Get a new challenge",
    "eWrongAnswer" : "The characters didn't match the picture. Please try again.",
    "instruction" : "Enter the characters you see",
    "eInputEmpty" : "Please enter all of the characters you see.",
    "hipBTip" : "Image of Verification",
    "challengeTip" : "Visual Challenge",
    "end" : ""
  }
}, function(o, self) {
  /**
   * @param {!Object} data
   * @return {?}
   */
  function assert(data) {
    return typeof data === "undefined" || data === null;
  }
  /**
   * @param {?} query
   * @return {?}
   */
  function $(query) {
    try {
      return doc.getElementById(query);
    } catch (b) {
    }
  }
  /**
   * @param {string} src
   * @return {undefined}
   */
  function loadPartTwo(src) {
    /** @type {!Element} */
    var embedscript = doc.createElement("script");
    /** @type {string} */
    embedscript.type = "text/javascript";
    /** @type {string} */
    embedscript.src = src;
    var onPlanet = $(self.scriptHolder);
    /** @type {string} */
    onPlanet.innerHTML = "";
    onPlanet.appendChild(embedscript);
  }
  /**
   * @return {?}
   */
  function g() {
    /** @type {string} */
    var b = "";
    if (!assert(container.ispSolutionElement)) {
      b = $(container.ispSolutionElement).value;
      if (!assert(data.instruction) && data.instruction == b) {
        /** @type {string} */
        b = "";
      }
    }
    return b;
  }
  /**
   * @return {?}
   */
  function ask() {
    return container.hipToken;
  }
  /**
   * @return {?}
   */
  function format() {
    var cwdv = container.ispAddToAccount;
    /** @type {boolean} */
    var val = false;
    if (!assert(container.ispAddToAccount)) {
      var f = $(container.ispAddToAccount);
      if (!assert(f)) {
        val = f.checked;
      }
    }
    return val;
  }
  /**
   * @param {?} f
   * @param {?} a
   * @return {undefined}
   */
  function each(f, a) {
    var b = g();
    var event = ask();
    if (self.type == "sms") {
      var statements = format();
      self.addToAccount = statements;
    }
    if (typeof tmp.VRY === "function") {
      tmp.VRY(b, event, f, a);
    } else {
      if (typeof f === "function") {
        f(b, event, a);
      }
    }
    /** @type {boolean} */
    var f = typeof UserTracker === "undefined" || UserTracker === null;
    if (!f && self.error == 0) {
      UserTracker.destroy();
    }
  }
  /**
   * @param {string} f
   * @param {string} a
   * @param {string} b
   * @param {string} c
   * @return {?}
   */
  function y(f, a, b, c) {
    /** @type {null} */
    var x = null;
    if (!c) {
      /** @type {string} */
      c = "=";
    }
    var i = f.indexOf(a + c);
    if (0 == i) {
      i = i + (a.length + 1);
    } else {
      if (0 < i) {
        i = f.indexOf(b + a + c);
        if (0 < i) {
          i = i + (b.length + a.length + 1);
        }
      }
    }
    if (-1 != i) {
      var e = f.indexOf(b, i);
      if (-1 == e) {
        e = f.length;
      }
      x = f.substring(i, e);
    }
    return x;
  }
  /**
   * @param {?} text
   * @return {?}
   */
  function _validateInteger(text) {
    /** @type {number} */
    var i = parseInt(text);
    if (isNaN(i)) {
      /** @type {number} */
      i = 0;
    }
    return i;
  }
  /**
   * @param {string} hide
   * @return {?}
   */
  function _get_animation_classes(hide) {
    return hide.split("|");
  }
  /**
   * @return {undefined}
   */
  function processFeatures() {
    /** @type {number} */
    var c = 20;
    if (arguments.length == 1) {
      c = arguments[0];
    }
    insert();
    var a = g();
    if (a == null || a == "") {
      /** @type {number} */
      self.error = 2;
    } else {
      if (a.length > c) {
        /** @type {number} */
        self.error = 3;
      }
    }
  }
  /**
   * @param {!Object} event
   * @return {?}
   */
  function on(event) {
    if (event == null) {
      return null;
    }
    /** @type {null} */
    var el = null;
    if (event.srcElement) {
      el = event.srcElement;
    } else {
      el = event.target;
    }
    return el;
  }
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function add(event) {
    event = event || window.event;
    var status = on(event);
    if (status) {
      /** @type {string} */
      status.style.textAlign = "left";
      if (self.instructionsInside && status.value == data.instruction) {
        /** @type {string} */
        status.value = "";
      }
      var $ = self.showErrorCallback;
      if (typeof $ === "undefined" || $ === null) {
        return;
      }
      if (typeof $ === "function") {
        $(self.errorMessage);
      }
    }
  }
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function update(event) {
    event = event || window.event;
    var e = on(event);
    if (e) {
      if (self.instructionsInside && e.value == "") {
        e.style.textAlign = container.alignLeft;
        e.value = data.instruction;
      }
      var text = self.removeErrorCallback;
      if (typeof text === "undefined" || text === null) {
        return;
      }
      if (typeof text === "function") {
        text();
      }
    }
  }
  /**
   * @return {?}
   */
  function addButton() {
    $(container.ispSolutionElement).focus();
    return container.ispSolutionElement;
  }
  /**
   * @param {!Element} d
   * @return {undefined}
   */
  function buildThreads(d) {
    /** @type {string} */
    d.style.display = "inline";
    d.innerHTML = d.innerHTML;
  }
  /**
   * @param {!Element} sub
   * @return {undefined}
   */
  function f(sub) {
    /** @type {string} */
    sub.style.display = "none";
  }
  /**
   * @return {undefined}
   */
  function setTimeout() {
    if (typeof container.ispHIPErrorWrong != "undefined") {
      var result = $(container.ispHIPErrorWrong);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPErrorEmpty != "undefined") {
      result = $(container.ispHIPErrorEmpty);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPErrorTooLong != "undefined") {
      result = $(container.ispHIPErrorTooLong);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPErrorThrottle != "undefined") {
      result = $(container.ispHIPErrorThrottle);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPLimitExceeded != "undefined") {
      result = $(container.ispHIPLimitExceeded);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPInvalidRequest != "undefined") {
      result = $(container.ispHIPInvalidRequest);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPServiceUnavailable != "undefined") {
      result = $(container.ispHIPServiceUnavailable);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPCannotSendMessage != "undefined") {
      result = $(container.ispHIPCannotSendMessage);
      if (result != null) {
        f(result);
      }
    }
    if (typeof container.ispHIPNeedAdditionalVerification != "undefined") {
      result = $(container.ispHIPNeedAdditionalVerification);
      if (result != null) {
        f(result);
      }
    }
  }
  /**
   * @param {string} name
   * @return {undefined}
   */
  function create(name) {
    if (!assert(container.ispHIPErrorContainer)) {
      /** @type {string} */
      $(container.ispHIPErrorContainer).style.display = "block";
      setTimeout();
      if (container.ispHIPErrorWrong == name) {
        if (typeof container.ispHIPErrorWrong != "undefined") {
          var result = $(container.ispHIPErrorWrong);
          if (result != null) {
            buildThreads(result);
          }
        }
      } else {
        if (container.ispHIPErrorEmpty == name) {
          if (typeof container.ispHIPErrorEmpty != "undefined") {
            result = $(container.ispHIPErrorEmpty);
            if (result != null) {
              buildThreads(result);
            }
          }
        } else {
          if (container.ispHIPErrorTooLong == name) {
            if (typeof container.ispHIPErrorTooLong != "undefined") {
              result = $(container.ispHIPErrorTooLong);
              if (result != null) {
                buildThreads(result);
              }
            }
          } else {
            if (container.ispHIPErrorThrottle == name) {
              if (typeof container.ispHIPErrorThrottle != "undefined") {
                result = $(container.ispHIPErrorThrottle);
                if (result != null) {
                  buildThreads(result);
                }
              }
            } else {
              if (container.ispHIPLimitExceeded == name) {
                if (typeof container.ispHIPLimitExceeded != "undefined") {
                  result = $(container.ispHIPLimitExceeded);
                  if (result != null) {
                    buildThreads(result);
                  }
                }
              } else {
                if (container.ispHIPInvalidRequest == name) {
                  if (typeof container.ispHIPInvalidRequest != "undefined") {
                    result = $(container.ispHIPInvalidRequest);
                    if (result != null) {
                      buildThreads(result);
                    }
                  }
                } else {
                  if (container.ispHIPServiceUnavailable == name) {
                    if (typeof container.ispHIPServiceUnavailable != "undefined") {
                      result = $(container.ispHIPServiceUnavailable);
                      if (result != null) {
                        buildThreads(result);
                      }
                    }
                  } else {
                    if (container.ispHIPCannotSendMessage == name) {
                      if (typeof container.ispHIPCannotSendMessage != "undefined") {
                        result = $(container.ispHIPCannotSendMessage);
                        if (result != null) {
                          buildThreads(result);
                        }
                      }
                    } else {
                      if (container.ispHIPNeedAdditionalVerification == name) {
                        if (typeof container.ispHIPNeedAdditionalVerification != "undefined") {
                          result = $(container.ispHIPNeedAdditionalVerification);
                          if (result != null) {
                            buildThreads(result);
                          }
                        }
                      } else {
                        /** @type {string} */
                        $(container.ispHIPErrorContainer).style.display = "none";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function insert() {
    /** @type {number} */
    self.error = 0;
    create("");
  }
  /**
   * @return {?}
   */
  function showError() {
    /** @type {string} */
    var frame_id = "";
    /** @type {number} */
    var c = 0;
    /** @type {string} */
    self.errorMessage = "";
    if (self.error == 1) {
      /** @type {number} */
      c = 1;
      if (self.showError) {
        create(container.ispHIPErrorWrong);
      }
    } else {
      if (self.error == 2) {
        /** @type {number} */
        c = 1;
        if (self.showError) {
          create(container.ispHIPErrorEmpty);
        }
      } else {
        if (self.error == 3) {
          /** @type {number} */
          c = 1;
          if (self.showError) {
            create(container.ispHIPErrorTooLong);
          }
        } else {
          if (self.error == 4) {
            /** @type {number} */
            c = 1;
            if (self.showError) {
              create(container.ispHIPErrorThrottle);
            }
          } else {
            if (self.error == 5) {
              /** @type {number} */
              c = 1;
              if (self.showError) {
                create(container.ispHIPLimitExceeded);
              }
            } else {
              if (self.error == 6) {
                /** @type {number} */
                c = 1;
                if (self.showError) {
                  create(container.ispHIPInvalidRequest);
                }
              } else {
                if (self.error == 7) {
                  /** @type {number} */
                  c = 1;
                  if (self.showError) {
                    create(container.ispHIPServiceUnavailable);
                  }
                } else {
                  if (self.error == 8) {
                    /** @type {number} */
                    c = 1;
                    if (self.showError) {
                      create(container.ispHIPCannotSendMessage);
                    }
                  } else {
                    if (self.error == 9) {
                      /** @type {number} */
                      c = 1;
                      if (self.showError) {
                        create(container.ispHIPNeedAdditionalVerification);
                      }
                    } else {
                      create("");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (c == 1) {
      addButton();
    }
    if (!self.showError) {
      self.errorMessage = clone();
    }
    frame_id = container.ispSolutionElement;
    return frame_id;
  }
  /**
   * @return {?}
   */
  function clone() {
    /** @type {string} */
    var output = "";
    if (self.error == 1) {
      output = data.eWrongAnswer;
    } else {
      if (self.error == 2) {
        output = data.eInputEmpty;
      } else {
        if (self.error == 3) {
          output = data.eTooLong;
        } else {
          if (self.error == 4) {
            output = data.eHIPThrottle;
          } else {
            if (self.error == 5) {
              output = data.ispHIPLimitExceeded;
            } else {
              if (self.error == 6) {
                output = data.ispHIPInvalidRequest;
              } else {
                if (self.error == 7) {
                  output = data.ispHIPServiceUnavailable;
                } else {
                  if (self.error == 8) {
                    output = data.ispHIPCannotSendMessage;
                  } else {
                    if (self.error == 9) {
                      output = data.ispHIPNeedAdditionalVerification;
                    } else {
                      /** @type {string} */
                      output = "";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return output;
  }
  /**
   * @return {?}
   */
  function w() {
    return data.instruction;
  }
  /**
   * @return {?}
   */
  function append() {
    var s = self.style;
    if (s == "0" && typeof container.hipStyle != "undefined") {
      s = container.hipStyle;
    }
    if (s != "0" && s != "1" && s != "2") {
      /** @type {string} */
      s = "0";
    }
    return s;
  }
  /**
   * @return {?}
   */
  function createEl() {
    /** @type {!Array} */
    var sources = [];
    var pre = append();
    var filetype = self.type.toLowerCase();
    /**
     * @return {undefined}
     */
    var reset = function() {
      sources[0] = {};
      sources[0].text = data.newLink;
      sources[0].tip = data.newTip;
      /**
       * @return {undefined}
       */
      sources[0].trigger = function() {
        self.reloadHIP();
      };
      if (filetype == "visual") {
        sources[1] = {};
        sources[1].text = data.toAudioLink;
        sources[1].tip = data.toAudioTip;
        /**
         * @return {undefined}
         */
        sources[1].trigger = function() {
          self.switchHIP("audio");
        };
      } else {
        if (filetype == "audio") {
          sources[1] = {};
          sources[1].text = data.toVisualLink;
          sources[1].tip = data.toVisualTip;
          /**
           * @return {undefined}
           */
          sources[1].trigger = function() {
            self.switchHIP("visual");
          };
        }
      }
    };
    /**
     * @return {undefined}
     */
    var setAttributes = function() {
      sources[0] = {};
      sources[0].text = data.newLink;
      sources[0].tip = data.newTip;
      /**
       * @return {undefined}
       */
      sources[0].trigger = function() {
        self.reloadHIP();
      };
    };
    /**
     * @return {undefined}
     */
    var bindEv = function() {
    };
    switch(pre) {
      case "0":
        reset();
        break;
      case "1":
        setAttributes();
        break;
      case "2":
        bindEv();
        break;
      default:
        reset();
    }
    return sources;
  }
  /** @type {string} */
  var N = "Facade";
  /** @type {string} */
  var minRGB = "100";
  var M = {};
  var tmp = {};
  var container = o.G;
  var data = o.S;
  /** @type {!HTMLDocument} */
  var doc = document;
  var val = {
    N : N,
    V : minRGB,
    CP : o,
    CCP : self,
    M : M,
    S : tmp,
    MM : function(value) {
      /** @type {!Array} */
      M = value;
    },
    SS : function(expr) {
      /** @type {!Array} */
      tmp = expr;
    },
    G : g,
    UN : assert,
    E : $,
    Ser : showError,
    Ger : clone,
    S2D : _validateInteger,
    S2SS : _get_animation_classes,
    EvS : on,
    IPTF : add,
    IPTB : update,
    CV : processFeatures,
    ETRT : y,
    Fcs : addButton,
    VRY : each,
    APH : loadPartTwo,
    CDER : insert,
    Ins : w,
    Men : createEl,
    HSty : append
  };
  return val;
}, function(i18n) {
  /**
   * @return {?}
   */
  function deferredElementIdElements() {
    return i18n.INS();
  }
  /**
   * @return {undefined}
   */
  function showLoader() {
    /** @type {string} */
    var value = "";
    /** @type {!HTMLDocument} */
    var doc = document;
    if (!is(i18n) && !is(i18n.CS)) {
      value = value + i18n.CS();
    }
    if (value != "") {
      /** @type {!Element} */
      var node = doc.createElement("style");
      /** @type {string} */
      node.type = "text/css";
      if (node.styleSheet) {
        node.styleSheet.cssText = value;
      } else {
        /** @type {!Text} */
        var h = doc.createTextNode(value);
        node.appendChild(h);
      }
      $(options.holder).appendChild(node);
    }
  }
  /**
   * @param {?} type
   * @param {string} schema
   * @return {?}
   */
  function add(type, schema) {
    ++options.count;
    if (!is(schema)) {
      /** @type {string} */
      options.dataCenter = schema;
    } else {
      if (!is(type)) {
        var f = type.indexOf(".");
        if (f != -1) {
          options.dataCenter = type.substring(0, f);
        }
      }
    }
    if (!is(type)) {
      options.urlFid = type;
    }
    if (!is(type) || !is(schema)) {
      options.comeinURL = options.constructURL();
    }
    return options.comeinURL + "&type=" + options.type + "&c=" + options.count + "&rnd=" + Math.random();
  }
  /**
   * @param {number} tags
   * @param {?} name
   * @param {string} target
   * @return {undefined}
   */
  function filter(tags, name, target) {
    /** @type {boolean} */
    wlspHipRefreshed = true;
    var cb = self.APH;
    var prepareReturnResult = self.CDER;
    if (!is(i18n) && !is(i18n.INT) && i18n.INT()) {
      window.clearInterval(i18n.INT());
    }
    if (!is(i18n) && !is(i18n.AD) && i18n.AD) {
      i18n.STPS();
    }
    if (tags != 1) {
      prepareReturnResult();
    }
    if (is(i18n)) {
      return;
    }
    var result = add(name, target);
    cb(result);
  }
  /**
   * @param {string} name
   * @param {?} text
   * @param {string} obj
   * @return {undefined}
   */
  function callback(name, text, obj) {
    /** @type {string} */
    options.type = name;
    filter(null, text, obj);
  }
  var self = i18n.SUP;
  var data = self.CP;
  var options = self.CCP;
  var exports = data.G;
  var links = data.S;
  var $ = self.E;
  var is = self.UN;
  var V = self.V;
  /** @type {string} */
  var stars_len = "HIPTM";
  var N = i18n.N;
  /**
   * @return {?}
   */
  uiStream = function() {
    var inputWidth = options.inputWidth;
    /** @type {string} */
    var msg = "";
    var p = deferredElementIdElements();
    var is_horizontal = exports.direction;
    var jujulib = exports.alignLeft;
    var url = exports.alignRight;
    var el_left = options.left;
    var filetype = options.type.toLowerCase();
    var offline = options.preferButtons;
    /** @type {string} */
    var expected = "a";
    if (typeof offline != "undefined" && offline) {
      /** @type {string} */
      expected = "button";
    }
    var s = self.HSty();
    if (!is(i18n)) {
      var __ = i18n.US;
      if (!is(__)) {
        msg = __();
      }
    }
    /** @type {string} */
    var message = '<table role="presentation" cellspacing="0px" dir=' + is_horizontal + "><tr>";
    if (el_left != 0) {
      message = message + ('<td width="' + el_left + 'px" style="padding:0px;text-align:');
      message = message + url;
      message = message + ('" class="' + options.cssSet.cssCdHIPLeft + '" >');
      message = message + "</td>";
    }
    message = message + ('<td style="padding:0px;width:' + inputWidth + "px;text-align:" + jujulib + '" ><div style="padding:0 0 8px 0"  class="' + options.cssSet.cssCdHIPMenu + '" >');
    if (exports.enableTest == "1") {
      message = message + exports.forTest;
    }
    if (!options.instructionsInside && options.showInstruction) {
      message = message + ('<label for="' + exports.ispSolutionElement + '" id="' + exports.ispHipInstructionContainer + '">' + p + "</label>");
    }
    message = message + '<div style="';
    if (!options.showMenu) {
      message = message + "display: none;";
    }
    message = message + 'white-space: nowrap">';
    /**
     * @return {undefined}
     */
    var getInitialEditMode = function() {
      message = message + ("<" + expected + ' id="' + exports.ispHIPNew + '" role="button" href="" ></' + expected + '><b aria-hidden="true">&nbsp;|&nbsp;</b>');
      if (filetype == "visual") {
        /** @type {string} */
        message = message + ("<" + expected + ' id="' + exports.ispHIPToA + '" role="button" href="" ></' + expected + ">");
      } else {
        if (filetype == "audio") {
          /** @type {string} */
          message = message + ("<" + expected + ' id="' + exports.ispHIPToV + '" role="button" href="" ></' + expected + ">");
        }
      }
    };
    /**
     * @return {undefined}
     */
    var gotoNewOfflinePage = function() {
      message = message + ("<" + expected + ' id="' + exports.ispHIPNew + '" href="" ></' + expected + ">");
    };
    /**
     * @return {undefined}
     */
    var initSortMenu = function() {
    };
    switch(s) {
      case "0":
        getInitialEditMode();
        break;
      case "1":
        gotoNewOfflinePage();
        break;
      case "2":
        initSortMenu();
        break;
      default:
        getInitialEditMode();
    }
    message = message + "</div>";
    message = message + "</div></td></tr>";
    message = message + "</td></tr>";
    message = message + "<tr>";
    if (el_left != 0) {
      message = message + '<td aria-hidden="true" />';
    }
    message = message + ('<td style="padding:0px;text-align:' + jujulib + '" >' + msg + "</td></tr>");
    message = message + "</table>";
    return message;
  };
  /**
   * @return {undefined}
   */
  uiStreamLoaded = function() {
    var i = links.newLink;
    var total = links.newTip;
    var count = links.toVisualLink;
    var m = links.toVisualTip;
    var len = links.toAudioLink;
    var n = links.toAudioTip;
    var __n = i18n.USL;
    var matchesClassName = options.cssSet.cssCdHIPLink;
    var e = $(exports.ispHIPNew);
    if (e != null) {
      /**
       * @return {?}
       */
      e.onclick = function() {
        filter();
        return false;
      };
      e.className = matchesClassName;
      e.title = total;
      e.innerHTML = i;
    }
    e = $(exports.ispHIPToV);
    if (e != null) {
      /**
       * @return {?}
       */
      e.onclick = function() {
        callback("visual");
        return false;
      };
      e.className = matchesClassName;
      e.title = m;
      e.innerHTML = count;
    }
    e = $(exports.ispHIPToA);
    if (e != null) {
      /**
       * @return {?}
       */
      e.onclick = function() {
        callback("audio");
        return false;
      };
      e.className = matchesClassName;
      e.title = n;
      e.innerHTML = len;
    }
    if (typeof wlspHipRefreshed != "undefined" && wlspHipRefreshed) {
      $(exports.ispSolutionElement).focus();
    }
    __n();
  };
  var css = {
    N : stars_len,
    SN : N,
    US : uiStream,
    USL : uiStreamLoaded,
    ACS : showLoader,
    RFS : filter,
    SWC : callback
  };
  self.MM(css);
  return css;
}, function(item) {
  /**
   * @return {?}
   */
  function z() {
    return timezone;
  }
  /**
   * @param {number} o
   * @return {undefined}
   */
  function ctx(o) {
    /** @type {!Array} */
    hash = [];
    /** @type {!Array} */
    info = [];
    /** @type {number} */
    var i = 0;
    for (; i < o; i++) {
      hash[i] = data.ispHIPBimg0 + i;
      info[i] = data.ispHIPBimg1 + i;
    }
  }
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function togglePassword(e) {
    e = e || window.event;
    var result = jQuery(e);
    if (result) {
      var prop = result.id.slice(-1);
      /** @type {string} */
      $(hash[prop]).style.display = "inline";
      /** @type {string} */
      $(info[prop]).style.display = "none";
    }
  }
  /**
   * @return {?}
   */
  function execSync() {
    return evt.instruction;
  }
  /**
   * @return {?}
   */
  function update() {
    var tileset = item.CP.G;
    var S = item.CP.S;
    var groupsize = defaults.inputWidth;
    /** @type {number} */
    var dragstocreate = groupsize - 16;
    var whiteRating = parseInt(tileset.imagewidth);
    var pageInd = parseInt(tileset.imageheight);
    var num_subrows = parseInt(tileset.hipChallengeUrl);
    var callbackfn = deepEqual(tileset.imagenumber);
    var rmProfile = exec();
    /** @type {string} */
    var formattedTimestamp = "";
    if (suffix != "") {
      /** @type {string} */
      formattedTimestamp = "?vv=" + suffix;
    }
    ctx(callbackfn);
    /** @type {string} */
    var resp = '<table cellspacing=0 style="table-layout:fixed;width:' + groupsize + 'px" role="presentation" ><tr><td aria-hidden="true">';
    /** @type {string} */
    resp = resp + ('<div id="' + tileset.ispContentId1 + '" />');
    /** @type {string} */
    resp = resp + '</td></tr><tr><td aria-hidden="true" height="8px" />';
    /** @type {string} */
    resp = resp + "</tr>";
    /** @type {string} */
    resp = resp + ('<tr><td><table role="presentation"><tr id="' + tileset.ispHIPErrorContainer + '"  style="padding:0;display:none"><td class="' + defaults.cssSet.cssCdHIPErrorImg + '" style="padding:0 4px 0 0;width:16px" ><img src="' + rmProfile + "icon_err.gif" + formattedTimestamp + '" alt="" /></td><td style="padding:0px; width:' + dragstocreate + 'px" ><div role="alert" aria-live="assertive"><div id="' + tileset.ispHIPErrorEmpty + '" aria-label="' + S.eInputEmpty + '"></div><div id="' + tileset.ispHIPErrorTooLong + 
    '" aria-label="' + S.eTooLong + '"  ></div><div id="' + tileset.ispHIPErrorWrong + '" aria-label="' + S.eWrongAnswer + '"  ></div><div id="' + tileset.ispHIPNeedAdditionalVerification + '" aria-label="' + S.eNeedAdditionalVerification + '"  ></div><div id="' + tileset.ispHIPErrorThrottle + '" aria-label="' + S.eHIPThrottle + '"  ></div></div></td></tr></table></td></tr>');
    /** @type {string} */
    resp = resp + ('<tr><td style="padding:0px;"><input id="' + tileset.ispSolutionElement + '"  type="text" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" aria-label="' + S.instruction + '" /></td></tr>');
    /** @type {string} */
    resp = resp + "</table>";
    return resp;
  }
  /**
   * @return {?}
   */
  function CS() {
    return ".spHipNoClear::-ms-clear{display: none;}";
  }
  /**
   * @param {string} width
   * @param {!Object} text
   * @param {?} canvas
   * @return {?}
   */
  function create(width, text, canvas) {
    /**
     * @return {undefined}
     */
    function next() {
      /** @type {(Element|null)} */
      var w = document.getElementById(n);
      /** @type {number} */
      num = 0;
      for (; num < obj.d.length; num++) {
        /** @type {!Element} */
        var el = document.createElement("img");
        el.id = id + num;
        el.src = exec() + obj.b;
        /** @type {string} */
        el.style.position = "absolute";
        /** @type {string} */
        el.style.top = "0";
        /** @type {string} */
        el.style.left = "0";
        /** @type {string} */
        el.style.width = obj.imgsize.width + "px";
        /** @type {string} */
        el.style.height = obj.imgsize.height + "px";
        w.appendChild(el);
      }
    }
    /**
     * @return {undefined}
     */
    function f() {
      maxHeight = maxHeight + scrollbarHeight;
      if (maxHeight > obj.animationLength) {
        /** @type {number} */
        maxHeight = maxHeight % obj.animationLength;
      }
      /** @type {number} */
      num = 0;
      for (; num < obj.d.length; num++) {
        var p = $(obj.d[num], maxHeight / obj.animationLength);
        /** @type {(Element|null)} */
        var acDiv = document.getElementById(id + num);
        if (p[0] < 0 || p[0] > obj.size.width || p[1] < 0 || p[1] > obj.size.height) {
          /** @type {string} */
          acDiv.style.display = "none";
        } else {
          acDiv.style.left = p[0] + "px";
          acDiv.style.top = p[1] + "px";
        }
      }
    }
    /**
     * @param {!Array} o
     * @param {number} alpha
     * @return {?}
     */
    function $(o, alpha) {
      var b = o[6] - o[4] - o[0] + o[2];
      var delta = o[7] - o[5] - o[1] + o[3];
      /** @type {number} */
      var a = o[0] - o[2] - b;
      /** @type {number} */
      var visWidth = o[1] - o[3] - delta;
      /** @type {number} */
      var existingAlpha = o[4] - o[0];
      /** @type {number} */
      var amount = o[5] - o[1];
      var ms = o[2];
      var y = o[3];
      /** @type {!Array} */
      p = [];
      p[0] = b * Math.pow(alpha, 3) + a * Math.pow(alpha, 2) + existingAlpha * alpha + ms;
      p[1] = delta * Math.pow(alpha, 3) + visWidth * Math.pow(alpha, 2) + amount * alpha + y;
      return p;
    }
    /**
     * @return {?}
     */
    function resolve() {
      next();
      return setInterval(f, 2);
    }
    /** @type {string} */
    var n = width;
    /** @type {!Object} */
    var obj = text;
    var id = canvas;
    /** @type {number} */
    var scrollbarHeight = 55;
    /** @type {number} */
    var maxHeight = 0;
    return {
      run : resolve
    };
  }
  /**
   * @return {undefined}
   */
  function render() {
    var m = $(data.ispContentId1);
    /** @type {string} */
    m.innerHTML = "";
    /** @type {!Element} */
    var table = document.createElement("table");
    table.setAttribute("role", "presentation");
    m.appendChild(table);
    /** @type {string} */
    table.cellSpacing = "0";
    /** @type {!Element} */
    var tr = document.createElement("thead");
    /** @type {string} */
    tr.style.height = "0";
    /** @type {!Element} */
    var footer = document.createElement("tfoot");
    /** @type {string} */
    footer.style.height = "0";
    /** @type {!Element} */
    var body = document.createElement("tbody");
    table.appendChild(tr);
    table.appendChild(footer);
    table.appendChild(body);
    /** @type {!Element} */
    var container = document.createElement("tr");
    body.appendChild(container);
    if (data.visualHipPattern == "0") {
      init(container);
    } else {
      if (data.visualHipPattern == "1") {
        initLeaderboard(container);
      } else {
        if (data.visualHipPattern == "2") {
          init(container);
          initLeaderboard(container);
        } else {
          if (data.visualHipPattern == "3") {
            /** @type {string} */
            table.style.tableLayout = "fixed";
            /** @type {string} */
            table.style.width = defaults.inputWidth + "px";
            /** @type {!Element} */
            var td = document.createElement("col");
            table.appendChild(td);
            /** @type {string} */
            td.idth = data.scriptHipRunnerData.size.width + "px";
            /** @type {!Element} */
            td = document.createElement("col");
            table.appendChild(td);
            /** @type {string} */
            td.style.width = defaults.inputWidth - data.scriptHipRunnerData.size.width + "px";
            initLeaderboard(container);
            init(container);
          } else {
            if (data.visualHipPattern == "4") {
              init(container);
              /** @type {!Element} */
              var calloutExtraTableRow = document.createElement("tr");
              body.appendChild(calloutExtraTableRow);
              initLeaderboard(calloutExtraTableRow);
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Node} section
   * @return {undefined}
   */
  function init(section) {
    var lefts = parseInt(data.imagewidth);
    var d = parseInt(data.imageheight);
    var m = parseInt(data.hipChallengeUrl);
    var cmd = exec();
    var key = deepEqual(data.imagenumber);
    /** @type {string} */
    var url = "";
    if (suffix != "") {
      /** @type {string} */
      url = "?vv=" + suffix;
    }
    ctx(key);
    /** @type {number} */
    var i = 0;
    for (; i < key; i++) {
      /** @type {!Element} */
      var button = document.createElement("td");
      section.appendChild(button);
      /** @type {string} */
      button.style.verticalAlign = "middle";
      /** @type {string} */
      button.style.textAlign = "center";
      /** @type {string} */
      button.style.padding = "0";
      /** @type {string} */
      button.style.margin = "0";
      button.style.width = lefts[i] + "px";
      button.style.height = d[i] + "px";
      button.setAttribute("aria-hidden", "true");
      /** @type {!Element} */
      var result = document.createElement("img");
      button.appendChild(result);
      result.id = hash[i];
      /** @type {string} */
      result.style.display = "none";
      result.style.width = lefts[i] + "px";
      result.style.height = d[i] + "px";
      result.style.title = evt.hipBTip;
      result.setAttribute("aria-label", evt.challengeTip);
      result.alt = evt.challengeTip;
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      result.onload = function(e) {
        togglePassword(e);
      };
      result.src = m[i];
      /** @type {!Element} */
      result = document.createElement("img");
      button.appendChild(result);
      result.id = info[i];
      if (typeof defaults.progressImg == "string" && defaults.progressImg.length > 0) {
        /** @type {string} */
        result.src = defaults.progressImg;
      } else {
        /** @type {string} */
        result.src = cmd + "hig_progcircle_animated.gif" + url;
        /** @type {string} */
        result.alt = "";
      }
      /** @type {string} */
      result.style.display = "inline";
    }
  }
  /**
   * @param {!Element} section
   * @return {undefined}
   */
  function initLeaderboard(section) {
    var reflectionWidth = data.scriptHipRunnerData.size.width;
    var origH = data.scriptHipRunnerData.size.height;
    /** @type {!Element} */
    var b = document.createElement("td");
    section.appendChild(b);
    /** @type {string} */
    b.style.display = "inline";
    /** @type {string} */
    b.style.width = reflectionWidth + "px";
    /** @type {string} */
    b.style.height = origH + "px";
    /** @type {string} */
    b.style.position = "relative";
    /** @type {string} */
    b.style.padding = "0";
    /** @type {string} */
    b.style.margin = "0";
    /** @type {!Element} */
    var base = document.createElement("div");
    b.appendChild(base);
    base.id = data.ispContentId2;
    timezone = create(base.id, data.scriptHipRunnerData, data.ispContentId3).run();
  }
  /**
   * @return {undefined}
   */
  function initialize() {
    render();
    var inputWidth = defaults.inputWidth;
    var result = execSync();
    var options = $(data.ispHIPErrorEmpty);
    options.className = defaults.cssSet.cssCdHIPError;
    options.innerHTML = evt.eInputEmpty;
    options.style.textAlign = data.alignLeft;
    /** @type {string} */
    options.style.display = "none";
    options = $(data.ispHIPErrorTooLong);
    options.className = defaults.cssSet.cssCdHIPError;
    options.innerHTML = evt.eTooLong;
    options.style.textAlign = data.alignLeft;
    /** @type {string} */
    options.style.display = "none";
    options = $(data.ispHIPErrorWrong);
    options.className = defaults.cssSet.cssCdHIPError;
    options.innerHTML = evt.eWrongAnswer;
    options.style.textAlign = data.alignLeft;
    /** @type {string} */
    options.style.display = "none";
    options = $(data.ispHIPNeedAdditionalVerification);
    options.className = defaults.cssSet.cssCdHIPError;
    options.innerHTML = evt.eNeedAdditionalVerification;
    options.style.textAlign = data.alignLeft;
    /** @type {string} */
    options.style.display = "none";
    options = $(data.ispHIPErrorThrottle);
    options.className = defaults.cssSet.cssCdHIPError;
    options.innerHTML = evt.eHIPThrottle;
    options.style.textAlign = data.alignLeft;
    /** @type {string} */
    options.style.display = "none";
    options = $(data.ispSolutionElement);
    /** @type {string} */
    options.className = "spHipNoClear " + defaults.cssSet.cssCdHIPInput;
    /** @type {string} */
    options.style.borderWidth = "2px";
    /** @type {string} */
    options.style.direction = "ltr";
    /** @type {string} */
    options.style.width = inputWidth - 4 + "px";
    /** @type {string} */
    options.style.imeMode = "disabled";
    if (defaults.instructionsInside) {
      options.style.textAlign = data.alignLeft;
      options.value = result;
    } else {
      /** @type {string} */
      options.style.textAlign = "left";
    }
    /** @type {string} */
    options.style.padding = "0";
    /** @type {string} */
    options.style.margin = "0";
    var handler = this;
    options = $(data.ispSolutionElement);
    /**
     * @param {?} component
     * @return {undefined}
     */
    options.onfocus = function(component) {
      c.apply(handler, [component]);
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    options.onblur = function(event) {
      f.apply(handler, [event]);
    };
  }
  /**
   * @return {?}
   */
  function exec() {
    return data.imagePath;
  }
  /**
   * @return {undefined}
   */
  function testTimeoutsAreIncrementalForFactorsLessThanOne() {
    var b = this;
    var passed = deepEqual(data.imagenumber);
    u.apply(b, [passed * 20]);
  }
  /**
   * @param {?} file
   * @param {?} type
   * @param {?} callback
   * @param {?} files
   * @return {undefined}
   */
  function resize(file, type, callback, files) {
    if (typeof callback === "function") {
      callback(file, type, files);
    }
  }
  var opt = item.CP;
  var defaults = item.CCP;
  var data = opt.G;
  var evt = opt.S;
  var jQuery = item.EvS;
  var $ = item.E;
  var parseInt = item.S2SS;
  var deepEqual = item.S2D;
  var c = item.IPTF;
  var f = item.IPTB;
  var u = item.CV;
  var suffix = item.V;
  var I = this;
  /** @type {string} */
  var N = "HIPB";
  /** @type {!Array} */
  var hash = [];
  /** @type {!Array} */
  var info = [];
  /** @type {null} */
  var timezone = null;
  var ref = {
    N : N,
    US : update,
    USL : initialize,
    VRY : resize,
    CV : testTimeoutsAreIncrementalForFactorsLessThanOne,
    CS : CS,
    INS : execSync,
    INT : z,
    SUP : item
  };
  item.SS(ref);
  return ref;
}, function() {
});

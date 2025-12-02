(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
var Ra = { exports: {} },
  So = {},
  Ia = { exports: {} },
  M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fr = Symbol.for("react.element"),
  Gc = Symbol.for("react.portal"),
  Jc = Symbol.for("react.fragment"),
  Zc = Symbol.for("react.strict_mode"),
  ed = Symbol.for("react.profiler"),
  td = Symbol.for("react.provider"),
  nd = Symbol.for("react.context"),
  rd = Symbol.for("react.forward_ref"),
  od = Symbol.for("react.suspense"),
  id = Symbol.for("react.memo"),
  sd = Symbol.for("react.lazy"),
  al = Symbol.iterator;
function ld(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (al && e[al]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Da = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ja = Object.assign,
  La = {};
function wn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = La),
    (this.updater = n || Da);
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
wn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ma() {}
Ma.prototype = wn.prototype;
function us(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = La),
    (this.updater = n || Da);
}
var cs = (us.prototype = new Ma());
cs.constructor = us;
ja(cs, wn.prototype);
cs.isPureReactComponent = !0;
var ul = Array.isArray,
  za = Object.prototype.hasOwnProperty,
  ds = { current: null },
  $a = { key: !0, ref: !0, __self: !0, __source: !0 };
function Oa(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      za.call(t, r) && !$a.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: fr,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: ds.current,
  };
}
function ad(e, t) {
  return {
    $$typeof: fr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function fs(e) {
  return typeof e == "object" && e !== null && e.$$typeof === fr;
}
function ud(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var cl = /\/+/g;
function Bo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ud("" + e.key)
    : t.toString(36);
}
function Or(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case fr:
          case Gc:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (o = o(s)),
      (e = r === "" ? "." + Bo(s, 0) : r),
      ul(o)
        ? ((n = ""),
          e != null && (n = e.replace(cl, "$&/") + "/"),
          Or(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (fs(o) &&
            (o = ad(
              o,
              n +
                (!o.key || (s && s.key === o.key)
                  ? ""
                  : ("" + o.key).replace(cl, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), ul(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var a = r + Bo(i, l);
      s += Or(i, t, n, a, o);
    }
  else if (((a = ld(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(i = e.next()).done; )
      (i = i.value), (a = r + Bo(i, l++)), (s += Or(i, t, n, a, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function _r(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Or(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function cd(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ge = { current: null },
  Ur = { transition: null },
  dd = {
    ReactCurrentDispatcher: ge,
    ReactCurrentBatchConfig: Ur,
    ReactCurrentOwner: ds,
  };
function Ua() {
  throw Error("act(...) is not supported in production builds of React.");
}
M.Children = {
  map: _r,
  forEach: function (e, t, n) {
    _r(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      _r(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      _r(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!fs(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
M.Component = wn;
M.Fragment = Jc;
M.Profiler = ed;
M.PureComponent = us;
M.StrictMode = Zc;
M.Suspense = od;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dd;
M.act = Ua;
M.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = ja({}, e.props),
    o = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = ds.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      za.call(t, a) &&
        !$a.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: fr, type: e.type, key: o, ref: i, props: r, _owner: s };
};
M.createContext = function (e) {
  return (
    (e = {
      $$typeof: nd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: td, _context: e }),
    (e.Consumer = e)
  );
};
M.createElement = Oa;
M.createFactory = function (e) {
  var t = Oa.bind(null, e);
  return (t.type = e), t;
};
M.createRef = function () {
  return { current: null };
};
M.forwardRef = function (e) {
  return { $$typeof: rd, render: e };
};
M.isValidElement = fs;
M.lazy = function (e) {
  return { $$typeof: sd, _payload: { _status: -1, _result: e }, _init: cd };
};
M.memo = function (e, t) {
  return { $$typeof: id, type: e, compare: t === void 0 ? null : t };
};
M.startTransition = function (e) {
  var t = Ur.transition;
  Ur.transition = {};
  try {
    e();
  } finally {
    Ur.transition = t;
  }
};
M.unstable_act = Ua;
M.useCallback = function (e, t) {
  return ge.current.useCallback(e, t);
};
M.useContext = function (e) {
  return ge.current.useContext(e);
};
M.useDebugValue = function () {};
M.useDeferredValue = function (e) {
  return ge.current.useDeferredValue(e);
};
M.useEffect = function (e, t) {
  return ge.current.useEffect(e, t);
};
M.useId = function () {
  return ge.current.useId();
};
M.useImperativeHandle = function (e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
M.useInsertionEffect = function (e, t) {
  return ge.current.useInsertionEffect(e, t);
};
M.useLayoutEffect = function (e, t) {
  return ge.current.useLayoutEffect(e, t);
};
M.useMemo = function (e, t) {
  return ge.current.useMemo(e, t);
};
M.useReducer = function (e, t, n) {
  return ge.current.useReducer(e, t, n);
};
M.useRef = function (e) {
  return ge.current.useRef(e);
};
M.useState = function (e) {
  return ge.current.useState(e);
};
M.useSyncExternalStore = function (e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
M.useTransition = function () {
  return ge.current.useTransition();
};
M.version = "18.3.1";
Ia.exports = M;
var I = Ia.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fd = I,
  hd = Symbol.for("react.element"),
  pd = Symbol.for("react.fragment"),
  gd = Object.prototype.hasOwnProperty,
  md = fd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  vd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Aa(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) gd.call(t, r) && !vd.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: hd,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: md.current,
  };
}
So.Fragment = pd;
So.jsx = Aa;
So.jsxs = Aa;
Ra.exports = So;
var y = Ra.exports,
  Fa = { exports: {} },
  Te = {},
  Ha = { exports: {} },
  Ba = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, j) {
    var L = E.length;
    E.push(j);
    e: for (; 0 < L; ) {
      var q = (L - 1) >>> 1,
        ne = E[q];
      if (0 < o(ne, j)) (E[q] = j), (E[L] = ne), (L = q);
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var j = E[0],
      L = E.pop();
    if (L !== j) {
      E[0] = L;
      e: for (var q = 0, ne = E.length, vr = ne >>> 1; q < vr; ) {
        var Pt = 2 * (q + 1) - 1,
          Ho = E[Pt],
          Tt = Pt + 1,
          yr = E[Tt];
        if (0 > o(Ho, L))
          Tt < ne && 0 > o(yr, Ho)
            ? ((E[q] = yr), (E[Tt] = L), (q = Tt))
            : ((E[q] = Ho), (E[Pt] = L), (q = Pt));
        else if (Tt < ne && 0 > o(yr, L)) (E[q] = yr), (E[Tt] = L), (q = Tt);
        else break e;
      }
    }
    return j;
  }
  function o(E, j) {
    var L = E.sortIndex - j.sortIndex;
    return L !== 0 ? L : E.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    f = 1,
    h = null,
    g = 3,
    _ = !1,
    m = !1,
    w = !1,
    R = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(E) {
    for (var j = n(u); j !== null; ) {
      if (j.callback === null) r(u);
      else if (j.startTime <= E)
        r(u), (j.sortIndex = j.expirationTime), t(a, j);
      else break;
      j = n(u);
    }
  }
  function S(E) {
    if (((w = !1), p(E), !m))
      if (n(a) !== null) (m = !0), Ao(x);
      else {
        var j = n(u);
        j !== null && Fo(S, j.startTime - E);
      }
  }
  function x(E, j) {
    (m = !1), w && ((w = !1), d(N), (N = -1)), (_ = !0);
    var L = g;
    try {
      for (
        p(j), h = n(a);
        h !== null && (!(h.expirationTime > j) || (E && !ze()));

      ) {
        var q = h.callback;
        if (typeof q == "function") {
          (h.callback = null), (g = h.priorityLevel);
          var ne = q(h.expirationTime <= j);
          (j = e.unstable_now()),
            typeof ne == "function" ? (h.callback = ne) : h === n(a) && r(a),
            p(j);
        } else r(a);
        h = n(a);
      }
      if (h !== null) var vr = !0;
      else {
        var Pt = n(u);
        Pt !== null && Fo(S, Pt.startTime - j), (vr = !1);
      }
      return vr;
    } finally {
      (h = null), (g = L), (_ = !1);
    }
  }
  var P = !1,
    T = null,
    N = -1,
    X = 5,
    z = -1;
  function ze() {
    return !(e.unstable_now() - z < X);
  }
  function xn() {
    if (T !== null) {
      var E = e.unstable_now();
      z = E;
      var j = !0;
      try {
        j = T(!0, E);
      } finally {
        j ? En() : ((P = !1), (T = null));
      }
    } else P = !1;
  }
  var En;
  if (typeof c == "function")
    En = function () {
      c(xn);
    };
  else if (typeof MessageChannel < "u") {
    var ll = new MessageChannel(),
      Yc = ll.port2;
    (ll.port1.onmessage = xn),
      (En = function () {
        Yc.postMessage(null);
      });
  } else
    En = function () {
      R(xn, 0);
    };
  function Ao(E) {
    (T = E), P || ((P = !0), En());
  }
  function Fo(E, j) {
    N = R(function () {
      E(e.unstable_now());
    }, j);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || _ || ((m = !0), Ao(x));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (X = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (E) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = g;
      }
      var L = g;
      g = j;
      try {
        return E();
      } finally {
        g = L;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, j) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var L = g;
      g = E;
      try {
        return j();
      } finally {
        g = L;
      }
    }),
    (e.unstable_scheduleCallback = function (E, j, L) {
      var q = e.unstable_now();
      switch (
        (typeof L == "object" && L !== null
          ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? q + L : q))
          : (L = q),
        E)
      ) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return (
        (ne = L + ne),
        (E = {
          id: f++,
          callback: j,
          priorityLevel: E,
          startTime: L,
          expirationTime: ne,
          sortIndex: -1,
        }),
        L > q
          ? ((E.sortIndex = L),
            t(u, E),
            n(a) === null &&
              E === n(u) &&
              (w ? (d(N), (N = -1)) : (w = !0), Fo(S, L - q)))
          : ((E.sortIndex = ne), t(a, E), m || _ || ((m = !0), Ao(x))),
        E
      );
    }),
    (e.unstable_shouldYield = ze),
    (e.unstable_wrapCallback = function (E) {
      var j = g;
      return function () {
        var L = g;
        g = j;
        try {
          return E.apply(this, arguments);
        } finally {
          g = L;
        }
      };
    });
})(Ba);
Ha.exports = Ba;
var yd = Ha.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _d = I,
  Pe = yd;
function k(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Wa = new Set(),
  Kn = {};
function Wt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Kn[e] = t, e = 0; e < t.length; e++) Wa.add(t[e]);
}
var tt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  mi = Object.prototype.hasOwnProperty,
  wd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  dl = {},
  fl = {};
function Sd(e) {
  return mi.call(fl, e)
    ? !0
    : mi.call(dl, e)
    ? !1
    : wd.test(e)
    ? (fl[e] = !0)
    : ((dl[e] = !0), !1);
}
function kd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Cd(e, t, n, r) {
  if (t === null || typeof t > "u" || kd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function me(e, t, n, r, o, i, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s);
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    le[e] = new me(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  le[t] = new me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  le[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  le[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    le[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  le[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  le[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  le[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  le[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var hs = /[\-:]([a-z])/g;
function ps(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(hs, ps);
    le[t] = new me(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(hs, ps);
    le[t] = new me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(hs, ps);
  le[t] = new me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  le[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new me(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  le[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function gs(e, t, n, r) {
  var o = le.hasOwnProperty(t) ? le[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Cd(t, n, o, r) && (n = null),
    r || o === null
      ? Sd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var it = _d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  wr = Symbol.for("react.element"),
  bt = Symbol.for("react.portal"),
  Kt = Symbol.for("react.fragment"),
  ms = Symbol.for("react.strict_mode"),
  vi = Symbol.for("react.profiler"),
  Va = Symbol.for("react.provider"),
  Qa = Symbol.for("react.context"),
  vs = Symbol.for("react.forward_ref"),
  yi = Symbol.for("react.suspense"),
  _i = Symbol.for("react.suspense_list"),
  ys = Symbol.for("react.memo"),
  lt = Symbol.for("react.lazy"),
  ba = Symbol.for("react.offscreen"),
  hl = Symbol.iterator;
function Pn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (hl && e[hl]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var b = Object.assign,
  Wo;
function Mn(e) {
  if (Wo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Wo = (t && t[1]) || "";
    }
  return (
    `
` +
    Wo +
    e
  );
}
var Vo = !1;
function Qo(e, t) {
  if (!e || Vo) return "";
  Vo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          s = o.length - 1,
          l = i.length - 1;
        1 <= s && 0 <= l && o[s] !== i[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (o[s] !== i[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || o[s] !== i[l])) {
                var a =
                  `
` + o[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (Vo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Mn(e) : "";
}
function xd(e) {
  switch (e.tag) {
    case 5:
      return Mn(e.type);
    case 16:
      return Mn("Lazy");
    case 13:
      return Mn("Suspense");
    case 19:
      return Mn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Qo(e.type, !1)), e;
    case 11:
      return (e = Qo(e.type.render, !1)), e;
    case 1:
      return (e = Qo(e.type, !0)), e;
    default:
      return "";
  }
}
function wi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Kt:
      return "Fragment";
    case bt:
      return "Portal";
    case vi:
      return "Profiler";
    case ms:
      return "StrictMode";
    case yi:
      return "Suspense";
    case _i:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Qa:
        return (e.displayName || "Context") + ".Consumer";
      case Va:
        return (e._context.displayName || "Context") + ".Provider";
      case vs:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ys:
        return (
          (t = e.displayName || null), t !== null ? t : wi(e.type) || "Memo"
        );
      case lt:
        (t = e._payload), (e = e._init);
        try {
          return wi(e(t));
        } catch {}
    }
  return null;
}
function Ed(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return wi(t);
    case 8:
      return t === ms ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function St(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ka(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Pd(e) {
  var t = Ka(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (s) {
          (r = "" + s), i.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Sr(e) {
  e._valueTracker || (e._valueTracker = Pd(e));
}
function Xa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Ka(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function qr(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Si(e, t) {
  var n = t.checked;
  return b({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function pl(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = St(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function qa(e, t) {
  (t = t.checked), t != null && gs(e, "checked", t, !1);
}
function ki(e, t) {
  qa(e, t);
  var n = St(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Ci(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ci(e, t.type, St(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function gl(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Ci(e, t, n) {
  (t !== "number" || qr(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zn = Array.isArray;
function on(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + St(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function xi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return b({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function ml(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(k(92));
      if (zn(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: St(n) };
}
function Ya(e, t) {
  var n = St(t.value),
    r = St(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function vl(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ga(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ei(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ga(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var kr,
  Ja = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        kr = kr || document.createElement("div"),
          kr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = kr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Xn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Un = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Td = ["Webkit", "ms", "Moz", "O"];
Object.keys(Un).forEach(function (e) {
  Td.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Un[t] = Un[e]);
  });
});
function Za(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Un.hasOwnProperty(e) && Un[e])
    ? ("" + t).trim()
    : t + "px";
}
function eu(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = Za(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var Nd = b(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Pi(e, t) {
  if (t) {
    if (Nd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function Ti(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ni = null;
function _s(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ri = null,
  sn = null,
  ln = null;
function yl(e) {
  if ((e = gr(e))) {
    if (typeof Ri != "function") throw Error(k(280));
    var t = e.stateNode;
    t && ((t = Po(t)), Ri(e.stateNode, e.type, t));
  }
}
function tu(e) {
  sn ? (ln ? ln.push(e) : (ln = [e])) : (sn = e);
}
function nu() {
  if (sn) {
    var e = sn,
      t = ln;
    if (((ln = sn = null), yl(e), t)) for (e = 0; e < t.length; e++) yl(t[e]);
  }
}
function ru(e, t) {
  return e(t);
}
function ou() {}
var bo = !1;
function iu(e, t, n) {
  if (bo) return e(t, n);
  bo = !0;
  try {
    return ru(e, t, n);
  } finally {
    (bo = !1), (sn !== null || ln !== null) && (ou(), nu());
  }
}
function qn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Po(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var Ii = !1;
if (tt)
  try {
    var Tn = {};
    Object.defineProperty(Tn, "passive", {
      get: function () {
        Ii = !0;
      },
    }),
      window.addEventListener("test", Tn, Tn),
      window.removeEventListener("test", Tn, Tn);
  } catch {
    Ii = !1;
  }
function Rd(e, t, n, r, o, i, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (f) {
    this.onError(f);
  }
}
var An = !1,
  Yr = null,
  Gr = !1,
  Di = null,
  Id = {
    onError: function (e) {
      (An = !0), (Yr = e);
    },
  };
function Dd(e, t, n, r, o, i, s, l, a) {
  (An = !1), (Yr = null), Rd.apply(Id, arguments);
}
function jd(e, t, n, r, o, i, s, l, a) {
  if ((Dd.apply(this, arguments), An)) {
    if (An) {
      var u = Yr;
      (An = !1), (Yr = null);
    } else throw Error(k(198));
    Gr || ((Gr = !0), (Di = u));
  }
}
function Vt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function su(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function _l(e) {
  if (Vt(e) !== e) throw Error(k(188));
}
function Ld(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Vt(e)), t === null)) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return _l(o), e;
        if (i === r) return _l(o), t;
        i = i.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var s = !1, l = o.child; l; ) {
        if (l === n) {
          (s = !0), (n = o), (r = i);
          break;
        }
        if (l === r) {
          (s = !0), (r = o), (n = i);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = i.child; l; ) {
          if (l === n) {
            (s = !0), (n = i), (r = o);
            break;
          }
          if (l === r) {
            (s = !0), (r = i), (n = o);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function lu(e) {
  return (e = Ld(e)), e !== null ? au(e) : null;
}
function au(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = au(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var uu = Pe.unstable_scheduleCallback,
  wl = Pe.unstable_cancelCallback,
  Md = Pe.unstable_shouldYield,
  zd = Pe.unstable_requestPaint,
  Y = Pe.unstable_now,
  $d = Pe.unstable_getCurrentPriorityLevel,
  ws = Pe.unstable_ImmediatePriority,
  cu = Pe.unstable_UserBlockingPriority,
  Jr = Pe.unstable_NormalPriority,
  Od = Pe.unstable_LowPriority,
  du = Pe.unstable_IdlePriority,
  ko = null,
  Xe = null;
function Ud(e) {
  if (Xe && typeof Xe.onCommitFiberRoot == "function")
    try {
      Xe.onCommitFiberRoot(ko, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var He = Math.clz32 ? Math.clz32 : Hd,
  Ad = Math.log,
  Fd = Math.LN2;
function Hd(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Ad(e) / Fd) | 0)) | 0;
}
var Cr = 64,
  xr = 4194304;
function $n(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Zr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~o;
    l !== 0 ? (r = $n(l)) : ((i &= s), i !== 0 && (r = $n(i)));
  } else (s = n & ~o), s !== 0 ? (r = $n(s)) : i !== 0 && (r = $n(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - He(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Bd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Wd(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var s = 31 - He(i),
      l = 1 << s,
      a = o[s];
    a === -1
      ? (!(l & n) || l & r) && (o[s] = Bd(l, t))
      : a <= t && (e.expiredLanes |= l),
      (i &= ~l);
  }
}
function ji(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function fu() {
  var e = Cr;
  return (Cr <<= 1), !(Cr & 4194240) && (Cr = 64), e;
}
function Ko(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function hr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - He(t)),
    (e[t] = n);
}
function Vd(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - He(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function Ss(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - He(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var O = 0;
function hu(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var pu,
  ks,
  gu,
  mu,
  vu,
  Li = !1,
  Er = [],
  ht = null,
  pt = null,
  gt = null,
  Yn = new Map(),
  Gn = new Map(),
  ut = [],
  Qd =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Sl(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      pt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
      break;
    case "pointerover":
    case "pointerout":
      Yn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Gn.delete(t.pointerId);
  }
}
function Nn(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = gr(t)), t !== null && ks(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function bd(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (ht = Nn(ht, e, t, n, r, o)), !0;
    case "dragenter":
      return (pt = Nn(pt, e, t, n, r, o)), !0;
    case "mouseover":
      return (gt = Nn(gt, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return Yn.set(i, Nn(Yn.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), Gn.set(i, Nn(Gn.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function yu(e) {
  var t = It(e.target);
  if (t !== null) {
    var n = Vt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = su(n)), t !== null)) {
          (e.blockedOn = t),
            vu(e.priority, function () {
              gu(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ar(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Mi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Ni = r), n.target.dispatchEvent(r), (Ni = null);
    } else return (t = gr(n)), t !== null && ks(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function kl(e, t, n) {
  Ar(e) && n.delete(t);
}
function Kd() {
  (Li = !1),
    ht !== null && Ar(ht) && (ht = null),
    pt !== null && Ar(pt) && (pt = null),
    gt !== null && Ar(gt) && (gt = null),
    Yn.forEach(kl),
    Gn.forEach(kl);
}
function Rn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Li ||
      ((Li = !0),
      Pe.unstable_scheduleCallback(Pe.unstable_NormalPriority, Kd)));
}
function Jn(e) {
  function t(o) {
    return Rn(o, e);
  }
  if (0 < Er.length) {
    Rn(Er[0], e);
    for (var n = 1; n < Er.length; n++) {
      var r = Er[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    ht !== null && Rn(ht, e),
      pt !== null && Rn(pt, e),
      gt !== null && Rn(gt, e),
      Yn.forEach(t),
      Gn.forEach(t),
      n = 0;
    n < ut.length;
    n++
  )
    (r = ut[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && ((n = ut[0]), n.blockedOn === null); )
    yu(n), n.blockedOn === null && ut.shift();
}
var an = it.ReactCurrentBatchConfig,
  eo = !0;
function Xd(e, t, n, r) {
  var o = O,
    i = an.transition;
  an.transition = null;
  try {
    (O = 1), Cs(e, t, n, r);
  } finally {
    (O = o), (an.transition = i);
  }
}
function qd(e, t, n, r) {
  var o = O,
    i = an.transition;
  an.transition = null;
  try {
    (O = 4), Cs(e, t, n, r);
  } finally {
    (O = o), (an.transition = i);
  }
}
function Cs(e, t, n, r) {
  if (eo) {
    var o = Mi(e, t, n, r);
    if (o === null) ri(e, t, r, to, n), Sl(e, r);
    else if (bd(o, e, t, n, r)) r.stopPropagation();
    else if ((Sl(e, r), t & 4 && -1 < Qd.indexOf(e))) {
      for (; o !== null; ) {
        var i = gr(o);
        if (
          (i !== null && pu(i),
          (i = Mi(e, t, n, r)),
          i === null && ri(e, t, r, to, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else ri(e, t, r, null, n);
  }
}
var to = null;
function Mi(e, t, n, r) {
  if (((to = null), (e = _s(r)), (e = It(e)), e !== null))
    if (((t = Vt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = su(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (to = e), null;
}
function _u(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch ($d()) {
        case ws:
          return 1;
        case cu:
          return 4;
        case Jr:
        case Od:
          return 16;
        case du:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null,
  xs = null,
  Fr = null;
function wu() {
  if (Fr) return Fr;
  var e,
    t = xs,
    n = t.length,
    r,
    o = "value" in dt ? dt.value : dt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
  return (Fr = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Hr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Pr() {
  return !0;
}
function Cl() {
  return !1;
}
function Ne(e) {
  function t(n, r, o, i, s) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Pr
        : Cl),
      (this.isPropagationStopped = Cl),
      this
    );
  }
  return (
    b(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Pr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Pr));
      },
      persist: function () {},
      isPersistent: Pr,
    }),
    t
  );
}
var Sn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Es = Ne(Sn),
  pr = b({}, Sn, { view: 0, detail: 0 }),
  Yd = Ne(pr),
  Xo,
  qo,
  In,
  Co = b({}, pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ps,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== In &&
            (In && e.type === "mousemove"
              ? ((Xo = e.screenX - In.screenX), (qo = e.screenY - In.screenY))
              : (qo = Xo = 0),
            (In = e)),
          Xo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : qo;
    },
  }),
  xl = Ne(Co),
  Gd = b({}, Co, { dataTransfer: 0 }),
  Jd = Ne(Gd),
  Zd = b({}, pr, { relatedTarget: 0 }),
  Yo = Ne(Zd),
  ef = b({}, Sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  tf = Ne(ef),
  nf = b({}, Sn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  rf = Ne(nf),
  of = b({}, Sn, { data: 0 }),
  El = Ne(of),
  sf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  lf = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  af = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function uf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = af[e]) ? !!t[e] : !1;
}
function Ps() {
  return uf;
}
var cf = b({}, pr, {
    key: function (e) {
      if (e.key) {
        var t = sf[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Hr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? lf[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ps,
    charCode: function (e) {
      return e.type === "keypress" ? Hr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Hr(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  df = Ne(cf),
  ff = b({}, Co, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Pl = Ne(ff),
  hf = b({}, pr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ps,
  }),
  pf = Ne(hf),
  gf = b({}, Sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  mf = Ne(gf),
  vf = b({}, Co, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  yf = Ne(vf),
  _f = [9, 13, 27, 32],
  Ts = tt && "CompositionEvent" in window,
  Fn = null;
tt && "documentMode" in document && (Fn = document.documentMode);
var wf = tt && "TextEvent" in window && !Fn,
  Su = tt && (!Ts || (Fn && 8 < Fn && 11 >= Fn)),
  Tl = " ",
  Nl = !1;
function ku(e, t) {
  switch (e) {
    case "keyup":
      return _f.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Cu(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Xt = !1;
function Sf(e, t) {
  switch (e) {
    case "compositionend":
      return Cu(t);
    case "keypress":
      return t.which !== 32 ? null : ((Nl = !0), Tl);
    case "textInput":
      return (e = t.data), e === Tl && Nl ? null : e;
    default:
      return null;
  }
}
function kf(e, t) {
  if (Xt)
    return e === "compositionend" || (!Ts && ku(e, t))
      ? ((e = wu()), (Fr = xs = dt = null), (Xt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Su && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Cf = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Rl(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Cf[e.type] : t === "textarea";
}
function xu(e, t, n, r) {
  tu(r),
    (t = no(t, "onChange")),
    0 < t.length &&
      ((n = new Es("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Hn = null,
  Zn = null;
function xf(e) {
  zu(e, 0);
}
function xo(e) {
  var t = Gt(e);
  if (Xa(t)) return e;
}
function Ef(e, t) {
  if (e === "change") return t;
}
var Eu = !1;
if (tt) {
  var Go;
  if (tt) {
    var Jo = "oninput" in document;
    if (!Jo) {
      var Il = document.createElement("div");
      Il.setAttribute("oninput", "return;"),
        (Jo = typeof Il.oninput == "function");
    }
    Go = Jo;
  } else Go = !1;
  Eu = Go && (!document.documentMode || 9 < document.documentMode);
}
function Dl() {
  Hn && (Hn.detachEvent("onpropertychange", Pu), (Zn = Hn = null));
}
function Pu(e) {
  if (e.propertyName === "value" && xo(Zn)) {
    var t = [];
    xu(t, Zn, e, _s(e)), iu(xf, t);
  }
}
function Pf(e, t, n) {
  e === "focusin"
    ? (Dl(), (Hn = t), (Zn = n), Hn.attachEvent("onpropertychange", Pu))
    : e === "focusout" && Dl();
}
function Tf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return xo(Zn);
}
function Nf(e, t) {
  if (e === "click") return xo(t);
}
function Rf(e, t) {
  if (e === "input" || e === "change") return xo(t);
}
function If(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var We = typeof Object.is == "function" ? Object.is : If;
function er(e, t) {
  if (We(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!mi.call(t, o) || !We(e[o], t[o])) return !1;
  }
  return !0;
}
function jl(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ll(e, t) {
  var n = jl(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = jl(n);
  }
}
function Tu(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Tu(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Nu() {
  for (var e = window, t = qr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = qr(e.document);
  }
  return t;
}
function Ns(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Df(e) {
  var t = Nu(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Tu(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ns(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = Ll(n, i));
        var s = Ll(n, r);
        o &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var jf = tt && "documentMode" in document && 11 >= document.documentMode,
  qt = null,
  zi = null,
  Bn = null,
  $i = !1;
function Ml(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $i ||
    qt == null ||
    qt !== qr(r) ||
    ((r = qt),
    "selectionStart" in r && Ns(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Bn && er(Bn, r)) ||
      ((Bn = r),
      (r = no(zi, "onSelect")),
      0 < r.length &&
        ((t = new Es("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = qt))));
}
function Tr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Yt = {
    animationend: Tr("Animation", "AnimationEnd"),
    animationiteration: Tr("Animation", "AnimationIteration"),
    animationstart: Tr("Animation", "AnimationStart"),
    transitionend: Tr("Transition", "TransitionEnd"),
  },
  Zo = {},
  Ru = {};
tt &&
  ((Ru = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Yt.animationend.animation,
    delete Yt.animationiteration.animation,
    delete Yt.animationstart.animation),
  "TransitionEvent" in window || delete Yt.transitionend.transition);
function Eo(e) {
  if (Zo[e]) return Zo[e];
  if (!Yt[e]) return e;
  var t = Yt[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ru) return (Zo[e] = t[n]);
  return e;
}
var Iu = Eo("animationend"),
  Du = Eo("animationiteration"),
  ju = Eo("animationstart"),
  Lu = Eo("transitionend"),
  Mu = new Map(),
  zl =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Ct(e, t) {
  Mu.set(e, t), Wt(t, [e]);
}
for (var ei = 0; ei < zl.length; ei++) {
  var ti = zl[ei],
    Lf = ti.toLowerCase(),
    Mf = ti[0].toUpperCase() + ti.slice(1);
  Ct(Lf, "on" + Mf);
}
Ct(Iu, "onAnimationEnd");
Ct(Du, "onAnimationIteration");
Ct(ju, "onAnimationStart");
Ct("dblclick", "onDoubleClick");
Ct("focusin", "onFocus");
Ct("focusout", "onBlur");
Ct(Lu, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Wt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Wt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Wt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Wt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var On =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  zf = new Set("cancel close invalid load scroll toggle".split(" ").concat(On));
function $l(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), jd(r, t, void 0, e), (e.currentTarget = null);
}
function zu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== i && o.isPropagationStopped())) break e;
          $l(o, l, u), (i = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== i && o.isPropagationStopped())
          )
            break e;
          $l(o, l, u), (i = a);
        }
    }
  }
  if (Gr) throw ((e = Di), (Gr = !1), (Di = null), e);
}
function A(e, t) {
  var n = t[Hi];
  n === void 0 && (n = t[Hi] = new Set());
  var r = e + "__bubble";
  n.has(r) || ($u(t, e, 2, !1), n.add(r));
}
function ni(e, t, n) {
  var r = 0;
  t && (r |= 4), $u(n, e, r, t);
}
var Nr = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
  if (!e[Nr]) {
    (e[Nr] = !0),
      Wa.forEach(function (n) {
        n !== "selectionchange" && (zf.has(n) || ni(n, !1, e), ni(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Nr] || ((t[Nr] = !0), ni("selectionchange", !1, t));
  }
}
function $u(e, t, n, r) {
  switch (_u(t)) {
    case 1:
      var o = Xd;
      break;
    case 4:
      o = qd;
      break;
    default:
      o = Cs;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !Ii ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function ri(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = It(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  iu(function () {
    var u = i,
      f = _s(n),
      h = [];
    e: {
      var g = Mu.get(e);
      if (g !== void 0) {
        var _ = Es,
          m = e;
        switch (e) {
          case "keypress":
            if (Hr(n) === 0) break e;
          case "keydown":
          case "keyup":
            _ = df;
            break;
          case "focusin":
            (m = "focus"), (_ = Yo);
            break;
          case "focusout":
            (m = "blur"), (_ = Yo);
            break;
          case "beforeblur":
          case "afterblur":
            _ = Yo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            _ = xl;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            _ = Jd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            _ = pf;
            break;
          case Iu:
          case Du:
          case ju:
            _ = tf;
            break;
          case Lu:
            _ = mf;
            break;
          case "scroll":
            _ = Yd;
            break;
          case "wheel":
            _ = yf;
            break;
          case "copy":
          case "cut":
          case "paste":
            _ = rf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            _ = Pl;
        }
        var w = (t & 4) !== 0,
          R = !w && e === "scroll",
          d = w ? (g !== null ? g + "Capture" : null) : g;
        w = [];
        for (var c = u, p; c !== null; ) {
          p = c;
          var S = p.stateNode;
          if (
            (p.tag === 5 &&
              S !== null &&
              ((p = S),
              d !== null && ((S = qn(c, d)), S != null && w.push(nr(c, S, p)))),
            R)
          )
            break;
          c = c.return;
        }
        0 < w.length &&
          ((g = new _(g, m, null, n, f)), h.push({ event: g, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (_ = e === "mouseout" || e === "pointerout"),
          g &&
            n !== Ni &&
            (m = n.relatedTarget || n.fromElement) &&
            (It(m) || m[nt]))
        )
          break e;
        if (
          (_ || g) &&
          ((g =
            f.window === f
              ? f
              : (g = f.ownerDocument)
              ? g.defaultView || g.parentWindow
              : window),
          _
            ? ((m = n.relatedTarget || n.toElement),
              (_ = u),
              (m = m ? It(m) : null),
              m !== null &&
                ((R = Vt(m)), m !== R || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((_ = null), (m = u)),
          _ !== m)
        ) {
          if (
            ((w = xl),
            (S = "onMouseLeave"),
            (d = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = Pl),
              (S = "onPointerLeave"),
              (d = "onPointerEnter"),
              (c = "pointer")),
            (R = _ == null ? g : Gt(_)),
            (p = m == null ? g : Gt(m)),
            (g = new w(S, c + "leave", _, n, f)),
            (g.target = R),
            (g.relatedTarget = p),
            (S = null),
            It(f) === u &&
              ((w = new w(d, c + "enter", m, n, f)),
              (w.target = p),
              (w.relatedTarget = R),
              (S = w)),
            (R = S),
            _ && m)
          )
            t: {
              for (w = _, d = m, c = 0, p = w; p; p = Qt(p)) c++;
              for (p = 0, S = d; S; S = Qt(S)) p++;
              for (; 0 < c - p; ) (w = Qt(w)), c--;
              for (; 0 < p - c; ) (d = Qt(d)), p--;
              for (; c--; ) {
                if (w === d || (d !== null && w === d.alternate)) break t;
                (w = Qt(w)), (d = Qt(d));
              }
              w = null;
            }
          else w = null;
          _ !== null && Ol(h, g, _, w, !1),
            m !== null && R !== null && Ol(h, R, m, w, !0);
        }
      }
      e: {
        if (
          ((g = u ? Gt(u) : window),
          (_ = g.nodeName && g.nodeName.toLowerCase()),
          _ === "select" || (_ === "input" && g.type === "file"))
        )
          var x = Ef;
        else if (Rl(g))
          if (Eu) x = Rf;
          else {
            x = Tf;
            var P = Pf;
          }
        else
          (_ = g.nodeName) &&
            _.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (x = Nf);
        if (x && (x = x(e, u))) {
          xu(h, x, n, f);
          break e;
        }
        P && P(e, g, u),
          e === "focusout" &&
            (P = g._wrapperState) &&
            P.controlled &&
            g.type === "number" &&
            Ci(g, "number", g.value);
      }
      switch (((P = u ? Gt(u) : window), e)) {
        case "focusin":
          (Rl(P) || P.contentEditable === "true") &&
            ((qt = P), (zi = u), (Bn = null));
          break;
        case "focusout":
          Bn = zi = qt = null;
          break;
        case "mousedown":
          $i = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ($i = !1), Ml(h, n, f);
          break;
        case "selectionchange":
          if (jf) break;
        case "keydown":
        case "keyup":
          Ml(h, n, f);
      }
      var T;
      if (Ts)
        e: {
          switch (e) {
            case "compositionstart":
              var N = "onCompositionStart";
              break e;
            case "compositionend":
              N = "onCompositionEnd";
              break e;
            case "compositionupdate":
              N = "onCompositionUpdate";
              break e;
          }
          N = void 0;
        }
      else
        Xt
          ? ku(e, n) && (N = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N &&
        (Su &&
          n.locale !== "ko" &&
          (Xt || N !== "onCompositionStart"
            ? N === "onCompositionEnd" && Xt && (T = wu())
            : ((dt = f),
              (xs = "value" in dt ? dt.value : dt.textContent),
              (Xt = !0))),
        (P = no(u, N)),
        0 < P.length &&
          ((N = new El(N, e, null, n, f)),
          h.push({ event: N, listeners: P }),
          T ? (N.data = T) : ((T = Cu(n)), T !== null && (N.data = T)))),
        (T = wf ? Sf(e, n) : kf(e, n)) &&
          ((u = no(u, "onBeforeInput")),
          0 < u.length &&
            ((f = new El("onBeforeInput", "beforeinput", null, n, f)),
            h.push({ event: f, listeners: u }),
            (f.data = T)));
    }
    zu(h, t);
  });
}
function nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function no(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = qn(e, n)),
      i != null && r.unshift(nr(e, i, o)),
      (i = qn(e, t)),
      i != null && r.push(nr(e, i, o))),
      (e = e.return);
  }
  return r;
}
function Qt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ol(e, t, n, r, o) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      o
        ? ((a = qn(n, i)), a != null && s.unshift(nr(n, a, l)))
        : o || ((a = qn(n, i)), a != null && s.push(nr(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var $f = /\r\n?/g,
  Of = /\u0000|\uFFFD/g;
function Ul(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      $f,
      `
`
    )
    .replace(Of, "");
}
function Rr(e, t, n) {
  if (((t = Ul(t)), Ul(e) !== t && n)) throw Error(k(425));
}
function ro() {}
var Oi = null,
  Ui = null;
function Ai(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Fi = typeof setTimeout == "function" ? setTimeout : void 0,
  Uf = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Al = typeof Promise == "function" ? Promise : void 0,
  Af =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Al < "u"
      ? function (e) {
          return Al.resolve(null).then(e).catch(Ff);
        }
      : Fi;
function Ff(e) {
  setTimeout(function () {
    throw e;
  });
}
function oi(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), Jn(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  Jn(t);
}
function mt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Fl(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var kn = Math.random().toString(36).slice(2),
  Ke = "__reactFiber$" + kn,
  rr = "__reactProps$" + kn,
  nt = "__reactContainer$" + kn,
  Hi = "__reactEvents$" + kn,
  Hf = "__reactListeners$" + kn,
  Bf = "__reactHandles$" + kn;
function It(e) {
  var t = e[Ke];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[nt] || n[Ke])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Fl(e); e !== null; ) {
          if ((n = e[Ke])) return n;
          e = Fl(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function gr(e) {
  return (
    (e = e[Ke] || e[nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Gt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function Po(e) {
  return e[rr] || null;
}
var Bi = [],
  Jt = -1;
function xt(e) {
  return { current: e };
}
function H(e) {
  0 > Jt || ((e.current = Bi[Jt]), (Bi[Jt] = null), Jt--);
}
function U(e, t) {
  Jt++, (Bi[Jt] = e.current), (e.current = t);
}
var kt = {},
  fe = xt(kt),
  _e = xt(!1),
  Ot = kt;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function we(e) {
  return (e = e.childContextTypes), e != null;
}
function oo() {
  H(_e), H(fe);
}
function Hl(e, t, n) {
  if (fe.current !== kt) throw Error(k(168));
  U(fe, t), U(_e, n);
}
function Ou(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(k(108, Ed(e) || "Unknown", o));
  return b({}, n, r);
}
function io(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || kt),
    (Ot = fe.current),
    U(fe, e),
    U(_e, _e.current),
    !0
  );
}
function Bl(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n
    ? ((e = Ou(e, t, Ot)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      H(_e),
      H(fe),
      U(fe, e))
    : H(_e),
    U(_e, n);
}
var Ge = null,
  To = !1,
  ii = !1;
function Uu(e) {
  Ge === null ? (Ge = [e]) : Ge.push(e);
}
function Wf(e) {
  (To = !0), Uu(e);
}
function Et() {
  if (!ii && Ge !== null) {
    ii = !0;
    var e = 0,
      t = O;
    try {
      var n = Ge;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ge = null), (To = !1);
    } catch (o) {
      throw (Ge !== null && (Ge = Ge.slice(e + 1)), uu(ws, Et), o);
    } finally {
      (O = t), (ii = !1);
    }
  }
  return null;
}
var Zt = [],
  en = 0,
  so = null,
  lo = 0,
  Re = [],
  Ie = 0,
  Ut = null,
  Je = 1,
  Ze = "";
function Nt(e, t) {
  (Zt[en++] = lo), (Zt[en++] = so), (so = e), (lo = t);
}
function Au(e, t, n) {
  (Re[Ie++] = Je), (Re[Ie++] = Ze), (Re[Ie++] = Ut), (Ut = e);
  var r = Je;
  e = Ze;
  var o = 32 - He(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - He(t) + o;
  if (30 < i) {
    var s = o - (o % 5);
    (i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (o -= s),
      (Je = (1 << (32 - He(t) + o)) | (n << o) | r),
      (Ze = i + e);
  } else (Je = (1 << i) | (n << o) | r), (Ze = e);
}
function Rs(e) {
  e.return !== null && (Nt(e, 1), Au(e, 1, 0));
}
function Is(e) {
  for (; e === so; )
    (so = Zt[--en]), (Zt[en] = null), (lo = Zt[--en]), (Zt[en] = null);
  for (; e === Ut; )
    (Ut = Re[--Ie]),
      (Re[Ie] = null),
      (Ze = Re[--Ie]),
      (Re[Ie] = null),
      (Je = Re[--Ie]),
      (Re[Ie] = null);
}
var Ee = null,
  Ce = null,
  B = !1,
  Ae = null;
function Fu(e, t) {
  var n = De(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Wl(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ee = e), (Ce = mt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ee = e), (Ce = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ut !== null ? { id: Je, overflow: Ze } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = De(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ee = e),
            (Ce = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Wi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vi(e) {
  if (B) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!Wl(e, t)) {
        if (Wi(e)) throw Error(k(418));
        t = mt(n.nextSibling);
        var r = Ee;
        t && Wl(e, t)
          ? Fu(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (B = !1), (Ee = e));
      }
    } else {
      if (Wi(e)) throw Error(k(418));
      (e.flags = (e.flags & -4097) | 2), (B = !1), (Ee = e);
    }
  }
}
function Vl(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ee = e;
}
function Ir(e) {
  if (e !== Ee) return !1;
  if (!B) return Vl(e), (B = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ai(e.type, e.memoizedProps))),
    t && (t = Ce))
  ) {
    if (Wi(e)) throw (Hu(), Error(k(418)));
    for (; t; ) Fu(e, t), (t = mt(t.nextSibling));
  }
  if ((Vl(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = mt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = Ee ? mt(e.stateNode.nextSibling) : null;
  return !0;
}
function Hu() {
  for (var e = Ce; e; ) e = mt(e.nextSibling);
}
function hn() {
  (Ce = Ee = null), (B = !1);
}
function Ds(e) {
  Ae === null ? (Ae = [e]) : Ae.push(e);
}
var Vf = it.ReactCurrentBatchConfig;
function Dn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var l = o.refs;
            s === null ? delete l[i] : (l[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Dr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      k(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ql(e) {
  var t = e._init;
  return t(e._payload);
}
function Bu(e) {
  function t(d, c) {
    if (e) {
      var p = d.deletions;
      p === null ? ((d.deletions = [c]), (d.flags |= 16)) : p.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), (c = c.sibling);
    return null;
  }
  function r(d, c) {
    for (d = new Map(); c !== null; )
      c.key !== null ? d.set(c.key, c) : d.set(c.index, c), (c = c.sibling);
    return d;
  }
  function o(d, c) {
    return (d = wt(d, c)), (d.index = 0), (d.sibling = null), d;
  }
  function i(d, c, p) {
    return (
      (d.index = p),
      e
        ? ((p = d.alternate),
          p !== null
            ? ((p = p.index), p < c ? ((d.flags |= 2), c) : p)
            : ((d.flags |= 2), c))
        : ((d.flags |= 1048576), c)
    );
  }
  function s(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function l(d, c, p, S) {
    return c === null || c.tag !== 6
      ? ((c = fi(p, d.mode, S)), (c.return = d), c)
      : ((c = o(c, p)), (c.return = d), c);
  }
  function a(d, c, p, S) {
    var x = p.type;
    return x === Kt
      ? f(d, c, p.props.children, S, p.key)
      : c !== null &&
        (c.elementType === x ||
          (typeof x == "object" &&
            x !== null &&
            x.$$typeof === lt &&
            Ql(x) === c.type))
      ? ((S = o(c, p.props)), (S.ref = Dn(d, c, p)), (S.return = d), S)
      : ((S = Xr(p.type, p.key, p.props, null, d.mode, S)),
        (S.ref = Dn(d, c, p)),
        (S.return = d),
        S);
  }
  function u(d, c, p, S) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = hi(p, d.mode, S)), (c.return = d), c)
      : ((c = o(c, p.children || [])), (c.return = d), c);
  }
  function f(d, c, p, S, x) {
    return c === null || c.tag !== 7
      ? ((c = Mt(p, d.mode, S, x)), (c.return = d), c)
      : ((c = o(c, p)), (c.return = d), c);
  }
  function h(d, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = fi("" + c, d.mode, p)), (c.return = d), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case wr:
          return (
            (p = Xr(c.type, c.key, c.props, null, d.mode, p)),
            (p.ref = Dn(d, null, c)),
            (p.return = d),
            p
          );
        case bt:
          return (c = hi(c, d.mode, p)), (c.return = d), c;
        case lt:
          var S = c._init;
          return h(d, S(c._payload), p);
      }
      if (zn(c) || Pn(c))
        return (c = Mt(c, d.mode, p, null)), (c.return = d), c;
      Dr(d, c);
    }
    return null;
  }
  function g(d, c, p, S) {
    var x = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return x !== null ? null : l(d, c, "" + p, S);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case wr:
          return p.key === x ? a(d, c, p, S) : null;
        case bt:
          return p.key === x ? u(d, c, p, S) : null;
        case lt:
          return (x = p._init), g(d, c, x(p._payload), S);
      }
      if (zn(p) || Pn(p)) return x !== null ? null : f(d, c, p, S, null);
      Dr(d, p);
    }
    return null;
  }
  function _(d, c, p, S, x) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (d = d.get(p) || null), l(c, d, "" + S, x);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case wr:
          return (d = d.get(S.key === null ? p : S.key) || null), a(c, d, S, x);
        case bt:
          return (d = d.get(S.key === null ? p : S.key) || null), u(c, d, S, x);
        case lt:
          var P = S._init;
          return _(d, c, p, P(S._payload), x);
      }
      if (zn(S) || Pn(S)) return (d = d.get(p) || null), f(c, d, S, x, null);
      Dr(c, S);
    }
    return null;
  }
  function m(d, c, p, S) {
    for (
      var x = null, P = null, T = c, N = (c = 0), X = null;
      T !== null && N < p.length;
      N++
    ) {
      T.index > N ? ((X = T), (T = null)) : (X = T.sibling);
      var z = g(d, T, p[N], S);
      if (z === null) {
        T === null && (T = X);
        break;
      }
      e && T && z.alternate === null && t(d, T),
        (c = i(z, c, N)),
        P === null ? (x = z) : (P.sibling = z),
        (P = z),
        (T = X);
    }
    if (N === p.length) return n(d, T), B && Nt(d, N), x;
    if (T === null) {
      for (; N < p.length; N++)
        (T = h(d, p[N], S)),
          T !== null &&
            ((c = i(T, c, N)), P === null ? (x = T) : (P.sibling = T), (P = T));
      return B && Nt(d, N), x;
    }
    for (T = r(d, T); N < p.length; N++)
      (X = _(T, d, N, p[N], S)),
        X !== null &&
          (e && X.alternate !== null && T.delete(X.key === null ? N : X.key),
          (c = i(X, c, N)),
          P === null ? (x = X) : (P.sibling = X),
          (P = X));
    return (
      e &&
        T.forEach(function (ze) {
          return t(d, ze);
        }),
      B && Nt(d, N),
      x
    );
  }
  function w(d, c, p, S) {
    var x = Pn(p);
    if (typeof x != "function") throw Error(k(150));
    if (((p = x.call(p)), p == null)) throw Error(k(151));
    for (
      var P = (x = null), T = c, N = (c = 0), X = null, z = p.next();
      T !== null && !z.done;
      N++, z = p.next()
    ) {
      T.index > N ? ((X = T), (T = null)) : (X = T.sibling);
      var ze = g(d, T, z.value, S);
      if (ze === null) {
        T === null && (T = X);
        break;
      }
      e && T && ze.alternate === null && t(d, T),
        (c = i(ze, c, N)),
        P === null ? (x = ze) : (P.sibling = ze),
        (P = ze),
        (T = X);
    }
    if (z.done) return n(d, T), B && Nt(d, N), x;
    if (T === null) {
      for (; !z.done; N++, z = p.next())
        (z = h(d, z.value, S)),
          z !== null &&
            ((c = i(z, c, N)), P === null ? (x = z) : (P.sibling = z), (P = z));
      return B && Nt(d, N), x;
    }
    for (T = r(d, T); !z.done; N++, z = p.next())
      (z = _(T, d, N, z.value, S)),
        z !== null &&
          (e && z.alternate !== null && T.delete(z.key === null ? N : z.key),
          (c = i(z, c, N)),
          P === null ? (x = z) : (P.sibling = z),
          (P = z));
    return (
      e &&
        T.forEach(function (xn) {
          return t(d, xn);
        }),
      B && Nt(d, N),
      x
    );
  }
  function R(d, c, p, S) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === Kt &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case wr:
          e: {
            for (var x = p.key, P = c; P !== null; ) {
              if (P.key === x) {
                if (((x = p.type), x === Kt)) {
                  if (P.tag === 7) {
                    n(d, P.sibling),
                      (c = o(P, p.props.children)),
                      (c.return = d),
                      (d = c);
                    break e;
                  }
                } else if (
                  P.elementType === x ||
                  (typeof x == "object" &&
                    x !== null &&
                    x.$$typeof === lt &&
                    Ql(x) === P.type)
                ) {
                  n(d, P.sibling),
                    (c = o(P, p.props)),
                    (c.ref = Dn(d, P, p)),
                    (c.return = d),
                    (d = c);
                  break e;
                }
                n(d, P);
                break;
              } else t(d, P);
              P = P.sibling;
            }
            p.type === Kt
              ? ((c = Mt(p.props.children, d.mode, S, p.key)),
                (c.return = d),
                (d = c))
              : ((S = Xr(p.type, p.key, p.props, null, d.mode, S)),
                (S.ref = Dn(d, c, p)),
                (S.return = d),
                (d = S));
          }
          return s(d);
        case bt:
          e: {
            for (P = p.key; c !== null; ) {
              if (c.key === P)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(d, c.sibling),
                    (c = o(c, p.children || [])),
                    (c.return = d),
                    (d = c);
                  break e;
                } else {
                  n(d, c);
                  break;
                }
              else t(d, c);
              c = c.sibling;
            }
            (c = hi(p, d.mode, S)), (c.return = d), (d = c);
          }
          return s(d);
        case lt:
          return (P = p._init), R(d, c, P(p._payload), S);
      }
      if (zn(p)) return m(d, c, p, S);
      if (Pn(p)) return w(d, c, p, S);
      Dr(d, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(d, c.sibling), (c = o(c, p)), (c.return = d), (d = c))
          : (n(d, c), (c = fi(p, d.mode, S)), (c.return = d), (d = c)),
        s(d))
      : n(d, c);
  }
  return R;
}
var pn = Bu(!0),
  Wu = Bu(!1),
  ao = xt(null),
  uo = null,
  tn = null,
  js = null;
function Ls() {
  js = tn = uo = null;
}
function Ms(e) {
  var t = ao.current;
  H(ao), (e._currentValue = t);
}
function Qi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function un(e, t) {
  (uo = e),
    (js = tn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ye = !0), (e.firstContext = null));
}
function Le(e) {
  var t = e._currentValue;
  if (js !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), tn === null)) {
      if (uo === null) throw Error(k(308));
      (tn = e), (uo.dependencies = { lanes: 0, firstContext: e });
    } else tn = tn.next = e;
  return t;
}
var Dt = null;
function zs(e) {
  Dt === null ? (Dt = [e]) : Dt.push(e);
}
function Vu(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), zs(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    rt(e, r)
  );
}
function rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function $s(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Qu(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), $ & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      rt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), zs(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    rt(e, n)
  );
}
function Br(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ss(e, n);
  }
}
function bl(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = s) : (i = i.next = s), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function co(e, t, n, r) {
  var o = e.updateQueue;
  at = !1;
  var i = o.firstBaseUpdate,
    s = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), s === null ? (i = u) : (s.next = u), (s = a);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (l = f.lastBaseUpdate),
      l !== s &&
        (l === null ? (f.firstBaseUpdate = u) : (l.next = u),
        (f.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var h = o.baseState;
    (s = 0), (f = u = a = null), (l = i);
    do {
      var g = l.lane,
        _ = l.eventTime;
      if ((r & g) === g) {
        f !== null &&
          (f = f.next =
            {
              eventTime: _,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var m = e,
            w = l;
          switch (((g = t), (_ = n), w.tag)) {
            case 1:
              if (((m = w.payload), typeof m == "function")) {
                h = m.call(_, h, g);
                break e;
              }
              h = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = w.payload),
                (g = typeof m == "function" ? m.call(_, h, g) : m),
                g == null)
              )
                break e;
              h = b({}, h, g);
              break e;
            case 2:
              at = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (g = o.effects),
          g === null ? (o.effects = [l]) : g.push(l));
      } else
        (_ = {
          eventTime: _,
          lane: g,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          f === null ? ((u = f = _), (a = h)) : (f = f.next = _),
          (s |= g);
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        (g = l),
          (l = g.next),
          (g.next = null),
          (o.lastBaseUpdate = g),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (a = h),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = f),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (s |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (Ft |= s), (e.lanes = s), (e.memoizedState = h);
  }
}
function Kl(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(k(191, o));
        o.call(r);
      }
    }
}
var mr = {},
  qe = xt(mr),
  or = xt(mr),
  ir = xt(mr);
function jt(e) {
  if (e === mr) throw Error(k(174));
  return e;
}
function Os(e, t) {
  switch ((U(ir, t), U(or, e), U(qe, mr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ei(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ei(t, e));
  }
  H(qe), U(qe, t);
}
function gn() {
  H(qe), H(or), H(ir);
}
function bu(e) {
  jt(ir.current);
  var t = jt(qe.current),
    n = Ei(t, e.type);
  t !== n && (U(or, e), U(qe, n));
}
function Us(e) {
  or.current === e && (H(qe), H(or));
}
var W = xt(0);
function fo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var si = [];
function As() {
  for (var e = 0; e < si.length; e++)
    si[e]._workInProgressVersionPrimary = null;
  si.length = 0;
}
var Wr = it.ReactCurrentDispatcher,
  li = it.ReactCurrentBatchConfig,
  At = 0,
  Q = null,
  ee = null,
  re = null,
  ho = !1,
  Wn = !1,
  sr = 0,
  Qf = 0;
function ae() {
  throw Error(k(321));
}
function Fs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!We(e[n], t[n])) return !1;
  return !0;
}
function Hs(e, t, n, r, o, i) {
  if (
    ((At = i),
    (Q = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Wr.current = e === null || e.memoizedState === null ? qf : Yf),
    (e = n(r, o)),
    Wn)
  ) {
    i = 0;
    do {
      if (((Wn = !1), (sr = 0), 25 <= i)) throw Error(k(301));
      (i += 1),
        (re = ee = null),
        (t.updateQueue = null),
        (Wr.current = Gf),
        (e = n(r, o));
    } while (Wn);
  }
  if (
    ((Wr.current = po),
    (t = ee !== null && ee.next !== null),
    (At = 0),
    (re = ee = Q = null),
    (ho = !1),
    t)
  )
    throw Error(k(300));
  return e;
}
function Bs() {
  var e = sr !== 0;
  return (sr = 0), e;
}
function Qe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return re === null ? (Q.memoizedState = re = e) : (re = re.next = e), re;
}
function Me() {
  if (ee === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? Q.memoizedState : re.next;
  if (t !== null) (re = t), (ee = e);
  else {
    if (e === null) throw Error(k(310));
    (ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      re === null ? (Q.memoizedState = re = e) : (re = re.next = e);
  }
  return re;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ai(e) {
  var t = Me(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = ee,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var s = o.next;
      (o.next = i.next), (i.next = s);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      u = i;
    do {
      var f = u.lane;
      if ((At & f) === f)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var h = {
          lane: f,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = h), (s = r)) : (a = a.next = h),
          (Q.lanes |= f),
          (Ft |= f);
      }
      u = u.next;
    } while (u !== null && u !== i);
    a === null ? (s = r) : (a.next = l),
      We(r, t.memoizedState) || (ye = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (Q.lanes |= i), (Ft |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ui(e) {
  var t = Me(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = (o = o.next);
    do (i = e(i, s.action)), (s = s.next);
    while (s !== o);
    We(i, t.memoizedState) || (ye = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Ku() {}
function Xu(e, t) {
  var n = Q,
    r = Me(),
    o = t(),
    i = !We(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (ye = !0)),
    (r = r.queue),
    Ws(Gu.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ar(9, Yu.bind(null, n, r, o, t), void 0, null),
      oe === null)
    )
      throw Error(k(349));
    At & 30 || qu(n, t, o);
  }
  return o;
}
function qu(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Yu(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Ju(t) && Zu(e);
}
function Gu(e, t, n) {
  return n(function () {
    Ju(t) && Zu(e);
  });
}
function Ju(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !We(e, n);
  } catch {
    return !0;
  }
}
function Zu(e) {
  var t = rt(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function Xl(e) {
  var t = Qe();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Xf.bind(null, Q, e)),
    [t.memoizedState, e]
  );
}
function ar(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function ec() {
  return Me().memoizedState;
}
function Vr(e, t, n, r) {
  var o = Qe();
  (Q.flags |= e),
    (o.memoizedState = ar(1 | t, n, void 0, r === void 0 ? null : r));
}
function No(e, t, n, r) {
  var o = Me();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (((i = s.destroy), r !== null && Fs(r, s.deps))) {
      o.memoizedState = ar(t, n, i, r);
      return;
    }
  }
  (Q.flags |= e), (o.memoizedState = ar(1 | t, n, i, r));
}
function ql(e, t) {
  return Vr(8390656, 8, e, t);
}
function Ws(e, t) {
  return No(2048, 8, e, t);
}
function tc(e, t) {
  return No(4, 2, e, t);
}
function nc(e, t) {
  return No(4, 4, e, t);
}
function rc(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function oc(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), No(4, 4, rc.bind(null, t, e), n)
  );
}
function Vs() {}
function ic(e, t) {
  var n = Me();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function sc(e, t) {
  var n = Me();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function lc(e, t, n) {
  return At & 21
    ? (We(n, t) || ((n = fu()), (Q.lanes |= n), (Ft |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ye = !0)), (e.memoizedState = n));
}
function bf(e, t) {
  var n = O;
  (O = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = li.transition;
  li.transition = {};
  try {
    e(!1), t();
  } finally {
    (O = n), (li.transition = r);
  }
}
function ac() {
  return Me().memoizedState;
}
function Kf(e, t, n) {
  var r = _t(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    uc(e))
  )
    cc(t, n);
  else if (((n = Vu(e, t, n, r)), n !== null)) {
    var o = pe();
    Be(n, e, r, o), dc(n, t, r);
  }
}
function Xf(e, t, n) {
  var r = _t(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (uc(e)) cc(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = i(s, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), We(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((o.next = o), zs(t))
            : ((o.next = a.next), (a.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = Vu(e, t, o, r)),
      n !== null && ((o = pe()), Be(n, e, r, o), dc(n, t, r));
  }
}
function uc(e) {
  var t = e.alternate;
  return e === Q || (t !== null && t === Q);
}
function cc(e, t) {
  Wn = ho = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function dc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ss(e, n);
  }
}
var po = {
    readContext: Le,
    useCallback: ae,
    useContext: ae,
    useEffect: ae,
    useImperativeHandle: ae,
    useInsertionEffect: ae,
    useLayoutEffect: ae,
    useMemo: ae,
    useReducer: ae,
    useRef: ae,
    useState: ae,
    useDebugValue: ae,
    useDeferredValue: ae,
    useTransition: ae,
    useMutableSource: ae,
    useSyncExternalStore: ae,
    useId: ae,
    unstable_isNewReconciler: !1,
  },
  qf = {
    readContext: Le,
    useCallback: function (e, t) {
      return (Qe().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Le,
    useEffect: ql,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Vr(4194308, 4, rc.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Vr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Vr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Qe();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Qe();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Kf.bind(null, Q, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Qe();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Xl,
    useDebugValue: Vs,
    useDeferredValue: function (e) {
      return (Qe().memoizedState = e);
    },
    useTransition: function () {
      var e = Xl(!1),
        t = e[0];
      return (e = bf.bind(null, e[1])), (Qe().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Q,
        o = Qe();
      if (B) {
        if (n === void 0) throw Error(k(407));
        n = n();
      } else {
        if (((n = t()), oe === null)) throw Error(k(349));
        At & 30 || qu(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        ql(Gu.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        ar(9, Yu.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Qe(),
        t = oe.identifierPrefix;
      if (B) {
        var n = Ze,
          r = Je;
        (n = (r & ~(1 << (32 - He(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = sr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Qf++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Yf = {
    readContext: Le,
    useCallback: ic,
    useContext: Le,
    useEffect: Ws,
    useImperativeHandle: oc,
    useInsertionEffect: tc,
    useLayoutEffect: nc,
    useMemo: sc,
    useReducer: ai,
    useRef: ec,
    useState: function () {
      return ai(lr);
    },
    useDebugValue: Vs,
    useDeferredValue: function (e) {
      var t = Me();
      return lc(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = ai(lr)[0],
        t = Me().memoizedState;
      return [e, t];
    },
    useMutableSource: Ku,
    useSyncExternalStore: Xu,
    useId: ac,
    unstable_isNewReconciler: !1,
  },
  Gf = {
    readContext: Le,
    useCallback: ic,
    useContext: Le,
    useEffect: Ws,
    useImperativeHandle: oc,
    useInsertionEffect: tc,
    useLayoutEffect: nc,
    useMemo: sc,
    useReducer: ui,
    useRef: ec,
    useState: function () {
      return ui(lr);
    },
    useDebugValue: Vs,
    useDeferredValue: function (e) {
      var t = Me();
      return ee === null ? (t.memoizedState = e) : lc(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = ui(lr)[0],
        t = Me().memoizedState;
      return [e, t];
    },
    useMutableSource: Ku,
    useSyncExternalStore: Xu,
    useId: ac,
    unstable_isNewReconciler: !1,
  };
function Oe(e, t) {
  if (e && e.defaultProps) {
    (t = b({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function bi(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : b({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ro = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Vt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      o = _t(e),
      i = et(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, o)),
      t !== null && (Be(t, e, o, r), Br(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      o = _t(e),
      i = et(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, o)),
      t !== null && (Be(t, e, o, r), Br(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = pe(),
      r = _t(e),
      o = et(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = vt(e, o, r)),
      t !== null && (Be(t, e, r, n), Br(t, e, r));
  },
};
function Yl(e, t, n, r, o, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !er(n, r) || !er(o, i)
      : !0
  );
}
function fc(e, t, n) {
  var r = !1,
    o = kt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Le(i))
      : ((o = we(t) ? Ot : fe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? fn(e, o) : kt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ro),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Gl(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ro.enqueueReplaceState(t, t.state, null);
}
function Ki(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = {}), $s(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = Le(i))
    : ((i = we(t) ? Ot : fe.current), (o.context = fn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (bi(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Ro.enqueueReplaceState(o, o.state, null),
      co(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function mn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += xd(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function ci(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Xi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Jf = typeof WeakMap == "function" ? WeakMap : Map;
function hc(e, t, n) {
  (n = et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      mo || ((mo = !0), (os = r)), Xi(e, t);
    }),
    n
  );
}
function pc(e, t, n) {
  (n = et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        Xi(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        Xi(e, t),
          typeof r != "function" &&
            (yt === null ? (yt = new Set([this])) : yt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Jl(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Jf();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = fh.bind(null, e, t, n)), t.then(e, e));
}
function Zl(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ea(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = et(-1, 1)), (t.tag = 2), vt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Zf = it.ReactCurrentOwner,
  ye = !1;
function he(e, t, n, r) {
  t.child = e === null ? Wu(t, null, n, r) : pn(t, e.child, n, r);
}
function ta(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    un(t, o),
    (r = Hs(e, t, n, r, i, o)),
    (n = Bs()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        ot(e, t, o))
      : (B && n && Rs(t), (t.flags |= 1), he(e, t, r, o), t.child)
  );
}
function na(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Js(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), gc(e, t, i, r, o))
      : ((e = Xr(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : er), n(s, r) && e.ref === t.ref)
    )
      return ot(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = wt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function gc(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (er(i, r) && e.ref === t.ref)
      if (((ye = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (ye = !0);
      else return (t.lanes = e.lanes), ot(e, t, o);
  }
  return qi(e, t, n, r, o);
}
function mc(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        U(rn, ke),
        (ke |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          U(rn, ke),
          (ke |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        U(rn, ke),
        (ke |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      U(rn, ke),
      (ke |= r);
  return he(e, t, o, n), t.child;
}
function vc(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function qi(e, t, n, r, o) {
  var i = we(n) ? Ot : fe.current;
  return (
    (i = fn(t, i)),
    un(t, o),
    (n = Hs(e, t, n, r, i, o)),
    (r = Bs()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        ot(e, t, o))
      : (B && r && Rs(t), (t.flags |= 1), he(e, t, n, o), t.child)
  );
}
function ra(e, t, n, r, o) {
  if (we(n)) {
    var i = !0;
    io(t);
  } else i = !1;
  if ((un(t, o), t.stateNode === null))
    Qr(e, t), fc(t, n, r), Ki(t, n, r, o), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Le(u))
      : ((u = we(n) ? Ot : fe.current), (u = fn(t, u)));
    var f = n.getDerivedStateFromProps,
      h =
        typeof f == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    h ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && Gl(t, s, r, u)),
      (at = !1);
    var g = t.memoizedState;
    (s.state = g),
      co(t, r, s, o),
      (a = t.memoizedState),
      l !== r || g !== a || _e.current || at
        ? (typeof f == "function" && (bi(t, n, f, r), (a = t.memoizedState)),
          (l = at || Yl(t, n, l, r, g, a, u))
            ? (h ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Qu(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : Oe(t.type, l)),
      (s.props = u),
      (h = t.pendingProps),
      (g = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Le(a))
        : ((a = we(n) ? Ot : fe.current), (a = fn(t, a)));
    var _ = n.getDerivedStateFromProps;
    (f =
      typeof _ == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== h || g !== a) && Gl(t, s, r, a)),
      (at = !1),
      (g = t.memoizedState),
      (s.state = g),
      co(t, r, s, o);
    var m = t.memoizedState;
    l !== h || g !== m || _e.current || at
      ? (typeof _ == "function" && (bi(t, n, _, r), (m = t.memoizedState)),
        (u = at || Yl(t, n, u, r, g, m, a) || !1)
          ? (f ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, m, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, m, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (s.props = r),
        (s.state = m),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Yi(e, t, n, r, i, o);
}
function Yi(e, t, n, r, o, i) {
  vc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return o && Bl(t, n, !1), ot(e, t, i);
  (r = t.stateNode), (Zf.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = pn(t, e.child, null, i)), (t.child = pn(t, null, l, i)))
      : he(e, t, l, i),
    (t.memoizedState = r.state),
    o && Bl(t, n, !0),
    t.child
  );
}
function yc(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Hl(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Hl(e, t.context, !1),
    Os(e, t.containerInfo);
}
function oa(e, t, n, r, o) {
  return hn(), Ds(o), (t.flags |= 256), he(e, t, n, r), t.child;
}
var Gi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ji(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function _c(e, t, n) {
  var r = t.pendingProps,
    o = W.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    U(W, o & 1),
    e === null)
  )
    return (
      Vi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = jo(s, r, 0, null)),
              (e = Mt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Ji(n)),
              (t.memoizedState = Gi),
              e)
            : Qs(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return eh(e, t, s, r, l, o, n);
  if (i) {
    (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = wt(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = wt(l, i)) : ((i = Mt(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Ji(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Gi),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = wt(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Qs(e, t) {
  return (
    (t = jo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function jr(e, t, n, r) {
  return (
    r !== null && Ds(r),
    pn(t, e.child, null, n),
    (e = Qs(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function eh(e, t, n, r, o, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ci(Error(k(422)))), jr(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = jo({ mode: "visible", children: r.children }, o, 0, null)),
        (i = Mt(i, o, s, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && pn(t, e.child, null, s),
        (t.child.memoizedState = Ji(s)),
        (t.memoizedState = Gi),
        i);
  if (!(t.mode & 1)) return jr(e, t, s, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (i = Error(k(419))), (r = ci(i, r, void 0)), jr(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), ye || l)) {
    if (((r = oe), r !== null)) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | s) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), rt(e, o), Be(r, e, o, -1));
    }
    return Gs(), (r = ci(Error(k(421)))), jr(e, t, s, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = hh.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ce = mt(o.nextSibling)),
      (Ee = t),
      (B = !0),
      (Ae = null),
      e !== null &&
        ((Re[Ie++] = Je),
        (Re[Ie++] = Ze),
        (Re[Ie++] = Ut),
        (Je = e.id),
        (Ze = e.overflow),
        (Ut = t)),
      (t = Qs(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ia(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Qi(e.return, t, n);
}
function di(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function wc(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((he(e, t, r.children, n), (r = W.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ia(e, n, t);
        else if (e.tag === 19) ia(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((U(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && fo(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          di(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && fo(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        di(t, !0, n, null, i);
        break;
      case "together":
        di(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Qr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ot(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Ft |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (
      e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = wt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function th(e, t, n) {
  switch (t.tag) {
    case 3:
      yc(t), hn();
      break;
    case 5:
      bu(t);
      break;
    case 1:
      we(t.type) && io(t);
      break;
    case 4:
      Os(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      U(ao, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (U(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? _c(e, t, n)
          : (U(W, W.current & 1),
            (e = ot(e, t, n)),
            e !== null ? e.sibling : null);
      U(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return wc(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        U(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), mc(e, t, n);
  }
  return ot(e, t, n);
}
var Sc, Zi, kc, Cc;
Sc = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Zi = function () {};
kc = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), jt(qe.current);
    var i = null;
    switch (n) {
      case "input":
        (o = Si(e, o)), (r = Si(e, r)), (i = []);
        break;
      case "select":
        (o = b({}, o, { value: void 0 })),
          (r = b({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = xi(e, o)), (r = xi(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ro);
    }
    Pi(n, r);
    var s;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var l = o[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Kn.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (i || (i = []), i.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (i = i || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (i = i || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Kn.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && A("scroll", e),
                  i || l === a || (i = []))
                : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Cc = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function jn(e, t) {
  if (!B)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ue(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function nh(e, t, n) {
  var r = t.pendingProps;
  switch ((Is(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ue(t), null;
    case 1:
      return we(t.type) && oo(), ue(t), null;
    case 3:
      return (
        (r = t.stateNode),
        gn(),
        H(_e),
        H(fe),
        As(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ir(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ae !== null && (ls(Ae), (Ae = null)))),
        Zi(e, t),
        ue(t),
        null
      );
    case 5:
      Us(t);
      var o = jt(ir.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        kc(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return ue(t), null;
        }
        if (((e = jt(qe.current)), Ir(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[Ke] = t), (r[rr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              A("cancel", r), A("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              A("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < On.length; o++) A(On[o], r);
              break;
            case "source":
              A("error", r);
              break;
            case "img":
            case "image":
            case "link":
              A("error", r), A("load", r);
              break;
            case "details":
              A("toggle", r);
              break;
            case "input":
              pl(r, i), A("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                A("invalid", r);
              break;
            case "textarea":
              ml(r, i), A("invalid", r);
          }
          Pi(n, i), (o = null);
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var l = i[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Rr(r.textContent, l, e),
                    (o = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Rr(r.textContent, l, e),
                    (o = ["children", "" + l]))
                : Kn.hasOwnProperty(s) &&
                  l != null &&
                  s === "onScroll" &&
                  A("scroll", r);
            }
          switch (n) {
            case "input":
              Sr(r), gl(r, i, !0);
              break;
            case "textarea":
              Sr(r), vl(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ro);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ga(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Ke] = t),
            (e[rr] = r),
            Sc(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = Ti(n, r)), n)) {
              case "dialog":
                A("cancel", e), A("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                A("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < On.length; o++) A(On[o], e);
                o = r;
                break;
              case "source":
                A("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                A("error", e), A("load", e), (o = r);
                break;
              case "details":
                A("toggle", e), (o = r);
                break;
              case "input":
                pl(e, r), (o = Si(e, r)), A("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = b({}, r, { value: void 0 })),
                  A("invalid", e);
                break;
              case "textarea":
                ml(e, r), (o = xi(e, r)), A("invalid", e);
                break;
              default:
                o = r;
            }
            Pi(n, o), (l = o);
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === "style"
                  ? eu(e, a)
                  : i === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Ja(e, a))
                  : i === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Xn(e, a)
                    : typeof a == "number" && Xn(e, "" + a)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (Kn.hasOwnProperty(i)
                      ? a != null && i === "onScroll" && A("scroll", e)
                      : a != null && gs(e, i, a, s));
              }
            switch (n) {
              case "input":
                Sr(e), gl(e, r, !1);
                break;
              case "textarea":
                Sr(e), vl(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + St(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? on(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      on(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = ro);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) Cc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (((n = jt(ir.current)), jt(qe.current), Ir(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ke] = t),
            (i = r.nodeValue !== n) && ((e = Ee), e !== null))
          )
            switch (e.tag) {
              case 3:
                Rr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Rr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ke] = t),
            (t.stateNode = r);
      }
      return ue(t), null;
    case 13:
      if (
        (H(W),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (B && Ce !== null && t.mode & 1 && !(t.flags & 128))
          Hu(), hn(), (t.flags |= 98560), (i = !1);
        else if (((i = Ir(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(k(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(k(317));
            i[Ke] = t;
          } else
            hn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ue(t), (i = !1);
        } else Ae !== null && (ls(Ae), (Ae = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? te === 0 && (te = 3) : Gs())),
          t.updateQueue !== null && (t.flags |= 4),
          ue(t),
          null);
    case 4:
      return (
        gn(), Zi(e, t), e === null && tr(t.stateNode.containerInfo), ue(t), null
      );
    case 10:
      return Ms(t.type._context), ue(t), null;
    case 17:
      return we(t.type) && oo(), ue(t), null;
    case 19:
      if ((H(W), (i = t.memoizedState), i === null)) return ue(t), null;
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) jn(i, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = fo(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    jn(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return U(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            Y() > vn &&
            ((t.flags |= 128), (r = !0), jn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = fo(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              jn(i, !0),
              i.tail === null && i.tailMode === "hidden" && !s.alternate && !B)
            )
              return ue(t), null;
          } else
            2 * Y() - i.renderingStartTime > vn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), jn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = Y()),
          (t.sibling = null),
          (n = W.current),
          U(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (ue(t), null);
    case 22:
    case 23:
      return (
        Ys(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? ke & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ue(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function rh(e, t) {
  switch ((Is(t), t.tag)) {
    case 1:
      return (
        we(t.type) && oo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        gn(),
        H(_e),
        H(fe),
        As(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Us(t), null;
    case 13:
      if ((H(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(k(340));
        hn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return H(W), null;
    case 4:
      return gn(), null;
    case 10:
      return Ms(t.type._context), null;
    case 22:
    case 23:
      return Ys(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Lr = !1,
  ce = !1,
  oh = typeof WeakSet == "function" ? WeakSet : Set,
  C = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else n.current = null;
}
function es(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var sa = !1;
function ih(e, t) {
  if (((Oi = eo), (e = Nu()), Ns(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            f = 0,
            h = e,
            g = null;
          t: for (;;) {
            for (
              var _;
              h !== n || (o !== 0 && h.nodeType !== 3) || (l = s + o),
                h !== i || (r !== 0 && h.nodeType !== 3) || (a = s + r),
                h.nodeType === 3 && (s += h.nodeValue.length),
                (_ = h.firstChild) !== null;

            )
              (g = h), (h = _);
            for (;;) {
              if (h === e) break t;
              if (
                (g === n && ++u === o && (l = s),
                g === i && ++f === r && (a = s),
                (_ = h.nextSibling) !== null)
              )
                break;
              (h = g), (g = h.parentNode);
            }
            h = _;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ui = { focusedElem: e, selectionRange: n }, eo = !1, C = t; C !== null; )
    if (((t = C), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (C = e);
    else
      for (; C !== null; ) {
        t = C;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var w = m.memoizedProps,
                    R = m.memoizedState,
                    d = t.stateNode,
                    c = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : Oe(t.type, w),
                      R
                    );
                  d.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (S) {
          K(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (C = e);
          break;
        }
        C = t.return;
      }
  return (m = sa), (sa = !1), m;
}
function Vn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && es(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function Io(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ts(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function xc(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), xc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ke], delete t[rr], delete t[Hi], delete t[Hf], delete t[Bf])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Ec(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function la(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ec(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ns(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ro));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ns(e, t, n), e = e.sibling; e !== null; ) ns(e, t, n), (e = e.sibling);
}
function rs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (rs(e, t, n), e = e.sibling; e !== null; ) rs(e, t, n), (e = e.sibling);
}
var ie = null,
  Ue = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) Pc(e, t, n), (n = n.sibling);
}
function Pc(e, t, n) {
  if (Xe && typeof Xe.onCommitFiberUnmount == "function")
    try {
      Xe.onCommitFiberUnmount(ko, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ce || nn(n, t);
    case 6:
      var r = ie,
        o = Ue;
      (ie = null),
        st(e, t, n),
        (ie = r),
        (Ue = o),
        ie !== null &&
          (Ue
            ? ((e = ie),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null &&
        (Ue
          ? ((e = ie),
            (n = n.stateNode),
            e.nodeType === 8
              ? oi(e.parentNode, n)
              : e.nodeType === 1 && oi(e, n),
            Jn(e))
          : oi(ie, n.stateNode));
      break;
    case 4:
      (r = ie),
        (o = Ue),
        (ie = n.stateNode.containerInfo),
        (Ue = !0),
        st(e, t, n),
        (ie = r),
        (Ue = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            s = i.destroy;
          (i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && es(n, t, s),
            (o = o.next);
        } while (o !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (
        !ce &&
        (nn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          K(n, t, l);
        }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ce = (r = ce) || n.memoizedState !== null), st(e, t, n), (ce = r))
        : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function aa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new oh()),
      t.forEach(function (r) {
        var o = ph.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (ie = l.stateNode), (Ue = !1);
              break e;
            case 3:
              (ie = l.stateNode.containerInfo), (Ue = !0);
              break e;
            case 4:
              (ie = l.stateNode.containerInfo), (Ue = !0);
              break e;
          }
          l = l.return;
        }
        if (ie === null) throw Error(k(160));
        Pc(i, s, o), (ie = null), (Ue = !1);
        var a = o.alternate;
        a !== null && (a.return = null), (o.return = null);
      } catch (u) {
        K(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Tc(t, e), (t = t.sibling);
}
function Tc(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (($e(t, e), Ve(e), r & 4)) {
        try {
          Vn(3, e, e.return), Io(3, e);
        } catch (w) {
          K(e, e.return, w);
        }
        try {
          Vn(5, e, e.return);
        } catch (w) {
          K(e, e.return, w);
        }
      }
      break;
    case 1:
      $e(t, e), Ve(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (
        ($e(t, e),
        Ve(e),
        r & 512 && n !== null && nn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          Xn(o, "");
        } catch (w) {
          K(e, e.return, w);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && i.type === "radio" && i.name != null && qa(o, i),
              Ti(l, s);
            var u = Ti(l, i);
            for (s = 0; s < a.length; s += 2) {
              var f = a[s],
                h = a[s + 1];
              f === "style"
                ? eu(o, h)
                : f === "dangerouslySetInnerHTML"
                ? Ja(o, h)
                : f === "children"
                ? Xn(o, h)
                : gs(o, f, h, u);
            }
            switch (l) {
              case "input":
                ki(o, i);
                break;
              case "textarea":
                Ya(o, i);
                break;
              case "select":
                var g = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var _ = i.value;
                _ != null
                  ? on(o, !!i.multiple, _, !1)
                  : g !== !!i.multiple &&
                    (i.defaultValue != null
                      ? on(o, !!i.multiple, i.defaultValue, !0)
                      : on(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[rr] = i;
          } catch (w) {
            K(e, e.return, w);
          }
      }
      break;
    case 6:
      if (($e(t, e), Ve(e), r & 4)) {
        if (e.stateNode === null) throw Error(k(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (w) {
          K(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        ($e(t, e), Ve(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Jn(t.containerInfo);
        } catch (w) {
          K(e, e.return, w);
        }
      break;
    case 4:
      $e(t, e), Ve(e);
      break;
    case 13:
      $e(t, e),
        Ve(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (Xs = Y())),
        r & 4 && aa(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ce = (u = ce) || f), $e(t, e), (ce = u)) : $e(t, e),
        Ve(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !f && e.mode & 1)
        )
          for (C = e, f = e.child; f !== null; ) {
            for (h = C = f; C !== null; ) {
              switch (((g = C), (_ = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Vn(4, g, g.return);
                  break;
                case 1:
                  nn(g, g.return);
                  var m = g.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    (r = g), (n = g.return);
                    try {
                      (t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount();
                    } catch (w) {
                      K(r, n, w);
                    }
                  }
                  break;
                case 5:
                  nn(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    ca(h);
                    continue;
                  }
              }
              _ !== null ? ((_.return = g), (C = _)) : ca(h);
            }
            f = f.sibling;
          }
        e: for (f = null, h = e; ; ) {
          if (h.tag === 5) {
            if (f === null) {
              f = h;
              try {
                (o = h.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((l = h.stateNode),
                      (a = h.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = Za("display", s)));
              } catch (w) {
                K(e, e.return, w);
              }
            }
          } else if (h.tag === 6) {
            if (f === null)
              try {
                h.stateNode.nodeValue = u ? "" : h.memoizedProps;
              } catch (w) {
                K(e, e.return, w);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            (h.child.return = h), (h = h.child);
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            f === h && (f = null), (h = h.return);
          }
          f === h && (f = null), (h.sibling.return = h.return), (h = h.sibling);
        }
      }
      break;
    case 19:
      $e(t, e), Ve(e), r & 4 && aa(e);
      break;
    case 21:
      break;
    default:
      $e(t, e), Ve(e);
  }
}
function Ve(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ec(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Xn(o, ""), (r.flags &= -33));
          var i = la(e);
          rs(e, i, o);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = la(e);
          ns(e, l, s);
          break;
        default:
          throw Error(k(161));
      }
    } catch (a) {
      K(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function sh(e, t, n) {
  (C = e), Nc(e);
}
function Nc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var o = C,
      i = o.child;
    if (o.tag === 22 && r) {
      var s = o.memoizedState !== null || Lr;
      if (!s) {
        var l = o.alternate,
          a = (l !== null && l.memoizedState !== null) || ce;
        l = Lr;
        var u = ce;
        if (((Lr = s), (ce = a) && !u))
          for (C = o; C !== null; )
            (s = C),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? da(o)
                : a !== null
                ? ((a.return = s), (C = a))
                : da(o);
        for (; i !== null; ) (C = i), Nc(i), (i = i.sibling);
        (C = o), (Lr = l), (ce = u);
      }
      ua(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (C = i)) : ua(e);
  }
}
function ua(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ce || Io(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ce)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Oe(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Kl(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Kl(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var f = u.memoizedState;
                  if (f !== null) {
                    var h = f.dehydrated;
                    h !== null && Jn(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        ce || (t.flags & 512 && ts(t));
      } catch (g) {
        K(t, t.return, g);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function ca(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function da(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Io(4, t);
          } catch (a) {
            K(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              K(t, o, a);
            }
          }
          var i = t.return;
          try {
            ts(t);
          } catch (a) {
            K(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ts(t);
          } catch (a) {
            K(t, s, a);
          }
      }
    } catch (a) {
      K(t, t.return, a);
    }
    if (t === e) {
      C = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (C = l);
      break;
    }
    C = t.return;
  }
}
var lh = Math.ceil,
  go = it.ReactCurrentDispatcher,
  bs = it.ReactCurrentOwner,
  je = it.ReactCurrentBatchConfig,
  $ = 0,
  oe = null,
  J = null,
  se = 0,
  ke = 0,
  rn = xt(0),
  te = 0,
  ur = null,
  Ft = 0,
  Do = 0,
  Ks = 0,
  Qn = null,
  ve = null,
  Xs = 0,
  vn = 1 / 0,
  Ye = null,
  mo = !1,
  os = null,
  yt = null,
  Mr = !1,
  ft = null,
  vo = 0,
  bn = 0,
  is = null,
  br = -1,
  Kr = 0;
function pe() {
  return $ & 6 ? Y() : br !== -1 ? br : (br = Y());
}
function _t(e) {
  return e.mode & 1
    ? $ & 2 && se !== 0
      ? se & -se
      : Vf.transition !== null
      ? (Kr === 0 && (Kr = fu()), Kr)
      : ((e = O),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : _u(e.type))),
        e)
    : 1;
}
function Be(e, t, n, r) {
  if (50 < bn) throw ((bn = 0), (is = null), Error(k(185)));
  hr(e, n, r),
    (!($ & 2) || e !== oe) &&
      (e === oe && (!($ & 2) && (Do |= n), te === 4 && ct(e, se)),
      Se(e, r),
      n === 1 && $ === 0 && !(t.mode & 1) && ((vn = Y() + 500), To && Et()));
}
function Se(e, t) {
  var n = e.callbackNode;
  Wd(e, t);
  var r = Zr(e, e === oe ? se : 0);
  if (r === 0)
    n !== null && wl(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && wl(n), t === 1))
      e.tag === 0 ? Wf(fa.bind(null, e)) : Uu(fa.bind(null, e)),
        Af(function () {
          !($ & 6) && Et();
        }),
        (n = null);
    else {
      switch (hu(r)) {
        case 1:
          n = ws;
          break;
        case 4:
          n = cu;
          break;
        case 16:
          n = Jr;
          break;
        case 536870912:
          n = du;
          break;
        default:
          n = Jr;
      }
      n = $c(n, Rc.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Rc(e, t) {
  if (((br = -1), (Kr = 0), $ & 6)) throw Error(k(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Zr(e, e === oe ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = yo(e, r);
  else {
    t = r;
    var o = $;
    $ |= 2;
    var i = Dc();
    (oe !== e || se !== t) && ((Ye = null), (vn = Y() + 500), Lt(e, t));
    do
      try {
        ch();
        break;
      } catch (l) {
        Ic(e, l);
      }
    while (!0);
    Ls(),
      (go.current = i),
      ($ = o),
      J !== null ? (t = 0) : ((oe = null), (se = 0), (t = te));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = ji(e)), o !== 0 && ((r = o), (t = ss(e, o)))), t === 1)
    )
      throw ((n = ur), Lt(e, 0), ct(e, r), Se(e, Y()), n);
    if (t === 6) ct(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !ah(o) &&
          ((t = yo(e, r)),
          t === 2 && ((i = ji(e)), i !== 0 && ((r = i), (t = ss(e, i)))),
          t === 1))
      )
        throw ((n = ur), Lt(e, 0), ct(e, r), Se(e, Y()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          Rt(e, ve, Ye);
          break;
        case 3:
          if (
            (ct(e, r), (r & 130023424) === r && ((t = Xs + 500 - Y()), 10 < t))
          ) {
            if (Zr(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              pe(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = Fi(Rt.bind(null, e, ve, Ye), t);
            break;
          }
          Rt(e, ve, Ye);
          break;
        case 4:
          if ((ct(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var s = 31 - He(r);
            (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
          }
          if (
            ((r = o),
            (r = Y() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * lh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Fi(Rt.bind(null, e, ve, Ye), r);
            break;
          }
          Rt(e, ve, Ye);
          break;
        case 5:
          Rt(e, ve, Ye);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Se(e, Y()), e.callbackNode === n ? Rc.bind(null, e) : null;
}
function ss(e, t) {
  var n = Qn;
  return (
    e.current.memoizedState.isDehydrated && (Lt(e, t).flags |= 256),
    (e = yo(e, t)),
    e !== 2 && ((t = ve), (ve = n), t !== null && ls(t)),
    e
  );
}
function ls(e) {
  ve === null ? (ve = e) : ve.push.apply(ve, e);
}
function ah(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!We(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function ct(e, t) {
  for (
    t &= ~Ks,
      t &= ~Do,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - He(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function fa(e) {
  if ($ & 6) throw Error(k(327));
  cn();
  var t = Zr(e, 0);
  if (!(t & 1)) return Se(e, Y()), null;
  var n = yo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ji(e);
    r !== 0 && ((t = r), (n = ss(e, r)));
  }
  if (n === 1) throw ((n = ur), Lt(e, 0), ct(e, t), Se(e, Y()), n);
  if (n === 6) throw Error(k(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Rt(e, ve, Ye),
    Se(e, Y()),
    null
  );
}
function qs(e, t) {
  var n = $;
  $ |= 1;
  try {
    return e(t);
  } finally {
    ($ = n), $ === 0 && ((vn = Y() + 500), To && Et());
  }
}
function Ht(e) {
  ft !== null && ft.tag === 0 && !($ & 6) && cn();
  var t = $;
  $ |= 1;
  var n = je.transition,
    r = O;
  try {
    if (((je.transition = null), (O = 1), e)) return e();
  } finally {
    (O = r), (je.transition = n), ($ = t), !($ & 6) && Et();
  }
}
function Ys() {
  (ke = rn.current), H(rn);
}
function Lt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Uf(n)), J !== null))
    for (n = J.return; n !== null; ) {
      var r = n;
      switch ((Is(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && oo();
          break;
        case 3:
          gn(), H(_e), H(fe), As();
          break;
        case 5:
          Us(r);
          break;
        case 4:
          gn();
          break;
        case 13:
          H(W);
          break;
        case 19:
          H(W);
          break;
        case 10:
          Ms(r.type._context);
          break;
        case 22:
        case 23:
          Ys();
      }
      n = n.return;
    }
  if (
    ((oe = e),
    (J = e = wt(e.current, null)),
    (se = ke = t),
    (te = 0),
    (ur = null),
    (Ks = Do = Ft = 0),
    (ve = Qn = null),
    Dt !== null)
  ) {
    for (t = 0; t < Dt.length; t++)
      if (((n = Dt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          (i.next = o), (r.next = s);
        }
        n.pending = r;
      }
    Dt = null;
  }
  return e;
}
function Ic(e, t) {
  do {
    var n = J;
    try {
      if ((Ls(), (Wr.current = po), ho)) {
        for (var r = Q.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        ho = !1;
      }
      if (
        ((At = 0),
        (re = ee = Q = null),
        (Wn = !1),
        (sr = 0),
        (bs.current = null),
        n === null || n.return === null)
      ) {
        (te = 1), (ur = t), (J = null);
        break;
      }
      e: {
        var i = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = se),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            f = l,
            h = f.tag;
          if (!(f.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var g = f.alternate;
            g
              ? ((f.updateQueue = g.updateQueue),
                (f.memoizedState = g.memoizedState),
                (f.lanes = g.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var _ = Zl(s);
          if (_ !== null) {
            (_.flags &= -257),
              ea(_, s, l, i, t),
              _.mode & 1 && Jl(i, u, t),
              (t = _),
              (a = u);
            var m = t.updateQueue;
            if (m === null) {
              var w = new Set();
              w.add(a), (t.updateQueue = w);
            } else m.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Jl(i, u, t), Gs();
              break e;
            }
            a = Error(k(426));
          }
        } else if (B && l.mode & 1) {
          var R = Zl(s);
          if (R !== null) {
            !(R.flags & 65536) && (R.flags |= 256),
              ea(R, s, l, i, t),
              Ds(mn(a, l));
            break e;
          }
        }
        (i = a = mn(a, l)),
          te !== 4 && (te = 2),
          Qn === null ? (Qn = [i]) : Qn.push(i),
          (i = s);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var d = hc(i, a, t);
              bl(i, d);
              break e;
            case 1:
              l = a;
              var c = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (yt === null || !yt.has(p))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var S = pc(i, l, t);
                bl(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Lc(n);
    } catch (x) {
      (t = x), J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Dc() {
  var e = go.current;
  return (go.current = po), e === null ? po : e;
}
function Gs() {
  (te === 0 || te === 3 || te === 2) && (te = 4),
    oe === null || (!(Ft & 268435455) && !(Do & 268435455)) || ct(oe, se);
}
function yo(e, t) {
  var n = $;
  $ |= 2;
  var r = Dc();
  (oe !== e || se !== t) && ((Ye = null), Lt(e, t));
  do
    try {
      uh();
      break;
    } catch (o) {
      Ic(e, o);
    }
  while (!0);
  if ((Ls(), ($ = n), (go.current = r), J !== null)) throw Error(k(261));
  return (oe = null), (se = 0), te;
}
function uh() {
  for (; J !== null; ) jc(J);
}
function ch() {
  for (; J !== null && !Md(); ) jc(J);
}
function jc(e) {
  var t = zc(e.alternate, e, ke);
  (e.memoizedProps = e.pendingProps),
    t === null ? Lc(e) : (J = t),
    (bs.current = null);
}
function Lc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = rh(n, t)), n !== null)) {
        (n.flags &= 32767), (J = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (te = 6), (J = null);
        return;
      }
    } else if (((n = nh(n, t, ke)), n !== null)) {
      J = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Rt(e, t, n) {
  var r = O,
    o = je.transition;
  try {
    (je.transition = null), (O = 1), dh(e, t, n, r);
  } finally {
    (je.transition = o), (O = r);
  }
  return null;
}
function dh(e, t, n, r) {
  do cn();
  while (ft !== null);
  if ($ & 6) throw Error(k(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(k(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Vd(e, i),
    e === oe && ((J = oe = null), (se = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Mr ||
      ((Mr = !0),
      $c(Jr, function () {
        return cn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = je.transition), (je.transition = null);
    var s = O;
    O = 1;
    var l = $;
    ($ |= 4),
      (bs.current = null),
      ih(e, n),
      Tc(n, e),
      Df(Ui),
      (eo = !!Oi),
      (Ui = Oi = null),
      (e.current = n),
      sh(n),
      zd(),
      ($ = l),
      (O = s),
      (je.transition = i);
  } else e.current = n;
  if (
    (Mr && ((Mr = !1), (ft = e), (vo = o)),
    (i = e.pendingLanes),
    i === 0 && (yt = null),
    Ud(n.stateNode),
    Se(e, Y()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (mo) throw ((mo = !1), (e = os), (os = null), e);
  return (
    vo & 1 && e.tag !== 0 && cn(),
    (i = e.pendingLanes),
    i & 1 ? (e === is ? bn++ : ((bn = 0), (is = e))) : (bn = 0),
    Et(),
    null
  );
}
function cn() {
  if (ft !== null) {
    var e = hu(vo),
      t = je.transition,
      n = O;
    try {
      if (((je.transition = null), (O = 16 > e ? 16 : e), ft === null))
        var r = !1;
      else {
        if (((e = ft), (ft = null), (vo = 0), $ & 6)) throw Error(k(331));
        var o = $;
        for ($ |= 4, C = e.current; C !== null; ) {
          var i = C,
            s = i.child;
          if (C.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (C = u; C !== null; ) {
                  var f = C;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Vn(8, f, i);
                  }
                  var h = f.child;
                  if (h !== null) (h.return = f), (C = h);
                  else
                    for (; C !== null; ) {
                      f = C;
                      var g = f.sibling,
                        _ = f.return;
                      if ((xc(f), f === u)) {
                        C = null;
                        break;
                      }
                      if (g !== null) {
                        (g.return = _), (C = g);
                        break;
                      }
                      C = _;
                    }
                }
              }
              var m = i.alternate;
              if (m !== null) {
                var w = m.child;
                if (w !== null) {
                  m.child = null;
                  do {
                    var R = w.sibling;
                    (w.sibling = null), (w = R);
                  } while (w !== null);
                }
              }
              C = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) (s.return = i), (C = s);
          else
            e: for (; C !== null; ) {
              if (((i = C), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Vn(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                (d.return = i.return), (C = d);
                break e;
              }
              C = i.return;
            }
        }
        var c = e.current;
        for (C = c; C !== null; ) {
          s = C;
          var p = s.child;
          if (s.subtreeFlags & 2064 && p !== null) (p.return = s), (C = p);
          else
            e: for (s = c; C !== null; ) {
              if (((l = C), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Io(9, l);
                  }
                } catch (x) {
                  K(l, l.return, x);
                }
              if (l === s) {
                C = null;
                break e;
              }
              var S = l.sibling;
              if (S !== null) {
                (S.return = l.return), (C = S);
                break e;
              }
              C = l.return;
            }
        }
        if (
          (($ = o), Et(), Xe && typeof Xe.onPostCommitFiberRoot == "function")
        )
          try {
            Xe.onPostCommitFiberRoot(ko, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (O = n), (je.transition = t);
    }
  }
  return !1;
}
function ha(e, t, n) {
  (t = mn(n, t)),
    (t = hc(e, t, 1)),
    (e = vt(e, t, 1)),
    (t = pe()),
    e !== null && (hr(e, 1, t), Se(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) ha(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ha(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (yt === null || !yt.has(r)))
        ) {
          (e = mn(n, e)),
            (e = pc(t, e, 1)),
            (t = vt(t, e, 1)),
            (e = pe()),
            t !== null && (hr(t, 1, e), Se(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function fh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = pe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    oe === e &&
      (se & n) === n &&
      (te === 4 || (te === 3 && (se & 130023424) === se && 500 > Y() - Xs)
        ? Lt(e, 0)
        : (Ks |= n)),
    Se(e, t);
}
function Mc(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = xr), (xr <<= 1), !(xr & 130023424) && (xr = 4194304))
      : (t = 1));
  var n = pe();
  (e = rt(e, t)), e !== null && (hr(e, t, n), Se(e, n));
}
function hh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Mc(e, n);
}
function ph(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  r !== null && r.delete(t), Mc(e, n);
}
var zc;
zc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || _e.current) ye = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (ye = !1), th(e, t, n);
      ye = !!(e.flags & 131072);
    }
  else (ye = !1), B && t.flags & 1048576 && Au(t, lo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Qr(e, t), (e = t.pendingProps);
      var o = fn(t, fe.current);
      un(t, n), (o = Hs(null, t, r, e, o, n));
      var i = Bs();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            we(r) ? ((i = !0), io(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            $s(t),
            (o.updater = Ro),
            (t.stateNode = o),
            (o._reactInternals = t),
            Ki(t, r, e, n),
            (t = Yi(null, t, r, !0, i, n)))
          : ((t.tag = 0), B && i && Rs(t), he(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Qr(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = mh(r)),
          (e = Oe(r, e)),
          o)
        ) {
          case 0:
            t = qi(null, t, r, e, n);
            break e;
          case 1:
            t = ra(null, t, r, e, n);
            break e;
          case 11:
            t = ta(null, t, r, e, n);
            break e;
          case 14:
            t = na(null, t, r, Oe(r.type, e), n);
            break e;
        }
        throw Error(k(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Oe(r, o)),
        qi(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Oe(r, o)),
        ra(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((yc(t), e === null)) throw Error(k(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Qu(e, t),
          co(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = mn(Error(k(423)), t)), (t = oa(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = mn(Error(k(424)), t)), (t = oa(e, t, r, n, o));
            break e;
          } else
            for (
              Ce = mt(t.stateNode.containerInfo.firstChild),
                Ee = t,
                B = !0,
                Ae = null,
                n = Wu(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((hn(), r === o)) {
            t = ot(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        bu(t),
        e === null && Vi(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = o.children),
        Ai(r, o) ? (s = null) : i !== null && Ai(r, i) && (t.flags |= 32),
        vc(e, t),
        he(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && Vi(t), null;
    case 13:
      return _c(e, t, n);
    case 4:
      return (
        Os(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = pn(t, null, r, n)) : he(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Oe(r, o)),
        ta(e, t, r, o, n)
      );
    case 7:
      return he(e, t, t.pendingProps, n), t.child;
    case 8:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (s = o.value),
          U(ao, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (We(i.value, s)) {
            if (i.children === o.children && !_e.current) {
              t = ot(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                s = i.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      (a = et(-1, n & -n)), (a.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var f = u.pending;
                        f === null
                          ? (a.next = a)
                          : ((a.next = f.next), (f.next = a)),
                          (u.pending = a);
                      }
                    }
                    (i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Qi(i.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(k(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  Qi(s, n, t),
                  (s = i.sibling);
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    (i.return = s.return), (s = i);
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        he(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        un(t, n),
        (o = Le(o)),
        (r = r(o)),
        (t.flags |= 1),
        he(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Oe(r, t.pendingProps)),
        (o = Oe(r.type, o)),
        na(e, t, r, o, n)
      );
    case 15:
      return gc(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Oe(r, o)),
        Qr(e, t),
        (t.tag = 1),
        we(r) ? ((e = !0), io(t)) : (e = !1),
        un(t, n),
        fc(t, r, o),
        Ki(t, r, o, n),
        Yi(null, t, r, !0, e, n)
      );
    case 19:
      return wc(e, t, n);
    case 22:
      return mc(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function $c(e, t) {
  return uu(e, t);
}
function gh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function De(e, t, n, r) {
  return new gh(e, t, n, r);
}
function Js(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function mh(e) {
  if (typeof e == "function") return Js(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === vs)) return 11;
    if (e === ys) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = De(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Xr(e, t, n, r, o, i) {
  var s = 2;
  if (((r = e), typeof e == "function")) Js(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Kt:
        return Mt(n.children, o, i, t);
      case ms:
        (s = 8), (o |= 8);
        break;
      case vi:
        return (
          (e = De(12, n, t, o | 2)), (e.elementType = vi), (e.lanes = i), e
        );
      case yi:
        return (e = De(13, n, t, o)), (e.elementType = yi), (e.lanes = i), e;
      case _i:
        return (e = De(19, n, t, o)), (e.elementType = _i), (e.lanes = i), e;
      case ba:
        return jo(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Va:
              s = 10;
              break e;
            case Qa:
              s = 9;
              break e;
            case vs:
              s = 11;
              break e;
            case ys:
              s = 14;
              break e;
            case lt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(k(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = De(s, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function Mt(e, t, n, r) {
  return (e = De(7, e, r, t)), (e.lanes = n), e;
}
function jo(e, t, n, r) {
  return (
    (e = De(22, e, r, t)),
    (e.elementType = ba),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function fi(e, t, n) {
  return (e = De(6, e, null, t)), (e.lanes = n), e;
}
function hi(e, t, n) {
  return (
    (t = De(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function vh(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ko(0)),
    (this.expirationTimes = Ko(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ko(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function Zs(e, t, n, r, o, i, s, l, a) {
  return (
    (e = new vh(e, t, n, l, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = De(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    $s(i),
    e
  );
}
function yh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: bt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Oc(e) {
  if (!e) return kt;
  e = e._reactInternals;
  e: {
    if (Vt(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (we(n)) return Ou(e, n, t);
  }
  return t;
}
function Uc(e, t, n, r, o, i, s, l, a) {
  return (
    (e = Zs(n, r, !0, e, o, i, s, l, a)),
    (e.context = Oc(null)),
    (n = e.current),
    (r = pe()),
    (o = _t(n)),
    (i = et(r, o)),
    (i.callback = t ?? null),
    vt(n, i, o),
    (e.current.lanes = o),
    hr(e, o, r),
    Se(e, r),
    e
  );
}
function Lo(e, t, n, r) {
  var o = t.current,
    i = pe(),
    s = _t(o);
  return (
    (n = Oc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = et(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = vt(o, t, s)),
    e !== null && (Be(e, o, s, i), Br(e, o, s)),
    s
  );
}
function _o(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function pa(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function el(e, t) {
  pa(e, t), (e = e.alternate) && pa(e, t);
}
function _h() {
  return null;
}
var Ac =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function tl(e) {
  this._internalRoot = e;
}
Mo.prototype.render = tl.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Lo(e, t, null, null);
};
Mo.prototype.unmount = tl.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ht(function () {
      Lo(null, e, null, null);
    }),
      (t[nt] = null);
  }
};
function Mo(e) {
  this._internalRoot = e;
}
Mo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = mu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++);
    ut.splice(n, 0, e), n === 0 && yu(e);
  }
};
function nl(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function zo(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function ga() {}
function wh(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = _o(s);
        i.call(u);
      };
    }
    var s = Uc(t, r, e, 0, null, !1, !1, "", ga);
    return (
      (e._reactRootContainer = s),
      (e[nt] = s.current),
      tr(e.nodeType === 8 ? e.parentNode : e),
      Ht(),
      s
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = _o(a);
      l.call(u);
    };
  }
  var a = Zs(e, 0, !1, null, null, !1, !1, "", ga);
  return (
    (e._reactRootContainer = a),
    (e[nt] = a.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    Ht(function () {
      Lo(t, a, n, r);
    }),
    a
  );
}
function $o(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof o == "function") {
      var l = o;
      o = function () {
        var a = _o(s);
        l.call(a);
      };
    }
    Lo(t, s, e, o);
  } else s = wh(n, t, e, o, r);
  return _o(s);
}
pu = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 &&
          (Ss(t, n | 1), Se(t, Y()), !($ & 6) && ((vn = Y() + 500), Et()));
      }
      break;
    case 13:
      Ht(function () {
        var r = rt(e, 1);
        if (r !== null) {
          var o = pe();
          Be(r, e, 1, o);
        }
      }),
        el(e, 1);
  }
};
ks = function (e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var n = pe();
      Be(t, e, 134217728, n);
    }
    el(e, 134217728);
  }
};
gu = function (e) {
  if (e.tag === 13) {
    var t = _t(e),
      n = rt(e, t);
    if (n !== null) {
      var r = pe();
      Be(n, e, t, r);
    }
    el(e, t);
  }
};
mu = function () {
  return O;
};
vu = function (e, t) {
  var n = O;
  try {
    return (O = e), t();
  } finally {
    O = n;
  }
};
Ri = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ki(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Po(r);
            if (!o) throw Error(k(90));
            Xa(r), ki(r, o);
          }
        }
      }
      break;
    case "textarea":
      Ya(e, n);
      break;
    case "select":
      (t = n.value), t != null && on(e, !!n.multiple, t, !1);
  }
};
ru = qs;
ou = Ht;
var Sh = { usingClientEntryPoint: !1, Events: [gr, Gt, Po, tu, nu, qs] },
  Ln = {
    findFiberByHostInstance: It,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  kh = {
    bundleType: Ln.bundleType,
    version: Ln.version,
    rendererPackageName: Ln.rendererPackageName,
    rendererConfig: Ln.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: it.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = lu(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Ln.findFiberByHostInstance || _h,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var zr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!zr.isDisabled && zr.supportsFiber)
    try {
      (ko = zr.inject(kh)), (Xe = zr);
    } catch {}
}
Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sh;
Te.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!nl(t)) throw Error(k(200));
  return yh(e, t, null, n);
};
Te.createRoot = function (e, t) {
  if (!nl(e)) throw Error(k(299));
  var n = !1,
    r = "",
    o = Ac;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Zs(e, 1, !1, null, null, n, !1, r, o)),
    (e[nt] = t.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    new tl(t)
  );
};
Te.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(k(188))
      : ((e = Object.keys(e).join(",")), Error(k(268, e)));
  return (e = lu(t)), (e = e === null ? null : e.stateNode), e;
};
Te.flushSync = function (e) {
  return Ht(e);
};
Te.hydrate = function (e, t, n) {
  if (!zo(t)) throw Error(k(200));
  return $o(null, e, t, !0, n);
};
Te.hydrateRoot = function (e, t, n) {
  if (!nl(e)) throw Error(k(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    s = Ac;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Uc(t, null, e, 1, n ?? null, o, !1, i, s)),
    (e[nt] = t.current),
    tr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new Mo(t);
};
Te.render = function (e, t, n) {
  if (!zo(t)) throw Error(k(200));
  return $o(null, e, t, !1, n);
};
Te.unmountComponentAtNode = function (e) {
  if (!zo(e)) throw Error(k(40));
  return e._reactRootContainer
    ? (Ht(function () {
        $o(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[nt] = null);
        });
      }),
      !0)
    : !1;
};
Te.unstable_batchedUpdates = qs;
Te.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!zo(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return $o(e, t, n, !1, r);
};
Te.version = "18.3.1-next-f1338f8080-20240426";
function Fc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fc);
    } catch (e) {
      console.error(e);
    }
}
Fc(), (Fa.exports = Te);
var Ch = Fa.exports,
  Hc,
  ma = Ch;
(Hc = ma.createRoot), ma.hydrateRoot;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var xh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Eh = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .trim(),
  Cn = (e, t) => {
    const n = I.forwardRef(
      (
        {
          color: r = "currentColor",
          size: o = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: s,
          className: l = "",
          children: a,
          ...u
        },
        f
      ) =>
        I.createElement(
          "svg",
          {
            ref: f,
            ...xh,
            width: o,
            height: o,
            stroke: r,
            strokeWidth: s ? (Number(i) * 24) / Number(o) : i,
            className: ["lucide", `lucide-${Eh(e)}`, l].join(" "),
            ...u,
          },
          [
            ...t.map(([h, g]) => I.createElement(h, g)),
            ...(Array.isArray(a) ? a : [a]),
          ]
        )
    );
    return (n.displayName = `${e}`), n;
  };
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ph = Cn("AlertCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Th = Cn("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const as = Cn("Package", [
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay",
    },
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Nh = Cn("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f",
    },
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rh = Cn("XCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rl = Cn("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
function Ih({ stationName: e, userName: t, userRole: n, onSettingsClick: r }) {
  return y.jsx("header", {
    className: "bg-white shadow-md px-6 py-4",
    children: y.jsxs("div", {
      className: "flex items-center justify-between",
      children: [
        y.jsx("h1", {
          className: "text-2xl font-bold text-slate-800",
          children: e,
        }),
        y.jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            y.jsxs("span", {
              className: "text-slate-600",
              children: [
                "登入人員：",
                y.jsx("span", { className: "font-medium", children: t }),
                " / ",
                n,
              ],
            }),
            y.jsx("button", {
              onClick: r,
              className: "p-2 hover:bg-slate-100 rounded-lg transition-colors",
              "aria-label": "設定",
              children: y.jsx(Nh, { className: "w-6 h-6 text-slate-600" }),
            }),
          ],
        }),
      ],
    }),
  });
}
function Dh() {
  return y.jsx("footer", {
    className: "bg-white border-t border-slate-200 py-2 mt-auto",
    children: y.jsx("div", {
      className: "text-center text-slate-600 text-sm",
      children: "Copyright ©2025 鴻森智能科技",
    }),
  });
}
function jh({ title: e, number: t, bgColor: n, textColor: r }) {
  return y.jsxs("div", {
    className: `${n} rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow`,
    children: [
      y.jsx("h2", { className: `text-3xl font-bold ${r} mb-6`, children: e }),
      y.jsx("div", {
        className: "text-center",
        children: y.jsx("p", {
          className: `text-7xl font-bold ${r} tabular-nums`,
          children: t,
        }),
      }),
    ],
  });
}
let pi = null;
const yn = async () => {
    if (pi) return pi;
    try {
      const t = await (await fetch("/config.txt")).json();
      return (pi = t), t;
    } catch (e) {
      return (
        console.error("Failed to load config:", e), { domain: "", homepage: "" }
      );
    }
  },
  va = async (e, t, n, r) => {
    const i = `${(await yn()).domain}/api/materialRequisition/add`,
      s = {
        Data: e.map((l) => ({
          actionType: l.actionType,
          code: l.code,
          name: l.name,
          requestedQuantity: l.requestedQuantity,
          requestingUnit: l.requestingUnit,
          issuingUnit: r,
          requestingPerson: t,
          requestingPersonID: n,
          state: "等待過帳",
          temp_GUID: l.temp_GUID,
        })),
      };
    console.log("[addMedicineRequest] URL:", i),
      console.log("[addMedicineRequest] Payload:", s);
    try {
      const l = await fetch(i, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (
        (console.log("[addMedicineRequest] Response status:", l.status), !l.ok)
      )
        throw new Error(`HTTP error! status: ${l.status}`);
      const a = await l.json();
      return console.log("[addMedicineRequest] Response data:", a), a;
    } catch (l) {
      throw (console.error("[addMedicineRequest] Error:", l), l);
    }
  },
  ya = async (e) => {
    const n = `${(await yn()).domain}/api/Message`;
    console.log("[sendMessage] URL:", n),
      console.log("[sendMessage] Payload:", e);
    try {
      const r = await fetch(n, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if ((console.log("[sendMessage] Response status:", r.status), !r.ok))
        throw new Error(`HTTP error! status: ${r.status}`);
      console.log("[sendMessage] Message sent successfully");
    } catch (r) {
      throw (console.error("[sendMessage] Error:", r), r);
    }
  },
  _a = async (e) => {
    const n = `${(await yn()).domain}/api/ServerSetting/get_name`,
      r = {};
    console.log("[getServerSettingByType] URL:", n),
      console.log("[getServerSettingByType] Payload:", r);
    try {
      const o = await fetch(n, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r),
      });
      if (
        (console.log("[getServerSettingByType] Response status:", o.status),
        !o.ok)
      )
        throw new Error(`HTTP error! status: ${o.status}`);
      const i = await o.json();
      return (
        console.log("[getServerSettingByType] Response data:", i), i.Data || []
      );
    } catch (o) {
      throw (console.error("[getServerSettingByType] Error:", o), o);
    }
  },
  Bc = "pharmacy-display-settings",
  Wc = "stationName",
  wa = {
    showOutpatientOdd: !0,
    showOutpatientEven: !0,
    showEmergency: !0,
    showInpatient: !0,
  },
  Lh = () => {
    try {
      const e = localStorage.getItem(Bc);
      if (e) return { ...wa, ...JSON.parse(e) };
    } catch (e) {
      console.error("Failed to load settings:", e);
    }
    return wa;
  },
  Mh = (e) => {
    try {
      localStorage.setItem(Bc, JSON.stringify(e));
    } catch (t) {
      console.error("Failed to save settings:", t);
    }
  },
  zh = () => {
    try {
      return localStorage.getItem(Wc);
    } catch (e) {
      return console.error("Failed to load station name:", e), null;
    }
  },
  Sa = (e) => {
    try {
      localStorage.setItem(Wc, e);
    } catch (t) {
      console.error("Failed to save station name:", t);
    }
  },
  Vc = I.createContext(void 0);
function $h({ children: e }) {
  const [t, n] = I.useState([]),
    [r, o] = I.useState([]),
    [i, s] = I.useState(""),
    [l, a] = I.useState(!0);
  I.useEffect(() => {
    (async () => {
      try {
        console.log("[ServerSettings] Fetching server settings...");
        const [g, _] = await Promise.all([_a("調劑台"), _a("藥庫")]);
        console.log("[ServerSettings] Stations:", g),
          console.log("[ServerSettings] Pharmacies:", _),
          n(g),
          o(_);
        const m = zh();
        if (
          (console.log("[ServerSettings] Saved station name:", m),
          m && g.some((w) => w.name === m))
        )
          s(m);
        else if (g.length > 0) {
          const w = g[0].name;
          console.log("[ServerSettings] Using default station:", w),
            s(w),
            Sa(w);
        }
      } catch (g) {
        console.error("[ServerSettings] Failed to fetch server settings:", g);
      } finally {
        a(!1);
      }
    })();
  }, []);
  const f = {
    stations: t,
    pharmacies: r,
    currentStationName: i,
    setCurrentStationName: (h) => {
      console.log("[ServerSettings] Changing station to:", h), s(h), Sa(h);
    },
    isLoading: l,
  };
  return y.jsx(Vc.Provider, { value: f, children: e });
}
function Oo() {
  const e = I.useContext(Vc);
  if (!e)
    throw new Error(
      "useServerSettings must be used within ServerSettingsProvider"
    );
  return e;
}
const Oh = async (e) => {
    try {
      const n = `${(await yn()).domain}/api/session/get_login_session`;
      console.log("[getLoginSessions] URL:", n),
        console.log("[getLoginSessions] Current Station:", e);
      const r = await fetch(n, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
      if ((console.log("[getLoginSessions] Response status:", r.status), !r.ok))
        throw new Error(`HTTP error! status: ${r.status}`);
      const o = await r.json();
      if (
        (console.log("[getLoginSessions] Response data:", o),
        o.Code === 200 && o.Data && Array.isArray(o.Data))
      ) {
        const i = o.Data.filter(
          (s) => s.serverName === e && s.state === "login"
        );
        return (
          console.log(
            "[getLoginSessions] Filtered sessions (station + login state):",
            i
          ),
          i.map((s) => ({
            name: s.Name,
            id: s.ID,
            guid: s.GUID,
            role: s.Employer,
            employer: s.Employer,
            loginTime: s.loginTime,
            serverName: s.serverName,
          }))
        );
      }
      return [];
    } catch (t) {
      throw (console.error("[getLoginSessions] Error:", t), t);
    }
  },
  Qc = I.createContext(void 0),
  ka = 2e3,
  Uh = 1e4,
  Ah = 1.5;
function Fh({ children: e, currentStationName: t }) {
  const [n, r] = I.useState([]),
    [o, i] = I.useState(null),
    [s, l] = I.useState(!0),
    [a, u] = I.useState(null),
    f = I.useRef(Date.now()),
    h = I.useRef(ka),
    g = I.useRef(!0),
    _ = I.useRef(null),
    m = async () => {
      try {
        console.log("[UserContext] Fetching login sessions...");
        const d = await Oh(t);
        return (
          console.log("[UserContext] Sessions received:", d),
          r(d),
          u(null),
          (h.current = ka),
          d.length === 0
            ? i(null)
            : (o === null || !d.find((c) => c.guid === o.guid)) && i(d[0]),
          !0
        );
      } catch (d) {
        return (
          console.error("[UserContext] Failed to fetch login sessions:", d),
          u(d),
          r([]),
          i(null),
          (h.current = Math.min(h.current * Ah, Uh)),
          console.log("[UserContext] Retry interval adjusted to:", h.current),
          !1
        );
      } finally {
        l(!1);
      }
    },
    w = () => {
      if (!g.current) return;
      const d = Date.now(),
        c = Math.max(0, f.current - d);
      _.current !== null && clearTimeout(_.current),
        (_.current = window.setTimeout(async () => {
          if (!g.current) return;
          Date.now() >= f.current &&
            (await m(), (f.current = Date.now() + h.current)),
            w();
        }, c || h.current));
    };
  I.useEffect(
    () => (
      (g.current = !0),
      (f.current = Date.now()),
      (async () => {
        await m(), (f.current = Date.now() + h.current), w();
      })(),
      () => {
        (g.current = !1),
          _.current !== null && (clearTimeout(_.current), (_.current = null));
      }
    ),
    [t]
  );
  const R = {
    availableUsers: n,
    selectedUser: o,
    isLoggedIn: o !== null,
    isLoading: s,
    error: a,
    setSelectedUser: i,
  };
  return y.jsx(Qc.Provider, { value: R, children: e });
}
function bc() {
  const e = I.useContext(Qc);
  if (!e) throw new Error("useUser must be used within UserProvider");
  return e;
}
function Hh({ isOpen: e, onClose: t, settings: n, onSettingsChange: r }) {
  const { stations: o, currentStationName: i, setCurrentStationName: s } = Oo(),
    { availableUsers: l, selectedUser: a, setSelectedUser: u } = bc();
  if (!e) return null;
  const f = (m) => {
      r({ ...n, [m]: !n[m] });
    },
    h = (m) => {
      s(m.target.value);
    },
    g = (m) => {
      const w = m.target.value;
      if (w === "") u(null);
      else {
        const R = l.find((d) => d.guid === w);
        R && u(R);
      }
    },
    _ = [
      { key: "showOutpatientOdd", label: "顯示門診單號" },
      { key: "showOutpatientEven", label: "顯示門診雙號" },
      { key: "showEmergency", label: "顯示急診" },
      { key: "showInpatient", label: "顯示住院" },
    ];
  return y.jsx("div", {
    className:
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
    children: y.jsxs("div", {
      className: "bg-white rounded-xl shadow-2xl max-w-md w-full",
      children: [
        y.jsxs("div", {
          className:
            "flex items-center justify-between p-6 border-b border-slate-200",
          children: [
            y.jsx("h2", {
              className: "text-2xl font-bold text-slate-800",
              children: "監控視窗顯示設定",
            }),
            y.jsx("button", {
              onClick: t,
              className: "p-2 hover:bg-slate-100 rounded-lg transition-colors",
              "aria-label": "關閉",
              children: y.jsx(rl, { className: "w-6 h-6 text-slate-600" }),
            }),
          ],
        }),
        y.jsxs("div", {
          className: "p-6 space-y-4",
          children: [
            y.jsxs("div", {
              className: "pb-4 border-b border-slate-200",
              children: [
                y.jsx("label", {
                  htmlFor: "station-select",
                  className: "block text-lg text-slate-700 mb-2",
                  children: "調劑台選擇",
                }),
                y.jsx("select", {
                  id: "station-select",
                  value: i,
                  onChange: h,
                  className:
                    "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700",
                  children: o.map((m) =>
                    y.jsx("option", { value: m.name, children: m.name }, m.name)
                  ),
                }),
              ],
            }),
            y.jsxs("div", {
              className: "pb-4 border-b border-slate-200",
              children: [
                y.jsx("label", {
                  htmlFor: "user-select",
                  className: "block text-lg text-slate-700 mb-2",
                  children: "登入人員",
                }),
                y.jsx("select", {
                  id: "user-select",
                  value: (a == null ? void 0 : a.guid) || "",
                  onChange: g,
                  className:
                    "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700",
                  disabled: l.length === 0,
                  children:
                    l.length === 0
                      ? y.jsx("option", { value: "", children: "未登入" })
                      : y.jsxs(y.Fragment, {
                          children: [
                            y.jsx("option", {
                              value: "",
                              children: "請選擇登入人員",
                            }),
                            l.map((m) =>
                              y.jsxs(
                                "option",
                                {
                                  value: m.guid,
                                  children: [m.name, " (", m.id, ")"],
                                },
                                m.guid
                              )
                            ),
                          ],
                        }),
                }),
                l.length === 0 &&
                  y.jsx("p", {
                    className: "mt-2 text-sm text-red-600",
                    children: "目前沒有登入人員",
                  }),
              ],
            }),
            _.map((m) =>
              y.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-3",
                  children: [
                    y.jsx("label", {
                      htmlFor: m.key,
                      className: "text-lg text-slate-700 cursor-pointer",
                      children: m.label,
                    }),
                    y.jsx("button", {
                      id: m.key,
                      role: "switch",
                      "aria-checked": n[m.key],
                      onClick: () => f(m.key),
                      className: `relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        n[m.key] ? "bg-green-500" : "bg-slate-300"
                      }`,
                      children: y.jsx("span", {
                        className: `inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          n[m.key] ? "translate-x-7" : "translate-x-1"
                        }`,
                      }),
                    }),
                  ],
                },
                m.key
              )
            ),
          ],
        }),
        y.jsx("div", {
          className: "p-6 border-t border-slate-200",
          children: y.jsx("button", {
            onClick: t,
            className:
              "w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors",
            children: "關閉",
          }),
        }),
      ],
    }),
  });
}
class zt extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(`${t}: Status code '${n}'`),
      (this.statusCode = n),
      (this.__proto__ = r);
  }
}
class ol extends Error {
  constructor(t = "A timeout occurred.") {
    const n = new.target.prototype;
    super(t), (this.__proto__ = n);
  }
}
class Fe extends Error {
  constructor(t = "An abort occurred.") {
    const n = new.target.prototype;
    super(t), (this.__proto__ = n);
  }
}
class Bh extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "UnsupportedTransportError"),
      (this.__proto__ = r);
  }
}
class Wh extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "DisabledTransportError"),
      (this.__proto__ = r);
  }
}
class Vh extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t),
      (this.transport = n),
      (this.errorType = "FailedToStartTransportError"),
      (this.__proto__ = r);
  }
}
class Ca extends Error {
  constructor(t) {
    const n = new.target.prototype;
    super(t),
      (this.errorType = "FailedToNegotiateWithServerError"),
      (this.__proto__ = n);
  }
}
class Qh extends Error {
  constructor(t, n) {
    const r = new.target.prototype;
    super(t), (this.innerErrors = n), (this.__proto__ = r);
  }
}
class Kc {
  constructor(t, n, r) {
    (this.statusCode = t), (this.statusText = n), (this.content = r);
  }
}
class Uo {
  get(t, n) {
    return this.send({ ...n, method: "GET", url: t });
  }
  post(t, n) {
    return this.send({ ...n, method: "POST", url: t });
  }
  delete(t, n) {
    return this.send({ ...n, method: "DELETE", url: t });
  }
  getCookieString(t) {
    return "";
  }
}
var v;
(function (e) {
  (e[(e.Trace = 0)] = "Trace"),
    (e[(e.Debug = 1)] = "Debug"),
    (e[(e.Information = 2)] = "Information"),
    (e[(e.Warning = 3)] = "Warning"),
    (e[(e.Error = 4)] = "Error"),
    (e[(e.Critical = 5)] = "Critical"),
    (e[(e.None = 6)] = "None");
})(v || (v = {}));
class cr {
  constructor() {}
  log(t, n) {}
}
cr.instance = new cr();
const bh = "10.0.0";
class G {
  static isRequired(t, n) {
    if (t == null) throw new Error(`The '${n}' argument is required.`);
  }
  static isNotEmpty(t, n) {
    if (!t || t.match(/^\s*$/))
      throw new Error(`The '${n}' argument should not be empty.`);
  }
  static isIn(t, n, r) {
    if (!(t in n)) throw new Error(`Unknown ${r} value: ${t}.`);
  }
}
class V {
  static get isBrowser() {
    return (
      !V.isNode &&
      typeof window == "object" &&
      typeof window.document == "object"
    );
  }
  static get isWebWorker() {
    return !V.isNode && typeof self == "object" && "importScripts" in self;
  }
  static get isReactNative() {
    return (
      !V.isNode && typeof window == "object" && typeof window.document > "u"
    );
  }
  static get isNode() {
    return (
      typeof process < "u" && process.release && process.release.name === "node"
    );
  }
}
function dr(e, t) {
  let n = "";
  return (
    Bt(e)
      ? ((n = `Binary data of length ${e.byteLength}`),
        t && (n += `. Content: '${Kh(e)}'`))
      : typeof e == "string" &&
        ((n = `String data of length ${e.length}`),
        t && (n += `. Content: '${e}'`)),
    n
  );
}
function Kh(e) {
  const t = new Uint8Array(e);
  let n = "";
  return (
    t.forEach((r) => {
      const o = r < 16 ? "0" : "";
      n += `0x${o}${r.toString(16)} `;
    }),
    n.substring(0, n.length - 1)
  );
}
function Bt(e) {
  return (
    e &&
    typeof ArrayBuffer < "u" &&
    (e instanceof ArrayBuffer ||
      (e.constructor && e.constructor.name === "ArrayBuffer"))
  );
}
async function Xc(e, t, n, r, o, i) {
  const s = {},
    [l, a] = _n();
  (s[l] = a),
    e.log(
      v.Trace,
      `(${t} transport) sending data. ${dr(o, i.logMessageContent)}.`
    );
  const u = Bt(o) ? "arraybuffer" : "text",
    f = await n.post(r, {
      content: o,
      headers: { ...s, ...i.headers },
      responseType: u,
      timeout: i.timeout,
      withCredentials: i.withCredentials,
    });
  e.log(
    v.Trace,
    `(${t} transport) request complete. Response status: ${f.statusCode}.`
  );
}
function Xh(e) {
  return e === void 0
    ? new wo(v.Information)
    : e === null
    ? cr.instance
    : e.log !== void 0
    ? e
    : new wo(e);
}
class qh {
  constructor(t, n) {
    (this._subject = t), (this._observer = n);
  }
  dispose() {
    const t = this._subject.observers.indexOf(this._observer);
    t > -1 && this._subject.observers.splice(t, 1),
      this._subject.observers.length === 0 &&
        this._subject.cancelCallback &&
        this._subject.cancelCallback().catch((n) => {});
  }
}
class wo {
  constructor(t) {
    (this._minLevel = t), (this.out = console);
  }
  log(t, n) {
    if (t >= this._minLevel) {
      const r = `[${new Date().toISOString()}] ${v[t]}: ${n}`;
      switch (t) {
        case v.Critical:
        case v.Error:
          this.out.error(r);
          break;
        case v.Warning:
          this.out.warn(r);
          break;
        case v.Information:
          this.out.info(r);
          break;
        default:
          this.out.log(r);
          break;
      }
    }
  }
}
function _n() {
  let e = "X-SignalR-User-Agent";
  return V.isNode && (e = "User-Agent"), [e, Yh(bh, Gh(), Zh(), Jh())];
}
function Yh(e, t, n, r) {
  let o = "Microsoft SignalR/";
  const i = e.split(".");
  return (
    (o += `${i[0]}.${i[1]}`),
    (o += ` (${e}; `),
    t && t !== "" ? (o += `${t}; `) : (o += "Unknown OS; "),
    (o += `${n}`),
    r ? (o += `; ${r}`) : (o += "; Unknown Runtime Version"),
    (o += ")"),
    o
  );
}
function Gh() {
  if (V.isNode)
    switch (process.platform) {
      case "win32":
        return "Windows NT";
      case "darwin":
        return "macOS";
      case "linux":
        return "Linux";
      default:
        return process.platform;
    }
  else return "";
}
function Jh() {
  if (V.isNode) return process.versions.node;
}
function Zh() {
  return V.isNode ? "NodeJS" : "Browser";
}
function gi(e) {
  return e.stack ? e.stack : e.message ? e.message : `${e}`;
}
function ep() {
  if (typeof globalThis < "u") return globalThis;
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("could not find global");
}
class tp extends Uo {
  constructor(t) {
    if ((super(), (this._logger = t), typeof fetch > "u" || V.isNode)) {
      const n =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      (this._jar = new (n("tough-cookie").CookieJar)()),
        typeof fetch > "u"
          ? (this._fetchType = n("node-fetch"))
          : (this._fetchType = fetch),
        (this._fetchType = n("fetch-cookie")(this._fetchType, this._jar));
    } else this._fetchType = fetch.bind(ep());
    if (typeof AbortController > "u") {
      const n =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      this._abortControllerType = n("abort-controller");
    } else this._abortControllerType = AbortController;
  }
  async send(t) {
    if (t.abortSignal && t.abortSignal.aborted) throw new Fe();
    if (!t.method) throw new Error("No method defined.");
    if (!t.url) throw new Error("No url defined.");
    const n = new this._abortControllerType();
    let r;
    t.abortSignal &&
      (t.abortSignal.onabort = () => {
        n.abort(), (r = new Fe());
      });
    let o = null;
    if (t.timeout) {
      const a = t.timeout;
      o = setTimeout(() => {
        n.abort(),
          this._logger.log(v.Warning, "Timeout from HTTP request."),
          (r = new ol());
      }, a);
    }
    t.content === "" && (t.content = void 0),
      t.content &&
        ((t.headers = t.headers || {}),
        Bt(t.content)
          ? (t.headers["Content-Type"] = "application/octet-stream")
          : (t.headers["Content-Type"] = "text/plain;charset=UTF-8"));
    let i;
    try {
      i = await this._fetchType(t.url, {
        body: t.content,
        cache: "no-cache",
        credentials: t.withCredentials === !0 ? "include" : "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest", ...t.headers },
        method: t.method,
        mode: "cors",
        redirect: "follow",
        signal: n.signal,
      });
    } catch (a) {
      throw (
        r || (this._logger.log(v.Warning, `Error from HTTP request. ${a}.`), a)
      );
    } finally {
      o && clearTimeout(o), t.abortSignal && (t.abortSignal.onabort = null);
    }
    if (!i.ok) {
      const a = await xa(i, "text");
      throw new zt(a || i.statusText, i.status);
    }
    const l = await xa(i, t.responseType);
    return new Kc(i.status, i.statusText, l);
  }
  getCookieString(t) {
    let n = "";
    return (
      V.isNode &&
        this._jar &&
        this._jar.getCookies(t, (r, o) => (n = o.join("; "))),
      n
    );
  }
}
function xa(e, t) {
  let n;
  switch (t) {
    case "arraybuffer":
      n = e.arrayBuffer();
      break;
    case "text":
      n = e.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${t} is not supported.`);
    default:
      n = e.text();
      break;
  }
  return n;
}
class np extends Uo {
  constructor(t) {
    super(), (this._logger = t);
  }
  send(t) {
    return t.abortSignal && t.abortSignal.aborted
      ? Promise.reject(new Fe())
      : t.method
      ? t.url
        ? new Promise((n, r) => {
            const o = new XMLHttpRequest();
            o.open(t.method, t.url, !0),
              (o.withCredentials =
                t.withCredentials === void 0 ? !0 : t.withCredentials),
              o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              t.content === "" && (t.content = void 0),
              t.content &&
                (Bt(t.content)
                  ? o.setRequestHeader(
                      "Content-Type",
                      "application/octet-stream"
                    )
                  : o.setRequestHeader(
                      "Content-Type",
                      "text/plain;charset=UTF-8"
                    ));
            const i = t.headers;
            i &&
              Object.keys(i).forEach((s) => {
                o.setRequestHeader(s, i[s]);
              }),
              t.responseType && (o.responseType = t.responseType),
              t.abortSignal &&
                (t.abortSignal.onabort = () => {
                  o.abort(), r(new Fe());
                }),
              t.timeout && (o.timeout = t.timeout),
              (o.onload = () => {
                t.abortSignal && (t.abortSignal.onabort = null),
                  o.status >= 200 && o.status < 300
                    ? n(
                        new Kc(
                          o.status,
                          o.statusText,
                          o.response || o.responseText
                        )
                      )
                    : r(
                        new zt(
                          o.response || o.responseText || o.statusText,
                          o.status
                        )
                      );
              }),
              (o.onerror = () => {
                this._logger.log(
                  v.Warning,
                  `Error from HTTP request. ${o.status}: ${o.statusText}.`
                ),
                  r(new zt(o.statusText, o.status));
              }),
              (o.ontimeout = () => {
                this._logger.log(v.Warning, "Timeout from HTTP request."),
                  r(new ol());
              }),
              o.send(t.content);
          })
        : Promise.reject(new Error("No url defined."))
      : Promise.reject(new Error("No method defined."));
  }
}
class rp extends Uo {
  constructor(t) {
    if ((super(), typeof fetch < "u" || V.isNode)) this._httpClient = new tp(t);
    else if (typeof XMLHttpRequest < "u") this._httpClient = new np(t);
    else throw new Error("No usable HttpClient found.");
  }
  send(t) {
    return t.abortSignal && t.abortSignal.aborted
      ? Promise.reject(new Fe())
      : t.method
      ? t.url
        ? this._httpClient.send(t)
        : Promise.reject(new Error("No url defined."))
      : Promise.reject(new Error("No method defined."));
  }
  getCookieString(t) {
    return this._httpClient.getCookieString(t);
  }
}
class xe {
  static write(t) {
    return `${t}${xe.RecordSeparator}`;
  }
  static parse(t) {
    if (t[t.length - 1] !== xe.RecordSeparator)
      throw new Error("Message is incomplete.");
    const n = t.split(xe.RecordSeparator);
    return n.pop(), n;
  }
}
xe.RecordSeparatorCode = 30;
xe.RecordSeparator = String.fromCharCode(xe.RecordSeparatorCode);
class op {
  writeHandshakeRequest(t) {
    return xe.write(JSON.stringify(t));
  }
  parseHandshakeResponse(t) {
    let n, r;
    if (Bt(t)) {
      const l = new Uint8Array(t),
        a = l.indexOf(xe.RecordSeparatorCode);
      if (a === -1) throw new Error("Message is incomplete.");
      const u = a + 1;
      (n = String.fromCharCode.apply(
        null,
        Array.prototype.slice.call(l.slice(0, u))
      )),
        (r = l.byteLength > u ? l.slice(u).buffer : null);
    } else {
      const l = t,
        a = l.indexOf(xe.RecordSeparator);
      if (a === -1) throw new Error("Message is incomplete.");
      const u = a + 1;
      (n = l.substring(0, u)), (r = l.length > u ? l.substring(u) : null);
    }
    const o = xe.parse(n),
      i = JSON.parse(o[0]);
    if (i.type)
      throw new Error("Expected a handshake response from the server.");
    return [r, i];
  }
}
var D;
(function (e) {
  (e[(e.Invocation = 1)] = "Invocation"),
    (e[(e.StreamItem = 2)] = "StreamItem"),
    (e[(e.Completion = 3)] = "Completion"),
    (e[(e.StreamInvocation = 4)] = "StreamInvocation"),
    (e[(e.CancelInvocation = 5)] = "CancelInvocation"),
    (e[(e.Ping = 6)] = "Ping"),
    (e[(e.Close = 7)] = "Close"),
    (e[(e.Ack = 8)] = "Ack"),
    (e[(e.Sequence = 9)] = "Sequence");
})(D || (D = {}));
class ip {
  constructor() {
    this.observers = [];
  }
  next(t) {
    for (const n of this.observers) n.next(t);
  }
  error(t) {
    for (const n of this.observers) n.error && n.error(t);
  }
  complete() {
    for (const t of this.observers) t.complete && t.complete();
  }
  subscribe(t) {
    return this.observers.push(t), new qh(this, t);
  }
}
class sp {
  constructor(t, n, r) {
    (this._bufferSize = 1e5),
      (this._messages = []),
      (this._totalMessageCount = 0),
      (this._waitForSequenceMessage = !1),
      (this._nextReceivingSequenceId = 1),
      (this._latestReceivedSequenceId = 0),
      (this._bufferedByteCount = 0),
      (this._reconnectInProgress = !1),
      (this._protocol = t),
      (this._connection = n),
      (this._bufferSize = r);
  }
  async _send(t) {
    const n = this._protocol.writeMessage(t);
    let r = Promise.resolve();
    if (this._isInvocationMessage(t)) {
      this._totalMessageCount++;
      let o = () => {},
        i = () => {};
      Bt(n)
        ? (this._bufferedByteCount += n.byteLength)
        : (this._bufferedByteCount += n.length),
        this._bufferedByteCount >= this._bufferSize &&
          (r = new Promise((s, l) => {
            (o = s), (i = l);
          })),
        this._messages.push(new lp(n, this._totalMessageCount, o, i));
    }
    try {
      this._reconnectInProgress || (await this._connection.send(n));
    } catch {
      this._disconnected();
    }
    await r;
  }
  _ack(t) {
    let n = -1;
    for (let r = 0; r < this._messages.length; r++) {
      const o = this._messages[r];
      if (o._id <= t.sequenceId)
        (n = r),
          Bt(o._message)
            ? (this._bufferedByteCount -= o._message.byteLength)
            : (this._bufferedByteCount -= o._message.length),
          o._resolver();
      else if (this._bufferedByteCount < this._bufferSize) o._resolver();
      else break;
    }
    n !== -1 && (this._messages = this._messages.slice(n + 1));
  }
  _shouldProcessMessage(t) {
    if (this._waitForSequenceMessage)
      return t.type !== D.Sequence
        ? !1
        : ((this._waitForSequenceMessage = !1), !0);
    if (!this._isInvocationMessage(t)) return !0;
    const n = this._nextReceivingSequenceId;
    return (
      this._nextReceivingSequenceId++,
      n <= this._latestReceivedSequenceId
        ? (n === this._latestReceivedSequenceId && this._ackTimer(), !1)
        : ((this._latestReceivedSequenceId = n), this._ackTimer(), !0)
    );
  }
  _resetSequence(t) {
    if (t.sequenceId > this._nextReceivingSequenceId) {
      this._connection.stop(
        new Error("Sequence ID greater than amount of messages we've received.")
      );
      return;
    }
    this._nextReceivingSequenceId = t.sequenceId;
  }
  _disconnected() {
    (this._reconnectInProgress = !0), (this._waitForSequenceMessage = !0);
  }
  async _resend() {
    const t =
      this._messages.length !== 0
        ? this._messages[0]._id
        : this._totalMessageCount + 1;
    await this._connection.send(
      this._protocol.writeMessage({ type: D.Sequence, sequenceId: t })
    );
    const n = this._messages;
    for (const r of n) await this._connection.send(r._message);
    this._reconnectInProgress = !1;
  }
  _dispose(t) {
    t ?? (t = new Error("Unable to reconnect to server."));
    for (const n of this._messages) n._rejector(t);
  }
  _isInvocationMessage(t) {
    switch (t.type) {
      case D.Invocation:
      case D.StreamItem:
      case D.Completion:
      case D.StreamInvocation:
      case D.CancelInvocation:
        return !0;
      case D.Close:
      case D.Sequence:
      case D.Ping:
      case D.Ack:
        return !1;
    }
  }
  _ackTimer() {
    this._ackTimerHandle === void 0 &&
      (this._ackTimerHandle = setTimeout(async () => {
        try {
          this._reconnectInProgress ||
            (await this._connection.send(
              this._protocol.writeMessage({
                type: D.Ack,
                sequenceId: this._latestReceivedSequenceId,
              })
            ));
        } catch {}
        clearTimeout(this._ackTimerHandle), (this._ackTimerHandle = void 0);
      }, 1e3));
  }
}
class lp {
  constructor(t, n, r, o) {
    (this._message = t),
      (this._id = n),
      (this._resolver = r),
      (this._rejector = o);
  }
}
const ap = 30 * 1e3,
  up = 15 * 1e3,
  cp = 1e5;
var F;
(function (e) {
  (e.Disconnected = "Disconnected"),
    (e.Connecting = "Connecting"),
    (e.Connected = "Connected"),
    (e.Disconnecting = "Disconnecting"),
    (e.Reconnecting = "Reconnecting");
})(F || (F = {}));
class il {
  static create(t, n, r, o, i, s, l) {
    return new il(t, n, r, o, i, s, l);
  }
  constructor(t, n, r, o, i, s, l) {
    (this._nextKeepAlive = 0),
      (this._freezeEventListener = () => {
        this._logger.log(
          v.Warning,
          "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep"
        );
      }),
      G.isRequired(t, "connection"),
      G.isRequired(n, "logger"),
      G.isRequired(r, "protocol"),
      (this.serverTimeoutInMilliseconds = i ?? ap),
      (this.keepAliveIntervalInMilliseconds = s ?? up),
      (this._statefulReconnectBufferSize = l ?? cp),
      (this._logger = n),
      (this._protocol = r),
      (this.connection = t),
      (this._reconnectPolicy = o),
      (this._handshakeProtocol = new op()),
      (this.connection.onreceive = (a) => this._processIncomingData(a)),
      (this.connection.onclose = (a) => this._connectionClosed(a)),
      (this._callbacks = {}),
      (this._methods = {}),
      (this._closedCallbacks = []),
      (this._reconnectingCallbacks = []),
      (this._reconnectedCallbacks = []),
      (this._invocationId = 0),
      (this._receivedHandshakeResponse = !1),
      (this._connectionState = F.Disconnected),
      (this._connectionStarted = !1),
      (this._cachedPingMessage = this._protocol.writeMessage({ type: D.Ping }));
  }
  get state() {
    return this._connectionState;
  }
  get connectionId() {
    return (this.connection && this.connection.connectionId) || null;
  }
  get baseUrl() {
    return this.connection.baseUrl || "";
  }
  set baseUrl(t) {
    if (
      this._connectionState !== F.Disconnected &&
      this._connectionState !== F.Reconnecting
    )
      throw new Error(
        "The HubConnection must be in the Disconnected or Reconnecting state to change the url."
      );
    if (!t) throw new Error("The HubConnection url must be a valid url.");
    this.connection.baseUrl = t;
  }
  start() {
    return (
      (this._startPromise = this._startWithStateTransitions()),
      this._startPromise
    );
  }
  async _startWithStateTransitions() {
    if (this._connectionState !== F.Disconnected)
      return Promise.reject(
        new Error(
          "Cannot start a HubConnection that is not in the 'Disconnected' state."
        )
      );
    (this._connectionState = F.Connecting),
      this._logger.log(v.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(),
        V.isBrowser &&
          window.document.addEventListener("freeze", this._freezeEventListener),
        (this._connectionState = F.Connected),
        (this._connectionStarted = !0),
        this._logger.log(v.Debug, "HubConnection connected successfully.");
    } catch (t) {
      return (
        (this._connectionState = F.Disconnected),
        this._logger.log(
          v.Debug,
          `HubConnection failed to start successfully because of error '${t}'.`
        ),
        Promise.reject(t)
      );
    }
  }
  async _startInternal() {
    (this._stopDuringStartError = void 0),
      (this._receivedHandshakeResponse = !1);
    const t = new Promise((n, r) => {
      (this._handshakeResolver = n), (this._handshakeRejecter = r);
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let n = this._protocol.version;
      this.connection.features.reconnect || (n = 1);
      const r = { protocol: this._protocol.name, version: n };
      if (
        (this._logger.log(v.Debug, "Sending handshake request."),
        await this._sendMessage(
          this._handshakeProtocol.writeHandshakeRequest(r)
        ),
        this._logger.log(
          v.Information,
          `Using HubProtocol '${this._protocol.name}'.`
        ),
        this._cleanupTimeout(),
        this._resetTimeoutPeriod(),
        this._resetKeepAliveInterval(),
        await t,
        this._stopDuringStartError)
      )
        throw this._stopDuringStartError;
      (this.connection.features.reconnect || !1) &&
        ((this._messageBuffer = new sp(
          this._protocol,
          this.connection,
          this._statefulReconnectBufferSize
        )),
        (this.connection.features.disconnected =
          this._messageBuffer._disconnected.bind(this._messageBuffer)),
        (this.connection.features.resend = () => {
          if (this._messageBuffer) return this._messageBuffer._resend();
        })),
        this.connection.features.inherentKeepAlive ||
          (await this._sendMessage(this._cachedPingMessage));
    } catch (n) {
      throw (
        (this._logger.log(
          v.Debug,
          `Hub handshake failed with error '${n}' during start(). Stopping HubConnection.`
        ),
        this._cleanupTimeout(),
        this._cleanupPingTimer(),
        await this.connection.stop(n),
        n)
      );
    }
  }
  async stop() {
    const t = this._startPromise;
    (this.connection.features.reconnect = !1),
      (this._stopPromise = this._stopInternal()),
      await this._stopPromise;
    try {
      await t;
    } catch {}
  }
  _stopInternal(t) {
    if (this._connectionState === F.Disconnected)
      return (
        this._logger.log(
          v.Debug,
          `Call to HubConnection.stop(${t}) ignored because it is already in the disconnected state.`
        ),
        Promise.resolve()
      );
    if (this._connectionState === F.Disconnecting)
      return (
        this._logger.log(
          v.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
        ),
        this._stopPromise
      );
    const n = this._connectionState;
    return (
      (this._connectionState = F.Disconnecting),
      this._logger.log(v.Debug, "Stopping HubConnection."),
      this._reconnectDelayHandle
        ? (this._logger.log(
            v.Debug,
            "Connection stopped during reconnect delay. Done reconnecting."
          ),
          clearTimeout(this._reconnectDelayHandle),
          (this._reconnectDelayHandle = void 0),
          this._completeClose(),
          Promise.resolve())
        : (n === F.Connected && this._sendCloseMessage(),
          this._cleanupTimeout(),
          this._cleanupPingTimer(),
          (this._stopDuringStartError =
            t ||
            new Fe(
              "The connection was stopped before the hub handshake could complete."
            )),
          this.connection.stop(t))
    );
  }
  async _sendCloseMessage() {
    try {
      await this._sendWithProtocol(this._createCloseMessage());
    } catch {}
  }
  stream(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._createStreamInvocation(t, n, o);
    let s;
    const l = new ip();
    return (
      (l.cancelCallback = () => {
        const a = this._createCancelInvocation(i.invocationId);
        return (
          delete this._callbacks[i.invocationId],
          s.then(() => this._sendWithProtocol(a))
        );
      }),
      (this._callbacks[i.invocationId] = (a, u) => {
        if (u) {
          l.error(u);
          return;
        } else
          a &&
            (a.type === D.Completion
              ? a.error
                ? l.error(new Error(a.error))
                : l.complete()
              : l.next(a.item));
      }),
      (s = this._sendWithProtocol(i).catch((a) => {
        l.error(a), delete this._callbacks[i.invocationId];
      })),
      this._launchStreams(r, s),
      l
    );
  }
  _sendMessage(t) {
    return this._resetKeepAliveInterval(), this.connection.send(t);
  }
  _sendWithProtocol(t) {
    return this._messageBuffer
      ? this._messageBuffer._send(t)
      : this._sendMessage(this._protocol.writeMessage(t));
  }
  send(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._sendWithProtocol(this._createInvocation(t, n, !0, o));
    return this._launchStreams(r, i), i;
  }
  invoke(t, ...n) {
    const [r, o] = this._replaceStreamingParams(n),
      i = this._createInvocation(t, n, !1, o);
    return new Promise((l, a) => {
      this._callbacks[i.invocationId] = (f, h) => {
        if (h) {
          a(h);
          return;
        } else
          f &&
            (f.type === D.Completion
              ? f.error
                ? a(new Error(f.error))
                : l(f.result)
              : a(new Error(`Unexpected message type: ${f.type}`)));
      };
      const u = this._sendWithProtocol(i).catch((f) => {
        a(f), delete this._callbacks[i.invocationId];
      });
      this._launchStreams(r, u);
    });
  }
  on(t, n) {
    !t ||
      !n ||
      ((t = t.toLowerCase()),
      this._methods[t] || (this._methods[t] = []),
      this._methods[t].indexOf(n) === -1 && this._methods[t].push(n));
  }
  off(t, n) {
    if (!t) return;
    t = t.toLowerCase();
    const r = this._methods[t];
    if (r)
      if (n) {
        const o = r.indexOf(n);
        o !== -1 && (r.splice(o, 1), r.length === 0 && delete this._methods[t]);
      } else delete this._methods[t];
  }
  onclose(t) {
    t && this._closedCallbacks.push(t);
  }
  onreconnecting(t) {
    t && this._reconnectingCallbacks.push(t);
  }
  onreconnected(t) {
    t && this._reconnectedCallbacks.push(t);
  }
  _processIncomingData(t) {
    if (
      (this._cleanupTimeout(),
      this._receivedHandshakeResponse ||
        ((t = this._processHandshakeResponse(t)),
        (this._receivedHandshakeResponse = !0)),
      t)
    ) {
      const n = this._protocol.parseMessages(t, this._logger);
      for (const r of n)
        if (
          !(
            this._messageBuffer && !this._messageBuffer._shouldProcessMessage(r)
          )
        )
          switch (r.type) {
            case D.Invocation:
              this._invokeClientMethod(r).catch((o) => {
                this._logger.log(
                  v.Error,
                  `Invoke client method threw error: ${gi(o)}`
                );
              });
              break;
            case D.StreamItem:
            case D.Completion: {
              const o = this._callbacks[r.invocationId];
              if (o) {
                r.type === D.Completion &&
                  delete this._callbacks[r.invocationId];
                try {
                  o(r);
                } catch (i) {
                  this._logger.log(
                    v.Error,
                    `Stream callback threw error: ${gi(i)}`
                  );
                }
              }
              break;
            }
            case D.Ping:
              break;
            case D.Close: {
              this._logger.log(
                v.Information,
                "Close message received from server."
              );
              const o = r.error
                ? new Error("Server returned an error on close: " + r.error)
                : void 0;
              r.allowReconnect === !0
                ? this.connection.stop(o)
                : (this._stopPromise = this._stopInternal(o));
              break;
            }
            case D.Ack:
              this._messageBuffer && this._messageBuffer._ack(r);
              break;
            case D.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(r);
              break;
            default:
              this._logger.log(v.Warning, `Invalid message type: ${r.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(t) {
    let n, r;
    try {
      [r, n] = this._handshakeProtocol.parseHandshakeResponse(t);
    } catch (o) {
      const i = "Error parsing handshake response: " + o;
      this._logger.log(v.Error, i);
      const s = new Error(i);
      throw (this._handshakeRejecter(s), s);
    }
    if (n.error) {
      const o = "Server returned handshake error: " + n.error;
      this._logger.log(v.Error, o);
      const i = new Error(o);
      throw (this._handshakeRejecter(i), i);
    } else this._logger.log(v.Debug, "Server handshake complete.");
    return this._handshakeResolver(), r;
  }
  _resetKeepAliveInterval() {
    this.connection.features.inherentKeepAlive ||
      ((this._nextKeepAlive =
        new Date().getTime() + this.keepAliveIntervalInMilliseconds),
      this._cleanupPingTimer());
  }
  _resetTimeoutPeriod() {
    if (
      !this.connection.features ||
      !this.connection.features.inherentKeepAlive
    ) {
      this._timeoutHandle = setTimeout(
        () => this.serverTimeout(),
        this.serverTimeoutInMilliseconds
      );
      let t = this._nextKeepAlive - new Date().getTime();
      if (t < 0) {
        this._connectionState === F.Connected && this._trySendPingMessage();
        return;
      }
      this._pingServerHandle === void 0 &&
        (t < 0 && (t = 0),
        (this._pingServerHandle = setTimeout(async () => {
          this._connectionState === F.Connected &&
            (await this._trySendPingMessage());
        }, t)));
    }
  }
  serverTimeout() {
    this.connection.stop(
      new Error(
        "Server timeout elapsed without receiving a message from the server."
      )
    );
  }
  async _invokeClientMethod(t) {
    const n = t.target.toLowerCase(),
      r = this._methods[n];
    if (!r) {
      this._logger.log(
        v.Warning,
        `No client method with the name '${n}' found.`
      ),
        t.invocationId &&
          (this._logger.log(
            v.Warning,
            `No result given for '${n}' method and invocation ID '${t.invocationId}'.`
          ),
          await this._sendWithProtocol(
            this._createCompletionMessage(
              t.invocationId,
              "Client didn't provide a result.",
              null
            )
          ));
      return;
    }
    const o = r.slice(),
      i = !!t.invocationId;
    let s, l, a;
    for (const u of o)
      try {
        const f = s;
        (s = await u.apply(this, t.arguments)),
          i &&
            s &&
            f &&
            (this._logger.log(
              v.Error,
              `Multiple results provided for '${n}'. Sending error to server.`
            ),
            (a = this._createCompletionMessage(
              t.invocationId,
              "Client provided multiple results.",
              null
            ))),
          (l = void 0);
      } catch (f) {
        (l = f),
          this._logger.log(
            v.Error,
            `A callback for the method '${n}' threw error '${f}'.`
          );
      }
    a
      ? await this._sendWithProtocol(a)
      : i
      ? (l
          ? (a = this._createCompletionMessage(t.invocationId, `${l}`, null))
          : s !== void 0
          ? (a = this._createCompletionMessage(t.invocationId, null, s))
          : (this._logger.log(
              v.Warning,
              `No result given for '${n}' method and invocation ID '${t.invocationId}'.`
            ),
            (a = this._createCompletionMessage(
              t.invocationId,
              "Client didn't provide a result.",
              null
            ))),
        await this._sendWithProtocol(a))
      : s &&
        this._logger.log(
          v.Error,
          `Result given for '${n}' method but server is not expecting a result.`
        );
  }
  _connectionClosed(t) {
    this._logger.log(
      v.Debug,
      `HubConnection.connectionClosed(${t}) called while in state ${this._connectionState}.`
    ),
      (this._stopDuringStartError =
        this._stopDuringStartError ||
        t ||
        new Fe(
          "The underlying connection was closed before the hub handshake could complete."
        )),
      this._handshakeResolver && this._handshakeResolver(),
      this._cancelCallbacksWithError(
        t ||
          new Error(
            "Invocation canceled due to the underlying connection being closed."
          )
      ),
      this._cleanupTimeout(),
      this._cleanupPingTimer(),
      this._connectionState === F.Disconnecting
        ? this._completeClose(t)
        : this._connectionState === F.Connected && this._reconnectPolicy
        ? this._reconnect(t)
        : this._connectionState === F.Connected && this._completeClose(t);
  }
  _completeClose(t) {
    if (this._connectionStarted) {
      (this._connectionState = F.Disconnected),
        (this._connectionStarted = !1),
        this._messageBuffer &&
          (this._messageBuffer._dispose(t ?? new Error("Connection closed.")),
          (this._messageBuffer = void 0)),
        V.isBrowser &&
          window.document.removeEventListener(
            "freeze",
            this._freezeEventListener
          );
      try {
        this._closedCallbacks.forEach((n) => n.apply(this, [t]));
      } catch (n) {
        this._logger.log(
          v.Error,
          `An onclose callback called with error '${t}' threw error '${n}'.`
        );
      }
    }
  }
  async _reconnect(t) {
    const n = Date.now();
    let r = 0,
      o =
        t !== void 0
          ? t
          : new Error("Attempting to reconnect due to a unknown error."),
      i = this._getNextRetryDelay(r, 0, o);
    if (i === null) {
      this._logger.log(
        v.Debug,
        "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."
      ),
        this._completeClose(t);
      return;
    }
    if (
      ((this._connectionState = F.Reconnecting),
      t
        ? this._logger.log(
            v.Information,
            `Connection reconnecting because of error '${t}'.`
          )
        : this._logger.log(v.Information, "Connection reconnecting."),
      this._reconnectingCallbacks.length !== 0)
    ) {
      try {
        this._reconnectingCallbacks.forEach((s) => s.apply(this, [t]));
      } catch (s) {
        this._logger.log(
          v.Error,
          `An onreconnecting callback called with error '${t}' threw error '${s}'.`
        );
      }
      if (this._connectionState !== F.Reconnecting) {
        this._logger.log(
          v.Debug,
          "Connection left the reconnecting state in onreconnecting callback. Done reconnecting."
        );
        return;
      }
    }
    for (; i !== null; ) {
      if (
        (this._logger.log(
          v.Information,
          `Reconnect attempt number ${r + 1} will start in ${i} ms.`
        ),
        await new Promise((s) => {
          this._reconnectDelayHandle = setTimeout(s, i);
        }),
        (this._reconnectDelayHandle = void 0),
        this._connectionState !== F.Reconnecting)
      ) {
        this._logger.log(
          v.Debug,
          "Connection left the reconnecting state during reconnect delay. Done reconnecting."
        );
        return;
      }
      try {
        if (
          (await this._startInternal(),
          (this._connectionState = F.Connected),
          this._logger.log(
            v.Information,
            "HubConnection reconnected successfully."
          ),
          this._reconnectedCallbacks.length !== 0)
        )
          try {
            this._reconnectedCallbacks.forEach((s) =>
              s.apply(this, [this.connection.connectionId])
            );
          } catch (s) {
            this._logger.log(
              v.Error,
              `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${s}'.`
            );
          }
        return;
      } catch (s) {
        if (
          (this._logger.log(
            v.Information,
            `Reconnect attempt failed because of error '${s}'.`
          ),
          this._connectionState !== F.Reconnecting)
        ) {
          this._logger.log(
            v.Debug,
            `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`
          ),
            this._connectionState === F.Disconnecting && this._completeClose();
          return;
        }
        r++,
          (o = s instanceof Error ? s : new Error(s.toString())),
          (i = this._getNextRetryDelay(r, Date.now() - n, o));
      }
    }
    this._logger.log(
      v.Information,
      `Reconnect retries have been exhausted after ${
        Date.now() - n
      } ms and ${r} failed attempts. Connection disconnecting.`
    ),
      this._completeClose();
  }
  _getNextRetryDelay(t, n, r) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: n,
        previousRetryCount: t,
        retryReason: r,
      });
    } catch (o) {
      return (
        this._logger.log(
          v.Error,
          `IRetryPolicy.nextRetryDelayInMilliseconds(${t}, ${n}) threw error '${o}'.`
        ),
        null
      );
    }
  }
  _cancelCallbacksWithError(t) {
    const n = this._callbacks;
    (this._callbacks = {}),
      Object.keys(n).forEach((r) => {
        const o = n[r];
        try {
          o(null, t);
        } catch (i) {
          this._logger.log(
            v.Error,
            `Stream 'error' callback called with '${t}' threw error: ${gi(i)}`
          );
        }
      });
  }
  _cleanupPingTimer() {
    this._pingServerHandle &&
      (clearTimeout(this._pingServerHandle), (this._pingServerHandle = void 0));
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(t, n, r, o) {
    if (r)
      return o.length !== 0
        ? { target: t, arguments: n, streamIds: o, type: D.Invocation }
        : { target: t, arguments: n, type: D.Invocation };
    {
      const i = this._invocationId;
      return (
        this._invocationId++,
        o.length !== 0
          ? {
              target: t,
              arguments: n,
              invocationId: i.toString(),
              streamIds: o,
              type: D.Invocation,
            }
          : {
              target: t,
              arguments: n,
              invocationId: i.toString(),
              type: D.Invocation,
            }
      );
    }
  }
  _launchStreams(t, n) {
    if (t.length !== 0) {
      n || (n = Promise.resolve());
      for (const r in t)
        t[r].subscribe({
          complete: () => {
            n = n.then(() =>
              this._sendWithProtocol(this._createCompletionMessage(r))
            );
          },
          error: (o) => {
            let i;
            o instanceof Error
              ? (i = o.message)
              : o && o.toString
              ? (i = o.toString())
              : (i = "Unknown error"),
              (n = n.then(() =>
                this._sendWithProtocol(this._createCompletionMessage(r, i))
              ));
          },
          next: (o) => {
            n = n.then(() =>
              this._sendWithProtocol(this._createStreamItemMessage(r, o))
            );
          },
        });
    }
  }
  _replaceStreamingParams(t) {
    const n = [],
      r = [];
    for (let o = 0; o < t.length; o++) {
      const i = t[o];
      if (this._isObservable(i)) {
        const s = this._invocationId;
        this._invocationId++, (n[s] = i), r.push(s.toString()), t.splice(o, 1);
      }
    }
    return [n, r];
  }
  _isObservable(t) {
    return t && t.subscribe && typeof t.subscribe == "function";
  }
  _createStreamInvocation(t, n, r) {
    const o = this._invocationId;
    return (
      this._invocationId++,
      r.length !== 0
        ? {
            target: t,
            arguments: n,
            invocationId: o.toString(),
            streamIds: r,
            type: D.StreamInvocation,
          }
        : {
            target: t,
            arguments: n,
            invocationId: o.toString(),
            type: D.StreamInvocation,
          }
    );
  }
  _createCancelInvocation(t) {
    return { invocationId: t, type: D.CancelInvocation };
  }
  _createStreamItemMessage(t, n) {
    return { invocationId: t, item: n, type: D.StreamItem };
  }
  _createCompletionMessage(t, n, r) {
    return n
      ? { error: n, invocationId: t, type: D.Completion }
      : { invocationId: t, result: r, type: D.Completion };
  }
  _createCloseMessage() {
    return { type: D.Close };
  }
  async _trySendPingMessage() {
    try {
      await this._sendMessage(this._cachedPingMessage);
    } catch {
      this._cleanupPingTimer();
    }
  }
}
const dp = [0, 2e3, 1e4, 3e4, null];
class Ea {
  constructor(t) {
    this._retryDelays = t !== void 0 ? [...t, null] : dp;
  }
  nextRetryDelayInMilliseconds(t) {
    return this._retryDelays[t.previousRetryCount];
  }
}
class $t {}
$t.Authorization = "Authorization";
$t.Cookie = "Cookie";
class fp extends Uo {
  constructor(t, n) {
    super(), (this._innerClient = t), (this._accessTokenFactory = n);
  }
  async send(t) {
    let n = !0;
    this._accessTokenFactory &&
      (!this._accessToken || (t.url && t.url.indexOf("/negotiate?") > 0)) &&
      ((n = !1), (this._accessToken = await this._accessTokenFactory())),
      this._setAuthorizationHeader(t);
    const r = await this._innerClient.send(t);
    return n && r.statusCode === 401 && this._accessTokenFactory
      ? ((this._accessToken = await this._accessTokenFactory()),
        this._setAuthorizationHeader(t),
        await this._innerClient.send(t))
      : r;
  }
  _setAuthorizationHeader(t) {
    t.headers || (t.headers = {}),
      this._accessToken
        ? (t.headers[$t.Authorization] = `Bearer ${this._accessToken}`)
        : this._accessTokenFactory &&
          t.headers[$t.Authorization] &&
          delete t.headers[$t.Authorization];
  }
  getCookieString(t) {
    return this._innerClient.getCookieString(t);
  }
}
var Z;
(function (e) {
  (e[(e.None = 0)] = "None"),
    (e[(e.WebSockets = 1)] = "WebSockets"),
    (e[(e.ServerSentEvents = 2)] = "ServerSentEvents"),
    (e[(e.LongPolling = 4)] = "LongPolling");
})(Z || (Z = {}));
var de;
(function (e) {
  (e[(e.Text = 1)] = "Text"), (e[(e.Binary = 2)] = "Binary");
})(de || (de = {}));
let hp = class {
  constructor() {
    (this._isAborted = !1), (this.onabort = null);
  }
  abort() {
    this._isAborted || ((this._isAborted = !0), this.onabort && this.onabort());
  }
  get signal() {
    return this;
  }
  get aborted() {
    return this._isAborted;
  }
};
class Pa {
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(t, n, r) {
    (this._httpClient = t),
      (this._logger = n),
      (this._pollAbort = new hp()),
      (this._options = r),
      (this._running = !1),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async connect(t, n) {
    if (
      (G.isRequired(t, "url"),
      G.isRequired(n, "transferFormat"),
      G.isIn(n, de, "transferFormat"),
      (this._url = t),
      this._logger.log(v.Trace, "(LongPolling transport) Connecting."),
      n === de.Binary &&
        typeof XMLHttpRequest < "u" &&
        typeof new XMLHttpRequest().responseType != "string")
    )
      throw new Error(
        "Binary protocols over XmlHttpRequest not implementing advanced features are not supported."
      );
    const [r, o] = _n(),
      i = { [r]: o, ...this._options.headers },
      s = {
        abortSignal: this._pollAbort.signal,
        headers: i,
        timeout: 1e5,
        withCredentials: this._options.withCredentials,
      };
    n === de.Binary && (s.responseType = "arraybuffer");
    const l = `${t}&_=${Date.now()}`;
    this._logger.log(v.Trace, `(LongPolling transport) polling: ${l}.`);
    const a = await this._httpClient.get(l, s);
    a.statusCode !== 200
      ? (this._logger.log(
          v.Error,
          `(LongPolling transport) Unexpected response code: ${a.statusCode}.`
        ),
        (this._closeError = new zt(a.statusText || "", a.statusCode)),
        (this._running = !1))
      : (this._running = !0),
      (this._receiving = this._poll(this._url, s));
  }
  async _poll(t, n) {
    try {
      for (; this._running; )
        try {
          const r = `${t}&_=${Date.now()}`;
          this._logger.log(v.Trace, `(LongPolling transport) polling: ${r}.`);
          const o = await this._httpClient.get(r, n);
          o.statusCode === 204
            ? (this._logger.log(
                v.Information,
                "(LongPolling transport) Poll terminated by server."
              ),
              (this._running = !1))
            : o.statusCode !== 200
            ? (this._logger.log(
                v.Error,
                `(LongPolling transport) Unexpected response code: ${o.statusCode}.`
              ),
              (this._closeError = new zt(o.statusText || "", o.statusCode)),
              (this._running = !1))
            : o.content
            ? (this._logger.log(
                v.Trace,
                `(LongPolling transport) data received. ${dr(
                  o.content,
                  this._options.logMessageContent
                )}.`
              ),
              this.onreceive && this.onreceive(o.content))
            : this._logger.log(
                v.Trace,
                "(LongPolling transport) Poll timed out, reissuing."
              );
        } catch (r) {
          this._running
            ? r instanceof ol
              ? this._logger.log(
                  v.Trace,
                  "(LongPolling transport) Poll timed out, reissuing."
                )
              : ((this._closeError = r), (this._running = !1))
            : this._logger.log(
                v.Trace,
                `(LongPolling transport) Poll errored after shutdown: ${r.message}`
              );
        }
    } finally {
      this._logger.log(v.Trace, "(LongPolling transport) Polling complete."),
        this.pollAborted || this._raiseOnClose();
    }
  }
  async send(t) {
    return this._running
      ? Xc(
          this._logger,
          "LongPolling",
          this._httpClient,
          this._url,
          t,
          this._options
        )
      : Promise.reject(
          new Error("Cannot send until the transport is connected")
        );
  }
  async stop() {
    this._logger.log(v.Trace, "(LongPolling transport) Stopping polling."),
      (this._running = !1),
      this._pollAbort.abort();
    try {
      await this._receiving,
        this._logger.log(
          v.Trace,
          `(LongPolling transport) sending DELETE request to ${this._url}.`
        );
      const t = {},
        [n, r] = _n();
      t[n] = r;
      const o = {
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials,
      };
      let i;
      try {
        await this._httpClient.delete(this._url, o);
      } catch (s) {
        i = s;
      }
      i
        ? i instanceof zt &&
          (i.statusCode === 404
            ? this._logger.log(
                v.Trace,
                "(LongPolling transport) A 404 response was returned from sending a DELETE request."
              )
            : this._logger.log(
                v.Trace,
                `(LongPolling transport) Error sending a DELETE request: ${i}`
              ))
        : this._logger.log(
            v.Trace,
            "(LongPolling transport) DELETE request accepted."
          );
    } finally {
      this._logger.log(v.Trace, "(LongPolling transport) Stop finished."),
        this._raiseOnClose();
    }
  }
  _raiseOnClose() {
    if (this.onclose) {
      let t = "(LongPolling transport) Firing onclose event.";
      this._closeError && (t += " Error: " + this._closeError),
        this._logger.log(v.Trace, t),
        this.onclose(this._closeError);
    }
  }
}
class pp {
  constructor(t, n, r, o) {
    (this._httpClient = t),
      (this._accessToken = n),
      (this._logger = r),
      (this._options = o),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async connect(t, n) {
    return (
      G.isRequired(t, "url"),
      G.isRequired(n, "transferFormat"),
      G.isIn(n, de, "transferFormat"),
      this._logger.log(v.Trace, "(SSE transport) Connecting."),
      (this._url = t),
      this._accessToken &&
        (t +=
          (t.indexOf("?") < 0 ? "?" : "&") +
          `access_token=${encodeURIComponent(this._accessToken)}`),
      new Promise((r, o) => {
        let i = !1;
        if (n !== de.Text) {
          o(
            new Error(
              "The Server-Sent Events transport only supports the 'Text' transfer format"
            )
          );
          return;
        }
        let s;
        if (V.isBrowser || V.isWebWorker)
          s = new this._options.EventSource(t, {
            withCredentials: this._options.withCredentials,
          });
        else {
          const l = this._httpClient.getCookieString(t),
            a = {};
          a.Cookie = l;
          const [u, f] = _n();
          (a[u] = f),
            (s = new this._options.EventSource(t, {
              withCredentials: this._options.withCredentials,
              headers: { ...a, ...this._options.headers },
            }));
        }
        try {
          (s.onmessage = (l) => {
            if (this.onreceive)
              try {
                this._logger.log(
                  v.Trace,
                  `(SSE transport) data received. ${dr(
                    l.data,
                    this._options.logMessageContent
                  )}.`
                ),
                  this.onreceive(l.data);
              } catch (a) {
                this._close(a);
                return;
              }
          }),
            (s.onerror = (l) => {
              i
                ? this._close()
                : o(
                    new Error(
                      "EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."
                    )
                  );
            }),
            (s.onopen = () => {
              this._logger.log(v.Information, `SSE connected to ${this._url}`),
                (this._eventSource = s),
                (i = !0),
                r();
            });
        } catch (l) {
          o(l);
          return;
        }
      })
    );
  }
  async send(t) {
    return this._eventSource
      ? Xc(this._logger, "SSE", this._httpClient, this._url, t, this._options)
      : Promise.reject(
          new Error("Cannot send until the transport is connected")
        );
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(t) {
    this._eventSource &&
      (this._eventSource.close(),
      (this._eventSource = void 0),
      this.onclose && this.onclose(t));
  }
}
class gp {
  constructor(t, n, r, o, i, s) {
    (this._logger = r),
      (this._accessTokenFactory = n),
      (this._logMessageContent = o),
      (this._webSocketConstructor = i),
      (this._httpClient = t),
      (this.onreceive = null),
      (this.onclose = null),
      (this._headers = s);
  }
  async connect(t, n) {
    G.isRequired(t, "url"),
      G.isRequired(n, "transferFormat"),
      G.isIn(n, de, "transferFormat"),
      this._logger.log(v.Trace, "(WebSockets transport) Connecting.");
    let r;
    return (
      this._accessTokenFactory && (r = await this._accessTokenFactory()),
      new Promise((o, i) => {
        t = t.replace(/^http/, "ws");
        let s;
        const l = this._httpClient.getCookieString(t);
        let a = !1;
        if (V.isNode || V.isReactNative) {
          const u = {},
            [f, h] = _n();
          (u[f] = h),
            r && (u[$t.Authorization] = `Bearer ${r}`),
            l && (u[$t.Cookie] = l),
            (s = new this._webSocketConstructor(t, void 0, {
              headers: { ...u, ...this._headers },
            }));
        } else
          r &&
            (t +=
              (t.indexOf("?") < 0 ? "?" : "&") +
              `access_token=${encodeURIComponent(r)}`);
        s || (s = new this._webSocketConstructor(t)),
          n === de.Binary && (s.binaryType = "arraybuffer"),
          (s.onopen = (u) => {
            this._logger.log(v.Information, `WebSocket connected to ${t}.`),
              (this._webSocket = s),
              (a = !0),
              o();
          }),
          (s.onerror = (u) => {
            let f = null;
            typeof ErrorEvent < "u" && u instanceof ErrorEvent
              ? (f = u.error)
              : (f = "There was an error with the transport"),
              this._logger.log(v.Information, `(WebSockets transport) ${f}.`);
          }),
          (s.onmessage = (u) => {
            if (
              (this._logger.log(
                v.Trace,
                `(WebSockets transport) data received. ${dr(
                  u.data,
                  this._logMessageContent
                )}.`
              ),
              this.onreceive)
            )
              try {
                this.onreceive(u.data);
              } catch (f) {
                this._close(f);
                return;
              }
          }),
          (s.onclose = (u) => {
            if (a) this._close(u);
            else {
              let f = null;
              typeof ErrorEvent < "u" && u instanceof ErrorEvent
                ? (f = u.error)
                : (f =
                    "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled."),
                i(new Error(f));
            }
          });
      })
    );
  }
  send(t) {
    return this._webSocket &&
      this._webSocket.readyState === this._webSocketConstructor.OPEN
      ? (this._logger.log(
          v.Trace,
          `(WebSockets transport) sending data. ${dr(
            t,
            this._logMessageContent
          )}.`
        ),
        this._webSocket.send(t),
        Promise.resolve())
      : Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    return this._webSocket && this._close(void 0), Promise.resolve();
  }
  _close(t) {
    this._webSocket &&
      ((this._webSocket.onclose = () => {}),
      (this._webSocket.onmessage = () => {}),
      (this._webSocket.onerror = () => {}),
      this._webSocket.close(),
      (this._webSocket = void 0)),
      this._logger.log(v.Trace, "(WebSockets transport) socket closed."),
      this.onclose &&
        (this._isCloseEvent(t) && (t.wasClean === !1 || t.code !== 1e3)
          ? this.onclose(
              new Error(
                `WebSocket closed with status code: ${t.code} (${
                  t.reason || "no reason given"
                }).`
              )
            )
          : t instanceof Error
          ? this.onclose(t)
          : this.onclose());
  }
  _isCloseEvent(t) {
    return t && typeof t.wasClean == "boolean" && typeof t.code == "number";
  }
}
const Ta = 100;
class mp {
  constructor(t, n = {}) {
    if (
      ((this._stopPromiseResolver = () => {}),
      (this.features = {}),
      (this._negotiateVersion = 1),
      G.isRequired(t, "url"),
      (this._logger = Xh(n.logger)),
      (this.baseUrl = this._resolveUrl(t)),
      (n = n || {}),
      (n.logMessageContent =
        n.logMessageContent === void 0 ? !1 : n.logMessageContent),
      typeof n.withCredentials == "boolean" || n.withCredentials === void 0)
    )
      n.withCredentials = n.withCredentials === void 0 ? !0 : n.withCredentials;
    else
      throw new Error(
        "withCredentials option was not a 'boolean' or 'undefined' value"
      );
    n.timeout = n.timeout === void 0 ? 100 * 1e3 : n.timeout;
    let r = null,
      o = null;
    if (V.isNode && typeof require < "u") {
      const i =
        typeof __webpack_require__ == "function"
          ? __non_webpack_require__
          : require;
      (r = i("ws")), (o = i("eventsource"));
    }
    !V.isNode && typeof WebSocket < "u" && !n.WebSocket
      ? (n.WebSocket = WebSocket)
      : V.isNode && !n.WebSocket && r && (n.WebSocket = r),
      !V.isNode && typeof EventSource < "u" && !n.EventSource
        ? (n.EventSource = EventSource)
        : V.isNode && !n.EventSource && typeof o < "u" && (n.EventSource = o),
      (this._httpClient = new fp(
        n.httpClient || new rp(this._logger),
        n.accessTokenFactory
      )),
      (this._connectionState = "Disconnected"),
      (this._connectionStarted = !1),
      (this._options = n),
      (this.onreceive = null),
      (this.onclose = null);
  }
  async start(t) {
    if (
      ((t = t || de.Binary),
      G.isIn(t, de, "transferFormat"),
      this._logger.log(
        v.Debug,
        `Starting connection with transfer format '${de[t]}'.`
      ),
      this._connectionState !== "Disconnected")
    )
      return Promise.reject(
        new Error(
          "Cannot start an HttpConnection that is not in the 'Disconnected' state."
        )
      );
    if (
      ((this._connectionState = "Connecting"),
      (this._startInternalPromise = this._startInternal(t)),
      await this._startInternalPromise,
      this._connectionState === "Disconnecting")
    ) {
      const n = "Failed to start the HttpConnection before stop() was called.";
      return (
        this._logger.log(v.Error, n),
        await this._stopPromise,
        Promise.reject(new Fe(n))
      );
    } else if (this._connectionState !== "Connected") {
      const n =
        "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(v.Error, n), Promise.reject(new Fe(n));
    }
    this._connectionStarted = !0;
  }
  send(t) {
    return this._connectionState !== "Connected"
      ? Promise.reject(
          new Error(
            "Cannot send data if the connection is not in the 'Connected' State."
          )
        )
      : (this._sendQueue || (this._sendQueue = new sl(this.transport)),
        this._sendQueue.send(t));
  }
  async stop(t) {
    if (this._connectionState === "Disconnected")
      return (
        this._logger.log(
          v.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnected state.`
        ),
        Promise.resolve()
      );
    if (this._connectionState === "Disconnecting")
      return (
        this._logger.log(
          v.Debug,
          `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`
        ),
        this._stopPromise
      );
    (this._connectionState = "Disconnecting"),
      (this._stopPromise = new Promise((n) => {
        this._stopPromiseResolver = n;
      })),
      await this._stopInternal(t),
      await this._stopPromise;
  }
  async _stopInternal(t) {
    this._stopError = t;
    try {
      await this._startInternalPromise;
    } catch {}
    if (this.transport) {
      try {
        await this.transport.stop();
      } catch (n) {
        this._logger.log(
          v.Error,
          `HttpConnection.transport.stop() threw error '${n}'.`
        ),
          this._stopConnection();
      }
      this.transport = void 0;
    } else
      this._logger.log(
        v.Debug,
        "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed."
      );
  }
  async _startInternal(t) {
    let n = this.baseUrl;
    (this._accessTokenFactory = this._options.accessTokenFactory),
      (this._httpClient._accessTokenFactory = this._accessTokenFactory);
    try {
      if (this._options.skipNegotiation)
        if (this._options.transport === Z.WebSockets)
          (this.transport = this._constructTransport(Z.WebSockets)),
            await this._startTransport(n, t);
        else
          throw new Error(
            "Negotiation can only be skipped when using the WebSocket transport directly."
          );
      else {
        let r = null,
          o = 0;
        do {
          if (
            ((r = await this._getNegotiationResponse(n)),
            this._connectionState === "Disconnecting" ||
              this._connectionState === "Disconnected")
          )
            throw new Fe("The connection was stopped during negotiation.");
          if (r.error) throw new Error(r.error);
          if (r.ProtocolVersion)
            throw new Error(
              "Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."
            );
          if ((r.url && (n = r.url), r.accessToken)) {
            const i = r.accessToken;
            (this._accessTokenFactory = () => i),
              (this._httpClient._accessToken = i),
              (this._httpClient._accessTokenFactory = void 0);
          }
          o++;
        } while (r.url && o < Ta);
        if (o === Ta && r.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(n, this._options.transport, r, t);
      }
      this.transport instanceof Pa && (this.features.inherentKeepAlive = !0),
        this._connectionState === "Connecting" &&
          (this._logger.log(
            v.Debug,
            "The HttpConnection connected successfully."
          ),
          (this._connectionState = "Connected"));
    } catch (r) {
      return (
        this._logger.log(v.Error, "Failed to start the connection: " + r),
        (this._connectionState = "Disconnected"),
        (this.transport = void 0),
        this._stopPromiseResolver(),
        Promise.reject(r)
      );
    }
  }
  async _getNegotiationResponse(t) {
    const n = {},
      [r, o] = _n();
    n[r] = o;
    const i = this._resolveNegotiateUrl(t);
    this._logger.log(v.Debug, `Sending negotiation request: ${i}.`);
    try {
      const s = await this._httpClient.post(i, {
        content: "",
        headers: { ...n, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials,
      });
      if (s.statusCode !== 200)
        return Promise.reject(
          new Error(
            `Unexpected status code returned from negotiate '${s.statusCode}'`
          )
        );
      const l = JSON.parse(s.content);
      return (
        (!l.negotiateVersion || l.negotiateVersion < 1) &&
          (l.connectionToken = l.connectionId),
        l.useStatefulReconnect && this._options._useStatefulReconnect !== !0
          ? Promise.reject(
              new Ca(
                "Client didn't negotiate Stateful Reconnect but the server did."
              )
            )
          : l
      );
    } catch (s) {
      let l = "Failed to complete negotiation with the server: " + s;
      return (
        s instanceof zt &&
          s.statusCode === 404 &&
          (l =
            l +
            " Either this is not a SignalR endpoint or there is a proxy blocking the connection."),
        this._logger.log(v.Error, l),
        Promise.reject(new Ca(l))
      );
    }
  }
  _createConnectUrl(t, n) {
    return n ? t + (t.indexOf("?") === -1 ? "?" : "&") + `id=${n}` : t;
  }
  async _createTransport(t, n, r, o) {
    let i = this._createConnectUrl(t, r.connectionToken);
    if (this._isITransport(n)) {
      this._logger.log(
        v.Debug,
        "Connection was provided an instance of ITransport, using that directly."
      ),
        (this.transport = n),
        await this._startTransport(i, o),
        (this.connectionId = r.connectionId);
      return;
    }
    const s = [],
      l = r.availableTransports || [];
    let a = r;
    for (const u of l) {
      const f = this._resolveTransportOrError(
        u,
        n,
        o,
        (a == null ? void 0 : a.useStatefulReconnect) === !0
      );
      if (f instanceof Error) s.push(`${u.transport} failed:`), s.push(f);
      else if (this._isITransport(f)) {
        if (((this.transport = f), !a)) {
          try {
            a = await this._getNegotiationResponse(t);
          } catch (h) {
            return Promise.reject(h);
          }
          i = this._createConnectUrl(t, a.connectionToken);
        }
        try {
          await this._startTransport(i, o),
            (this.connectionId = a.connectionId);
          return;
        } catch (h) {
          if (
            (this._logger.log(
              v.Error,
              `Failed to start the transport '${u.transport}': ${h}`
            ),
            (a = void 0),
            s.push(new Vh(`${u.transport} failed: ${h}`, Z[u.transport])),
            this._connectionState !== "Connecting")
          ) {
            const g = "Failed to select transport before stop() was called.";
            return this._logger.log(v.Debug, g), Promise.reject(new Fe(g));
          }
        }
      }
    }
    return s.length > 0
      ? Promise.reject(
          new Qh(
            `Unable to connect to the server with any of the available transports. ${s.join(
              " "
            )}`,
            s
          )
        )
      : Promise.reject(
          new Error(
            "None of the transports supported by the client are supported by the server."
          )
        );
  }
  _constructTransport(t) {
    switch (t) {
      case Z.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new gp(
          this._httpClient,
          this._accessTokenFactory,
          this._logger,
          this._options.logMessageContent,
          this._options.WebSocket,
          this._options.headers || {}
        );
      case Z.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error(
            "'EventSource' is not supported in your environment."
          );
        return new pp(
          this._httpClient,
          this._httpClient._accessToken,
          this._logger,
          this._options
        );
      case Z.LongPolling:
        return new Pa(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${t}.`);
    }
  }
  _startTransport(t, n) {
    return (
      (this.transport.onreceive = this.onreceive),
      this.features.reconnect
        ? (this.transport.onclose = async (r) => {
            let o = !1;
            if (this.features.reconnect)
              try {
                this.features.disconnected(),
                  await this.transport.connect(t, n),
                  await this.features.resend();
              } catch {
                o = !0;
              }
            else {
              this._stopConnection(r);
              return;
            }
            o && this._stopConnection(r);
          })
        : (this.transport.onclose = (r) => this._stopConnection(r)),
      this.transport.connect(t, n)
    );
  }
  _resolveTransportOrError(t, n, r, o) {
    const i = Z[t.transport];
    if (i == null)
      return (
        this._logger.log(
          v.Debug,
          `Skipping transport '${t.transport}' because it is not supported by this client.`
        ),
        new Error(
          `Skipping transport '${t.transport}' because it is not supported by this client.`
        )
      );
    if (vp(n, i))
      if (t.transferFormats.map((l) => de[l]).indexOf(r) >= 0) {
        if (
          (i === Z.WebSockets && !this._options.WebSocket) ||
          (i === Z.ServerSentEvents && !this._options.EventSource)
        )
          return (
            this._logger.log(
              v.Debug,
              `Skipping transport '${Z[i]}' because it is not supported in your environment.'`
            ),
            new Bh(`'${Z[i]}' is not supported in your environment.`, i)
          );
        this._logger.log(v.Debug, `Selecting transport '${Z[i]}'.`);
        try {
          return (
            (this.features.reconnect = i === Z.WebSockets ? o : void 0),
            this._constructTransport(i)
          );
        } catch (l) {
          return l;
        }
      } else
        return (
          this._logger.log(
            v.Debug,
            `Skipping transport '${Z[i]}' because it does not support the requested transfer format '${de[r]}'.`
          ),
          new Error(`'${Z[i]}' does not support ${de[r]}.`)
        );
    else
      return (
        this._logger.log(
          v.Debug,
          `Skipping transport '${Z[i]}' because it was disabled by the client.`
        ),
        new Wh(`'${Z[i]}' is disabled by the client.`, i)
      );
  }
  _isITransport(t) {
    return t && typeof t == "object" && "connect" in t;
  }
  _stopConnection(t) {
    if (
      (this._logger.log(
        v.Debug,
        `HttpConnection.stopConnection(${t}) called while in state ${this._connectionState}.`
      ),
      (this.transport = void 0),
      (t = this._stopError || t),
      (this._stopError = void 0),
      this._connectionState === "Disconnected")
    ) {
      this._logger.log(
        v.Debug,
        `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is already in the disconnected state.`
      );
      return;
    }
    if (this._connectionState === "Connecting")
      throw (
        (this._logger.log(
          v.Warning,
          `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is still in the connecting state.`
        ),
        new Error(
          `HttpConnection.stopConnection(${t}) was called while the connection is still in the connecting state.`
        ))
      );
    if (
      (this._connectionState === "Disconnecting" && this._stopPromiseResolver(),
      t
        ? this._logger.log(
            v.Error,
            `Connection disconnected with error '${t}'.`
          )
        : this._logger.log(v.Information, "Connection disconnected."),
      this._sendQueue &&
        (this._sendQueue.stop().catch((n) => {
          this._logger.log(
            v.Error,
            `TransportSendQueue.stop() threw error '${n}'.`
          );
        }),
        (this._sendQueue = void 0)),
      (this.connectionId = void 0),
      (this._connectionState = "Disconnected"),
      this._connectionStarted)
    ) {
      this._connectionStarted = !1;
      try {
        this.onclose && this.onclose(t);
      } catch (n) {
        this._logger.log(
          v.Error,
          `HttpConnection.onclose(${t}) threw error '${n}'.`
        );
      }
    }
  }
  _resolveUrl(t) {
    if (t.lastIndexOf("https://", 0) === 0 || t.lastIndexOf("http://", 0) === 0)
      return t;
    if (!V.isBrowser) throw new Error(`Cannot resolve '${t}'.`);
    const n = window.document.createElement("a");
    return (
      (n.href = t),
      this._logger.log(v.Information, `Normalizing '${t}' to '${n.href}'.`),
      n.href
    );
  }
  _resolveNegotiateUrl(t) {
    const n = new URL(t);
    n.pathname.endsWith("/")
      ? (n.pathname += "negotiate")
      : (n.pathname += "/negotiate");
    const r = new URLSearchParams(n.searchParams);
    return (
      r.has("negotiateVersion") ||
        r.append("negotiateVersion", this._negotiateVersion.toString()),
      r.has("useStatefulReconnect")
        ? r.get("useStatefulReconnect") === "true" &&
          (this._options._useStatefulReconnect = !0)
        : this._options._useStatefulReconnect === !0 &&
          r.append("useStatefulReconnect", "true"),
      (n.search = r.toString()),
      n.toString()
    );
  }
}
function vp(e, t) {
  return !e || (t & e) !== 0;
}
class sl {
  constructor(t) {
    (this._transport = t),
      (this._buffer = []),
      (this._executing = !0),
      (this._sendBufferedData = new $r()),
      (this._transportResult = new $r()),
      (this._sendLoopPromise = this._sendLoop());
  }
  send(t) {
    return (
      this._bufferData(t),
      this._transportResult || (this._transportResult = new $r()),
      this._transportResult.promise
    );
  }
  stop() {
    return (
      (this._executing = !1),
      this._sendBufferedData.resolve(),
      this._sendLoopPromise
    );
  }
  _bufferData(t) {
    if (this._buffer.length && typeof this._buffer[0] != typeof t)
      throw new Error(
        `Expected data to be of type ${typeof this
          ._buffer} but was of type ${typeof t}`
      );
    this._buffer.push(t), this._sendBufferedData.resolve();
  }
  async _sendLoop() {
    for (;;) {
      if ((await this._sendBufferedData.promise, !this._executing)) {
        this._transportResult &&
          this._transportResult.reject("Connection stopped.");
        break;
      }
      this._sendBufferedData = new $r();
      const t = this._transportResult;
      this._transportResult = void 0;
      const n =
        typeof this._buffer[0] == "string"
          ? this._buffer.join("")
          : sl._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(n), t.resolve();
      } catch (r) {
        t.reject(r);
      }
    }
  }
  static _concatBuffers(t) {
    const n = t.map((i) => i.byteLength).reduce((i, s) => i + s),
      r = new Uint8Array(n);
    let o = 0;
    for (const i of t) r.set(new Uint8Array(i), o), (o += i.byteLength);
    return r.buffer;
  }
}
class $r {
  constructor() {
    this.promise = new Promise(
      (t, n) => ([this._resolver, this._rejecter] = [t, n])
    );
  }
  resolve() {
    this._resolver();
  }
  reject(t) {
    this._rejecter(t);
  }
}
const yp = "json";
class _p {
  constructor() {
    (this.name = yp), (this.version = 2), (this.transferFormat = de.Text);
  }
  parseMessages(t, n) {
    if (typeof t != "string")
      throw new Error(
        "Invalid input for JSON hub protocol. Expected a string."
      );
    if (!t) return [];
    n === null && (n = cr.instance);
    const r = xe.parse(t),
      o = [];
    for (const i of r) {
      const s = JSON.parse(i);
      if (typeof s.type != "number") throw new Error("Invalid payload.");
      switch (s.type) {
        case D.Invocation:
          this._isInvocationMessage(s);
          break;
        case D.StreamItem:
          this._isStreamItemMessage(s);
          break;
        case D.Completion:
          this._isCompletionMessage(s);
          break;
        case D.Ping:
          break;
        case D.Close:
          break;
        case D.Ack:
          this._isAckMessage(s);
          break;
        case D.Sequence:
          this._isSequenceMessage(s);
          break;
        default:
          n.log(
            v.Information,
            "Unknown message type '" + s.type + "' ignored."
          );
          continue;
      }
      o.push(s);
    }
    return o;
  }
  writeMessage(t) {
    return xe.write(JSON.stringify(t));
  }
  _isInvocationMessage(t) {
    this._assertNotEmptyString(
      t.target,
      "Invalid payload for Invocation message."
    ),
      t.invocationId !== void 0 &&
        this._assertNotEmptyString(
          t.invocationId,
          "Invalid payload for Invocation message."
        );
  }
  _isStreamItemMessage(t) {
    if (
      (this._assertNotEmptyString(
        t.invocationId,
        "Invalid payload for StreamItem message."
      ),
      t.item === void 0)
    )
      throw new Error("Invalid payload for StreamItem message.");
  }
  _isCompletionMessage(t) {
    if (t.result && t.error)
      throw new Error("Invalid payload for Completion message.");
    !t.result &&
      t.error &&
      this._assertNotEmptyString(
        t.error,
        "Invalid payload for Completion message."
      ),
      this._assertNotEmptyString(
        t.invocationId,
        "Invalid payload for Completion message."
      );
  }
  _isAckMessage(t) {
    if (typeof t.sequenceId != "number")
      throw new Error("Invalid SequenceId for Ack message.");
  }
  _isSequenceMessage(t) {
    if (typeof t.sequenceId != "number")
      throw new Error("Invalid SequenceId for Sequence message.");
  }
  _assertNotEmptyString(t, n) {
    if (typeof t != "string" || t === "") throw new Error(n);
  }
}
const wp = {
  trace: v.Trace,
  debug: v.Debug,
  info: v.Information,
  information: v.Information,
  warn: v.Warning,
  warning: v.Warning,
  error: v.Error,
  critical: v.Critical,
  none: v.None,
};
function Sp(e) {
  const t = wp[e.toLowerCase()];
  if (typeof t < "u") return t;
  throw new Error(`Unknown log level: ${e}`);
}
class kp {
  configureLogging(t) {
    if ((G.isRequired(t, "logging"), Cp(t))) this.logger = t;
    else if (typeof t == "string") {
      const n = Sp(t);
      this.logger = new wo(n);
    } else this.logger = new wo(t);
    return this;
  }
  withUrl(t, n) {
    return (
      G.isRequired(t, "url"),
      G.isNotEmpty(t, "url"),
      (this.url = t),
      typeof n == "object"
        ? (this.httpConnectionOptions = { ...this.httpConnectionOptions, ...n })
        : (this.httpConnectionOptions = {
            ...this.httpConnectionOptions,
            transport: n,
          }),
      this
    );
  }
  withHubProtocol(t) {
    return G.isRequired(t, "protocol"), (this.protocol = t), this;
  }
  withAutomaticReconnect(t) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return (
      t
        ? Array.isArray(t)
          ? (this.reconnectPolicy = new Ea(t))
          : (this.reconnectPolicy = t)
        : (this.reconnectPolicy = new Ea()),
      this
    );
  }
  withServerTimeout(t) {
    return (
      G.isRequired(t, "milliseconds"),
      (this._serverTimeoutInMilliseconds = t),
      this
    );
  }
  withKeepAliveInterval(t) {
    return (
      G.isRequired(t, "milliseconds"),
      (this._keepAliveIntervalInMilliseconds = t),
      this
    );
  }
  withStatefulReconnect(t) {
    return (
      this.httpConnectionOptions === void 0 &&
        (this.httpConnectionOptions = {}),
      (this.httpConnectionOptions._useStatefulReconnect = !0),
      (this._statefulReconnectBufferSize = t == null ? void 0 : t.bufferSize),
      this
    );
  }
  build() {
    const t = this.httpConnectionOptions || {};
    if ((t.logger === void 0 && (t.logger = this.logger), !this.url))
      throw new Error(
        "The 'HubConnectionBuilder.withUrl' method must be called before building the connection."
      );
    const n = new mp(this.url, t);
    return il.create(
      n,
      this.logger || cr.instance,
      this.protocol || new _p(),
      this.reconnectPolicy,
      this._serverTimeoutInMilliseconds,
      this._keepAliveIntervalInMilliseconds,
      this._statefulReconnectBufferSize
    );
  }
}
function Cp(e) {
  return e.log !== void 0;
}
const xp = I.createContext(null),
  be = [];
let Ep = null,
  Na = !1;
function Pp({ children: e, stationName: t, onMedicineRequest: n }) {
  const r = I.useRef(""),
    o = I.useRef(t),
    i = I.useRef(n);
  I.useEffect(() => {
    console.log(
      "[SignalR Provider] Station name changed from",
      o.current,
      "to",
      t
    ),
      (o.current = t),
      console.log(
        "[SignalR Provider] stationNameRef.current updated to:",
        o.current
      );
  }, [t]),
    I.useEffect(() => {
      i.current = n;
    }, [n]),
    Na ||
      ((Na = !0),
      (async () => {
        try {
          const u = await yn();
          if (((r.current = u.domain), !u.domain)) {
            console.error("Domain not found in config");
            return;
          }
          const f = new kp()
            .withUrl(`${u.domain}/chatHub`)
            .withAutomaticReconnect()
            .configureLogging(v.Information)
            .build();
          f.on("ReceiveMessage", (...h) => {
            console.log("[SignalR] Raw arguments received:", h),
              console.log("[SignalR] Number of arguments:", h.length);
            try {
              let g = null;
              if (
                (h.length === 1
                  ? (g = h[0])
                  : h.length === 2
                  ? (console.log("[SignalR] Arg 0 (likely user):", h[0]),
                    console.log("[SignalR] Arg 1 (likely message):", h[1]),
                    (g = h[1]))
                  : h.length > 2 &&
                    (console.log(
                      "[SignalR] Multiple arguments, using last one"
                    ),
                    (g = h[h.length - 1])),
                !g)
              ) {
                console.warn("[SignalR] No message data found");
                return;
              }
              console.log("[SignalR] Message data to parse:", g),
                console.log("[SignalR] Message type:", typeof g);
              let _;
              if (typeof g == "string") _ = JSON.parse(g);
              else if (typeof g == "object") _ = g;
              else {
                console.warn("[SignalR] Unknown message format");
                return;
              }
              console.log("[SignalR] Parsed message:", _);
              const m = new CustomEvent("ReceivedEvent", { detail: _ });
              if (
                (document.dispatchEvent(m),
                typeof window.ChathubReceivedEvent == "function" &&
                  window.ChathubReceivedEvent(_),
                _.Method === "med_request_info" &&
                  (console.log("[SignalR] med_request_info detected"),
                  console.log("[SignalR] Data:", _.Data),
                  _.Data && _.Data.length > 0))
              ) {
                const w = _.Data[0];
                console.log("[SignalR] Request data:", w),
                  console.log("[SignalR] requestingUnit:", w.requestingUnit),
                  console.log("[SignalR] Current station:", o.current),
                  console.log(o.current),
                  w.requestingUnit === o.current
                    ? (console.log("[SignalR] Station match! Adding to store"),
                      be.push(w),
                      window.dispatchEvent(
                        new CustomEvent("medicineRequestUpdate")
                      ),
                      i.current())
                    : console.log("[SignalR] Station mismatch, ignoring");
              }
              if (
                _.Result &&
                _.Result.includes("新增申領") &&
                (console.log(
                  "[SignalR] Detected medicine request addition in Result"
                ),
                console.log(
                  "[SignalR] Processing request removal by temp_GUID"
                ),
                _.Data && _.Data.length > 0)
              ) {
                const w = _.Data.map((d) => d.temp_GUID).filter(
                  (d) => d !== void 0
                );
                console.log("[SignalR] GUIDs to remove:", w),
                  console.log("[SignalR] Store before removal:", [...be]);
                let R = 0;
                for (let d = be.length - 1; d >= 0; d--) {
                  const c = be[d];
                  c.temp_GUID &&
                    w.includes(c.temp_GUID) &&
                    (console.log(
                      `[SignalR] Removing request with GUID: ${c.temp_GUID}`
                    ),
                    be.splice(d, 1),
                    R++);
                }
                R > 0
                  ? (console.log(
                      `[SignalR] Removed ${R} request(s) from store`
                    ),
                    console.log("[SignalR] Store after removal:", [...be]),
                    window.dispatchEvent(
                      new CustomEvent("medicineRequestUpdate")
                    ))
                  : console.log(
                      "[SignalR] No matching requests found to remove"
                    );
              }
            } catch (g) {
              console.error("[SignalR] Failed to parse message:", g),
                console.error("[SignalR] Arguments:", h);
            }
          }),
            f.onreconnecting((h) => {
              console.log("[SignalR] Reconnecting...", h);
            }),
            f.onreconnected((h) => {
              console.log("[SignalR] Reconnected with ID:", h);
            }),
            f.onclose(async (h) => {
              console.log("[SignalR] Connection closed", h);
            }),
            await f.start(),
            console.log(
              "[SignalR] Connected successfully to:",
              `${u.domain}/chatHub`
            ),
            console.log("[SignalR] Connection ID:", f.connectionId),
            console.log("[SignalR] Connection State:", f.state),
            (Ep = f);
        } catch (u) {
          console.error("SignalR connection error:", u);
        }
      })());
  const l = {
    sendMessage: async (a) => {
      try {
        let u = r.current;
        u || ((u = (await yn()).domain), (r.current = u)),
          await fetch(`${u}/api/Message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: a }),
          });
      } catch (u) {
        throw (console.error("Failed to send message:", u), u);
      }
    },
    medicineRequests: be,
  };
  return y.jsx(xp.Provider, { value: l, children: e });
}
function Tp({ message: e, type: t, onClose: n, duration: r = 3e3 }) {
  I.useEffect(() => {
    const l = setTimeout(() => {
      n();
    }, r);
    return () => clearTimeout(l);
  }, [r, n]);
  const o = () => {
      switch (t) {
        case "success":
          return y.jsx(Th, { className: "w-5 h-5 text-green-500" });
        case "error":
          return y.jsx(Rh, { className: "w-5 h-5 text-red-500" });
        case "warning":
          return y.jsx(Ph, { className: "w-5 h-5 text-yellow-500" });
      }
    },
    i = () => {
      switch (t) {
        case "success":
          return "bg-green-50 border-green-200";
        case "error":
          return "bg-red-50 border-red-200";
        case "warning":
          return "bg-yellow-50 border-yellow-200";
      }
    },
    s = () => {
      switch (t) {
        case "success":
          return "text-green-800";
        case "error":
          return "text-red-800";
        case "warning":
          return "text-yellow-800";
      }
    };
  return y.jsxs("div", {
    className: `${i()} border rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px] max-w-md animate-slide-in-right`,
    children: [
      o(),
      y.jsx("p", { className: `${s()} flex-1 font-medium`, children: e }),
      y.jsx("button", {
        onClick: n,
        className:
          "p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors",
        "aria-label": "關閉",
        children: y.jsx(rl, { className: "w-4 h-4 text-slate-600" }),
      }),
    ],
  });
}
const qc = I.createContext(void 0);
let Np = 0;
function Rp({ children: e }) {
  const [t, n] = I.useState([]),
    r = I.useCallback((i, s) => {
      const l = Np++;
      n((a) => [...a, { id: l, message: i, type: s }]);
    }, []),
    o = I.useCallback((i) => {
      n((s) => s.filter((l) => l.id !== i));
    }, []);
  return y.jsxs(qc.Provider, {
    value: { showToast: r },
    children: [
      e,
      y.jsx("div", {
        className: "fixed top-4 right-4 z-50 flex flex-col gap-2",
        children: t.map((i) =>
          y.jsx(
            Tp,
            { message: i.message, type: i.type, onClose: () => o(i.id) },
            i.id
          )
        ),
      }),
    ],
  });
}
function Ip() {
  const e = I.useContext(qc);
  if (!e) throw new Error("useToast must be used within ToastProvider");
  return e;
}
function Dp({ isOpen: e, onClose: t, userName: n, userID: r, isLoggedIn: o }) {
  const { pharmacies: i } = Oo(),
    { showToast: s } = Ip(),
    [l, a] = I.useState([...be]),
    [u, f] = I.useState(!1),
    h = i.length > 0 ? i[0].name : "";
  I.useEffect(() => {
    if (!e) return;
    a([...be]);
    const m = () => {
      a([...be]);
    };
    return (
      window.addEventListener("medicineRequestUpdate", m),
      () => {
        window.removeEventListener("medicineRequestUpdate", m);
      }
    );
  }, [e]);
  const g = async (m) => {
      if (!u) {
        if (!o || !n || !r) {
          s("請先選擇登入人員", "warning");
          return;
        }
        f(!0);
        try {
          const w = l[m],
            R = await va([w], n, r, h);
          if (R.Code === 200) {
            let d = R;
            (d.Data = [w]), await ya(d), s("申領單據建立成功", "success");
          } else
            console.error("建立申領單據失敗:", R),
              s(`建立失敗: ${R.Message || "未知錯誤"}`, "error");
        } catch (w) {
          console.error("建立申領單據時發生錯誤:", w),
            s("建立申領單據時發生錯誤", "error");
        } finally {
          f(!1);
        }
      }
    },
    _ = async () => {
      if (!(u || l.length === 0)) {
        if (!o || !n || !r) {
          s("請先選擇登入人員", "warning");
          return;
        }
        f(!0);
        try {
          const m = await va(l, n, r, h);
          if (m.Code === 200) {
            let w = m;
            (w.Data = l), await ya(w), s("所有申領單據建立成功", "success");
          } else
            console.error("建立申領單據失敗:", m),
              s(`建立失敗: ${m.Message || "未知錯誤"}`, "error");
        } catch (m) {
          console.error("建立申領單據時發生錯誤:", m),
            s("建立申領單據時發生錯誤", "error");
        } finally {
          f(!1);
        }
      }
    };
  return e
    ? y.jsx("div", {
        className:
          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
        children: y.jsxs("div", {
          className:
            "bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col",
          children: [
            y.jsxs("div", {
              className:
                "flex items-center justify-between p-4 border-b border-slate-200",
              children: [
                y.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    y.jsx(as, { className: "w-6 h-6 text-blue-600" }),
                    y.jsx("h2", {
                      className: "text-2xl font-bold text-slate-800",
                      children: "藥品申領通知",
                    }),
                    l.length > 0 &&
                      y.jsx("span", {
                        className:
                          "bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full",
                        children: l.length,
                      }),
                  ],
                }),
                y.jsx("button", {
                  onClick: t,
                  className:
                    "p-2 hover:bg-slate-100 rounded-lg transition-colors",
                  "aria-label": "關閉",
                  children: y.jsx(rl, { className: "w-6 h-6 text-slate-600" }),
                }),
              ],
            }),
            y.jsx("div", {
              className: "flex-1 overflow-y-auto p-4",
              children:
                l.length === 0
                  ? y.jsxs("div", {
                      className: "text-center text-slate-500 py-8",
                      children: [
                        y.jsx(as, {
                          className: "w-16 h-16 mx-auto mb-4 text-slate-300",
                        }),
                        y.jsx("p", {
                          className: "text-lg",
                          children: "目前沒有申領訊息",
                        }),
                      ],
                    })
                  : y.jsx("div", {
                      className: "grid grid-cols-1 gap-4",
                      children: l.map((m, w) => {
                        const R = m.actionType === "緊急申領",
                          d = R ? "bg-red-50" : "bg-yellow-50",
                          c = R ? "border-red-200" : "border-yellow-200";
                        return y.jsxs(
                          "div",
                          {
                            className: `${d} border ${c} rounded-lg p-5 hover:shadow-md transition-shadow`,
                            children: [
                              y.jsxs("div", {
                                className:
                                  "flex items-center justify-between mb-4",
                                children: [
                                  y.jsxs("div", {
                                    className: "flex-1 flex items-center",
                                    children: [
                                      y.jsxs("div", {
                                        className: "pr-6",
                                        children: [
                                          y.jsx("h3", {
                                            className:
                                              "text-lg font-bold text-slate-800 mb-1",
                                            children: m.name || "未知藥品",
                                          }),
                                          y.jsx("p", {
                                            className:
                                              "text-base text-slate-700 font-medium",
                                            children: m.code || "N/A",
                                          }),
                                        ],
                                      }),
                                      y.jsx("button", {
                                        onClick: () => g(w),
                                        disabled: u,
                                        className:
                                          "bg-blue-600 flex items-center text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap disabled:bg-slate-400 disabled:cursor-not-allowed",
                                        children: u ? "處理中..." : "建立",
                                      }),
                                    ],
                                  }),
                                  y.jsx("div", {
                                    className: "flex items-center gap-2",
                                    children:
                                      R &&
                                      y.jsx("div", {
                                        className:
                                          "flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold",
                                        children: y.jsx("span", {
                                          children: m.actionType,
                                        }),
                                      }),
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                  y.jsx("div", {
                                    className:
                                      "bg-white bg-opacity-50 rounded-lg p-3",
                                    children: y.jsx("p", {
                                      className:
                                        "text-base font-semibold text-slate-800",
                                      children: m.requestingUnit || "N/A",
                                    }),
                                  }),
                                  y.jsx("div", {
                                    className:
                                      "bg-white bg-opacity-50 rounded-lg p-3",
                                    children: y.jsx("p", {
                                      className:
                                        "text-base font-semibold text-slate-800",
                                      children: m.requestedQuantity || "N/A",
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          w
                        );
                      }),
                    }),
            }),
            l.length > 0 &&
              y.jsx("div", {
                className: "p-4 border-t border-slate-200",
                children: y.jsx("button", {
                  onClick: _,
                  disabled: u,
                  className:
                    "w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed",
                  children: u ? "處理中..." : "全部建立",
                }),
              }),
          ],
        }),
      })
    : null;
}
const jp = [
  {
    id: "outpatient-odd",
    title: "門診單號",
    currentNumber: 1001,
    baseNumber: 1001,
    intervalMs: 5 * 60 * 1e3,
    increment: 2,
    visible: !0,
  },
  {
    id: "outpatient-even",
    title: "門診雙號",
    currentNumber: 1002,
    baseNumber: 1002,
    intervalMs: 5 * 60 * 1e3,
    increment: 2,
    visible: !0,
  },
  {
    id: "emergency",
    title: "急診",
    currentNumber: 9001,
    baseNumber: 9001,
    intervalMs: 2 * 60 * 1e3,
    increment: 1,
    visible: !0,
  },
  {
    id: "inpatient",
    title: "住院",
    currentNumber: 6001,
    baseNumber: 6001,
    intervalMs: 3 * 60 * 1e3 + 10 * 1e3,
    increment: 1,
    visible: !0,
  },
];
function Lp(e) {
  const [t, n] = I.useState(jp);
  return (
    I.useEffect(() => {
      n((r) => r.map((o) => ({ ...o, visible: Mp(o.id, e) })));
    }, [e]),
    I.useEffect(() => {
      const r = t.map((o) =>
        setInterval(() => {
          n((i) =>
            i.map((s) =>
              s.id === o.id
                ? { ...s, currentNumber: s.currentNumber + s.increment }
                : s
            )
          );
        }, o.intervalMs)
      );
      return () => {
        r.forEach((o) => clearInterval(o));
      };
    }, []),
    t
  );
}
function Mp(e, t) {
  switch (e) {
    case "outpatient-odd":
      return t.showOutpatientOdd;
    case "outpatient-even":
      return t.showOutpatientEven;
    case "emergency":
      return t.showEmergency;
    case "inpatient":
      return t.showInpatient;
    default:
      return !0;
  }
}
function zp() {
  const { currentStationName: e, isLoading: t } = Oo(),
    { selectedUser: n, availableUsers: r, isLoggedIn: o, isLoading: i } = bc(),
    [s, l] = I.useState(Lh()),
    [a, u] = I.useState(!1),
    [f, h] = I.useState(!1),
    g = () => {
      h(!0);
    },
    _ = Lp(s);
  I.useEffect(() => {
    Mh(s);
  }, [s]);
  const m = _.filter((R) => R.visible),
    w = (R) => {
      switch (R) {
        case "outpatient-odd":
          return { bgColor: "bg-blue-500", textColor: "text-white" };
        case "outpatient-even":
          return { bgColor: "bg-cyan-500", textColor: "text-white" };
        case "emergency":
          return { bgColor: "bg-red-500", textColor: "text-white" };
        case "inpatient":
          return { bgColor: "bg-green-500", textColor: "text-white" };
        default:
          return { bgColor: "bg-slate-500", textColor: "text-white" };
      }
    };
  return t || i
    ? y.jsx("div", {
        className:
          "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center",
        children: y.jsxs("div", {
          className: "text-center",
          children: [
            y.jsx("div", {
              className:
                "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4",
            }),
            y.jsx("p", { className: "text-slate-600", children: "載入中..." }),
          ],
        }),
      })
    : y.jsx(Pp, {
        stationName: e,
        onMedicineRequest: g,
        children: y.jsxs("div", {
          className:
            "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col",
          children: [
            y.jsx(Ih, {
              stationName: e,
              userName: o ? n.name : "未登入",
              userRole: o ? n.role || "使用者" : "",
              onSettingsClick: () => u(!0),
            }),
            y.jsxs("main", {
              className: "flex-1 container mx-auto px-4 py-8",
              children: [
                y.jsx("div", {
                  className:
                    "grid grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto",
                  children: m.map((R) => {
                    const d = w(R.id);
                    return y.jsx(
                      jh,
                      {
                        title: R.title,
                        number: R.currentNumber,
                        bgColor: d.bgColor,
                        textColor: d.textColor,
                      },
                      R.id
                    );
                  }),
                }),
                m.length === 0 &&
                  y.jsx("div", {
                    className: "text-center py-16",
                    children: y.jsx("p", {
                      className: "text-slate-500 text-lg",
                      children: "請在設定中選擇要顯示的視窗",
                    }),
                  }),
              ],
            }),
            y.jsx("button", {
              onClick: () => h(!0),
              disabled: !o,
              className: `fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all ${
                o
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`,
              "aria-label": "藥品申領",
              title: o ? "藥品申領" : "請先選擇登入人員",
              children: y.jsx(as, { className: "w-6 h-6" }),
            }),
            y.jsx(Dh, {}),
            y.jsx(Hh, {
              isOpen: a,
              onClose: () => u(!1),
              settings: s,
              onSettingsChange: l,
            }),
            y.jsx(Dp, {
              isOpen: f,
              onClose: () => h(!1),
              userName: o ? n.name : "",
              userID: o ? n.id : "",
              isLoggedIn: o,
            }),
          ],
        }),
      });
}
function $p() {
  return y.jsx(Rp, { children: y.jsx($h, { children: y.jsx(Op, {}) }) });
}
function Op() {
  const { currentStationName: e } = Oo();
  return y.jsx(Fh, { currentStationName: e, children: y.jsx(zp, {}) });
}
Hc(document.getElementById("root")).render(
  y.jsx(I.StrictMode, { children: y.jsx($p, {}) })
);

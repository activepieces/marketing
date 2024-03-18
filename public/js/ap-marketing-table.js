/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ti(t, e) {
  const r = new Set(t.split(","));
  return e ? (o) => r.has(o.toLowerCase()) : (o) => r.has(o);
}
const it = {}, Ue = [], Lt = () => {
}, hs = () => !1, lo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), ei = (t) => t.startsWith("onUpdate:"), ct = Object.assign, ri = (t, e) => {
  const r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}, ws = Object.prototype.hasOwnProperty, Z = (t, e) => ws.call(t, e), z = Array.isArray, Ve = (t) => mr(t) === "[object Map]", co = (t) => mr(t) === "[object Set]", qi = (t) => mr(t) === "[object Date]", N = (t) => typeof t == "function", dt = (t) => typeof t == "string", ve = (t) => typeof t == "symbol", rt = (t) => t !== null && typeof t == "object", qn = (t) => (rt(t) || N(t)) && N(t.then) && N(t.catch), Kn = Object.prototype.toString, mr = (t) => Kn.call(t), vs = (t) => mr(t).slice(8, -1), Wn = (t) => mr(t) === "[object Object]", oi = (t) => dt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Mr = /* @__PURE__ */ ti(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), po = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (r) => e[r] || (e[r] = t(r));
}, bs = /-(\w)/g, Jt = po((t) => t.replace(bs, (e, r) => r ? r.toUpperCase() : "")), ms = /\B([A-Z])/g, Ft = po(
  (t) => t.replace(ms, "-$1").toLowerCase()
), Yn = po((t) => t.charAt(0).toUpperCase() + t.slice(1)), ko = po((t) => t ? `on${Yn(t)}` : ""), be = (t, e) => !Object.is(t, e), Dr = (t, e) => {
  for (let r = 0; r < t.length; r++)
    t[r](e);
}, Ur = (t, e, r) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
}, ii = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, jo = (t) => {
  const e = dt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Ki;
const Xn = () => Ki || (Ki = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ni(t) {
  if (z(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const o = t[r], i = dt(o) ? _s(o) : ni(o);
      if (i)
        for (const n in i)
          e[n] = i[n];
    }
    return e;
  } else if (dt(t) || rt(t))
    return t;
}
const ys = /;(?![^(]*\))/g, xs = /:([^]+)/, ks = /\/\*[^]*?\*\//g;
function _s(t) {
  const e = {};
  return t.replace(ks, "").split(ys).forEach((r) => {
    if (r) {
      const o = r.split(xs);
      o.length > 1 && (e[o[0].trim()] = o[1].trim());
    }
  }), e;
}
function ot(t) {
  let e = "";
  if (dt(t))
    e = t;
  else if (z(t))
    for (let r = 0; r < t.length; r++) {
      const o = ot(t[r]);
      o && (e += o + " ");
    }
  else if (rt(t))
    for (const r in t)
      t[r] && (e += r + " ");
  return e.trim();
}
const Es = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Cs = /* @__PURE__ */ ti(Es);
function Gn(t) {
  return !!t || t === "";
}
function As(t, e) {
  if (t.length !== e.length)
    return !1;
  let r = !0;
  for (let o = 0; r && o < t.length; o++)
    r = pr(t[o], e[o]);
  return r;
}
function pr(t, e) {
  if (t === e)
    return !0;
  let r = qi(t), o = qi(e);
  if (r || o)
    return r && o ? t.getTime() === e.getTime() : !1;
  if (r = ve(t), o = ve(e), r || o)
    return t === e;
  if (r = z(t), o = z(e), r || o)
    return r && o ? As(t, e) : !1;
  if (r = rt(t), o = rt(e), r || o) {
    if (!r || !o)
      return !1;
    const i = Object.keys(t).length, n = Object.keys(e).length;
    if (i !== n)
      return !1;
    for (const a in t) {
      const s = t.hasOwnProperty(a), l = e.hasOwnProperty(a);
      if (s && !l || !s && l || !pr(t[a], e[a]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function Is(t, e) {
  return t.findIndex((r) => pr(r, e));
}
const ut = (t) => dt(t) ? t : t == null ? "" : z(t) || rt(t) && (t.toString === Kn || !N(t.toString)) ? JSON.stringify(t, Zn, 2) : String(t), Zn = (t, e) => e && e.__v_isRef ? Zn(t, e.value) : Ve(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (r, [o, i], n) => (r[_o(o, n) + " =>"] = i, r),
    {}
  )
} : co(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((r) => _o(r))
} : ve(e) ? _o(e) : rt(e) && !z(e) && !Wn(e) ? String(e) : e, _o = (t, e = "") => {
  var r;
  return ve(t) ? `Symbol(${(r = t.description) != null ? r : e})` : t;
};
let Rt;
class Ls {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Rt, !e && Rt && (this.index = (Rt.scopes || (Rt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const r = Rt;
      try {
        return Rt = this, e();
      } finally {
        Rt = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Rt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Rt = this.parent;
  }
  stop(e) {
    if (this._active) {
      let r, o;
      for (r = 0, o = this.effects.length; r < o; r++)
        this.effects[r].stop();
      for (r = 0, o = this.cleanups.length; r < o; r++)
        this.cleanups[r]();
      if (this.scopes)
        for (r = 0, o = this.scopes.length; r < o; r++)
          this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ts(t, e = Rt) {
  e && e.active && e.effects.push(t);
}
function Os() {
  return Rt;
}
let ze;
class ai {
  constructor(e, r, o, i) {
    this.fn = e, this.trigger = r, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ts(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      ye();
      for (let e = 0; e < this._depsLength; e++) {
        const r = this.deps[e];
        if (r.computed && (Ps(r.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), xe();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = we, r = ze;
    try {
      return we = !0, ze = this, this._runnings++, Wi(this), this.fn();
    } finally {
      Yi(this), this._runnings--, ze = r, we = e;
    }
  }
  stop() {
    var e;
    this.active && (Wi(this), Yi(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function Ps(t) {
  return t.value;
}
function Wi(t) {
  t._trackId++, t._depsLength = 0;
}
function Yi(t) {
  if (t.deps && t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      Jn(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function Jn(t, e) {
  const r = t.get(e);
  r !== void 0 && e._trackId !== r && (t.delete(e), t.size === 0 && t.cleanup());
}
let we = !0, Mo = 0;
const Qn = [];
function ye() {
  Qn.push(we), we = !1;
}
function xe() {
  const t = Qn.pop();
  we = t === void 0 ? !0 : t;
}
function si() {
  Mo++;
}
function li() {
  for (Mo--; !Mo && Do.length; )
    Do.shift()();
}
function ta(t, e, r) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const o = t.deps[t._depsLength];
    o !== e ? (o && Jn(o, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const Do = [];
function ea(t, e, r) {
  si();
  for (const o of t.keys())
    if (o._dirtyLevel < e && t.get(o) === o._trackId) {
      const i = o._dirtyLevel;
      o._dirtyLevel = e, i === 0 && (o._shouldSchedule = !0, o.trigger());
    }
  ra(t), li();
}
function ra(t) {
  for (const e of t.keys())
    e.scheduler && e._shouldSchedule && (!e._runnings || e.allowRecurse) && t.get(e) === e._trackId && (e._shouldSchedule = !1, Do.push(e.scheduler));
}
const oa = (t, e) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = t, r.computed = e, r;
}, zo = /* @__PURE__ */ new WeakMap(), He = Symbol(""), Ho = Symbol("");
function Ct(t, e, r) {
  if (we && ze) {
    let o = zo.get(t);
    o || zo.set(t, o = /* @__PURE__ */ new Map());
    let i = o.get(r);
    i || o.set(r, i = oa(() => o.delete(r))), ta(
      ze,
      i
    );
  }
}
function Qt(t, e, r, o, i, n) {
  const a = zo.get(t);
  if (!a)
    return;
  let s = [];
  if (e === "clear")
    s = [...a.values()];
  else if (r === "length" && z(t)) {
    const l = Number(o);
    a.forEach((p, g) => {
      (g === "length" || !ve(g) && g >= l) && s.push(p);
    });
  } else
    switch (r !== void 0 && s.push(a.get(r)), e) {
      case "add":
        z(t) ? oi(r) && s.push(a.get("length")) : (s.push(a.get(He)), Ve(t) && s.push(a.get(Ho)));
        break;
      case "delete":
        z(t) || (s.push(a.get(He)), Ve(t) && s.push(a.get(Ho)));
        break;
      case "set":
        Ve(t) && s.push(a.get(He));
        break;
    }
  si();
  for (const l of s)
    l && ea(
      l,
      2
    );
  li();
}
const Ss = /* @__PURE__ */ ti("__proto__,__v_isRef,__isVue"), ia = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ve)
), Xi = /* @__PURE__ */ js();
function js() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...r) {
      const o = X(this);
      for (let n = 0, a = this.length; n < a; n++)
        Ct(o, "get", n + "");
      const i = o[e](...r);
      return i === -1 || i === !1 ? o[e](...r.map(X)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...r) {
      ye(), si();
      const o = X(this)[e].apply(this, r);
      return li(), xe(), o;
    };
  }), t;
}
function Ms(t) {
  const e = X(this);
  return Ct(e, "has", t), e.hasOwnProperty(t);
}
class na {
  constructor(e = !1, r = !1) {
    this._isReadonly = e, this._shallow = r;
  }
  get(e, r, o) {
    const i = this._isReadonly, n = this._shallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return n;
    if (r === "__v_raw")
      return o === (i ? n ? Ws : ca : n ? la : sa).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(o) ? e : void 0;
    const a = z(e);
    if (!i) {
      if (a && Z(Xi, r))
        return Reflect.get(Xi, r, o);
      if (r === "hasOwnProperty")
        return Ms;
    }
    const s = Reflect.get(e, r, o);
    return (ve(r) ? ia.has(r) : Ss(r)) || (i || Ct(e, "get", r), n) ? s : yt(s) ? a && oi(r) ? s : s.value : rt(s) ? i ? da(s) : pi(s) : s;
  }
}
class aa extends na {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, r, o, i) {
    let n = e[r];
    if (!this._shallow) {
      const l = Ke(n);
      if (!Vr(o) && !Ke(o) && (n = X(n), o = X(o)), !z(e) && yt(n) && !yt(o))
        return l ? !1 : (n.value = o, !0);
    }
    const a = z(e) && oi(r) ? Number(r) < e.length : Z(e, r), s = Reflect.set(e, r, o, i);
    return e === X(i) && (a ? be(o, n) && Qt(e, "set", r, o) : Qt(e, "add", r, o)), s;
  }
  deleteProperty(e, r) {
    const o = Z(e, r);
    e[r];
    const i = Reflect.deleteProperty(e, r);
    return i && o && Qt(e, "delete", r, void 0), i;
  }
  has(e, r) {
    const o = Reflect.has(e, r);
    return (!ve(r) || !ia.has(r)) && Ct(e, "has", r), o;
  }
  ownKeys(e) {
    return Ct(
      e,
      "iterate",
      z(e) ? "length" : He
    ), Reflect.ownKeys(e);
  }
}
class Ds extends na {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, r) {
    return !0;
  }
  deleteProperty(e, r) {
    return !0;
  }
}
const zs = /* @__PURE__ */ new aa(), Hs = /* @__PURE__ */ new Ds(), Bs = /* @__PURE__ */ new aa(
  !0
), ci = (t) => t, go = (t) => Reflect.getPrototypeOf(t);
function _r(t, e, r = !1, o = !1) {
  t = t.__v_raw;
  const i = X(t), n = X(e);
  r || (be(e, n) && Ct(i, "get", e), Ct(i, "get", n));
  const { has: a } = go(i), s = o ? ci : r ? ui : gr;
  if (a.call(i, e))
    return s(t.get(e));
  if (a.call(i, n))
    return s(t.get(n));
  t !== i && t.get(e);
}
function Er(t, e = !1) {
  const r = this.__v_raw, o = X(r), i = X(t);
  return e || (be(t, i) && Ct(o, "has", t), Ct(o, "has", i)), t === i ? r.has(t) : r.has(t) || r.has(i);
}
function Cr(t, e = !1) {
  return t = t.__v_raw, !e && Ct(X(t), "iterate", He), Reflect.get(t, "size", t);
}
function Gi(t) {
  t = X(t);
  const e = X(this);
  return go(e).has.call(e, t) || (e.add(t), Qt(e, "add", t, t)), this;
}
function Zi(t, e) {
  e = X(e);
  const r = X(this), { has: o, get: i } = go(r);
  let n = o.call(r, t);
  n || (t = X(t), n = o.call(r, t));
  const a = i.call(r, t);
  return r.set(t, e), n ? be(e, a) && Qt(r, "set", t, e) : Qt(r, "add", t, e), this;
}
function Ji(t) {
  const e = X(this), { has: r, get: o } = go(e);
  let i = r.call(e, t);
  i || (t = X(t), i = r.call(e, t)), o && o.call(e, t);
  const n = e.delete(t);
  return i && Qt(e, "delete", t, void 0), n;
}
function Qi() {
  const t = X(this), e = t.size !== 0, r = t.clear();
  return e && Qt(t, "clear", void 0, void 0), r;
}
function Ar(t, e) {
  return function(o, i) {
    const n = this, a = n.__v_raw, s = X(a), l = e ? ci : t ? ui : gr;
    return !t && Ct(s, "iterate", He), a.forEach((p, g) => o.call(i, l(p), l(g), n));
  };
}
function Ir(t, e, r) {
  return function(...o) {
    const i = this.__v_raw, n = X(i), a = Ve(n), s = t === "entries" || t === Symbol.iterator && a, l = t === "keys" && a, p = i[t](...o), g = r ? ci : e ? ui : gr;
    return !e && Ct(
      n,
      "iterate",
      l ? Ho : He
    ), {
      // iterator protocol
      next() {
        const { value: w, done: v } = p.next();
        return v ? { value: w, done: v } : {
          value: s ? [g(w[0]), g(w[1])] : g(w),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ne(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Rs() {
  const t = {
    get(n) {
      return _r(this, n);
    },
    get size() {
      return Cr(this);
    },
    has: Er,
    add: Gi,
    set: Zi,
    delete: Ji,
    clear: Qi,
    forEach: Ar(!1, !1)
  }, e = {
    get(n) {
      return _r(this, n, !1, !0);
    },
    get size() {
      return Cr(this);
    },
    has: Er,
    add: Gi,
    set: Zi,
    delete: Ji,
    clear: Qi,
    forEach: Ar(!1, !0)
  }, r = {
    get(n) {
      return _r(this, n, !0);
    },
    get size() {
      return Cr(this, !0);
    },
    has(n) {
      return Er.call(this, n, !0);
    },
    add: ne("add"),
    set: ne("set"),
    delete: ne("delete"),
    clear: ne("clear"),
    forEach: Ar(!0, !1)
  }, o = {
    get(n) {
      return _r(this, n, !0, !0);
    },
    get size() {
      return Cr(this, !0);
    },
    has(n) {
      return Er.call(this, n, !0);
    },
    add: ne("add"),
    set: ne("set"),
    delete: ne("delete"),
    clear: ne("clear"),
    forEach: Ar(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
    t[n] = Ir(
      n,
      !1,
      !1
    ), r[n] = Ir(
      n,
      !0,
      !1
    ), e[n] = Ir(
      n,
      !1,
      !0
    ), o[n] = Ir(
      n,
      !0,
      !0
    );
  }), [
    t,
    r,
    e,
    o
  ];
}
const [
  Fs,
  Ns,
  Us,
  Vs
] = /* @__PURE__ */ Rs();
function di(t, e) {
  const r = e ? t ? Vs : Us : t ? Ns : Fs;
  return (o, i, n) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? o : Reflect.get(
    Z(r, i) && i in o ? r : o,
    i,
    n
  );
}
const $s = {
  get: /* @__PURE__ */ di(!1, !1)
}, qs = {
  get: /* @__PURE__ */ di(!1, !0)
}, Ks = {
  get: /* @__PURE__ */ di(!0, !1)
}, sa = /* @__PURE__ */ new WeakMap(), la = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), Ws = /* @__PURE__ */ new WeakMap();
function Ys(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xs(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ys(vs(t));
}
function pi(t) {
  return Ke(t) ? t : gi(
    t,
    !1,
    zs,
    $s,
    sa
  );
}
function Gs(t) {
  return gi(
    t,
    !1,
    Bs,
    qs,
    la
  );
}
function da(t) {
  return gi(
    t,
    !0,
    Hs,
    Ks,
    ca
  );
}
function gi(t, e, r, o, i) {
  if (!rt(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const n = i.get(t);
  if (n)
    return n;
  const a = Xs(t);
  if (a === 0)
    return t;
  const s = new Proxy(
    t,
    a === 2 ? o : r
  );
  return i.set(t, s), s;
}
function $e(t) {
  return Ke(t) ? $e(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ke(t) {
  return !!(t && t.__v_isReadonly);
}
function Vr(t) {
  return !!(t && t.__v_isShallow);
}
function pa(t) {
  return $e(t) || Ke(t);
}
function X(t) {
  const e = t && t.__v_raw;
  return e ? X(e) : t;
}
function ga(t) {
  return Ur(t, "__v_skip", !0), t;
}
const gr = (t) => rt(t) ? pi(t) : t, ui = (t) => rt(t) ? da(t) : t;
class ua {
  constructor(e, r, o, i) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ai(
      () => e(this._value),
      () => zr(this, 1),
      () => this.dep && ra(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = o;
  }
  get value() {
    const e = X(this);
    return (!e._cacheable || e.effect.dirty) && be(e._value, e._value = e.effect.run()) && zr(e, 2), fa(e), e.effect._dirtyLevel >= 1 && zr(e, 1), e._value;
  }
  set value(e) {
    this._setter(e);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
  // #endregion
}
function Zs(t, e, r = !1) {
  let o, i;
  const n = N(t);
  return n ? (o = t, i = Lt) : (o = t.get, i = t.set), new ua(o, i, n || !i, r);
}
function fa(t) {
  we && ze && (t = X(t), ta(
    ze,
    t.dep || (t.dep = oa(
      () => t.dep = void 0,
      t instanceof ua ? t : void 0
    ))
  ));
}
function zr(t, e = 2, r) {
  t = X(t);
  const o = t.dep;
  o && ea(
    o,
    e
  );
}
function yt(t) {
  return !!(t && t.__v_isRef === !0);
}
function Ce(t) {
  return Js(t, !1);
}
function Js(t, e) {
  return yt(t) ? t : new Qs(t, e);
}
class Qs {
  constructor(e, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? e : X(e), this._value = r ? e : gr(e);
  }
  get value() {
    return fa(this), this._value;
  }
  set value(e) {
    const r = this.__v_isShallow || Vr(e) || Ke(e);
    e = r ? e : X(e), be(e, this._rawValue) && (this._rawValue = e, this._value = r ? e : gr(e), zr(this, 2));
  }
}
function Q(t) {
  return yt(t) ? t.value : t;
}
const tl = {
  get: (t, e, r) => Q(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const i = t[e];
    return yt(i) && !yt(r) ? (i.value = r, !0) : Reflect.set(t, e, r, o);
  }
};
function ha(t) {
  return $e(t) ? t : new Proxy(t, tl);
}
var or = { NVM_INC: "/Users/activepieces/.nvm/versions/node/v20.0.0/include/node", MANPATH: "/Users/activepieces/.nvm/versions/node/v20.0.0/share/man:/opt/homebrew/share/man::", rvm_use_flag: "", rvm_bin_path: "/Users/activepieces/.rvm/bin", TERM_PROGRAM: "Apple_Terminal", NODE: "/Users/activepieces/.nvm/versions/node/v20.0.0/bin/node", INIT_CWD: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components", rvm_quiet_flag: "", NVM_CD_FLAGS: "-q", GEM_HOME: "/Users/activepieces/.rvm/gems/ruby-3.0.0", rvm_gemstone_url: "", ASDF_DIR: "/opt/homebrew/opt/asdf/libexec", TERM: "xterm-256color", SHELL: "/bin/zsh", npm_config_metrics_registry: "https://registry.npmjs.org/", rvm_docs_type: "", IRBRC: "/Users/activepieces/.rvm/rubies/ruby-3.0.0/.irbrc", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/ls/699_p22d1yxf77hyxm4y3r4h0000gp/T/", npm_config_global_prefix: "/Users/activepieces/.nvm/versions/node/v20.0.0", TERM_PROGRAM_VERSION: "450", COLOR: "1", rvm_hook: "", MY_RUBY_HOME: "/Users/activepieces/.rvm/rubies/ruby-3.0.0", TERM_SESSION_ID: "99DDD72F-553F-4E6D-84E5-567AF849A55A", npm_config_noproxy: "", npm_config_local_prefix: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components", PNPM_HOME: "/Users/activepieces/Library/pnpm", NVM_DIR: "/Users/activepieces/.nvm", USER: "activepieces", rvm_gemstone_package_file: "", npm_config_globalconfig: "/Users/activepieces/.nvm/versions/node/v20.0.0/etc/npmrc", rvm_path: "/Users/activepieces/.rvm", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.fGnozCNrGC/Listeners", __CF_USER_TEXT_ENCODING: "0x1F6:0x0:0x2", npm_execpath: "/Users/activepieces/.nvm/versions/node/v20.0.0/lib/node_modules/npm/bin/npm-cli.js", rvm_proxy: "", rvm_ruby_file: "", rvm_silent_flag: "", rvm_prefix: "/Users/activepieces", rvm_ruby_make: "", PATH: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components/node_modules/.bin:/Users/activepieces/Documents/ap/marketing/node_modules/.bin:/Users/activepieces/Documents/ap/node_modules/.bin:/Users/activepieces/Documents/node_modules/.bin:/Users/activepieces/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/activepieces/.nvm/versions/node/v20.0.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/activepieces/.rvm/gems/ruby-3.0.0/bin:/Users/activepieces/.rvm/gems/ruby-3.0.0@global/bin:/Users/activepieces/.rvm/rubies/ruby-3.0.0/bin:/Users/activepieces/.nvm/versions/node/v20.0.0/bin:/Users/activepieces/Library/pnpm:/Users/activepieces/.asdf/shims:/opt/homebrew/opt/asdf/libexec/bin:/Users/activepieces/.rbenv/shims:/Users/activepieces/.gem/ruby/3.1.2/bin:/Users/activepieces/.rubies/ruby-3.1.2/lib/ruby/gems/3.1.0/bin:/Users/activepieces/.rubies/ruby-3.1.2/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/usr/local/mysql/bin:/Users/activepieces/.gem/ruby/2.6.0/bin:/Users/activepieces/.rvm/bin", npm_package_json: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components/package.json", _: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components/node_modules/.bin/vite", npm_config_userconfig: "/Users/activepieces/.npmrc", npm_config_init_module: "/Users/activepieces/.npm-init.js", __CFBundleIdentifier: "com.apple.Terminal", npm_command: "run-script", PWD: "/Users/activepieces/Documents/ap/marketing/ap-marketing-web-components", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "ap-marketing-web-components", rvm_sdk: "", XPC_FLAGS: "0x0", RUBY_ENGINE: "ruby", npm_config_node_gyp: "/Users/activepieces/.nvm/versions/node/v20.0.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", RBENV_SHELL: "zsh", npm_package_version: "0.0.0", XPC_SERVICE_NAME: "0", rvm_version: "1.29.12 (latest)", rvm_script_name: "", rvm_pretty_print_flag: "", HOME: "/Users/activepieces", SHLVL: "2", rvm_ruby_mode: "", GEM_ROOT: "/Users/activepieces/.rubies/ruby-3.1.2/lib/ruby/gems/3.1.0", HOMEBREW_PREFIX: "/opt/homebrew", npm_config_cache: "/Users/activepieces/.npm", LOGNAME: "activepieces", npm_lifecycle_script: "vite build", rvm_alias_expanded: "", LC_CTYPE: "UTF-8", GEM_PATH: "/Users/activepieces/.rvm/gems/ruby-3.0.0:/Users/activepieces/.rvm/gems/ruby-3.0.0@global", NVM_BIN: "/Users/activepieces/.nvm/versions/node/v20.0.0/bin", RUBY_ROOT: "/Users/activepieces/.rubies/ruby-3.1.2", npm_config_user_agent: "npm/9.6.4 node/v20.0.0 darwin arm64 workspaces/false", rvm_nightly_flag: "", rvm_ruby_make_install: "", INFOPATH: "/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", rvm_niceness: "", rvm_ruby_bits: "", RUBYOPT: "", rvm_bin_flag: "", rvm_only_path_flag: "", RUBY_VERSION: "ruby-3.0.0", npm_node_execpath: "/Users/activepieces/.nvm/versions/node/v20.0.0/bin/node", npm_config_prefix: "/Users/activepieces/.nvm/versions/node/v20.0.0", NODE_ENV: "production" };
const ir = [];
function el(t, ...e) {
  ye();
  const r = ir.length ? ir[ir.length - 1].component : null, o = r && r.appContext.config.warnHandler, i = rl();
  if (o)
    te(
      o,
      r,
      11,
      [
        t + e.join(""),
        r && r.proxy,
        i.map(
          ({ vnode: n }) => `at <${Ka(r, n.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const n = [`[Vue warn]: ${t}`, ...e];
    i.length && n.push(`
`, ...ol(i)), console.warn(...n);
  }
  xe();
}
function rl() {
  let t = ir[ir.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const r = e[0];
    r && r.vnode === t ? r.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const o = t.component && t.component.parent;
    t = o && o.vnode;
  }
  return e;
}
function ol(t) {
  const e = [];
  return t.forEach((r, o) => {
    e.push(...o === 0 ? [] : [`
`], ...il(r));
  }), e;
}
function il({ vnode: t, recurseCount: e }) {
  const r = e > 0 ? `... (${e} recursive calls)` : "", o = t.component ? t.component.parent == null : !1, i = ` at <${Ka(
    t.component,
    t.type,
    o
  )}`, n = ">" + r;
  return t.props ? [i, ...nl(t.props), n] : [i + n];
}
function nl(t) {
  const e = [], r = Object.keys(t);
  return r.slice(0, 3).forEach((o) => {
    e.push(...wa(o, t[o]));
  }), r.length > 3 && e.push(" ..."), e;
}
function wa(t, e, r) {
  return dt(e) ? (e = JSON.stringify(e), r ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? r ? e : [`${t}=${e}`] : yt(e) ? (e = wa(t, X(e.value), !0), r ? e : [`${t}=Ref<`, e, ">"]) : N(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = X(e), r ? e : [`${t}=`, e]);
}
function te(t, e, r, o) {
  let i;
  try {
    i = o ? t(...o) : t();
  } catch (n) {
    uo(n, e, r);
  }
  return i;
}
function St(t, e, r, o) {
  if (N(t)) {
    const n = te(t, e, r, o);
    return n && qn(n) && n.catch((a) => {
      uo(a, e, r);
    }), n;
  }
  const i = [];
  for (let n = 0; n < t.length; n++)
    i.push(St(t[n], e, r, o));
  return i;
}
function uo(t, e, r, o = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let n = e.parent;
    const a = e.proxy, s = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; n; ) {
      const p = n.ec;
      if (p) {
        for (let g = 0; g < p.length; g++)
          if (p[g](t, a, s) === !1)
            return;
      }
      n = n.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      te(
        l,
        null,
        10,
        [t, a, s]
      );
      return;
    }
  }
  al(t, r, i, o);
}
function al(t, e, r, o = !0) {
  console.error(t);
}
let ur = !1, Bo = !1;
const ht = [];
let Wt = 0;
const qe = [];
let le = null, Pe = 0;
const va = /* @__PURE__ */ Promise.resolve();
let fi = null;
function hi(t) {
  const e = fi || va;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function sl(t) {
  let e = Wt + 1, r = ht.length;
  for (; e < r; ) {
    const o = e + r >>> 1, i = ht[o], n = fr(i);
    n < t || n === t && i.pre ? e = o + 1 : r = o;
  }
  return e;
}
function wi(t) {
  (!ht.length || !ht.includes(
    t,
    ur && t.allowRecurse ? Wt + 1 : Wt
  )) && (t.id == null ? ht.push(t) : ht.splice(sl(t.id), 0, t), ba());
}
function ba() {
  !ur && !Bo && (Bo = !0, fi = va.then(ya));
}
function ll(t) {
  const e = ht.indexOf(t);
  e > Wt && ht.splice(e, 1);
}
function cl(t) {
  z(t) ? qe.push(...t) : (!le || !le.includes(
    t,
    t.allowRecurse ? Pe + 1 : Pe
  )) && qe.push(t), ba();
}
function tn(t, e, r = ur ? Wt + 1 : 0) {
  for (; r < ht.length; r++) {
    const o = ht[r];
    if (o && o.pre) {
      if (t && o.id !== t.uid)
        continue;
      ht.splice(r, 1), r--, o();
    }
  }
}
function ma(t) {
  if (qe.length) {
    const e = [...new Set(qe)].sort(
      (r, o) => fr(r) - fr(o)
    );
    if (qe.length = 0, le) {
      le.push(...e);
      return;
    }
    for (le = e, Pe = 0; Pe < le.length; Pe++)
      le[Pe]();
    le = null, Pe = 0;
  }
}
const fr = (t) => t.id == null ? 1 / 0 : t.id, dl = (t, e) => {
  const r = fr(t) - fr(e);
  if (r === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return r;
};
function ya(t) {
  Bo = !1, ur = !0, ht.sort(dl);
  const e = Lt;
  try {
    for (Wt = 0; Wt < ht.length; Wt++) {
      const r = ht[Wt];
      r && r.active !== !1 && (or.NODE_ENV !== "production" && e(r), te(r, null, 14));
    }
  } finally {
    Wt = 0, ht.length = 0, ma(), ur = !1, fi = null, (ht.length || qe.length) && ya();
  }
}
function pl(t, e, ...r) {
  if (t.isUnmounted)
    return;
  const o = t.vnode.props || it;
  let i = r;
  const n = e.startsWith("update:"), a = n && e.slice(7);
  if (a && a in o) {
    const g = `${a === "modelValue" ? "model" : a}Modifiers`, { number: w, trim: v } = o[g] || it;
    v && (i = r.map((f) => dt(f) ? f.trim() : f)), w && (i = r.map(ii));
  }
  let s, l = o[s = ko(e)] || // also try camelCase event handler (#2249)
  o[s = ko(Jt(e))];
  !l && n && (l = o[s = ko(Ft(e))]), l && St(
    l,
    t,
    6,
    i
  );
  const p = o[s + "Once"];
  if (p) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[s])
      return;
    t.emitted[s] = !0, St(
      p,
      t,
      6,
      i
    );
  }
}
function xa(t, e, r = !1) {
  const o = e.emitsCache, i = o.get(t);
  if (i !== void 0)
    return i;
  const n = t.emits;
  let a = {}, s = !1;
  if (!N(t)) {
    const l = (p) => {
      const g = xa(p, e, !0);
      g && (s = !0, ct(a, g));
    };
    !r && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  return !n && !s ? (rt(t) && o.set(t, null), null) : (z(n) ? n.forEach((l) => a[l] = null) : ct(a, n), rt(t) && o.set(t, a), a);
}
function fo(t, e) {
  return !t || !lo(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), Z(t, e[0].toLowerCase() + e.slice(1)) || Z(t, Ft(e)) || Z(t, e));
}
let kt = null, ka = null;
function $r(t) {
  const e = kt;
  return kt = t, ka = t && t.type.__scopeId || null, e;
}
function _a(t, e = kt, r) {
  if (!e || t._n)
    return t;
  const o = (...i) => {
    o._d && gn(-1);
    const n = $r(e);
    let a;
    try {
      a = t(...i);
    } finally {
      $r(n), o._d && gn(1);
    }
    return a;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Eo(t) {
  const {
    type: e,
    vnode: r,
    proxy: o,
    withProxy: i,
    props: n,
    propsOptions: [a],
    slots: s,
    attrs: l,
    emit: p,
    render: g,
    renderCache: w,
    data: v,
    setupState: f,
    ctx: A,
    inheritAttrs: _
  } = t;
  let O, H;
  const $ = $r(t);
  try {
    if (r.shapeFlag & 4) {
      const P = i || o, B = or.NODE_ENV !== "production" && f.__isScriptSetup ? new Proxy(P, {
        get(L, V, S) {
          return el(
            `Property '${String(
              V
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(L, V, S);
        }
      }) : P;
      O = Kt(
        g.call(
          B,
          P,
          w,
          n,
          f,
          v,
          A
        )
      ), H = l;
    } else {
      const P = e;
      or.NODE_ENV, O = Kt(
        P.length > 1 ? P(
          n,
          or.NODE_ENV !== "production" ? {
            get attrs() {
              return l;
            },
            slots: s,
            emit: p
          } : { attrs: l, slots: s, emit: p }
        ) : P(
          n,
          null
          /* we know it doesn't need it */
        )
      ), H = e.props ? l : gl(l);
    }
  } catch (P) {
    sr.length = 0, uo(P, t, 1), O = wt(Ut);
  }
  let M = O;
  if (H && _ !== !1) {
    const P = Object.keys(H), { shapeFlag: B } = M;
    P.length && B & 7 && (a && P.some(ei) && (H = ul(
      H,
      a
    )), M = me(M, H));
  }
  return r.dirs && (M = me(M), M.dirs = M.dirs ? M.dirs.concat(r.dirs) : r.dirs), r.transition && (M.transition = r.transition), O = M, $r($), O;
}
const gl = (t) => {
  let e;
  for (const r in t)
    (r === "class" || r === "style" || lo(r)) && ((e || (e = {}))[r] = t[r]);
  return e;
}, ul = (t, e) => {
  const r = {};
  for (const o in t)
    (!ei(o) || !(o.slice(9) in e)) && (r[o] = t[o]);
  return r;
};
function fl(t, e, r) {
  const { props: o, children: i, component: n } = t, { props: a, children: s, patchFlag: l } = e, p = n.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? en(o, a, p) : !!a;
    if (l & 8) {
      const g = e.dynamicProps;
      for (let w = 0; w < g.length; w++) {
        const v = g[w];
        if (a[v] !== o[v] && !fo(p, v))
          return !0;
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : o === a ? !1 : o ? a ? en(o, a, p) : !0 : !!a;
  return !1;
}
function en(t, e, r) {
  const o = Object.keys(e);
  if (o.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < o.length; i++) {
    const n = o[i];
    if (e[n] !== t[n] && !fo(r, n))
      return !0;
  }
  return !1;
}
function hl({ vnode: t, parent: e }, r) {
  for (; e; ) {
    const o = e.subTree;
    if (o.suspense && o.suspense.activeBranch === t && (o.el = t.el), o === t)
      (t = e.vnode).el = r, e = e.parent;
    else
      break;
  }
}
const wl = Symbol.for("v-ndc"), vl = (t) => t.__isSuspense;
function bl(t, e) {
  e && e.pendingBranch ? z(t) ? e.effects.push(...t) : e.effects.push(t) : cl(t);
}
const ml = Symbol.for("v-scx"), yl = () => Br(ml), Lr = {};
function nr(t, e, r) {
  return Ea(t, e, r);
}
function Ea(t, e, {
  immediate: r,
  deep: o,
  flush: i,
  once: n,
  onTrack: a,
  onTrigger: s
} = it) {
  if (e && n) {
    const L = e;
    e = (...V) => {
      L(...V), B();
    };
  }
  const l = gt, p = (L) => o === !0 ? L : (
    // for deep: false, only traverse root-level properties
    De(L, o === !1 ? 1 : void 0)
  );
  let g, w = !1, v = !1;
  if (yt(t) ? (g = () => t.value, w = Vr(t)) : $e(t) ? (g = () => p(t), w = !0) : z(t) ? (v = !0, w = t.some((L) => $e(L) || Vr(L)), g = () => t.map((L) => {
    if (yt(L))
      return L.value;
    if ($e(L))
      return p(L);
    if (N(L))
      return te(L, l, 2);
  })) : N(t) ? e ? g = () => te(t, l, 2) : g = () => (f && f(), St(
    t,
    l,
    3,
    [A]
  )) : g = Lt, e && o) {
    const L = g;
    g = () => De(L());
  }
  let f, A = (L) => {
    f = M.onStop = () => {
      te(L, l, 4), f = M.onStop = void 0;
    };
  }, _;
  if (mo)
    if (A = Lt, e ? r && St(e, l, 3, [
      g(),
      v ? [] : void 0,
      A
    ]) : g(), i === "sync") {
      const L = yl();
      _ = L.__watcherHandles || (L.__watcherHandles = []);
    } else
      return Lt;
  let O = v ? new Array(t.length).fill(Lr) : Lr;
  const H = () => {
    if (!(!M.active || !M.dirty))
      if (e) {
        const L = M.run();
        (o || w || (v ? L.some((V, S) => be(V, O[S])) : be(L, O))) && (f && f(), St(e, l, 3, [
          L,
          // pass undefined as the old value when it's changed for the first time
          O === Lr ? void 0 : v && O[0] === Lr ? [] : O,
          A
        ]), O = L);
      } else
        M.run();
  };
  H.allowRecurse = !!e;
  let $;
  i === "sync" ? $ = H : i === "post" ? $ = () => xt(H, l && l.suspense) : (H.pre = !0, l && (H.id = l.uid), $ = () => wi(H));
  const M = new ai(g, Lt, $), P = Os(), B = () => {
    M.stop(), P && ri(P.effects, M);
  };
  return e ? r ? H() : O = M.run() : i === "post" ? xt(
    M.run.bind(M),
    l && l.suspense
  ) : M.run(), _ && _.push(B), B;
}
function xl(t, e, r) {
  const o = this.proxy, i = dt(t) ? t.includes(".") ? Ca(o, t) : () => o[t] : t.bind(o, o);
  let n;
  N(e) ? n = e : (n = e.handler, r = e);
  const a = yr(this), s = Ea(i, n.bind(o), r);
  return a(), s;
}
function Ca(t, e) {
  const r = e.split(".");
  return () => {
    let o = t;
    for (let i = 0; i < r.length && o; i++)
      o = o[r[i]];
    return o;
  };
}
function De(t, e, r = 0, o) {
  if (!rt(t) || t.__v_skip)
    return t;
  if (e && e > 0) {
    if (r >= e)
      return t;
    r++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(t))
    return t;
  if (o.add(t), yt(t))
    De(t.value, e, r, o);
  else if (z(t))
    for (let i = 0; i < t.length; i++)
      De(t[i], e, r, o);
  else if (co(t) || Ve(t))
    t.forEach((i) => {
      De(i, e, r, o);
    });
  else if (Wn(t))
    for (const i in t)
      De(t[i], e, r, o);
  return t;
}
function kl(t, e) {
  if (kt === null)
    return t;
  const r = yo(kt) || kt.proxy, o = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [n, a, s, l = it] = e[i];
    n && (N(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && De(a), o.push({
      dir: n,
      instance: r,
      value: a,
      oldValue: void 0,
      arg: s,
      modifiers: l
    }));
  }
  return t;
}
function Ae(t, e, r, o) {
  const i = t.dirs, n = e && e.dirs;
  for (let a = 0; a < i.length; a++) {
    const s = i[a];
    n && (s.oldValue = n[a].value);
    let l = s.dir[o];
    l && (ye(), St(l, r, 8, [
      t.el,
      s,
      t,
      e
    ]), xe());
  }
}
const ce = Symbol("_leaveCb"), Tr = Symbol("_enterCb");
function _l() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Oa(() => {
    t.isMounted = !0;
  }), Pa(() => {
    t.isUnmounting = !0;
  }), t;
}
const Ot = [Function, Array], Aa = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ot,
  onEnter: Ot,
  onAfterEnter: Ot,
  onEnterCancelled: Ot,
  // leave
  onBeforeLeave: Ot,
  onLeave: Ot,
  onAfterLeave: Ot,
  onLeaveCancelled: Ot,
  // appear
  onBeforeAppear: Ot,
  onAppear: Ot,
  onAfterAppear: Ot,
  onAppearCancelled: Ot
}, El = {
  name: "BaseTransition",
  props: Aa,
  setup(t, { slots: e }) {
    const r = pc(), o = _l();
    let i;
    return () => {
      const n = e.default && La(e.default(), !0);
      if (!n || !n.length)
        return;
      let a = n[0];
      if (n.length > 1) {
        for (const _ of n)
          if (_.type !== Ut) {
            a = _;
            break;
          }
      }
      const s = X(t), { mode: l } = s;
      if (o.isLeaving)
        return Co(a);
      const p = rn(a);
      if (!p)
        return Co(a);
      const g = Ro(
        p,
        s,
        o,
        r
      );
      Fo(p, g);
      const w = r.subTree, v = w && rn(w);
      let f = !1;
      const { getTransitionKey: A } = p.type;
      if (A) {
        const _ = A();
        i === void 0 ? i = _ : _ !== i && (i = _, f = !0);
      }
      if (v && v.type !== Ut && (!Se(p, v) || f)) {
        const _ = Ro(
          v,
          s,
          o,
          r
        );
        if (Fo(v, _), l === "out-in")
          return o.isLeaving = !0, _.afterLeave = () => {
            o.isLeaving = !1, r.update.active !== !1 && (r.effect.dirty = !0, r.update());
          }, Co(a);
        l === "in-out" && p.type !== Ut && (_.delayLeave = (O, H, $) => {
          const M = Ia(
            o,
            v
          );
          M[String(v.key)] = v, O[ce] = () => {
            H(), O[ce] = void 0, delete g.delayedLeave;
          }, g.delayedLeave = $;
        });
      }
      return a;
    };
  }
}, Cl = El;
function Ia(t, e) {
  const { leavingVNodes: r } = t;
  let o = r.get(e.type);
  return o || (o = /* @__PURE__ */ Object.create(null), r.set(e.type, o)), o;
}
function Ro(t, e, r, o) {
  const {
    appear: i,
    mode: n,
    persisted: a = !1,
    onBeforeEnter: s,
    onEnter: l,
    onAfterEnter: p,
    onEnterCancelled: g,
    onBeforeLeave: w,
    onLeave: v,
    onAfterLeave: f,
    onLeaveCancelled: A,
    onBeforeAppear: _,
    onAppear: O,
    onAfterAppear: H,
    onAppearCancelled: $
  } = e, M = String(t.key), P = Ia(r, t), B = (S, U) => {
    S && St(
      S,
      o,
      9,
      U
    );
  }, L = (S, U) => {
    const F = U[1];
    B(S, U), z(S) ? S.every((G) => G.length <= 1) && F() : S.length <= 1 && F();
  }, V = {
    mode: n,
    persisted: a,
    beforeEnter(S) {
      let U = s;
      if (!r.isMounted)
        if (i)
          U = _ || s;
        else
          return;
      S[ce] && S[ce](
        !0
        /* cancelled */
      );
      const F = P[M];
      F && Se(t, F) && F.el[ce] && F.el[ce](), B(U, [S]);
    },
    enter(S) {
      let U = l, F = p, G = g;
      if (!r.isMounted)
        if (i)
          U = O || l, F = H || p, G = $ || g;
        else
          return;
      let T = !1;
      const q = S[Tr] = (st) => {
        T || (T = !0, st ? B(G, [S]) : B(F, [S]), V.delayedLeave && V.delayedLeave(), S[Tr] = void 0);
      };
      U ? L(U, [S, q]) : q();
    },
    leave(S, U) {
      const F = String(t.key);
      if (S[Tr] && S[Tr](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return U();
      B(w, [S]);
      let G = !1;
      const T = S[ce] = (q) => {
        G || (G = !0, U(), q ? B(A, [S]) : B(f, [S]), S[ce] = void 0, P[F] === t && delete P[F]);
      };
      P[F] = t, v ? L(v, [S, T]) : T();
    },
    clone(S) {
      return Ro(S, e, r, o);
    }
  };
  return V;
}
function Co(t) {
  if (ho(t))
    return t = me(t), t.children = null, t;
}
function rn(t) {
  return ho(t) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    t.children ? t.children[0] : void 0
  ) : t;
}
function Fo(t, e) {
  t.shapeFlag & 6 && t.component ? Fo(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function La(t, e = !1, r) {
  let o = [], i = 0;
  for (let n = 0; n < t.length; n++) {
    let a = t[n];
    const s = r == null ? a.key : String(r) + String(a.key != null ? a.key : n);
    a.type === Pt ? (a.patchFlag & 128 && i++, o = o.concat(
      La(a.children, e, s)
    )) : (e || a.type !== Ut) && o.push(s != null ? me(a, { key: s }) : a);
  }
  if (i > 1)
    for (let n = 0; n < o.length; n++)
      o[n].patchFlag = -2;
  return o;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Al(t, e) {
  return N(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ct({ name: t.name }, e, { setup: t })
  ) : t;
}
const Hr = (t) => !!t.type.__asyncLoader, ho = (t) => t.type.__isKeepAlive;
function Il(t, e) {
  Ta(t, "a", e);
}
function Ll(t, e) {
  Ta(t, "da", e);
}
function Ta(t, e, r = gt) {
  const o = t.__wdc || (t.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (wo(e, o, r), r) {
    let i = r.parent;
    for (; i && i.parent; )
      ho(i.parent.vnode) && Tl(o, e, r, i), i = i.parent;
  }
}
function Tl(t, e, r, o) {
  const i = wo(
    e,
    t,
    o,
    !0
    /* prepend */
  );
  Sa(() => {
    ri(o[e], i);
  }, r);
}
function wo(t, e, r = gt, o = !1) {
  if (r) {
    const i = r[t] || (r[t] = []), n = e.__weh || (e.__weh = (...a) => {
      if (r.isUnmounted)
        return;
      ye();
      const s = yr(r), l = St(e, r, t, a);
      return s(), xe(), l;
    });
    return o ? i.unshift(n) : i.push(n), n;
  }
}
const re = (t) => (e, r = gt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!mo || t === "sp") && wo(t, (...o) => e(...o), r)
), Ol = re("bm"), Oa = re("m"), Pl = re("bu"), Sl = re("u"), Pa = re("bum"), Sa = re("um"), jl = re("sp"), Ml = re(
  "rtg"
), Dl = re(
  "rtc"
);
function zl(t, e = gt) {
  wo("ec", t, e);
}
function Hl(t, e, r, o) {
  let i;
  const n = r && r[o];
  if (z(t) || dt(t)) {
    i = new Array(t.length);
    for (let a = 0, s = t.length; a < s; a++)
      i[a] = e(t[a], a, void 0, n && n[a]);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let a = 0; a < t; a++)
      i[a] = e(a + 1, a, void 0, n && n[a]);
  } else if (rt(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (a, s) => e(a, s, void 0, n && n[s])
      );
    else {
      const a = Object.keys(t);
      i = new Array(a.length);
      for (let s = 0, l = a.length; s < l; s++) {
        const p = a[s];
        i[s] = e(t[p], p, s, n && n[s]);
      }
    }
  else
    i = [];
  return r && (r[o] = i), i;
}
const No = (t) => t ? $a(t) ? yo(t) || t.proxy : No(t.parent) : null, ar = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ct(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => No(t.parent),
    $root: (t) => No(t.root),
    $emit: (t) => t.emit,
    $options: (t) => vi(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, wi(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = hi.bind(t.proxy)),
    $watch: (t) => xl.bind(t)
  })
), Ao = (t, e) => t !== it && !t.__isScriptSetup && Z(t, e), Bl = {
  get({ _: t }, e) {
    const { ctx: r, setupState: o, data: i, props: n, accessCache: a, type: s, appContext: l } = t;
    let p;
    if (e[0] !== "$") {
      const f = a[e];
      if (f !== void 0)
        switch (f) {
          case 1:
            return o[e];
          case 2:
            return i[e];
          case 4:
            return r[e];
          case 3:
            return n[e];
        }
      else {
        if (Ao(o, e))
          return a[e] = 1, o[e];
        if (i !== it && Z(i, e))
          return a[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = t.propsOptions[0]) && Z(p, e)
        )
          return a[e] = 3, n[e];
        if (r !== it && Z(r, e))
          return a[e] = 4, r[e];
        Uo && (a[e] = 0);
      }
    }
    const g = ar[e];
    let w, v;
    if (g)
      return e === "$attrs" && Ct(t, "get", e), g(t);
    if (
      // css module (injected by vue-loader)
      (w = s.__cssModules) && (w = w[e])
    )
      return w;
    if (r !== it && Z(r, e))
      return a[e] = 4, r[e];
    if (
      // global properties
      v = l.config.globalProperties, Z(v, e)
    )
      return v[e];
  },
  set({ _: t }, e, r) {
    const { data: o, setupState: i, ctx: n } = t;
    return Ao(i, e) ? (i[e] = r, !0) : o !== it && Z(o, e) ? (o[e] = r, !0) : Z(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (n[e] = r, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: r, ctx: o, appContext: i, propsOptions: n }
  }, a) {
    let s;
    return !!r[a] || t !== it && Z(t, a) || Ao(e, a) || (s = n[0]) && Z(s, a) || Z(o, a) || Z(ar, a) || Z(i.config.globalProperties, a);
  },
  defineProperty(t, e, r) {
    return r.get != null ? t._.accessCache[e] = 0 : Z(r, "value") && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r);
  }
};
function on(t) {
  return z(t) ? t.reduce(
    (e, r) => (e[r] = null, e),
    {}
  ) : t;
}
let Uo = !0;
function Rl(t) {
  const e = vi(t), r = t.proxy, o = t.ctx;
  Uo = !1, e.beforeCreate && nn(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: n,
    methods: a,
    watch: s,
    provide: l,
    inject: p,
    // lifecycle
    created: g,
    beforeMount: w,
    mounted: v,
    beforeUpdate: f,
    updated: A,
    activated: _,
    deactivated: O,
    beforeDestroy: H,
    beforeUnmount: $,
    destroyed: M,
    unmounted: P,
    render: B,
    renderTracked: L,
    renderTriggered: V,
    errorCaptured: S,
    serverPrefetch: U,
    // public API
    expose: F,
    inheritAttrs: G,
    // assets
    components: T,
    directives: q,
    filters: st
  } = e;
  if (p && Fl(p, o, null), a)
    for (const W in a) {
      const tt = a[W];
      N(tt) && (o[W] = tt.bind(r));
    }
  if (i) {
    const W = i.call(r, r);
    rt(W) && (t.data = pi(W));
  }
  if (Uo = !0, n)
    for (const W in n) {
      const tt = n[W], vt = N(tt) ? tt.bind(r, r) : N(tt.get) ? tt.get.bind(r, r) : Lt, Gt = !N(tt) && N(tt.set) ? tt.set.bind(r) : Lt, zt = yc({
        get: vt,
        set: Gt
      });
      Object.defineProperty(o, W, {
        enumerable: !0,
        configurable: !0,
        get: () => zt.value,
        set: (ft) => zt.value = ft
      });
    }
  if (s)
    for (const W in s)
      ja(s[W], o, r, W);
  if (l) {
    const W = N(l) ? l.call(r) : l;
    Reflect.ownKeys(W).forEach((tt) => {
      Kl(tt, W[tt]);
    });
  }
  g && nn(g, t, "c");
  function J(W, tt) {
    z(tt) ? tt.forEach((vt) => W(vt.bind(r))) : tt && W(tt.bind(r));
  }
  if (J(Ol, w), J(Oa, v), J(Pl, f), J(Sl, A), J(Il, _), J(Ll, O), J(zl, S), J(Dl, L), J(Ml, V), J(Pa, $), J(Sa, P), J(jl, U), z(F))
    if (F.length) {
      const W = t.exposed || (t.exposed = {});
      F.forEach((tt) => {
        Object.defineProperty(W, tt, {
          get: () => r[tt],
          set: (vt) => r[tt] = vt
        });
      });
    } else
      t.exposed || (t.exposed = {});
  B && t.render === Lt && (t.render = B), G != null && (t.inheritAttrs = G), T && (t.components = T), q && (t.directives = q);
}
function Fl(t, e, r = Lt) {
  z(t) && (t = Vo(t));
  for (const o in t) {
    const i = t[o];
    let n;
    rt(i) ? "default" in i ? n = Br(
      i.from || o,
      i.default,
      !0
    ) : n = Br(i.from || o) : n = Br(i), yt(n) ? Object.defineProperty(e, o, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (a) => n.value = a
    }) : e[o] = n;
  }
}
function nn(t, e, r) {
  St(
    z(t) ? t.map((o) => o.bind(e.proxy)) : t.bind(e.proxy),
    e,
    r
  );
}
function ja(t, e, r, o) {
  const i = o.includes(".") ? Ca(r, o) : () => r[o];
  if (dt(t)) {
    const n = e[t];
    N(n) && nr(i, n);
  } else if (N(t))
    nr(i, t.bind(r));
  else if (rt(t))
    if (z(t))
      t.forEach((n) => ja(n, e, r, o));
    else {
      const n = N(t.handler) ? t.handler.bind(r) : e[t.handler];
      N(n) && nr(i, n, t);
    }
}
function vi(t) {
  const e = t.type, { mixins: r, extends: o } = e, {
    mixins: i,
    optionsCache: n,
    config: { optionMergeStrategies: a }
  } = t.appContext, s = n.get(e);
  let l;
  return s ? l = s : !i.length && !r && !o ? l = e : (l = {}, i.length && i.forEach(
    (p) => qr(l, p, a, !0)
  ), qr(l, e, a)), rt(e) && n.set(e, l), l;
}
function qr(t, e, r, o = !1) {
  const { mixins: i, extends: n } = e;
  n && qr(t, n, r, !0), i && i.forEach(
    (a) => qr(t, a, r, !0)
  );
  for (const a in e)
    if (!(o && a === "expose")) {
      const s = Nl[a] || r && r[a];
      t[a] = s ? s(t[a], e[a]) : e[a];
    }
  return t;
}
const Nl = {
  data: an,
  props: sn,
  emits: sn,
  // objects
  methods: rr,
  computed: rr,
  // lifecycle
  beforeCreate: mt,
  created: mt,
  beforeMount: mt,
  mounted: mt,
  beforeUpdate: mt,
  updated: mt,
  beforeDestroy: mt,
  beforeUnmount: mt,
  destroyed: mt,
  unmounted: mt,
  activated: mt,
  deactivated: mt,
  errorCaptured: mt,
  serverPrefetch: mt,
  // assets
  components: rr,
  directives: rr,
  // watch
  watch: Vl,
  // provide / inject
  provide: an,
  inject: Ul
};
function an(t, e) {
  return e ? t ? function() {
    return ct(
      N(t) ? t.call(this, this) : t,
      N(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Ul(t, e) {
  return rr(Vo(t), Vo(e));
}
function Vo(t) {
  if (z(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++)
      e[t[r]] = t[r];
    return e;
  }
  return t;
}
function mt(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function rr(t, e) {
  return t ? ct(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function sn(t, e) {
  return t ? z(t) && z(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ct(
    /* @__PURE__ */ Object.create(null),
    on(t),
    on(e ?? {})
  ) : e;
}
function Vl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const r = ct(/* @__PURE__ */ Object.create(null), t);
  for (const o in e)
    r[o] = mt(t[o], e[o]);
  return r;
}
function Ma() {
  return {
    app: null,
    config: {
      isNativeTag: hs,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let $l = 0;
function ql(t, e) {
  return function(o, i = null) {
    N(o) || (o = ct({}, o)), i != null && !rt(i) && (i = null);
    const n = Ma(), a = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const l = n.app = {
      _uid: $l++,
      _component: o,
      _props: i,
      _container: null,
      _context: n,
      _instance: null,
      version: kc,
      get config() {
        return n.config;
      },
      set config(p) {
      },
      use(p, ...g) {
        return a.has(p) || (p && N(p.install) ? (a.add(p), p.install(l, ...g)) : N(p) && (a.add(p), p(l, ...g))), l;
      },
      mixin(p) {
        return n.mixins.includes(p) || n.mixins.push(p), l;
      },
      component(p, g) {
        return g ? (n.components[p] = g, l) : n.components[p];
      },
      directive(p, g) {
        return g ? (n.directives[p] = g, l) : n.directives[p];
      },
      mount(p, g, w) {
        if (!s) {
          const v = wt(o, i);
          return v.appContext = n, w === !0 ? w = "svg" : w === !1 && (w = void 0), g && e ? e(v, p) : t(v, p, w), s = !0, l._container = p, p.__vue_app__ = l, yo(v.component) || v.component.proxy;
        }
      },
      unmount() {
        s && (t(null, l._container), delete l._container.__vue_app__);
      },
      provide(p, g) {
        return n.provides[p] = g, l;
      },
      runWithContext(p) {
        Kr = l;
        try {
          return p();
        } finally {
          Kr = null;
        }
      }
    };
    return l;
  };
}
let Kr = null;
function Kl(t, e) {
  if (gt) {
    let r = gt.provides;
    const o = gt.parent && gt.parent.provides;
    o === r && (r = gt.provides = Object.create(o)), r[t] = e;
  }
}
function Br(t, e, r = !1) {
  const o = gt || kt;
  if (o || Kr) {
    const i = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Kr._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return r && N(e) ? e.call(o && o.proxy) : e;
  }
}
function Wl(t, e, r, o = !1) {
  const i = {}, n = {};
  Ur(n, bo, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Da(t, e, i, n);
  for (const a in t.propsOptions[0])
    a in i || (i[a] = void 0);
  r ? t.props = o ? i : Gs(i) : t.type.props ? t.props = i : t.props = n, t.attrs = n;
}
function Yl(t, e, r, o) {
  const {
    props: i,
    attrs: n,
    vnode: { patchFlag: a }
  } = t, s = X(i), [l] = t.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || a > 0) && !(a & 16)
  ) {
    if (a & 8) {
      const g = t.vnode.dynamicProps;
      for (let w = 0; w < g.length; w++) {
        let v = g[w];
        if (fo(t.emitsOptions, v))
          continue;
        const f = e[v];
        if (l)
          if (Z(n, v))
            f !== n[v] && (n[v] = f, p = !0);
          else {
            const A = Jt(v);
            i[A] = $o(
              l,
              s,
              A,
              f,
              t,
              !1
            );
          }
        else
          f !== n[v] && (n[v] = f, p = !0);
      }
    }
  } else {
    Da(t, e, i, n) && (p = !0);
    let g;
    for (const w in s)
      (!e || // for camelCase
      !Z(e, w) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = Ft(w)) === w || !Z(e, g))) && (l ? r && // for camelCase
      (r[w] !== void 0 || // for kebab-case
      r[g] !== void 0) && (i[w] = $o(
        l,
        s,
        w,
        void 0,
        t,
        !0
      )) : delete i[w]);
    if (n !== s)
      for (const w in n)
        (!e || !Z(e, w)) && (delete n[w], p = !0);
  }
  p && Qt(t, "set", "$attrs");
}
function Da(t, e, r, o) {
  const [i, n] = t.propsOptions;
  let a = !1, s;
  if (e)
    for (let l in e) {
      if (Mr(l))
        continue;
      const p = e[l];
      let g;
      i && Z(i, g = Jt(l)) ? !n || !n.includes(g) ? r[g] = p : (s || (s = {}))[g] = p : fo(t.emitsOptions, l) || (!(l in o) || p !== o[l]) && (o[l] = p, a = !0);
    }
  if (n) {
    const l = X(r), p = s || it;
    for (let g = 0; g < n.length; g++) {
      const w = n[g];
      r[w] = $o(
        i,
        l,
        w,
        p[w],
        t,
        !Z(p, w)
      );
    }
  }
  return a;
}
function $o(t, e, r, o, i, n) {
  const a = t[r];
  if (a != null) {
    const s = Z(a, "default");
    if (s && o === void 0) {
      const l = a.default;
      if (a.type !== Function && !a.skipFactory && N(l)) {
        const { propsDefaults: p } = i;
        if (r in p)
          o = p[r];
        else {
          const g = yr(i);
          o = p[r] = l.call(
            null,
            e
          ), g();
        }
      } else
        o = l;
    }
    a[
      0
      /* shouldCast */
    ] && (n && !s ? o = !1 : a[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ft(r)) && (o = !0));
  }
  return o;
}
function za(t, e, r = !1) {
  const o = e.propsCache, i = o.get(t);
  if (i)
    return i;
  const n = t.props, a = {}, s = [];
  let l = !1;
  if (!N(t)) {
    const g = (w) => {
      l = !0;
      const [v, f] = za(w, e, !0);
      ct(a, v), f && s.push(...f);
    };
    !r && e.mixins.length && e.mixins.forEach(g), t.extends && g(t.extends), t.mixins && t.mixins.forEach(g);
  }
  if (!n && !l)
    return rt(t) && o.set(t, Ue), Ue;
  if (z(n))
    for (let g = 0; g < n.length; g++) {
      const w = Jt(n[g]);
      ln(w) && (a[w] = it);
    }
  else if (n)
    for (const g in n) {
      const w = Jt(g);
      if (ln(w)) {
        const v = n[g], f = a[w] = z(v) || N(v) ? { type: v } : ct({}, v);
        if (f) {
          const A = pn(Boolean, f.type), _ = pn(String, f.type);
          f[
            0
            /* shouldCast */
          ] = A > -1, f[
            1
            /* shouldCastTrue */
          ] = _ < 0 || A < _, (A > -1 || Z(f, "default")) && s.push(w);
        }
      }
    }
  const p = [a, s];
  return rt(t) && o.set(t, p), p;
}
function ln(t) {
  return t[0] !== "$";
}
function cn(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function dn(t, e) {
  return cn(t) === cn(e);
}
function pn(t, e) {
  return z(e) ? e.findIndex((r) => dn(r, t)) : N(e) && dn(e, t) ? 0 : -1;
}
const Ha = (t) => t[0] === "_" || t === "$stable", bi = (t) => z(t) ? t.map(Kt) : [Kt(t)], Xl = (t, e, r) => {
  if (e._n)
    return e;
  const o = _a((...i) => (or.NODE_ENV !== "production" && gt && (!r || (r.root, gt.root)), bi(e(...i))), r);
  return o._c = !1, o;
}, Ba = (t, e, r) => {
  const o = t._ctx;
  for (const i in t) {
    if (Ha(i))
      continue;
    const n = t[i];
    if (N(n))
      e[i] = Xl(i, n, o);
    else if (n != null) {
      const a = bi(n);
      e[i] = () => a;
    }
  }
}, Ra = (t, e) => {
  const r = bi(e);
  t.slots.default = () => r;
}, Gl = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const r = e._;
    r ? (t.slots = X(e), Ur(e, "_", r)) : Ba(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && Ra(t, e);
  Ur(t.slots, bo, 1);
}, Zl = (t, e, r) => {
  const { vnode: o, slots: i } = t;
  let n = !0, a = it;
  if (o.shapeFlag & 32) {
    const s = e._;
    s ? r && s === 1 ? n = !1 : (ct(i, e), !r && s === 1 && delete i._) : (n = !e.$stable, Ba(e, i)), a = e;
  } else
    e && (Ra(t, e), a = { default: 1 });
  if (n)
    for (const s in i)
      !Ha(s) && a[s] == null && delete i[s];
};
function qo(t, e, r, o, i = !1) {
  if (z(t)) {
    t.forEach(
      (v, f) => qo(
        v,
        e && (z(e) ? e[f] : e),
        r,
        o,
        i
      )
    );
    return;
  }
  if (Hr(o) && !i)
    return;
  const n = o.shapeFlag & 4 ? yo(o.component) || o.component.proxy : o.el, a = i ? null : n, { i: s, r: l } = t, p = e && e.r, g = s.refs === it ? s.refs = {} : s.refs, w = s.setupState;
  if (p != null && p !== l && (dt(p) ? (g[p] = null, Z(w, p) && (w[p] = null)) : yt(p) && (p.value = null)), N(l))
    te(l, s, 12, [a, g]);
  else {
    const v = dt(l), f = yt(l), A = t.f;
    if (v || f) {
      const _ = () => {
        if (A) {
          const O = v ? Z(w, l) ? w[l] : g[l] : l.value;
          i ? z(O) && ri(O, n) : z(O) ? O.includes(n) || O.push(n) : v ? (g[l] = [n], Z(w, l) && (w[l] = g[l])) : (l.value = [n], t.k && (g[t.k] = l.value));
        } else
          v ? (g[l] = a, Z(w, l) && (w[l] = a)) : f && (l.value = a, t.k && (g[t.k] = a));
      };
      i || A ? _() : (_.id = -1, xt(_, r));
    }
  }
}
const xt = bl;
function Jl(t) {
  return Ql(t);
}
function Ql(t, e) {
  const r = Xn();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: i,
    patchProp: n,
    createElement: a,
    createText: s,
    createComment: l,
    setText: p,
    setElementText: g,
    parentNode: w,
    nextSibling: v,
    setScopeId: f = Lt,
    insertStaticContent: A
  } = t, _ = (d, u, h, b = null, m = null, k = null, C = void 0, x = null, E = !!u.dynamicChildren) => {
    if (d === u)
      return;
    d && !Se(d, u) && (b = Zt(d), ft(d, m, k, !0), d = null), u.patchFlag === -2 && (E = !1, u.dynamicChildren = null);
    const { type: y, ref: I, shapeFlag: D } = u;
    switch (y) {
      case vo:
        O(d, u, h, b);
        break;
      case Ut:
        H(d, u, h, b);
        break;
      case Lo:
        d == null && $(u, h, b, C);
        break;
      case Pt:
        T(
          d,
          u,
          h,
          b,
          m,
          k,
          C,
          x,
          E
        );
        break;
      default:
        D & 1 ? B(
          d,
          u,
          h,
          b,
          m,
          k,
          C,
          x,
          E
        ) : D & 6 ? q(
          d,
          u,
          h,
          b,
          m,
          k,
          C,
          x,
          E
        ) : (D & 64 || D & 128) && y.process(
          d,
          u,
          h,
          b,
          m,
          k,
          C,
          x,
          E,
          ie
        );
    }
    I != null && m && qo(I, d && d.ref, k, u || d, !u);
  }, O = (d, u, h, b) => {
    if (d == null)
      o(
        u.el = s(u.children),
        h,
        b
      );
    else {
      const m = u.el = d.el;
      u.children !== d.children && p(m, u.children);
    }
  }, H = (d, u, h, b) => {
    d == null ? o(
      u.el = l(u.children || ""),
      h,
      b
    ) : u.el = d.el;
  }, $ = (d, u, h, b) => {
    [d.el, d.anchor] = A(
      d.children,
      u,
      h,
      b,
      d.el,
      d.anchor
    );
  }, M = ({ el: d, anchor: u }, h, b) => {
    let m;
    for (; d && d !== u; )
      m = v(d), o(d, h, b), d = m;
    o(u, h, b);
  }, P = ({ el: d, anchor: u }) => {
    let h;
    for (; d && d !== u; )
      h = v(d), i(d), d = h;
    i(u);
  }, B = (d, u, h, b, m, k, C, x, E) => {
    u.type === "svg" ? C = "svg" : u.type === "math" && (C = "mathml"), d == null ? L(
      u,
      h,
      b,
      m,
      k,
      C,
      x,
      E
    ) : U(
      d,
      u,
      m,
      k,
      C,
      x,
      E
    );
  }, L = (d, u, h, b, m, k, C, x) => {
    let E, y;
    const { props: I, shapeFlag: D, transition: j, dirs: R } = d;
    if (E = d.el = a(
      d.type,
      k,
      I && I.is,
      I
    ), D & 8 ? g(E, d.children) : D & 16 && S(
      d.children,
      E,
      null,
      b,
      m,
      Io(d, k),
      C,
      x
    ), R && Ae(d, null, b, "created"), V(E, d, d.scopeId, C, b), I) {
      for (const et in I)
        et !== "value" && !Mr(et) && n(
          E,
          et,
          null,
          I[et],
          k,
          d.children,
          b,
          m,
          bt
        );
      "value" in I && n(E, "value", null, I.value, k), (y = I.onVnodeBeforeMount) && qt(y, b, d);
    }
    R && Ae(d, null, b, "beforeMount");
    const K = tc(m, j);
    K && j.beforeEnter(E), o(E, u, h), ((y = I && I.onVnodeMounted) || K || R) && xt(() => {
      y && qt(y, b, d), K && j.enter(E), R && Ae(d, null, b, "mounted");
    }, m);
  }, V = (d, u, h, b, m) => {
    if (h && f(d, h), b)
      for (let k = 0; k < b.length; k++)
        f(d, b[k]);
    if (m) {
      let k = m.subTree;
      if (u === k) {
        const C = m.vnode;
        V(
          d,
          C,
          C.scopeId,
          C.slotScopeIds,
          m.parent
        );
      }
    }
  }, S = (d, u, h, b, m, k, C, x, E = 0) => {
    for (let y = E; y < d.length; y++) {
      const I = d[y] = x ? de(d[y]) : Kt(d[y]);
      _(
        null,
        I,
        u,
        h,
        b,
        m,
        k,
        C,
        x
      );
    }
  }, U = (d, u, h, b, m, k, C) => {
    const x = u.el = d.el;
    let { patchFlag: E, dynamicChildren: y, dirs: I } = u;
    E |= d.patchFlag & 16;
    const D = d.props || it, j = u.props || it;
    let R;
    if (h && Ie(h, !1), (R = j.onVnodeBeforeUpdate) && qt(R, h, u, d), I && Ae(u, d, h, "beforeUpdate"), h && Ie(h, !0), y ? F(
      d.dynamicChildren,
      y,
      x,
      h,
      b,
      Io(u, m),
      k
    ) : C || tt(
      d,
      u,
      x,
      null,
      h,
      b,
      Io(u, m),
      k,
      !1
    ), E > 0) {
      if (E & 16)
        G(
          x,
          u,
          D,
          j,
          h,
          b,
          m
        );
      else if (E & 2 && D.class !== j.class && n(x, "class", null, j.class, m), E & 4 && n(x, "style", D.style, j.style, m), E & 8) {
        const K = u.dynamicProps;
        for (let et = 0; et < K.length; et++) {
          const nt = K[et], pt = D[nt], Bt = j[nt];
          (Bt !== pt || nt === "value") && n(
            x,
            nt,
            pt,
            Bt,
            m,
            d.children,
            h,
            b,
            bt
          );
        }
      }
      E & 1 && d.children !== u.children && g(x, u.children);
    } else
      !C && y == null && G(
        x,
        u,
        D,
        j,
        h,
        b,
        m
      );
    ((R = j.onVnodeUpdated) || I) && xt(() => {
      R && qt(R, h, u, d), I && Ae(u, d, h, "updated");
    }, b);
  }, F = (d, u, h, b, m, k, C) => {
    for (let x = 0; x < u.length; x++) {
      const E = d[x], y = u[x], I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === Pt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Se(E, y) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? w(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      _(
        E,
        y,
        I,
        null,
        b,
        m,
        k,
        C,
        !0
      );
    }
  }, G = (d, u, h, b, m, k, C) => {
    if (h !== b) {
      if (h !== it)
        for (const x in h)
          !Mr(x) && !(x in b) && n(
            d,
            x,
            h[x],
            null,
            C,
            u.children,
            m,
            k,
            bt
          );
      for (const x in b) {
        if (Mr(x))
          continue;
        const E = b[x], y = h[x];
        E !== y && x !== "value" && n(
          d,
          x,
          y,
          E,
          C,
          u.children,
          m,
          k,
          bt
        );
      }
      "value" in b && n(d, "value", h.value, b.value, C);
    }
  }, T = (d, u, h, b, m, k, C, x, E) => {
    const y = u.el = d ? d.el : s(""), I = u.anchor = d ? d.anchor : s("");
    let { patchFlag: D, dynamicChildren: j, slotScopeIds: R } = u;
    R && (x = x ? x.concat(R) : R), d == null ? (o(y, h, b), o(I, h, b), S(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      I,
      m,
      k,
      C,
      x,
      E
    )) : D > 0 && D & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (F(
      d.dynamicChildren,
      j,
      h,
      m,
      k,
      C,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || m && u === m.subTree) && Fa(
      d,
      u,
      !0
      /* shallow */
    )) : tt(
      d,
      u,
      h,
      I,
      m,
      k,
      C,
      x,
      E
    );
  }, q = (d, u, h, b, m, k, C, x, E) => {
    u.slotScopeIds = x, d == null ? u.shapeFlag & 512 ? m.ctx.activate(
      u,
      h,
      b,
      C,
      E
    ) : st(
      u,
      h,
      b,
      m,
      k,
      C,
      E
    ) : At(d, u, E);
  }, st = (d, u, h, b, m, k, C) => {
    const x = d.component = dc(
      d,
      b,
      m
    );
    if (ho(d) && (x.ctx.renderer = ie), gc(x), x.asyncDep) {
      if (m && m.registerDep(x, J), !d.el) {
        const E = x.subTree = wt(Ut);
        H(null, E, u, h);
      }
    } else
      J(
        x,
        d,
        u,
        h,
        m,
        k,
        C
      );
  }, At = (d, u, h) => {
    const b = u.component = d.component;
    if (fl(d, u, h))
      if (b.asyncDep && !b.asyncResolved) {
        W(b, u, h);
        return;
      } else
        b.next = u, ll(b.update), b.effect.dirty = !0, b.update();
    else
      u.el = d.el, b.vnode = u;
  }, J = (d, u, h, b, m, k, C) => {
    const x = () => {
      if (d.isMounted) {
        let { next: I, bu: D, u: j, parent: R, vnode: K } = d;
        {
          const Ne = Na(d);
          if (Ne) {
            I && (I.el = K.el, W(d, I, C)), Ne.asyncDep.then(() => {
              d.isUnmounted || x();
            });
            return;
          }
        }
        let et = I, nt;
        Ie(d, !1), I ? (I.el = K.el, W(d, I, C)) : I = K, D && Dr(D), (nt = I.props && I.props.onVnodeBeforeUpdate) && qt(nt, R, I, K), Ie(d, !0);
        const pt = Eo(d), Bt = d.subTree;
        d.subTree = pt, _(
          Bt,
          pt,
          // parent may have changed if it's in a teleport
          w(Bt.el),
          // anchor may have changed if it's in a fragment
          Zt(Bt),
          d,
          m,
          k
        ), I.el = pt.el, et === null && hl(d, pt.el), j && xt(j, m), (nt = I.props && I.props.onVnodeUpdated) && xt(
          () => qt(nt, R, I, K),
          m
        );
      } else {
        let I;
        const { el: D, props: j } = u, { bm: R, m: K, parent: et } = d, nt = Hr(u);
        if (Ie(d, !1), R && Dr(R), !nt && (I = j && j.onVnodeBeforeMount) && qt(I, et, u), Ie(d, !0), D && Ze) {
          const pt = () => {
            d.subTree = Eo(d), Ze(
              D,
              d.subTree,
              d,
              m,
              null
            );
          };
          nt ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && pt()
          ) : pt();
        } else {
          const pt = d.subTree = Eo(d);
          _(
            null,
            pt,
            h,
            b,
            d,
            m,
            k
          ), u.el = pt.el;
        }
        if (K && xt(K, m), !nt && (I = j && j.onVnodeMounted)) {
          const pt = u;
          xt(
            () => qt(I, et, pt),
            m
          );
        }
        (u.shapeFlag & 256 || et && Hr(et.vnode) && et.vnode.shapeFlag & 256) && d.a && xt(d.a, m), d.isMounted = !0, u = h = b = null;
      }
    }, E = d.effect = new ai(
      x,
      Lt,
      () => wi(y),
      d.scope
      // track it in component's effect scope
    ), y = d.update = () => {
      E.dirty && E.run();
    };
    y.id = d.uid, Ie(d, !0), y();
  }, W = (d, u, h) => {
    u.component = d;
    const b = d.vnode.props;
    d.vnode = u, d.next = null, Yl(d, u.props, b, h), Zl(d, u.children, h), ye(), tn(d), xe();
  }, tt = (d, u, h, b, m, k, C, x, E = !1) => {
    const y = d && d.children, I = d ? d.shapeFlag : 0, D = u.children, { patchFlag: j, shapeFlag: R } = u;
    if (j > 0) {
      if (j & 128) {
        Gt(
          y,
          D,
          h,
          b,
          m,
          k,
          C,
          x,
          E
        );
        return;
      } else if (j & 256) {
        vt(
          y,
          D,
          h,
          b,
          m,
          k,
          C,
          x,
          E
        );
        return;
      }
    }
    R & 8 ? (I & 16 && bt(y, m, k), D !== y && g(h, D)) : I & 16 ? R & 16 ? Gt(
      y,
      D,
      h,
      b,
      m,
      k,
      C,
      x,
      E
    ) : bt(y, m, k, !0) : (I & 8 && g(h, ""), R & 16 && S(
      D,
      h,
      b,
      m,
      k,
      C,
      x,
      E
    ));
  }, vt = (d, u, h, b, m, k, C, x, E) => {
    d = d || Ue, u = u || Ue;
    const y = d.length, I = u.length, D = Math.min(y, I);
    let j;
    for (j = 0; j < D; j++) {
      const R = u[j] = E ? de(u[j]) : Kt(u[j]);
      _(
        d[j],
        R,
        h,
        null,
        m,
        k,
        C,
        x,
        E
      );
    }
    y > I ? bt(
      d,
      m,
      k,
      !0,
      !1,
      D
    ) : S(
      u,
      h,
      b,
      m,
      k,
      C,
      x,
      E,
      D
    );
  }, Gt = (d, u, h, b, m, k, C, x, E) => {
    let y = 0;
    const I = u.length;
    let D = d.length - 1, j = I - 1;
    for (; y <= D && y <= j; ) {
      const R = d[y], K = u[y] = E ? de(u[y]) : Kt(u[y]);
      if (Se(R, K))
        _(
          R,
          K,
          h,
          null,
          m,
          k,
          C,
          x,
          E
        );
      else
        break;
      y++;
    }
    for (; y <= D && y <= j; ) {
      const R = d[D], K = u[j] = E ? de(u[j]) : Kt(u[j]);
      if (Se(R, K))
        _(
          R,
          K,
          h,
          null,
          m,
          k,
          C,
          x,
          E
        );
      else
        break;
      D--, j--;
    }
    if (y > D) {
      if (y <= j) {
        const R = j + 1, K = R < I ? u[R].el : b;
        for (; y <= j; )
          _(
            null,
            u[y] = E ? de(u[y]) : Kt(u[y]),
            h,
            K,
            m,
            k,
            C,
            x,
            E
          ), y++;
      }
    } else if (y > j)
      for (; y <= D; )
        ft(d[y], m, k, !0), y++;
    else {
      const R = y, K = y, et = /* @__PURE__ */ new Map();
      for (y = K; y <= j; y++) {
        const It = u[y] = E ? de(u[y]) : Kt(u[y]);
        It.key != null && et.set(It.key, y);
      }
      let nt, pt = 0;
      const Bt = j - K + 1;
      let Ne = !1, Ui = 0;
      const Je = new Array(Bt);
      for (y = 0; y < Bt; y++)
        Je[y] = 0;
      for (y = R; y <= D; y++) {
        const It = d[y];
        if (pt >= Bt) {
          ft(It, m, k, !0);
          continue;
        }
        let $t;
        if (It.key != null)
          $t = et.get(It.key);
        else
          for (nt = K; nt <= j; nt++)
            if (Je[nt - K] === 0 && Se(It, u[nt])) {
              $t = nt;
              break;
            }
        $t === void 0 ? ft(It, m, k, !0) : (Je[$t - K] = y + 1, $t >= Ui ? Ui = $t : Ne = !0, _(
          It,
          u[$t],
          h,
          null,
          m,
          k,
          C,
          x,
          E
        ), pt++);
      }
      const Vi = Ne ? ec(Je) : Ue;
      for (nt = Vi.length - 1, y = Bt - 1; y >= 0; y--) {
        const It = K + y, $t = u[It], $i = It + 1 < I ? u[It + 1].el : b;
        Je[y] === 0 ? _(
          null,
          $t,
          h,
          $i,
          m,
          k,
          C,
          x,
          E
        ) : Ne && (nt < 0 || y !== Vi[nt] ? zt($t, h, $i, 2) : nt--);
      }
    }
  }, zt = (d, u, h, b, m = null) => {
    const { el: k, type: C, transition: x, children: E, shapeFlag: y } = d;
    if (y & 6) {
      zt(d.component.subTree, u, h, b);
      return;
    }
    if (y & 128) {
      d.suspense.move(u, h, b);
      return;
    }
    if (y & 64) {
      C.move(d, u, h, ie);
      return;
    }
    if (C === Pt) {
      o(k, u, h);
      for (let D = 0; D < E.length; D++)
        zt(E[D], u, h, b);
      o(d.anchor, u, h);
      return;
    }
    if (C === Lo) {
      M(d, u, h);
      return;
    }
    if (b !== 2 && y & 1 && x)
      if (b === 0)
        x.beforeEnter(k), o(k, u, h), xt(() => x.enter(k), m);
      else {
        const { leave: D, delayLeave: j, afterLeave: R } = x, K = () => o(k, u, h), et = () => {
          D(k, () => {
            K(), R && R();
          });
        };
        j ? j(k, K, et) : et();
      }
    else
      o(k, u, h);
  }, ft = (d, u, h, b = !1, m = !1) => {
    const {
      type: k,
      props: C,
      ref: x,
      children: E,
      dynamicChildren: y,
      shapeFlag: I,
      patchFlag: D,
      dirs: j
    } = d;
    if (x != null && qo(x, null, h, d, !0), I & 256) {
      u.ctx.deactivate(d);
      return;
    }
    const R = I & 1 && j, K = !Hr(d);
    let et;
    if (K && (et = C && C.onVnodeBeforeUnmount) && qt(et, u, d), I & 6)
      Vt(d.component, h, b);
    else {
      if (I & 128) {
        d.suspense.unmount(h, b);
        return;
      }
      R && Ae(d, null, u, "beforeUnmount"), I & 64 ? d.type.remove(
        d,
        u,
        h,
        m,
        ie,
        b
      ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== Pt || D > 0 && D & 64) ? bt(
        y,
        u,
        h,
        !1,
        !0
      ) : (k === Pt && D & 384 || !m && I & 16) && bt(E, u, h), b && _e(d);
    }
    (K && (et = C && C.onVnodeUnmounted) || R) && xt(() => {
      et && qt(et, u, d), R && Ae(d, null, u, "unmounted");
    }, h);
  }, _e = (d) => {
    const { type: u, el: h, anchor: b, transition: m } = d;
    if (u === Pt) {
      oe(h, b);
      return;
    }
    if (u === Lo) {
      P(d);
      return;
    }
    const k = () => {
      i(h), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (d.shapeFlag & 1 && m && !m.persisted) {
      const { leave: C, delayLeave: x } = m, E = () => C(h, k);
      x ? x(d.el, k, E) : E();
    } else
      k();
  }, oe = (d, u) => {
    let h;
    for (; d !== u; )
      h = v(d), i(d), d = h;
    i(u);
  }, Vt = (d, u, h) => {
    const { bum: b, scope: m, update: k, subTree: C, um: x } = d;
    b && Dr(b), m.stop(), k && (k.active = !1, ft(C, d, u, h)), x && xt(x, u), xt(() => {
      d.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, bt = (d, u, h, b = !1, m = !1, k = 0) => {
    for (let C = k; C < d.length; C++)
      ft(d[C], u, h, b, m);
  }, Zt = (d) => d.shapeFlag & 6 ? Zt(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : v(d.anchor || d.el);
  let Ht = !1;
  const Fe = (d, u, h) => {
    d == null ? u._vnode && ft(u._vnode, null, null, !0) : _(
      u._vnode || null,
      d,
      u,
      null,
      null,
      null,
      h
    ), Ht || (Ht = !0, tn(), ma(), Ht = !1), u._vnode = d;
  }, ie = {
    p: _,
    um: ft,
    m: zt,
    r: _e,
    mt: st,
    mc: S,
    pc: tt,
    pbc: F,
    n: Zt,
    o: t
  };
  let Ee, Ze;
  return e && ([Ee, Ze] = e(
    ie
  )), {
    render: Fe,
    hydrate: Ee,
    createApp: ql(Fe, Ee)
  };
}
function Io({ type: t, props: e }, r) {
  return r === "svg" && t === "foreignObject" || r === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : r;
}
function Ie({ effect: t, update: e }, r) {
  t.allowRecurse = e.allowRecurse = r;
}
function tc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Fa(t, e, r = !1) {
  const o = t.children, i = e.children;
  if (z(o) && z(i))
    for (let n = 0; n < o.length; n++) {
      const a = o[n];
      let s = i[n];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[n] = de(i[n]), s.el = a.el), r || Fa(a, s)), s.type === vo && (s.el = a.el);
    }
}
function ec(t) {
  const e = t.slice(), r = [0];
  let o, i, n, a, s;
  const l = t.length;
  for (o = 0; o < l; o++) {
    const p = t[o];
    if (p !== 0) {
      if (i = r[r.length - 1], t[i] < p) {
        e[o] = i, r.push(o);
        continue;
      }
      for (n = 0, a = r.length - 1; n < a; )
        s = n + a >> 1, t[r[s]] < p ? n = s + 1 : a = s;
      p < t[r[n]] && (n > 0 && (e[o] = r[n - 1]), r[n] = o);
    }
  }
  for (n = r.length, a = r[n - 1]; n-- > 0; )
    r[n] = a, a = e[a];
  return r;
}
function Na(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Na(e);
}
const rc = (t) => t.__isTeleport, Pt = Symbol.for("v-fgt"), vo = Symbol.for("v-txt"), Ut = Symbol.for("v-cmt"), Lo = Symbol.for("v-stc"), sr = [];
let Nt = null;
function at(t = !1) {
  sr.push(Nt = t ? null : []);
}
function oc() {
  sr.pop(), Nt = sr[sr.length - 1] || null;
}
let hr = 1;
function gn(t) {
  hr += t;
}
function Ua(t) {
  return t.dynamicChildren = hr > 0 ? Nt || Ue : null, oc(), hr > 0 && Nt && Nt.push(t), t;
}
function lt(t, e, r, o, i, n) {
  return Ua(
    c(
      t,
      e,
      r,
      o,
      i,
      n,
      !0
    )
  );
}
function ic(t, e, r, o, i) {
  return Ua(
    wt(
      t,
      e,
      r,
      o,
      i,
      !0
    )
  );
}
function Ko(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Se(t, e) {
  return t.type === e.type && t.key === e.key;
}
const bo = "__vInternal", Va = ({ key: t }) => t ?? null, Rr = ({
  ref: t,
  ref_key: e,
  ref_for: r
}) => (typeof t == "number" && (t = "" + t), t != null ? dt(t) || yt(t) || N(t) ? { i: kt, r: t, k: e, f: !!r } : t : null);
function c(t, e = null, r = null, o = 0, i = null, n = t === Pt ? 0 : 1, a = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Va(e),
    ref: e && Rr(e),
    scopeId: ka,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: o,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: kt
  };
  return s ? (mi(l, r), n & 128 && t.normalize(l)) : r && (l.shapeFlag |= dt(r) ? 8 : 16), hr > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  Nt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Nt.push(l), l;
}
const wt = nc;
function nc(t, e = null, r = null, o = 0, i = null, n = !1) {
  if ((!t || t === wl) && (t = Ut), Ko(t)) {
    const s = me(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return r && mi(s, r), hr > 0 && !n && Nt && (s.shapeFlag & 6 ? Nt[Nt.indexOf(t)] = s : Nt.push(s)), s.patchFlag |= -2, s;
  }
  if (mc(t) && (t = t.__vccOpts), e) {
    e = ac(e);
    let { class: s, style: l } = e;
    s && !dt(s) && (e.class = ot(s)), rt(l) && (pa(l) && !z(l) && (l = ct({}, l)), e.style = ni(l));
  }
  const a = dt(t) ? 1 : vl(t) ? 128 : rc(t) ? 64 : rt(t) ? 4 : N(t) ? 2 : 0;
  return c(
    t,
    e,
    r,
    o,
    i,
    a,
    n,
    !0
  );
}
function ac(t) {
  return t ? pa(t) || bo in t ? ct({}, t) : t : null;
}
function me(t, e, r = !1) {
  const { props: o, ref: i, patchFlag: n, children: a } = t, s = e ? sc(o || {}, e) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: s,
    key: s && Va(s),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && i ? z(i) ? i.concat(Rr(e)) : [i, Rr(e)] : Rr(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: a,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Pt ? n === -1 ? 16 : n | 16 : n,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && me(t.ssContent),
    ssFallback: t.ssFallback && me(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Wr(t = " ", e = 0) {
  return wt(vo, null, t, e);
}
function Wo(t = "", e = !1) {
  return e ? (at(), ic(Ut, null, t)) : wt(Ut, null, t);
}
function Kt(t) {
  return t == null || typeof t == "boolean" ? wt(Ut) : z(t) ? wt(
    Pt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? de(t) : wt(vo, null, String(t));
}
function de(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : me(t);
}
function mi(t, e) {
  let r = 0;
  const { shapeFlag: o } = t;
  if (e == null)
    e = null;
  else if (z(e))
    r = 16;
  else if (typeof e == "object")
    if (o & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), mi(t, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = e._;
      !i && !(bo in e) ? e._ctx = kt : i === 3 && kt && (kt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    N(e) ? (e = { default: e, _ctx: kt }, r = 32) : (e = String(e), o & 64 ? (r = 16, e = [Wr(e)]) : r = 8);
  t.children = e, t.shapeFlag |= r;
}
function sc(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    for (const i in o)
      if (i === "class")
        e.class !== o.class && (e.class = ot([e.class, o.class]));
      else if (i === "style")
        e.style = ni([e.style, o.style]);
      else if (lo(i)) {
        const n = e[i], a = o[i];
        a && n !== a && !(z(n) && n.includes(a)) && (e[i] = n ? [].concat(n, a) : a);
      } else
        i !== "" && (e[i] = o[i]);
  }
  return e;
}
function qt(t, e, r, o = null) {
  St(t, e, 7, [
    r,
    o
  ]);
}
const lc = Ma();
let cc = 0;
function dc(t, e, r) {
  const o = t.type, i = (e ? e.appContext : t.appContext) || lc, n = {
    uid: cc++,
    vnode: t,
    type: o,
    parent: e,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ls(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: za(o, i),
    emitsOptions: xa(o, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: it,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: it,
    data: it,
    props: it,
    attrs: it,
    slots: it,
    refs: it,
    setupState: it,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return n.ctx = { _: n }, n.root = e ? e.root : n, n.emit = pl.bind(null, n), t.ce && t.ce(n), n;
}
let gt = null;
const pc = () => gt || kt;
let Yr, Yo;
{
  const t = Xn(), e = (r, o) => {
    let i;
    return (i = t[r]) || (i = t[r] = []), i.push(o), (n) => {
      i.length > 1 ? i.forEach((a) => a(n)) : i[0](n);
    };
  };
  Yr = e(
    "__VUE_INSTANCE_SETTERS__",
    (r) => gt = r
  ), Yo = e(
    "__VUE_SSR_SETTERS__",
    (r) => mo = r
  );
}
const yr = (t) => {
  const e = gt;
  return Yr(t), t.scope.on(), () => {
    t.scope.off(), Yr(e);
  };
}, un = () => {
  gt && gt.scope.off(), Yr(null);
};
function $a(t) {
  return t.vnode.shapeFlag & 4;
}
let mo = !1;
function gc(t, e = !1) {
  e && Yo(e);
  const { props: r, children: o } = t.vnode, i = $a(t);
  Wl(t, r, i, e), Gl(t, o);
  const n = i ? uc(t, e) : void 0;
  return e && Yo(!1), n;
}
function uc(t, e) {
  const r = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = ga(new Proxy(t.ctx, Bl));
  const { setup: o } = r;
  if (o) {
    const i = t.setupContext = o.length > 1 ? hc(t) : null, n = yr(t);
    ye();
    const a = te(
      o,
      t,
      0,
      [
        t.props,
        i
      ]
    );
    if (xe(), n(), qn(a)) {
      if (a.then(un, un), e)
        return a.then((s) => {
          fn(t, s, e);
        }).catch((s) => {
          uo(s, t, 0);
        });
      t.asyncDep = a;
    } else
      fn(t, a, e);
  } else
    qa(t, e);
}
function fn(t, e, r) {
  N(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : rt(e) && (t.setupState = ha(e)), qa(t, r);
}
let hn;
function qa(t, e, r) {
  const o = t.type;
  if (!t.render) {
    if (!e && hn && !o.render) {
      const i = o.template || vi(t).template;
      if (i) {
        const { isCustomElement: n, compilerOptions: a } = t.appContext.config, { delimiters: s, compilerOptions: l } = o, p = ct(
          ct(
            {
              isCustomElement: n,
              delimiters: s
            },
            a
          ),
          l
        );
        o.render = hn(i, p);
      }
    }
    t.render = o.render || Lt;
  }
  {
    const i = yr(t);
    ye();
    try {
      Rl(t);
    } finally {
      xe(), i();
    }
  }
}
function fc(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, r) {
        return Ct(t, "get", "$attrs"), e[r];
      }
    }
  ));
}
function hc(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  return {
    get attrs() {
      return fc(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function yo(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(ha(ga(t.exposed)), {
      get(e, r) {
        if (r in e)
          return e[r];
        if (r in ar)
          return ar[r](t);
      },
      has(e, r) {
        return r in e || r in ar;
      }
    }));
}
const wc = /(?:^|[-_])(\w)/g, vc = (t) => t.replace(wc, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function bc(t, e = !0) {
  return N(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Ka(t, e, r = !1) {
  let o = bc(e);
  if (!o && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (o = i[1]);
  }
  if (!o && t && t.parent) {
    const i = (n) => {
      for (const a in n)
        if (n[a] === e)
          return a;
    };
    o = i(
      t.components || t.parent.type.components
    ) || i(t.appContext.components);
  }
  return o ? vc(o) : r ? "App" : "Anonymous";
}
function mc(t) {
  return N(t) && "__vccOpts" in t;
}
const yc = (t, e) => Zs(t, e, mo);
function xc(t, e, r) {
  const o = arguments.length;
  return o === 2 ? rt(e) && !z(e) ? Ko(e) ? wt(t, null, [e]) : wt(t, e) : wt(t, null, e) : (o > 3 ? r = Array.prototype.slice.call(arguments, 2) : o === 3 && Ko(r) && (r = [r]), wt(t, e, r));
}
const kc = "3.4.15", _c = "http://www.w3.org/2000/svg", Ec = "http://www.w3.org/1998/Math/MathML", pe = typeof document < "u" ? document : null, wn = pe && /* @__PURE__ */ pe.createElement("template"), Cc = {
  insert: (t, e, r) => {
    e.insertBefore(t, r || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, r, o) => {
    const i = e === "svg" ? pe.createElementNS(_c, t) : e === "mathml" ? pe.createElementNS(Ec, t) : pe.createElement(t, r ? { is: r } : void 0);
    return t === "select" && o && o.multiple != null && i.setAttribute("multiple", o.multiple), i;
  },
  createText: (t) => pe.createTextNode(t),
  createComment: (t) => pe.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => pe.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, r, o, i, n) {
    const a = r ? r.previousSibling : e.lastChild;
    if (i && (i === n || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), r), !(i === n || !(i = i.nextSibling)); )
        ;
    else {
      wn.innerHTML = o === "svg" ? `<svg>${t}</svg>` : o === "mathml" ? `<math>${t}</math>` : t;
      const s = wn.content;
      if (o === "svg" || o === "mathml") {
        const l = s.firstChild;
        for (; l.firstChild; )
          s.appendChild(l.firstChild);
        s.removeChild(l);
      }
      e.insertBefore(s, r);
    }
    return [
      // first
      a ? a.nextSibling : e.firstChild,
      // last
      r ? r.previousSibling : e.lastChild
    ];
  }
}, ae = "transition", Qe = "animation", wr = Symbol("_vtc"), yi = (t, { slots: e }) => xc(Cl, Ac(t), e);
yi.displayName = "Transition";
const Wa = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
yi.props = /* @__PURE__ */ ct(
  {},
  Aa,
  Wa
);
const Le = (t, e = []) => {
  z(t) ? t.forEach((r) => r(...e)) : t && t(...e);
}, vn = (t) => t ? z(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
function Ac(t) {
  const e = {};
  for (const T in t)
    T in Wa || (e[T] = t[T]);
  if (t.css === !1)
    return e;
  const {
    name: r = "v",
    type: o,
    duration: i,
    enterFromClass: n = `${r}-enter-from`,
    enterActiveClass: a = `${r}-enter-active`,
    enterToClass: s = `${r}-enter-to`,
    appearFromClass: l = n,
    appearActiveClass: p = a,
    appearToClass: g = s,
    leaveFromClass: w = `${r}-leave-from`,
    leaveActiveClass: v = `${r}-leave-active`,
    leaveToClass: f = `${r}-leave-to`
  } = t, A = Ic(i), _ = A && A[0], O = A && A[1], {
    onBeforeEnter: H,
    onEnter: $,
    onEnterCancelled: M,
    onLeave: P,
    onLeaveCancelled: B,
    onBeforeAppear: L = H,
    onAppear: V = $,
    onAppearCancelled: S = M
  } = e, U = (T, q, st) => {
    Te(T, q ? g : s), Te(T, q ? p : a), st && st();
  }, F = (T, q) => {
    T._isLeaving = !1, Te(T, w), Te(T, f), Te(T, v), q && q();
  }, G = (T) => (q, st) => {
    const At = T ? V : $, J = () => U(q, T, st);
    Le(At, [q, J]), bn(() => {
      Te(q, T ? l : n), se(q, T ? g : s), vn(At) || mn(q, o, _, J);
    });
  };
  return ct(e, {
    onBeforeEnter(T) {
      Le(H, [T]), se(T, n), se(T, a);
    },
    onBeforeAppear(T) {
      Le(L, [T]), se(T, l), se(T, p);
    },
    onEnter: G(!1),
    onAppear: G(!0),
    onLeave(T, q) {
      T._isLeaving = !0;
      const st = () => F(T, q);
      se(T, w), Oc(), se(T, v), bn(() => {
        T._isLeaving && (Te(T, w), se(T, f), vn(P) || mn(T, o, O, st));
      }), Le(P, [T, st]);
    },
    onEnterCancelled(T) {
      U(T, !1), Le(M, [T]);
    },
    onAppearCancelled(T) {
      U(T, !0), Le(S, [T]);
    },
    onLeaveCancelled(T) {
      F(T), Le(B, [T]);
    }
  });
}
function Ic(t) {
  if (t == null)
    return null;
  if (rt(t))
    return [To(t.enter), To(t.leave)];
  {
    const e = To(t);
    return [e, e];
  }
}
function To(t) {
  return jo(t);
}
function se(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.add(r)), (t[wr] || (t[wr] = /* @__PURE__ */ new Set())).add(e);
}
function Te(t, e) {
  e.split(/\s+/).forEach((o) => o && t.classList.remove(o));
  const r = t[wr];
  r && (r.delete(e), r.size || (t[wr] = void 0));
}
function bn(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Lc = 0;
function mn(t, e, r, o) {
  const i = t._endId = ++Lc, n = () => {
    i === t._endId && o();
  };
  if (r)
    return setTimeout(n, r);
  const { type: a, timeout: s, propCount: l } = Tc(t, e);
  if (!a)
    return o();
  const p = a + "end";
  let g = 0;
  const w = () => {
    t.removeEventListener(p, v), n();
  }, v = (f) => {
    f.target === t && ++g >= l && w();
  };
  setTimeout(() => {
    g < l && w();
  }, s + 1), t.addEventListener(p, v);
}
function Tc(t, e) {
  const r = window.getComputedStyle(t), o = (A) => (r[A] || "").split(", "), i = o(`${ae}Delay`), n = o(`${ae}Duration`), a = yn(i, n), s = o(`${Qe}Delay`), l = o(`${Qe}Duration`), p = yn(s, l);
  let g = null, w = 0, v = 0;
  e === ae ? a > 0 && (g = ae, w = a, v = n.length) : e === Qe ? p > 0 && (g = Qe, w = p, v = l.length) : (w = Math.max(a, p), g = w > 0 ? a > p ? ae : Qe : null, v = g ? g === ae ? n.length : l.length : 0);
  const f = g === ae && /\b(transform|all)(,|$)/.test(
    o(`${ae}Property`).toString()
  );
  return {
    type: g,
    timeout: w,
    propCount: v,
    hasTransform: f
  };
}
function yn(t, e) {
  for (; t.length < e.length; )
    t = t.concat(t);
  return Math.max(...e.map((r, o) => xn(r) + xn(t[o])));
}
function xn(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function Oc() {
  return document.body.offsetHeight;
}
function Pc(t, e, r) {
  const o = t[wr];
  o && (e = (e ? [e, ...o] : [...o]).join(" ")), e == null ? t.removeAttribute("class") : r ? t.setAttribute("class", e) : t.className = e;
}
const Sc = Symbol("_vod"), jc = Symbol("");
function Mc(t, e, r) {
  const o = t.style, i = o.display, n = dt(r);
  if (r && !n) {
    if (e && !dt(e))
      for (const a in e)
        r[a] == null && Xo(o, a, "");
    for (const a in r)
      Xo(o, a, r[a]);
  } else if (n) {
    if (e !== r) {
      const a = o[jc];
      a && (r += ";" + a), o.cssText = r;
    }
  } else
    e && t.removeAttribute("style");
  Sc in t && (o.display = i);
}
const kn = /\s*!important$/;
function Xo(t, e, r) {
  if (z(r))
    r.forEach((o) => Xo(t, e, o));
  else if (r == null && (r = ""), e.startsWith("--"))
    t.setProperty(e, r);
  else {
    const o = Dc(t, e);
    kn.test(r) ? t.setProperty(
      Ft(o),
      r.replace(kn, ""),
      "important"
    ) : t[o] = r;
  }
}
const _n = ["Webkit", "Moz", "ms"], Oo = {};
function Dc(t, e) {
  const r = Oo[e];
  if (r)
    return r;
  let o = Jt(e);
  if (o !== "filter" && o in t)
    return Oo[e] = o;
  o = Yn(o);
  for (let i = 0; i < _n.length; i++) {
    const n = _n[i] + o;
    if (n in t)
      return Oo[e] = n;
  }
  return e;
}
const En = "http://www.w3.org/1999/xlink";
function zc(t, e, r, o, i) {
  if (o && e.startsWith("xlink:"))
    r == null ? t.removeAttributeNS(En, e.slice(6, e.length)) : t.setAttributeNS(En, e, r);
  else {
    const n = Cs(e);
    r == null || n && !Gn(r) ? t.removeAttribute(e) : t.setAttribute(e, n ? "" : r);
  }
}
function Hc(t, e, r, o, i, n, a) {
  if (e === "innerHTML" || e === "textContent") {
    o && a(o, i, n), t[e] = r ?? "";
    return;
  }
  const s = t.tagName;
  if (e === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    t._value = r;
    const p = s === "OPTION" ? t.getAttribute("value") : t.value, g = r ?? "";
    p !== g && (t.value = g), r == null && t.removeAttribute(e);
    return;
  }
  let l = !1;
  if (r === "" || r == null) {
    const p = typeof t[e];
    p === "boolean" ? r = Gn(r) : r == null && p === "string" ? (r = "", l = !0) : p === "number" && (r = 0, l = !0);
  }
  try {
    t[e] = r;
  } catch {
  }
  l && t.removeAttribute(e);
}
function Ya(t, e, r, o) {
  t.addEventListener(e, r, o);
}
function Bc(t, e, r, o) {
  t.removeEventListener(e, r, o);
}
const Cn = Symbol("_vei");
function Rc(t, e, r, o, i = null) {
  const n = t[Cn] || (t[Cn] = {}), a = n[e];
  if (o && a)
    a.value = o;
  else {
    const [s, l] = Fc(e);
    if (o) {
      const p = n[e] = Vc(o, i);
      Ya(t, s, p, l);
    } else
      a && (Bc(t, s, a, l), n[e] = void 0);
  }
}
const An = /(?:Once|Passive|Capture)$/;
function Fc(t) {
  let e;
  if (An.test(t)) {
    e = {};
    let o;
    for (; o = t.match(An); )
      t = t.slice(0, t.length - o[0].length), e[o[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Ft(t.slice(2)), e];
}
let Po = 0;
const Nc = /* @__PURE__ */ Promise.resolve(), Uc = () => Po || (Nc.then(() => Po = 0), Po = Date.now());
function Vc(t, e) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    St(
      $c(o, r.value),
      e,
      5,
      [o]
    );
  };
  return r.value = t, r.attached = Uc(), r;
}
function $c(t, e) {
  if (z(e)) {
    const r = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      r.call(t), t._stopped = !0;
    }, e.map((o) => (i) => !i._stopped && o && o(i));
  } else
    return e;
}
const In = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, qc = (t, e, r, o, i, n, a, s, l) => {
  const p = i === "svg";
  e === "class" ? Pc(t, o, p) : e === "style" ? Mc(t, r, o) : lo(e) ? ei(e) || Rc(t, e, r, o, a) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Kc(t, e, o, p)) ? Hc(
    t,
    e,
    o,
    n,
    a,
    s,
    l
  ) : (e === "true-value" ? t._trueValue = o : e === "false-value" && (t._falseValue = o), zc(t, e, o, p));
};
function Kc(t, e, r, o) {
  if (o)
    return !!(e === "innerHTML" || e === "textContent" || e in t && In(e) && N(r));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return In(e) && dt(r) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Wc(t, e) {
  const r = /* @__PURE__ */ Al(t);
  class o extends xi {
    constructor(n) {
      super(r, n, e);
    }
  }
  return o.def = r, o;
}
const Yc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class xi extends Yc {
  constructor(e, r = {}, o) {
    super(), this._def = e, this._props = r, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && o ? o(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), hi(() => {
      this._connected || (Pn(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    this._ob = new MutationObserver((o) => {
      for (const i of o)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const e = (o, i = !1) => {
      const { props: n, styles: a } = o;
      let s;
      if (n && !z(n))
        for (const l in n) {
          const p = n[l];
          (p === Number || p && p.type === Number) && (l in this._props && (this._props[l] = jo(this._props[l])), (s || (s = /* @__PURE__ */ Object.create(null)))[Jt(l)] = !0);
        }
      this._numberProps = s, i && this._resolveProps(o), this._applyStyles(a), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((o) => e(o, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: r } = e, o = z(r) ? r : Object.keys(r || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && o.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of o.map(Jt))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(n) {
          this._setProp(i, n);
        }
      });
  }
  _setAttr(e) {
    let r = this.getAttribute(e);
    const o = Jt(e);
    this._numberProps && this._numberProps[o] && (r = jo(r)), this._setProp(o, r, !1);
  }
  /**
   * @internal
   */
  _getProp(e) {
    return this._props[e];
  }
  /**
   * @internal
   */
  _setProp(e, r, o = !0, i = !0) {
    r !== this._props[e] && (this._props[e] = r, i && this._instance && this._update(), o && (r === !0 ? this.setAttribute(Ft(e), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(Ft(e), r + "") : r || this.removeAttribute(Ft(e))));
  }
  _update() {
    Pn(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = wt(this._def, ct({}, this._props));
    return this._instance || (e.ce = (r) => {
      this._instance = r, r.isCE = !0;
      const o = (n, a) => {
        this.dispatchEvent(
          new CustomEvent(n, {
            detail: a
          })
        );
      };
      r.emit = (n, ...a) => {
        o(n, a), Ft(n) !== n && o(Ft(n), a);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof xi) {
          r.parent = i._instance, r.provides = i._instance.provides;
          break;
        }
    }), e;
  }
  _applyStyles(e) {
    e && e.forEach((r) => {
      const o = document.createElement("style");
      o.textContent = r, this.shadowRoot.appendChild(o);
    });
  }
}
const Ln = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return z(e) ? (r) => Dr(e, r) : e;
}, So = Symbol("_assign"), Xc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: r } }, o) {
    const i = co(e);
    Ya(t, "change", () => {
      const n = Array.prototype.filter.call(t.options, (a) => a.selected).map(
        (a) => r ? ii(Xr(a)) : Xr(a)
      );
      t[So](
        t.multiple ? i ? new Set(n) : n : n[0]
      ), t._assigning = !0, hi(() => {
        t._assigning = !1;
      });
    }), t[So] = Ln(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e, oldValue: r, modifiers: { number: o } }) {
    Tn(t, e, r, o);
  },
  beforeUpdate(t, e, r) {
    t[So] = Ln(r);
  },
  updated(t, { value: e, oldValue: r, modifiers: { number: o } }) {
    t._assigning || Tn(t, e, r, o);
  }
};
function Tn(t, e, r, o) {
  const i = t.multiple, n = z(e);
  if (!(i && !n && !co(e)) && !(n && pr(e, r))) {
    for (let a = 0, s = t.options.length; a < s; a++) {
      const l = t.options[a], p = Xr(l);
      if (i)
        if (n) {
          const g = typeof p;
          g === "string" || g === "number" ? l.selected = e.includes(
            o ? ii(p) : p
          ) : l.selected = Is(e, p) > -1;
        } else
          l.selected = e.has(p);
      else if (pr(Xr(l), e)) {
        t.selectedIndex !== a && (t.selectedIndex = a);
        return;
      }
    }
    !i && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function Xr(t) {
  return "_value" in t ? t._value : t.value;
}
const Gc = /* @__PURE__ */ ct({ patchProp: qc }, Cc);
let On;
function Zc() {
  return On || (On = Jl(Gc));
}
const Pn = (...t) => {
  Zc().render(...t);
}, Jc = { class: "inline-flex border border-primary-800 rounded-full bg-primary-50" }, Qc = ["name", "id", "checked"], td = ["for"], ed = ["name", "id", "checked"], rd = ["for"], od = { class: "hidden lg:inline-block font-semibold text-gray-600" }, id = { key: 0 }, nd = { key: 1 }, ad = {
  __name: "DeploymentSwitcher.ce",
  props: ["deploymentMode"],
  emits: ["deploymentModeChanged"],
  setup(t, { emit: e }) {
    const r = e, o = function(i) {
      r("deploymentModeChanged", i);
    };
    return (i, n) => (at(), lt(Pt, null, [
      c("div", Jc, [
        c("div", null, [
          c("input", {
            type: "radio",
            name: "deployment-switcher-" + i.$.uid,
            id: "deployment-cloud-" + i.$.uid,
            value: "cloud",
            class: "hidden peer",
            checked: t.deploymentMode == "cloud",
            onChange: n[0] || (n[0] = (a) => o("cloud")),
            autocomplete: "off"
          }, null, 40, Qc),
          c("label", {
            for: "deployment-cloud-" + i.$.uid,
            class: "inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full"
          }, "Cloud", 8, td)
        ]),
        c("div", null, [
          c("input", {
            type: "radio",
            name: "deployment-switcher-" + i.$.uid,
            id: "deployment-self-hosted-" + i.$.uid,
            value: "self-hosted",
            class: "hidden peer",
            checked: t.deploymentMode == "self-hosted",
            onChange: n[1] || (n[1] = (a) => o("self-hosted")),
            autocomplete: "off"
          }, null, 40, ed),
          c("label", {
            for: "deployment-self-hosted-" + i.$.uid,
            class: "inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full"
          }, "Self hosted", 8, rd)
        ])
      ]),
      c("div", od, [
        wt(yi, {
          name: "fade",
          duration: { enter: 500, leave: 0 }
        }, {
          default: _a(() => [
            t.deploymentMode == "cloud" ? (at(), lt("div", id, "We host it - no maintenance effort")) : t.deploymentMode == "self-hosted" ? (at(), lt("div", nd, "You host it - maintain your own setup")) : Wo("", !0)
          ]),
          _: 1
        })
      ])
    ], 64));
  }
}, sd = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}.tooltip-arrow,.tooltip-arrow:before{position:absolute;width:8px;height:8px;background:inherit}.tooltip-arrow{visibility:hidden}.tooltip-arrow:before{content:"";visibility:visible;transform:rotate(45deg)}[data-tooltip-style^=light]+.tooltip>.tooltip-arrow:before{border-style:solid;border-color:#e5e7eb}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=top]>.tooltip-arrow:before{border-bottom-width:1px;border-right-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=right]>.tooltip-arrow:before{border-bottom-width:1px;border-left-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=bottom]>.tooltip-arrow:before{border-top-width:1px;border-left-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=left]>.tooltip-arrow:before{border-top-width:1px;border-right-width:1px}.tooltip[data-popper-placement^=top]>.tooltip-arrow{bottom:-4px}.tooltip[data-popper-placement^=bottom]>.tooltip-arrow{top:-4px}.tooltip[data-popper-placement^=left]>.tooltip-arrow{right:-4px}.tooltip[data-popper-placement^=right]>.tooltip-arrow{left:-4px}.tooltip.invisible>.tooltip-arrow:before{visibility:hidden}[data-popper-arrow],[data-popper-arrow]:before{position:absolute;width:8px;height:8px;background:inherit}[data-popper-arrow]{visibility:hidden}[data-popper-arrow]:before{content:"";visibility:visible;transform:rotate(45deg)}[data-popper-arrow]:after{content:"";visibility:visible;transform:rotate(45deg);position:absolute;width:9px;height:9px;background:inherit}[role=tooltip]>[data-popper-arrow]:before{border-style:solid;border-color:#e5e7eb}.dark [role=tooltip]>[data-popper-arrow]:before{border-style:solid;border-color:#4b5563}[role=tooltip]>[data-popper-arrow]:after{border-style:solid;border-color:#e5e7eb}.dark [role=tooltip]>[data-popper-arrow]:after{border-style:solid;border-color:#4b5563}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]:before{border-bottom-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]:after{border-bottom-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]:before{border-bottom-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]:after{border-bottom-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]:before{border-top-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]:after{border-top-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]:before{border-top-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]:after{border-top-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]{bottom:-5px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]{top:-5px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]{right:-5px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]{left:-5px}[role=tooltip].invisible>[data-popper-arrow]:before{visibility:hidden}[role=tooltip].invisible>[data-popper-arrow]:after{visibility:hidden}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #1C64F2;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#1c64f2}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}select:not([size]){background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3e %3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3e %3c/svg%3e");background-position:right .75rem center;background-repeat:no-repeat;background-size:.75em .75em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}:is([dir=rtl]) select:not([size]){background-position:left .75rem center;padding-right:.75rem;padding-left:0}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#1c64f2;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #1C64F2;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked,.dark [type=checkbox]:checked,.dark [type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:.55em .55em;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3e %3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M1 5.917 5.724 10.5 15 1.5'/%3e %3c/svg%3e");background-repeat:no-repeat;background-size:.55em .55em;-webkit-print-color-adjust:exact;print-color-adjust:exact}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");background-size:1em 1em}.dark [type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");background-size:1em 1em}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3e %3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M1 5.917 5.724 10.5 15 1.5'/%3e %3c/svg%3e");background-color:currentColor;border-color:transparent;background-position:center;background-repeat:no-repeat;background-size:.55em .55em;-webkit-print-color-adjust:exact;print-color-adjust:exact}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px auto inherit}input[type=file]::file-selector-button{color:#fff;background:#1f2937;border:0;font-weight:500;font-size:.875rem;cursor:pointer;padding:.625rem 1rem .625rem 2rem;margin-inline-start:-1rem;margin-inline-end:1rem}input[type=file]::file-selector-button:hover{background:#374151}:is([dir=rtl]) input[type=file]::file-selector-button{padding-right:2rem;padding-left:1rem}.dark input[type=file]::file-selector-button{color:#fff;background:#4b5563}.dark input[type=file]::file-selector-button:hover{background:#6b7280}input[type=range]::-webkit-slider-thumb{height:1.25rem;width:1.25rem;background:#1c64f2;border-radius:9999px;border:0;appearance:none;-moz-appearance:none;-webkit-appearance:none;cursor:pointer}input[type=range]:disabled::-webkit-slider-thumb{background:#9ca3af}.dark input[type=range]:disabled::-webkit-slider-thumb{background:#6b7280}input[type=range]:focus::-webkit-slider-thumb{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);--tw-ring-opacity: 1px;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}input[type=range]::-moz-range-thumb{height:1.25rem;width:1.25rem;background:#1c64f2;border-radius:9999px;border:0;appearance:none;-moz-appearance:none;-webkit-appearance:none;cursor:pointer}input[type=range]:disabled::-moz-range-thumb{background:#9ca3af}.dark input[type=range]:disabled::-moz-range-thumb{background:#6b7280}input[type=range]::-moz-range-progress{background:#3f83f8}input[type=range]::-ms-fill-lower{background:#3f83f8}input[type=range].range-sm::-webkit-slider-thumb{height:1rem;width:1rem}input[type=range].range-lg::-webkit-slider-thumb{height:1.5rem;width:1.5rem}input[type=range].range-sm::-moz-range-thumb{height:1rem;width:1rem}input[type=range].range-lg::-moz-range-thumb{height:1.5rem;width:1.5rem}.toggle-bg:after{content:"";position:absolute;top:.125rem;left:.125rem;background:#fff;border-color:#d1d5db;border-width:1px;border-radius:9999px;height:1.25rem;width:1.25rem;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-duration:.15s;box-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color)}input:checked+.toggle-bg:after{transform:translate(100%);border-color:#fff}input:checked+.toggle-bg{background:#1c64f2;border-color:#1c64f2}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(63 131 248 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(63 131 248 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.not-sr-only{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}.pointer-events-none{pointer-events:none}.\\!visible{visibility:visible!important}.visible{visibility:visible}.invisible{visibility:hidden}.collapse{visibility:collapse}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{top:0;right:0;bottom:0;left:0}.inset-y-0{top:0;bottom:0}.-bottom-1{bottom:-.25rem}.-bottom-1\\.5{bottom:-.375rem}.-bottom-2{bottom:-.5rem}.-bottom-4{bottom:-1rem}.-left-1{left:-.25rem}.-left-1\\.5{left:-.375rem}.-left-3{left:-.75rem}.-right-0{right:-0px}.-right-0\\.5{right:-.125rem}.-right-1{right:-.25rem}.-right-1\\.5{right:-.375rem}.-top-1{top:-.25rem}.-top-1\\.5{top:-.375rem}.bottom-0{bottom:0}.bottom-2{bottom:.5rem}.bottom-2\\.5{bottom:.625rem}.bottom-5{bottom:1.25rem}.bottom-\\[60px\\]{bottom:60px}.left-0{left:0}.left-1\\/2{left:50%}.right-0{right:0}.right-2{right:.5rem}.right-2\\.5{right:.625rem}.right-3{right:.75rem}.top-0{top:0}.top-1\\/2{top:50%}.top-3{top:.75rem}.isolate{isolation:isolate}.isolation-auto{isolation:auto}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.col-span-2{grid-column:span 2 / span 2}.m-2{margin:.5rem}.-mx-1{margin-left:-.25rem;margin-right:-.25rem}.-mx-1\\.5{margin-left:-.375rem;margin-right:-.375rem}.-my-1{margin-top:-.25rem;margin-bottom:-.25rem}.-my-1\\.5{margin-top:-.375rem;margin-bottom:-.375rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-1\\.5{margin-left:.375rem;margin-right:.375rem}.mx-auto{margin-left:auto;margin-right:auto}.my-6{margin-top:1.5rem;margin-bottom:1.5rem}.\\!-mb-2{margin-bottom:-.5rem!important}.-mb-px{margin-bottom:-1px}.-mr-1{margin-right:-.25rem}.-mr-1\\.5{margin-right:-.375rem}.mb-1{margin-bottom:.25rem}.mb-10{margin-bottom:2.5rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-0{margin-left:0}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-3{margin-left:.75rem}.ml-6{margin-left:1.5rem}.ml-auto{margin-left:auto}.mr-0{margin-right:0}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mr-3{margin-right:.75rem}.mr-4{margin-right:1rem}.ms-0{margin-inline-start:0px}.ms-1{margin-inline-start:.25rem}.ms-2{margin-inline-start:.5rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.mt-8{margin-top:2rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.inline-table{display:inline-table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-column{display:table-column}.table-column-group{display:table-column-group}.table-footer-group{display:table-footer-group}.table-header-group{display:table-header-group}.table-row-group{display:table-row-group}.table-row{display:table-row}.flow-root{display:flow-root}.grid{display:grid}.inline-grid{display:inline-grid}.contents{display:contents}.list-item{display:list-item}.hidden{display:none}.h-0{height:0px}.h-0\\.5{height:.125rem}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-36{height:9rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-56{height:14rem}.h-6{height:1.5rem}.h-64{height:16rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-96{height:24rem}.h-auto{height:auto}.h-full{height:100%}.h-modal{height:calc(100% - 2rem)}.h-screen{height:100vh}.w-0{width:0px}.w-0\\.5{width:.125rem}.w-1{width:.25rem}.w-1\\.5{width:.375rem}.w-1\\/2{width:50%}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-36{width:9rem}.w-4{width:1rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-\\[100\\%\\]{width:100%}.w-auto{width:auto}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-full{max-width:100%}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.max-w-screen-md{max-width:768px}.max-w-screen-xl{max-width:1280px}.max-w-sm{max-width:24rem}.max-w-xl{max-width:36rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-0{--tw-translate-y: -0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-full{--tw-translate-y: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-full{--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-0{--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-1\\/2{--tw-translate-y: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-full{--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform-none{transform:none}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.resize{resize:both}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-7{grid-template-columns:repeat(7,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.content-start{align-content:flex-start}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-stretch{justify-content:stretch}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.-space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(-1rem * var(--tw-space-x-reverse));margin-left:calc(-1rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.25rem * var(--tw-space-x-reverse));margin-left:calc(.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2\\.5>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.625rem * var(--tw-space-x-reverse));margin-left:calc(.625rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-reverse>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 1}.space-x-reverse>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 1}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 0;border-right-width:calc(1px * var(--tw-divide-x-reverse));border-left-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-y-reverse>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 1}.divide-x-reverse>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 1}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(243 244 246 / var(--tw-divide-opacity))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(229 231 235 / var(--tw-divide-opacity))}.self-center{align-self:center}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-ellipsis{text-overflow:ellipsis}.text-clip{text-overflow:clip}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.whitespace-pre-line{white-space:pre-line}.whitespace-pre-wrap{white-space:pre-wrap}.\\!rounded-full{border-radius:9999px!important}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-none{border-radius:0}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-e{border-start-end-radius:.25rem;border-end-end-radius:.25rem}.rounded-e-lg{border-start-end-radius:.5rem;border-end-end-radius:.5rem}.rounded-l{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-l-lg{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.rounded-r{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-r-lg{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.rounded-s{border-start-start-radius:.25rem;border-end-start-radius:.25rem}.rounded-s-lg{border-start-start-radius:.5rem;border-end-start-radius:.5rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.rounded-t-xl{border-top-left-radius:.75rem;border-top-right-radius:.75rem}.rounded-bl{border-bottom-left-radius:.25rem}.rounded-br{border-bottom-right-radius:.25rem}.rounded-ee{border-end-end-radius:.25rem}.rounded-es{border-end-start-radius:.25rem}.rounded-se{border-start-end-radius:.25rem}.rounded-ss{border-start-start-radius:.25rem}.rounded-tl{border-top-left-radius:.25rem}.rounded-tr{border-top-right-radius:.25rem}.border{border-width:1px}.border-0{border-width:0px}.border-2{border-width:2px}.border-\\[1px\\]{border-width:1px}.border-x{border-left-width:1px;border-right-width:1px}.border-x-0{border-left-width:0px;border-right-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-b{border-bottom-width:1px}.border-b-0{border-bottom-width:0px}.border-b-2{border-bottom-width:2px}.border-e{border-inline-end-width:1px}.border-l{border-left-width:1px}.border-r{border-right-width:1px}.border-s{border-inline-start-width:1px}.border-t{border-top-width:1px}.border-t-0{border-top-width:0px}.border-dashed{border-style:dashed}.border-none{border-style:none}.\\!border-fuchsia-500{--tw-border-opacity: 1 !important;border-color:rgb(217 70 239 / var(--tw-border-opacity))!important}.\\!border-indigo-500{--tw-border-opacity: 1 !important;border-color:rgb(104 117 245 / var(--tw-border-opacity))!important}.\\!border-primary-400{--tw-border-opacity: 1 !important;border-color:rgb(161 145 244 / var(--tw-border-opacity))!important}.\\!border-primary-700{--tw-border-opacity: 1 !important;border-color:rgb(97 50 207 / var(--tw-border-opacity))!important}.\\!border-teal-500{--tw-border-opacity: 1 !important;border-color:rgb(6 148 162 / var(--tw-border-opacity))!important}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}.border-blue-600{--tw-border-opacity: 1;border-color:rgb(28 100 242 / var(--tw-border-opacity))}.border-blue-700{--tw-border-opacity: 1;border-color:rgb(26 86 219 / var(--tw-border-opacity))}.border-gray-100{--tw-border-opacity: 1;border-color:rgb(243 244 246 / var(--tw-border-opacity))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-gray-500{--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}.border-gray-600{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.border-gray-700{--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}.border-gray-800{--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity))}.border-green-500{--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}.border-green-600{--tw-border-opacity: 1;border-color:rgb(5 122 85 / var(--tw-border-opacity))}.border-green-700{--tw-border-opacity: 1;border-color:rgb(4 108 78 / var(--tw-border-opacity))}.border-pink-600{--tw-border-opacity: 1;border-color:rgb(214 31 105 / var(--tw-border-opacity))}.border-pink-700{--tw-border-opacity: 1;border-color:rgb(191 18 93 / var(--tw-border-opacity))}.border-primary-800{--tw-border-opacity: 1;border-color:rgb(81 42 173 / var(--tw-border-opacity))}.border-purple-600{--tw-border-opacity: 1;border-color:rgb(126 58 242 / var(--tw-border-opacity))}.border-purple-700{--tw-border-opacity: 1;border-color:rgb(108 43 217 / var(--tw-border-opacity))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}.border-red-600{--tw-border-opacity: 1;border-color:rgb(224 36 36 / var(--tw-border-opacity))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(200 30 30 / var(--tw-border-opacity))}.border-transparent{border-color:transparent}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-yellow-400{--tw-border-opacity: 1;border-color:rgb(227 160 8 / var(--tw-border-opacity))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(194 120 3 / var(--tw-border-opacity))}.\\!bg-primary-600{--tw-bg-opacity: 1 !important;background-color:rgb(110 65 226 / var(--tw-bg-opacity))!important}.\\!bg-primary-700{--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}.\\!bg-transparent{background-color:transparent!important}.bg-blue-100{--tw-bg-opacity: 1;background-color:rgb(225 239 254 / var(--tw-bg-opacity))}.bg-blue-200{--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(235 245 255 / var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}.bg-blue-700{--tw-bg-opacity: 1;background-color:rgb(26 86 219 / var(--tw-bg-opacity))}.bg-blue-800{--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}.bg-blue-900{--tw-bg-opacity: 1;background-color:rgb(35 56 118 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-gray-300{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-gray-500{--tw-bg-opacity: 1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))}.bg-gray-600{--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}.bg-gray-700{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.bg-gray-800{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.bg-gray-900\\/50{background-color:#11182780}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(222 247 236 / var(--tw-bg-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}.bg-green-400{--tw-bg-opacity: 1;background-color:rgb(49 196 141 / var(--tw-bg-opacity))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(243 250 247 / var(--tw-bg-opacity))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgb(14 159 110 / var(--tw-bg-opacity))}.bg-green-600{--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}.bg-green-700{--tw-bg-opacity: 1;background-color:rgb(4 108 78 / var(--tw-bg-opacity))}.bg-indigo-100{--tw-bg-opacity: 1;background-color:rgb(229 237 255 / var(--tw-bg-opacity))}.bg-indigo-200{--tw-bg-opacity: 1;background-color:rgb(205 219 254 / var(--tw-bg-opacity))}.bg-indigo-500{--tw-bg-opacity: 1;background-color:rgb(104 117 245 / var(--tw-bg-opacity))}.bg-indigo-600{--tw-bg-opacity: 1;background-color:rgb(88 80 236 / var(--tw-bg-opacity))}.bg-orange-100{--tw-bg-opacity: 1;background-color:rgb(254 236 220 / var(--tw-bg-opacity))}.bg-pink-100{--tw-bg-opacity: 1;background-color:rgb(252 232 243 / var(--tw-bg-opacity))}.bg-pink-200{--tw-bg-opacity: 1;background-color:rgb(250 209 232 / var(--tw-bg-opacity))}.bg-pink-700{--tw-bg-opacity: 1;background-color:rgb(191 18 93 / var(--tw-bg-opacity))}.bg-primary{--tw-bg-opacity: 1;background-color:rgb(110 65 226 / var(--tw-bg-opacity))}.bg-primary-50{--tw-bg-opacity: 1;background-color:rgb(244 244 254 / var(--tw-bg-opacity))}.bg-primary-600{--tw-bg-opacity: 1;background-color:rgb(110 65 226 / var(--tw-bg-opacity))}.bg-purple-100{--tw-bg-opacity: 1;background-color:rgb(237 235 254 / var(--tw-bg-opacity))}.bg-purple-200{--tw-bg-opacity: 1;background-color:rgb(220 215 254 / var(--tw-bg-opacity))}.bg-purple-500{--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}.bg-purple-600{--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}.bg-purple-700{--tw-bg-opacity: 1;background-color:rgb(108 43 217 / var(--tw-bg-opacity))}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(253 232 232 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}.bg-red-400{--tw-bg-opacity: 1;background-color:rgb(249 128 128 / var(--tw-bg-opacity))}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(253 242 242 / var(--tw-bg-opacity))}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(240 82 82 / var(--tw-bg-opacity))}.bg-red-600{--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}.bg-red-700{--tw-bg-opacity: 1;background-color:rgb(200 30 30 / var(--tw-bg-opacity))}.bg-sky-100{--tw-bg-opacity: 1;background-color:rgb(224 242 254 / var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-white\\/30{background-color:#ffffff4d}.bg-white\\/50{background-color:#ffffff80}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(253 246 178 / var(--tw-bg-opacity))}.bg-yellow-200{--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}.bg-yellow-400{--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}.bg-yellow-50{--tw-bg-opacity: 1;background-color:rgb(253 253 234 / var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity: .5}.\\!bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))!important}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.\\!from-fuchsia-400{--tw-gradient-from: #e879f9 var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(232 121 249 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.\\!from-indigo-500{--tw-gradient-from: #6875F5 var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(104 117 245 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.\\!from-teal-400{--tw-gradient-from: #16BDCA var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(22 189 202 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.from-blue-500{--tw-gradient-from: #3F83F8 var(--tw-gradient-from-position);--tw-gradient-to: rgb(63 131 248 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-cyan-500{--tw-gradient-from: #06b6d4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-400{--tw-gradient-from: #31C48D var(--tw-gradient-from-position);--tw-gradient-to: rgb(49 196 141 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-500{--tw-gradient-from: #0E9F6E var(--tw-gradient-from-position);--tw-gradient-to: rgb(14 159 110 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-lime-500{--tw-gradient-from: #84cc16 var(--tw-gradient-from-position);--tw-gradient-to: rgb(132 204 22 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-pink-500{--tw-gradient-from: #E74694 var(--tw-gradient-from-position);--tw-gradient-to: rgb(231 70 148 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-500{--tw-gradient-from: #9061F9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(144 97 249 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-600{--tw-gradient-from: #7E3AF2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-red-200{--tw-gradient-from: #FBD5D5 var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 213 213 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-red-500{--tw-gradient-from: #F05252 var(--tw-gradient-from-position);--tw-gradient-to: rgb(240 82 82 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-200{--tw-gradient-from: #AFECEF var(--tw-gradient-from-position);--tw-gradient-to: rgb(175 236 239 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-300{--tw-gradient-from: #7EDCE2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 220 226 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-500{--tw-gradient-from: #0694A2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 148 162 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.via-blue-600{--tw-gradient-to: rgb(28 100 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #1C64F2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-600{--tw-gradient-to: rgb(8 145 178 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #0891b2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-green-600{--tw-gradient-to: rgb(5 122 85 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #057A55 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-lime-600{--tw-gradient-to: rgb(101 163 13 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #65a30d var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-pink-600{--tw-gradient-to: rgb(214 31 105 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #D61F69 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-purple-600{--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #7E3AF2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-red-300{--tw-gradient-to: rgb(248 180 180 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #F8B4B4 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-red-600{--tw-gradient-to: rgb(224 36 36 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #E02424 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-teal-600{--tw-gradient-to: rgb(4 116 129 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #047481 var(--tw-gradient-via-position), var(--tw-gradient-to)}.\\!to-blue-400{--tw-gradient-to: #76A9FA var(--tw-gradient-to-position) !important}.\\!to-emerald-400{--tw-gradient-to: #34d399 var(--tw-gradient-to-position) !important}.\\!to-pink-400{--tw-gradient-to: #F17EB8 var(--tw-gradient-to-position) !important}.to-blue-500{--tw-gradient-to: #3F83F8 var(--tw-gradient-to-position)}.to-blue-600{--tw-gradient-to: #1C64F2 var(--tw-gradient-to-position)}.to-blue-700{--tw-gradient-to: #1A56DB var(--tw-gradient-to-position)}.to-cyan-700{--tw-gradient-to: #0e7490 var(--tw-gradient-to-position)}.to-green-700{--tw-gradient-to: #046C4E var(--tw-gradient-to-position)}.to-lime-200{--tw-gradient-to: #d9f99d var(--tw-gradient-to-position)}.to-lime-300{--tw-gradient-to: #bef264 var(--tw-gradient-to-position)}.to-lime-700{--tw-gradient-to: #4d7c0f var(--tw-gradient-to-position)}.to-orange-400{--tw-gradient-to: #FF8A4C var(--tw-gradient-to-position)}.to-pink-500{--tw-gradient-to: #E74694 var(--tw-gradient-to-position)}.to-pink-700{--tw-gradient-to: #BF125D var(--tw-gradient-to-position)}.to-purple-700{--tw-gradient-to: #6C2BD9 var(--tw-gradient-to-position)}.to-red-700{--tw-gradient-to: #C81E1E var(--tw-gradient-to-position)}.to-teal-700{--tw-gradient-to: #036672 var(--tw-gradient-to-position)}.to-yellow-200{--tw-gradient-to: #FCE96A var(--tw-gradient-to-position)}.\\!to-30\\%{--tw-gradient-to-position: 30% !important}.\\!to-40\\%{--tw-gradient-to-position: 40% !important}.\\!to-60\\%{--tw-gradient-to-position: 60% !important}.\\!bg-clip-text{-webkit-background-clip:text!important;background-clip:text!important}.bg-repeat{background-repeat:repeat}.\\!fill-fuchsia-400{fill:#e879f9!important}.\\!fill-indigo-400{fill:#8da2fb!important}.\\!fill-teal-400{fill:#16bdca!important}.fill-blue-600{fill:#1c64f2}.fill-gray-300{fill:#d1d5db}.fill-gray-400{fill:#9ca3af}.fill-gray-600{fill:#4b5563}.fill-green-500{fill:#0e9f6e}.fill-pink-600{fill:#d61f69}.fill-purple-600{fill:#7e3af2}.fill-red-600{fill:#e02424}.fill-white{fill:#fff}.fill-yellow-400{fill:#e3a008}.\\!stroke-primary-500{stroke:#8365ed!important}.stroke-green-500{stroke:#0e9f6e}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0{padding-top:0;padding-bottom:0}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-6{padding-bottom:1.5rem}.pl-10{padding-left:2.5rem}.pl-2{padding-left:.5rem}.pl-2\\.5{padding-left:.625rem}.pl-3{padding-left:.75rem}.pr-4{padding-right:1rem}.pt-0{padding-top:0}.pt-2{padding-top:.5rem}.pt-4{padding-top:1rem}.pt-5{padding-top:1.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-extralight{font-weight:200}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.font-thin{font-weight:100}.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}.normal-case{text-transform:none}.italic{font-style:italic}.not-italic{font-style:normal}.normal-nums{font-variant-numeric:normal}.ordinal{--tw-ordinal: ordinal;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.slashed-zero{--tw-slashed-zero: slashed-zero;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.lining-nums{--tw-numeric-figure: lining-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.oldstyle-nums{--tw-numeric-figure: oldstyle-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.proportional-nums{--tw-numeric-spacing: proportional-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.diagonal-fractions{--tw-numeric-fraction: diagonal-fractions;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.leading-6{line-height:1.5rem}.leading-9{line-height:2.25rem}.leading-loose{line-height:2}.leading-none{line-height:1}.leading-normal{line-height:1.5}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-.025em}.\\!text-primary-500{--tw-text-opacity: 1 !important;color:rgb(131 101 237 / var(--tw-text-opacity))!important}.\\!text-transparent{color:transparent!important}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-blue-100{--tw-text-opacity: 1;color:rgb(225 239 254 / var(--tw-text-opacity))}.text-blue-400{--tw-text-opacity: 1;color:rgb(118 169 250 / var(--tw-text-opacity))}.text-blue-500{--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}.text-blue-600{--tw-text-opacity: 1;color:rgb(28 100 242 / var(--tw-text-opacity))}.text-blue-700{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.text-blue-800{--tw-text-opacity: 1;color:rgb(30 66 159 / var(--tw-text-opacity))}.text-blue-900{--tw-text-opacity: 1;color:rgb(35 56 118 / var(--tw-text-opacity))}.text-gray-200{--tw-text-opacity: 1;color:rgb(229 231 235 / var(--tw-text-opacity))}.text-gray-300{--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-200{--tw-text-opacity: 1;color:rgb(188 240 218 / var(--tw-text-opacity))}.text-green-400{--tw-text-opacity: 1;color:rgb(49 196 141 / var(--tw-text-opacity))}.text-green-500{--tw-text-opacity: 1;color:rgb(14 159 110 / var(--tw-text-opacity))}.text-green-600{--tw-text-opacity: 1;color:rgb(5 122 85 / var(--tw-text-opacity))}.text-green-700{--tw-text-opacity: 1;color:rgb(4 108 78 / var(--tw-text-opacity))}.text-green-800{--tw-text-opacity: 1;color:rgb(3 84 63 / var(--tw-text-opacity))}.text-green-900{--tw-text-opacity: 1;color:rgb(1 71 55 / var(--tw-text-opacity))}.text-indigo-500{--tw-text-opacity: 1;color:rgb(104 117 245 / var(--tw-text-opacity))}.text-indigo-700{--tw-text-opacity: 1;color:rgb(81 69 205 / var(--tw-text-opacity))}.text-indigo-800{--tw-text-opacity: 1;color:rgb(66 56 157 / var(--tw-text-opacity))}.text-indigo-900{--tw-text-opacity: 1;color:rgb(54 47 120 / var(--tw-text-opacity))}.text-orange-200{--tw-text-opacity: 1;color:rgb(252 217 189 / var(--tw-text-opacity))}.text-orange-500{--tw-text-opacity: 1;color:rgb(255 90 31 / var(--tw-text-opacity))}.text-orange-800{--tw-text-opacity: 1;color:rgb(138 44 13 / var(--tw-text-opacity))}.text-pink-500{--tw-text-opacity: 1;color:rgb(231 70 148 / var(--tw-text-opacity))}.text-pink-600{--tw-text-opacity: 1;color:rgb(214 31 105 / var(--tw-text-opacity))}.text-pink-700{--tw-text-opacity: 1;color:rgb(191 18 93 / var(--tw-text-opacity))}.text-pink-800{--tw-text-opacity: 1;color:rgb(153 21 75 / var(--tw-text-opacity))}.text-pink-900{--tw-text-opacity: 1;color:rgb(117 26 61 / var(--tw-text-opacity))}.text-primary-600{--tw-text-opacity: 1;color:rgb(110 65 226 / var(--tw-text-opacity))}.text-purple-500{--tw-text-opacity: 1;color:rgb(144 97 249 / var(--tw-text-opacity))}.text-purple-600{--tw-text-opacity: 1;color:rgb(126 58 242 / var(--tw-text-opacity))}.text-purple-700{--tw-text-opacity: 1;color:rgb(108 43 217 / var(--tw-text-opacity))}.text-purple-800{--tw-text-opacity: 1;color:rgb(85 33 181 / var(--tw-text-opacity))}.text-purple-900{--tw-text-opacity: 1;color:rgb(74 29 150 / var(--tw-text-opacity))}.text-red-200{--tw-text-opacity: 1;color:rgb(251 213 213 / var(--tw-text-opacity))}.text-red-400{--tw-text-opacity: 1;color:rgb(249 128 128 / var(--tw-text-opacity))}.text-red-500{--tw-text-opacity: 1;color:rgb(240 82 82 / var(--tw-text-opacity))}.text-red-600{--tw-text-opacity: 1;color:rgb(224 36 36 / var(--tw-text-opacity))}.text-red-700{--tw-text-opacity: 1;color:rgb(200 30 30 / var(--tw-text-opacity))}.text-red-800{--tw-text-opacity: 1;color:rgb(155 28 28 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-yellow-300{--tw-text-opacity: 1;color:rgb(250 202 21 / var(--tw-text-opacity))}.text-yellow-400{--tw-text-opacity: 1;color:rgb(227 160 8 / var(--tw-text-opacity))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(194 120 3 / var(--tw-text-opacity))}.text-yellow-700{--tw-text-opacity: 1;color:rgb(142 75 16 / var(--tw-text-opacity))}.text-yellow-800{--tw-text-opacity: 1;color:rgb(114 59 19 / var(--tw-text-opacity))}.text-yellow-900{--tw-text-opacity: 1;color:rgb(99 49 18 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.overline{text-decoration-line:overline}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.placeholder-green-700::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(4 108 78 / var(--tw-placeholder-opacity))}.placeholder-green-700::placeholder{--tw-placeholder-opacity: 1;color:rgb(4 108 78 / var(--tw-placeholder-opacity))}.placeholder-red-700::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(200 30 30 / var(--tw-placeholder-opacity))}.placeholder-red-700::placeholder{--tw-placeholder-opacity: 1;color:rgb(200 30 30 / var(--tw-placeholder-opacity))}.\\!opacity-100{opacity:1!important}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-blue-500\\/50{--tw-shadow-color: rgb(63 131 248 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-blue-800\\/80{--tw-shadow-color: rgb(30 66 159 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-500\\/50{--tw-shadow-color: rgb(6 182 212 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-800\\/80{--tw-shadow-color: rgb(21 94 117 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-green-500\\/50{--tw-shadow-color: rgb(14 159 110 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-green-800\\/80{--tw-shadow-color: rgb(3 84 63 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-lime-500\\/50{--tw-shadow-color: rgb(132 204 22 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-lime-800\\/80{--tw-shadow-color: rgb(63 98 18 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-pink-500\\/50{--tw-shadow-color: rgb(231 70 148 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-pink-800\\/80{--tw-shadow-color: rgb(153 21 75 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-purple-500\\/50{--tw-shadow-color: rgb(144 97 249 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-purple-800\\/80{--tw-shadow-color: rgb(85 33 181 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-red-500\\/50{--tw-shadow-color: rgb(240 82 82 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-red-800\\/80{--tw-shadow-color: rgb(155 28 28 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-teal-500\\/50{--tw-shadow-color: rgb(6 148 162 / .5);--tw-shadow: var(--tw-shadow-colored)}.outline{outline-style:solid}.ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-8{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-inset{--tw-ring-inset: inset}.ring-blue-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity))}.ring-blue-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}.ring-cyan-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(21 94 117 / var(--tw-ring-opacity))}.ring-gray-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))}.ring-gray-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(31 41 55 / var(--tw-ring-opacity))}.ring-green-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(49 196 141 / var(--tw-ring-opacity))}.ring-green-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}.ring-pink-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(153 21 75 / var(--tw-ring-opacity))}.ring-pink-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(117 26 61 / var(--tw-ring-opacity))}.ring-purple-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}.ring-purple-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(74 29 150 / var(--tw-ring-opacity))}.ring-red-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}.ring-red-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(119 29 29 / var(--tw-ring-opacity))}.ring-white{--tw-ring-opacity: 1;--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.grayscale{--tw-grayscale: grayscale(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.invert{--tw-invert: invert(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.sepia{--tw-sepia: sepia(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur: blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-grayscale{--tw-backdrop-grayscale: grayscale(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-invert{--tw-backdrop-invert: invert(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-sepia{--tw-backdrop-sepia: sepia(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300{transition-duration:.3s}.duration-700{transition-duration:.7s}.duration-75{transition-duration:75ms}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.pause{animation-play-state:paused}.fade-enter-active{transition:opacity .8s ease}.fade-enter-from{opacity:0}.fade-leave-active{display:none}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:left-\\[2px\\]:after{content:var(--tw-content);left:2px}.after\\:left-\\[4px\\]:after{content:var(--tw-content);left:4px}.after\\:start-\\[2px\\]:after{content:var(--tw-content);inset-inline-start:2px}.after\\:top-0:after{content:var(--tw-content);top:0}.after\\:top-0\\.5:after{content:var(--tw-content);top:.125rem}.after\\:top-\\[2px\\]:after{content:var(--tw-content);top:2px}.after\\:h-4:after{content:var(--tw-content);height:1rem}.after\\:h-5:after{content:var(--tw-content);height:1.25rem}.after\\:h-6:after{content:var(--tw-content);height:1.5rem}.after\\:w-4:after{content:var(--tw-content);width:1rem}.after\\:w-5:after{content:var(--tw-content);width:1.25rem}.after\\:w-6:after{content:var(--tw-content);width:1.5rem}.after\\:rounded-full:after{content:var(--tw-content);border-radius:9999px}.after\\:border:after{content:var(--tw-content);border-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.after\\:bg-white:after{content:var(--tw-content);--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.after\\:transition-all:after{content:var(--tw-content);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.after\\:content-\\[\\"\\"\\]:after{--tw-content: "";content:var(--tw-content)}.after\\:content-\\[\\'\\'\\]:after{--tw-content: "";content:var(--tw-content)}.first\\:mr-3:first-child{margin-right:.75rem}.first\\:whitespace-nowrap:first-child{white-space:nowrap}.first\\:rounded-l:first-child{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.first\\:rounded-l-lg:first-child{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.first\\:font-medium:first-child{font-weight:500}.first\\:text-gray-900:first-child{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.last\\:mr-0:last-child{margin-right:0}.last\\:rounded-r:last-child{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.last\\:rounded-r-lg:last-child{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.last\\:text-right:last-child{text-align:right}.odd\\:bg-gray-50:nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.odd\\:bg-white:nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.even\\:bg-gray-50:nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.even\\:bg-white:nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:border-gray-300:hover{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.hover\\:border-transparent:hover{border-color:transparent}.hover\\:\\!bg-primary-800:hover{--tw-bg-opacity: 1 !important;background-color:rgb(81 42 173 / var(--tw-bg-opacity))!important}.hover\\:bg-blue-100:hover{--tw-bg-opacity: 1;background-color:rgb(225 239 254 / var(--tw-bg-opacity))}.hover\\:bg-blue-200:hover{--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}.hover\\:bg-blue-800:hover{--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.hover\\:bg-gray-50:hover{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.hover\\:bg-gray-600:hover{--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}.hover\\:bg-gray-900:hover{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.hover\\:bg-green-200:hover{--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}.hover\\:bg-green-800:hover{--tw-bg-opacity: 1;background-color:rgb(3 84 63 / var(--tw-bg-opacity))}.hover\\:bg-pink-800:hover{--tw-bg-opacity: 1;background-color:rgb(153 21 75 / var(--tw-bg-opacity))}.hover\\:bg-primary-700:hover{--tw-bg-opacity: 1;background-color:rgb(97 50 207 / var(--tw-bg-opacity))}.hover\\:bg-purple-800:hover{--tw-bg-opacity: 1;background-color:rgb(85 33 181 / var(--tw-bg-opacity))}.hover\\:bg-red-200:hover{--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}.hover\\:bg-red-800:hover{--tw-bg-opacity: 1;background-color:rgb(155 28 28 / var(--tw-bg-opacity))}.hover\\:bg-white:hover{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:bg-yellow-200:hover{--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}.hover\\:bg-yellow-500:hover{--tw-bg-opacity: 1;background-color:rgb(194 120 3 / var(--tw-bg-opacity))}.hover\\:bg-gradient-to-bl:hover{background-image:linear-gradient(to bottom left,var(--tw-gradient-stops))}.hover\\:bg-gradient-to-br:hover{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.hover\\:bg-gradient-to-l:hover{background-image:linear-gradient(to left,var(--tw-gradient-stops))}.hover\\:from-teal-200:hover{--tw-gradient-from: #AFECEF var(--tw-gradient-from-position);--tw-gradient-to: rgb(175 236 239 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.hover\\:to-lime-200:hover{--tw-gradient-to: #d9f99d var(--tw-gradient-to-position)}.hover\\:text-black:hover{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.hover\\:text-blue-600:hover{--tw-text-opacity: 1;color:rgb(28 100 242 / var(--tw-text-opacity))}.hover\\:text-blue-700:hover{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.hover\\:text-gray-600:hover{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}.hover\\:text-gray-700:hover{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.hover\\:text-gray-900:hover{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.hover\\:text-white:hover{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:opacity-100:hover{opacity:1}.focus\\:z-10:focus{z-index:10}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}.focus\\:border-gray-200:focus{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity))}.focus\\:border-green-500:focus{--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}.focus\\:border-primary-500:focus{--tw-border-opacity: 1;border-color:rgb(131 101 237 / var(--tw-border-opacity))}.focus\\:border-red-500:focus{--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}.focus\\:text-blue-700:focus{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-0:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-4:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:\\!ring-primary-300:focus{--tw-ring-opacity: 1 !important;--tw-ring-color: rgb(192 185 249 / var(--tw-ring-opacity)) !important}.focus\\:ring-blue-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}.focus\\:ring-blue-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity))}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))}.focus\\:ring-blue-700:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(26 86 219 / var(--tw-ring-opacity))}.focus\\:ring-cyan-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(165 243 252 / var(--tw-ring-opacity))}.focus\\:ring-cyan-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(103 232 249 / var(--tw-ring-opacity))}.focus\\:ring-gray-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(229 231 235 / var(--tw-ring-opacity))}.focus\\:ring-gray-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))}.focus\\:ring-gray-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity))}.focus\\:ring-green-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(188 240 218 / var(--tw-ring-opacity))}.focus\\:ring-green-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))}.focus\\:ring-green-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(49 196 141 / var(--tw-ring-opacity))}.focus\\:ring-green-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(14 159 110 / var(--tw-ring-opacity))}.focus\\:ring-lime-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(217 249 157 / var(--tw-ring-opacity))}.focus\\:ring-lime-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(190 242 100 / var(--tw-ring-opacity))}.focus\\:ring-pink-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 209 232 / var(--tw-ring-opacity))}.focus\\:ring-pink-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 217 / var(--tw-ring-opacity))}.focus\\:ring-primary-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(131 101 237 / var(--tw-ring-opacity))}.focus\\:ring-purple-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(220 215 254 / var(--tw-ring-opacity))}.focus\\:ring-purple-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))}.focus\\:ring-red-100:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(253 232 232 / var(--tw-ring-opacity))}.focus\\:ring-red-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))}.focus\\:ring-red-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}.focus\\:ring-red-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(240 82 82 / var(--tw-ring-opacity))}.focus\\:ring-teal-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))}.focus\\:ring-yellow-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))}.focus\\:ring-yellow-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(227 160 8 / var(--tw-ring-opacity))}.group:hover .group-hover\\:bg-white\\/50{background-color:#ffffff80}.group:hover .group-hover\\:bg-opacity-0{--tw-bg-opacity: 0}.group:hover .group-hover\\:from-cyan-500{--tw-gradient-from: #06b6d4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-green-400{--tw-gradient-from: #31C48D var(--tw-gradient-from-position);--tw-gradient-to: rgb(49 196 141 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-pink-500{--tw-gradient-from: #E74694 var(--tw-gradient-from-position);--tw-gradient-to: rgb(231 70 148 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-purple-500{--tw-gradient-from: #9061F9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(144 97 249 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-purple-600{--tw-gradient-from: #7E3AF2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-red-200{--tw-gradient-from: #FBD5D5 var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 213 213 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-teal-300{--tw-gradient-from: #7EDCE2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 220 226 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:via-red-300{--tw-gradient-to: rgb(248 180 180 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #F8B4B4 var(--tw-gradient-via-position), var(--tw-gradient-to)}.group:hover .group-hover\\:to-blue-500{--tw-gradient-to: #3F83F8 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-blue-600{--tw-gradient-to: #1C64F2 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-lime-300{--tw-gradient-to: #bef264 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-orange-400{--tw-gradient-to: #FF8A4C var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-pink-500{--tw-gradient-to: #E74694 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-yellow-200{--tw-gradient-to: #FCE96A var(--tw-gradient-to-position)}.group:hover .group-hover\\:fill-gray-900{fill:#111827}.group:hover .group-hover\\:text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.group:hover .group-hover\\:text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.group:focus .group-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.group:focus .group-focus\\:ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.group:focus .group-focus\\:ring-white{--tw-ring-opacity: 1;--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))}.peer:checked~.peer-checked\\:bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-green-600{--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-orange-500{--tw-bg-opacity: 1;background-color:rgb(255 90 31 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-primary-100{--tw-bg-opacity: 1;background-color:rgb(236 234 253 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-primary-600{--tw-bg-opacity: 1;background-color:rgb(110 65 226 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-purple-600{--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-red-600{--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-teal-600{--tw-bg-opacity: 1;background-color:rgb(4 116 129 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-yellow-400{--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:font-semibold{font-weight:600}.peer:checked~.peer-checked\\:text-primary{--tw-text-opacity: 1;color:rgb(110 65 226 / var(--tw-text-opacity))}.peer:checked~.peer-checked\\:after\\:translate-x-full:after{content:var(--tw-content);--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\\:after\\:border-white:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.peer:focus~.peer-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-blue-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-green-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-orange-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(253 186 140 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-purple-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-red-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-teal-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-yellow-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))}:is(.dark .dark\\:divide-gray-700)>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(55 65 81 / var(--tw-divide-opacity))}:is(.dark .dark\\:border-blue-500){--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-500){--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-600){--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-700){--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-800){--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-900){--tw-border-opacity: 1;border-color:rgb(17 24 39 / var(--tw-border-opacity))}:is(.dark .dark\\:border-green-500){--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}:is(.dark .dark\\:border-pink-400){--tw-border-opacity: 1;border-color:rgb(241 126 184 / var(--tw-border-opacity))}:is(.dark .dark\\:border-pink-500){--tw-border-opacity: 1;border-color:rgb(231 70 148 / var(--tw-border-opacity))}:is(.dark .dark\\:border-purple-400){--tw-border-opacity: 1;border-color:rgb(172 148 250 / var(--tw-border-opacity))}:is(.dark .dark\\:border-purple-500){--tw-border-opacity: 1;border-color:rgb(144 97 249 / var(--tw-border-opacity))}:is(.dark .dark\\:border-red-500){--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}:is(.dark .dark\\:border-transparent){border-color:transparent}:is(.dark .dark\\:border-yellow-300){--tw-border-opacity: 1;border-color:rgb(250 202 21 / var(--tw-border-opacity))}:is(.dark .dark\\:\\!bg-primary-600){--tw-bg-opacity: 1 !important;background-color:rgb(110 65 226 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:\\!bg-primary-700){--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:bg-blue-200){--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-blue-600){--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-blue-900){--tw-bg-opacity: 1;background-color:rgb(35 56 118 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-300){--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-400){--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-600){--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-700){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-800){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-800\\/30){background-color:#1f29374d}:is(.dark .dark\\:bg-gray-800\\/50){background-color:#1f293780}:is(.dark .dark\\:bg-gray-900){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-900\\/80){background-color:#111827cc}:is(.dark .dark\\:bg-green-200){--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-500){--tw-bg-opacity: 1;background-color:rgb(14 159 110 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-600){--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-800){--tw-bg-opacity: 1;background-color:rgb(3 84 63 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-indigo-200){--tw-bg-opacity: 1;background-color:rgb(205 219 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-indigo-500){--tw-bg-opacity: 1;background-color:rgb(104 117 245 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-orange-200){--tw-bg-opacity: 1;background-color:rgb(252 217 189 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-orange-700){--tw-bg-opacity: 1;background-color:rgb(180 52 3 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-pink-200){--tw-bg-opacity: 1;background-color:rgb(250 209 232 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-pink-600){--tw-bg-opacity: 1;background-color:rgb(214 31 105 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-200){--tw-bg-opacity: 1;background-color:rgb(220 215 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-500){--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-600){--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-200){--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-500){--tw-bg-opacity: 1;background-color:rgb(240 82 82 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-600){--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-800){--tw-bg-opacity: 1;background-color:rgb(155 28 28 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-transparent){background-color:transparent}:is(.dark .dark\\:bg-yellow-200){--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-opacity-80){--tw-bg-opacity: .8}:is(.dark .dark\\:fill-gray-300){fill:#d1d5db}:is(.dark .dark\\:text-blue-400){--tw-text-opacity: 1;color:rgb(118 169 250 / var(--tw-text-opacity))}:is(.dark .dark\\:text-blue-500){--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}:is(.dark .dark\\:text-blue-800){--tw-text-opacity: 1;color:rgb(30 66 159 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-300){--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-400){--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-500){--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-600){--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-800){--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-200){--tw-text-opacity: 1;color:rgb(188 240 218 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-400){--tw-text-opacity: 1;color:rgb(49 196 141 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-500){--tw-text-opacity: 1;color:rgb(14 159 110 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-900){--tw-text-opacity: 1;color:rgb(1 71 55 / var(--tw-text-opacity))}:is(.dark .dark\\:text-indigo-500){--tw-text-opacity: 1;color:rgb(104 117 245 / var(--tw-text-opacity))}:is(.dark .dark\\:text-indigo-900){--tw-text-opacity: 1;color:rgb(54 47 120 / var(--tw-text-opacity))}:is(.dark .dark\\:text-orange-200){--tw-text-opacity: 1;color:rgb(252 217 189 / var(--tw-text-opacity))}:is(.dark .dark\\:text-orange-900){--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-400){--tw-text-opacity: 1;color:rgb(241 126 184 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-500){--tw-text-opacity: 1;color:rgb(231 70 148 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-900){--tw-text-opacity: 1;color:rgb(117 26 61 / var(--tw-text-opacity))}:is(.dark .dark\\:text-primary-500){--tw-text-opacity: 1;color:rgb(131 101 237 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-400){--tw-text-opacity: 1;color:rgb(172 148 250 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-500){--tw-text-opacity: 1;color:rgb(144 97 249 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-900){--tw-text-opacity: 1;color:rgb(74 29 150 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-200){--tw-text-opacity: 1;color:rgb(251 213 213 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-400){--tw-text-opacity: 1;color:rgb(249 128 128 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-500){--tw-text-opacity: 1;color:rgb(240 82 82 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-900){--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}:is(.dark .dark\\:text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-300){--tw-text-opacity: 1;color:rgb(250 202 21 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-400){--tw-text-opacity: 1;color:rgb(227 160 8 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-500){--tw-text-opacity: 1;color:rgb(194 120 3 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-900){--tw-text-opacity: 1;color:rgb(99 49 18 / var(--tw-text-opacity))}:is(.dark .dark\\:placeholder-gray-400)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-gray-400)::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-green-500)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(14 159 110 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-green-500)::placeholder{--tw-placeholder-opacity: 1;color:rgb(14 159 110 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-red-500)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(240 82 82 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-red-500)::placeholder{--tw-placeholder-opacity: 1;color:rgb(240 82 82 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:shadow-lg){--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:is(.dark .dark\\:shadow-blue-800\\/80){--tw-shadow-color: rgb(30 66 159 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-cyan-800\\/80){--tw-shadow-color: rgb(21 94 117 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-green-800\\/80){--tw-shadow-color: rgb(3 84 63 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-lime-800\\/80){--tw-shadow-color: rgb(63 98 18 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-pink-800\\/80){--tw-shadow-color: rgb(153 21 75 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-purple-800\\/80){--tw-shadow-color: rgb(85 33 181 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-red-800\\/80){--tw-shadow-color: rgb(155 28 28 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-teal-800\\/80){--tw-shadow-color: rgb(5 80 92 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:ring-gray-500){--tw-ring-opacity: 1;--tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:ring-gray-900){--tw-ring-opacity: 1;--tw-ring-color: rgb(17 24 39 / var(--tw-ring-opacity))}:is(.dark .dark\\:ring-offset-gray-800){--tw-ring-offset-color: #1F2937}:is(.dark .first\\:dark\\:text-white):first-child{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .odd\\:dark\\:bg-gray-800):nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .even\\:dark\\:bg-gray-700):nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .even\\:dark\\:bg-gray-900):nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:border-gray-500:hover){--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}:is(.dark .dark\\:hover\\:border-gray-600:hover){--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}:is(.dark .dark\\:hover\\:\\!bg-primary-700:hover){--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:hover\\:bg-blue-300:hover){--tw-bg-opacity: 1;background-color:rgb(164 202 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-600:hover){--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-700:hover){--tw-bg-opacity: 1;background-color:rgb(26 86 219 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-800:hover){--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-600:hover){--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-700:hover){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-800:hover){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-green-600:hover){--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-green-700:hover){--tw-bg-opacity: 1;background-color:rgb(4 108 78 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-pink-500:hover){--tw-bg-opacity: 1;background-color:rgb(231 70 148 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-pink-700:hover){--tw-bg-opacity: 1;background-color:rgb(191 18 93 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-purple-500:hover){--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-purple-700:hover){--tw-bg-opacity: 1;background-color:rgb(108 43 217 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-red-600:hover){--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-red-700:hover){--tw-bg-opacity: 1;background-color:rgb(200 30 30 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-yellow-400:hover){--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:text-blue-500:hover){--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-gray-300:hover){--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-gray-900:hover){--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-white:hover){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:focus\\:border-blue-500:focus){--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}:is(.dark .dark\\:focus\\:border-primary-500:focus){--tw-border-opacity: 1;border-color:rgb(131 101 237 / var(--tw-border-opacity))}:is(.dark .dark\\:focus\\:text-white:focus){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:focus\\:ring-blue-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-blue-600:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(28 100 242 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-blue-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-cyan-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(21 94 117 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-600:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-700:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(55 65 81 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(31 41 55 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-green-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-lime-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(63 98 18 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-pink-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(153 21 75 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-pink-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(117 26 61 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-primary-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(131 101 237 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-primary-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(69 36 142 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-purple-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-purple-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(74 29 150 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-400:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(119 29 29 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-teal-700:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 102 114 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-teal-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-yellow-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(99 49 18 / var(--tw-ring-opacity))}:is(.dark .group:hover .dark\\:group-hover\\:bg-gray-800\\/60){background-color:#1f293799}:is(.dark .group:hover .dark\\:group-hover\\:text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .group:focus .dark\\:group-focus\\:ring-gray-800\\/70){--tw-ring-color: rgb(31 41 55 / .7)}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-blue-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-green-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-orange-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(138 44 13 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-purple-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-red-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-teal-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-yellow-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(114 59 19 / var(--tw-ring-opacity))}@media (min-width: 640px){.sm\\:mb-0{margin-bottom:0}.sm\\:mt-0{margin-top:0}.sm\\:flex{display:flex}.sm\\:hidden{display:none}.sm\\:h-10{height:2.5rem}.sm\\:h-6{height:1.5rem}.sm\\:h-64{height:16rem}.sm\\:h-7{height:1.75rem}.sm\\:w-1\\/4{width:25%}.sm\\:w-10{width:2.5rem}.sm\\:w-6{width:1.5rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:rounded-lg{border-radius:.5rem}.sm\\:p-6{padding:1.5rem}.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:pr-8{padding-right:2rem}.sm\\:text-center{text-align:center}}@media (min-width: 768px){.md\\:inset-0{top:0;right:0;bottom:0;left:0}.md\\:order-2{order:2}.md\\:mb-0{margin-bottom:0}.md\\:mr-6{margin-right:1.5rem}.md\\:mt-0{margin-top:0}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:h-auto{height:auto}.md\\:h-full{height:100%}.md\\:w-1\\/4{width:25%}.md\\:w-48{width:12rem}.md\\:w-auto{width:auto}.md\\:max-w-xl{max-width:36rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:items-center{align-items:center}.md\\:justify-between{justify-content:space-between}.md\\:space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.md\\:space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}.md\\:rounded-none{border-radius:0}.md\\:rounded-l-lg{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.md\\:border-0{border-width:0px}.md\\:bg-transparent{background-color:transparent}.md\\:p-0{padding:0}.md\\:p-6{padding:1.5rem}.md\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.md\\:py-8{padding-top:2rem;padding-bottom:2rem}.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:text-sm{font-size:.875rem;line-height:1.25rem}.md\\:font-medium{font-weight:500}.md\\:text-blue-700{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.md\\:hover\\:bg-transparent:hover{background-color:transparent}.md\\:hover\\:text-blue-700:hover{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}:is(.dark .md\\:dark\\:bg-gray-900){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .md\\:dark\\:hover\\:bg-transparent:hover){background-color:transparent}:is(.dark .md\\:dark\\:hover\\:text-white:hover){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}}@media (min-width: 1024px){.lg\\:mb-12{margin-bottom:3rem}.lg\\:mb-2{margin-bottom:.5rem}.lg\\:ms-2{margin-inline-start:.5rem}.lg\\:mt-16{margin-top:4rem}.lg\\:mt-6{margin-top:1.5rem}.lg\\:mt-\\[3px\\]{margin-top:3px}.lg\\:inline-block{display:inline-block}.lg\\:inline{display:inline}.lg\\:flex{display:flex}.lg\\:grid{display:grid}.lg\\:hidden{display:none}.lg\\:w-full{width:100%}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:justify-between{justify-content:space-between}.lg\\:gap-0{gap:0px}.lg\\:gap-4{gap:1rem}.lg\\:divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 0;border-right-width:calc(1px * var(--tw-divide-x-reverse));border-left-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}.lg\\:divide-y-0>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(0px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(0px * var(--tw-divide-y-reverse))}.lg\\:p-8{padding:2rem}.lg\\:px-16{padding-left:4rem;padding-right:4rem}.lg\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:py-16{padding-top:4rem;padding-bottom:4rem}.lg\\:py-3{padding-top:.75rem;padding-bottom:.75rem}.lg\\:text-2xl{font-size:1.5rem;line-height:2rem}.lg\\:text-3xl{font-size:1.875rem;line-height:2.25rem}.lg\\:text-5xl{font-size:3rem;line-height:1}.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:h-80{height:20rem}.xl\\:w-1\\/6{width:16.666667%}}@media (min-width: 1536px){.\\32xl\\:h-96{height:24rem}}.rtl\\:rotate-180:where([dir=rtl],[dir=rtl] *){--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:space-x-reverse:where([dir=rtl],[dir=rtl] *)>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 1}.peer:checked~.rtl\\:peer-checked\\:after\\:-translate-x-full:where([dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\[\\&\\:not\\(\\:last-child\\)\\]\\:border-b:not(:last-child){border-bottom-width:1px}:is(.dark .\\[\\&\\:not\\(\\:last-child\\)\\]\\:dark\\:border-gray-700):not(:last-child){--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}`, ld = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, i] of e)
    r[o] = i;
  return r;
}, cd = { class: "bg-white dark:bg-gray-900" }, dd = { class: "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" }, pd = /* @__PURE__ */ c("div", { class: "mx-auto max-w-screen-md text-center mb-8 lg:mb-12" }, [
  /* @__PURE__ */ c("h2", { class: "mb-4 text-3xl lg:text-5xl tracking-tight font-bold text-gray-900 dark:text-white" }, " Activepieces Pricing ")
], -1), gd = { class: "flex flex-col gap-6 lg:gap-0 lg:flex-row lg:justify-between items-center mb-10 mt-8 lg:mt-16 w-full" }, ud = { class: "flex flex-row gap-3 items-center" }, fd = /* @__PURE__ */ c("p", { class: "hidden lg:inline-block ml-2 text-xl text-gray-500" }, "Your plan:", -1), hd = {
  class: "text-sm font-medium text-center text-gray-500 flex flex-row gap-2",
  id: "pricingTabsParent",
  role: "tablist"
}, wd = {
  class: "lg:w-full",
  role: "presentation"
}, vd = /* @__PURE__ */ c("path", { d: "M240-120q-66 0-113-47T80-280q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm480 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm-480-80q33 0 56.5-23.5T320-280q0-33-23.5-56.5T240-360q-33 0-56.5 23.5T160-280q0 33 23.5 56.5T240-200Zm480 0q33 0 56.5-23.5T800-280q0-33-23.5-56.5T720-360q-33 0-56.5 23.5T640-280q0 33 23.5 56.5T720-200ZM480-520q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-680q0-33-23.5-56.5T480-760q-33 0-56.5 23.5T400-680q0 33 23.5 56.5T480-600Zm0-80Zm240 400Zm-480 0Z" }, null, -1), bd = [
  vd
], md = /* @__PURE__ */ c("span", null, "Automate", -1), yd = {
  class: "lg:w-full",
  role: "presentation"
}, xd = /* @__PURE__ */ c("path", { d: "M344-336 200-480l144-144 56 57-87 87 87 87-56 57Zm272 0-56-57 87-87-87-87 56-57 144 144-144 144ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" }, null, -1), kd = [
  xd
], _d = /* @__PURE__ */ c("span", null, "Embed", -1), Ed = { class: "flex flex-col gap-1 items-end" }, Cd = {
  id: "plans-body",
  class: "bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch"
}, Ad = { id: "team-content" }, Id = { class: "mb-4 lg:mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, Ld = /* @__PURE__ */ c("span", { class: "font-light text-2xl lg:text-3xl" }, "Great for teams to automate their internal workflows.", -1), Td = { class: "grid gap-4 mt-4 lg:mt-6 sm:grid-cols-2 md:grid-cols-3 text-base justify-stretch" }, Od = /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-4 text-xl" }, [
  /* @__PURE__ */ c("span", { class: "leading-tight font-bold" }, "Pro")
], -1), Pd = { class: "flex space-x-2.5 items-center" }, Sd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), jd = [
  Sd
], Md = /* @__PURE__ */ c("span", { class: "leading-tight" }, "1 project", -1), Dd = { class: "flex space-x-2.5 items-center" }, zd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Hd = [
  zd
], Bd = /* @__PURE__ */ c("span", { class: "leading-tight" }, "1 user included", -1), Rd = { class: "flex space-x-2.5 items-center" }, Fd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Nd = [
  Fd
], Ud = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Community support", -1), Vd = /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-4 text-xl" }, [
  /* @__PURE__ */ c("span", { class: "leading-tight font-bold" }, "Enterprise")
], -1), $d = { class: "flex space-x-2.5 items-center" }, qd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Kd = [
  qd
], Wd = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Unlimited projects", -1), Yd = { class: "flex space-x-2.5 items-center" }, Xd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Gd = [
  Xd
], Zd = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Set projects limits", -1), Jd = { class: "flex space-x-2.5 items-center" }, Qd = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), tp = [
  Qd
], ep = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Single Sign On", -1), rp = { class: "flex space-x-2.5 items-center" }, op = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), ip = [
  op
], np = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Audit logs", -1), ap = { class: "flex space-x-2.5 items-center" }, sp = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), lp = [
  sp
], cp = /* @__PURE__ */ c("span", { class: "leading-tight" }, "Envs and Git sync", -1), dp = { class: "flex space-x-2.5 items-center" }, pp = /* @__PURE__ */ c("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), gp = [
  pp
], up = /* @__PURE__ */ c("span", { class: "leading-tight" }, "5 Private pieces", -1), fp = /* @__PURE__ */ c("ul", {
  role: "list",
  class: "space-y-3 dark:text-white p-6"
}, [
  /* @__PURE__ */ c("li", { class: "flex space-x-1 items-center mb-4 text-md" }, [
    /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 font-normal dark:text-gray-400 text-base" }, "Always included:")
  ]),
  /* @__PURE__ */ c("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ c("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ c("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
  ]),
  /* @__PURE__ */ c("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ c("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ c("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
  ]),
  /* @__PURE__ */ c("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ c("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ c("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
  ]),
  /* @__PURE__ */ c("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ c("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ c("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
  ])
], -1), hp = { id: "agency-content" }, wp = /* @__PURE__ */ c("p", { class: "mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, [
  /* @__PURE__ */ c("span", { class: "font-light text-2xl lg:text-3xl" }, "Great for agencies who work with multiple clients.")
], -1), vp = /* @__PURE__ */ c("div", { class: "flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-4 mt-4 lg:mt-6 text-base justify-stretch" }, [
  /* @__PURE__ */ c("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Branding")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom color and logo")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom domain")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ c("span", { class: "leading-tight mt-4 lg:mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Usage")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited projects")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "1 Private piece")
    ])
  ]),
  /* @__PURE__ */ c("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Management")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Manage multi projects")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Tasks limit per project")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Show/hide pieces")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Default projects language")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Debug client runs")
    ])
  ]),
  /* @__PURE__ */ c("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Everything")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
    ]),
    /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ c("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ c("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Community support")
    ])
  ])
], -1), bp = /* @__PURE__ */ c("hr", { class: "my-6" }, null, -1), mp = /* @__PURE__ */ c("option", { value: "flexible" }, "Flexible usage", -1), yp = ["value"], xp = /* @__PURE__ */ c("div", null, [
  /* @__PURE__ */ c("div", null, [
    /* @__PURE__ */ c("div", { id: "embed-content" }, [
      /* @__PURE__ */ c("p", { class: "mb-4 lg:mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, [
        /* @__PURE__ */ c("span", { class: "font-light text-2xl lg:text-3xl" }, "Great for SaaS to add in-app automation builder.")
      ]),
      /* @__PURE__ */ c("div", { class: "flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-4 mt-4 lg:mt-6 text-base justify-stretch" }, [
        /* @__PURE__ */ c("ul", {
          role: "list",
          class: "space-y-3 dark:text-white h-full"
        }, [
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
            /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Embedding")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Javascript SDK")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "JWT Single Sign On")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Full API")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
            /* @__PURE__ */ c("span", { class: "leading-tight mt-4 lg:mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Customization")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom color and logo")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Whitelabel emails")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom templates")
          ])
        ]),
        /* @__PURE__ */ c("ul", {
          role: "list",
          class: "space-y-3 dark:text-white h-full"
        }, [
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
            /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Usage")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited projects")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "2 Private pieces")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
            /* @__PURE__ */ c("span", { class: "leading-tight mt-4 lg:mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Management")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Tasks limit per project")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Show/hide pieces")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Default projects language")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Debug client runs")
          ])
        ]),
        /* @__PURE__ */ c("ul", {
          role: "list",
          class: "space-y-3 dark:text-white h-full"
        }, [
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
            /* @__PURE__ */ c("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Everything")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
          ]),
          /* @__PURE__ */ c("li", { class: "flex space-x-2.5 items-center" }, [
            /* @__PURE__ */ c("svg", {
              class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 16 12"
            }, [
              /* @__PURE__ */ c("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M1 5.917 5.724 10.5 15 1.5"
              })
            ]),
            /* @__PURE__ */ c("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Email support")
          ])
        ])
      ])
    ])
  ])
], -1), kp = [
  xp
], _p = { class: "hidden lg:flex justify-start p-6 lg:p-8 shrink-0" }, Ep = {
  id: "team-plan",
  class: "w-full"
}, Cp = { class: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white" }, Ap = {
  key: 0,
  class: "inline-flex flex-row gap-2 items-center"
}, Ip = { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, Lp = /* @__PURE__ */ c("div", { class: "text-gray-500 text-sm" }, [
  /* @__PURE__ */ Wr("per user"),
  /* @__PURE__ */ c("br"),
  /* @__PURE__ */ Wr("per month")
], -1), Tp = {
  key: 1,
  class: "inline-flex flex-row gap-2 items-center"
}, Op = { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, Pp = /* @__PURE__ */ c("div", { class: "text-gray-500 text-sm" }, "per month", -1), Sp = {
  key: 2,
  class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white"
}, jp = { class: "mb-4 font-normal text-lg text-gray-500 dark:text-gray-400" }, Mp = ["href"], Dp = { class: "text-md text-gray-500 dark:text-gray-400" }, zp = { class: "mb-2 flex flex-col content-start" }, Hp = {
  key: 0,
  "data-popover-target": "popover-extra-tasks",
  "data-popover-placement": "left"
}, Bp = { key: 1 }, Rp = { class: "flex justify-between items-center lg:hidden fixed bottom-0 left-0 z-50 bg-primary w-full py-4 px-4 text-lg text-white" }, Fp = { class: "font-bold text-base" }, Np = { class: "font-light text-sm" }, Up = ["href"], Oe = "team", Vp = "agency", tr = "embed", $p = {
  __name: "MainTable.ce",
  setup(t) {
    const e = Ce("pro"), r = Ce(!1);
    let o = Ce("cloud");
    const i = Ce(Oe), n = Ce("teamPro"), a = {
      teamPro: {
        planName: "Pro Plan",
        price: "Free",
        isPerUserPrice: !1,
        users: 1,
        tasks: 1e3,
        perExtraUserPrice: 10,
        perExtra1000TasksPrice: 1,
        quantityDiscountExists: !1,
        cta: {
          cloud: {
            label: "Start free",
            link: "https://cloud.activepieces.com/sign-up"
          },
          "self-hosted": {
            label: "View setup guide",
            link: "https://www.activepieces.com/docs/install/options/overview"
          }
        }
      },
      teamEnterprise: {
        planName: "Enterprise Plan",
        price: 99,
        isPerUserPrice: !0,
        users: 1,
        tasks: 1e3,
        perExtraUserPrice: null,
        perExtra1000TasksPrice: 1,
        quantityDiscountExists: !1,
        cta: {
          label: "Contact sales",
          link: "/sales"
        }
      },
      agency: {
        planName: "Agency Plan",
        price: 35,
        isPerUserPrice: !0,
        users: 1,
        tasks: 1e3,
        perExtraUserPrice: null,
        perExtra1000TasksPrice: 1,
        quantityDiscountExists: !1,
        cta: {
          label: "Contact sales",
          link: "/sales"
        }
      },
      embed: {
        planName: "Embed Plan",
        price: 1200,
        isPerUserPrice: !1,
        users: 25,
        tasks: 1e3,
        perExtraUserPrice: 10,
        perExtra1000TasksPrice: 1,
        quantityDiscountExists: !1,
        cta: {
          label: "Contact sales",
          link: "/sales"
        }
      }
    };
    let s = Ce({});
    const l = Ce("flexible"), p = [
      {
        users: 25,
        discount: 0.25
      },
      {
        users: 50,
        discount: 0.4
      },
      {
        users: 100,
        discount: 0.5
      },
      {
        users: 500,
        discount: 0.8
      },
      {
        users: 1e3,
        discount: 0.87
      }
    ], g = (f) => {
      o.value = f;
    };
    nr([i, e], function() {
      let f = null;
      i.value == Oe ? f = i.value + e.value.charAt(0).toUpperCase() + e.value.slice(1) : f = i.value, n.value = f;
    });
    let w = function() {
      let f = {};
      if (Object.assign(f, a[n.value]), o.value == "self-hosted" && (f.tasks = null, f.perExtra1000TasksPrice = null), n.value == "agency" && l.value != "flexible") {
        let A = Math.floor((1 - p.filter(
          (_) => _.users == l.value
        )[0].discount) * 35);
        f.price = A * l.value, f.perExtraUserPrice = A, f.users = l.value, f.isPerUserPrice = !1;
      }
      n.value == "embed" && r.value && (f.price = f.price / 2), f.cta = {
        label: typeof f.cta[o.value] < "u" ? f.cta[o.value].label : f.cta.label,
        link: typeof f.cta[o.value] < "u" ? f.cta[o.value].link : f.cta.link
      }, f.cta.link == "/sales" && (f.cta.link += "?selectedPlan=" + btoa(JSON.stringify(f))), Object.assign(s.value, f);
    };
    w(), nr([n, o, l, r], w);
    const v = (f) => f.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (f, A) => (at(), lt("section", cd, [
      c("div", dd, [
        pd,
        c("div", gd, [
          c("div", ud, [
            fd,
            c("div", null, [
              c("ul", hd, [
                c("li", wd, [
                  c("button", {
                    id: "team-tab",
                    onClick: A[0] || (A[0] = (_) => i.value = Oe),
                    role: "tab",
                    type: "button",
                    class: ot(["group inline-block py-2 lg:py-3 px-6 lg:px-8 w-full text-xl lg:text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent", {
                      "!bg-transparent !border-teal-500 ": i.value == Oe
                    }])
                  }, [
                    c("div", {
                      class: ot([{
                        "!text-transparent !bg-clip-text !bg-gradient-to-r !from-teal-400 !to-60% !to-emerald-400": i.value == Oe
                      }, "flex flex-row gap-1.5 items-center group-hover:text-gray-900"])
                    }, [
                      (at(), lt("svg", {
                        class: ot([{
                          "!fill-teal-400": i.value == Oe
                        }, "hidden lg:inline fill-gray-400 group-hover:fill-gray-900"]),
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 -960 960 960",
                        width: "24"
                      }, bd, 2)),
                      md
                    ], 2)
                  ], 2)
                ]),
                c("li", yd, [
                  c("button", {
                    class: ot([{
                      "!bg-transparent !border-indigo-500 ": i.value == tr
                    }, "group inline-block py-2 lg:py-3 px-6 lg:px-8 w-full text-xl lg:text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent"]),
                    onClick: A[1] || (A[1] = (_) => i.value = tr),
                    id: "embed-tab",
                    "data-tabs-target": "#embed-plan-tab-body",
                    role: "tab",
                    "aria-controls": "agency-plan-tab",
                    "aria-selected": "false",
                    type: "button"
                  }, [
                    c("div", {
                      class: ot([{
                        "!text-transparent !bg-clip-text !bg-gradient-to-r !from-indigo-500 !to-40% !to-blue-400": i.value == tr
                      }, "flex flex-row gap-1.5 items-center group-hover:text-gray-900"])
                    }, [
                      (at(), lt("svg", {
                        class: ot([{
                          "!fill-indigo-400": i.value == tr
                        }, "hidden lg:inline fill-gray-400 group-hover:fill-gray-900"]),
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 -960 960 960",
                        width: "24"
                      }, kd, 2)),
                      _d
                    ], 2)
                  ], 2)
                ])
              ])
            ])
          ]),
          c("div", Ed, [
            wt(ad, {
              "deployment-mode": Q(o),
              onDeploymentModeChanged: g
            }, null, 8, ["deployment-mode"])
          ])
        ]),
        c("div", Cd, [
          c("div", {
            id: "team-plan-tab-body",
            class: ot(["col-span-2 p-6 lg:p-8", { hidden: i.value !== Oe }]),
            role: "tabpanel",
            "aria-labelledby": "team-plan-tab"
          }, [
            c("div", null, [
              c("div", null, [
                c("div", Ad, [
                  c("p", Id, [
                    Ld,
                    c("div", Td, [
                      c("div", null, [
                        c("input", {
                          type: "radio",
                          id: "team-pro-plan",
                          name: "team-sub-plan",
                          value: "pro",
                          class: "hidden peer",
                          onChange: A[2] || (A[2] = () => e.value = "pro")
                        }, null, 32),
                        c("label", {
                          for: "team-pro-plan",
                          class: ot(["block border p-6 cursor-pointer border-gray-300 h-full opacity-60 hover:opacity-100", { "!border-primary-400 !opacity-100": e.value == "pro" }])
                        }, [
                          c("ul", {
                            role: "list",
                            class: ot(["space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400", { "!text-primary-500": e.value == "pro" }])
                          }, [
                            Od,
                            c("li", Pd, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, jd, 2)),
                              Md
                            ]),
                            c("li", Dd, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Hd, 2)),
                              Bd
                            ]),
                            c("li", Rd, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Nd, 2)),
                              Ud
                            ])
                          ], 2)
                        ], 2)
                      ]),
                      c("div", null, [
                        c("input", {
                          type: "radio",
                          id: "team-enterprise-plan",
                          name: "team-sub-plan",
                          value: "enterprise",
                          class: "hidden peer",
                          onChange: A[3] || (A[3] = () => e.value = "enterprise")
                        }, null, 32),
                        c("label", {
                          for: "team-enterprise-plan",
                          class: ot(["block border p-6 cursor-pointer border-gray-300 h-full opacity-60 hover:opacity-100", { "!border-primary-400 !opacity-100": e.value == "enterprise" }])
                        }, [
                          c("ul", {
                            role: "list",
                            class: ot(["space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400", { "!text-primary-500": e.value == "enterprise" }])
                          }, [
                            Vd,
                            c("li", $d, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Kd, 2)),
                              Wd
                            ]),
                            c("li", Yd, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Gd, 2)),
                              Zd
                            ]),
                            c("li", Jd, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, tp, 2)),
                              ep
                            ]),
                            c("li", rp, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, ip, 2)),
                              np
                            ]),
                            c("li", ap, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, lp, 2)),
                              cp
                            ]),
                            c("li", dp, [
                              (at(), lt("svg", {
                                class: ot(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, gp, 2)),
                              up
                            ])
                          ], 2)
                        ], 2)
                      ]),
                      fp
                    ])
                  ])
                ])
              ])
            ])
          ], 2),
          c("div", {
            id: "agency-plan-tab-body",
            class: ot(["col-span-2 p-6 lg:p-8", { hidden: i.value !== Vp }]),
            role: "tabpanel",
            "aria-labelledby": "agency-plan-tab"
          }, [
            c("div", null, [
              c("div", null, [
                c("div", hp, [
                  wp,
                  vp,
                  bp,
                  c("div", null, [
                    Wr(" Committed user seats: "),
                    kl(c("select", {
                      "onUpdate:modelValue": A[4] || (A[4] = (_) => l.value = _),
                      class: "ms-0 lg:ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }, [
                      mp,
                      (at(), lt(Pt, null, Hl(p, (_) => c("option", {
                        value: _.users
                      }, ut(_.users) + " users (" + ut(_.discount * 100) + "% off)", 9, yp)), 64))
                    ], 512), [
                      [Xc, l.value]
                    ])
                  ])
                ])
              ])
            ])
          ], 2),
          c("div", {
            id: "embed-plan-tab-body",
            class: ot(["col-span-2 p-6 lg:p-8", { hidden: i.value !== tr }]),
            role: "tabpanel",
            "aria-labelledby": "embed-plan-tab"
          }, kp, 2),
          c("div", _p, [
            c("div", Ep, [
              c("div", null, [
                c("div", Cp, ut(Q(s).planName), 1),
                Q(s).isPerUserPrice ? (at(), lt("div", Ap, [
                  c("div", Ip, "$" + ut(v(Q(s).price)), 1),
                  Lp
                ])) : Number(Q(s).price) === Q(s).price ? (at(), lt("div", Tp, [
                  c("div", Op, "$" + ut(v(Q(s).price)), 1),
                  Pp
                ])) : (at(), lt("div", Sp, ut(Q(s).price), 1)),
                c("div", jp, ut(Q(s).tasks == null ? "Unlimited tasks" : `${v(Q(s).tasks)} monthly tasks`) + ut(Q(s).users != null ? ", " + v(Q(s).users) + " " + (Q(s).users > 1 ? "users" : "user") : ""), 1),
                c("a", {
                  href: Q(s).cta.link,
                  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
                }, ut(Q(s).cta.label), 9, Mp),
                c("div", Dp, [
                  c("ul", zp, [
                    Q(s).perExtra1000TasksPrice != null ? (at(), lt("li", Hp, "$" + ut(Q(s).perExtra1000TasksPrice) + " per extra 1,000 tasks", 1)) : Wo("", !0),
                    Q(s).perExtraUserPrice != null ? (at(), lt("li", Bp, "$" + ut(Q(s).perExtraUserPrice) + " per extra user per month", 1)) : Wo("", !0)
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      c("div", Rp, [
        c("div", null, [
          c("div", Fp, ut(Q(s).planName) + " (" + ut(Number(Q(s).price) === Q(s).price ? "$" + v(Q(s).price) + (Q(s).isPerUserPrice ? " / user / mo" : " / mo") : Q(s).price) + ")", 1),
          c("div", Np, ut(Q(s).tasks == null ? "Unlimited " : v(Q(s).tasks)) + " tasks, " + ut(v(Q(s).users)) + " " + ut(Q(s).users > 1 ? "users" : "user"), 1)
        ]),
        c("a", {
          href: Q(s).cta.link,
          class: "border border-white py-1 px-3 rounded-lg text-base"
        }, ut(Q(s).cta.label), 9, Up)
      ])
    ]));
  }
}, qp = /* @__PURE__ */ ld($p, [["styles", [sd]]]);
var Kp = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = []), this._eventType = e, this._eventFunctions = r;
    }
    return t.prototype.init = function() {
      var e = this;
      this._eventFunctions.forEach(function(r) {
        typeof window < "u" && window.addEventListener(e._eventType, r);
      });
    }, t;
  }()
), Wp = (
  /** @class */
  function() {
    function t() {
      this._instances = {
        Accordion: {},
        Carousel: {},
        Collapse: {},
        Dial: {},
        Dismiss: {},
        Drawer: {},
        Dropdown: {},
        Modal: {},
        Popover: {},
        Tabs: {},
        Tooltip: {},
        InputCounter: {}
      };
    }
    return t.prototype.addInstance = function(e, r, o, i) {
      if (i === void 0 && (i = !1), !this._instances[e])
        return console.warn("Flowbite: Component ".concat(e, " does not exist.")), !1;
      if (this._instances[e][o] && !i) {
        console.warn("Flowbite: Instance with ID ".concat(o, " already exists."));
        return;
      }
      i && this._instances[e][o] && this._instances[e][o].destroyAndRemoveInstance(), this._instances[e][o || this._generateRandomId()] = r;
    }, t.prototype.getAllInstances = function() {
      return this._instances;
    }, t.prototype.getInstances = function(e) {
      return this._instances[e] ? this._instances[e] : (console.warn("Flowbite: Component ".concat(e, " does not exist.")), !1);
    }, t.prototype.getInstance = function(e, r) {
      if (this._componentAndInstanceCheck(e, r)) {
        if (!this._instances[e][r]) {
          console.warn("Flowbite: Instance with ID ".concat(r, " does not exist."));
          return;
        }
        return this._instances[e][r];
      }
    }, t.prototype.destroyAndRemoveInstance = function(e, r) {
      this._componentAndInstanceCheck(e, r) && (this.destroyInstanceObject(e, r), this.removeInstance(e, r));
    }, t.prototype.removeInstance = function(e, r) {
      this._componentAndInstanceCheck(e, r) && delete this._instances[e][r];
    }, t.prototype.destroyInstanceObject = function(e, r) {
      this._componentAndInstanceCheck(e, r) && this._instances[e][r].destroy();
    }, t.prototype.instanceExists = function(e, r) {
      return !(!this._instances[e] || !this._instances[e][r]);
    }, t.prototype._generateRandomId = function() {
      return Math.random().toString(36).substr(2, 9);
    }, t.prototype._componentAndInstanceCheck = function(e, r) {
      return this._instances[e] ? this._instances[e][r] ? !0 : (console.warn("Flowbite: Instance with ID ".concat(r, " does not exist.")), !1) : (console.warn("Flowbite: Component ".concat(e, " does not exist.")), !1);
    }, t;
  }()
), Y = new Wp();
typeof window < "u" && (window.FlowbiteInstances = Y);
var Gr = function() {
  return Gr = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Gr.apply(this, arguments);
}, Zr = {
  alwaysOpen: !1,
  activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
  inactiveClasses: "text-gray-500 dark:text-gray-400",
  onOpen: function() {
  },
  onClose: function() {
  },
  onToggle: function() {
  }
}, Yp = {
  id: null,
  override: !0
}, Xa = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = Zr), i === void 0 && (i = Yp), this._instanceId = i.id ? i.id : e.id, this._accordionEl = e, this._items = r, this._options = Gr(Gr({}, Zr), o), this._initialized = !1, this.init(), Y.addInstance("Accordion", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._items.length && !this._initialized && (this._items.forEach(function(r) {
        r.active && e.open(r.id);
        var o = function() {
          e.toggle(r.id);
        };
        r.triggerEl.addEventListener("click", o), r.clickHandler = o;
      }), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._items.length && this._initialized && (this._items.forEach(function(e) {
        e.triggerEl.removeEventListener("click", e.clickHandler), delete e.clickHandler;
      }), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Accordion", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.getItem = function(e) {
      return this._items.filter(function(r) {
        return r.id === e;
      })[0];
    }, t.prototype.open = function(e) {
      var r, o, i = this, n = this.getItem(e);
      this._options.alwaysOpen || this._items.map(function(a) {
        var s, l;
        a !== n && ((s = a.triggerEl.classList).remove.apply(s, i._options.activeClasses.split(" ")), (l = a.triggerEl.classList).add.apply(l, i._options.inactiveClasses.split(" ")), a.targetEl.classList.add("hidden"), a.triggerEl.setAttribute("aria-expanded", "false"), a.active = !1, a.iconEl && a.iconEl.classList.remove("rotate-180"));
      }), (r = n.triggerEl.classList).add.apply(r, this._options.activeClasses.split(" ")), (o = n.triggerEl.classList).remove.apply(o, this._options.inactiveClasses.split(" ")), n.triggerEl.setAttribute("aria-expanded", "true"), n.targetEl.classList.remove("hidden"), n.active = !0, n.iconEl && n.iconEl.classList.add("rotate-180"), this._options.onOpen(this, n);
    }, t.prototype.toggle = function(e) {
      var r = this.getItem(e);
      r.active ? this.close(e) : this.open(e), this._options.onToggle(this, r);
    }, t.prototype.close = function(e) {
      var r, o, i = this.getItem(e);
      (r = i.triggerEl.classList).remove.apply(r, this._options.activeClasses.split(" ")), (o = i.triggerEl.classList).add.apply(o, this._options.inactiveClasses.split(" ")), i.targetEl.classList.add("hidden"), i.triggerEl.setAttribute("aria-expanded", "false"), i.active = !1, i.iconEl && i.iconEl.classList.remove("rotate-180"), this._options.onClose(this, i);
    }, t;
  }()
);
function ki() {
  document.querySelectorAll("[data-accordion]").forEach(function(t) {
    var e = t.getAttribute("data-accordion"), r = t.getAttribute("data-active-classes"), o = t.getAttribute("data-inactive-classes"), i = [];
    t.querySelectorAll("[data-accordion-target]").forEach(function(n) {
      if (n.closest("[data-accordion]") === t) {
        var a = {
          id: n.getAttribute("data-accordion-target"),
          triggerEl: n,
          targetEl: document.querySelector(n.getAttribute("data-accordion-target")),
          iconEl: n.querySelector("[data-accordion-icon]"),
          active: n.getAttribute("aria-expanded") === "true"
        };
        i.push(a);
      }
    }), new Xa(t, i, {
      alwaysOpen: e === "open",
      activeClasses: r || Zr.activeClasses,
      inactiveClasses: o || Zr.inactiveClasses
    });
  });
}
typeof window < "u" && (window.Accordion = Xa, window.initAccordions = ki);
var Jr = function() {
  return Jr = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Jr.apply(this, arguments);
}, Sn = {
  onCollapse: function() {
  },
  onExpand: function() {
  },
  onToggle: function() {
  }
}, Xp = {
  id: null,
  override: !0
}, Go = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = Sn), i === void 0 && (i = Xp), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = Jr(Jr({}, Sn), o), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Collapse", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._triggerEl && this._targetEl && !this._initialized && (this._triggerEl.hasAttribute("aria-expanded") ? this._visible = this._triggerEl.getAttribute("aria-expanded") === "true" : this._visible = !this._targetEl.classList.contains("hidden"), this._clickHandler = function() {
        e.toggle();
      }, this._triggerEl.addEventListener("click", this._clickHandler), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._triggerEl && this._initialized && (this._triggerEl.removeEventListener("click", this._clickHandler), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Collapse", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.collapse = function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onCollapse(this);
    }, t.prototype.expand = function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onExpand(this);
    }, t.prototype.toggle = function() {
      this._visible ? this.collapse() : this.expand(), this._options.onToggle(this);
    }, t;
  }()
);
function _i() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-collapse-toggle"), r = document.getElementById(e);
    r ? Y.instanceExists("Collapse", r.getAttribute("id")) ? new Go(r, t, {}, {
      id: r.getAttribute("id") + "_" + Y._generateRandomId()
    }) : new Go(r, t) : console.error('The target element with id "'.concat(e, '" does not exist. Please check the data-collapse-toggle attribute.'));
  });
}
typeof window < "u" && (window.Collapse = Go, window.initCollapses = _i);
var je = function() {
  return je = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, je.apply(this, arguments);
}, Fr = {
  defaultPosition: 0,
  indicators: {
    items: [],
    activeClasses: "bg-white dark:bg-gray-800",
    inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
  },
  interval: 3e3,
  onNext: function() {
  },
  onPrev: function() {
  },
  onChange: function() {
  }
}, Gp = {
  id: null,
  override: !0
}, Ga = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = Fr), i === void 0 && (i = Gp), this._instanceId = i.id ? i.id : e.id, this._carouselEl = e, this._items = r, this._options = je(je(je({}, Fr), o), { indicators: je(je({}, Fr.indicators), o.indicators) }), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._intervalDuration = this._options.interval, this._intervalInstance = null, this._initialized = !1, this.init(), Y.addInstance("Carousel", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._items.length && !this._initialized && (this._items.map(function(r) {
        r.el.classList.add("absolute", "inset-0", "transition-transform", "transform");
      }), this._getActiveItem() ? this.slideTo(this._getActiveItem().position) : this.slideTo(0), this._indicators.map(function(r, o) {
        r.el.addEventListener("click", function() {
          e.slideTo(o);
        });
      }), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._initialized && (this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Carousel", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.getItem = function(e) {
      return this._items[e];
    }, t.prototype.slideTo = function(e) {
      var r = this._items[e], o = {
        left: r.position === 0 ? this._items[this._items.length - 1] : this._items[r.position - 1],
        middle: r,
        right: r.position === this._items.length - 1 ? this._items[0] : this._items[r.position + 1]
      };
      this._rotate(o), this._setActiveItem(r), this._intervalInstance && (this.pause(), this.cycle()), this._options.onChange(this);
    }, t.prototype.next = function() {
      var e = this._getActiveItem(), r = null;
      e.position === this._items.length - 1 ? r = this._items[0] : r = this._items[e.position + 1], this.slideTo(r.position), this._options.onNext(this);
    }, t.prototype.prev = function() {
      var e = this._getActiveItem(), r = null;
      e.position === 0 ? r = this._items[this._items.length - 1] : r = this._items[e.position - 1], this.slideTo(r.position), this._options.onPrev(this);
    }, t.prototype._rotate = function(e) {
      this._items.map(function(r) {
        r.el.classList.add("hidden");
      }), e.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), e.left.el.classList.add("-translate-x-full", "z-10"), e.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10"), e.middle.el.classList.add("translate-x-0", "z-20"), e.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), e.right.el.classList.add("translate-x-full", "z-10");
    }, t.prototype.cycle = function() {
      var e = this;
      typeof window < "u" && (this._intervalInstance = window.setInterval(function() {
        e.next();
      }, this._intervalDuration));
    }, t.prototype.pause = function() {
      clearInterval(this._intervalInstance);
    }, t.prototype._getActiveItem = function() {
      return this._activeItem;
    }, t.prototype._setActiveItem = function(e) {
      var r, o, i = this;
      this._activeItem = e;
      var n = e.position;
      this._indicators.length && (this._indicators.map(function(a) {
        var s, l;
        a.el.setAttribute("aria-current", "false"), (s = a.el.classList).remove.apply(s, i._options.indicators.activeClasses.split(" ")), (l = a.el.classList).add.apply(l, i._options.indicators.inactiveClasses.split(" "));
      }), (r = this._indicators[n].el.classList).add.apply(r, this._options.indicators.activeClasses.split(" ")), (o = this._indicators[n].el.classList).remove.apply(o, this._options.indicators.inactiveClasses.split(" ")), this._indicators[n].el.setAttribute("aria-current", "true"));
    }, t;
  }()
);
function Ei() {
  document.querySelectorAll("[data-carousel]").forEach(function(t) {
    var e = t.getAttribute("data-carousel-interval"), r = t.getAttribute("data-carousel") === "slide", o = [], i = 0;
    t.querySelectorAll("[data-carousel-item]").length && Array.from(t.querySelectorAll("[data-carousel-item]")).map(function(p, g) {
      o.push({
        position: g,
        el: p
      }), p.getAttribute("data-carousel-item") === "active" && (i = g);
    });
    var n = [];
    t.querySelectorAll("[data-carousel-slide-to]").length && Array.from(t.querySelectorAll("[data-carousel-slide-to]")).map(function(p) {
      n.push({
        position: parseInt(p.getAttribute("data-carousel-slide-to")),
        el: p
      });
    });
    var a = new Ga(t, o, {
      defaultPosition: i,
      indicators: {
        items: n
      },
      interval: e || Fr.interval
    });
    r && a.cycle();
    var s = t.querySelector("[data-carousel-next]"), l = t.querySelector("[data-carousel-prev]");
    s && s.addEventListener("click", function() {
      a.next();
    }), l && l.addEventListener("click", function() {
      a.prev();
    });
  });
}
typeof window < "u" && (window.Carousel = Ga, window.initCarousels = Ei);
var Qr = function() {
  return Qr = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Qr.apply(this, arguments);
}, jn = {
  transition: "transition-opacity",
  duration: 300,
  timing: "ease-out",
  onHide: function() {
  }
}, Zp = {
  id: null,
  override: !0
}, Za = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = jn), i === void 0 && (i = Zp), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = Qr(Qr({}, jn), o), this._initialized = !1, this.init(), Y.addInstance("Dismiss", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._triggerEl && this._targetEl && !this._initialized && (this._clickHandler = function() {
        e.hide();
      }, this._triggerEl.addEventListener("click", this._clickHandler), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._triggerEl && this._initialized && (this._triggerEl.removeEventListener("click", this._clickHandler), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Dismiss", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.hide = function() {
      var e = this;
      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0"), setTimeout(function() {
        e._targetEl.classList.add("hidden");
      }, this._options.duration), this._options.onHide(this, this._targetEl);
    }, t;
  }()
);
function Ci() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function(t) {
    var e = t.getAttribute("data-dismiss-target"), r = document.querySelector(e);
    r ? new Za(r, t) : console.error('The dismiss element with id "'.concat(e, '" does not exist. Please check the data-dismiss-target attribute.'));
  });
}
typeof window < "u" && (window.Dismiss = Za, window.initDismisses = Ci);
var _t = "top", Mt = "bottom", Dt = "right", Et = "left", Ai = "auto", xr = [_t, Mt, Dt, Et], We = "start", vr = "end", Jp = "clippingParents", Ja = "viewport", er = "popper", Qp = "reference", Mn = /* @__PURE__ */ xr.reduce(function(t, e) {
  return t.concat([e + "-" + We, e + "-" + vr]);
}, []), Qa = /* @__PURE__ */ [].concat(xr, [Ai]).reduce(function(t, e) {
  return t.concat([e, e + "-" + We, e + "-" + vr]);
}, []), tg = "beforeRead", eg = "read", rg = "afterRead", og = "beforeMain", ig = "main", ng = "afterMain", ag = "beforeWrite", sg = "write", lg = "afterWrite", cg = [tg, eg, rg, og, ig, ng, ag, sg, lg];
function Xt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Tt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Re(t) {
  var e = Tt(t).Element;
  return t instanceof e || t instanceof Element;
}
function jt(t) {
  var e = Tt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Ii(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Tt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function dg(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var o = e.styles[r] || {}, i = e.attributes[r] || {}, n = e.elements[r];
    !jt(n) || !Xt(n) || (Object.assign(n.style, o), Object.keys(i).forEach(function(a) {
      var s = i[a];
      s === !1 ? n.removeAttribute(a) : n.setAttribute(a, s === !0 ? "" : s);
    }));
  });
}
function pg(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(o) {
      var i = e.elements[o], n = e.attributes[o] || {}, a = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), s = a.reduce(function(l, p) {
        return l[p] = "", l;
      }, {});
      !jt(i) || !Xt(i) || (Object.assign(i.style, s), Object.keys(n).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const gg = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: dg,
  effect: pg,
  requires: ["computeStyles"]
};
function Yt(t) {
  return t.split("-")[0];
}
var Be = Math.max, to = Math.min, Ye = Math.round;
function Zo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ts() {
  return !/^((?!chrome|android).)*safari/i.test(Zo());
}
function Xe(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var o = t.getBoundingClientRect(), i = 1, n = 1;
  e && jt(t) && (i = t.offsetWidth > 0 && Ye(o.width) / t.offsetWidth || 1, n = t.offsetHeight > 0 && Ye(o.height) / t.offsetHeight || 1);
  var a = Re(t) ? Tt(t) : window, s = a.visualViewport, l = !ts() && r, p = (o.left + (l && s ? s.offsetLeft : 0)) / i, g = (o.top + (l && s ? s.offsetTop : 0)) / n, w = o.width / i, v = o.height / n;
  return {
    width: w,
    height: v,
    top: g,
    right: p + w,
    bottom: g + v,
    left: p,
    x: p,
    y: g
  };
}
function Li(t) {
  var e = Xe(t), r = t.offsetWidth, o = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: o
  };
}
function es(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && Ii(r)) {
    var o = e;
    do {
      if (o && t.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function ee(t) {
  return Tt(t).getComputedStyle(t);
}
function ug(t) {
  return ["table", "td", "th"].indexOf(Xt(t)) >= 0;
}
function ke(t) {
  return ((Re(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function xo(t) {
  return Xt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Ii(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ke(t)
  );
}
function Dn(t) {
  return !jt(t) || // https://github.com/popperjs/popper-core/issues/837
  ee(t).position === "fixed" ? null : t.offsetParent;
}
function fg(t) {
  var e = /firefox/i.test(Zo()), r = /Trident/i.test(Zo());
  if (r && jt(t)) {
    var o = ee(t);
    if (o.position === "fixed")
      return null;
  }
  var i = xo(t);
  for (Ii(i) && (i = i.host); jt(i) && ["html", "body"].indexOf(Xt(i)) < 0; ) {
    var n = ee(i);
    if (n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].indexOf(n.willChange) !== -1 || e && n.willChange === "filter" || e && n.filter && n.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function kr(t) {
  for (var e = Tt(t), r = Dn(t); r && ug(r) && ee(r).position === "static"; )
    r = Dn(r);
  return r && (Xt(r) === "html" || Xt(r) === "body" && ee(r).position === "static") ? e : r || fg(t) || e;
}
function Ti(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function lr(t, e, r) {
  return Be(t, to(e, r));
}
function hg(t, e, r) {
  var o = lr(t, e, r);
  return o > r ? r : o;
}
function rs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function os(t) {
  return Object.assign({}, rs(), t);
}
function is(t, e) {
  return e.reduce(function(r, o) {
    return r[o] = t, r;
  }, {});
}
var wg = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, os(typeof e != "number" ? e : is(e, xr));
};
function vg(t) {
  var e, r = t.state, o = t.name, i = t.options, n = r.elements.arrow, a = r.modifiersData.popperOffsets, s = Yt(r.placement), l = Ti(s), p = [Et, Dt].indexOf(s) >= 0, g = p ? "height" : "width";
  if (!(!n || !a)) {
    var w = wg(i.padding, r), v = Li(n), f = l === "y" ? _t : Et, A = l === "y" ? Mt : Dt, _ = r.rects.reference[g] + r.rects.reference[l] - a[l] - r.rects.popper[g], O = a[l] - r.rects.reference[l], H = kr(n), $ = H ? l === "y" ? H.clientHeight || 0 : H.clientWidth || 0 : 0, M = _ / 2 - O / 2, P = w[f], B = $ - v[g] - w[A], L = $ / 2 - v[g] / 2 + M, V = lr(P, L, B), S = l;
    r.modifiersData[o] = (e = {}, e[S] = V, e.centerOffset = V - L, e);
  }
}
function bg(t) {
  var e = t.state, r = t.options, o = r.element, i = o === void 0 ? "[data-popper-arrow]" : o;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || es(e.elements.popper, i) && (e.elements.arrow = i));
}
const mg = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: vg,
  effect: bg,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ge(t) {
  return t.split("-")[1];
}
var yg = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function xg(t, e) {
  var r = t.x, o = t.y, i = e.devicePixelRatio || 1;
  return {
    x: Ye(r * i) / i || 0,
    y: Ye(o * i) / i || 0
  };
}
function zn(t) {
  var e, r = t.popper, o = t.popperRect, i = t.placement, n = t.variation, a = t.offsets, s = t.position, l = t.gpuAcceleration, p = t.adaptive, g = t.roundOffsets, w = t.isFixed, v = a.x, f = v === void 0 ? 0 : v, A = a.y, _ = A === void 0 ? 0 : A, O = typeof g == "function" ? g({
    x: f,
    y: _
  }) : {
    x: f,
    y: _
  };
  f = O.x, _ = O.y;
  var H = a.hasOwnProperty("x"), $ = a.hasOwnProperty("y"), M = Et, P = _t, B = window;
  if (p) {
    var L = kr(r), V = "clientHeight", S = "clientWidth";
    if (L === Tt(r) && (L = ke(r), ee(L).position !== "static" && s === "absolute" && (V = "scrollHeight", S = "scrollWidth")), L = L, i === _t || (i === Et || i === Dt) && n === vr) {
      P = Mt;
      var U = w && L === B && B.visualViewport ? B.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        L[V]
      );
      _ -= U - o.height, _ *= l ? 1 : -1;
    }
    if (i === Et || (i === _t || i === Mt) && n === vr) {
      M = Dt;
      var F = w && L === B && B.visualViewport ? B.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        L[S]
      );
      f -= F - o.width, f *= l ? 1 : -1;
    }
  }
  var G = Object.assign({
    position: s
  }, p && yg), T = g === !0 ? xg({
    x: f,
    y: _
  }, Tt(r)) : {
    x: f,
    y: _
  };
  if (f = T.x, _ = T.y, l) {
    var q;
    return Object.assign({}, G, (q = {}, q[P] = $ ? "0" : "", q[M] = H ? "0" : "", q.transform = (B.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + _ + "px)" : "translate3d(" + f + "px, " + _ + "px, 0)", q));
  }
  return Object.assign({}, G, (e = {}, e[P] = $ ? _ + "px" : "", e[M] = H ? f + "px" : "", e.transform = "", e));
}
function kg(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, i = o === void 0 ? !0 : o, n = r.adaptive, a = n === void 0 ? !0 : n, s = r.roundOffsets, l = s === void 0 ? !0 : s, p = {
    placement: Yt(e.placement),
    variation: Ge(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, zn(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, zn(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const _g = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: kg,
  data: {}
};
var Or = {
  passive: !0
};
function Eg(t) {
  var e = t.state, r = t.instance, o = t.options, i = o.scroll, n = i === void 0 ? !0 : i, a = o.resize, s = a === void 0 ? !0 : a, l = Tt(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return n && p.forEach(function(g) {
    g.addEventListener("scroll", r.update, Or);
  }), s && l.addEventListener("resize", r.update, Or), function() {
    n && p.forEach(function(g) {
      g.removeEventListener("scroll", r.update, Or);
    }), s && l.removeEventListener("resize", r.update, Or);
  };
}
const Cg = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Eg,
  data: {}
};
var Ag = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Nr(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Ag[e];
  });
}
var Ig = {
  start: "end",
  end: "start"
};
function Hn(t) {
  return t.replace(/start|end/g, function(e) {
    return Ig[e];
  });
}
function Oi(t) {
  var e = Tt(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Pi(t) {
  return Xe(ke(t)).left + Oi(t).scrollLeft;
}
function Lg(t, e) {
  var r = Tt(t), o = ke(t), i = r.visualViewport, n = o.clientWidth, a = o.clientHeight, s = 0, l = 0;
  if (i) {
    n = i.width, a = i.height;
    var p = ts();
    (p || !p && e === "fixed") && (s = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: n,
    height: a,
    x: s + Pi(t),
    y: l
  };
}
function Tg(t) {
  var e, r = ke(t), o = Oi(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, n = Be(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = Be(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), s = -o.scrollLeft + Pi(t), l = -o.scrollTop;
  return ee(i || r).direction === "rtl" && (s += Be(r.clientWidth, i ? i.clientWidth : 0) - n), {
    width: n,
    height: a,
    x: s,
    y: l
  };
}
function Si(t) {
  var e = ee(t), r = e.overflow, o = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + o);
}
function ns(t) {
  return ["html", "body", "#document"].indexOf(Xt(t)) >= 0 ? t.ownerDocument.body : jt(t) && Si(t) ? t : ns(xo(t));
}
function cr(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ns(t), i = o === ((r = t.ownerDocument) == null ? void 0 : r.body), n = Tt(o), a = i ? [n].concat(n.visualViewport || [], Si(o) ? o : []) : o, s = e.concat(a);
  return i ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(cr(xo(a)))
  );
}
function Jo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Og(t, e) {
  var r = Xe(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Bn(t, e, r) {
  return e === Ja ? Jo(Lg(t, r)) : Re(e) ? Og(e, r) : Jo(Tg(ke(t)));
}
function Pg(t) {
  var e = cr(xo(t)), r = ["absolute", "fixed"].indexOf(ee(t).position) >= 0, o = r && jt(t) ? kr(t) : t;
  return Re(o) ? e.filter(function(i) {
    return Re(i) && es(i, o) && Xt(i) !== "body";
  }) : [];
}
function Sg(t, e, r, o) {
  var i = e === "clippingParents" ? Pg(t) : [].concat(e), n = [].concat(i, [r]), a = n[0], s = n.reduce(function(l, p) {
    var g = Bn(t, p, o);
    return l.top = Be(g.top, l.top), l.right = to(g.right, l.right), l.bottom = to(g.bottom, l.bottom), l.left = Be(g.left, l.left), l;
  }, Bn(t, a, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function as(t) {
  var e = t.reference, r = t.element, o = t.placement, i = o ? Yt(o) : null, n = o ? Ge(o) : null, a = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, l;
  switch (i) {
    case _t:
      l = {
        x: a,
        y: e.y - r.height
      };
      break;
    case Mt:
      l = {
        x: a,
        y: e.y + e.height
      };
      break;
    case Dt:
      l = {
        x: e.x + e.width,
        y: s
      };
      break;
    case Et:
      l = {
        x: e.x - r.width,
        y: s
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var p = i ? Ti(i) : null;
  if (p != null) {
    var g = p === "y" ? "height" : "width";
    switch (n) {
      case We:
        l[p] = l[p] - (e[g] / 2 - r[g] / 2);
        break;
      case vr:
        l[p] = l[p] + (e[g] / 2 - r[g] / 2);
        break;
    }
  }
  return l;
}
function br(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, i = o === void 0 ? t.placement : o, n = r.strategy, a = n === void 0 ? t.strategy : n, s = r.boundary, l = s === void 0 ? Jp : s, p = r.rootBoundary, g = p === void 0 ? Ja : p, w = r.elementContext, v = w === void 0 ? er : w, f = r.altBoundary, A = f === void 0 ? !1 : f, _ = r.padding, O = _ === void 0 ? 0 : _, H = os(typeof O != "number" ? O : is(O, xr)), $ = v === er ? Qp : er, M = t.rects.popper, P = t.elements[A ? $ : v], B = Sg(Re(P) ? P : P.contextElement || ke(t.elements.popper), l, g, a), L = Xe(t.elements.reference), V = as({
    reference: L,
    element: M,
    strategy: "absolute",
    placement: i
  }), S = Jo(Object.assign({}, M, V)), U = v === er ? S : L, F = {
    top: B.top - U.top + H.top,
    bottom: U.bottom - B.bottom + H.bottom,
    left: B.left - U.left + H.left,
    right: U.right - B.right + H.right
  }, G = t.modifiersData.offset;
  if (v === er && G) {
    var T = G[i];
    Object.keys(F).forEach(function(q) {
      var st = [Dt, Mt].indexOf(q) >= 0 ? 1 : -1, At = [_t, Mt].indexOf(q) >= 0 ? "y" : "x";
      F[q] += T[At] * st;
    });
  }
  return F;
}
function jg(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, i = r.boundary, n = r.rootBoundary, a = r.padding, s = r.flipVariations, l = r.allowedAutoPlacements, p = l === void 0 ? Qa : l, g = Ge(o), w = g ? s ? Mn : Mn.filter(function(A) {
    return Ge(A) === g;
  }) : xr, v = w.filter(function(A) {
    return p.indexOf(A) >= 0;
  });
  v.length === 0 && (v = w);
  var f = v.reduce(function(A, _) {
    return A[_] = br(t, {
      placement: _,
      boundary: i,
      rootBoundary: n,
      padding: a
    })[Yt(_)], A;
  }, {});
  return Object.keys(f).sort(function(A, _) {
    return f[A] - f[_];
  });
}
function Mg(t) {
  if (Yt(t) === Ai)
    return [];
  var e = Nr(t);
  return [Hn(t), e, Hn(e)];
}
function Dg(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var i = r.mainAxis, n = i === void 0 ? !0 : i, a = r.altAxis, s = a === void 0 ? !0 : a, l = r.fallbackPlacements, p = r.padding, g = r.boundary, w = r.rootBoundary, v = r.altBoundary, f = r.flipVariations, A = f === void 0 ? !0 : f, _ = r.allowedAutoPlacements, O = e.options.placement, H = Yt(O), $ = H === O, M = l || ($ || !A ? [Nr(O)] : Mg(O)), P = [O].concat(M).reduce(function(oe, Vt) {
      return oe.concat(Yt(Vt) === Ai ? jg(e, {
        placement: Vt,
        boundary: g,
        rootBoundary: w,
        padding: p,
        flipVariations: A,
        allowedAutoPlacements: _
      }) : Vt);
    }, []), B = e.rects.reference, L = e.rects.popper, V = /* @__PURE__ */ new Map(), S = !0, U = P[0], F = 0; F < P.length; F++) {
      var G = P[F], T = Yt(G), q = Ge(G) === We, st = [_t, Mt].indexOf(T) >= 0, At = st ? "width" : "height", J = br(e, {
        placement: G,
        boundary: g,
        rootBoundary: w,
        altBoundary: v,
        padding: p
      }), W = st ? q ? Dt : Et : q ? Mt : _t;
      B[At] > L[At] && (W = Nr(W));
      var tt = Nr(W), vt = [];
      if (n && vt.push(J[T] <= 0), s && vt.push(J[W] <= 0, J[tt] <= 0), vt.every(function(oe) {
        return oe;
      })) {
        U = G, S = !1;
        break;
      }
      V.set(G, vt);
    }
    if (S)
      for (var Gt = A ? 3 : 1, zt = function(Vt) {
        var bt = P.find(function(Zt) {
          var Ht = V.get(Zt);
          if (Ht)
            return Ht.slice(0, Vt).every(function(Fe) {
              return Fe;
            });
        });
        if (bt)
          return U = bt, "break";
      }, ft = Gt; ft > 0; ft--) {
        var _e = zt(ft);
        if (_e === "break")
          break;
      }
    e.placement !== U && (e.modifiersData[o]._skip = !0, e.placement = U, e.reset = !0);
  }
}
const zg = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Dg,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Rn(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function Fn(t) {
  return [_t, Dt, Mt, Et].some(function(e) {
    return t[e] >= 0;
  });
}
function Hg(t) {
  var e = t.state, r = t.name, o = e.rects.reference, i = e.rects.popper, n = e.modifiersData.preventOverflow, a = br(e, {
    elementContext: "reference"
  }), s = br(e, {
    altBoundary: !0
  }), l = Rn(a, o), p = Rn(s, i, n), g = Fn(l), w = Fn(p);
  e.modifiersData[r] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: p,
    isReferenceHidden: g,
    hasPopperEscaped: w
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": g,
    "data-popper-escaped": w
  });
}
const Bg = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Hg
};
function Rg(t, e, r) {
  var o = Yt(t), i = [Et, _t].indexOf(o) >= 0 ? -1 : 1, n = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, a = n[0], s = n[1];
  return a = a || 0, s = (s || 0) * i, [Et, Dt].indexOf(o) >= 0 ? {
    x: s,
    y: a
  } : {
    x: a,
    y: s
  };
}
function Fg(t) {
  var e = t.state, r = t.options, o = t.name, i = r.offset, n = i === void 0 ? [0, 0] : i, a = Qa.reduce(function(g, w) {
    return g[w] = Rg(w, e.rects, n), g;
  }, {}), s = a[e.placement], l = s.x, p = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += p), e.modifiersData[o] = a;
}
const Ng = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Fg
};
function Ug(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = as({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Vg = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ug,
  data: {}
};
function $g(t) {
  return t === "x" ? "y" : "x";
}
function qg(t) {
  var e = t.state, r = t.options, o = t.name, i = r.mainAxis, n = i === void 0 ? !0 : i, a = r.altAxis, s = a === void 0 ? !1 : a, l = r.boundary, p = r.rootBoundary, g = r.altBoundary, w = r.padding, v = r.tether, f = v === void 0 ? !0 : v, A = r.tetherOffset, _ = A === void 0 ? 0 : A, O = br(e, {
    boundary: l,
    rootBoundary: p,
    padding: w,
    altBoundary: g
  }), H = Yt(e.placement), $ = Ge(e.placement), M = !$, P = Ti(H), B = $g(P), L = e.modifiersData.popperOffsets, V = e.rects.reference, S = e.rects.popper, U = typeof _ == "function" ? _(Object.assign({}, e.rects, {
    placement: e.placement
  })) : _, F = typeof U == "number" ? {
    mainAxis: U,
    altAxis: U
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, U), G = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, T = {
    x: 0,
    y: 0
  };
  if (L) {
    if (n) {
      var q, st = P === "y" ? _t : Et, At = P === "y" ? Mt : Dt, J = P === "y" ? "height" : "width", W = L[P], tt = W + O[st], vt = W - O[At], Gt = f ? -S[J] / 2 : 0, zt = $ === We ? V[J] : S[J], ft = $ === We ? -S[J] : -V[J], _e = e.elements.arrow, oe = f && _e ? Li(_e) : {
        width: 0,
        height: 0
      }, Vt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : rs(), bt = Vt[st], Zt = Vt[At], Ht = lr(0, V[J], oe[J]), Fe = M ? V[J] / 2 - Gt - Ht - bt - F.mainAxis : zt - Ht - bt - F.mainAxis, ie = M ? -V[J] / 2 + Gt + Ht + Zt + F.mainAxis : ft + Ht + Zt + F.mainAxis, Ee = e.elements.arrow && kr(e.elements.arrow), Ze = Ee ? P === "y" ? Ee.clientTop || 0 : Ee.clientLeft || 0 : 0, d = (q = G == null ? void 0 : G[P]) != null ? q : 0, u = W + Fe - d - Ze, h = W + ie - d, b = lr(f ? to(tt, u) : tt, W, f ? Be(vt, h) : vt);
      L[P] = b, T[P] = b - W;
    }
    if (s) {
      var m, k = P === "x" ? _t : Et, C = P === "x" ? Mt : Dt, x = L[B], E = B === "y" ? "height" : "width", y = x + O[k], I = x - O[C], D = [_t, Et].indexOf(H) !== -1, j = (m = G == null ? void 0 : G[B]) != null ? m : 0, R = D ? y : x - V[E] - S[E] - j + F.altAxis, K = D ? x + V[E] + S[E] - j - F.altAxis : I, et = f && D ? hg(R, x, K) : lr(f ? R : y, x, f ? K : I);
      L[B] = et, T[B] = et - x;
    }
    e.modifiersData[o] = T;
  }
}
const Kg = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: qg,
  requiresIfExists: ["offset"]
};
function Wg(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Yg(t) {
  return t === Tt(t) || !jt(t) ? Oi(t) : Wg(t);
}
function Xg(t) {
  var e = t.getBoundingClientRect(), r = Ye(e.width) / t.offsetWidth || 1, o = Ye(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function Gg(t, e, r) {
  r === void 0 && (r = !1);
  var o = jt(e), i = jt(e) && Xg(e), n = ke(e), a = Xe(t, i, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((Xt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Si(n)) && (s = Yg(e)), jt(e) ? (l = Xe(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : n && (l.x = Pi(n))), {
    x: a.left + s.scrollLeft - l.x,
    y: a.top + s.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function Zg(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  t.forEach(function(n) {
    e.set(n.name, n);
  });
  function i(n) {
    r.add(n.name);
    var a = [].concat(n.requires || [], n.requiresIfExists || []);
    a.forEach(function(s) {
      if (!r.has(s)) {
        var l = e.get(s);
        l && i(l);
      }
    }), o.push(n);
  }
  return t.forEach(function(n) {
    r.has(n.name) || i(n);
  }), o;
}
function Jg(t) {
  var e = Zg(t);
  return cg.reduce(function(r, o) {
    return r.concat(e.filter(function(i) {
      return i.phase === o;
    }));
  }, []);
}
function Qg(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function tu(t) {
  var e = t.reduce(function(r, o) {
    var i = r[o.name];
    return r[o.name] = i ? Object.assign({}, i, o, {
      options: Object.assign({}, i.options, o.options),
      data: Object.assign({}, i.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var Nn = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Un() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function eu(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, i = e.defaultOptions, n = i === void 0 ? Nn : i;
  return function(s, l, p) {
    p === void 0 && (p = n);
    var g = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Nn, n),
      modifiersData: {},
      elements: {
        reference: s,
        popper: l
      },
      attributes: {},
      styles: {}
    }, w = [], v = !1, f = {
      state: g,
      setOptions: function(H) {
        var $ = typeof H == "function" ? H(g.options) : H;
        _(), g.options = Object.assign({}, n, g.options, $), g.scrollParents = {
          reference: Re(s) ? cr(s) : s.contextElement ? cr(s.contextElement) : [],
          popper: cr(l)
        };
        var M = Jg(tu([].concat(o, g.options.modifiers)));
        return g.orderedModifiers = M.filter(function(P) {
          return P.enabled;
        }), A(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!v) {
          var H = g.elements, $ = H.reference, M = H.popper;
          if (Un($, M)) {
            g.rects = {
              reference: Gg($, kr(M), g.options.strategy === "fixed"),
              popper: Li(M)
            }, g.reset = !1, g.placement = g.options.placement, g.orderedModifiers.forEach(function(F) {
              return g.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var P = 0; P < g.orderedModifiers.length; P++) {
              if (g.reset === !0) {
                g.reset = !1, P = -1;
                continue;
              }
              var B = g.orderedModifiers[P], L = B.fn, V = B.options, S = V === void 0 ? {} : V, U = B.name;
              typeof L == "function" && (g = L({
                state: g,
                options: S,
                name: U,
                instance: f
              }) || g);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Qg(function() {
        return new Promise(function(O) {
          f.forceUpdate(), O(g);
        });
      }),
      destroy: function() {
        _(), v = !0;
      }
    };
    if (!Un(s, l))
      return f;
    f.setOptions(p).then(function(O) {
      !v && p.onFirstUpdate && p.onFirstUpdate(O);
    });
    function A() {
      g.orderedModifiers.forEach(function(O) {
        var H = O.name, $ = O.options, M = $ === void 0 ? {} : $, P = O.effect;
        if (typeof P == "function") {
          var B = P({
            state: g,
            name: H,
            instance: f,
            options: M
          }), L = function() {
          };
          w.push(B || L);
        }
      });
    }
    function _() {
      w.forEach(function(O) {
        return O();
      }), w = [];
    }
    return f;
  };
}
var ru = [Cg, Vg, _g, gg, Ng, zg, Kg, mg, Bg], ji = /* @__PURE__ */ eu({
  defaultModifiers: ru
}), ge = function() {
  return ge = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ge.apply(this, arguments);
}, Pr = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, n; o < i; o++)
      (n || !(o in e)) && (n || (n = Array.prototype.slice.call(e, 0, o)), n[o] = e[o]);
  return t.concat(n || Array.prototype.slice.call(e));
}, ue = {
  placement: "bottom",
  triggerType: "click",
  offsetSkidding: 0,
  offsetDistance: 10,
  delay: 300,
  ignoreClickOutsideClass: !1,
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, ou = {
  id: null,
  override: !0
}, ss = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = ue), i === void 0 && (i = ou), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = ge(ge({}, ue), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Dropdown", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      this._triggerEl && this._targetEl && !this._initialized && (this._popperInstance = this._createPopperInstance(), this._setupEventListeners(), this._initialized = !0);
    }, t.prototype.destroy = function() {
      var e = this, r = this._getTriggerEvents();
      this._options.triggerType === "click" && r.showEvents.forEach(function(o) {
        e._triggerEl.removeEventListener(o, e._clickHandler);
      }), this._options.triggerType === "hover" && (r.showEvents.forEach(function(o) {
        e._triggerEl.removeEventListener(o, e._hoverShowTriggerElHandler), e._targetEl.removeEventListener(o, e._hoverShowTargetElHandler);
      }), r.hideEvents.forEach(function(o) {
        e._triggerEl.removeEventListener(o, e._hoverHideHandler), e._targetEl.removeEventListener(o, e._hoverHideHandler);
      })), this._popperInstance.destroy(), this._initialized = !1;
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Dropdown", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype._setupEventListeners = function() {
      var e = this, r = this._getTriggerEvents();
      this._clickHandler = function() {
        e.toggle();
      }, this._options.triggerType === "click" && r.showEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._clickHandler);
      }), this._hoverShowTriggerElHandler = function(o) {
        o.type === "click" ? e.toggle() : setTimeout(function() {
          e.show();
        }, e._options.delay);
      }, this._hoverShowTargetElHandler = function() {
        e.show();
      }, this._hoverHideHandler = function() {
        setTimeout(function() {
          e._targetEl.matches(":hover") || e.hide();
        }, e._options.delay);
      }, this._options.triggerType === "hover" && (r.showEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._hoverShowTriggerElHandler), e._targetEl.addEventListener(o, e._hoverShowTargetElHandler);
      }), r.hideEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._hoverHideHandler), e._targetEl.addEventListener(o, e._hoverHideHandler);
      }));
    }, t.prototype._createPopperInstance = function() {
      return ji(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [
                this._options.offsetSkidding,
                this._options.offsetDistance
              ]
            }
          }
        ]
      });
    }, t.prototype._setupClickOutsideListener = function() {
      var e = this;
      this._clickOutsideEventListener = function(r) {
        e._handleClickOutside(r, e._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._handleClickOutside = function(e, r) {
      var o = e.target, i = this._options.ignoreClickOutsideClass, n = !1;
      if (i) {
        var a = document.querySelectorAll(".".concat(i));
        a.forEach(function(s) {
          if (s.contains(o)) {
            n = !0;
            return;
          }
        });
      }
      o !== r && !r.contains(o) && !this._triggerEl.contains(o) && !n && this.isVisible() && this.hide();
    }, t.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "click"],
            hideEvents: ["mouseleave"]
          };
        case "click":
          return {
            showEvents: ["click"],
            hideEvents: []
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["click"],
            hideEvents: []
          };
      }
    }, t.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this);
    }, t.prototype.isVisible = function() {
      return this._visible;
    }, t.prototype.show = function() {
      this._targetEl.classList.remove("hidden"), this._targetEl.classList.add("block"), this._popperInstance.setOptions(function(e) {
        return ge(ge({}, e), { modifiers: Pr(Pr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions(function(e) {
        return ge(ge({}, e), { modifiers: Pr(Pr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._visible = !1, this._removeClickOutsideListener(), this._options.onHide(this);
    }, t;
  }()
);
function Mi() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-dropdown-toggle"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-dropdown-placement"), i = t.getAttribute("data-dropdown-offset-skidding"), n = t.getAttribute("data-dropdown-offset-distance"), a = t.getAttribute("data-dropdown-trigger"), s = t.getAttribute("data-dropdown-delay"), l = t.getAttribute("data-dropdown-ignore-click-outside-class");
      new ss(r, t, {
        placement: o || ue.placement,
        triggerType: a || ue.triggerType,
        offsetSkidding: i ? parseInt(i) : ue.offsetSkidding,
        offsetDistance: n ? parseInt(n) : ue.offsetDistance,
        delay: s ? parseInt(s) : ue.delay,
        ignoreClickOutsideClass: l || ue.ignoreClickOutsideClass
      });
    } else
      console.error('The dropdown element with id "'.concat(e, '" does not exist. Please check the data-dropdown-toggle attribute.'));
  });
}
typeof window < "u" && (window.Dropdown = ss, window.initDropdowns = Mi);
var eo = function() {
  return eo = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, eo.apply(this, arguments);
}, ro = {
  placement: "center",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  backdrop: "dynamic",
  closable: !0,
  onHide: function() {
  },
  onShow: function() {
  },
  onToggle: function() {
  }
}, iu = {
  id: null,
  override: !0
}, ls = (
  /** @class */
  function() {
    function t(e, r, o) {
      e === void 0 && (e = null), r === void 0 && (r = ro), o === void 0 && (o = iu), this._eventListenerInstances = [], this._instanceId = o.id ? o.id : e.id, this._targetEl = e, this._options = eo(eo({}, ro), r), this._isHidden = !0, this._backdropEl = null, this._initialized = !1, this.init(), Y.addInstance("Modal", this, this._instanceId, o.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._targetEl && !this._initialized && (this._getPlacementClasses().map(function(r) {
        e._targetEl.classList.add(r);
      }), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._initialized && (this.removeAllEventListenerInstances(), this._destroyBackdropEl(), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Modal", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype._createBackdrop = function() {
      var e;
      if (this._isHidden) {
        var r = document.createElement("div");
        r.setAttribute("modal-backdrop", ""), (e = r.classList).add.apply(e, this._options.backdropClasses.split(" ")), document.querySelector("body").append(r), this._backdropEl = r;
      }
    }, t.prototype._destroyBackdropEl = function() {
      this._isHidden || document.querySelector("[modal-backdrop]").remove();
    }, t.prototype._setupModalCloseEventListeners = function() {
      var e = this;
      this._options.backdrop === "dynamic" && (this._clickOutsideEventListener = function(r) {
        e._handleOutsideClick(r.target);
      }, this._targetEl.addEventListener("click", this._clickOutsideEventListener, !0)), this._keydownEventListener = function(r) {
        r.key === "Escape" && e.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._removeModalCloseEventListeners = function() {
      this._options.backdrop === "dynamic" && this._targetEl.removeEventListener("click", this._clickOutsideEventListener, !0), document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._handleOutsideClick = function(e) {
      (e === this._targetEl || e === this._backdropEl && this.isVisible()) && this.hide();
    }, t.prototype._getPlacementClasses = function() {
      switch (this._options.placement) {
        case "top-left":
          return ["justify-start", "items-start"];
        case "top-center":
          return ["justify-center", "items-start"];
        case "top-right":
          return ["justify-end", "items-start"];
        case "center-left":
          return ["justify-start", "items-center"];
        case "center":
          return ["justify-center", "items-center"];
        case "center-right":
          return ["justify-end", "items-center"];
        case "bottom-left":
          return ["justify-start", "items-end"];
        case "bottom-center":
          return ["justify-center", "items-end"];
        case "bottom-right":
          return ["justify-end", "items-end"];
        default:
          return ["justify-center", "items-center"];
      }
    }, t.prototype.toggle = function() {
      this._isHidden ? this.show() : this.hide(), this._options.onToggle(this);
    }, t.prototype.show = function() {
      this.isHidden && (this._targetEl.classList.add("flex"), this._targetEl.classList.remove("hidden"), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._createBackdrop(), this._isHidden = !1, this._options.closable && this._setupModalCloseEventListeners(), document.body.classList.add("overflow-hidden"), this._options.onShow(this));
    }, t.prototype.hide = function() {
      this.isVisible && (this._targetEl.classList.add("hidden"), this._targetEl.classList.remove("flex"), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._destroyBackdropEl(), this._isHidden = !0, document.body.classList.remove("overflow-hidden"), this._options.closable && this._removeModalCloseEventListeners(), this._options.onHide(this));
    }, t.prototype.isVisible = function() {
      return !this._isHidden;
    }, t.prototype.isHidden = function() {
      return this._isHidden;
    }, t.prototype.addEventListenerInstance = function(e, r, o) {
      this._eventListenerInstances.push({
        element: e,
        type: r,
        handler: o
      });
    }, t.prototype.removeAllEventListenerInstances = function() {
      this._eventListenerInstances.map(function(e) {
        e.element.removeEventListener(e.type, e.handler);
      }), this._eventListenerInstances = [];
    }, t.prototype.getAllEventListenerInstances = function() {
      return this._eventListenerInstances;
    }, t;
  }()
);
function Di() {
  document.querySelectorAll("[data-modal-target]").forEach(function(t) {
    var e = t.getAttribute("data-modal-target"), r = document.getElementById(e);
    if (r) {
      var o = r.getAttribute("data-modal-placement"), i = r.getAttribute("data-modal-backdrop");
      new ls(r, {
        placement: o || ro.placement,
        backdrop: i || ro.backdrop
      });
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."));
  }), document.querySelectorAll("[data-modal-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-modal-toggle"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Modal", e);
      if (o) {
        var i = function() {
          o.toggle();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."));
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"));
  }), document.querySelectorAll("[data-modal-show]").forEach(function(t) {
    var e = t.getAttribute("data-modal-show"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Modal", e);
      if (o) {
        var i = function() {
          o.show();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."));
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"));
  }), document.querySelectorAll("[data-modal-hide]").forEach(function(t) {
    var e = t.getAttribute("data-modal-hide"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Modal", e);
      if (o) {
        var i = function() {
          o.hide();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."));
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"));
  });
}
typeof window < "u" && (window.Modal = ls, window.initModals = Di);
var oo = function() {
  return oo = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, oo.apply(this, arguments);
}, Me = {
  placement: "left",
  bodyScrolling: !1,
  backdrop: !0,
  edge: !1,
  edgeOffset: "bottom-[60px]",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, nu = {
  id: null,
  override: !0
}, cs = (
  /** @class */
  function() {
    function t(e, r, o) {
      e === void 0 && (e = null), r === void 0 && (r = Me), o === void 0 && (o = nu), this._eventListenerInstances = [], this._instanceId = o.id ? o.id : e.id, this._targetEl = e, this._options = oo(oo({}, Me), r), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Drawer", this, this._instanceId, o.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._targetEl && !this._initialized && (this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.classList.add("transition-transform"), this._getPlacementClasses(this._options.placement).base.map(function(r) {
        e._targetEl.classList.add(r);
      }), this._handleEscapeKey = function(r) {
        r.key === "Escape" && e.isVisible() && e.hide();
      }, document.addEventListener("keydown", this._handleEscapeKey), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._initialized && (this.removeAllEventListenerInstances(), this._destroyBackdropEl(), document.removeEventListener("keydown", this._handleEscapeKey), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Drawer", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.hide = function() {
      var e = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(r) {
        e._targetEl.classList.remove(r);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(r) {
        e._targetEl.classList.add(r);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(r) {
        e._targetEl.classList.remove(r);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(r) {
        e._targetEl.classList.add(r);
      })), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._options.bodyScrolling || document.body.classList.remove("overflow-hidden"), this._options.backdrop && this._destroyBackdropEl(), this._visible = !1, this._options.onHide(this);
    }, t.prototype.show = function() {
      var e = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(r) {
        e._targetEl.classList.add(r);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(r) {
        e._targetEl.classList.remove(r);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(r) {
        e._targetEl.classList.add(r);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(r) {
        e._targetEl.classList.remove(r);
      })), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._options.bodyScrolling || document.body.classList.add("overflow-hidden"), this._options.backdrop && this._createBackdrop(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show();
    }, t.prototype._createBackdrop = function() {
      var e, r = this;
      if (!this._visible) {
        var o = document.createElement("div");
        o.setAttribute("drawer-backdrop", ""), (e = o.classList).add.apply(e, this._options.backdropClasses.split(" ")), document.querySelector("body").append(o), o.addEventListener("click", function() {
          r.hide();
        });
      }
    }, t.prototype._destroyBackdropEl = function() {
      this._visible && document.querySelector("[drawer-backdrop]").remove();
    }, t.prototype._getPlacementClasses = function(e) {
      switch (e) {
        case "top":
          return {
            base: ["top-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["-translate-y-full"]
          };
        case "right":
          return {
            base: ["right-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-x-full"]
          };
        case "bottom":
          return {
            base: ["bottom-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full"]
          };
        case "left":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
        case "bottom-edge":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full", this._options.edgeOffset]
          };
        default:
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
      }
    }, t.prototype.isHidden = function() {
      return !this._visible;
    }, t.prototype.isVisible = function() {
      return this._visible;
    }, t.prototype.addEventListenerInstance = function(e, r, o) {
      this._eventListenerInstances.push({
        element: e,
        type: r,
        handler: o
      });
    }, t.prototype.removeAllEventListenerInstances = function() {
      this._eventListenerInstances.map(function(e) {
        e.element.removeEventListener(e.type, e.handler);
      }), this._eventListenerInstances = [];
    }, t.prototype.getAllEventListenerInstances = function() {
      return this._eventListenerInstances;
    }, t;
  }()
);
function zi() {
  document.querySelectorAll("[data-drawer-target]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-drawer-placement"), i = t.getAttribute("data-drawer-body-scrolling"), n = t.getAttribute("data-drawer-backdrop"), a = t.getAttribute("data-drawer-edge"), s = t.getAttribute("data-drawer-edge-offset");
      new cs(r, {
        placement: o || Me.placement,
        bodyScrolling: i ? i === "true" : Me.bodyScrolling,
        backdrop: n ? n === "true" : Me.backdrop,
        edge: a ? a === "true" : Me.edge,
        edgeOffset: s || Me.edgeOffset
      });
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  }), document.querySelectorAll("[data-drawer-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-toggle"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Drawer", e);
      if (o) {
        var i = function() {
          o.toggle();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  }), document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-dismiss") ? t.getAttribute("data-drawer-dismiss") : t.getAttribute("data-drawer-hide"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Drawer", e);
      if (o) {
        var i = function() {
          o.hide();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"));
  }), document.querySelectorAll("[data-drawer-show]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-show"), r = document.getElementById(e);
    if (r) {
      var o = Y.getInstance("Drawer", e);
      if (o) {
        var i = function() {
          o.show();
        };
        t.addEventListener("click", i), o.addEventListenerInstance(t, "click", i);
      } else
        console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  });
}
typeof window < "u" && (window.Drawer = cs, window.initDrawers = zi);
var io = function() {
  return io = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, io.apply(this, arguments);
}, Vn = {
  defaultTabId: null,
  activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
  inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  onShow: function() {
  }
}, au = {
  id: null,
  override: !0
}, ds = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = Vn), i === void 0 && (i = au), this._instanceId = i.id ? i.id : e.id, this._tabsEl = e, this._items = r, this._activeTab = o ? this.getTab(o.defaultTabId) : null, this._options = io(io({}, Vn), o), this._initialized = !1, this.init(), Y.addInstance("Tabs", this, this._tabsEl.id, !0), Y.addInstance("Tabs", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._items.length && !this._initialized && (this._activeTab || this.setActiveTab(this._items[0]), this.show(this._activeTab.id, !0), this._items.map(function(r) {
        r.triggerEl.addEventListener("click", function() {
          e.show(r.id);
        });
      }));
    }, t.prototype.destroy = function() {
      this._initialized && (this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      this.destroy(), Y.removeInstance("Tabs", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.getActiveTab = function() {
      return this._activeTab;
    }, t.prototype.setActiveTab = function(e) {
      this._activeTab = e;
    }, t.prototype.getTab = function(e) {
      return this._items.filter(function(r) {
        return r.id === e;
      })[0];
    }, t.prototype.show = function(e, r) {
      var o, i, n = this;
      r === void 0 && (r = !1);
      var a = this.getTab(e);
      a === this._activeTab && !r || (this._items.map(function(s) {
        var l, p;
        s !== a && ((l = s.triggerEl.classList).remove.apply(l, n._options.activeClasses.split(" ")), (p = s.triggerEl.classList).add.apply(p, n._options.inactiveClasses.split(" ")), s.targetEl.classList.add("hidden"), s.triggerEl.setAttribute("aria-selected", "false"));
      }), (o = a.triggerEl.classList).add.apply(o, this._options.activeClasses.split(" ")), (i = a.triggerEl.classList).remove.apply(i, this._options.inactiveClasses.split(" ")), a.triggerEl.setAttribute("aria-selected", "true"), a.targetEl.classList.remove("hidden"), this.setActiveTab(a), this._options.onShow(this, a));
    }, t;
  }()
);
function Hi() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function(t) {
    var e = [], r = null;
    t.querySelectorAll('[role="tab"]').forEach(function(o) {
      var i = o.getAttribute("aria-selected") === "true", n = {
        id: o.getAttribute("data-tabs-target"),
        triggerEl: o,
        targetEl: document.querySelector(o.getAttribute("data-tabs-target"))
      };
      e.push(n), i && (r = n.id);
    }), new ds(t, e, {
      defaultTabId: r
    });
  });
}
typeof window < "u" && (window.Tabs = ds, window.initTabs = Hi);
var fe = function() {
  return fe = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, fe.apply(this, arguments);
}, Sr = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, n; o < i; o++)
      (n || !(o in e)) && (n || (n = Array.prototype.slice.call(e, 0, o)), n[o] = e[o]);
  return t.concat(n || Array.prototype.slice.call(e));
}, no = {
  placement: "top",
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, su = {
  id: null,
  override: !0
}, ps = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = no), i === void 0 && (i = su), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = fe(fe({}, no), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Tooltip", this, this._instanceId, i.override);
    }
    return t.prototype.init = function() {
      this._triggerEl && this._targetEl && !this._initialized && (this._setupEventListeners(), this._popperInstance = this._createPopperInstance(), this._initialized = !0);
    }, t.prototype.destroy = function() {
      var e = this;
      if (this._initialized) {
        var r = this._getTriggerEvents();
        r.showEvents.forEach(function(o) {
          e._triggerEl.removeEventListener(o, e._showHandler);
        }), r.hideEvents.forEach(function(o) {
          e._triggerEl.removeEventListener(o, e._hideHandler);
        }), this._removeKeydownListener(), this._removeClickOutsideListener(), this._popperInstance && this._popperInstance.destroy(), this._initialized = !1;
      }
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Tooltip", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype._setupEventListeners = function() {
      var e = this, r = this._getTriggerEvents();
      this._showHandler = function() {
        e.show();
      }, this._hideHandler = function() {
        e.hide();
      }, r.showEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._showHandler);
      }), r.hideEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._hideHandler);
      });
    }, t.prototype._createPopperInstance = function() {
      return ji(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
    }, t.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, t.prototype._setupKeydownListener = function() {
      var e = this;
      this._keydownEventListener = function(r) {
        r.key === "Escape" && e.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._setupClickOutsideListener = function() {
      var e = this;
      this._clickOutsideEventListener = function(r) {
        e._handleClickOutside(r, e._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._handleClickOutside = function(e, r) {
      var o = e.target;
      o !== r && !r.contains(o) && !this._triggerEl.contains(o) && this.isVisible() && this.hide();
    }, t.prototype.isVisible = function() {
      return this._visible;
    }, t.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show();
    }, t.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(e) {
        return fe(fe({}, e), { modifiers: Sr(Sr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(e) {
        return fe(fe({}, e), { modifiers: Sr(Sr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, t;
  }()
);
function Bi() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function(t) {
    var e = t.getAttribute("data-tooltip-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-tooltip-trigger"), i = t.getAttribute("data-tooltip-placement");
      new ps(r, t, {
        placement: i || no.placement,
        triggerType: o || no.triggerType
      });
    } else
      console.error('The tooltip element with id "'.concat(e, '" does not exist. Please check the data-tooltip-target attribute.'));
  });
}
typeof window < "u" && (window.Tooltip = ps, window.initTooltips = Bi);
var he = function() {
  return he = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, he.apply(this, arguments);
}, jr = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, n; o < i; o++)
      (n || !(o in e)) && (n || (n = Array.prototype.slice.call(e, 0, o)), n[o] = e[o]);
  return t.concat(n || Array.prototype.slice.call(e));
}, dr = {
  placement: "top",
  offset: 10,
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, lu = {
  id: null,
  override: !0
}, gs = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = dr), i === void 0 && (i = lu), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = he(he({}, dr), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Popover", this, i.id ? i.id : this._targetEl.id, i.override);
    }
    return t.prototype.init = function() {
      this._triggerEl && this._targetEl && !this._initialized && (this._setupEventListeners(), this._popperInstance = this._createPopperInstance(), this._initialized = !0);
    }, t.prototype.destroy = function() {
      var e = this;
      if (this._initialized) {
        var r = this._getTriggerEvents();
        r.showEvents.forEach(function(o) {
          e._triggerEl.removeEventListener(o, e._showHandler), e._targetEl.removeEventListener(o, e._showHandler);
        }), r.hideEvents.forEach(function(o) {
          e._triggerEl.removeEventListener(o, e._hideHandler), e._targetEl.removeEventListener(o, e._hideHandler);
        }), this._removeKeydownListener(), this._removeClickOutsideListener(), this._popperInstance && this._popperInstance.destroy(), this._initialized = !1;
      }
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Popover", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype._setupEventListeners = function() {
      var e = this, r = this._getTriggerEvents();
      this._showHandler = function() {
        e.show();
      }, this._hideHandler = function() {
        setTimeout(function() {
          e._targetEl.matches(":hover") || e.hide();
        }, 100);
      }, r.showEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._showHandler), e._targetEl.addEventListener(o, e._showHandler);
      }), r.hideEvents.forEach(function(o) {
        e._triggerEl.addEventListener(o, e._hideHandler), e._targetEl.addEventListener(o, e._hideHandler);
      });
    }, t.prototype._createPopperInstance = function() {
      return ji(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, this._options.offset]
            }
          }
        ]
      });
    }, t.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, t.prototype._setupKeydownListener = function() {
      var e = this;
      this._keydownEventListener = function(r) {
        r.key === "Escape" && e.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, t.prototype._setupClickOutsideListener = function() {
      var e = this;
      this._clickOutsideEventListener = function(r) {
        e._handleClickOutside(r, e._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, t.prototype._handleClickOutside = function(e, r) {
      var o = e.target;
      o !== r && !r.contains(o) && !this._triggerEl.contains(o) && this.isVisible() && this.hide();
    }, t.prototype.isVisible = function() {
      return this._visible;
    }, t.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this);
    }, t.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(e) {
        return he(he({}, e), { modifiers: jr(jr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(e) {
        return he(he({}, e), { modifiers: jr(jr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, t;
  }()
);
function Ri() {
  document.querySelectorAll("[data-popover-target]").forEach(function(t) {
    var e = t.getAttribute("data-popover-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-popover-trigger"), i = t.getAttribute("data-popover-placement"), n = t.getAttribute("data-popover-offset");
      new gs(r, t, {
        placement: i || dr.placement,
        offset: n ? parseInt(n) : dr.offset,
        triggerType: o || dr.triggerType
      });
    } else
      console.error('The popover element with id "'.concat(e, '" does not exist. Please check the data-popover-target attribute.'));
  });
}
typeof window < "u" && (window.Popover = gs, window.initPopovers = Ri);
var ao = function() {
  return ao = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ao.apply(this, arguments);
}, Qo = {
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, cu = {
  id: null,
  override: !0
}, us = (
  /** @class */
  function() {
    function t(e, r, o, i, n) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = null), i === void 0 && (i = Qo), n === void 0 && (n = cu), this._instanceId = n.id ? n.id : o.id, this._parentEl = e, this._triggerEl = r, this._targetEl = o, this._options = ao(ao({}, Qo), i), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Dial", this, this._instanceId, n.override);
    }
    return t.prototype.init = function() {
      var e = this;
      if (this._triggerEl && this._targetEl && !this._initialized) {
        var r = this._getTriggerEventTypes(this._options.triggerType);
        this._showEventHandler = function() {
          e.show();
        }, r.showEvents.forEach(function(o) {
          e._triggerEl.addEventListener(o, e._showEventHandler), e._targetEl.addEventListener(o, e._showEventHandler);
        }), this._hideEventHandler = function() {
          e._parentEl.matches(":hover") || e.hide();
        }, r.hideEvents.forEach(function(o) {
          e._parentEl.addEventListener(o, e._hideEventHandler);
        }), this._initialized = !0;
      }
    }, t.prototype.destroy = function() {
      var e = this;
      if (this._initialized) {
        var r = this._getTriggerEventTypes(this._options.triggerType);
        r.showEvents.forEach(function(o) {
          e._triggerEl.removeEventListener(o, e._showEventHandler), e._targetEl.removeEventListener(o, e._showEventHandler);
        }), r.hideEvents.forEach(function(o) {
          e._parentEl.removeEventListener(o, e._hideEventHandler);
        }), this._initialized = !1;
      }
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("Dial", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.hide = function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onHide(this);
    }, t.prototype.show = function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onShow(this);
    }, t.prototype.toggle = function() {
      this._visible ? this.hide() : this.show();
    }, t.prototype.isHidden = function() {
      return !this._visible;
    }, t.prototype.isVisible = function() {
      return this._visible;
    }, t.prototype._getTriggerEventTypes = function(e) {
      switch (e) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, t;
  }()
);
function Fi() {
  document.querySelectorAll("[data-dial-init]").forEach(function(t) {
    var e = t.querySelector("[data-dial-toggle]");
    if (e) {
      var r = e.getAttribute("data-dial-toggle"), o = document.getElementById(r);
      if (o) {
        var i = e.getAttribute("data-dial-trigger");
        new us(t, e, o, {
          triggerType: i || Qo.triggerType
        });
      } else
        console.error("Dial with id ".concat(r, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"));
    } else
      console.error("Dial with id ".concat(t.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
  });
}
typeof window < "u" && (window.Dial = us, window.initDials = Fi);
var so = function() {
  return so = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, so.apply(this, arguments);
}, $n = {
  minValue: null,
  maxValue: null,
  onIncrement: function() {
  },
  onDecrement: function() {
  }
}, du = {
  id: null,
  override: !0
}, fs = (
  /** @class */
  function() {
    function t(e, r, o, i, n) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = null), i === void 0 && (i = $n), n === void 0 && (n = du), this._instanceId = n.id ? n.id : e.id, this._targetEl = e, this._incrementEl = r, this._decrementEl = o, this._options = so(so({}, $n), i), this._initialized = !1, this.init(), Y.addInstance("InputCounter", this, this._instanceId, n.override);
    }
    return t.prototype.init = function() {
      var e = this;
      this._targetEl && !this._initialized && (this._inputHandler = function(r) {
        {
          var o = r.target;
          /^\d*$/.test(o.value) || (o.value = o.value.replace(/[^\d]/g, "")), e._options.maxValue !== null && parseInt(o.value) > e._options.maxValue && (o.value = e._options.maxValue.toString()), e._options.minValue !== null && parseInt(o.value) < e._options.minValue && (o.value = e._options.minValue.toString());
        }
      }, this._incrementClickHandler = function() {
        e.increment();
      }, this._decrementClickHandler = function() {
        e.decrement();
      }, this._targetEl.addEventListener("input", this._inputHandler), this._incrementEl && this._incrementEl.addEventListener("click", this._incrementClickHandler), this._decrementEl && this._decrementEl.addEventListener("click", this._decrementClickHandler), this._initialized = !0);
    }, t.prototype.destroy = function() {
      this._targetEl && this._initialized && (this._targetEl.removeEventListener("input", this._inputHandler), this._incrementEl && this._incrementEl.removeEventListener("click", this._incrementClickHandler), this._decrementEl && this._decrementEl.removeEventListener("click", this._decrementClickHandler), this._initialized = !1);
    }, t.prototype.removeInstance = function() {
      Y.removeInstance("InputCounter", this._instanceId);
    }, t.prototype.destroyAndRemoveInstance = function() {
      this.destroy(), this.removeInstance();
    }, t.prototype.getCurrentValue = function() {
      return parseInt(this._targetEl.value) || 0;
    }, t.prototype.increment = function() {
      this._options.maxValue !== null && this.getCurrentValue() >= this._options.maxValue || (this._targetEl.value = (this.getCurrentValue() + 1).toString(), this._options.onIncrement(this));
    }, t.prototype.decrement = function() {
      this._options.minValue !== null && this.getCurrentValue() <= this._options.minValue || (this._targetEl.value = (this.getCurrentValue() - 1).toString(), this._options.onDecrement(this));
    }, t;
  }()
);
function Ni() {
  document.querySelectorAll("[data-input-counter]").forEach(function(t) {
    var e = t.id, r = document.querySelector('[data-input-counter-increment="' + e + '"]'), o = document.querySelector('[data-input-counter-decrement="' + e + '"]'), i = t.getAttribute("data-input-counter-min"), n = t.getAttribute("data-input-counter-max");
    t ? Y.instanceExists("InputCounter", t.getAttribute("id")) || new fs(t, r || null, o || null, {
      minValue: i ? parseInt(i) : null,
      maxValue: n ? parseInt(n) : null
    }) : console.error('The target element with id "'.concat(e, '" does not exist. Please check the data-input-counter attribute.'));
  });
}
typeof window < "u" && (window.InputCounter = fs, window.initInputCounters = Ni);
function pu() {
  ki(), _i(), Ei(), Ci(), Mi(), Di(), zi(), Hi(), Bi(), Ri(), Fi(), Ni();
}
typeof window < "u" && (window.initFlowbite = pu);
var gu = new Kp("load", [
  ki,
  _i,
  Ei,
  Ci,
  Mi,
  Di,
  zi,
  Hi,
  Bi,
  Ri,
  Fi,
  Ni
]);
gu.init();
const uu = /* @__PURE__ */ Wc(qp);
customElements.define("ap-marketing-table", uu);

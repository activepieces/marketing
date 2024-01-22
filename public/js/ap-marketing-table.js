/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ri(t, e) {
  const r = new Set(t.split(","));
  return e ? (o) => r.has(o.toLowerCase()) : (o) => r.has(o);
}
const at = {}, qe = [], It = () => {
}, ys = () => !1, uo = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), oi = (t) => t.startsWith("onUpdate:"), ct = Object.assign, ii = (t, e) => {
  const r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}, xs = Object.prototype.hasOwnProperty, Z = (t, e) => xs.call(t, e), M = Array.isArray, We = (t) => Er(t) === "[object Map]", rr = (t) => Er(t) === "[object Set]", Gi = (t) => Er(t) === "[object Date]", N = (t) => typeof t == "function", dt = (t) => typeof t == "string", ve = (t) => typeof t == "symbol", it = (t) => t !== null && typeof t == "object", Ga = (t) => (it(t) || N(t)) && N(t.then) && N(t.catch), Xa = Object.prototype.toString, Er = (t) => Xa.call(t), ks = (t) => Er(t).slice(8, -1), Za = (t) => Er(t) === "[object Object]", ai = (t) => dt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Fr = /* @__PURE__ */ ri(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), fo = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (r) => e[r] || (e[r] = t(r));
}, _s = /-(\w)/g, Jt = fo((t) => t.replace(_s, (e, r) => r ? r.toUpperCase() : "")), Es = /\B([A-Z])/g, Ft = fo(
  (t) => t.replace(Es, "-$1").toLowerCase()
), Ja = fo((t) => t.charAt(0).toUpperCase() + t.slice(1)), Co = fo((t) => t ? `on${Ja(t)}` : ""), be = (t, e) => !Object.is(t, e), Rr = (t, e) => {
  for (let r = 0; r < t.length; r++)
    t[r](e);
}, Kr = (t, e, r) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
}, ni = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Mo = (t) => {
  const e = dt(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Xi;
const Qa = () => Xi || (Xi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function si(t) {
  if (M(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const o = t[r], i = dt(o) ? Ls(o) : si(o);
      if (i)
        for (const a in i)
          e[a] = i[a];
    }
    return e;
  } else if (dt(t) || it(t))
    return t;
}
const Cs = /;(?![^(]*\))/g, As = /:([^]+)/, Is = /\/\*[^]*?\*\//g;
function Ls(t) {
  const e = {};
  return t.replace(Is, "").split(Cs).forEach((r) => {
    if (r) {
      const o = r.split(As);
      o.length > 1 && (e[o[0].trim()] = o[1].trim());
    }
  }), e;
}
function et(t) {
  let e = "";
  if (dt(t))
    e = t;
  else if (M(t))
    for (let r = 0; r < t.length; r++) {
      const o = et(t[r]);
      o && (e += o + " ");
    }
  else if (it(t))
    for (const r in t)
      t[r] && (e += r + " ");
  return e.trim();
}
const Ts = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Os = /* @__PURE__ */ ri(Ts);
function tn(t) {
  return !!t || t === "";
}
function Ss(t, e) {
  if (t.length !== e.length)
    return !1;
  let r = !0;
  for (let o = 0; r && o < t.length; o++)
    r = Xe(t[o], e[o]);
  return r;
}
function Xe(t, e) {
  if (t === e)
    return !0;
  let r = Gi(t), o = Gi(e);
  if (r || o)
    return r && o ? t.getTime() === e.getTime() : !1;
  if (r = ve(t), o = ve(e), r || o)
    return t === e;
  if (r = M(t), o = M(e), r || o)
    return r && o ? Ss(t, e) : !1;
  if (r = it(t), o = it(e), r || o) {
    if (!r || !o)
      return !1;
    const i = Object.keys(t).length, a = Object.keys(e).length;
    if (i !== a)
      return !1;
    for (const n in t) {
      const s = t.hasOwnProperty(n), c = e.hasOwnProperty(n);
      if (s && !c || !s && c || !Xe(t[n], e[n]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function li(t, e) {
  return t.findIndex((r) => Xe(r, e));
}
const Ut = (t) => dt(t) ? t : t == null ? "" : M(t) || it(t) && (t.toString === Xa || !N(t.toString)) ? JSON.stringify(t, en, 2) : String(t), en = (t, e) => e && e.__v_isRef ? en(t, e.value) : We(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (r, [o, i], a) => (r[Ao(o, a) + " =>"] = i, r),
    {}
  )
} : rr(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((r) => Ao(r))
} : ve(e) ? Ao(e) : it(e) && !M(e) && !Za(e) ? String(e) : e, Ao = (t, e = "") => {
  var r;
  return ve(t) ? `Symbol(${(r = t.description) != null ? r : e})` : t;
};
let Bt;
class Ps {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Bt, !e && Bt && (this.index = (Bt.scopes || (Bt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const r = Bt;
      try {
        return Bt = this, e();
      } finally {
        Bt = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Bt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Bt = this.parent;
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
function Ds(t, e = Bt) {
  e && e.active && e.effects.push(t);
}
function js() {
  return Bt;
}
let ze;
class ci {
  constructor(e, r, o, i) {
    this.fn = e, this.trigger = r, this.scheduler = o, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ds(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      ye();
      for (let e = 0; e < this._depsLength; e++) {
        const r = this.deps[e];
        if (r.computed && (zs(r.computed), this._dirtyLevel >= 2))
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
      return we = !0, ze = this, this._runnings++, Zi(this), this.fn();
    } finally {
      Ji(this), this._runnings--, ze = r, we = e;
    }
  }
  stop() {
    var e;
    this.active && (Zi(this), Ji(this), (e = this.onStop) == null || e.call(this), this.active = !1);
  }
}
function zs(t) {
  return t.value;
}
function Zi(t) {
  t._trackId++, t._depsLength = 0;
}
function Ji(t) {
  if (t.deps && t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      rn(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function rn(t, e) {
  const r = t.get(e);
  r !== void 0 && e._trackId !== r && (t.delete(e), t.size === 0 && t.cleanup());
}
let we = !0, Ho = 0;
const on = [];
function ye() {
  on.push(we), we = !1;
}
function xe() {
  const t = on.pop();
  we = t === void 0 ? !0 : t;
}
function di() {
  Ho++;
}
function pi() {
  for (Ho--; !Ho && Bo.length; )
    Bo.shift()();
}
function an(t, e, r) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const o = t.deps[t._depsLength];
    o !== e ? (o && rn(o, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const Bo = [];
function nn(t, e, r) {
  di();
  for (const o of t.keys())
    if (o._dirtyLevel < e && t.get(o) === o._trackId) {
      const i = o._dirtyLevel;
      o._dirtyLevel = e, i === 0 && (o._shouldSchedule = !0, o.trigger());
    }
  sn(t), pi();
}
function sn(t) {
  for (const e of t.keys())
    e.scheduler && e._shouldSchedule && (!e._runnings || e.allowRecurse) && t.get(e) === e._trackId && (e._shouldSchedule = !1, Bo.push(e.scheduler));
}
const ln = (t, e) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = t, r.computed = e, r;
}, Fo = /* @__PURE__ */ new WeakMap(), Me = Symbol(""), Ro = Symbol("");
function Et(t, e, r) {
  if (we && ze) {
    let o = Fo.get(t);
    o || Fo.set(t, o = /* @__PURE__ */ new Map());
    let i = o.get(r);
    i || o.set(r, i = ln(() => o.delete(r))), an(
      ze,
      i
    );
  }
}
function Qt(t, e, r, o, i, a) {
  const n = Fo.get(t);
  if (!n)
    return;
  let s = [];
  if (e === "clear")
    s = [...n.values()];
  else if (r === "length" && M(t)) {
    const c = Number(o);
    n.forEach((d, g) => {
      (g === "length" || !ve(g) && g >= c) && s.push(d);
    });
  } else
    switch (r !== void 0 && s.push(n.get(r)), e) {
      case "add":
        M(t) ? ai(r) && s.push(n.get("length")) : (s.push(n.get(Me)), We(t) && s.push(n.get(Ro)));
        break;
      case "delete":
        M(t) || (s.push(n.get(Me)), We(t) && s.push(n.get(Ro)));
        break;
      case "set":
        We(t) && s.push(n.get(Me));
        break;
    }
  di();
  for (const c of s)
    c && nn(
      c,
      2
    );
  pi();
}
const Ms = /* @__PURE__ */ ri("__proto__,__v_isRef,__isVue"), cn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(ve)
), Qi = /* @__PURE__ */ Hs();
function Hs() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...r) {
      const o = G(this);
      for (let a = 0, n = this.length; a < n; a++)
        Et(o, "get", a + "");
      const i = o[e](...r);
      return i === -1 || i === !1 ? o[e](...r.map(G)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...r) {
      ye(), di();
      const o = G(this)[e].apply(this, r);
      return pi(), xe(), o;
    };
  }), t;
}
function Bs(t) {
  const e = G(this);
  return Et(e, "has", t), e.hasOwnProperty(t);
}
class dn {
  constructor(e = !1, r = !1) {
    this._isReadonly = e, this._shallow = r;
  }
  get(e, r, o) {
    const i = this._isReadonly, a = this._shallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return a;
    if (r === "__v_raw")
      return o === (i ? a ? Zs : fn : a ? un : gn).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(o) ? e : void 0;
    const n = M(e);
    if (!i) {
      if (n && Z(Qi, r))
        return Reflect.get(Qi, r, o);
      if (r === "hasOwnProperty")
        return Bs;
    }
    const s = Reflect.get(e, r, o);
    return (ve(r) ? cn.has(r) : Ms(r)) || (i || Et(e, "get", r), a) ? s : ut(s) ? n && ai(r) ? s : s.value : it(s) ? i ? hn(s) : fi(s) : s;
  }
}
class pn extends dn {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, r, o, i) {
    let a = e[r];
    if (!this._shallow) {
      const c = Ze(a);
      if (!Yr(o) && !Ze(o) && (a = G(a), o = G(o)), !M(e) && ut(a) && !ut(o))
        return c ? !1 : (a.value = o, !0);
    }
    const n = M(e) && ai(r) ? Number(r) < e.length : Z(e, r), s = Reflect.set(e, r, o, i);
    return e === G(i) && (n ? be(o, a) && Qt(e, "set", r, o) : Qt(e, "add", r, o)), s;
  }
  deleteProperty(e, r) {
    const o = Z(e, r);
    e[r];
    const i = Reflect.deleteProperty(e, r);
    return i && o && Qt(e, "delete", r, void 0), i;
  }
  has(e, r) {
    const o = Reflect.has(e, r);
    return (!ve(r) || !cn.has(r)) && Et(e, "has", r), o;
  }
  ownKeys(e) {
    return Et(
      e,
      "iterate",
      M(e) ? "length" : Me
    ), Reflect.ownKeys(e);
  }
}
class Fs extends dn {
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
const Rs = /* @__PURE__ */ new pn(), Ns = /* @__PURE__ */ new Fs(), Vs = /* @__PURE__ */ new pn(
  !0
), gi = (t) => t, ho = (t) => Reflect.getPrototypeOf(t);
function Lr(t, e, r = !1, o = !1) {
  t = t.__v_raw;
  const i = G(t), a = G(e);
  r || (be(e, a) && Et(i, "get", e), Et(i, "get", a));
  const { has: n } = ho(i), s = o ? gi : r ? wi : wr;
  if (n.call(i, e))
    return s(t.get(e));
  if (n.call(i, a))
    return s(t.get(a));
  t !== i && t.get(e);
}
function Tr(t, e = !1) {
  const r = this.__v_raw, o = G(r), i = G(t);
  return e || (be(t, i) && Et(o, "has", t), Et(o, "has", i)), t === i ? r.has(t) : r.has(t) || r.has(i);
}
function Or(t, e = !1) {
  return t = t.__v_raw, !e && Et(G(t), "iterate", Me), Reflect.get(t, "size", t);
}
function ta(t) {
  t = G(t);
  const e = G(this);
  return ho(e).has.call(e, t) || (e.add(t), Qt(e, "add", t, t)), this;
}
function ea(t, e) {
  e = G(e);
  const r = G(this), { has: o, get: i } = ho(r);
  let a = o.call(r, t);
  a || (t = G(t), a = o.call(r, t));
  const n = i.call(r, t);
  return r.set(t, e), a ? be(e, n) && Qt(r, "set", t, e) : Qt(r, "add", t, e), this;
}
function ra(t) {
  const e = G(this), { has: r, get: o } = ho(e);
  let i = r.call(e, t);
  i || (t = G(t), i = r.call(e, t)), o && o.call(e, t);
  const a = e.delete(t);
  return i && Qt(e, "delete", t, void 0), a;
}
function oa() {
  const t = G(this), e = t.size !== 0, r = t.clear();
  return e && Qt(t, "clear", void 0, void 0), r;
}
function Sr(t, e) {
  return function(o, i) {
    const a = this, n = a.__v_raw, s = G(n), c = e ? gi : t ? wi : wr;
    return !t && Et(s, "iterate", Me), n.forEach((d, g) => o.call(i, c(d), c(g), a));
  };
}
function Pr(t, e, r) {
  return function(...o) {
    const i = this.__v_raw, a = G(i), n = We(a), s = t === "entries" || t === Symbol.iterator && n, c = t === "keys" && n, d = i[t](...o), g = r ? gi : e ? wi : wr;
    return !e && Et(
      a,
      "iterate",
      c ? Ro : Me
    ), {
      // iterator protocol
      next() {
        const { value: h, done: w } = d.next();
        return w ? { value: h, done: w } : {
          value: s ? [g(h[0]), g(h[1])] : g(h),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ae(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function $s() {
  const t = {
    get(a) {
      return Lr(this, a);
    },
    get size() {
      return Or(this);
    },
    has: Tr,
    add: ta,
    set: ea,
    delete: ra,
    clear: oa,
    forEach: Sr(!1, !1)
  }, e = {
    get(a) {
      return Lr(this, a, !1, !0);
    },
    get size() {
      return Or(this);
    },
    has: Tr,
    add: ta,
    set: ea,
    delete: ra,
    clear: oa,
    forEach: Sr(!1, !0)
  }, r = {
    get(a) {
      return Lr(this, a, !0);
    },
    get size() {
      return Or(this, !0);
    },
    has(a) {
      return Tr.call(this, a, !0);
    },
    add: ae("add"),
    set: ae("set"),
    delete: ae("delete"),
    clear: ae("clear"),
    forEach: Sr(!0, !1)
  }, o = {
    get(a) {
      return Lr(this, a, !0, !0);
    },
    get size() {
      return Or(this, !0);
    },
    has(a) {
      return Tr.call(this, a, !0);
    },
    add: ae("add"),
    set: ae("set"),
    delete: ae("delete"),
    clear: ae("clear"),
    forEach: Sr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    t[a] = Pr(
      a,
      !1,
      !1
    ), r[a] = Pr(
      a,
      !0,
      !1
    ), e[a] = Pr(
      a,
      !1,
      !0
    ), o[a] = Pr(
      a,
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
  Us,
  qs,
  Ws,
  Ks
] = /* @__PURE__ */ $s();
function ui(t, e) {
  const r = e ? t ? Ks : Ws : t ? qs : Us;
  return (o, i, a) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? o : Reflect.get(
    Z(r, i) && i in o ? r : o,
    i,
    a
  );
}
const Ys = {
  get: /* @__PURE__ */ ui(!1, !1)
}, Gs = {
  get: /* @__PURE__ */ ui(!1, !0)
}, Xs = {
  get: /* @__PURE__ */ ui(!0, !1)
}, gn = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap();
function Js(t) {
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
function Qs(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Js(ks(t));
}
function fi(t) {
  return Ze(t) ? t : hi(
    t,
    !1,
    Rs,
    Ys,
    gn
  );
}
function tl(t) {
  return hi(
    t,
    !1,
    Vs,
    Gs,
    un
  );
}
function hn(t) {
  return hi(
    t,
    !0,
    Ns,
    Xs,
    fn
  );
}
function hi(t, e, r, o, i) {
  if (!it(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const a = i.get(t);
  if (a)
    return a;
  const n = Qs(t);
  if (n === 0)
    return t;
  const s = new Proxy(
    t,
    n === 2 ? o : r
  );
  return i.set(t, s), s;
}
function Ke(t) {
  return Ze(t) ? Ke(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Ze(t) {
  return !!(t && t.__v_isReadonly);
}
function Yr(t) {
  return !!(t && t.__v_isShallow);
}
function wn(t) {
  return Ke(t) || Ze(t);
}
function G(t) {
  const e = t && t.__v_raw;
  return e ? G(e) : t;
}
function vn(t) {
  return Kr(t, "__v_skip", !0), t;
}
const wr = (t) => it(t) ? fi(t) : t, wi = (t) => it(t) ? hn(t) : t;
class bn {
  constructor(e, r, o, i) {
    this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ci(
      () => e(this._value),
      () => Nr(this, 1),
      () => this.dep && sn(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = o;
  }
  get value() {
    const e = G(this);
    return (!e._cacheable || e.effect.dirty) && be(e._value, e._value = e.effect.run()) && Nr(e, 2), mn(e), e.effect._dirtyLevel >= 1 && Nr(e, 1), e._value;
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
function el(t, e, r = !1) {
  let o, i;
  const a = N(t);
  return a ? (o = t, i = It) : (o = t.get, i = t.set), new bn(o, i, a || !i, r);
}
function mn(t) {
  we && ze && (t = G(t), an(
    ze,
    t.dep || (t.dep = ln(
      () => t.dep = void 0,
      t instanceof bn ? t : void 0
    ))
  ));
}
function Nr(t, e = 2, r) {
  t = G(t);
  const o = t.dep;
  o && nn(
    o,
    e
  );
}
function ut(t) {
  return !!(t && t.__v_isRef === !0);
}
function ar(t) {
  return rl(t, !1);
}
function rl(t, e) {
  return ut(t) ? t : new ol(t, e);
}
class ol {
  constructor(e, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? e : G(e), this._value = r ? e : wr(e);
  }
  get value() {
    return mn(this), this._value;
  }
  set value(e) {
    const r = this.__v_isShallow || Yr(e) || Ze(e);
    e = r ? e : G(e), be(e, this._rawValue) && (this._rawValue = e, this._value = r ? e : wr(e), Nr(this, 2));
  }
}
function st(t) {
  return ut(t) ? t.value : t;
}
const il = {
  get: (t, e, r) => st(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const i = t[e];
    return ut(i) && !ut(r) ? (i.value = r, !0) : Reflect.set(t, e, r, o);
  }
};
function yn(t) {
  return Ke(t) ? t : new Proxy(t, il);
}
var cr = { LESSOPEN: "| /usr/bin/lesspipe %s", USER: "abdul", npm_config_user_agent: "npm/10.2.4 node/v21.4.0 linux x64 workspaces/false", GIT_ASKPASS: "/home/abdul/.vscode-server/bin/8b3775030ed1a69b13e4f4c628c612102e30a681/extensions/git/dist/askpass.sh", npm_node_execpath: "/usr/local/bin/node", SHLVL: "2", npm_config_noproxy: "", MOTD_SHOWN: "update-motd", HOME: "/home/abdul", OLDPWD: "/home/abdul/work/marketing", TERM_PROGRAM_VERSION: "1.85.2", VSCODE_IPC_HOOK_CLI: "/mnt/wslg/runtime-dir/vscode-ipc-1191cee0-c20d-4b54-9b08-6b9ddc20993b.sock", npm_package_json: "/home/abdul/work/marketing/ap-marketing-web-components/package.json", VSCODE_GIT_ASKPASS_MAIN: "/home/abdul/.vscode-server/bin/8b3775030ed1a69b13e4f4c628c612102e30a681/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/home/abdul/.vscode-server/bin/8b3775030ed1a69b13e4f4c628c612102e30a681/node", npm_config_userconfig: "/home/abdul/.npmrc", npm_config_local_prefix: "/home/abdul/work/marketing/ap-marketing-web-components", COLORTERM: "truecolor", WSL_DISTRO_NAME: "Ubuntu", COLOR: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "abdul", NAME: "Code", WSL_INTEROP: "/run/WSL/2255_interop", PULSE_SERVER: "unix:/mnt/wslg/PulseServer", _: "/usr/local/bin/npm", npm_config_prefix: "/usr/local", npm_config_npm_version: "10.2.4", TERM: "xterm-256color", npm_config_cache: "/home/abdul/.npm", npm_config_node_gyp: "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", PATH: "/home/abdul/work/marketing/ap-marketing-web-components/node_modules/.bin:/home/abdul/work/marketing/node_modules/.bin:/home/abdul/work/node_modules/.bin:/home/abdul/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/usr/local/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/abdul/.vscode-server/bin/8b3775030ed1a69b13e4f4c628c612102e30a681/bin/remote-cli:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files/WindowsApps/CanonicalGroupLimited.UbuntuonWindows_2004.2022.1.0_x64__79rhkp1fndgsc:/mnt/c/Program Files (x86)/Common Files/Intel/Shared Libraries/redist/intel64/compiler:/mnt/c/Python39/Scripts/:/mnt/c/Python39/:/mnt/c/Program Files/Common Files/Oracle/Java/javapath:/mnt/c/Windows/system32:/mnt/c/Windows:/mnt/c/Windows/System32/Wbem:/mnt/c/Windows/System32/WindowsPowerShell/v1.0/:/mnt/c/Windows/System32/OpenSSH/:/mnt/c/Program Files/NVIDIA Corporation/NVIDIA NvDLISR:/mnt/c/Program Files/apache-maven-3.6.3/bin:/mnt/c/Program Files/Microsoft SQL Server/130/Tools/Binn/:/mnt/c/Program Files/Microsoft SQL Server/Client SDK/ODBC/170/Tools/Binn/:/mnt/c/ProgramData/chocolatey/bin:/mnt/c/Program Files/Git/cmd:/mnt/c/Program Files/Perforce/:/mnt/c/Program Files/PuTTY/:/mnt/c/Program Files/dotnet/:/mnt/c/Program Files (x86)/2DKit/bin:/mnt/c/Program Files (x86)/2DKit/tools/haxe:/mnt/c/Program Files (x86)/2DKit/tools/neko:/mnt/d/zstd:/mnt/c/Program Files/PostgreSQL/15/bin/psql.exe:/mnt/c/Users/user/AppData/Roaming/nvm:/mnt/c/Program Files/nodejs:/Docker/host/bin:/mnt/c/Program Files (x86)/NVIDIA Corporation/PhysX/Common:/mnt/c/Users/user/scoop/shims:/mnt/c/Ruby31-x64/bin:/mnt/c/Users/user/AppData/Local/Microsoft/WindowsApps:/mnt/c/Program Files/Java/jdk-15.0.2:/mnt/c/Users/user/AppData/Local/Programs/Microsoft VS Code/bin:/mnt/c/Users/user/AppData/Local/Android/Sdk/platform-tools:/mnt/c/Users/user/AppData/Local/Android/Sdk/tools:/mnt/c/Users/user/AppData/Local/GitHubDesktop/bin:/mnt/e/sdks/flutter/bin:/mnt/c/Program Files (x86)/Exercism:/mnt/c/Program Files/JetBrains/IntelliJ IDEA Educational Edition 2022.1.1/bin:/mnt/c/Program Files/Git/usr/bin/cygpath.exe:/mnt/c/Users/user/AppData/Roaming/npm:/mnt/c/cygwin64:/mnt/c/Program Files/PostgreSQL/15/bin:/mnt/c/Users/user/AppData/Local/Programs/Microsoft VS Code Insiders/bin:/mnt/c/Users/user/Downloads:/mnt/c/Users/user/.dotnet/tools:/mnt/c/Users/user/Desktop/shaders/glslViewer/Release:/snap/bin", NODE: "/usr/local/bin/node", npm_package_name: "ap-marketing-web-components", XDG_RUNTIME_DIR: "/mnt/wslg/runtime-dir", DISPLAY: ":0", LANG: "C.UTF-8", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/mnt/wslg/runtime-dir/vscode-git-956cc6e502.sock", TERM_PROGRAM: "vscode", npm_lifecycle_script: "vite build", SHELL: "/bin/bash", npm_package_version: "0.0.0", npm_lifecycle_event: "build", LESSCLOSE: "/usr/bin/lesspipe %s %s", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", npm_config_globalconfig: "/usr/local/etc/npmrc", npm_config_init_module: "/home/abdul/.npm-init.js", PWD: "/home/abdul/work/marketing/ap-marketing-web-components", npm_execpath: "/usr/local/lib/node_modules/npm/bin/npm-cli.js", XDG_DATA_DIRS: "/usr/local/share:/usr/share:/var/lib/snapd/desktop", npm_config_global_prefix: "/usr/local", npm_command: "run-script", WSL2_GUI_APPS_ENABLED: "1", HOSTTYPE: "x86_64", WSLENV: `ELECTRON_RUN_AS_NODE/w:
`, INIT_CWD: "/home/abdul/work/marketing/ap-marketing-web-components", EDITOR: "vi", NODE_ENV: "production" };
const dr = [];
function al(t, ...e) {
  ye();
  const r = dr.length ? dr[dr.length - 1].component : null, o = r && r.appContext.config.warnHandler, i = nl();
  if (o)
    te(
      o,
      r,
      11,
      [
        t + e.join(""),
        r && r.proxy,
        i.map(
          ({ vnode: a }) => `at <${Zn(r, a.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const a = [`[Vue warn]: ${t}`, ...e];
    i.length && a.push(`
`, ...sl(i)), console.warn(...a);
  }
  xe();
}
function nl() {
  let t = dr[dr.length - 1];
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
function sl(t) {
  const e = [];
  return t.forEach((r, o) => {
    e.push(...o === 0 ? [] : [`
`], ...ll(r));
  }), e;
}
function ll({ vnode: t, recurseCount: e }) {
  const r = e > 0 ? `... (${e} recursive calls)` : "", o = t.component ? t.component.parent == null : !1, i = ` at <${Zn(
    t.component,
    t.type,
    o
  )}`, a = ">" + r;
  return t.props ? [i, ...cl(t.props), a] : [i + a];
}
function cl(t) {
  const e = [], r = Object.keys(t);
  return r.slice(0, 3).forEach((o) => {
    e.push(...xn(o, t[o]));
  }), r.length > 3 && e.push(" ..."), e;
}
function xn(t, e, r) {
  return dt(e) ? (e = JSON.stringify(e), r ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? r ? e : [`${t}=${e}`] : ut(e) ? (e = xn(t, G(e.value), !0), r ? e : [`${t}=Ref<`, e, ">"]) : N(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = G(e), r ? e : [`${t}=`, e]);
}
function te(t, e, r, o) {
  let i;
  try {
    i = o ? t(...o) : t();
  } catch (a) {
    wo(a, e, r);
  }
  return i;
}
function St(t, e, r, o) {
  if (N(t)) {
    const a = te(t, e, r, o);
    return a && Ga(a) && a.catch((n) => {
      wo(n, e, r);
    }), a;
  }
  const i = [];
  for (let a = 0; a < t.length; a++)
    i.push(St(t[a], e, r, o));
  return i;
}
function wo(t, e, r, o = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let a = e.parent;
    const n = e.proxy, s = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let g = 0; g < d.length; g++)
          if (d[g](t, n, s) === !1)
            return;
      }
      a = a.parent;
    }
    const c = e.appContext.config.errorHandler;
    if (c) {
      te(
        c,
        null,
        10,
        [t, n, s]
      );
      return;
    }
  }
  dl(t, r, i, o);
}
function dl(t, e, r, o = !0) {
  console.error(t);
}
let vr = !1, No = !1;
const ht = [];
let Kt = 0;
const Ye = [];
let le = null, Oe = 0;
const kn = /* @__PURE__ */ Promise.resolve();
let vi = null;
function bi(t) {
  const e = vi || kn;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function pl(t) {
  let e = Kt + 1, r = ht.length;
  for (; e < r; ) {
    const o = e + r >>> 1, i = ht[o], a = br(i);
    a < t || a === t && i.pre ? e = o + 1 : r = o;
  }
  return e;
}
function mi(t) {
  (!ht.length || !ht.includes(
    t,
    vr && t.allowRecurse ? Kt + 1 : Kt
  )) && (t.id == null ? ht.push(t) : ht.splice(pl(t.id), 0, t), _n());
}
function _n() {
  !vr && !No && (No = !0, vi = kn.then(Cn));
}
function gl(t) {
  const e = ht.indexOf(t);
  e > Kt && ht.splice(e, 1);
}
function ul(t) {
  M(t) ? Ye.push(...t) : (!le || !le.includes(
    t,
    t.allowRecurse ? Oe + 1 : Oe
  )) && Ye.push(t), _n();
}
function ia(t, e, r = vr ? Kt + 1 : 0) {
  for (; r < ht.length; r++) {
    const o = ht[r];
    if (o && o.pre) {
      if (t && o.id !== t.uid)
        continue;
      ht.splice(r, 1), r--, o();
    }
  }
}
function En(t) {
  if (Ye.length) {
    const e = [...new Set(Ye)].sort(
      (r, o) => br(r) - br(o)
    );
    if (Ye.length = 0, le) {
      le.push(...e);
      return;
    }
    for (le = e, Oe = 0; Oe < le.length; Oe++)
      le[Oe]();
    le = null, Oe = 0;
  }
}
const br = (t) => t.id == null ? 1 / 0 : t.id, fl = (t, e) => {
  const r = br(t) - br(e);
  if (r === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return r;
};
function Cn(t) {
  No = !1, vr = !0, ht.sort(fl);
  const e = It;
  try {
    for (Kt = 0; Kt < ht.length; Kt++) {
      const r = ht[Kt];
      r && r.active !== !1 && (cr.NODE_ENV !== "production" && e(r), te(r, null, 14));
    }
  } finally {
    Kt = 0, ht.length = 0, En(), vr = !1, vi = null, (ht.length || Ye.length) && Cn();
  }
}
function hl(t, e, ...r) {
  if (t.isUnmounted)
    return;
  const o = t.vnode.props || at;
  let i = r;
  const a = e.startsWith("update:"), n = a && e.slice(7);
  if (n && n in o) {
    const g = `${n === "modelValue" ? "model" : n}Modifiers`, { number: h, trim: w } = o[g] || at;
    w && (i = r.map((y) => dt(y) ? y.trim() : y)), h && (i = r.map(ni));
  }
  let s, c = o[s = Co(e)] || // also try camelCase event handler (#2249)
  o[s = Co(Jt(e))];
  !c && a && (c = o[s = Co(Ft(e))]), c && St(
    c,
    t,
    6,
    i
  );
  const d = o[s + "Once"];
  if (d) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[s])
      return;
    t.emitted[s] = !0, St(
      d,
      t,
      6,
      i
    );
  }
}
function An(t, e, r = !1) {
  const o = e.emitsCache, i = o.get(t);
  if (i !== void 0)
    return i;
  const a = t.emits;
  let n = {}, s = !1;
  if (!N(t)) {
    const c = (d) => {
      const g = An(d, e, !0);
      g && (s = !0, ct(n, g));
    };
    !r && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !a && !s ? (it(t) && o.set(t, null), null) : (M(a) ? a.forEach((c) => n[c] = null) : ct(n, a), it(t) && o.set(t, n), n);
}
function vo(t, e) {
  return !t || !uo(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), Z(t, e[0].toLowerCase() + e.slice(1)) || Z(t, Ft(e)) || Z(t, e));
}
let xt = null, In = null;
function Gr(t) {
  const e = xt;
  return xt = t, In = t && t.type.__scopeId || null, e;
}
function Ln(t, e = xt, r) {
  if (!e || t._n)
    return t;
  const o = (...i) => {
    o._d && wa(-1);
    const a = Gr(e);
    let n;
    try {
      n = t(...i);
    } finally {
      Gr(a), o._d && wa(1);
    }
    return n;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Io(t) {
  const {
    type: e,
    vnode: r,
    proxy: o,
    withProxy: i,
    props: a,
    propsOptions: [n],
    slots: s,
    attrs: c,
    emit: d,
    render: g,
    renderCache: h,
    data: w,
    setupState: y,
    ctx: P,
    inheritAttrs: E
  } = t;
  let T, H;
  const U = Gr(t);
  try {
    if (r.shapeFlag & 4) {
      const O = i || o, B = cr.NODE_ENV !== "production" && y.__isScriptSetup ? new Proxy(O, {
        get(I, $, S) {
          return al(
            `Property '${String(
              $
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(I, $, S);
        }
      }) : O;
      T = Wt(
        g.call(
          B,
          O,
          h,
          a,
          y,
          w,
          P
        )
      ), H = c;
    } else {
      const O = e;
      cr.NODE_ENV, T = Wt(
        O.length > 1 ? O(
          a,
          cr.NODE_ENV !== "production" ? {
            get attrs() {
              return c;
            },
            slots: s,
            emit: d
          } : { attrs: c, slots: s, emit: d }
        ) : O(
          a,
          null
          /* we know it doesn't need it */
        )
      ), H = e.props ? c : wl(c);
    }
  } catch (O) {
    gr.length = 0, wo(O, t, 1), T = wt(Nt);
  }
  let j = T;
  if (H && E !== !1) {
    const O = Object.keys(H), { shapeFlag: B } = j;
    O.length && B & 7 && (n && O.some(oi) && (H = vl(
      H,
      n
    )), j = me(j, H));
  }
  return r.dirs && (j = me(j), j.dirs = j.dirs ? j.dirs.concat(r.dirs) : r.dirs), r.transition && (j.transition = r.transition), T = j, Gr(U), T;
}
const wl = (t) => {
  let e;
  for (const r in t)
    (r === "class" || r === "style" || uo(r)) && ((e || (e = {}))[r] = t[r]);
  return e;
}, vl = (t, e) => {
  const r = {};
  for (const o in t)
    (!oi(o) || !(o.slice(9) in e)) && (r[o] = t[o]);
  return r;
};
function bl(t, e, r) {
  const { props: o, children: i, component: a } = t, { props: n, children: s, patchFlag: c } = e, d = a.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (r && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return o ? aa(o, n, d) : !!n;
    if (c & 8) {
      const g = e.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        const w = g[h];
        if (n[w] !== o[w] && !vo(d, w))
          return !0;
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : o === n ? !1 : o ? n ? aa(o, n, d) : !0 : !!n;
  return !1;
}
function aa(t, e, r) {
  const o = Object.keys(e);
  if (o.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    if (e[a] !== t[a] && !vo(r, a))
      return !0;
  }
  return !1;
}
function ml({ vnode: t, parent: e }, r) {
  for (; e; ) {
    const o = e.subTree;
    if (o.suspense && o.suspense.activeBranch === t && (o.el = t.el), o === t)
      (t = e.vnode).el = r, e = e.parent;
    else
      break;
  }
}
const yl = Symbol.for("v-ndc"), xl = (t) => t.__isSuspense;
function kl(t, e) {
  e && e.pendingBranch ? M(t) ? e.effects.push(...t) : e.effects.push(t) : ul(t);
}
const _l = Symbol.for("v-scx"), El = () => $r(_l), Dr = {};
function Lo(t, e, r) {
  return Tn(t, e, r);
}
function Tn(t, e, {
  immediate: r,
  deep: o,
  flush: i,
  once: a,
  onTrack: n,
  onTrigger: s
} = at) {
  if (e && a) {
    const I = e;
    e = (...$) => {
      I(...$), B();
    };
  }
  const c = gt, d = (I) => o === !0 ? I : (
    // for deep: false, only traverse root-level properties
    je(I, o === !1 ? 1 : void 0)
  );
  let g, h = !1, w = !1;
  if (ut(t) ? (g = () => t.value, h = Yr(t)) : Ke(t) ? (g = () => d(t), h = !0) : M(t) ? (w = !0, h = t.some((I) => Ke(I) || Yr(I)), g = () => t.map((I) => {
    if (ut(I))
      return I.value;
    if (Ke(I))
      return d(I);
    if (N(I))
      return te(I, c, 2);
  })) : N(t) ? e ? g = () => te(t, c, 2) : g = () => (y && y(), St(
    t,
    c,
    3,
    [P]
  )) : g = It, e && o) {
    const I = g;
    g = () => je(I());
  }
  let y, P = (I) => {
    y = j.onStop = () => {
      te(I, c, 4), y = j.onStop = void 0;
    };
  }, E;
  if (ko)
    if (P = It, e ? r && St(e, c, 3, [
      g(),
      w ? [] : void 0,
      P
    ]) : g(), i === "sync") {
      const I = El();
      E = I.__watcherHandles || (I.__watcherHandles = []);
    } else
      return It;
  let T = w ? new Array(t.length).fill(Dr) : Dr;
  const H = () => {
    if (!(!j.active || !j.dirty))
      if (e) {
        const I = j.run();
        (o || h || (w ? I.some(($, S) => be($, T[S])) : be(I, T))) && (y && y(), St(e, c, 3, [
          I,
          // pass undefined as the old value when it's changed for the first time
          T === Dr ? void 0 : w && T[0] === Dr ? [] : T,
          P
        ]), T = I);
      } else
        j.run();
  };
  H.allowRecurse = !!e;
  let U;
  i === "sync" ? U = H : i === "post" ? U = () => yt(H, c && c.suspense) : (H.pre = !0, c && (H.id = c.uid), U = () => mi(H));
  const j = new ci(g, It, U), O = js(), B = () => {
    j.stop(), O && ii(O.effects, j);
  };
  return e ? r ? H() : T = j.run() : i === "post" ? yt(
    j.run.bind(j),
    c && c.suspense
  ) : j.run(), E && E.push(B), B;
}
function Cl(t, e, r) {
  const o = this.proxy, i = dt(t) ? t.includes(".") ? On(o, t) : () => o[t] : t.bind(o, o);
  let a;
  N(e) ? a = e : (a = e.handler, r = e);
  const n = Cr(this), s = Tn(i, a.bind(o), r);
  return n(), s;
}
function On(t, e) {
  const r = e.split(".");
  return () => {
    let o = t;
    for (let i = 0; i < r.length && o; i++)
      o = o[r[i]];
    return o;
  };
}
function je(t, e, r = 0, o) {
  if (!it(t) || t.__v_skip)
    return t;
  if (e && e > 0) {
    if (r >= e)
      return t;
    r++;
  }
  if (o = o || /* @__PURE__ */ new Set(), o.has(t))
    return t;
  if (o.add(t), ut(t))
    je(t.value, e, r, o);
  else if (M(t))
    for (let i = 0; i < t.length; i++)
      je(t[i], e, r, o);
  else if (rr(t) || We(t))
    t.forEach((i) => {
      je(i, e, r, o);
    });
  else if (Za(t))
    for (const i in t)
      je(t[i], e, r, o);
  return t;
}
function na(t, e) {
  if (xt === null)
    return t;
  const r = _o(xt) || xt.proxy, o = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [a, n, s, c = at] = e[i];
    a && (N(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && je(n), o.push({
      dir: a,
      instance: r,
      value: n,
      oldValue: void 0,
      arg: s,
      modifiers: c
    }));
  }
  return t;
}
function Ce(t, e, r, o) {
  const i = t.dirs, a = e && e.dirs;
  for (let n = 0; n < i.length; n++) {
    const s = i[n];
    a && (s.oldValue = a[n].value);
    let c = s.dir[o];
    c && (ye(), St(c, r, 8, [
      t.el,
      s,
      t,
      e
    ]), xe());
  }
}
const ce = Symbol("_leaveCb"), jr = Symbol("_enterCb");
function Al() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return zn(() => {
    t.isMounted = !0;
  }), Mn(() => {
    t.isUnmounting = !0;
  }), t;
}
const Tt = [Function, Array], Sn = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Tt,
  onEnter: Tt,
  onAfterEnter: Tt,
  onEnterCancelled: Tt,
  // leave
  onBeforeLeave: Tt,
  onLeave: Tt,
  onAfterLeave: Tt,
  onLeaveCancelled: Tt,
  // appear
  onBeforeAppear: Tt,
  onAppear: Tt,
  onAfterAppear: Tt,
  onAppearCancelled: Tt
}, Il = {
  name: "BaseTransition",
  props: Sn,
  setup(t, { slots: e }) {
    const r = fc(), o = Al();
    let i;
    return () => {
      const a = e.default && Dn(e.default(), !0);
      if (!a || !a.length)
        return;
      let n = a[0];
      if (a.length > 1) {
        for (const E of a)
          if (E.type !== Nt) {
            n = E;
            break;
          }
      }
      const s = G(t), { mode: c } = s;
      if (o.isLeaving)
        return To(n);
      const d = sa(n);
      if (!d)
        return To(n);
      const g = Vo(
        d,
        s,
        o,
        r
      );
      $o(d, g);
      const h = r.subTree, w = h && sa(h);
      let y = !1;
      const { getTransitionKey: P } = d.type;
      if (P) {
        const E = P();
        i === void 0 ? i = E : E !== i && (i = E, y = !0);
      }
      if (w && w.type !== Nt && (!Se(d, w) || y)) {
        const E = Vo(
          w,
          s,
          o,
          r
        );
        if ($o(w, E), c === "out-in")
          return o.isLeaving = !0, E.afterLeave = () => {
            o.isLeaving = !1, r.update.active !== !1 && (r.effect.dirty = !0, r.update());
          }, To(n);
        c === "in-out" && d.type !== Nt && (E.delayLeave = (T, H, U) => {
          const j = Pn(
            o,
            w
          );
          j[String(w.key)] = w, T[ce] = () => {
            H(), T[ce] = void 0, delete g.delayedLeave;
          }, g.delayedLeave = U;
        });
      }
      return n;
    };
  }
}, Ll = Il;
function Pn(t, e) {
  const { leavingVNodes: r } = t;
  let o = r.get(e.type);
  return o || (o = /* @__PURE__ */ Object.create(null), r.set(e.type, o)), o;
}
function Vo(t, e, r, o) {
  const {
    appear: i,
    mode: a,
    persisted: n = !1,
    onBeforeEnter: s,
    onEnter: c,
    onAfterEnter: d,
    onEnterCancelled: g,
    onBeforeLeave: h,
    onLeave: w,
    onAfterLeave: y,
    onLeaveCancelled: P,
    onBeforeAppear: E,
    onAppear: T,
    onAfterAppear: H,
    onAppearCancelled: U
  } = e, j = String(t.key), O = Pn(r, t), B = (S, V) => {
    S && St(
      S,
      o,
      9,
      V
    );
  }, I = (S, V) => {
    const R = V[1];
    B(S, V), M(S) ? S.every((X) => X.length <= 1) && R() : S.length <= 1 && R();
  }, $ = {
    mode: a,
    persisted: n,
    beforeEnter(S) {
      let V = s;
      if (!r.isMounted)
        if (i)
          V = E || s;
        else
          return;
      S[ce] && S[ce](
        !0
        /* cancelled */
      );
      const R = O[j];
      R && Se(t, R) && R.el[ce] && R.el[ce](), B(V, [S]);
    },
    enter(S) {
      let V = c, R = d, X = g;
      if (!r.isMounted)
        if (i)
          V = T || c, R = H || d, X = U || g;
        else
          return;
      let L = !1;
      const q = S[jr] = (lt) => {
        L || (L = !0, lt ? B(X, [S]) : B(R, [S]), $.delayedLeave && $.delayedLeave(), S[jr] = void 0);
      };
      V ? I(V, [S, q]) : q();
    },
    leave(S, V) {
      const R = String(t.key);
      if (S[jr] && S[jr](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return V();
      B(h, [S]);
      let X = !1;
      const L = S[ce] = (q) => {
        X || (X = !0, V(), q ? B(P, [S]) : B(y, [S]), S[ce] = void 0, O[R] === t && delete O[R]);
      };
      O[R] = t, w ? I(w, [S, L]) : L();
    },
    clone(S) {
      return Vo(S, e, r, o);
    }
  };
  return $;
}
function To(t) {
  if (bo(t))
    return t = me(t), t.children = null, t;
}
function sa(t) {
  return bo(t) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    t.children ? t.children[0] : void 0
  ) : t;
}
function $o(t, e) {
  t.shapeFlag & 6 && t.component ? $o(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function Dn(t, e = !1, r) {
  let o = [], i = 0;
  for (let a = 0; a < t.length; a++) {
    let n = t[a];
    const s = r == null ? n.key : String(r) + String(n.key != null ? n.key : a);
    n.type === Ot ? (n.patchFlag & 128 && i++, o = o.concat(
      Dn(n.children, e, s)
    )) : (e || n.type !== Nt) && o.push(s != null ? me(n, { key: s }) : n);
  }
  if (i > 1)
    for (let a = 0; a < o.length; a++)
      o[a].patchFlag = -2;
  return o;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Tl(t, e) {
  return N(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ct({ name: t.name }, e, { setup: t })
  ) : t;
}
const Vr = (t) => !!t.type.__asyncLoader, bo = (t) => t.type.__isKeepAlive;
function Ol(t, e) {
  jn(t, "a", e);
}
function Sl(t, e) {
  jn(t, "da", e);
}
function jn(t, e, r = gt) {
  const o = t.__wdc || (t.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (mo(e, o, r), r) {
    let i = r.parent;
    for (; i && i.parent; )
      bo(i.parent.vnode) && Pl(o, e, r, i), i = i.parent;
  }
}
function Pl(t, e, r, o) {
  const i = mo(
    e,
    t,
    o,
    !0
    /* prepend */
  );
  Hn(() => {
    ii(o[e], i);
  }, r);
}
function mo(t, e, r = gt, o = !1) {
  if (r) {
    const i = r[t] || (r[t] = []), a = e.__weh || (e.__weh = (...n) => {
      if (r.isUnmounted)
        return;
      ye();
      const s = Cr(r), c = St(e, r, t, n);
      return s(), xe(), c;
    });
    return o ? i.unshift(a) : i.push(a), a;
  }
}
const re = (t) => (e, r = gt) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ko || t === "sp") && mo(t, (...o) => e(...o), r)
), Dl = re("bm"), zn = re("m"), jl = re("bu"), zl = re("u"), Mn = re("bum"), Hn = re("um"), Ml = re("sp"), Hl = re(
  "rtg"
), Bl = re(
  "rtc"
);
function Fl(t, e = gt) {
  mo("ec", t, e);
}
function Rl(t, e, r, o) {
  let i;
  const a = r && r[o];
  if (M(t) || dt(t)) {
    i = new Array(t.length);
    for (let n = 0, s = t.length; n < s; n++)
      i[n] = e(t[n], n, void 0, a && a[n]);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let n = 0; n < t; n++)
      i[n] = e(n + 1, n, void 0, a && a[n]);
  } else if (it(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (n, s) => e(n, s, void 0, a && a[s])
      );
    else {
      const n = Object.keys(t);
      i = new Array(n.length);
      for (let s = 0, c = n.length; s < c; s++) {
        const d = n[s];
        i[s] = e(t[d], d, s, a && a[s]);
      }
    }
  else
    i = [];
  return r && (r[o] = i), i;
}
const Uo = (t) => t ? Gn(t) ? _o(t) || t.proxy : Uo(t.parent) : null, pr = (
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
    $parent: (t) => Uo(t.parent),
    $root: (t) => Uo(t.root),
    $emit: (t) => t.emit,
    $options: (t) => yi(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      t.effect.dirty = !0, mi(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = bi.bind(t.proxy)),
    $watch: (t) => Cl.bind(t)
  })
), Oo = (t, e) => t !== at && !t.__isScriptSetup && Z(t, e), Nl = {
  get({ _: t }, e) {
    const { ctx: r, setupState: o, data: i, props: a, accessCache: n, type: s, appContext: c } = t;
    let d;
    if (e[0] !== "$") {
      const y = n[e];
      if (y !== void 0)
        switch (y) {
          case 1:
            return o[e];
          case 2:
            return i[e];
          case 4:
            return r[e];
          case 3:
            return a[e];
        }
      else {
        if (Oo(o, e))
          return n[e] = 1, o[e];
        if (i !== at && Z(i, e))
          return n[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = t.propsOptions[0]) && Z(d, e)
        )
          return n[e] = 3, a[e];
        if (r !== at && Z(r, e))
          return n[e] = 4, r[e];
        qo && (n[e] = 0);
      }
    }
    const g = pr[e];
    let h, w;
    if (g)
      return e === "$attrs" && Et(t, "get", e), g(t);
    if (
      // css module (injected by vue-loader)
      (h = s.__cssModules) && (h = h[e])
    )
      return h;
    if (r !== at && Z(r, e))
      return n[e] = 4, r[e];
    if (
      // global properties
      w = c.config.globalProperties, Z(w, e)
    )
      return w[e];
  },
  set({ _: t }, e, r) {
    const { data: o, setupState: i, ctx: a } = t;
    return Oo(i, e) ? (i[e] = r, !0) : o !== at && Z(o, e) ? (o[e] = r, !0) : Z(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (a[e] = r, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: r, ctx: o, appContext: i, propsOptions: a }
  }, n) {
    let s;
    return !!r[n] || t !== at && Z(t, n) || Oo(e, n) || (s = a[0]) && Z(s, n) || Z(o, n) || Z(pr, n) || Z(i.config.globalProperties, n);
  },
  defineProperty(t, e, r) {
    return r.get != null ? t._.accessCache[e] = 0 : Z(r, "value") && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r);
  }
};
function la(t) {
  return M(t) ? t.reduce(
    (e, r) => (e[r] = null, e),
    {}
  ) : t;
}
let qo = !0;
function Vl(t) {
  const e = yi(t), r = t.proxy, o = t.ctx;
  qo = !1, e.beforeCreate && ca(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: a,
    methods: n,
    watch: s,
    provide: c,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: h,
    mounted: w,
    beforeUpdate: y,
    updated: P,
    activated: E,
    deactivated: T,
    beforeDestroy: H,
    beforeUnmount: U,
    destroyed: j,
    unmounted: O,
    render: B,
    renderTracked: I,
    renderTriggered: $,
    errorCaptured: S,
    serverPrefetch: V,
    // public API
    expose: R,
    inheritAttrs: X,
    // assets
    components: L,
    directives: q,
    filters: lt
  } = e;
  if (d && $l(d, o, null), n)
    for (const K in n) {
      const Q = n[K];
      N(Q) && (o[K] = Q.bind(r));
    }
  if (i) {
    const K = i.call(r, r);
    it(K) && (t.data = fi(K));
  }
  if (qo = !0, a)
    for (const K in a) {
      const Q = a[K], vt = N(Q) ? Q.bind(r, r) : N(Q.get) ? Q.get.bind(r, r) : It, Xt = !N(Q) && N(Q.set) ? Q.set.bind(r) : It, zt = _c({
        get: vt,
        set: Xt
      });
      Object.defineProperty(o, K, {
        enumerable: !0,
        configurable: !0,
        get: () => zt.value,
        set: (ft) => zt.value = ft
      });
    }
  if (s)
    for (const K in s)
      Bn(s[K], o, r, K);
  if (c) {
    const K = N(c) ? c.call(r) : c;
    Reflect.ownKeys(K).forEach((Q) => {
      Gl(Q, K[Q]);
    });
  }
  g && ca(g, t, "c");
  function J(K, Q) {
    M(Q) ? Q.forEach((vt) => K(vt.bind(r))) : Q && K(Q.bind(r));
  }
  if (J(Dl, h), J(zn, w), J(jl, y), J(zl, P), J(Ol, E), J(Sl, T), J(Fl, S), J(Bl, I), J(Hl, $), J(Mn, U), J(Hn, O), J(Ml, V), M(R))
    if (R.length) {
      const K = t.exposed || (t.exposed = {});
      R.forEach((Q) => {
        Object.defineProperty(K, Q, {
          get: () => r[Q],
          set: (vt) => r[Q] = vt
        });
      });
    } else
      t.exposed || (t.exposed = {});
  B && t.render === It && (t.render = B), X != null && (t.inheritAttrs = X), L && (t.components = L), q && (t.directives = q);
}
function $l(t, e, r = It) {
  M(t) && (t = Wo(t));
  for (const o in t) {
    const i = t[o];
    let a;
    it(i) ? "default" in i ? a = $r(
      i.from || o,
      i.default,
      !0
    ) : a = $r(i.from || o) : a = $r(i), ut(a) ? Object.defineProperty(e, o, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (n) => a.value = n
    }) : e[o] = a;
  }
}
function ca(t, e, r) {
  St(
    M(t) ? t.map((o) => o.bind(e.proxy)) : t.bind(e.proxy),
    e,
    r
  );
}
function Bn(t, e, r, o) {
  const i = o.includes(".") ? On(r, o) : () => r[o];
  if (dt(t)) {
    const a = e[t];
    N(a) && Lo(i, a);
  } else if (N(t))
    Lo(i, t.bind(r));
  else if (it(t))
    if (M(t))
      t.forEach((a) => Bn(a, e, r, o));
    else {
      const a = N(t.handler) ? t.handler.bind(r) : e[t.handler];
      N(a) && Lo(i, a, t);
    }
}
function yi(t) {
  const e = t.type, { mixins: r, extends: o } = e, {
    mixins: i,
    optionsCache: a,
    config: { optionMergeStrategies: n }
  } = t.appContext, s = a.get(e);
  let c;
  return s ? c = s : !i.length && !r && !o ? c = e : (c = {}, i.length && i.forEach(
    (d) => Xr(c, d, n, !0)
  ), Xr(c, e, n)), it(e) && a.set(e, c), c;
}
function Xr(t, e, r, o = !1) {
  const { mixins: i, extends: a } = e;
  a && Xr(t, a, r, !0), i && i.forEach(
    (n) => Xr(t, n, r, !0)
  );
  for (const n in e)
    if (!(o && n === "expose")) {
      const s = Ul[n] || r && r[n];
      t[n] = s ? s(t[n], e[n]) : e[n];
    }
  return t;
}
const Ul = {
  data: da,
  props: pa,
  emits: pa,
  // objects
  methods: lr,
  computed: lr,
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
  components: lr,
  directives: lr,
  // watch
  watch: Wl,
  // provide / inject
  provide: da,
  inject: ql
};
function da(t, e) {
  return e ? t ? function() {
    return ct(
      N(t) ? t.call(this, this) : t,
      N(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function ql(t, e) {
  return lr(Wo(t), Wo(e));
}
function Wo(t) {
  if (M(t)) {
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
function lr(t, e) {
  return t ? ct(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function pa(t, e) {
  return t ? M(t) && M(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ct(
    /* @__PURE__ */ Object.create(null),
    la(t),
    la(e ?? {})
  ) : e;
}
function Wl(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const r = ct(/* @__PURE__ */ Object.create(null), t);
  for (const o in e)
    r[o] = mt(t[o], e[o]);
  return r;
}
function Fn() {
  return {
    app: null,
    config: {
      isNativeTag: ys,
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
let Kl = 0;
function Yl(t, e) {
  return function(o, i = null) {
    N(o) || (o = ct({}, o)), i != null && !it(i) && (i = null);
    const a = Fn(), n = /* @__PURE__ */ new WeakSet();
    let s = !1;
    const c = a.app = {
      _uid: Kl++,
      _component: o,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: Cc,
      get config() {
        return a.config;
      },
      set config(d) {
      },
      use(d, ...g) {
        return n.has(d) || (d && N(d.install) ? (n.add(d), d.install(c, ...g)) : N(d) && (n.add(d), d(c, ...g))), c;
      },
      mixin(d) {
        return a.mixins.includes(d) || a.mixins.push(d), c;
      },
      component(d, g) {
        return g ? (a.components[d] = g, c) : a.components[d];
      },
      directive(d, g) {
        return g ? (a.directives[d] = g, c) : a.directives[d];
      },
      mount(d, g, h) {
        if (!s) {
          const w = wt(o, i);
          return w.appContext = a, h === !0 ? h = "svg" : h === !1 && (h = void 0), g && e ? e(w, d) : t(w, d, h), s = !0, c._container = d, d.__vue_app__ = c, _o(w.component) || w.component.proxy;
        }
      },
      unmount() {
        s && (t(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, g) {
        return a.provides[d] = g, c;
      },
      runWithContext(d) {
        Zr = c;
        try {
          return d();
        } finally {
          Zr = null;
        }
      }
    };
    return c;
  };
}
let Zr = null;
function Gl(t, e) {
  if (gt) {
    let r = gt.provides;
    const o = gt.parent && gt.parent.provides;
    o === r && (r = gt.provides = Object.create(o)), r[t] = e;
  }
}
function $r(t, e, r = !1) {
  const o = gt || xt;
  if (o || Zr) {
    const i = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Zr._context.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return r && N(e) ? e.call(o && o.proxy) : e;
  }
}
function Xl(t, e, r, o = !1) {
  const i = {}, a = {};
  Kr(a, xo, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Rn(t, e, i, a);
  for (const n in t.propsOptions[0])
    n in i || (i[n] = void 0);
  r ? t.props = o ? i : tl(i) : t.type.props ? t.props = i : t.props = a, t.attrs = a;
}
function Zl(t, e, r, o) {
  const {
    props: i,
    attrs: a,
    vnode: { patchFlag: n }
  } = t, s = G(i), [c] = t.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || n > 0) && !(n & 16)
  ) {
    if (n & 8) {
      const g = t.vnode.dynamicProps;
      for (let h = 0; h < g.length; h++) {
        let w = g[h];
        if (vo(t.emitsOptions, w))
          continue;
        const y = e[w];
        if (c)
          if (Z(a, w))
            y !== a[w] && (a[w] = y, d = !0);
          else {
            const P = Jt(w);
            i[P] = Ko(
              c,
              s,
              P,
              y,
              t,
              !1
            );
          }
        else
          y !== a[w] && (a[w] = y, d = !0);
      }
    }
  } else {
    Rn(t, e, i, a) && (d = !0);
    let g;
    for (const h in s)
      (!e || // for camelCase
      !Z(e, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = Ft(h)) === h || !Z(e, g))) && (c ? r && // for camelCase
      (r[h] !== void 0 || // for kebab-case
      r[g] !== void 0) && (i[h] = Ko(
        c,
        s,
        h,
        void 0,
        t,
        !0
      )) : delete i[h]);
    if (a !== s)
      for (const h in a)
        (!e || !Z(e, h)) && (delete a[h], d = !0);
  }
  d && Qt(t, "set", "$attrs");
}
function Rn(t, e, r, o) {
  const [i, a] = t.propsOptions;
  let n = !1, s;
  if (e)
    for (let c in e) {
      if (Fr(c))
        continue;
      const d = e[c];
      let g;
      i && Z(i, g = Jt(c)) ? !a || !a.includes(g) ? r[g] = d : (s || (s = {}))[g] = d : vo(t.emitsOptions, c) || (!(c in o) || d !== o[c]) && (o[c] = d, n = !0);
    }
  if (a) {
    const c = G(r), d = s || at;
    for (let g = 0; g < a.length; g++) {
      const h = a[g];
      r[h] = Ko(
        i,
        c,
        h,
        d[h],
        t,
        !Z(d, h)
      );
    }
  }
  return n;
}
function Ko(t, e, r, o, i, a) {
  const n = t[r];
  if (n != null) {
    const s = Z(n, "default");
    if (s && o === void 0) {
      const c = n.default;
      if (n.type !== Function && !n.skipFactory && N(c)) {
        const { propsDefaults: d } = i;
        if (r in d)
          o = d[r];
        else {
          const g = Cr(i);
          o = d[r] = c.call(
            null,
            e
          ), g();
        }
      } else
        o = c;
    }
    n[
      0
      /* shouldCast */
    ] && (a && !s ? o = !1 : n[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ft(r)) && (o = !0));
  }
  return o;
}
function Nn(t, e, r = !1) {
  const o = e.propsCache, i = o.get(t);
  if (i)
    return i;
  const a = t.props, n = {}, s = [];
  let c = !1;
  if (!N(t)) {
    const g = (h) => {
      c = !0;
      const [w, y] = Nn(h, e, !0);
      ct(n, w), y && s.push(...y);
    };
    !r && e.mixins.length && e.mixins.forEach(g), t.extends && g(t.extends), t.mixins && t.mixins.forEach(g);
  }
  if (!a && !c)
    return it(t) && o.set(t, qe), qe;
  if (M(a))
    for (let g = 0; g < a.length; g++) {
      const h = Jt(a[g]);
      ga(h) && (n[h] = at);
    }
  else if (a)
    for (const g in a) {
      const h = Jt(g);
      if (ga(h)) {
        const w = a[g], y = n[h] = M(w) || N(w) ? { type: w } : ct({}, w);
        if (y) {
          const P = ha(Boolean, y.type), E = ha(String, y.type);
          y[
            0
            /* shouldCast */
          ] = P > -1, y[
            1
            /* shouldCastTrue */
          ] = E < 0 || P < E, (P > -1 || Z(y, "default")) && s.push(h);
        }
      }
    }
  const d = [n, s];
  return it(t) && o.set(t, d), d;
}
function ga(t) {
  return t[0] !== "$";
}
function ua(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function fa(t, e) {
  return ua(t) === ua(e);
}
function ha(t, e) {
  return M(e) ? e.findIndex((r) => fa(r, t)) : N(e) && fa(e, t) ? 0 : -1;
}
const Vn = (t) => t[0] === "_" || t === "$stable", xi = (t) => M(t) ? t.map(Wt) : [Wt(t)], Jl = (t, e, r) => {
  if (e._n)
    return e;
  const o = Ln((...i) => (cr.NODE_ENV !== "production" && gt && (!r || (r.root, gt.root)), xi(e(...i))), r);
  return o._c = !1, o;
}, $n = (t, e, r) => {
  const o = t._ctx;
  for (const i in t) {
    if (Vn(i))
      continue;
    const a = t[i];
    if (N(a))
      e[i] = Jl(i, a, o);
    else if (a != null) {
      const n = xi(a);
      e[i] = () => n;
    }
  }
}, Un = (t, e) => {
  const r = xi(e);
  t.slots.default = () => r;
}, Ql = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const r = e._;
    r ? (t.slots = G(e), Kr(e, "_", r)) : $n(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && Un(t, e);
  Kr(t.slots, xo, 1);
}, tc = (t, e, r) => {
  const { vnode: o, slots: i } = t;
  let a = !0, n = at;
  if (o.shapeFlag & 32) {
    const s = e._;
    s ? r && s === 1 ? a = !1 : (ct(i, e), !r && s === 1 && delete i._) : (a = !e.$stable, $n(e, i)), n = e;
  } else
    e && (Un(t, e), n = { default: 1 });
  if (a)
    for (const s in i)
      !Vn(s) && n[s] == null && delete i[s];
};
function Yo(t, e, r, o, i = !1) {
  if (M(t)) {
    t.forEach(
      (w, y) => Yo(
        w,
        e && (M(e) ? e[y] : e),
        r,
        o,
        i
      )
    );
    return;
  }
  if (Vr(o) && !i)
    return;
  const a = o.shapeFlag & 4 ? _o(o.component) || o.component.proxy : o.el, n = i ? null : a, { i: s, r: c } = t, d = e && e.r, g = s.refs === at ? s.refs = {} : s.refs, h = s.setupState;
  if (d != null && d !== c && (dt(d) ? (g[d] = null, Z(h, d) && (h[d] = null)) : ut(d) && (d.value = null)), N(c))
    te(c, s, 12, [n, g]);
  else {
    const w = dt(c), y = ut(c), P = t.f;
    if (w || y) {
      const E = () => {
        if (P) {
          const T = w ? Z(h, c) ? h[c] : g[c] : c.value;
          i ? M(T) && ii(T, a) : M(T) ? T.includes(a) || T.push(a) : w ? (g[c] = [a], Z(h, c) && (h[c] = g[c])) : (c.value = [a], t.k && (g[t.k] = c.value));
        } else
          w ? (g[c] = n, Z(h, c) && (h[c] = n)) : y && (c.value = n, t.k && (g[t.k] = n));
      };
      i || P ? E() : (E.id = -1, yt(E, r));
    }
  }
}
const yt = kl;
function ec(t) {
  return rc(t);
}
function rc(t, e) {
  const r = Qa();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: i,
    patchProp: a,
    createElement: n,
    createText: s,
    createComment: c,
    setText: d,
    setElementText: g,
    parentNode: h,
    nextSibling: w,
    setScopeId: y = It,
    insertStaticContent: P
  } = t, E = (p, u, f, v = null, b = null, k = null, C = void 0, x = null, _ = !!u.dynamicChildren) => {
    if (p === u)
      return;
    p && !Se(p, u) && (v = Zt(p), ft(p, b, k, !0), p = null), u.patchFlag === -2 && (_ = !1, u.dynamicChildren = null);
    const { type: m, ref: A, shapeFlag: z } = u;
    switch (m) {
      case yo:
        T(p, u, f, v);
        break;
      case Nt:
        H(p, u, f, v);
        break;
      case Po:
        p == null && U(u, f, v, C);
        break;
      case Ot:
        L(
          p,
          u,
          f,
          v,
          b,
          k,
          C,
          x,
          _
        );
        break;
      default:
        z & 1 ? B(
          p,
          u,
          f,
          v,
          b,
          k,
          C,
          x,
          _
        ) : z & 6 ? q(
          p,
          u,
          f,
          v,
          b,
          k,
          C,
          x,
          _
        ) : (z & 64 || z & 128) && m.process(
          p,
          u,
          f,
          v,
          b,
          k,
          C,
          x,
          _,
          ie
        );
    }
    A != null && b && Yo(A, p && p.ref, k, u || p, !u);
  }, T = (p, u, f, v) => {
    if (p == null)
      o(
        u.el = s(u.children),
        f,
        v
      );
    else {
      const b = u.el = p.el;
      u.children !== p.children && d(b, u.children);
    }
  }, H = (p, u, f, v) => {
    p == null ? o(
      u.el = c(u.children || ""),
      f,
      v
    ) : u.el = p.el;
  }, U = (p, u, f, v) => {
    [p.el, p.anchor] = P(
      p.children,
      u,
      f,
      v,
      p.el,
      p.anchor
    );
  }, j = ({ el: p, anchor: u }, f, v) => {
    let b;
    for (; p && p !== u; )
      b = w(p), o(p, f, v), p = b;
    o(u, f, v);
  }, O = ({ el: p, anchor: u }) => {
    let f;
    for (; p && p !== u; )
      f = w(p), i(p), p = f;
    i(u);
  }, B = (p, u, f, v, b, k, C, x, _) => {
    u.type === "svg" ? C = "svg" : u.type === "math" && (C = "mathml"), p == null ? I(
      u,
      f,
      v,
      b,
      k,
      C,
      x,
      _
    ) : V(
      p,
      u,
      b,
      k,
      C,
      x,
      _
    );
  }, I = (p, u, f, v, b, k, C, x) => {
    let _, m;
    const { props: A, shapeFlag: z, transition: D, dirs: F } = p;
    if (_ = p.el = n(
      p.type,
      k,
      A && A.is,
      A
    ), z & 8 ? g(_, p.children) : z & 16 && S(
      p.children,
      _,
      null,
      v,
      b,
      So(p, k),
      C,
      x
    ), F && Ce(p, null, v, "created"), $(_, p, p.scopeId, C, v), A) {
      for (const tt in A)
        tt !== "value" && !Fr(tt) && a(
          _,
          tt,
          null,
          A[tt],
          k,
          p.children,
          v,
          b,
          bt
        );
      "value" in A && a(_, "value", null, A.value, k), (m = A.onVnodeBeforeMount) && qt(m, v, p);
    }
    F && Ce(p, null, v, "beforeMount");
    const W = oc(b, D);
    W && D.beforeEnter(_), o(_, u, f), ((m = A && A.onVnodeMounted) || W || F) && yt(() => {
      m && qt(m, v, p), W && D.enter(_), F && Ce(p, null, v, "mounted");
    }, b);
  }, $ = (p, u, f, v, b) => {
    if (f && y(p, f), v)
      for (let k = 0; k < v.length; k++)
        y(p, v[k]);
    if (b) {
      let k = b.subTree;
      if (u === k) {
        const C = b.vnode;
        $(
          p,
          C,
          C.scopeId,
          C.slotScopeIds,
          b.parent
        );
      }
    }
  }, S = (p, u, f, v, b, k, C, x, _ = 0) => {
    for (let m = _; m < p.length; m++) {
      const A = p[m] = x ? de(p[m]) : Wt(p[m]);
      E(
        null,
        A,
        u,
        f,
        v,
        b,
        k,
        C,
        x
      );
    }
  }, V = (p, u, f, v, b, k, C) => {
    const x = u.el = p.el;
    let { patchFlag: _, dynamicChildren: m, dirs: A } = u;
    _ |= p.patchFlag & 16;
    const z = p.props || at, D = u.props || at;
    let F;
    if (f && Ae(f, !1), (F = D.onVnodeBeforeUpdate) && qt(F, f, u, p), A && Ce(u, p, f, "beforeUpdate"), f && Ae(f, !0), m ? R(
      p.dynamicChildren,
      m,
      x,
      f,
      v,
      So(u, b),
      k
    ) : C || Q(
      p,
      u,
      x,
      null,
      f,
      v,
      So(u, b),
      k,
      !1
    ), _ > 0) {
      if (_ & 16)
        X(
          x,
          u,
          z,
          D,
          f,
          v,
          b
        );
      else if (_ & 2 && z.class !== D.class && a(x, "class", null, D.class, b), _ & 4 && a(x, "style", z.style, D.style, b), _ & 8) {
        const W = u.dynamicProps;
        for (let tt = 0; tt < W.length; tt++) {
          const nt = W[tt], pt = z[nt], Ht = D[nt];
          (Ht !== pt || nt === "value") && a(
            x,
            nt,
            pt,
            Ht,
            b,
            p.children,
            f,
            v,
            bt
          );
        }
      }
      _ & 1 && p.children !== u.children && g(x, u.children);
    } else
      !C && m == null && X(
        x,
        u,
        z,
        D,
        f,
        v,
        b
      );
    ((F = D.onVnodeUpdated) || A) && yt(() => {
      F && qt(F, f, u, p), A && Ce(u, p, f, "updated");
    }, v);
  }, R = (p, u, f, v, b, k, C) => {
    for (let x = 0; x < u.length; x++) {
      const _ = p[x], m = u[x], A = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        _.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (_.type === Ot || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Se(_, m) || // - In the case of a component, it could contain anything.
        _.shapeFlag & 70) ? h(_.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      E(
        _,
        m,
        A,
        null,
        v,
        b,
        k,
        C,
        !0
      );
    }
  }, X = (p, u, f, v, b, k, C) => {
    if (f !== v) {
      if (f !== at)
        for (const x in f)
          !Fr(x) && !(x in v) && a(
            p,
            x,
            f[x],
            null,
            C,
            u.children,
            b,
            k,
            bt
          );
      for (const x in v) {
        if (Fr(x))
          continue;
        const _ = v[x], m = f[x];
        _ !== m && x !== "value" && a(
          p,
          x,
          m,
          _,
          C,
          u.children,
          b,
          k,
          bt
        );
      }
      "value" in v && a(p, "value", f.value, v.value, C);
    }
  }, L = (p, u, f, v, b, k, C, x, _) => {
    const m = u.el = p ? p.el : s(""), A = u.anchor = p ? p.anchor : s("");
    let { patchFlag: z, dynamicChildren: D, slotScopeIds: F } = u;
    F && (x = x ? x.concat(F) : F), p == null ? (o(m, f, v), o(A, f, v), S(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      f,
      A,
      b,
      k,
      C,
      x,
      _
    )) : z > 0 && z & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (R(
      p.dynamicChildren,
      D,
      f,
      b,
      k,
      C,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || b && u === b.subTree) && qn(
      p,
      u,
      !0
      /* shallow */
    )) : Q(
      p,
      u,
      f,
      A,
      b,
      k,
      C,
      x,
      _
    );
  }, q = (p, u, f, v, b, k, C, x, _) => {
    u.slotScopeIds = x, p == null ? u.shapeFlag & 512 ? b.ctx.activate(
      u,
      f,
      v,
      C,
      _
    ) : lt(
      u,
      f,
      v,
      b,
      k,
      C,
      _
    ) : Ct(p, u, _);
  }, lt = (p, u, f, v, b, k, C) => {
    const x = p.component = uc(
      p,
      v,
      b
    );
    if (bo(p) && (x.ctx.renderer = ie), hc(x), x.asyncDep) {
      if (b && b.registerDep(x, J), !p.el) {
        const _ = x.subTree = wt(Nt);
        H(null, _, u, f);
      }
    } else
      J(
        x,
        p,
        u,
        f,
        b,
        k,
        C
      );
  }, Ct = (p, u, f) => {
    const v = u.component = p.component;
    if (bl(p, u, f))
      if (v.asyncDep && !v.asyncResolved) {
        K(v, u, f);
        return;
      } else
        v.next = u, gl(v.update), v.effect.dirty = !0, v.update();
    else
      u.el = p.el, v.vnode = u;
  }, J = (p, u, f, v, b, k, C) => {
    const x = () => {
      if (p.isMounted) {
        let { next: A, bu: z, u: D, parent: F, vnode: W } = p;
        {
          const Ne = Wn(p);
          if (Ne) {
            A && (A.el = W.el, K(p, A, C)), Ne.asyncDep.then(() => {
              p.isUnmounted || x();
            });
            return;
          }
        }
        let tt = A, nt;
        Ae(p, !1), A ? (A.el = W.el, K(p, A, C)) : A = W, z && Rr(z), (nt = A.props && A.props.onVnodeBeforeUpdate) && qt(nt, F, A, W), Ae(p, !0);
        const pt = Io(p), Ht = p.subTree;
        p.subTree = pt, E(
          Ht,
          pt,
          // parent may have changed if it's in a teleport
          h(Ht.el),
          // anchor may have changed if it's in a fragment
          Zt(Ht),
          p,
          b,
          k
        ), A.el = pt.el, tt === null && ml(p, pt.el), D && yt(D, b), (nt = A.props && A.props.onVnodeUpdated) && yt(
          () => qt(nt, F, A, W),
          b
        );
      } else {
        let A;
        const { el: z, props: D } = u, { bm: F, m: W, parent: tt } = p, nt = Vr(u);
        if (Ae(p, !1), F && Rr(F), !nt && (A = D && D.onVnodeBeforeMount) && qt(A, tt, u), Ae(p, !0), z && or) {
          const pt = () => {
            p.subTree = Io(p), or(
              z,
              p.subTree,
              p,
              b,
              null
            );
          };
          nt ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !p.isUnmounted && pt()
          ) : pt();
        } else {
          const pt = p.subTree = Io(p);
          E(
            null,
            pt,
            f,
            v,
            p,
            b,
            k
          ), u.el = pt.el;
        }
        if (W && yt(W, b), !nt && (A = D && D.onVnodeMounted)) {
          const pt = u;
          yt(
            () => qt(A, tt, pt),
            b
          );
        }
        (u.shapeFlag & 256 || tt && Vr(tt.vnode) && tt.vnode.shapeFlag & 256) && p.a && yt(p.a, b), p.isMounted = !0, u = f = v = null;
      }
    }, _ = p.effect = new ci(
      x,
      It,
      () => mi(m),
      p.scope
      // track it in component's effect scope
    ), m = p.update = () => {
      _.dirty && _.run();
    };
    m.id = p.uid, Ae(p, !0), m();
  }, K = (p, u, f) => {
    u.component = p;
    const v = p.vnode.props;
    p.vnode = u, p.next = null, Zl(p, u.props, v, f), tc(p, u.children, f), ye(), ia(p), xe();
  }, Q = (p, u, f, v, b, k, C, x, _ = !1) => {
    const m = p && p.children, A = p ? p.shapeFlag : 0, z = u.children, { patchFlag: D, shapeFlag: F } = u;
    if (D > 0) {
      if (D & 128) {
        Xt(
          m,
          z,
          f,
          v,
          b,
          k,
          C,
          x,
          _
        );
        return;
      } else if (D & 256) {
        vt(
          m,
          z,
          f,
          v,
          b,
          k,
          C,
          x,
          _
        );
        return;
      }
    }
    F & 8 ? (A & 16 && bt(m, b, k), z !== m && g(f, z)) : A & 16 ? F & 16 ? Xt(
      m,
      z,
      f,
      v,
      b,
      k,
      C,
      x,
      _
    ) : bt(m, b, k, !0) : (A & 8 && g(f, ""), F & 16 && S(
      z,
      f,
      v,
      b,
      k,
      C,
      x,
      _
    ));
  }, vt = (p, u, f, v, b, k, C, x, _) => {
    p = p || qe, u = u || qe;
    const m = p.length, A = u.length, z = Math.min(m, A);
    let D;
    for (D = 0; D < z; D++) {
      const F = u[D] = _ ? de(u[D]) : Wt(u[D]);
      E(
        p[D],
        F,
        f,
        null,
        b,
        k,
        C,
        x,
        _
      );
    }
    m > A ? bt(
      p,
      b,
      k,
      !0,
      !1,
      z
    ) : S(
      u,
      f,
      v,
      b,
      k,
      C,
      x,
      _,
      z
    );
  }, Xt = (p, u, f, v, b, k, C, x, _) => {
    let m = 0;
    const A = u.length;
    let z = p.length - 1, D = A - 1;
    for (; m <= z && m <= D; ) {
      const F = p[m], W = u[m] = _ ? de(u[m]) : Wt(u[m]);
      if (Se(F, W))
        E(
          F,
          W,
          f,
          null,
          b,
          k,
          C,
          x,
          _
        );
      else
        break;
      m++;
    }
    for (; m <= z && m <= D; ) {
      const F = p[z], W = u[D] = _ ? de(u[D]) : Wt(u[D]);
      if (Se(F, W))
        E(
          F,
          W,
          f,
          null,
          b,
          k,
          C,
          x,
          _
        );
      else
        break;
      z--, D--;
    }
    if (m > z) {
      if (m <= D) {
        const F = D + 1, W = F < A ? u[F].el : v;
        for (; m <= D; )
          E(
            null,
            u[m] = _ ? de(u[m]) : Wt(u[m]),
            f,
            W,
            b,
            k,
            C,
            x,
            _
          ), m++;
      }
    } else if (m > D)
      for (; m <= z; )
        ft(p[m], b, k, !0), m++;
    else {
      const F = m, W = m, tt = /* @__PURE__ */ new Map();
      for (m = W; m <= D; m++) {
        const At = u[m] = _ ? de(u[m]) : Wt(u[m]);
        At.key != null && tt.set(At.key, m);
      }
      let nt, pt = 0;
      const Ht = D - W + 1;
      let Ne = !1, Wi = 0;
      const ir = new Array(Ht);
      for (m = 0; m < Ht; m++)
        ir[m] = 0;
      for (m = F; m <= z; m++) {
        const At = p[m];
        if (pt >= Ht) {
          ft(At, b, k, !0);
          continue;
        }
        let $t;
        if (At.key != null)
          $t = tt.get(At.key);
        else
          for (nt = W; nt <= D; nt++)
            if (ir[nt - W] === 0 && Se(At, u[nt])) {
              $t = nt;
              break;
            }
        $t === void 0 ? ft(At, b, k, !0) : (ir[$t - W] = m + 1, $t >= Wi ? Wi = $t : Ne = !0, E(
          At,
          u[$t],
          f,
          null,
          b,
          k,
          C,
          x,
          _
        ), pt++);
      }
      const Ki = Ne ? ic(ir) : qe;
      for (nt = Ki.length - 1, m = Ht - 1; m >= 0; m--) {
        const At = W + m, $t = u[At], Yi = At + 1 < A ? u[At + 1].el : v;
        ir[m] === 0 ? E(
          null,
          $t,
          f,
          Yi,
          b,
          k,
          C,
          x,
          _
        ) : Ne && (nt < 0 || m !== Ki[nt] ? zt($t, f, Yi, 2) : nt--);
      }
    }
  }, zt = (p, u, f, v, b = null) => {
    const { el: k, type: C, transition: x, children: _, shapeFlag: m } = p;
    if (m & 6) {
      zt(p.component.subTree, u, f, v);
      return;
    }
    if (m & 128) {
      p.suspense.move(u, f, v);
      return;
    }
    if (m & 64) {
      C.move(p, u, f, ie);
      return;
    }
    if (C === Ot) {
      o(k, u, f);
      for (let z = 0; z < _.length; z++)
        zt(_[z], u, f, v);
      o(p.anchor, u, f);
      return;
    }
    if (C === Po) {
      j(p, u, f);
      return;
    }
    if (v !== 2 && m & 1 && x)
      if (v === 0)
        x.beforeEnter(k), o(k, u, f), yt(() => x.enter(k), b);
      else {
        const { leave: z, delayLeave: D, afterLeave: F } = x, W = () => o(k, u, f), tt = () => {
          z(k, () => {
            W(), F && F();
          });
        };
        D ? D(k, W, tt) : tt();
      }
    else
      o(k, u, f);
  }, ft = (p, u, f, v = !1, b = !1) => {
    const {
      type: k,
      props: C,
      ref: x,
      children: _,
      dynamicChildren: m,
      shapeFlag: A,
      patchFlag: z,
      dirs: D
    } = p;
    if (x != null && Yo(x, null, f, p, !0), A & 256) {
      u.ctx.deactivate(p);
      return;
    }
    const F = A & 1 && D, W = !Vr(p);
    let tt;
    if (W && (tt = C && C.onVnodeBeforeUnmount) && qt(tt, u, p), A & 6)
      Vt(p.component, f, v);
    else {
      if (A & 128) {
        p.suspense.unmount(f, v);
        return;
      }
      F && Ce(p, null, u, "beforeUnmount"), A & 64 ? p.type.remove(
        p,
        u,
        f,
        b,
        ie,
        v
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== Ot || z > 0 && z & 64) ? bt(
        m,
        u,
        f,
        !1,
        !0
      ) : (k === Ot && z & 384 || !b && A & 16) && bt(_, u, f), v && _e(p);
    }
    (W && (tt = C && C.onVnodeUnmounted) || F) && yt(() => {
      tt && qt(tt, u, p), F && Ce(p, null, u, "unmounted");
    }, f);
  }, _e = (p) => {
    const { type: u, el: f, anchor: v, transition: b } = p;
    if (u === Ot) {
      oe(f, v);
      return;
    }
    if (u === Po) {
      O(p);
      return;
    }
    const k = () => {
      i(f), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (p.shapeFlag & 1 && b && !b.persisted) {
      const { leave: C, delayLeave: x } = b, _ = () => C(f, k);
      x ? x(p.el, k, _) : _();
    } else
      k();
  }, oe = (p, u) => {
    let f;
    for (; p !== u; )
      f = w(p), i(p), p = f;
    i(u);
  }, Vt = (p, u, f) => {
    const { bum: v, scope: b, update: k, subTree: C, um: x } = p;
    v && Rr(v), b.stop(), k && (k.active = !1, ft(C, p, u, f)), x && yt(x, u), yt(() => {
      p.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, bt = (p, u, f, v = !1, b = !1, k = 0) => {
    for (let C = k; C < p.length; C++)
      ft(p[C], u, f, v, b);
  }, Zt = (p) => p.shapeFlag & 6 ? Zt(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : w(p.anchor || p.el);
  let Mt = !1;
  const Re = (p, u, f) => {
    p == null ? u._vnode && ft(u._vnode, null, null, !0) : E(
      u._vnode || null,
      p,
      u,
      null,
      null,
      null,
      f
    ), Mt || (Mt = !0, ia(), En(), Mt = !1), u._vnode = p;
  }, ie = {
    p: E,
    um: ft,
    m: zt,
    r: _e,
    mt: lt,
    mc: S,
    pc: Q,
    pbc: R,
    n: Zt,
    o: t
  };
  let Ee, or;
  return e && ([Ee, or] = e(
    ie
  )), {
    render: Re,
    hydrate: Ee,
    createApp: Yl(Re, Ee)
  };
}
function So({ type: t, props: e }, r) {
  return r === "svg" && t === "foreignObject" || r === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : r;
}
function Ae({ effect: t, update: e }, r) {
  t.allowRecurse = e.allowRecurse = r;
}
function oc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function qn(t, e, r = !1) {
  const o = t.children, i = e.children;
  if (M(o) && M(i))
    for (let a = 0; a < o.length; a++) {
      const n = o[a];
      let s = i[a];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[a] = de(i[a]), s.el = n.el), r || qn(n, s)), s.type === yo && (s.el = n.el);
    }
}
function ic(t) {
  const e = t.slice(), r = [0];
  let o, i, a, n, s;
  const c = t.length;
  for (o = 0; o < c; o++) {
    const d = t[o];
    if (d !== 0) {
      if (i = r[r.length - 1], t[i] < d) {
        e[o] = i, r.push(o);
        continue;
      }
      for (a = 0, n = r.length - 1; a < n; )
        s = a + n >> 1, t[r[s]] < d ? a = s + 1 : n = s;
      d < t[r[a]] && (a > 0 && (e[o] = r[a - 1]), r[a] = o);
    }
  }
  for (a = r.length, n = r[a - 1]; a-- > 0; )
    r[a] = n, n = e[n];
  return r;
}
function Wn(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Wn(e);
}
const ac = (t) => t.__isTeleport, Ot = Symbol.for("v-fgt"), yo = Symbol.for("v-txt"), Nt = Symbol.for("v-cmt"), Po = Symbol.for("v-stc"), gr = [];
let Rt = null;
function rt(t = !1) {
  gr.push(Rt = t ? null : []);
}
function nc() {
  gr.pop(), Rt = gr[gr.length - 1] || null;
}
let mr = 1;
function wa(t) {
  mr += t;
}
function Kn(t) {
  return t.dynamicChildren = mr > 0 ? Rt || qe : null, nc(), mr > 0 && Rt && Rt.push(t), t;
}
function ot(t, e, r, o, i, a) {
  return Kn(
    l(
      t,
      e,
      r,
      o,
      i,
      a,
      !0
    )
  );
}
function sc(t, e, r, o, i) {
  return Kn(
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
function Go(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Se(t, e) {
  return t.type === e.type && t.key === e.key;
}
const xo = "__vInternal", Yn = ({ key: t }) => t ?? null, Ur = ({
  ref: t,
  ref_key: e,
  ref_for: r
}) => (typeof t == "number" && (t = "" + t), t != null ? dt(t) || ut(t) || N(t) ? { i: xt, r: t, k: e, f: !!r } : t : null);
function l(t, e = null, r = null, o = 0, i = null, a = t === Ot ? 0 : 1, n = !1, s = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Yn(e),
    ref: e && Ur(e),
    scopeId: In,
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
    shapeFlag: a,
    patchFlag: o,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: xt
  };
  return s ? (ki(c, r), a & 128 && t.normalize(c)) : r && (c.shapeFlag |= dt(r) ? 8 : 16), mr > 0 && // avoid a block node from tracking itself
  !n && // has current parent block
  Rt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Rt.push(c), c;
}
const wt = lc;
function lc(t, e = null, r = null, o = 0, i = null, a = !1) {
  if ((!t || t === yl) && (t = Nt), Go(t)) {
    const s = me(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return r && ki(s, r), mr > 0 && !a && Rt && (s.shapeFlag & 6 ? Rt[Rt.indexOf(t)] = s : Rt.push(s)), s.patchFlag |= -2, s;
  }
  if (kc(t) && (t = t.__vccOpts), e) {
    e = cc(e);
    let { class: s, style: c } = e;
    s && !dt(s) && (e.class = et(s)), it(c) && (wn(c) && !M(c) && (c = ct({}, c)), e.style = si(c));
  }
  const n = dt(t) ? 1 : xl(t) ? 128 : ac(t) ? 64 : it(t) ? 4 : N(t) ? 2 : 0;
  return l(
    t,
    e,
    r,
    o,
    i,
    n,
    a,
    !0
  );
}
function cc(t) {
  return t ? wn(t) || xo in t ? ct({}, t) : t : null;
}
function me(t, e, r = !1) {
  const { props: o, ref: i, patchFlag: a, children: n } = t, s = e ? dc(o || {}, e) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: s,
    key: s && Yn(s),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && i ? M(i) ? i.concat(Ur(e)) : [i, Ur(e)] : Ur(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: n,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Ot ? a === -1 ? 16 : a | 16 : a,
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
function Be(t = " ", e = 0) {
  return wt(yo, null, t, e);
}
function Ue(t = "", e = !1) {
  return e ? (rt(), sc(Nt, null, t)) : wt(Nt, null, t);
}
function Wt(t) {
  return t == null || typeof t == "boolean" ? wt(Nt) : M(t) ? wt(
    Ot,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? de(t) : wt(yo, null, String(t));
}
function de(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : me(t);
}
function ki(t, e) {
  let r = 0;
  const { shapeFlag: o } = t;
  if (e == null)
    e = null;
  else if (M(e))
    r = 16;
  else if (typeof e == "object")
    if (o & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), ki(t, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = e._;
      !i && !(xo in e) ? e._ctx = xt : i === 3 && xt && (xt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    N(e) ? (e = { default: e, _ctx: xt }, r = 32) : (e = String(e), o & 64 ? (r = 16, e = [Be(e)]) : r = 8);
  t.children = e, t.shapeFlag |= r;
}
function dc(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    for (const i in o)
      if (i === "class")
        e.class !== o.class && (e.class = et([e.class, o.class]));
      else if (i === "style")
        e.style = si([e.style, o.style]);
      else if (uo(i)) {
        const a = e[i], n = o[i];
        n && a !== n && !(M(a) && a.includes(n)) && (e[i] = a ? [].concat(a, n) : n);
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
const pc = Fn();
let gc = 0;
function uc(t, e, r) {
  const o = t.type, i = (e ? e.appContext : t.appContext) || pc, a = {
    uid: gc++,
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
    scope: new Ps(
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
    propsOptions: Nn(o, i),
    emitsOptions: An(o, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: at,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: at,
    data: at,
    props: at,
    attrs: at,
    slots: at,
    refs: at,
    setupState: at,
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
  return a.ctx = { _: a }, a.root = e ? e.root : a, a.emit = hl.bind(null, a), t.ce && t.ce(a), a;
}
let gt = null;
const fc = () => gt || xt;
let Jr, Xo;
{
  const t = Qa(), e = (r, o) => {
    let i;
    return (i = t[r]) || (i = t[r] = []), i.push(o), (a) => {
      i.length > 1 ? i.forEach((n) => n(a)) : i[0](a);
    };
  };
  Jr = e(
    "__VUE_INSTANCE_SETTERS__",
    (r) => gt = r
  ), Xo = e(
    "__VUE_SSR_SETTERS__",
    (r) => ko = r
  );
}
const Cr = (t) => {
  const e = gt;
  return Jr(t), t.scope.on(), () => {
    t.scope.off(), Jr(e);
  };
}, va = () => {
  gt && gt.scope.off(), Jr(null);
};
function Gn(t) {
  return t.vnode.shapeFlag & 4;
}
let ko = !1;
function hc(t, e = !1) {
  e && Xo(e);
  const { props: r, children: o } = t.vnode, i = Gn(t);
  Xl(t, r, i, e), Ql(t, o);
  const a = i ? wc(t, e) : void 0;
  return e && Xo(!1), a;
}
function wc(t, e) {
  const r = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = vn(new Proxy(t.ctx, Nl));
  const { setup: o } = r;
  if (o) {
    const i = t.setupContext = o.length > 1 ? bc(t) : null, a = Cr(t);
    ye();
    const n = te(
      o,
      t,
      0,
      [
        t.props,
        i
      ]
    );
    if (xe(), a(), Ga(n)) {
      if (n.then(va, va), e)
        return n.then((s) => {
          ba(t, s, e);
        }).catch((s) => {
          wo(s, t, 0);
        });
      t.asyncDep = n;
    } else
      ba(t, n, e);
  } else
    Xn(t, e);
}
function ba(t, e, r) {
  N(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : it(e) && (t.setupState = yn(e)), Xn(t, r);
}
let ma;
function Xn(t, e, r) {
  const o = t.type;
  if (!t.render) {
    if (!e && ma && !o.render) {
      const i = o.template || yi(t).template;
      if (i) {
        const { isCustomElement: a, compilerOptions: n } = t.appContext.config, { delimiters: s, compilerOptions: c } = o, d = ct(
          ct(
            {
              isCustomElement: a,
              delimiters: s
            },
            n
          ),
          c
        );
        o.render = ma(i, d);
      }
    }
    t.render = o.render || It;
  }
  {
    const i = Cr(t);
    ye();
    try {
      Vl(t);
    } finally {
      xe(), i();
    }
  }
}
function vc(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, r) {
        return Et(t, "get", "$attrs"), e[r];
      }
    }
  ));
}
function bc(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  return {
    get attrs() {
      return vc(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function _o(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(yn(vn(t.exposed)), {
      get(e, r) {
        if (r in e)
          return e[r];
        if (r in pr)
          return pr[r](t);
      },
      has(e, r) {
        return r in e || r in pr;
      }
    }));
}
const mc = /(?:^|[-_])(\w)/g, yc = (t) => t.replace(mc, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function xc(t, e = !0) {
  return N(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Zn(t, e, r = !1) {
  let o = xc(e);
  if (!o && e.__file) {
    const i = e.__file.match(/([^/\\]+)\.\w+$/);
    i && (o = i[1]);
  }
  if (!o && t && t.parent) {
    const i = (a) => {
      for (const n in a)
        if (a[n] === e)
          return n;
    };
    o = i(
      t.components || t.parent.type.components
    ) || i(t.appContext.components);
  }
  return o ? yc(o) : r ? "App" : "Anonymous";
}
function kc(t) {
  return N(t) && "__vccOpts" in t;
}
const _c = (t, e) => el(t, e, ko);
function Ec(t, e, r) {
  const o = arguments.length;
  return o === 2 ? it(e) && !M(e) ? Go(e) ? wt(t, null, [e]) : wt(t, e) : wt(t, null, e) : (o > 3 ? r = Array.prototype.slice.call(arguments, 2) : o === 3 && Go(r) && (r = [r]), wt(t, e, r));
}
const Cc = "3.4.15", Ac = "http://www.w3.org/2000/svg", Ic = "http://www.w3.org/1998/Math/MathML", pe = typeof document < "u" ? document : null, ya = pe && /* @__PURE__ */ pe.createElement("template"), Lc = {
  insert: (t, e, r) => {
    e.insertBefore(t, r || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, r, o) => {
    const i = e === "svg" ? pe.createElementNS(Ac, t) : e === "mathml" ? pe.createElementNS(Ic, t) : pe.createElement(t, r ? { is: r } : void 0);
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
  insertStaticContent(t, e, r, o, i, a) {
    const n = r ? r.previousSibling : e.lastChild;
    if (i && (i === a || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), r), !(i === a || !(i = i.nextSibling)); )
        ;
    else {
      ya.innerHTML = o === "svg" ? `<svg>${t}</svg>` : o === "mathml" ? `<math>${t}</math>` : t;
      const s = ya.content;
      if (o === "svg" || o === "mathml") {
        const c = s.firstChild;
        for (; c.firstChild; )
          s.appendChild(c.firstChild);
        s.removeChild(c);
      }
      e.insertBefore(s, r);
    }
    return [
      // first
      n ? n.nextSibling : e.firstChild,
      // last
      r ? r.previousSibling : e.lastChild
    ];
  }
}, ne = "transition", nr = "animation", yr = Symbol("_vtc"), _i = (t, { slots: e }) => Ec(Ll, Tc(t), e);
_i.displayName = "Transition";
const Jn = {
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
_i.props = /* @__PURE__ */ ct(
  {},
  Sn,
  Jn
);
const Ie = (t, e = []) => {
  M(t) ? t.forEach((r) => r(...e)) : t && t(...e);
}, xa = (t) => t ? M(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
function Tc(t) {
  const e = {};
  for (const L in t)
    L in Jn || (e[L] = t[L]);
  if (t.css === !1)
    return e;
  const {
    name: r = "v",
    type: o,
    duration: i,
    enterFromClass: a = `${r}-enter-from`,
    enterActiveClass: n = `${r}-enter-active`,
    enterToClass: s = `${r}-enter-to`,
    appearFromClass: c = a,
    appearActiveClass: d = n,
    appearToClass: g = s,
    leaveFromClass: h = `${r}-leave-from`,
    leaveActiveClass: w = `${r}-leave-active`,
    leaveToClass: y = `${r}-leave-to`
  } = t, P = Oc(i), E = P && P[0], T = P && P[1], {
    onBeforeEnter: H,
    onEnter: U,
    onEnterCancelled: j,
    onLeave: O,
    onLeaveCancelled: B,
    onBeforeAppear: I = H,
    onAppear: $ = U,
    onAppearCancelled: S = j
  } = e, V = (L, q, lt) => {
    Le(L, q ? g : s), Le(L, q ? d : n), lt && lt();
  }, R = (L, q) => {
    L._isLeaving = !1, Le(L, h), Le(L, y), Le(L, w), q && q();
  }, X = (L) => (q, lt) => {
    const Ct = L ? $ : U, J = () => V(q, L, lt);
    Ie(Ct, [q, J]), ka(() => {
      Le(q, L ? c : a), se(q, L ? g : s), xa(Ct) || _a(q, o, E, J);
    });
  };
  return ct(e, {
    onBeforeEnter(L) {
      Ie(H, [L]), se(L, a), se(L, n);
    },
    onBeforeAppear(L) {
      Ie(I, [L]), se(L, c), se(L, d);
    },
    onEnter: X(!1),
    onAppear: X(!0),
    onLeave(L, q) {
      L._isLeaving = !0;
      const lt = () => R(L, q);
      se(L, h), Dc(), se(L, w), ka(() => {
        L._isLeaving && (Le(L, h), se(L, y), xa(O) || _a(L, o, T, lt));
      }), Ie(O, [L, lt]);
    },
    onEnterCancelled(L) {
      V(L, !1), Ie(j, [L]);
    },
    onAppearCancelled(L) {
      V(L, !0), Ie(S, [L]);
    },
    onLeaveCancelled(L) {
      R(L), Ie(B, [L]);
    }
  });
}
function Oc(t) {
  if (t == null)
    return null;
  if (it(t))
    return [Do(t.enter), Do(t.leave)];
  {
    const e = Do(t);
    return [e, e];
  }
}
function Do(t) {
  return Mo(t);
}
function se(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.add(r)), (t[yr] || (t[yr] = /* @__PURE__ */ new Set())).add(e);
}
function Le(t, e) {
  e.split(/\s+/).forEach((o) => o && t.classList.remove(o));
  const r = t[yr];
  r && (r.delete(e), r.size || (t[yr] = void 0));
}
function ka(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Sc = 0;
function _a(t, e, r, o) {
  const i = t._endId = ++Sc, a = () => {
    i === t._endId && o();
  };
  if (r)
    return setTimeout(a, r);
  const { type: n, timeout: s, propCount: c } = Pc(t, e);
  if (!n)
    return o();
  const d = n + "end";
  let g = 0;
  const h = () => {
    t.removeEventListener(d, w), a();
  }, w = (y) => {
    y.target === t && ++g >= c && h();
  };
  setTimeout(() => {
    g < c && h();
  }, s + 1), t.addEventListener(d, w);
}
function Pc(t, e) {
  const r = window.getComputedStyle(t), o = (P) => (r[P] || "").split(", "), i = o(`${ne}Delay`), a = o(`${ne}Duration`), n = Ea(i, a), s = o(`${nr}Delay`), c = o(`${nr}Duration`), d = Ea(s, c);
  let g = null, h = 0, w = 0;
  e === ne ? n > 0 && (g = ne, h = n, w = a.length) : e === nr ? d > 0 && (g = nr, h = d, w = c.length) : (h = Math.max(n, d), g = h > 0 ? n > d ? ne : nr : null, w = g ? g === ne ? a.length : c.length : 0);
  const y = g === ne && /\b(transform|all)(,|$)/.test(
    o(`${ne}Property`).toString()
  );
  return {
    type: g,
    timeout: h,
    propCount: w,
    hasTransform: y
  };
}
function Ea(t, e) {
  for (; t.length < e.length; )
    t = t.concat(t);
  return Math.max(...e.map((r, o) => Ca(r) + Ca(t[o])));
}
function Ca(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function Dc() {
  return document.body.offsetHeight;
}
function jc(t, e, r) {
  const o = t[yr];
  o && (e = (e ? [e, ...o] : [...o]).join(" ")), e == null ? t.removeAttribute("class") : r ? t.setAttribute("class", e) : t.className = e;
}
const zc = Symbol("_vod"), Mc = Symbol("");
function Hc(t, e, r) {
  const o = t.style, i = o.display, a = dt(r);
  if (r && !a) {
    if (e && !dt(e))
      for (const n in e)
        r[n] == null && Zo(o, n, "");
    for (const n in r)
      Zo(o, n, r[n]);
  } else if (a) {
    if (e !== r) {
      const n = o[Mc];
      n && (r += ";" + n), o.cssText = r;
    }
  } else
    e && t.removeAttribute("style");
  zc in t && (o.display = i);
}
const Aa = /\s*!important$/;
function Zo(t, e, r) {
  if (M(r))
    r.forEach((o) => Zo(t, e, o));
  else if (r == null && (r = ""), e.startsWith("--"))
    t.setProperty(e, r);
  else {
    const o = Bc(t, e);
    Aa.test(r) ? t.setProperty(
      Ft(o),
      r.replace(Aa, ""),
      "important"
    ) : t[o] = r;
  }
}
const Ia = ["Webkit", "Moz", "ms"], jo = {};
function Bc(t, e) {
  const r = jo[e];
  if (r)
    return r;
  let o = Jt(e);
  if (o !== "filter" && o in t)
    return jo[e] = o;
  o = Ja(o);
  for (let i = 0; i < Ia.length; i++) {
    const a = Ia[i] + o;
    if (a in t)
      return jo[e] = a;
  }
  return e;
}
const La = "http://www.w3.org/1999/xlink";
function Fc(t, e, r, o, i) {
  if (o && e.startsWith("xlink:"))
    r == null ? t.removeAttributeNS(La, e.slice(6, e.length)) : t.setAttributeNS(La, e, r);
  else {
    const a = Os(e);
    r == null || a && !tn(r) ? t.removeAttribute(e) : t.setAttribute(e, a ? "" : r);
  }
}
function Rc(t, e, r, o, i, a, n) {
  if (e === "innerHTML" || e === "textContent") {
    o && n(o, i, a), t[e] = r ?? "";
    return;
  }
  const s = t.tagName;
  if (e === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    t._value = r;
    const d = s === "OPTION" ? t.getAttribute("value") : t.value, g = r ?? "";
    d !== g && (t.value = g), r == null && t.removeAttribute(e);
    return;
  }
  let c = !1;
  if (r === "" || r == null) {
    const d = typeof t[e];
    d === "boolean" ? r = tn(r) : r == null && d === "string" ? (r = "", c = !0) : d === "number" && (r = 0, c = !0);
  }
  try {
    t[e] = r;
  } catch {
  }
  c && t.removeAttribute(e);
}
function Ei(t, e, r, o) {
  t.addEventListener(e, r, o);
}
function Nc(t, e, r, o) {
  t.removeEventListener(e, r, o);
}
const Ta = Symbol("_vei");
function Vc(t, e, r, o, i = null) {
  const a = t[Ta] || (t[Ta] = {}), n = a[e];
  if (o && n)
    n.value = o;
  else {
    const [s, c] = $c(e);
    if (o) {
      const d = a[e] = Wc(o, i);
      Ei(t, s, d, c);
    } else
      n && (Nc(t, s, n, c), a[e] = void 0);
  }
}
const Oa = /(?:Once|Passive|Capture)$/;
function $c(t) {
  let e;
  if (Oa.test(t)) {
    e = {};
    let o;
    for (; o = t.match(Oa); )
      t = t.slice(0, t.length - o[0].length), e[o[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Ft(t.slice(2)), e];
}
let zo = 0;
const Uc = /* @__PURE__ */ Promise.resolve(), qc = () => zo || (Uc.then(() => zo = 0), zo = Date.now());
function Wc(t, e) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    St(
      Kc(o, r.value),
      e,
      5,
      [o]
    );
  };
  return r.value = t, r.attached = qc(), r;
}
function Kc(t, e) {
  if (M(e)) {
    const r = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      r.call(t), t._stopped = !0;
    }, e.map((o) => (i) => !i._stopped && o && o(i));
  } else
    return e;
}
const Sa = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Yc = (t, e, r, o, i, a, n, s, c) => {
  const d = i === "svg";
  e === "class" ? jc(t, o, d) : e === "style" ? Hc(t, r, o) : uo(e) ? oi(e) || Vc(t, e, r, o, n) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Gc(t, e, o, d)) ? Rc(
    t,
    e,
    o,
    a,
    n,
    s,
    c
  ) : (e === "true-value" ? t._trueValue = o : e === "false-value" && (t._falseValue = o), Fc(t, e, o, d));
};
function Gc(t, e, r, o) {
  if (o)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Sa(e) && N(r));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Sa(e) && dt(r) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Xc(t, e) {
  const r = /* @__PURE__ */ Tl(t);
  class o extends Ci {
    constructor(a) {
      super(r, a, e);
    }
  }
  return o.def = r, o;
}
const Zc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ci extends Zc {
  constructor(e, r = {}, o) {
    super(), this._def = e, this._props = r, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && o ? o(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), bi(() => {
      this._connected || (za(null, this.shadowRoot), this._instance = null);
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
      const { props: a, styles: n } = o;
      let s;
      if (a && !M(a))
        for (const c in a) {
          const d = a[c];
          (d === Number || d && d.type === Number) && (c in this._props && (this._props[c] = Mo(this._props[c])), (s || (s = /* @__PURE__ */ Object.create(null)))[Jt(c)] = !0);
        }
      this._numberProps = s, i && this._resolveProps(o), this._applyStyles(n), this._update();
    }, r = this._def.__asyncLoader;
    r ? r().then((o) => e(o, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: r } = e, o = M(r) ? r : Object.keys(r || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && o.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of o.map(Jt))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(a) {
          this._setProp(i, a);
        }
      });
  }
  _setAttr(e) {
    let r = this.getAttribute(e);
    const o = Jt(e);
    this._numberProps && this._numberProps[o] && (r = Mo(r)), this._setProp(o, r, !1);
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
    za(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = wt(this._def, ct({}, this._props));
    return this._instance || (e.ce = (r) => {
      this._instance = r, r.isCE = !0;
      const o = (a, n) => {
        this.dispatchEvent(
          new CustomEvent(a, {
            detail: n
          })
        );
      };
      r.emit = (a, ...n) => {
        o(a, n), Ft(a) !== a && o(Ft(a), n);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof Ci) {
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
const Qr = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return M(e) ? (r) => Rr(e, r) : e;
}, Ge = Symbol("_assign"), Jc = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(t, e, r) {
    t[Ge] = Qr(r), Ei(t, "change", () => {
      const o = t._modelValue, i = xr(t), a = t.checked, n = t[Ge];
      if (M(o)) {
        const s = li(o, i), c = s !== -1;
        if (a && !c)
          n(o.concat(i));
        else if (!a && c) {
          const d = [...o];
          d.splice(s, 1), n(d);
        }
      } else if (rr(o)) {
        const s = new Set(o);
        a ? s.add(i) : s.delete(i), n(s);
      } else
        n(Qn(t, a));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Pa,
  beforeUpdate(t, e, r) {
    t[Ge] = Qr(r), Pa(t, e, r);
  }
};
function Pa(t, { value: e, oldValue: r }, o) {
  t._modelValue = e, M(e) ? t.checked = li(e, o.props.value) > -1 : rr(e) ? t.checked = e.has(o.props.value) : e !== r && (t.checked = Xe(e, Qn(t, !0)));
}
const Qc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: r } }, o) {
    const i = rr(e);
    Ei(t, "change", () => {
      const a = Array.prototype.filter.call(t.options, (n) => n.selected).map(
        (n) => r ? ni(xr(n)) : xr(n)
      );
      t[Ge](
        t.multiple ? i ? new Set(a) : a : a[0]
      ), t._assigning = !0, bi(() => {
        t._assigning = !1;
      });
    }), t[Ge] = Qr(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e, oldValue: r, modifiers: { number: o } }) {
    Da(t, e, r, o);
  },
  beforeUpdate(t, e, r) {
    t[Ge] = Qr(r);
  },
  updated(t, { value: e, oldValue: r, modifiers: { number: o } }) {
    t._assigning || Da(t, e, r, o);
  }
};
function Da(t, e, r, o) {
  const i = t.multiple, a = M(e);
  if (!(i && !a && !rr(e)) && !(a && Xe(e, r))) {
    for (let n = 0, s = t.options.length; n < s; n++) {
      const c = t.options[n], d = xr(c);
      if (i)
        if (a) {
          const g = typeof d;
          g === "string" || g === "number" ? c.selected = e.includes(
            o ? ni(d) : d
          ) : c.selected = li(e, d) > -1;
        } else
          c.selected = e.has(d);
      else if (Xe(xr(c), e)) {
        t.selectedIndex !== n && (t.selectedIndex = n);
        return;
      }
    }
    !i && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function xr(t) {
  return "_value" in t ? t._value : t.value;
}
function Qn(t, e) {
  const r = e ? "_trueValue" : "_falseValue";
  return r in t ? t[r] : e;
}
const td = /* @__PURE__ */ ct({ patchProp: Yc }, Lc);
let ja;
function ed() {
  return ja || (ja = ec(td));
}
const za = (...t) => {
  ed().render(...t);
}, rd = { class: "inline-flex border border-primary-800 rounded-full bg-primary-50" }, od = ["name", "id", "checked"], id = ["for"], ad = ["name", "id", "checked"], nd = ["for"], sd = { class: "inline-block font-semibold text-gray-600" }, ld = { key: 0 }, cd = { key: 1 }, dd = {
  __name: "DeploymentSwitcher.ce",
  props: ["deploymentMode"],
  emits: ["deploymentModeChanged"],
  setup(t, { emit: e }) {
    const r = e, o = function(i) {
      r("deploymentModeChanged", i);
    };
    return (i, a) => (rt(), ot(Ot, null, [
      l("div", rd, [
        l("div", null, [
          l("input", {
            type: "radio",
            name: "deployment-switcher-" + i.$.uid,
            id: "deployment-cloud-" + i.$.uid,
            value: "cloud",
            class: "hidden peer",
            checked: t.deploymentMode == "cloud",
            onChange: a[0] || (a[0] = (n) => o("cloud")),
            autocomplete: "off"
          }, null, 40, od),
          l("label", {
            for: "deployment-cloud-" + i.$.uid,
            class: "inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full"
          }, "Cloud", 8, id)
        ]),
        l("div", null, [
          l("input", {
            type: "radio",
            name: "deployment-switcher-" + i.$.uid,
            id: "deployment-self-hosted-" + i.$.uid,
            value: "self-hosted",
            class: "hidden peer",
            checked: t.deploymentMode == "self-hosted",
            onChange: a[1] || (a[1] = (n) => o("self-hosted")),
            autocomplete: "off"
          }, null, 40, ad),
          l("label", {
            for: "deployment-self-hosted-" + i.$.uid,
            class: "inline-block cursor-pointer font-normal text-gray-600 hover:text-black peer-checked:font-semibold peer-checked:text-primary peer-checked:bg-primary-100 px-6 py-2 rounded-full"
          }, "Self hosted", 8, nd)
        ])
      ]),
      l("div", sd, [
        wt(_i, {
          name: "fade",
          duration: { enter: 500, leave: 0 }
        }, {
          default: Ln(() => [
            t.deploymentMode == "cloud" ? (rt(), ot("div", ld, "We host it - no maintenance effort")) : t.deploymentMode == "self-hosted" ? (rt(), ot("div", cd, "You host it - maintain your own setup")) : Ue("", !0)
          ]),
          _: 1
        })
      ])
    ], 64));
  }
}, pd = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}.tooltip-arrow,.tooltip-arrow:before{position:absolute;width:8px;height:8px;background:inherit}.tooltip-arrow{visibility:hidden}.tooltip-arrow:before{content:"";visibility:visible;transform:rotate(45deg)}[data-tooltip-style^=light]+.tooltip>.tooltip-arrow:before{border-style:solid;border-color:#e5e7eb}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=top]>.tooltip-arrow:before{border-bottom-width:1px;border-right-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=right]>.tooltip-arrow:before{border-bottom-width:1px;border-left-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=bottom]>.tooltip-arrow:before{border-top-width:1px;border-left-width:1px}[data-tooltip-style^=light]+.tooltip[data-popper-placement^=left]>.tooltip-arrow:before{border-top-width:1px;border-right-width:1px}.tooltip[data-popper-placement^=top]>.tooltip-arrow{bottom:-4px}.tooltip[data-popper-placement^=bottom]>.tooltip-arrow{top:-4px}.tooltip[data-popper-placement^=left]>.tooltip-arrow{right:-4px}.tooltip[data-popper-placement^=right]>.tooltip-arrow{left:-4px}.tooltip.invisible>.tooltip-arrow:before{visibility:hidden}[data-popper-arrow],[data-popper-arrow]:before{position:absolute;width:8px;height:8px;background:inherit}[data-popper-arrow]{visibility:hidden}[data-popper-arrow]:before{content:"";visibility:visible;transform:rotate(45deg)}[data-popper-arrow]:after{content:"";visibility:visible;transform:rotate(45deg);position:absolute;width:9px;height:9px;background:inherit}[role=tooltip]>[data-popper-arrow]:before{border-style:solid;border-color:#e5e7eb}.dark [role=tooltip]>[data-popper-arrow]:before{border-style:solid;border-color:#4b5563}[role=tooltip]>[data-popper-arrow]:after{border-style:solid;border-color:#e5e7eb}.dark [role=tooltip]>[data-popper-arrow]:after{border-style:solid;border-color:#4b5563}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]:before{border-bottom-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]:after{border-bottom-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]:before{border-bottom-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]:after{border-bottom-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]:before{border-top-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]:after{border-top-width:1px;border-left-width:1px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]:before{border-top-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]:after{border-top-width:1px;border-right-width:1px}[data-popover][role=tooltip][data-popper-placement^=top]>[data-popper-arrow]{bottom:-5px}[data-popover][role=tooltip][data-popper-placement^=bottom]>[data-popper-arrow]{top:-5px}[data-popover][role=tooltip][data-popper-placement^=left]>[data-popper-arrow]{right:-5px}[data-popover][role=tooltip][data-popper-placement^=right]>[data-popper-arrow]{left:-5px}[role=tooltip].invisible>[data-popper-arrow]:before{visibility:hidden}[role=tooltip].invisible>[data-popper-arrow]:after{visibility:hidden}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #1C64F2;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#1c64f2}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}select:not([size]){background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3e %3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3e %3c/svg%3e");background-position:right .75rem center;background-repeat:no-repeat;background-size:.75em .75em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}:is([dir=rtl]) select:not([size]){background-position:left .75rem center;padding-right:.75rem;padding-left:0}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#1c64f2;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #1C64F2;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked,.dark [type=checkbox]:checked,.dark [type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:.55em .55em;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3e %3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M1 5.917 5.724 10.5 15 1.5'/%3e %3c/svg%3e");background-repeat:no-repeat;background-size:.55em .55em;-webkit-print-color-adjust:exact;print-color-adjust:exact}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");background-size:1em 1em}.dark [type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");background-size:1em 1em}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3e %3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M1 5.917 5.724 10.5 15 1.5'/%3e %3c/svg%3e");background-color:currentColor;border-color:transparent;background-position:center;background-repeat:no-repeat;background-size:.55em .55em;-webkit-print-color-adjust:exact;print-color-adjust:exact}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px auto inherit}input[type=file]::file-selector-button{color:#fff;background:#1f2937;border:0;font-weight:500;font-size:.875rem;cursor:pointer;padding:.625rem 1rem .625rem 2rem;margin-inline-start:-1rem;margin-inline-end:1rem}input[type=file]::file-selector-button:hover{background:#374151}:is([dir=rtl]) input[type=file]::file-selector-button{padding-right:2rem;padding-left:1rem}.dark input[type=file]::file-selector-button{color:#fff;background:#4b5563}.dark input[type=file]::file-selector-button:hover{background:#6b7280}input[type=range]::-webkit-slider-thumb{height:1.25rem;width:1.25rem;background:#1c64f2;border-radius:9999px;border:0;appearance:none;-moz-appearance:none;-webkit-appearance:none;cursor:pointer}input[type=range]:disabled::-webkit-slider-thumb{background:#9ca3af}.dark input[type=range]:disabled::-webkit-slider-thumb{background:#6b7280}input[type=range]:focus::-webkit-slider-thumb{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);--tw-ring-opacity: 1px;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}input[type=range]::-moz-range-thumb{height:1.25rem;width:1.25rem;background:#1c64f2;border-radius:9999px;border:0;appearance:none;-moz-appearance:none;-webkit-appearance:none;cursor:pointer}input[type=range]:disabled::-moz-range-thumb{background:#9ca3af}.dark input[type=range]:disabled::-moz-range-thumb{background:#6b7280}input[type=range]::-moz-range-progress{background:#3f83f8}input[type=range]::-ms-fill-lower{background:#3f83f8}input[type=range].range-sm::-webkit-slider-thumb{height:1rem;width:1rem}input[type=range].range-lg::-webkit-slider-thumb{height:1.5rem;width:1.5rem}input[type=range].range-sm::-moz-range-thumb{height:1rem;width:1rem}input[type=range].range-lg::-moz-range-thumb{height:1.5rem;width:1.5rem}.toggle-bg:after{content:"";position:absolute;top:.125rem;left:.125rem;background:#fff;border-color:#d1d5db;border-width:1px;border-radius:9999px;height:1.25rem;width:1.25rem;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-duration:.15s;box-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color)}input:checked+.toggle-bg:after{transform:translate(100%);border-color:#fff}input:checked+.toggle-bg{background:#1c64f2;border-color:#1c64f2}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(63 131 248 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(63 131 248 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.not-sr-only{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}.pointer-events-none{pointer-events:none}.\\!visible{visibility:visible!important}.visible{visibility:visible}.invisible{visibility:hidden}.collapse{visibility:collapse}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{top:0;right:0;bottom:0;left:0}.inset-y-0{top:0;bottom:0}.-bottom-1{bottom:-.25rem}.-bottom-1\\.5{bottom:-.375rem}.-bottom-2{bottom:-.5rem}.-bottom-4{bottom:-1rem}.-left-1{left:-.25rem}.-left-1\\.5{left:-.375rem}.-left-3{left:-.75rem}.-right-0{right:-0px}.-right-0\\.5{right:-.125rem}.-right-1{right:-.25rem}.-right-1\\.5{right:-.375rem}.-top-1{top:-.25rem}.-top-1\\.5{top:-.375rem}.bottom-0{bottom:0}.bottom-2{bottom:.5rem}.bottom-2\\.5{bottom:.625rem}.bottom-5{bottom:1.25rem}.bottom-\\[60px\\]{bottom:60px}.left-0{left:0}.left-1\\/2{left:50%}.right-0{right:0}.right-2{right:.5rem}.right-2\\.5{right:.625rem}.right-3{right:.75rem}.top-0{top:0}.top-1\\/2{top:50%}.top-3{top:.75rem}.isolate{isolation:isolate}.isolation-auto{isolation:auto}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.col-span-2{grid-column:span 2 / span 2}.m-2{margin:.5rem}.-mx-1{margin-left:-.25rem;margin-right:-.25rem}.-mx-1\\.5{margin-left:-.375rem;margin-right:-.375rem}.-my-1{margin-top:-.25rem;margin-bottom:-.25rem}.-my-1\\.5{margin-top:-.375rem;margin-bottom:-.375rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-1\\.5{margin-left:.375rem;margin-right:.375rem}.mx-auto{margin-left:auto;margin-right:auto}.my-6{margin-top:1.5rem;margin-bottom:1.5rem}.\\!-mb-2{margin-bottom:-.5rem!important}.-mb-px{margin-bottom:-1px}.-mr-1{margin-right:-.25rem}.-mr-1\\.5{margin-right:-.375rem}.mb-1{margin-bottom:.25rem}.mb-10{margin-bottom:2.5rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-0{margin-left:0}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-3{margin-left:.75rem}.ml-6{margin-left:1.5rem}.ml-auto{margin-left:auto}.mr-0{margin-right:0}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mr-3{margin-right:.75rem}.mr-4{margin-right:1rem}.ms-1{margin-inline-start:.25rem}.ms-2{margin-inline-start:.5rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-16{margin-top:4rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.mt-\\[3px\\]{margin-top:3px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.inline-table{display:inline-table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-column{display:table-column}.table-column-group{display:table-column-group}.table-footer-group{display:table-footer-group}.table-header-group{display:table-header-group}.table-row-group{display:table-row-group}.table-row{display:table-row}.flow-root{display:flow-root}.grid{display:grid}.inline-grid{display:inline-grid}.contents{display:contents}.list-item{display:list-item}.hidden{display:none}.h-0{height:0px}.h-0\\.5{height:.125rem}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-36{height:9rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-56{height:14rem}.h-6{height:1.5rem}.h-64{height:16rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-96{height:24rem}.h-auto{height:auto}.h-full{height:100%}.h-modal{height:calc(100% - 2rem)}.h-screen{height:100vh}.w-0{width:0px}.w-0\\.5{width:.125rem}.w-1{width:.25rem}.w-1\\.5{width:.375rem}.w-1\\/2{width:50%}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-36{width:9rem}.w-4{width:1rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-\\[100\\%\\]{width:100%}.w-auto{width:auto}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-full{max-width:100%}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.max-w-screen-md{max-width:768px}.max-w-screen-xl{max-width:1280px}.max-w-sm{max-width:24rem}.max-w-xl{max-width:36rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.border-collapse{border-collapse:collapse}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-full{--tw-translate-x: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-0{--tw-translate-y: -0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-full{--tw-translate-y: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-full{--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-0{--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-1\\/2{--tw-translate-y: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-full{--tw-translate-y: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform-none{transform:none}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.resize{resize:both}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-7{grid-template-columns:repeat(7,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.content-start{align-content:flex-start}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-stretch{justify-content:stretch}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.-space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(-1rem * var(--tw-space-x-reverse));margin-left:calc(-1rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.25rem * var(--tw-space-x-reverse));margin-left:calc(.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2\\.5>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.625rem * var(--tw-space-x-reverse));margin-left:calc(.625rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-reverse>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 1}.space-x-reverse>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 1}.divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 0;border-right-width:calc(1px * var(--tw-divide-x-reverse));border-left-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-y-reverse>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 1}.divide-x-reverse>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 1}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(243 244 246 / var(--tw-divide-opacity))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(229 231 235 / var(--tw-divide-opacity))}.self-center{align-self:center}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-ellipsis{text-overflow:ellipsis}.text-clip{text-overflow:clip}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.whitespace-pre-line{white-space:pre-line}.whitespace-pre-wrap{white-space:pre-wrap}.\\!rounded-full{border-radius:9999px!important}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-none{border-radius:0}.rounded-b{border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-e{border-start-end-radius:.25rem;border-end-end-radius:.25rem}.rounded-e-lg{border-start-end-radius:.5rem;border-end-end-radius:.5rem}.rounded-l{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.rounded-l-lg{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.rounded-r{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.rounded-r-lg{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.rounded-s{border-start-start-radius:.25rem;border-end-start-radius:.25rem}.rounded-s-lg{border-start-start-radius:.5rem;border-end-start-radius:.5rem}.rounded-t{border-top-left-radius:.25rem;border-top-right-radius:.25rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.rounded-t-xl{border-top-left-radius:.75rem;border-top-right-radius:.75rem}.rounded-bl{border-bottom-left-radius:.25rem}.rounded-br{border-bottom-right-radius:.25rem}.rounded-ee{border-end-end-radius:.25rem}.rounded-es{border-end-start-radius:.25rem}.rounded-se{border-start-end-radius:.25rem}.rounded-ss{border-start-start-radius:.25rem}.rounded-tl{border-top-left-radius:.25rem}.rounded-tr{border-top-right-radius:.25rem}.border{border-width:1px}.border-0{border-width:0px}.border-2{border-width:2px}.border-\\[1px\\]{border-width:1px}.border-x{border-left-width:1px;border-right-width:1px}.border-x-0{border-left-width:0px;border-right-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-b{border-bottom-width:1px}.border-b-0{border-bottom-width:0px}.border-b-2{border-bottom-width:2px}.border-e{border-inline-end-width:1px}.border-l{border-left-width:1px}.border-r{border-right-width:1px}.border-s{border-inline-start-width:1px}.border-t{border-top-width:1px}.border-t-0{border-top-width:0px}.border-dashed{border-style:dashed}.border-none{border-style:none}.\\!border-fuchsia-500{--tw-border-opacity: 1 !important;border-color:rgb(217 70 239 / var(--tw-border-opacity))!important}.\\!border-indigo-500{--tw-border-opacity: 1 !important;border-color:rgb(104 117 245 / var(--tw-border-opacity))!important}.\\!border-primary-400{--tw-border-opacity: 1 !important;border-color:rgb(161 145 244 / var(--tw-border-opacity))!important}.\\!border-primary-700{--tw-border-opacity: 1 !important;border-color:rgb(97 50 207 / var(--tw-border-opacity))!important}.\\!border-teal-500{--tw-border-opacity: 1 !important;border-color:rgb(6 148 162 / var(--tw-border-opacity))!important}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}.border-blue-600{--tw-border-opacity: 1;border-color:rgb(28 100 242 / var(--tw-border-opacity))}.border-blue-700{--tw-border-opacity: 1;border-color:rgb(26 86 219 / var(--tw-border-opacity))}.border-gray-100{--tw-border-opacity: 1;border-color:rgb(243 244 246 / var(--tw-border-opacity))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-gray-500{--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}.border-gray-600{--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}.border-gray-700{--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}.border-gray-800{--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity))}.border-green-500{--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}.border-green-600{--tw-border-opacity: 1;border-color:rgb(5 122 85 / var(--tw-border-opacity))}.border-green-700{--tw-border-opacity: 1;border-color:rgb(4 108 78 / var(--tw-border-opacity))}.border-pink-600{--tw-border-opacity: 1;border-color:rgb(214 31 105 / var(--tw-border-opacity))}.border-pink-700{--tw-border-opacity: 1;border-color:rgb(191 18 93 / var(--tw-border-opacity))}.border-primary-800{--tw-border-opacity: 1;border-color:rgb(81 42 173 / var(--tw-border-opacity))}.border-purple-600{--tw-border-opacity: 1;border-color:rgb(126 58 242 / var(--tw-border-opacity))}.border-purple-700{--tw-border-opacity: 1;border-color:rgb(108 43 217 / var(--tw-border-opacity))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}.border-red-600{--tw-border-opacity: 1;border-color:rgb(224 36 36 / var(--tw-border-opacity))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(200 30 30 / var(--tw-border-opacity))}.border-transparent{border-color:transparent}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-yellow-400{--tw-border-opacity: 1;border-color:rgb(227 160 8 / var(--tw-border-opacity))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(194 120 3 / var(--tw-border-opacity))}.\\!bg-primary-600{--tw-bg-opacity: 1 !important;background-color:rgb(110 65 226 / var(--tw-bg-opacity))!important}.\\!bg-primary-700{--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}.\\!bg-transparent{background-color:transparent!important}.bg-blue-100{--tw-bg-opacity: 1;background-color:rgb(225 239 254 / var(--tw-bg-opacity))}.bg-blue-200{--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(235 245 255 / var(--tw-bg-opacity))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}.bg-blue-700{--tw-bg-opacity: 1;background-color:rgb(26 86 219 / var(--tw-bg-opacity))}.bg-blue-800{--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}.bg-blue-900{--tw-bg-opacity: 1;background-color:rgb(35 56 118 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-gray-300{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-gray-500{--tw-bg-opacity: 1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))}.bg-gray-600{--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}.bg-gray-700{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.bg-gray-800{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.bg-gray-900\\/50{background-color:#11182780}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(222 247 236 / var(--tw-bg-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}.bg-green-400{--tw-bg-opacity: 1;background-color:rgb(49 196 141 / var(--tw-bg-opacity))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(243 250 247 / var(--tw-bg-opacity))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgb(14 159 110 / var(--tw-bg-opacity))}.bg-green-600{--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}.bg-green-700{--tw-bg-opacity: 1;background-color:rgb(4 108 78 / var(--tw-bg-opacity))}.bg-indigo-100{--tw-bg-opacity: 1;background-color:rgb(229 237 255 / var(--tw-bg-opacity))}.bg-indigo-200{--tw-bg-opacity: 1;background-color:rgb(205 219 254 / var(--tw-bg-opacity))}.bg-indigo-500{--tw-bg-opacity: 1;background-color:rgb(104 117 245 / var(--tw-bg-opacity))}.bg-indigo-600{--tw-bg-opacity: 1;background-color:rgb(88 80 236 / var(--tw-bg-opacity))}.bg-orange-100{--tw-bg-opacity: 1;background-color:rgb(254 236 220 / var(--tw-bg-opacity))}.bg-pink-100{--tw-bg-opacity: 1;background-color:rgb(252 232 243 / var(--tw-bg-opacity))}.bg-pink-200{--tw-bg-opacity: 1;background-color:rgb(250 209 232 / var(--tw-bg-opacity))}.bg-pink-700{--tw-bg-opacity: 1;background-color:rgb(191 18 93 / var(--tw-bg-opacity))}.bg-primary-50{--tw-bg-opacity: 1;background-color:rgb(244 244 254 / var(--tw-bg-opacity))}.bg-primary-600{--tw-bg-opacity: 1;background-color:rgb(110 65 226 / var(--tw-bg-opacity))}.bg-purple-100{--tw-bg-opacity: 1;background-color:rgb(237 235 254 / var(--tw-bg-opacity))}.bg-purple-200{--tw-bg-opacity: 1;background-color:rgb(220 215 254 / var(--tw-bg-opacity))}.bg-purple-500{--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}.bg-purple-600{--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}.bg-purple-700{--tw-bg-opacity: 1;background-color:rgb(108 43 217 / var(--tw-bg-opacity))}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(253 232 232 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}.bg-red-400{--tw-bg-opacity: 1;background-color:rgb(249 128 128 / var(--tw-bg-opacity))}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(253 242 242 / var(--tw-bg-opacity))}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(240 82 82 / var(--tw-bg-opacity))}.bg-red-600{--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}.bg-red-700{--tw-bg-opacity: 1;background-color:rgb(200 30 30 / var(--tw-bg-opacity))}.bg-sky-100{--tw-bg-opacity: 1;background-color:rgb(224 242 254 / var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-white\\/30{background-color:#ffffff4d}.bg-white\\/50{background-color:#ffffff80}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(253 246 178 / var(--tw-bg-opacity))}.bg-yellow-200{--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}.bg-yellow-400{--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}.bg-yellow-50{--tw-bg-opacity: 1;background-color:rgb(253 253 234 / var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity: .5}.\\!bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))!important}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.\\!from-fuchsia-400{--tw-gradient-from: #e879f9 var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(232 121 249 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.\\!from-indigo-500{--tw-gradient-from: #6875F5 var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(104 117 245 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.\\!from-teal-400{--tw-gradient-from: #16BDCA var(--tw-gradient-from-position) !important;--tw-gradient-to: rgb(22 189 202 / 0) var(--tw-gradient-to-position) !important;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important}.from-blue-500{--tw-gradient-from: #3F83F8 var(--tw-gradient-from-position);--tw-gradient-to: rgb(63 131 248 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-cyan-500{--tw-gradient-from: #06b6d4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-400{--tw-gradient-from: #31C48D var(--tw-gradient-from-position);--tw-gradient-to: rgb(49 196 141 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-500{--tw-gradient-from: #0E9F6E var(--tw-gradient-from-position);--tw-gradient-to: rgb(14 159 110 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-lime-500{--tw-gradient-from: #84cc16 var(--tw-gradient-from-position);--tw-gradient-to: rgb(132 204 22 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-pink-500{--tw-gradient-from: #E74694 var(--tw-gradient-from-position);--tw-gradient-to: rgb(231 70 148 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-500{--tw-gradient-from: #9061F9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(144 97 249 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-600{--tw-gradient-from: #7E3AF2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-red-200{--tw-gradient-from: #FBD5D5 var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 213 213 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-red-500{--tw-gradient-from: #F05252 var(--tw-gradient-from-position);--tw-gradient-to: rgb(240 82 82 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-200{--tw-gradient-from: #AFECEF var(--tw-gradient-from-position);--tw-gradient-to: rgb(175 236 239 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-300{--tw-gradient-from: #7EDCE2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 220 226 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-teal-500{--tw-gradient-from: #0694A2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 148 162 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.via-blue-600{--tw-gradient-to: rgb(28 100 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #1C64F2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-600{--tw-gradient-to: rgb(8 145 178 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #0891b2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-green-600{--tw-gradient-to: rgb(5 122 85 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #057A55 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-lime-600{--tw-gradient-to: rgb(101 163 13 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #65a30d var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-pink-600{--tw-gradient-to: rgb(214 31 105 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #D61F69 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-purple-600{--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #7E3AF2 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-red-300{--tw-gradient-to: rgb(248 180 180 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #F8B4B4 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-red-600{--tw-gradient-to: rgb(224 36 36 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #E02424 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-teal-600{--tw-gradient-to: rgb(4 116 129 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #047481 var(--tw-gradient-via-position), var(--tw-gradient-to)}.\\!to-blue-400{--tw-gradient-to: #76A9FA var(--tw-gradient-to-position) !important}.\\!to-emerald-400{--tw-gradient-to: #34d399 var(--tw-gradient-to-position) !important}.\\!to-pink-400{--tw-gradient-to: #F17EB8 var(--tw-gradient-to-position) !important}.to-blue-500{--tw-gradient-to: #3F83F8 var(--tw-gradient-to-position)}.to-blue-600{--tw-gradient-to: #1C64F2 var(--tw-gradient-to-position)}.to-blue-700{--tw-gradient-to: #1A56DB var(--tw-gradient-to-position)}.to-cyan-700{--tw-gradient-to: #0e7490 var(--tw-gradient-to-position)}.to-green-700{--tw-gradient-to: #046C4E var(--tw-gradient-to-position)}.to-lime-200{--tw-gradient-to: #d9f99d var(--tw-gradient-to-position)}.to-lime-300{--tw-gradient-to: #bef264 var(--tw-gradient-to-position)}.to-lime-700{--tw-gradient-to: #4d7c0f var(--tw-gradient-to-position)}.to-orange-400{--tw-gradient-to: #FF8A4C var(--tw-gradient-to-position)}.to-pink-500{--tw-gradient-to: #E74694 var(--tw-gradient-to-position)}.to-pink-700{--tw-gradient-to: #BF125D var(--tw-gradient-to-position)}.to-purple-700{--tw-gradient-to: #6C2BD9 var(--tw-gradient-to-position)}.to-red-700{--tw-gradient-to: #C81E1E var(--tw-gradient-to-position)}.to-teal-700{--tw-gradient-to: #036672 var(--tw-gradient-to-position)}.to-yellow-200{--tw-gradient-to: #FCE96A var(--tw-gradient-to-position)}.\\!to-30\\%{--tw-gradient-to-position: 30% !important}.\\!to-40\\%{--tw-gradient-to-position: 40% !important}.\\!to-60\\%{--tw-gradient-to-position: 60% !important}.\\!bg-clip-text{-webkit-background-clip:text!important;background-clip:text!important}.bg-repeat{background-repeat:repeat}.\\!fill-fuchsia-400{fill:#e879f9!important}.\\!fill-indigo-400{fill:#8da2fb!important}.\\!fill-teal-400{fill:#16bdca!important}.fill-blue-600{fill:#1c64f2}.fill-gray-300{fill:#d1d5db}.fill-gray-400{fill:#9ca3af}.fill-gray-600{fill:#4b5563}.fill-green-500{fill:#0e9f6e}.fill-pink-600{fill:#d61f69}.fill-purple-600{fill:#7e3af2}.fill-red-600{fill:#e02424}.fill-white{fill:#fff}.fill-yellow-400{fill:#e3a008}.\\!stroke-primary-500{stroke:#8365ed!important}.stroke-green-500{stroke:#0e9f6e}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-0{padding-top:0;padding-bottom:0}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-6{padding-bottom:1.5rem}.pl-10{padding-left:2.5rem}.pl-2{padding-left:.5rem}.pl-2\\.5{padding-left:.625rem}.pl-3{padding-left:.75rem}.pr-4{padding-right:1rem}.pt-0{padding-top:0}.pt-2{padding-top:.5rem}.pt-4{padding-top:1rem}.pt-5{padding-top:1.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-extralight{font-weight:200}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.font-thin{font-weight:100}.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}.normal-case{text-transform:none}.italic{font-style:italic}.not-italic{font-style:normal}.normal-nums{font-variant-numeric:normal}.ordinal{--tw-ordinal: ordinal;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.slashed-zero{--tw-slashed-zero: slashed-zero;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.lining-nums{--tw-numeric-figure: lining-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.oldstyle-nums{--tw-numeric-figure: oldstyle-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.proportional-nums{--tw-numeric-spacing: proportional-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.diagonal-fractions{--tw-numeric-fraction: diagonal-fractions;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.leading-6{line-height:1.5rem}.leading-9{line-height:2.25rem}.leading-loose{line-height:2}.leading-none{line-height:1}.leading-normal{line-height:1.5}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-.025em}.\\!text-primary-500{--tw-text-opacity: 1 !important;color:rgb(131 101 237 / var(--tw-text-opacity))!important}.\\!text-transparent{color:transparent!important}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-blue-100{--tw-text-opacity: 1;color:rgb(225 239 254 / var(--tw-text-opacity))}.text-blue-400{--tw-text-opacity: 1;color:rgb(118 169 250 / var(--tw-text-opacity))}.text-blue-500{--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}.text-blue-600{--tw-text-opacity: 1;color:rgb(28 100 242 / var(--tw-text-opacity))}.text-blue-700{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.text-blue-800{--tw-text-opacity: 1;color:rgb(30 66 159 / var(--tw-text-opacity))}.text-blue-900{--tw-text-opacity: 1;color:rgb(35 56 118 / var(--tw-text-opacity))}.text-gray-200{--tw-text-opacity: 1;color:rgb(229 231 235 / var(--tw-text-opacity))}.text-gray-300{--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.text-green-200{--tw-text-opacity: 1;color:rgb(188 240 218 / var(--tw-text-opacity))}.text-green-400{--tw-text-opacity: 1;color:rgb(49 196 141 / var(--tw-text-opacity))}.text-green-500{--tw-text-opacity: 1;color:rgb(14 159 110 / var(--tw-text-opacity))}.text-green-600{--tw-text-opacity: 1;color:rgb(5 122 85 / var(--tw-text-opacity))}.text-green-700{--tw-text-opacity: 1;color:rgb(4 108 78 / var(--tw-text-opacity))}.text-green-800{--tw-text-opacity: 1;color:rgb(3 84 63 / var(--tw-text-opacity))}.text-green-900{--tw-text-opacity: 1;color:rgb(1 71 55 / var(--tw-text-opacity))}.text-indigo-500{--tw-text-opacity: 1;color:rgb(104 117 245 / var(--tw-text-opacity))}.text-indigo-700{--tw-text-opacity: 1;color:rgb(81 69 205 / var(--tw-text-opacity))}.text-indigo-800{--tw-text-opacity: 1;color:rgb(66 56 157 / var(--tw-text-opacity))}.text-indigo-900{--tw-text-opacity: 1;color:rgb(54 47 120 / var(--tw-text-opacity))}.text-orange-200{--tw-text-opacity: 1;color:rgb(252 217 189 / var(--tw-text-opacity))}.text-orange-500{--tw-text-opacity: 1;color:rgb(255 90 31 / var(--tw-text-opacity))}.text-orange-800{--tw-text-opacity: 1;color:rgb(138 44 13 / var(--tw-text-opacity))}.text-pink-500{--tw-text-opacity: 1;color:rgb(231 70 148 / var(--tw-text-opacity))}.text-pink-600{--tw-text-opacity: 1;color:rgb(214 31 105 / var(--tw-text-opacity))}.text-pink-700{--tw-text-opacity: 1;color:rgb(191 18 93 / var(--tw-text-opacity))}.text-pink-800{--tw-text-opacity: 1;color:rgb(153 21 75 / var(--tw-text-opacity))}.text-pink-900{--tw-text-opacity: 1;color:rgb(117 26 61 / var(--tw-text-opacity))}.text-primary-600{--tw-text-opacity: 1;color:rgb(110 65 226 / var(--tw-text-opacity))}.text-purple-500{--tw-text-opacity: 1;color:rgb(144 97 249 / var(--tw-text-opacity))}.text-purple-600{--tw-text-opacity: 1;color:rgb(126 58 242 / var(--tw-text-opacity))}.text-purple-700{--tw-text-opacity: 1;color:rgb(108 43 217 / var(--tw-text-opacity))}.text-purple-800{--tw-text-opacity: 1;color:rgb(85 33 181 / var(--tw-text-opacity))}.text-purple-900{--tw-text-opacity: 1;color:rgb(74 29 150 / var(--tw-text-opacity))}.text-red-200{--tw-text-opacity: 1;color:rgb(251 213 213 / var(--tw-text-opacity))}.text-red-400{--tw-text-opacity: 1;color:rgb(249 128 128 / var(--tw-text-opacity))}.text-red-500{--tw-text-opacity: 1;color:rgb(240 82 82 / var(--tw-text-opacity))}.text-red-600{--tw-text-opacity: 1;color:rgb(224 36 36 / var(--tw-text-opacity))}.text-red-700{--tw-text-opacity: 1;color:rgb(200 30 30 / var(--tw-text-opacity))}.text-red-800{--tw-text-opacity: 1;color:rgb(155 28 28 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-yellow-300{--tw-text-opacity: 1;color:rgb(250 202 21 / var(--tw-text-opacity))}.text-yellow-400{--tw-text-opacity: 1;color:rgb(227 160 8 / var(--tw-text-opacity))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(194 120 3 / var(--tw-text-opacity))}.text-yellow-700{--tw-text-opacity: 1;color:rgb(142 75 16 / var(--tw-text-opacity))}.text-yellow-800{--tw-text-opacity: 1;color:rgb(114 59 19 / var(--tw-text-opacity))}.text-yellow-900{--tw-text-opacity: 1;color:rgb(99 49 18 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.overline{text-decoration-line:overline}.line-through{text-decoration-line:line-through}.no-underline{text-decoration-line:none}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.placeholder-green-700::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(4 108 78 / var(--tw-placeholder-opacity))}.placeholder-green-700::placeholder{--tw-placeholder-opacity: 1;color:rgb(4 108 78 / var(--tw-placeholder-opacity))}.placeholder-red-700::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(200 30 30 / var(--tw-placeholder-opacity))}.placeholder-red-700::placeholder{--tw-placeholder-opacity: 1;color:rgb(200 30 30 / var(--tw-placeholder-opacity))}.\\!opacity-100{opacity:1!important}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-blue-500\\/50{--tw-shadow-color: rgb(63 131 248 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-blue-800\\/80{--tw-shadow-color: rgb(30 66 159 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-500\\/50{--tw-shadow-color: rgb(6 182 212 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-800\\/80{--tw-shadow-color: rgb(21 94 117 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-green-500\\/50{--tw-shadow-color: rgb(14 159 110 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-green-800\\/80{--tw-shadow-color: rgb(3 84 63 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-lime-500\\/50{--tw-shadow-color: rgb(132 204 22 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-lime-800\\/80{--tw-shadow-color: rgb(63 98 18 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-pink-500\\/50{--tw-shadow-color: rgb(231 70 148 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-pink-800\\/80{--tw-shadow-color: rgb(153 21 75 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-purple-500\\/50{--tw-shadow-color: rgb(144 97 249 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-purple-800\\/80{--tw-shadow-color: rgb(85 33 181 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-red-500\\/50{--tw-shadow-color: rgb(240 82 82 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-red-800\\/80{--tw-shadow-color: rgb(155 28 28 / .8);--tw-shadow: var(--tw-shadow-colored)}.shadow-teal-500\\/50{--tw-shadow-color: rgb(6 148 162 / .5);--tw-shadow: var(--tw-shadow-colored)}.outline{outline-style:solid}.ring{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-8{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-inset{--tw-ring-inset: inset}.ring-blue-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity))}.ring-blue-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}.ring-cyan-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(21 94 117 / var(--tw-ring-opacity))}.ring-gray-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))}.ring-gray-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(31 41 55 / var(--tw-ring-opacity))}.ring-green-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(49 196 141 / var(--tw-ring-opacity))}.ring-green-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}.ring-pink-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(153 21 75 / var(--tw-ring-opacity))}.ring-pink-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(117 26 61 / var(--tw-ring-opacity))}.ring-purple-800{--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}.ring-purple-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(74 29 150 / var(--tw-ring-opacity))}.ring-red-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}.ring-red-900{--tw-ring-opacity: 1;--tw-ring-color: rgb(119 29 29 / var(--tw-ring-opacity))}.ring-white{--tw-ring-opacity: 1;--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.grayscale{--tw-grayscale: grayscale(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.invert{--tw-invert: invert(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.sepia{--tw-sepia: sepia(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur: blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-grayscale{--tw-backdrop-grayscale: grayscale(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-invert{--tw-backdrop-invert: invert(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-sepia{--tw-backdrop-sepia: sepia(100%);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300{transition-duration:.3s}.duration-700{transition-duration:.7s}.duration-75{transition-duration:75ms}.ease-in{transition-timing-function:cubic-bezier(.4,0,1,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.pause{animation-play-state:paused}.fade-enter-active{transition:opacity .8s ease}.fade-enter-from{opacity:0}.fade-leave-active{display:none}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:left-\\[2px\\]:after{content:var(--tw-content);left:2px}.after\\:left-\\[4px\\]:after{content:var(--tw-content);left:4px}.after\\:start-\\[2px\\]:after{content:var(--tw-content);inset-inline-start:2px}.after\\:top-0:after{content:var(--tw-content);top:0}.after\\:top-0\\.5:after{content:var(--tw-content);top:.125rem}.after\\:top-\\[2px\\]:after{content:var(--tw-content);top:2px}.after\\:h-4:after{content:var(--tw-content);height:1rem}.after\\:h-5:after{content:var(--tw-content);height:1.25rem}.after\\:h-6:after{content:var(--tw-content);height:1.5rem}.after\\:w-4:after{content:var(--tw-content);width:1rem}.after\\:w-5:after{content:var(--tw-content);width:1.25rem}.after\\:w-6:after{content:var(--tw-content);width:1.5rem}.after\\:rounded-full:after{content:var(--tw-content);border-radius:9999px}.after\\:border:after{content:var(--tw-content);border-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.after\\:bg-white:after{content:var(--tw-content);--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.after\\:transition-all:after{content:var(--tw-content);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.after\\:content-\\[\\"\\"\\]:after{--tw-content: "";content:var(--tw-content)}.after\\:content-\\[\\'\\'\\]:after{--tw-content: "";content:var(--tw-content)}.first\\:mr-3:first-child{margin-right:.75rem}.first\\:whitespace-nowrap:first-child{white-space:nowrap}.first\\:rounded-l:first-child{border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.first\\:rounded-l-lg:first-child{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.first\\:font-medium:first-child{font-weight:500}.first\\:text-gray-900:first-child{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.last\\:mr-0:last-child{margin-right:0}.last\\:rounded-r:last-child{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.last\\:rounded-r-lg:last-child{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.last\\:text-right:last-child{text-align:right}.odd\\:bg-gray-50:nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.odd\\:bg-white:nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.even\\:bg-gray-50:nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.even\\:bg-white:nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:border-gray-300:hover{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity))}.hover\\:border-transparent:hover{border-color:transparent}.hover\\:\\!bg-primary-800:hover{--tw-bg-opacity: 1 !important;background-color:rgb(81 42 173 / var(--tw-bg-opacity))!important}.hover\\:bg-blue-100:hover{--tw-bg-opacity: 1;background-color:rgb(225 239 254 / var(--tw-bg-opacity))}.hover\\:bg-blue-200:hover{--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}.hover\\:bg-blue-800:hover{--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.hover\\:bg-gray-50:hover{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.hover\\:bg-gray-600:hover{--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}.hover\\:bg-gray-900:hover{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.hover\\:bg-green-200:hover{--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}.hover\\:bg-green-800:hover{--tw-bg-opacity: 1;background-color:rgb(3 84 63 / var(--tw-bg-opacity))}.hover\\:bg-pink-800:hover{--tw-bg-opacity: 1;background-color:rgb(153 21 75 / var(--tw-bg-opacity))}.hover\\:bg-primary-700:hover{--tw-bg-opacity: 1;background-color:rgb(97 50 207 / var(--tw-bg-opacity))}.hover\\:bg-purple-800:hover{--tw-bg-opacity: 1;background-color:rgb(85 33 181 / var(--tw-bg-opacity))}.hover\\:bg-red-200:hover{--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}.hover\\:bg-red-800:hover{--tw-bg-opacity: 1;background-color:rgb(155 28 28 / var(--tw-bg-opacity))}.hover\\:bg-white:hover{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:bg-yellow-200:hover{--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}.hover\\:bg-yellow-500:hover{--tw-bg-opacity: 1;background-color:rgb(194 120 3 / var(--tw-bg-opacity))}.hover\\:bg-gradient-to-bl:hover{background-image:linear-gradient(to bottom left,var(--tw-gradient-stops))}.hover\\:bg-gradient-to-br:hover{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.hover\\:bg-gradient-to-l:hover{background-image:linear-gradient(to left,var(--tw-gradient-stops))}.hover\\:from-teal-200:hover{--tw-gradient-from: #AFECEF var(--tw-gradient-from-position);--tw-gradient-to: rgb(175 236 239 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.hover\\:to-lime-200:hover{--tw-gradient-to: #d9f99d var(--tw-gradient-to-position)}.hover\\:text-black:hover{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.hover\\:text-blue-600:hover{--tw-text-opacity: 1;color:rgb(28 100 242 / var(--tw-text-opacity))}.hover\\:text-blue-700:hover{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.hover\\:text-gray-600:hover{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}.hover\\:text-gray-700:hover{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.hover\\:text-gray-800:hover{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.hover\\:text-gray-900:hover{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.hover\\:text-white:hover{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:opacity-100:hover{opacity:1}.focus\\:z-10:focus{z-index:10}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}.focus\\:border-gray-200:focus{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity))}.focus\\:border-green-500:focus{--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}.focus\\:border-primary-500:focus{--tw-border-opacity: 1;border-color:rgb(131 101 237 / var(--tw-border-opacity))}.focus\\:border-red-500:focus{--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}.focus\\:text-blue-700:focus{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-0:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-4:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:\\!ring-primary-300:focus{--tw-ring-opacity: 1 !important;--tw-ring-color: rgb(192 185 249 / var(--tw-ring-opacity)) !important}.focus\\:ring-blue-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}.focus\\:ring-blue-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity))}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))}.focus\\:ring-blue-700:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(26 86 219 / var(--tw-ring-opacity))}.focus\\:ring-cyan-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(165 243 252 / var(--tw-ring-opacity))}.focus\\:ring-cyan-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(103 232 249 / var(--tw-ring-opacity))}.focus\\:ring-gray-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(229 231 235 / var(--tw-ring-opacity))}.focus\\:ring-gray-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))}.focus\\:ring-gray-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity))}.focus\\:ring-green-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(188 240 218 / var(--tw-ring-opacity))}.focus\\:ring-green-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))}.focus\\:ring-green-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(49 196 141 / var(--tw-ring-opacity))}.focus\\:ring-green-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(14 159 110 / var(--tw-ring-opacity))}.focus\\:ring-lime-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(217 249 157 / var(--tw-ring-opacity))}.focus\\:ring-lime-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(190 242 100 / var(--tw-ring-opacity))}.focus\\:ring-pink-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 209 232 / var(--tw-ring-opacity))}.focus\\:ring-pink-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 217 / var(--tw-ring-opacity))}.focus\\:ring-primary-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(131 101 237 / var(--tw-ring-opacity))}.focus\\:ring-purple-200:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(220 215 254 / var(--tw-ring-opacity))}.focus\\:ring-purple-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))}.focus\\:ring-red-100:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(253 232 232 / var(--tw-ring-opacity))}.focus\\:ring-red-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))}.focus\\:ring-red-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}.focus\\:ring-red-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(240 82 82 / var(--tw-ring-opacity))}.focus\\:ring-teal-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))}.focus\\:ring-yellow-300:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))}.focus\\:ring-yellow-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(227 160 8 / var(--tw-ring-opacity))}.group:hover .group-hover\\:bg-white\\/50{background-color:#ffffff80}.group:hover .group-hover\\:bg-opacity-0{--tw-bg-opacity: 0}.group:hover .group-hover\\:from-cyan-500{--tw-gradient-from: #06b6d4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-green-400{--tw-gradient-from: #31C48D var(--tw-gradient-from-position);--tw-gradient-to: rgb(49 196 141 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-pink-500{--tw-gradient-from: #E74694 var(--tw-gradient-from-position);--tw-gradient-to: rgb(231 70 148 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-purple-500{--tw-gradient-from: #9061F9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(144 97 249 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-purple-600{--tw-gradient-from: #7E3AF2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 58 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-red-200{--tw-gradient-from: #FBD5D5 var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 213 213 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:from-teal-300{--tw-gradient-from: #7EDCE2 var(--tw-gradient-from-position);--tw-gradient-to: rgb(126 220 226 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:via-red-300{--tw-gradient-to: rgb(248 180 180 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #F8B4B4 var(--tw-gradient-via-position), var(--tw-gradient-to)}.group:hover .group-hover\\:to-blue-500{--tw-gradient-to: #3F83F8 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-blue-600{--tw-gradient-to: #1C64F2 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-lime-300{--tw-gradient-to: #bef264 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-orange-400{--tw-gradient-to: #FF8A4C var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-pink-500{--tw-gradient-to: #E74694 var(--tw-gradient-to-position)}.group:hover .group-hover\\:to-yellow-200{--tw-gradient-to: #FCE96A var(--tw-gradient-to-position)}.group:hover .group-hover\\:fill-gray-900{fill:#111827}.group:hover .group-hover\\:text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}.group:hover .group-hover\\:text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.group:focus .group-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.group:focus .group-focus\\:ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.group:focus .group-focus\\:ring-white{--tw-ring-opacity: 1;--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))}.peer:checked~.peer-checked\\:bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-green-600{--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-orange-500{--tw-bg-opacity: 1;background-color:rgb(255 90 31 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-primary-100{--tw-bg-opacity: 1;background-color:rgb(236 234 253 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-primary-600{--tw-bg-opacity: 1;background-color:rgb(110 65 226 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-purple-600{--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-red-600{--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-teal-600{--tw-bg-opacity: 1;background-color:rgb(4 116 129 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:bg-yellow-400{--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}.peer:checked~.peer-checked\\:font-semibold{font-weight:600}.peer:checked~.peer-checked\\:text-primary{--tw-text-opacity: 1;color:rgb(110 65 226 / var(--tw-text-opacity))}.peer:checked~.peer-checked\\:after\\:translate-x-full:after{content:var(--tw-content);--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\\:after\\:border-white:after{content:var(--tw-content);--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.peer:focus~.peer-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.peer:focus~.peer-focus\\:ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.peer:focus~.peer-focus\\:ring-blue-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-green-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-orange-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(253 186 140 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-purple-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-red-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-teal-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))}.peer:focus~.peer-focus\\:ring-yellow-300{--tw-ring-opacity: 1;--tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))}:is(.dark .dark\\:divide-gray-700)>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(55 65 81 / var(--tw-divide-opacity))}:is(.dark .dark\\:border-blue-500){--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-500){--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-600){--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-700){--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-800){--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity))}:is(.dark .dark\\:border-gray-900){--tw-border-opacity: 1;border-color:rgb(17 24 39 / var(--tw-border-opacity))}:is(.dark .dark\\:border-green-500){--tw-border-opacity: 1;border-color:rgb(14 159 110 / var(--tw-border-opacity))}:is(.dark .dark\\:border-pink-400){--tw-border-opacity: 1;border-color:rgb(241 126 184 / var(--tw-border-opacity))}:is(.dark .dark\\:border-pink-500){--tw-border-opacity: 1;border-color:rgb(231 70 148 / var(--tw-border-opacity))}:is(.dark .dark\\:border-purple-400){--tw-border-opacity: 1;border-color:rgb(172 148 250 / var(--tw-border-opacity))}:is(.dark .dark\\:border-purple-500){--tw-border-opacity: 1;border-color:rgb(144 97 249 / var(--tw-border-opacity))}:is(.dark .dark\\:border-red-500){--tw-border-opacity: 1;border-color:rgb(240 82 82 / var(--tw-border-opacity))}:is(.dark .dark\\:border-transparent){border-color:transparent}:is(.dark .dark\\:border-yellow-300){--tw-border-opacity: 1;border-color:rgb(250 202 21 / var(--tw-border-opacity))}:is(.dark .dark\\:\\!bg-primary-600){--tw-bg-opacity: 1 !important;background-color:rgb(110 65 226 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:\\!bg-primary-700){--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:bg-blue-200){--tw-bg-opacity: 1;background-color:rgb(195 221 253 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-blue-600){--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-blue-900){--tw-bg-opacity: 1;background-color:rgb(35 56 118 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-300){--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-400){--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-600){--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-700){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-800){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-800\\/30){background-color:#1f29374d}:is(.dark .dark\\:bg-gray-800\\/50){background-color:#1f293780}:is(.dark .dark\\:bg-gray-900){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-gray-900\\/80){background-color:#111827cc}:is(.dark .dark\\:bg-green-200){--tw-bg-opacity: 1;background-color:rgb(188 240 218 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-500){--tw-bg-opacity: 1;background-color:rgb(14 159 110 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-600){--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-green-800){--tw-bg-opacity: 1;background-color:rgb(3 84 63 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-indigo-200){--tw-bg-opacity: 1;background-color:rgb(205 219 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-indigo-500){--tw-bg-opacity: 1;background-color:rgb(104 117 245 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-orange-200){--tw-bg-opacity: 1;background-color:rgb(252 217 189 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-orange-700){--tw-bg-opacity: 1;background-color:rgb(180 52 3 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-pink-200){--tw-bg-opacity: 1;background-color:rgb(250 209 232 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-pink-600){--tw-bg-opacity: 1;background-color:rgb(214 31 105 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-200){--tw-bg-opacity: 1;background-color:rgb(220 215 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-500){--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-purple-600){--tw-bg-opacity: 1;background-color:rgb(126 58 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-200){--tw-bg-opacity: 1;background-color:rgb(251 213 213 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-500){--tw-bg-opacity: 1;background-color:rgb(240 82 82 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-600){--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-red-800){--tw-bg-opacity: 1;background-color:rgb(155 28 28 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-transparent){background-color:transparent}:is(.dark .dark\\:bg-yellow-200){--tw-bg-opacity: 1;background-color:rgb(252 233 106 / var(--tw-bg-opacity))}:is(.dark .dark\\:bg-opacity-80){--tw-bg-opacity: .8}:is(.dark .dark\\:fill-gray-300){fill:#d1d5db}:is(.dark .dark\\:text-blue-400){--tw-text-opacity: 1;color:rgb(118 169 250 / var(--tw-text-opacity))}:is(.dark .dark\\:text-blue-500){--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}:is(.dark .dark\\:text-blue-800){--tw-text-opacity: 1;color:rgb(30 66 159 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-300){--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-400){--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-500){--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-600){--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity))}:is(.dark .dark\\:text-gray-800){--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-200){--tw-text-opacity: 1;color:rgb(188 240 218 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-400){--tw-text-opacity: 1;color:rgb(49 196 141 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-500){--tw-text-opacity: 1;color:rgb(14 159 110 / var(--tw-text-opacity))}:is(.dark .dark\\:text-green-900){--tw-text-opacity: 1;color:rgb(1 71 55 / var(--tw-text-opacity))}:is(.dark .dark\\:text-indigo-500){--tw-text-opacity: 1;color:rgb(104 117 245 / var(--tw-text-opacity))}:is(.dark .dark\\:text-indigo-900){--tw-text-opacity: 1;color:rgb(54 47 120 / var(--tw-text-opacity))}:is(.dark .dark\\:text-orange-200){--tw-text-opacity: 1;color:rgb(252 217 189 / var(--tw-text-opacity))}:is(.dark .dark\\:text-orange-900){--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-400){--tw-text-opacity: 1;color:rgb(241 126 184 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-500){--tw-text-opacity: 1;color:rgb(231 70 148 / var(--tw-text-opacity))}:is(.dark .dark\\:text-pink-900){--tw-text-opacity: 1;color:rgb(117 26 61 / var(--tw-text-opacity))}:is(.dark .dark\\:text-primary-500){--tw-text-opacity: 1;color:rgb(131 101 237 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-400){--tw-text-opacity: 1;color:rgb(172 148 250 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-500){--tw-text-opacity: 1;color:rgb(144 97 249 / var(--tw-text-opacity))}:is(.dark .dark\\:text-purple-900){--tw-text-opacity: 1;color:rgb(74 29 150 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-200){--tw-text-opacity: 1;color:rgb(251 213 213 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-400){--tw-text-opacity: 1;color:rgb(249 128 128 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-500){--tw-text-opacity: 1;color:rgb(240 82 82 / var(--tw-text-opacity))}:is(.dark .dark\\:text-red-900){--tw-text-opacity: 1;color:rgb(119 29 29 / var(--tw-text-opacity))}:is(.dark .dark\\:text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-300){--tw-text-opacity: 1;color:rgb(250 202 21 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-400){--tw-text-opacity: 1;color:rgb(227 160 8 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-500){--tw-text-opacity: 1;color:rgb(194 120 3 / var(--tw-text-opacity))}:is(.dark .dark\\:text-yellow-900){--tw-text-opacity: 1;color:rgb(99 49 18 / var(--tw-text-opacity))}:is(.dark .dark\\:placeholder-gray-400)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-gray-400)::placeholder{--tw-placeholder-opacity: 1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-green-500)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(14 159 110 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-green-500)::placeholder{--tw-placeholder-opacity: 1;color:rgb(14 159 110 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-red-500)::-moz-placeholder{--tw-placeholder-opacity: 1;color:rgb(240 82 82 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:placeholder-red-500)::placeholder{--tw-placeholder-opacity: 1;color:rgb(240 82 82 / var(--tw-placeholder-opacity))}:is(.dark .dark\\:shadow-lg){--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}:is(.dark .dark\\:shadow-blue-800\\/80){--tw-shadow-color: rgb(30 66 159 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-cyan-800\\/80){--tw-shadow-color: rgb(21 94 117 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-green-800\\/80){--tw-shadow-color: rgb(3 84 63 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-lime-800\\/80){--tw-shadow-color: rgb(63 98 18 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-pink-800\\/80){--tw-shadow-color: rgb(153 21 75 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-purple-800\\/80){--tw-shadow-color: rgb(85 33 181 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-red-800\\/80){--tw-shadow-color: rgb(155 28 28 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:shadow-teal-800\\/80){--tw-shadow-color: rgb(5 80 92 / .8);--tw-shadow: var(--tw-shadow-colored)}:is(.dark .dark\\:ring-gray-500){--tw-ring-opacity: 1;--tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:ring-gray-900){--tw-ring-opacity: 1;--tw-ring-color: rgb(17 24 39 / var(--tw-ring-opacity))}:is(.dark .dark\\:ring-offset-gray-800){--tw-ring-offset-color: #1F2937}:is(.dark .first\\:dark\\:text-white):first-child{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .odd\\:dark\\:bg-gray-800):nth-child(odd){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .even\\:dark\\:bg-gray-700):nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .even\\:dark\\:bg-gray-900):nth-child(2n){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:border-gray-500:hover){--tw-border-opacity: 1;border-color:rgb(107 114 128 / var(--tw-border-opacity))}:is(.dark .dark\\:hover\\:border-gray-600:hover){--tw-border-opacity: 1;border-color:rgb(75 85 99 / var(--tw-border-opacity))}:is(.dark .dark\\:hover\\:\\!bg-primary-700:hover){--tw-bg-opacity: 1 !important;background-color:rgb(97 50 207 / var(--tw-bg-opacity))!important}:is(.dark .dark\\:hover\\:bg-blue-300:hover){--tw-bg-opacity: 1;background-color:rgb(164 202 254 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-600:hover){--tw-bg-opacity: 1;background-color:rgb(28 100 242 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-700:hover){--tw-bg-opacity: 1;background-color:rgb(26 86 219 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-blue-800:hover){--tw-bg-opacity: 1;background-color:rgb(30 66 159 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-600:hover){--tw-bg-opacity: 1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-700:hover){--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-gray-800:hover){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-green-600:hover){--tw-bg-opacity: 1;background-color:rgb(5 122 85 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-green-700:hover){--tw-bg-opacity: 1;background-color:rgb(4 108 78 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-pink-500:hover){--tw-bg-opacity: 1;background-color:rgb(231 70 148 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-pink-700:hover){--tw-bg-opacity: 1;background-color:rgb(191 18 93 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-purple-500:hover){--tw-bg-opacity: 1;background-color:rgb(144 97 249 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-purple-700:hover){--tw-bg-opacity: 1;background-color:rgb(108 43 217 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-red-600:hover){--tw-bg-opacity: 1;background-color:rgb(224 36 36 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-red-700:hover){--tw-bg-opacity: 1;background-color:rgb(200 30 30 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:bg-yellow-400:hover){--tw-bg-opacity: 1;background-color:rgb(227 160 8 / var(--tw-bg-opacity))}:is(.dark .dark\\:hover\\:text-blue-500:hover){--tw-text-opacity: 1;color:rgb(63 131 248 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-gray-300:hover){--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-gray-900:hover){--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}:is(.dark .dark\\:hover\\:text-white:hover){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:focus\\:border-blue-500:focus){--tw-border-opacity: 1;border-color:rgb(63 131 248 / var(--tw-border-opacity))}:is(.dark .dark\\:focus\\:border-primary-500:focus){--tw-border-opacity: 1;border-color:rgb(131 101 237 / var(--tw-border-opacity))}:is(.dark .dark\\:focus\\:text-white:focus){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .dark\\:focus\\:ring-blue-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-blue-600:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(28 100 242 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-blue-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-cyan-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(21 94 117 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-600:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-700:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(55 65 81 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-gray-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(31 41 55 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-green-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-lime-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(63 98 18 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-pink-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(153 21 75 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-pink-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(117 26 61 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-primary-500:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(131 101 237 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-primary-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(69 36 142 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-purple-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-purple-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(74 29 150 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-400:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-red-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(119 29 29 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-teal-700:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 102 114 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-teal-800:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))}:is(.dark .dark\\:focus\\:ring-yellow-900:focus){--tw-ring-opacity: 1;--tw-ring-color: rgb(99 49 18 / var(--tw-ring-opacity))}:is(.dark .group:hover .dark\\:group-hover\\:bg-gray-800\\/60){background-color:#1f293799}:is(.dark .group:hover .dark\\:group-hover\\:text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(.dark .group:focus .dark\\:group-focus\\:ring-gray-800\\/70){--tw-ring-color: rgb(31 41 55 / .7)}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-blue-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-green-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-orange-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(138 44 13 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-purple-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-red-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-teal-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))}:is(.dark .peer:focus~.dark\\:peer-focus\\:ring-yellow-800){--tw-ring-opacity: 1;--tw-ring-color: rgb(114 59 19 / var(--tw-ring-opacity))}@media (min-width: 640px){.sm\\:mb-0{margin-bottom:0}.sm\\:mt-0{margin-top:0}.sm\\:flex{display:flex}.sm\\:hidden{display:none}.sm\\:h-10{height:2.5rem}.sm\\:h-6{height:1.5rem}.sm\\:h-64{height:16rem}.sm\\:h-7{height:1.75rem}.sm\\:w-1\\/4{width:25%}.sm\\:w-10{width:2.5rem}.sm\\:w-6{width:1.5rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:rounded-lg{border-radius:.5rem}.sm\\:p-6{padding:1.5rem}.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:pr-8{padding-right:2rem}.sm\\:text-center{text-align:center}}@media (min-width: 768px){.md\\:inset-0{top:0;right:0;bottom:0;left:0}.md\\:order-2{order:2}.md\\:mb-0{margin-bottom:0}.md\\:mr-6{margin-right:1.5rem}.md\\:mt-0{margin-top:0}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:h-auto{height:auto}.md\\:h-full{height:100%}.md\\:w-1\\/4{width:25%}.md\\:w-48{width:12rem}.md\\:w-auto{width:auto}.md\\:max-w-xl{max-width:36rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:items-center{align-items:center}.md\\:justify-between{justify-content:space-between}.md\\:space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.md\\:space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}.md\\:rounded-none{border-radius:0}.md\\:rounded-l-lg{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem}.md\\:border-0{border-width:0px}.md\\:bg-transparent{background-color:transparent}.md\\:p-0{padding:0}.md\\:p-6{padding:1.5rem}.md\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.md\\:py-8{padding-top:2rem;padding-bottom:2rem}.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:text-sm{font-size:.875rem;line-height:1.25rem}.md\\:font-medium{font-weight:500}.md\\:text-blue-700{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}.md\\:hover\\:bg-transparent:hover{background-color:transparent}.md\\:hover\\:text-blue-700:hover{--tw-text-opacity: 1;color:rgb(26 86 219 / var(--tw-text-opacity))}:is(.dark .md\\:dark\\:bg-gray-900){--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(.dark .md\\:dark\\:hover\\:bg-transparent:hover){background-color:transparent}:is(.dark .md\\:dark\\:hover\\:text-white:hover){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}}@media (min-width: 1024px){.lg\\:mb-12{margin-bottom:3rem}.lg\\:mt-6{margin-top:1.5rem}.lg\\:grid{display:grid}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:divide-x>:not([hidden])~:not([hidden]){--tw-divide-x-reverse: 0;border-right-width:calc(1px * var(--tw-divide-x-reverse));border-left-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}.lg\\:divide-y-0>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(0px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(0px * var(--tw-divide-y-reverse))}.lg\\:p-8{padding:2rem}.lg\\:px-16{padding-left:4rem;padding-right:4rem}.lg\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.lg\\:py-16{padding-top:4rem;padding-bottom:4rem}.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:h-80{height:20rem}.xl\\:w-1\\/6{width:16.666667%}}@media (min-width: 1536px){.\\32xl\\:h-96{height:24rem}}.rtl\\:rotate-180:where([dir=rtl],[dir=rtl] *){--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rtl\\:space-x-reverse:where([dir=rtl],[dir=rtl] *)>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 1}.peer:checked~.rtl\\:peer-checked\\:after\\:-translate-x-full:where([dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\[\\&\\:not\\(\\:last-child\\)\\]\\:border-b:not(:last-child){border-bottom-width:1px}:is(.dark .\\[\\&\\:not\\(\\:last-child\\)\\]\\:dark\\:border-gray-700):not(:last-child){--tw-border-opacity: 1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}`, gd = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, i] of e)
    r[o] = i;
  return r;
}, ud = { class: "bg-white dark:bg-gray-900" }, fd = { class: "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" }, hd = /* @__PURE__ */ l("div", { class: "mx-auto max-w-screen-md text-center mb-8 lg:mb-12" }, [
  /* @__PURE__ */ l("h2", { class: "mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white" }, " Activepieces Pricing ")
], -1), wd = { class: "flex flex-row justify-between items-center mb-10 mt-16 w-full" }, vd = { class: "flex flex-row gap-3 items-center" }, bd = /* @__PURE__ */ l("p", { class: "inline-block ml-2 text-xl text-gray-500" }, "Your plan:", -1), md = {
  class: "text-sm font-medium text-center text-gray-500 flex flex-row gap-2",
  id: "pricingTabsParent",
  role: "tablist"
}, yd = {
  class: "w-full",
  role: "presentation"
}, xd = /* @__PURE__ */ l("path", { d: "M240-120q-66 0-113-47T80-280q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm480 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm-480-80q33 0 56.5-23.5T320-280q0-33-23.5-56.5T240-360q-33 0-56.5 23.5T160-280q0 33 23.5 56.5T240-200Zm480 0q33 0 56.5-23.5T800-280q0-33-23.5-56.5T720-360q-33 0-56.5 23.5T640-280q0 33 23.5 56.5T720-200ZM480-520q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-680q0-33-23.5-56.5T480-760q-33 0-56.5 23.5T400-680q0 33 23.5 56.5T480-600Zm0-80Zm240 400Zm-480 0Z" }, null, -1), kd = [
  xd
], _d = /* @__PURE__ */ l("span", null, "Team", -1), Ed = {
  class: "w-full",
  role: "presentation"
}, Cd = /* @__PURE__ */ l("path", { d: "M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z" }, null, -1), Ad = [
  Cd
], Id = /* @__PURE__ */ l("span", null, "Agency", -1), Ld = {
  class: "w-full",
  role: "presentation"
}, Td = /* @__PURE__ */ l("path", { d: "M344-336 200-480l144-144 56 57-87 87 87 87-56 57Zm272 0-56-57 87-87-87-87 56-57 144 144-144 144ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" }, null, -1), Od = [
  Td
], Sd = /* @__PURE__ */ l("span", null, "Embed", -1), Pd = { class: "flex flex-col gap-1 items-end" }, Dd = { id: "plans-body" }, jd = { class: "bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch" }, zd = { class: "col-span-2 p-6 lg:p-8" }, Md = { id: "team-content" }, Hd = { class: "mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, Bd = /* @__PURE__ */ l("span", { class: "font-light text-3xl" }, "Great for teams to automate their internal workflows.", -1), Fd = { class: "grid gap-4 mt-4 lg:mt-6 sm:grid-cols-2 md:grid-cols-3 text-base justify-stretch" }, Rd = /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-4 text-xl" }, [
  /* @__PURE__ */ l("span", { class: "leading-tight font-bold" }, "Pro")
], -1), Nd = { class: "flex space-x-2.5 items-center" }, Vd = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), $d = [
  Vd
], Ud = /* @__PURE__ */ l("span", { class: "leading-tight" }, "1 project", -1), qd = { class: "flex space-x-2.5 items-center" }, Wd = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Kd = [
  Wd
], Yd = /* @__PURE__ */ l("span", { class: "leading-tight" }, "1 user included", -1), Gd = { class: "flex space-x-2.5 items-center" }, Xd = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), Zd = [
  Xd
], Jd = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Community support", -1), Qd = /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-4 text-xl" }, [
  /* @__PURE__ */ l("span", { class: "leading-tight font-bold" }, "Enterprise")
], -1), tp = { class: "flex space-x-2.5 items-center" }, ep = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), rp = [
  ep
], op = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Unlimited projects", -1), ip = { class: "flex space-x-2.5 items-center" }, ap = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), np = [
  ap
], sp = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Set projects limits", -1), lp = { class: "flex space-x-2.5 items-center" }, cp = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), dp = [
  cp
], pp = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Single Sign On", -1), gp = { class: "flex space-x-2.5 items-center" }, up = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), fp = [
  up
], hp = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Audit logs", -1), wp = { class: "flex space-x-2.5 items-center" }, vp = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), bp = [
  vp
], mp = /* @__PURE__ */ l("span", { class: "leading-tight" }, "Envs and Git sync", -1), yp = { class: "flex space-x-2.5 items-center" }, xp = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M1 5.917 5.724 10.5 15 1.5"
}, null, -1), kp = [
  xp
], _p = /* @__PURE__ */ l("span", { class: "leading-tight" }, "5 Private pieces", -1), Ep = /* @__PURE__ */ l("ul", {
  role: "list",
  class: "space-y-3 dark:text-white p-6"
}, [
  /* @__PURE__ */ l("li", { class: "flex space-x-1 items-center mb-4 text-md" }, [
    /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 font-normal dark:text-gray-400 text-base" }, "Always included:")
  ]),
  /* @__PURE__ */ l("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ l("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ l("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
  ]),
  /* @__PURE__ */ l("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ l("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ l("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
  ]),
  /* @__PURE__ */ l("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ l("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ l("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
  ]),
  /* @__PURE__ */ l("li", { class: "flex space-x-1 items-center" }, [
    /* @__PURE__ */ l("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "18",
      viewBox: "0 -960 960 960",
      width: "18"
    }, [
      /* @__PURE__ */ l("path", { d: "m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" })
    ]),
    /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
  ])
], -1), Cp = { class: "flex justify-start p-6 lg:p-8" }, Ap = {
  id: "team-plan",
  class: "w-full"
}, Ip = { key: 0 }, Lp = /* @__PURE__ */ l("div", { class: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white" }, "Pro plan", -1), Tp = /* @__PURE__ */ l("div", { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, "Free", -1), Op = { class: "mb-4 font-normal text-lg text-gray-500 dark:text-gray-400" }, Sp = {
  key: 0,
  href: "#",
  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
}, Pp = {
  key: 1,
  href: "#",
  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
}, Dp = { class: "text-md text-gray-500 dark:text-gray-400" }, jp = { class: "mb-2 flex flex-col content-start" }, zp = {
  key: 0,
  "data-popover-target": "popover-extra-tasks",
  "data-popover-placement": "left",
  class: "hover:text-gray-800"
}, Mp = /* @__PURE__ */ l("li", null, "$10 per extra user per month", -1), Hp = { key: 1 }, Bp = /* @__PURE__ */ l("div", { class: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white" }, "Enterprise plan", -1), Fp = /* @__PURE__ */ l("div", { class: "inline-flex flex-row gap-2 items-center" }, [
  /* @__PURE__ */ l("div", { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, "$99"),
  /* @__PURE__ */ l("div", { class: "text-gray-500 text-sm" }, [
    /* @__PURE__ */ Be("per user"),
    /* @__PURE__ */ l("br"),
    /* @__PURE__ */ Be("per month")
  ])
], -1), Rp = { class: "mb-4 font-normal text-lg text-gray-500 dark:text-gray-400" }, Np = /* @__PURE__ */ l("a", {
  href: "#",
  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
}, "Contact sales", -1), Vp = { class: "text-md text-gray-500 dark:text-gray-400" }, $p = { class: "mb-2 flex flex-col content-start" }, Up = {
  key: 0,
  "data-popover-target": "popover-extra-tasks",
  "data-popover-placement": "left",
  class: "hover:text-gray-800"
}, qp = { class: "bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch" }, Wp = { class: "col-span-2 p-6 lg:p-8" }, Kp = { id: "agency-content" }, Yp = /* @__PURE__ */ l("p", { class: "mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, [
  /* @__PURE__ */ l("span", { class: "font-light text-3xl" }, "Great for agencies who work with multiple clients.")
], -1), Gp = /* @__PURE__ */ l("div", { class: "grid grid-cols-3 gap-4 mt-4 lg:mt-6 text-base justify-stretch" }, [
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Branding")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom color and logo")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom domain")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Usage")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited projects")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "1 Private piece")
    ])
  ]),
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Management")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Manage multi projects")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Tasks limit per project")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Show/hide pieces")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Default projects language")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Debug client runs")
    ])
  ]),
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Everything")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Community support")
    ])
  ])
], -1), Xp = /* @__PURE__ */ l("hr", { class: "my-6" }, null, -1), Zp = /* @__PURE__ */ l("option", { value: "flexible" }, "Flexible usage", -1), Jp = ["value"], Qp = { class: "flex justify-start p-6 lg:p-8" }, tg = {
  id: "agency-plan",
  class: "w-full"
}, eg = /* @__PURE__ */ l("div", { class: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white" }, "Agency plan", -1), rg = {
  key: 0,
  class: "inline-flex flex-row gap-2 items-center"
}, og = /* @__PURE__ */ l("div", { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, "$35", -1), ig = /* @__PURE__ */ l("div", { class: "text-gray-500 text-sm" }, [
  /* @__PURE__ */ Be("per user"),
  /* @__PURE__ */ l("br"),
  /* @__PURE__ */ Be("per month")
], -1), ag = [
  og,
  ig
], ng = {
  key: 1,
  class: "inline-flex flex-row gap-2 items-center"
}, sg = { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, lg = /* @__PURE__ */ l("div", { class: "text-gray-500 text-sm" }, "per month", -1), cg = { class: "mb-4 font-normal text-lg text-gray-500 dark:text-gray-400" }, dg = /* @__PURE__ */ l("a", {
  href: "#",
  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
}, "Contact sales", -1), pg = { class: "text-md text-gray-500 dark:text-gray-400" }, gg = { class: "mb-2 flex flex-col content-start" }, ug = {
  key: 0,
  "data-popover-target": "popover-extra-tasks",
  "data-popover-placement": "left",
  class: "hover:text-gray-800"
}, fg = { class: "bg-white rounded-lg divide-y divide-gray-200 shadow border-gray-800 border dark:divide-gray-700 lg:divide-y-0 lg:divide-x lg:grid lg:grid-cols-3 dark:bg-gray-800 flex items-stretch" }, hg = { class: "col-span-2 p-6 lg:p-8" }, wg = { id: "embed-content" }, vg = /* @__PURE__ */ l("p", { class: "mb-2 text-lg font-normal text-gray-500 dark:text-gray-400" }, [
  /* @__PURE__ */ l("span", { class: "font-light text-3xl" }, "Great for SaaS to add in-app automation builder.")
], -1), bg = /* @__PURE__ */ l("div", { class: "grid grid-cols-3 gap-4 mt-4 lg:mt-6 text-base justify-stretch" }, [
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Embedding")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Javascript SDK")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "JWT Single Sign On")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Full API")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Customization")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom color and logo")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Whitelabel emails")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Custom templates")
    ])
  ]),
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Usage")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited projects")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "2 Private pieces")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight mt-[3px] text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Management")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Tasks limit per project")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Show/hide pieces")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Default projects language")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Debug client runs")
    ])
  ]),
  /* @__PURE__ */ l("ul", {
    role: "list",
    class: "space-y-3 dark:text-white h-full"
  }, [
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center mb-1 text-xl" }, [
      /* @__PURE__ */ l("span", { class: "leading-tight text-sm text-gray-800 dark:text-gray-400 font-bold" }, "Everything")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "All pieces")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flows")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited folders")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Unlimited flow steps")
    ]),
    /* @__PURE__ */ l("li", { class: "flex space-x-2.5 items-center" }, [
      /* @__PURE__ */ l("svg", {
        class: "flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 16 12"
      }, [
        /* @__PURE__ */ l("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M1 5.917 5.724 10.5 15 1.5"
        })
      ]),
      /* @__PURE__ */ l("span", { class: "leading-tight text-gray-500 dark:text-gray-400" }, "Email support")
    ])
  ])
], -1), mg = /* @__PURE__ */ l("hr", { class: "my-6" }, null, -1), yg = { class: "relative inline-flex items-center cursor-pointer" }, xg = /* @__PURE__ */ l("div", { class: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" }, null, -1), kg = /* @__PURE__ */ l("span", { class: "ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" }, [
  /* @__PURE__ */ Be("We're a startup younger than 2 years old with fewer than 15 employee "),
  /* @__PURE__ */ l("span", { class: "inline-block py-1 px-2 bg-sky-100 rounded-lg ms-1" }, "50% off")
], -1), _g = { class: "flex justify-start p-6 lg:p-8" }, Eg = {
  id: "embed-plan",
  class: "w-full"
}, Cg = /* @__PURE__ */ l("div", { class: "mb-4 text-2xl font-semibold text-gray-900 dark:text-white" }, "Embed plan", -1), Ag = { class: "inline-flex flex-row gap-2 items-center" }, Ig = { class: "mb-2 text-5xl font-bold text-gray-900 dark:text-white" }, Lg = /* @__PURE__ */ l("div", { class: "text-gray-500 text-sm" }, "per month", -1), Tg = { class: "mb-4 font-normal text-lg text-gray-500 dark:text-gray-400" }, Og = {
  href: "#",
  class: "flex justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-bue-200 dark:focus:ring-primary-900 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-4"
}, Sg = { class: "text-md text-gray-500 dark:text-gray-400" }, Pg = { class: "mb-2 flex flex-col content-start" }, Dg = {
  key: 0,
  "data-popover-target": "popover-extra-tasks",
  "data-popover-placement": "left",
  class: "hover:text-gray-800"
}, jg = /* @__PURE__ */ l("li", null, "$10 per extra user per month", -1), zg = /* @__PURE__ */ l("li", { class: "italic text-gray-400" }, "Quantity discounts available", -1), Te = "team", Ve = "agency", $e = "embed", Mg = {
  __name: "MainTable.ce",
  setup(t) {
    const e = ar("pro"), r = ar(!1);
    let o = ar("cloud"), i = ar(Te);
    const a = ar("flexible"), n = [
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
    ], s = (c) => {
      o.value = c;
    };
    return (c, d) => (rt(), ot("section", ud, [
      l("div", fd, [
        hd,
        l("div", wd, [
          l("div", vd, [
            bd,
            l("div", null, [
              l("ul", md, [
                l("li", yd, [
                  l("button", {
                    id: "team-tab",
                    onClick: d[0] || (d[0] = (g) => ut(i) ? i.value = Te : i = Te),
                    role: "tab",
                    type: "button",
                    class: et(["group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent", {
                      "!bg-transparent !border-teal-500 ": st(i) == Te
                    }])
                  }, [
                    l("div", {
                      class: et([{
                        "!text-transparent !bg-clip-text !bg-gradient-to-r !from-teal-400 !to-60% !to-emerald-400": st(i) == Te
                      }, "flex flex-row gap-1.5 items-center group-hover:text-gray-900"])
                    }, [
                      (rt(), ot("svg", {
                        class: et([{
                          "!fill-teal-400": st(i) == Te
                        }, "fill-gray-400 group-hover:fill-gray-900"]),
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 -960 960 960",
                        width: "24"
                      }, kd, 2)),
                      _d
                    ], 2)
                  ], 2)
                ]),
                l("li", Ed, [
                  l("button", {
                    id: "agency-tab",
                    class: et([{
                      "!bg-transparent !border-fuchsia-500": st(i) == Ve
                    }, "group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent"]),
                    onClick: d[1] || (d[1] = (g) => ut(i) ? i.value = Ve : i = Ve),
                    role: "tab",
                    type: "button"
                  }, [
                    l("div", {
                      class: et([
                        "flex flex-row gap-1.5 items-center group-hover:text-gray-900",
                        {
                          "!text-transparent !bg-clip-text !bg-gradient-to-r !from-fuchsia-400 !to-30% !to-pink-400": st(i) == Ve
                        }
                      ])
                    }, [
                      (rt(), ot("svg", {
                        class: et(["fill-gray-400 group-hover:fill-gray-900", {
                          "!fill-fuchsia-400": st(i) == Ve
                        }]),
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 -960 960 960",
                        width: "24"
                      }, Ad, 2)),
                      Id
                    ], 2)
                  ], 2)
                ]),
                l("li", Ld, [
                  l("button", {
                    class: et([{
                      "!bg-transparent !border-indigo-500 ": st(i) == $e
                    }, "group inline-block py-3 px-8 w-full text-2xl bg-transparent hover:bg-gray-100 hover:border-transparent rounded-full border-2 border-transparent"]),
                    onClick: d[2] || (d[2] = (g) => ut(i) ? i.value = $e : i = $e),
                    id: "embed-tab",
                    "data-tabs-target": "#embed-plan-tab-body",
                    role: "tab",
                    "aria-controls": "agency-plan-tab",
                    "aria-selected": "false",
                    type: "button"
                  }, [
                    l("div", {
                      class: et([{
                        "!text-transparent !bg-clip-text !bg-gradient-to-r !from-indigo-500 !to-40% !to-blue-400": st(i) == $e
                      }, "flex flex-row gap-1.5 items-center group-hover:text-gray-900"])
                    }, [
                      (rt(), ot("svg", {
                        class: et([{
                          "!fill-indigo-400": st(i) == $e
                        }, "fill-gray-400 group-hover:fill-gray-900"]),
                        xmlns: "http://www.w3.org/2000/svg",
                        height: "24",
                        viewBox: "0 -960 960 960",
                        width: "24"
                      }, Od, 2)),
                      Sd
                    ], 2)
                  ], 2)
                ])
              ])
            ])
          ]),
          l("div", Pd, [
            wt(dd, {
              "deployment-mode": st(o),
              onDeploymentModeChanged: s
            }, null, 8, ["deployment-mode"])
          ])
        ]),
        l("div", Dd, [
          l("div", {
            id: "team-plan-tab-body",
            class: et({ hidden: st(i) !== Te }),
            role: "tabpanel",
            "aria-labelledby": "team-plan-tab"
          }, [
            l("div", jd, [
              l("div", zd, [
                l("div", Md, [
                  l("p", Hd, [
                    Bd,
                    l("div", Fd, [
                      l("div", null, [
                        l("input", {
                          type: "radio",
                          id: "team-pro-plan",
                          name: "team-sub-plan",
                          value: "pro",
                          class: "hidden peer",
                          onChange: d[3] || (d[3] = () => e.value = "pro")
                        }, null, 32),
                        l("label", {
                          for: "team-pro-plan",
                          class: et(["block border p-6 cursor-pointer border-gray-300 h-full opacity-60 hover:opacity-100", { "!border-primary-400 !opacity-100": e.value == "pro" }])
                        }, [
                          l("ul", {
                            role: "list",
                            class: et(["space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400", { "!text-primary-500": e.value == "pro" }])
                          }, [
                            Rd,
                            l("li", Nd, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, $d, 2)),
                              Ud
                            ]),
                            l("li", qd, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Kd, 2)),
                              Yd
                            ]),
                            l("li", Gd, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "pro" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, Zd, 2)),
                              Jd
                            ])
                          ], 2)
                        ], 2)
                      ]),
                      l("div", null, [
                        l("input", {
                          type: "radio",
                          id: "team-enterprise-plan",
                          name: "team-sub-plan",
                          value: "enterprise",
                          class: "hidden peer",
                          onChange: d[4] || (d[4] = () => e.value = "enterprise")
                        }, null, 32),
                        l("label", {
                          for: "team-enterprise-plan",
                          class: et(["block border p-6 cursor-pointer border-gray-300 h-full opacity-60 hover:opacity-100", { "!border-primary-400 !opacity-100": e.value == "enterprise" }])
                        }, [
                          l("ul", {
                            role: "list",
                            class: et(["space-y-3 dark:text-white h-full text-gray-800 dark:text-gray-400", { "!text-primary-500": e.value == "enterprise" }])
                          }, [
                            Qd,
                            l("li", tp, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, rp, 2)),
                              op
                            ]),
                            l("li", ip, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, np, 2)),
                              sp
                            ]),
                            l("li", lp, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, dp, 2)),
                              pp
                            ]),
                            l("li", gp, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, fp, 2)),
                              hp
                            ]),
                            l("li", wp, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, bp, 2)),
                              mp
                            ]),
                            l("li", yp, [
                              (rt(), ot("svg", {
                                class: et(["flex-shrink-0 w-4 h-4 text-green-500 dark:text-green-400 stroke-green-500", { "!stroke-primary-500": e.value == "enterprise" }]),
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 16 12"
                              }, kp, 2)),
                              _p
                            ])
                          ], 2)
                        ], 2)
                      ]),
                      Ep
                    ])
                  ])
                ])
              ]),
              l("div", Cp, [
                l("div", Ap, [
                  e.value == "pro" ? (rt(), ot("div", Ip, [
                    Lp,
                    Tp,
                    l("div", Op, Ut(st(o) == "cloud" ? "1,000 monthly tasks" : "Unlimited tasks") + ", 1 user", 1),
                    st(o) == "cloud" ? (rt(), ot("a", Sp, "Start free")) : (rt(), ot("a", Pp, "View setup guide")),
                    l("div", Dp, [
                      l("ul", jp, [
                        st(o) == "cloud" ? (rt(), ot("li", zp, "$1 per extra 1,000 tasks")) : Ue("", !0),
                        Mp
                      ])
                    ])
                  ])) : e.value == "enterprise" ? (rt(), ot("div", Hp, [
                    Bp,
                    Fp,
                    l("div", Rp, Ut(st(o) == "cloud" ? "1,000 monthly tasks" : "Unlimited tasks"), 1),
                    Np,
                    l("div", Vp, [
                      l("ul", $p, [
                        st(o) == "cloud" ? (rt(), ot("li", Up, "$1 per extra 1,000 tasks")) : Ue("", !0)
                      ])
                    ])
                  ])) : Ue("", !0)
                ])
              ])
            ])
          ], 2),
          l("div", {
            id: "agency-plan-tab-body",
            class: et({ hidden: st(i) !== Ve }),
            role: "tabpanel",
            "aria-labelledby": "agency-plan-tab"
          }, [
            l("div", qp, [
              l("div", Wp, [
                l("div", Kp, [
                  Yp,
                  Gp,
                  Xp,
                  l("div", null, [
                    Be(" Committed user seats: "),
                    na(l("select", {
                      "onUpdate:modelValue": d[5] || (d[5] = (g) => a.value = g),
                      class: "ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }, [
                      Zp,
                      (rt(), ot(Ot, null, Rl(n, (g) => l("option", {
                        value: g.users
                      }, Ut(g.users) + " users (" + Ut(g.discount * 100) + "% off)", 9, Jp)), 64))
                    ], 512), [
                      [Qc, a.value]
                    ])
                  ])
                ])
              ]),
              l("div", Qp, [
                l("div", tg, [
                  eg,
                  a.value == "flexible" ? (rt(), ot("div", rg, ag)) : (rt(), ot("div", ng, [
                    l("div", sg, " $" + Ut(((1 - n.filter(
                      (g) => g.users == a.value
                    )[0].discount) * 35 * a.value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), 1),
                    lg
                  ])),
                  l("div", cg, Ut(st(o) === "cloud" ? "1,000 monthly tasks" : "Unlimited tasks") + Ut(a.value != "flexible" ? ", " + a.value + " users" : ""), 1),
                  dg,
                  l("div", pg, [
                    l("ul", gg, [
                      st(o) === "cloud" ? (rt(), ot("li", ug, "$1 per extra 1,000 tasks")) : Ue("", !0)
                    ])
                  ])
                ])
              ])
            ])
          ], 2),
          l("div", {
            class: et({ hidden: st(i) !== $e }),
            id: "embed-plan-tab-body",
            role: "tabpanel",
            "aria-labelledby": "embed-plan-tab"
          }, [
            l("div", fg, [
              l("div", hg, [
                l("div", wg, [
                  vg,
                  bg,
                  mg,
                  l("div", null, [
                    l("label", yg, [
                      na(l("input", {
                        type: "checkbox",
                        value: "",
                        class: "sr-only peer",
                        "onUpdate:modelValue": d[6] || (d[6] = (g) => r.value = g)
                      }, null, 512), [
                        [Jc, r.value]
                      ]),
                      xg,
                      kg
                    ])
                  ])
                ])
              ]),
              l("div", _g, [
                l("div", Eg, [
                  Cg,
                  l("div", Ag, [
                    l("div", Ig, "$" + Ut(r.value ? "600" : "1,200"), 1),
                    Lg
                  ]),
                  l("div", Tg, Ut(st(o) == "cloud" ? "1,000 monthly tasks" : "Unlimited tasks") + ", 25 users", 1),
                  l("a", Og, Ut(r.value ? "Apply now" : "Contact sales"), 1),
                  l("div", Sg, [
                    l("ul", Pg, [
                      st(o) == "cloud" ? (rt(), ot("li", Dg, "$1 per extra 1,000 tasks")) : Ue("", !0),
                      jg,
                      zg
                    ])
                  ])
                ])
              ])
            ])
          ], 2)
        ])
      ])
    ]));
  }
}, Hg = /* @__PURE__ */ gd(Mg, [["styles", [pd]]]);
var Bg = (
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
), Fg = (
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
), Y = new Fg();
typeof window < "u" && (window.FlowbiteInstances = Y);
var to = function() {
  return to = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, to.apply(this, arguments);
}, eo = {
  alwaysOpen: !1,
  activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
  inactiveClasses: "text-gray-500 dark:text-gray-400",
  onOpen: function() {
  },
  onClose: function() {
  },
  onToggle: function() {
  }
}, Rg = {
  id: null,
  override: !0
}, ts = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = eo), i === void 0 && (i = Rg), this._instanceId = i.id ? i.id : e.id, this._accordionEl = e, this._items = r, this._options = to(to({}, eo), o), this._initialized = !1, this.init(), Y.addInstance("Accordion", this, this._instanceId, i.override);
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
      var r, o, i = this, a = this.getItem(e);
      this._options.alwaysOpen || this._items.map(function(n) {
        var s, c;
        n !== a && ((s = n.triggerEl.classList).remove.apply(s, i._options.activeClasses.split(" ")), (c = n.triggerEl.classList).add.apply(c, i._options.inactiveClasses.split(" ")), n.targetEl.classList.add("hidden"), n.triggerEl.setAttribute("aria-expanded", "false"), n.active = !1, n.iconEl && n.iconEl.classList.remove("rotate-180"));
      }), (r = a.triggerEl.classList).add.apply(r, this._options.activeClasses.split(" ")), (o = a.triggerEl.classList).remove.apply(o, this._options.inactiveClasses.split(" ")), a.triggerEl.setAttribute("aria-expanded", "true"), a.targetEl.classList.remove("hidden"), a.active = !0, a.iconEl && a.iconEl.classList.add("rotate-180"), this._options.onOpen(this, a);
    }, t.prototype.toggle = function(e) {
      var r = this.getItem(e);
      r.active ? this.close(e) : this.open(e), this._options.onToggle(this, r);
    }, t.prototype.close = function(e) {
      var r, o, i = this.getItem(e);
      (r = i.triggerEl.classList).remove.apply(r, this._options.activeClasses.split(" ")), (o = i.triggerEl.classList).add.apply(o, this._options.inactiveClasses.split(" ")), i.targetEl.classList.add("hidden"), i.triggerEl.setAttribute("aria-expanded", "false"), i.active = !1, i.iconEl && i.iconEl.classList.remove("rotate-180"), this._options.onClose(this, i);
    }, t;
  }()
);
function Ai() {
  document.querySelectorAll("[data-accordion]").forEach(function(t) {
    var e = t.getAttribute("data-accordion"), r = t.getAttribute("data-active-classes"), o = t.getAttribute("data-inactive-classes"), i = [];
    t.querySelectorAll("[data-accordion-target]").forEach(function(a) {
      if (a.closest("[data-accordion]") === t) {
        var n = {
          id: a.getAttribute("data-accordion-target"),
          triggerEl: a,
          targetEl: document.querySelector(a.getAttribute("data-accordion-target")),
          iconEl: a.querySelector("[data-accordion-icon]"),
          active: a.getAttribute("aria-expanded") === "true"
        };
        i.push(n);
      }
    }), new ts(t, i, {
      alwaysOpen: e === "open",
      activeClasses: r || eo.activeClasses,
      inactiveClasses: o || eo.inactiveClasses
    });
  });
}
typeof window < "u" && (window.Accordion = ts, window.initAccordions = Ai);
var ro = function() {
  return ro = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ro.apply(this, arguments);
}, Ma = {
  onCollapse: function() {
  },
  onExpand: function() {
  },
  onToggle: function() {
  }
}, Ng = {
  id: null,
  override: !0
}, Jo = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = Ma), i === void 0 && (i = Ng), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = ro(ro({}, Ma), o), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Collapse", this, this._instanceId, i.override);
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
function Ii() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-collapse-toggle"), r = document.getElementById(e);
    r ? Y.instanceExists("Collapse", r.getAttribute("id")) ? new Jo(r, t, {}, {
      id: r.getAttribute("id") + "_" + Y._generateRandomId()
    }) : new Jo(r, t) : console.error('The target element with id "'.concat(e, '" does not exist. Please check the data-collapse-toggle attribute.'));
  });
}
typeof window < "u" && (window.Collapse = Jo, window.initCollapses = Ii);
var Pe = function() {
  return Pe = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Pe.apply(this, arguments);
}, qr = {
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
}, Vg = {
  id: null,
  override: !0
}, es = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = qr), i === void 0 && (i = Vg), this._instanceId = i.id ? i.id : e.id, this._carouselEl = e, this._items = r, this._options = Pe(Pe(Pe({}, qr), o), { indicators: Pe(Pe({}, qr.indicators), o.indicators) }), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._intervalDuration = this._options.interval, this._intervalInstance = null, this._initialized = !1, this.init(), Y.addInstance("Carousel", this, this._instanceId, i.override);
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
      var a = e.position;
      this._indicators.length && (this._indicators.map(function(n) {
        var s, c;
        n.el.setAttribute("aria-current", "false"), (s = n.el.classList).remove.apply(s, i._options.indicators.activeClasses.split(" ")), (c = n.el.classList).add.apply(c, i._options.indicators.inactiveClasses.split(" "));
      }), (r = this._indicators[a].el.classList).add.apply(r, this._options.indicators.activeClasses.split(" ")), (o = this._indicators[a].el.classList).remove.apply(o, this._options.indicators.inactiveClasses.split(" ")), this._indicators[a].el.setAttribute("aria-current", "true"));
    }, t;
  }()
);
function Li() {
  document.querySelectorAll("[data-carousel]").forEach(function(t) {
    var e = t.getAttribute("data-carousel-interval"), r = t.getAttribute("data-carousel") === "slide", o = [], i = 0;
    t.querySelectorAll("[data-carousel-item]").length && Array.from(t.querySelectorAll("[data-carousel-item]")).map(function(d, g) {
      o.push({
        position: g,
        el: d
      }), d.getAttribute("data-carousel-item") === "active" && (i = g);
    });
    var a = [];
    t.querySelectorAll("[data-carousel-slide-to]").length && Array.from(t.querySelectorAll("[data-carousel-slide-to]")).map(function(d) {
      a.push({
        position: parseInt(d.getAttribute("data-carousel-slide-to")),
        el: d
      });
    });
    var n = new es(t, o, {
      defaultPosition: i,
      indicators: {
        items: a
      },
      interval: e || qr.interval
    });
    r && n.cycle();
    var s = t.querySelector("[data-carousel-next]"), c = t.querySelector("[data-carousel-prev]");
    s && s.addEventListener("click", function() {
      n.next();
    }), c && c.addEventListener("click", function() {
      n.prev();
    });
  });
}
typeof window < "u" && (window.Carousel = es, window.initCarousels = Li);
var oo = function() {
  return oo = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, oo.apply(this, arguments);
}, Ha = {
  transition: "transition-opacity",
  duration: 300,
  timing: "ease-out",
  onHide: function() {
  }
}, $g = {
  id: null,
  override: !0
}, rs = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = Ha), i === void 0 && (i = $g), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = oo(oo({}, Ha), o), this._initialized = !1, this.init(), Y.addInstance("Dismiss", this, this._instanceId, i.override);
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
function Ti() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function(t) {
    var e = t.getAttribute("data-dismiss-target"), r = document.querySelector(e);
    r ? new rs(r, t) : console.error('The dismiss element with id "'.concat(e, '" does not exist. Please check the data-dismiss-target attribute.'));
  });
}
typeof window < "u" && (window.Dismiss = rs, window.initDismisses = Ti);
var kt = "top", Dt = "bottom", jt = "right", _t = "left", Oi = "auto", Ar = [kt, Dt, jt, _t], Je = "start", kr = "end", Ug = "clippingParents", os = "viewport", sr = "popper", qg = "reference", Ba = /* @__PURE__ */ Ar.reduce(function(t, e) {
  return t.concat([e + "-" + Je, e + "-" + kr]);
}, []), is = /* @__PURE__ */ [].concat(Ar, [Oi]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Je, e + "-" + kr]);
}, []), Wg = "beforeRead", Kg = "read", Yg = "afterRead", Gg = "beforeMain", Xg = "main", Zg = "afterMain", Jg = "beforeWrite", Qg = "write", tu = "afterWrite", eu = [Wg, Kg, Yg, Gg, Xg, Zg, Jg, Qg, tu];
function Gt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Lt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Fe(t) {
  var e = Lt(t).Element;
  return t instanceof e || t instanceof Element;
}
function Pt(t) {
  var e = Lt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Si(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Lt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ru(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var o = e.styles[r] || {}, i = e.attributes[r] || {}, a = e.elements[r];
    !Pt(a) || !Gt(a) || (Object.assign(a.style, o), Object.keys(i).forEach(function(n) {
      var s = i[n];
      s === !1 ? a.removeAttribute(n) : a.setAttribute(n, s === !0 ? "" : s);
    }));
  });
}
function ou(t) {
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
      var i = e.elements[o], a = e.attributes[o] || {}, n = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), s = n.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Pt(i) || !Gt(i) || (Object.assign(i.style, s), Object.keys(a).forEach(function(c) {
        i.removeAttribute(c);
      }));
    });
  };
}
const iu = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ru,
  effect: ou,
  requires: ["computeStyles"]
};
function Yt(t) {
  return t.split("-")[0];
}
var He = Math.max, io = Math.min, Qe = Math.round;
function Qo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function as() {
  return !/^((?!chrome|android).)*safari/i.test(Qo());
}
function tr(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var o = t.getBoundingClientRect(), i = 1, a = 1;
  e && Pt(t) && (i = t.offsetWidth > 0 && Qe(o.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Qe(o.height) / t.offsetHeight || 1);
  var n = Fe(t) ? Lt(t) : window, s = n.visualViewport, c = !as() && r, d = (o.left + (c && s ? s.offsetLeft : 0)) / i, g = (o.top + (c && s ? s.offsetTop : 0)) / a, h = o.width / i, w = o.height / a;
  return {
    width: h,
    height: w,
    top: g,
    right: d + h,
    bottom: g + w,
    left: d,
    x: d,
    y: g
  };
}
function Pi(t) {
  var e = tr(t), r = t.offsetWidth, o = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: o
  };
}
function ns(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && Si(r)) {
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
  return Lt(t).getComputedStyle(t);
}
function au(t) {
  return ["table", "td", "th"].indexOf(Gt(t)) >= 0;
}
function ke(t) {
  return ((Fe(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Eo(t) {
  return Gt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Si(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ke(t)
  );
}
function Fa(t) {
  return !Pt(t) || // https://github.com/popperjs/popper-core/issues/837
  ee(t).position === "fixed" ? null : t.offsetParent;
}
function nu(t) {
  var e = /firefox/i.test(Qo()), r = /Trident/i.test(Qo());
  if (r && Pt(t)) {
    var o = ee(t);
    if (o.position === "fixed")
      return null;
  }
  var i = Eo(t);
  for (Si(i) && (i = i.host); Pt(i) && ["html", "body"].indexOf(Gt(i)) < 0; ) {
    var a = ee(i);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Ir(t) {
  for (var e = Lt(t), r = Fa(t); r && au(r) && ee(r).position === "static"; )
    r = Fa(r);
  return r && (Gt(r) === "html" || Gt(r) === "body" && ee(r).position === "static") ? e : r || nu(t) || e;
}
function Di(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ur(t, e, r) {
  return He(t, io(e, r));
}
function su(t, e, r) {
  var o = ur(t, e, r);
  return o > r ? r : o;
}
function ss() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ls(t) {
  return Object.assign({}, ss(), t);
}
function cs(t, e) {
  return e.reduce(function(r, o) {
    return r[o] = t, r;
  }, {});
}
var lu = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, ls(typeof e != "number" ? e : cs(e, Ar));
};
function cu(t) {
  var e, r = t.state, o = t.name, i = t.options, a = r.elements.arrow, n = r.modifiersData.popperOffsets, s = Yt(r.placement), c = Di(s), d = [_t, jt].indexOf(s) >= 0, g = d ? "height" : "width";
  if (!(!a || !n)) {
    var h = lu(i.padding, r), w = Pi(a), y = c === "y" ? kt : _t, P = c === "y" ? Dt : jt, E = r.rects.reference[g] + r.rects.reference[c] - n[c] - r.rects.popper[g], T = n[c] - r.rects.reference[c], H = Ir(a), U = H ? c === "y" ? H.clientHeight || 0 : H.clientWidth || 0 : 0, j = E / 2 - T / 2, O = h[y], B = U - w[g] - h[P], I = U / 2 - w[g] / 2 + j, $ = ur(O, I, B), S = c;
    r.modifiersData[o] = (e = {}, e[S] = $, e.centerOffset = $ - I, e);
  }
}
function du(t) {
  var e = t.state, r = t.options, o = r.element, i = o === void 0 ? "[data-popper-arrow]" : o;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || ns(e.elements.popper, i) && (e.elements.arrow = i));
}
const pu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: cu,
  effect: du,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function er(t) {
  return t.split("-")[1];
}
var gu = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function uu(t, e) {
  var r = t.x, o = t.y, i = e.devicePixelRatio || 1;
  return {
    x: Qe(r * i) / i || 0,
    y: Qe(o * i) / i || 0
  };
}
function Ra(t) {
  var e, r = t.popper, o = t.popperRect, i = t.placement, a = t.variation, n = t.offsets, s = t.position, c = t.gpuAcceleration, d = t.adaptive, g = t.roundOffsets, h = t.isFixed, w = n.x, y = w === void 0 ? 0 : w, P = n.y, E = P === void 0 ? 0 : P, T = typeof g == "function" ? g({
    x: y,
    y: E
  }) : {
    x: y,
    y: E
  };
  y = T.x, E = T.y;
  var H = n.hasOwnProperty("x"), U = n.hasOwnProperty("y"), j = _t, O = kt, B = window;
  if (d) {
    var I = Ir(r), $ = "clientHeight", S = "clientWidth";
    if (I === Lt(r) && (I = ke(r), ee(I).position !== "static" && s === "absolute" && ($ = "scrollHeight", S = "scrollWidth")), I = I, i === kt || (i === _t || i === jt) && a === kr) {
      O = Dt;
      var V = h && I === B && B.visualViewport ? B.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        I[$]
      );
      E -= V - o.height, E *= c ? 1 : -1;
    }
    if (i === _t || (i === kt || i === Dt) && a === kr) {
      j = jt;
      var R = h && I === B && B.visualViewport ? B.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[S]
      );
      y -= R - o.width, y *= c ? 1 : -1;
    }
  }
  var X = Object.assign({
    position: s
  }, d && gu), L = g === !0 ? uu({
    x: y,
    y: E
  }, Lt(r)) : {
    x: y,
    y: E
  };
  if (y = L.x, E = L.y, c) {
    var q;
    return Object.assign({}, X, (q = {}, q[O] = U ? "0" : "", q[j] = H ? "0" : "", q.transform = (B.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + E + "px)" : "translate3d(" + y + "px, " + E + "px, 0)", q));
  }
  return Object.assign({}, X, (e = {}, e[O] = U ? E + "px" : "", e[j] = H ? y + "px" : "", e.transform = "", e));
}
function fu(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, i = o === void 0 ? !0 : o, a = r.adaptive, n = a === void 0 ? !0 : a, s = r.roundOffsets, c = s === void 0 ? !0 : s, d = {
    placement: Yt(e.placement),
    variation: er(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ra(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: n,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ra(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const hu = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: fu,
  data: {}
};
var zr = {
  passive: !0
};
function wu(t) {
  var e = t.state, r = t.instance, o = t.options, i = o.scroll, a = i === void 0 ? !0 : i, n = o.resize, s = n === void 0 ? !0 : n, c = Lt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(g) {
    g.addEventListener("scroll", r.update, zr);
  }), s && c.addEventListener("resize", r.update, zr), function() {
    a && d.forEach(function(g) {
      g.removeEventListener("scroll", r.update, zr);
    }), s && c.removeEventListener("resize", r.update, zr);
  };
}
const vu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: wu,
  data: {}
};
var bu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Wr(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return bu[e];
  });
}
var mu = {
  start: "end",
  end: "start"
};
function Na(t) {
  return t.replace(/start|end/g, function(e) {
    return mu[e];
  });
}
function ji(t) {
  var e = Lt(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function zi(t) {
  return tr(ke(t)).left + ji(t).scrollLeft;
}
function yu(t, e) {
  var r = Lt(t), o = ke(t), i = r.visualViewport, a = o.clientWidth, n = o.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, n = i.height;
    var d = as();
    (d || !d && e === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: n,
    x: s + zi(t),
    y: c
  };
}
function xu(t) {
  var e, r = ke(t), o = ji(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, a = He(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), n = He(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), s = -o.scrollLeft + zi(t), c = -o.scrollTop;
  return ee(i || r).direction === "rtl" && (s += He(r.clientWidth, i ? i.clientWidth : 0) - a), {
    width: a,
    height: n,
    x: s,
    y: c
  };
}
function Mi(t) {
  var e = ee(t), r = e.overflow, o = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + o);
}
function ds(t) {
  return ["html", "body", "#document"].indexOf(Gt(t)) >= 0 ? t.ownerDocument.body : Pt(t) && Mi(t) ? t : ds(Eo(t));
}
function fr(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ds(t), i = o === ((r = t.ownerDocument) == null ? void 0 : r.body), a = Lt(o), n = i ? [a].concat(a.visualViewport || [], Mi(o) ? o : []) : o, s = e.concat(n);
  return i ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(fr(Eo(n)))
  );
}
function ti(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function ku(t, e) {
  var r = tr(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Va(t, e, r) {
  return e === os ? ti(yu(t, r)) : Fe(e) ? ku(e, r) : ti(xu(ke(t)));
}
function _u(t) {
  var e = fr(Eo(t)), r = ["absolute", "fixed"].indexOf(ee(t).position) >= 0, o = r && Pt(t) ? Ir(t) : t;
  return Fe(o) ? e.filter(function(i) {
    return Fe(i) && ns(i, o) && Gt(i) !== "body";
  }) : [];
}
function Eu(t, e, r, o) {
  var i = e === "clippingParents" ? _u(t) : [].concat(e), a = [].concat(i, [r]), n = a[0], s = a.reduce(function(c, d) {
    var g = Va(t, d, o);
    return c.top = He(g.top, c.top), c.right = io(g.right, c.right), c.bottom = io(g.bottom, c.bottom), c.left = He(g.left, c.left), c;
  }, Va(t, n, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ps(t) {
  var e = t.reference, r = t.element, o = t.placement, i = o ? Yt(o) : null, a = o ? er(o) : null, n = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, c;
  switch (i) {
    case kt:
      c = {
        x: n,
        y: e.y - r.height
      };
      break;
    case Dt:
      c = {
        x: n,
        y: e.y + e.height
      };
      break;
    case jt:
      c = {
        x: e.x + e.width,
        y: s
      };
      break;
    case _t:
      c = {
        x: e.x - r.width,
        y: s
      };
      break;
    default:
      c = {
        x: e.x,
        y: e.y
      };
  }
  var d = i ? Di(i) : null;
  if (d != null) {
    var g = d === "y" ? "height" : "width";
    switch (a) {
      case Je:
        c[d] = c[d] - (e[g] / 2 - r[g] / 2);
        break;
      case kr:
        c[d] = c[d] + (e[g] / 2 - r[g] / 2);
        break;
    }
  }
  return c;
}
function _r(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, i = o === void 0 ? t.placement : o, a = r.strategy, n = a === void 0 ? t.strategy : a, s = r.boundary, c = s === void 0 ? Ug : s, d = r.rootBoundary, g = d === void 0 ? os : d, h = r.elementContext, w = h === void 0 ? sr : h, y = r.altBoundary, P = y === void 0 ? !1 : y, E = r.padding, T = E === void 0 ? 0 : E, H = ls(typeof T != "number" ? T : cs(T, Ar)), U = w === sr ? qg : sr, j = t.rects.popper, O = t.elements[P ? U : w], B = Eu(Fe(O) ? O : O.contextElement || ke(t.elements.popper), c, g, n), I = tr(t.elements.reference), $ = ps({
    reference: I,
    element: j,
    strategy: "absolute",
    placement: i
  }), S = ti(Object.assign({}, j, $)), V = w === sr ? S : I, R = {
    top: B.top - V.top + H.top,
    bottom: V.bottom - B.bottom + H.bottom,
    left: B.left - V.left + H.left,
    right: V.right - B.right + H.right
  }, X = t.modifiersData.offset;
  if (w === sr && X) {
    var L = X[i];
    Object.keys(R).forEach(function(q) {
      var lt = [jt, Dt].indexOf(q) >= 0 ? 1 : -1, Ct = [kt, Dt].indexOf(q) >= 0 ? "y" : "x";
      R[q] += L[Ct] * lt;
    });
  }
  return R;
}
function Cu(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, i = r.boundary, a = r.rootBoundary, n = r.padding, s = r.flipVariations, c = r.allowedAutoPlacements, d = c === void 0 ? is : c, g = er(o), h = g ? s ? Ba : Ba.filter(function(P) {
    return er(P) === g;
  }) : Ar, w = h.filter(function(P) {
    return d.indexOf(P) >= 0;
  });
  w.length === 0 && (w = h);
  var y = w.reduce(function(P, E) {
    return P[E] = _r(t, {
      placement: E,
      boundary: i,
      rootBoundary: a,
      padding: n
    })[Yt(E)], P;
  }, {});
  return Object.keys(y).sort(function(P, E) {
    return y[P] - y[E];
  });
}
function Au(t) {
  if (Yt(t) === Oi)
    return [];
  var e = Wr(t);
  return [Na(t), e, Na(e)];
}
function Iu(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var i = r.mainAxis, a = i === void 0 ? !0 : i, n = r.altAxis, s = n === void 0 ? !0 : n, c = r.fallbackPlacements, d = r.padding, g = r.boundary, h = r.rootBoundary, w = r.altBoundary, y = r.flipVariations, P = y === void 0 ? !0 : y, E = r.allowedAutoPlacements, T = e.options.placement, H = Yt(T), U = H === T, j = c || (U || !P ? [Wr(T)] : Au(T)), O = [T].concat(j).reduce(function(oe, Vt) {
      return oe.concat(Yt(Vt) === Oi ? Cu(e, {
        placement: Vt,
        boundary: g,
        rootBoundary: h,
        padding: d,
        flipVariations: P,
        allowedAutoPlacements: E
      }) : Vt);
    }, []), B = e.rects.reference, I = e.rects.popper, $ = /* @__PURE__ */ new Map(), S = !0, V = O[0], R = 0; R < O.length; R++) {
      var X = O[R], L = Yt(X), q = er(X) === Je, lt = [kt, Dt].indexOf(L) >= 0, Ct = lt ? "width" : "height", J = _r(e, {
        placement: X,
        boundary: g,
        rootBoundary: h,
        altBoundary: w,
        padding: d
      }), K = lt ? q ? jt : _t : q ? Dt : kt;
      B[Ct] > I[Ct] && (K = Wr(K));
      var Q = Wr(K), vt = [];
      if (a && vt.push(J[L] <= 0), s && vt.push(J[K] <= 0, J[Q] <= 0), vt.every(function(oe) {
        return oe;
      })) {
        V = X, S = !1;
        break;
      }
      $.set(X, vt);
    }
    if (S)
      for (var Xt = P ? 3 : 1, zt = function(Vt) {
        var bt = O.find(function(Zt) {
          var Mt = $.get(Zt);
          if (Mt)
            return Mt.slice(0, Vt).every(function(Re) {
              return Re;
            });
        });
        if (bt)
          return V = bt, "break";
      }, ft = Xt; ft > 0; ft--) {
        var _e = zt(ft);
        if (_e === "break")
          break;
      }
    e.placement !== V && (e.modifiersData[o]._skip = !0, e.placement = V, e.reset = !0);
  }
}
const Lu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Iu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function $a(t, e, r) {
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
function Ua(t) {
  return [kt, jt, Dt, _t].some(function(e) {
    return t[e] >= 0;
  });
}
function Tu(t) {
  var e = t.state, r = t.name, o = e.rects.reference, i = e.rects.popper, a = e.modifiersData.preventOverflow, n = _r(e, {
    elementContext: "reference"
  }), s = _r(e, {
    altBoundary: !0
  }), c = $a(n, o), d = $a(s, i, a), g = Ua(c), h = Ua(d);
  e.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: g,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": g,
    "data-popper-escaped": h
  });
}
const Ou = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Tu
};
function Su(t, e, r) {
  var o = Yt(t), i = [_t, kt].indexOf(o) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, n = a[0], s = a[1];
  return n = n || 0, s = (s || 0) * i, [_t, jt].indexOf(o) >= 0 ? {
    x: s,
    y: n
  } : {
    x: n,
    y: s
  };
}
function Pu(t) {
  var e = t.state, r = t.options, o = t.name, i = r.offset, a = i === void 0 ? [0, 0] : i, n = is.reduce(function(g, h) {
    return g[h] = Su(h, e.rects, a), g;
  }, {}), s = n[e.placement], c = s.x, d = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[o] = n;
}
const Du = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Pu
};
function ju(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ps({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const zu = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ju,
  data: {}
};
function Mu(t) {
  return t === "x" ? "y" : "x";
}
function Hu(t) {
  var e = t.state, r = t.options, o = t.name, i = r.mainAxis, a = i === void 0 ? !0 : i, n = r.altAxis, s = n === void 0 ? !1 : n, c = r.boundary, d = r.rootBoundary, g = r.altBoundary, h = r.padding, w = r.tether, y = w === void 0 ? !0 : w, P = r.tetherOffset, E = P === void 0 ? 0 : P, T = _r(e, {
    boundary: c,
    rootBoundary: d,
    padding: h,
    altBoundary: g
  }), H = Yt(e.placement), U = er(e.placement), j = !U, O = Di(H), B = Mu(O), I = e.modifiersData.popperOffsets, $ = e.rects.reference, S = e.rects.popper, V = typeof E == "function" ? E(Object.assign({}, e.rects, {
    placement: e.placement
  })) : E, R = typeof V == "number" ? {
    mainAxis: V,
    altAxis: V
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, V), X = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, L = {
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
      var q, lt = O === "y" ? kt : _t, Ct = O === "y" ? Dt : jt, J = O === "y" ? "height" : "width", K = I[O], Q = K + T[lt], vt = K - T[Ct], Xt = y ? -S[J] / 2 : 0, zt = U === Je ? $[J] : S[J], ft = U === Je ? -S[J] : -$[J], _e = e.elements.arrow, oe = y && _e ? Pi(_e) : {
        width: 0,
        height: 0
      }, Vt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : ss(), bt = Vt[lt], Zt = Vt[Ct], Mt = ur(0, $[J], oe[J]), Re = j ? $[J] / 2 - Xt - Mt - bt - R.mainAxis : zt - Mt - bt - R.mainAxis, ie = j ? -$[J] / 2 + Xt + Mt + Zt + R.mainAxis : ft + Mt + Zt + R.mainAxis, Ee = e.elements.arrow && Ir(e.elements.arrow), or = Ee ? O === "y" ? Ee.clientTop || 0 : Ee.clientLeft || 0 : 0, p = (q = X == null ? void 0 : X[O]) != null ? q : 0, u = K + Re - p - or, f = K + ie - p, v = ur(y ? io(Q, u) : Q, K, y ? He(vt, f) : vt);
      I[O] = v, L[O] = v - K;
    }
    if (s) {
      var b, k = O === "x" ? kt : _t, C = O === "x" ? Dt : jt, x = I[B], _ = B === "y" ? "height" : "width", m = x + T[k], A = x - T[C], z = [kt, _t].indexOf(H) !== -1, D = (b = X == null ? void 0 : X[B]) != null ? b : 0, F = z ? m : x - $[_] - S[_] - D + R.altAxis, W = z ? x + $[_] + S[_] - D - R.altAxis : A, tt = y && z ? su(F, x, W) : ur(y ? F : m, x, y ? W : A);
      I[B] = tt, L[B] = tt - x;
    }
    e.modifiersData[o] = L;
  }
}
const Bu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Hu,
  requiresIfExists: ["offset"]
};
function Fu(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Ru(t) {
  return t === Lt(t) || !Pt(t) ? ji(t) : Fu(t);
}
function Nu(t) {
  var e = t.getBoundingClientRect(), r = Qe(e.width) / t.offsetWidth || 1, o = Qe(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function Vu(t, e, r) {
  r === void 0 && (r = !1);
  var o = Pt(e), i = Pt(e) && Nu(e), a = ke(e), n = tr(t, i, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((Gt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Mi(a)) && (s = Ru(e)), Pt(e) ? (c = tr(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = zi(a))), {
    x: n.left + s.scrollLeft - c.x,
    y: n.top + s.scrollTop - c.y,
    width: n.width,
    height: n.height
  };
}
function $u(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function i(a) {
    r.add(a.name);
    var n = [].concat(a.requires || [], a.requiresIfExists || []);
    n.forEach(function(s) {
      if (!r.has(s)) {
        var c = e.get(s);
        c && i(c);
      }
    }), o.push(a);
  }
  return t.forEach(function(a) {
    r.has(a.name) || i(a);
  }), o;
}
function Uu(t) {
  var e = $u(t);
  return eu.reduce(function(r, o) {
    return r.concat(e.filter(function(i) {
      return i.phase === o;
    }));
  }, []);
}
function qu(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function Wu(t) {
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
var qa = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Wa() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Ku(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, i = e.defaultOptions, a = i === void 0 ? qa : i;
  return function(s, c, d) {
    d === void 0 && (d = a);
    var g = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, qa, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], w = !1, y = {
      state: g,
      setOptions: function(H) {
        var U = typeof H == "function" ? H(g.options) : H;
        E(), g.options = Object.assign({}, a, g.options, U), g.scrollParents = {
          reference: Fe(s) ? fr(s) : s.contextElement ? fr(s.contextElement) : [],
          popper: fr(c)
        };
        var j = Uu(Wu([].concat(o, g.options.modifiers)));
        return g.orderedModifiers = j.filter(function(O) {
          return O.enabled;
        }), P(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var H = g.elements, U = H.reference, j = H.popper;
          if (Wa(U, j)) {
            g.rects = {
              reference: Vu(U, Ir(j), g.options.strategy === "fixed"),
              popper: Pi(j)
            }, g.reset = !1, g.placement = g.options.placement, g.orderedModifiers.forEach(function(R) {
              return g.modifiersData[R.name] = Object.assign({}, R.data);
            });
            for (var O = 0; O < g.orderedModifiers.length; O++) {
              if (g.reset === !0) {
                g.reset = !1, O = -1;
                continue;
              }
              var B = g.orderedModifiers[O], I = B.fn, $ = B.options, S = $ === void 0 ? {} : $, V = B.name;
              typeof I == "function" && (g = I({
                state: g,
                options: S,
                name: V,
                instance: y
              }) || g);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: qu(function() {
        return new Promise(function(T) {
          y.forceUpdate(), T(g);
        });
      }),
      destroy: function() {
        E(), w = !0;
      }
    };
    if (!Wa(s, c))
      return y;
    y.setOptions(d).then(function(T) {
      !w && d.onFirstUpdate && d.onFirstUpdate(T);
    });
    function P() {
      g.orderedModifiers.forEach(function(T) {
        var H = T.name, U = T.options, j = U === void 0 ? {} : U, O = T.effect;
        if (typeof O == "function") {
          var B = O({
            state: g,
            name: H,
            instance: y,
            options: j
          }), I = function() {
          };
          h.push(B || I);
        }
      });
    }
    function E() {
      h.forEach(function(T) {
        return T();
      }), h = [];
    }
    return y;
  };
}
var Yu = [vu, zu, hu, iu, Du, Lu, Bu, pu, Ou], Hi = /* @__PURE__ */ Ku({
  defaultModifiers: Yu
}), ge = function() {
  return ge = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ge.apply(this, arguments);
}, Mr = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, a; o < i; o++)
      (a || !(o in e)) && (a || (a = Array.prototype.slice.call(e, 0, o)), a[o] = e[o]);
  return t.concat(a || Array.prototype.slice.call(e));
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
}, Gu = {
  id: null,
  override: !0
}, gs = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = ue), i === void 0 && (i = Gu), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = ge(ge({}, ue), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Dropdown", this, this._instanceId, i.override);
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
      return Hi(this._triggerEl, this._targetEl, {
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
      var o = e.target, i = this._options.ignoreClickOutsideClass, a = !1;
      if (i) {
        var n = document.querySelectorAll(".".concat(i));
        n.forEach(function(s) {
          if (s.contains(o)) {
            a = !0;
            return;
          }
        });
      }
      o !== r && !r.contains(o) && !this._triggerEl.contains(o) && !a && this.isVisible() && this.hide();
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
        return ge(ge({}, e), { modifiers: Mr(Mr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions(function(e) {
        return ge(ge({}, e), { modifiers: Mr(Mr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._visible = !1, this._removeClickOutsideListener(), this._options.onHide(this);
    }, t;
  }()
);
function Bi() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-dropdown-toggle"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-dropdown-placement"), i = t.getAttribute("data-dropdown-offset-skidding"), a = t.getAttribute("data-dropdown-offset-distance"), n = t.getAttribute("data-dropdown-trigger"), s = t.getAttribute("data-dropdown-delay"), c = t.getAttribute("data-dropdown-ignore-click-outside-class");
      new gs(r, t, {
        placement: o || ue.placement,
        triggerType: n || ue.triggerType,
        offsetSkidding: i ? parseInt(i) : ue.offsetSkidding,
        offsetDistance: a ? parseInt(a) : ue.offsetDistance,
        delay: s ? parseInt(s) : ue.delay,
        ignoreClickOutsideClass: c || ue.ignoreClickOutsideClass
      });
    } else
      console.error('The dropdown element with id "'.concat(e, '" does not exist. Please check the data-dropdown-toggle attribute.'));
  });
}
typeof window < "u" && (window.Dropdown = gs, window.initDropdowns = Bi);
var ao = function() {
  return ao = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, ao.apply(this, arguments);
}, no = {
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
}, Xu = {
  id: null,
  override: !0
}, us = (
  /** @class */
  function() {
    function t(e, r, o) {
      e === void 0 && (e = null), r === void 0 && (r = no), o === void 0 && (o = Xu), this._eventListenerInstances = [], this._instanceId = o.id ? o.id : e.id, this._targetEl = e, this._options = ao(ao({}, no), r), this._isHidden = !0, this._backdropEl = null, this._initialized = !1, this.init(), Y.addInstance("Modal", this, this._instanceId, o.override);
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
function Fi() {
  document.querySelectorAll("[data-modal-target]").forEach(function(t) {
    var e = t.getAttribute("data-modal-target"), r = document.getElementById(e);
    if (r) {
      var o = r.getAttribute("data-modal-placement"), i = r.getAttribute("data-modal-backdrop");
      new us(r, {
        placement: o || no.placement,
        backdrop: i || no.backdrop
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
typeof window < "u" && (window.Modal = us, window.initModals = Fi);
var so = function() {
  return so = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, so.apply(this, arguments);
}, De = {
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
}, Zu = {
  id: null,
  override: !0
}, fs = (
  /** @class */
  function() {
    function t(e, r, o) {
      e === void 0 && (e = null), r === void 0 && (r = De), o === void 0 && (o = Zu), this._eventListenerInstances = [], this._instanceId = o.id ? o.id : e.id, this._targetEl = e, this._options = so(so({}, De), r), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Drawer", this, this._instanceId, o.override);
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
function Ri() {
  document.querySelectorAll("[data-drawer-target]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-drawer-placement"), i = t.getAttribute("data-drawer-body-scrolling"), a = t.getAttribute("data-drawer-backdrop"), n = t.getAttribute("data-drawer-edge"), s = t.getAttribute("data-drawer-edge-offset");
      new fs(r, {
        placement: o || De.placement,
        bodyScrolling: i ? i === "true" : De.bodyScrolling,
        backdrop: a ? a === "true" : De.backdrop,
        edge: n ? n === "true" : De.edge,
        edgeOffset: s || De.edgeOffset
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
typeof window < "u" && (window.Drawer = fs, window.initDrawers = Ri);
var lo = function() {
  return lo = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, lo.apply(this, arguments);
}, Ka = {
  defaultTabId: null,
  activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
  inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  onShow: function() {
  }
}, Ju = {
  id: null,
  override: !0
}, hs = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = []), o === void 0 && (o = Ka), i === void 0 && (i = Ju), this._instanceId = i.id ? i.id : e.id, this._tabsEl = e, this._items = r, this._activeTab = o ? this.getTab(o.defaultTabId) : null, this._options = lo(lo({}, Ka), o), this._initialized = !1, this.init(), Y.addInstance("Tabs", this, this._tabsEl.id, !0), Y.addInstance("Tabs", this, this._instanceId, i.override);
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
      var o, i, a = this;
      r === void 0 && (r = !1);
      var n = this.getTab(e);
      n === this._activeTab && !r || (this._items.map(function(s) {
        var c, d;
        s !== n && ((c = s.triggerEl.classList).remove.apply(c, a._options.activeClasses.split(" ")), (d = s.triggerEl.classList).add.apply(d, a._options.inactiveClasses.split(" ")), s.targetEl.classList.add("hidden"), s.triggerEl.setAttribute("aria-selected", "false"));
      }), (o = n.triggerEl.classList).add.apply(o, this._options.activeClasses.split(" ")), (i = n.triggerEl.classList).remove.apply(i, this._options.inactiveClasses.split(" ")), n.triggerEl.setAttribute("aria-selected", "true"), n.targetEl.classList.remove("hidden"), this.setActiveTab(n), this._options.onShow(this, n));
    }, t;
  }()
);
function Ni() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function(t) {
    var e = [], r = null;
    t.querySelectorAll('[role="tab"]').forEach(function(o) {
      var i = o.getAttribute("aria-selected") === "true", a = {
        id: o.getAttribute("data-tabs-target"),
        triggerEl: o,
        targetEl: document.querySelector(o.getAttribute("data-tabs-target"))
      };
      e.push(a), i && (r = a.id);
    }), new hs(t, e, {
      defaultTabId: r
    });
  });
}
typeof window < "u" && (window.Tabs = hs, window.initTabs = Ni);
var fe = function() {
  return fe = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, fe.apply(this, arguments);
}, Hr = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, a; o < i; o++)
      (a || !(o in e)) && (a || (a = Array.prototype.slice.call(e, 0, o)), a[o] = e[o]);
  return t.concat(a || Array.prototype.slice.call(e));
}, co = {
  placement: "top",
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, Qu = {
  id: null,
  override: !0
}, ws = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = co), i === void 0 && (i = Qu), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = fe(fe({}, co), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Tooltip", this, this._instanceId, i.override);
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
      return Hi(this._triggerEl, this._targetEl, {
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
        return fe(fe({}, e), { modifiers: Hr(Hr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(e) {
        return fe(fe({}, e), { modifiers: Hr(Hr([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, t;
  }()
);
function Vi() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function(t) {
    var e = t.getAttribute("data-tooltip-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-tooltip-trigger"), i = t.getAttribute("data-tooltip-placement");
      new ws(r, t, {
        placement: i || co.placement,
        triggerType: o || co.triggerType
      });
    } else
      console.error('The tooltip element with id "'.concat(e, '" does not exist. Please check the data-tooltip-target attribute.'));
  });
}
typeof window < "u" && (window.Tooltip = ws, window.initTooltips = Vi);
var he = function() {
  return he = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, he.apply(this, arguments);
}, Br = function(t, e, r) {
  if (r || arguments.length === 2)
    for (var o = 0, i = e.length, a; o < i; o++)
      (a || !(o in e)) && (a || (a = Array.prototype.slice.call(e, 0, o)), a[o] = e[o]);
  return t.concat(a || Array.prototype.slice.call(e));
}, hr = {
  placement: "top",
  offset: 10,
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, tf = {
  id: null,
  override: !0
}, vs = (
  /** @class */
  function() {
    function t(e, r, o, i) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = hr), i === void 0 && (i = tf), this._instanceId = i.id ? i.id : e.id, this._targetEl = e, this._triggerEl = r, this._options = he(he({}, hr), o), this._popperInstance = null, this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Popover", this, i.id ? i.id : this._targetEl.id, i.override);
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
      return Hi(this._triggerEl, this._targetEl, {
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
        return he(he({}, e), { modifiers: Br(Br([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, t.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(e) {
        return he(he({}, e), { modifiers: Br(Br([], e.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, t;
  }()
);
function $i() {
  document.querySelectorAll("[data-popover-target]").forEach(function(t) {
    var e = t.getAttribute("data-popover-target"), r = document.getElementById(e);
    if (r) {
      var o = t.getAttribute("data-popover-trigger"), i = t.getAttribute("data-popover-placement"), a = t.getAttribute("data-popover-offset");
      new vs(r, t, {
        placement: i || hr.placement,
        offset: a ? parseInt(a) : hr.offset,
        triggerType: o || hr.triggerType
      });
    } else
      console.error('The popover element with id "'.concat(e, '" does not exist. Please check the data-popover-target attribute.'));
  });
}
typeof window < "u" && (window.Popover = vs, window.initPopovers = $i);
var po = function() {
  return po = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, po.apply(this, arguments);
}, ei = {
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, ef = {
  id: null,
  override: !0
}, bs = (
  /** @class */
  function() {
    function t(e, r, o, i, a) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = null), i === void 0 && (i = ei), a === void 0 && (a = ef), this._instanceId = a.id ? a.id : o.id, this._parentEl = e, this._triggerEl = r, this._targetEl = o, this._options = po(po({}, ei), i), this._visible = !1, this._initialized = !1, this.init(), Y.addInstance("Dial", this, this._instanceId, a.override);
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
function Ui() {
  document.querySelectorAll("[data-dial-init]").forEach(function(t) {
    var e = t.querySelector("[data-dial-toggle]");
    if (e) {
      var r = e.getAttribute("data-dial-toggle"), o = document.getElementById(r);
      if (o) {
        var i = e.getAttribute("data-dial-trigger");
        new bs(t, e, o, {
          triggerType: i || ei.triggerType
        });
      } else
        console.error("Dial with id ".concat(r, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"));
    } else
      console.error("Dial with id ".concat(t.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
  });
}
typeof window < "u" && (window.Dial = bs, window.initDials = Ui);
var go = function() {
  return go = Object.assign || function(t) {
    for (var e, r = 1, o = arguments.length; r < o; r++) {
      e = arguments[r];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, go.apply(this, arguments);
}, Ya = {
  minValue: null,
  maxValue: null,
  onIncrement: function() {
  },
  onDecrement: function() {
  }
}, rf = {
  id: null,
  override: !0
}, ms = (
  /** @class */
  function() {
    function t(e, r, o, i, a) {
      e === void 0 && (e = null), r === void 0 && (r = null), o === void 0 && (o = null), i === void 0 && (i = Ya), a === void 0 && (a = rf), this._instanceId = a.id ? a.id : e.id, this._targetEl = e, this._incrementEl = r, this._decrementEl = o, this._options = go(go({}, Ya), i), this._initialized = !1, this.init(), Y.addInstance("InputCounter", this, this._instanceId, a.override);
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
function qi() {
  document.querySelectorAll("[data-input-counter]").forEach(function(t) {
    var e = t.id, r = document.querySelector('[data-input-counter-increment="' + e + '"]'), o = document.querySelector('[data-input-counter-decrement="' + e + '"]'), i = t.getAttribute("data-input-counter-min"), a = t.getAttribute("data-input-counter-max");
    t ? Y.instanceExists("InputCounter", t.getAttribute("id")) || new ms(t, r || null, o || null, {
      minValue: i ? parseInt(i) : null,
      maxValue: a ? parseInt(a) : null
    }) : console.error('The target element with id "'.concat(e, '" does not exist. Please check the data-input-counter attribute.'));
  });
}
typeof window < "u" && (window.InputCounter = ms, window.initInputCounters = qi);
function of() {
  Ai(), Ii(), Li(), Ti(), Bi(), Fi(), Ri(), Ni(), Vi(), $i(), Ui(), qi();
}
typeof window < "u" && (window.initFlowbite = of);
var af = new Bg("load", [
  Ai,
  Ii,
  Li,
  Ti,
  Bi,
  Fi,
  Ri,
  Ni,
  Vi,
  $i,
  Ui,
  qi
]);
af.init();
const nf = /* @__PURE__ */ Xc(Hg);
customElements.define("ap-marketing-table", nf);

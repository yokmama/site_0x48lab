/*
 * Contact form for the product LPs (lp/hoikunowa, lp/ai-diet-coach).
 *
 * Same delivery as the top page (see README "お問い合わせフォーム"):
 *   1. e-mail via Web3Forms (the submission's success is judged on this)
 *   2. the company's Google Form (spreadsheet record, fire-and-forget: no CORS)
 *
 * The form element configures it:
 *   data-product   product name, used in the mail subject and the Google Form message
 *   data-source    "from" name shown in the mail
 * Inputs:
 *   [name=name] [name=org] [name=email] [name=message]   → Google Form fields
 *   any other named input/select/textarea with data-label → appended to the message
 * Messages shown to the user come from data-msg-* on the form, so a page can be bilingual.
 */
(function () {
  "use strict";

  var MAIL_ENDPOINT = "https://api.web3forms.com/submit";
  var GOOGLE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScvRv7GRD_amzFjgmpO6VWGWyy5f1K6HuIdd3wyqVnsyZiBgA/formResponse";
  // public by design: it can only send to the one address registered with Web3Forms
  var MAIL_KEY = "817d076e-5f68-45d0-b9b0-15c800e7d230";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var form = document.querySelector("form[data-lp-contact]");
  if (!form) return;

  var box = form.closest(".lpf");
  var done = box.querySelector(".lpf-done");
  var status = form.querySelector(".lpf-status");
  var submit = form.querySelector("[type=submit]");
  var product = form.dataset.product || "";
  var source = form.dataset.source || "0x48lab.com";

  var field = function (name) { return form.elements.namedItem(name); };
  var checks = {
    name: function (v) { return v.trim().length > 0; },
    email: function (v) { return EMAIL_RE.test(v.trim()); },
    message: function (v) { return v.trim().length > 0; }
  };

  function validate(input) {
    var ok = checks[input.name](input.value);
    input.closest(".lpf-field").classList.toggle("is-invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    return ok;
  }

  Object.keys(checks).forEach(function (n) {
    var input = field(n);
    input.addEventListener("blur", function () { input.dataset.touched = "1"; validate(input); });
    input.addEventListener("input", function () { if (input.dataset.touched) validate(input); });
  });

  // extra fields (施設の種類, 電話番号 …) are folded into the message text
  function extras() {
    var out = [];
    Array.prototype.forEach.call(form.querySelectorAll("[data-label]"), function (el) {
      if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
      var v = (el.value || "").trim();
      if (v) out.push({ label: el.dataset.label, value: v });
    });
    return out;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    var inputs = Object.keys(checks).map(field);
    inputs.forEach(function (i) { i.dataset.touched = "1"; });
    var bad = inputs.filter(function (i) { return !validate(i); });
    if (bad.length) { bad[0].focus(); return; }

    var name = field("name").value.trim();
    var org = field("org") ? field("org").value.trim() : "";
    var email = field("email").value.trim();
    var text = field("message").value.trim();
    var ex = extras();
    var header = ["【ご相談の種類】" + product]
      .concat(ex.map(function (x) { return "【" + x.label + "】" + x.value; }))
      .join("\n");

    var body = new URLSearchParams();
    body.set("emailAddress", email);
    body.set("entry.508185143", name);
    body.set("entry.279623463", org);
    body.set("entry.846002261", header + "\n\n" + text);
    body.set("fvv", "1");
    body.set("pageHistory", "0");
    var record = fetch(GOOGLE_FORM, { method: "POST", mode: "no-cors", body: body }).catch(function () {});

    var payload = {
      access_key: MAIL_KEY,
      subject: "【" + product + " お問い合わせ】" + name + " 様",
      from_name: source,
      replyto: email,
      botcheck: form.querySelector('input[name="botcheck"]').checked,
      "サービス": product,
      "お名前": name,
      "会社名・施設名": org || "（未記入）",
      "メールアドレス": email
    };
    ex.forEach(function (x) { payload[x.label] = x.value; });
    payload["お問い合わせ内容"] = text;
    payload["送信元ページ"] = location.href;

    var mail = fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || data.success === false) throw new Error(data.message || "HTTP " + res.status);
      });
    });

    box.classList.add("is-sending");
    submit.disabled = true;
    Promise.all([record, mail]).then(function () {
      form.reset();
      form.hidden = true;
      done.hidden = false;
      done.focus();
    }).catch(function (err) {
      console.error("[contact]", err);
      status.textContent = form.dataset.msgError || "送信できませんでした。時間をおいて再度お試しください。";
    }).then(function () {
      box.classList.remove("is-sending");
      submit.disabled = false;
    });
  });

  var again = box.querySelector(".lpf-again");
  if (again) again.addEventListener("click", function () {
    done.hidden = true;
    form.hidden = false;
    field("name").focus();
  });
})();

(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var status = form.querySelector('[data-form-status]');
  var submitBtn = form.querySelector('[data-form-submit]');
  var submitLabel = submitBtn ? submitBtn.textContent : 'Send message';
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function errorEl(field) {
    return document.getElementById(field.id + '-error');
  }

  function clearFieldError(field) {
    field.removeAttribute('aria-invalid');
    var el = errorEl(field);
    if (el) {
      el.textContent = '';
      el.hidden = true;
    }
  }

  function setFieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    var el = errorEl(field);
    if (el) {
      el.textContent = '⚠ ' + message;
      el.hidden = false;
    }
  }

  function setStatus(kind, message) {
    if (!status) return;
    status.hidden = false;
    status.className = 'form-status form-status--' + kind;
    status.textContent = (kind === 'success' ? '✓ ' : '⚠ ') + message;
  }

  function validate() {
    var valid = true;
    var firstInvalid = null;
    var fields = Array.prototype.slice.call(form.querySelectorAll('[required]'));

    fields.forEach(function (field) {
      clearFieldError(field);

      if (!field.value.trim()) {
        setFieldError(field, 'This field is required.');
        valid = false;
        firstInvalid = firstInvalid || field;
      } else if (field.type === 'email' && !emailPattern.test(field.value.trim())) {
        setFieldError(field, 'Enter a valid email address.');
        valid = false;
        firstInvalid = firstInvalid || field;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.value.trim()) clearFieldError(field);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validate()) {
      setStatus('error', 'There is a problem with your submission. Check the highlighted fields below.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    if (status) status.hidden = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed');
        form.hidden = true;
        setStatus('success', 'Thanks, your message has been sent. We’ll be in touch soon.');
      })
      .catch(function () {
        setStatus('error', 'Something went wrong sending your message. Please try again, or email us directly at info@valueadvisory.co.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
      });
  });
})();

'use strict';
/**
 * Contact form submission using Firebase Realtime Database (same app as visitor counter).
 * Stores messages under `/messages/{pushId}` with timestamp.
 * Provides UX feedback & basic spam (honeypot + rate limit in sessionStorage).
 */

(function(){
  const form = document.querySelector('[data-form]');
  if(!form) return;
  const submitBtn = form.querySelector('[data-form-btn]');
  const msgBox = form.querySelector('[data-form-messages]');

  // Ensure firebase is available (loaded earlier via visitor.js)
  if(typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded; contact form disabled.');
    return;
  }

  const database = firebase.database();
  const messagesRef = database.ref('messages');

  function showMessage(text, type='info') {
    if(!msgBox) return;
    msgBox.textContent = text;
    msgBox.className = 'form-messages ' + type; // simple type styling hook
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();

    // Honeypot check
    if(form.website && form.website.value.trim() !== '') {
      showMessage('Spam detected.', 'error');
      return;
    }

    if(!form.checkValidity()) {
      showMessage('Please fill all required fields correctly.', 'error');
      return;
    }

    // Basic rate limit: 1 message per 60s per session
    const lastSent = sessionStorage.getItem('lastMessageTs');
    const now = Date.now();
    if(lastSent && (now - parseInt(lastSent,10)) < 60000) {
      const wait = Math.ceil((60000 - (now - parseInt(lastSent,10)))/1000);
      showMessage('Please wait ' + wait + 's before sending another message.', 'error');
      return;
    }

    submitBtn.disabled = true;
    showMessage('Sending...', 'info');

    const payload = {
      name: form.fullname.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      userAgent: navigator.userAgent,
      ts: new Date().toISOString()
    };

    messagesRef.push(payload)
      .then(()=> {
        showMessage('Message sent successfully. Thank you!', 'success');
        form.reset();
        submitBtn.disabled = true; // re-disable until input
        sessionStorage.setItem('lastMessageTs', Date.now().toString());
      })
      .catch(err => {
        console.error(err);
        showMessage('Failed to send message. Please try again later or email directly.', 'error');
        submitBtn.disabled = false;
      });
  });
})();

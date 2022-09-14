window.addEventListener("load", function() {

  const generateAlert = (selector, text = '', type = null) => {
    const alertContainer = document.querySelector(selector);

    if (alertContainer) {
      alertContainer.innerHTML = '';
      if (type === 'error') {
        alertContainer.classList.add("error-alert");
        alertContainer.innerHTML = text;
        alertContainer.classList.add("alert_active");
      }

      if (type === 'success') {
        alertContainer.classList.add("success-alert");
        alertContainer.innerHTML = text;
        alertContainer.classList.add("alert_active");
      }

      if (!type && alertContainer.classList.contains("alert_active")) {
        alertContainer.classList.remove("alert_active");
      }
    }
  };

  // store tabs variable
  const myTabs = document.querySelectorAll("ul.nav-tabs > li");
  let fingerPrintDownloaded = false;

  function myTabClicks(tabClickEvent) {
    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }
    const clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add("active");
    tabClickEvent.preventDefault();

    const myContentPanes = document.querySelectorAll(".tab-pane");
    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }
    const anchorReference = tabClickEvent.target;
    const activePaneId = anchorReference.getAttribute("href");
    const activePane = document.querySelector(activePaneId);
    activePane.classList.add("active");
    if (activePaneId === "#tab-2" && !fingerPrintDownloaded) {
      generateAlert("#biometric-login-alert", "Operative IQ Finger Print Reader Plugin is not installed.", "error");
      fingerPrintDownloaded = true;
    }
  }

  for (let i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks)
  }

  // choose preferred app

  const loginButton = document.querySelector(".login-button");
  const loginForm = document.getElementById("login");
  const choseApp = document.getElementById("choose-app");

  const loginClicked = (e) => {
    e.preventDefault();

    generateAlert("#traditional-login-alert", "Front Line will be assigned as the default application", "success");
    // time to show success alert
    setTimeout(() => {
      if (loginForm.classList.contains('form-active')) {
        loginForm.classList.add('form-not-active');
        choseApp.classList.remove('form-not-active');
        choseApp.classList.add('form-active');
      }
    }, 2000)
  };

  loginButton?.addEventListener("click", loginClicked);


  // modals

  const trigger = document.createElement("a");
  trigger.setAttribute("data-modal", "modal-one");
  trigger.setAttribute("hidden", "true");
  const wrapper = document.querySelector(".wrapper");
  wrapper.appendChild(trigger);

  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      if (!modal) {
        return;
      }
      modal.classList.add("modal__open");
      const exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("modal__open");
        });
      });
    });
  });

  setTimeout(() => {
    trigger?.click();
  }, 2000);

  // errors
  const fingerExtBtn = document.querySelector("#download-finger-print");
  const fingerSection = document.querySelector(".finger-print");
  const downloadFingerExt = document.querySelector(".finger-print-absent");

  if (fingerExtBtn) {
    fingerExtBtn.addEventListener("click", () => {
      fingerSection.classList.add("finger-print_active");
      downloadFingerExt.classList.remove("finger-print-absent_active");
      generateAlert("#biometric-login-alert");
    });
  }

  const validator = (value) => Boolean(value.trim());
  const form = document.querySelector("#client-identifier-form");
  const inputs = document.querySelectorAll(".form__control");

  form?.addEventListener("submit", (e) => {
    const isValid = Array.from(inputs).some(item => {
      const valid = validator(item.value);
      if (!valid) {
        item.classList.add("form__control_error");
      }

      return valid;
    });

    if (!isValid) {
      e.preventDefault();
      generateAlert("#client-identifier-alert", "Please check your Client Identifier", "error");
    } else {
      generateAlert("#client-identifier-alert");
      inputs?.forEach(input => input.classList.remove("form__control_error"));
    }
  });

  inputs.forEach(input => {
    input.addEventListener("blur", () => {
      if (validator(input.value) && input.classList.contains("form__control_error")) {
        input.classList.remove("form__control_error");
      }
    })
  })
});

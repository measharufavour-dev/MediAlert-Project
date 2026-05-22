/* ══════════════════════════════════════
   SCREEN NAVIGATION
══════════════════════════════════════ */
function goTo(from, to) {
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
  });
  const target = document.getElementById(to);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* ══════════════════════════════════════
   OTP AUTO-JUMP LOGIC
   (wires up all otp-row groups)
══════════════════════════════════════ */
function wireOtp(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const boxes = Array.from(row.querySelectorAll(".otp-box"));

  boxes.forEach((box, i) => {
    /* Type → move forward */
    box.addEventListener("input", () => {
      /* Remove error styling when user types */
      boxes.forEach((b) => b.classList.remove("otp-box--error"));
      const errEl = row.closest(".content")?.querySelector(".otp-error");
      if (errEl) errEl.classList.add("hidden");

      if (box.value && i < boxes.length - 1) {
        boxes[i + 1].focus();
      }
    });

    /* Backspace → move back */
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) {
        boxes[i - 1].focus();
      }
    });

    /* Only allow digits */
    box.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  });
}

/* Wire both OTP screens */
wireOtp("otpRow2");
wireOtp("otpRow3");

/* ══════════════════════════════════════
   SEND OTP
══════════════════════════════════════ */
function sendOtp() {
  const input = document.getElementById("s1Input").value.trim();

  if (!input) {
    alert("Please enter your phone number or email.");
    return;
  }

  /* In a real app you'd call your backend / Firebase here */
  console.log("OTP sent to:", input);

  /* Navigate to OTP screen */
  goTo("s1", "s2");
}

/* ══════════════════════════════════════
   VERIFY OTP
══════════════════════════════════════ */
function verifyOtp(screenId, errId) {
  const row = document.querySelector(`#${screenId} .otp-row`);
  const boxes = Array.from(row.querySelectorAll(".otp-box"));
  const code = boxes.map((b) => b.value).join("");

  if (code.length < 4) {
    /* Show error — mark boxes red */
    boxes.forEach((b) => b.classList.add("otp-box--error"));
    const errEl = document.getElementById(errId);
    if (errEl) {
      errEl.textContent =
        "The code you entered is incorrect. Please try again.";
      errEl.classList.remove("hidden");
    }
    /* Switch to error state screen if on s2 */
    if (screenId === "s2") goTo("s2", "s3");
    return;
  }

  /* Demo: treat any 4-digit code as correct */
  /* In production verify against your backend / Firebase */
  console.log("OTP verified:", code);
  goTo(screenId, "s4");
}

/* ══════════════════════════════════════
   RESEND CODE
══════════════════════════════════════ */
function resendCode() {
  console.log("OTP resent");
  alert("A new code has been sent!");
}

/* ══════════════════════════════════════
   CANCEL
══════════════════════════════════════ */
function cancelFlow() {
  /* Clear input */
  document.getElementById("s1Input").value = "";
  /* Go back to s1 (or wherever Cancel should lead) */
  goTo("s1", "s1");
  alert("Cancelled.");
}

/* ══════════════════════════════════════
   ENTER KEY SUPPORT
══════════════════════════════════════ */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const active = document.querySelector(".screen.active");
  if (!active) return;

  if (active.id === "s1") sendOtp();
  if (active.id === "s2") verifyOtp("s2", "otpErr2");
  if (active.id === "s3") verifyOtp("s3", "otpErr3");
});

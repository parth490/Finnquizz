/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernÃ¡n Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

    /*********Nice Select Image *********/
    // Toggle dropdown open/close
    document.querySelectorAll('.nice-select').forEach(select => {
        select.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.nice-select').forEach(el => {
                if (el !== this) el.classList.remove('open');
            });
            this.classList.toggle('open');
        });
    });

    // Click outside to close dropdown
    window.addEventListener('click', () => {
        document.querySelectorAll('.nice-select').forEach(el => el.classList.remove('open'));
    });

    // Handle option click and update current content
    document.querySelectorAll('.nice-select .option').forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const select = this.closest('.nice-select');
            const current = select.querySelector('.current');
            current.innerHTML = this.innerHTML;
            select.classList.remove('open');
        });
    });
 
    /******  Nice Select  ******/
    $('select').niceSelect();
 
    /********* Mobile Menu ********/
    $('.mobile-menu-button').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $('body').addClass('no_scroll active_menu');
            $(".mobile-menu-wrapper").toggleClass("active_menu");
            $('.overlay').addClass('active');
        }, 50);
    });
    
    $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
        e.preventDefault();
        $('body').removeClass('no_scroll active_menu');
        $(".mobile-menu-wrapper").removeClass("active_menu");
        $('.overlay').removeClass('active');
    }); 

    /****  TAB Js ****/
    $("ul.tabs li").click(function () {
        var $this = $(this);
        var $theTab = $(this).attr("data-tab");
        if ($this.hasClass("active")) {
        } else {
            $this
                .closest(".tabs-wrapper")
                .find("ul.tabs li, .tabs-container .tab-content")
                .removeClass("active");
            $(
                '.tabs-container .tab-content[id="' +
                $theTab +
                '"], ul.tabs li[data-tab="' +
                $theTab +
                "]"
            ).addClass("active");
        }
        $(this).addClass("active");
    }); 

    var swiper = new Swiper(".quizSwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    freeMode: true,
    breakpoints: {
        420: {
        slidesPerView: 4,
        spaceBetween: 10,
        }, 
    }
    });
 
    //*** QUIZ TIMER JS  *****// 
    let totalTime = 60;
    let timeLeft = totalTime;

    const timerValue = document.getElementById("timer-value");
    const progressCircle = document.querySelector(".progress-ring__circle");

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    } 
    function startTimer() {
        const countdown = setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft;

        const percent = (timeLeft / totalTime) * 100;
        setProgress(percent);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerValue.textContent = "0";
            setProgress(0);
        }
        }, 1000);
    } 
    startTimer();  
}); 
 
document.addEventListener("DOMContentLoaded", function () {
    const openPrizeBtn = document.getElementById("openPrizeBtn");
    const closePrizeBtn = document.getElementById("closePrizeBtn");
    const prizePopup = document.getElementById("prizePopup");

    if (openPrizeBtn && closePrizeBtn && prizePopup) { 
        openPrizeBtn.addEventListener("click", () => {
            prizePopup.style.display = "flex";
        });
 
        closePrizeBtn.addEventListener("click", () => {
            prizePopup.style.display = "none";
        });
 
        prizePopup.addEventListener("click", (e) => {
            if (e.target === prizePopup) {
                prizePopup.style.display = "none";
            }
        });
    }
});

//****** REPORT AN ISSUE POPUP AND OVERLAY JS ******//
 document.addEventListener("DOMContentLoaded", () => {
  const reportPopup = document.getElementById("reportPopup");
  const closeReport = document.getElementById("closeReport");

  // ✅ Open popup from any opener button
  document.addEventListener("click", e => {
    if (e.target.closest("#openReport, #openReportBtn")) {
      e.preventDefault();
      reportPopup?.classList.add("active");
    }
  });

  // ✅ Close popup
  closeReport?.addEventListener("click", () => {
    reportPopup?.classList.remove("active");
  });

  // ✅ Close when clicking outside content
  reportPopup?.addEventListener("click", e => {
    if (e.target === reportPopup) {
      reportPopup.classList.remove("active");
    }
  });

  // ✅ Click on <li> selects radio inside
  document.addEventListener("click", e => {
    const li = e.target.closest(".report-content ul li");
    if (li) li.querySelector("input[type='radio']")?.click();
  });
});
 
//***** OPEN REPORT POPUP & CLOSE SIDE MENU JS *****//
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("reportPopup"),
  closeBtn = document.getElementById("closeReport"); 

  document.addEventListener("click", e => {
    if (e.target.closest("#openReport, #openReportBtn, [data-open='reportPopup']")) {
      e.preventDefault();
      popup.classList.add("active");
      document.querySelector(".mobile-menu-wrapper")?.classList.remove("active_menu");
      document.querySelector(".overlay")?.classList.remove("active");
    }
  }); 

  closeBtn?.addEventListener("click", () => popup.classList.remove("active"));
  popup?.addEventListener("click", e => e.target === popup && popup.classList.remove("active"));
}); 
 
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".quiz-question");
  let currentIndex = 0;

  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.classList.toggle("active", i === index);
    });
  }

  // Handle option clicks
  document.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
      } else {
        // Redirect after last question
        window.location.href = "submit.html";
      }
    });
  });

  // Show first question
  showQuestion(currentIndex);
});
 
//***** QUIZE QUESTIONS JS *****//
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  const seeAdsPopup = document.getElementById("seeAdsPopup");
  const closeSeeAds = document.getElementById("closeSeeAds");

  playBtn.addEventListener("click", () => {
    seeAdsPopup.classList.add("active");
  });

  closeSeeAds.addEventListener("click", () => {
    seeAdsPopup.classList.remove("active");
  });
 
  seeAdsPopup.addEventListener("click", (e) => {
    if (e.target === seeAdsPopup) {
      seeAdsPopup.classList.remove("active");
    }
  });
});

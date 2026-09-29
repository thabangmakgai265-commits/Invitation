let currentScreen = "welcome";

const screens = [
    "welcome",
    "question1",
    "question2",
    "question3",
    "unlock",
    "invitation"
];

let currentStep = 0;


/* ============================= */
/* SCREEN CONTROL */
/* ============================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    currentScreen = id;

    updateProgress();
}


/* ============================= */
/* PROGRESS */
/* ============================= */

function updateProgress() {

    const dots = document.querySelectorAll(".progress-dot");

    let step = screens.indexOf(currentScreen);

    if (step >= 0) {

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index <= Math.min(step, 3)
            );

        });

    }
}


/* ============================= */
/* START */
/* ============================= */

function startChallenge() {

    showScreen("question1");

}


/* ============================= */
/* QUESTION 1 */
/* ============================= */

function answerQ1(type) {

    const feedback = document.getElementById("feedback1");

    if (type === "correct") {

        feedback.textContent =
            "✓ Correct. We can continue.";

        setTimeout(() => {
            showScreen("question2");
        }, 1000);

    }

    else if (type === "funny") {

        feedback.textContent =
            "😂 We respect the honesty... but no.";

    }

    else {

        feedback.textContent =
            "❌ Nice try. But HTML handles structure.";

    }

}


/* ============================= */
/* QUESTION 2 */
/* ============================= */

function answerQ2(type) {

    const feedback = document.getElementById("feedback2");

    if (type === "correct") {

        feedback.textContent =
            "✓ Correct. Your access level is increasing.";

        setTimeout(() => {
            showScreen("question3");
        }, 1000);

    }

    else if (type === "funny") {

        feedback.textContent =
            "😂 Surprisingly, that sometimes works.";

    }

    else {

        feedback.textContent =
            "❌ Let's keep Microsoft Word out of this one.";

    }

}


/* ============================= */
/* QUESTION 3 */
/* ============================= */

function answerQ3(type) {

    const feedback = document.getElementById("feedback3");

    if (type === "correct") {

        feedback.textContent =
            "✓ Excellent. You have passed the final check.";

        setTimeout(() => {
            showScreen("unlock");
        }, 1200);

    }

    else if (type === "funny") {

        feedback.textContent =
            "😂 We admire the confidence. But planning comes first.";

    }

    else {

        feedback.textContent =
            "❌ Coding before planning? Dangerous territory.";

    }

}


/* ============================= */
/* OPEN INVITATION */
/* ============================= */

function openInvitation() {

    showScreen("invitation");

}


/* ============================= */
/* RSVP */
/* ============================= */

function showRSVP() {

    document
        .getElementById("rsvpModal")
        .classList.add("show");

}


function closeRSVP() {

    document
        .getElementById("rsvpModal")
        .classList.remove("show");

}

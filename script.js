/* =========================================================
   PORTFOLIO WEB DEVELOPMENT TRAINING
   CRS INVITATION EXPERIENCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       STATE
    ====================================================== */

    const state = {
        currentLayer: "layerWelcome",

        challengeOneComplete: false,
        sequenceComplete: false,
        oneLinkComplete: false,
        finalGameComplete: false,

        sequenceAnswers: [],
        finalGameAnswers: []
    };


    /* =====================================================
       HELPERS
    ====================================================== */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);


    function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }


    /* =====================================================
       LAYERS
    ====================================================== */

    const layers = $$(".experience-layer");


    function showLayer(layerId) {

        layers.forEach(layer => {
            layer.classList.remove("active");
        });

        const target = document.getElementById(layerId);

        if (!target) {
            console.warn(`Layer not found: ${layerId}`);
            return;
        }

        target.classList.add("active");

        state.currentLayer = layerId;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    const notification = $("#systemNotification");
    const notificationMessage = $("#notificationMessage");

    let notificationTimer;


    function showNotification(message, duration = 2200) {

        if (!notification || !notificationMessage) {
            return;
        }

        notificationMessage.textContent = message;

        notification.classList.add("show");

        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(() => {

            notification.classList.remove("show");

        }, duration);
    }


    /* =====================================================
       01 — WELCOME
    ====================================================== */

    const enterInvitation = $("#enterInvitation");


    if (enterInvitation) {

        enterInvitation.addEventListener("click", async () => {

            enterInvitation.disabled = true;

            showNotification(
                "Let's start with something small."
            );

            await delay(450);

            showLayer("layerChallengeOne");

            enterInvitation.disabled = false;

        });

    }


    /* =====================================================
       02 — QUICK WEB CHALLENGE
    ====================================================== */

    const challengeOneOptions =
        $$("#challengeOneOptions .answer-option");

    const challengeOneFeedback =
        $("#challengeOneFeedback");


    challengeOneOptions.forEach(option => {

        option.addEventListener("click", async () => {

            if (state.challengeOneComplete) {
                return;
            }

            const answer = option.dataset.answer;


            /* Wrong answer */

            if (answer !== "correct") {

                option.classList.remove("wrong");

                void option.offsetWidth;

                option.classList.add("wrong");

                if (challengeOneFeedback) {

                    challengeOneFeedback.textContent =
                        "Not quite. Try again.";

                }

                showNotification(
                    "Try again."
                );

                return;
            }


            /* Correct answer */

            state.challengeOneComplete = true;

            option.classList.add("correct");

            challengeOneOptions.forEach(button => {
                button.disabled = true;
            });


            if (challengeOneFeedback) {

                challengeOneFeedback.textContent =
                    "Correct. HTML gives a webpage its structure.";

            }

            showNotification(
                "Correct ✓"
            );

            await delay(900);

            showLayer("layerChallengeTwo");

        });

    });


    /* =====================================================
       03 — BUILD THE PAGE
    ====================================================== */

    const sequenceOptions =
        $$(".sequence-option");

    const sequenceSlots =
        $$("#sequenceSlots .sequence-slot");

    const sequenceFeedback =
        $("#challengeTwoFeedback");

    const continueAfterSequence =
        $("#continueAfterSequence");


    function resetSequence() {

        state.sequenceAnswers = [];


        sequenceSlots.forEach(slot => {

            slot.classList.remove("filled");

            const label =
                slot.querySelector("strong");

            if (label) {
                label.textContent = "Choose one";
            }

        });


        sequenceOptions.forEach(option => {

            option.classList.remove("selected");

            option.disabled = false;

        });


        if (continueAfterSequence) {
            continueAfterSequence.classList.add("hidden");
        }

    }


    function updateSequenceSlots() {

        sequenceSlots.forEach((slot, index) => {

            const label =
                slot.querySelector("strong");

            if (!label) {
                return;
            }


            const answer =
                state.sequenceAnswers[index];


            if (answer) {

                label.textContent = answer;

                slot.classList.add("filled");

            } else {

                label.textContent = "Choose one";

                slot.classList.remove("filled");

            }

        });

    }


    async function checkSequence() {

        const correctSequence = [
            "HTML",
            "CSS",
            "JavaScript"
        ];


        const correct =
            state.sequenceAnswers.length === 3 &&
            state.sequenceAnswers.every(
                (answer, index) =>
                    answer === correctSequence[index]
            );


        if (!correct) {

            if (sequenceFeedback) {

                sequenceFeedback.textContent =
                    "Not quite. Think: structure → styling → behaviour.";

            }

            showNotification(
                "Let's try that order again."
            );

            await delay(700);

            resetSequence();

            return;
        }


        /* Correct */

        state.sequenceComplete = true;


        if (sequenceFeedback) {

            sequenceFeedback.textContent =
                "Perfect. HTML → CSS → JavaScript.";

        }


        showNotification(
            "Sequence complete ✓"
        );


        sequenceOptions.forEach(option => {
            option.disabled = true;
        });


        if (continueAfterSequence) {
            continueAfterSequence.classList.remove("hidden");
        }

    }


    sequenceOptions.forEach(option => {

        option.addEventListener("click", async () => {

            if (state.sequenceComplete) {
                return;
            }


            const language =
                option.dataset.language;


            if (!language) {
                return;
            }


            /* Prevent duplicate choices */

            if (
                state.sequenceAnswers.includes(language)
            ) {
                return;
            }


            state.sequenceAnswers.push(language);

            option.classList.add("selected");

            option.disabled = true;

            updateSequenceSlots();


            if (
                state.sequenceAnswers.length === 3
            ) {

                await checkSequence();

            }

        });

    });


    if (continueAfterSequence) {

        continueAfterSequence.addEventListener(
            "click",
            async () => {

                if (!state.sequenceComplete) {
                    return;
                }

                showNotification(
                    "Now let's talk about ONE LINK."
                );

                await delay(450);

                showLayer("layerOneLink");

            }
        );

    }


    /* =====================================================
       04 — ONE LINK
    ====================================================== */

    const oneLinkChoices =
        $$("#oneLinkChoices .choice-card");

    const oneLinkFeedback =
        $("#oneLinkFeedback");


    oneLinkChoices.forEach(choice => {

        choice.addEventListener("click", async () => {

            if (state.oneLinkComplete) {
                return;
            }


            const selectedChoice =
                choice.dataset.choice;


            state.oneLinkComplete = true;


            oneLinkChoices.forEach(card => {
                card.disabled = true;
            });


            choice.classList.add("selected");


            if (selectedChoice === "yes") {

                if (oneLinkFeedback) {

                    oneLinkFeedback.textContent =
                        "Exactly. One link can bring your professional identity together.";

                }

            } else if (selectedChoice === "maybe") {

                if (oneLinkFeedback) {

                    oneLinkFeedback.textContent =
                        "Fair enough. Let's show you what we mean.";

                }

            } else {

                if (oneLinkFeedback) {

                    oneLinkFeedback.textContent =
                        "Good. Let's show you what we mean.";

                }

            }


            showNotification(
                "Good choice."
            );


            await delay(1100);

            showLayer("layerAccessGranted");

        });

    });


    /* =====================================================
       05 — ACCESS GRANTED
    ====================================================== */

    const viewInvitation =
        $("#viewInvitation");


    if (viewInvitation) {

        viewInvitation.addEventListener(
            "click",
            async () => {

                showNotification(
                    "Opening the invitation..."
                );

                await delay(400);

                showLayer("layerInvitation");

            }
        );

    }


    /* =====================================================
       06 — ACTUAL INVITATION
    ====================================================== */

    const viewDetails =
        $("#viewDetails");


    if (viewDetails) {

        viewDetails.addEventListener(
            "click",
            async () => {

                showNotification(
                    "Here are the event details."
                );

                await delay(400);

                showLayer("layerDetails");

            }
        );

    }


    /* =====================================================
       07 — EVENT DETAILS
       
       There is NO RSVP stage here.

       The user continues to the final mini-game.
    ====================================================== */

    const continueToFinalGame =
        $("#continueToFinalGame");


    if (continueToFinalGame) {

        continueToFinalGame.addEventListener(
            "click",
            async () => {

                showNotification(
                    "One last challenge..."
                );

                await delay(450);

                showLayer("layerFinalGame");

            }
        );

    }


    /* =====================================================
       08 — FINAL MINI GAME
    ====================================================== */

    const finalGameOptions =
        $$(".mini-game-option");

    const finalGameSlots =
        $$("#finalGameSlots .mini-slot");

    const finalGameFeedback =
        $("#finalGameFeedback");


    function resetFinalGame() {

        state.finalGameAnswers = [];


        finalGameSlots.forEach(slot => {

            slot.classList.remove("filled");

            const label =
                slot.querySelector("strong");

            if (label) {
                label.textContent = "—";
            }

        });


        finalGameOptions.forEach(option => {

            option.classList.remove("selected");

            option.disabled = false;

        });

    }


    function updateFinalGameSlots() {

        finalGameSlots.forEach((slot, index) => {

            const label =
                slot.querySelector("strong");

            if (!label) {
                return;
            }


            const answer =
                state.finalGameAnswers[index];


            if (answer) {

                label.textContent = answer;

                slot.classList.add("filled");

            } else {

                label.textContent = "—";

                slot.classList.remove("filled");

            }

        });

    }


    async function checkFinalGame() {

        const correctSequence = [
            "HTML",
            "CSS",
            "JavaScript"
        ];


        const correct =
            state.finalGameAnswers.length === 3 &&
            state.finalGameAnswers.every(
                (answer, index) =>
                    answer === correctSequence[index]
            );


        if (!correct) {

            if (finalGameFeedback) {

                finalGameFeedback.textContent =
                    "Close. Think about structure, styling and behaviour.";

            }

            showNotification(
                "Try that order again."
            );

            await delay(700);

            resetFinalGame();

            return;
        }


        /* Correct final challenge */

        state.finalGameComplete = true;


        finalGameOptions.forEach(option => {
            option.disabled = true;
        });


        if (finalGameFeedback) {

            finalGameFeedback.textContent =
                "That's it. You're ready.";

        }


        showNotification(
            "Challenge complete ✓"
        );


        await delay(1000);

        showLayer("layerFinal");

        createCelebration();

    }


    finalGameOptions.forEach(option => {

        option.addEventListener("click", async () => {

            if (state.finalGameComplete) {
                return;
            }


            const language =
                option.dataset.language;


            if (!language) {
                return;
            }


            if (
                state.finalGameAnswers.includes(language)
            ) {
                return;
            }


            state.finalGameAnswers.push(language);

            option.classList.add("selected");

            option.disabled = true;

            updateFinalGameSlots();


            if (
                state.finalGameAnswers.length === 3
            ) {

                await checkFinalGame();

            }

        });

    });


    /* =====================================================
       09 — FINAL SCREEN
       
       IMPORTANT:
       RSVP is a normal mailto link.

       JavaScript DOES NOT intercept it.

       The email is the final step.
    ====================================================== */

    const rsvpButton =
        $("#rsvpButton");


    if (rsvpButton) {

        rsvpButton.addEventListener(
            "click",
            () => {

                showNotification(
                    "Opening your email app..."
                );

            }
        );

    }


    /* =====================================================
       CELEBRATION
    ====================================================== */

    function createCelebration() {

        const celebrationLayer =
            $("#celebrationLayer");


        if (!celebrationLayer) {
            return;
        }


        celebrationLayer.innerHTML = "";


        const particleCount = 35;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "celebration-particle";


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.top =
                `${Math.random() * 15}%`;


            particle.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 300}px`
            );


            particle.style.animationDelay =
                `${Math.random() * 0.8}s`;


            celebrationLayer.appendChild(
                particle
            );

        }


        setTimeout(() => {

            celebrationLayer.innerHTML = "";

        }, 3500);

    }


    /* =====================================================
       BUTTON PRESS EFFECT
    ====================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button:not(:disabled), a"
                );


            if (!button) {
                return;
            }


            button.classList.add(
                "button-pressed"
            );


            setTimeout(() => {

                button.classList.remove(
                    "button-pressed"
                );

            }, 180);

        }
    );


    /* =====================================================
       ESCAPE — CLOSE NOTIFICATION
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (notification) {
                    notification.classList.remove("show");
                }

            }

        }
    );


    /* =====================================================
       DEBUG ACCESS
       
       Available in browser console:
       
       PortfolioTrainingInvitation.state
       PortfolioTrainingInvitation.showLayer(...)
    ====================================================== */

    window.PortfolioTrainingInvitation = {

        state,

        showLayer,

        resetSequence,

        resetFinalGame

    };


    /* =====================================================
       INITIAL SCREEN
    ====================================================== */

    showLayer("layerWelcome");

});

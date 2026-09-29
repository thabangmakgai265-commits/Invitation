/* =========================================================
   MONARCHAUREX — LIHLE PRIVATE INVITATION
   Interactive experience controller
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       STATE
    ====================================================== */

    const state = {
        currentLayer: "layerArrival",

        challengeOneComplete: false,
        challengeTwoComplete: false,
        challengeThreeComplete: false,

        invitationReached: false,
        attendanceConfirmed: false,

        happiness: 42,
        happinessComplete: false,

        smileConfirmed: false,

        energyScore: 0,
        energyComplete: false,

        vibeAnswered: false,

        verificationRunning: false,
        approved: false,

        soundEnabled: false
    };


    /* =====================================================
       HELPERS
    ====================================================== */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => {
        return Array.from(document.querySelectorAll(selector));
    };


    function showNotification(message) {
        const notification = $("#systemNotification");
        const notificationMessage = $("#notificationMessage");

        if (!notification || !notificationMessage) {
            return;
        }

        notificationMessage.textContent = message;

        notification.classList.add("show");

        clearTimeout(showNotification.timeout);

        showNotification.timeout = setTimeout(() => {
            notification.classList.remove("show");
        }, 2800);
    }


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    /* =====================================================
       LAYER SYSTEM
    ====================================================== */

    const layers = $$(".experience-layer");


    function showLayer(layerId) {

        const nextLayer = document.getElementById(layerId);

        if (!nextLayer) {
            console.warn(`Layer not found: ${layerId}`);
            return;
        }

        layers.forEach(layer => {
            layer.classList.remove("active", "exit");
        });

        nextLayer.classList.add("active");

        state.currentLayer = layerId;

        updateProgress();
    }


    function updateProgress() {

        const progressSteps = $$(".progress-step");

        if (!progressSteps.length) {
            return;
        }

        const order = [
            "arrival",
            "challenge-one",
            "challenge-two",
            "challenge-three",
            "access-granted",
            "fake-invitation",
            "programme",
            "wait",
            "happiness",
            "smile",
            "energy",
            "important-question",
            "final-verification",
            "approved",
            "welcome"
        ];

        const current = document
            .getElementById(state.currentLayer)
            ?.dataset.layer;

        const currentIndex = order.indexOf(current);

        progressSteps.forEach((step, index) => {

            step.classList.remove("active", "complete");

            if (index < currentIndex) {
                step.classList.add("complete");
            }

            if (index === currentIndex) {
                step.classList.add("active");
            }
        });
    }


    /* =====================================================
       ARRIVAL
    ====================================================== */

    function setupArrival() {

        const button = $("#enterInvitation");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            showNotification("PRIVATE ACCESS INITIATED");

            setTimeout(() => {
                showLayer("layerChallengeOne");
            }, 650);

        });
    }


    /* =====================================================
       CHALLENGE SYSTEM
    ====================================================== */

    function setupChallenges() {

        const challengeOne = $("#layerChallengeOne");
        const challengeTwo = $("#layerChallengeTwo");
        const challengeThree = $("#layerChallengeThree");


        /* -------------------------------------------------
           CHALLENGE 1
        -------------------------------------------------- */

        if (challengeOne) {

            challengeOne
                .querySelectorAll(".answer-option")
                .forEach(option => {

                    option.addEventListener("click", () => {

                        handleChallenge(
                            option,
                            $("#challengeOneFeedback"),
                            1
                        );

                    });

                });
        }


        /* -------------------------------------------------
           CHALLENGE 2
        -------------------------------------------------- */

        if (challengeTwo) {

            challengeTwo
                .querySelectorAll(".answer-option")
                .forEach(option => {

                    option.addEventListener("click", () => {

                        handleChallenge(
                            option,
                            $("#challengeTwoFeedback"),
                            2
                        );

                    });

                });
        }


        /* -------------------------------------------------
           CHALLENGE 3
        -------------------------------------------------- */

        if (challengeThree) {

            challengeThree
                .querySelectorAll(".answer-option")
                .forEach(option => {

                    option.addEventListener("click", () => {

                        handleChallenge(
                            option,
                            $("#challengeThreeFeedback"),
                            3
                        );

                    });

                });
        }
    }


    function handleChallenge(option, feedback, challengeNumber) {

        const answer = option.dataset.answer;

        if (!feedback) {
            return;
        }


        /* Wrong answer */

        if (answer !== "correct") {

            option.classList.add("incorrect");

            feedback.textContent = "Not quite. Try again.";

            showNotification("ACCESS DENIED — TRY AGAIN");

            setTimeout(() => {
                option.classList.remove("incorrect");
            }, 700);

            return;
        }


        /* Correct answer */

        option.classList.add("correct");

        feedback.textContent = "Correct. ✓";

        showNotification("ANSWER VERIFIED ✓");


        if (challengeNumber === 1) {
            state.challengeOneComplete = true;
        }

        if (challengeNumber === 2) {
            state.challengeTwoComplete = true;
        }

        if (challengeNumber === 3) {
            state.challengeThreeComplete = true;
        }


        setTimeout(() => {

            option.classList.remove("correct");

            if (challengeNumber === 1) {
                showLayer("layerChallengeTwo");
            }

            if (challengeNumber === 2) {
                showLayer("layerChallengeThree");
            }

            if (challengeNumber === 3) {
                showLayer("layerAccessGranted");
            }

        }, 900);
    }


    /* =====================================================
       ACCESS GRANTED
    ====================================================== */

    function setupAccessGranted() {

        const button = $("#continueToInvitation");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            if (
                !state.challengeOneComplete ||
                !state.challengeTwoComplete ||
                !state.challengeThreeComplete
            ) {
                showNotification("COMPLETE ALL CHALLENGES FIRST");
                return;
            }

            state.invitationReached = true;

            showLayer("layerFakeInvitation");

        });
    }


    /* =====================================================
       FAKE INVITATION
    ====================================================== */

    function setupFakeInvitation() {

        const button = $("#viewProgramme");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            showLayer("layerProgramme");

        });
    }


    /* =====================================================
       PROGRAMME
    ====================================================== */

    function setupProgramme() {

        const button = $("#confirmAttendance");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            state.attendanceConfirmed = true;

            showNotification("ATTENDANCE RECEIVED ✓");

            setTimeout(() => {
                showLayer("layerWait");
            }, 500);

        });
    }


    /* =====================================================
       WAIT / FUN VERIFICATION
    ====================================================== */

    function setupWait() {

        const button = $("#startFunVerification");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            showLayer("layerHappiness");

            updateHappiness();

        });
    }


    /* =====================================================
       HAPPINESS
    ====================================================== */

    function setupHappiness() {

        const slider = $("#happinessSlider");
        const value = $("#happinessValue");
        const fill = $("#meterFill");
        const feedback = $("#happinessFeedback");
        const continueButton = $("#happinessContinue");


        if (!slider) {
            return;
        }


        slider.addEventListener("input", () => {

            const happiness = Number(slider.value);

            state.happiness = happiness;

            if (value) {
                value.textContent = `${happiness}%`;
            }

            updateHappiness();


            if (happiness >= 70) {

                state.happinessComplete = true;

                if (feedback) {
                    feedback.textContent = "Hmm... better. But we're still not convinced.";
                }

                if (continueButton) {
                    continueButton.disabled = false;
                    continueButton.classList.remove("disabled-button");
                }

            } else {

                state.happinessComplete = false;

                if (feedback) {
                    feedback.textContent = "Increase your happiness level.";
                }

                if (continueButton) {
                    continueButton.disabled = true;
                    continueButton.classList.add("disabled-button");
                }
            }

        });


        if (continueButton) {

            continueButton.addEventListener("click", () => {

                if (!state.happinessComplete) {
                    return;
                }

                showLayer("layerSmile");

            });
        }


        updateHappiness();
    }


    function updateHappiness() {

        const slider = $("#happinessSlider");
        const value = $("#happinessValue");
        const fill = $("#meterFill");

        if (!slider) {
            return;
        }

        const happiness = Number(slider.value);

        if (value) {
            value.textContent = `${happiness}%`;
        }

        if (fill) {

            const minimum = Number(slider.min);
            const maximum = Number(slider.max);

            const percentage =
                ((happiness - minimum) / (maximum - minimum)) * 100;

            fill.style.width = `${percentage}%`;
        }
    }


    /* =====================================================
       SMILE
    ====================================================== */

    function setupSmile() {

        const button = $("#smileButton");
        const feedback = $("#smileFeedback");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            state.smileConfirmed = true;

            if (feedback) {
                feedback.textContent =
                    "📸 Smile detected. ...probably. We'll trust you. 😂";
            }

            showNotification("SMILE DETECTED ✓");

            button.disabled = true;

            setTimeout(() => {

                button.disabled = false;

                showLayer("layerEnergy");

                resetEnergyGame();

            }, 1300);

        });
    }


    /* =====================================================
       ENERGY GAME
    ====================================================== */

    const energyMessages = [
        "✦ Nice.",
        "✦ Okayyy.",
        "✦ You're getting serious.",
        "✦ THERE WE GO.",
        "✦ ENERGY CONFIRMED 🔥"
    ];


    function setupEnergy() {

        const emblem = $("#movingEmblem");

        if (!emblem) {
            return;
        }

        emblem.addEventListener("click", () => {

            if (state.energyComplete) {
                return;
            }

            state.energyScore++;

            updateEnergyScore();

            const message =
                energyMessages[state.energyScore - 1] || "✦ Nice.";

            const feedback = $("#energyFeedback");

            if (feedback) {
                feedback.textContent = message;
            }

            if (state.energyScore >= 5) {

                state.energyComplete = true;

                emblem.disabled = true;

                showNotification("ENERGY CONFIRMED 🔥");

                setTimeout(() => {

                    showLayer("layerImportantQuestion");

                }, 1000);

                return;
            }

            moveEnergyEmblem();

        });


        window.addEventListener("resize", () => {

            if (
                state.currentLayer === "layerEnergy" &&
                !state.energyComplete
            ) {
                moveEnergyEmblem();
            }

        });
    }


    function resetEnergyGame() {

        state.energyScore = 0;
        state.energyComplete = false;

        updateEnergyScore();

        const emblem = $("#movingEmblem");
        const feedback = $("#energyFeedback");

        if (emblem) {
            emblem.disabled = false;
        }

        if (feedback) {
            feedback.textContent = "Catch it.";
        }

        setTimeout(() => {
            moveEnergyEmblem();
        }, 200);
    }


    function updateEnergyScore() {

        const score = $("#energyScore");

        if (!score) {
            return;
        }

        score.textContent = `${state.energyScore} / 5`;
    }


    function moveEnergyEmblem() {

        const arena = $("#energyArena");
        const emblem = $("#movingEmblem");

        if (!arena || !emblem) {
            return;
        }

        const arenaWidth = arena.clientWidth;
        const arenaHeight = arena.clientHeight;

        const emblemWidth = emblem.offsetWidth;
        const emblemHeight = emblem.offsetHeight;

        if (
            arenaWidth <= emblemWidth ||
            arenaHeight <= emblemHeight
        ) {
            return;
        }

        const padding = 15;

        const maxX =
            arenaWidth - emblemWidth - padding;

        const maxY =
            arenaHeight - emblemHeight - padding;

        const x =
            padding +
            Math.random() * Math.max(0, maxX - padding);

        const y =
            padding +
            Math.random() * Math.max(0, maxY - padding);

        emblem.style.left = `${x}px`;
        emblem.style.top = `${y}px`;
    }


    /* =====================================================
       IMPORTANT QUESTION
    ====================================================== */

    function setupVibeQuestion() {

        const options = $$(".vibe-option");
        const feedback = $("#vibeFeedback");

        options.forEach(option => {

            option.addEventListener("click", () => {

                const answer = option.dataset.answer;

                state.vibeAnswered = true;

                options.forEach(item => {
                    item.classList.remove("selected");
                });

                option.classList.add("selected");


                if (answer === "all") {

                    if (feedback) {
                        feedback.textContent =
                            "CORRECT. Finally, someone understands the assignment. 😂";
                    }

                    showNotification("CORRECT ANSWER ✓");

                } else if (answer === "snacks") {

                    if (feedback) {
                        feedback.textContent =
                            "Honestly... respectable. 🍕";
                    }

                    showNotification("SNACKS ACCEPTED");

                } else if (answer === "energy") {

                    if (feedback) {
                        feedback.textContent =
                            "Good answer. We expected nothing less. 🔥";
                    }

                    showNotification("ENERGY ACCEPTED");

                } else {

                    if (feedback) {
                        feedback.textContent =
                            "Good vibes are always welcome. ✨";
                    }

                    showNotification("VIBES ACCEPTED");
                }


                setTimeout(() => {

                    showLayer("layerFinalVerification");

                    runFinalVerification();

                }, 1100);

            });

        });
    }


    /* =====================================================
       FINAL VERIFICATION
    ====================================================== */

    async function runFinalVerification() {

        if (state.verificationRunning) {
            return;
        }

        state.verificationRunning = true;


        const checks = [
            {
                element: $("#verifyIdentity"),
                valid: true
            },
            {
                element: $("#verifyInvitation"),
                valid: state.attendanceConfirmed
            },
            {
                element: $("#verifyEnergy"),
                valid: state.energyComplete
            },
            {
                element: $("#verifyHappiness"),
                valid: state.happinessComplete
            },
            {
                element: $("#verifyVibes"),
                valid: state.vibeAnswered
            },
            {
                element: $("#verifyCommitment"),
                valid: state.challengeOneComplete &&
                    state.challengeTwoComplete &&
                    state.challengeThreeComplete
            }
        ];


        const status = $("#verificationStatus");


        if (status) {
            status.textContent = "VERIFYING...";
        }


        for (const check of checks) {

            if (check.element) {
                check.element.textContent = "CHECKING...";
            }

            await delay(550);

            if (check.element) {

                if (check.valid) {

                    check.element.textContent = "VERIFIED ✓";
                    check.element.classList.add("verified");

                } else {

                    check.element.textContent = "FAILED";
                    check.element.classList.add("failed");

                }

            }
        }


        await delay(700);


        if (checks.every(check => check.valid)) {

            if (status) {
                status.textContent = "STATUS: APPROVED";
                status.classList.add("approved");
            }

            state.approved = true;

            showNotification("FINAL VERIFICATION COMPLETE ✓");

            await delay(1200);

            showLayer("layerApproved");

            createCelebration();

        } else {

            if (status) {
                status.textContent = "STATUS: VERIFICATION FAILED";
            }

            showNotification("VERIFICATION FAILED");

            state.verificationRunning = false;
        }
    }


    /* =====================================================
       APPROVED
    ====================================================== */

    function setupApproved() {

        const button = $("#welcomeToMonarch");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            if (!state.approved) {
                showNotification("VERIFICATION REQUIRED");
                return;
            }

            showLayer("layerWelcome");

        });
    }


    /* =====================================================
       CELEBRATION
    ====================================================== */

    function createCelebration() {

        const celebration = $("#celebrationLayer");

        if (!celebration) {
            return;
        }

        celebration.innerHTML = "";

        for (let i = 0; i < 35; i++) {

            const particle = document.createElement("span");

            particle.className = "celebration-particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 1.2}s`;

            particle.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 220}px`
            );

            particle.style.setProperty(
                "--y",
                `${(Math.random() - 0.5) * 220}px`
            );

            celebration.appendChild(particle);
        }

        celebration.classList.add("active");

        setTimeout(() => {
            celebration.classList.remove("active");
        }, 2500);
    }


    /* =====================================================
       SOUND CONTROL
    ====================================================== */

    function setupSoundControl() {

        const button = $("#soundControl");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            state.soundEnabled = !state.soundEnabled;

            const icon = button.querySelector(".sound-icon");
            const label = button.querySelector(".sound-label");

            if (state.soundEnabled) {

                if (icon) {
                    icon.textContent = "🔊";
                }

                if (label) {
                    label.textContent = "SOUND ON";
                }

                showNotification("SOUND ENABLED");

            } else {

                if (icon) {
                    icon.textContent = "◉";
                }

                if (label) {
                    label.textContent = "SOUND";
                }

                showNotification("SOUND OFF");
            }

        });
    }


    /* =====================================================
       INITIAL VISUAL SETUP
    ====================================================== */

    function setupInitialVisuals() {

        const buttons = $$(
            ".premium-button, .answer-option, .vibe-option"
        );

        buttons.forEach(button => {

            button.addEventListener("mousedown", () => {
                button.classList.add("pressed");
            });

            button.addEventListener("mouseup", () => {
                button.classList.remove("pressed");
            });

            button.addEventListener("mouseleave", () => {
                button.classList.remove("pressed");
            });

        });
    }


    /* =====================================================
       KEYBOARD SUPPORT
    ====================================================== */

    function setupKeyboardSupport() {

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                const notification =
                    $("#systemNotification");

                if (notification) {
                    notification.classList.remove("show");
                }

            }

        });
    }


    /* =====================================================
       PUBLIC DEBUG API
    ====================================================== */

    window.MonarchAurexInvitation = {

        state,

        showLayer,

        resetEnergyGame,

        runFinalVerification,

        createCelebration

    };


    /* =====================================================
       START EXPERIENCE
    ====================================================== */

    setupArrival();

    setupChallenges();

    setupAccessGranted();

    setupFakeInvitation();

    setupProgramme();

    setupWait();

    setupHappiness();

    setupSmile();

    setupEnergy();

    setupVibeQuestion();

    setupApproved();

    setupSoundControl();

    setupInitialVisuals();

    setupKeyboardSupport();

    updateProgress();

});

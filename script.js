/* =========================================================
   MONARCHAUREX — PRIVATE INVITATION
   LIHLE × MONARCHAUREX
   MASTER JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. GLOBAL STATE
   ========================================================= */

const state = {

    currentLayer: "layerArrival",

    happiness: 42,

    energyScore: 0,

    vibeAnswered: false,

    identityConfirmed: false,

    invitationAccepted: false,

    smileConfirmed: false,

    finalApproved: false,

    soundEnabled: false,

    audioContext: null,

    currentPanel: "panelIdea",

    verificationRunning: false,

    transitionLocked: false

};


/* =========================================================
   02. ELEMENT HELPERS
   ========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);

function get(id) {
    return document.getElementById(id);
}


/* =========================================================
   03. LAYER MAP
   ========================================================= */

const layerOrder = [

    "layerArrival",
    "layerIdentity",
    "layerReveal",
    "layerDiscovery",
    "layerFormalInvitation",
    "layerWait",
    "layerHappiness",
    "layerSmile",
    "layerEnergy",
    "layerImportantQuestion",
    "layerFinalVerification",
    "layerApproved",
    "layerWelcome"

];


/* =========================================================
   04. INITIAL SETUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeInvitation
);


function initializeInvitation() {

    setupLayers();

    setupButtons();

    setupDiscovery();

    setupHappiness();

    setupSmileChallenge();

    setupEnergyGame();

    setupVibeQuestion();

    setupSound();

    setupInitialVisuals();

    setupKeyboardAccess();

    updateProgress();

}


/* =========================================================
   05. LAYER SYSTEM
   ========================================================= */

function setupLayers() {

    $$(".layer").forEach(layer => {

        layer.classList.remove(
            "active",
            "is-active",
            "show",
            "exit"
        );

    });


    const firstLayer =
        get(state.currentLayer);


    if (firstLayer) {

        firstLayer.classList.add(
            "active"
        );

    }

}


function showLayer(layerId) {

    if (!layerId) {
        return;
    }


    const nextLayer =
        get(layerId);


    if (!nextLayer) {

        console.warn(
            `MonarchAurex: Layer "${layerId}" was not found.`
        );

        return;

    }


    if (
        state.currentLayer ===
        layerId
    ) {

        return;

    }


    const currentLayer =
        get(state.currentLayer);


    if (
        currentLayer &&
        currentLayer !== nextLayer
    ) {

        currentLayer.classList.add(
            "exit"
        );


        setTimeout(() => {

            currentLayer.classList.remove(
                "active",
                "is-active",
                "show",
                "exit"
            );


            activateLayer(
                nextLayer
            );

        }, 420);


    } else {

        activateLayer(
            nextLayer
        );

    }

}


function activateLayer(layer) {

    if (!layer) {
        return;
    }


    $$(".layer").forEach(item => {

        item.classList.remove(
            "active",
            "is-active",
            "show",
            "exit"
        );

    });


    layer.classList.add(
        "active"
    );


    state.currentLayer =
        layer.id;


    state.transitionLocked =
        false;


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        layer.id ===
        "layerEnergy"
    ) {

        resetEnergyGame();

    }

}


/* =========================================================
   06. PROGRESS
   ========================================================= */

function updateProgress() {

    const progressBar =
        $(".progress-bar");


    if (!progressBar) {
        return;
    }


    const index =
        layerOrder.indexOf(
            state.currentLayer
        );


    if (index === -1) {

        progressBar.style.width =
            "0%";

        return;

    }


    const progress =
        (index /
            (layerOrder.length - 1)
        ) * 100;


    progressBar.style.width =
        `${Math.max(
            0,
            Math.min(
                progress,
                100
            )
        )}%`;

}


/* =========================================================
   07. TRANSITION HELPER
   ========================================================= */

function safeTransition(
    button,
    callback,
    delay = 0
) {

    if (state.transitionLocked) {
        return;
    }


    state.transitionLocked =
        true;


    if (button) {

        button.dataset.locked =
            "true";

        button.disabled =
            true;

    }


    setTimeout(() => {

        callback();

    }, delay);

}


/* =========================================================
   08. MAIN BUTTONS
   ========================================================= */

function setupButtons() {


    /* -----------------------------------------
       ENTER INVITATION
       ----------------------------------------- */

    const enterInvitation =
        get("enterInvitation");


    if (enterInvitation) {

        enterInvitation.addEventListener(
            "click",
            () => {

                safeTransition(
                    enterInvitation,
                    () => {

                        playClick();

                        showLayer(
                            "layerIdentity"
                        );

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       CONFIRM IDENTITY
       ----------------------------------------- */

    const confirmIdentity =
        get("confirmIdentity");


    if (confirmIdentity) {

        confirmIdentity.addEventListener(
            "click",
            () => {

                safeTransition(
                    confirmIdentity,
                    () => {

                        state.identityConfirmed =
                            true;


                        playSuccess();


                        showNotification(
                            "Identity confirmed."
                        );


                        setTimeout(() => {

                            showLayer(
                                "layerReveal"
                            );

                        }, 700);

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       DISCOVER OPPORTUNITY
       ----------------------------------------- */

    const discoverOpportunity =
        get("discoverOpportunity");


    if (discoverOpportunity) {

        discoverOpportunity.addEventListener(
            "click",
            () => {

                safeTransition(
                    discoverOpportunity,
                    () => {

                        playClick();

                        showLayer(
                            "layerDiscovery"
                        );

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       ACCEPT INVITATION
       ----------------------------------------- */

    const acceptInvitation =
        get("acceptInvitation");


    if (acceptInvitation) {

        acceptInvitation.addEventListener(
            "click",
            () => {

                if (
                    !state.identityConfirmed
                ) {

                    showNotification(
                        "Identity confirmation is required first."
                    );

                    return;

                }


                state.invitationAccepted =
                    true;


                safeTransition(
                    acceptInvitation,
                    () => {

                        playClick();

                        showLayer(
                            "layerWait"
                        );

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       START FUN VERIFICATION
       ----------------------------------------- */

    const startFunVerification =
        get("startFunVerification");


    if (startFunVerification) {

        startFunVerification.addEventListener(
            "click",
            () => {

                safeTransition(
                    startFunVerification,
                    () => {

                        if (
                            !state.invitationAccepted
                        ) {

                            showNotification(
                                "Invitation confirmation required."
                            );

                            return;

                        }


                        playClick();


                        showLayer(
                            "layerHappiness"
                        );

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       HAPPINESS CONTINUE
       ----------------------------------------- */

    const happinessContinue =
        get("happinessContinue");


    if (happinessContinue) {

        happinessContinue.addEventListener(
            "click",
            () => {

                if (
                    state.happiness < 70
                ) {

                    showNotification(
                        "The system is still not convinced. Increase the happiness level first. 😭"
                    );


                    shakeElement(
                        get(
                            "happinessSlider"
                        )
                    );


                    return;

                }


                safeTransition(
                    happinessContinue,
                    () => {

                        playSuccess();

                        showLayer(
                            "layerSmile"
                        );

                    }
                );

            }
        );

    }


    /* -----------------------------------------
       ENTER MONARCHAUREX
       ----------------------------------------- */

    const enterMonarchAurex =
        get("enterMonarchAurex");


    if (enterMonarchAurex) {

        enterMonarchAurex.addEventListener(
            "click",
            () => {

                if (
                    !state.finalApproved
                ) {

                    showNotification(
                        "Final approval has not been completed yet."
                    );

                    return;

                }


                safeTransition(
                    enterMonarchAurex,
                    () => {

                        playSuccess();


                        createCelebration();


                        showNotification(
                            "Welcome to MonarchAurex, Lihle."
                        );


                        setTimeout(() => {

                            window.location.href =
                                "https://monarchaurex.co.za/";

                        }, 1400);

                    }
                );

            }
        );

    }

}


/* =========================================================
   09. DISCOVERY SYSTEM
   ========================================================= */

function setupDiscovery() {


    /* -----------------------------------------
       DISCOVERY CARDS
       ----------------------------------------- */

    const cards =
        $$(".card-open");


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const panelId =
                    card.dataset.open;


                if (!panelId) {
                    return;
                }


                openDiscovery(
                    panelId
                );

            }
        );

    });


    /* -----------------------------------------
       CLOSE DISCOVERY
       ----------------------------------------- */

    const closeDiscovery =
        get("closeDiscovery");


    if (closeDiscovery) {

        closeDiscovery.addEventListener(
            "click",
            closeDiscoveryModal
        );

    }


    /* -----------------------------------------
       PANEL NEXT
       ----------------------------------------- */

    $$(".panel-next").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const nextPanel =
                        button.dataset.nextPanel;


                    if (
                        nextPanel
                    ) {

                        openDiscovery(
                            nextPanel
                        );

                    }

                }
            );

        }
    );


    /* -----------------------------------------
       FINISH DISCOVERY
       ----------------------------------------- */

    $$(
        "[data-finish-discovery]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeDiscoveryModal();


                setTimeout(() => {

                    showLayer(
                        "layerFormalInvitation"
                    );

                }, 350);

            }
        );

    });


    /* -----------------------------------------
       ESCAPE KEY
       ----------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeDiscoveryModal();

            }

        }
    );


    /* -----------------------------------------
       BACKDROP CLICK
       ----------------------------------------- */

    const modal =
        get("discoveryModal");


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    closeDiscoveryModal();

                }

            }
        );

    }

}


function openDiscovery(
    panelId
) {

    const modal =
        get("discoveryModal");


    if (!modal) {
        return;
    }


    const targetPanel =
        get(panelId);


    if (!targetPanel) {

        console.warn(
            `Discovery panel "${panelId}" was not found.`
        );

        return;

    }


    $$(".discovery-panel")
        .forEach(panel => {

            panel.classList.remove(
                "active",
                "show"
            );

        });


    targetPanel.classList.add(
        "active"
    );


    state.currentPanel =
        panelId;


    modal.classList.add(
        "active",
        "show"
    );


    document.body.style.overflow =
        "hidden";


    playClick();

}


function closeDiscoveryModal() {

    const modal =
        get("discoveryModal");


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active",
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   10. HAPPINESS VERIFICATION
   ========================================================= */

function setupHappiness() {

    const slider =
        get("happinessSlider");


    if (!slider) {
        return;
    }


    state.happiness =
        Number(slider.value) || 42;


    updateHappiness();


    slider.addEventListener(
        "input",
        () => {

            state.happiness =
                Number(
                    slider.value
                );


            updateHappiness();

        }
    );

}


function updateHappiness() {

    const value =
        state.happiness;


    const slider =
        get("happinessSlider");


    const display =
        get("happinessValue");


    const meter =
        get("meterFill");


    const feedback =
        get("happinessFeedback");


    if (slider) {

        slider.value =
            value;

    }


    if (display) {

        display.textContent =
            `${value}%`;

    }


    if (meter) {

        meter.style.width =
            `${value}%`;

    }


    if (!feedback) {
        return;
    }


    if (value < 45) {

        feedback.textContent =
            "Hmm... that is not exactly what we'd call enthusiasm. 😐";

    }

    else if (value < 60) {

        feedback.textContent =
            "Okay... we're seeing signs of life.";

    }

    else if (value < 70) {

        feedback.textContent =
            "Better. But the MonarchAurex system remains suspicious.";

    }

    else if (value < 85) {

        feedback.textContent =
            "Hmm... better. We're getting somewhere.";

    }

    else if (value < 95) {

        feedback.textContent =
            "Now THAT looks more convincing.";

    }

    else {

        feedback.textContent =
            "Maximum happiness detected. We may proceed. 😭🔥";

    }

}


/* =========================================================
   11. SMILE CHALLENGE
   ========================================================= */

function setupSmileChallenge() {

    const smileButton =
        get("smileButton");


    if (!smileButton) {
        return;
    }


    smileButton.addEventListener(
        "click",
        () => {

            if (
                state.smileConfirmed
            ) {
                return;
            }


            state.smileConfirmed =
                true;


            playSuccess();


            const feedback =
                get("smileFeedback");


            if (feedback) {

                feedback.textContent =
                    "Smile detected. ...probably. We'll trust you. 😭";

            }


            smileButton.textContent =
                "SMILE VERIFIED ✓";


            smileButton.disabled =
                true;


            smileButton.dataset.locked =
                "true";


            smileButton.style.opacity =
                "0.7";


            setTimeout(() => {

                showLayer(
                    "layerEnergy"
                );

            }, 1200);

        }
    );

}


/* =========================================================
   12. ENERGY GAME
   ========================================================= */

function setupEnergyGame() {

    const emblem =
        get("movingEmblem");


    const arena =
        get("energyArena");


    if (!emblem || !arena) {
        return;
    }


    emblem.addEventListener(
        "click",
        event => {

            event.preventDefault();

            energyHit();

        }
    );


    emblem.addEventListener(
        "touchstart",
        event => {

            event.preventDefault();

            energyHit();

        },
        {
            passive: false
        }
    );


    moveEnergyEmblem();

}


function resetEnergyGame() {

    const emblem =
        get("movingEmblem");


    if (!emblem) {
        return;
    }


    state.energyScore =
        0;


    const score =
        get("energyScore");


    const feedback =
        get("energyFeedback");


    if (score) {

        score.textContent =
            "0 / 5";

    }


    if (feedback) {

        feedback.textContent =
            "Catch the emblem 5 times.";

    }


    emblem.style.pointerEvents =
        "auto";


    emblem.style.opacity =
        "1";


    emblem.style.transform =
        "scale(1)";


    moveEnergyEmblem();

}


function energyHit() {

    if (
        state.currentLayer !==
        "layerEnergy"
    ) {

        return;

    }


    if (
        state.energyScore >= 5
    ) {

        return;

    }


    state.energyScore++;


    playClick();


    updateEnergyScore();


    if (
        state.energyScore < 5
    ) {

        moveEnergyEmblem();

    }

}


function updateEnergyScore() {

    const score =
        get("energyScore");


    const feedback =
        get("energyFeedback");


    const messages = [

        "✦ Nice.",

        "✦ Okayyy.",

        "✦ You're getting serious.",

        "✦ THERE WE GO.",

        "✦ ENERGY CONFIRMED 🔥"

    ];


    if (score) {

        score.textContent =
            `${state.energyScore} / 5`;

    }


    if (feedback) {

        feedback.textContent =
            messages[
                state.energyScore - 1
            ] || "";

    }


    if (
        state.energyScore >= 5
    ) {

        const emblem =
            get("movingEmblem");


        if (emblem) {

            emblem.style.pointerEvents =
                "none";


            emblem.style.opacity =
                "0";


            emblem.style.transform =
                "scale(1.4)";

        }


        playSuccess();


        setTimeout(() => {

            showLayer(
                "layerImportantQuestion"
            );

        }, 900);

    }

}


function moveEnergyEmblem() {

    const arena =
        get("energyArena");


    const emblem =
        get("movingEmblem");


    if (!arena || !emblem) {
        return;
    }


    const arenaWidth =
        arena.clientWidth;


    const arenaHeight =
        arena.clientHeight;


    const emblemWidth =
        emblem.offsetWidth || 64;


    const emblemHeight =
        emblem.offsetHeight || 64;


    const padding =
        35;


    const availableWidth =
        Math.max(
            1,
            arenaWidth -
            emblemWidth -
            padding * 2
        );


    const availableHeight =
        Math.max(
            1,
            arenaHeight -
            emblemHeight -
            padding * 2
        );


    const x =
        padding +
        Math.random() *
        availableWidth;


    const y =
        padding +
        Math.random() *
        availableHeight;


    emblem.style.left =
        `${x}px`;


    emblem.style.top =
        `${y}px`;

}


/* =========================================================
   13. VIBE QUESTION
   ========================================================= */

function setupVibeQuestion() {

    const options =
        $$(".vibe-option");


    if (!options.length) {
        return;
    }


    options.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                if (
                    state.vibeAnswered
                ) {

                    return;

                }


                const answer =
                    option.dataset.answer;


                if (!answer) {
                    return;
                }


                state.vibeAnswered =
                    true;


                options.forEach(item => {

                    item.classList.remove(
                        "selected"
                    );


                    item.disabled =
                        true;

                });


                option.classList.add(
                    "selected"
                );


                handleVibeAnswer(
                    answer
                );

            }
        );

    });

}


function handleVibeAnswer(
    answer
) {

    const feedback =
        get("vibeFeedback");


    let message =
        "";


    switch (answer) {

        case "A":

            message =
                "Good vibes accepted. But we expected a little more. 😌";

            break;


        case "B":

            message =
                "Energy detected. Respect. 🔥";

            break;


        case "C":

            message =
                "Honestly... snacks are always valid. 🍕";

            break;


        case "D":

            message =
                "CORRECT. Finally, someone understands the assignment. 😭🔥";

            break;


        default:

            message =
                "Interesting choice.";

    }


    if (feedback) {

        feedback.textContent =
            message;

    }


    playSuccess();


    setTimeout(() => {

        if (
            verifyAllRequirements()
        ) {

            showLayer(
                "layerFinalVerification"
            );


            runFinalVerification();

        }

        else {

            showNotification(
                "Verification requirements are incomplete."
            );

        }

    }, 1400);

}


/* =========================================================
   14. REQUIREMENT CHECK
   ========================================================= */

function verifyAllRequirements() {

    return (

        state.identityConfirmed &&

        state.invitationAccepted &&

        state.happiness >= 70 &&

        state.smileConfirmed &&

        state.energyScore >= 5 &&

        state.vibeAnswered

    );

}


/* =========================================================
   15. FINAL VERIFICATION
   ========================================================= */

function runFinalVerification() {

    if (
        state.verificationRunning
    ) {

        return;

    }


    if (
        !verifyAllRequirements()
    ) {

        showNotification(
            "Verification incomplete."
        );

        return;

    }


    state.verificationRunning =
        true;


    state.finalApproved =
        false;


    const checks = [

        {
            id: "verifyIdentity",
            delay: 400
        },

        {
            id: "verifyInvitation",
            delay: 900
        },

        {
            id: "verifyEnergy",
            delay: 1400
        },

        {
            id: "verifyHappiness",
            delay: 1900
        },

        {
            id: "verifyVibes",
            delay: 2400
        },

        {
            id: "verifyCommitment",
            delay: 2900
        }

    ];


    checks.forEach(check => {

        const element =
            get(check.id);


        if (!element) {
            return;
        }


        element.style.opacity =
            "0";


        element.style.transform =
            "translateX(-10px)";


        element.style.transition =
            "all 0.4s ease";


        setTimeout(() => {

            element.style.opacity =
                "1";


            element.style.transform =
                "translateX(0)";


            playTerminalTick();

        }, check.delay);

    });


    setTimeout(() => {

        const status =
            get(
                "verificationStatus"
            );


        if (status) {

            status.textContent =
                "STATUS: APPROVED";


            status.style.color =
                "var(--success)";

        }


        state.finalApproved =
            true;


        playSuccess();

    }, 3500);


    setTimeout(() => {

        if (
            state.finalApproved
        ) {

            showLayer(
                "layerApproved"
            );

        }


        state.verificationRunning =
            false;


    }, 4300);

}


/* =========================================================
   16. APPROVAL SCREEN
   ========================================================= */

function setupApprovalScreen() {

    const approvalLayer =
        get("layerApproved");


    if (!approvalLayer) {
        return;
    }


    /*
     * Approval is controlled by
     * runFinalVerification().
     *
     * This function exists as a
     * dedicated hook for future
     * approval-screen behaviour.
     */

}


/* =========================================================
   17. CELEBRATION
   ========================================================= */

function createCelebration() {

    const container =
        get("celebrationLayer");


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    const pieces =
        90;


    const colours = [

        "#C7A45B",

        "#D7BD82",

        "#F5F5F5",

        "#98A4B8",

        "#76531F"

    ];


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDelay =
            `${Math.random() * 1.2}s`;


        piece.style.animationDuration =
            `${2.5 +
                Math.random() * 2.2
            }s`;


        piece.style.width =
            `${4 +
                Math.random() * 6
            }px`;


        piece.style.height =
            `${8 +
                Math.random() * 12
            }px`;


        piece.style.background =
            colours[
                Math.floor(
                    Math.random() *
                    colours.length
                )
            ];


        piece.style.transform =
            `rotate(
                ${Math.random() * 360}deg
            )`;


        container.appendChild(
            piece
        );

    }


    setTimeout(() => {

        container.innerHTML =
            "";

    }, 6500);

}


/* =========================================================
   18. NOTIFICATIONS
   ========================================================= */

let notificationTimeout =
    null;


function showNotification(
    message
) {

    const notification =
        get("systemNotification");


    if (!notification) {
        return;
    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimeout
    );


    notificationTimeout =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   19. SHAKE EFFECT
   ========================================================= */

function shakeElement(
    element
) {

    if (!element) {
        return;
    }


    element.animate(

        [

            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-8px)"
            },

            {
                transform:
                    "translateX(8px)"
            },

            {
                transform:
                    "translateX(-6px)"
            },

            {
                transform:
                    "translateX(6px)"
            },

            {
                transform:
                    "translateX(0)"
            }

        ],

        {

            duration: 420,

            easing:
                "ease-out"

        }

    );

}


/* =========================================================
   20. SOUND SYSTEM
   ========================================================= */

function setupSound() {

    const soundControl =
        get("soundControl");


    if (!soundControl) {
        return;
    }


    soundControl.addEventListener(
        "click",
        () => {

            state.soundEnabled =
                !state.soundEnabled;


            updateSoundButton();


            if (
                state.soundEnabled
            ) {

                initializeAudio();

                playSuccess();

            }

        }
    );


    updateSoundButton();

}


function updateSoundButton() {

    const button =
        get("soundControl");


    if (!button) {
        return;
    }


    if (
        state.soundEnabled
    ) {

        button.textContent =
            "🔊";


        button.setAttribute(
            "aria-label",
            "Mute sound"
        );


    } else {

        button.textContent =
            "🔇";


        button.setAttribute(
            "aria-label",
            "Enable sound"
        );

    }

}


function initializeAudio() {

    if (
        state.audioContext
    ) {

        return;

    }


    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        state.audioContext =
            new AudioContext();


    } catch (error) {

        console.warn(
            "Audio could not be initialized.",
            error
        );

    }

}


function playTone(

    frequency = 440,

    duration = 0.08,

    type = "sine",

    volume = 0.025

) {

    if (
        !state.soundEnabled
    ) {

        return;

    }


    initializeAudio();


    if (
        !state.audioContext
    ) {

        return;

    }


    const context =
        state.audioContext;


    if (
        context.state ===
        "suspended"
    ) {

        context.resume();

    }


    const oscillator =
        context.createOscillator();


    const gain =
        context.createGain();


    oscillator.type =
        type;


    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(

        0,

        context.currentTime

    );


    gain.gain.linearRampToValueAtTime(

        volume,

        context.currentTime +
        0.01

    );


    gain.gain.exponentialRampToValueAtTime(

        0.001,

        context.currentTime +
        duration

    );


    oscillator.connect(
        gain
    );


    gain.connect(
        context.destination
    );


    oscillator.start();


    oscillator.stop(

        context.currentTime +
        duration

    );

}


/* =========================================================
   21. SOUND EVENTS
   ========================================================= */

function playClick() {

    playTone(

        520,

        0.06,

        "sine",

        0.02

    );

}


function playSuccess() {

    if (
        !state.soundEnabled
    ) {

        return;

    }


    playTone(

        523.25,

        0.09,

        "sine",

        0.025

    );


    setTimeout(() => {

        playTone(

            659.25,

            0.11,

            "sine",

            0.025

        );

    }, 80);


    setTimeout(() => {

        playTone(

            783.99,

            0.16,

            "sine",

            0.025

        );

    }, 160);

}


function playTerminalTick() {

    playTone(

        760,

        0.035,

        "square",

        0.012

    );

}


/* =========================================================
   22. INITIAL VISUALS
   ========================================================= */

function setupInitialVisuals() {

    const arrival =
        get("layerArrival");


    if (arrival) {

        const content =
            arrival.querySelector(
                ".layer-content"
            );


        if (content) {

            content.classList.add(
                "fade-in"
            );

        }

    }


    /*
     * Button press interaction.
     */

    $$("button").forEach(
        button => {

            button.addEventListener(
                "pointerdown",
                () => {

                    if (
                        button.disabled
                    ) {

                        return;

                    }


                    button.style.transform =
                        "scale(0.98)";

                }
            );


            button.addEventListener(
                "pointerup",
                () => {

                    button.style.transform =
                        "";

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   23. RESIZE HANDLING
   ========================================================= */

let resizeTimeout =
    null;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimeout
        );


        resizeTimeout =
            setTimeout(() => {

                if (
                    state.currentLayer ===
                    "layerEnergy"
                ) {

                    moveEnergyEmblem();

                }

            }, 150);

    }
);


/* =========================================================
   24. KEYBOARD ACCESS
   ========================================================= */

function setupKeyboardAccess() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Enter"
            ) {

                return;

            }


            const active =
                document.activeElement;


            if (
                active &&
                active.tagName ===
                "BUTTON"
            ) {

                active.click();

            }

        }
    );

}


/* =========================================================
   25. DOUBLE-CLICK PROTECTION
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        if (
            button.dataset.locked ===
            "true"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   26. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            state.audioContext
        ) {

            try {

                state.audioContext.suspend();

            } catch (error) {

                console.warn(
                    "Audio suspend failed.",
                    error
                );

            }

        }

    }
);


/* =========================================================
   27. DEBUG / PUBLIC API
   ========================================================= */

window.MonarchAurexInvitation = {

    state,

    showLayer,

    openDiscovery,

    closeDiscoveryModal,

    showNotification,

    createCelebration,

    moveEnergyEmblem,

    runFinalVerification,

    verifyAllRequirements

};


/* =========================================================
   28. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%cMONARCHAUREX",
    "font-size:24px;font-weight:bold;color:#C7A45B;"
);


console.log(
    "%cPrivate invitation system initialized.",
    "font-size:12px;color:#98A4B8;"
);


console.log(
    "%cLIHLE × MONARCHAUREX",
    "font-size:11px;color:#D7BD82;"
);

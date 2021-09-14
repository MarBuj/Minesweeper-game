export function startBtnActive() {
    let tl = gsap.timeline()
    tl.to('.startBtn', {display: 'block', duration: 1, opacity: 1})
}

export function startBtnHide() {
    let tl = gsap.timeline()
    tl.to('.startBtn', {display: 'none', duration: 0.3, opacity: 0})
}

export function infoCardActive() {
    let tl = gsap.timeline();
    tl.to('.infoCard', {display: 'block', duration: 1, opacity: 1})
    .fromTo('.card-title', {y: "-50%", opacity: 0}, {duration: 0.7, opacity: 1, y: "0%"})
    .fromTo('.list-group-item', {x: "15%", opacity: 0}, {duration: 0.5, opacity: 1, x: "0%", stagger: 0.3})
    .fromTo('.card-footer button', {y: "-25%", opacity: 0}, {duration: 0.5, opacity: 1, y: "0%", stagger: 0.3}, '-=1')
}

export function gameCardActive() {
    let tl = gsap.timeline();
    tl.to('.gameCard', {display: 'block', duration: 1, opacity: 1})
}

export function resultActive() {
    let tl = gsap.timeline();
    tl.to('.gameCard .card-footer', {display: 'block', duration: 1, opacity: 1})
    .fromTo('.card-footer button', {y: "-25%", opacity: 0}, {duration: 0.5, opacity: 1, y: "0%", stagger: 0.3}, '-=1')
}

export function cardHide() {
    let tl = gsap.timeline();
    tl.to('.card', {display: 'none', duration: 0.3, opacity: 0})
}
class XSpoiler extends HTMLElement {
    constructor() {
        super();
        this.text = {
            "when-close": "Развернуть",
            "when-open": "Свернуть"
        };
        this.innerHTML = `
            <button type = "button">${this.text["when-close"]}</button>
            <section style = "display:none;">${this.innerHTML}</section>
        `;
        this.querySelector("button").addEventListener("click", () => {
            const opened = (this.getAttribute("opened") != null);
            if (opened) {
                this.removeAttribute("opened");
            } else {
                this.setAttribute("opened", "");
            }
        });
    }
    get opened() {
        return (this.getAttribute("opened") != null);
    }
    set opened(state) {
        if (state) {
            this.setAttribute("opened", "");
        } else {
            this.removeAttribute("opened");
        }
    }
    static get observedAttributes() {
        return [
            "opened",
            "text-when-open",
            "text-when-close"
        ];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        /*eslint-disable no-case-declarations */
        switch (attrName) {
            case "opened":
                const opened = newVal != null;
                const button = this.querySelector("button");
                const content = this.querySelector("section");
                const display = opened ? "block" : "none";
                const text = this.text[opened ? "when-open" : "when-close"];
                content.style.display = display;
                button.textContent = text;
                break;
            case "text-when-open":
                this.text["when-open"] = newVal;
                if (this.opened) {
                    this.querySelector("button").textContent = newVal;
                }
                break;
            case "text-when-close":
                this.text["when-close"] = newVal;
                if (!this.opened) {
                    this.querySelector("button").textContent = newVal;
                }
                break;
        }
    }
}
customElements.define("x-spoiler", XSpoiler);
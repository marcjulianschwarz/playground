const template = `
  <div class="x-country-card-container">
    <div class="x-country-card-title">
      <p class="x-country-card-country-name"></p>
      <p class="x-country-card-capital-name">Capital: </p>
    </div>
    <img class="x-country-card-image" />
  </div>
`;

class CountryCardComponent extends HTMLElement {
  connectedCallback() {
    if (!this.querySelector(".x-country-card-container")) {
      this.innerHTML = template;
    }
    this.update();
  }

  update() {
    const countryElement = this.querySelector(".x-country-card-country-name");
    const capitalElement = this.querySelector(".x-country-card-capital-name");
    const containerElement = this.querySelector(".x-country-card-container");
    const image = this.querySelector("img");

    if (countryElement) {
      countryElement.textContent =
        this.getAttribute("country") || "Country not specified";
    }
    if (capitalElement) {
      capitalElement.textContent =
        "Capital: " + (this.getAttribute("capital") || "not specified");
    }
    if (containerElement && this.getAttribute("flag-url")) {
      image.setAttribute("src", this.getAttribute("flag-url"));
    }
  }

  showInfo() {
    const titleElement = this.querySelector(".x-country-card-title");
    if (titleElement) {
      titleElement.style.visibility = "visible";
    }
  }

  hideInfo() {
    const titleElement = this.querySelector(".x-country-card-title");
    if (titleElement) {
      titleElement.style.visibility = "hidden";
    }
  }

  toggleInfo() {
    const titleElement = this.querySelector(".x-country-card-title");
    if (titleElement) {
      if (titleElement.style.visibility === "hidden") {
        titleElement.style.visibility = "visible";
      } else {
        titleElement.style.visibility = "hidden";
      }
    }
  }

  static get observedAttributes() {
    return ["country", "capital", "flag-url", "show-info"];
  }

  attributeChangedCallback() {
    this.update();

    // Handle show-info attribute changes
    if (this.hasAttribute("show-info")) {
      const showInfo = this.getAttribute("show-info");
      const titleElement = this.querySelector(".x-country-card-title");
      if (titleElement) {
        titleElement.style.visibility =
          showInfo === "true" ? "visible" : "hidden";
      }
    }
  }
}

export const registerCountryCardComponents = () =>
  customElements.define("x-country-card", CountryCardComponent);

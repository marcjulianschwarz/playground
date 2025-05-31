class App extends HTMLElement {
  countries = [
    {
      name: "Germany",
      capital: "Berlin",
      flagURL: "/assets/flags/flag_germany.svg",
      marked: false,
    },
    {
      name: "Burundi",
      capital: "...",
      flagURL: "/assets/flags/flag_burundi.svg",
      marked: false,
    },
    {
      name: "Ivory Coast",
      capital: "Yamoussoukro",
      flagURL: "/assets/flags/flag_cote_divoire.svg",
      marked: false,
    },
  ];
  currentCountryIndex = -1;
  appStarted = true;

  connectedCallback() {
    if (this.querySelector("x-app")) return;

    this.render();
  }

  render() {
    console.log("Render");

    if (!this.appStarted) {
      this.innerHTML = `
      <div class="x-app">
        <button class="x-button">Start Game</button>
      </div> 
      `;
      this.querySelector("button").addEventListener("click", () => {
        this.appStarted = true;
        this.render();
        this.nextCountry();
      });
      return;
    }

    this.innerHTML = `
      <div class="x-app">
        <div class="country-cards-container">
          <x-country-card style="display: none;"></x-country-card>
          <div class="navigation-container">
            <button class="x-button" id="mark">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path id="bookmark-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 21l-7-4l-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button class="x-button" id="answer">Answer</button>
            <button class="x-button" id="skip">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.nextCountry();
  }

  setupEventListeners() {
    this.querySelector("#skip").addEventListener("click", () => {
      this.nextCountry();
    });

    this.querySelector("#answer").addEventListener("click", () => {
      this.showInfo();
    });

    this.querySelector("#mark").addEventListener("click", () => {
      this.toggleMarkCountry();
    });
  }

  toggleMarkCountry() {
    if (this.currentCountryIndex === -1) return;

    this.countries[this.currentCountryIndex].marked =
      !this.countries[this.currentCountryIndex].marked;

    this.updateBookmarkIcon();
  }

  updateBookmarkIcon() {
    if (this.currentCountryIndex === -1) return;

    const isMarked = this.countries[this.currentCountryIndex].marked;
    const bookmarkIcon = this.querySelector("#bookmark-icon");

    if (bookmarkIcon) {
      bookmarkIcon.setAttribute("fill", isMarked ? "#BF7530" : "none");
    }
  }

  showInfo() {
    const countryCard = this.querySelector("x-country-card");
    countryCard.showInfo();
    console.log("Show Info");
  }

  nextCountry() {
    if (this.currentCountryIndex < this.countries.length) {
      this.currentCountryIndex += 1;
    }
    if (this.currentCountryIndex === this.countries.length) {
      this.currentCountryIndex = 0;
    }

    if (this.currentCountryIndex === -1) return;

    const countryCard = this.querySelector("x-country-card");
    const currentCountry = this.countries[this.currentCountryIndex];

    countryCard.setAttribute("country", currentCountry.name);
    countryCard.setAttribute("capital", currentCountry.capital);
    countryCard.setAttribute("flag-url", currentCountry.flagURL);
    countryCard.setAttribute("show-info", false);

    countryCard.style.display = "block";

    // Update the bookmark icon when switching to a new country
    this.updateBookmarkIcon();
  }
}

export const registerApp = () => customElements.define("x-app", App);

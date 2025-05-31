import { registerApp } from "./app/app.js";
import { registerCountryCardComponents } from "./components/countrycard/countrycard.js";
const app = () => {
  registerCountryCardComponents();
  registerApp();
};
document.addEventListener("DOMContentLoaded", app);

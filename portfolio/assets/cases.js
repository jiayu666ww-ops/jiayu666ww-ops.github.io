(() => {
  const example = document.querySelector(".casebook-calculator");
  if (!example) return;

  const slider = example.querySelector("input");
  const pending = example.querySelector("[data-unfinished]");
  const rate = example.querySelector("[data-inclusive]");
  const calculation = example.querySelector("[data-inclusive-math]");

  const showRate = () => {
    const successful = 80;
    const failed = 10;
    const total = successful + failed + Number(slider.value);
    pending.textContent = slider.value;
    rate.textContent = (100 * successful / total).toFixed(1) + "%";
    calculation.textContent = successful + " ÷ " + total;
    slider.setAttribute("aria-valuetext", slider.value + " 笔未完成订单");
  };

  slider.addEventListener("input", showRate);
  showRate();
  example.querySelector(".casebook-slider").hidden = false;
})();

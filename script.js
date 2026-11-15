
const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            display.value = "";
        }

        else if (action === "delete") {
            display.value = display.value.slice(0, -1);
        }

        else if (action === "calculate") {
            calculate();
        }

        else if (value === "%") {
            if (display.value !== "") {
                display.value = String(Number(display.value) / 100);
            }
        }

        else if (value !== undefined) {
            display.value += value;
        }

    });

});

function calculate() {

    try {

        const expression = display.value;

        if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = String(
                Number(result.toFixed(10))
            );
        }

    }

    catch {
        display.value = "Error";
    }

}

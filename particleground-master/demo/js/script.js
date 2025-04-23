$(document).ready(function () {
    $('#particles').particleground({
        dotColor: '#fdfefe',
        lineColor: ' #a9cce3 '
    });
    
    // Animate calculator elements
    const elements = [
        ...document.querySelectorAll(".calculator-input"),
        ...document.querySelectorAll(".calculator-button")
    ];

    elements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("animate");
        }, i * 100);
    });
});

const displayExpression = document.getElementById("expression");
const displayResult = document.getElementById("result");
const historyContainer = document.getElementById("history");
const buttons = document.querySelectorAll(".calculator-button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value || button.textContent.trim();

        if (button.dataset.action === "clear") {
            expression = "";
            displayExpression.value = "";
            displayResult.value = "0";
            return;
        }

        if (button.dataset.action === "clear-entry") {
            expression = expression.slice(0, -1);
            displayExpression.value = expression;
            return;
        }

        if (value === "=") {
            try {
                let evalExpr = expression
                    .replace(/cos\(/g, "Math.cos(")
                    .replace(/sin\(/g, "Math.sin(")
                    .replace(/tan\(/g, "Math.tan(")
                    .replace(/sqrt\(/g, "Math.sqrt(")
                    .replace(/%/g, "/100");
                let result = eval(evalExpr);
                displayResult.value = result;

                var historyitem = document.createElement('div')
                historyitem.innerText = `${expression}=${result}`
                historyitem.classList.add('history-item');
                var allhistory = document.getElementById('history')
                allhistory.classList.add('history');
                allhistory.appendChild(historyitem)

            } catch {
                displayResult.value = "Error";
            }
            return;
        }

        expression += value;
        displayExpression.value = expression;
    });
});

document.getElementById("convert-btn").addEventListener("click", function () {
    const input = parseFloat(document.getElementById("unit-input").value);
    const type = document.getElementById("unit-type").value;
    const resultDisplay = document.getElementById("unit-result");
    let result;

    if (isNaN(input)) {
        resultDisplay.textContent = "Please enter a valid number.";
        return;
    }

    switch (type) {
        case "cm-to-in":
            result = input / 2.54;
            break;
        case "in-to-cm":
            result = input * 2.54;
            break;
        case "kg-to-lb":
            result = input * 2.20462;
            break;
        case "lb-to-kg":
            result = input / 2.20462;
            break;
        case "c-to-f":
            result = (input * 9 / 5) + 32;
            break;
        case "f-to-c":
            result = (input - 32) * 5 / 9;
            break;
        default:
            result = "Error";
    }

    resultDisplay.textContent = `Result: ${result.toFixed(2)}`;
});

// Time Converter Functions
const timeZones = [
    { label: "New York (EST)", zone: "America/New_York" },
    { label: "London (GMT)", zone: "Europe/London" },
    { label: "Paris (CET)", zone: "Europe/Paris" },
    { label: "Tokyo (JST)", zone: "Asia/Tokyo" },
    { label: "Sydney (AEST)", zone: "Australia/Sydney" },
    { label: "Dubai (GST)", zone: "Asia/Dubai" },
];

function populateZones() {
    const fromSelect = document.getElementById("fromZone");
    const toSelect = document.getElementById("toZone");
    
    timeZones.forEach(({ label, zone }) => {
        let option1 = new Option(label, zone);
        let option2 = new Option(label, zone);
        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });
    
    // Default values
    fromSelect.value = "America/New_York";
    toSelect.value = "Asia/Tokyo";
}

function convertTime() {
    const fromZone = document.getElementById("fromZone").value;
    const toZone = document.getElementById("toZone").value;
    const inputTime = document.getElementById("inputTime").value;
    
    if (!inputTime) {
        document.getElementById("convertedTime").innerText = "Please enter a time.";
        return;
    }
    
    // Use today's date with selected time
    const [hours, minutes] = inputTime.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    
    // Convert using Intl.DateTimeFormat
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: toZone,
    };
    
    const converted = new Intl.DateTimeFormat('en-US', options).format(date);
    document.getElementById("convertedTime").innerText = `Converted Time: ${converted}`;
}

window.onload = function () {
    populateZones();

    // Map sections to their corresponding keys (must match the alt attributes exactly)
    const sections = {
        history: document.querySelector('.history'),
        'unit-Converter': document.querySelector('.unit-converter'), // matches alt="unit-Converter"
        timeConverter: document.querySelector('.time-converter'), // matches alt="timeConverter"
    };

    // Initially hide all sections except the calculator
    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = 'none';
    });

    // Select all navigation links
    const navLinks = document.querySelectorAll('.menu li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the target section from the `alt` attribute
            const target = link.getAttribute('alt');

            if (target && sections[target]) {
                // Toggle visibility of the target section
                const section = sections[target];
                const isCurrentlyVisible = section.style.display === 'block';

                // Hide all sections first
                Object.values(sections).forEach(sec => {
                    if (sec) sec.style.display = 'none';
                });

                // Show the target section if it was not already visible
                if (!isCurrentlyVisible) {
                    section.style.display = 'block';
                }
            }
        });
    });
};
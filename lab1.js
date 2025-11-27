let arrFlights = [];

arrFlights[0] = {
    number: "PS101",
    origin: "Кишинів",
    destination: "Лондон",
    departureTime: "07:30",
    durationMinutes: 210
};

arrFlights[1] = {
    number: "PS202",
    origin: "Варшава",
    destination: "Нью-Йорк",
    departureTime: "23:15",
    durationMinutes: 600
};

arrFlights[2] = {
    number: "PS303",
    origin: "Львів",
    destination: "Париж",
    departureTime: "11:00",
    durationMinutes: 310
};

arrFlights[3] = {
    number: "PS404",
    origin: "Одеса",
    destination: "Стамбул",
    departureTime: "14:45",
    durationMinutes: 90
};

arrFlights[4] = {
    number: "PS505",
    origin: "Харків",
    destination: "Прага",
    departureTime: "16:00",
    durationMinutes: 500
};

arrFlights[5] = {
    number: "PS606",
    origin: "Київ",
    destination: "Париж",
    departureTime: "18:20",
    durationMinutes: 420
};

arrFlights[6] = {
    number: "PS707",
    origin: "Вроцлав",
    destination: "Рим",
    departureTime: "20:10",
    durationMinutes: 65
};

arrFlights[7] = {
    number: "PS808",
    origin: "Київ",
    destination: "Пекін",
    departureTime: "04:15",
    durationMinutes: 829
};

function getFlightStatusSimple(f) {
    let now = new Date();
    let [h, m] = f.departureTime.split(":").map(Number);

    let dep = new Date();
    dep.setHours(h, m, 0, 0);

    let arr = new Date(dep.getTime() + f.durationMinutes * 60000);

    if (now < dep) {
        let mins = Math.floor((dep - now) / 60000);
        let hoursLeft = Math.floor(mins / 60);
        let minutesLeft = mins % 60;

        return {
            status: "Ще не вилетів",
            color: "#9be79b",
            timeLeft: `${hoursLeft} год ${minutesLeft} хв`
        };
    }
    else if (now >= dep && now <= arr) {
        return {
            status: "У повітрі",
            color: "lightskyblue",
            timeLeft: "—"
        };
    }
    else {
        return {
            status: "Завершено",
            color: "#ff8282",
            timeLeft: "—"
        };
    }
}

function fillSelects() {
    let originSel = document.getElementById("origin-select");
    let destSel = document.getElementById("destination-select");

    let origins = [...new Set(arrFlights.map(f => f.origin))];
    let dests = [...new Set(arrFlights.map(f => f.destination))];

    origins.forEach(o => {
        originSel.innerHTML += `<option value="${o}">${o}</option>`;
    });

    dests.forEach(d => {
        destSel.innerHTML += `<option value="${d}">${d}</option>`;
    });
}

function formatDuration(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    return `${h} год ${m} хв`;
}

function showFlightsTable() {
    let tbody = document.getElementById("flights-body");
    tbody.innerHTML = "";

    let originFilter = document.getElementById("origin-select").value;
    let destFilter = document.getElementById("destination-select").value;

    let found = 0;

    arrFlights.forEach(f => {
        if (originFilter !== "all" && f.origin !== originFilter) return;
        if (destFilter !== "all" && f.destination !== destFilter) return;

        found++;

        let info = getFlightStatusSimple(f);

        let row = `
            <tr style="background:${info.color}">
                <td>${f.number}</td>
                <td>${f.origin}</td>
                <td>${f.destination}</td>
                <td>${f.departureTime}</td>
                <td>${formatDuration(f.durationMinutes)}</td>
                <td>${info.status}</td>
                <td>${info.timeLeft}</td>
            </tr>
        `;

        tbody.innerHTML += row;
    });

    if (found === 0)
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center">Рейс не знайдено</td>
            </tr>
        `;
}

document.addEventListener("DOMContentLoaded", () => {
    fillSelects();
    showFlightsTable();

    document.getElementById("origin-select").onchange = showFlightsTable;
    document.getElementById("destination-select").onchange = showFlightsTable;

    document.getElementById("reset-filters").onclick = function () {
        document.getElementById("origin-select").value = "all";
        document.getElementById("destination-select").value = "all";
        showFlightsTable();
    };
});
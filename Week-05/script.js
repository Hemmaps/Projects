let appointments = [];

let doctors = {
    "dr-smith": ["10.00 AM", "11.00 AM", "1.00 PM"],
    "dr-johnson": ["11.30 AM", "12.30 PM"],
    "dr-lea":["9.00 AM","10.00 AM","11.00 AM","12.30 PM","3.00 PM"]
};

document.getElementById("doctor-select").addEventListener("change", generateTimeSlots);
document.getElementById("date").addEventListener("change", generateTimeSlots);

function bookAppointment() {
    const name = document.getElementById("name").value;
    const doctor = document.getElementById("doctor-select").value;
    const date = document.getElementById("date").value;
    const selectedSlot = document.querySelector(".times.selected");
    const time = selectedSlot ? selectedSlot.innerHTML : null;
    const phoneNo = document.getElementById("telephone").value;

    if (name && doctor && date && time && phoneNo) {
        if (isSlotBooked(doctor, date, time)) {
            alert("This time slot is already booked for the selected doctor.");
        } else {
            let appoints = {
                name: name,
                doctor: doctor,
                date: date,
                time: time,
                phoneNo: phoneNo
            };
            appointments.push(appoints);
            document.getElementById("booking-details").reset();
            alert("Appointment booked successfully!");
            selectedSlot.classList.add("booked");
            selectedSlot.classList.remove("selected");
            displayAppointments();
            generateTimeSlots();
            displayDoctorInformation();
        }
    }
    return false;
}

function generateTimeSlots() {
    let doctor = document.getElementById("doctor-select").value;
    let date = document.getElementById("date").value;
    let timeContainer = document.getElementById("time-slots");

    timeContainer.innerHTML = "";

    if (doctor && date) {
        doctors[doctor].forEach(slot => {
            const button = document.createElement("button");
            button.innerText = slot;
            button.className = "times";
            button.type = "button";
            button.addEventListener("click", () => {
                selectTimeSlots(button);
            });
            if (isSlotBooked(doctor, date, slot)) {
                button.classList.add("booked");
                button.disabled = true;
            }
            timeContainer.appendChild(button);
        });
    }
}

function selectTimeSlots(button) {
    const selectedSlot = document.querySelector(".times.selected");

    if (selectedSlot) {
        selectedSlot.classList.remove("selected");
    }
    button.classList.add("selected");
}

function isSlotBooked(doctor, date, slot) {
    return appointments.some(appoint => appoint.doctor === doctor && appoint.date === date && appoint.time === slot);
}

function displayAppointments() {
    const display = document.getElementById("view");
    display.innerHTML = '';

    appointments.forEach((details, index) => {
        const doctorName = details.doctor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const appointment = `
            <div>
                <span class="bold">ID:</span> ${index + 1}<br>
                <span class="bold">Name:</span> ${details.name}<br>
                <span class="bold">Doctor:</span> ${doctorName}<br>
                <span class="bold">Date:</span> ${details.date}<br>
                <span class="bold">Time:</span> ${details.time}<br>
                <span class="bold">Phone:</span> ${details.phoneNo}<br><br>
            </div>
        `;
        display.innerHTML += appointment;
    });
}

document.getElementById("cancel").addEventListener("click", cancelAppointment);

function cancelAppointment() {
    let idNumber = Number(document.getElementById("idNumber").value);

    if (idNumber > 0 && idNumber <= appointments.length) {
        appointments.splice(idNumber - 1, 1);
        alert("Appointment canceled.");
    }

    displayAppointments();
    generateTimeSlots();
    displayDoctorInformation();
}

function displayDoctorInformation() {
    const doctorCards = document.getElementById("doctor-cards");
    doctorCards.innerHTML = "";

    Object.keys(doctors).forEach(doctor => {
        const card = document.createElement("div");
        card.className = "doctor-card";

        const doctorName = doctor.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const totalSlots = doctors[doctor].length;
        const bookedSlots = appointments.filter(appoint => appoint.doctor === doctor).length;
        const availableSlots = totalSlots - bookedSlots;

        card.innerHTML = `
            <h3>${doctorName}</h3>
            <p><strong>Total Slots:</strong> ${totalSlots}</p>
            <p><strong>Available Slots:</strong> ${availableSlots}</p>
            <p><strong>Booked Slots:</strong> ${bookedSlots}</p>
        `;
        doctorCards.appendChild(card);
    });
}

displayDoctorInformation();
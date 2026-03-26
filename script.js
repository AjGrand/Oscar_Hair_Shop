const appointmentForm = document.getElementById("appointmentForm");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const availabilityHint = document.getElementById("availabilityHint");
const formMessage = document.getElementById("formMessage");
const lastBooking = document.getElementById("lastBooking");
const languageSelect = document.getElementById("languageSelect");
const BOOKING_EMAIL = "oscar.cepedagrnd@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;
const LANGUAGE_STORAGE_KEY = "hairParlorLanguage";

const translations = {
  en: {
    languageLabel: "Language",
    brand: "Grizzly Barbershop",
    bookNow: "Book Now",
    heroEyebrow: "Fresh looks. Friendly service.",
    heroTitle: "Book your next hair appointment in under a minute.",
    heroLead:
      "Professional cuts, styling, and grooming in a relaxing atmosphere. Choose your service, pick a time, and we’ll take care of the rest.",
    setAppointment: "Set Appointment",
    businessHours: "Business Hours",
    mondayFriday: "Monday – Friday:",
    weekdayHours: "1:00 PM – 9:00 PM",
    saturday: "Saturday:",
    sunday: "Sunday:",
    appointmentOnly: "Appointment only",
    weekendNote: "Weekend requests are reviewed and confirmed by staff."
  },
  "es-MX": {
    languageLabel: "Idioma",
    brand: "Grizzly Barbershop",
    bookNow: "Reservar",
    heroEyebrow: "Estilo fresco. Atención amable.",
    heroTitle: "Agenda tu próxima cita en menos de un minuto.",
    heroLead:
      "Cortes, peinados y arreglo profesional en un ambiente relajado. Elige tu servicio, selecciona tu horario y nosotros nos encargamos del resto.",
    setAppointment: "Agendar Cita",
    businessHours: "Horario",
    mondayFriday: "Lunes – Viernes:",
    weekdayHours: "1:00 PM – 9:00 PM",
    saturday: "Sábado:",
    sunday: "Domingo:",
    appointmentOnly: "Solo con cita",
    weekendNote: "Las solicitudes de fin de semana se revisan y confirman por el equipo."
  }
};

let activeLanguage = "en";

const WEEKDAY_OPEN_MINUTES = 13 * 60; // 1:00 PM
const WEEKDAY_CLOSE_MINUTES = 21 * 60; // 9:00 PM

function setDefaultDateLimit() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function applyTranslations(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
}

function initializeLanguage() {
  if (!languageSelect) return;

  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  activeLanguage = translations[savedLanguage] ? savedLanguage : "en";
  languageSelect.value = activeLanguage;
  applyTranslations(activeLanguage);

  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    activeLanguage = translations[selectedLanguage] ? selectedLanguage : "en";
    localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage);
    applyTranslations(activeLanguage);
  });
}

function formatDateReadable(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getDayType(dateStr) {
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6 ? "weekend" : "weekday";
}

function toMinutes(timeValue) {
  const [hour, minute] = timeValue.split(":").map(Number);
  return hour * 60 + minute;
}

function updateAvailabilityHint() {
  if (!dateInput.value) {
    availabilityHint.textContent =
      "Select a date to see booking rules and suggested appointment times.";
    return;
  }

  const dayType = getDayType(dateInput.value);

  if (dayType === "weekday") {
    availabilityHint.textContent =
      "Weekday booking hours: 1:00 PM to 9:00 PM. Please choose a time in that range.";
  } else {
    availabilityHint.textContent =
      "Weekend is appointment-only. Submit your request and the team will confirm availability.";
  }
}

function displayLastBooking() {
  const bookings = JSON.parse(localStorage.getItem("hairParlorBookings") || "[]");
  const latest = bookings[bookings.length - 1];

  if (!latest) {
    lastBooking.textContent = "No recent booking yet — your next style starts here.";
    return;
  }

  lastBooking.innerHTML = `
    <strong>Most recent booking:</strong><br />
    ${latest.name} • ${latest.service}<br />
    ${latest.dateReadable} at ${latest.time}
  `;
}

function displayUpcomingAppointments() {
  const bookings = JSON.parse(localStorage.getItem("hairParlorBookings") || "[]");
  const appointmentsList = document.getElementById("appointmentsList");

  if (!appointmentsList) return;

  // Sort by date and time
  const sortedBookings = bookings
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    })
    .slice(0, 30); // Limit to 30 appointments

  if (sortedBookings.length === 0) {
    appointmentsList.innerHTML = '<div class="appointments-empty">No upcoming appointments yet.</div>';
    return;
  }

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Service</th>
          <th>Date</th>
          <th>Time</th>
          <th>Phone</th>
          <th>Stylist</th>
        </tr>
      </thead>
      <tbody>
  `;

  sortedBookings.forEach((booking) => {
    const stylist = booking.stylist || "—";
    tableHTML += `
      <tr>
        <td>${booking.name}</td>
        <td>${booking.service}</td>
        <td>${booking.dateReadable}</td>
        <td>${booking.time}</td>
        <td>${booking.phone}</td>
        <td>${stylist}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  appointmentsList.innerHTML = tableHTML;
}

function setFormMessage(message, type) {
  formMessage.className = `form-message ${type}`;
  formMessage.textContent = message;
}

function buildEmailPayload(payload) {
  const stylistText = payload.stylist ? payload.stylist : "No preference";
  const notesText = payload.notes ? payload.notes : "No notes";
  const dateReadable = formatDateReadable(payload.date);

  return {
    _subject: `New Appointment Request - ${payload.name}`,
    _cc: "ajgrand2k@outlook.com,oscar.cepedagrnd@gmail.com",
    Name: payload.name,
    Phone: payload.phone,
    Email: payload.email,
    Service: payload.service,
    "Preferred Stylist": stylistText,
    Date: `${dateReadable} (${payload.date})`,
    Time: payload.time,
    Notes: notesText,
    "Submitted At": new Date().toLocaleString()
  };
}

async function sendAppointmentToEmail(payload) {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      ...buildEmailPayload(payload),
      _captcha: "false",
      _template: "table"
    })
  });

  if (!response.ok) {
    throw new Error("Email delivery failed");
  }
}

function openMailtoFallback(payload) {
  const subject = encodeURIComponent(`Appointment Request - ${payload.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Service: ${payload.service}`,
      `Preferred Stylist: ${payload.stylist || "No preference"}`,
      `Date: ${formatDateReadable(payload.date)} (${payload.date})`,
      `Time: ${payload.time}`,
      `Notes: ${payload.notes || "No notes"}`
    ].join("\n")
  );

  window.location.href = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
}

function validateAppointment(dateValue, timeValue) {
  const dayType = getDayType(dateValue);

  if (dayType === "weekday") {
    const appointmentMinutes = toMinutes(timeValue);
    const inRange =
      appointmentMinutes >= WEEKDAY_OPEN_MINUTES &&
      appointmentMinutes <= WEEKDAY_CLOSE_MINUTES;

    if (!inRange) {
      return {
        valid: false,
        message: "Weekday appointments must be between 1:00 PM and 9:00 PM."
      };
    }

    return {
      valid: true,
      message: "Great choice. Your weekday appointment request is ready to submit."
    };
  }

  return {
    valid: true,
    message:
      "Weekend request submitted. Our team will confirm your appointment time shortly."
  };
}

appointmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(appointmentForm);
  const payload = Object.fromEntries(formData.entries());

  if (!appointmentForm.checkValidity()) {
    setFormMessage("Please fill out all required fields before submitting.", "error");
    appointmentForm.reportValidity();
    return;
  }

  const validation = validateAppointment(payload.date, payload.time);

  if (!validation.valid) {
    setFormMessage(validation.message, "error");
    return;
  }

  const bookingRecord = {
    ...payload,
    dateReadable: formatDateReadable(payload.date)
  };

  const existingBookings = JSON.parse(localStorage.getItem("hairParlorBookings") || "[]");
  existingBookings.push(bookingRecord);
  localStorage.setItem("hairParlorBookings", JSON.stringify(existingBookings));

  const submitButton = appointmentForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    await sendAppointmentToEmail(payload);
    setFormMessage(
      `Thanks, ${payload.name}! ${validation.message} Your request was emailed to ${BOOKING_EMAIL}.`,
      "success"
    );
    appointmentForm.reset();
    updateAvailabilityHint();
    displayLastBooking();
    displayUpcomingAppointments();
  } catch (error) {
    setFormMessage(
      "We couldn't auto-send right now. Your email app will open so you can send the request manually.",
      "error"
    );
    openMailtoFallback(payload);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Confirm Appointment";
  }
});

dateInput.addEventListener("change", updateAvailabilityHint);

document.getElementById("year").textContent = new Date().getFullYear();

setDefaultDateLimit();
initializeLanguage();
updateAvailabilityHint();
displayLastBooking();
displayUpcomingAppointments();

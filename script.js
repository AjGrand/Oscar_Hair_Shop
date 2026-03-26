const appointmentForm = document.getElementById("appointmentForm");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const availabilityHint = document.getElementById("availabilityHint");
const formMessage = document.getElementById("formMessage");
const lastBooking = document.getElementById("lastBooking");
const languageSelect = document.getElementById("languageSelect");
const serviceSelect = document.getElementById("service");
const languagePrompt = document.getElementById("languagePrompt");
const BOOKING_EMAIL = "oscar.cepedagrnd@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;
const LANGUAGE_STORAGE_KEY = "hairParlorLanguage";
const LANGUAGE_PREFERENCE_KEY = "hairParlorLanguagePreference";
const LANGUAGE_PROMPT_SEEN_KEY = "hairParlorLanguagePromptSeen";

const translations = {
  en: {
    documentTitle: "Grizzly Barbershop | Book an Appointment",
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
    weekendNote: "Weekend requests are reviewed and confirmed by staff.",
    servicesTitle: "Barber Services & Prices",
    serviceVipTitle: "VIP Cut",
    serviceVipDesc: "Haircut, beard service, and facial treatments.",
    serviceCutBeardTitle: "Cut & Beard",
    serviceCutBeardDesc: "A clean haircut paired with beard detailing.",
    serviceHaircutTitle: "Haircut",
    serviceHaircutDesc: "Fresh barber cut crafted to your style.",
    serviceBeardShaveTitle: "Beard Shave",
    serviceBeardShaveDesc: "Clean shave service for a polished finish.",
    serviceFacialTitle: "Facial Treatments",
    serviceFacialDesc: "Refresh and care for your skin with facial treatment service.",
    serviceBeardDesignTitle: "Beard Design & Line Up",
    serviceBeardDesignDesc: "Shape, define, and sharpen your beard lines.",
    upcomingAppointments: "Upcoming Appointments",
    bookingTitle: "Set an Appointment",
    bookingSubtitle: "Fill out the form and we’ll reserve your slot.",
    labelFullName: "Full Name",
    placeholderName: "Your name",
    labelPhone: "Phone",
    labelEmail: "Email",
    placeholderEmail: "you@email.com",
    labelService: "Service",
    serviceSelectPrompt: "Select a service",
    labelStylist: "Preferred Stylist",
    placeholderStylist: "Optional",
    labelDate: "Appointment Date",
    labelTime: "Appointment Time",
    labelNotes: "Notes",
    placeholderNotes: "Anything we should know?",
    bookingEmailNote: "Appointment requests are sent directly to our booking email for confirmation.",
    confirmAppointment: "Confirm Appointment",
    bookingTipsTitle: "Booking Tips",
    bookingTipOne: "Weekday online slots are available from 1:00 PM to 9:00 PM.",
    bookingTipTwo: "Saturday and Sunday requests are appointment-only and subject to confirmation.",
    bookingTipThree: "Please provide a working phone number for quick confirmation.",
    footerPrefix: "©",
    footerTagline: "Look sharp, feel sharper.",
    hintSelectDate: "Select a date to see booking rules and suggested appointment times.",
    hintWeekday: "Weekday booking hours: 1:00 PM to 9:00 PM. Please choose a time in that range.",
    hintWeekend: "Weekend is appointment-only. Submit your request and the team will confirm availability.",
    noRecentBooking: "No recent booking yet — your next style starts here.",
    latestBookingLabel: "Most recent booking:",
    bookingAt: "at",
    appointmentsEmpty: "No upcoming appointments yet.",
    tableName: "Name",
    tableService: "Service",
    tableDate: "Date",
    tableTime: "Time",
    tablePhone: "Phone",
    tableStylist: "Stylist",
    noPreference: "No preference",
    noNotes: "No notes",
    missingFields: "Please fill out all required fields before submitting.",
    invalidWeekdayTime: "Weekday appointments must be between 1:00 PM and 9:00 PM.",
    validWeekdayTime: "Great choice. Your weekday appointment request is ready to submit.",
    validWeekendTime: "Weekend request submitted. Our team will confirm your appointment time shortly.",
    sending: "Sending...",
    successMessage: `Thanks, {name}! {validationMessage} Your request was emailed to ${BOOKING_EMAIL}.`,
    fallbackMessage: "We couldn't auto-send right now. Your email app will open so you can send the request manually.",
    service_vip: "VIP Cut - $300",
    service_cutBeard: "Cut & Beard - $200",
    service_haircut: "Haircut - $150",
    service_beardShave: "Beard Shave - $100",
    service_facial: "Facial Treatments - $100",
    service_beardDesign: "Beard Design & Line Up - $80"
  },
  "es-MX": {
    documentTitle: "Grizzly Barbershop | Agenda una cita",
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
    weekendNote: "Las solicitudes de fin de semana se revisan y confirman por el equipo.",
    servicesTitle: "Servicios de barbería y precios",
    serviceVipTitle: "Corte VIP",
    serviceVipDesc: "Corte, barba y tratamientos faciales.",
    serviceCutBeardTitle: "Corte y Barba",
    serviceCutBeardDesc: "Un corte limpio acompañado de arreglo de barba.",
    serviceHaircutTitle: "Corte de cabello",
    serviceHaircutDesc: "Corte de barbería fresco hecho a tu estilo.",
    serviceBeardShaveTitle: "Afeitado de barba",
    serviceBeardShaveDesc: "Servicio de afeitado limpio para un acabado impecable.",
    serviceFacialTitle: "Tratamientos faciales",
    serviceFacialDesc: "Refresca y cuida tu piel con tratamiento facial.",
    serviceBeardDesignTitle: "Diseño y Perfilado de barba",
    serviceBeardDesignDesc: "Da forma, define y perfila tu barba.",
    upcomingAppointments: "Próximas citas",
    bookingTitle: "Agendar una cita",
    bookingSubtitle: "Llena el formulario y apartaremos tu horario.",
    labelFullName: "Nombre completo",
    placeholderName: "Tu nombre",
    labelPhone: "Teléfono",
    labelEmail: "Correo electrónico",
    placeholderEmail: "tu@correo.com",
    labelService: "Servicio",
    serviceSelectPrompt: "Selecciona un servicio",
    labelStylist: "Barbero de preferencia",
    placeholderStylist: "Opcional",
    labelDate: "Fecha de la cita",
    labelTime: "Hora de la cita",
    labelNotes: "Notas",
    placeholderNotes: "¿Hay algo que debamos saber?",
    bookingEmailNote: "Las solicitudes de cita se envían directamente a nuestro correo de reservaciones para confirmación.",
    confirmAppointment: "Confirmar cita",
    bookingTipsTitle: "Consejos para reservar",
    bookingTipOne: "Los horarios en línea entre semana están disponibles de 1:00 PM a 9:00 PM.",
    bookingTipTwo: "Las solicitudes para sábado y domingo son solo con cita y están sujetas a confirmación.",
    bookingTipThree: "Por favor proporciona un número de teléfono válido para una confirmación rápida.",
    footerPrefix: "©",
    footerTagline: "Luce bien, siéntete mejor.",
    hintSelectDate: "Selecciona una fecha para ver las reglas de reservación y horarios sugeridos.",
    hintWeekday: "Horario de reservaciones entre semana: 1:00 PM a 9:00 PM. Elige una hora dentro de ese rango.",
    hintWeekend: "El fin de semana es solo con cita. Envía tu solicitud y el equipo confirmará disponibilidad.",
    noRecentBooking: "Aún no hay una reservación reciente — tu próximo estilo empieza aquí.",
    latestBookingLabel: "Reservación más reciente:",
    bookingAt: "a las",
    appointmentsEmpty: "Aún no hay próximas citas.",
    tableName: "Nombre",
    tableService: "Servicio",
    tableDate: "Fecha",
    tableTime: "Hora",
    tablePhone: "Teléfono",
    tableStylist: "Barbero",
    noPreference: "Sin preferencia",
    noNotes: "Sin notas",
    missingFields: "Por favor completa todos los campos obligatorios antes de enviar.",
    invalidWeekdayTime: "Las citas entre semana deben ser entre 1:00 PM y 9:00 PM.",
    validWeekdayTime: "Excelente elección. Tu solicitud de cita entre semana está lista para enviarse.",
    validWeekendTime: "Solicitud para fin de semana enviada. Nuestro equipo confirmará tu horario en breve.",
    sending: "Enviando...",
    successMessage: `¡Gracias, {name}! {validationMessage} Tu solicitud fue enviada por correo a ${BOOKING_EMAIL}.`,
    fallbackMessage: "No pudimos enviarla automáticamente en este momento. Se abrirá tu app de correo para que puedas mandar la solicitud manualmente.",
    service_vip: "Corte VIP - $300",
    service_cutBeard: "Corte y Barba - $200",
    service_haircut: "Corte de cabello - $150",
    service_beardShave: "Afeitado de barba - $100",
    service_facial: "Tratamientos faciales - $100",
    service_beardDesign: "Diseño y Perfilado de barba - $80"
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
  document.title = dictionary.documentTitle || translations.en.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  updateServiceOptions(language);
  updateAvailabilityHint();
  displayLastBooking();
  displayUpcomingAppointments();
}

function translate(key, replacements = {}) {
  const dictionary = translations[activeLanguage] || translations.en;
  let text = dictionary[key] || translations.en[key] || "";

  Object.entries(replacements).forEach(([placeholder, value]) => {
    text = text.replace(`{${placeholder}}`, value);
  });

  return text;
}

function updateServiceOptions(language) {
  if (!serviceSelect) return;

  const dictionary = translations[language] || translations.en;

  serviceSelect.querySelectorAll("option[data-service-key]").forEach((option) => {
    const serviceKey = option.dataset.serviceKey;
    const translationKey = `service_${serviceKey}`;

    if (dictionary[translationKey]) {
      option.textContent = dictionary[translationKey];
    }
  });
}

function detectRegionLanguage() {
  const browserLanguages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"];

  const normalizedLanguages = browserLanguages
    .filter(Boolean)
    .map((language) => language.toLowerCase());

  const hasMexicoSpanish = normalizedLanguages.some(
    (language) => language === "es-mx" || language.startsWith("es-mx")
  );

  if (hasMexicoSpanish) {
    return "es-MX";
  }

  const hasSpanish = normalizedLanguages.some((language) => language.startsWith("es"));

  if (hasSpanish) {
    return "es-MX";
  }

  return "en";
}

function initializeLanguage() {
  if (!languageSelect) return;

  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  const preferenceMode = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  const autoDetectedLanguage = detectRegionLanguage();

  activeLanguage =
    preferenceMode === "manual" && translations[savedLanguage]
      ? savedLanguage
      : autoDetectedLanguage;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage);
  languageSelect.value = activeLanguage;
  applyTranslations(activeLanguage);

  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    activeLanguage = translations[selectedLanguage] ? selectedLanguage : "en";
    localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage);
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "manual");
    localStorage.setItem(LANGUAGE_PROMPT_SEEN_KEY, "true");
    applyTranslations(activeLanguage);
  });
}

function closeLanguagePrompt() {
  if (!languagePrompt) return;

  languagePrompt.hidden = true;
  document.body.classList.remove("modal-open");
}

function openLanguagePrompt() {
  if (!languagePrompt) return;

  languagePrompt.hidden = false;
  document.body.classList.add("modal-open");
}

function initializeLanguagePrompt() {
  if (!languagePrompt) return;

  const promptSeen = localStorage.getItem(LANGUAGE_PROMPT_SEEN_KEY) === "true";
  const preferenceMode = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);

  languagePrompt.querySelectorAll("[data-language-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.dataset.languageChoice;
      activeLanguage = translations[selectedLanguage] ? selectedLanguage : "en";
      localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLanguage);
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "manual");
      localStorage.setItem(LANGUAGE_PROMPT_SEEN_KEY, "true");
      languageSelect.value = activeLanguage;
      applyTranslations(activeLanguage);
      closeLanguagePrompt();
    });
  });

  if (!promptSeen && preferenceMode !== "manual") {
    openLanguagePrompt();
  } else {
    closeLanguagePrompt();
  }
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
    availabilityHint.textContent = translate("hintSelectDate");
    return;
  }

  const dayType = getDayType(dateInput.value);

  if (dayType === "weekday") {
    availabilityHint.textContent = translate("hintWeekday");
  } else {
    availabilityHint.textContent = translate("hintWeekend");
  }
}

function displayLastBooking() {
  const bookings = JSON.parse(localStorage.getItem("hairParlorBookings") || "[]");
  const latest = bookings[bookings.length - 1];

  if (!latest) {
    lastBooking.textContent = translate("noRecentBooking");
    return;
  }

  lastBooking.innerHTML = `
    <strong>${translate("latestBookingLabel")}</strong><br />
    ${latest.name} • ${latest.service}<br />
    ${latest.dateReadable} ${translate("bookingAt")} ${latest.time}
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
    appointmentsList.innerHTML = `<div class="appointments-empty">${translate("appointmentsEmpty")}</div>`;
    return;
  }

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>${translate("tableName")}</th>
          <th>${translate("tableService")}</th>
          <th>${translate("tableDate")}</th>
          <th>${translate("tableTime")}</th>
          <th>${translate("tablePhone")}</th>
          <th>${translate("tableStylist")}</th>
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
  const stylistText = payload.stylist ? payload.stylist : translate("noPreference");
  const notesText = payload.notes ? payload.notes : translate("noNotes");
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
      `Preferred Stylist: ${payload.stylist || translate("noPreference")}`,
      `Date: ${formatDateReadable(payload.date)} (${payload.date})`,
      `Time: ${payload.time}`,
      `Notes: ${payload.notes || translate("noNotes")}`
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
        message: translate("invalidWeekdayTime")
      };
    }

    return {
      valid: true,
      message: translate("validWeekdayTime")
    };
  }

  return {
    valid: true,
    message: translate("validWeekendTime")
  };
}

appointmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(appointmentForm);
  const payload = Object.fromEntries(formData.entries());

  if (payload.service && serviceSelect) {
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    payload.service = selectedOption ? selectedOption.textContent : payload.service;
  }

  if (!appointmentForm.checkValidity()) {
    setFormMessage(translate("missingFields"), "error");
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
  submitButton.textContent = translate("sending");

  try {
    await sendAppointmentToEmail(payload);
    setFormMessage(
      translate("successMessage", {
        name: payload.name,
        validationMessage: validation.message
      }),
      "success"
    );
    appointmentForm.reset();
    updateAvailabilityHint();
    displayLastBooking();
    displayUpcomingAppointments();
  } catch (error) {
    setFormMessage(translate("fallbackMessage"), "error");
    openMailtoFallback(payload);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = translate("confirmAppointment");
  }
});

dateInput.addEventListener("change", updateAvailabilityHint);

document.getElementById("year").textContent = new Date().getFullYear();

setDefaultDateLimit();
initializeLanguage();
initializeLanguagePrompt();
updateAvailabilityHint();
displayLastBooking();
displayUpcomingAppointments();

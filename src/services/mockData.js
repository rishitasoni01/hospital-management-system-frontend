// High Quality Mock Dataset with LocalStorage persistence for HMS Frontend

const STORAGE_KEYS = {
  PATIENTS: "hms_mock_patients",
  DOCTORS: "hms_mock_doctors",
  DEPARTMENTS: "hms_mock_departments",
  APPOINTMENTS: "hms_mock_appointments",
  MEDICAL_RECORDS: "hms_mock_medical_records",
};

const initialPatients = [
  {
    id: 1,
    firstName: "Robert",
    lastName: "Fox",
    gender: "MALE",
    age: 42,
    mobileNumber: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Springfield",
    status: true,
    bloodGroup: "O+",
    assignedDoctor: "Dr. Cameron Vance",
    lastVisit: "2026-09-20"
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Wong",
    gender: "FEMALE",
    age: 29,
    mobileNumber: "+1 (555) 876-5432",
    address: "123 Maple Street, Metro City",
    status: true,
    bloodGroup: "A+",
    assignedDoctor: "Dr. Sarah Smith",
    lastVisit: "2026-09-22"
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    gender: "MALE",
    age: 55,
    mobileNumber: "+1 (555) 345-6789",
    address: "456 Oak Avenue, Riverdale",
    status: false,
    bloodGroup: "B-",
    assignedDoctor: "Dr. Michael Brown",
    lastVisit: "2026-09-15"
  },
  {
    id: 4,
    firstName: "Elena",
    lastName: "Smith",
    gender: "FEMALE",
    age: 34,
    mobileNumber: "+1 (555) 987-6543",
    address: "890 Pine Road, Gotham",
    status: true,
    bloodGroup: "AB+",
    assignedDoctor: "Dr. Emily Taylor",
    lastVisit: "2026-09-25"
  },
  {
    id: 5,
    firstName: "Marcus",
    lastName: "Knight",
    gender: "MALE",
    age: 38,
    mobileNumber: "+1 (555) 456-7890",
    address: "321 Elm Street, Central City",
    status: true,
    bloodGroup: "O-",
    assignedDoctor: "Dr. David Wilson",
    lastVisit: "2026-09-24"
  },
  {
    id: 6,
    firstName: "Sophia",
    lastName: "Martinez",
    gender: "FEMALE",
    age: 26,
    mobileNumber: "+1 (555) 678-9012",
    address: "654 Birch Boulevard, Star City",
    status: true,
    bloodGroup: "A-",
    assignedDoctor: "Dr. Sarah Smith",
    lastVisit: "2026-09-26"
  }
];

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Cameron Vance",
    specialization: "cardiologist",
    experience: "12 Years",
    mobileNumber: "+1 (555) 111-2233",
    status: "AVAILABLE",
    email: "c.vance@cityhospital.org",
    qualification: "MD, FACC - Cardiology",
    roomNo: "Suite 402"
  },
  {
    id: 2,
    name: "Dr. Sarah Smith",
    specialization: "neurologist",
    experience: "8 Years",
    mobileNumber: "+1 (555) 222-3344",
    status: "AVAILABLE",
    email: "s.smith@cityhospital.org",
    qualification: "MD, DM - Neurology",
    roomNo: "Suite 305"
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialization: "pediatrics",
    experience: "15 Years",
    mobileNumber: "+1 (555) 333-4455",
    status: "ON_LEAVE",
    email: "m.brown@cityhospital.org",
    qualification: "MBBS, MD - Pediatrics",
    roomNo: "Suite 108"
  },
  {
    id: 4,
    name: "Dr. Emily Taylor",
    specialization: "cardiologist",
    experience: "10 Years",
    mobileNumber: "+1 (555) 444-5566",
    status: "AVAILABLE",
    email: "e.taylor@cityhospital.org",
    qualification: "MD - Cardiac Surgery",
    roomNo: "Suite 408"
  },
  {
    id: 5,
    name: "Dr. David Wilson",
    specialization: "neurologist",
    experience: "6 Years",
    mobileNumber: "+1 (555) 555-6677",
    status: "UNAVAILABLE",
    email: "d.wilson@cityhospital.org",
    qualification: "MD - Neurosurgery",
    roomNo: "Suite 310"
  }
];

const initialDepartments = [
  {
    id: 1,
    name: "Cardiology Wing",
    description: "Comprehensive cardiac diagnostics, catheterization, and intensive cardiac care.",
    head: "Dr. Cameron Vance",
    staffCount: 48,
    bedsAvailable: 14
  },
  {
    id: 2,
    name: "Neurology Center",
    description: "Advanced brain imaging, stroke response unit, and neuro-rehabilitation.",
    head: "Dr. Sarah Smith",
    staffCount: 35,
    bedsAvailable: 8
  },
  {
    id: 3,
    name: "Pediatrics Clinic",
    description: "Dedicated neonatal ICU, child care development, and pediatric emergency.",
    head: "Dr. Michael Brown",
    staffCount: 40,
    bedsAvailable: 22
  },
  {
    id: 4,
    name: "Orthopedic Surgery",
    description: "Joint replacement, trauma surgery, physical therapy, and sports medicine.",
    head: "Dr. David Wilson",
    staffCount: 32,
    bedsAvailable: 11
  },
  {
    id: 5,
    name: "Emergency Triage",
    description: "24/7 level 1 trauma center with instant surgical readiness and ICU transfer.",
    head: "Dr. Emily Taylor",
    staffCount: 65,
    bedsAvailable: 5
  }
];

const initialAppointments = [
  {
    id: 1,
    patientName: "Robert Fox",
    doctorName: "Dr. Cameron Vance",
    appointmentDate: "2026-09-28",
    appointmentTime: "09:30 AM",
    reason: "Routine Cardiac Checkup & ECG Review",
    status: "Confirmed",
    department: "Cardiology"
  },
  {
    id: 2,
    patientName: "Alice Wong",
    doctorName: "Dr. Sarah Smith",
    appointmentDate: "2026-09-28",
    appointmentTime: "10:15 AM",
    reason: "Migraine Evaluation and MRI Consult",
    status: "Pending",
    department: "Neurology"
  },
  {
    id: 3,
    patientName: "John Doe",
    doctorName: "Dr. Michael Brown",
    appointmentDate: "2026-09-27",
    appointmentTime: "11:00 AM",
    reason: "Follow-up post knee Arthroscopy",
    status: "Completed",
    department: "Orthopedics"
  },
  {
    id: 4,
    patientName: "Elena Smith",
    doctorName: "Dr. Emily Taylor",
    appointmentDate: "2026-09-29",
    appointmentTime: "02:00 PM",
    reason: "Hypertension & Stress Test",
    status: "Confirmed",
    department: "Cardiology"
  },
  {
    id: 5,
    patientName: "Marcus Knight",
    doctorName: "Dr. David Wilson",
    appointmentDate: "2026-09-26",
    appointmentTime: "04:30 PM",
    reason: "Spinal Scan Consultation",
    status: "Cancelled",
    department: "Neurology"
  }
];

const initialMedicalRecords = [
  {
    id: 101,
    appointmentId: 1,
    patientName: "Robert Fox",
    doctorName: "Dr. Cameron Vance",
    diagnosis: "Essential Hypertension (Stage 1)",
    prescription: "Amlodipine 5mg once daily, Low Sodium Diet, BP Log",
    notes: "Patient shows mild elevated SBP. Scheduled 4-week follow-up.",
    date: "2026-09-20",
    status: "Active"
  },
  {
    id: 102,
    appointmentId: 2,
    patientName: "Alice Wong",
    doctorName: "Dr. Sarah Smith",
    diagnosis: "Chronic Tension Headache",
    prescription: "Naproxen 250mg as needed, Stress Reduction Therapy",
    notes: "MRI brain scan cleared of lesions. Normal reflexes.",
    date: "2026-09-22",
    status: "Active"
  },
  {
    id: 103,
    appointmentId: 3,
    patientName: "John Doe",
    doctorName: "Dr. Michael Brown",
    diagnosis: "Right Knee Osteoarthritis",
    prescription: "Physiotherapy twice weekly, Glucosamine Supplement",
    notes: "Good ROM recovery after 6 weeks post-procedure.",
    date: "2026-09-15",
    status: "Archived"
  },
  {
    id: 104,
    appointmentId: 4,
    patientName: "Elena Smith",
    doctorName: "Dr. Emily Taylor",
    diagnosis: "Acute Bronchitis",
    prescription: "Azithromycin 500mg (3 days), Albuterol Inhaler",
    notes: "Lungs clear on auscultation. Hydration recommended.",
    date: "2026-09-25",
    status: "Active"
  }
];

// Helper to get or init localStorage data
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (e) {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LocalStorage write failed:", e);
  }
};

export const MockService = {
  getPatients: (page = 0, size = 5) => {
    const data = getStorageItem(STORAGE_KEYS.PATIENTS, initialPatients);
    const start = page * size;
    const paginated = data.slice(start, start + size);
    return {
      content: paginated,
      totalPages: Math.ceil(data.length / size),
      totalElements: data.length,
      number: page,
      size
    };
  },

  getPatientById: (id) => {
    const data = getStorageItem(STORAGE_KEYS.PATIENTS, initialPatients);
    return data.find((p) => p.id === Number(id)) || data[0];
  },

  addPatient: (patient) => {
    const data = getStorageItem(STORAGE_KEYS.PATIENTS, initialPatients);
    const newPatient = {
      ...patient,
      id: Date.now(),
      status: patient.status !== undefined ? patient.status : true,
      lastVisit: new Date().toISOString().split("T")[0]
    };
    const updated = [newPatient, ...data];
    setStorageItem(STORAGE_KEYS.PATIENTS, updated);
    return newPatient;
  },

  updatePatient: (id, patient) => {
    const data = getStorageItem(STORAGE_KEYS.PATIENTS, initialPatients);
    const updated = data.map((p) => (p.id === Number(id) ? { ...p, ...patient } : p));
    setStorageItem(STORAGE_KEYS.PATIENTS, updated);
    return patient;
  },

  deletePatient: (id) => {
    const data = getStorageItem(STORAGE_KEYS.PATIENTS, initialPatients);
    const updated = data.filter((p) => p.id !== Number(id));
    setStorageItem(STORAGE_KEYS.PATIENTS, updated);
    return true;
  },

  getDoctors: (page = 0, size = 5, specFilter = "") => {
    let data = getStorageItem(STORAGE_KEYS.DOCTORS, initialDoctors);
    if (specFilter) {
      data = data.filter((d) =>
        d.specialization.toLowerCase().includes(specFilter.toLowerCase())
      );
    }
    const start = page * size;
    const paginated = data.slice(start, start + size);
    return {
      content: paginated,
      totalPages: Math.ceil(data.length / size) || 1,
      totalElements: data.length,
      number: page,
      size
    };
  },

  getDoctorById: (id) => {
    const data = getStorageItem(STORAGE_KEYS.DOCTORS, initialDoctors);
    return data.find((d) => d.id === Number(id)) || data[0];
  },

  addDoctor: (doctor) => {
    const data = getStorageItem(STORAGE_KEYS.DOCTORS, initialDoctors);
    const newDoc = {
      ...doctor,
      id: Date.now(),
      status: doctor.status || "AVAILABLE"
    };
    const updated = [newDoc, ...data];
    setStorageItem(STORAGE_KEYS.DOCTORS, updated);
    return newDoc;
  },

  updateDoctor: (id, doctor) => {
    const data = getStorageItem(STORAGE_KEYS.DOCTORS, initialDoctors);
    const updated = data.map((d) => (d.id === Number(id) ? { ...d, ...doctor } : d));
    setStorageItem(STORAGE_KEYS.DOCTORS, updated);
    return doctor;
  },

  deleteDoctor: (id) => {
    const data = getStorageItem(STORAGE_KEYS.DOCTORS, initialDoctors);
    const updated = data.filter((d) => d.id !== Number(id));
    setStorageItem(STORAGE_KEYS.DOCTORS, updated);
    return true;
  },

  getDepartments: (page = 0, size = 5) => {
    const data = getStorageItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments);
    const start = page * size;
    const paginated = data.slice(start, start + size);
    return {
      content: paginated,
      totalPages: Math.ceil(data.length / size),
      totalElements: data.length,
      number: page,
      size
    };
  },

  getDepartmentById: (id) => {
    const data = getStorageItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments);
    return data.find((d) => d.id === Number(id)) || data[0];
  },

  addDepartment: (dept) => {
    const data = getStorageItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments);
    const newDept = { ...dept, id: Date.now() };
    const updated = [newDept, ...data];
    setStorageItem(STORAGE_KEYS.DEPARTMENTS, updated);
    return newDept;
  },

  updateDepartment: (id, dept) => {
    const data = getStorageItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments);
    const updated = data.map((d) => (d.id === Number(id) ? { ...d, ...dept } : d));
    setStorageItem(STORAGE_KEYS.DEPARTMENTS, updated);
    return dept;
  },

  deleteDepartment: (id) => {
    const data = getStorageItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments);
    const updated = data.filter((d) => d.id !== Number(id));
    setStorageItem(STORAGE_KEYS.DEPARTMENTS, updated);
    return true;
  },

  getAppointments: (page = 0, size = 5) => {
    const data = getStorageItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const start = page * size;
    const paginated = data.slice(start, start + size);
    return {
      content: paginated,
      totalPages: Math.ceil(data.length / size),
      totalElements: data.length,
      number: page,
      size
    };
  },

  getAppointmentById: (id) => {
    const data = getStorageItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    return data.find((a) => a.id === Number(id)) || data[0];
  },

  addAppointment: (app) => {
    const data = getStorageItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const newApp = {
      ...app,
      id: Date.now(),
      status: app.status || "Pending"
    };
    const updated = [newApp, ...data];
    setStorageItem(STORAGE_KEYS.APPOINTMENTS, updated);
    return newApp;
  },

  updateAppointment: (id, app) => {
    const data = getStorageItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const updated = data.map((a) => (a.id === Number(id) ? { ...a, ...app } : a));
    setStorageItem(STORAGE_KEYS.APPOINTMENTS, updated);
    return app;
  },

  deleteAppointment: (id) => {
    const data = getStorageItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const updated = data.filter((a) => a.id !== Number(id));
    setStorageItem(STORAGE_KEYS.APPOINTMENTS, updated);
    return true;
  },

  getMedicalRecords: (page = 0, size = 10) => {
    const data = getStorageItem(STORAGE_KEYS.MEDICAL_RECORDS, initialMedicalRecords);
    const start = page * size;
    const paginated = data.slice(start, start + size);
    return {
      content: paginated,
      totalPages: Math.ceil(data.length / size),
      totalElements: data.length,
      number: page,
      size
    };
  },

  addMedicalRecord: (rec) => {
    const data = getStorageItem(STORAGE_KEYS.MEDICAL_RECORDS, initialMedicalRecords);
    const newRec = {
      ...rec,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      status: "Active"
    };
    const updated = [newRec, ...data];
    setStorageItem(STORAGE_KEYS.MEDICAL_RECORDS, updated);
    return newRec;
  }
};

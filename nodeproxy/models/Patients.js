var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PatientSchema = new Schema({
  unitOfAge: {
    type: Number,
  },
  age: {
    type: String,
  },
  id: {
    type: Number,
  },
  name: {
    type: String,
  },

  sex: {
    type: String,
  },
  casename: {
    type: String,
  },
  imagId: {
    type: String,
  },
  caseId: {
    type: String,
  },
  celllphone: {
    type: String,
  },
  lastVisit: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },

  countryId: {
    type: Number,
  },
  stateId: {
    type: Number,
  },
  cityId: {
    type: Number,
  },
  urgent: {
    type: Number,
  },
  economical: {
    type: Number,
  },
  appointmentServiceId: {
    type: Number,
  },
  appointmentPackageTariffId: {
    type: Number,
  },
  doctorId: {
    type: Number,
  },
  clinicId: {
    type: Number,
  },
  status: {
    type: Number,
  },
  ptcaseId: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  day: {
    type: Number,
  },
  dayOfWeek: {
    type: Number,
  },
  doctorName: {
    type: String,
  },
  languageId: {
    type: Number,
  },
  referredbyDoctorId: {
    type: Number,
  },
  referredbySpecializationId: {
    type: Number,
  },
  doctorAffinity: {
    type: Number,
  },
  summaryBtnFlag: {
    type: Number,
  },
  flagComboTextC: {
    type: Number,
  },
  flagComboTextS: {
    type: Number,
  },
  flagComboTextCN: {
    type: Number,
  },
  ptSummarySaveFlag: {
    type: Number,
  },
  dischargeVisitId: {
    type: Number,
  },
  ptCaseClinicId: {
    type: Number,
  },
  ptCaseRootClinicId: {
    type: Number,
  },
  dischargeStatus: {
    type: String,
  },

  clinicOrgId: {
    type: Number,
  },
  categoryColor: {
    type: Number,
  },
  Nationality_id: {
    type: Number,
  },
  finalizeFlag: {
    type: Number,
  },
  yearlyIncome: {
    type: Number,
  },
  payerId: {
    type: Number,
  },
  specialityId: {
    type: Number,
  },
  staffId: {
    type: Number,
  },
  tokenNoPolicyFlag: {
    type: Boolean,
  },
  assignmentPolicyFlag: {
    type: Boolean,
  },
  assignmentDone: {
    type: Boolean,
  },
  insuranceDone: {
    type: Boolean,
  },
  servicePrice: {
    type: Number,
  },
  invoiceId: {
    type: Number,
  },
  invoiceNumber: {
    type: Number,
  },
  ptClinicRegistrationID: {
    type: Number,
  },
  intervalInLong: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  isCheckedOut: {
    type: Number,
  },
  spObId: {
    type: Number,
  },
  patientStatus: {
    type: Number,
  },
  nextGenId: {
    type: Number,
  },
  clinicDoctorId: {
    type: Number,
  },
  webServiceCallingEnabled: {
    type: Number,
  },
  registrationFromWebService: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  isPatientApp: {
    type: Boolean,
  },
  isSelfRegistration: {
    type: Boolean,
  },
  isFromTriage: {
    type: Boolean,
  },
  patientID: {
    type: Number,
  },
  isDelayedOpertaionQueueCall: {
    type: Boolean,
  },
  cardNumber: {
    type: Number,
  },
});
var Patients = mongoose.model("Patients", PatientSchema);
module.exports = Patients;

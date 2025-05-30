-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "RoleID" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Roles" (
    "RoleID" SERIAL NOT NULL,
    "RoleName" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("RoleID")
);

-- CreateTable
CREATE TABLE "HealthcareFacility" (
    "FacilityID" SERIAL NOT NULL,
    "FacilityName" TEXT NOT NULL,
    "FacilityDescription" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "HospitalID" INTEGER NOT NULL,

    CONSTRAINT "HealthcareFacility_pkey" PRIMARY KEY ("FacilityID")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "HospitalID" SERIAL NOT NULL,
    "HospitalName" TEXT NOT NULL,
    "FacilityNeedsScore" INTEGER NOT NULL,
    "LocationID" INTEGER NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("HospitalID")
);

-- CreateTable
CREATE TABLE "Location" (
    "LocationID" SERIAL NOT NULL,
    "ProvinceID" INTEGER NOT NULL,
    "DistrictID" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("LocationID")
);

-- CreateTable
CREATE TABLE "Province" (
    "ProvinceID" SERIAL NOT NULL,
    "ProvinceName" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("ProvinceID")
);

-- CreateTable
CREATE TABLE "District" (
    "DistrictID" SERIAL NOT NULL,
    "DistrictName" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("DistrictID")
);

-- CreateTable
CREATE TABLE "HealthcareProfessional" (
    "ProfID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "Gender" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactNumber" TEXT NOT NULL,
    "NIK" TEXT NOT NULL,
    "CurrentHospital" INTEGER NOT NULL,
    "PermanentHospital" INTEGER NOT NULL,
    "SpecialtyID" INTEGER NOT NULL,

    CONSTRAINT "HealthcareProfessional_pkey" PRIMARY KEY ("ProfID")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "SpecialtyID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("SpecialtyID")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "MedicalID" SERIAL NOT NULL,
    "IssueDate" TIMESTAMP(3) NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "ProfID" INTEGER NOT NULL,
    "HospitalID" INTEGER NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("MedicalID")
);

-- CreateTable
CREATE TABLE "BPJSClaim" (
    "ClaimID" SERIAL NOT NULL,
    "ClaimAmount" DOUBLE PRECISION NOT NULL,
    "ProcedureCode" TEXT NOT NULL,
    "PatientID" INTEGER NOT NULL,
    "ProfID" INTEGER NOT NULL,

    CONSTRAINT "BPJSClaim_pkey" PRIMARY KEY ("ClaimID")
);

-- CreateTable
CREATE TABLE "Patient" (
    "PatientID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "Gender" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactNumber" TEXT NOT NULL,
    "NIK" TEXT NOT NULL,
    "BPJSNumber" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("PatientID")
);

-- CreateTable
CREATE TABLE "ProfessionalMutationOrder" (
    "ProfOrderID" SERIAL NOT NULL,
    "IssueDate" TIMESTAMP(3) NOT NULL,
    "ProfID" INTEGER NOT NULL,
    "FromHospitalID" INTEGER NOT NULL,
    "ToHospitalID" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalMutationOrder_pkey" PRIMARY KEY ("ProfOrderID")
);

-- CreateTable
CREATE TABLE "FacilityMutationOrder" (
    "FacilityOrderID" SERIAL NOT NULL,
    "IssueDate" TIMESTAMP(3) NOT NULL,
    "FacilityID" INTEGER NOT NULL,
    "FromHospitalID" INTEGER NOT NULL,
    "ToHospitalID" INTEGER NOT NULL,

    CONSTRAINT "FacilityMutationOrder_pkey" PRIMARY KEY ("FacilityOrderID")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RoleID_fkey" FOREIGN KEY ("RoleID") REFERENCES "Roles"("RoleID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthcareFacility" ADD CONSTRAINT "HealthcareFacility_HospitalID_fkey" FOREIGN KEY ("HospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_LocationID_fkey" FOREIGN KEY ("LocationID") REFERENCES "Location"("LocationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_ProvinceID_fkey" FOREIGN KEY ("ProvinceID") REFERENCES "Province"("ProvinceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_DistrictID_fkey" FOREIGN KEY ("DistrictID") REFERENCES "District"("DistrictID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthcareProfessional" ADD CONSTRAINT "HealthcareProfessional_SpecialtyID_fkey" FOREIGN KEY ("SpecialtyID") REFERENCES "Specialty"("SpecialtyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthcareProfessional" ADD CONSTRAINT "HealthcareProfessional_CurrentHospital_fkey" FOREIGN KEY ("CurrentHospital") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthcareProfessional" ADD CONSTRAINT "HealthcareProfessional_PermanentHospital_fkey" FOREIGN KEY ("PermanentHospital") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "Patient"("PatientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_ProfID_fkey" FOREIGN KEY ("ProfID") REFERENCES "HealthcareProfessional"("ProfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_HospitalID_fkey" FOREIGN KEY ("HospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BPJSClaim" ADD CONSTRAINT "BPJSClaim_PatientID_fkey" FOREIGN KEY ("PatientID") REFERENCES "Patient"("PatientID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BPJSClaim" ADD CONSTRAINT "BPJSClaim_ProfID_fkey" FOREIGN KEY ("ProfID") REFERENCES "HealthcareProfessional"("ProfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalMutationOrder" ADD CONSTRAINT "ProfessionalMutationOrder_ProfID_fkey" FOREIGN KEY ("ProfID") REFERENCES "HealthcareProfessional"("ProfID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalMutationOrder" ADD CONSTRAINT "ProfessionalMutationOrder_FromHospitalID_fkey" FOREIGN KEY ("FromHospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalMutationOrder" ADD CONSTRAINT "ProfessionalMutationOrder_ToHospitalID_fkey" FOREIGN KEY ("ToHospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMutationOrder" ADD CONSTRAINT "FromFacility_FK" FOREIGN KEY ("FacilityID") REFERENCES "HealthcareFacility"("FacilityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMutationOrder" ADD CONSTRAINT "ToFacility_FK" FOREIGN KEY ("FacilityID") REFERENCES "HealthcareFacility"("FacilityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMutationOrder" ADD CONSTRAINT "FacilityMutationOrder_FromHospitalID_fkey" FOREIGN KEY ("FromHospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMutationOrder" ADD CONSTRAINT "FacilityMutationOrder_ToHospitalID_fkey" FOREIGN KEY ("ToHospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;

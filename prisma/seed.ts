// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hospital data
  const hospitalA = await prisma.hospital.create({
    data: {
      HospitalID: 1,
      HospitalName: 'Rumah Sakit A',
      Location: 'Jakarta',
    },
  });

  const hospitalB = await prisma.hospital.create({
    data: {
      HospitalID: 2,
      HospitalName: 'Rumah Sakit B',
      Location: 'Bandung',
    },
  });

  const hospitalC = await prisma.hospital.create({
    data: {
      HospitalID: 3,
      HospitalName: 'Rumah Sakit C',
      Location: 'Surabaya',
    },
  });

  // HealthcareFacility data
  await prisma.healthcareFacility.createMany({
    data: [
      {
        FacilityID: 1,
        FacilityName: 'Ventilator',
        FacilityDescription: 'Ventilator tekanan tinggi',
        Quantity: 10,
        HospitalID: hospitalA.HospitalID,
      },
      {
        FacilityID: 2,
        FacilityName: 'ICU Bed',
        FacilityDescription: 'Tempat tidur ICU otomatis',
        Quantity: 5,
        HospitalID: hospitalB.HospitalID,
      },
      {
        FacilityID: 3,
        FacilityName: 'X-Ray Machine',
        FacilityDescription: 'Mesin X-Ray digital',
        Quantity: 2,
        HospitalID: hospitalC.HospitalID,
      },
    ],
  });

  // FacilityMutationOrder data
  await prisma.facilityMutationOrder.createMany({
    data: [
      {
        FacilityOrderID: 1,
        IssueDate: new Date('2025-05-30'),
        FacilityID: 1,
        FromHospitalID: hospitalA.HospitalID,
        ToHospitalID: hospitalB.HospitalID,
      },
      {
        FacilityOrderID: 2,
        IssueDate: new Date('2025-05-29'),
        FacilityID: 2,
        FromHospitalID: hospitalB.HospitalID,
        ToHospitalID: hospitalC.HospitalID,
      },
      {
        FacilityOrderID: 3,
        IssueDate: new Date('2025-05-28'),
        FacilityID: 3,
        FromHospitalID: hospitalC.HospitalID,
        ToHospitalID: hospitalA.HospitalID,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding complete!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

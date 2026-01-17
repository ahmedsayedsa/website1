import { PrismaClient, TourType, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    // In a real app, hash the password!
    const admin = await prisma.user.upsert({
        where: { email: 'admin@elmaali.com' },
        update: {},
        create: {
            email: 'admin@elmaali.com',
            name: 'Admin User',
            passwordHash: 'hashed_password_placeholder', // bcrypt hash for 'password123'
            role: Role.ADMIN,
        },
    });

    console.log({ admin });

    // Create Domestic Package
    const sharm = await prisma.package.create({
        data: {
            nameAr: 'رحلة شرم الشيخ الممتعة',
            nameEn: 'Amazing Sharm El Sheikh',
            descriptionAr: 'استمتع بأجمل الشواطئ في شرم الشيخ مع إقامة فاخرة.',
            descriptionEn: 'Enjoy the beautiful beaches of Sharm El Sheikh with luxury accommodation.',
            category: TourType.DOMESTIC,
            destination: 'Sharm El Sheikh',
            duration: 5,
            priceFrom: 4500,
            inclusions: ['Hotel', 'Breakfast', 'Airport Transfer'],
            exclusions: ['Flights', 'Lunch', 'Dinner'],
            featuredImage: '/images/sharm.jpg',
            maxCapacity: 20,
            availableDates: [new Date('2026-06-01'), new Date('2026-06-15')],
        },
    });

    // Create Hajj Package
    const hajj = await prisma.package.create({
        data: {
            nameAr: 'باقة الحج الاقتصادية',
            nameEn: 'Economy Hajj Package',
            descriptionAr: 'أداء مناسك الحج بتكلفة معقولة وخدمات مميزة.',
            descriptionEn: 'Perform Hajj rituals with affordable cost and excellent services.',
            category: TourType.RELIGIOUS,
            destination: 'Makkah',
            duration: 21,
            priceFrom: 150000, // EGP
            inclusions: ['Visa', 'Hotel', 'Transport', 'Guide'],
            exclusions: ['Personal Expenses'],
            featuredImage: '/images/hajj.jpg',
            maxCapacity: 50,
            availableDates: [new Date('2026-06-20')],
        },
    });

    console.log({ sharm, hajj });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

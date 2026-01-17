import { PrismaClient } from '@prisma/client';

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
            password: 'admin123', // In production use hashed password
            role: 'admin',
        },
    });

    console.log({ admin });

    // Create Domestic Package
    const sharm = await prisma.package.create({
        data: {
            titleAr: 'رحلة شرم الشيخ الممتعة',
            titleEn: 'Amazing Sharm El Sheikh',
            descriptionAr: 'استمتع بأجمل الشواطئ في شرم الشيخ مع إقامة فاخرة.',
            descriptionEn: 'Enjoy the beautiful beaches of Sharm El Sheikh with luxury accommodation.',
            category: 'domestic',
            duration: 5,
            price: 4500,
            featuredImage: '/images/sharm.jpg',
            published: true,
            featured: true,
        },
    });

    // Create Hajj Package
    const hajj = await prisma.package.create({
        data: {
            titleAr: 'باقة الحج الاقتصادية',
            titleEn: 'Economy Hajj Package',
            descriptionAr: 'أداء مناسك الحج بتكلفة معقولة وخدمات مميزة.',
            descriptionEn: 'Perform Hajj rituals with affordable cost and excellent services.',
            category: 'hajj',
            duration: 21,
            price: 150000, // EGP
            featuredImage: '/images/hajj.jpg',
            published: true,
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

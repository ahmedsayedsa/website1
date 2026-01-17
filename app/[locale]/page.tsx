'use client';

import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import QuickTours from '@/components/home/QuickTours';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <QuickTours />
      <Testimonials />
    </>
  );
}

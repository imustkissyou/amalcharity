import HeroSection from '@/sections/home/HeroSection';
import UrgentProjectsSection from '@/sections/home/UrgentProjectsSection';
import CategoriesSection from '@/sections/home/CategoriesSection';
import StatisticsSection from '@/sections/home/StatisticsSection';
import FeaturedProjectsSection from '@/sections/home/FeaturedProjectsSection';
import QuickDonateSection from '@/sections/home/QuickDonateSection';
import RecurringSection from '@/sections/home/RecurringSection';
import NewsTicker from '@/sections/home/NewsTicker';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsTicker />
      <UrgentProjectsSection />
      <CategoriesSection />
      <StatisticsSection />
      <FeaturedProjectsSection />
      <QuickDonateSection />
      <RecurringSection />
    </>
  );
}

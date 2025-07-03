
import React from 'react';
import ResponsiveNavbar from '../Navigation/ResponsiveNavbar';
import LeftSidebar from '../Sidebar/LeftSidebar';
import FeaturedProducts from '../Feed/FeaturedProducts';
import NewsFeed from '../Feed/NewsFeed';
import PerformancePanel from '../Stats/PerformancePanel';
import SponsoredAds from '../Ads/SponsoredAds';

const ResponsiveLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <ResponsiveNavbar />
      
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <LeftSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-3 md:p-6">
          <div className="max-w-2xl mx-auto">
            <FeaturedProducts />
            <NewsFeed />
          </div>
        </main>
        
        {/* Right Sidebar - Hidden on mobile and tablet */}
        <aside className="hidden xl:block w-80 p-6 space-y-6">
          <PerformancePanel />
          <SponsoredAds />
        </aside>
      </div>
    </div>
  );
};

export default ResponsiveLayout;

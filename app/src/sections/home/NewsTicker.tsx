import { newsItems } from '@/data/projects';
import { Volume2 } from 'lucide-react';

export default function NewsTicker() {
  const tickerText = newsItems.map(item => item.text).join('     |     ');

  return (
    <div className="bg-oceanic text-white py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <Volume2 className="w-4 h-4 text-coral" />
          <span className="text-xs font-semibold text-coral whitespace-nowrap">آخر الأخبار</span>
        </div>
        <div className="overflow-hidden relative flex-1">
          <div className="animate-ticker whitespace-nowrap text-xs text-white/80">
            {tickerText} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; {tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Minimize2, 
  Maximize2, 
  RefreshCw, 
  Crop as CropIcon, 
  Zap, 
  Github,
  Menu,
  X,
  Heart,
  PlusSquare
} from 'lucide-react';
import { ToolType } from './types';
import CompressorTool from './components/tools/CompressorTool';
import ResizerTool from './components/tools/ResizerTool';
import ConverterTool from './components/tools/ConverterTool';
import CropperTool from './components/tools/CropperTool';
import QualityTool from './components/tools/QualityTool';
import SizeIncreaserTool from './components/tools/SizeIncreaserTool';
import HomeView from './components/HomeView';
import BrandLogo from './components/BrandLogo';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on tool change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTool]);

  const navItems = [
    { id: ToolType.HOME, name: 'Home', icon: HomeIcon },
    { id: ToolType.COMPRESS, name: 'Compress', icon: Minimize2 },
    { id: ToolType.INCREASE_SIZE, name: 'Enlarge File', icon: PlusSquare },
    { id: ToolType.RESIZE, name: 'Resize', icon: Maximize2 },
    { id: ToolType.CONVERT, name: 'Convert', icon: RefreshCw },
    { id: ToolType.CROP, name: 'Crop', icon: CropIcon },
    { id: ToolType.QUALITY, name: 'Enhance', icon: Zap },
  ];

  const goHome = () => setActiveTool(ToolType.HOME);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.COMPRESS: return <CompressorTool onBack={goHome} />;
      case ToolType.RESIZE: return <ResizerTool onBack={goHome} />;
      case ToolType.CONVERT: return <ConverterTool onBack={goHome} />;
      case ToolType.CROP: return <CropperTool onBack={goHome} />;
      case ToolType.QUALITY: return <QualityTool onBack={goHome} />;
      case ToolType.INCREASE_SIZE: return <SizeIncreaserTool onBack={goHome} />;
      default: return <HomeView onSelectTool={setActiveTool} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => setActiveTool(ToolType.HOME)}
            >
              <div className="mr-3 transition-transform group-hover:scale-110">
                <BrandLogo className="h-10 w-10" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">PixelForge</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTool(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                    activeTool === item.id 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTool(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                    activeTool === item.id 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderTool()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BrandLogo className="h-8 w-8 mr-3 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
              <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">PixelForge</span>
            </div>
            <p className="text-slate-500 text-sm font-bold tracking-tight uppercase">
              FORGING DIGITAL CREATION WITH MR SHIT
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} PixelForge Digital Creations. All processing is 100% client-side. Your files never leave your device.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

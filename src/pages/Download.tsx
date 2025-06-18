
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const DownloadPage = () => {
  const starSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#3b82f6'>
  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/>
</svg>`;

  const downloadSvg = () => {
    const blob = new Blob([starSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'star-icon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Star Icon</h1>
        
        <div className="mb-6">
          <div 
            className="inline-block w-24 h-24 mb-4"
            dangerouslySetInnerHTML={{ __html: starSvg }}
          />
          <p className="text-gray-600">Star Icon (SVG)</p>
        </div>

        <Button onClick={downloadSvg} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download SVG
        </Button>
      </div>
    </div>
  );
};

export default DownloadPage;

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Globe, MapPin, Tag } from "lucide-react";

interface AcmeLogoProps {
  className?: string;
}

export function AcmeLogo({ className = "" }: AcmeLogoProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Logo */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              ACME
            </div>
            <div className="ml-4 h-12 w-0.5 bg-white rounded-sm"></div>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">ACME Inc.</h2>
          <p className="text-slate-600 mb-4">Used Cars Automatic</p>
          <p className="text-sm text-slate-500 leading-relaxed">Northern Ireland</p>
        </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <h3 className="text-lg font-semibold mb-2">ACME Inc.</h3>
          <p className="text-sm opacity-90 mb-4">Premium used car dealership</p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Badge className="bg-blue-100 text-blue-800">
              <Tag className="h-3 w-3 mr-1" />
              Automotive
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <MapPin className="h-3 w-3 mr-1" />
              Northern Ireland
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              <span>northsideautosltd.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>info@northsideautos.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Globe, MapPin, Tag } from "lucide-react";

interface FirepointLogoProps {
  className?: string;
}

export function FirepointLogo({ className = "" }: FirepointLogoProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Logo */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-red-600">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              FP
            </div>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Fire Point Apparatus</h2>
          <p className="text-slate-600 mb-4">For Safe and Accurate Testing</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <Badge className="bg-orange-100 text-orange-800">
              <Tag className="h-3 w-3 mr-1" />
              Testing
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Tag className="h-3 w-3 mr-1" />
              Instruments
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <h3 className="text-xl font-semibold mb-2">Fire Point Apparatus</h3>
          <p className="text-sm opacity-90 mb-4">For Safe and Accurate Testing Today</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>adityascientificinstruments.in</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@firepoint.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Mumbai, India</span>
            </div>
          </div>
          <div className="mt-6">
            <ExternalLink 
              href="#"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-blue-300 transition-colors"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}

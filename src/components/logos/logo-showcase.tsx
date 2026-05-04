"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid3X3, Star, TrendingUp, Eye, Heart, Share2, ExternalLink, Mail, Globe, MapPin, Tag, Users, Building2, FileText, Sparkles } from "lucide-react";

interface LogoPost {
  id: string;
  title: string;
  description: string;
  category: string;
  logoUrl: string;
  website?: string;
  email?: string;
  location?: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  views: number;
  likes: number;
  shares: number;
  featured?: boolean;
}

const mockLogos: LogoPost[] = [
  {
    id: "1",
    title: "North Side Autos Ltd",
    description: "Premium used car dealership in Northern Ireland offering quality automatic vehicles with exceptional customer service and competitive financing options.",
    category: "Automotive",
    logoUrl: "/placeholder-logo.svg",
    website: "northsideautosltd.com",
    email: "info@northsideautos.com",
    location: "Northern Ireland",
    tags: ["cars", "automotive", "dealership", "premium"],
    author: "North Side Autos Team",
    publishedAt: "2024-01-15",
    views: 15420,
    likes: 892,
    shares: 234,
    featured: true,
  },
  {
    id: "2",
    title: "Aditya Scientific Instruments",
    description: "Leading manufacturer and supplier of high-precision scientific testing equipment for laboratories, research facilities, and educational institutions worldwide.",
    category: "Technology",
    logoUrl: "/placeholder-logo.svg",
    website: "adityascientificinstruments.in",
    email: "contact@aditya.com",
    location: "Mumbai, India",
    tags: ["scientific", "testing", "laboratory", "equipment"],
    author: "Aditya Research Team",
    publishedAt: "2024-01-10",
    views: 8934,
    likes: 567,
    shares: 123,
    featured: true,
  },
  {
    id: "3",
    title: "TechCorp Solutions",
    description: "Innovative IT services and software development company specializing in cloud solutions, cybersecurity, and digital transformation for enterprise clients.",
    category: "Technology",
    logoUrl: "/placeholder-logo.svg",
    website: "techcorp.com",
    email: "hello@techcorp.com",
    location: "San Francisco, CA",
    tags: ["technology", "software", "cloud", "cybersecurity"],
    author: "TechCorp Team",
    publishedAt: "2024-01-08",
    views: 12450,
    likes: 1203,
    shares: 456,
    featured: false,
  },
  {
    id: "4",
    title: "Global Logistics Co",
    description: "International freight forwarding and supply chain management company providing comprehensive logistics solutions across multiple continents with real-time tracking.",
    category: "Logistics",
    logoUrl: "/placeholder-logo.svg",
    website: "globallogistics.com",
    email: "operations@globallogistics.com",
    location: "Singapore",
    tags: ["logistics", "shipping", "supply-chain", "freight"],
    author: "Global Logistics Team",
    publishedAt: "2024-01-05",
    views: 6780,
    likes: 445,
    shares: 89,
    featured: false,
  },
  {
    id: "5",
    title: "Green Energy Systems",
    description: "Renewable energy solutions provider specializing in solar panel installation, wind energy systems, and sustainable power management for commercial and residential properties.",
    category: "Energy",
    logoUrl: "/placeholder-logo.svg",
    website: "greenenergy.com",
    email: "info@greenenergy.com",
    location: "Austin, TX",
    tags: ["renewable", "solar", "wind", "sustainable"],
    author: "Green Energy Team",
    publishedAt: "2024-01-03",
    views: 9876,
    likes: 2341,
    shares: 567,
    featured: false,
  },
  {
    id: "6",
    title: "FinanceHub Pro",
    description: "Digital financial services platform offering investment management, budget tracking, and financial planning tools for individuals and small businesses.",
    category: "Finance",
    logoUrl: "/placeholder-logo.svg",
    website: "financehub.com",
    email: "support@financehub.com",
    location: "New York, NY",
    tags: ["finance", "investment", "budgeting", "fintech"],
    author: "FinanceHub Team",
    publishedAt: "2024-01-12",
    views: 15670,
    likes: 3422,
    shares: 890,
    featured: true,
  },
];

const categories = ["All", "Technology", "Automotive", "Logistics", "Energy", "Finance"];

export function LogoShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredLogos = mockLogos.filter((logo) => {
    const matchesCategory = selectedCategory === "All" || logo.category === selectedCategory;
    const matchesSearch = logo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         logo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         logo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedLogos = [...filteredLogos].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? -1 : 1) - (a.featured ? -1 : 1);
      case "newest":
        return new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime();
      case "popular":
        return b.views - a.views;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Logo Showcase</h1>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            Discover and explore professional logos from various companies and organizations. 
            Browse our comprehensive collection of brand identities and corporate trademarks.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex-1 lg:max-w-xs">
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "All" || searchTerm || sortBy !== "featured") && (
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
              {selectedCategory !== "All" && (
                <span>Category: <strong>{selectedCategory}</strong></span>
              )}
              {searchTerm && (
                <span>Search: <strong>{searchTerm}</strong></span>
              )}
              {sortBy !== "featured" && (
                <span>Sort: <strong>{sortBy}</strong></span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setSortBy("featured");
                }}
                className="ml-auto text-blue-600 hover:text-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-3xl font-bold text-slate-900">12+</div>
            <div className="text-sm text-slate-600">Total Logos</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-3xl font-bold text-blue-600">6</div>
            <div className="text-sm text-slate-600">Featured</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-3xl font-bold text-green-600">24.5K</div>
            <div className="text-sm text-slate-600">Total Views</div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedLogos.map((logo) => (
            <div
              key={logo.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Featured Badge */}
              {logo.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Logo Image */}
              <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 p-8">
                <img
                  src={logo.logoUrl}
                  alt={`${logo.title} logo`}
                  className="h-24 w-24 mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-lg font-bold mb-2">{logo.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{logo.description}</p>
                  </div>
                </div>
              </div>

              {/* Logo Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {logo.category}
                    </Badge>
                    {logo.publishedAt && (
                      <span className="text-xs text-slate-500 ml-2">
                        {new Date(logo.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{logo.views.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {logo.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{logo.likes.toLocaleString()}</span>
                    <Share2 className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{logo.shares.toLocaleString()}</span>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {sortedLogos.length > 12 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="group"
              onClick={() => {
                // Load more logos logic here
              }}
            >
              <Grid3X3 className="h-5 w-5 mr-2" />
              Load More Logos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

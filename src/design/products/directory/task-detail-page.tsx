import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, ExternalLink, ChevronRight, Star, Clock, Users } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1e293b_0%,#0f172a_50%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={taskRoute} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to {taskLabel}
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
                  Premium {taskLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Verified Profile
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {website && (
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition-colors"
                >
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Info Bar */}
        <div className="mb-12 flex flex-wrap items-center gap-6 border-b border-slate-200 pb-8">
          {location && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-indigo-500" />
              {location}
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-indigo-500" />
              {phone}
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-indigo-500" />
              {email}
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="h-4 w-4 text-indigo-500" />
              {website}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>Updated recently</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column - Media & Details */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="group relative overflow-hidden rounded-2xl bg-slate-100">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ContentImage 
                  src={images[0]} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Users className="h-3.5 w-3.5" />
                  {images.length} photos
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1, 5).map((image, index) => (
                  <div 
                    key={image} 
                    className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
                  >
                    <ContentImage 
                      src={image} 
                      alt={`${post.title} ${index + 2}`} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
            )}

            {/* About Section */}
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 mb-4">
                About {post.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {description}
              </p>
              
              {highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-950 mb-4">Highlights</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {highlights.slice(0, 4).map((item, index) => (
                      <div 
                        key={item} 
                        className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-4 text-sm text-slate-700"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                          {index + 1}
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            {mapEmbedUrl && (
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <div className="px-6 py-4 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-950">Location</p>
                </div>
                <iframe 
                  src={mapEmbedUrl} 
                  title={`${post.title} map`} 
                  className="h-[300px] w-full border-0" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                />
              </div>
            )}
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {website && (
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" /> Visit Website
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {email && (
                  <a 
                    href={`mailto:${email}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Send Email
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {phone && (
                  <a 
                    href={`tel:${phone}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Call Now
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
              <h3 className="text-sm font-semibold text-indigo-950 mb-4">
                Why trust this profile?
              </h3>
              <ul className="space-y-3 text-sm text-indigo-800">
                {['Verified contact details', 'Active business presence', 'Regularly updated information', 'Community recommended'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Badge */}
            <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-600">Category</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                <Tag className="h-3 w-3" />
                {category || taskLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Discover More
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  Similar {taskLabel}
                </h2>
              </div>
              <Link 
                href={taskRoute}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { LayoutGrid, LogOut, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

export type NavbarAuthTone = 'surface' | 'contrast'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
  logos: LayoutGrid,
}

export function NavbarAuthControls({ tone = 'surface' }: { tone?: NavbarAuthTone }) {
  const { user, logout } = useAuth()
  const isContrast = tone === 'contrast'
  const ghostMuted = isContrast
    ? 'rounded-full text-white/85 hover:bg-white/10 hover:text-white'
    : 'rounded-full text-[#5C4F4A] hover:bg-[rgba(92,118,109,0.08)] hover:text-[#3d3a38]'
  const menuSurface = 'w-56 border-[rgba(92,79,74,0.12)] bg-[rgba(255,252,249,0.98)]'

  return (
    <>
      <Button size="sm" className="hidden rounded-full bg-[#5C766D] px-4 text-white shadow-[0_12px_28px_rgba(92,118,109,0.28)] hover:bg-[#4d635c] sm:flex" asChild>
        <Link href="/create/image">
          <ImageIcon className="mr-1 h-4 w-4" />
          Upload Image
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={ghostMuted}>
            <Avatar className={`h-9 w-9 border ${isContrast ? 'border-white/20' : 'border-[rgba(92,79,74,0.12)]'}`}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={menuSurface}>
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-[rgba(92,79,74,0.12)]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-[#6B7280]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

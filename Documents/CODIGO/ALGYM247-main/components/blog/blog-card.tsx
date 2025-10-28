"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import type { BlogPost } from "@/lib/monday-blog"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = format(new Date(post.publishDate), "d 'de' MMMM, yyyy", { locale: es })

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform-gpu">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-48 w-full overflow-hidden bg-gray-200">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              quality={85}
            />
          </div>
        )}

        <CardContent className="p-6 space-y-3">
          {/* Category Badge */}
          {post.category && (
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-secondary">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

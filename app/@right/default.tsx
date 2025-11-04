// @/app/@right/default.tsx
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/construct-metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Default Page — Placeholder',
  description: 'This is the default placeholder page for the @right slot.',
  pathname: '/',
  contentType: 'website',
})

export const dynamic = 'force-static'
export const revalidate = 3600

/**
 * Default Page для @right слота
 * Это placeholder страница, которая отображается когда нет реального контента
 */
export default function RightDefaultPage() {
  return (
    <main className="flex items-center justify-center min-h-svh">
      <div className="text-center space-y-6 p-6">
        {/* Визуальный указатель что это default */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border">
          <span className="text-xs font-mono text-muted-foreground">
            @right/default.tsx
          </span>
        </div>

        {/* Основной текст */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Default Page
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Это placeholder страница для слота <code className="bg-muted px-2 py-1 rounded text-xs">@right</code>
          </p>
        </div>

        {/* Описание */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Вы видите эту страницу, потому что:
          </p>
          <ul className="text-left inline-block space-y-1">
            <li>✓ Это файл <code className="bg-muted px-1.5 py-0.5 rounded text-xs">app/@right/default.tsx</code></li>
            <li>✓ Он полностью статический (SSG)</li>
            <li>✓ Работает без JavaScript</li>
            <li>✓ Это просто placeholder</li>
          </ul>
        </div>

        {/* Уведомление */}
        <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground font-medium">
            Замените этот файл на реальный контент для @right слота
          </p>
        </div>
      </div>
    </main>
  )
}

'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Language = {
  code: string
  name: string
  flag?: string
}

const FLAG_FALLBACKS: Record<string, string> = {
  en: '/assets/flags/en.png',
  es: '/assets/flags/es.png',
}

const DEFAULT_FLAG = '/assets/flags/en.png'

export function LanguageSelector({
  languages,
}: {
  languages: Language[]
}) {

  const pathname = usePathname()

  const segments = pathname.split('/')

  const currentLang =
    ['en', 'es'].includes(segments[1])
      ? segments[1]
      : 'en'

  const currentLanguage =
    languages.find((l) => l.code === currentLang) ??
    languages[0]

  const handleSelect = (langCode: string) => {

    const segments = pathname.split('/')

    if (['en', 'es'].includes(segments[1])) {
      segments[1] = langCode
    } else {
      segments.splice(1, 0, langCode)
    }

    window.location.href = segments.join('/')
  }

  const getFlag = (
    flag?: string,
    langCode?: string
  ) => {

    if (flag && flag.trim() !== '') {
      return flag
    }

    return (
      FLAG_FALLBACKS[langCode || 'en'] ||
      DEFAULT_FLAG
    )
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="unstyled"
          className={cn(
            `
            flex items-center gap-0 md:gap-2
            px-0
            w-16 md:w-36
            rounded-full
            bg-transparent hover:bg-transparent
            md:bg-white/60
            backdrop-blur-xl
            hover:backdrop-blur-xl
            md:hover:bg-white/60
            text-white hover:text-white
            md:text-campana-primary
            md:hover:text-campana-primary
            `
          )}
        >

          {/* CURRENT FLAG */}
          <Image
            src={getFlag(
              currentLanguage?.flag,
              currentLanguage?.code
            )}
            alt={currentLanguage?.name || 'Language'}
            width={30}
            height={20}
            className="object-contain"
            unoptimized
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement

              target.src =
                FLAG_FALLBACKS[currentLanguage?.code] ||
                DEFAULT_FLAG
            }}
          />

          <span className="hidden text-sm sm:inline">
            {currentLanguage?.name}
          </span>

          <ChevronDown className="h-7 w-7 text-campana-primary" />

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          min-w-[160px]
          bg-white/60
          backdrop-blur-xl
          hover:bg-white/60
          hover:backdrop-blur-xl
          text-campana-primary
          hover:text-campana-primary
          border-none
        "
      >

        {languages.map((lang) => {

          const isActive = lang.code === currentLang

          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'flex items-center gap-3 cursor-pointer',
                isActive && 'font-medium'
              )}
            >

              {/* DROPDOWN FLAG */}
              <Image
                src={getFlag(lang.flag, lang.code)}
                alt={lang.name}
                width={20}
                height={14}
                className="object-contain"
                style={{
                  width: '20px',
                  height: 'auto',
                }}
                unoptimized
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement

                  target.src =
                    FLAG_FALLBACKS[lang.code] ||
                    DEFAULT_FLAG
                }}
              />

              <span className="text-sm">
                {lang.name}
              </span>

              {isActive && (
                <Check className="ml-auto h-4 w-4" />
              )}

            </DropdownMenuItem>
          )
        })}

      </DropdownMenuContent>

    </DropdownMenu>
  )
}
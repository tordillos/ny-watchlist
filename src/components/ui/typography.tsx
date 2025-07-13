import { cn } from '@/lib/utils'
import * as Slot from '@rn-primitives/slot'
import * as React from 'react'
import { Platform, Text as RNText } from 'react-native'

type TypographyProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>
  asChild?: boolean
}

function H1({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="1"
      className={cn(
        'text-4xl font-extrabold tracking-tight text-foreground web:select-text web:scroll-m-20 lg:text-5xl',
        className
      )}
      {...props}
    />
  )
}

function H2({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="2"
      className={cn(
        'pb-2 text-3xl font-semibold tracking-tight text-foreground first:mt-0 web:select-text web:scroll-m-20',
        className
      )}
      {...props}
    />
  )
}

function H3({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="3"
      className={cn(
        'text-2xl font-semibold tracking-tight text-foreground web:select-text web:scroll-m-20',
        className
      )}
      {...props}
    />
  )
}

function H4({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="4"
      className={cn(
        'text-xl font-semibold tracking-tight text-foreground web:select-text web:scroll-m-20',
        className
      )}
      {...props}
    />
  )
}

function P({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn('text-base text-foreground web:select-text', className)}
      {...props}
    />
  )
}

function BlockQuote({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      role={Platform.OS === 'web' ? 'blockquote' : undefined}
      className={cn(
        'native:mt-4 native:pl-3 mt-6 border-l-2 border-border pl-6 text-base italic text-foreground web:select-text',
        className
      )}
      {...props}
    />
  )
}

function Code({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      role={Platform.OS === 'web' ? 'code' : undefined}
      className={cn(
        'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold text-foreground web:select-text',
        className
      )}
      {...props}
    />
  )
}

function Lead({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn('text-xl text-muted-foreground web:select-text', className)}
      {...props}
    />
  )
}

function Large({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn(
        'text-xl font-semibold text-foreground web:select-text',
        className
      )}
      {...props}
    />
  )
}

function Small({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn(
        'text-sm font-medium leading-none text-foreground web:select-text',
        className
      )}
      {...props}
    />
  )
}

function Muted({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn('text-sm text-muted-foreground web:select-text', className)}
      {...props}
    />
  )
}

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small }

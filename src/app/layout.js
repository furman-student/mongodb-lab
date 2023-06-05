import "@/styles/globals/index.scss"
import { Roboto, Roboto_Condensed } from 'next/font/google'

export const roboto = Roboto({
  variable: '--font-primary',
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin']
})

export const robotoCondensed = Roboto_Condensed({
  variable: '--font-secondary',
  weight: ['300', '400', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: 'MonboDB Module 2',
  description: 'Simple web app for my MongoDB lessons',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoCondensed.variable}`}>
        {children}
      </body>
    </html>
  )
}

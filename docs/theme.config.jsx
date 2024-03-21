import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { joinURL } from 'ufo'

export default {
	head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()

    const url = joinURL(process.env.NEXT_PUBLIC_SITE_URL, defaultLocale === locale ? asPath : joinURL(locale, asPath))

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'Flyapi'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'Fly with your API right now!'}
        />
				<link rel="icon" href="/static/favicon.ico" sizes="32x32" />
				<link rel="icon" href="/static/icon.svg" sizes="any" type="image/svg+xml" />
      </>
    )
  },
  logo: (
	<>
		<svg x="0" y="0" width="32" height="58.37200478650439" filtersec="colorsb7279438706">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="9.995712280273438 6.519998550415039 1010.0086059570312 982.5999755859375">
				<path fill="#C9098E" d="M510.98 989.12c-12.34 0-24.86-2.87-36.59-8.92-39.18-20.24-54.53-68.41-34.29-107.59l212.57-411.44c20.24-39.17 68.4-54.52 107.59-34.29 39.18 20.24 54.53 68.41 34.29 107.59L581.98 945.9c-14.18 27.47-42.09 43.22-71 43.22z"></path>
				<path fill="#6B0CC6" d="M940.2 989.12c-28.91 0-56.82-15.75-71.01-43.22L515 260.33 160.8 945.9c-20.24 39.18-68.41 54.52-107.59 34.29-39.18-20.24-54.53-68.41-34.29-107.59L444.06 49.72A79.844 79.844 0 0 1 515 6.52c29.86 0 57.23 16.66 70.94 43.2l425.14 822.89c20.24 39.18 4.89 87.35-34.29 107.59-11.72 6.05-24.25 8.92-36.59 8.92z"></path>
				<path fill="#DD0BA6" d="M866.68 300.65c-5.16 0-10.44-.49-15.6-1.6-5.04-.98-10.08-2.58-14.87-4.55-4.79-1.97-9.46-4.42-13.76-7.37-4.42-2.83-8.47-6.14-12.16-9.83-3.69-3.69-7-7.87-9.95-12.16-2.82-4.3-5.41-8.97-7.37-13.76-1.97-4.91-3.44-9.95-4.55-14.98-.98-5.16-1.6-10.44-1.6-15.6s.61-10.44 1.6-15.6c1.11-5.04 2.58-10.07 4.55-14.99 1.96-4.79 4.54-9.46 7.37-13.75 2.95-4.3 6.26-8.48 9.95-12.16 3.69-3.68 7.74-7 12.16-9.82 4.3-2.95 8.97-5.41 13.76-7.37 4.79-1.97 9.83-3.56 14.87-4.55 10.32-2.09 21-2.09 31.2 0 5.16.98 10.2 2.58 14.99 4.55 4.79 1.97 9.46 4.42 13.76 7.37 4.42 2.82 8.47 6.14 12.16 9.82 14.86 14.86 23.34 35.5 23.34 56.51 0 5.16-.49 10.44-1.47 15.6-1.11 5.03-2.58 10.07-4.55 14.98-2.09 4.79-4.54 9.46-7.37 13.76-2.95 4.3-6.26 8.47-9.95 12.16-3.69 3.68-7.74 7-12.16 9.83-4.3 2.95-8.97 5.4-13.76 7.37-4.79 1.97-9.83 3.56-14.99 4.55-5.04 1.09-10.32 1.59-15.6 1.59z"></path>
			</svg>
		</svg>
		<span style={{ marginLeft: '.4em', fontWeight: 600, letterSpacing: .5 }}>
			Flyapi
		</span>
	</>
	),
  project: {
    link: 'https://github.com/steelWinds/flyapi'
  },
  editLink: {
		component: null
	}
}
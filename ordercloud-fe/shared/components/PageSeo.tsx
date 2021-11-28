import { FC, ReactChild } from 'react'
import Head from 'next/head'

interface Props {
  title?: string
  description?: string
  image?: string
  type?: string
  children: ReactChild | ReactChild[]
}

const DEFAULTS = {
  title: 'Ordercloud',
  description: 'Създайте дигитално меню безплатно за Вашият ресторант, заведение, хотел или бар.',
  image: 'https://ordercloud.s3.eu-central-1.amazonaws.com/assets/meta_image_default.jpg',
  type: 'website'
}

export const PageSeo: FC<Props> = ({
  children,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  type = DEFAULTS.type
}) => (
  <>
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
      <meta property='og:type' content={type} />
      <meta name='og:title' content={title} />
      <meta name='description' content={description} />
      <meta name='og:description' content={description} />
      <meta property='og:image' content={image} />
    </Head>
    {children}
  </>
)

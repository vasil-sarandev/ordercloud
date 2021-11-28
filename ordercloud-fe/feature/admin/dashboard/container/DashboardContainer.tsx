import { FC, useState } from 'react'
import { CustomLink, FetchResponseHandler, Input } from '../../../../shared'
import styles from '../styles/container.module.css'
import { useGetSlug } from '../hook'

interface Props {}

export const DashboardContainer: FC<Props> = () => {
  const [location, setLocation] = useState<string>('1')
  const { isLoading, error, slug } = useGetSlug()

  const baseURL = process.env.baseurl_app
  const onlyMenuLink = `${baseURL}/${slug}`
  const withOrdersLink = `${baseURL}/orders/${slug}`
  const withLocationLink = `${baseURL}/orders/${slug}?site=${location}`

  return (
    <FetchResponseHandler loading={isLoading} error={error}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Линк към менюто ви</div>
          <div className={styles.link}>
            <CustomLink as={onlyMenuLink} href={onlyMenuLink}>
              {onlyMenuLink}
            </CustomLink>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Линк към менюто ви с поръчки за адрес</div>
          <div className={styles.link}>
            <CustomLink as={withOrdersLink} href={withOrdersLink}>
              {withOrdersLink}
            </CustomLink>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Линк към менюто ви с поръчка от локация на място (маса, стая и т.н.)
          </div>
          <div className={styles.cardLocation}>
            <Input
              label='Локация'
              name='location'
              onChange={(name, val) => {
                setLocation(val)
              }}
              value={location}
              autoComplete='off'
            />
          </div>
          <div className={styles.link}>
            <CustomLink as={withLocationLink} href={withLocationLink}>
              {withLocationLink}
            </CustomLink>
          </div>
        </div>
      </div>
    </FetchResponseHandler>
  )
}

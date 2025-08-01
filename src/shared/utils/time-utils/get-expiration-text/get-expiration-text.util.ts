import { i18n, TFunction } from 'i18next'
import dayjs from 'dayjs'

export function getExpirationTextUtil(
    expireAt: Date | null | string,
    t: TFunction,
    i18nProps: i18n
): string {
    if (!expireAt) {
        return t('get-expiration-text.util.unknown')
    }

    const expiration = dayjs(expireAt).locale(i18nProps.language)
    const now = dayjs()

    if (expiration.year() === 2099) {
        return '∞'
    }

    if (expiration.isBefore(now)) {
        return t('get-expiration-text.util.expired', {
            expiration: expiration.fromNow(false)
        })
    }

    return t('get-expiration-text.util.expires-in', {
        expiration: expiration.fromNow(true)
    })
}

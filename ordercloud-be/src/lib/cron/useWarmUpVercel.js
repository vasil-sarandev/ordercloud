/* eslint-disable no-undef */
const cron = require('node-cron')
const request = require('request')

const useWarmUpVercelCronJob = () => {
    const CRON_JOB_URL = process.env.CRON_JOB_URL
    if (CRON_JOB_URL) {
        cron.schedule('*/5 * * * *', () => {
            request('CRON_JOB_URL', (error) => {
                if (error) console.log('error warming up vercel', error)
            })
        })
    }
}

module.exports = useWarmUpVercelCronJob
export const pageview = (url) => {
    if (window && window.gtag) {
        window.gtag('config', 'G-R7PBX04BJ2', {
            page_path: url,
        })
    }
}

export const event = ({ action, params }) => {
    window.gtag('event', action, params)
}
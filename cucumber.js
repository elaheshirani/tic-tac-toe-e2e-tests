const config = {
    import: [
        'src/steps/**/*.ts',
        'src/support/**/*.ts',
        'src/hooks/*.ts',
    ],
    format: [
        'progress-bar',
        'junit:playwright-report/results.xml',
        'html:playwright-report/report.html',
    ],
    formatOptions: { snippetInterface: 'async-await' },
}

export default config

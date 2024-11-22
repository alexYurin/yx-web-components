export const defineYxWebComponents = () => {
  import('@/components/ui').then(Components => {
    Object.keys(Components).forEach(componentKey => {
      const componentName = componentKey as keyof typeof Components

      if (Components[componentName]) {
        Components[componentName].define()
      }
    })
  })
}

export const setTheme = (themeName: 'light' | 'dark') => {
  document.body.classList.remove('theme-light', 'theme-dark')
  document.body.classList.add(`theme-${themeName}`)
}

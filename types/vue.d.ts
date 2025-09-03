
declare module 'vue' {
  // This seems to be needed to not break auto import types based on the order
  // https://github.com/vuejs/pinia/pull/2730
  interface GlobalComponents { }
  interface ComponentCustomProperties {
    /**
     * Access to the application's Pinia
     */
    $loading: (message: string) => void

  }
}

// normally this is only needed in .d.ts files
export { }
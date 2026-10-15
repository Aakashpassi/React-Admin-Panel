export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  USERS: {
    LIST: "/users",
    CREATE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  REPORTS: {
    LIST: "/reports",
    BY_ID: (id: string) => `/reports/${id}`,
  },

  SETTINGS: {
    GET: "/settings",
    UPDATE: "/settings",
  },
} as const;
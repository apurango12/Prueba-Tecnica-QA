import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Bonus: Reintentos inteligentes para evitar flakiness [cite: 95]
  retries: process.env.CI ? 2 : 1, 
  
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Bonus: Reportes HTML [cite: 95]

  /* Ajustes Senior para cumplir con los requisitos [cite: 33, 35] */
  use: {
    // REQUISITO: SauceDemo usa 'data-test' en lugar del estándar 'data-testid' 
    testIdAttribute: 'data-test',
    
    // REQUISITO: Buen manejo de timeouts y trazabilidad [cite: 35]
    actionTimeout: 10000,
    navigationTimeout: 15000,
    
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Ayuda a documentar fallos de la IA [cite: 7, 60]
  },

  /* REQUISITO: Configuración multi-browser [cite: 34] */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
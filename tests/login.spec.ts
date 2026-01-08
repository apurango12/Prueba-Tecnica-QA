import { test, expect } from '../fixtures/baseTest'; // Ruta a tu archivo de fixture
import { LOGIN_DATA, ERROR_MESSAGES } from '../utils/constants';

test.describe('Login Flow', () => {
    
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Debe loguearse con usuario estándar', async ({ loginPage, page }) => {
        await loginPage.login(LOGIN_DATA.STANDARD_USER, LOGIN_DATA.PASSWORD);
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('Debe mostrar error con usuario bloqueado', async ({ loginPage }) => {
        await loginPage.login(LOGIN_DATA.LOCKED_OUT_USER, LOGIN_DATA.PASSWORD);
        // Validamos usando el localizador definido en el Page Object
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(ERROR_MESSAGES.LOCKED_OUT);
    });
});
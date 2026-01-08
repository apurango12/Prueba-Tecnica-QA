# AI Code Review & Critical Analysis Report

## 1. Análisis de Fallos Iniciales (Post-Generación)
Tras la generación inicial con Cursor y MCP, se ejecutaron los tests obteniendo un 100% de fallos. Los hallazgos técnicos fueron:

* **Inconsistencia de Selectores (TimeoutError):** La IA generó locators usando `getByTestId('username')`, pero el framework no estaba configurado para reconocer el atributo `data-test` de SauceDemo.
* **Acoplamiento Excesivo:** El código original instanciaba `new LoginPage(page)` dentro de cada bloque de test, violando el principio DRY y dificultando la escalabilidad.
* **Fragilidad por Red (Navigation Timeout):** Los tests fallaron al navegar a la URL debido a que la IA no consideró estados de carga de red (`networkidle`), resultando en fallos intermitentes.

## 2. Mejoras de Ingeniería Humana 
Para estabilizar el framework y cumplir con los requisitos técnicos, realicé las siguientes refactorizaciones:

* **Inyección de Dependencias:** Implementé un **Custom Fixture** en `fixtures/baseTest.ts` para centralizar la instanciación de Page Objects.
* **Configuración de Atributos de Test:** Ajusté `playwright.config.ts` para definir `testIdAttribute: 'data-test'`, alineando el framework con el DOM real de la aplicación.
* **Capa de Constantes:** Moví credenciales y mensajes de error a `utils/constants.ts`, eliminando el "hardcoding" detectado en el código de la IA.
* **Robustez en Navegación:** Optimicé el método `goto()` en el Page Object para incluir esperas inteligentes, eliminando los errores de timeout en carga.

## 3. Conclusión
La IA proporcionó una estructura base útil, pero falló en la configuración fina y en patrones de diseño avanzados. Mi intervención aseguró un framework mantenible, multi-browser y alineado con las mejores prácticas de QA Automation.
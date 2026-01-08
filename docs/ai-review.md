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


# AI Code Review & Critical Analysis Report

## 1. Qué hizo bien la IA
* **Generación de Estructura Base:** Creó rápidamente el andamiaje del proyecto (folders, archivos de configuración inicial y boilerplate).
* **Identificación de Elementos:** Mediante el uso de MCP, logró identificar correctamente la mayoría de los selectores `data-test` de la página de login de SauceDemo.
* **Sugerencia de Flujos:** Propuso casos de prueba lógicos para el login (éxito y error) que cubren los requisitos básicos.

## 2. Qué hizo mal
* **Hardcoding de Datos:** La IA inicialmente incluyó credenciales y mensajes de error directamente en los tests en lugar de usar un archivo de constantes.
* **Instanciación Ineficiente:** Generó código que creaba instancias de Page Objects dentro de cada test (`new LoginPage`), lo cual no es escalable.
* **Configuración de Selectores:** No ajustó el `playwright.config.ts` para reconocer automáticamente `data-test` como el atributo de ID de prueba predeterminado, causando fallos por timeout.

## 3. Qué NO debería delegarse nunca a IA
* **Arquitectura de Alto Nivel:** La decisión de usar Fixtures para la inyección de dependencias es un patrón de diseño que debe definir el ingeniero para asegurar la mantenibilidad a largo plazo.
* **Validación de Reglas de Negocio Críticas:** El criterio para decidir qué constituye un "paso" o un "fallo" real en un flujo complejo requiere contexto humano que la IA no posee.
* **Seguridad y Manejo de Secretos:** La lógica de dónde y cómo se almacenan las credenciales sensibles nunca debe dejarse al azar de un modelo generativo.

## 4. Qué decisiones humanas mejoraron el framework
* **Implementación de Custom Fixtures:** Refactoricé el código para usar `baseTest.ts`, eliminando la necesidad de instanciar clases manualmente en cada test y limpiando los `beforeEach`.
* **Centralización de Utilidades:** Creé `utils/constants.ts` para gestionar mensajes y datos de prueba, facilitando cambios futuros en un solo punto.
* **Optimización de Timeouts y Esperas:** Configuré estados de red específicos (`networkidle`) para hacer los tests más robustos frente a latencias.

## 5. Limitaciones actuales del MCP (Model Context Protocol)
* **Visión Fragmentada:** El MCP a veces analiza archivos de forma aislada y no comprende cómo un cambio en `login.page.ts` afecta globalmente a la inyección de dependencias en los tests si no se le indica explícitamente.
* **Sincronización de Configuración:** No detecta automáticamente que la configuración global del framework (como el `testIdAttribute`) está desalineada con los selectores que está intentando generar.

## 6. Lecciones aprendidas
* La IA es un acelerador excelente para tareas repetitivas, pero requiere una **auditoría humana constante**.
* Un perfil Senior se distingue no por usar la IA, sino por su capacidad para **corregir y optimizar** lo que esta genera.
* La importancia de una estructura de archivos sólida desde el inicio previene que el código generado por IA se convierta en "código espagueti".
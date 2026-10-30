# PLAN DE INTEGRACIÓN Y SINCRONIZACIÓN EN TIEMPO REAL: GOOGLE DRIVE & GOOGLE SHEETS
**Proyecto:** Portal Institucional de Inducción SENA  
**Responsable Académico:** Marco Antonio Hernández (`maherca666@sena.edu.co`)  
**Normativa:** Acuerdo 009 de 2024 (Reglamento del Aprendiz SENA)  
**Fecha:** 2026-10-29  

---

## 1. RESUMEN EJECUTIVO Y OBJETIVO

El presente plan establece la arquitectura técnica, el modelo de datos y el flujo de trabajo para registrar y sincronizar de forma continua e instantánea las respuestas, avances formativos y calificaciones de los aprendices en una **Hoja de Cálculo de Google (Google Sheets)** alojada en la cuenta institucional de **Google Drive** del SENA.

Cada vez que un aprendiz:
1. Registra o actualiza su perfil de formación,
2. Completa un módulo de inducción (`Identidad`, `Derechos`, `Deberes`, `Bienestar`),
3. Presenta o reintenta la **Evaluación Interactiva de Apropiación**,
la plataforma despacha automáticamente un evento de sincronización hacia Google Sheets mediante la **Google Sheets API v4** o un **Webhook Serverless de Google Apps Script**, garantizando trazabilidad institucional y cero pérdida de datos.

---

## 2. ESQUEMA DE DATOS DE LA HOJA DE CÁLCULO (GOOGLE SHEETS)

La hoja principal en Google Drive llevará por nombre:
`SENA_Induccion_Aprendices_Consolidado_Nacional`

### Estructura de Columnas (18 Campos):
| Columna | Nombre de Cabecera | Tipo de Dato | Ejemplo de Registro | Descripción |
|---------|--------------------|--------------|---------------------|-------------|
| **A** | `Timestamp` | Datetime (ISO) | `2026-10-29 10:45:12` | Fecha y hora exacta de la última respuesta o actualización |
| **B** | `ID_Aprendiz` | String | `app-01` | Identificador único en el sistema de inducción |
| **C** | `Tipo_Documento` | Enum (CC, TI, CE) | `C.C.` | Tipo de documento de identidad |
| **D** | `Numero_Documento` | String (Digits) | `1020304050` | Número de cédula o documento registrado |
| **E** | `Nombre_Completo` | String | `Carlos Andrés Gómez Peña` | Nombres y apellidos completos del aprendiz |
| **F** | `Correo_Institucional` | Email | `carlos.gomez@soy.sena.edu.co` | Correo institucional `@soy.sena.edu.co` |
| **G** | `Ficha_Caracterizacion` | String (7 dígitos) | `2874102` | Código de la ficha del programa de formación |
| **H** | `Programa_Formacion` | String | `Análisis y Desarrollo de Software` | Nombre oficial del programa formativo |
| **I** | `Regional_Centro` | String | `Distrito Capital / CTCM` | Regional y Centro de Formación correspondiente |
| **J** | `Jornada` | Enum | `Diurna` | Jornada de formación (Diurna, Nocturna, Mixta, Virtual) |
| **K** | `Progreso_Identidad` | Porcentaje | `100%` | Avance en historia, misión y símbolos SENA |
| **L** | `Progreso_Derechos` | Porcentaje | `100%` | Avance en derechos (Acuerdo 009 de 2024) |
| **M** | `Progreso_Deberes` | Porcentaje | `100%` | Avance en deberes y prohibiciones |
| **N** | `Progreso_Bienestar` | Porcentaje | `100%` | Avance en rutas de Bienestar al Aprendiz |
| **O** | `Puntaje_Evaluacion`| Numérico (0-100)| `90%` | Calificación cuantitativa de la evaluación |
| **P** | `Calificacion_Letra`| Char ('A' / 'D')| `A` | Escala SENA: 'A' (Aprobado) o 'D' (Por Mejorar) |
| **Q** | `Codigo_Certificado`| String | `SENA-IND-2874102-4821` | Código verificable emitido para el portafolio |
| **R** | `Observaciones_Instructor` | Text | `Aprobó satisfactoriamente.` | Nota de seguimiento docente ingresada por el instructor |

---

## 3. ARQUITECTURA DE SINCRONIZACIÓN EN TIEMPO REAL

Existen dos vías de implementación para la persistencia en Google Drive:

```
    [ APRENDIZ EN NAVEGADOR ]
               │
               ▼
   Evento de interacción:
   - Completa módulo didáctico
   - Responde pregunta de evaluación
   - Finaliza cuestionario (Score A / D)
               │
               ├─────────────────────────────────────────┐
               ▼                                         ▼
   [ 1. LocalStorage Cache ]                [ 2. Sync Engine ]
   Garantiza persistencia local             Formatea payload JSON estándar
   incluso sin internet                     y gestiona reintentos exponenciales
                                                         │
               ┌─────────────────────────────────────────┴─────────┐
               ▼                                                   ▼
       [ Opción A: API Directa ]                         [ Opción B: Apps Script ]
    Google Sheets API v4 (OAuth)                      Google Apps Script Webhook
   - Scopes: drive.file, spreadsheets                - URL de despliegue institucional
   - Actualización directa de filas                  - Append / Upsert atómico por Documento
               │                                                   │
               └─────────────────────────┬─────────────────────────┘
                                         ▼
                   ┌────────────────────────────────────────┐
                   │  HOJA DE CÁLCULO GOOGLE SHEETS EN      │
                   │  GOOGLE DRIVE INSTITUCIONAL SENA       │
                   └────────────────────────────────────────┘
```

---

## 4. RUTAS DE IMPLEMENTACIÓN

### Opción A: Integración Oficial Google Workspace OAuth (Recomendada para Producción)
- **Alcance OAuth requerido:**
  - `https://www.googleapis.com/auth/spreadsheets`: Lectura y escritura en la hoja de cálculo.
  - `https://www.googleapis.com/auth/drive.file`: Creación y acceso al archivo dentro de la unidad de Google Drive.
- **Flujo de Autorización:**
  1. El instructor o administrador autoriza el acceso a Google Drive mediante la herramienta `set_up_oauth`.
  2. El sistema obtiene un Bearer token en el cliente y crea o localiza la hoja `SENA_Induccion_Aprendices_Consolidado_Nacional`.
  3. En cada respuesta del aprendiz, se invoca `spreadsheets.values.append` o `spreadsheets.values.batchUpdate`.

### Opción B: Webhook de Google Apps Script (Despliegue Inmediato Sin Credenciales de Cliente)
1. En Google Drive del instructor líder (`maherca666@sena.edu.co`), crear una Hoja de Cálculo.
2. Ir a **Extensiones > Apps Script** y pegar el siguiente script de sincronización atómica:

```javascript
/**
 * SENA Inducción - Receptor de Datos en Tiempo Real
 * Guarda o actualiza la fila según el Documento de Identidad del Aprendiz.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Si la hoja está vacía, insertar cabeceras oficiales
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "ID_Aprendiz", "Tipo_Doc", "Documento", "Nombre_Completo", 
        "Correo_SENA", "Ficha", "Programa", "Regional_Centro", "Jornada",
        "Progreso_Identidad", "Progreso_Derechos", "Progreso_Deberes", "Progreso_Bienestar",
        "Puntaje_Evaluacion", "Calificacion_Letra", "Codigo_Certificado", "Observaciones"
      ]);
    }
    
    var docNumber = String(data.documento);
    var allRows = sheet.getDataRange().getValues();
    var rowIndex = -1;
    
    // Buscar si el aprendiz ya tiene una fila registrada para actualizarla (Upsert)
    for (var i = 1; i < allRows.length; i++) {
      if (String(allRows[i][3]) === docNumber) {
        rowIndex = i + 1;
        break;
      }
    }
    
    var rowValues = [
      new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      data.id || "",
      data.tipoDoc || "C.C.",
      docNumber,
      data.nombre || "",
      data.correo || "",
      data.ficha || "",
      data.programa || "",
      data.regional || "Regional Distrito Capital",
      data.jornada || "Diurna",
      (data.progresoModulos?.identidad || 0) + "%",
      (data.progresoModulos?.derechos || 0) + "%",
      (data.progresoModulos?.deberes || 0) + "%",
      (data.progresoModulos?.bienestar || 0) + "%",
      data.puntajeEvaluacion !== null ? data.puntajeEvaluacion + "%" : "Pendiente",
      data.calificacionLetra || "Pendiente",
      data.certificadoCodigo || "N/A",
      data.observacionesInstructor || ""
    ];
    
    if (rowIndex > 0) {
      // Actualizar fila existente
      sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
    } else {
      // Insertar nuevo aprendiz
      sheet.appendRow(rowValues);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      syncedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Publicar como **Aplicación Web** con acceso "Cualquier persona" (anónimo o con cuenta SENA).
4. Copiar la URL del Webhook generada y pegarla en el panel de sincronización de la plataforma.

---

## 5. EXPERIENCIA DE CONTINGENCIA Y EXPORTACIÓN DIRECTA

Mientras se habilita la conexión en la nube, el sistema incluye:
1. **Descarga Instantánea en Formato CSV / Excel Compatible:** Permite al instructor descargar el archivo con un clic y abrirlo directamente en Google Drive.
2. **Registro de Eventos en Vivo:** Monitor visual en el panel del instructor que muestra cada transacción de sincronización en tiempo real.
3. **Persistencia Local Segura:** Ninguna respuesta se pierde ante cortes de red gracias al almacenamiento en búfer.

---

*Plan formulado para la Dirección de Formación Profesional del SENA · 2026*

# WD401 Level-8 Submission Documentation

## Dynamic Content Translation:

- Implement a system for translating dynamic content within the React.js application. This involves creating language files or dictionaries that store translations for different languages.
- Integrate a mechanism to dynamically switch between languages based on user preferences or system settings. Apply translation to various components, text elements, and messages throughout the application to ensure a seamless multilingual user experience.

### Introduction

The Dynamic Content Translation feature enables the translation of text content within a React.js application, allowing for a multilingual user experience.

#### Steps to Implement

1. **Setup i18n Library**: Install and configure an i18n library for React.js. Popular choices include react-i18next, react-intl, or i18next, i18next-browser-languagedetector
2. **Create Language Files or Dictionaries**: Define language files or dictionaries that store translations for different languages. These files should contain key-value pairs where keys represent the original text in the default language, and values represent translations in other languages.

`en.json: English translation`

```json
{
  "translation": {
    "Assignee": "Assignee",
    "Cancel": "Cancel",
    "Comments": "Comments",
    "Create": "Create",
    "Signin": "Sign In",
    "Signup": "Sign Up",
    "Submit": "Submit",
    "Task": "Task",
    "Title": "Title",
    "Update": "Update",
    "Name": "Name",
    "TaskDetails": "Task Details"
    // Rest of the translations
  }
}
```

`es.json: Spanish Translation`

```json
{
  "translation": {
    "Assignee": "Cesionario",
    "Cancel": "Cancelar",
    "Comments": "Comentarios",
    "Create": "Crear",
    "Signin": "Iniciar sesión",
    "Signup": "Inscribirse",
    "Submit": "Entregar",
    "Task": "Tarea",
    "Title": "Título",
    "Update": "Actualizar",
    "Name": "Nombre",
    "TaskDetails": "Detalles de la tarea"
    //Rest of the Translation
  }
}
```

3. **Integrate i18n Library**: Integrate the chosen i18n library into your React.js application. This typically involves initializing the i18n instance, loading language files, and setting the default language.

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import esJSON from "./locale/es.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: { ...enJSON },
      es: { ...esJSON },
    },
    fallbackLng: "en",
  });
```

4. **Implement Language Switching Mechanism**: Create a mechanism to dynamically switch between languages based on user preferences or system settings.

```jsx
<Switch
  checked={currentLanguage === "es"}
  onChange={() => {
    changeLanguage(currentLanguage === "en" ? "es" : "en");
  }}
  className={`${
    currentLanguage === "es" ? "bg-slate-400" : "bg-slate-700"
  } relative inline-flex h-7 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
>
  <span
    className={`${
      currentLanguage === "es" ? "translate-x-9" : "translate-x-0"
    } inline-block w-6 h-6 transform bg-white rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
  />
</Switch>
```

5. **Apply Translation to Components**: Apply translation to various components, text elements, and messages throughout the application.

```tsx
<button type="submit" onClick={closeModal}>
  {t("Cancel")}
</button>;

<p className="text-lg text-gray-600 py-3">{t("PageNotFound")}</p>;
```

![image](https://github.com/Rishith25/gitflow/assets/119791436/3496fe23-3811-4e4f-ad95-a4970ac3a285)

![image](https://github.com/Rishith25/gitflow/assets/119791436/cb421c57-f63c-4c04-ae95-76331b2ecc1b)

## Date and Time Localization:

- Localize date and time formats to accommodate different cultural preferences. Consider the variations in date formats (e.g., MM/DD/YYYY or DD/MM/YYYY) and time formats (12-hour vs. 24-hour clock).
- Utilize libraries or functions that handle date and time localization, ensuring that timestamps are presented in a format consistent with the user's locale.

### Date localisation

Date localisation involves formatting dates according to the conventions of a specific locale. In most programming languages, you can use built-in libraries or third-party libraries to handle date formatting. In JavaScript, we can make use of Intl.DateTimeFormat to format date and time.

```tsx
const date = new Date();

// Create a date formatter for a specific locale
const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Format the date
const formattedDate = dateFormatter.format(date); // Example output: "27 septembre 2023"
```

### Time localisation

Localizing times involves formatting time values according to locale-specific conventions. You can use a similar approach as with date localisation, but this time focusing on time formatting.

```tsx
const date = new Date();

// Create a time formatter for a specific locale
const timeFormatter = new Intl.DateTimeFormat("de-DE", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

// Format the time
const formattedTime = timeFormatter.format(date); // Example output: "14:30:15"
```

`task.tsx`

```tsx
const formatDateForPicker = (
  isoDate: string,
  t: (key: string) => string,
  i18n: any
) => {
  const dateObj = new Date(isoDate);

  let localeObject;
  switch (i18n.language) {
    case "es":
      localeObject = "fr-ES";
      break;
    default:
      localeObject = "en-US";
  }

  const dateFormatter = new Intl.DateTimeFormat(localeObject, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = dateFormatter.format(dateObj);
  return formattedDate;
};
//Rest of the code
```

```tsx
  const { t, i18n } = useTranslation();

  return (
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {formatDateForPicker(task.dueDate, t, i18n)}
            </p>
            <p className="text-sm text-slate-500">
              {t("Description")}: {task.description}
            </p>
            <p className="text-sm text-slate-500">
              {t("Assignee")}: {task.assignedUserName ?? "-"}
            </p>
          </div>
          //Rest of the code
);
```

- English Date Time Format

![image](https://github.com/Rishith25/gitflow/assets/119791436/7beafda9-e42b-4e46-8d67-a104c2da8ea3)

- Spanish Date Time Format

![image](https://github.com/Rishith25/gitflow/assets/119791436/7aadb151-3b93-4dbb-9581-c48afdf81cb0)

![image](https://github.com/Rishith25/gitflow/assets/119791436/e6c4a052-6855-4842-ab5c-258ceaf6d3d7)

## Locale Switching:

- Implement a user interface (UI) component or a settings panel that allows users to select their preferred language/locale.
- Enable the application to respond dynamically to locale changes, updating content and formatting according to the selected locale.
- Ensure that the locale switch is persistent across sessions, providing a smooth and personalized experience for users who want to interact with the application in their preferred language.

### Introduction:

Locale switching is a crucial feature in internationalization and localization (i18n and l10n) processes, enabling users to interact with applications in their preferred language or region. This documentation outlines the implementation and usage of locale switching within a React.js application.

### Implementation:

- User Interface Component:
  Implement a UI component for selecting the preferred language/locale. This component could be a dropdown menu, a list of flags representing different languages, or any other intuitive interface.
- Settings Panel:
  Integrate a settings panel where users can access the language/locale preferences. This panel should provide clear options for selecting the desired language.

`Appbar.tsx`

```tsx
import { useTranslation } from "react-i18next";

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "/logout" },
];

const Appbar = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <div>
            {/* Language Switcher */}
            <div>
              <Menu as="div">
                <Menu.Button>
                  {/* Display current language */}
                  {currentLanguage === "en"
                    ? "English"
                    : currentLanguage === "es"
                    ? "Spanish"
                    : "German"}{" "}
                </Menu.Button>

                {/* Language dropdown */}
                <Menu.Items>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => changeLanguage("es")}>
                        Spanish
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => changeLanguage("gr")}>
                        German
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
```

### Output

![image](https://github.com/Rishith25/gitflow/assets/119791436/845a5751-b8c4-494a-bab9-02b06090b590)

![image](https://github.com/Rishith25/gitflow/assets/119791436/ff3521d7-a827-40d3-a324-201222d5ffc3)

## Video

[Video-1](https://www.loom.com/share/01cad01b9a594d90a9c60c23b2ae9e01?sid=19777daa-9a7b-46b8-96d0-59f7c4d3631c)
[Video-2](https://www.loom.com/share/11bd6656c9ce480f863278708a7fe529)

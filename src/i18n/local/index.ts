// @ts-ignore - import.meta.glob is a Vite feature
const modules = import.meta.glob('./*/*.ts', { eager: true }) as Record<string, { default?: Record<string, string> }>;

const messages: Record<string, { translation: Record<string, string> }> = {};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (match) {
    const [, lang] = match;
    const module = modules[path] as { default?: Record<string, string> };
    
    if (!messages[lang]) {
      messages[lang] = { translation: {} };
    }
    
    // 合并翻译内容
    if (module.default) {
      messages[lang].translation = {
        ...messages[lang].translation,
        ...module.default
      };
    }
  }
});

export default messages; 
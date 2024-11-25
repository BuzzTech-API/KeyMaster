// Ivan Germano: Essa é a classe que permite criar Logs separados por categorias.
// Escutei a sugestões de vocês e implementei essa classe. É bem simples de configurar.

// Ivan Germano: Essa é a lista de categorias, para adicionar uma categoria, basta colocar "|" e em seguida o nome da categoria.
type LogCategories = 'blacklist' | 'session' | 'login' ;

class Logger {
  private static enabledCategories: Set<LogCategories> = new Set();

  // Ivan Germano: Essa é a função para ativar logs de uma categoria específica.
  static enableCategory(category: LogCategories) {
    this.enabledCategories.add(category);
  }

  // Ivan Germano: Já essa função desativar logs de uma categoria específica.
  static disableCategory(category: LogCategories) {
    this.enabledCategories.delete(category);
  }

  // Ivan Germano: Essa é a função que criar as mensagens de log de uma categoria específica.
  static log(category: LogCategories, message: string) {
    if (this.enabledCategories.has(category)) {
      console.log(`[${category.toUpperCase()}]: ${message}`);
    }
  }

  // Ivan Germano: Essa função da a opção de logs de erro para uma categoria específica.
  static error(category: LogCategories, message: string) {
    if (this.enabledCategories.has(category)) {
      console.error(`[${category.toUpperCase()} ERROR]: ${message}`);
    }
  }
}

export { Logger, LogCategories };

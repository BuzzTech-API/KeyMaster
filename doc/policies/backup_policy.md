# Política de Backup - Sistema KeyMaster

## Visão Geral

> O Sistema KeyMaster exige uma política confiável de backup e restauração para garantir a integridade e a continuidade dos dados. Este documento detalha as etapas, responsabilidades, estrutura de pastas e comandos necessários para realizar backups e restaurações do banco de dados PostgreSQL, enquanto se adere aos padrões de segurança e proteção de dados.

## Objetivos 

- **Integridade dos Dados**: Garantir a segurança dos dados dos usuários e evitar a recuperação não autorizada após a exclusão, cumprindo a LGPD (Lei Geral de Proteção de Dados).

- **Segurança**: Criptografar os arquivos de backup para evitar acesso não autorizado.

- **Redundância**: Utilizar logs manuais e bancos de dados NoSQL (MongoDB) para rastrear usuários excluídos, garantindo a sanitização adequada durante as restaurações.

- **Processo Manual com Potencial de Automação**: Inicialmente, os backups e restaurações são manuais, com potencial para serem automatizados no futuro.

## Estrutura de Pastas

A estrutura de pastas recomendada para armazenar scripts de backup e restauração, bem como arquivos de backup, é:

```bash
C:\Users\<Username>\Desktop\backUp_KeyMaster\
|
|-- backups\             # Armazena arquivos de backup e restauração do banco de dados
|   |-- keymaster_backup.bak        # Arquivo de backup criptografado
|   |-- keymaster_backup_restored.bak   # Arquivo de backup descriptografado para restauração
|
|-- scripts\             # Armazena scripts de backup e restauração
|   |-- backup_keymaster.ps1    # Script PowerShell para criar backups
|   |-- restore_keymaster.ps1   # Script PowerShell para restaurar backups
```

## Processo de Backup

O processo de backup inclui a criação de um dump do banco de dados PostgreSQL e a criptografia do arquivo usando GPG para segurança.

### 1. Requisitos para Backup e Criptografia
Para realizar o backup e a criptografia, são necessários os seguintes requisitos:

- **PostgreSQL**: Ferramenta pg_dump para criar backups do banco de dados.

- **Gpg4win**: Ferramenta para criptografia de arquivos usando GPG. Pode ser baixada e instalada a partir do site oficial: https://www.gpg4win.org/.

- **Configuração do PATH**: Certifique-se de que as ferramentas pg_dump e gpg estejam disponíveis no PATH do sistema para serem usadas diretamente no terminal.

### 2. Criando o Backup

#### 2.1 Backup com PostgreSQL (pg_dump)

Crie um backup compactado do banco de dados:

```bash
# Execute este comando no PowerShell para criar um backup
pg_dump -U admin -h localhost -d keymaster -F c -b -v -f "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak"
```

#### Explicação dos Parâmetros:

- -U admin: Especifica o usuário do banco de dados.

- -h localhost: O host do banco de dados.

- -d keymaster: O nome do banco de dados.

- -F c: Formato personalizado para o arquivo de saída.

- -f backup.bak: Especifica o nome do arquivo de backup.

#### 2.2 Criptografando o Arquivo de Backup (GPG)

Criptografe o backup para protegê-lo:

```bash
# Criptografe o arquivo de backup
gpg -c "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak"
```

> _Durante a criptografia, será solicitado que você insira uma senha. Armazene essa senha de forma segura, pois ela será necessária para descriptografar o backup para restauração._

#### 2.3 Executando o Script de Backup

Para realizar o backup usando o script, execute o seguinte comando no PowerShell:

```bash
# Execute o script de backup
C:\Users\<Username>\Desktop\backUp_KeyMaster\scripts\backup_keymaster.ps1
```

### 3. Agendamento de Backups

Embora os backups sejam atualmente manuais, a automação pode ser configurada no futuro usando:

- **Task Scheduler (Windows)**: Agendar scripts PowerShell para serem executados diariamente, semanalmente ou mensalmente.

- **Cron Jobs (Linux)**: Usar cron jobs para automatizar scripts, especificando a frequência no crontab.

## Processo de Restauração

A restauração do banco de dados envolve a descriptografia do arquivo de backup e o uso do pg_restore para reintegrar os dados. Este processo deve ser realizado por um administrador autorizado.

### 1. Descriptografando o Arquivo de Backup

Para descriptografar o arquivo de backup:

```bash
# Descriptografe o arquivo de backup para restauração
gpg --batch --yes --decrypt -o "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup_restored.bak" "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak.gpg"
```

Explicação dos Parâmetros:

- --batch --yes: Responde automaticamente "sim" para sobrescrever arquivos existentes.

- -o keymaster_backup_restored.bak: Especifica o arquivo de saída.

### 1.2 Executando o Script de Restauração

Para realizar a restauração usando o script, execute o seguinte comando no PowerShell:

```bash
# Execute o script de restauração
C:\Users\<Username>\Desktop\backUp_KeyMaster\scripts\restore_keymaster.ps1
```

### 2. Restaurando o Backup (pg_restore)

Execute o seguinte comando para restaurar o backup:

```bash
pg_restore --clean --if-exists -U admin -h localhost -d keymaster -v "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup_restored.bak"
```

Explicação dos Parâmetros:

- --clean --if-exists: Remove objetos antes de recriá-los para evitar conflitos.

- -U admin -h localhost -d keymaster: Credenciais do banco de dados.

- -v: Modo verboso para fornecer saída detalhada.

## Modo de Manutenção

> Durante a restauração, o backend da aplicação deve ser temporariamente desligado para evitar inconsistências. Assim que a restauração for concluída, o backend deve ser reiniciado, e a função de sanitização deve ser executada para garantir a conformidade com a LGPD.

## Sanitização Após Restauração

Após restaurar um backup, é crucial garantir que qualquer usuário previamente excluído (de acordo com a LGPD) não seja restaurado inadvertidamente. O script de sanitização verifica:

- **Blacklist no MongoDB**: Usuários que foram excluídos e não devem ser restaurados.

- **Arquivo de Log (deletion_log.json)**: Se a conexão com o MongoDB falhar, o arquivo de log atua como uma verificação secundária.

A função de sanitização é acionada como parte do processo de restauração para garantir a integridade dos dados.

## Potencial de Automação Futura

Para aumentar a confiabilidade e reduzir a intervenção manual, os seguintes recursos de automação poderiam ser implementados no futuro:

- Backups Automatizados: Tarefas agendadas para criação regular de backups.

- Monitoramento de Saúde: Verificações automáticas que confirmam a criação e restauração bem-sucedidas dos backups.

- Sistema de Alerta: Notificações via e-mail ou plataformas de mensagens quando um backup falhar.

## Possíveis Erros e Soluções

### *Erro ao Executar pg_dump ou pg_restore*

> Erro: pg_dump: comando não encontrado ou pg_restore: comando não encontrado.

- **Solução**: Certifique-se de que o PostgreSQL está instalado e que o caminho (PATH) para pg_dump e pg_restore está corretamente configurado nas variáveis de ambiente do sistema.

### *Erro ao Executar gpg*

> Erro: gpg: comando não encontrado.

- **Solução**: Certifique-se de que o Gpg4win está instalado e que o caminho (PATH) para gpg está corretamente configurado.

### *Problemas de Permissão*

> Erro: Permissão negada ao tentar acessar ou criar arquivos de backup.

- **Solução 1**: Execute o PowerShell como Administrador para garantir permissões adequadas para leitura e gravação dos arquivos.
- **Solução 2**: Habilitar o PowerShell para executar scripts:

Verifique a Política de Execução Atual

- Digite o seguinte comando e pressione Enter:
```bash
Get-ExecutionPolicy
```
Alterar a Política de Execução :

- Para permitir a execução de scripts locais, você pode definir uma política como "RemoteSigned". Isso permite que scripts locais sejam executados sem restrições, mas exige que scripts baixados de fontes remotas sejam solicitados por um editor confiável.
```bash
Set-ExecutionPolicy RemoteSigned
```

## Papéis e Responsabilidades

- **Administrador**: Responsável por executar os scripts de backup e restauração, gerenciar as chaves de criptografia e garantir que o backend esteja em modo de manutenção durante operações críticas.

- **Equipe de Desenvolvimento**: Mantém e atualiza os scripts conforme o sistema evolui.

## Resumo dos Comandos

### Criação do Backup

```bash
pg_dump -U admin -h localhost -d keymaster -F c -b -v -f "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak"
gpg -c "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak"
```

### Restauração do Backup

```bash
gpg --batch --yes --decrypt -o "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup_restored.bak" "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup.bak.gpg"

pg_restore --clean --if-exists -U admin -h localhost -d keymaster -v "C:\Users\<Username>\Desktop\backUp_KeyMaster\backups\keymaster_backup_restored.bak"
```

> Esta política de backup visa garantir a integridade e a disponibilidade do sistema KeyMaster, mantendo a conformidade com as regulamentações de proteção de dados.
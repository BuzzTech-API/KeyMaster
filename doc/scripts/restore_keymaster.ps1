# Ivan Germano: Este é um template do script que estamos utilizando para restaurar um BackUp do BD principal.

                                                                          # Sugestão de nome/estrutura de pastas
$encryptedBackupFile = "<caminho para o arquivo de backup salvo encriptado>\backUp_KeyMaster\backups\keymaster_backup.bak.gpg"

# Caminho onde o arquivo descriptografado será salvo                      # Sugestão de nome/estrutura de pastas
$decryptedBackupFile = "<caminho para o arquivo de backup descriptografado>\backUp_KeyMaster\backups\keymaster_backup_restored.bak"

# Restaurar o arquivo de backup do PostgreSQL
try {
    # Descriptografar o backup criptografado
    & gpg --batch --yes --decrypt -o "$decryptedBackupFile" "$encryptedBackupFile"

    if (-not (Test-Path $decryptedBackupFile)) {
        throw "Erro ao descriptografar o arquivo de backup. Arquivo não encontrado: $decryptedBackupFile"
    }

    # Restaurar o backup do banco de dados
     pg_restore --clean --if-exists -U admin -h localhost -d keymaster -v "$decryptedBackupFile"
    Write-Output "Restauração do banco de dados concluída com sucesso!"
} catch {
    Write-Error "Erro ao restaurar o backup do banco de dados: $_"
}


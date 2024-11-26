# Ivan Germano: Este é um template do script que estamos utilizando para o BackUp do BD principal.
$backupFolder = "<caminho para pasta de backup>\backUp_KeyMaster\backups"
$backupFile = "$backupFolder\keymaster_backup.bak"  # Nome do arquivo de BackUp

# Criar a pasta de backups se não existir
if (-not (Test-Path $backupFolder)) {
    New-Item -Path $backupFolder -ItemType Directory
}

# Comando para gerar o backup
pg_dump -U admin -h localhost -d keymaster -F c -b -v -f $backupFile

# Verificar se o backup foi criado com sucesso
if (Test-Path $backupFile) {
    Write-Output "Backup criado com sucesso: $backupFile"
    # Criptografar o backup
    gpg -c $backupFile
    Remove-Item $backupFile # Remover o backup não criptografado
} else {
    Write-Output "Erro ao criar o backup."
}
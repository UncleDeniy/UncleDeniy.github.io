# Arch / CachyOS: удобный post-install checklist

> [!TIP]
> Эту статью удобно использовать как **опорный шаблон** после чистой установки системы.

## 1. Обновление системы

```bash
sudo pacman -Syu
```

## 2. Базовые пакеты

```bash
sudo pacman -S --needed git curl wget htop btop fastfetch unzip p7zip ufw openssh rsync nano
```

## 3. Включить нужные службы

```bash
sudo systemctl enable --now sshd
sudo systemctl enable --now ufw
```

## 4. Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
sudo ufw status verbose
```

## 5. Снапшоты и бэкапы

- если Btrfs — настроить snapshots;
- если ext4 — хотя бы сделать rsync/Restic схему;
- проверить, где лежат важные конфиги.

## 6. Что ещё стоит поставить

| Категория | Что поставить |
|---|---|
| Сеть | `networkmanager`, `wireguard-tools`, `nmap`, `wireshark-qt` |
| Диски | `smartmontools`, `gparted`, `nvme-cli` |
| Разработка | `base-devel`, `python`, `python-pip`, `nodejs`, `npm` |
| Диагностика | `lsof`, `strace`, `dmidecode` |

## 7. Личный контрольный список

- [ ] hostname
- [ ] часовой пояс
- [ ] ssh
- [ ] firewall
- [ ] резервные копии
- [ ] браузер
- [ ] кодеки
- [ ] Telegram / мессенджеры
- [ ] пакеты для твоего рабочего процесса

> [!NOTE]
> В SysHelper можно хранить такие статьи в `.md`, а потом быстро открывать их в красивом виде без отдельного редактора.

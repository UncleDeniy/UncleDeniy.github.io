window.SysHelperArticleManifest = [
{
    "id": "mikrotik-nat-basics",
    "title": "MikroTik NAT: база и типовые правила",
    "category": "Сети",
    "tags": [
        "mikrotik",
        "nat",
        "routeros",
        "network"
    ],
    "description": "Короткая шпаргалка по srcnat, dstnat, masquerade и частым ошибкам.",
    "updated": "2026-04-21",
    "author": "SysHelper",
    "source": "articles/md/mikrotik-nat-basics.md",
    "cover": "articles/images/mikrotik.png",
    "views": 842,
    "inlineContent": "# MikroTik NAT: база и типовые правила\n\n> [!NOTE]\n> Это быстрая практическая статья. Она рассчитана на момент, когда тебе нужно **быстро вспомнить правило**, а не читать длинную теорию.\n\n## Что такое NAT в RouterOS\n\nВ MikroTik NAT чаще всего используется в двух вариантах:\n\n- **srcnat** — когда локальная сеть выходит наружу\n- **dstnat** — когда внешний запрос пробрасывается внутрь\n\n### Базовый masquerade\n\n```rsc\n/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment=\"WAN masquerade\"\n```\n\n> [!TIP]\n> Для домашнего роутера и динамического IP чаще всего достаточно именно `masquerade`.\n\n## Базовый проброс RDP\n\n```rsc\n/ip firewall nat add chain=dstnat protocol=tcp dst-port=3390 in-interface=ether1 action=dst-nat to-addresses=192.168.10.100 to-ports=3389 comment=\"RDP to Server\"\n```\n\nПосле этого проверь:\n\n1. слушает ли сервер нужный порт;\n2. открыт ли firewall на Windows;\n3. правильный ли `in-interface`;\n4. не ломает ли правило порядок NAT.\n\n## Частые ошибки\n\n| Проблема | Что проверить | Примечание |\n|---|---|---|\n| Проброс не работает | `in-interface`, порт, адрес назначения | Очень частая ошибка — неверный WAN интерфейс |\n| Интернет есть, но странно работает | несколько srcnat правил | Посмотри порядок правил |\n| Локально сервис доступен, извне нет | firewall filter | NAT и filter — это разные вещи |\n\n## Удобные команды проверки\n\n```rsc\n/ip firewall nat print detail\n/ip firewall filter print stats\n/ip address print\n/ip route print\n```\n\n## Мини-чеклист\n\n- WAN интерфейс определён правильно\n- Внутренний IP устройства статический\n- Сервис реально слушает нужный порт\n- На Windows/Linux открыт firewall\n- Провайдер не режет входящие\n\n> [!WARNING]\n> Не открывай RDP наружу без необходимости. Лучше использовать VPN, WireGuard или хотя бы белый список адресов.\n",
    "featured": true
},
{
    "id": "arch-postinstall-checklist",
    "title": "Arch / CachyOS: удобный post-install checklist",
    "category": "Linux",
    "tags": [
        "arch",
        "cachyos",
        "linux",
        "postinstall"
    ],
    "description": "Что сделать после установки: пакеты, ssh, firewall, снапшоты, бэкапы.",
    "updated": "2026-04-21",
    "author": "SysHelper",
    "source": "articles/md/arch-postinstall-checklist.md",
    "cover": "articles/images/arch.png",
    "views": 615,
    "inlineContent": "# Arch / CachyOS: удобный post-install checklist\n\n> [!TIP]\n> Эту статью удобно использовать как **опорный шаблон** после чистой установки системы.\n\n## 1. Обновление системы\n\n```bash\nsudo pacman -Syu\n```\n\n## 2. Базовые пакеты\n\n```bash\nsudo pacman -S --needed git curl wget htop btop fastfetch unzip p7zip ufw openssh rsync nano\n```\n\n## 3. Включить нужные службы\n\n```bash\nsudo systemctl enable --now sshd\nsudo systemctl enable --now ufw\n```\n\n## 4. Firewall\n\n```bash\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow ssh\nsudo ufw enable\nsudo ufw status verbose\n```\n\n## 5. Снапшоты и бэкапы\n\n- если Btrfs — настроить snapshots;\n- если ext4 — хотя бы сделать rsync/Restic схему;\n- проверить, где лежат важные конфиги.\n\n## 6. Что ещё стоит поставить\n\n| Категория | Что поставить |\n|---|---|\n| Сеть | `networkmanager`, `wireguard-tools`, `nmap`, `wireshark-qt` |\n| Диски | `smartmontools`, `gparted`, `nvme-cli` |\n| Разработка | `base-devel`, `python`, `python-pip`, `nodejs`, `npm` |\n| Диагностика | `lsof`, `strace`, `dmidecode` |\n\n## 7. Личный контрольный список\n\n- [ ] hostname\n- [ ] часовой пояс\n- [ ] ssh\n- [ ] firewall\n- [ ] резервные копии\n- [ ] браузер\n- [ ] кодеки\n- [ ] Telegram / мессенджеры\n- [ ] пакеты для твоего рабочего процесса\n\n> [!NOTE]\n> В SysHelper можно хранить такие статьи в `.md`, а потом быстро открывать их в красивом виде без отдельного редактора.\n",
    "featured": true
},
{
    "id": "windows-rdp-quickfix",
    "title": "Windows RDP: быстрый чеклист, если не пускает",
    "category": "Windows",
    "tags": [
        "windows",
        "rdp",
        "remote",
        "mstsc"
    ],
    "description": "Права, firewall, порт, NLA и команды для быстрой диагностики.",
    "updated": "2026-04-21",
    "author": "SysHelper",
    "source": "articles/md/windows-rdp-quickfix.md",
    "cover": "articles/images/rdp.png",
    "views": 731,
    "inlineContent": "# Windows RDP: быстрый чеклист, если не пускает\n\n## Базовый сценарий\n\nКогда RDP не подключается, обычно надо проверить:\n\n1. включён ли удалённый доступ;\n2. слушает ли порт;\n3. открыт ли firewall;\n4. нет ли ошибки в NAT / VPN / маршруте.\n\n## Проверка порта\n\n```powershell\nnetstat -an | find \"3389\"\n```\n\nЕсли слушаешь нестандартный порт:\n\n```powershell\nnetstat -an | find \"3390\"\n```\n\n## Firewall\n\n```powershell\nGet-NetFirewallRule -DisplayGroup \"Remote Desktop\"\n```\n\n## Проверка пользователя\n\n- пользователь должен иметь право на вход по RDP;\n- на Home редакциях обычный RDP host не работает;\n- иногда мешает NLA.\n\n> [!WARNING]\n> Не отключай безопасность просто ради теста надолго. Делай временную диагностику, а потом возвращай защищённую конфигурацию.\n\n## Быстрый итог\n\n- локально сервис работает;\n- по IP внутри сети заходит;\n- через NAT уже не заходит;\n- значит проблема обычно не в Windows, а в маршруте, firewall или пробросе.\n",
    "featured": false
}
];

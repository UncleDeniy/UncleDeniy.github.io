# MikroTik NAT: база и типовые правила

> [!NOTE]
> Это быстрая практическая статья. Она рассчитана на момент, когда тебе нужно **быстро вспомнить правило**, а не читать длинную теорию.

## Что такое NAT в RouterOS

В MikroTik NAT чаще всего используется в двух вариантах:

- **srcnat** — когда локальная сеть выходит наружу
- **dstnat** — когда внешний запрос пробрасывается внутрь

### Базовый masquerade

```rsc
/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment="WAN masquerade"
```

> [!TIP]
> Для домашнего роутера и динамического IP чаще всего достаточно именно `masquerade`.

## Базовый проброс RDP

```rsc
/ip firewall nat add chain=dstnat protocol=tcp dst-port=3390 in-interface=ether1 action=dst-nat to-addresses=192.168.10.100 to-ports=3389 comment="RDP to Server"
```

После этого проверь:

1. слушает ли сервер нужный порт;
2. открыт ли firewall на Windows;
3. правильный ли `in-interface`;
4. не ломает ли правило порядок NAT.

## Частые ошибки

| Проблема | Что проверить | Примечание |
|---|---|---|
| Проброс не работает | `in-interface`, порт, адрес назначения | Очень частая ошибка — неверный WAN интерфейс |
| Интернет есть, но странно работает | несколько srcnat правил | Посмотри порядок правил |
| Локально сервис доступен, извне нет | firewall filter | NAT и filter — это разные вещи |

## Удобные команды проверки

```rsc
/ip firewall nat print detail
/ip firewall filter print stats
/ip address print
/ip route print
```

## Мини-чеклист

- WAN интерфейс определён правильно
- Внутренний IP устройства статический
- Сервис реально слушает нужный порт
- На Windows/Linux открыт firewall
- Провайдер не режет входящие

> [!WARNING]
> Не открывай RDP наружу без необходимости. Лучше использовать VPN, WireGuard или хотя бы белый список адресов.

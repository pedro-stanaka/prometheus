import { ActionIcon, Indicator, Popover, Card, Text, Stack, ScrollArea, Group } from "@mantine/core";
import { IconBell, IconAlertTriangle, IconNetworkOff } from "@tabler/icons-react";
import { useNotifications } from '../state/useNotifications';
import { actionIconStyle } from "../styles";
import { useSettings } from '../state/settingsSlice';
import { formatTimestamp } from "../lib/formatTime";

const NotificationsIcon = () => {
  const { notifications, isConnectionError } = useNotifications();
  const { useLocalTime } = useSettings();

  return (
    (notifications.length === 0 && !isConnectionError) ? null : (
      <Indicator
        color={"red"}
        size={16}
        label={isConnectionError ? "!" : notifications.length}
      >
        <Popover position="bottom-end" shadow="md" withArrow>
          <Popover.Target>
            <ActionIcon color="gray" title="Notifications" aria-label="Notifications" size={32}>
              <IconBell  style={actionIconStyle}/>
            </ActionIcon>
          </Popover.Target>

          <Popover.Dropdown>
            <Stack gap="xs">
              <Text fw={700} size="xs" color="dimmed" ta="center">Notifications</Text>
              <ScrollArea.Autosize mah={200}>
                { isConnectionError ? (
                  <Card p="xs" color="red">
                    <Group wrap="nowrap">
                      <IconNetworkOff color="red" size={20} />
                      <Stack gap="0">
                        <Text size="sm" fw={500}>Real-time notifications interrupted.</Text>
                        <Text size="xs" color="dimmed">Please refresh the page or check your connection.</Text>
                      </Stack>
                    </Group>
                  </Card>
                ) : notifications.length === 0 ? (
                  <Text ta="center" color="dimmed">No notifications</Text>
                ) : (notifications.map((notification, index) => (
                  <Card key={index} p="xs">
                    <Group wrap="nowrap">
                      <IconAlertTriangle color="red" size={20} />
                      <Stack style={{ maxWidth: 250 }} gap={0}>
                        <Text size="sm" fw={500}>{notification.text}</Text>
                        <Text size="xs" color="dimmed">{formatTimestamp(new Date(notification.date).valueOf() / 1000, useLocalTime)}</Text>
                      </Stack>
                    </Group>
                  </Card>
                )))}
              </ScrollArea.Autosize>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Indicator>
    )
  );
};

export default NotificationsIcon;

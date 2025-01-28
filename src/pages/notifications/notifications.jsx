import { useEffect, createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  readNotification,
} from "@/store/slicers/notificationsSlicer.js";

import * as styled from "./notificationsStyles.js";
import icons from "@/assets/icons";

export const Notifications = ({ windowHeight, toastMessage }) => {
  const { notifications } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const iconSwitch = (type) => {
    switch (type) {
      case "feed":
        return icons.SVGFeed;
      case "birthday":
        return icons.SVGBirthdays;
      case "contact":
        return icons.SVGContacts;
      case "mission":
        return icons.SVGMissions;
      default:
        return icons.SVGFeed;
    }
  };

  const visualizeNotification = (id) => {
    dispatch(readNotification(id)).then((result) => {
      if (!result.meta.rejectedWithValue) {
        dispatch(fetchNotifications());
      } else {
        toastMessage({
          danger: true,
          title: "Erro",
          message: "Notificação já visualizada",
        });
      }
    });
  };

  return (
    <styled.Main>
      <styled.Container $height={windowHeight}>
        <styled.ListBox>
          {notifications &&
            notifications.map((notification, index) => {
              const isVisualized = notification.visualized.includes(user.id);
              return (
                <styled.ListTile
                  key={index}
                  $visualized={isVisualized}
                  onClick={() => visualizeNotification(notification.id)}
                >
                  <styled.TileLeading>
                    {createElement(iconSwitch(notification.type), {
                      width: 24,
                      height: 24,
                    })}
                  </styled.TileLeading>
                  <styled.TileContent>
                    <styled.TileTitle>
                      {isVisualized ? "Notificação" : "Nova notificação"}
                    </styled.TileTitle>
                    <styled.TileSubtitle>
                      {notification.text}
                    </styled.TileSubtitle>
                  </styled.TileContent>
                </styled.ListTile>
              );
            })}
        </styled.ListBox>
      </styled.Container>
    </styled.Main>
  );
};

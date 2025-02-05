import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBirthdays } from "@/store/slicers/birthdaysSlicer.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Lottie from "lottie-react";

import confettiAnimation from "@/assets/animations/confetti.json";
import * as styled from "./birthdaysStyles.js";

export const Birthdays = ({ windowHeight }) => {
  const [todayBirthday, setTodayBirthday] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { birthdays } = useSelector((state) => state.birthdays);

  const dispatch = useDispatch();

  useEffect(() => {
    if (birthdays && birthdays.length === 0) {
      dispatch(fetchBirthdays());
    }
  }, [dispatch]);

  const formatDate = (timestamp) =>
    format(new Date(timestamp), "dd/MM", { locale: ptBR });

  useEffect(() => {
    const today = formatDate(new Date());
    const todayBirthdays = birthdays.filter(
      (user) => formatDate(user.birthday) === today
    );
    setTodayBirthday(todayBirthdays);
  }, [birthdays]);

  const handleCongrats = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <styled.Main>
      <styled.Section $height={windowHeight}>
        <styled.SectionTitle>Aniversariantes</styled.SectionTitle>
        <styled.Container>
          <styled.Box>
            <styled.ListWrapper>
              {birthdays.map((user, index) => (
                <styled.ListTile key={index}>
                  <styled.TileLeading>
                    <styled.avatar src={user.profilePictureUrl} />
                  </styled.TileLeading>
                  <styled.TileContent>
                    <styled.TileTitle>{user.name}</styled.TileTitle>
                    <styled.TileSubtitle>{user.role}</styled.TileSubtitle>
                  </styled.TileContent>
                  <styled.TileTitle>
                    {formatDate(user.birthday) === formatDate(new Date())
                      ? "Hoje!"
                      : formatDate(user.birthday)}
                  </styled.TileTitle>
                </styled.ListTile>
              ))}
            </styled.ListWrapper>
          </styled.Box>
        </styled.Container>
      </styled.Section>
      {todayBirthday.length > 0 && (
        <styled.Container2>
          <styled.avatarContainer>
            {todayBirthday.map((user, index) => (
              <styled.bigAvatar
                key={index}
                $index={index}
                src={user.profilePictureUrl}
              />
            ))}
          </styled.avatarContainer>
          {todayBirthday.map((user, index) => (
            <styled.textWrapper key={index}>
              <h1>{user.name}</h1>
              <h4>{user.role}</h4>
            </styled.textWrapper>
          ))}
          <styled.congratsButton
            onClick={handleCongrats}
            disabled={showConfetti}
          >
            👏
          </styled.congratsButton>
        </styled.Container2>
      )}
      {showConfetti && (
        <styled.ConfettiWrapper>
          <Lottie animationData={confettiAnimation} loop={false} />
        </styled.ConfettiWrapper>
      )}
    </styled.Main>
  );
};

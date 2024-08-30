import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Button, Typography } from "@mui/material";
import { EVariantModal } from "@src/types/EVariantModal";
import { setVariant } from "@store/reducers/modalSlice";
import { Modal } from "@components/Modal";
import { TableCount } from "@components/TableCount/TableCount";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IPlayer } from "@src/types/IPlayer";
import { ConfettiC } from "@components/Confetti";
import { useEffect } from "react";
import { setComleted } from "@store/reducers/gameSlice";

export const Main = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    bet: { playerId, bet },
    game: { roundResult },
    completed,
  } = useAppSelector((state) => state.gameSlice);

  const [open, openModal, closeModal] = useModal();
  const name = players?.find((player: IPlayer) => player.id === playerId)?.name;
  const handleOpenModal = (variant: EVariantModal, title: string) => {
    dispatch(setVariant({ title, variant }));
    openModal();
  };

  useEffect(() => {
    players.forEach((player) => {
      if (player.score >= 1000) {
        dispatch(setComleted(true));
      }
    });
  }, [players]);

  return (
    <main className={cx("main")}>
      {completed && <ConfettiC />}

      <section className={cx("section")}>
        <Button
          variant="contained"
          onClick={() =>
            handleOpenModal(EVariantModal.newGame, "Добавить игроков")
          }
        >
          Старт!
        </Button>
        {bet > 100 && (
          <div className={cx("bet-container")}>
            <Typography variant="h6">Ставка {name}:</Typography>
            <Typography variant="h6">{bet}</Typography>
          </div>
        )}
        {players.length > 0 && (
          <>
            <TableCount results={roundResult} />
            <div className={cx("buttons")}>
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenModal(EVariantModal.addBet, "Сделать ставку")
                }
              >
                Сделать ставку
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenModal(EVariantModal.addResult, "Добавить результат")
                }
              >
                Результат
              </Button>
            </div>
          </>
        )}
      </section>
      <Modal open={open} handleClose={closeModal} />
    </main>
  );
};

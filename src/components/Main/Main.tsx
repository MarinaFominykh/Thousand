import React, { FormEvent, useState } from "react";
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

const results = [
  {
    "0": 0,
    "1": 0,
    "2": 0,
  },
  // {
  //   first: 120,
  //   second: 15,
  //   third: 0,
  // },
  // {
  //   first: 135,
  //   second: 15,
  //   third: 150,
  // },
  // {
  //   first: 135,
  //   second: 15,
  //   third: 150,
  // },
  // {
  //   first: 135,
  //   second: 15,
  //   third: 150,
  // },
];
export const Main = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.playerSlice);
  const {
    bet: { playerId, bet },
    game: { roundResult },
  } = useAppSelector((state) => state.gameSlice);
  const [open, openModal, closeModal] = useModal();
  const name = players?.find((player: IPlayer) => player.id === playerId)?.name;
  const handleOpenModal = (variant: EVariantModal, title: string) => {
    dispatch(setVariant({ title, variant }));
    openModal();
  };
  return (
    <main className={cx("main")}>
      <section className={cx("section")}>
        <Button
          variant="contained"
          onClick={() =>
            handleOpenModal(EVariantModal.newGame, "Добавить устройство")
          }
        >
          Начать
        </Button>
        {bet > 100 && (
          <div className={cx("bet-container")}>
            <Typography variant="h6">{name}:</Typography>
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
                  handleOpenModal(EVariantModal.addBet, "Make bet")
                }
              >
                Make bet
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenModal(EVariantModal.addResult, "Add result")
                }
              >
                Add result
              </Button>
            </div>
          </>
        )}
      </section>
      <Modal open={open} handleClose={closeModal} />
    </main>
  );
};

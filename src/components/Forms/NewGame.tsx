import React, { FormEvent, FC } from "react";
import { TextField, Button } from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useFormValue } from "@hooks/useFormValue";
import { setPlayers } from "@store/reducers/playerSlice";
import { resetBet } from "@store/reducers/gameSlice";
import styles from "./styles.module.scss";
import sharedStyles from "../../styles/shared.module.scss";

const dataFields = [
  {
    id: 1,
    name: "0",
    label: "Устройство 1",
  },
  {
    id: 2,
    name: "1",
    label: "Устройство 2",
  },
  { id: 3, name: "2", label: "Устройство 3" },
];

interface Props {
  onClose: () => void;
}

export const NewGame: FC<Props> = ({ onClose }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const dispatch = useAppDispatch();
  const { values, handleChange, resetForm } = useFormValue();
  const { players } = useAppSelector((state) => state.playerSlice);

  const startGame = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(resetBet());
    const arr = Array(3).fill({});
    const players = arr.map((item, i) => {
      return {
        id: String(i),
        name: values?.[String(i)] || "",
        score: 0,
        active: false,
        rounds: [0],
      };
    });
    dispatch(setPlayers(players));
    onClose();
  };

  return (
    <form className={cx("form")} onSubmit={startGame}>
      <fieldset className={cxShared("fieldset")}>
        {dataFields.map((field) => (
          <TextField
            key={field.id}
            name={field.name}
            label={field.label}
            value={values?.[field.name] || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
        ))}
      </fieldset>
      <div className={cxShared("buttons")}>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
